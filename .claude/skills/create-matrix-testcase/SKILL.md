---
name: create-matrix-testcase
description: Sinh test case dạng matrix (decision table) cho các case validate/tổ hợp nhiều field của 1 action — dạng trình bày BẮT BUỘC đi kèm file test case dạng bảng 10 cột. Case đã nằm ở matrix thì KHÔNG được lặp lại ở file bảng; 2 file chia nhau phạm vi, không trùng case.
trigger: chạy MẶC ĐỊNH mỗi khi viết test case cho 1 task/user story (sau khi file bảng 10 cột đã sinh xong) — không cần người dùng yêu cầu riêng. CHỈ bỏ qua khi task không có case validate nào VÀ không có action nào phối hợp ≥2 field trong cùng 1 lần submit (task thuần hiển thị/UI, đổi label, đổi thứ tự cột...). Cũng dùng khi người dùng yêu cầu rõ "viết matrix cho [...]", "trình bày dạng matrix", "làm bảng quyết định cho [...]".
---

## Hướng dẫn tạo test case dạng matrix

Test case của 1 task được chia làm **2 file, không trùng lặp case**:

| File | Sở hữu những case nào |
| --- | --- |
| `userstoryID_testcase.csv` (bảng 10 cột) | Case hiển thị/UI, case luồng nghiệp vụ, case `Integration`/`Permission`/`Sync`, và case chỉ liên quan 1 field đơn lẻ không nằm trong action đã matrix hoá. |
| `userstoryID_matrix-<action>.csv` (matrix) | Toàn bộ case `Negative`/`Edge` (validate) + case `Happy` tổ hợp nhiều field của đúng action được matrix hoá. |

**Nguyên tắc bắt buộc: 1 case chỉ tồn tại ở đúng 1 file.** Khi 1 case đã được đưa vào matrix, case đó phải bị **gỡ khỏi** file bảng 10 cột — không để tồn tại song song ở cả 2 nơi (gây trùng lặp khi chạy test, sai số liệu thống kê, và sửa 1 nơi quên nơi kia).

### Bước 1: Quyết định task này có cần matrix không, và matrix cho action nào

Task **CẦN** matrix khi thoả **ít nhất 1** trong 2 điều kiện:

- Có case validate (`Negative`/`Edge` — task có field input bị chặn/báo lỗi khi nhập sai, thiếu, vượt ngưỡng).
- Có action phối hợp ≥ 2 field cùng tham gia 1 lần submit (form, modal, popup import, wizard step...), kể cả khi từng field chỉ có 1-2 nhánh giá trị.

Task **KHÔNG CẦN** matrix (chỉ giữ file bảng 10 cột) khi thoả **cả 2**:

- Không có case validate nào (không có nhánh input sai/thiếu/vượt ngưỡng bị hệ thống từ chối).
- Không có action nào phối hợp nhiều field — ví dụ task thuần hiển thị/UI, đổi label, đổi thứ tự cột dropdown, ẩn/hiện element, đổi màu, gỡ bỏ 1 nút.

Case `Sync` (từ `create-sync-testcase`) KHÔNG bao giờ đưa vào matrix — bản chất là tổ hợp trạng thái nguồn BigCommerce × tiến trình sync, không phải field validate trong 1 lần submit; ở lại file bảng.

Khi bỏ qua matrix, phải nói rõ lý do cho người dùng trong báo cáo cuối — không im lặng bỏ qua.

Nếu task cần matrix: xác định các **action** cần matrix hoá (mỗi action = 1 nút submit/create/import/save... xử lý các field cùng lúc). 1 task có thể cần nhiều matrix cho nhiều action khác nhau. Nếu không chắc action nào cần matrix hoá, hỏi lại người dùng thay vì tự chọn.

**Kiểm tra chéo với matrix của task khác cùng action**: trước khi dựng matrix mới, quét thư mục `test-cases/` (Glob `*_matrix-*.csv`) tìm file matrix khác (userstoryID khác) có dòng `Màn hình / Action` mô tả cùng 1 action (cùng màn hình + cùng nút submit/save/import). Nếu tìm thấy:

