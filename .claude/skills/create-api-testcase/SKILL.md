> name: create-system-testcase
> description: Đây là skill để thực hiện tạo API test case từ curl
> trigger: "create test case cho [feature/ functionality]" hoặc "tạo test case cho [feature/ functionality]"

## Hướng dẫn tạo test case

### Bước 1: Đọc hiểu cURL

Phân tích cURL được cung cấp để xác định các thông tin sau:

* API đang dùng để làm gì
* Method: GET / POST / PUT / PATCH / DELETE
* Endpoint
* Path parameter nếu có
* Query parameter nếu có
* Headers
* Authorization / Token nếu có
* Request body nếu có
* Các field trong request body
* Content-Type
* Dữ liệu input đang được truyền lên

Trong trường hợp có điểm chưa rõ ràng, hãy sử dụng tag `<cần confirm>` để đánh dấu, không tự bịa nghiệp vụ.

### Bước 2: Tạo test case

##### 2.1 Các kỹ thuật sử dụng

Sử dụng các kỹ thuật sau để tạo API test case:

* Use case testing
* Equivalence partitioning
* Boundary value analysis
* Decision table
* Negative testing
* Error handling testing
* Authorization testing
* Response validation
* Data mapping nếu có đủ thông tin

##### 2.2 Phạm vi test case cần tạo

Dựa trên cURL, tạo test case cho các nhóm sau nếu có đủ dữ liệu:

* Gọi API thành công với request hợp lệ
* Thiếu required field
* Field = null
* Field = empty
* Sai data type
* Sai format
* Giá trị vượt min / max nếu có thể xác định
* Query parameter không hợp lệ
* Path parameter không hợp lệ
* Missing token
* Invalid token
* Expired token
* Token không có quyền
* Sai method
* Sai endpoint
* Kiểm tra status code
* Kiểm tra response body
* Kiểm tra error message
* Kiểm tra data không bị thay đổi khi request fail
* Kiểm tra data được tạo / cập nhật đúng nếu request success

##### 2.3 Định dạng mong muốn

* Xuất file dưới dạng CSV UTF-8 BOM, mỗi cột được đặt trong `""` để chống hiện tượng vỡ layout
* Sử dụng ký tự xuống dòng chuẩn `/n`
* Các cột bao gồm:
* 

| ID | Test Case Description        | Path      | Detail                                                                                          | Request                                                                                                                                                                                                                                                  | Expected respond                        | Actual Respond | Result | Test date | Note |
| -- | ---------------------------- | --------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------------- | ------ | --------- | ---- |
|    |                              |           |                                                                                                 |                                                                                                                                                                                                                                                          |                                         |                |        |           |      |
| 1  | Create location successfully | locations | - Header contain valid token``- Name is unique and has length``- All other parameters are valid | Header: Valid token``Body:``{``  "name": "123",``  "address": "ha noi",``  "address2": "test",``  "city": "hanoi",``  "state": "ha noi",``  "country": "viet nam",``  "zip": "10001",``  "currency": "vnd",``  "manager_id": "1",``  "parent_id": "1"``} | Satus code: 200``Data follow API design |                |        |           |      |
