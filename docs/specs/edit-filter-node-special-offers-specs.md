# Edit filter node - Special Offers — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Add filter node - Special Offers` (50 case, Google Sheet `TC_Native Search`, link: docs.google.com/spreadsheets/d/1ZqcAoLFr2nIdlRDj7_vIrKxi3IACrkwp, gid=1053577032), đối chiếu với pattern khung Edit chung ở `filter-tree-common-specs.md` (mục 3) và với các feature anh em cùng pattern filter node đã làm trước: `edit-filter-node-brand`/`edit-filter-node-condition`/`edit-filter-node-review-rating`/`edit-filter-node-featured-products`/`edit-filter-node-category`.

**Không có ảnh Figma UI export riêng cho Special Offers.** Đã kiểm tra file gộp `03_Filter/01_Display_Setup/02_Filter_Tree_Node_Setup/UI_Export/Edit filter node _ Condition/Featured Products/Special Offers/Stock/Shipping.png` — dưới header "Special Offers" chỉ có 1 screenshot nhưng lại là ảnh panel của node **Condition** (bị dán nhầm/tái sử dụng, không phải thiết kế riêng cho Special Offers); header "Stock" và "Shipping" hoàn toàn không có screenshot. Đã hỏi lại người dùng — được xác nhận trực tiếp: **"Về giao diện của Special Offers thì giống với giao diện của Featured Products, chỉ khác giá trị Filter options là On Sale và Not on Sale"**. Spec này viết dựa trên xác nhận đó, dùng `edit-filter-node-featured-products-specs.md` (đã được ảnh UI thật xác nhận) làm cấu trúc tham chiếu chính, kết hợp sheet Add Special Offers cho phần business rule riêng.