- Nêu cho người dùng: matrix nào đã tồn tại cho cùng action, field nào trùng tên với field task hiện tại đang định matrix hoá.
- Nếu task hiện tại thêm 1 chiều/điều kiện mới cho field trùng tên đó (ví dụ thêm phụ thuộc theo mode/method) mà matrix cũ chưa mô tả, cảnh báo cho người dùng khả năng dòng Precondition/field của matrix CŨ đã lỗi thời sau khi task hiện tại triển khai. Không tự ý sửa matrix cũ — chỉ nêu ra để người dùng quyết định có cần cập nhật hay không.

### Bước 2: Đọc file bảng 10 cột, chọn ra các case thuộc về matrix

- Input bắt buộc: file `userstoryID_testcase.csv` đã tồn tại và đã ổn định ID (đã chạy xong toàn bộ các skill cùng ghi vào file này: `create-functional-testcase`/`create-permission-testcase`/`create-system-testcase`/`create-impact-testcase`/`create-sync-testcase`). Nếu file chưa tồn tại, dừng lại và chạy skill tạo test case phù hợp trước.
- Duyệt toàn bộ rows, đánh dấu những case **thuộc phạm vi matrix** — tức case kiểm tra giá trị input của các field trong đúng action đang matrix hoá (Test Type thường là `Negative`, `Edge`, và case `Happy` của chính action đó).
- **KHÔNG** đưa vào matrix: case `UI`/hiển thị thuần, case `Integration`/`Permission`/`Sync`, case thuộc action khác — những case này ở lại file bảng.
- Với mỗi case được đánh dấu, giữ lại đủ thông tin để dựng matrix: tổ hợp giá trị từng field, thứ tự bước thực hiện, các expected result, **và ID gốc của case đó** (`userstoryID_TCxx`) — ID này dùng để xoá chính xác ở Bước 5, không suy luận lại bằng cách so khớp text.
- Nếu phát hiện thiếu tổ hợp field×giá trị đáng lẽ phải có (theo kỹ thuật ở Bước 3) mà chưa có case tương ứng → được phép bổ sung thẳng case mới vào matrix (matrix là nơi sở hữu nhóm case này), miễn là có căn cứ từ spec; điểm nào spec chưa rõ thì đánh dấu `<cần confirm>` ở dòng Output tương ứng.

### Bước 3: Phân rã field theo kỹ thuật test

#### A. Xác định field/rule thuộc phạm vi task

**Chỉ đào sâu Valid/Invalid cho field thuộc phạm vi/bị ảnh hưởng bởi task hiện tại — field cũ không đổi rule chỉ cần 1 giá trị valid đại diện:**

