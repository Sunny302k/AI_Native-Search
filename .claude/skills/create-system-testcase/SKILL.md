---
name: create-system-testcase
description: Đây là skill để thực hiện tạo system test case hoặc test case cho một luồng nghiệp vụ nào đó
trigger: "tạo system test case cho [luồng nghiệp vụ]", "tạo test case luồng nghiệp vụ cho [...]" hoặc "create system test case cho [...]" — áp dụng khi yêu cầu nhắc rõ "system test case"/"luồng nghiệp vụ"/test case đi qua nhiều role, KHÔNG dùng cho test case 1 feature/màn hình đơn lẻ (→ create-testcases) hoặc test case API (→ create-api-testcase)
---
## Hướng dẫn tạo test case

### Bước 1: Đọc hiểu specs

Tìm hiểu xem trong luồng nghiệp vụ có những tác nhân (role) nào. Có những check point nào với từng role. Xác định cụ thể được luồng tương tác nghiệp vụ giữa các role.

Trong trường hợp có điểm chưa rõ ràng hãy đặt câu hỏi cho người dùng.

### Bước 2: Tạo test case

##### 2.1 Các kỹ thuật sử dụng

Sử dụng các kỹ thuật như Use case, chuyển đổi trạng thái, bảng quyết định để thực hiện bộ test case.

##### 2.2 Định dạng output — dùng chung schema 10 cột với create-testcases

Mỗi luồng nghiệp vụ hoàn chỉnh (đi qua hết các role cần thiết) là **1 dòng duy nhất** trong file CSV — không tách nhiều dòng theo role như bảng nháp; toàn bộ thao tác của mọi role được gộp vào chung 1 ô Test Steps, đánh số liên tục kèm tag `[Role]` ở đầu mỗi bước.

| ID | Test Type | Field / Phần | Chi tiết test | Cụ thể hơn | Preconditions | Test Steps | Input DB/Setting | Expected Result | Note |

- **ID**: `userstoryID_TCNumber` (renumber lại khi gộp file, xem Bước 4).
- **Test Type**: luôn là `System`.
- **Field / Phần**: **không có field cụ thể** vì đây là luồng xuyên nhiều màn hình/role — dùng **tên luồng nghiệp vụ chính** (chức năng bị ảnh hưởng/kiểm thử), KHÔNG ghi task ID (ví dụ: `Phê duyệt nghỉ phép`, `Đồng bộ SO → đẩy FO cho supplier`).
- **Chi tiết test**: mô tả ngắn về kịch bản/nhánh cụ thể của luồng (ví dụ: `Luồng đầy đủ 2 cấp duyệt Manager → HR`).
- **Cụ thể hơn**: điều kiện phân biệt kịch bản này với kịch bản khác của cùng luồng nếu cần (ví dụ: `Manager reject ở bước 2`). Để trống nếu không cần — vẫn giữ đúng vị trí cột.
- **Preconditions**: điều kiện đầu vào trước khi bắt đầu luồng (ví dụ: balance phép năm hiện tại, đơn hàng đã ở trạng thái nào).
- **Test Steps**: TẤT CẢ bước của luồng, đánh số liên tục `1. 2. 3. ...` xuyên suốt các role (không reset số khi đổi role), mỗi bước bắt đầu bằng tag `[Role]`. Khi đổi role, có thể mô tả bằng việc mở tab mới và đăng nhập bằng role khác — không tách dòng bảng.
- **Input DB/Setting**: dữ liệu/setting cần chuẩn bị cho luồng (nếu có). Để trống nếu không cần.
- **Expected Result**: chỉ ghi kết quả tại các bước then chốt (đổi trạng thái, chuyển giao giữa role, kết thúc luồng) — đánh số khớp với số bước trong Test Steps, kèm tag `[Role]` nếu cần làm rõ ai nhìn thấy kết quả đó.
- **Note**: thêm tag `<cần confirm>` nếu bước/kết quả nào còn mù mờ theo spec.

Ví dụ (viết lại ví dụ luồng phê duyệt nghỉ phép theo schema mới):

