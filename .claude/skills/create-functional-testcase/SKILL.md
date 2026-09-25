---
name: create-functional-testcase
description: Tạo testcase chức năng cho một feature hoặc functionality cụ thể (schema 10 cột chuẩn dùng chung của team QA Timind).
trigger: "tạo test case cho [feature/màn hình]" hoặc "create test case cho [feature/màn hình]" — áp dụng khi người dùng đã chỉ rõ phạm vi là 1 feature/màn hình riêng lẻ (UI, validation, happy/edge). KHÔNG dùng khi yêu cầu nhắc đến "luồng nghiệp vụ"/"system"/nhiều role (→ create-system-testcase), "API"/"curl" (→ create-api-testcase), hoặc khi người dùng đưa 1 task/user story chung chung chưa nói rõ loại nào (→ create-testcase-suite)
---
## Hướng dẫn tạo test case

### Bước 1

Xác định đặc tả cần tạo test case, trong trường hợp người dùng không cung cấp thông tin cụ thể hãy tiến hành hỏi lại để có được thông tin về specs.

### Bước 2: Đọc spec và đánh giá rủi ro

Đọc kỹ đặc tả và phân tích để hiểu rõ các yêu cầu, điều kiện và kết quả mong đợi. Trong trường hợp phát hiện các điểm không rõ ràng hoặc mâu thuẫn trong đặc tả, hãy đặt câu hỏi để làm rõ.

Trước khi viết test case, xác định vùng rủi ro cao trong feature để phân bổ độ sâu test case hợp lý — không test dàn đều mọi phần như nhau:

- **Rủi ro cao** (cần nhiều test case, đào sâu): business rule/logic tính toán phức tạp, hành vi phụ thuộc thời gian thực (timezone, "giờ hiện tại tại thời điểm submit"), dữ liệu bị nhiều actor cùng tác động đồng thời (race condition), thao tác làm đổi trạng thái không thể hoàn tác.
- **Rủi ro thấp** (test case đại diện, không liệt kê hết mọi giá trị): UI tĩnh, label, style không ảnh hưởng logic.

**Trước khi viết test case cho 1 field/feature đã tồn tại từ trước (task hiện tại chỉ sửa/mở rộng, không phải tạo mới field đó): xác minh điều kiện khiến field/feature đó áp dụng được (eligibility precondition) — không mặc định field đó luôn tồn tại/hiển thị.** Chủ động tìm và đọc kỹ (không chỉ lướt tên) story/spec gốc đã tạo ra field/feature đó lần đầu — nhiều khả năng có sẵn 1 điều kiện gating (VD: field chỉ hiển thị khi entity cha có cấu hình X) mà spec hiện tại không nhắc lại vì coi là hiển nhiên. Nếu xác nhận có precondition dạng này, thêm 1-2 test case riêng xác nhận rõ ranh giới trong/ngoài phạm vi áp dụng — không cần lặp lại precondition đó ở mọi test case khác.

**Khi 1 rule/action được thực thi qua ≥2 kênh song song (vd Import/API/Sync Store/UI cùng validate 1 rule) — mỗi kênh phải được đào sâu ĐỦ NHÁNH như nhau, không lấy 1 kênh làm "kênh mẫu" rồi chỉ viết đại diện 1-2 case cho các kênh còn lại.** Lỗi thường gặp: dựng hẳn 1 ma trận đầy đủ cho kênh dễ test nhất (thường là kênh dạng file/Import, vì tự nhiên hợp format matrix), rồi chỉ viết 1 case "báo lỗi đúng cách của từng kênh" cho các kênh còn lại và coi là đã đủ — đây là lỗi đã xảy ra thực tế (Import có ma trận đầy đủ nhánh nhưng API/Sync Store mỗi kênh chỉ có 1-2 case, dù cả 3 đều nhận input thô không qua UI-constraint và đều phải chịu chung 1 bộ rule validate). Trước khi báo hoàn thành, liệt kê rõ: mỗi kênh phi-UI (nhận input trực tiếp, không bị giới hạn bởi dropdown/menu như UI) có đang có đủ cùng 1 tập nhánh Valid/Invalid như kênh đã test sâu nhất không — nếu thiếu, bổ sung ngay, không chờ người dùng nhắc.

### Bước 3

Tiếp nhận các câu trả lời của người dùng. Trường hợp không có câu trả lời tất cả các test case mà cần phải làm rõ thì hãy thêm tag <cần confirm> vào phần test case đó để người dùng có thể dễ dàng nhận biết và xác nhận lại.

