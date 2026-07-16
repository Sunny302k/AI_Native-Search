
---
name: create-testcase
description: Tạo testcase cho một feature hoặc functionality cụ thể.
trigger: "tạo test case cho [feature/màn hình]" hoặc "create test case cho [feature/màn hình]" — áp dụng khi người dùng đã chỉ rõ phạm vi là 1 feature/màn hình riêng lẻ (UI, validation, happy/negative/edge). KHÔNG dùng khi yêu cầu nhắc đến "luồng nghiệp vụ"/"system"/nhiều role (→ create-system-testcase), "API"/"curl" (→ create-api-testcase), hoặc khi người dùng đưa 1 task/user story chung chung chưa nói rõ loại nào (→ create-testcase-suite)
---
## Hướng dẫn tạo test case

### Bước 1

Xác định đặc tả cần tạo test case, trong trường hợp người dùng không cung cấp thông tin cụ thể hãy tiến hành hỏi lại để có được thông tin về specs.

### Bước 2: Đọc spec và đánh giá rủi ro

Đọc kỹ đặc tả và phân tích để hiểu rõ các yêu cầu, điều kiện và kết quả mong đợi. Trong trường hợp phát hiện các điểm không rõ ràng hoặc mâu thuẫn trong đặc tả, hãy đặt câu hỏi để làm rõ.

Trước khi viết test case, xác định vùng rủi ro cao trong feature để phân bổ độ sâu test case hợp lý — không test dàn đều mọi phần như nhau:

- **Rủi ro cao** (cần nhiều test case, đào sâu): business rule/logic tính toán phức tạp, hành vi phụ thuộc thời gian thực (timezone, "giờ hiện tại tại thời điểm submit"), dữ liệu bị nhiều actor cùng tác động đồng thời (race condition), thao tác làm đổi trạng thái không thể hoàn tác.
- **Rủi ro thấp** (test case đại diện, không liệt kê hết mọi giá trị): UI tĩnh, label, style không ảnh hưởng logic.

### Bước 3

Tiếp nhận các câu trả lời của người dùng. Trường hợp không có câu trả lời tất cả các test case mà cần phải làm rõ thì hãy thêm tag <cần confirm> vào phần test case đó để người dùng có thể dễ dàng nhận biết và xác nhận lại.

### Bước 4: Thực hiện tạo test case

- Tạo test case dựa trên đặc tả đã phân tích,
- Sử dụng các kỹ thuật viết test case chuẩn như:

  - phân vùng tương đương
  - phân tích giá trị biên
  - bảng quyết định
  - sơ đồ trạng thái

Quy định về output:

