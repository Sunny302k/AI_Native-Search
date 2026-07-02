---
name: create-impact-testcase
description: Tạo test case đánh giá ảnh hưởng (impact/regression) của một thay đổi/task hiện tại lên các luồng nghiệp vụ hoặc feature KHÁC trong hệ thống.
trigger: "tạo test case ảnh hưởng cho [task/feature]", "tạo test case impact/regression cho [...]", "task này ảnh hưởng gì tới các luồng khác", "check impact của [...]" — áp dụng khi người dùng muốn xác định và test các luồng/feature KHÁC (ngoài phạm vi spec đang làm) bị tác động gián tiếp bởi 1 thay đổi. KHÔNG dùng cho test case riêng 1 feature/màn hình đang thay đổi (→ create-testcases), test luồng nghiệp vụ chính đầu-cuối (→ create-system-testcase), hoặc test API (→ create-api-testcase)
---

## Hướng dẫn tạo test case impact/regression

### Bước 1: Xác định phạm vi thay đổi của task hiện tại

Đọc spec của task hiện tại, xác định rõ những gì bị thay đổi:

- **Entity/data**: bảng/đối tượng dữ liệu nào bị thêm/sửa/xoá field, đổi kiểu dữ liệu, đổi ràng buộc.
- **Trạng thái (status/state)**: state machine của entity có bị thêm/đổi trạng thái, đổi điều kiện chuyển trạng thái không.
- **Permission/Role**: quyền truy cập, vai trò nào bị thêm/đổi.
- **API/Endpoint**: endpoint nào bị đổi request/response, đổi hành vi.
- **UI Component dùng chung**: component/màn hình nào được nhiều feature khác tái sử dụng (shared component, common table, filter chung...).
- **Business rule/công thức tính toán**: rule nào bị đổi mà nơi khác đang phụ thuộc vào kết quả tính đó.

Nếu spec không đủ rõ để xác định phạm vi thay đổi, hỏi lại người dùng trước khi sang Bước 2.

### Bước 2: Truy vết các luồng/feature khác bị ảnh hưởng

Chủ động tìm ảnh hưởng thay vì chỉ dựa vào những gì spec hiện tại tự nêu:

1. Quét các spec khác trong `docs/specs/` (Glob/Grep theo tên entity, field, trạng thái, permission, API vừa xác định ở Bước 1) để tìm các user story/feature khác có nhắc tới cùng đối tượng.
2. Nếu không tìm đủ thông tin qua spec (spec khác chưa viết, hoặc nằm ngoài phạm vi repo), hỏi trực tiếp người dùng: "Những màn hình/luồng nào khác đang dùng chung [entity/field/trạng thái/permission/API] này?"
3. Với mỗi ứng viên tìm được, xác định rõ **lý do** nó bị ảnh hưởng (impact traceability) — ví dụ: "Order Detail hiển thị field Status vừa đổi giá trị enum", "Report Profit by Product tính toán dựa trên field Cost vừa sửa công thức".
4. **Tra lại spec/Jira gốc của chính từng trigger** (hành động ở luồng khác gây ra ảnh hưởng — ví dụ Cancel SO, Cancel FO, đổi SLA threshold), không suy đoán. Với mỗi trigger, liệt kê đầy đủ:
   - **Trạng thái nguồn hợp lệ**: trigger được phép thực hiện từ những status/state nào của entity (ví dụ Cancel SO chỉ hợp lệ khi status = Open hoặc Mapping Done — cả 2 đều phải liệt kê, không chỉ chọn đại 1 cái).
   - **Hướng biến thiên** nếu trigger là thay đổi số liệu/ngưỡng có tính so sánh (tăng/giảm threshold, mở rộng/thu hẹp phạm vi) — vì tăng và giảm có thể rẽ nhánh logic khác nhau (từ vi phạm thành không vi phạm, và ngược lại).
   - **Phạm vi tác động** nếu trigger có thể áp dụng toàn bộ hoặc một phần đối tượng (ví dụ Cancel FO có thể hủy toàn bộ item hoặc chỉ một phần item — 2 trường hợp này có kết quả hoàn toàn khác nhau, không phải biến thể nhỏ của nhau).

Trình bày danh sách luồng/feature bị ảnh hưởng **kèm danh sách nhánh của từng trigger** (Bước 2.4) cho người dùng xác nhận **trước khi** viết test case ở Bước 3. Không tự ý mở rộng phạm vi nếu người dùng không xác nhận; loại nào người dùng gạt bỏ thì không đưa vào test case.

### Bước 3: Viết test case cho từng luồng bị ảnh hưởng

Áp dụng kỹ thuật: phân tích luồng dữ liệu (data flow), bảng quyết định cho tổ hợp trạng thái/quyền, kiểm tra ngược (regression) tại các điểm tiêu thụ dữ liệu.

**Phân vùng tương đương cho chính trigger**: nếu 1 trigger có nhiều trạng thái nguồn hợp lệ/nhiều hướng biến thiên/nhiều phạm vi tác động đã liệt kê ở Bước 2.4, phải viết **TÁCH RIÊNG 1 test case cho mỗi nhánh** — nghiêm cấm gộp thành 1 case "đại diện" rồi suy ra các nhánh còn lại tương tự (dù công thức tính có vẻ giống nhau, engine xử lý phía backend vẫn có thể rẽ nhánh riêng theo từng trạng thái/hướng, chỉ chạy thử mới biết chắc). Ví dụ: trigger cho phép cancel ở 2 trạng thái (Open, Mapping Done) → bắt buộc 2 test case riêng; trigger có thể hủy toàn bộ hoặc một phần → bắt buộc 2 test case riêng vì 2 trường hợp cho kết quả khác hẳn nhau; trigger đổi ngưỡng số → bắt buộc test cả chiều tăng và chiều giảm.

