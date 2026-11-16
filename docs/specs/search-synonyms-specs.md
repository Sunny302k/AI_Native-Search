# Synonyms — Specs

## 0. Nguồn gốc tài liệu

Viết từ Figma file "Searching" (fileKey `dHTNp9Dd43Sbzy0hNWGMUC`, page `↪ Synonyms`, node gốc `1:7`), đọc trực tiếp qua MCP (tài khoản `hanguyen31.tt@gmail.com`).

**Cập nhật 2026-11-09**: đã đọc được link Lark `[Spec] Synonyms` (https://h4zq094ccpa.sg.larksuite.com/docx/IXU6dhiP6op89wxTFVWlZzU0gAc) qua extension Chrome (tài khoản đang đăng nhập Lark của người dùng). Nội dung Lark **không mô tả lại UI** (không trùng lặp với Figma) mà mô tả **cơ chế backend tự động sinh synonym bằng AI** hoàn toàn không thấy trên Figma — xem mục 3.5. Đây là bổ sung quan trọng, không phải mâu thuẫn trực tiếp, nhưng có 1 điểm cần hỏi lại BA vì 2 nguồn mô tả flow AI suggestion khác nhau (xem câu hỏi mở #8).

**Đặc biệt — không tìm thấy sticky note vàng nào trong toàn bộ page Synonyms** (đã quét hết 4 section: "Edit. Delete group cha, con", "Create new synonym", "AI synonym", "Search synonym"). Duy nhất 1 annotation dạng data-annotation gắn trực tiếp lên layer (không phải sticky note nổi trên canvas): *"gán tag AI vào synonym"* — ghi tại mục 3.3. Việc thiếu sticky note khớp với cảnh báo trong `CLAUDE.md`: nhóm Search thường tài liệu sơ sài hơn Sync/Merchandise.

## 1. Tổng quan

Synonyms cho phép merchant định nghĩa các **nhóm từ đồng nghĩa (Synonym Group)** để khi shopper gõ search, hệ thống trả cùng 1 tập kết quả cho các từ có cùng ý nghĩa/liên quan. Card mô tả trên UI: *"Synonym group is a central place to organize multiple synonym relationships."*

Mỗi Synonym Group có 2 loại quan hệ:
- **Unified synonyms** — các từ được xem là **tương đương nhau hoàn toàn**: *"When customers search any of these terms, they'll see the same broad set of products."* (VD "running shoes", "trail running", "white trainers").
- **Supporting synonyms** — quan hệ **1 chiều, từ chung → từ cụ thể hơn**: *"When customers search 'shoes', they'll see both Nike Air Max and Ultraboost. But if they search 'Nike Air Max', they won't see generic shoe products."* (từ khoá chung "shoes" kéo thêm kết quả của "Nike Air Max", "Ultraboost", nhưng chiều ngược lại không áp dụng).

Ngoài tạo tay, hệ thống có **gợi ý synonym bằng AI** dựa trên hành vi search thật của shopper (xem mục 4).

## 2. Danh sách field

### 2.1 Màn "Merged Values" — tên đúng trên UI là **"Synonyms"** (danh sách)

| Field | Loại | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- |
| Nút back ← + tiêu đề "Synonyms" | Header | Quay lại màn trước | Config nội bộ |
| Khối Feature Tour "What is synonym ?" | Panel thu gọn được | Giải thích Synonym Group + ảnh minh hoạ Unified/Supporting | Config nội bộ (nội dung tĩnh) |
| Nút **Create new** | Button | Mở modal "Create new synonym group" | Config nội bộ |
| Ô **Search group synonym** | Text input | Lọc theo tên Synonym Group hoặc theo giá trị synonym — xem mục 5. **Cập nhật (review-testcase-quality, đọc Figma trực tiếp)**: placeholder thật trên UI là `"Search group, synonym"` (có dấu phẩy) — khác cách gọi field trong tài liệu này. Dấu phẩy có thể ngầm gợi ý phạm vi search gồm cả tên group lẫn giá trị synonym, nhưng đây chỉ là suy luận từ copy, chưa phải bằng chứng chắc chắn — câu hỏi mở #9 vẫn còn treo. | Config nội bộ (thao tác) |
| Cột **Status** | Toggle | Bật/tắt 1 Synonym Group | Config nội bộ |
| Cột **Synonym Group** | Text | Tên đại diện nhóm (VD "running shoes") | Config nội bộ (merchant đặt) |
| Cột **Synonyms** | Tag list | Liệt kê các supporting synonym của nhóm, dạng tag + "+N more" khi dài | Config nội bộ |
| Cột **Action** | Icon | 2 icon: Edit (bút chì) + Delete (thùng rác) — thứ tự và icon chính xác chưa xác nhận được qua ảnh, xem câu hỏi mở #1 | Config nội bộ |
| Khối **AI Synonyms Suggested** | Card list | Chỉ hiện khi có gợi ý AI chưa xử lý — xem mục 4 | Tính toán từ dữ liệu sync |
| Pagination | Component | Phân trang danh sách | Config nội bộ |
| Empty state | Text + button | *"There is currently no synonym group."* + nút Create new | Config nội bộ |

### 2.2 Modal "Create new synonym group" / "Edit synonym group"

Cùng 1 component dùng chung cho Create và Edit (tiêu đề đổi theo ngữ cảnh).

| Field | Loại | Mặc định | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- | --- |
| **SYNONYM GROUP NAME** | Text input (underline) | Trống (Create) / giá trị hiện tại (Edit, VD "Shoes for man") | Tên nhóm, label màu cam khi required/focus | Config nội bộ |
| **Unified synonyms** | Tag input, nhiều giá trị | Trống | Gõ rồi Enter để tạo 1 synonym; placeholder *"E.g. synonym 1, synonym 2, ..."*; helper *"Using enter to create synonym"*; link **Clear all** xoá hết tag | Config nội bộ |
| **Supporting synonyms** | Danh sách dòng lặp, mỗi dòng gồm 1 input trái (từ chung) + mũi tên → + 1 tag input phải (các từ cụ thể) + icon thùng rác xoá dòng | Mặc định có sẵn 1-2 dòng trống (Create) | Input trái placeholder *"Add search term"*; input phải dùng chung cơ chế tag input như Unified synonyms | Config nội bộ |
| Nút **New supporting synonyms** | Button dạng pill cam nhạt, icon + | Thêm 1 dòng Supporting synonyms mới | Config nội bộ |
| Nút **Cancel** / **Save** | Button | — | Cancel đóng modal không lưu; Save lưu nhóm | Config nội bộ |

## 3. Business rule & dependency

### 3.1 Validate khi Save (suy ra từ state "Create new synonym group - filled data error")

> Field "general term" (input trái của 1 dòng Supporting synonyms) hiện khung viền đỏ kèm chữ đỏ **"Synonym already existed!"** khi giá trị trùng với 1 general term đã tồn tại (ở nhóm khác hoặc dòng khác).
> Field tag input (phần "từ cụ thể hơn" bên phải) hiện khung viền đỏ kèm chữ đỏ **"Synonym must be unique!"** khi trong cùng ô có 2 tag trùng giá trị (ảnh minh hoạ cho thấy tag "nike air max" bị lặp 2 lần).

Diễn giải: validate áp dụng tại cả 2 tầng — (a) không được trùng tên giữa các "general term" của Supporting synonyms, (b) không được nhập trùng giá trị trong cùng 1 tag input. `[CẦN XÁC NHẬN BA]` — chưa rõ (a) là so trùng trong phạm vi 1 synonym group hay toàn hệ thống (so với general term của group khác); cũng chưa rõ validate có áp dụng tương tự cho **Unified synonyms** (trùng giá trị giữa các tag trong cùng ô, hoặc trùng với 1 synonym đã thuộc nhóm khác) hay không — ảnh chỉ cho thấy lỗi ở phần Supporting synonyms.

### 3.2 Giới hạn tối thiểu field khi Save

`[CẦN XÁC NHẬN BA]` — Figma không thể hiện rõ: SYNONYM GROUP NAME có bắt buộc nhập không (nhãn tô màu cam giống style "required" ở các field khác trong dự án, nhưng không thấy state lỗi rõ ràng cho field này); Unified synonyms và Supporting synonyms có bắt buộc có ít nhất 1 giá trị không, hay có thể Save với cả 2 đều rỗng.

### 3.3 AI gán nhãn cho synonym được xác nhận từ gợi ý

> Annotation gắn trực tiếp trên layer (không phải sticky note nổi): **"gán tag AI vào synonym"**, gắn trên tag "track spikes" trong khối Unified synonyms ở modal "View details".

Diễn giải: khi merchant bấm **Confirm** cho 1 từ khoá do AI gợi ý (xem mục 4), từ đó được thêm vào danh sách Unified synonyms **kèm 1 badge cam nhỏ ghi "AI"** để phân biệt với synonym do merchant tự gõ tay (tag thường, không badge). `[CẦN XÁC NHẬN BA]` — badge AI có hiển thị lại ở màn danh sách Synonyms List (cột Synonyms) không, hay chỉ hiện trong modal.

### 3.4 Status OFF → hành vi trên storefront

`[CẦN XÁC NHẬN BA]` — Figma không có frame storefront riêng cho Synonyms trong file này. Theo pattern chung của dự án (toggle Status trên 1 danh sách cấu hình), suy đoán: Status OFF thì shopper search không còn được áp synonym của nhóm đó (search theo đúng từ gõ, không mở rộng/không gộp kết quả) — cần BA xác nhận, không suy ra là mặc định đúng.

## 4. Modal/sub-flow con

### 3.5 Backend AI tự động sinh synonym — theo Lark (không thấy trên Figma)

Lark mô tả **2 nguồn tạo synonym**:

1. **"KH tự chủ động input"** — merchant tự tạo bằng 2 cách: **Import single input** (khớp UI đã đọc ở mục 2.2) hoặc **Import file CSV**. `[CẦN XÁC NHẬN BA]` — **"Import file CSV" không thấy bất kỳ nút/flow nào trên Figma** đã đọc (chỉ có modal nhập tay từng tag) — cần xác nhận lại: tính năng này chưa được thiết kế UI, hay nằm ở 1 frame khác chưa đọc tới?
2. **"Tự động làm đầy dữ liệu synonyms (AI synonyms)"** — 3 job chạy nền, tách biệt với flow "AI Synonyms Suggested" ở mục 4.3:
   - **Job 1** (chạy 1 tháng/lần): quét toàn bộ data đã import từ store KH, phân loại keyword thành entity (VD Gender, Type, Color...), với mỗi entity tìm keyword và đề xuất synonym nếu phù hợp, tính confidence score, **chỉ áp dụng (apply) synonym có confidence score > 75%**.
   - **Job 2** (chạy 1 ngày/lần): tương tự Job 1 nhưng input là **Search term thật của shopper** thay vì data import, cùng ngưỡng confidence > 75%.
   - **Job 3** (chạy 1 tháng/lần) — "Làm đầy kho synonyms bằng AI": rule riêng — **tối đa 10 synonym cho 1 từ** (đủ 10 thì dừng generate thêm); **bắt buộc tối thiểu phải có dạng số nhiều (plurals)** nếu keyword là danh từ (VD "mouse" → "mice", "chicken" → "chickens"); cùng ngưỡng confidence > 75%.

`[CẦN XÁC NHẬN BA]` — **điểm cần hỏi lại BA, không tự suy diễn**: Lark dùng động từ **"apply"** (áp dụng thẳng) cho synonym có confidence > 75%, trong khi Figma (mục 4.3) cho thấy 1 flow **merchant phải bấm Confirm/Skip thủ công** cho từng từ khoá AI gợi ý trước khi nó được thêm vào Unified synonyms. 2 khả năng: (a) ngưỡng 75% chỉ là điều kiện để 1 gợi ý **xuất hiện** trên card "AI Synonyms Suggested" (vẫn cần Confirm mới thật sự lưu — đúng như Figma), hoặc (b) có 2 cơ chế song song: 1 số job auto-apply thẳng không qua review (đúng nghĩa đen "apply" của Lark) và 1 flow khác (card UI) chỉ dành riêng cho 1 loại gợi ý cụ thể. Không được viết test case giả định theo 1 trong 2 khả năng khi chưa hỏi lại.

### 4.1 Delete synonym group — popup xác nhận

Trigger: bấm icon Delete ở cột Action (màn danh sách) hoặc icon thùng rác bên trong modal Edit (xoá 1 dòng Supporting synonyms — xem 4.2).

Nội dung popup (ở cấp Synonym Group):
- Tiêu đề: **"Delete synonym?"**
- Mô tả: **"Deleted synonyms cannot be recovered. Do you still want to continue?"**
- 2 nút: 1 nút nền xám viền ("Delete"), 1 nút nền cam ("Cancel").

`[CẦN XÁC NHẬN BA]` — **nghi vấn label/màu nút bị đảo ngược**: theo đúng pattern nút của dự án (màu cam = hành động chính/xác nhận, xám viền = hành động phụ/huỷ — đã thấy nhất quán ở các popup khác như Merge Values, Pricing), thì nút cam phải là **"Delete"** (xác nhận xoá) và nút xám phải là **"Cancel"**. Ở đây Figma ghi ngược: nút xám ghi "Delete", nút cam ghi "Cancel". Cần hỏi lại designer/BA đây là lỗi gõ nhãn trong Figma hay là chủ đích (đổi màu để tránh bấm nhầm xoá).

Sau khi xác nhận xoá: toast **"Success — Delete success"** (tên toast lấy từ label chung "Chọn Delete, xoá thành công" của flow note trên canvas, chưa thấy nguyên văn chữ hiển thị trên toast — `[CẦN XÁC NHẬN BA]` nội dung chính xác).

**Bổ sung (review-testcase-quality, đọc ảnh Figma độ phân giải cao)**: toast sau khi Save thành công (Create lẫn Edit) hiển thị đúng **"Success"** (icon check xanh) + nội dung **"Saved changes!"**. Toast Delete vẫn chưa xác nhận được nội dung chính xác (xem mục 4.1) — cần đối chiếu xem có cùng pattern `"Success / <message>"` hay khác, để đảm bảo nhất quán giữa các action.

### 4.2 Edit synonym group

Trigger: bấm icon Edit ở cột Action. Mở đúng modal 2 cấu trúc như Create (xem 2.2), nhưng load sẵn dữ liệu hiện tại và tiêu đề đổi thành **"Edit synonym group"**.

- Xoá 1 dòng Supporting synonyms: bấm icon thùng rác của dòng đó → mở lại đúng popup "Delete synonym?" / "Deleted synonyms cannot be recovered..." (dùng chung component với 4.1) → xác nhận thì dòng biến mất khỏi modal, chưa lưu xuống hệ thống cho tới khi bấm Save ở modal cha. `[CẦN XÁC NHẬN BA]` — xoá dòng trong modal có hỏi xác nhận ngay hay chỉ hỏi xác nhận khi xoá cả Synonym Group (ảnh cho thấy cả 2 trigger dùng chung 1 kiểu popup, nhưng ngữ cảnh "trong modal Edit" vs "ở danh sách" có thể khác nhau về việc có Save lại được không sau Cancel).
- **Clear all** (trong ô Unified synonyms) xoá hết tag nhưng không có popup xác nhận riêng — khác với xoá 1 dòng Supporting synonyms.

### 4.3 AI synonym suggestion

Trigger: hệ thống tự phát hiện (không phải thao tác merchant) — card **"AI Synonyms Suggested"** xuất hiện phía trên Synonyms List trên màn danh sách, mỗi card gắn với 1 Synonym Group cụ thể, nội dung mẫu: *"Help more customers find 'Shoes for man' with more unified synonyms?"* kèm 2-3 từ khoá gợi ý rút gọn (VD "trekking shoes", "sneakers" + "+N more") và nút **View details**.

Modal "View details":
- Hiển thị lại SYNONYM GROUP NAME (read-only).
- Khối "section/ insight" — tiêu đề lặp lại câu hỏi gợi ý ở trên, mô tả **"Add these keywords to synonym list"**, liệt kê từng từ khoá gợi ý dưới dạng card riêng: Tag tên từ khoá + **"Confidence score"** (số, VD 99, 89, 79) + 2 nút **Skip** / **Confirm**.
- **Bổ sung (review-testcase-quality, đọc ảnh Figma độ phân giải cao)**: cạnh "Confidence score" có 1 icon tooltip `"?"` — nội dung tooltip chưa đọc được qua Figma, `[CẦN XÁC NHẬN BA]`. Khối card gợi ý là 1 **carousel ngang** (không phải danh sách tĩnh): chỉ hiện tối đa ~3 card cùng lúc, card tiếp theo bị cắt bởi overlay gradient kèm nút mũi tên `">"` để cuộn — khác với cách mô tả "liệt kê" ở trên, cần lưu ý khi test Synonym Group có >3 từ khoá gợi ý.
- Bấm **Confirm** cho 1 từ khoá → từ đó được thêm vào khối Unified synonyms bên dưới, kèm badge "AI" (xem 3.3).
- Bấm **Skip** → `[CẦN XÁC NHẬN BA]` từ khoá đó biến mất khỏi card gợi ý ngay hay cần Save mới ghi nhận; gợi ý đã Skip có hiện lại ở lần sau không.
- Khối Unified synonyms đầy đủ (đã gồm cả synonym cũ + synonym vừa Confirm) + khối Supporting synonyms hiển thị y hệt cấu trúc modal Edit.
- Footer: **Cancel** / **Save**.

`[CẦN XÁC NHẬN BA]` — card gợi ý AI tính "Confidence score" dựa trên dữ liệu gì (tần suất search cùng lúc 2 từ, tỷ lệ click, hay nguồn khác)? Ngưỡng nào thì 1 từ được coi là đủ tin cậy để gợi ý? Không có note nào giải thích — đánh dấu Loại 2, không tự suy luận thuật toán.

### 4.4 Search synonym (ô tìm kiếm trên danh sách)

2 trạng thái quan sát được qua Figma:
- **Has result**: gõ "shoes" → danh sách lọc còn các Synonym Group khớp (VD "Shoes for man", "running shoes").
- **No result**: gõ "shoes for girl" → bảng hiện dòng **"There is no synonym found."**, vẫn giữ pagination.

`[CẦN XÁC NHẬN BA]` — ô search khớp theo tên Synonym Group, theo giá trị bên trong Unified/Supporting synonyms, hay cả 2? Có phân biệt hoa/thường, có bỏ dấu/khoảng trắng như quy tắc smart search ở Filter không (xem `filter-advanced-settings-specs.md` mục 3.4 để đối chiếu nếu BA xác nhận dùng chung quy tắc)? Có debounce/lọc ngay khi gõ hay cần Enter?

## 5. Validation & giới hạn cụ thể

| Field/Thao tác | Rule |
| --- | --- |
| Supporting synonyms — general term (input trái) | Không được trùng — lỗi "Synonym already existed!" |
| Supporting synonyms — tag cụ thể (input phải) | Không được trùng trong cùng ô — lỗi "Synonym must be unique!" |
| Số lượng Unified synonyms tối đa/tối thiểu | `[CẦN XÁC NHẬN BA]` — không thấy giới hạn trên Figma |
| Số lượng dòng Supporting synonyms tối đa | `[CẦN XÁC NHẬN BA]` — không thấy giới hạn trên Figma |
| Độ dài SYNONYM GROUP NAME / 1 synonym | `[CẦN XÁC NHẬN BA]` — không thấy giới hạn ký tự trên Figma (các field tương tự ở Merge Values giới hạn 255 ký tự, nhưng không có bằng chứng trực tiếp cho Synonyms — không suy ra áp dụng chung) |

## 6. Câu hỏi mở

| # | Câu hỏi | Phân loại | Mục |
| --- | --- | --- | --- |
| 1 | ~~Cột Action ở danh sách Synonyms có đúng 2 icon Edit + Delete theo đúng thứ tự trái→phải như các bảng khác trong dự án không?~~ **Đã đóng (review-testcase-quality, đọc ảnh Figma độ phân giải cao)**: đúng thứ tự Edit (bút chì) → Delete (thùng rác), trái sang phải. | Loại 2 | 2.1 |
| 2 | Nút trong popup "Delete synonym?" — màu cam ghi "Cancel", màu xám ghi "Delete" — có bị đảo ngược nhãn so với chủ đích thiết kế không? | Loại 2 | 4.1 |
| 3 | Validate trùng tên (Synonym already existed / must be unique) có áp dụng cho Unified synonyms không, hay chỉ Supporting synonyms? | Loại 2 | 3.1 |
| 4 | SYNONYM GROUP NAME, Unified synonyms, Supporting synonyms có field nào bắt buộc (required) khi Save không? | Loại 2 | 3.2 |
| 5 | Status OFF ảnh hưởng gì tới storefront search thật? | Loại 2 | 3.4 |
| 6 | Xoá 1 dòng Supporting synonyms trong modal Edit — xác nhận ngay hay chỉ xác nhận thật khi Save modal cha? | Loại 2 | 4.2 |
| 7 | Bấm Skip ở gợi ý AI — có hiện lại gợi ý đó ở lần sau không? | Loại 2 | 4.3 |
| 8 | Theo Lark, synonym confidence > 75% được "apply" trực tiếp bởi Job 1/2/3 — có đúng là tự động lưu luôn (không qua Confirm/Skip của merchant) hay chỉ là điều kiện để xuất hiện trên card "AI Synonyms Suggested" ở mục 4.3? Nếu auto-apply thật, merchant có cách nào xem lại/undo các synonym do hệ thống tự thêm không? | Loại 2 | 3.5, 4.3 |
| 8b | "Import file CSV" (nhắc trong Lark) có UI tương ứng chưa, hay chưa được thiết kế? | Loại 2 | 3.5 |
| 8c | Job 3 bắt buộc có dạng số nhiều (plurals) trong list synonym — rule này áp dụng cho Unified synonyms, Supporting synonyms, hay cả 2? | Loại 2 | 3.5 |
| 9 | Ô Search group synonym khớp theo field nào, có theo quy tắc smart search giống Filter không? | Loại 2 | 4.4 |
| 10 | Giới hạn số lượng/độ dài cho các field nhập tay | Loại 2 | 5 |
| 11 | Toggle Status OFF/ON có ảnh hưởng gì tới khối "AI Synonyms Suggested" không (group đang OFF có còn được AI gợi ý thêm từ khoá không)? | Loại 2 | 2.1, 4.3 |
| 12 | Nội dung tooltip icon "?" cạnh Confidence score giải thích điều gì (tần suất search, tỷ lệ click...)? Phát hiện qua `review-testcase-quality` — icon tồn tại trên Figma nhưng chưa đọc được nội dung tooltip. | Loại 2 | 4.3 |

Không có câu hỏi Loại 1 (BC platform fact) — Synonyms là tính năng nội bộ của Native Search, không liên quan dữ liệu BigCommerce (đối chiếu `docs/sync-fields-glossary.md`: không có mục nào nhắc tới Synonym).

## 7. Metadata

- **Feature:** Search — Synonyms (màn List + modal Create/Edit 1 cấu trúc dùng chung + AI suggestion + Search)
- **Nguồn:** Figma `dHTNp9Dd43Sbzy0hNWGMUC`, page `↪ Synonyms` (node `1:7`), đọc qua `figma-native` ngày 2026-11-09. Lark `[Spec] Synonyms` đọc qua Chrome extension ngày 2026-11-09 (xem mục 0, 3.5).
- **Không có sticky note nào trong page này** — chỉ có 1 data-annotation layer (mục 3.3).
- **Số câu hỏi CẦN XÁC NHẬN BA:** 13 (toàn bộ Loại 2), trong đó có 1 điểm cần hỏi BA để làm rõ quan hệ giữa backend AI job (Lark) và flow Confirm/Skip trên UI (Figma) — câu hỏi #8. **Cập nhật (review-testcase-quality)**: câu hỏi #1 đã đóng (xác nhận thứ tự icon Edit→Delete qua ảnh độ phân giải cao); bổ sung câu hỏi #12 (nội dung tooltip Confidence score) — tổng còn lại 13 câu mở (12 cũ trừ #1 đã đóng, cộng 1 câu mới #12).
- **Cấu trúc đề xuất cho test case:** 4 nhóm — (1) Synonyms List + Search, (2) Create/Edit synonym group (validate trùng tên), (3) Delete (cả cấp group và cấp dòng Supporting), (4) AI synonym suggestion (Confirm/Skip)