- Trước khi phân rã 1 field, tự hỏi: "Rule validate của field này có phải do task hiện tại tạo mới/sửa đổi không, hay field này chỉ tình cờ xuất hiện trong action vì đã có sẵn từ trước (task hiện tại không đụng tới rule của nó)?"
- Field **thuộc phạm vi task** (task tạo mới field, đổi ngưỡng/rule validate, hoặc đổi cơ chế hiển thị lỗi khiến hành vi field đó có khả năng bị ảnh hưởng — ví dụ đổi field từ dropdown sang tab/dòng làm thay đổi cách lỗi được hiển thị/định vị) → phân rã đầy đủ `Valid`/`Invalid` theo mục C bên dưới.
- Field **cũ, không bị task hiện tại đụng tới** (rule validate/ngưỡng giữ nguyên y hệt trước khi có task, task không đổi cách hiển thị lỗi của field đó) → **VẪN GIỮ field đó trong lưới** (không xoá hẳn khỏi matrix — field vẫn thực sự được submit cùng action nên phải có mặt để lưới phản ánh đúng thực tế), nhưng CHỈ đưa đúng 1 dòng `Valid` với giá trị hợp lệ đại diện, dùng chung 1 giá trị đó cho **MỌI cột TC** ở cùng 1 số bước — KHÔNG thêm nhánh `Invalid` nào cho field này. Tránh 2 lỗi ngược nhau: (a) đào sâu Invalid cho field không liên quan, (b) xoá hẳn field khỏi lưới khiến mất dấu vết field đó có tham gia action hay không.
- Nếu 1 field cũ có nhiều dòng con (nhiều SKU/nhiều zone...) nhưng bản thân field không bị ảnh hưởng, chỉ cần 1 dòng Valid đại diện chung, không cần liệt kê riêng từng dòng con.
- Nếu không chắc 1 field có thuộc phạm vi ảnh hưởng hay không, hỏi lại người dùng thay vì tự quyết — quyết định sai ở bước này kéo theo cả field bị đào sâu nhầm hoặc bị bỏ sót.
- **Đơn vị phân loại là "field × rule", không phải "field"**: 1 field có thể mang nhiều rule độc lập (ví dụ: cơ chế hiển thị lỗi theo vị trí UI, và ngưỡng giá trị số) thuộc phạm vi của các task khác nhau. Field có rule A thuộc task hiện tại, rule B thuộc task khác → chỉ đào Valid/Invalid theo rule A; rule B xử lý như field cũ (1 dòng Valid đại diện).
- **Cùng 1 tên field được phép xuất hiện ở nhiều matrix của nhiều task**, miễn mỗi matrix chỉ đào đúng rule thuộc phạm vi của chính task đó — không tính là trùng case (nguyên tắc "1 case chỉ tồn tại ở đúng 1 file" áp dụng cho case giống hệt nhau, không cấm cùng field xuất hiện vì lý do khác nhau). Nếu field từng xuất hiện ở matrix task khác (theo kiểm tra chéo ở Bước 1), ghi rõ RULE đang đào ở matrix này để tránh trùng đúng rule đã có ở matrix kia.

#### B. Xác nhận phạm vi với người dùng trước khi dựng lưới

Sau khi phân loại xong toàn bộ field/rule của action (thuộc phạm vi vs ngoài phạm vi), trình bày danh sách cho người dùng xác nhận **TRƯỚC KHI sang Bước 4** — không tự ý dựng lưới ngay. Với field/rule bị xếp "ngoài phạm vi, chỉ giữ Valid đại diện", nêu ngắn gọn lý do để người dùng xác nhận đã/sẽ được test ở nơi khác. Chỉ sang Bước 4 sau khi người dùng xác nhận hoặc không phản đối phân loại đã nêu.

#### C. Kỹ thuật phân rã (áp dụng cho từng field thuộc phạm vi task)

