# Edit filter node - Featured Products — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Add filter node - Featured Products` (52 case, Google Sheet `TC_Native Search`, link: docs.google.com/spreadsheets/d/1ZqcAoLFr2nIdlRDj7_vIrKxi3IACrkwp, gid=1040797028), đối chiếu với pattern khung Edit chung ở `filter-tree-common-specs.md` (mục 3), với `edit-filter-node-brand`/`edit-filter-node-condition`/`edit-filter-node-review-rating` (feature anh em cùng pattern filter node), và với **ảnh UI Export Figma thật**: `03_Filter/01_Display_Setup/02_Filter_Tree_Node_Setup/UI_Export/Edit filter node _ Condition/Featured Products/Special Offers/Stock/Shipping.png` (đã crop vùng "Featured Products" ở độ phân giải gốc để đọc).

**Khác với Review Ratings** (spec trước đó phải viết lại toàn bộ do nhiều xung đột giữa sheet Add và ảnh UI) — với Featured Products, **ảnh UI khớp rất cao với sheet Add**: sticky note + panel field trên ảnh xác nhận đúng gần như toàn bộ nội dung sheet Add đã mô tả (Filter options Is Featured/Not Featured, Option select type Single mặc định, Display Style List/Grid/Toggle, Sort Order kéo thả, Appearance Settings). Không cần flag nhiều xung đột như Review Ratings.

