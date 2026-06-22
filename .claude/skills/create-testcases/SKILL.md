---
name: create-testcase
description: Tạo testcase cho một feature hoặc functionality cụ thể.
trigger: "create test case cho [feature/ functionality]" hoặc "tạo test case cho [feature/ functionality]"
---
## Hướng dẫn tạo test case

### Bước 1

Xác định đặc tả cần tạo test case, trong trường hợp người dùng không cung cấp thông tin cụ thể hãy tiến hành hỏi lại để có được thông tin về specs.

### Bước 2

Đọc kỹ đặc tả và phân tích để hiểu rõ các yêu cầu, điều kiện và kết quả mong đợi. Trong trường hợp phát hiện các điểm không rõ ràng hoặc mâu thuẫn trong đặc tả, hãy đặt câu hỏi để làm rõ.

### Bước 3

Tiếp nhận các câu trả lời của người dùng. Trường hợp không có câu trả lời tất cả các test case mà cần phải làm rõ thì hãy thêm tag <cần confirm> vào phần test case đó để người dùng có thể dễ dàng nhận biết và xác nhận lại.

### Bước 4: Thực hiện tạo test case

- Tạo test case dựa trên đặc tả đã phân tích,
- Sử dụng các kỹ thuật viết test case chuẩn như:

  - phân vùng tương đương
  - phân tích giá trị biên
  - bảng quyết định
  - sơ đồ trạng thái

Quy định về ouput:

- Mỗi test case cần có:

  - ID: định dạng là userstoryID_testcaseNumber (ví dụ: US1234_TC01)
  - Test type: bao gồm

    - Happy: Input/ luồng hợp lệ đúng theo specs, không cố ý gây lỗi
    - Negative: Cố ý dùng input không hợp lệ/ thiếu/ sai để xác minh hệ thống từ chối đúng cách
    - Edge: Giá trị biên: nhỏ nhất/ lớn nhất, bằng nhau, ngay tại ranh giới chuyển trạng thái (có thể vẫn hợp lệ, không nhất thiết là lỗi)
    - Other: Không thuộc 3 nhóm trên
  - Test case description: mô tả ngắn gọn về mục đích của test case
  - Steps: liệt kê chi tiết các bước cần thực hiện để thực hiện test case
  - Expected Results: mô tả rõ ràng về kết quả mà test case mong đợi đạt được dựa trên specs đã có. trường hợp specs mù mờ hãy xem lại quy định bước 3.
  - Notes: Nếu kết quả tại bước đó còn mù mờ theo spec, thêm tag <cần confirm> vào cột Note và bôi đỏ tag <cần confirm>
  - Mỗi test case chiếm đúng 1 dòng trong file CSV.
  - output: định dạng là bảng với các cột: ID, Test type, Test case description, Steps, Expected results, Note
  - Expected results: Đánh số từng bước trong Steps (1. 2. 3. ...). Trong Expected results, chỉ ghi số + kết quả tại các bước then chốt (trigger validate/ submit/ đổi trạng thái) các bước setup không cần expected. Nếu kết quả tại bước đó còn mù mờ theo spec, thêm tag <cần confirm> vào cột "Note". VD:
  - | Các bước thực hiện                                       | Kết quả mong đợi                 |
    | ------------------------------------------------------------- | ------------------------------------ |
    | 1. Truy cập vào trang abc<br />2. Click button "Đăng ký" | 2. Màn hình đăng ký xuất hiện |
  - file format: csv UTF-8 BOM với quy tắc naming là userstoryID_testcase.csv (ví dụ: US1234_testcase.csv)

    - Lưu ý kỹ thuật: phải ghi rõ byte BOM (EF BB BF / ký tự `﻿`) ở đầu file khi tạo, vì công cụ ghi file dạng text thông thường không tự thêm BOM. Thiếu BOM sẽ khiến Excel mở file CSV tiếng Việt bị lỗi font (mojibake) do tự nhận sai bảng mã.
    - Sau khi tạo file, kiểm tra lại 3 byte đầu file đúng là BOM (EF BB BF) trước khi báo hoàn thành.
  - folder: lưu trữ trong thư mục có tên test-cases/userstoryID (ví dụ: testcases/US1234)

### Bước 5: Thông báo tới người dùng

- Số lượng test case đã tạo
- Số lượng test case cần confirm

## Ràng buộc

- Không được phép bịa test case nếu không có đủ thông tin từ đặc tả hoặc người dùng. Trong trường hợp này, hãy sử dụng tag <cần confirm> để đánh dấu các test case cần xác nhận lại.
- Luôn tuân thủ quy định về định dạng và nội dung của test case để đảm bảo tính nhất quán và dễ hiểu cho người dùng.
