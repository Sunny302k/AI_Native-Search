# Sync Fields Glossary — Native Search

Whitelist entity/field được đồng bộ (sync) từ BigCommerce về Native Search (qua Elasticsearch). Dùng để tra cứu khi gắn nhãn nguồn dữ liệu cho từng field lúc extract spec từ Figma (`extract-figma-spec`) hoặc lúc phân loại field trong bất kỳ spec nào khác.

Nguồn: tài liệu Sync (`SPEC_Sync_v1.0`, `SPEC_Sync_Readme`, `SPEC_Sync_DataFlow`) trong kho tài liệu tham khảo `Auto Test/Native-Search` (chỉ đọc tham khảo, không thao tác ghi trong đó — xem Ràng buộc #1 ở `CLAUDE.md`).

## Cách dùng

Khi gặp 1 field cần gắn nhãn nguồn dữ liệu, đối chiếu theo thứ tự:

1. Field/entity trùng tên hoặc là thuộc tính của 1 trong 8 entity dưới đây → **Sync trực tiếp**.
2. Field không nằm trong danh sách nhưng rõ ràng do Native Search tự tính toán/tổng hợp TỪ dữ liệu đã sync (ranking, score, trending...) → **Tính toán từ dữ liệu sync**.
3. Field không liên quan gì tới danh sách dưới, do Native Search tự định nghĩa (toggle, display option, sort order, pagination type...) → **Config nội bộ**.
4. Không đủ căn cứ để xếp vào 1 trong 3 loại trên → gắn `[CẦN XÁC NHẬN BA]`, không tự đoán.

## 8 entity được sync từ BigCommerce

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

Chỉ **Products** có field-level detail trong tài liệu Sync gốc. 7 entity còn lại mới chỉ có tên entity, chưa rõ field cụ thể — nếu gặp 1 field cụ thể thuộc các entity này mà không chắc có nằm trong phạm vi sync hay không, dùng `[CẦN XÁC NHẬN BA]` thay vì suy đoán field đó có/không được sync.

## Ví dụ field "Tính toán từ dữ liệu sync" (không phải sync trực tiếp)

- Trending Point (`order_num_normalized × 0.7 + revenue_normalized × 0.3`) — Search: Trending Products
- Self-learning Score — Merchandise: Scoring System
- Search Relevance ranking (field weighting High/Medium/Low) — Search: General Setting
- Suggestion ranking (point-scoring 3-tier) — Search: Suggestion Dictionary

Đặc điểm chung của nhóm này: giá trị KHÔNG lấy nguyên từ BigCommerce, mà Native Search tự tính lại dựa trên dữ liệu đã sync + hành vi người dùng/thời gian — nên test case cần verify công thức/logic tính, có thể cần nhiều chu kỳ sync mới thấy kết quả tích luỹ đúng, khác với việc chỉ verify 1 giá trị được copy nguyên.

## Bảo trì file này

Nếu tài liệu Sync gốc (`Auto Test/Native-Search/01_REQUIREMENT/02_Sync/00_SPEC/`) được cập nhật thêm entity/field mới, cần đọc lại và bổ sung vào whitelist này. Không tự suy đoán 1 field mới có được sync hay không nếu chưa đối chiếu lại tài liệu Sync gốc.
