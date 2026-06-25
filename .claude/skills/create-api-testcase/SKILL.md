
---
name: create-api-testcase
description: Đây là skill để thực hiện tạo API test case từ curl
trigger: "create test case cho [feature/ functionality]" hoặc "tạo test case cho [feature/ functionality]"
---
## Hướng dẫn tạo test case

### Bước 1: Đọc hiểu cURL

Mục tiêu của bước này là phân tích cURL để hiểu API trước khi tạo test case.

1. Phân tích RequestXác định các thông tin sau:

   * HTTP Method (GET, POST, PUT, PATCH, DELETE...)
   * Base URL
   * Endpoint
   * Path Parameter
   * Query Parameter
   * Header
   * Authentication (Bearer Token, API Key, Cookie...)
   * Request Body
   * Content-Type
   * Mục đích của API (Create / Update / Delete / Search / Get Detail...)
2. Phân tích Input

   Đối với từng input (Header, Path Param, Query Param, Body):

   * Tên field
   * Kiểu dữ liệu (nếu suy luận được)
   * Giá trị mặc định
   * Giá trị được truyền trong cURL
   * Vai trò của field
   * Có khả năng là Required hay Optional
   * Có thể suy luận rule validate nào
3. Phân tích Business

   Nếu có thể suy luận:

   * API đang xử lý nghiệp vụ gì
   * Đối tượng chính của API
   * Dữ liệu nào có khả năng ảnh hưởng đến DB
   * API có yêu cầu Authentication hoặc Authorization hay không

   Nếu cURL không đủ thông tin để xác định, hãy sử dụng tag `<cần confirm>` để đánh dấu, không tự bịa nghiệp vụ.

### Bước 2: Tạo test case

##### 2.1 Các kỹ thuật sử dụng

Áp dụng các kỹ thuật phù hợp với API:

* Happy Path
* Validation Testing
* Negative Testing
* Boundary Value Analysis (BVA)
* Equivalence Partitioning (EP)
* Decision Table (nếu có business rule)
* State Transition (nếu API phụ thuộc trạng thái dữ liệu)
* Authentication Testing
* Authorization Testing
* Error Handling
* Response Validation
* Database Validation (nếu có thể suy luận)
* Business Rule Validation
* Idempotency (đối với PUT/PATCH/DELETE khi phù hợp)

Không áp dụng máy móc tất cả kỹ thuật. Chỉ sử dụng kỹ thuật phù hợp với từng API.

##### 2.2 Phạm vi test case cần tạo

Ưu tiên tạo test case theo thứ tự sau:

**A. Functional**

* API hoạt động đúng với dữ liệu hợp lệ
* Status Code
* Response Body
* Response Message

**B. Validation**

Đối với từng field:

* Required
* Null
* Empty
* Sai kiểu dữ liệu
* Sai format
* Boundary (Min/Max)
* Giá trị đặc biệt
* Duplicate (nếu phù hợp)

**C. Parameter**

Đối với:

* Header
* Path Param
* Query Param
* Body

Kiểm tra:

* Thiếu
* Sai
* Không hợp lệ

**D. Authentication**

* Không truyền Token
* Token sai
* Token hết hạn

**E. Authorization**

* Không đủ quyền
* Đúng quyền

**F. Business Rule**

Nếu có thể suy luận:

* Duplicate Data
* Resource Not Found
* Invalid State
* Conflict Data
* Business Validation

**G. Response**

Kiểm tra:

* Status Code
* Response Schema
* Response Data
* Error Message

**H. Database**

Nếu API có tác động dữ liệu:

* Insert
* Update
* Delete
* Không thay đổi dữ liệu khi request thất bại

Không tạo các test case không thể suy luận từ cURL.

##### 2.3 Định dạng mong muốn

