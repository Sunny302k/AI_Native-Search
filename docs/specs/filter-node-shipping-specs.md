# Filter node - Shipping — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Add filter node - Shipping` (Google Sheet `TC_Native Search`, gid=894321096, 100 case, fetch được toàn bộ nội dung qua export gviz CSV).

**Không đọc được Figma cho Shipping** — thử lại trong phiên này (giống các lần trước với Width/Weight/Height) nhưng vẫn không có Figma MCP kết nối, không có link Figma cụ thể nào được cung cấp cho Shipping. Theo xác nhận trực tiếp của người dùng: **"Về giao diện hiển thị thì Shipping cũng tương tự như Special Offers nhưng các value của Filter Options khác... gồm: Free Shipping/Paid"** — dùng `edit-filter-node-special-offers-specs.md` làm cấu trúc tham chiếu chính (cùng pattern 2-giá-trị-cố-định: checkbox + custom label, Sort Order kéo-thả, Option Select Type, Display Style List/Grid/Toggle).

**Nguồn dữ liệu BC xác nhận qua ảnh chụp màn hình người dùng cung cấp trực tiếp** (BC Admin → Products → Edit product → tab Shipping, không phải suy đoán): section "Shipping Details" gồm 2 field — **Fixed Shipping Price** (number, đơn vị tiền tệ, không có dấu `*` → optional) và **Free Shipping** (checkbox, **mặc định UNCHECKED** khi tạo product mới — xác nhận qua ảnh). Đây khác vị trí với "Dimensions & Weight" (Weight/Width/Height/Depth) — 2 section riêng biệt trong cùng tab Fulfillment/Shipping.

