# Sync — Data Type Matrix (dùng chung cho Manual Sync & Schedule Sync)

## 0. Vai trò của tài liệu này

Cơ chế đồng bộ từng data type (Create/Update/Delete trên BigCommerce → phản ánh vào Native Search) là **logic dùng chung** giữa Manual Sync và Schedule Sync — cả 2 chỉ khác nhau ở cách trigger, còn engine sync và kết quả kỳ vọng trên từng data type là một. Vì vậy nội dung này tách riêng khỏi `sync-manual-sync-specs.md` và `sync-schedule-sync-specs.md` để tránh viết trùng 2 nơi rồi lệch nhau khi cập nhật.

**Nguồn**: đối chiếu chéo 2 sheet test case `Sync_Manual Sync` (mã MS-xxx) và `Sync_Schedule Sync` (mã SS-xxx) — 2 bộ case gần như song song nhau (SS-014→044 lặp lại đúng logic MS-014→044). Case nào chỉ xuất hiện ở 1 trong 2 sheet được ghi chú rõ nguồn.

## 1. Nguyên tắc chung

Mọi thay đổi (Create/Update/Delete) trên BigCommerce chỉ phản ánh vào Native Search **sau khi 1 lượt sync chạy xong** (Manual hoặc Schedule) — không có cơ chế push real-time.

## 2. Ma trận Create / Update / Delete theo Data Type

| Data Type | Create | Update | Delete |
| --- | --- | --- | --- |
| **Categories** | Category mới xuất hiện trong NS; log ghi ở Sync History *(MS-014, SS-014)* | Field (tên/mô tả) cập nhật đúng theo BC *(MS-015, SS-015)* | `[CẦN XÁC NHẬN BA]` hard delete hay soft delete? *(MS-016, SS-016)* |
| **Customers** | Customer mới xuất hiện *(MS-017, SS-017)* | Thông tin cập nhật đúng *(MS-018, SS-018)* | `[CẦN XÁC NHẬN BA]` xoá customer ảnh hưởng Orders liên quan thế nào? *(MS-019, SS-019)* |
| **Orders** | Order mới xuất hiện *(MS-020, SS-020)* | Status/field cập nhật đúng *(MS-021, SS-021)* | **Đã xác nhận qua BC docs** (xem `docs/bigcommerce-platform-facts.md`): BC "xoá" order qua API thực chất là **archive (soft delete)**, không hard delete. `[CẦN XÁC NHẬN BA]` phần còn lại (Loại 2, chưa tra được): sync có coi order đã archive là "cần loại khỏi NS" hay vẫn giữ nguyên vì bản chất order chưa mất hẳn? *(MS-022, SS-022)* |
| **Pages** *(xem lưu ý naming ở mục 4)* | Bài viết mới xuất hiện *(MS-023, SS-023)* | Nội dung/tiêu đề cập nhật đúng *(MS-024, SS-024)* | `[CẦN XÁC NHẬN BA]` bài unpublished có bị loại khỏi NS không? *(MS-025, SS-025)* |
| **Price List Assignments** | Mapping assignment xuất hiện *(MS-026, SS-026)* | Mapping cập nhật đúng *(MS-027, SS-027)* | **Đã xác nhận 1 phần qua BC docs**: BC dùng cơ chế "cascading price lists" — mỗi price list có tối đa 1 layer dự phòng, resolve theo thứ tự primary → layer → catalog price gốc (tính năng đang "beta" phía BC tại thời điểm tra, xem `docs/bigcommerce-platform-facts.md`). `[CẦN XÁC NHẬN BA]` còn lại: Native Search có áp dụng đúng logic cascading này khi index, hay chỉ lấy 1 mapping "trực tiếp nhất" theo cách riêng? *(MS-028, SS-028)* |
| **Product Category Assignment** | Quan hệ product–category xuất hiện *(MS-029, SS-029)* | Gỡ category → quan hệ biến mất *(MS-030, SS-030)*; re-assign nhiều category → NS phản ánh đúng snapshot hiện tại *(MS-031, SS-031)* | — |
| **Product Channel Assignment** | Mapping product–channel xuất hiện *(MS-032, SS-032)* | Gỡ product khỏi channel → mapping biến mất *(MS-033, SS-033)* | `[CẦN XÁC NHẬN BA]` gỡ khỏi channel storefront: loại khỏi search/index hay chỉ mất mapping channel? *(MS-034, SS-034)* |
| **Products** | Product mới xuất hiện *(MS-035, SS-035)* | Tên/mô tả/SKU *(MS-036, SS-036 — cả 2 đang **NG**, xem mục 5)*; giá (price/calculated_price) *(MS-037, SS-037)*; brand/availability/condition *(MS-038, SS-038)*; weight/dimensions/bin picking number *(MS-040, SS-040)* | `[CẦN XÁC NHẬN BA]` product disabled/hidden ở BC có coi là "removed" khỏi NS không? *(MS-039, SS-039)* |

## 3. Cross-data consistency (quan hệ giữa nhiều data type)

