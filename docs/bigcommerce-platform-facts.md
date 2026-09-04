# BigCommerce Platform Facts

## 0. Vai trò

Lưu các fact đã tra cứu được về **hành vi/data model của chính nền tảng BigCommerce** — dùng để thay `<cần confirm>` gửi BA bằng câu trả lời có căn cứ, cho đúng loại câu hỏi mà BA cũng sẽ không tự trả lời được (vì đó là hành vi cố định của BC, không phải quyết định nghiệp vụ của Native Search).

File này **bổ sung**, không thay thế `docs/sync-fields-glossary.md` (glossary đó nói entity nào được sync; file này nói hành vi/data model của entity đó bên phía BC).

## 1. Phân loại câu hỏi trước khi tra cứu

Trước khi tra, luôn xác định câu hỏi thuộc loại nào — **chỉ Loại 1 mới tra ở đây**:

- **Loại 1 — BC platform fact**: câu hỏi về cách BigCommerce tự vận hành, không phụ thuộc Native Search implement thế nào. VD: "BC xoá Order là hard delete hay soft delete/archive?", "Xoá Customer Group thì Customer thành viên có bị xoá theo không?", "BC có giới hạn số lượng Customer Group không?". → tra BigCommerce Developer Docs.
- **Loại 2 — Native Search implementation choice**: câu hỏi về việc Native Search *chọn* phản ứng thế nào trước 1 trạng thái/sự kiện của BC — bản thân BC không quyết định điều này. VD: "Product bị hidden trên BC có bị Native Search coi là 'removed' khỏi index không?", "Khi customer group nguồn bị xoá, Native Search tự hiện lại filter hay giữ ẩn theo cache cũ?". → **KHÔNG tra được ở đây**, giữ nguyên `<cần confirm>` gửi BA.

Nếu phân vân câu hỏi thuộc loại nào, mặc định coi là Loại 2 (gửi BA) — không tự suy diễn 1 câu hỏi vốn cần quyết định nghiệp vụ thành fact kỹ thuật để né hỏi BA.

## 2. Cách dùng

1. Gặp câu hỏi mở Loại 1 (trong `extract-figma-spec` bước Câu hỏi mở, hoặc `create-sync-testcase` bước xác định trạng thái nguồn BC) → tra bảng mục 3 trước, xem đã có fact chưa.
2. Nếu chưa có, tra cứu qua BigCommerce Developer Docs (`developer.bigcommerce.com`) qua `WebFetch`/`WebSearch`, ghi fact + nguồn (URL cụ thể) + ngày tra vào bảng mục 3.
3. Nếu BC docs không nói rõ hoặc mâu thuẫn nhau → vẫn giữ `<cần confirm>`, không tự suy đoán để lấp khoảng trống.
4. Fact tra được là hành vi **của nền tảng BC nói chung** — không phải cấu hình riêng của 1 store cụ thể (BC cho phép tuỳ chỉnh 1 số hành vi qua setting/app cài thêm) — vẫn nên verify lại thực tế trên store đang test khi có điều kiện, đặc biệt với case rủi ro cao.

## 3. Danh sách fact đã xác nhận