Mỗi test case phải trả lời: "Sau khi thay đổi của task hiện tại được áp dụng, luồng/feature X còn hoạt động đúng như trước / đúng theo spec X không?" — không test lại toàn bộ chức năng của luồng X, chỉ test đúng điểm giao thoa bị ảnh hưởng.

Quy định về output — dùng đúng 10 cột như skill `create-testcases`:

| ID | Test Type | Field / Phần | Chi tiết test | Cụ thể hơn | Preconditions | Test Steps | Input DB/Setting | Expected Result | Note |

- **ID**: `userstoryID_TCNumber` tạm thời khi mới sinh (ví dụ: `US1234_TC01`) — ID cuối cùng sẽ được renumber lại theo đúng vị trí sau khi gộp/sắp xếp vào file chung ở Bước 4.
- **Test Type**: luôn là `Integration`.
- **Field / Phần**: tên **feature/màn hình bị ảnh hưởng** (ví dụ: `Order Detail`, `Report Profit by Product`). Nghiêm cấm ghi task ID/task name của task đang gây ảnh hưởng vào cột này.
- **Chi tiết test**: mô tả điểm giao thoa đang test (ví dụ: "Hiển thị Status sau khi đổi enum", "Tính Cost sau khi đổi công thức").
- **Cụ thể hơn**: CHỈ 1 cụm từ ngắn (2-6 từ, ví dụ: `Dùng chung field [Cost]`, `Hướng tăng`), KHÔNG viết thành câu và KHÔNG diễn giải lại nội dung đã có ở Expected Result/Preconditions. Để trống nếu không cần — vẫn giữ đúng vị trí cột.
- **Preconditions, Test Steps, Input DB/Setting, Expected Result, Note**: quy tắc trình bày (đa dòng bọc `"..."`, escape `""`, đánh số 1. 2. 3., không dùng `<br>`, ô trống để trống không ghi N/A) giống hệt skill `create-testcases`.

Sắp xếp: gom nhóm theo từng luồng/feature bị ảnh hưởng (test hết 1 luồng mới sang luồng khác).

### Bước 4: Xuất file

- File format: CSV UTF-8 BOM (kiểm tra 3 byte đầu file đúng EF BB BF trước khi báo hoàn thành).
- Folder: `test-cases/userstoryID/` (cùng thư mục với test case chức năng chính của task đó).
- **File đích**: `userstoryID_testcase.csv` — dùng CHUNG file với `create-testcases`, `create-permission-testcase` và `create-system-testcase` (cả 4 skill cùng schema 10 cột này). Chỉ riêng `create-api-testcase` KHÔNG gộp vào file này.

  - Nếu file `userstoryID_testcase.csv` CHƯA tồn tại: tạo file mới, chỉ chứa test case Integration vừa sinh.
  - Nếu file ĐÃ tồn tại: đọc toàn bộ rows hiện có, giữ nguyên nội dung từng ô, thêm rows Integration mới vào, rồi sắp xếp lại TOÀN BỘ file:
    1. Nhóm theo **Field / Phần** trước (test hết 1 Field/Phần mới sang Field/Phần khác, không xen kẽ).
    2. Trong cùng 1 nhóm Field/Phần, sắp theo thứ tự ưu tiên Test Type: `Happy → Negative → Edge → Permission → Integration → System → Other`.
    3. Renumber lại cột **ID** tuần tự theo thứ tự mới sau khi sắp xếp: `US1234_TC01, TC02, TC03...` (bỏ hậu tố `_IMP_` vì cột Test Type đã phân biệt loại).
  - Không xoá hoặc sửa nội dung rows đã có từ trước — chỉ thêm mới, sắp xếp lại, renumber ID.

### Bước 5: Thông báo tới người dùng

- Danh sách luồng/feature được xác định là bị ảnh hưởng (đã qua xác nhận ở Bước 2).
- Số lượng test case đã tạo.
- Số lượng test case cần confirm.

## Ràng buộc

- Không tự bịa luồng bị ảnh hưởng nếu không có căn cứ từ spec hoặc xác nhận của người dùng — sai ở bước truy vết (Bước 2) sẽ kéo theo test case sai phạm vi.
- Không được lấy 1 test case "đại diện" cho 1 trigger rồi coi là đủ nếu trigger đó có nhiều trạng thái nguồn/hướng biến thiên/phạm vi tác động hợp lệ theo spec gốc (xem Bước 2.4 và Bước 3) — đây là lỗi đã xảy ra thực tế và làm bỏ sót logic quan trọng (ví dụ: hủy toàn bộ vs hủy một phần cho kết quả khác hẳn nhau).
- Không được phép bịa test case nếu không có đủ thông tin từ đặc tả hoặc người dùng. Dùng tag `<cần confirm>` trong cột Note để đánh dấu.
- Chỉ thao tác trong folder dự án hiện tại (Timind Hub), nghiêm cấm thao tác trên folder khác.