* Xuất file dưới dạng CSV UTF-8 BOM, mỗi cột được đặt trong `""` để chống hiện tượng vỡ layout
* Sử dụng ký tự xuống dòng chuẩn `/n`
* **Thông tin API:**

  Thông tin API phải được hiển thị **cùng file** với bảng test case (cùng 1 file CSV), ở **phần đầu tiên của file**, sau đó mới đến bảng test case. Không hiển thị thông tin này riêng ở chat mà thiếu trong file.

  Trước bảng test case, ghi thông tin tổng quan của API:

  * API Name
  * Method
  * Endpoint
  * Authentication
  * Description (nếu suy luận được)

  Mỗi thông tin là 1 dòng CSV gồm 2 cột "Label","Value", theo sau bởi 1 dòng trống để ngăn cách với bảng test case phía dưới. Ví dụ:

  "API Name","Create Product"
  "Method","POST"
  "Endpoint","/api/products"
  "Authentication","Unknown"
  "Description","Unknown"
  "",""

  Nếu không xác định được một thông tin từ cURL thì ghi**Unknown** .

  Các thông tin này chỉ hiển thị một lần ở đầu file, không lặp lại trong từng test case.
* **Định dạng bảng Test Case:**

| ID | Test Case Description       | Path | Detail     | Request Data                                                                                                                                                                                                     | Expected Result                                                                                                                                             | Actual Response | Result | Test Date | Note |
| -- | --------------------------- | ---- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------ | --------- | ---- |
| 1  | Create product successfully | API  | Happy Path | ``Body:``{``  "name": "123",``  "address": "ha noi",``  "address2": "test",``  "city": "hanoi",``  "state": "ha noi",``  "country": "viet nam",``  "zip": "10001",``  "currency": "vnd",``  "manager_id": "1"``} | - HTTP Status: 201 Created<br />- Product được tạo thành công.<br />- Response trả về Product ID.<br />- Database có thêm một Product mới. |                 |        |           |      |

* Chỉ sinh dữ liệu cho các cột từ **ID** đến  **Expected Response** .
* Các cột  **Actual Response** ,  **Result** , **Test Date** và **Note** để trống vì đây là các cột dùng trong quá trình execute test.
* Mỗi test case chỉ kiểm tra  **một mục tiêu kiểm thử** .
* **Path** ghi thành phần của Request đang được kiểm thử (API, Header, Path Parameter, Query Parameter hoặc Request Body).
* **Detail** mô tả ngắn gọn loại kiểm thử (Happy Path, Required, Boundary, Authentication, Duplicate, Resource Not Found...).
* **Request** chỉ ghi phần dữ liệu thay đổi so với request gốc trong cURL.
* **Expected Response** luôn trình bày theo thứ tự:
  1. HTTP Status
  2. Response Message (nếu có)
  3. Response Data hoặc Business Result
  4. Database Impact (nếu có)

### Bước 3: Sinh Postman Collection

Mục tiêu: cho phép import trực tiếp vào Postman và chạy tự động (Postman Runner hoặc Newman CLI) toàn bộ test case vừa tạo, không phải dựng tay từng request.

* Sau khi đã hoàn thành bảng test case CSV, luôn sinh thêm 1 file Postman Collection (schema v2.1, JSON) đặt **cùng thư mục** với file CSV, cùng tên gốc, đổi đuôi thành `.postman_collection.json` (ví dụ: `companies-api_testcase.csv` → `companies-api_testcase.postman_collection.json`).
* Sinh kèm 1 file Postman Environment (`<tên-api>.postman_environment.json`) chứa các biến dùng chung (`base_url`, `token`,...). Các giá trị nhạy cảm (token, secret) để **trống** trong file, không hardcode giá trị thật vào Collection/Environment — QA tự điền vào Postman sau khi import.
* Quy tắc dựng Collection:
  * 1 request Postman = 1 dòng test case, giữ đúng thứ tự trong CSV. Tên request bắt đầu bằng ID (ví dụ `TC01 - <Test Case Description>`).
  * Request gốc (Method, URL, Header, Body) lấy từ cURL đầu vào; áp thêm đúng phần thay đổi ở cột Request Data của từng test case (header thiếu thì đánh dấu `disabled: true` thay vì xoá field, để vẫn thấy được trong Postman).
  * Tham số hoá giá trị dùng lại nhiều lần (domain, token) thành biến Postman (`{{base_url}}`, `{{token}}`) thay vì lặp lại giá trị thật trong từng request.
  * Mỗi request có 1 script Tests (`pm.test`) dịch từ cột Expected Result sang assertion:
    * Chỉ `pm.response.to.have.status(<code>)` khi status code đã được xác nhận (không gắn `<cần confirm>`).
    * Với Expected Result đang gắn `<cần confirm>`, không assert cứng — viết `// TODO: cần confirm ...` kèm `console.log(pm.response.code)` để QA tự quan sát kết quả thực tế ở lần chạy đầu rồi mới chốt assertion.
  * Test case cần dữ liệu không thể tự sinh hợp lệ từ máy (ví dụ token hết hạn cần chữ ký thật từ server) thì dùng biến riêng (`{{expired_token}}`) và ghi rõ trong `description` của request rằng QA cần tự cung cấp giá trị trước khi chạy.
  * Test case có thể tự sinh được bằng cách biến đổi dữ liệu gốc (ví dụ token bị chỉnh sửa 1 ký tự để sai signature) thì dùng Pre-request Script để tự tạo giá trị đó từ `{{token}}`, không cần QA can thiệp tay.
