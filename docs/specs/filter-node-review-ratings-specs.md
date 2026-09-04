# Edit filter node - Review Rating — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Add filter node - Review Ratings` (105 case, Google Sheet `TC_Native Search`, link: docs.google.com/spreadsheets/d/1ZqcAoLFr2nIdlRDj7_vIrKxi3IACrkwp, gid=1624344703), đối chiếu với pattern khung Edit chung đã tổng hợp ở `filter-tree-common-specs.md` (mục 3) và với `edit-filter-node-brand`/`edit-filter-node-condition` (feature anh em cùng pattern filter node).

**Bản cập nhật (2026-07-19)** — sau khi có quyền truy cập bộ tài liệu đầy đủ tại `C:\Users\ADMIN\OneDrive\Máy tính\Claude\Native Search-docs\Native Search\01_REQUIREMENT\`, đã đối chiếu lại với:
- **Ảnh UI Export Figma thật**: `03_Filter/01_Display_Setup/02_Filter_Tree_Node_Setup/UI_Export/Edit filter node _ Review Ratings.png` — 3 khung hình đầy đủ panel field cho cả 3 Display Style (Star/List/Grid), đã crop và đọc ở độ phân giải gốc (12329×3812px). Đây là nguồn **authoritative nhất** (ảnh chụp UI thật), theo đúng rule "Figma = spec" của dự án, còn cao hơn cả sticky note diễn giải đã dùng ở bản trước.
- **SPEC PDF chính thức**: `03_Filter/SPEC_Filter_v1.0_2025-10-14.pdf` — bảng "Node Title / Data attribute / Logic" xác nhận rule Review Rating; mô tả các component dùng chung cho mọi loại filter (Selection Type Single/Multiple, Display Setting gồm Show all irrelevant values...).
- `figma.md` và `NOTE_Filter_TreeNodeSetup_v1.0_2026-2-09.md` cùng thư mục: tồn tại nhưng **rỗng**.

**Kết quả đối chiếu — bản spec này thay thế hoàn toàn bản trước**, với các thay đổi chính:
- **5 field trong sheet Add KHÔNG xuất hiện trên ảnh UI thật** của màn Edit filter node - Review Ratings (xác nhận đồng nhất qua cả 3 khung Star/List/Grid): Toggle [Display selected ratings only] (dạng toggle riêng + popup rating picker), Show all irrelevant values, Pagination type, Display all values in uppercase, Show search box (Desktop/Mobile), Toggle [Setup dynamic option]. Nhiều khả năng sheet Add đã copy nhầm case từ sheet Brand/Condition (lặp lại đúng pattern lỗi đã ghi nhận ở `edit-filter-node-brand-specs.md`, mục 0). Riêng "Show all irrelevant values" được xác nhận có tồn tại thật trong SPEC PDF (mục Display Setting) nhưng ở **tầng setting chung của Filter** (Advanced Setting/Data Setting), không phải field riêng trên màn Edit node này.
- **2 field mới phát hiện, không có trong bản spec gốc**: Star color, Empty star color line (color picker, nằm trong Filter Settings, hiển thị ở cả 3 Display Style chứ không riêng Star).
- **Option select type xác nhận là dropdown**, không phải Single/Multiple như sheet Add mô tả — xem mục 4.

Sheet Add + sticky note (đã dùng ở bản trước) vẫn giữ vai trò tham khảo cho phần business rule storefront (Sort order, Hide on customer group, rule Approved review, rounding...) — phần này ảnh Figma không phủ định, ảnh chỉ cho thấy đúng khung Edit + General/Filter/Appearance Settings.

## 1. Tổng quan

Review Ratings là 1 loại filter node lọc theo **rating trung bình của product**, tính từ các **review đã Approved** trên BigCommerce (xác nhận trực tiếp trong SPEC PDF: *"Get all 'approved' reviews of a products → From reviews rating -> calculate"*), đồng bộ qua Sync. Khác Brand (dynamic từ BC catalog) và Condition (3 giá trị cố định New/Used/Refurbished) — Review Ratings có dữ liệu **tính toán động** (average rating + product count mỗi bucket 1★→5★), phụ thuộc vào trạng thái Approve/Disapprove/Delete của review trên BC và phải chạy lại Sync mới cập nhật.

**Cập nhật (2026-08-12)** — người dùng cung cấp thêm ảnh chụp màn hình **BC Admin → Reviews** (danh sách review + form Edit Review) và yêu cầu đào sâu impact 2 chiều BC ↔ hệ thống ↔ storefront. Đã đối chiếu và bổ sung mục 1.1 (cấu trúc dữ liệu Review trên BC), mục 1.2 (luồng 2 chiều: customer submit trên storefront → BC lưu → Admin duyệt → sync → filter cập nhật). Chưa truy cập lại được ảnh Figma thật ở link node-id mới do người dùng gửi (Figma MCP đã setup nhưng chưa kết nối được trong phiên làm việc) — phần phân tích Figma trong các mục dưới đây (2→10) giữ nguyên nội dung đã xác nhận từ phiên trước (đã đọc ảnh UI export thật), KHÔNG áp dụng cho lần cập nhật này.

### 1.1 Cấu trúc dữ liệu Review trên BigCommerce (xác nhận qua ảnh BC Admin thật)

BC Admin có sẵn màn hình quản lý review riêng (**Storefront → Reviews**, không phải field trên Product) với cấu trúc:

| Field | Loại | Mô tả | Nguồn |
| --- | --- | --- | --- |
| Product | Reference | Review thuộc về đúng 1 product | Ảnh BC Admin — cột "Product" trong danh sách |
| Review Title | Text | Tiêu đề review | Ảnh BC Admin — form Edit Review |
| Review | Rich text/textarea | Nội dung review | Ảnh BC Admin — form Edit Review, có scroll (nội dung dài) |
| Author | Text | Tên người viết — **free text, không bắt buộc gắn với tài khoản customer đã đăng nhập** (VD "Jane Doe"/"John Doe" trong ảnh danh sách, không thấy liên kết account) | Ảnh BC Admin |
| Date | Date | Ngày đăng | Ảnh BC Admin — cột "Date" |
| Status | Dropdown (Approved / Disapproved theo quan sát dropdown, có thể còn giá trị khác) | Trạng thái duyệt — **quyết định review có được tính vào Review Ratings filter hay không** (mục 11: chỉ tính Approved) | Ảnh BC Admin — cột "Status" + dropdown "Status:" trong form Edit |
| Rating | Dropdown 5 giá trị cố định: Poor (1 Star) / Below Average (2 Stars) / Average (3 Stars) / Above Average (4 Stars) / Excellent (5 Stars) | Rating của **riêng review đó** (khác với "average rating của product" — là con số tính toán tổng hợp từ nhiều review) | Ảnh BC Admin — dropdown "Rating:" trong form Edit |

Danh sách review (list view) có: checkbox chọn nhiều, action hàng loạt **[Delete Selected]/[Approve Selected]/[Disapprove Selected]**, **[Filter by Keyword]**, và action riêng từng dòng (menu `...` → Preview/Edit).

`[CẦN XÁC NHẬN BA]` — BC Admin có action **Add Review** (tạo review thủ công) không, hay chỉ có Edit/Delete/Approve/Disapprove cho review đã tồn tại (do customer/storefront tạo ra)? Ảnh chỉ chụp được list + Edit, chưa thấy nút Add.

### 1.2 Luồng 2 chiều: Storefront → BigCommerce → Sync → Filter (đặc thù riêng của Review Ratings, không có ở node nào khác)

Khác mọi filter node khác trong dự án (vốn chỉ đọc 1 chiều: BC product data → sync → filter), Review Ratings có thêm 1 chiều ngược: **customer trên storefront có thể tạo ra dữ liệu nguồn (review) mới**, không chỉ merchant cấu hình trong BC Admin.

```
[1] Customer viết review trên storefront (trang product)
        ↓
