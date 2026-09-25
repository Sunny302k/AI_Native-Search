---
name: create-impact-testcase
description: Tạo test case đánh giá ảnh hưởng (impact/regression) của một thay đổi/task hiện tại lên các luồng nghiệp vụ hoặc feature KHÁC trong hệ thống.
trigger: "tạo test case ảnh hưởng cho [task/feature]", "tạo test case impact/regression cho [...]", "task này ảnh hưởng gì tới các luồng khác", "check impact của [...]" — áp dụng khi người dùng muốn xác định và test các luồng/feature KHÁC (ngoài phạm vi spec đang làm) bị tác động gián tiếp bởi 1 thay đổi. KHÔNG dùng cho test case riêng 1 feature/màn hình đang thay đổi (→ create-functional-testcase), test luồng nghiệp vụ chính đầu-cuối (→ create-system-testcase), hoặc test API (→ create-api-testcase)
---

## Hướng dẫn tạo test case impact/regression

### Bước 1: Xác định phạm vi thay đổi của task hiện tại

Đọc spec của task hiện tại, xác định rõ những gì bị thay đổi:

- **Entity/data**: entity nào bị thêm/sửa/xoá field, đổi kiểu dữ liệu, đổi ràng buộc (VD Filter Tree, Filter Node, Merchandise Campaign, Sync Setting).
- **Trạng thái (status/state)**: state machine của entity có bị thêm/đổi trạng thái, đổi điều kiện chuyển trạng thái không (VD Filter Tree Draft→Active, Sync In Progress→Success/Failed).
- **Permission/Role**: quyền truy cập, vai trò nào bị thêm/đổi.
- **API/Endpoint**: endpoint nào bị đổi request/response, đổi hành vi.
- **UI Component dùng chung**: component/màn hình nào được nhiều feature khác tái sử dụng (shared component, common table, filter chung, khung Edit filter node dùng chung cho nhiều loại node...).
- **Business rule/công thức tính toán**: rule nào bị đổi mà nơi khác đang phụ thuộc vào kết quả tính đó (VD công thức Score của Merchandise, rule tính Sale Percentage).

**Nếu field/entity đang sửa là field/entity đã tồn tại từ trước (task hiện tại không phải người tạo ra nó lần đầu)**: tìm và đọc kỹ (không chỉ lướt tên) story/spec gốc đã tạo ra field/entity đó, để xác nhận điều kiện tiên quyết khiến field/entity đó áp dụng được (eligibility precondition) — task hiện tại phải tôn trọng đúng điều kiện này, không được mặc định field/entity luôn tồn tại/áp dụng trong mọi trường hợp. Nếu trong lúc tra cứu Bước 2 tình cờ thấy 1 ticket liên quan nhưng chỉ định dùng cho 1 mục đích hẹp, đọc thêm để không bỏ sót thông tin nền tảng khác.

Nếu spec không đủ rõ để xác định phạm vi thay đổi, hỏi lại người dùng trước khi sang Bước 2.

### Bước 2: Truy vết các luồng/feature khác bị ảnh hưởng

Chủ động tìm ảnh hưởng thay vì chỉ dựa vào những gì spec hiện tại tự nêu:

