---
name: create-api-testcase
description: Tạo test case kiểm thử API từ tài liệu CURL hoặc API docs, xuất ra CSV UTF-8 BOM (ID, Description, Method, Payload, Expected result) và Postman Collection JSON v2.1 có sẵn test script kiểm tra HTTP status code.
trigger: "create api test case từ [CURL/API docs]" hoặc "tạo test case API từ [CURL/API docs]"
---
## Hướng dẫn tạo test case

### Bước 1: Tiếp nhận và xác định nguồn đầu vào

Xác định nguồn tài liệu API cần tạo test case. Nguồn đầu vào có thể là:

* Một hoặc nhiều câu lệnh CURL
* API docs (OpenAPI/Swagger, Postman collection, mô tả endpoint dạng text...)

Trong trường hợp người dùng chưa cung cấp tài liệu cụ thể, hãy hỏi lại để có được:

* Endpoint (URL) và HTTP method
* Header bắt buộc (ví dụ: Authorization, Content-Type)
* Cấu trúc payload (request body / query params) và ý nghĩa từng trường
* Các ràng buộc của từng trường (bắt buộc/không, kiểu dữ liệu, min/max, định dạng, giá trị hợp lệ)
* Response mong đợi (status code, cấu trúc body) cho từng trường hợp.

### Bước 2: Phân tích tài liệu

Đọc kỹ tài liệu và phân tích để hiểu rõ:

* Method, endpoint, authentication
* Từng trường trong payload: bắt buộc/optional, kiểu dữ liệu, ràng buộc giá trị
* Các mã trạng thái (status code) và body response mong đợi
* **Nếu endpoint thao tác trên 1 resource có state** (VD PATCH/action endpoint chỉ hợp lệ khi resource đang ở 1 số status nhất định): liệt kê đầy đủ TẤT CẢ status nguồn hợp lệ theo tài liệu (không suy đoán/không chỉ lấy 1 status đại diện), và tách riêng test case cho từng status hợp lệ đó — không gộp thành 1 case rồi coi các status hợp lệ khác là tương đương.

Trong trường hợp phát hiện điểm không rõ ràng hoặc mâu thuẫn (ví dụ: ràng buộc trường không nêu rõ, không biết status code mong đợi), hãy đặt câu hỏi để làm rõ.

### Bước 3: Tiếp nhận câu trả lời

Tiếp nhận các câu trả lời của người dùng. Trường hợp không có đủ thông tin để xác định kết quả mong đợi của một test case, hãy thêm tag <cần confirm> vào cột Expected result của test case đó để người dùng dễ nhận biết và xác nhận lại. Nghiêm cấm bịa kết quả mong đợi.

### Bước 4: Thực hiện tạo test case

Tạo test case dựa trên tài liệu đã phân tích, áp dụng các kỹ thuật kiểm thử API chuẩn:

Bao gồm

1. Kiểm thử với header bao gồm các yếu tố như Authentication, token... Với endpoint cần đăng nhập (🔒), bao phủ đầy đủ các trường hợp authorization sau (bỏ qua trường hợp nào nếu tài liệu xác nhận không áp dụng):
   1. **Happy case**: token hợp lệ, đúng quyền → thành công (2xx)
   2. **Thiếu header Authorization**: không gửi header → 401 (vd: `No access token provided.`)
   3. **Token sai cấu trúc**: token không đủ 3 phần / không đúng định dạng JWT → 401 (vd: `Invalid token structure`)
   4. **Token sai chữ ký**: phần signature bị sửa, không khớp → 401 (vd: `Invalid token signature`)
   5. **Token payload không hợp lệ**: payload lỗi / thiếu `exp` → 401 (vd: `Invalid token payload`)
   6. **Token hết hạn**: `exp` đã qua → 401 (vd: `Token has expired`)
   7. **Sai loại token**: dùng nhầm refresh token cho endpoint cần access token (hoặc ngược lại) → 401 (vd: `Invalid token type. Use an access token.`)
   8. **Token của user không còn tồn tại**: user trong token đã bị xóa → 401 (vd: `Token invalid.`)
   9. **Token đã bị thu hồi / vô hiệu hóa**: token cấp trước thời điểm logout, hoặc tái sử dụng sau khi logout → 401 (vd: `Token expired.`)
   10. **Bearer token để trống**: header `Authorization: Bearer`  không có giá trị → 401
   11. **Sai scheme**: header thiếu tiền tố `Bearer`  → 401
   12. **Không đủ quyền (role)**: token hợp lệ nhưng role không có quyền truy cập endpoint → 403
2. Kiểm thử với body: bao gồm việc validate các dữ liệu trên payload

Với 2 thành phần trên thì sử dụng các kỹ thuật sau