[2] Review được lưu vào BC — Status mặc định = ? (CẦN XÁC NHẬN BA, xem dưới)
        ↓
[3] Merchant vào BC Admin → Reviews → duyệt (Approve/Disapprove/Delete), có thể sửa Rating/Title/Author
        ↓
[4] Chỉ review Status = Approved mới được tính
        ↓
[5] Trigger Sync (Manual hoặc Schedule) → Native Search đọc lại toàn bộ review Approved của product → tính average rating → xác định bucket 1★→5★ → cập nhật count
        ↓
[6] Storefront Review Ratings filter phản ánh số liệu mới — CHỈ sau khi sync chạy xong, không realtime ngay lúc Approve
```

`[CẦN XÁC NHẬN BA]` — điểm [2]: review customer viết trên storefront có Status mặc định là **Disapproved (cần duyệt thủ công)** hay **Approved luôn** (tuỳ setting store)? Đây là fact về hành vi BigCommerce (Loại 1 theo `docs/bigcommerce-platform-facts.md`), cần tra BC Developer Docs hoặc test trực tiếp trên BC Admin (Store Settings → Reviews) để xác nhận, ảnh chụp màn hình không thể hiện setting này.

**Khác biệt quan trọng với các entity sync khác trong dự án**: "Reviews" **chưa có trong whitelist** `docs/sync-fields-glossary.md` (chỉ có bằng chứng gián tiếp từ SPEC PDF Filter + ảnh BC Admin, đã bổ sung tạm với ghi chú độ tin cậy thấp hơn — xem mục 9 file đó). Do vậy toàn bộ case Sync của Review Ratings nên gắn `<cần confirm>` ở mức "nguồn dữ liệu" ngay cả khi hành vi kỳ vọng rõ ràng.

## 2. General Settings

Giống hệt pattern Brand/Condition, xác nhận đúng trên ảnh UI thật:

| Field | Loại | Validation | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- | --- |
| Title | Text | Bắt buộc, rỗng → lỗi required; default = "Review Ratings" | Config nội bộ | Ảnh UI + sheet Add #6, 7, 8 |
| Title text color | Color | Áp dụng ngay lên Preview | Config nội bộ | Ảnh UI + sheet Add #9 |
| Title alignment | Radio Left/Center/Right | Áp dụng ngay lên Preview | Config nội bộ | Ảnh UI + sheet Add #10 |

## 3. Filter Settings — Display Style

Ảnh UI xác nhận đúng khung "FILTER SETTINGS" chứa: Display Style, Star color, Empty star color line, Option select type, Sort order, Hide on customer group (xem mục 4, 5, 6).

| Giá trị | Default | Nguồn |
| --- | --- | --- |
| **Star** | **Có** (mặc định) — xác nhận qua cả ảnh UI (label "Display style : Star (default)") lẫn sheet Add (#11) | Ảnh UI + #11, 12 |
| List | — | Ảnh UI + #13, 17 (20+ option — case **SKIP**, chưa thực thi) |
| Grid | — | Ảnh UI + #14, 19 (20+ option — case **SKIP**, chưa thực thi) |

Khác Brand (List/Grid/**Swatch**) — Review Ratings **không có Swatch**, thay bằng **Star** làm mặc định.

Trên MH Edit: giá trị Display Style hiện tại phải load đúng khi mở lại (#15), đổi style rồi Save phải thành công và Preview cập nhật đúng dạng tương ứng (#16, 18).

## 4. Star color & Empty star color line — field mới phát hiện

Phát hiện trực tiếp từ ảnh UI thật, **không có trong sheet Add lẫn sticky note trước đó** — đúng như rule dự án (Figma là spec authoritative), 2 field này phải được test dù sheet Add không có case tương ứng:

| Field | Loại | Mô tả | Nguồn |
| --- | --- | --- | --- |
| Star color | Color picker | Màu sao đã rate (mặc định vàng), áp dụng cho preview/storefront ở cả 3 Display Style | Ảnh UI |
| Empty star color line | Color picker | Màu viền/sao rỗng chưa rate (mặc định xám nhạt) | Ảnh UI |

`[CẦN XÁC NHẬN BA]` — 2 field này chưa từng được test ở sheet Add nào (kể cả Add flow), toàn bộ case Edit cho 2 field này là case mới hoàn toàn dựa theo ảnh UI, cần QA thực thi thật để xác nhận hành vi (không có case gốc nào đối chiếu).

## 5. Option select type

Ảnh UI xác nhận field này là 1 **dropdown**, không phải radio Single/Multiple như sheet Add case #27→35 mô tả.

**Quan sát trực tiếp từ ảnh UI** (3 khung Star/List/Grid):
| Khung | Giá trị hiển thị |
| --- | --- |
| Star | "Display selected ratings and above" |
| List | "Display selected ratings and above" |
| Grid | **"Single"** |

**Đối chiếu sticky note Figma** (đã đọc rõ ở bản trước):
```
OPTION SELECT TYPE
• Selected ratings and above
• Selected ratings only: gợi ý từ .0 → .9
```

**Đối chiếu SPEC PDF**: mục "Các thành phần chính của 1 filter section" liệt kê **"Selection Type: Multiple/Single"** như 1 component áp dụng chung cho MỌI loại filter (không riêng Review Ratings).

**Nhận định** (đã thống nhất với người dùng để làm phương án chính viết test case): giá trị "Single" ở khung Grid nhiều khả năng là **artifact chưa cập nhật** từ giá trị mặc định của component Selection Type dùng chung, còn ý đồ thiết kế thật cho Review Ratings là theo hướng sticky note — dropdown Option select type có 2 giá trị:
- **"Selected ratings and above"** (mặc định — khớp 2/3 khung): chọn 1 rating (VD 4★) → storefront lọc ra product có rating **4★ trở lên** (cumulative).
- **"Selected ratings only"**: chỉ lọc **đúng** rating đã chọn (exact match), kèm rule làm tròn `.0 → .9` (xem mục 6).

`[CẦN XÁC NHẬN BA]` — vẫn cần QA/BA xác nhận trực tiếp trên môi trường thật: (1) dropdown có đúng 2 giá trị này không hay có lẫn cả Single/Multiple; (2) giá trị "Single" ở khung Grid có phải lỗi thiết kế hay là 1 giá trị hợp lệ thứ 3/4. Test case Edit viết theo phương án chính (and-above/only), kèm 1 case riêng ghi nhận nghi vấn Grid.

## 6. Rule làm tròn rating (bucket rounding)

Sheet Add case #99 (boundary average = 4.5★) ghi nhận đây là **câu hỏi mở chưa xác nhận**: "Cần confirm rule làm tròn với team/dev: xuất hiện ở 4★ hay 5★". SPEC PDF không nêu công thức làm tròn cụ thể, chỉ ghi "From reviews rating -> calculate".

Sticky note Figma (mục 5, dòng "Selected ratings only: gợi ý từ .0 → .9") gợi ý câu trả lời: rating bucket được xác định theo **phần nguyên** của average rating, khoảng `x.0 → x.9` thuộc bucket `x` (làm tròn **xuống**). Theo rule này, average 4.5★ → thuộc bucket **4★**, không phải 5★.

`[CẦN XÁC NHẬN BA]` — chưa có nguồn nào (kể cả PDF) xác nhận 100% đây là công thức chính thức. Test case Edit áp dụng rule floor này làm giả thuyết chính nhưng đánh dấu `<cần confirm>`.

## 7. Sort order

Ảnh UI xác nhận field hiển thị dạng `Sort order` + giá trị hiện tại (VD "Highest - Lowest") + button [Edit] mở popup — khớp đúng pattern đã viết ở bản trước.

**Theo sticky note Figma**: 3 giá trị — Highest - Lowest, Lowest - Highest, Manual (tương tự pattern "Custom order" kéo thả đã có ở Brand).

**Theo sheet Add** (case #36→39): popup Sort Order chỉ test **2 giá trị**: Highest (mặc định), Lowest — không có Manual.

| Giá trị | Default | Nguồn |
| --- | --- | --- |
| Highest - Lowest | **Có** — khớp cả ảnh UI lẫn sheet Add | Ảnh UI + #37, 38 |
| Lowest - Highest | — | #37, 39 |
| Manual | — | Chỉ có ở sticky note, **chưa từng được test** trong sheet Add, chưa thấy trên ảnh UI (ảnh chỉ show giá trị hiện tại, không show mở dropdown/popup) |

Behavior đã xác nhận: Highest → 5★ hiển thị đầu tiên trên storefront (#38); Lowest → 1★ hiển thị đầu tiên (#39).

`[CẦN XÁC NHẬN BA]` — option "Manual" có tồn tại thật trên UI không, và nếu có thì kéo thả thủ công áp dụng cho 5 bucket rating cố định như thế nào?

## 8. Hide on customer group

Ảnh UI xác nhận field hiển thị "0 selected" + button [Edit] — khớp đúng pattern đã xác nhận ở Brand/Condition, không có điểm khác biệt riêng của Review Ratings:

| Field | Nguồn |
| --- | --- |
| Click [Edit] → popup [Select customer group] | Ảnh UI + #40 |
| Search partial/full match | #41, 42 |
| Danh sách sync từ BC | #43 |
| Chọn group → ẩn filter đúng (Admin) | #44 |
| Ẩn filter đúng ngoài storefront | #45 |
| BC xoá customer → biến mất khỏi popup | #46 |

Toàn bộ case #40→46 đang ở trạng thái **SKIP** trong sheet gốc (chưa thực thi).

## 9. Appearance settings — đã thu gọn theo ảnh UI thật

**Quan trọng**: ảnh UI xác nhận khung "APPEARANCE SETTINGS" chỉ có đúng 3 field sau (đồng nhất qua cả 3 khung Star/List/Grid), khác hẳn pattern Brand/Condition:

| Field | Mô tả | Nguồn |
| --- | --- | --- |
| Display tooltip (toggle + content) | Content giới hạn 255 ký tự; rỗng → không hiển thị tooltip; bật ON khi content rỗng → không cho phép/cảnh báo | Ảnh UI + sheet Add #49→53 |
| Collapse/Expand (Desktop) | Dropdown, default Expand | Ảnh UI + sheet Add #60→63 |
| Collapse/Expand (Mobile) | Dropdown, default Expand | Ảnh UI + sheet Add #64→68 |

**KHÔNG có trên màn này** (dù sheet Add có case, dù có thể tồn tại ở tầng setting khác của hệ thống Filter): Show all irrelevant values, Pagination type, Display all values in uppercase, Show search box (Desktop/Mobile), Toggle [Setup dynamic option]. Xem mục 0 để biết lý do loại bỏ.

**Bug quan trọng cần giữ đúng khi Edit** (case #63 sheet Add, hiện đang **NG**, giống bug #113 đã ghi nhận ở Brand): chọn 1 option → Collapse filter → Expand lại → option đã chọn **bị mất trạng thái selected**. Rule quan trọng: Collapse/Expand không được làm mất selection.

## 10. Storefront widget rendering theo Display Style

Phát hiện thêm từ ảnh UI (2 mini-card annotation "🖐️ Display selected ratings only" đính kèm cạnh khung List và Grid) — mô tả cách storefront widget render theo từng Display Style, **không phải là 1 toggle riêng** (xem mục 0):
- **Star**: storefront hiển thị dạng thu gọn — 1 dòng tổng hợp (VD "5 stars (6)") kèm chevron mở rộng.
- **List**: storefront hiển thị đầy đủ cả 5 dòng rating (5★→1★) kèm count riêng từng dòng.

`[CẦN XÁC NHẬN BA]` — chưa rõ đây có phải hành vi mặc định cố định theo Display Style hay còn phụ thuộc thêm vào Option select type (mục 5); annotation trên ảnh không đủ rõ để kết luận chắc chắn.

## 11. Storefront & Merchandising rules — riêng biệt Review Ratings (không có ở Brand/Condition)

Nhóm case Integration (#85→105 sheet Add) mô tả nghiệp vụ đặc thù của Review Ratings, không bị ảnh Figma phủ định, giữ nguyên khi viết test case Edit (verify lại sau khi sửa cấu hình vẫn đúng các rule này):

| Rule | Mô tả | Nguồn |
| --- | --- | --- |
| Product count | Hiển thị cạnh mỗi rating bucket (VD `★★★★★ (5)`) — khớp ảnh UI (khung Grid show "5★(5)", "4★(...)"...) | Ảnh UI + #85, 103 |
| Filter theo bucket | Chọn 1★→5★ → lọc theo bucket đó (xem xung đột "and above" vs "only" ở mục 5) | #86, 87 |
| Kết hợp nhiều filter | AND logic (VD Review Ratings + Price) | #90 |
| Tích hợp SRP/Category Page | Filter hiển thị và hoạt động đúng ở cả 2 nơi | #88, 89 |
| Merchandising — product Hidden | Không tính vào count, không hiện khi filter | #91 |
| **Chỉ tính Approved review** | Xác nhận trực tiếp trong SPEC PDF: "Get all 'approved' reviews" | SPEC PDF + #92, 101 |
| Recalculate sau sync | Approve/Disapprove/Delete review trên BC → phải chạy Sync → rating & count mới cập nhật (KHÔNG realtime) | #93→100, 102, 105 |
| Review mới trên storefront | Customer viết review nhưng chưa Approve → chưa xuất hiện trong filter | #101 |
| Toàn bộ review bị Disapprove | Product biến mất khỏi mọi bucket | #100 |
| Store không có Approved review nào | Filter node không hiện bucket nào — `[CẦN XÁC NHẬN BA]` node có tự ẩn hẳn hay hiện empty state (case gốc #104 tự ghi "confirm với team", chưa có câu trả lời) | #104 |
| Sửa Rating của 1 review đã Approved (không phải Approve/Disapprove mà sửa thẳng số sao) | Average rating của product tính lại đúng theo giá trị mới sau sync — case chưa từng có trong sheet gốc, suy luận theo mục 1.1 | Mới (2026-08-12), `<cần confirm>` |
| Sửa Author/Review Title/Review (nội dung text) của review đã Approved | Không ảnh hưởng tới average rating/bucket (chỉ Rating + Status mới ảnh hưởng) | Mới (2026-08-12), `<cần confirm>` |
| Nhiều review cùng 1 product, rating khác nhau | Average tính đúng theo công thức trung bình cộng toàn bộ review Approved (không chỉ review mới nhất) | Mới (2026-08-12), `<cần confirm>` — sheet gốc không có case tường minh nhiều review/1 product |
| Customer submit review mới trên storefront → Status mặc định | `[CẦN XÁC NHẬN BA]` Approved luôn hay cần merchant duyệt (Disapproved mặc định) — fact hành vi BC, xem mục 1.2 | Mới (2026-08-12) |

## 12. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | 5 field (Toggle Display selected ratings only, Show all irrelevant values, Pagination type, Uppercase, Show search box, Setup dynamic option) sheet Add có test nhưng ảnh UI không có — có đúng là KHÔNG thuộc màn Edit filter node - Review Ratings (nằm ở tầng setting khác), hay ảnh UI Figma đang thiếu cập nhật? | 0, 9 |
| 2 | Star color / Empty star color line hoạt động cụ thể ra sao (áp dụng cho storefront khi nào, có override theo Display Style không)? Chưa có case gốc nào đối chiếu. | 4 |
| 3 | Option select type dropdown có đúng 2 giá trị "Selected ratings and above / Selected ratings only" không, hay còn lẫn Single/Multiple? Giá trị "Single" ở khung Grid trên ảnh UI là lỗi thiết kế hay giá trị hợp lệ? | 5 |
| 4 | Rule làm tròn rating theo sticky note (`.0 → .9` = floor về số nguyên, VD 4.5★ → bucket 4★) có đúng là rule chính thức không? | 6 |
| 5 | Sort order option "Manual" có tồn tại thật trên UI Review Ratings không? Nếu có, kéo thả thủ công áp dụng cho 5 bucket rating cố định như thế nào? | 7 |
| 6 | Storefront widget render thu gọn (Star) vs đầy đủ (List) có phải hành vi cố định theo Display Style hay còn phụ thuộc Option select type? | 10 |
| 7 | Khi toàn store không có Approved review nào, filter node Review Ratings tự ẩn hẳn khỏi storefront hay hiện dạng empty state? | 11 |
| 8 | Customer submit review mới trên storefront → Status mặc định Approved hay Disapproved (cần merchant duyệt)? Fact hành vi BC, chưa tra được BC Developer Docs. | 1.2 |
| 9 | BC Admin có action "Add Review" thủ công không, hay chỉ Edit/Delete/Approve/Disapprove review đã có sẵn từ storefront? | 1.1 |
| 10 | "Reviews" chưa có trong whitelist `docs/sync-fields-glossary.md` (chỉ bổ sung tạm dựa suy luận, chưa đối chiếu tài liệu Sync gốc) — cần verify lại khi có quyền truy cập tài liệu Sync gốc. | 1.2 |

## 13. Lưu ý về thực thi (không phải spec, chỉ tham khảo)

Phần lớn case từ #17 trở đi trong sheet Add đang ở trạng thái **SKIP** (chưa từng thực thi thật), đặc biệt toàn bộ nhóm Option select type (#28, 30→35 — lưu ý các case này mô tả Single/Multiple, đã được thay thế bởi field thật theo ảnh UI ở mục 5), Sort Order (#36, 37, 39), Hide on customer group (#40→46). Case đang **Fail (NG)** đáng chú ý: #63 (Collapse/Expand làm mất selection). Nhóm case business rule về rating/review (Approve/Disapprove/rounding) chưa có cột Tester/Result — chưa rõ đã thực thi hay chỉ là case được thiết kế lý thuyết. Nhóm case về Toggle Display selected ratings only, Show all irrelevant values, Pagination, Uppercase, Search box, Setup dynamic option (#20-26, 47-84 phần liên quan) **không còn dùng làm căn cứ viết test case Edit** do không khớp ảnh UI thật.

## 14. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Review Ratings filter node (Add + Edit)
- **Tài liệu liên quan:** `filter-tree-common-specs.md` (khung Edit chung), `edit-filter-node-brand-specs.md`/`edit-filter-node-condition` (feature anh em cùng pattern)
- **Nguồn:** Sheet test case `Add filter node - Review Ratings` (105 case, gid=1624344703) + ảnh UI Export Figma thật (`Edit filter node _ Review Ratings.png`, phiên trước) + SPEC PDF chính thức (`SPEC_Filter_v1.0_2025-10-14.pdf`) + sticky note Figma (ảnh chụp tay, dùng tham khảo cho Sort order/rounding rule) + ảnh BC Admin → Reviews thật (2026-08-12, mục 1.1/1.2) — **chưa đối chiếu lại được với Figma link node-id=1682-26164 mới** (Figma MCP chưa kết nối được trong phiên này)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 10