1. Quét nguồn phát hiện ảnh hưởng theo thứ tự ưu tiên: **(a) issuelinks trên Jira của story hiện tại** (relates to/blocks/...) — rà từng ticket liên kết xem có mô tả luồng TIÊU THỤ dữ liệu/entity vừa thay đổi không, đây thường là nguồn tin cậy trực tiếp nhất trong dự án dùng Jira, phải mở ra đọc chứ không chỉ lướt tên; **(b) các spec khác trong `docs/specs/`** (Glob/Grep theo tên entity, field, trạng thái, permission, API vừa xác định ở Bước 1) để tìm các feature khác có nhắc tới cùng đối tượng. Với thay đổi liên quan tới dữ liệu sync (BigCommerce), đối chiếu thêm `docs/sync-fields-glossary.md` để biết những filter node/module nào khác đang dùng chung field/entity đó.
2. Nếu không tìm đủ thông tin qua (a)/(b) ở trên (chưa có ticket liên kết phù hợp, spec khác chưa viết, hoặc nằm ngoài phạm vi repo), hỏi trực tiếp người dùng: "Những màn hình/luồng nào khác đang dùng chung [entity/field/trạng thái/permission/API] này?"
3. Với mỗi ứng viên tìm được, xác định rõ **lý do** nó bị ảnh hưởng (impact traceability) — ví dụ: "Merge Value đang gộp value theo tên Brand vừa đổi cấu trúc sync", "Merchandise Campaign filter theo Category vừa đổi logic Same level/All level".
4. **Tra lại spec/tài liệu gốc của chính từng trigger** (hành động ở luồng khác gây ra ảnh hưởng — ví dụ xoá Filter Tree, đổi Schedule Sync interval, đổi ngưỡng Low Stock threshold), không suy đoán. Với mỗi trigger, liệt kê đầy đủ:
   - **Trạng thái nguồn hợp lệ**: trigger được phép thực hiện từ những status/state nào của entity (ví dụ Delete Filter Tree chỉ hợp lệ khi status = Draft hoặc Inactive — cả 2 đều phải liệt kê, không chỉ chọn đại 1 cái).
   - **Hướng biến thiên** nếu trigger là thay đổi số liệu/ngưỡng có tính so sánh (tăng/giảm Low Stock threshold, mở rộng/thu hẹp phạm vi Sale Percentage range) — vì tăng và giảm có thể rẽ nhánh logic khác nhau (từ vi phạm thành không vi phạm, và ngược lại).
   - **Phạm vi tác động** nếu trigger có thể áp dụng toàn bộ hoặc một phần đối tượng (ví dụ xoá 1 Category trên BigCommerce có thể ảnh hưởng toàn bộ subcategory bên trong hoặc chỉ gỡ khỏi 1 filter node đang dùng — 2 trường hợp này có kết quả hoàn toàn khác nhau, không phải biến thể nhỏ của nhau).

5. **Kiểm tra CẢ 2 CHIỀU của dữ liệu, không chỉ chiều tiêu thụ (xuôi dòng)**: sau khi xác định feature hiện tại ĐỌC dữ liệu từ đâu để hiển thị/xử lý (chiều xuôi — ai tiêu thụ dữ liệu mà feature này tạo/sửa), phải tự hỏi thêm chiều ngược — **những feature/luồng nào khác GHI/SỬA cùng dữ liệu đó TRƯỚC khi feature hiện tại đọc nó**? Đây là lỗi đã xảy ra thực tế: khi phân tích impact cho 1 feature "đẩy dữ liệu đi" (vd đẩy dữ liệu sang hệ thống khác), chỉ tra được phía tiêu thụ (hệ thống nhận) mà bỏ sót phía sản sinh dữ liệu (các màn/API khác cùng ghi/sửa dữ liệu đó trước) — trong khi cả 2 chiều đều là nguồn impact hợp lệ và cần test riêng.
6. **Nhân rộng sang MỌI feature cùng vai trò tiêu thụ/hiển thị dữ liệu, không dừng lại ở 1 feature vừa được người dùng nêu tên**: nếu dữ liệu đang xét được tiêu thụ bởi ≥2 feature/màn hình, thì danh sách trigger/nhánh đã xác định cho 1 feature tiêu thụ PHẢI được áp dụng lại y hệt cho TẤT CẢ feature tiêu thụ còn lại — không tự giới hạn ở feature đầu tiên vì đó là feature người dùng nhắc tới trước. Tự hỏi: "dữ liệu này còn được đọc lại ở đâu khác nữa không?" trước khi coi phân tích impact đã xong.

Trình bày danh sách luồng/feature bị ảnh hưởng **kèm danh sách nhánh của từng trigger** (Bước 2.4-6) cho người dùng xác nhận **trước khi** viết test case ở Bước 3. Không tự ý mở rộng phạm vi nếu người dùng không xác nhận; loại nào người dùng gạt bỏ thì không đưa vào test case.

### Bước 2.5: Áp dụng đủ bộ kỹ thuật test — BẮT BUỘC cho từng trigger và từng điểm tiêu thụ dữ liệu

Chạy đủ 7 kỹ thuật dưới đây trước khi viết case. Với skill này, đơn vị áp dụng là **cặp (trigger thay đổi → điểm tiêu thụ dữ liệu)**, không phải feature nói chung.

