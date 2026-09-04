---
name: create-permission-testcase
description: Tạo test case Permission có hệ thống theo ma trận role × chức năng cho 1 feature/module, đảm bảo mọi tổ hợp role-action đều được test thay vì chỉ test rải rác vài role.
trigger: "tạo test case permission/phân quyền cho [feature/module]", "tạo ma trận quyền cho [...]", "test phân quyền role cho [...]" — áp dụng khi người dùng muốn test có hệ thống toàn bộ tổ hợp role × chức năng của 1 feature, KHÔNG dùng khi chỉ cần vài case permission lồng trong test case chức năng khác (→ create-functional-testcase) hoặc test 1 luồng nghiệp vụ xuyên role (→ create-system-testcase)
---

## Hướng dẫn tạo test case Permission theo ma trận

### Bước 1: Xác định phạm vi

- Feature/module cần test phân quyền (ví dụ: Filter Tree Setup, Merchandise Campaign, Sync Settings).
- Danh sách role tồn tại trong hệ thống liên quan tới feature này (ví dụ: Store Owner, Merchant Admin, Staff...).
- Danh sách action/chức năng cụ thể trong feature (View, Create, Edit, Delete, Publish, Export...).

Nếu spec không liệt kê đủ role hoặc action, hỏi lại người dùng trước khi sang Bước 2. Không tự suy đoán role/action không có căn cứ.

### Bước 2: Xây dựng ma trận role × action

Với mỗi cặp (role, action), xác định 1 trong 3 trạng thái dựa theo spec:

- **Allowed**: role được phép thực hiện action, không giới hạn gì thêm.
- **Denied**: role hoàn toàn không được thực hiện (nút ẩn/disable, hoặc action bị chặn ở API trả 403).
- **Conditional**: role được phép nhưng có điều kiện (ví dụ: chỉ sửa được filter tree do chính mình tạo, chỉ publish được nếu đã đủ thành phần bắt buộc...).

Trình bày ma trận dạng bảng cho người dùng xác nhận trước khi sinh test case:

| Action \ Role | Store Owner | Merchant Admin | Staff |
| --- | --- | --- | --- |
| View | Allowed | Allowed | Allowed |
| Edit | Allowed | Allowed | Conditional (chỉ filter tree tự tạo) |
| Delete | Allowed | Denied | Denied |

Ô nào chưa rõ theo spec, đánh dấu `<cần confirm>` trong ma trận thay vì tự đoán, và hỏi người dùng.

### Bước 3: Viết test case từ ma trận

Với mỗi ô đã xác nhận, sinh test case tương ứng:

- **Allowed**: 1 test case happy — role thực hiện action thành công.
- **Denied**: 1 test case validation — role bị chặn (nút không hiển thị/disable ở UI, và/hoặc API trả 403 nếu có kiểm tra được), kèm thông báo lỗi nếu spec nêu rõ.
- **Conditional**: tối thiểu 2 test case — 1 case đúng điều kiện (thành công) và 1 case sai điều kiện (bị chặn).

Không gộp nhiều role vào 1 test case — mỗi test case chỉ test đúng 1 role trên đúng 1 action để dễ truy vết khi fail.

Quy định về output — dùng đúng 10 cột và quy tắc trình bày như skill `create-functional-testcase` (KHÔNG dùng dòng banner — đã loại bỏ, xem file đó để biết lý do):

| ID | Test Type | Field / Phần | Chi tiết test | Cụ thể hơn | Preconditions | Test Steps | Input DB/Setting | Expected Result | Note |

- **ID**: `userstoryID_TCNumber` tạm thời khi mới sinh (ví dụ: `US1234_TC01`) — ID cuối cùng sẽ được renumber lại theo đúng vị trí sau khi gộp/sắp xếp vào file chung ở Bước 4.
- **Test Type**: luôn là `Permission`.
- **Field / Phần**: tên feature/action đang test (ví dụ: `Button [Delete Filter Tree]`, `Publish Merchandise Campaign`). CHỈ điền ở dòng ĐẦU TIÊN của mỗi nhóm liên tiếp cùng Field/Phần; các dòng sau (thường là các role khác nhau trên cùng action) để TRỐNG.
- **Chi tiết test**: `<Role> - Allowed/Denied/Conditional`.
- **Cụ thể hơn**: CHỈ 1 cụm từ ngắn (2-6 từ) nêu điều kiện cụ thể nếu là Conditional (ví dụ: `Filter tree do chính role đó tạo`), KHÔNG viết thành câu dài. Để trống nếu không cần — vẫn giữ đúng vị trí cột.
- **Preconditions, Test Steps, Input DB/Setting, Expected Result, Note**: quy tắc trình bày (đa dòng bọc `"..."` + ngắt dòng thật bên trong ô, escape `""`, đánh số 1. 2. 3., ô trống để trống không ghi N/A, Preconditions viết ngắn dạng `[Field] = [Value]`) giống hệt skill `create-functional-testcase`. Test Steps chỉ ghi thao tác thực sự cần cho case này (login đúng role + thao tác action + verify). NGHIÊM CẤM giả ngắt dòng bằng `<br>` / `<br/>` / `<br />` hoặc chuỗi literal `\n` — Excel/Google Sheets không parse HTML, sẽ hiển thị nguyên văn trong ô.