### Bước 3.5: Áp dụng đủ bộ kỹ thuật test — BẮT BUỘC cho từng field, từng action, từng trạng thái

Chạy đủ 7 kỹ thuật dưới đây trước khi viết case. Với skill này, đơn vị áp dụng là **từng field / từng action / từng trạng thái hiển thị trên UI** (lấy từ spec + Figma kèm note trên frame), không phải cả màn hình gộp lại.

| Kỹ thuật | Áp dụng thế nào trong test chức năng |
|---|---|
| **5W1H** | *What*: đổi giá trị field/thực hiện action thì ảnh hưởng gì (màn Admin khác, kết quả trên Storefront ISW/SRP/Category Page) · *Who*: role nào thấy/thao tác được · *When*: khi nào field hiện/ẩn, enable/disable (eligibility precondition, trạng thái entity Draft/Active/Inactive, dữ liệu chưa sync về) · *Where*: liệt kê ĐỦ entry point (click, phím tắt, bulk action, import) và nơi kết quả hiển thị lại — cấu hình ở Admin quyết định hiển thị trên Storefront thì phải có case kiểm chứng trên Storefront · *Why*: sai thì merchant/shopper chịu hậu quả gì · *How*: giá trị được áp dụng thế nào (Save/Publish, có cần sync/re-index mới lên Storefront không). Field lấy dữ liệu từ BigCommerce thì xét thêm trước/sau sync theo `create-sync-testcase` |
| **Equivalence Partitioning** | Mỗi field chia lớp hợp lệ/không hợp lệ; mỗi option của dropdown/toggle/radio dẫn tới hành vi khác nhau là 1 lớp riêng — không lấy 1 option đại diện cho cả danh sách khi các option cho kết quả khác nhau |
| **Boundary Value Analysis** | Mọi field có ràng buộc số/độ dài/số lượng: `min-1`, `min`, `max`, `max+1`. Thêm biên hay quên: rỗng vs chỉ có khoảng trắng, 0, số thập phân, 1 phần tử vs nhiều phần tử, đúng ngưỡng hợp lệ (không chỉ vượt ngưỡng) |
| **Decision Table** | Bắt buộc khi kết quả phụ thuộc ≥2 field/điều kiện (field B chỉ hiện khi field A = X; nút chỉ enable khi đủ nhiều điều kiện; hành vi đổi theo loại entity × trạng thái) |
| **State Transition** | Entity/element có trạng thái (Draft/Active/Inactive, bật/tắt, đang chỉnh sửa, đang sync...): chuyển hợp lệ, chuyển bị chặn, trạng thái ranh giới (rỗng/cuối cùng/duy nhất), và **quay lui** (Cancel, bỏ thay đổi chưa lưu, rời trang khi chưa Save, tắt lại sau khi bật) |
| **Error Guessing** | Spam click / double submit; mất mạng khi lưu; 2 tab cùng chỉnh 1 bản ghi; reload giữa chừng; thao tác đúng lúc job sync đang chạy; paste nội dung rất dài hoặc định dạng lạ; khoảng trắng đầu/cuối; emoji/Unicode/có dấu tiếng Việt; chuỗi dạng script/HTML |
| **Exploratory** | Đề xuất 3-5 charter, ưu tiên các field/action mà spec mô tả sơ sài (đặc biệt module Search và Filter Tree/Node Setup) hoặc chỉ có trong note Figma |

**Bảng rà kỹ thuật** — lập trước khi viết case và trình bày trong báo cáo cuối:

| Field / Action | EP | BVA | Decision Table | State Transition | Error Guessing |
|---|---|---|---|---|---|

Ô không áp dụng ghi `–` kèm lý do ngắn. Không được ghi `–` cho **BVA** ở field có bất kỳ ràng buộc số/độ dài/số lượng nào, không được ghi `–` cho **State Transition** ở entity/element có trạng thái, và không được ghi `–` cho **Error Guessing** ở action có ghi dữ liệu.

### Bước 4: Thực hiện tạo test case

- Tạo test case dựa trên đặc tả đã phân tích,
- Viết case theo đúng kết quả của Bước 3.5 — mỗi dòng trong bảng rà kỹ thuật phải có case tương ứng, đủ 7 kỹ thuật: 5W1H, phân vùng tương đương, phân tích giá trị biên, bảng quyết định, sơ đồ trạng thái, error guessing, exploratory (riêng exploratory xuất ra dạng charter trong báo cáo, không viết thành case).