| Kỹ thuật | Áp dụng thế nào trong test impact |
|---|---|
| **5W1H** | *What*: dữ liệu/entity nào bị thay đổi · *Who*: role nào gây ra thay đổi, ai nhìn thấy hậu quả (Merchant ở Admin hay Shopper ở Storefront) · *When*: hậu quả xuất hiện ngay, hay chỉ sau lần sync/re-index/re-evaluate Score tiếp theo · **Where: liệt kê ĐỦ nơi tiêu thụ dữ liệu đó** (màn Admin khác, Storefront ISW/SRP/Category Page, index Elasticsearch, Filter Cache, Merchandise Score, Sync History) — đây là chỗ hay sót nhất · *Why*: hậu quả nghiệp vụ nếu điểm tiêu thụ hiển thị sai · *How*: thay đổi có thể xảy ra qua mấy đường (UI Admin, import, API, Manual/Schedule Sync từ BigCommerce) |
| **Equivalence Partitioning** | Mỗi **trạng thái khác nhau của trigger** là 1 nhánh riêng, không lấy 1 case đại diện cho cả không gian trạng thái. Ví dụ: giá trị đã từng được ghi đè · giá trị chưa từng ghi đè · giá trị hoàn toàn chưa có — 3 nhánh cho hành vi khác nhau |
| **Boundary Value Analysis** | Biên của dữ liệu bị ảnh hưởng: bản ghi cuối cùng còn tham chiếu, bản ghi đầu tiên, số lượng bản ghi liên quan = 0 / 1 / nhiều; mốc thời gian giữa lúc thay đổi và lúc điểm tiêu thụ đọc lại (trước/sau lần sync kế tiếp) |
| **Decision Table** | Bắt buộc khi hậu quả phụ thuộc đồng thời trạng thái trigger × trạng thái bên tiêu thụ (VD: entity bị xoá × điểm tiêu thụ đang ở trạng thái Active/Inactive/Draft) |
| **State Transition** | Rà cả 2 chiều: thay đổi rồi → điểm tiêu thụ hiển thị gì; và hoàn tác/khôi phục thay đổi → điểm tiêu thụ có trở lại đúng trạng thái cũ không. Đặc biệt chú ý trạng thái "tham chiếu treo" khi bản gốc bị xoá (VD dữ liệu đã bị xoá bên BigCommerce nhưng index/filter vẫn còn tham chiếu) |
| **Error Guessing** | Thay đổi xảy ra trong lúc bên tiêu thụ đang mở (2 tab / 2 user); thay đổi đúng lúc job sync đang chạy; Storefront đọc trước khi re-index xong; thay đổi rồi hoàn tác ngay; xoá bản gốc rồi tạo lại bản mới cùng tên; dữ liệu cũ tạo trước khi rule thay đổi |
| **Exploratory** | Đề xuất 3-5 charter, ưu tiên các điểm tiêu thụ mà tài liệu KHÔNG mô tả hậu quả (thường là nơi bug ẩn lâu nhất) |

**Bảng rà kỹ thuật** — lập trước khi viết case và trình bày trong báo cáo cuối:

| Trigger → Điểm tiêu thụ | EP *(số nhánh trạng thái)* | BVA | Decision Table | State Transition | Error Guessing |
|---|---|---|---|---|---|

Ô không áp dụng ghi `–` kèm lý do ngắn. Không được ghi `–` cho **EP** — mọi trigger đều phải liệt kê đủ nhánh trạng thái; lấy 1 case đại diện cho cả không gian trạng thái là lỗi đã xảy ra thực tế.

### Bước 3: Viết test case cho từng luồng bị ảnh hưởng

Áp dụng kỹ thuật: phân tích luồng dữ liệu (data flow), bảng quyết định cho tổ hợp trạng thái/quyền, kiểm tra ngược (regression) tại các điểm tiêu thụ dữ liệu.

**Phân vùng tương đương cho chính trigger**: nếu 1 trigger có nhiều trạng thái nguồn hợp lệ/nhiều hướng biến thiên/nhiều phạm vi tác động đã liệt kê ở Bước 2.4, phải viết **TÁCH RIÊNG 1 test case cho mỗi nhánh** — nghiêm cấm gộp thành 1 case "đại diện" rồi suy ra các nhánh còn lại tương tự (dù công thức tính có vẻ giống nhau, engine xử lý phía backend vẫn có thể rẽ nhánh riêng theo từng trạng thái/hướng, chỉ chạy thử mới biết chắc). Ví dụ: trigger cho phép xoá ở 2 trạng thái (Draft, Inactive) → bắt buộc 2 test case riêng; trigger có thể xoá toàn bộ hoặc một phần → bắt buộc 2 test case riêng vì 2 trường hợp cho kết quả khác hẳn nhau; trigger đổi ngưỡng số → bắt buộc test cả chiều tăng và chiều giảm.