- **Phân vùng tương đương**: chia giá trị field thành các lớp `Valid` / `Invalid` rời rạc.
- **Field dạng container (nhiều sub-element bắt buộc độc lập) — không gộp theo outcome**: nếu field là 1 container gồm nhiều sub-element được đặt tên riêng, mỗi sub-element bắt buộc độc lập (ví dụ: từng cột bắt buộc của 1 sheet/file import, từng tham số bắt buộc của 1 API payload), phải tách **mỗi sub-element thành 1 nhánh Invalid riêng** dù thiếu bất kỳ sub-element nào cũng dẫn tới cùng 1 outcome (vd: reject toàn bộ) — KHÔNG gộp thành 1 nhánh đại diện. Lý do: rủi ro ở đây không phải "outcome khác nhau" (chúng giống hệt) mà là "code có thực sự check đúng sub-element đó hay không" — mỗi sub-element nhiều khả năng được validate bằng 1 đoạn code độc lập, chỉ test đại diện sẽ bỏ sót lỗi nếu 1 sub-element cụ thể bị quên check. Equivalence partitioning theo outcome chỉ dùng đúng khi field là 1 đơn vị input duy nhất dùng chung 1 đường xử lý.
- **Field dạng enum có domain hữu hạn, các giá trị có độ phức tạp/rủi ro khác nhau — không dùng 1 giá trị đại diện cho cả domain**: nếu field nhận giá trị từ 1 tập giá trị được đặt tên (enum) và các giá trị đó có độ phức tạp nghiệp vụ hoặc khả năng khác code path rõ rệt (ví dụ: 2 phương thức in có số vùng in khác nhau, kéo theo rule khác nhau ở màn khác), phải test nhánh Valid cho **mỗi giá trị enum có rủi ro riêng** — không chỉ 1 giá trị đại diện, dù tất cả cùng thuộc lớp "hợp lệ". Chỉ dùng 1 đại diện khi các giá trị trong domain thực sự đồng nhất về độ phức tạp xử lý (ví dụ: nhiều mã zone chỉ khác tên, không khác rule).
- **1 field có nhiều LÝ DO Invalid khác nhau — không gộp chung nếu khả năng khác code path**: nếu 1 field có thể bị coi là Invalid vì nhiều lý do khác nhau (ví dụ: giá trị không tồn tại trong hệ thống, SO VỚI giá trị tồn tại hợp lệ ở hệ thống nhưng không thuộc phạm vi cho phép của chính bản ghi đang xét — như 1 phương thức có thật nhưng Product cụ thể chưa bật), phải tách **mỗi lý do thành 1 nhánh Invalid riêng** nếu các lý do đó nhiều khả năng được kiểm tra bằng đoạn code khác nhau (vd: 1 check enum toàn cục so với 1 check theo danh sách con của bản ghi hiện tại) — không gộp chung chỉ vì cùng dẫn tới outcome "bị từ chối". Đây là biến thể thứ 3 cùng họ với 2 rule container/enum ở trên — rủi ro luôn nằm ở khả năng khác code path, không phải outcome giống nhau.
- **Giá trị biên**: thêm biên (min / max / min-1 / max+1 / độ dài tối đa) nếu field có ràng buộc số hoặc độ dài ký tự.
- **Bảng quyết định**: với field phụ thuộc điều kiện của field khác (ví dụ field B chỉ bắt buộc khi field A có giá trị), thể hiện đúng tổ hợp điều kiện thay vì tách rời từng field.

Mỗi giá trị Valid/Invalid viết thành 1 dòng riêng trong nhóm field đó. Text bắt buộc ngắn gọn (khoảng 2-8 từ, không viết thành câu) — đây là bảng compact để lướt nhanh.

#### D. Kiểm soát quy mô lưới (áp dụng sau khi đã liệt kê hết field/rule thuộc phạm vi)

- **Kiểm soát bùng nổ tổ hợp khi ≥2 field/điều kiện thuộc phạm vi task cùng ảnh hưởng 1 kết quả**: không liệt kê đủ mọi tổ hợp (2^n). Dùng kỹ thuật one-variable-at-a-time: TC gốc (happy path) giữ mọi điều kiện ở trạng thái mặc định, mỗi TC tiếp theo chỉ đổi đúng 1 biến so với TC gốc. Chỉ thêm tổ hợp đổi ≥2 biến cùng lúc khi spec khẳng định rõ 2 biến đó tương tác đặc biệt (kết quả khác với suy ra từ 2 case đổi riêng lẻ) — nêu lý do trong báo cáo Bước 7.
- **Kiểm tra số lượng MTC bằng 2 cận cụ thể**: gọi `I` = tổng số nhánh `Invalid` trong lưới, `V` = tổng số nhánh `Valid` (kể cả boundary Valid) của các field/rule thuộc phạm vi (đếm ở mục C). Số MTC không được **nhỏ hơn I** (mỗi nhánh Invalid bắt buộc ≥1 MTC riêng, không gộp được) và không được **lớn hơn V + I** (nhánh Valid có thể gộp chung vào 1 happy-path MTC). Nếu số MTC thực tế nằm ngoài khoảng `[I, V+I]`, dừng lại rà soát trước khi xuất file — vượt trên thì nghi dư tổ hợp, dưới ngưỡng thì nghi gộp/bỏ sót nhánh.

### Bước 4: Dựng lưới matrix

Cấu trúc cột cố định, đúng thứ tự:

| Field | Valid/Invalid | Giá trị | `[ID_TC1]` | `[ID_TC2]` | ... |

