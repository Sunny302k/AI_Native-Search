# Manual Sync — Specs

## 0. Nguồn gốc tài liệu

Spec này được viết ngược (reverse) từ 2 nguồn, không phải từ Figma:

| Nguồn | Nội dung | Vai trò |
| --- | --- | --- |
| Sheet test case `Sync_Manual Sync` (Google Sheet `TC_Native Search`, 44 case MS-001 → MS-044) | Rule đã được confirm trực tiếp với PO/BA trong lúc viết/chạy test case, hiện chỉ tồn tại trong file test case | Nguồn chính |
| Sheet test case `Sync_Schedule Sync` (44 case SS-001 → SS-044) | Đối chiếu chéo, đặc biệt cho rule tranh chấp Manual vs Schedule | Đối chiếu |
| `SPEC_Sync_v1.0`, `SPEC_Sync_Readme`, `SPEC_Sync_DataFlow` (kho tham khảo `Auto Test/Native-Search`, chỉ đọc, không sửa) | Spec kỹ thuật gốc của module Sync | Đối chiếu |

Phần logic **dùng chung** với Schedule Sync (ma trận Create/Update/Delete theo 8 data type, cross-data consistency) được tách sang `sync-data-type-matrix-specs.md` để tránh trùng lặp — tài liệu này chỉ mô tả phần **đặc thù của Manual Sync** (trigger, UI, state machine).

## 1. Tổng quan

Manual Sync là 1 trong 3 sub-feature của module **Sync** (cùng với Schedule Sync, Sync History). Đây là cơ chế cho phép merchant **chủ động** trigger 1 lần đồng bộ dữ liệu từ BigCommerce về Native Search (qua Elasticsearch), không cần chờ lịch tự động.

**Đặc điểm cốt lõi**: Manual Sync luôn là **full sync toàn bộ 8 data type**, merchant không có lựa chọn sync riêng lẻ từng loại dữ liệu. *(Nguồn: MS-002, MS-011 — khớp với `SPEC_Sync_Readme`)*

8 data type được đồng bộ, chi tiết hành vi Create/Update/Delete từng loại xem `sync-data-type-matrix-specs.md`.

## 2. Giao diện & Field

| Field / Element | Loại | Mô tả | Giá trị/Trạng thái khả dĩ | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- | --- | --- |
| Section "Manual Sync" | Card/Section | Khối hiển thị trên trang Sync, có mô tả ngắn về chức năng | — | Config nội bộ | MS-001 |
| Nút "Sync Now" | Button | Trigger 1 lần Manual Sync | **Enabled**: mặc định, không có sync nào đang chạy.<br>**Disabled**: đang có Manual Sync chạy (chặn double-click) | Config nội bộ | MS-001, MS-004 |
| Chỉ báo trạng thái đang chạy | Spinner + text | Hiển thị khi sync đang xử lý | Text: "Syncing in progress…" | Tính toán từ dữ liệu sync (phản ánh trạng thái Batch thời gian thực) | MS-003, MS-006 |
| Toast kết quả | Toast notification | Hiển thị khi sync kết thúc | **Success**: toast xác nhận hoàn tất.<br>**Failed**: `[CẦN XÁC NHẬN BA]` — UI toast lỗi chưa được mô tả rõ (xem mục 5) | Tính toán từ dữ liệu sync | MS-003, MS-009 |

**Không có** UI cho phép chọn data type khi chạy Manual Sync (không có checkbox/multi-select) — xác nhận qua MS-002. *(Nguồn dữ liệu: Config nội bộ — đây là giới hạn tính năng do Native Search chủ động thiết kế, không phải dữ liệu sync)*

## 3. Vòng đời trạng thái (State machine)

```
Idle ──(click "Sync Now")──▶ In Progress ──▶ Success ──▶ Idle
                                   │
                                   └──▶ Failed ──▶ Idle
```

| Trạng thái | UI hiển thị | Nút "Sync Now" | Ghi nhận ở Sync History | Nguồn |
| --- | --- | --- | --- | --- |
| Idle | Không có spinner, không toast | Enabled | — | MS-012, MS-013 |
| In Progress | Spinner + "Syncing in progress…" | Disabled (click không tác dụng) | Record mới: Type=Manual, DataType=All, Status=In Progress | MS-004, MS-006, MS-007 |
| Success | Toast success, quay lại UI bình thường | Enabled trở lại | Status=Success; có Triggered/Completed time; Records synced (nếu có) | MS-008, MS-012 |
| Failed | `[CẦN XÁC NHẬN BA]` — UI cụ thể chưa rõ, chỉ biết UI "không bị kẹt loading" | Enabled trở lại (suy luận, chưa có case xác nhận rõ) | Status=Failed; có Error message | MS-009 |

