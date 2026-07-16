# Search Relevance — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Search Relevance` (42 case SR-001 → SR-042), kèm khối ghi chú What/Why/Who/When/Where/How do QA tự viết, và 1 mục **"NEED CONFIRMATION" do chính QA đánh dấu** ở cuối sheet — hiếm gặp so với các sheet khác (đa số phải tự suy ra câu hỏi mở, sheet này QA đã tự liệt kê sẵn).

## 1. Tổng quan

**Vị trí**: Admin → Search Engine Setup → General Setting → **tab Search Relevance**.

**Mục đích**: cho merchant bật/tắt từng field tham gia vào việc match query, và gán trọng số (weight) quyết định độ ưu tiên khi field đó khớp — qua đó kiểm soát **precision** (ưu tiên field quan trọng như Title/SKU) và **recall** (bật thêm field như Description/Metafields để tìm ra nhiều kết quả hơn).

**Phạm vi tác động**: chỉ chi phối **Product scoring** trên ISW và SRP. Category/Blog có rule match riêng (sheet gọi tắt là "UT1/UT2" — `[CẦN XÁC NHẬN BA]` chưa rõ 2 mã này tham chiếu tới đâu, không có định nghĩa trong sheet).

## 2. Cấu trúc bảng & Field

| Field/Cột | Mô tả | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- |
| Cột Status | Toggle bật/tắt field có tham gia match query | Config nội bộ | SR-002 |
| Cột Searchable fields | Tên field | Config nội bộ | SR-002 |
| Cột Search weight | Dropdown, **chỉ hiện/khả dụng khi Status = ON** | Config nội bộ | SR-008, 009 |
| Nút Save Settings | Disabled khi chưa đổi gì; enable ngay khi đổi toggle HOẶC weight | Config nội bộ | SR-003→005 |

**3 mức weight**: High = 5, Medium = 2, Low = 1.

**Danh sách field** (từ các case riêng lẻ trong sheet): Title, Product Category, Product Options, Product Type, SKU, Tags, Brand, Description (**mặc định OFF**), Metafields (**mặc định OFF**). Khối ghi chú cuối sheet còn nhắc tới **UPC/EAN (đang Off)** và "Customer fields" như ví dụ minh hoạ nhưng không có case riêng nào test 2 field này — `[CẦN XÁC NHẬN BA]` UPC/EAN và Customer fields có thực sự nằm trong bảng Search Relevance hay chỉ là ví dụ trong ghi chú.

**Rời tab khi chưa Save** *(SR-007)*: dữ liệu quay về trạng thái trước khi chỉnh, hoặc hiển thị cảnh báo unsaved — case gốc hedging cả 2 khả năng, chưa chốt.

## 3. Cơ chế tính điểm & ảnh hưởng tới ranking

- Query chỉ match trên các field đang **Status = ON**; field OFF hoàn toàn không được dùng để match (SR-021, 027→035: tắt field nào thì sản phẩm chỉ match theo field đó sẽ không xuất hiện, hoặc giảm hạng đúng rule).
- Điểm số field = weight đã cấu hình (High=5/Medium=2/Low=1); thứ tự Product trong ISW và SRP (khi sort = Relevance) phụ thuộc trực tiếp điểm này (SR-020, 025, 026).
- Khi 1 sản phẩm match **nhiều field cùng lúc**, ranking có thể ưu tiên cao hơn sản phẩm chỉ match 1 field — `[CẦN XÁC NHẬN BA]` case gốc (SR-036) tự hedge "nếu rule scoring cộng dồn", tức bản thân QA cũng chưa chắc điểm các field match được cộng dồn hay chỉ lấy field có điểm cao nhất.
- Đổi weight/toggle áp dụng ngay sau Save, không dùng cache cũ (SR-037) — nhưng xem mục 5 về độ trễ reindex.

## 4. Phạm vi KHÔNG bị ảnh hưởng bởi Search Relevance

| Phần | Có bị ảnh hưởng? | Nguồn |
| --- | --- | --- |
| Suggestion terms (Autocomplete) | **Không** — vẫn theo rule riêng của Suggestion Dictionary (manual order/popular), không đổi theo Search Relevance weight | SR-038 |
| Category/Blog match & thứ tự | **Không** — tuân theo rule match riêng (UT1/UT2) | SR-039 |
| Filter logic trên SRP | **Không** — Filter vẫn lọc đúng độc lập; Search Relevance chỉ ảnh hưởng ranking **trong** tập kết quả đã lọc | SR-040 |
| SRP khi sort ≠ Relevance (Price/Title/Date...) | **Thứ tự hiển thị không đổi theo weight**, nhưng tập kết quả ban đầu (có match hay không) có thể vẫn bị ảnh hưởng nếu engine dùng relevance để quyết định match/no-match trước khi sort | Khối ghi chú mục 3 |

## 5. Timing & rủi ro đồng bộ — ⚠️ chính QA đánh dấu NEED CONFIRMATION

Sau khi bấm Save Settings, hệ thống "refresh indexing data" (reindex) — nhưng:

- `[CẦN XÁC NHẬN BA]` Thời gian hoàn tất reindex là bao lâu?
- `[CẦN XÁC NHẬN BA]` UI có hiển thị loading/toast trong lúc reindex không?
- `[CẦN XÁC NHẬN BA]` Trong lúc đang reindex, query đang chạy dùng config **cũ** hay **mới**? Có khả năng kết quả "nhảy" đột ngột ngay sau khi index xong.

Đây là 3 câu hỏi do chính người viết test case liệt kê, không phải suy luận thêm.

## 6. Tích hợp & Vận hành

| Case | Kịch bản | Expected | Nguồn |
| --- | --- | --- | --- |
| Đổi weight/toggle rồi có thay đổi dữ liệu qua Sync | Update SKU/title ở BC → Sync → search bằng giá trị mới | Kết quả match theo field đang ON + weight hiện tại, phản ánh đúng dữ liệu mới | SR-041 |
| Save thất bại (API lỗi) | Mock API 500/timeout khi Save | Không áp dụng config nửa vời; ISW/SRP tiếp tục dùng config **cũ**; hiển thị lỗi cho user retry | SR-023, 042 |
| Access control | User role hạn chế | Không cho chỉnh/Save; UI ở trạng thái readonly | SR-024 |

## 7. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | "UT1/UT2" (rule match Category/Blog) tham chiếu cụ thể tới đâu? | 1 |
| 2 | UPC/EAN và Customer fields có thực sự là field trong bảng Search Relevance không? | 2 |
| 3 | Khi 1 sản phẩm match nhiều field, điểm có cộng dồn hay chỉ lấy field điểm cao nhất? | 3 |
| 4 | Thời gian reindex sau Save là bao lâu, có loading/toast không, trong lúc reindex dùng config cũ hay mới? | 5 |

## 8. Metadata

- **Feature:** Search — Search Engine Setup — General Setting — Search Relevance
- **Nguồn:** Sheet test case `Search Relevance` (42 case + khối ghi chú What/Why/.../How + mục NEED CONFIRMATION gốc)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 4
- **Coverage thực thi tại thời điểm viết spec:** sheet không có cột Tester/Result — chưa rõ case nào đã thực thi, cần xác nhận thêm ngoài phạm vi spec này