- **Field**: tên field cần test. CHỈ điền ở dòng ĐẦU TIÊN của nhóm giá trị field đó (cùng quy tắc với cột Field/Phần ở file 10 cột) — các dòng Valid/Invalid tiếp theo cùng field để trống.
- **Valid/Invalid**: ghi đúng `Valid` hoặc `Invalid`.
- **Thứ tự trong nhóm field**: trong cùng 1 nhóm field, toàn bộ dòng `Valid` phải xếp liền nhau TRƯỚC, rồi mới tới toàn bộ dòng `Invalid` liền nhau SAU — không xen kẽ (VD đúng: Valid, Valid, Invalid, Invalid, Invalid; VD sai: Valid, Invalid, Valid, Invalid). Khi phát hiện/bổ sung 1 nhánh Valid mới sau khi đã viết xong các dòng Invalid (thường xảy ra khi thêm giá trị biên), phải sắp xếp lại để Valid vẫn đứng trước, không chỉ nối thêm vào cuối nhóm.
- **Giá trị**: mô tả ngắn gọn input cụ thể (ví dụ: `Bỏ trống`, `Nhập > 50 ký tự`, `SKU không tồn tại`, `Số âm`).
- Từ cột thứ 4 trở đi, mỗi cột = 1 test case, đánh ID theo định dạng `userstoryID_MTC01`, `userstoryID_MTC02`... (`MTC` = Matrix Test Case). Dùng dải ID riêng, KHÔNG dùng chung dải `TC` với file bảng — để 2 file không bao giờ đụng ID nhau và ID matrix không bị xê dịch mỗi khi file bảng renumber.
- Ô giao giữa 1 dòng giá trị và 1 cột TC: điền **số thứ tự bước** thực hiện thao tác với field đó trong luồng của TC này (1, 2, 3...). Để trống nếu field/giá trị đó không thuộc luồng của TC này.
- Dòng **hành động cố định** (ví dụ `Click [Submit]` / `Click [Save]` — thường là bước cuối, không gắn với field Valid/Invalid nào): để trống cột Field và Valid/Invalid, ghi hành động vào cột Giá trị, điền số bước tương ứng ở MỌI cột TC có đi qua bước đó.

**Đánh số bước theo đúng điểm dừng thực tế của từng TC — không bắt mọi TC chạy hết mọi field:**

- Số bước đánh riêng cho từng cột TC, bắt đầu lại từ `1` ở mỗi TC (dòng Precondition dùng số `0`).
- Nếu lỗi validate của TC đó hiện **ngay khi thao tác với field** (inline: on-blur/on-input, chặn luôn tại chỗ) → TC dừng ở đúng bước đó: chỉ điền số cho dòng field vi phạm, **để TRỐNG** dòng hành động submit và mọi field phía sau. Ví dụ: TC test 1 field bắt buộc = `Bỏ trống` chỉ có đúng 1 bước, không click submit.
- Nếu lỗi chỉ lộ ra **sau khi submit** (server-side/business rule: trùng giá trị, không tồn tại...) → TC phải đi đủ các bước nhập field hợp lệ còn lại rồi mới tới bước submit. Ví dụ: TC test giá trị trùng đi đủ bước 1→4 rồi `Click [Save]` = bước 5.
- Cùng 1 field nhưng nhánh giá trị khác nhau có thể dừng ở bước khác nhau (bỏ trống → chặn inline ở bước 1; nhập trùng → phải submit mới biết) — đây là điểm phân biệt quan trọng, không được đánh số máy móc giống nhau cho mọi nhánh của cùng field.
- Nếu spec không nói rõ 1 lỗi là inline hay chỉ hiện sau submit, chọn phương án theo hành vi hiện tại của hệ thống nếu đã biết; chưa biết thì vẫn đánh số theo phán đoán hợp lý nhất và gắn `<cần confirm>` ở dòng Output tương ứng để QA xác minh khi chạy.

**Các dòng meta phía trên lưới field** (điền trước khi liệt kê field):

