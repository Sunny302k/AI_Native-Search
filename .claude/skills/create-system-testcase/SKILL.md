---
name: create-system-testcase
description: Đây là skill để thực hiện tạo system test case hoặc test case cho một luồng nghiệp vụ nào đó
trigger: "create test case cho [feature/ functionality]" hoặc "tạo test case cho [feature/ functionality]"
---
## Hướng dẫn tạo test case

### Bước 1: Đọc hiểu specs

Tìm hiểu xem trong luồng nghiệp vụ có những tác nhân (role) nào. Có những check point nào với từng role. Xác định cụ thể được luồng tương tác nghiệp vụ giữa các role.

Trong trường hợp có điểm chưa rõ ràng hãy đặt câu hỏi cho người dùng.

### Bước 2: Tạo test case

##### 2.1 Các kỹ thuật sử dụng

Sử dụng các kỹ thuật như Use case, chuyển đổi trạng thái, bảng quyết định để thực hiện bộ test case

##### 2.2 Định dạng mong muốn

- Xuất file dưới dạng CSV UTF-8 BOM, mỗi cột được đặt trong "" để chống hiện tượng vỡ layout
- Sử dụng ký tự xuống dòng chuẩn (/n)
- Các cột bao gồm
- | ID      | TCs description         | Role                                  | Test steps                               | Expected result                            |
  | ------- | ----------------------- | ------------------------------------- | ---------------------------------------- | ------------------------------------------ |
  | ID_000x | Mô tả ngắn về skill | Vai trò thực hiện tại bước này | 1. Đăng nhập với vai trò`<Admin>` | 1. Đăng nhập thành công               |
  |         |                         |                                       | 2. Click tạo mới tài khoản           | 2. Màn hình tạo tài khoản xuất hiện |

##### 2.3 Các quy định khác

- Đây là test case system, tập trung chủ yếu vào luồng nghiệp vụ và hạn chế tối đa việc thực hiện validation trên màn hình (đây nhiệm vụ của integration test)
- Tôi muốn test case cần đi qua nhiều role cho đến khi luồng nghiệp vụ được thực hiện thành công
- Mỗi cell role chỉ có 1 role tại 1 thời điểm, hãy xử lý như sau, nếu 1 role có nhiều thao tác thì các thao tác đó nằm trong 1 cell và thuộc 1 dòng. Khi chuyển sang role khác, tạo dòng mới (vẫn thuộc test case hiện tại), role phù hợp, test step nối tiếp của test step trong test case. Ví dụ:
- | ID      | TCs description                                                                              | Role        | Test steps                                                                                                                                                                                                                                                  | Expected result                                                                                                                                                              |
  | ------- | -------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | TC_0001 | Luồng phê duyệt đầy đủ cho phép năm (annual) - yêu cầu đi qua đủ 2 cấp duyệt | Nhân viên | 1. [Employee] Đăng nhập hệ thống với vai trò Employee, ghi nhận balance phép năm hiện tại (12 ngày).<br />2. [Employee] Submit yêu cầu nghỉ phép loại annual, 01/07/2026 - 05/07/2026 (5 ngày), điền đầy đủ thông tin hợp lệ. | 2. Yêu cầu được tạo với status pending_manager, hiển thị message "Yêu cầu nghỉ phép đã được gửi thành công!", xuất hiện trong Manager Queue.         |
  |         |                                                                                              | Manager     | 3. [Manager] Mở tab mới, đăng nhập vai trò Manager, mở Manager Queue.<br />4. [Manager] Approve yêu cầu vừa submit ở bước 2                                                                                                                   | 4. Status chuyển pending_manager → pending_hr; yêu cầu biến mất khỏi Manager Queue và xuất hiện trong HR Queue; balance Employee vẫn giữ 12 ngày (chưa trừ). |
  |         |                                                                                              | HR          | 5. [HR] Mở tab mới, đăng nhập vai trò HR, mở HR Queue.<br />6. [HR] Approve yêu cầu đó.                                                                                                                                                        | 6. Status chuyển pending_hr → approved (final); balance giảm đúng 5 ngày (còn 7 ngày); yêu cầu biến mất khỏi HR Queue.                                         |
- Nghiêm cấm việc mỗi tạo tác của 1 role là 1 test case. Luôn nhớ 1 test case là đi 1 luồng nghiệp vụ chính hoàn chỉnh
- Dựa vào specs, không bịa thêm nghiệp vụ
- Trường hợp switch role có thể mô tả bằng việc mở cửa sổ tab mới và đăng nhập bằng role khác

### Bước 3: Tổng kết, báo cáo

Thống kê số lượng test case đã tạo được

## Ràng buộc

- Không được phép bịa test case nếu không có đủ thông tin từ đặc tả hoặc người dùng. Trong trường hợp này, hãy sử dụng tag <cần confirm> để đánh dấu các test case cần xác nhận lại.
- Luôn tuân thủ quy định về định dạng và nội dung của test case để đảm bảo tính nhất quán và dễ hiểu cho người dùng.
