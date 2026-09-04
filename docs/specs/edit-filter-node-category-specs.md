# Edit filter node - Category — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Add filter node - Category` (68 case, Google Sheet `TC_Native Search`, link: docs.google.com/spreadsheets/d/1ZqcAoLFr2nIdlRDj7_vIrKxi3IACrkwp, gid=1928491781), đối chiếu với pattern khung Edit chung ở `filter-tree-common-specs.md` (mục 3), với `edit-filter-node-brand`/`edit-filter-node-condition`/`edit-filter-node-review-rating`/`edit-filter-node-featured-products` (feature anh em cùng pattern filter node), và với **ảnh UI Export Figma thật**: `03_Filter/01_Display_Setup/02_Filter_Tree_Node_Setup/UI_Export/Edit filter node _ Category.png` (8178×4198px, đã crop nhiều vùng: panel field chính, popup Option display, popup Sort Order, 2 sticky note).

**Mức độ khớp giữa sheet Add và ảnh UI: rất cao** — cao hơn cả Featured Products. Đặc biệt, **chính sheet Add đã tự phát hiện và ghi chú 3 field không tồn tại** (case #41 Show all irrelevant values, #48 Display all values in uppercase, #49 Show search box — cả 3 đều **SKIP** kèm note "Không thấy có trường này"), khớp chính xác với việc ảnh UI panel Appearance Settings không có 3 field này. Đây là bằng chứng chéo (cross-validation) giữa 2 nguồn độc lập, không cần đặt câu hỏi nghi vấn như đã làm với Review Ratings/Featured Products.

**Đặc điểm riêng của sheet Category so với các sheet khác đã làm**: rất nhiều case đang **NG** (bug thật, không phải case chưa thực thi) — đặc biệt 1 bug nghiêm trọng lặp lại xuyên suốt nhóm Integration/Sync: **"List product không filter theo giá trị đã chọn ở filter category"** (storefront chọn filter Category nhưng danh sách sản phẩm không lọc theo). Giữ nguyên toàn bộ các rule này khi viết test case Edit, đánh dấu rõ case nào đang biết là NG.

## 1. Tổng quan

Category là loại filter node lọc theo **category mà product được assign** trên BigCommerce, đồng bộ qua Sync. Khác biệt lớn nhất so với Brand/Condition/Review Ratings/Featured Products: category có **cấu trúc phân cấp (tree, parent-children)**, nên có thêm field riêng **Option display** (Same level / All level categories) để quyết định hiển thị phẳng hay đầy đủ hierarchy — không loại filter node nào khác có field này.

## 2. General Settings

Giống hệt pattern chung, xác nhận đúng trên ảnh UI:

| Field | Loại | Validation | Nguồn |
| --- | --- | --- | --- |
| Title | Text | Bắt buộc, rỗng → lỗi required; default = "Category" | Ảnh UI + #6, 7, 8 |
| Title text color | Color | Áp dụng ngay lên Preview | Ảnh UI + #9 |
| Title alignment | Radio Left/Center/Right | Áp dụng ngay lên Preview | Ảnh UI + #10 |

**Bug riêng đã ghi nhận** (#10, đang NG): khi title dài hơn 1 dòng, phần Preview luôn hiển thị căn trái dù đã chọn Center/Right — cần giữ đúng rule này khi verify lại ở Edit.

## 3. Filter Settings — Option display (field riêng biệt, không có ở node khác)

Field hiển thị giá trị hiện tại + button [Edit] mở popup "Option display" (xác nhận qua ảnh UI + sticky note):

| Field | Giá trị | Default | Nguồn |
| --- | --- | --- | --- |
| Option display type (radio trong popup) | Same level categories / All level categories | **Same level categories** | Ảnh UI (sticky "OPTION DISPLAY") + #11, 12 |

- **Same level categories**: Preview/storefront hiển thị categories dạng flat list cùng 1 cấp (#13).
- **All level categories**: Preview/storefront hiển thị đầy đủ nested hierarchy (parent → children) (#14).

**Available options** (trong cùng popup Option display): danh sách category tree theo **page/category context đã áp dụng filter tree** (không phải toàn bộ category của BC), có "Select all" theo từng location. **Display logic xác nhận qua sticky note**: mặc định mỗi location được **select all** category/subcategory bên trong (#21 mô tả đúng behavior này). Chọn 1 location (category cha) → hệ thống **tự động select toàn bộ subcategories** bên trong (#25, case gốc **SKIP** — "Chốt skip", chưa thực thi).

**Lưu ý mâu thuẫn nội tại trong sheet gốc**: case #1 (note) ghi "mặc định đang KHÔNG select all các giá trị category/subcategory" — trái với sticky note thiết kế (mặc định select all) và trái với case #21 (Expected Result xác nhận "tất cả categories ở trạng thái selected mặc định", Result = OK). Nhận định: case #1 đang mô tả 1 quan sát/bug tại thời điểm ghi chú, còn thiết kế đúng (và hành vi đã pass ở #21) là mặc định select all. Test case Edit theo đúng thiết kế (select all mặc định), giữ 1 case verify lại để chắc chắn không regressive về trạng thái "không select all" đã từng bị ghi nhận.

**Tích hợp theo page context — nhiều case đang NG**: cả 4 case tích hợp Option display với Category Page/SRP (#16→19) đều đang **NG** ("[Storefront][Filter category] Hiển thị lỗi UI"), riêng #16 (Same level + Category Page) là OK. Giữ nguyên rule mong đợi khi viết Edit case:
- Same level + Category Page: chỉ hiển thị subcategories **trực tiếp** của category context, không sâu hơn.
- All level + Category Page: hiển thị toàn bộ hierarchy từ context trở xuống.
- Same level + SRP: hiển thị danh sách **top-level** categories.
- All level + SRP: hiển thị toàn bộ category tree từ root đến leaf.

Giá trị Option display **persist đúng sau reload** (#20, OK).

## 4. Filter Settings — Available options (popup con của Option display)

| Hành vi | Mô tả | Nguồn |
| --- | --- | --- |
| Deselect 1 category | Ẩn category đó khỏi storefront, các category khác không đổi | #22, OK |
| Re-select category đã deselect | Hiển thị lại đúng vị trí theo Sort Order | #23, OK |
| Deselect toàn bộ categories của 1 page context | Filter ẩn options của page/location đó | #24, case gốc **SKIP** — "Không thể bỏ chọn toàn bộ category" (khả năng có validation chặn) |
| Deselect **toàn bộ** categories (mọi location) | **Chặn save, báo lỗi** — khác Featured Products (cho save rồi mới hỏi ẩn node/empty state) | #65, OK — "Đang báo error ko cho save data" |

## 5. Option select type

| Giá trị | Default | Nguồn |
| --- | --- | --- |
| Multiple | **Có** (mặc định) | Ảnh UI + #26 |
| Single | — | #27 |

`[CẦN XÁC NHẬN BA]` — sticky note ghi chú thêm 1 dòng chưa hoàn chỉnh: "Note: Trong trường hợp option display = multi-level [...]" (bị cắt, không rõ vế sau) — nghi vấn khi Option display = All level thì Option select type có bị **ép buộc luôn là Multiple** (không cho chọn Single) hay không, vì chọn nhiều cấp cùng lúc về bản chất cần Multiple (#28 xác nhận Multiple + All level cho phép chọn nhiều cấp cùng lúc — OK). Xem câu hỏi #1, mục 10.

**Bug đang NG** (#27): chọn Option select type = Single nhưng Preview vẫn cho phép chọn nhiều option cùng lúc — cần giữ đúng rule (chỉ 1 category active) khi verify lại ở Edit.

## 6. Filter Settings — Sort Order

**Khác cấu trúc so với Brand/Review Ratings** (5 lựa chọn Alphabetical Asc/Desc, Product number Asc/Desc, Custom order) **và khác cả Featured Products** (kéo thả trực tiếp, không popup) — Category có popup Sort Order riêng dạng **dropdown chọn mode + danh sách kéo thả phân cấp** (xác nhận qua ảnh UI popup thật):

| Mode | Mô tả | Default | Nguồn |
| --- | --- | --- | --- |
| Alphabet order | Categories tự sort A-Z, không cần kéo thả | — | Ảnh UI + #29, 30 |
| Manual order (= "Filter options order" theo tên gọi sheet Add) | Danh sách kéo-thả phân cấp (nested theo category tree, có icon `≡` từng dòng, hiển thị cả sub-category thụt lề) | **Có** (mặc định) | Ảnh UI (popup show "Manual order" dropdown) + #29, 31 |

**Lưu ý thuật ngữ**: sheet Add mô tả đây là 2 "radio" (Alphabet order / Filter options order); ảnh UI popup thật cho thấy đây là 1 **dropdown** (hiện giá trị "Manual order"). Không xung đột về hành vi, chỉ khác control UI — dùng ảnh UI (dropdown) làm chuẩn khi viết test case click/thao tác.

**Bug nghiêm trọng đang NG, lặp lại ở gần như toàn bộ case Sort Order** (#30→35): popup Sort Order **KHÔNG hiển thị data của category** ở mode "Filter options order"/Manual order — khiến không verify được: Alphabet order tự sort (#30), kéo thả custom + storefront phản ánh đúng (#31), persist sau reload (#32), switch Custom→Alphabet re-sort (#33), Alphabet order + category mới từ BC tự xếp đúng vị trí (#34), Custom order + category mới append cuối (#35). Giữ nguyên toàn bộ rule mong đợi này khi viết Edit case, đánh dấu rõ đang NG.

## 7. Hide on customer group

Giống pattern chung, nhưng **case full-flow đang NG** (#36): chọn customer group để hide nhưng storefront **vẫn hiển thị filter** với account thuộc group đó (rule ẩn không hoạt động). Case BC xoá customer group → biến mất khỏi popup vẫn OK (#37).

## 8. Appearance settings

Ảnh UI xác nhận panel Appearance Settings — **khớp chính xác với các case sheet Add đã tự SKIP vì "Không thấy có trường này"**:

| Field | Mô tả | Nguồn |
| --- | --- | --- |
| Display tooltip (toggle + content) | Content mặc định "Category filter helps customers to navigate"; rỗng + bật ON → cảnh báo required | Ảnh UI + #38, 39, 40 |
| Pagination type | Dropdown **chỉ 2 giá trị**: Infinite scroll / "Show more" button — **không có "Pagination pages"** | Ảnh UI + #42 |
| Number of filter options per click | Dropdown, chỉ hiện khi Pagination type = Show more; range **5 → 10** | Ảnh UI + #45, 46 |
| Collapse/Expand (Desktop) | Dropdown, default Expand | Ảnh UI + #47 |
| Collapse/Expand (Mobile) | Dropdown, default Expand | Ảnh UI + #47 |

**KHÔNG có trên màn này** (sheet Add tự xác nhận qua case SKIP + note "Không thấy có trường này", khớp hoàn toàn với ảnh UI — không cần đặt câu hỏi nghi vấn): Show all irrelevant values (#41), Display all values in uppercase (#48), Show search box Desktop/Mobile (#49).

**Bug đang NG** (#44, #45, #46): dropdown Pagination type không hiển thị được giá trị "Show more" (chỉ chọn được Infinite scroll) → kéo theo cả 3 case liên quan Show more/Number of filter options per click đều NG do không set được precondition.

## 9. Storefront & Merchandising rules

**Bug nghiêm trọng, lặp lại xuyên suốt (root cause của nhiều case NG)**: storefront chọn filter Category **không thực sự lọc danh sách product** theo category đã chọn — ghi nhận ở #50, 52, 54, 60, 61, 63, 64, 66 (label chung "[Storefront_Filter category] List product không filter theo giá trị đã chọn ở filter category"). Đây là rule cốt lõi của node Category — bắt buộc phải có test case verify lại ở Edit dù biết đang NG, vì đây là chức năng chính.

| Rule | Mô tả | Nguồn |
| --- | --- | --- |
| Hiển thị + lọc đúng trên SRP | | #50, NG |
| Hiển thị đúng context trên Category Page | | #51, NG |
| Chọn category → chỉ product thuộc category đó | | #52, NG |
| Count per category | Số product tương ứng — xem tranh cãi mục 10 câu hỏi #2 | #53 |
| AND logic với filter khác (VD Brand) | | #54, NG |
| Merchandising — product Hidden | Không tính vào count, không hiện khi filter | #55, NG (cùng root cause Hide on customer group #36) |
| BC tạo category mới → sync → xuất hiện trong filter | Count = 0 nếu Show all irrelevant values = ON — **lưu ý field này không tồn tại theo mục 8**, cần xem lại rule này | #56, OK |
| BC đổi tên category → sync → filter cập nhật tên | | #57, OK |
| BC xoá category → sync → biến mất khỏi filter | | #58, OK |
| Assign product vào category → sync → count tăng | | #59, OK |
| Bỏ assign product khỏi category → sync → count giảm | | #60, NG |
| Di chuyển category sang parent khác → sync → filter phản ánh hierarchy mới | | #61, NG |

## 10. Câu hỏi mở / Edge case chưa có Expected Result rõ ràng

| # | Case | Mô tả | Nguồn |
| --- | --- | --- | --- |
| 1 | Option select type ép Multiple khi Option display = All level? | Sticky note ghi chú dở dang, chưa rõ có force hay không | Mục 5 |
| 2 | Count category cha có tính cả product ở subcategory không? | Case gốc tự đặt câu hỏi: "Count = 1 chỉ tính direct products, hay Count = 3 tính cả subcategories?" — cần document expected làm baseline | #62, NG |
| 3 | Category Visibility = DISABLED trên BC → filter có ẩn category đó không? | Case gốc tự ghi "xác nhận behavior với team" | #63, NG |
| 4 | Same level trên Category Page là leaf node (không có subcategory) → filter hiển thị gì? | Case gốc tự ghi "confirm expected behavior với team" | #67, NG |

## 11. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Option select type có bị ép buộc = Multiple khi Option display = All level categories không? | 5, 10.1 |
| 2 | Count hiển thị cạnh category cha có bao gồm product ở subcategory hay chỉ tính direct-assign? | 9, 10.2 |
| 3 | Category Visibility = DISABLED trên BC → filter Category có tự ẩn category đó không? | 9, 10.3 |
| 4 | Đứng ở Category Page là leaf node (không subcategory) + Option display = Same level → filter Category hiển thị gì (không option nào, hay ẩn hẳn node)? | 3, 10.4 |
| 5 | "Show all irrelevant values" được case #56 nhắc tới (dùng để quyết định category mới sync có hiện count=0 hay không) nhưng field này đã xác nhận KHÔNG tồn tại trên màn Edit (mục 8) — vậy category count=0 mặc định ẩn hay hiện? | 8, 9 |

## 12. Lưu ý về thực thi (không phải spec, chỉ tham khảo)

Đây là sheet có **tỷ lệ case NG cao nhất** trong các filter node đã làm (Brand/Condition/Review Ratings/Featured Products) — phần lớn xoay quanh 2 root cause: (1) storefront không thực sự lọc product theo category đã chọn, (2) popup Sort Order không load được data ở mode Manual/Filter options order. Khi viết test case Edit, **giữ nguyên toàn bộ Expected Result đúng theo thiết kế** (không hạ chuẩn theo bug hiện tại) và đánh dấu rõ case nào đang biết NG bằng `<cần confirm>` + note tham chiếu case gốc, để QA thực thi biết đây là re-verify chứ không phải case mới chưa từng biết.

## 13. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Category filter node (Add + Edit)
- **Tài liệu liên quan:** `filter-tree-common-specs.md` (khung Edit chung), `edit-filter-node-brand-specs.md`/`edit-filter-node-condition`/`edit-filter-node-review-rating-specs.md`/`edit-filter-node-featured-products-specs.md` (feature anh em cùng pattern)
- **Nguồn:** Sheet test case `Add filter node - Category` (68 case) + ảnh UI Export Figma thật (`Edit filter node _ Category.png`)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 5
