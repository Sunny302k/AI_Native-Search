# Schedule Sync — Specs

## 0. Nguồn gốc tài liệu

Spec này viết ngược từ sheet test case `Sync_Schedule Sync` (44 case SS-001 → SS-044), đối chiếu chéo với sheet `Sync_Manual Sync` và tài liệu Sync tham khảo (`Auto Test/Native-Search`, chỉ đọc). Phần logic dùng chung với Manual Sync (ma trận Create/Update/Delete theo 8 data type, cross-data consistency) nằm ở `sync-data-type-matrix-specs.md` — tài liệu này chỉ mô tả phần **đặc thù của Schedule Sync**.

## 1. Tổng quan

Schedule Sync cho phép merchant **đặt lịch tự động** đồng bộ dữ liệu từ BigCommerce, theo tần suất riêng cho **từng data type** — khác Manual Sync (luôn full sync tất cả 8 loại cùng lúc, không cấu hình được).

## 2. Giao diện & Field

| Field / Element | Loại | Mô tả | Giá trị/Trạng thái khả dĩ | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- | --- | --- |
| Section "Schedule Sync" | Card/Section | Bảng cấu hình lịch sync, 1 dòng / data type | — | Config nội bộ | SS-001 (hiện đang **NG** — xem mục 6) |
| Cột "Data Type" | Label | Tên data type của dòng | 8 dòng cố định, xem `sync-data-type-matrix-specs.md` | Config nội bộ | SS-002 (hiện đang **NG** — xem mục 6) |
| Toggle "Enabled" | Toggle | Bật/tắt lịch sync tự động cho riêng data type đó | ON / OFF, mỗi data type độc lập | Config nội bộ | SS-004, SS-005 |
| Dropdown "Frequency" | Select | Tần suất chạy sync cho data type đó | Every Day / Every Week / Every Month | Config nội bộ | SS-003, SS-006 |
| Nút "Save" | Button | Lưu toàn bộ thay đổi trong bảng | Click → lưu, persist sau reload | Config nội bộ | SS-004, SS-005, SS-006 |
| Toast kết quả Save | Toast | Xác nhận đã lưu | Hiển thị vị trí top-right theo design | Config nội bộ | SS-007 |

**Toggle và Frequency là cấu hình độc lập theo từng data type** — đổi 1 dòng không ảnh hưởng dòng khác (SS-004, SS-005, SS-006). Giá trị đổi xong phải **persist sau khi reload trang** — tức được lưu ở BE, không chỉ ở local state.

## 3. Trạng thái tổng thể & Sync History

| Trạng thái | Điều kiện | UI hiển thị | Nguồn |
| --- | --- | --- | --- |
| No scheduled sync available | Cả 8 data type đều OFF | UI thể hiện "No scheduled sync available" | SS-009 |
| Scheduled available, chưa tới giờ chạy | ≥1 data type ON, chưa đến thời điểm theo Frequency | UI hiển thị trạng thái available/not-processed theo design | SS-010 |
| Đang chạy (theo từng data type) | Tới giờ chạy của 1 data type đang Enabled | — | (suy luận từ SS-013, chưa có case UI riêng — `[CẦN XÁC NHẬN BA]` UI lúc đang chạy Schedule có hiển thị gì trên trang Sync không, hay chỉ thấy qua Sync History) |
| Fail | Schedule chạy lỗi | Sync History thể hiện Failed, có error message, không kẹt ở trạng thái processing | SS-011 |

**Sync History ghi theo từng data type riêng biệt** *(SS-013)*: mỗi data type đang Enabled, khi tới giờ chạy, tạo **1 record Type=Schedule riêng** (không gộp chung 1 record như Manual Sync) — vì mỗi data type có thể có Frequency khác nhau nên thời điểm chạy khác nhau.

## 4. Save khi không có thay đổi — hành vi chưa rõ

*(SS-008)*: khi bấm Save mà không đổi gì, kỳ vọng theo design là **hoặc disable nút Save, hoặc vẫn cho phép Save và hiện toast success** — bản thân case gốc cũng ghi "log mismatch nếu khác", tức người viết test case cũng chưa chắc hành vi chuẩn là gì. `[CẦN XÁC NHẬN BA]`.

## 5. Rule tranh chấp với Manual Sync

Xem phân tích đầy đủ tại `sync-manual-sync-specs.md` mục 4 (3 nguồn: MS-005, SS-012, tài liệu tham khảo). Riêng bằng chứng từ sheet này:

> **SS-012**: Khi Manual Sync đang chạy và đến giờ Schedule Sync → **Schedule không chạy song song**; đợi Manual xong mới chạy hoặc bị skip lượt đó (case gốc ghi "cần clarify rule" — chưa chốt đợi hay skip).

Bằng chứng này khớp tài liệu tham khảo (Manual ưu tiên hơn) và **ngược lại** với MS-005 bên sheet Manual Sync. `[CẦN XÁC NHẬN BA]` — xem chi tiết ở `sync-manual-sync-specs.md` mục 4, không lặp lại phân tích ở đây.

## 6. Lưu ý về thực thi (không phải spec, chỉ để tham khảo)

- **SS-001, SS-002 đang Fail (NG)**: bảng cấu hình Schedule Sync hiện chưa hiển thị đúng (không rõ thiếu section hay thiếu đủ 8 dòng data type) — cần theo dõi bug riêng, không dùng làm căn cứ viết Expected Result mới.
- **SS-036 đang Fail (NG)**: cùng bug với MS-036 bên Manual Sync (Update tên/mô tả/SKU của Products) — xem chi tiết ở `sync-data-type-matrix-specs.md` mục 5.

## 7. Danh sách câu hỏi cần xác nhận với BA (đặc thù Schedule Sync)

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Trang Sync có hiển thị trạng thái "đang chạy" riêng cho Schedule Sync không, hay chỉ biết qua Sync History? | 3 |
| 2 | Bấm Save khi không đổi gì: disable nút hay vẫn Save + toast success? | 4 |
| 3 | Chiều ưu tiên Manual vs Schedule, và nếu Manual thắng thì Schedule đợi hay bị skip? *(trùng câu hỏi ở sync-manual-sync-specs.md mục 5, không lặp lại phân tích)* | 5 |

Câu hỏi liên quan từng data type xem `sync-data-type-matrix-specs.md` mục 6.

## 8. Metadata

- **Feature:** Sync — Schedule Sync
- **Tài liệu liên quan:** `sync-data-type-matrix-specs.md` (logic dùng chung), `sync-manual-sync-specs.md` (sub-feature song song)
- **Nguồn:** Sheet test case `Sync_Schedule Sync` (44 case) + `Sync_Manual Sync` (đối chiếu) + tài liệu tham khảo Sync
- **Số câu hỏi CẦN XÁC NHẬN BA (đặc thù Schedule):** 3 (+ 10 câu chung ở `sync-data-type-matrix-specs.md`)
- **Coverage thực thi tại thời điểm viết spec:** SS-001, SS-002, SS-036 đang Fail; phần lớn case Customers/Orders/Price List Assignments/Product Channel Assignment CRUD chưa có Tester/Result