- Dòng **Màn hình / Action**: tên màn hình + action đang test (ví dụ `MH [Merchandise Campaign] — click [Save]`).
- Dòng **Precondition**: điều kiện tiên quyết áp dụng chung cho toàn bộ matrix, đánh số bước `0` ở các cột TC áp dụng. Nếu 1 TC có thêm điều kiện riêng, ghi chú ngay trong ô Giá trị của dòng field liên quan (không tách thêm cột riêng).
- Dòng **Test Type**: Test Type của từng TC (`Happy`/`Negative`/`Edge`), điền dưới đúng cột TC tương ứng.

**Section Output phía dưới lưới field**:

- Mỗi dòng = 1 expected result/message cụ thể. Chỉ ghi ĐÚNG kết quả/message (trích nguyên văn nếu spec đã nêu rõ) — KHÔNG giải thích lý do/bối cảnh/nguồn gốc trong ô này. Đây là bảng compact để lướt nhanh, không phải chỗ phân tích.
- Khi 1 dòng Output có ≥2 ý độc lập (vd: kết quả chính + message cụ thể + ghi chú `<cần confirm>`), tách mỗi ý thành 1 dòng riêng trong ô bằng gạch đầu dòng `- `, dùng ngắt dòng thật (LF) bên trong ô — KHÔNG nối bằng `;`/`—` thành 1 dòng dài khó tách ý. Chỉ 1 ý duy nhất thì viết 1 dòng bình thường, không cần gạch đầu dòng.
- **Số điền ở Output = số của chính bước mà expected đó quan sát được**, không phải số thứ tự riêng của dòng Output. Cụ thể:
  - Lỗi chặn inline ngay khi nhập → Output mang đúng số bước nhập field đó (ví dụ bỏ trống ở bước 1 → Output `This field is required` = `1`).
  - Kết quả chỉ xuất hiện sau khi submit → Output mang số bước submit (ví dụ `Click [Save]` = bước 5 → Output message thành công/thất bại = `5`).
  - Số ở Output của 1 TC phải luôn khớp với 1 số bước thật sự tồn tại trong cột TC đó — không được điền số bước mà TC đó không đi qua.
- 1 dòng Output có thể điền ở nhiều cột TC (nhiều TC cùng nhận 1 kết quả); 1 cột TC có thể có số ở nhiều dòng Output (1 TC có nhiều expected đồng thời tại cùng 1 bước — ví dụ vừa hiện message thành công vừa cập nhật dữ liệu, cả 2 dòng cùng mang số bước submit).
- Expected nào spec chưa nêu rõ: thêm `<cần confirm>` kèm ĐÚNG 1 cụm từ ngắn (3-8 từ) nêu điểm cần chốt — ví dụ `<cần confirm> cơ chế báo lỗi khi tab ẩn`, `<cần confirm> ngưỡng min/max giá` — KHÔNG viết thành câu giải thích đầy đủ nguồn gốc/bối cảnh mâu thuẫn. Giải thích chi tiết (nếu cần) thuộc về báo cáo tổng kết ở Bước 7, không phải trong ô matrix.

**Dòng cuối — Test Result**: để trống (hoặc `-`) ở mọi cột TC. Đây là cột QA điền SAU KHI chạy test thực tế (`OK`/`NG`) — nghiêm cấm tự bịa kết quả execution.

**Ví dụ mẫu** (màn `Merchandise Campaign`, action `Click [Save]`) — minh hoạ đúng sự khác biệt giữa lỗi inline và lỗi sau submit:

```
Field,Valid/Invalid,Giá trị,MTC01,MTC02,MTC03
Precondition,,"Tại MH [Merchandise Campaign], mở form Edit",0,0,0
Test Type,,,Happy,Negative,Negative
Campaign name,Valid,Nhập name hợp lệ,1,,1
,Invalid,Bỏ trống,,1,
,Invalid,Nhập name trùng campaign đã tồn tại,,,
Merge Value,Valid,Chọn Merge Value hợp lệ,2,,2
,,Click button [Save],3,,3
Output,,"Save thành công, hiện toast ""Campaign saved successfully""",3,,
,,"Message lỗi: ""This field is required""",,1,
,,"Message lỗi: ""Campaign name already exists""",,,3
Test Result,,,,,
```