- Cột output (10 cột cố định, đúng thứ tự, không đổi tên/gộp/xoá/thêm cột khác). 3 cột "Field / Phần", "Chi tiết test", "Cụ thể hơn" dùng chung 1 tiêu đề gộp là "Test Objective" (mô phỏng merge cell khi mở trong Excel/Google Sheets: ô tiêu đề đầu ghi "Test Objective", 2 ô tiêu đề còn lại để trống), nhưng value của từng test case vẫn phải tách riêng 3 ô/3 cột như cũ:

  | ID | Test Type | Test Objective (3 cột: Field / Phần \| Chi tiết test \| Cụ thể hơn) | Preconditions | Test Steps | Input DB/Setting | Expected Result | Note |

  - **ID**: định dạng là userstoryID_testcaseNumber (ví dụ: US1234_TC01)
  - **Test Type**: bao gồm

    - Happy: Input/ luồng hợp lệ đúng theo specs, không cố ý gây lỗi
    - Negative: Cố ý dùng input không hợp lệ/ thiếu/ sai để xác minh hệ thống từ chối đúng cách
    - Edge: Giá trị biên: nhỏ nhất/ lớn nhất, bằng nhau, ngay tại ranh giới chuyển trạng thái (có thể vẫn hợp lệ, không nhất thiết là lỗi)
    - Other: Không thuộc 3 nhóm trên
    - (File gộp có thể còn chứa giá trị `Permission`, `Integration`, `System`, `Sync` do `create-permission-testcase`/`create-impact-testcase`/`create-system-testcase`/`create-sync-testcase` sinh ra — skill này không tự tạo 4 loại đó, chỉ giữ nguyên khi gộp file)
  - **Field / Phần** (cột con 1 của Test Objective): tên feature/section/component/màn hình chính bị tác động (ví dụ: Title, Search, Table, Button [Export], Field [Zone Name]). Với test case Integration, ghi tên chức năng/màn hình bị ảnh hưởng, KHÔNG ghi task ID/task name.
  - **Chi tiết test** (cột con 2 của Test Objective): mô tả ngắn gọn cái gì đang được test (ví dụ: Placeholder, Required, Default value, Display data, Disabled state)
  - **Cụ thể hơn** (cột con 3 của Test Objective): CHỈ 1 cụm từ ngắn (2-6 từ), KHÔNG viết thành câu, KHÔNG diễn giải lại rule/công thức đã có ở Expected Result hay Preconditions (VD đúng: `Boundary: 30 ngày`, `Loại trừ Cancelled`, `Case-insensitive`, `Hướng tăng`; VD SAI — nghiêm cấm: `"Chart hiển thị đủ 3 nhóm cột con EU/US/China trong 1 ngày khi có dữ liệu đủ cả 3 location"` vì đây là câu dài lặp lại nội dung đã có ở Expected Result). Nếu không có cụm từ ngắn nào cần thêm, để trống — không cố nhét nội dung vào cho đầy cột.
  - **Preconditions**: điều kiện tiên quyết trước khi thực hiện test (ví dụ: Popup đang mở, Zone đã tồn tại). Để trống nếu không có precondition.
  - **Test Steps**: liệt kê chi tiết các bước cần thực hiện, đánh số 1. 2. 3. ...
  - **Input DB/Setting**: CHỈ liệt kê dữ liệu/giá trị cụ thể thật sự cần chuẩn bị trước để test case chạy đúng và có ý nghĩa validate (VD: trạng thái entity, số lượng bản ghi, giá trị field cụ thể, ngưỡng threshold). KHÔNG liệt kê lại các điều kiện/ngữ cảnh đã ngụ ý sẵn ở Preconditions hoặc suy ra được từ Test Steps (VD "đang nằm trong Time range/Store filter đang áp dụng", "đang được tính vào Total Orders" — đây là bối cảnh/assertion, không phải dữ liệu cần chuẩn bị). Để trống nếu không cần dữ liệu đặc biệt. Nếu có từ 2 giá trị/dữ liệu độc lập thật sự cần thiết trở lên, tách mỗi cái thành 1 dòng gạch đầu dòng `- ...` giống quy tắc của Expected Result (xem Quy tắc trình bày nội dung ô bên dưới) thay vì viết dồn thành 1 câu dài nối bằng dấu phẩy. Chỉ 1 giá trị duy nhất thì viết 1 dòng bình thường, không cần gạch đầu dòng.
  - **Expected Result**: giữ nguyên quy định như skill hiện tại — mô tả rõ ràng kết quả mà test case mong đợi đạt được dựa trên specs đã có. Đánh số từng bước trong Test Steps (1. 2. 3. ...); trong Expected Result chỉ ghi số + kết quả tại các bước then chốt (trigger validate/ submit/ đổi trạng thái), các bước setup không cần expected. Trường hợp specs mù mờ hãy xem lại quy định bước 3.
  - **Note**: Nếu kết quả tại bước đó còn mù mờ theo spec, thêm tag `<cần confirm>` vào cột Note và bôi đỏ tag `<cần confirm>`.

- Mỗi test case chiếm đúng 1 dòng trong file CSV.

- Sắp xếp thứ tự: gom nhóm liền mạch theo **Field / Phần** (test hết 1 Field/Phần mới sang cái khác, không xen kẽ/lặp lại). ID đánh số tuần tự theo thứ tự này.