**Chất lượng sheet Shipping — khác biệt đáng chú ý so với Width/Weight/Height/Special Offers**: sheet này **KHÔNG** mang dấu vết nhiễm chéo từ template Sale Percentage (không có note lạc kiểu "Thiếu text Sale Percentage" ở case #2, không có "$ thay vì %" ở case Title Alignment...) và **KHÔNG** có note bug NG lặp lại kiểu "[Storefront_Filter category/Special Offers/Sale Percentage] List product không filter theo giá trị đã chọn" từng thấy ở Category/Special Offers/Sale Percentage/Width/Weight. Sheet Shipping có vẻ được viết mới/sạch, không tái sử dụng template cũ — vì vậy **không áp dụng giả định rủi ro kế thừa** (bug NG) từ các node khác cho Shipping trừ khi có bằng chứng cụ thể. Toàn bộ case Expected Result trong sheet Shipping mô tả hành vi ĐÚNG theo thiết kế, không phải actual-bug-tracking như các sheet cũ.

## 1. Tổng quan

Shipping là filter node lọc theo **phương thức vận chuyển sản phẩm**, dựa trên field `is_free_shipping` (checkbox "Free Shipping" trên BC Product tab Shipping) — **KHÔNG dựa trên** `fixed_cost_shipping_price` (field Fixed Shipping Price hoàn toàn không ảnh hưởng phân loại, xác nhận rõ qua sheet #52/53). Đồng bộ qua Sync (`docs/sync-fields-glossary.md` xác nhận `is_free_shipping` nằm trong whitelist Products Sync trực tiếp; `fixed_cost_shipping_price` không nằm trong whitelist và không được filter này sử dụng).

Cấu trúc **giống hệt Special Offers/Featured Products** (2 giá trị cố định "Free Shipping"/"Paid", mỗi giá trị có checkbox ẩn/hiện + custom label riêng) — khác nhóm range-slider (Width/Weight/Height). Không có popup "Select filter options" — 2 giá trị được hard-code sẵn trong hệ thống, chỉ merchant có thể ẩn/hiện + đổi label, không thêm/bớt được giá trị.

## 2. General Settings

Giống hệt pattern chung mọi filter node:

| Field | Loại | Validation | Default | Nguồn |
| --- | --- | --- | --- | --- |
| Title | Text | Bắt buộc, rỗng → lỗi required | "Shipping" | #5, 6, 7, 48, 87 |
| Title text color | Color | Áp dụng ngay Preview | dark (mặc định) | #8, 9 |
| Title alignment | Radio Left/Center/Right | Áp dụng ngay Preview | Left | #10, 11 |

Không có ghi nhận bug title dài >1 dòng cho riêng Shipping trong sheet gốc (khác các node khác) — nhưng đây là bug hệ thống-wide đã xác nhận NG lặp lại ở nhiều node (Category/Special Offers/Sale Percentage/Width/Weight/Height), nên vẫn **suy luận có khả năng áp dụng** cho Shipping dù sheet không nhắc tới, đánh dấu `<cần confirm>`.

## 3. Filter Settings — Filter options

2 giá trị cố định, mỗi giá trị có checkbox + text field label riêng (giống Special Offers/Featured Products):

| Field | Mô tả | Default | Nguồn |
| --- | --- | --- | --- |
| Checkbox Free Shipping | Ẩn/hiện option trên storefront | Checked | #12, 13 |
| Checkbox Paid | Ẩn/hiện option trên storefront | Checked | #12, 13 |
| Label Free Shipping | Text field, custom label | "Free Shipping" | #13, 14 |
| Label Paid | Text field, custom label | "Paid" | #13, 15 |

Custom label không ảnh hưởng logic filter (label chỉ đổi hiển thị, giá trị lọc thực tế vẫn dựa trên `is_free_shipping` gốc — #70 Edit case xác nhận label custom "Miễn phí vận chuyển" vẫn map đúng data Free Shipping sau pre-fill). Uncheck 1 option → ẩn khỏi storefront, filter chỉ còn 1 lựa chọn (#16, 17, 19).

`[CẦN XÁC NHẬN BA]` — Uncheck cả 2 option (#18, #72): lỗi "phải có ít nhất 1 option" hay filter ẩn hoàn toàn trên storefront? Sheet ghi cả 2 khả năng, chưa chốt.

`[CẦN XÁC NHẬN BA]` — Label rỗng (#65): lỗi required hay revert về default? Sheet ghi cả 2 khả năng.

`[CẦN XÁC NHẬN BA]` — 2 option trùng label (#66, #74, VD sửa "Paid" thành "Free Shipping" y hệt label kia): có cảnh báo/chặn không, hay cho phép trùng label tự do (khác giá trị lọc thực tế bên dưới vẫn phân biệt đúng)?

## 4. Option select type

| Giá trị | Default | Nguồn |
| --- | --- | --- |
| Single | **Có** (mặc định) | #20, 21 |
| Multiple | — | #21, 22 |

Single → chọn 1 option tự deselect option kia (#22, #60). Multiple → chọn được cả 2 cùng lúc, kết quả = union 2 tập sản phẩm (#21, #61).

## 5. Filter Settings — Display Style

3 giá trị, **cả 3 đều xác nhận hoạt động đúng qua sheet** (khác Special Offers còn nghi vấn Toggle thừa — Shipping sheet case #25 xác nhận rõ ràng Toggle hoạt động bình thường, không có note NG):

| Giá trị | Default | Mô tả | Nguồn |
| --- | --- | --- | --- |
| List | **Có** (mặc định) | Dạng danh sách checkbox | #23, 26 |
| Grid | — | Dạng lưới | #24 |
| Toggle | — | Dạng toggle switch | #25 |

## 6. Filter Settings — Sort Order

Danh sách kéo-thả trực tiếp trong panel (giống Special Offers/Featured Products, không có popup chọn kiểu sort như Brand/Category):

| Field | Default | Nguồn |
| --- | --- | --- |
| Sort Order (kéo thả) | Free Shipping → Paid | #29, 30 |

Kéo thả đổi thứ tự → Preview cập nhật ngay; Save → storefront đúng thứ tự + persist sau reload/re-sync, không bị reset về default (#30, #31, #79 Edit pre-fill).

## 7. Hide on customer group

Giống pattern chung. Sheet Shipping **không có note NG** cho 2 bug đã biết ở node khác (storefront vẫn hiển thị filter dù bị hide; popup không update số lượng khi BC xoá group) — nhưng đây cũng là bug hệ thống-wide lặp lại nhiều nơi, `<cần confirm>` có áp dụng cho Shipping hay không do sheet không nhắc tới (khác hẳn với việc sheet khẳng định KHÔNG có bug).

## 8. Appearance settings

| Field | Mô tả | Default | Nguồn |
| --- | --- | --- | --- |
| Display tooltip (toggle + content) | | ON | #32, 33, 34, 35 |
| Collapse/Expand (Desktop) | | Expand | #36, 37 |
| Collapse/Expand (Mobile) | | Expand | #36, 38 |
| Display all values in uppercase form | Uppercase áp dụng lên CẢ custom label, không chỉ giá trị gốc (#42: label "Miễn phí" → hiển thị "MIỄN PHÍ") | OFF | #39, 40, 41, 42 |
| Show search box on desktop | | OFF | #43, 44 |
| Show search box on mobile | | OFF | #43, 44 |

Không có Pagination type (giống Special Offers/Featured Products, sheet Shipping cũng không có case nào cho field này).

## 9. BC field is_free_shipping — đặc thù riêng

### 9.1 BC platform fact + business rule phân loại

| Fact | Chi tiết | Độ tin cậy |
| --- | --- | --- |
| `is_free_shipping` optional, boolean | BC docs: "Flag used to indicate whether the product has free shipping. If true, the shipping cost for the product will be zero." | Cao — BC Developer Docs |
| Default = unchecked khi tạo product mới | Xác nhận qua ảnh chụp màn hình BC Admin thực tế người dùng cung cấp | Cao — ảnh thật |
| `fixed_cost_shipping_price` KHÔNG ảnh hưởng phân loại Free Shipping/Paid | Chỉ `is_free_shipping` checkbox quyết định — kể cả khi Fixed Shipping Price > 0 và Free Shipping = checked, product vẫn phân loại "Free Shipping" (#52); Fixed Shipping Price = 0 nhưng Free Shipping = unchecked vẫn phân loại "Paid" (#53) | Trung bình-cao — xác nhận trực tiếp qua sheet #52/53 (bằng chứng cụ thể), nhưng đây là cách Native Search tự implement/phân loại (Loại 2), KHÔNG phải BC platform fact — BC docs không quy định thứ tự ưu tiên giữa 2 field này |
| Digital product type có ẩn field Free Shipping không | `[CẦN XÁC NHẬN BA]` — theo suy luận pattern đã áp dụng ở Weight/Height (BC ẩn toàn bộ field shipping/fulfillment khi Digital), khả năng cao là CÓ, nhưng sheet Shipping không có case riêng test tình huống này | Thấp — thuần suy luận theo pattern, chưa có bằng chứng trực tiếp cho Shipping |

### 9.2 Storefront & Merchandising rules

| Rule | Mô tả | Nguồn |
| --- | --- | --- |
| Product `is_free_shipping`=checked → sync → phân loại "Free Shipping" | | #50 |
| Product `is_free_shipping`=unchecked → sync → phân loại "Paid" | | #51 |
| Product count đúng theo từng option | | #57 |
| Filter theo option đã chọn | Chỉ hiển thị đúng product khớp | #59, 60, 61 |
| BC đổi `is_free_shipping` → re-sync → count 2 option cùng cập nhật (giảm bên này, tăng bên kia) | | #54, 55 |
| BC đổi nhưng chưa re-sync (stale) → count giữ nguyên | | #56 |
| Product bị xoá khỏi BC → re-sync → count option tương ứng giảm | | #58 |
| Toàn bộ product cùng 1 giá trị (100% Free Shipping hoặc 100% Paid) | Option còn lại count=0 hoặc ẩn hẳn `<cần confirm>` | #63, 64 |
| Clear/deselect filter → reset toàn bộ | | #62 |
| Uncheck option đang có count → có cảnh báo trước khi Save không | `<cần confirm>` — sheet #73 tự đặt câu hỏi, chưa có Expected Result chốt | #73 |
| Uncheck rồi check lại option → count phản ánh đúng data hiện tại, không mất count do thời gian ẩn | | #71 |
| AND logic với filter khác | Suy luận theo pattern chung, sheet không có case riêng | `<cần confirm>` |
| Merchandising — product Hidden | Không tính vào count/filter | Suy luận theo pattern chung, sheet không có case riêng | `<cần confirm>` |

### 9.3 Live storefront impact (customer đang tương tác)

| Tình huống | Trước reload | Sau reload | Nguồn |
| --- | --- | --- | --- |
| Admin đổi label khi customer đang xem filter | Label cũ vẫn hiển thị (không tự cập nhật real-time) | Label mới hiển thị đúng | #95 |
| Admin uncheck option mà customer đang chọn | `<cần confirm>` — kết quả sau reload trả về toàn bộ sản phẩm do option không còn tồn tại (filter bị reset) | #96 |
| Admin đổi Single→Multiple khi customer đã chọn 1 option | Selection cũ giữ nguyên, customer chọn thêm được option còn lại | | #76 |
| Sync độc lập khi Admin đang mở Edit (chưa Save) | BC đổi `is_free_shipping` 1 product song song → sync vẫn chạy độc lập, không bị block bởi Admin đang mở Edit | | #99 |
| Preview count trên MH Edit khớp đúng count storefront tại thời điểm mở | | #100 |

## 10. Admin CRUD flow

| Flow | Mô tả | Nguồn |
| --- | --- | --- |
| Navigation | Mở đúng Edit screen, không lẫn data filter khác (Stock/Featured Products) | #67, 68 |
| Pre-fill Edit | Toàn bộ field (Title, color, Alignment, Filter options + label, Option Select Type, Display Style, Sort Order, Hide on customer group, Appearance) hiển thị đúng giá trị đã lưu, không reset default | #69-83 |
| Save Changes — partial/multi-field/no-op | | #84, 85, 86 |
| Save Changes — Title trống lỗi | | #87 |
| Save as template | Không ảnh hưởng filter gốc cho tới khi Save Changes | #88 |
| Navigation guard | Cảnh báo unsaved changes, Discard revert đúng data gốc | #89, 90 |
| Reload/đóng tab khi chưa lưu | `[CẦN XÁC NHẬN BA]` — cảnh báo native browser hay không implement | #91 |
| Delete | Chỉ có ở Edit; Confirm xoá khỏi storefront sau sync; Cancel giữ nguyên | #92, 93, 94 |
| Đổi Title không vỡ liên kết | | #98 |
| Concurrent edit | `[CẦN XÁC NHẬN BA]` — lost update hay cảnh báo conflict | #97 |

## 11. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Không có ảnh Figma cho Shipping — toàn bộ chi tiết UI cụ thể cần verify lại khi có ảnh | 0 |
| 2 | Uncheck cả 2 Filter options: lỗi required hay ẩn hoàn toàn filter trên storefront? | 3 |
| 3 | Label rỗng: lỗi required hay revert default? | 3 |
| 4 | 2 option trùng label: có cảnh báo/chặn không? | 3 |
| 5 | Bug title dài >1 dòng luôn căn trái — sheet Shipping không nhắc nhưng đây là bug hệ thống-wide, có áp dụng cho Shipping không? | 2 |
| 6 | Bug Hide on customer group (storefront vẫn hiện filter dù bị hide; popup không update count) — sheet Shipping không nhắc, có áp dụng không? | 7 |
| 7 | Digital product type có ẩn field Free Shipping giống Weight/Height không? | 9.1 |
| 8 | Toàn bộ product cùng 1 giá trị: option còn lại count=0 hay ẩn hẳn? | 9.2 |
| 9 | Uncheck option đang có count: có cảnh báo trước khi Save không? | 9.2 |
| 10 | AND logic với filter khác + rule Merchandising Hidden | 9.2 |
| 11 | Admin uncheck option mà customer đang chọn: sau reload có thực sự trả về toàn bộ sản phẩm không? | 9.3 |
| 12 | Reload/đóng tab khi chưa lưu — có cảnh báo native browser không? | 10 |
| 13 | 2 admin cùng Edit đồng thời — lost update hay cảnh báo conflict? | 10 |

## 12. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Shipping filter node (Add + Edit)
- **Tài liệu liên quan:** `filter-tree-common-specs.md`, `edit-filter-node-special-offers-specs.md` (cấu trúc tham chiếu chính, do người dùng xác nhận giao diện giống nhau), `docs/sync-fields-glossary.md` (xác nhận `is_free_shipping` Sync trực tiếp), `docs/bigcommerce-platform-facts.md` (fact `is_free_shipping` optional/boolean, không có rule ưu tiên chính thức với `fixed_cost_shipping_price`)
- **Nguồn:** Sheet test case `Add filter node - Shipping` (gid=894321096, 100 case) + ảnh chụp màn hình BC Admin thật do người dùng cung cấp (xác nhận section Shipping Details) — **chưa có ảnh UI Figma thật đối chiếu**; BC Developer Docs (Create Product API) cho phần platform fact mục 9.1
- **Số câu hỏi CẦN XÁC NHẬN BA:** 13
