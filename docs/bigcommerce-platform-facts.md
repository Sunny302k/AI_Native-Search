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