* Không sinh Collection nếu bảng test case CSV chưa hoàn chỉnh.

##### 2.4 Các quy định khác

* Đây là  **test case API** , tập trung kiểm thử Request và Response của API, không kiểm thử giao diện (UI) hoặc các validation chỉ hiển thị trên màn hình.
* Một test case chỉ kiểm tra  **một mục tiêu kiểm thử (One Test Case = One Testing Objective)** . Không kết hợp nhiều mục tiêu trong cùng một test case.
* Luôn ưu tiên sinh test case theo đúng thứ tự:
  1. Functional (Happy Path)
  2. Validation
  3. Boundary Value
  4. Authentication
  5. Authorization
  6. Business Rule
  7. Response Validation
  8. Database Validation (nếu phù hợp)
* Chỉ tạo test case dựa trên thông tin có trong cURL và các thông tin người dùng cung cấp. Không tự suy diễn Business Rule hoặc Rule Validate nếu không có căn cứ.
* Validation phải được phân tích trên toàn bộ Request theo thứ tự:
  * Header
  * Path Parameter
  * Query Parameter
  * Request Body
* Mỗi Request Component (Header, Path Parameter, Query Parameter, Request Body) cần được xem xét để tạo test case nếu có giá trị kiểm thử. Không bỏ sót Request Component nào.
* Chỉ tạo test case khi có giá trị kiểm thử. Không tạo các test case trùng lặp hoặc chỉ khác nhau về cách diễn đạt.
* Cột **Request** chỉ ghi phần dữ liệu thay đổi so với request gốc trong cURL. Không lặp lại toàn bộ Request của API.
* Cột **Expected Response** phải mô tả các kết quả có thể kiểm chứng được, ưu tiên theo thứ tự:
  * HTTP Status Code
  * Response Message
  * Response Data hoặc Business Result
  * Database Impact (nếu có)
* Không sử dụng các Expected Response mang tính chung chung như:
  * API hoạt động đúng.
  * API xử lý thành công.
  * Hệ thống trả về đúng.
* Đối với API yêu cầu Authentication hoặc Authorization, cần tạo đầy đủ các test case tương ứng. Nếu API không yêu cầu xác thực hoặc phân quyền thì không tạo các test case này.
* Database Validation chỉ áp dụng cho các API có khả năng tạo mới, cập nhật, xóa hoặc thay đổi trạng thái dữ liệu. Đối với API chỉ đọc dữ liệu (GET), không tạo Database Validation nếu không có yêu cầu đặc biệt.
* Các cột  **Actual Response** ,  **Result** , **Test Date** và **Note** là các cột phục vụ quá trình execute test, luôn để trống khi sinh test case.
* Sau khi hoàn thành, tự rà soát bộ test case để đảm bảo:
  * Không có test case trùng lặp.
  * Không bỏ sót Request Component cần kiểm thử.
  * Không bỏ sót nhóm kiểm thử quan trọng.
  * Expected Response đầy đủ, rõ ràng và có thể kiểm chứng.
  * Bộ test case có tính nhất quán về cách trình bày và mức độ chi tiết.
* Ưu tiên chất lượng và độ bao phủ của bộ test case hơn số lượng test case.