```
ID,Test Type,Test Objective,,,Preconditions,Test Steps,Input DB/Setting,Expected Result,Note
US1234_TC01,System,Phê duyệt nghỉ phép,Luồng đầy đủ 2 cấp duyệt Manager → HR,,Balance phép năm hiện tại: 12 ngày,"1. [Employee] Đăng nhập hệ thống với vai trò Employee, ghi nhận balance phép năm hiện tại (12 ngày).
2. [Employee] Submit yêu cầu nghỉ phép loại annual, 01/07/2026 - 05/07/2026 (5 ngày), điền đầy đủ thông tin hợp lệ.
3. [Manager] Mở tab mới, đăng nhập vai trò Manager, mở Manager Queue.
4. [Manager] Approve yêu cầu vừa submit ở bước 2.
5. [HR] Mở tab mới, đăng nhập vai trò HR, mở HR Queue.
6. [HR] Approve yêu cầu đó.",,"2. [Manager Queue] Yêu cầu được tạo với status pending_manager, hiển thị message ""Yêu cầu nghỉ phép đã được gửi thành công!"", xuất hiện trong Manager Queue.
4. [HR Queue] Status chuyển pending_manager → pending_hr; yêu cầu biến mất khỏi Manager Queue và xuất hiện trong HR Queue; balance Employee vẫn giữ 12 ngày (chưa trừ).
6. [Employee] Status chuyển pending_hr → approved (final); balance giảm đúng 5 ngày (còn 7 ngày); yêu cầu biến mất khỏi HR Queue.",
```

##### 2.3 Các quy định khác

- Đây là test case system, tập trung chủ yếu vào luồng nghiệp vụ và hạn chế tối đa việc thực hiện validation trên màn hình (đây là nhiệm vụ của integration/functional test).
- Test case cần đi qua nhiều role cho đến khi luồng nghiệp vụ được thực hiện thành công.
- **Không chỉ test luồng thành công (happy path)**: nếu luồng có các bước quyết định (approve/reject/escalate...) do 1 role thực hiện làm rẽ nhánh sang kết cục khác — và nhánh đó cũng đi qua nhiều role để hoàn tất (VD: Manager reject → quay lại Employee; không phải chỉ dừng ở 1 role) — mỗi nhánh kết cục khác nhau (không phải khác thao tác) phải là 1 test case System riêng, cùng dùng kỹ thuật sơ đồ trạng thái/bảng quyết định ở Bước 2.1 để liệt kê hết các kết cục có thể của luồng trước khi viết case, không chỉ dừng ở nhánh thành công. Nhánh nào chỉ ảnh hưởng 1 role/1 màn hình (không cross-role) thì thuộc phạm vi `create-testcases`, không phải ở đây.
- Nghiêm cấm việc mỗi thao tác của 1 role là 1 test case riêng. Luôn nhớ 1 test case (1 dòng CSV) là đi 1 luồng nghiệp vụ chính hoàn chỉnh.
- Dựa vào specs, không bịa thêm nghiệp vụ.
- Trường hợp switch role có thể mô tả bằng việc mở cửa sổ tab mới và đăng nhập bằng role khác.

### Bước 3: Xuất file

- File format: CSV UTF-8 BOM (kiểm tra 3 byte đầu file đúng EF BB BF trước khi báo hoàn thành).
- Folder: `test-cases/userstoryID/`.
- **File đích**: `userstoryID_testcase.csv` — dùng CHUNG file với `create-testcases`, `create-permission-testcase` và `create-impact-testcase` (cả 4 skill cùng schema 10 cột này). Chỉ riêng `create-api-testcase` KHÔNG gộp vào file này (khác schema cột hoàn toàn).

  - Nếu file `userstoryID_testcase.csv` CHƯA tồn tại: tạo file mới, chỉ chứa test case System vừa sinh.
  - Nếu file ĐÃ tồn tại: đọc toàn bộ rows hiện có, giữ nguyên nội dung từng ô, thêm rows System mới vào, rồi sắp xếp lại TOÀN BỘ file:
    1. Nhóm theo **Field / Phần** trước (test hết 1 Field/Phần mới sang Field/Phần khác, không xen kẽ). Với dòng System, Field/Phần chính là tên luồng nghiệp vụ đã xác định ở Bước 2.2.
    2. Trong cùng 1 nhóm Field/Phần, sắp theo thứ tự ưu tiên Test Type: `Happy → Negative → Edge → Permission → Integration → System → Other`.
    3. Renumber lại cột **ID** tuần tự theo thứ tự mới sau khi sắp xếp: `US1234_TC01, TC02, TC03...`.
  - Không xoá hoặc sửa nội dung rows đã có từ trước — chỉ thêm mới, sắp xếp lại, renumber ID.

### Bước 4: Tổng kết, báo cáo

Thống kê số lượng test case đã tạo được, số lượng cần confirm.

## Ràng buộc

- Không được phép bịa test case nếu không có đủ thông tin từ đặc tả hoặc người dùng. Trong trường hợp này, hãy sử dụng tag `<cần confirm>` trong cột Note để đánh dấu các test case cần xác nhận lại.
- Luôn tuân thủ quy định về định dạng và nội dung của test case để đảm bảo tính nhất quán và dễ hiểu cho người dùng.
- Chỉ thao tác trong folder dự án hiện tại (Timind Hub), nghiêm cấm thao tác trên folder khác.