**Refresh trang khi đang sync** *(MS-013)*: không tạo sync trùng, trạng thái hiển thị lại đúng theo tiến trình thực tế — trạng thái sync là server-side, không phụ thuộc UI state của tab đang mở.

**Auto-run lần đầu cài app** *(MS-010)*: Manual Sync tự động chạy 1 lần khi merchant cài app lần đầu, thể hiện đúng luồng In Progress → Success/Failed như trigger thủ công.

**Ghi nhận ở Sync History khác Schedule Sync**: Manual Sync tạo **1 record duy nhất** (Type=Manual, DataType=All) cho cả lượt sync, trong khi Schedule Sync tạo **1 record riêng cho từng data type** (xem `sync-schedule-sync-specs.md` mục 3) — do Schedule cho phép bật/tắt và đặt tần suất riêng từng loại, Manual thì không.

## 4. Rule tranh chấp với Schedule Sync — ⚠️ 3 nguồn không khớp nhau hoàn toàn

| # | Nguồn | Nội dung |
| --- | --- | --- |
| 1 | MS-005 (sheet Manual Sync) | Khi Schedule Sync đang `Processing`, click "Sync Now" → **Manual bị chặn**, hiển thị "Sync is currently in progress. Please wait." → **Schedule ưu tiên hơn Manual**. |
| 2 | SS-012 (sheet Schedule Sync) | Khi Manual đang chạy và đến giờ Schedule → **Schedule không chạy song song**; đợi Manual xong mới chạy hoặc bị skip (chính case này cũng ghi "cần clarify rule" — chưa chốt là đợi hay skip) → **Manual ưu tiên hơn Schedule**. |
| 3 | `SPEC_Sync_Readme` / `SPEC_Sync_DataFlow` (tài liệu tham khảo) | "Schedule Sync defers to an in-progress manual sync" → **Manual ưu tiên hơn Schedule**, khớp với SS-012. |

`[CẦN XÁC NHẬN BA]` — MS-005 là nguồn duy nhất mô tả **ngược lại** 2 nguồn còn lại. Xét theo số đông (2/3 nguồn + tài liệu kỹ thuật gốc), giả thuyết hợp lý hơn là **Manual Sync ưu tiên hơn, Schedule Sync nhường/skip khi Manual đang chạy** — nhưng đây vẫn chỉ là giả thuyết, cần BA xác nhận lại, đặc biệt cần làm rõ 2 điểm:

1. Chiều đúng là gì — MS-005 có phải case đã lỗi thời/ghi nhầm không?
2. Nếu Manual ưu tiên: khi Manual đang chạy và đến giờ Schedule, Schedule **đợi Manual xong rồi chạy tiếp** hay **bị skip lượt đó luôn** (SS-012 để ngỏ cả 2 khả năng)?

## 5. Danh sách câu hỏi cần xác nhận với BA (đặc thù Manual Sync)

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Chiều ưu tiên đúng giữa Manual Sync và Schedule Sync là gì — và nếu Manual thắng, Schedule đợi hay bị skip? | 4 |
| 2 | UI khi Manual Sync Failed hiển thị gì cụ thể (toast lỗi, nội dung message)? | 3 |

Câu hỏi liên quan tới từng data type (Categories/Customers/Orders/.../Products) xem `sync-data-type-matrix-specs.md` mục 6.

## 6. Lưu ý về thực thi (không phải spec, chỉ để tham khảo)

Tại thời điểm viết spec này, sheet ghi nhận **3 case đang Fail (Result = NG)**: MS-003 (Trigger manual sync thành công), MS-007 (Sync History ghi nhận Manual Sync – In Progress), MS-036 (Update tên/mô tả/xoá SKU → NS cập nhật, cùng bug với SS-036 bên Schedule Sync). Đây là kết quả test thực tế, không phải rule spec — không dùng làm căn cứ Expected Result cho test case mới.

## 7. Metadata

- **Feature:** Sync — Manual Sync
- **Tài liệu liên quan:** `sync-data-type-matrix-specs.md` (logic dùng chung), `sync-schedule-sync-specs.md` (sub-feature song song)
- **Nguồn:** Sheet test case `Sync_Manual Sync` (44 case) + `Sync_Schedule Sync` (đối chiếu) + tài liệu tham khảo Sync
- **Số câu hỏi CẦN XÁC NHẬN BA (đặc thù Manual):** 2 (+ 10 câu chung ở `sync-data-type-matrix-specs.md`)
- **Coverage thực thi tại thời điểm viết spec:** 3 case đang Fail (MS-003, MS-007, MS-036)