- **Phân vùng tương đương** (equivalence partitioning): nhóm payload hợp lệ / không hợp lệ
- **Phân tích giá trị biên** (boundary value analysis): min, max, min-1, max+1 cho các trường số/độ dài chuỗi
- **Bảng quyết định** (decision table): tổ hợp các điều kiện đầu vào
- Bao phủ các nhóm trường hợp:
  - **Happy path**: payload hợp lệ → kết quả thành công (2xx)
  - **Thiếu trường bắt buộc**: bỏ từng trường required
  - **Sai kiểu dữ liệu / sai định dạng**: ví dụ email sai định dạng, số âm
  - **Vi phạm ràng buộc giá trị**: vượt min/max, vượt độ dài
  - **Authentication / Authorization**: thiếu token, token sai, không đủ quyền (401/403)
  - **Resource state precondition** (nếu endpoint là action/transition trên resource có state): 1 test case Happy riêng cho MỖI status nguồn hợp lệ (không gộp đại diện), cộng thêm ít nhất 1 test case resource đang ở status KHÔNG hợp lệ → verify đúng lỗi (409/400) theo tài liệu
  - **Trường hợp đặc biệt**: payload rỗng, dữ liệu trùng lặp, resource không tồn tại (404)

##### 4.1 Quy định về output

Mỗi test case gồm các cột:

- **ID**: định dạng `APIName_TCNumber` hoặc `userstoryID_TCNumber` (ví dụ: `LOGIN_TC01`, `US1234_TC01`)
- **Description**: mô tả ngắn gọn mục đích của test case (test gì, với điều kiện nào)
- **Method**: HTTP method và endpoint (ví dụ: `POST /api/v1/rooms/booking`)
- **Payload**: nội dung request gửi đi (JSON body / query params / header liên quan). Với JSON nên giữ nguyên định dạng để dễ đọc/copy
- **Expected result**: status code mong đợi \+ mô tả response body/thông báo lỗi mong đợi dựa trên tài liệu. Trường hợp tài liệu không nêu rõ → dùng tag `<cần confirm>`

| ID          | Description                                        | Method                  | Payload                                                              | Expected result                                    |
| :---------- | :------------------------------------------------- | :---------------------- | :------------------------------------------------------------------- | :------------------------------------------------- |
| LOGIN\_TC01 | Đăng nhập thành công với thông tin hợp lệ | POST /api/v1/auth/login | {"email":"[user@abc.com](mailto:user@abc.com)","password":"Abc@1234"} | 200 OK, response trả về accessToken hợp lệ     |
| LOGIN\_TC02 | Đăng nhập với mật khẩu sai                   | POST /api/v1/auth/login | {"email":"[user@abc.com](mailto:user@abc.com)","password":"wrong"}    | 401 Unauthorized, message "Invalid credentials"    |
| LOGIN\_TC03 | Thiếu trường email (bắt buộc)                 | POST /api/v1/auth/login | {"password":"Abc@1234"}                                              | 400 Bad Request, message báo email là bắt buộc |


##### 4.2 Quy định về file

- **File format**: CSV UTF-8 BOM
- Mỗi cột được đặt trong dấu `"` để chống vỡ layout khi nội dung chứa dấu phẩy, dấu ngoặc hoặc xuống dòng
- Sử dụng ký tự xuống dòng chuẩn (`\n`) khi cần xuống dòng trong một cell
- **Naming**: `APIName_api-testcase.csv` (đứng riêng, không gắn userstoryID) hoặc `userstoryID_api-testcase.csv` khi API thuộc phạm vi 1 userstoryID (kebab/snake theo tên API, ví dụ: `login_api-testcase.csv`, `US1234_api-testcase.csv`). KHÔNG dùng tên `userstoryID_testcase.csv` — tên đó là file gộp chung của `create-testcases`/`create-permission-testcase`/`create-system-testcase`/`create-impact-testcase`, trùng tên sẽ ghi đè mất dữ liệu của nhau.
- **Folder**: lưu trong `testcases/APIName` hoặc `test-cases/userstoryID` khi thuộc phạm vi 1 userstoryID (ví dụ: `testcases/login`, `test-cases/US1234`) — cùng thư mục với file test case gộp của userstoryID đó nếu có.

### Bước 5: Xuất file JSON để import vào Postman

Ngoài file CSV, sinh thêm một **Postman Collection v2.1** (JSON) để import trực tiếp vào Postman. Mỗi test case ở Bước 4 trở thành một request trong collection. Quy định:

##### 5.1. Cấu trúc collection