- Quy tắc trình bày nội dung ô (áp dụng chuẩn CSV, tương thích Excel/Google Sheets):

  - Ô nhiều dòng (Test Steps, Expected Result khi có nhiều bước then chốt, Input DB/Setting khi có từ 2 giá trị/dữ liệu độc lập thật sự cần thiết trở lên) phải bọc trong dấu ngoặc kép `"..."`, xuống dòng thật bên trong ô, KHÔNG dùng `<br>`.
  - Ô chỉ có 1 dòng thì KHÔNG bọc `"..."`.
  - Input DB/Setting nhiều giá trị: mỗi giá trị 1 dòng, bắt đầu bằng `- ` (gạch đầu dòng), không đánh số như Test Steps. Chỉ liệt kê giá trị thật sự cần chuẩn bị (VD: `- SLA threshold Delayed = 72 giờ`, `- 3 FO Cancelled trong period`), không liệt kê lại bối cảnh/điều kiện đã có ở Preconditions.
  - Dấu ngoặc kép có sẵn trong nội dung phải escape thành `""` (theo đúng chuẩn CSV).
  - Ô trống thì để trống, KHÔNG ghi N/A, None, *, Null — vẫn phải giữ đúng vị trí cột (đủ dấu phẩy phân tách) dù ô đó trống, tránh làm lệch cột phía sau.

  Ví dụ:

  ```
  ID,Test Type,Test Objective,,,Preconditions,Test Steps,Input DB/Setting,Expected Result,Note
  US1234_TC01,Happy,Field [Zone Name],Save successfully,Tạo zone mới với tên hợp lệ,Zone đã tồn tại,"1. Nhập Zone Name hợp lệ.
  2. Click [Create Zone].",,2. Zone mới xuất hiện trong danh sách; toast ""Zone created successfully"" hiển thị.,
  ```

- file format: csv UTF-8 BOM với quy tắc naming là userstoryID_testcase.csv (ví dụ: US1234_testcase.csv)

  - Lưu ý kỹ thuật: phải ghi rõ byte BOM (EF BB BF / ký tự `﻿`) ở đầu file khi tạo, vì công cụ ghi file dạng text thông thường không tự thêm BOM. Thiếu BOM sẽ khiến Excel mở file CSV tiếng Việt bị lỗi font (mojibake) do tự nhận sai bảng mã.
    - Sau khi tạo file, kiểm tra lại 3 byte đầu file đúng là BOM (EF BB BF) trước khi báo hoàn thành.
- folder: lưu trữ trong thư mục có tên test-cases/userstoryID (ví dụ: testcases/US1234)

- **Gộp file với các skill cùng schema 10 cột**: `userstoryID_testcase.csv` là file đích CHUNG cho `create-testcases`, `create-permission-testcase` và `create-impact-testcase` (cả 3 dùng đúng 10 cột này). `create-system-testcase` và `create-api-testcase` KHÔNG gộp vào file này vì khác schema cột — vẫn giữ file riêng theo quy định của 2 skill đó.

  - Nếu file `userstoryID_testcase.csv` CHƯA tồn tại: tạo file mới, chỉ chứa test case vừa sinh ở bước này.
  - Nếu file ĐÃ tồn tại (do `create-permission-testcase`/`create-impact-testcase` đã chạy trước): đọc toàn bộ rows hiện có, giữ nguyên nội dung từng ô, thêm rows mới vào, rồi sắp xếp lại TOÀN BỘ file:
    1. Nhóm theo **Field / Phần** trước (test hết 1 Field/Phần mới sang Field/Phần khác, không xen kẽ).
    2. Trong cùng 1 nhóm Field/Phần, sắp theo thứ tự ưu tiên Test Type: Happy → Negative → Edge → Sync → Permission → Integration → System → Other.
    3. Renumber lại cột **ID** tuần tự theo thứ tự mới sau khi sắp xếp: `US1234_TC01, TC02, TC03...` (bỏ hậu tố riêng như `_PERM_`/`_IMP_` vì cột Test Type đã phân biệt loại).
  - Không xoá hoặc sửa nội dung rows đã có từ trước — chỉ thêm mới, sắp xếp lại, renumber ID.

### Bước 5: Thông báo tới người dùng

- Số lượng test case đã tạo
- Số lượng test case cần confirm

## Ràng buộc

- Không được phép bịa test case nếu không có đủ thông tin từ đặc tả hoặc người dùng. Trong trường hợp này, hãy sử dụng tag <cần confirm> để đánh dấu các test case cần xác nhận lại.
- Luôn tuân thủ quy định về định dạng và nội dung của test case để đảm bảo tính nhất quán và dễ hiểu cho người dùng.