Sắp xếp: gom nhóm theo Field/Phần (action), trong mỗi action gom theo role.

### Bước 4: Xuất file

- File format: CSV UTF-8 BOM, ngắt dòng cuối mỗi record dùng CRLF (`\r\n`), không dùng LF đơn.
- **Checklist bắt buộc trước khi báo hoàn thành** — kiểm tra trên chính file vừa ghi, không được bỏ qua bước nào:

  1. 3 byte đầu file đúng BOM `EF BB BF`.
  2. Số lần xuất hiện chuỗi `<br` trong file phải bằng **0**, và không có chuỗi literal `\n` trong nội dung ô. Nếu > 0 nghĩa là đã giả ngắt dòng bằng HTML/escape — phải sửa thành ngắt dòng thật rồi kiểm tra lại.
  3. Toàn bộ ký tự xuống dòng cuối record là CRLF, không có LF đơn lẻ.
  4. Parse lại file bằng 1 CSV reader chuẩn (KHÔNG tự đếm dấu phẩy/đếm dòng vật lý): số record data đúng bằng tổng số test case trong file, và mỗi record đủ 10 cột.
  5. Mỗi nhóm Field/Phần chỉ có 1 dòng đầu tiên điền giá trị, các dòng sau trong cùng nhóm để trống, không xen kẽ.
- Folder: `test-cases/userstoryID/`.
- **File đích**: `userstoryID_testcase.csv` — dùng CHUNG file với `create-functional-testcase`, `create-system-testcase`, `create-impact-testcase` và `create-sync-testcase` (cả 5 skill cùng schema 10 cột này). Chỉ riêng `create-api-testcase` KHÔNG gộp vào file này. Trường hợp Field/Phần không gắn với 1 field cụ thể (ví dụ permission ở cấp màn hình/action tổng thể), dùng tên màn hình/chức năng bị ảnh hưởng.

  - Nếu file `userstoryID_testcase.csv` CHƯA tồn tại: tạo file mới, chỉ chứa test case Permission vừa sinh.
  - Nếu file ĐÃ tồn tại: đọc toàn bộ rows hiện có, giữ nguyên nội dung từng ô, thêm rows Permission mới vào, rồi sắp xếp lại TOÀN BỘ file:
    1. Nhóm theo **Field / Phần** trước (test hết 1 Field/Phần mới sang Field/Phần khác, không xen kẽ) — dòng đang để trống Field/Phần coi là thuộc nhóm của dòng gần nhất phía trên có giá trị.
    2. Trong cùng 1 nhóm Field/Phần, sắp theo thứ tự ưu tiên Test Type: `Happy → Negative → Edge → Sync → Permission → Integration → UI`.
    3. Renumber lại cột **ID** tuần tự theo thứ tự mới sau khi sắp xếp: `US1234_TC01, TC02, TC03...` (bỏ hậu tố `_PERM_` vì cột Test Type đã phân biệt loại).
    4. Sau khi sắp xếp, chỉ dòng đầu tiên của mỗi nhóm giữ giá trị Field/Phần, các dòng còn lại để trống.
  - Không xoá hoặc sửa nội dung rows đã có từ trước — chỉ thêm mới, sắp xếp lại, renumber ID.

### Bước 5: Thông báo tới người dùng

- Ma trận role × action đã dùng (đã qua xác nhận ở Bước 2).
- Số lượng test case đã tạo, phân theo Allowed/Denied/Conditional.
- Số lượng ô/test case cần confirm.

## Ràng buộc

- Không tự bịa role, action hoặc trạng thái quyền (Allowed/Denied/Conditional) nếu spec không nêu rõ — dùng `<cần confirm>` và hỏi lại người dùng.
- Không được phép bịa test case nếu không có đủ thông tin. Dùng tag `<cần confirm>` trong cột Note để đánh dấu.
- Chỉ thao tác trong folder dự án hiện tại (Native Search / Claude), nghiêm cấm thao tác trên folder khác.