| Entity | Câu hỏi (Loại 1) | Fact | Nguồn | Ngày tra |
| --- | --- | --- | --- | --- |
| Orders | BC "xoá" order qua API là hard delete hay soft delete? | **Soft delete/archive** — endpoint `DELETE /orders/{order_id}` (Orders V2) có mô tả chính thức là **"Archives an order"**, không xoá vĩnh viễn khỏi hệ thống BC. | [Archive Order — BigCommerce Docs](https://docs.bigcommerce.com/developer/api-reference/rest/admin/management/orders/delete-order) | 2026-07-16 |
| Price List Assignments | Rule ưu tiên khi 1 product/customer group có nhiều Price List Assignment? | BC dùng cơ chế **"cascading price lists"**: mỗi price list có tối đa 1 "layer" (price list dự phòng). Thứ tự resolve giá: (1) primary price list gắn đúng context (channel + customer group) → (2) nếu không có giá ở đó, check layer → (3) nếu vẫn không có, fallback về catalog price gốc. **Lưu ý**: tính năng này được BC gắn nhãn "beta" tại thời điểm tra — cần xác nhận lại nếu store đang test dùng bản GA hay vẫn beta. | [Cascading price lists — BigCommerce Docs](https://docs.bigcommerce.com/developer/docs/beta/cascading-price-lists/overview) | 2026-07-16 |
| Products — Weight | Field Weight trên BC Product (tab Fulfillment) là required hay optional? Kiểu dữ liệu/đơn vị? | **Required** khi tạo product qua API — BC docs mô tả rõ "Weight of the product... This is based on the unit set on the store". Kiểu **float**, không có default value/min-max cố định trong docs API (đơn vị KGS/LBS/OZ/G do setting đơn vị cân nặng của store quyết định, không phải field tự chứa đơn vị). **Khác Width/Height/Depth** (cùng nhóm Fulfillment nhưng optional — đã xác nhận ở `filter-node-width-specs.md` mục 1). | [Create Product — BigCommerce Docs](https://docs.bigcommerce.com/developer/api-reference/rest/admin/catalog/products/create-product.md) | 2026-08-12 |
| Products — Weight/Width/Height/Depth | BC có ẩn/disable field Weight (và các field kích thước khác) khi Product Type = "Digital" không? | **Có khả năng cao là có** — nhiều nguồn (BC Support "Creating Digital Products", các bài tổng hợp shipping BC) mô tả nhất quán: sản phẩm Digital bỏ hẳn field vật lý/shipping (bao gồm Weight) vì không cần giao hàng vật lý. **Độ tin cậy: trung bình** — không fetch được nguyên văn đoạn text xác nhận trực tiếp từ trang support chính thức (trang bị lỗi load qua WebFetch), chỉ có kết quả tổng hợp qua WebSearch. Khớp với chính sheet test case Weight gốc (case #84, #85 giả định đúng hành vi này). Nên re-verify bằng ảnh/thao tác thật trên 1 BC store khi có điều kiện trước khi coi là fact chắc chắn 100%. | [Creating Digital Products — BigCommerce Support](https://support.bigcommerce.com/s/article/Creating-Downloadable-Products) (chưa fetch được nguyên văn), WebSearch tổng hợp 2026-08-12 | 2026-08-12 |
| Products — Condition | Field `condition` trên BC Product có phải enum cố định không, gồm những giá trị nào? | **Có, enum cố định 3 giá trị**: `New`, `Used`, `Refurbished` — không phải danh sách tự do do merchant tự thêm/xoá (khác Brand — dynamic list). Đi kèm field `is_condition_shown` (boolean) quyết định condition có hiển thị ra trang product storefront (mặc định BC) hay không — field này độc lập với việc Native Search filter có dùng condition để filter hay không. | [Create Product — BigCommerce Docs](https://docs.bigcommerce.com/developer/api-reference/rest/admin/catalog/products/create-product) | 2026-08-13 |
| Products — is_free_shipping | Field "Free Shipping" trên BC Product (tab Shipping) là required hay optional? Kiểu dữ liệu? Quan hệ với Fixed Shipping Price? | **Optional**, kiểu **boolean**. Mô tả chính thức: "Flag used to indicate whether the product has free shipping. If true, the shipping cost for the product will be zero." BC docs **không** mô tả rule ưu tiên/tương tác giữa `is_free_shipping` và `fixed_cost_shipping_price` khi cả 2 cùng được set — đây không phải BC platform fact mà là cách riêng Native Search tự phân loại Free Shipping/Paid (xem `filter-node-shipping-specs.md` mục 9.1, dựa theo bằng chứng trực tiếp từ sheet test case #52/53: chỉ `is_free_shipping` quyết định, `fixed_cost_shipping_price` không ảnh hưởng phân loại). | [Create Product — BigCommerce Docs](https://docs.bigcommerce.com/developer/api-reference/rest/admin/catalog/products/create-product.md) | 2026-08-13 |
| Products — Options/Modifiers | BC Product Options/Modifiers có cấu trúc field gì (option name, values, type)? | BC (V3 API) tách làm **2 khái niệm riêng**: (1) **Product Variant Options** — option tạo ra SKU/variant riêng (VD Size, Color), quyết định warehouse/inventory pick; (2) **Product Modifiers** — option **không** tạo variant/SKU mới (VD gift message, engraving), gồm nhóm choice-based (`dropdown`, `radio_buttons`, `rectangles`, `swatch`, `checkbox`, `product_list`, `product_list_with_images`) và text-based (`text`, `multi_line_text`, `numbers_only_text`, `date`, `file`). Cả 2 đều có field **`display_name`** (tên Option) + mảng **`option_values`** — mỗi value có **`label`** (text hiển thị storefront) + `sort_order`, riêng choice-based có thêm `is_default` (trừ swatch) + adjuster giá/weight/image. Legacy V2 gộp chung 2 khái niệm này thành 1 "Option"/"Option Set" (field tương đương: `display_name`, `sort_order`, `is_required`, mảng `values` gồm `label`/`sort_order`/`value`/`option_value_id`). **Chưa xác nhận** Native Search "Product options" filter node lấy dữ liệu từ Variant Options, Modifiers, hay cả 2 gộp lại — cũng chưa xác nhận entity này có nằm trong whitelist Sync hay không (xem `sync-fields-glossary.md`, hiện KHÔNG có trong 9 entity đã confirm) → giữ `<cần confirm>` cho phần này (Loại 2). | [Product Modifiers — BigCommerce Docs](https://docs.bigcommerce.com/docs/rest-catalog/product-modifiers), [Product Variant Options — BigCommerce Dev Center](https://developer.bigcommerce.com/docs/rest-catalog/product-variant-options), [Option Set Options (legacy V2) — BigCommerce Docs](https://docs.bigcommerce.com/legacy/v2-catalog-products/v2-option-set-options) | 2026-08-21 |
| Pages / Blog Posts | "Blog" trong test case có phải cùng entity với "Pages" không? | **Không hoàn toàn** — Blog Posts có API resource riêng biệt (`/blog/posts`), tách biệt khỏi Pages API. Pages API có hỗ trợ 1 page-type gọi là "blog" (trang danh sách blog), nhưng từng **bài viết blog cụ thể** được quản lý qua Blog Posts API, không phải Pages API. → Đây là 2 entity kỹ thuật khác nhau ở tầng BC, dù cùng thuộc nhóm "nội dung". **Vẫn còn phần Loại 2 chưa giải quyết**: whitelist `sync-fields-glossary.md` (dựng từ tài liệu Sync nội bộ) chỉ liệt kê "Pages" — chưa rõ module Sync của Native Search coi Blog Posts là 1 phần của "Pages" hay đồng bộ như 1 entity riêng biệt không được liệt kê — câu hỏi này **vẫn cần hỏi BA/dev Sync**, không phải BC. | [Blog Posts API](https://developer.bigcommerce.com/docs/rest-content/store-content/blog-posts), [Pages API](https://docs.bigcommerce.com/docs/rest-content/pages) | 2026-07-16 |

### Đã tra nhưng KHÔNG tìm được câu trả lời rõ ràng (giữ nguyên `<cần confirm>`)

| Entity | Câu hỏi | Kết quả tra |
| --- | --- | --- |
| Categories | Xoá category qua API là hard delete hay soft delete? Product từng thuộc category đó bị gì? | Trang docs chính thức (`docs.bigcommerce.com/docs/store-operations/catalog/categories`, endpoint Delete Categories) trả 404 khi fetch trực tiếp; kết quả search chỉ xác nhận cần filter param, không nói rõ hard/soft delete. Không tìm được câu trả lời dứt khoát — **giữ `<cần confirm>`**. |
| Customers | Xoá customer thì Order liên quan bị ảnh hưởng thế nào (orphan/giữ nguyên/cascade)? | Không tìm được tài liệu chính thức nào nêu rõ hành vi này (đã search + fetch nhiều nguồn). **Giữ `<cần confirm>`**. |

## 4. Câu hỏi đã xác định là Loại 2 (không tra ở đây, đã/đang gửi BA)

Ghi lại để không tốn công tra lại nhầm — các câu hỏi dưới đây đã xác định là quyết định riêng của Native Search, không có trong BC docs:

| Câu hỏi | Xuất hiện ở |
| --- | --- |
| Product bị disabled/hidden ở BC có được coi là "removed" khỏi Native Search không? | `sync-data-type-matrix-specs.md` |
| Gỡ product khỏi channel storefront: loại khỏi search/index hay chỉ mất mapping channel? | `sync-data-type-matrix-specs.md` |
| Khi customer group nguồn bị xoá, Native Search tự hiện lại filter hay giữ ẩn theo cache cũ? | `edit-filter-node-condition`, `edit-filter-node-brand` |
| Sync đang In Progress thì Storefront hiển thị dữ liệu theo config cũ hay mới? | Nhiều spec (Manual Sync, Filter Options...) |