**Điểm lệch cần lưu ý**: sheet Add Special Offers (case #18) tự mô tả Display Style **chỉ có 2 giá trị List/Grid, không có Toggle** — và việc hệ thống hiện tại hiển thị thêm Toggle được chính sheet đánh dấu **NG** ("đang hiển thị thừa giá trị Toggle"). Điều này khác với xác nhận chung "giống Featured Products" (Featured Products có đúng 3 giá trị List/Grid/Toggle theo ảnh UI thật). Vì không có ảnh riêng đối chiếu, **giữ nguyên phát hiện cụ thể của sheet Add** (đáng tin hơn 1 câu xác nhận chung chung), đánh dấu `<cần confirm>` thay vì tự quyết theo hướng nào. Xem mục 5.

## 1. Tổng quan

Special Offers là loại filter node lọc theo **thuộc tính Sale Price** của product trên BigCommerce (Sale Price ≠ 0 → On sale; Sale Price = 0 → Not on sale), đồng bộ qua Sync. Cấu trúc giống hệt Featured Products: 2 giá trị cố định, mỗi giá trị có checkbox ẩn/hiện + custom label riêng, khác biệt duy nhất là **nguồn dữ liệu xác định giá trị** (Sale Price thay vì Featured Star) và có thêm nhóm rule riêng về **Price List không ảnh hưởng On sale status** (đặc thù Special Offers, Featured Products không có).

## 2. General Settings

Giống hệt pattern chung:

| Field | Loại | Validation | Nguồn |
| --- | --- | --- | --- |
| Title | Text | Bắt buộc, rỗng → lỗi required; default = "Special Offers" | #6, 7, 8 |
| Title text color | Color | Áp dụng ngay lên Preview | #9 |
| Title alignment | Radio Left/Center/Right | Áp dụng ngay lên Preview | #9 |

**Bug đã biết** (#9, NG — giống hệt bug đã ghi nhận ở Category #10): title dài hơn 1 dòng, Preview luôn căn trái dù chọn Center/Right.

## 3. Filter Settings — Filter options

Giống hệt cấu trúc Featured Products (2 giá trị cố định, mỗi giá trị có checkbox + text field label riêng):

| Field | Mô tả | Default | Nguồn |
| --- | --- | --- | --- |
| Checkbox On sale | Ẩn/hiện option trên storefront | Checked | #10, 11 |
| Checkbox Not on sale | Ẩn/hiện option trên storefront | Checked | #10, 11 |
| Label On sale | Text field, custom label | "On sale" | #13 |
| Label Not on sale | Text field, custom label | "Not on sale" | #13 |

Rule giống Featured Products: custom label không ảnh hưởng logic filter (#15, hiện đang **NG** — cùng root cause bug lọc storefront chung, xem mục 9); label rỗng → lỗi required (#14); uncheck 1 option → ẩn khỏi storefront (#11, OK — khác Featured Products đang NG ở case tương đương).

## 4. Option select type

| Giá trị | Default | Nguồn |
| --- | --- | --- |
| Single | **Có** (mặc định) | #16, 17 |
| Multiple | — | #17 |

Khớp Featured Products (cả 2 đều default Single) — **khác Brand/Category (default Multiple)**. Switch Single ↔ Multiple hoạt động đúng, xác nhận OK (#17) — khác Featured Products (case tương đương #18 đang NG) và Category (case tương đương #27 đang NG).

## 5. Filter Settings — Display Style

`[CẦN XÁC NHẬN BA]` — xem mục 0. Theo sheet Add:

| Giá trị | Default | Nguồn |
| --- | --- | --- |
| List | **Có** (mặc định) | #19 |
| Grid | — | #19 |
| ~~Toggle~~ | — | Case #18 (NG): hệ thống hiện đang hiển thị thừa giá trị Toggle trong dropdown, theo thiết kế **không nên có** |

Nếu xác nhận đúng theo Featured Products (có Toggle) thì đây không phải bug mà là thiếu cập nhật ở sheet Add; nếu xác nhận đúng theo sheet Add (không Toggle) thì hệ thống hiện tại đang có bug thừa option. Test case Edit viết theo giả thuyết chính là sheet Add (List/Grid, không Toggle — vì đây là ghi nhận cụ thể có dẫn chứng, đáng tin hơn suy luận chung), đánh dấu rõ cần xác nhận.

## 6. Filter Settings — Sort Order

Giống hệt Featured Products — danh sách kéo-thả trực tiếp trong panel (không có popup chọn kiểu sort như Brand/Category):

| Field | Default | Nguồn |
| --- | --- | --- |
| Sort Order (kéo thả) | On sale → Not on sale | #20, 21 |

Kéo thả đổi thứ tự → Preview cập nhật; Save → storefront đúng thứ tự + persist sau reload (#21, OK).

## 7. Hide on customer group

Giống pattern chung, nhưng **2 case đang NG**:
- Chọn customer group → storefront **vẫn hiển thị filter** dù account thuộc group đó (#22, NG — giống hệt bug đã ghi nhận ở Category #36).
- BC xoá customer group → popup **không update số lượng** hiển thị ngoài MH Edit (#23, NG — bug riêng, khác Category chỉ có bug ở phần storefront).

## 8. Appearance settings

Theo xác nhận "giống Featured Products", panel gồm: Display tooltip+content, Collapse/Expand Desktop/Mobile, Display all values in uppercase, Show search box Desktop/Mobile — **không có Pagination type** (Featured Products cũng không có, sheet Add Special Offers cũng không có case nào cho Pagination type, nhất quán).

| Field | Mô tả | Nguồn |
| --- | --- | --- |
| Display tooltip (toggle + content) | Rỗng + bật ON → cảnh báo required (#25, OK) | #24, 25 |
| Collapse/Expand (Desktop) | Default Expand | #28 |
| Collapse/Expand (Mobile) | Default Expand | #28 |
| Display all values in uppercase | Toggle, default OFF | #29 |
| Show search box on desktop | Toggle, default OFF | #30 |
| Show search box on mobile | Toggle, default OFF | #30 |

**Bug đã biết** (#26, NG): tooltip content mặc định đang hiển thị sai — design đúng phải là "Special Offers filter helps customers find items..." nhưng actual đang là "Unique filters to help you find the perfect product." (giống generic placeholder, chưa được set đúng riêng cho Special Offers).

`[CẦN XÁC NHẬN BA]` — field "Show all irrelevant values" (#27 sheet Add có case, kết quả NG do cùng root cause bug lọc storefront — không phải note "không thấy trường này" như Category/Review Ratings). Vì không có ảnh UI đối chiếu, chưa thể xác nhận field này có thực sự tồn tại trên panel Special Offers hay không (Featured Products xác nhận qua ảnh KHÔNG có field này). Giữ case với `<cần confirm>`.

## 9. Storefront & Merchandising rules

**Bug nghiêm trọng, lặp lại xuyên suốt** (giống hệt Category): storefront chọn filter Special Offers **không thực sự lọc sản phẩm** — note chung "[Storefront_Filter category/Special Offers/Sale Percentage] List product không filter theo giá trị đã chọn". Ảnh hưởng gần như toàn bộ nhóm case Integration bên dưới. Giữ nguyên rule đúng theo thiết kế, đánh dấu rõ case nào đang NG.

| Rule | Mô tả | Nguồn |
| --- | --- | --- |
| Product count | Hiển thị đúng cạnh mỗi option | #31, NG |
| Filter theo On sale/Not on sale | On sale: Sale Price ≠ 0; Not on sale: Sale Price = 0 | #32, NG |
| SRP + Category Page | Filter hoạt động đúng cả 2 nơi | #33, NG |
| AND logic với filter khác | VD Special Offers + Brand | #34, NG |
| Sale Price = 0 → Not on sale | | #35, NG |
| Sale Price ≠ 0 → On sale | | #36, NG |
| Merchandising — product Hidden | Không tính vào count, không hiện khi filter | #43, NG |
| BC set Sale Price ≠ 0 → sync → count On sale tăng, Not on sale giảm | | #37, NG |
| BC xoá Sale Price (= 0) → sync → chuyển sang Not on sale | | #38, NG |
| Product mới không Sale Price → sync → tự Not on sale | | #39, NG |
| Product mới có Sale Price → sync → tự On sale | | #40, NG |
| Product bị xoá → sync → count giảm tương ứng | | #41, NG |

**Edge case cần xác nhận với BA** (#42): Sale Price = Default Price (bằng nhau, không giảm giá thật) → tính là On sale hay Not on sale? Case gốc tự đặt câu hỏi, chưa có Expected Result rõ.

## 10. Price List không ảnh hưởng On sale status — đặc thù riêng của Special Offers

Nhóm rule này **không có ở Featured Products** — do Featured Products dựa trên Featured Star (boolean set trực tiếp), còn Special Offers dựa trên giá (Sale Price), nên phải làm rõ tương tác với Price List (PL — giá riêng theo customer group):

| Rule | Mô tả | Nguồn |
| --- | --- | --- |
| Product Not on sale (Sale Price=0) + có PL override giá thấp hơn | On sale status **không đổi** — PL không ảnh hưởng, vẫn tính Not on sale | #44, NG |
| Product On sale (Sale Price≠0) + PL giá cao hơn Sale Price | On sale status **không đổi** — vẫn tính On sale dù giá PL cao hơn | #45, NG |
| Regular customer vs PL customer | Thấy **cùng 1 status** On sale/Not on sale — status là global, không phân biệt theo customer group | #46, NG |
| Bỏ PL assignment | On sale/Not on sale count **không đổi** — xác nhận PL hoàn toàn không liên quan | #47, NG |

Toàn bộ nhóm case này hiện đang NG (cùng root cause bug lọc storefront), nhưng **rule nghiệp vụ quan trọng cần giữ đúng khi verify lại ở Edit**: On sale status chỉ phụ thuộc Sale Price gốc trên BC, hoàn toàn độc lập với Price List.

## 11. Edge case — câu hỏi mở

| Case | Mô tả | Nguồn |
| --- | --- | --- |
| Uncheck cả 2 option | Actual: hiển thị error "Filter options is required" ngay khi save — khác Featured Products (case tương đương #49 chỉ tự ghi confirm với team, chưa có actual rõ) | #48, OK — đã có answer rõ, không còn là câu hỏi mở |
| Không có product nào On sale | Count = 0 nếu Show all irrelevant values = ON, ẩn nếu OFF — lưu ý field này đang cần xác nhận tồn tại (mục 8) | #49, NG |
| Tất cả product đều On sale | Not on sale count = 0, tương tự case trên | #50, NG |

## 12. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Display Style của Special Offers có đúng là chỉ List/Grid (không Toggle) như sheet Add ghi nhận, hay phải giống Featured Products có cả Toggle (và việc thiếu Toggle mới là bug)? | 0, 5 |
| 2 | Field "Show all irrelevant values" có thực sự tồn tại trên panel Edit filter node - Special Offers không? (Featured Products xác nhận qua ảnh UI thật là KHÔNG có) | 8 |
| 3 | Sale Price = Default Price (bằng nhau) → tính On sale hay Not on sale? | 9, edge case #42 |

## 13. Lưu ý về thực thi (không phải spec, chỉ tham khảo)

Tỷ lệ case NG cao, cùng root cause với Category: bug lọc storefront không hoạt động theo filter đã chọn — ảnh hưởng gần như toàn bộ nhóm Integration (#31→47). Ngoài ra có 3 bug riêng: tooltip content mặc định sai (#26), Hide on customer group không update count khi BC xoá group (#23), Display Style thừa giá trị Toggle (#18). Case #48 (uncheck cả 2 option) là case hiếm hoi đã có actual behavior rõ ràng (error message), không cần đặt `<cần confirm>`.

## 14. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Special Offers filter node (Add + Edit)
- **Tài liệu liên quan:** `filter-tree-common-specs.md`, `edit-filter-node-featured-products-specs.md` (cấu trúc tham chiếu chính, do người dùng xác nhận giao diện giống nhau), `edit-filter-node-category-specs.md` (cùng root cause bug lọc storefront)
- **Nguồn:** Sheet test case `Add filter node - Special Offers` (50 case) + xác nhận bằng lời của người dùng về giao diện giống Featured Products (không có ảnh Figma riêng)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 3
