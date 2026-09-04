---
name: create-system-testcase
description: Đây là skill để thực hiện tạo system test case hoặc test case cho một luồng nghiệp vụ nào đó
trigger: "tạo system test case cho [luồng nghiệp vụ]", "tạo test case luồng nghiệp vụ cho [...]" hoặc "create system test case cho [...]" — áp dụng khi yêu cầu nhắc rõ "system test case"/"luồng nghiệp vụ"/test case đi qua nhiều role, KHÔNG dùng cho test case 1 feature/màn hình đơn lẻ (→ create-functional-testcase) hoặc test case API (→ create-api-testcase)
---
## Hướng dẫn tạo test case

### Bước 1: Đọc hiểu specs

Tìm hiểu xem trong luồng nghiệp vụ có những tác nhân (role/actor) nào — kể cả hệ thống tự động (VD Native Search tự chạy Schedule Sync theo lịch, hoặc Merchandise Campaign tự re-evaluate Score sau mỗi lần sync, không phải người thao tác). Có những check point nào với từng tác nhân. Xác định cụ thể được luồng tương tác nghiệp vụ giữa các tác nhân.

Trong trường hợp có điểm chưa rõ ràng hãy đặt câu hỏi cho người dùng.

### Bước 2: Tạo test case

##### 2.1 Các kỹ thuật sử dụng

Sử dụng các kỹ thuật như Use case, chuyển đổi trạng thái, bảng quyết định để thực hiện bộ test case.

##### 2.2 Định dạng output — dùng chung schema 10 cột với create-functional-testcase

Mỗi luồng nghiệp vụ hoàn chỉnh (đi qua hết các tác nhân cần thiết) là **1 record CSV duy nhất** — không tách nhiều record theo tác nhân như bảng nháp; toàn bộ thao tác của mọi tác nhân được gộp vào chung 1 ô Test Steps, đánh số liên tục kèm tag `[Actor]` ở đầu mỗi bước.

Lưu ý: "1 record" ở đây là 1 dòng khi mở bằng Excel/Google Sheets, KHÔNG phải 1 dòng vật lý trong file text. Ô Test Steps/Expected Result của test case System thường rất dài nên record sẽ trải trên nhiều dòng vật lý — đó là đúng chuẩn (xem Quy tắc trình bày nội dung ô bên dưới).

KHÔNG dùng dòng banner riêng (đã loại bỏ khỏi mọi skill test case — xem `create-functional-testcase` để biết lý do). Mỗi dòng là 1 test case System thật sự.

| ID | Test Type | Field / Phần | Chi tiết test | Cụ thể hơn | Preconditions | Test Steps | Input DB/Setting | Expected Result | Note |

- **ID**: `userstoryID_TCNumber` (renumber lại khi gộp file, xem Bước 3).
- **Test Type**: luôn là `Integration` (bộ giá trị chuẩn không có loại `System` riêng — luồng nghiệp vụ xuyên nhiều tác nhân thuộc chung nhóm Integration).
- **Field / Phần**: **không có field cụ thể** vì đây là luồng xuyên nhiều màn hình/tác nhân — dùng **tên luồng nghiệp vụ chính** (ví dụ: `Merchant tạo Merchandise Campaign → Score re-evaluate sau Sync`, `BigCommerce trigger Schedule Sync → cập nhật Storefront`), KHÔNG ghi task ID. CHỈ điền ở dòng ĐẦU TIÊN trong số các test case cùng chung 1 luồng (các nhánh/kịch bản khác nhau của cùng luồng); các dòng sau để TRỐNG.
- **Chi tiết test**: mô tả ngắn về kịch bản/nhánh cụ thể của luồng (ví dụ: `Luồng thành công — Sync Success → Storefront cập nhật đúng`). Ở dòng đầu tiên của luồng, có thể lồng thêm câu ngắn nêu các tác nhân tham gia nếu cần, không tách dòng riêng.
- **Cụ thể hơn**: điều kiện phân biệt kịch bản này với kịch bản khác của cùng luồng nếu cần (ví dụ: `Sync Failed → giữ data cũ`). Để trống nếu không cần — vẫn giữ đúng vị trí cột.
- **Preconditions**: viết NGẮN dạng `[Field] = [Value]` (ví dụ: `Filter tree status = [Active]`).
- **Test Steps**: TẤT CẢ bước của luồng, đánh số liên tục `1. 2. 3. ...` xuyên suốt các tác nhân (không reset số khi đổi tác nhân), mỗi bước bắt đầu bằng tag `[Actor]`. Khi đổi actor là người dùng khác role, có thể mô tả bằng việc mở tab mới và đăng nhập bằng role khác; khi actor là hệ thống tự động (VD `[System]` chạy Schedule Sync, `[System]` re-evaluate Merchandise Score), mô tả đúng trigger (cron, event, sync cycle) theo spec chứ không phải thao tác click — không tách dòng bảng.
- **Input DB/Setting**: dữ liệu/setting cần chuẩn bị cho luồng (nếu có). Để trống nếu không cần.
- **Expected Result**: chỉ ghi kết quả tại các bước then chốt (đổi trạng thái, chuyển giao giữa tác nhân, kết thúc luồng) — đánh số khớp với số bước trong Test Steps, kèm tag `[Actor]` nếu cần làm rõ ai/cái gì nhìn thấy kết quả đó.
- **Note**: thêm tag `<cần confirm>` nếu bước/kết quả nào còn mù mờ theo spec.