| Kịch bản | Expected | Nguồn |
| --- | --- | --- |
| Tạo category mới, gán product vào category, sync | Category tồn tại; product tồn tại; mapping đúng | MS-041, SS-041 (đều OK) |
| Xoá category đang được gán cho product, sync | Category không còn; `[CẦN XÁC NHẬN BA]` cách reconcile mapping orphan chưa rõ | MS-042, SS-042 (đều OK, phần orphan chưa rõ) |
| Xoá product đang có assignment (category/channel), sync | Product không còn; assignment liên quan "không còn/orphan handled" — `[CẦN XÁC NHẬN BA]` cơ chế orphan cụ thể | MS-043, SS-043 (đều OK) |
| Customer bị xoá nhưng vẫn có order liên kết, sync | `[CẦN XÁC NHẬN BA]` order có tiếp tục sync bình thường không, customer link xử lý ra sao (join behavior) | MS-044, SS-044 (chưa test) |

## 4. Lưu ý naming: "Pages" vs "Blog"

Tài liệu Sync tham khảo (`docs/sync-fields-glossary.md`, dựng từ `SPEC_Sync_Readme`) gọi entity thứ 4 là **"Pages"**, nhưng cả 2 sheet test case đều dùng tên **"Blog"** cho nhóm case Create/Update/Delete tương ứng.

**Đã xác nhận qua BC docs** (xem `docs/bigcommerce-platform-facts.md`): ở tầng nền tảng BigCommerce, **Blog Posts và Pages là 2 API resource kỹ thuật khác nhau** (`/blog/posts` riêng, tách biệt khỏi Pages API) — dù Pages API có hỗ trợ 1 page-type gọi là "blog" (trang danh sách). `[CẦN XÁC NHẬN BA]` phần còn lại (Loại 2, BC docs không trả lời được): module Sync của Native Search coi Blog Posts là 1 phần thuộc "Pages" khi đồng bộ, hay đồng bộ như 1 entity riêng chưa được liệt kê trong whitelist? Cần hỏi lại BA/dev Sync, không phải tra thêm BC docs.

## 5. Trạng thái thực thi tại thời điểm viết spec (không phải rule — chỉ tham khảo)

- **Products — Update tên/mô tả**: Result = NG ở **cả 2 sheet** (MS-036 và SS-036) → cùng 1 bug, không phụ thuộc trigger Manual hay Schedule. Log thực tế ở SS-036 cho thấy nhiều field con (description, price, brand, SKU, ảnh, weight/width/depth/height/bin, category) được test cùng lúc trong 1 case — nên khi fix bug này cần re-test lại toàn bộ field con đó, không chỉ riêng tên/mô tả.
- **Customers, Orders, Price List Assignments, Product Channel Assignment (Create/Update/Delete)**: phần lớn case chưa có Tester/Result ở cả 2 sheet → chưa được test thật, không mặc định coi là đã pass.

## 6. Danh sách câu hỏi cần xác nhận với BA (data type matrix)

Đã đối chiếu qua `docs/bigcommerce-platform-facts.md` — 3 câu hỏi được thu hẹp thành câu hỏi Loại 2 (đánh dấu *đã thu hẹp*), 2 câu hỏi tra không ra vẫn giữ nguyên, 5 câu hỏi còn lại chưa thuộc phạm vi tra BC docs (thuần Loại 2 ngay từ đầu).

| # | Câu hỏi | Data Type |
| --- | --- | --- |
| 1 | Xoá Category ở BC → NS xử lý hard delete hay soft delete? *(đã tra BC docs nhưng không tìm được câu trả lời)* | Categories |
| 2 | Xoá Customer ảnh hưởng tới Orders liên quan như thế nào? *(đã tra BC docs nhưng không tìm được câu trả lời)* | Customers |
| 3 | *(đã thu hẹp)* BC archive order (không hard delete) khi "xoá" — sync có coi order đã archive là cần loại khỏi NS hay vẫn giữ? | Orders |
| 4 | Bài viết (Blog/Pages) unpublished có bị loại khỏi Native Search không? | Pages/Blog |
| 5 | *(đã thu hẹp)* Blog Posts và Pages là 2 entity kỹ thuật khác nhau ở BC — module Sync có gộp chung hay đồng bộ riêng? | Naming Pages vs Blog |
| 6 | *(đã thu hẹp)* BC resolve Price List theo cơ chế cascading (primary → layer → catalog) — Native Search có áp dụng đúng logic này khi index không? | Price List Assignments |
| 7 | Gỡ product khỏi channel storefront: bị loại khỏi search/index hay chỉ mất mapping channel? | Product Channel Assignment |
| 8 | Product bị disabled/hidden ở BC có được coi là "removed" khỏi Native Search không? | Products |
| 9 | Cơ chế reconcile mapping orphan khi category/product bị xoá nhưng còn assignment liên quan là gì? | Cross-data consistency |
| 10 | Customer bị xoá nhưng còn Order liên kết: Order có tiếp tục sync bình thường không, customer link hiển thị ra sao? | Cross-data consistency |

## 7. Metadata

- **Áp dụng cho:** Sync — Manual Sync & Schedule Sync (phần data-type-level, không phụ thuộc trigger)
- **Nguồn:** `Sync_Manual Sync` (MS-014→044), `Sync_Schedule Sync` (SS-014→044); đối chiếu bổ sung `docs/bigcommerce-platform-facts.md` (2026-07-16)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 10 (không giảm số lượng — nhưng 3 câu đã thu hẹp phạm vi rõ hơn, cụ thể hơn để hỏi BA đúng trọng tâm thay vì hỏi chung chung)