Mỗi test case phải trả lời: "Sau khi thay đổi của task hiện tại được áp dụng, luồng/feature X còn hoạt động đúng như trước / đúng theo spec X không?" — không test lại toàn bộ chức năng của luồng X, chỉ test đúng điểm giao thoa bị ảnh hưởng.

Quy định về output — dùng đúng 10 cột và quy tắc trình bày như skill `create-functional-testcase` (KHÔNG dùng dòng banner — đã loại bỏ, xem file đó để biết lý do):

| ID | Test Type | Field / Phần | Chi tiết test | Cụ thể hơn | Preconditions | Test Steps | Input DB/Setting | Expected Result | Note |

- **ID**: `userstoryID_TCNumber` tạm thời khi mới sinh (ví dụ: `US1234_TC01`) — ID cuối cùng sẽ được renumber lại theo đúng vị trí sau khi gộp/sắp xếp vào file chung ở Bước 4.
- **Test Type**: luôn là `Integration`.
- **Field / Phần**: tên **feature/màn hình bị ảnh hưởng** (ví dụ: `Merge Value`, `Merchandise Campaign`). CHỈ điền ở dòng ĐẦU TIÊN của mỗi nhóm liên tiếp cùng Field/Phần; các dòng sau trong cùng nhóm để TRỐNG. Nghiêm cấm ghi task ID/task name của task đang gây ảnh hưởng vào cột này.
- **Chi tiết test**: mô tả điểm giao thoa đang test (ví dụ: "Merge Value hiển thị đúng sau khi đổi cấu trúc sync Brand", "Merchandise Score tính đúng sau khi đổi công thức Self-learning"). Ở dòng đầu tiên của nhóm, có thể lồng thêm 1 câu ngắn nêu lý do nhóm này bị ảnh hưởng (impact traceability từ Bước 2.3) nếu cần, không tách dòng riêng — diễn giải bằng lời, KHÔNG dán mã ticket của trigger (vd `NS-2473`, `AC-2`) vào câu đó.

**Nghiêm cấm trích dẫn mã task/ticket/AC (kể cả ticket của chính trigger)** trong bất kỳ ô nào — Field/Phần, Chi tiết test, Preconditions, Expected Result, Note. Case Integration vẫn phải mô tả được lý do ảnh hưởng và rule phụ rút ra từ trigger, nhưng bằng ngôn ngữ nghiệp vụ thuần tuý, không bằng mã ticket. Rà lại trước khi báo hoàn thành: không còn mã ticket, `AC-\d`, `AC\d\.\d`, hay `Story \d` nào trong nội dung ô.
- **Cụ thể hơn**: CHỈ 1 cụm từ ngắn (2-6 từ, ví dụ: `Dùng chung field [Brand]`, `Hướng tăng`), KHÔNG viết thành câu và KHÔNG diễn giải lại nội dung đã có ở Expected Result/Preconditions. Để trống nếu không cần — vẫn giữ đúng vị trí cột.
- **Preconditions, Test Steps, Input DB/Setting, Expected Result, Note**: quy tắc trình bày (đa dòng bọc `"..."` + ngắt dòng thật bên trong ô, escape `""`, đánh số 1. 2. 3., ô trống để trống không ghi N/A, Preconditions viết ngắn dạng `[Field] = [Value]`) giống hệt skill `create-functional-testcase`. NGHIÊM CẤM giả ngắt dòng bằng `<br>` / `<br/>` / `<br />` hoặc chuỗi literal `\n` — Excel/Google Sheets không parse HTML, sẽ hiển thị nguyên văn trong ô.

Sắp xếp: gom nhóm theo từng luồng/feature bị ảnh hưởng (test hết 1 luồng mới sang luồng khác).

### Bước 4: Xuất file

- File format: CSV UTF-8 BOM, ngắt dòng cuối mỗi record dùng CRLF (`\r\n`), không dùng LF đơn.
- **Checklist bắt buộc trước khi báo hoàn thành** — kiểm tra trên chính file vừa ghi, không được bỏ qua bước nào:

  1. 3 byte đầu file đúng BOM `EF BB BF`.
  2. Số lần xuất hiện chuỗi `<br` trong file phải bằng **0**, và không có chuỗi literal `\n` trong nội dung ô. Nếu > 0 nghĩa là đã giả ngắt dòng bằng HTML/escape — phải sửa thành ngắt dòng thật rồi kiểm tra lại.
  3. Toàn bộ ký tự xuống dòng cuối record là CRLF, không có LF đơn lẻ.
  4. Parse lại file bằng 1 CSV reader chuẩn (KHÔNG tự đếm dấu phẩy/đếm dòng vật lý): số record data đúng bằng tổng số test case trong file, và mỗi record đủ 10 cột.
  5. Mỗi nhóm Field/Phần chỉ có 1 dòng đầu tiên điền giá trị, các dòng sau trong cùng nhóm để trống, không xen kẽ.