Quy định về output:

Mục tiêu của toàn bộ quy định dưới đây là **tối thiểu chữ, tối đa focus**: người đọc chỉ cần lướt mắt qua phần khác biệt (delta) của từng case, không phải đọc lại ngữ cảnh đã biết. Tránh viết test case dài dòng, lặp lại bối cảnh.

**Nghiêm cấm trích dẫn mã task/ticket/AC khác trong nội dung ô** (vd `NS-2473`, `AC-4`, `Story 5`, `theo NS-2470`) — mô tả thẳng rule/hành vi bằng lời, ngắn gọn, không dẫn nguồn. Người đọc test case không cần và không nên phải mở Jira để hiểu case đang test gì. Áp dụng cho mọi cột, kể cả `Note` và các case `Integration` (impact) — case Integration mô tả TÊN màn hình/feature bị ảnh hưởng ở cột Field/Phần, không phải mã ticket của trigger. Rà lại trước khi báo hoàn thành: không còn chuỗi mã ticket nào (ngoài chính ID của test case), `AC-\d`, `AC\d\.\d`, hay `Story \d` nào trong nội dung ô.

Trước khi ghi 1 câu vào bất kỳ ô nào, tự hỏi "câu này có thêm thông tin người đọc chưa biết không, hay chỉ diễn giải lại cái đã có ở cột khác/đã ngầm hiểu từ Preconditions?" — nếu chỉ diễn giải lại, cắt bỏ. Ưu tiên gạch đầu dòng ngắn hơn câu văn đầy đủ.

- Cột output (10 cột cố định, đúng thứ tự, không đổi tên/gộp/xoá/thêm cột khác). 3 cột "Field / Phần", "Chi tiết test", "Cụ thể hơn" dùng chung 1 tiêu đề gộp là "Test Objective" (mô phỏng merge cell khi mở trong Excel/Google Sheets: ô tiêu đề đầu ghi "Test Objective", 2 ô tiêu đề còn lại để trống), nhưng value của từng test case vẫn phải tách riêng 3 ô/3 cột như cũ:

  | ID | Test Type | Test Objective (3 cột: Field / Phần \| Chi tiết test \| Cụ thể hơn) | Preconditions | Test Steps | Input DB/Setting | Expected Result | Note |

### Nguyên tắc: 1 dòng = 1 test case — banner cụm chỉ dùng khi cần tách rõ ≥2 luồng lớn trong cùng 1 file

Mặc định vẫn là 1 dòng = 1 test case, KHÔNG dùng banner cho từng nhóm Field/Phần nhỏ lẻ trong cùng 1 luồng — mục tiêu "không lặp chữ, dễ focus" ở cấp độ này đạt được bằng cách để trống `Field / Phần` ở các dòng lặp lại (xem quy định cột bên dưới), không cần thêm dòng nào khác.

**Ngoại lệ duy nhất được phép**: khi 1 file gộp ≥2 luồng/scope lớn khác nhau của cùng 1 feature (ví dụ: luồng Add và luồng Edit của cùng 1 filter node gộp chung 1 file) và cần phân biệt nhanh case nào thuộc luồng nào, được phép chèn 1 **dòng banner** ngay trước case đầu tiên của mỗi luồng, với điều kiện:

- Banner PHẢI là dòng đơn — 1 dòng vật lý, không xuống dòng, không bọc `"..."` nhiều dòng — để tránh đúng lỗi row-height/wrap từng ghi nhận khi thử nghiệm banner dài/nhiều dòng trước đây.
- Nội dung banner ngắn gọn, đặt ở cột **Field / Phần**, theo format `=== [Tên luồng] ===` (ví dụ: `=== ADD FILTER NODE - QUICK FILTERS ===`, `=== EDIT FILTER NODE - QUICK FILTERS ===`) — không viết thành câu dài kiểu "Preconditions: Tại popup...".
- Cột **ID** để TRỐNG — đây là ngoại lệ DUY NHẤT với quy định "đánh số tuần tự cho MỌI dòng" ở mục ID bên dưới; banner không phải test case, không tính vào tổng số case đã sinh khi báo cáo (Bước 5).
- 8 cột còn lại (Test Type, Chi tiết test, Cụ thể hơn, Preconditions, Test Steps, Input DB/Setting, Expected Result, Note) để TRỐNG hết — vẫn giữ đủ dấu phẩy phân tách để đủ 10 cột khi parse, không lệch cột.
- Banner KHÔNG tính là 1 giá trị Field/Phần thật khi kiểm tra contiguity (checklist mục 5) — vì đây không phải tên nhóm field, chỉ xuất hiện đúng 1 lần/luồng nên không phát sinh rủi ro xen kẽ.
- Khi gộp/sắp xếp lại file (xem "Gộp file" bên dưới), banner đi kèm và được xếp lại cùng cụm case của đúng luồng đó — không renumber banner vì không có ID.