**Ngắn gọn, không trích dẫn ticket**: mọi ô (Chi tiết test, Cụ thể hơn, Preconditions, Expected Result, Note) viết ngắn gọn, đúng trọng tâm — không lặp lại ngữ cảnh đã rõ từ ô khác. Nghiêm cấm trích dẫn mã task/ticket/AC (vd `NS-2473`, `AC-4`, `Story 5`, "theo NS-2470") trong nội dung — mô tả rule/hành vi bằng ngôn ngữ nghiệp vụ thuần, không dẫn nguồn.

**Quy tắc trình bày nội dung ô** (giống hệt `create-functional-testcase`, áp dụng chuẩn CSV tương thích Excel/Google Sheets):

- Ô nhiều dòng (Test Steps, Expected Result, Preconditions khi nhiều điều kiện) phải bọc trong dấu ngoặc kép `"..."` và dùng **ký tự ngắt dòng thật** (byte LF) bên trong ô. NGHIÊM CẤM giả ngắt dòng bằng thẻ HTML `<br>` / `<br/>` / `<br />` hoặc chuỗi literal `\n` (2 ký tự `\` + `n`) — CSV là text thuần, Excel/Google Sheets không parse HTML nên sẽ hiển thị nguyên văn các ký tự đó trong ô.
- Ô chỉ có 1 dòng thì KHÔNG bọc `"..."`.
- Dấu ngoặc kép có sẵn trong nội dung phải escape thành `""` (theo đúng chuẩn CSV).
- Ô trống thì để trống, KHÔNG ghi N/A, None, *, Null — vẫn phải giữ đúng vị trí cột (đủ dấu phẩy phân tách) dù ô đó trống.
- Ký tự ngắt dòng cuối mỗi record dùng CRLF (`\r\n`), không dùng LF đơn.

Ví dụ (2 test case cùng 1 luồng — nhánh success và nhánh failed, dòng 2 để trống cột Field/Phần):

```
ID,Test Type,Test Objective,,,Preconditions,Test Steps,Input DB/Setting,Expected Result,Note
US1234_TC01,Integration,BigCommerce trigger Schedule Sync → cập nhật Storefront,Luồng thành công — Sync Success → Filter/Merchandise cập nhật đúng,,Schedule Sync = [Enabled, mỗi 6h],"1. [Merchant] Cấu hình Schedule Sync cho data type Product, lưu setting.
2. [System] Đến giờ trong lịch, tự động trigger Manual Sync ngầm cho Product.
3. [System] Sync chạy xong, status chuyển Success, ghi Sync History.
4. [System] Merchandise Campaign tự re-evaluate Score dựa trên data Product mới.
5. [Customer] Truy cập Storefront, kiểm tra Filter/Merchandise ranking.",,"1. [Admin] Setting lưu thành công, hiển thị đúng lịch đã cấu hình.
3. [Sync History] Record mới xuất hiện với status Success, đúng thời điểm theo lịch.
4. [Merchandise] Score cập nhật đúng công thức dựa trên data Product mới nhất.
5. [Storefront] Filter/Merchandise hiển thị đúng theo data đã sync + Score mới, không còn data cũ.",
US1234_TC02,Integration,,Sync lỗi giữa chừng — Failed → giữ data cũ,Schedule Sync Failed,Schedule Sync = [Enabled, mỗi 6h],"1. [Merchant] Cấu hình Schedule Sync như TC01.
2. [System] Đến giờ, trigger sync nhưng gặp lỗi (VD mất kết nối BigCommerce), status chuyển Failed.
3. [System] Ghi nhận Failed vào Sync History, gửi email thông báo cho Merchant (nếu Notification bật).
4. [Customer] Truy cập Storefront trong lúc Sync đang Failed.",,"2. [Sync History] Record mới có status Failed, kèm lý do lỗi.
3. [Merchant] Nhận được email thông báo Sync Failed (nếu đã bật Notification).
4. [Storefront] Vẫn hiển thị đúng theo data của lần sync Success gần nhất, không bị mất dữ liệu hay lỗi hiển thị.",
```

##### 2.3 Các quy định khác

- Đây là test case system, tập trung chủ yếu vào luồng nghiệp vụ và hạn chế tối đa việc thực hiện validation trên màn hình (đây là nhiệm vụ của integration/functional test).
- Test case cần đi qua nhiều tác nhân cho đến khi luồng nghiệp vụ được thực hiện thành công (hoặc kết thúc ở 1 kết cục xác định).
- **Không chỉ test luồng thành công (happy path)**: nếu luồng có các bước quyết định (approve/reject/retry/escalate...) do 1 tác nhân thực hiện làm rẽ nhánh sang kết cục khác — và nhánh đó cũng đi qua nhiều tác nhân để hoàn tất (VD: Sync Failed → Merchant xem lại setting → trigger lại Manual Sync; không phải chỉ dừng ở 1 tác nhân) — mỗi nhánh kết cục khác nhau (không phải khác thao tác) phải là 1 test case System riêng, cùng dùng kỹ thuật sơ đồ trạng thái/bảng quyết định ở Bước 2.1 để liệt kê hết các kết cục có thể của luồng trước khi viết case, không chỉ dừng ở nhánh thành công. Nhánh nào chỉ ảnh hưởng 1 role/1 màn hình (không cross-actor) thì thuộc phạm vi `create-functional-testcase`, không phải ở đây.
- Nghiêm cấm việc mỗi thao tác của 1 tác nhân là 1 test case riêng. Luôn nhớ 1 test case (1 record CSV) là đi 1 luồng nghiệp vụ chính hoàn chỉnh.
- Dựa vào specs, không bịa thêm nghiệp vụ.
- Trường hợp switch role (người dùng) có thể mô tả bằng việc mở cửa sổ tab mới và đăng nhập bằng role khác. Trường hợp actor là hệ thống tự động, mô tả đúng cơ chế trigger (cron/event/sync cycle) theo spec, không suy đoán.

### Bước 3: Xuất file

- File format: CSV UTF-8 BOM, ngắt dòng cuối mỗi record dùng CRLF (`\r\n`), không dùng LF đơn.
- **Checklist bắt buộc trước khi báo hoàn thành** — kiểm tra trên chính file vừa ghi, không được bỏ qua bước nào:

  1. 3 byte đầu file đúng BOM `EF BB BF`.
  2. Số lần xuất hiện chuỗi `<br` trong file phải bằng **0**, và không có chuỗi literal `\n` trong nội dung ô. Nếu > 0 nghĩa là đã giả ngắt dòng bằng HTML/escape — phải sửa thành ngắt dòng thật rồi kiểm tra lại.
  3. Toàn bộ ký tự xuống dòng cuối record là CRLF, không có LF đơn lẻ.
  4. Parse lại file bằng 1 CSV reader chuẩn (KHÔNG tự đếm dấu phẩy/đếm dòng vật lý): số record data đúng bằng tổng số test case trong file, và mỗi record đủ 10 cột.
  5. Mỗi nhóm Field/Phần (mỗi luồng) chỉ có 1 dòng đầu tiên điền giá trị, các dòng sau trong cùng luồng để trống, không xen kẽ.
- Folder: `test-cases/userstoryID/`.
- **File đích**: `userstoryID_testcase.csv` — dùng CHUNG file với `create-functional-testcase`, `create-permission-testcase`, `create-impact-testcase` và `create-sync-testcase` (cả 5 skill cùng schema 10 cột này). Chỉ riêng `create-api-testcase` KHÔNG gộp vào file này (khác schema cột hoàn toàn).

  - Nếu file `userstoryID_testcase.csv` CHƯA tồn tại: tạo file mới, chỉ chứa test case luồng nghiệp vụ (Test Type = Integration) vừa sinh.
  - Nếu file ĐÃ tồn tại: đọc toàn bộ rows hiện có, giữ nguyên nội dung từng ô, thêm rows mới vào, rồi sắp xếp lại TOÀN BỘ file:
    1. Nhóm theo **Field / Phần** trước (test hết 1 Field/Phần mới sang Field/Phần khác, không xen kẽ). Với dòng System, Field/Phần chính là tên luồng nghiệp vụ đã xác định ở Bước 2.2 — dòng đang để trống Field/Phần coi là thuộc luồng của dòng gần nhất phía trên có giá trị.
    2. Trong cùng 1 nhóm Field/Phần, sắp theo thứ tự ưu tiên Test Type: `Happy → Negative → Edge → Sync → Permission → Integration → UI`.
    3. Renumber lại cột **ID** tuần tự theo thứ tự mới sau khi sắp xếp: `US1234_TC01, TC02, TC03...`.
    4. Sau khi sắp xếp, chỉ dòng đầu tiên của mỗi luồng giữ giá trị Field/Phần, các dòng còn lại để trống.
  - Không xoá hoặc sửa nội dung rows đã có từ trước — chỉ thêm mới, sắp xếp lại, renumber ID.

### Bước 4: Tổng kết, báo cáo

Thống kê số lượng test case đã tạo được, số lượng cần confirm.

## Ràng buộc

- Không được phép bịa test case nếu không có đủ thông tin từ đặc tả hoặc người dùng. Trong trường hợp này, hãy sử dụng tag `<cần confirm>` trong cột Note để đánh dấu các test case cần xác nhận lại.
- Luôn tuân thủ quy định về định dạng và nội dung của test case để đảm bảo tính nhất quán và dễ hiểu cho người dùng.
- Chỉ thao tác trong folder dự án hiện tại (Native Search / Claude), nghiêm cấm thao tác trên folder khác.