- Folder: `test-cases/userstoryID/` (cùng thư mục với test case chức năng chính của task đó).
- **File đích**: `userstoryID_testcase.csv` — dùng CHUNG file với `create-functional-testcase`, `create-permission-testcase`, `create-system-testcase` và `create-sync-testcase` (cả 5 skill cùng schema 10 cột này). Chỉ riêng `create-api-testcase` KHÔNG gộp vào file này.

  - Nếu file `userstoryID_testcase.csv` CHƯA tồn tại: tạo file mới, chỉ chứa test case Integration vừa sinh.
  - Nếu file ĐÃ tồn tại: đọc toàn bộ rows hiện có, giữ nguyên nội dung từng ô, thêm rows Integration mới vào, rồi sắp xếp lại TOÀN BỘ file:
    1. Nhóm theo **Field / Phần** trước (test hết 1 Field/Phần mới sang Field/Phần khác, không xen kẽ) — dòng nào đang để trống Field/Phần thì coi là thuộc nhóm của dòng gần nhất phía trên có giá trị.
    2. Trong cùng 1 nhóm Field/Phần, sắp theo thứ tự ưu tiên Test Type: `Happy → Negative → Edge → Sync → Permission → Integration → UI`.
    3. Renumber lại cột **ID** tuần tự theo thứ tự mới sau khi sắp xếp: `US1234_TC01, TC02, TC03...` (bỏ hậu tố `_IMP_` vì cột Test Type đã phân biệt loại).
    4. Sau khi sắp xếp, chỉ dòng đầu tiên của mỗi nhóm giữ giá trị Field/Phần, các dòng còn lại để trống.
  - Không xoá hoặc sửa nội dung rows đã có từ trước — chỉ thêm mới, sắp xếp lại, renumber ID.

### Bước 5: Thông báo tới người dùng

- Danh sách luồng/feature được xác định là bị ảnh hưởng (đã qua xác nhận ở Bước 2).
- Số lượng test case đã tạo.
- Số lượng test case cần confirm.
- **Bảng rà kỹ thuật** (Bước 2.5) — đầy đủ mọi cặp trigger → điểm tiêu thụ, kèm lý do cho từng ô ghi `–`.
- **3-5 charter exploratory testing**, ưu tiên điểm tiêu thụ mà tài liệu không mô tả hậu quả.
- **Gợi ý bước tiếp theo**: nhắc người dùng chạy skill `review-testcase-quality` để review độc lập (đối chiếu Figma + rà lại 7 kỹ thuật). KHÔNG tự review tại chỗ trong cùng lượt vừa viết case — skill đó chạy qua subagent với context sạch để tránh tự xác nhận chính mình.

## Ràng buộc

- **Không được viết test case khi chưa chạy đủ 7 kỹ thuật ở Bước 2.5 và chưa lập bảng rà kỹ thuật.** Không báo hoàn thành khi báo cáo thiếu bảng rà hoặc thiếu charter exploratory. Áp dụng theo từng cặp (trigger → điểm tiêu thụ) cụ thể, không áp dụng ở mức "thay đổi nói chung".
- Không tự bịa luồng bị ảnh hưởng nếu không có căn cứ từ spec hoặc xác nhận của người dùng — sai ở bước truy vết (Bước 2) sẽ kéo theo test case sai phạm vi.
- Không được lấy 1 test case "đại diện" cho 1 trigger rồi coi là đủ nếu trigger đó có nhiều trạng thái nguồn/hướng biến thiên/phạm vi tác động hợp lệ theo spec gốc (xem Bước 2.4 và Bước 3) — đây là lỗi đã xảy ra thực tế và làm bỏ sót logic quan trọng (ví dụ: xoá toàn bộ vs xoá một phần cho kết quả khác hẳn nhau).
- Không được phép bịa test case nếu không có đủ thông tin từ đặc tả hoặc người dùng. Dùng tag `<cần confirm>` trong cột Note để đánh dấu.
- Chỉ thao tác trong folder dự án hiện tại (Native Search / Claude), nghiêm cấm thao tác trên folder khác.