### Quy định từng cột

- **ID**: định dạng là userstoryID_testcaseNumber (ví dụ: US1234_TC01), đánh số tuần tự cho MỌI dòng test case thật — không có dòng nào bị bỏ qua khi đánh số. Ngoại lệ duy nhất: dòng banner phân tách luồng (nếu có, xem mục "Nguyên tắc" phía trên) để trống ID vì không phải test case.
- **Test Type**: dùng đúng bộ giá trị chuẩn dùng chung của team QA Timind — `Happy`, `Negative`, `UI`, `Permission`, `Integration`, `Edge` (không tự bịa thêm loại khác). Skill này chỉ tự sinh 4 loại:

  - Happy: Input/ luồng hợp lệ đúng theo specs, không cố ý gây lỗi. Chỉ gán `Happy` khi case thoả **ĐỦ CẢ 4** điều kiện dưới đây — thiếu 1 điều kiện là phải chuyển sang type khác:

    1. **Input hợp lệ** — dữ liệu đúng format, đúng range, không thiếu field bắt buộc.
    2. **Đúng luồng chính** — user đi đúng step theo spec, không dùng trick hay shortcut.
    3. **Đúng role/permission** — actor có đủ quyền thực hiện hành động đó.
    4. **Đúng trạng thái** — object/entity đang ở trạng thái cho phép action này.

    Lý do dùng 4 điều kiện này: bug tìm được ở 1 case Happy có nghĩa là **user làm đúng mọi thứ nhưng hệ thống trả kết quả sai / crash / không phản hồi** — đây là mức nghiêm trọng nhất. Nếu case không thoả đủ 4 điều kiện thì lỗi tìm được KHÔNG phải bug happy, gán sai type sẽ làm lệch mức ưu tiên khi triage.

    Hệ quả khi phân loại (các nhầm lẫn hay gặp):
    - Case chỉ **quan sát hiển thị** (vị trí button, empty state, label tĩnh) mà không thực hiện action nào với input hợp lệ → thiếu điều kiện 1 và 2 → là `UI`, KHÔNG phải Happy.
    - Case **cố ý thiếu field bắt buộc** → thiếu điều kiện 1 → là `Negative` nếu hệ thống từ chối; là `Edge` nếu hệ thống chấp nhận nhưng rẽ sang trạng thái khác (đang đứng ngay ranh giới chuyển trạng thái).
    - Case chạy với entity ở trạng thái KHÔNG cho phép action → thiếu điều kiện 4 → là `Negative`.
    - Case chạy với role không đủ quyền → thiếu điều kiện 3 → là `Permission`.
  - Negative: Cố ý dùng input không hợp lệ/ thiếu/ sai để xác minh hệ thống từ chối đúng cách (đã đổi tên từ "Validation" về lại "Negative" theo chuẩn tag/dropdown thật của team QA Timind, 2026-08-12 — ghi đè lần đổi trước đó theo skill MakeIt)
  - Edge: Giá trị biên: nhỏ nhất/ lớn nhất, bằng nhau, ngay tại ranh giới chuyển trạng thái (có thể vẫn hợp lệ, không nhất thiết là lỗi) — đã đổi tên từ "Edge Case" về lại "Edge" (2026-08-12)
  - UI: Case không kiểm tra business rule mà kiểm tra hiển thị/UI thuần tuý (thứ tự dropdown, hiển thị cột, search/filter không lệch, style/label tĩnh...)
  - (File gộp có thể còn chứa giá trị `Permission`, `Integration`, `Sync` do `create-permission-testcase`/`create-impact-testcase`/`create-system-testcase`/`create-sync-testcase` sinh ra — skill này không tự tạo các loại đó, chỉ giữ nguyên khi gộp file. `create-system-testcase` cũng dùng Test Type = `Integration`, không có loại `System` riêng. `create-sync-testcase` dùng Test Type = `Sync`, riêng cho field phụ thuộc dữ liệu đồng bộ từ nguồn ngoài — đặc thù dự án Native Search lấy dữ liệu từ BigCommerce.)