**Điểm khác biệt duy nhất phát hiện được**: sheet Add có 2 case (#32 Show all irrelevant values, #33 Pagination type) nhưng **ảnh UI panel Appearance Settings không có 2 field này** — giống hệt phát hiện đã ghi nhận ở Review Ratings (khả năng 2 field này thuộc tầng setting chung của Filter, không phải field riêng trên màn Edit node). Xem mục 8.

## 1. Tổng quan

Featured Products là 1 loại filter node lọc theo **thuộc tính Featured Star** của product trên BigCommerce (BC Admin → Product → Storefront Details → "Set as a Featured Product on my Storefront"), đồng bộ qua Sync. Chỉ có đúng **2 giá trị cố định**: Is Featured / Not Featured — tương tự Condition (giá trị cố định, không dynamic như Brand) nhưng Condition có 3 giá trị còn Featured Products chỉ có 2, và mỗi giá trị ở Featured Products còn cho phép **ẩn/hiện riêng qua checkbox** + **custom label riêng** (khác Condition).

## 2. General Settings

Giống hệt pattern Brand/Condition/Review Ratings, xác nhận đúng trên ảnh UI:

| Field | Loại | Validation | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- | --- |
| Title | Text | Bắt buộc, rỗng → lỗi required; default = "Featured Products" | Config nội bộ | Ảnh UI + #6, 7, 8 |
| Title text color | Color | Áp dụng ngay lên Preview | Config nội bộ | Ảnh UI + #9 |
| Title alignment | Radio Left/Center/Right | Áp dụng ngay lên Preview | Config nội bộ | Ảnh UI + #10 |

## 3. Filter Settings — Filter options

Khác Brand (dynamic values) và Condition (3 giá trị cố định, không có checkbox ẩn/hiện riêng từng giá trị) — Featured Products có **2 giá trị cố định, mỗi giá trị có checkbox riêng (ẩn/hiện) + text field label riêng** (xác nhận trên ảnh UI: 2 dòng "☑ Is Featured" + text field "Is Featured", "☑ Not Featured" + text field "Not Featured"):

| Field | Mô tả | Default | Nguồn |
| --- | --- | --- | --- |
| Checkbox Is Featured | Ẩn/hiện option này trên storefront | Checked | Ảnh UI + #11, 12 |
| Checkbox Not Featured | Ẩn/hiện option này trên storefront | Checked | Ảnh UI + #11, 12 |
| Label Is Featured | Text field, custom label hiển thị storefront thay cho tên mặc định | "Is Featured" | Ảnh UI + #14, 15 |
| Label Not Featured | Text field, custom label hiển thị storefront thay cho tên mặc định | "Not Featured" | Ảnh UI + #14, 15 |

**Rule quan trọng**: custom label KHÔNG ảnh hưởng logic filter — product đã set Featured Star trên BC vẫn được lọc đúng dù label hiển thị đổi tên khác (#16). Label rỗng → lỗi required, không cho save (#15). Uncheck 1 option → option đó ẩn khỏi storefront, nhưng **case gốc #12 hiện đang NG** (uncheck không ẩn đúng) — cần lưu ý khi verify lại ở Edit.

## 4. Option select type

Xác nhận khớp cả sheet Add lẫn ảnh UI (sticky note "OPTION SELECT TYPE: Single / Multiple"), **không có xung đột** như Review Ratings:

| Giá trị | Default | Nguồn |
| --- | --- | --- |
| Single | **Có** (mặc định) — khớp ảnh UI (dropdown hiện "Single") và sheet Add (#17) | Ảnh UI + #17, 18 |
| Multiple | — | #18 |

Switch Single ↔ Multiple: Multiple cho phép chọn đồng thời cả Is Featured và Not Featured trên storefront; Single chỉ cho phép chọn 1, chọn option mới tự bỏ option cũ (#18, đã xác nhận OK).

## 5. Filter Settings — Display Style

Xác nhận khớp cả sheet Add lẫn ảnh UI (sticky note "DISPLAY STYLE: List / Grid / Toggle"):

| Giá trị | Default | Nguồn |
| --- | --- | --- |
| **List** | **Có** (mặc định) — khớp ảnh UI (dropdown hiện "List") và sheet Add (#20) | Ảnh UI + #19, 20 |
| Grid | — | #19, 21 |
| Toggle | — | #19, 21, 22, 23 |

Khác Brand (List/Grid/**Swatch**) và Review Ratings (**Star**/List/Grid) — Featured Products dùng **Toggle** thay vì Star/Swatch làm giá trị thứ 3. Đây là điểm khác biệt cấu trúc riêng của Featured Products.

**Case đang NG cần lưu ý khi verify lại ở Edit**: cả 3 case liên quan Display Style render đều đang **NG** trong sheet gốc — #21 (3 style render đúng design trên Preview), #22 (Toggle style render đúng trên storefront), #23 (Toggle + Single select behavior — chỉ 1 toggle active tại 1 thời điểm).

## 6. Filter Settings — Sort Order

**Khác biệt cấu trúc quan trọng so với Brand/Condition/Review Ratings**: ở 3 node đó, Sort Order là 1 field hiển thị giá trị hiện tại (VD "Alphabetical - Ascending") kèm button [Edit] mở popup chọn kiểu sort (Alphabetical/Product number/Custom order). Ở Featured Products, **ảnh UI xác nhận KHÔNG có field chọn kiểu sort** — thay vào đó là 1 **danh sách kéo-thả trực tiếp ngay trong panel** (2 dòng "Is Featured" / "Not Featured", mỗi dòng có icon drag `≡`), tương đương hành vi "Custom order" của các node khác nhưng là cách duy nhất (không có option Alphabetical/Product number vì chỉ có 2 giá trị cố định, sort theo tên hay theo count không có nhiều ý nghĩa).

| Field | Mô tả | Default | Nguồn |
| --- | --- | --- | --- |
| Sort Order (kéo thả) | 2 item Is Featured / Not Featured, icon drag mỗi item | Is Featured → Not Featured | Ảnh UI + #24, 25, 26 |

Kéo thả đổi thứ tự → Preview cập nhật ngay (#25); Save → storefront phản ánh đúng thứ tự mới + giữ nguyên sau reload, không reset về mặc định (#26).

## 7. Hide on customer group

Giống hệt pattern đã xác nhận ở Brand/Condition/Review Ratings — không có điểm khác biệt riêng của Featured Products:

| Field | Nguồn |
| --- | --- |
| Click [Edit] → popup [Select customer group] | Ảnh UI + #27 |
| Search partial match | #27 |
| Chọn group → ẩn filter đúng (Storefront) | #27 |
| Số lượng selected cập nhật đúng ngoài MH | #27 |
| BC xoá customer group → biến mất khỏi popup | #28 |

## 8. Appearance settings

Ảnh UI xác nhận panel Appearance Settings gồm đúng các field sau (đầy đủ hơn Review Ratings, gần với pattern Brand/Condition nhưng thiếu 2 field):

| Field | Mô tả | Nguồn |
| --- | --- | --- |
| Display tooltip (toggle + content) | Content mặc định "Featured Products helps to find recom..."; rỗng + bật ON → cảnh báo required | Ảnh UI + #29, 30, 31 |
| Collapse/Expand (Desktop) | Dropdown, default Expand | Ảnh UI + #34 |
| Collapse/Expand (Mobile) | Dropdown, default Expand | Ảnh UI + #34 |
| Display all values in uppercase form | Toggle, default OFF | Ảnh UI + #35 |
| Show search box on desktop | Toggle, default OFF | Ảnh UI + #36 |
| Show search box on mobile | Toggle, default OFF | Ảnh UI + #36 |

**KHÔNG có trên màn này** (dù sheet Add có case #32, #33): Show all irrelevant values, Pagination type. Giống hệt phát hiện đã ghi nhận ở `edit-filter-node-review-rating-specs.md` — 2 field này nhiều khả năng thuộc tầng setting chung của Filter (Advanced Setting/Data Setting), không phải field riêng trên màn Edit node. Case #33 (Pagination) trong sheet gốc đang **SKIP**, case #32 (Show all irrelevant values) không có cột Tester/Result — cả 2 đều chưa có bằng chứng thực thi thật để đối chiếu ngược lại ảnh UI.

`[CẦN XÁC NHẬN BA]` — xem câu hỏi #1, mục 11.

## 9. Storefront & Merchandising rules

| Rule | Mô tả | Nguồn |
| --- | --- | --- |
| Product count | Hiển thị cạnh mỗi option (VD "Is Featured (5)") — case gốc #37 đang **NG** | #37 |
| Filter theo Is Featured/Not Featured | Is Featured → chỉ product có Featured Star trên BC; Not Featured → chỉ product không có | #38 |
| Count accuracy | Count phải khớp chính xác số product tương ứng trong BC — case gốc #39 đang **NG** | #39 |
| Tích hợp SRP/Category Page | Filter hiển thị và hoạt động đúng ở cả 2 nơi | #40, 41 |
| AND logic với filter khác | VD Featured Products + Brand — case gốc #42 đang **NG** | #42 |
| Merchandising — product Hidden | Không tính vào count, không hiện khi filter | #43 |
| Set Featured Star trên BC → sync → count Is Featured tăng, Not Featured giảm | | #44, 45 |
| Product mới không set star → sync → tự tính vào Not Featured | | #46 |
| Product mới có set star → sync → tự tính vào Is Featured | | #47 |
| Product bị xoá trên BC → sync → count giảm tương ứng | | #48 |

## 10. Edge case — câu hỏi mở chưa có Expected Result rõ ràng trong sheet gốc

| Case | Mô tả | Nguồn |
| --- | --- | --- |
| Uncheck cả 2 option Is Featured + Not Featured | Filter không hiển thị option nào — case gốc tự ghi "confirm với team: ẩn cả filter node hay hiện empty state" | #49 |
| Is Featured count = 0 (không có product nào set star) | Hiển thị count = 0 nếu Show all irrelevant values = ON, ẩn nếu OFF — **lưu ý mục 8: field Show all irrelevant values không có trên ảnh UI**, case gốc mâu thuẫn với chính phát hiện này | #50 |
| Not Featured count = 0 (100% product đều set star) | Tương tự case #50 | #51 |
| Toggle style + chỉ 1 option visible (option kia bị uncheck) | Case gốc tự ghi "confirm behavior với team khi Toggle có 1 option" | #52 |

## 11. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Show all irrelevant values / Pagination type: sheet Add có case nhưng ảnh UI không có field — 2 field này có thuộc màn Edit filter node - Featured Products không, hay ở tầng setting khác? (Câu hỏi giống hệt đã đặt ở Review Ratings) | 8 |
| 2 | Uncheck cả 2 option Is Featured/Not Featured → filter node tự ẩn hẳn khỏi storefront hay hiện empty state? | 10 |
| 3 | Show all irrelevant values (nếu xác nhận có tồn tại) áp dụng thế nào cho case count=0 ở #50, #51 — vì field này dường như không có trên UI theo mục 8? | 10 |
| 4 | Display Style = Toggle khi chỉ 1 option còn visible (option kia bị uncheck) — storefront hiển thị 1 toggle duy nhất hay có hành vi khác? | 5, 10 |

## 12. Lưu ý về thực thi (không phải spec, chỉ tham khảo)

Case đang **Fail (NG)** đáng chú ý trong sheet gốc: #12 (uncheck option không ẩn đúng trên storefront), #21 (3 Display Style không render đúng design), #22 (Toggle style không render đúng trên storefront), #23 (Toggle + Single select behavior sai), #37 (product count hiển thị sai), #39 (count không khớp data BC), #42 (AND logic với filter khác sai). Case #33 (Pagination type) đang **SKIP**, chưa từng thực thi. Nhóm case #44-51 (BC → Sync → Storefront, Edge case) không có cột Tester/Result — chưa rõ đã thực thi hay chỉ là case thiết kế lý thuyết.

## 13. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Featured Products filter node (Add + Edit)
- **Tài liệu liên quan:** `filter-tree-common-specs.md` (khung Edit chung), `edit-filter-node-brand-specs.md`/`edit-filter-node-condition`/`edit-filter-node-review-rating-specs.md` (feature anh em cùng pattern)
- **Nguồn:** Sheet test case `Add filter node - Featured Products` (52 case) + ảnh UI Export Figma thật (`Edit filter node _ Condition/Featured Products/Special Offers/Stock/Shipping.png`, vùng "Featured Products")
- **Số câu hỏi CẦN XÁC NHẬN BA:** 4