- `MTC01` (happy): đi đủ 3 bước, Output thành công mang số `3` = số bước `Click [Save]`.
- `MTC02` (bỏ trống Campaign name): **chỉ có 1 bước**, ô `Click button [Save]` để TRỐNG vì lỗi chặn inline ngay khi rời field; Output mang số `1`.
- `MTC03` (name trùng): phải đi đủ 3 bước vì lỗi chỉ lộ sau submit; Output mang số `3`.

### Bước 5: Gỡ case trùng khỏi file bảng 10 cột

Sau khi matrix đã chứa đủ các case ở Bước 2:

1. Xoá đúng những rows đã chuyển sang matrix khỏi `userstoryID_testcase.csv`, xác định rows cần xoá **bằng ID gốc đã ghi lại ở Bước 2** — KHÔNG so khớp lại theo nội dung text (Chi tiết test/Expected Result...). Lý do: 2 case cùng 1 kịch bản có thể diễn đạt lệch chữ giữa lúc viết ở file bảng và lúc dựng lại thành nhánh matrix, so khớp text sẽ bỏ sót và để lại case trùng ở cả 2 file — lỗi này đã xảy ra thực tế. Nếu vì lý do nào đó không còn xác định được ID gốc, liệt kê danh sách case nghi ngờ trùng cho người dùng xác nhận thay vì tự ý so khớp text rồi xoá.
2. Renumber lại cột `ID` của file bảng tuần tự từ đầu (`userstoryID_TC01`, `TC02`...) theo thứ tự rows còn lại, giữ nguyên quy tắc sắp xếp cũ (nhóm theo Field/Phần → Test Type `Happy → Negative → Edge → Sync → Permission → Integration → UI`).
3. Áp lại quy tắc cột Field/Phần: chỉ dòng ĐẦU TIÊN của mỗi nhóm liên tiếp giữ giá trị, các dòng sau để trống — vì việc xoá rows có thể làm dòng đầu nhóm cũ biến mất.
4. Chạy lại checklist kiểm tra file bảng (BOM, CRLF, không `<br`/literal `\n`, đủ 10 cột, nhóm Field/Phần không xen kẽ) sau khi sửa.

Nếu sau khi gỡ mà 1 nhóm Field/Phần không còn row nào, bỏ luôn nhóm đó khỏi file bảng — không để lại nhóm rỗng.

### Bước 6: Xuất file matrix

- Format: CSV UTF-8 BOM, ngắt dòng cuối mỗi record dùng CRLF (`\r\n`), quy tắc quote/escape ô nhiều dòng/ký tự đặc biệt giống hệt các skill test case khác trong dự án (bọc `"..."`, escape `""`, nghiêm cấm `<br>`/literal `\n`).
- Naming: `userstoryID_matrix-<ten-action-kebab-case>.csv` (ví dụ: `US1234_matrix-merchandise-campaign.csv`). Nếu 1 task có nhiều action cần matrix hoá, tạo nhiều file riêng — không gộp nhiều action không liên quan vào 1 lưới. Khi có nhiều matrix trong cùng task, dải `MTC` đánh số tiếp nối liên tục qua các file (file thứ 2 bắt đầu từ ID kế tiếp của file thứ 1), không reset về `MTC01`.
- Folder: `test-cases/userstoryID/` — cùng thư mục với file bảng 10 cột của story đó.
- **Checklist bắt buộc trước khi báo hoàn thành**:
  1. 3 byte đầu file matrix đúng BOM `EF BB BF`.
  2. Không có chuỗi `<br` hoặc literal `\n` trong nội dung ô.
  3. Toàn bộ ngắt dòng cuối record là CRLF, không có LF đơn lẻ.
  4. Parse lại bằng 1 CSV reader chuẩn: mọi dòng đủ số cột = 3 (Field/Valid-Invalid/Giá trị) + số cột TC.
  5. **Không trùng case giữa 2 file**: mọi case đã đưa vào matrix đã bị gỡ khỏi `userstoryID_testcase.csv`; rà lại file bảng không còn row nào mô tả cùng tổ hợp input/expected với 1 cột TC trong matrix.
  6. File bảng sau khi gỡ rows vẫn pass đủ checklist riêng của nó (BOM, CRLF, 10 cột, ID tuần tự liên tục không đứt quãng, nhóm Field/Phần không xen kẽ).
  7. **Số bước trong mỗi cột TC liên tục, không đứt quãng**: mỗi cột TC đánh số từ `1` tăng dần liên tiếp (sau dòng Precondition số `0`), không nhảy cóc (không có TC nào có bước 1, 3 mà thiếu 2).
  8. **Mọi số ở section Output đều khớp 1 số bước có thật trong đúng cột TC đó** — không có số Output trỏ tới bước mà TC đó không đi qua.
  9. **Mỗi cột TC có ít nhất 1 dòng Output** — không có test case nào không khai báo expected result.
  10. **Trong mỗi nhóm field, toàn bộ dòng Valid xếp liền nhau trước, Invalid liền nhau sau, không xen kẽ** — rà từng nhóm field từ trên xuống, xác nhận cột Valid/Invalid chỉ đổi giá trị đúng 1 lần (Valid→Invalid), không đổi qua đổi lại.