- **Field / Phần** (cột con 1 của Test Objective): tên feature/section/component/màn hình chính bị tác động (ví dụ: `Title`, `Search`, `Table`, `Button [Export]`, `Field [Zone Name]`). CHỈ điền ở dòng **ĐẦU TIÊN** của mỗi nhóm liên tiếp cùng Field/Phần; các dòng sau đó trong cùng nhóm để TRỐNG cột này (không lặp lại tên nhóm) — đây là cách đạt hiệu ứng "không đọc lại chữ đã biết" mà không cần thêm dòng riêng. Ngay khi chuyển sang nhóm Field/Phần khác, dòng đầu tiên của nhóm mới lại điền giá trị. Với test case Integration, ghi tên chức năng/màn hình bị ảnh hưởng, KHÔNG ghi task ID/task name.
- **Chi tiết test** (cột con 2 của Test Objective): mô tả ngắn gọn cái gì đang được test (ví dụ: Placeholder, Required, Default value, Display data, Disabled state). Nếu dòng đó là dòng đầu tiên của cả nhóm và cần nêu thêm bối cảnh/mục tiêu chung trước khi vào chi tiết case, có thể viết gộp ngắn gọn trong chính ô này (không tách dòng riêng).
- **Cụ thể hơn** (cột con 3 của Test Objective): CHỈ 1 cụm từ ngắn (2-6 từ), KHÔNG viết thành câu, KHÔNG diễn giải lại rule/công thức đã có ở Expected Result hay Preconditions (VD đúng: `Boundary: 30 ngày`, `Loại trừ Cancelled`, `Case-insensitive`, `Hướng tăng`; VD SAI — nghiêm cấm: `"Chart hiển thị đủ 3 nhóm cột con EU/US/China trong 1 ngày khi có dữ liệu đủ cả 3 location"` vì đây là câu dài lặp lại nội dung đã có ở Expected Result). Nếu không có cụm từ ngắn nào cần thêm, để trống — không cố nhét nội dung vào cho đầy cột.
- **Preconditions**: viết NGẮN theo dạng `[Field] = [Value]` (ví dụ: `Filter tree status = [Active]`, `option_count = [0]`) thay vì viết thành câu văn đầy đủ. Nếu có từ 2 điều kiện trở lên, mỗi điều kiện 1 dòng gạch đầu dòng `- `.
  - Với case Test Type = `Happy`, rà đủ 4 nhóm điều kiện sau trước khi liệt kê — chỉ ghi nhóm nào thực sự áp dụng cho case đó, bỏ qua nhóm không liên quan (không cần gắn nhãn tên nhóm trong ô, chỉ dùng nhóm để rà không sót):
    - **Role**: actor/role đủ quyền thực hiện action (ví dụ: `Role = [Merchant Admin]`)
    - **State**: entity đang thao tác ở đúng trạng thái cho phép action (ví dụ: `Filter tree status = [Draft]`)
    - **Dependency**: entity/cấu hình liên quan đã hợp lệ, không thiếu setup (ví dụ: `Đã có ít nhất 1 Filter node`)
    - **Input**: dữ liệu đầu vào hợp lệ, chỉ áp dụng nếu action có nhận input trực tiếp (form/file import/API payload) — bỏ qua nhóm này với action không có input (button/click/transition thuần)
  - Nếu cần nêu bối cảnh/mục tiêu chung trước khi vào danh sách điều kiện, viết 1 dòng mô tả ngắn ở ĐẦU ô (phía trên các dòng gạch đầu dòng).
  - Chỉ ghi điều kiện thật sự cần cho case đó; nếu case sau trong cùng nhóm dùng chung điều kiện với case trước, không lặp lại toàn bộ — chỉ nêu phần khác biệt (delta), hoặc để trống nếu không có gì khác.
