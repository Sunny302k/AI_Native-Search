---
name: create-permission-testcase
description: Tạo test case Permission có hệ thống theo ma trận role × chức năng cho 1 feature/module, đảm bảo mọi tổ hợp role-action đều được test thay vì chỉ test rải rác vài role.
trigger: "tạo test case permission/phân quyền cho [feature/module]", "tạo ma trận quyền cho [...]", "test phân quyền role cho [...]" — áp dụng khi người dùng muốn test có hệ thống toàn bộ tổ hợp role × chức năng của 1 feature, KHÔNG dùng khi chỉ cần vài case permission lồng trong test case chức năng khác (→ create-testcases) hoặc test 1 luồng nghiệp vụ xuyên role (→ create-system-testcase)
---

## Hướng dẫn tạo test case Permission theo ma trận

### Bước 1: Xác định phạm vi

- Feature/module cần test phân quyền (ví dụ: Fulfillment Order, Profit by Product, User & Roles).
- Danh sách role tồn tại trong hệ thống liên quan tới feature này (ví dụ: Admin, Manager, Operations...).
- Danh sách action/chức năng cụ thể trong feature (View, Create, Edit, Delete, Approve, Export, Assign supplier...).

Nếu spec không liệt kê đủ role hoặc action, hỏi lại người dùng trước khi sang Bước 2. Không tự suy đoán role/action không có căn cứ.

### Bước 2: Xây dựng ma trận role × action

Với mỗi cặp (role, action), xác định 1 trong 3 trạng thái dựa theo spec:

- **Allowed**: role được phép thực hiện action, không giới hạn gì thêm.
- **Denied**: role hoàn toàn không được thực hiện (nút ẩn/disable, hoặc action bị chặn ở API trả 403).
- **Conditional**: role được phép nhưng có điều kiện (ví dụ: chỉ sửa được đơn do chính mình tạo, chỉ approve được nếu chưa quá hạn mức...).

Trình bày ma trận dạng bảng cho người dùng xác nhận trước khi sinh test case:

| Action \ Role | Admin | Manager | Operations |
| --- | --- | --- | --- |
| View | Allowed | Allowed | Allowed |
| Edit | Allowed | Allowed | Conditional (chỉ đơn tự tạo) |
| Delete | Allowed | Denied | Denied |

Ô nào chưa rõ theo spec, đánh dấu `<cần confirm>` trong ma trận thay vì tự đoán, và hỏi người dùng.

### Bước 3: Viết test case từ ma trận

Với mỗi ô đã xác nhận, sinh test case tương ứng:

- **Allowed**: 1 test case happy — role thực hiện action thành công.
- **Denied**: 1 test case negative — role bị chặn (nút không hiển thị/disable ở UI, và/hoặc API trả 403 nếu có kiểm tra được), kèm thông báo lỗi nếu spec nêu rõ.
- **Conditional**: tối thiểu 2 test case — 1 case đúng điều kiện (thành công) và 1 case sai điều kiện (bị chặn).

Không gộp nhiều role vào 1 test case — mỗi test case chỉ test đúng 1 role trên đúng 1 action để dễ truy vết khi fail.

Quy định về output — dùng đúng 10 cột như skill `create-testcases`:

| ID | Test Type | Field / Phần | Chi tiết test | Cụ thể hơn | Preconditions | Test Steps | Input DB/Setting | Expected Result | Note |

- **ID**: `userstoryID_TCNumber` tạm thời khi mới sinh (ví dụ: `US1234_TC01`) — ID cuối cùng sẽ được renumber lại theo đúng vị trí sau khi gộp/sắp xếp vào file chung ở Bước 4.
- **Test Type**: luôn là `Permission`.
- **Field / Phần**: tên feature/action đang test (ví dụ: `Button [Delete Order]`, `Approve FO`).
- **Chi tiết test**: `<Role> - Allowed/Denied/Conditional`.
- **Cụ thể hơn**: CHỈ 1 cụm từ ngắn (2-6 từ) nêu điều kiện cụ thể nếu là Conditional (ví dụ: `Đơn do chính role đó tạo`), KHÔNG viết thành câu dài. Để trống nếu không cần — vẫn giữ đúng vị trí cột.
- **Preconditions, Test Steps, Input DB/Setting, Expected Result, Note**: quy tắc trình bày (đa dòng bọc `"..."`, escape `""`, đánh số 1. 2. 3., không dùng `<br>`, ô trống để trống không ghi N/A) giống hệt skill `create-testcases`.

Sắp xếp: gom nhóm theo Field/Phần (action), trong mỗi action gom theo role.

### Bước 4: Xuất file

- File format: CSV UTF-8 BOM (kiểm tra 3 byte đầu file đúng EF BB BF trước khi báo hoàn thành).
- Folder: `test-cases/userstoryID/`.
- **File đích**: `userstoryID_testcase.csv` — dùng CHUNG file với `create-testcases`, `create-system-testcase` và `create-impact-testcase` (cả 4 skill cùng schema 10 cột này). Chỉ riêng `create-api-testcase` KHÔNG gộp vào file này. Trường hợp Field/Phần không gắn với 1 field cụ thể (ví dụ permission ở cấp màn hình/action tổng thể), dùng tên màn hình/chức năng bị ảnh hưởng thay vì để trống.

  - Nếu file `userstoryID_testcase.csv` CHƯA tồn tại: tạo file mới, chỉ chứa test case Permission vừa sinh.
  - Nếu file ĐÃ tồn tại: đọc toàn bộ rows hiện có, giữ nguyên nội dung từng ô, thêm rows Permission mới vào, rồi sắp xếp lại TOÀN BỘ file:
    1. Nhóm theo **Field / Phần** trước (test hết 1 Field/Phần mới sang Field/Phần khác, không xen kẽ).
    2. Trong cùng 1 nhóm Field/Phần, sắp theo thứ tự ưu tiên Test Type: `Happy → Negative → Edge → Permission → Integration → System → Other`.
    3. Renumber lại cột **ID** tuần tự theo thứ tự mới sau khi sắp xếp: `US1234_TC01, TC02, TC03...` (bỏ hậu tố `_PERM_` vì cột Test Type đã phân biệt loại).
  - Không xoá hoặc sửa nội dung rows đã có từ trước — chỉ thêm mới, sắp xếp lại, renumber ID.

### Bước 5: Thông báo tới người dùng

- Ma trận role × action đã dùng (đã qua xác nhận ở Bước 2).
- Số lượng test case đã tạo, phân theo Allowed/Denied/Conditional.
- Số lượng ô/test case cần confirm.

## Ràng buộc

- Không tự bịa role, action hoặc trạng thái quyền (Allowed/Denied/Conditional) nếu spec không nêu rõ — dùng `<cần confirm>` và hỏi lại người dùng.
- Không được phép bịa test case nếu không có đủ thông tin. Dùng tag `<cần confirm>` trong cột Note để đánh dấu.
- Chỉ thao tác trong folder dự án hiện tại (Timind Hub), nghiêm cấm thao tác trên folder khác.