### Bước 7: Thông báo tới người dùng

- Action/màn hình nào đã được matrix hoá (hoặc lý do task này không cần matrix, theo Bước 1).
- Số field đã phân rã Valid/Invalid; số TC trong matrix (`MTC`).
- Số case đã **gỡ khỏi** file bảng do chuyển sang matrix, và tổng số case còn lại ở file bảng sau khi renumber.
- Số case cần confirm (`<cần confirm>`) trong matrix.
- **Danh sách field/rule đã bị xếp "ngoài phạm vi task"** (chỉ giữ 1 dòng Valid đại diện, không đào Invalid) — liệt kê tên field/rule kèm lý do ngắn, để người dùng xác nhận đã/sẽ được test ở nơi khác. Không được im lặng bỏ qua mục này dù danh sách rỗng (nêu rõ "không có field nào bị cắt" nếu đúng vậy).
- Nếu Bước 1 phát hiện matrix task khác cùng action: đã cảnh báo gì về khả năng matrix cũ lỗi thời (nếu có), hoặc nêu rõ không có matrix nào trùng action.
- Đường dẫn (các) file matrix đã tạo.

## Ràng buộc

- **Không để 1 case tồn tại ở cả 2 file.** Case đã vào matrix bắt buộc phải gỡ khỏi file bảng 10 cột và renumber lại file bảng.
- Không đưa case `UI`/hiển thị thuần, `Integration`, `Permission`, `Sync` vào matrix — những loại này thuộc file bảng.
- Không tự bịa giá trị `Test Result` (OK/NG) — luôn để trống cho QA điền sau khi chạy thực tế.
- Không bịa expected result khi spec chưa nêu rõ — dùng `<cần confirm>` ở dòng Output tương ứng.
- **Nghiêm cấm trích dẫn mã task/ticket/AC** (vd `NS-2473`, `AC-4`, `Story 5`) trong bất kỳ ô nào, kể cả lý do đính kèm `<cần confirm>` — diễn giải bằng lời, ngắn gọn.
- Không bỏ qua matrix chỉ vì người dùng không nhắc tới — matrix là mặc định; chỉ bỏ khi task không thoả điều kiện ở Bước 1, và phải nêu rõ lý do.
- **Không dựng lưới matrix khi chưa trình bày phân loại field/rule cho người dùng xác nhận** (Bước 3.B). Không báo hoàn thành khi báo cáo (Bước 7) thiếu danh sách field/rule bị xếp ngoài phạm vi — kể cả khi danh sách đó rỗng, vẫn phải nêu rõ "không có field nào bị cắt".
- Chỉ thao tác trong folder dự án hiện tại (Native Search / Claude), nghiêm cấm thao tác trên folder khác.
