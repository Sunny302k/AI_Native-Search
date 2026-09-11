# Sync Fields Glossary — Native Search

Whitelist entity/field được đồng bộ (sync) từ BigCommerce về Native Search (qua Elasticsearch). Dùng để tra cứu khi gắn nhãn nguồn dữ liệu cho từng field lúc extract spec từ Figma (`extract-figma-spec`) hoặc lúc phân loại field trong bất kỳ spec nào khác.

Nguồn: tài liệu Sync (`SPEC_Sync_v1.0`, `SPEC_Sync_Readme`, `SPEC_Sync_DataFlow`) trong kho tài liệu tham khảo `Auto Test/Native-Search` (chỉ đọc tham khảo, không thao tác ghi trong đó — xem Ràng buộc #1 ở `CLAUDE.md`).

## Cách dùng

Khi gặp 1 field cần gắn nhãn nguồn dữ liệu, đối chiếu theo thứ tự:

1. Field/entity trùng tên hoặc là thuộc tính của 1 trong 8 entity dưới đây → **Sync trực tiếp**.
2. Field không nằm trong danh sách nhưng rõ ràng do Native Search tự tính toán/tổng hợp TỪ dữ liệu đã sync (ranking, score, trending...) → **Tính toán từ dữ liệu sync**.
3. Field không liên quan gì tới danh sách dưới, do Native Search tự định nghĩa (toggle, display option, sort order, pagination type...) → **Config nội bộ**.
4. Không đủ căn cứ để xếp vào 1 trong 3 loại trên → gắn `[CẦN XÁC NHẬN BA]`, không tự đoán.

## 11 entity được sync từ BigCommerce

1. Categories
2. Customers
3. Orders
4. Pages
5. Price List Assignments
6. Product Category Assignment
7. Product Channel Assignment
8. Products — field cụ thể đã được liệt kê trong tài liệu Sync:
   - name
   - description
   - price
   - calculated_price
   - brand
   - availability
   - condition
   - is_featured
   - is_free_shipping
   - type
   - categories
   - weight / width / depth / height
   - bin_picking_number
9. **Reviews** (Product Reviews) — `[BỔ SUNG 2026-08-12, chưa đối chiếu tài liệu Sync gốc]` — chưa từng xuất hiện trong 8 entity trên dù đã có bằng chứng gián tiếp khá mạnh: `edit-filter-node-review-rating-specs.md` (dựa SPEC PDF Filter — "Get all 'approved' reviews of a product → From reviews rating -> calculate") xác nhận Review Ratings filter đọc dữ liệu review đã sync để tính average rating; ảnh chụp màn hình BC Admin → Reviews (2026-08-12) xác nhận cấu trúc field: Product, Review Title, Review (nội dung), Author, Status (Approved/Disapproved), Rating (1-5 sao), Date. Đây là **field-level detail suy ra từ 1 feature cụ thể (Filter) + ảnh BC Admin, KHÔNG phải đọc trực tiếp tài liệu Sync gốc** như 8 entity trên — độ tin cậy thấp hơn, cần đối chiếu lại `SPEC_Sync` gốc khi có điều kiện để nâng lên cùng mức tin cậy.
10. **Product Variant Options** (BC gọi là "Product Options" → tab Variations → Variant Options, KHÔNG phải Modifiers) — `[BỔ SUNG 2026-08-21, chưa đối chiếu tài liệu Sync gốc]` — bằng chứng: ảnh chụp BC Admin thật (product mẫu "TShirt_24", 2026-08-21) xác nhận cấu trúc field Option Name (`display_name`)/Type (Dropdown, Rectangle List...)/Values (label), và Variants (tổ hợp value → SKU/Default Price/Purchasable status); người dùng xác nhận trực tiếp dữ liệu này được sync về filter node "Product options" (popup [Select filter options]: Option name pane = Option Name, Values pane = Values kèm product count tính từ Purchasable/SKU). Modifier Options (khác Variant Options) ở cùng ảnh đang rỗng ("No modifier option has been added yet") nên **chưa có bằng chứng Modifiers cũng được sync** — chỉ Variant Options được coi là Sync trực tiếp tại thời điểm này. Đây là **field-level detail suy ra từ 1 feature cụ thể (Filter node Product options) + ảnh BC Admin do người dùng cung cấp, KHÔNG phải đọc trực tiếp tài liệu Sync gốc** — độ tin cậy thấp hơn, cần đối chiếu lại `SPEC_Sync` gốc khi có điều kiện.

11. **Product Custom Fields** (BC → Product → mục "Custom Fields") — `[BỔ SUNG 2026-09-08, chưa đối chiếu tài liệu Sync gốc]` — bằng chứng: ảnh chụp BC Admin thật (product mẫu "TShirt_7", 2026-09-08) xác nhận cấu trúc: mỗi product khai báo được **nhiều cặp `Custom Field Name` – `Custom Field Value`** (cả 2 đều bắt buộc — có dấu `*`; placeholder mẫu "e.g. Wine Vintage" / "1998"), thêm cặp mới qua link `+ Add Custom Fields`, xoá từng cặp qua icon trừ. Mô tả của BC: *"Custom fields allow you to specify additional information that will appear on the products page… appear automatically in the product's details if they are defined on the product."* Người dùng xác nhận trực tiếp (2026-09-08): nguồn **"Custom fields" trong Merge Values lấy đúng dữ liệu từ trường này**. Đây là **field-level detail suy ra từ ảnh BC Admin do người dùng cung cấp, KHÔNG phải đọc trực tiếp tài liệu Sync gốc** — cần đối chiếu lại `SPEC_Sync` gốc khi có điều kiện.

**Lưu ý về Metafields** (2026-09-08): BC Metafields từng được cân nhắc làm 1 nguồn dữ liệu cho Merge Values, nhưng người dùng đã **quyết định bỏ khỏi phạm vi** — không cần xác định cơ chế sync, không viết test case cho nguồn này. Metafields vẫn tồn tại như 1 field trong Search Relevance (mặc định OFF), không liên quan Filter/Merge Values.

Chỉ **Products** có field-level detail trong tài liệu Sync gốc. 8 entity còn lại (trừ Reviews và Product Variant Options mới bổ sung) mới chỉ có tên entity, chưa rõ field cụ thể — nếu gặp 1 field cụ thể thuộc các entity này mà không chắc có nằm trong phạm vi sync hay không, dùng `[CẦN XÁC NHẬN BA]` thay vì suy đoán field đó có/không được sync.

**Trường hợp ngoại lệ đã ghi nhận — Customer Groups**: entity "Customers" ở trên chỉ xác nhận qua tài liệu Sync gốc ở mức entity (khách hàng), KHÔNG có bằng chứng tài liệu Sync gốc xác nhận riêng "Customer Group" (nhóm khách hàng) có được sync hay không. Tuy nhiên có bằng chứng gián tiếp từ test case (`Add filter node - Condition`, case "Hide on customer group - Popup": *"Danh sách data sync từ BigCommerce"*) cho thấy Customer Group thực tế có được sync. Tạm coi Customer Group là **Sync trực tiếp** dựa trên bằng chứng này, nhưng đây KHÔNG phải xác nhận từ tài liệu Sync gốc — nếu cần độ chắc chắn cao hơn, vẫn nên hỏi lại BA/đối chiếu lại `SPEC_Sync` gốc.

## Ví dụ field "Tính toán từ dữ liệu sync" (không phải sync trực tiếp)

- Trending Point (`order_num_normalized × 0.7 + revenue_normalized × 0.3`) — Search: Trending Products
- Self-learning Score — Merchandise: Scoring System
- Search Relevance ranking (field weighting High/Medium/Low) — Search: General Setting
- Suggestion ranking (point-scoring 3-tier) — Search: Suggestion Dictionary

Đặc điểm chung của nhóm này: giá trị KHÔNG lấy nguyên từ BigCommerce, mà Native Search tự tính lại dựa trên dữ liệu đã sync + hành vi người dùng/thời gian — nên test case cần verify công thức/logic tính, có thể cần nhiều chu kỳ sync mới thấy kết quả tích luỹ đúng, khác với việc chỉ verify 1 giá trị được copy nguyên.

## Bảo trì file này

Nếu tài liệu Sync gốc (`Auto Test/Native-Search/01_REQUIREMENT/02_Sync/00_SPEC/`) được cập nhật thêm entity/field mới, cần đọc lại và bổ sung vào whitelist này. Không tự suy đoán 1 field mới có được sync hay không nếu chưa đối chiếu lại tài liệu Sync gốc.