- Dùng schema: `https://schema.getpostman.com/json/collection/v2.1.0/collection.json`
- `info.name` \= tên API \+ " \- API Test Cases" (vd: `Register - API Test Cases`)
- Mỗi request đặt tên theo `ID - Description` (vd: `REGISTER_TC01 - Happy path đăng ký thành công`)
- Dùng **collection variable** để tái sử dụng:
  - `{{baseUrl}}` cho base URL (vd `http://localhost/api`)
  - `{{accessToken}}` cho access token ở các endpoint cần đăng nhập
  - Khai báo sẵn các biến này trong mảng `variable` của collection (giá trị mặc định hợp lý hoặc rỗng kèm mô tả)
- Body dạng `raw` \+ `options.raw.language = "json"`; header `Content-Type: application/json` khi có body.
- Endpoint cần đăng nhập (🔒): thêm header `Authorization: Bearer {{accessToken}}` (riêng các case test lỗi auth thì chỉnh header theo đúng kịch bản: bỏ header, token sai, token rỗng...).

##### 5.2. Trường ngẫu nhiên / duy nhất trong happy path → dùng biến động Postman

Với các case **happy path** có trường yêu cầu giá trị ngẫu nhiên hoặc duy nhất (để tránh trùng dữ liệu khi chạy lại nhiều lần), KHÔNG hard-code mà dùng biến động (dynamic variables) của Postman trong body:

| Loại trường                   | Biến Postman gợi ý   |
| :------------------------------- | :---------------------- |
| username                         | `{{$randomUserName}}` |
| email                            | `{{$randomEmail}}`    |
| password                         | `{{$randomPassword}}` |
| họ tên                         | `{{$randomFullName}}` |
| số nguyên                      | `{{$randomInt}}`      |
| UUID / id duy nhất              | `{{$guid}}`           |
| chuỗi duy nhất theo thời gian | `{{$timestamp}}`      |

Ví dụ body happy path:

{ "username": "{{$randomUserName}}", "email": "{{$randomEmail}}", "password": "secret123", "role": "librarian" }

Lưu ý: chỉ áp dụng biến động cho **happy path** (giá trị hợp lệ ngẫu nhiên). Các case kiểm thử biên/validation/lỗi vẫn phải dùng giá trị cố định, có chủ đích (vd chuỗi 51 ký tự, email sai định dạng) để đảm bảo đúng điều kiện test. Case test trùng lặp (409) phải dùng giá trị cố định đã tồn tại, không dùng biến ngẫu nhiên.

##### 5.3. Test script kiểm tra HTTP status code

Mỗi request phải có một test script (đặt trong `event` với `listen: "test"`) để Postman tự kiểm tra status code mong đợi:

pm.test("Status code is 201", function () {

    pm.response.to.have.status(201);

});

- Status code lấy đúng theo cột Expected result của test case tương ứng (201, 401, 409, 422, 429...).
- Khuyến khích thêm assertion kiểm tra `message`/`success` trong body khi tài liệu nêu rõ, ví dụ:

pm.test("Status code is 409", function () {

    pm.response.to.have.status(409);

});

pm.test("Message khớp tài liệu", function () {

    pm.expect(pm.response.json().message).to.eql("Email already registered.");

});

- Với test case gắn `<cần confirm>` (chưa chắc status/message), chỉ assert phần đã chắc chắn và thêm comment `// <cần confirm>` trong script.

##### 5.4. Quy định về file JSON

- **File format**: JSON UTF-8 (không BOM)
- **Naming**: `APIName_postman_collection.json` (vd: `register_postman_collection.json`)
- **Folder**: lưu cùng thư mục với file CSV — `testcases/APIName` (vd: `testcases/register`)

### Bước 6: Thông báo tới người dùng

- Số lượng test case đã tạo
- Số lượng test case cần confirm (`<cần confirm>`)
- Các nhóm trường hợp đã bao phủ (happy path, validation, auth...)
- Đường dẫn 2 file đầu ra: file CSV và file Postman Collection JSON

## Ràng buộc

- Chỉ thao tác trong folder LopAI, nghiêm cấm thao tác trên folder khác.
- Không được bịa kết quả mong đợi nếu tài liệu/người dùng không cung cấp đủ thông tin; dùng tag `<cần confirm>` để đánh dấu.
- Luôn tuân thủ định dạng CSV UTF-8 BOM và cấu trúc 5 cột (ID, Description, Method, Payload, Expected result) để đảm bảo tính nhất quán.
- Luôn xuất kèm file Postman Collection JSON v2.1 (UTF-8, không BOM), mỗi request có test script kiểm tra HTTP status code đúng theo Expected result; happy path dùng biến động Postman cho trường ngẫu nhiên/duy nhất.
- Không bịa thêm endpoint, trường hay ràng buộc không có trong tài liệu.

