---
name: check-testcase-coverage
description: Đối chiếu ngược 1 spec với bộ test case đã sinh ra (từ create-testcases/create-permission-testcase/create-system-testcase/create-api-testcase/create-impact-testcase) để phát hiện acceptance criteria/business rule chưa có test case bao phủ.
trigger: "check coverage cho [userstoryID]", "audit test case [userstoryID] đã đủ chưa", "test case này đã cover hết spec chưa" — áp dụng khi đã CÓ SẴN test case và người dùng muốn kiểm tra độ phủ so với spec, KHÔNG dùng để sinh test case mới (→ create-testcases/create-permission-testcase/create-system-testcase/create-api-testcase/create-impact-testcase)
---

## Hướng dẫn audit độ phủ test case

### Bước 1: Xác định input

- Spec cần đối chiếu (ví dụ `docs/specs/us07-specs.md`).
- (Các) file test case đã sinh cho userstoryID đó trong `test-cases/userstoryID/` — thường gồm tối đa 2 file: `userstoryID_testcase.csv` (file gộp chung của create-testcases/create-permission-testcase/create-system-testcase/create-impact-testcase) và `userstoryID_api-testcase.csv` + Postman collection riêng của create-api-testcase nếu có.

Nếu thiếu 1 trong 2 (spec hoặc test case), hỏi lại người dùng đường dẫn trước khi tiếp tục.

Nếu test case có case Test Type = `Integration` tham chiếu ticket khác (VD ghi trong Chi tiết test/Note dạng `TH-741`, `TH-158`...) mà chưa có quyền truy cập Jira/Confluence trong phiên hiện tại, báo cho người dùng biết cần authorize trước khi audit đầy đủ Bước 2 phần rule phụ từ trigger.

### Bước 2: Trích xuất danh sách yêu cầu từ spec

Đọc kỹ spec, tách thành danh sách rời rạc các đơn vị cần kiểm chứng (acceptance criteria, business rule, ràng buộc validate, trạng thái trong state machine, quyền theo role...). Đánh ID tạm cho từng đơn vị nếu spec chưa có sẵn ID, dạng `AC-01`, `AC-02`...

Không gộp nhiều rule khác nhau vào 1 mục — mỗi rule phải đủ nhỏ để có thể trả lời rõ ràng "có test case nào kiểm tra cái này chưa".

**Với các test case Test Type = `Integration`** (sinh từ `create-impact-testcase`): mỗi case này dựa trên 1 trigger ở màn hình/feature KHÁC (không phải spec đang audit). Với từng trigger xuất hiện trong các case Integration hiện có, tra lại spec/Jira gốc của chính trigger đó (không suy đoán) để lấy thêm danh sách rule phụ: trạng thái nguồn hợp lệ, hướng biến thiên (tăng/giảm), phạm vi tác động (toàn bộ/một phần) mà trigger đó cho phép — đưa các rule phụ này vào chung danh sách rule ở Bước 2 (đánh ID riêng, ví dụ `AC-TH741-01`), vì đây chính là loại rule dễ bị bỏ sót nhất (chỉ test 1 trạng thái/1 hướng đại diện thay vì đủ nhánh).

### Bước 3: Đối chiếu từng rule với test case đã có

Với mỗi rule ở Bước 2 (kể cả rule phụ rút ra từ trigger), rà toàn bộ các file test case đầu vào (cột Field/Phần, Chi tiết test, Cụ thể hơn, Test Steps, Expected Result) để xác định trạng thái:

- **Covered**: có ít nhất 1 test case kiểm tra đúng rule này, đủ điều kiện/bước để xác nhận kết quả mong đợi khớp spec.
- **Partial**: có test case liên quan nhưng chưa đủ (ví dụ chỉ test happy path, thiếu boundary/negative mà rule ngụ ý cần).
- **Not covered**: không có test case nào chạm tới rule này.

Ghi lại ID test case liên quan (nếu có) cho từng rule để truy vết ngược dễ dàng.

### Bước 4: Xuất báo cáo coverage

Không tự ý viết bổ sung test case trong skill này — chỉ báo cáo gap để người dùng quyết định dùng skill tạo test case phù hợp (create-testcases cho feature đơn lẻ, create-permission-testcase cho phân quyền, create-system-testcase cho luồng nghiệp vụ, create-api-testcase cho API, create-impact-testcase cho ảnh hưởng chéo).

Xuất file markdown checklist:

```markdown
# Coverage checklist - <userstoryID>

## Tổng quan
- Tổng số rule: X
- Covered: X
- Partial: X
- Not covered: X

## Chi tiết

- [x] AC-01 — <mô tả rule> — Covered — TC: US1234_TC01, US1234_TC02
- [~] AC-02 — <mô tả rule> — Partial — TC: US1234_TC05 (thiếu case giá trị âm)
- [ ] AC-03 — <mô tả rule> — Not covered
```

- Checklist dùng ký hiệu: `[x]` Covered, `[~]` Partial, `[ ]` Not covered.
- Với Partial/Not covered, ghi rõ 1 dòng lý do/thiếu gì để người dùng biết cần bổ sung case nào, không chỉ nêu tên rule suông.

- File format: markdown (theo đúng quy định checklist của project).
- Naming: kebab-case, `userstoryID-coverage-checklist.md` (ví dụ: `us1234-coverage-checklist.md`).
- Folder: `checklists/` (theo cấu trúc thư mục của project).

### Bước 5: Thông báo tới người dùng

- Tổng số rule / Covered / Partial / Not covered.
- Danh sách rule Partial hoặc Not covered kèm gợi ý skill nên dùng để bổ sung.

## Ràng buộc

- Không tự thêm/sửa test case trong các file CSV đã có — skill này chỉ đọc và báo cáo, không ghi đè.
- Không được suy diễn rule không có trong spec để tạo áp lực coverage giả — chỉ đối chiếu đúng những gì spec nêu.
- Chỉ thao tác trong folder dự án hiện tại (Native Search / Claude), nghiêm cấm thao tác trên folder khác.