- **Test Steps**: liệt kê chi tiết các bước cần thực hiện, đánh số 1. 2. 3. ... — ngắn gọn, tập trung vào action + verify chính của case, tránh liệt kê lan man cả luồng từ đầu nếu phần setup đã rõ từ Preconditions.
- **Input DB/Setting**: CHỈ liệt kê dữ liệu/giá trị cụ thể thật sự cần chuẩn bị trước để test case chạy đúng và có ý nghĩa validate (VD: trạng thái entity, số lượng bản ghi, giá trị field cụ thể, ngưỡng threshold). KHÔNG liệt kê lại các điều kiện/ngữ cảnh đã ngụ ý sẵn ở Preconditions hoặc suy ra được từ Test Steps. Để trống nếu không cần dữ liệu đặc biệt — input data có thể có hoặc không tuỳ case. Nếu có từ 2 giá trị/dữ liệu độc lập thật sự cần thiết trở lên, tách mỗi cái thành 1 dòng gạch đầu dòng `- ...` thay vì viết dồn thành 1 câu dài nối bằng dấu phẩy. Chỉ 1 giá trị duy nhất thì viết 1 dòng bình thường, không cần gạch đầu dòng.
- **Expected Result**: mô tả rõ ràng kết quả mà test case mong đợi đạt được dựa trên specs đã có, nhưng súc tích — ưu tiên bám sát field/value cụ thể hơn là mô tả dài dòng. Đánh số từng bước trong Test Steps (1. 2. 3. ...); trong Expected Result chỉ ghi số + kết quả tại các bước then chốt (trigger validate/ submit/ đổi trạng thái), các bước setup không cần expected. Nhiều ý thì xuống dòng gạch đầu dòng `- `. Trường hợp specs mù mờ hãy xem lại quy định bước 3.
- **Note**: Nếu kết quả tại bước đó còn mù mờ theo spec, thêm tag `<cần confirm>` vào cột Note và bôi đỏ tag `<cần confirm>`.

- Mỗi test case chiếm đúng **1 record CSV** (1 dòng khi mở bằng Excel/Google Sheets). Lưu ý: 1 record ĐƯỢC PHÉP trải trên nhiều dòng vật lý trong file text khi ô nhiều dòng có ngắt dòng thật — đó là đúng chuẩn CSV. NGHIÊM CẤM ép mọi record về 1 dòng vật lý bằng cách thay ngắt dòng thật bằng `<br>` hay `\n` literal.

- Sắp xếp thứ tự: gom nhóm liền mạch theo **Field / Phần** (test hết 1 Field/Phần mới sang cái khác, không xen kẽ/lặp lại). ID đánh số tuần tự theo thứ tự này, cho mọi dòng.

- Quy tắc trình bày nội dung ô (áp dụng chuẩn CSV, tương thích Excel/Google Sheets):

  - Ô nhiều dòng (Test Steps, Expected Result khi có nhiều bước then chốt, Input DB/Setting khi có từ 2 giá trị/dữ liệu độc lập thật sự cần thiết trở lên, Preconditions khi có từ 2 điều kiện trở lên) phải bọc trong dấu ngoặc kép `"..."` và dùng **ký tự ngắt dòng thật** (byte LF) bên trong ô. NGHIÊM CẤM giả ngắt dòng bằng thẻ HTML `<br>` / `<br/>` / `<br />` hoặc chuỗi literal `\n` (2 ký tự `\` + `n`) — CSV là text thuần, Excel/Google Sheets không parse HTML nên sẽ hiển thị nguyên văn các ký tự đó trong ô.
  - Ô chỉ có 1 dòng thì KHÔNG bọc `"..."`.
  - Input DB/Setting và Preconditions nhiều giá trị: mỗi giá trị 1 dòng, bắt đầu bằng `- ` (gạch đầu dòng), không đánh số như Test Steps.
  - Dấu ngoặc kép có sẵn trong nội dung phải escape thành `""` (theo đúng chuẩn CSV).
  - Ô trống thì để trống, KHÔNG ghi N/A, None, *, Null — vẫn phải giữ đúng vị trí cột (đủ dấu phẩy phân tách) dù ô đó trống, tránh làm lệch cột phía sau.
  - Ký tự ngắt dòng cuối mỗi record (giữa các dòng CSV) dùng CRLF (`\r\n`) theo đúng chuẩn RFC 4180 — không dùng LF đơn, tránh một số phần mềm spreadsheet tính row-height/wrap không nhất quán khi import.

  Ví dụ (2 test case cùng nhóm Field/Phần — dòng 2 để trống cột Field/Phần):

  ```
  ID,Test Type,Test Objective,,,Preconditions,Test Steps,Input DB/Setting,Expected Result,Note
  US1234_TC01,Happy,Field [Filter name],Save successfully,,Filter tree chưa tồn tại,"1. Nhập Filter name hợp lệ.
  2. Click [Create filter tree].",,2. Filter tree mới xuất hiện trong danh sách; toast ""Filter tree created successfully"" hiển thị.,
  US1234_TC02,Negative,,Filter name trùng,,,1. Nhập Filter name trùng với filter tree đã tồn tại và Click [Create filter tree].,,Hiển thị lỗi ""Filter tree name already exists"".,
  ```

- file format: csv UTF-8 BOM với quy tắc naming là userstoryID_testcase.csv (ví dụ: US1234_testcase.csv)

  - Lưu ý kỹ thuật: phải ghi rõ byte BOM (EF BB BF / ký tự `﻿`) ở đầu file khi tạo, vì công cụ ghi file dạng text thông thường không tự thêm BOM. Thiếu BOM sẽ khiến Excel mở file CSV tiếng Việt bị lỗi font (mojibake) do tự nhận sai bảng mã.
    - Sau khi tạo file, kiểm tra lại 3 byte đầu file đúng là BOM (EF BB BF) trước khi báo hoàn thành.

  - **Checklist bắt buộc trước khi báo hoàn thành** — kiểm tra trên chính file vừa ghi, không được bỏ qua bước nào:

  1. 3 byte đầu file đúng BOM `EF BB BF`.
  2. Số lần xuất hiện chuỗi `<br` trong file phải bằng **0**, và không có chuỗi literal `\n` trong nội dung ô. Nếu > 0 nghĩa là đã giả ngắt dòng bằng HTML/escape — phải sửa thành ngắt dòng thật rồi kiểm tra lại.
  3. Toàn bộ ký tự xuống dòng cuối record trong file là CRLF (`\r\n`) — không có LF đơn lẻ nào. Nếu có, sửa lại cho nhất quán.
  4. Parse lại file bằng 1 CSV reader chuẩn (KHÔNG tự đếm dấu phẩy/đếm dòng vật lý): số record data đúng bằng tổng số test case đã sinh CỘNG số dòng banner phân tách luồng (nếu có), và mỗi record đủ 10 cột (kể cả dòng banner — 9 cột còn lại để trống nhưng vẫn đủ dấu phẩy).
  5. Cột Field/Phần: mỗi nhóm liên tiếp cùng giá trị chỉ có DUY NHẤT 1 dòng đầu tiên điền giá trị, các dòng sau trong cùng nhóm để trống. Kiểm tra bằng cách duyệt tuần tự: nếu 2 dòng liên tiếp cùng thuộc 1 nhóm (dòng sau Field/Phần trống, ngầm hiểu là tiếp tục nhóm của dòng gần nhất có giá trị) thì hợp lệ; nếu 1 nhóm bị lặp giá trị ở nhiều dòng không liên tiếp là SAI (nhóm bị xen kẽ, cần gom lại). Dòng banner phân tách luồng (giá trị dạng `=== ... ===`, nếu có) không tính vào kiểm tra contiguity này.

- folder: lưu trữ trong thư mục có tên test-cases/userstoryID (ví dụ: testcases/US1234)

- **Gộp file với các skill cùng schema 10 cột**: `userstoryID_testcase.csv` là file đích CHUNG cho `create-functional-testcase`, `create-permission-testcase`, `create-impact-testcase` và `create-sync-testcase` (cả 4 dùng đúng 10 cột này). `create-system-testcase` cũng gộp chung file (Test Type `Integration`). `create-api-testcase` KHÔNG gộp vào file này vì khác schema cột — vẫn giữ file riêng theo quy định của skill đó.

  - Nếu file `userstoryID_testcase.csv` CHƯA tồn tại: tạo file mới, chỉ chứa test case vừa sinh ở bước này.
  - Nếu file ĐÃ tồn tại (do skill khác đã chạy trước): đọc toàn bộ rows hiện có, giữ nguyên nội dung từng ô (kể cả rows đang để trống Field/Phần vì thuộc nhóm dòng trên), thêm rows mới vào, rồi sắp xếp lại TOÀN BỘ file:
    1. Nhóm theo **Field / Phần** trước (test hết 1 Field/Phần mới sang Field/Phần khác, không xen kẽ) — khi nhóm lại, coi các dòng Field/Phần trống là thuộc về nhóm của dòng gần nhất phía trên có giá trị.
    2. Trong cùng 1 nhóm Field/Phần, sắp theo thứ tự ưu tiên Test Type: Happy → Negative → Edge → Sync → Permission → Integration → UI.
    3. Renumber lại cột **ID** tuần tự theo thứ tự mới sau khi sắp xếp: `US1234_TC01, TC02, TC03...` (bỏ hậu tố riêng như `_PERM_`/`_IMP_` vì cột Test Type đã phân biệt loại).
    4. Sau khi sắp xếp lại, chỉ dòng ĐẦU TIÊN của mỗi nhóm giữ giá trị Field/Phần, các dòng còn lại trong nhóm để trống — kể cả khi thứ tự dòng đã thay đổi so với trước khi gộp.
  - Không xoá hoặc sửa nội dung rows đã có từ trước — chỉ thêm mới, sắp xếp lại, renumber ID.
  - Nếu file gộp có dùng banner phân tách luồng (xem "Nguyên tắc" phía trên): banner đi kèm cụm case của đúng luồng khi sắp xếp lại, đặt ngay trước case đầu tiên của luồng đó; banner không có ID nên không renumber.

### Bước 5: Sinh thêm bản trình bày dạng matrix

Test case của 1 task được chia ở 2 file, KHÔNG trùng case: bảng 10 cột (bước trên) và matrix. Sau khi file bảng 10 cột đã hoàn tất và ID đã ổn định (đã gộp/renumber xong nếu có chạy các skill khác cùng ghi vào file này), chạy tiếp skill `create-matrix-testcase`. Skill đó sẽ chuyển các case validate/tổ hợp nhiều field sang file matrix riêng và **gỡ chính các case đó khỏi file bảng** rồi renumber lại — nên số test case ở file bảng sau bước này sẽ giảm so với số vừa báo ở bước trên.

Chỉ bỏ qua bước này khi task không có case validate nào VÀ không có action nào phối hợp ≥2 field trong cùng 1 lần submit (task thuần hiển thị/UI) — khi bỏ qua phải nêu rõ lý do cho người dùng.

### Bước 6: Thông báo tới người dùng

- Số lượng test case đã tạo
- Số lượng test case cần confirm
- (Các) file matrix đã sinh, hoặc lý do task này không cần matrix
- **Bảng rà kỹ thuật** (Bước 3.5) — đầy đủ mọi field/action, kèm lý do cho từng ô ghi `–`
- **3-5 charter exploratory testing**, ưu tiên field/action spec mô tả sơ sài hoặc chỉ có trong note Figma
- **Gợi ý bước tiếp theo**: nhắc người dùng chạy skill `review-testcase-quality` để review độc lập (đối chiếu Figma + rà lại 7 kỹ thuật). KHÔNG tự review tại chỗ trong cùng lượt vừa viết case — skill đó chạy qua subagent với context sạch để tránh tự xác nhận chính mình.

## Ràng buộc

- **Không được viết test case khi chưa chạy đủ 7 kỹ thuật ở Bước 3.5 và chưa lập bảng rà kỹ thuật.** Không báo hoàn thành khi báo cáo thiếu bảng rà hoặc thiếu charter exploratory. Áp dụng theo từng field/action/trạng thái cụ thể, không áp dụng ở mức "màn hình nói chung".
- Không được phép bịa test case nếu không có đủ thông tin từ đặc tả hoặc người dùng. Trong trường hợp này, hãy sử dụng tag <cần confirm> để đánh dấu các test case cần xác nhận lại.
- Luôn tuân thủ quy định về định dạng và nội dung của test case để đảm bảo tính nhất quán và dễ hiểu cho người dùng.
- **Không tự viết case Test Type = Integration trong skill này.** Nếu trong lúc phân tích phát hiện cần case Integration (ảnh hưởng luồng/feature khác, đặc biệt khi story hiện tại có issuelinks trên Jira trỏ tới ticket khác mô tả nơi tiêu thụ dữ liệu/entity vừa thay đổi), dừng lại và chạy skill `create-impact-testcase` đúng quy trình (dò đủ nhánh/trạng thái của trigger theo Bước 2 của skill đó) — không tự bịa 1 case đại diện rồi gắn nhãn Integration. Lấy 1 case đại diện cho cả không gian trạng thái của trigger là lỗi đã xảy ra thực tế và bỏ sót các nhánh quan trọng (ví dụ: giá đã có sẵn vs giá chưa từng override vs giá hoàn toàn thiếu — mỗi trạng thái cho hành vi khác nhau).
- Chỉ thao tác trong folder dự án hiện tại (Native Search / Claude), nghiêm cấm thao tác trên folder khác.
