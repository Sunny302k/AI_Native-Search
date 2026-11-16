# Stopwords — Specs

## 0. Nguồn gốc tài liệu

Viết từ Figma file "Searching" (fileKey `dHTNp9Dd43Sbzy0hNWGMUC`, page `↪ Stopwords`, node gốc `1:8`), đọc trực tiếp qua MCP (tài khoản `hanguyen31.tt@gmail.com`).

**Cập nhật 2026-11-09**: đã đọc được link Lark `[Spec] Stopwords` (https://h4zq094ccpa.sg.larksuite.com/docx/WPiVdESe8ol2rqxgDWLltchpgBb) qua extension Chrome. Lark bổ sung nhiều thông tin quan trọng hoàn toàn không có trên Figma (Figma chỉ có màn Admin CRUD): phạm vi áp dụng (chỉ khi ISW bật), 2 nguồn stopword (trong đó 1 nguồn merchant không hề thấy được), danh sách stopword mặc định khi cài app, và dataflow xử lý theo từng keystroke — xem mục 1 và 3.5 mới. Đây là bổ sung lớn, không phải mâu thuẫn — không có gì trong Lark phủ định lại phần đã viết từ Figma.

**Cập nhật 2026-11-16 (re-verify Figma độ phân giải cao, kết hợp đối chiếu các task Search cũ)**: phát hiện 3 điểm quan trọng mà lần đọc 2026-11-09 chưa ghi nhận:
1. **Màn List có 2 TAB**: **"Manual Stop Word"** (đang active, chính là màn đã mô tả ở mục 2.1) và **"AI Stop Word"** kèm badge **"Coming soon"** (tab bị khoá, chưa có nội dung/chức năng). Đây rất có thể là UI tương lai cho đúng "nguồn tổng hợp của app" mà Lark mô tả (mục 3.5) — khớp hướng với việc Lark nói nguồn đó hiện KHÔNG hiển thị trên Admin, và Figma cho thấy nó sắp được thêm vào dưới dạng tab riêng nhưng chưa triển khai. Xem câu hỏi mở #13 mới.
2. **Đã đóng câu hỏi mở #6**: xác nhận qua ảnh Figma độ phân giải cao — mỗi chip trong Stop Word List **CHỈ có 1 icon (thùng rác/Delete)**, KHÔNG có icon bút chì/Edit nào. Ghi nhận trước đó trong spec (mục 2.1 cũ) về "icon Edit + icon Delete" là **đọc nhầm** — sửa lại, đóng câu hỏi mở #6: Stop word xác nhận KHÔNG sửa được sau khi tạo, chỉ Create thêm hoặc Delete rồi tạo lại.
3. **Sửa số liệu ảnh minh hoạ Feature Tour**: ảnh thật hiển thị **"20 results for 'denim shirt'"**, KHÔNG phải "30 results" như bản ghi trước — đây vẫn là ảnh demo tĩnh, không dùng làm căn cứ verify số liệu thật, nhưng cần trích đúng nguyên văn khi viết test case.

Khác với Synonyms/Suggestion Dictionary, page này **có đủ note bằng text annotation gắn trực tiếp trên flow diagram** (dạng nhãn mũi tên tiếng Việt, tương đương vai trò sticky note) — coi các nhãn này là business rule chính thức theo đúng rule "Figma notes = spec" của dự án. Trích nguyên văn ở mục 3.

## 1. Tổng quan

Stop word là các từ phổ biến, ít mang ý nghĩa phân biệt, bị **loại khỏi việc so khớp khi search** để trả kết quả liên quan hơn. Mô tả trên card Feature tour: *"Use stop words to filter out certain words from the search and customer will get more relevant search results."*

Ví dụ minh hoạ trong note gốc (trích nguyên văn): *"a search for the phrase 'Joe's Awesome Tools' would return results matching 'Joe's', 'Awesome', and 'Tools'. Excluding the word 'tool' from search returns better results and likely only results from the brand Joe's Awesome Tools."*

Card feature tour còn có 1 ví dụ minh hoạ bằng ảnh: search "**the** denim shirt" → loại bỏ "the" → **"20 results for 'denim shirt'"**. Đây là ảnh minh hoạ tĩnh, không phải dữ liệu thật — không dùng số liệu trong ảnh này làm căn cứ verify (cùng nguyên tắc với khối "Review Filter Node" ở Merge Values). Nội dung đầy đủ của Feature Tour (xác nhận qua ảnh Figma độ phân giải cao, 2026-11-16): *"Use stop words to filter out certain words from the search and customer will get more relevant search results"* kèm bullet: *"When customers search using broad or low-meaning terms, they get too many irrelevant results that make it harder to find what they're looking for. You can filter out common words like 'a', 'an', 'the', and other filler terms so searches focus on the product details that actually matter."*

**Theo Lark** (`[Spec] Stopwords`), phạm vi áp dụng được ghi rõ: *"Khi khách hàng enable tính năng Instant Search Widget, mỗi khi KH input thì app sẽ tự động lọc ra những từ ngữ không có nhiều ý nghĩa trong query"* — nghĩa là stopword filter gắn với **ISW đang bật**, lọc theo **mỗi lần shopper gõ thêm ký tự** (không chỉ 1 lần khi submit). `[CẦN XÁC NHẬN BA]` — có áp dụng tương tự khi search trực tiếp trên Search Result Page (không qua ISW gõ từng ký tự) không, hay chỉ ISW mới có cơ chế lọc theo từng keystroke này?

**Lark còn tiết lộ 2 nguồn stopword** mà Figma hoàn toàn không thể hiện — xem mục 3.5.

**Khác biệt quan trọng so với Synonyms/Suggestion Dictionary**: mỗi stop word **không có toggle Status riêng** — khớp với Table row/View chỉ gồm text + 2 icon Edit/Delete, không có iOS Toggle nào. `[CẦN XÁC NHẬN BA]` — xác nhận lại đây có đúng là thiết kế chủ đích (1 khi đã tạo thì luôn áp dụng, muốn ngừng áp dụng phải Delete) hay chỉ là thiếu sót so với Synonyms/Suggestion Dictionary.

## 2. Danh sách field

### 2.1 Màn "Stop words" (danh sách)

| Field | Loại | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- |
| Nút back ← + tiêu đề "Stop words" | Header | Quay lại màn trước | Config nội bộ |
| Feature tour "What is stop word ?" | Panel thu gọn được | Giải thích + ví dụ (mục 1) | Config nội bộ |
| **2 Tab: "Manual Stop Word" / "AI Stop Word"** | Tab | **Manual Stop Word** = tab active, chính là màn CRUD mô tả trong spec này. **AI Stop Word** kèm badge **"Coming soon"** — tab bị khoá, chưa có nội dung. Xác nhận qua ảnh Figma độ phân giải cao, 2026-11-16 | Config nội bộ (tab Manual); AI Stop Word chưa rõ, xem câu hỏi mở #13 |
| Nút **Create new** | Button | Mở modal "Create new stop word" | Config nội bộ |
| Nút **Export** / **Import** | Button (icon mũi tên lên/xuống) | Đặt cạnh nút Create new, đang active (khác tab "AI Stop Word" có badge khoá) — xác nhận qua ảnh Figma độ phân giải cao, 2026-11-16. Đây chính là UI cho "bulk import qua CSV" Lark nhắc tới (câu hỏi mở #11 cũ). `[CẦN XÁC NHẬN BA]` — không tìm thấy modal/popup/flow nào cho Import/Export trong page đã đọc, chưa rõ hành vi chi tiết | Config nội bộ (thao tác); nội dung file import/export = liên quan trực tiếp dữ liệu Stop Word List |
| Ô **Stop word** (search) | Text input | Placeholder xác nhận: **"Stop word"** (không có dấu phẩy như pattern "Search group, synonym"/"Search keyword, suggestion" ở 2 feature anh em) — lọc danh sách theo từ, chưa rõ khớp chính xác hay khớp 1 phần | Config nội bộ (thao tác) |
| **Stop Word List** | Lưới chip dàn hàng (không phải bảng cột cố định) | Mỗi chip = 1 stop word, rộng theo độ dài chữ (**tối thiểu 28px, tối đa = 100% chiều rộng dòng** — xem mục 5) | Config nội bộ |
| Mỗi chip | Text + **chỉ 1 icon Delete** (thùng rác) | **Đã đóng câu hỏi mở #6** — xác nhận qua ảnh Figma độ phân giải cao: KHÔNG có icon Edit/bút chì nào trên chip, ghi nhận trước đó là đọc nhầm | Config nội bộ |
| Pagination | Component | **15 records/trang** (xem mục 5) | Config nội bộ |
| Empty state | Text + button | *"There are currently no stop word."* + nút Create new | Config nội bộ |

### 2.2 Modal "Create new stop word"

| Field | Loại | Mặc định | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- | --- |
| Bảng gồm cột **"Stop word"** + **"Action"** | Header bảng | — | Mỗi dòng 1 ô nhập + icon xoá dòng | Config nội bộ |
| Input mỗi dòng | Text input | Trống | Placeholder xác nhận qua ảnh Figma độ phân giải cao (2026-11-16): **"Add a stop word"** — sửa lại ghi nhận cũ (không chính xác, do đọc nhầm frame khác có sẵn giá trị "between") | Config nội bộ |
| Icon xoá dòng | Button icon | — | Xoá dòng input đó khỏi modal (chưa lưu) | Config nội bộ |
| Nút **Add more stop word** | Button pill cam nhạt | Thêm 1 dòng input mới; thêm nhiều dòng thì tự cuộn xuống dòng mới nhất | Config nội bộ |
| Nút **Cancel** / **Save Stop Word** | Button | Save ở trạng thái **disable (xám)** cho tới khi hợp lệ | Cancel đóng không lưu; Save lưu toàn bộ danh sách | — |

## 3. Business rule & dependency

### 3.1 Validate khi Save — 2 loại lỗi trùng khác nhau (trích nguyên văn nhãn flow)

> **"Nhập data trùng nhau → Display error when clicking save"** (trùng giữa các dòng đang nhập trong modal)
> **"Chọn Save, báo lỗi trùng data"**
> **"Chọn Save, báo lỗi data đã có sẵn trong list"** (trùng với stop word đã tồn tại từ trước)

Xác nhận qua 2 state lỗi khác nhau đọc được trực tiếp trên Figma:

| Tình huống | Message lỗi (nguyên văn) |
| --- | --- |
| 2 dòng đang nhập trong cùng phiên Create có giá trị trùng nhau | **"Stopword must be unique!"** |
| 1 dòng đang nhập trùng với stop word **đã có sẵn trong list** (đã Save từ trước) | **"Stop word already existed"** |

Đây là 2 rule validate tách biệt, không dùng chung 1 message — khi viết test case phải tách thành 2 case riêng, không gộp chung "test trùng tên".

### 3.2 Kích thước chip trong Stop Word List

> **"Max - width of a stop word = 100% width of row"**
> **"Min - width of a stop word = 285px"**

**Sửa lại (review-testcase-quality, 2026-11-16)**: ghi nhận trước đó "28px" là đọc nhầm — xác nhận lại qua chính text annotation gốc trên Figma (node `4068:46467`): nguyên văn chính xác là **"Min - width of a stop word = 285px"**. Diễn giải: chip hiển thị 1 stop word co giãn theo độ dài chữ, tối thiểu 285px, tối đa chiếm trọn 1 dòng khi từ rất dài.

**Đã đóng (review-testcase-quality, 2026-11-16)**: hành vi khi 1 stop word dài hơn 100% chiều rộng dòng — xác nhận qua ảnh Figma độ phân giải cao, màn List thật: chip chứa câu dài ("Excluding stop words helps improve search by focusing on important terms and delivering faster results. Excluding stop words helps impr...") hiển thị tràn hết 1 hàng và bị **cắt bằng dấu "…"** (ellipsis) ở cuối, KHÔNG xuống dòng giữa chữ, không chặn input. Đóng câu hỏi mở #2.

### 3.3 Số lượng hiển thị mỗi trang

> **"15 records/page"**

Diễn giải: Stop Word List phân trang cố định 15 bản ghi/trang — khác với Synonyms/Suggestion Dictionary (chưa xác nhận số cụ thể, thường mặc định page size khác của dự án). `[CẦN XÁC NHẬN BA]` — số 15 này có đúng là field cứng, hay chỉ là số lượng dùng trong ảnh demo (không phản ánh page size thật)?

### 3.5 2 nguồn stopword + default list + dataflow — theo Lark (không có trên Figma)

**2 nguồn lấy stopword** (trích Lark):

1. **"Nguồn tổng hợp của app"** — stopword do chính Native Search tự thu thập và áp dụng vào store của khách hàng. **Nguồn này luôn luôn được sử dụng và KHÔNG hiển thị trong admin site của khách hàng** — merchant không thấy, không sửa, không xoá được danh sách này qua UI Admin (khớp với việc Figma chỉ có đúng 2 section Create/Delete cho danh sách **do merchant quản lý**, không mâu thuẫn với phần Figma đã đọc).
2. **"User input manually"** — nguồn hiển thị trên Admin site, đúng với màn "Stop words" đã đọc ở mục 2. Theo Lark, merchant tạo nguồn này bằng 2 cách: nhập tay (khớp modal "Create new stop word" đã đọc) **hoặc bulk import qua file CSV**.

**Sửa lại (review-testcase-quality, 2026-11-16)**: ghi nhận trước đó "không thấy bất kỳ nút/flow nào" là **sai, do chưa zoom đúng góc màn hình**. Xác nhận trực tiếp qua ảnh Figma độ phân giải cao: màn List có 2 nút **"Export"** (icon mũi tên lên) và **"Import"** (icon mũi tên xuống) đặt ngay cạnh nút "Create new", đang **active** (không có badge "Coming soon", khác hẳn tab "AI Stop Word"). Đây chính là UI cho "bulk import qua CSV" mà Lark nhắc tới. `[CẦN XÁC NHẬN BA]` — tuy đã thấy nút, nhưng **không tìm thấy modal/popup/flow nào cho Import** trong toàn bộ page đã đọc (không có bước chọn file, preview dữ liệu trước khi import, hay thông báo kết quả) — chưa rõ hành vi khi click Import/Export (định dạng file xuất/nhập, xử lý trùng/lỗi khi import, giới hạn dung lượng).

**Default stopword list khi cài app mới** (trích nguyên văn, tự động add sẵn trước khi merchant thao tác gì): `a, am, an, as, don't, had, hadn't, has, hasn't, have, haven't, if, is, isn't, of, on, or, should, shouldn't, so, the, to, was, wasn't, were`. `[CẦN XÁC NHẬN BA]` — danh sách này thuộc "nguồn tổng hợp của app" (ẩn, không sửa được) hay thuộc "User input manually" (hiển thị trên Admin, merchant có thể sửa/xoá các từ mặc định này)? Lark đặt đoạn list này ngay dưới mục "User input manually" nên nhiều khả năng merchant **thấy và sửa/xoá được** — nhưng cần xác nhận lại, không suy đoán chắc chắn.

**Dataflow xử lý (trích Lark, 5 bước)**:

1. User input query.
2. Query được indexing thành các keyword.
3. Sau khi indexing xong, list keyword được so sánh với list stopword hiện có (gộp cả 2 nguồn ở trên) — keyword trùng stopword bị loại bỏ.
4. List keyword còn lại được đưa vào search engine để phân tích và trả kết quả.
5. User gõ thêm ký tự (update query) → lặp lại từ bước 2.

Diễn giải quan trọng cho test case: việc lọc stopword chạy lại **theo từng keystroke** (ISW), không phải 1 lần duy nhất — khi viết test case ISW cần có case kiểm tra kết quả cập nhật đúng khi gõ thêm/xoá bớt ký tự khiến query match/không match thêm 1 stopword.

## 4. Modal/sub-flow con

### 4.1 Delete stop word — popup xác nhận

- Tiêu đề: **"Delete stop word?"**
- Mô tả: **"Deleted stop word cannot be recovered. Do you still want to continue?"**
- 2 nút: nút nền xám viền ghi **"Delete"**, nút nền cam ghi **"Cancel"**.

`[CẦN XÁC NHẬN BA]` — **cùng hiện tượng nhãn/màu nút bị đảo ngược đã ghi nhận ở Synonyms và Suggestion Dictionary** (dùng chung 1 component "Popups" trong toàn bộ file Figma này). Đây là lỗi/chủ đích chung của **cả 3 feature**, nên chỉ cần 1 câu hỏi/1 bug duy nhất gửi designer, không lặp lại riêng từng feature.

Sau khi xoá: toast **"Success — Delete stop word"** (suy từ nhãn flow "Chọn Delete, xoá thành công"; chưa đọc được nguyên văn chữ trên toast — `[CẦN XÁC NHẬN BA]`).

**Toast sau khi Create thành công — đã xác nhận (2026-11-16)**: xem được 4 Snackbar mẫu trong Figma, toàn bộ đều hiển thị đúng nguyên văn **"Success / Created stop word!"** — khác với Synonyms/Suggestion Dictionary (dùng chung "Saved changes!"), feature này có message riêng theo đúng action. **Toast ngay sau flow Delete trên Figma** (frame cuối section DELETE STOP WORD) **cũng hiển thị y nguyên "Success / Created stop word!"** — tức Figma demo tái sử dụng sai toast Create cho cả Delete, không có toast "Deleted..." riêng. `[CẦN XÁC NHẬN BA]` — chưa rõ đây là lỗi copy-paste frame demo (không đại diện ý đồ thật) hay sản phẩm thật cũng sẽ hiển thị sai như vậy — giữ nguyên câu hỏi mở #5, bổ sung bằng chứng cụ thể này.

### 4.2 Create new stop word — không có bước Edit (đã xác nhận, không phải thiếu sót)

Khác với Synonyms/Suggestion Dictionary (đều có modal Edit riêng, load lại dữ liệu cũ), **page Stopwords chỉ có 2 section: "CREATE NEW STOP WORD" và "DELETE STOP WORD"** — không tìm thấy section hay flow "Edit" nào. **Đã đóng (2026-11-16)**: ghi nhận trước đó về icon Edit/bút chì trên chip là đọc nhầm — xác nhận qua ảnh Figma độ phân giải cao mỗi chip CHỈ có 1 icon Delete. Kết luận: Stop word KHÔNG sửa được sau khi tạo — chỉ Create thêm hoặc Delete rồi tạo lại.

## 5. Validation & giới hạn cụ thể

| Field/Thao tác | Rule |
| --- | --- |
| Trùng tên trong cùng phiên Create | Chặn — "Stopword must be unique!" |
| Trùng tên với stop word đã tồn tại | Chặn — "Stop word already existed" |
| Độ rộng hiển thị 1 chip | Min 285px, Max 100% chiều rộng dòng (vượt quá → cắt bằng "…", đã đóng câu hỏi mở #2) |
| Số bản ghi/trang | 15 (chưa chắc là field cứng, xem 3.3) |
| Độ dài tối đa 1 stop word | `[CẦN XÁC NHẬN BA]` — không thấy giới hạn trên Figma |
| Số dòng tối đa thêm cùng lúc khi Create | `[CẦN XÁC NHẬN BA]` — không thấy giới hạn trên Figma |
| Stop word để trống | `[CẦN XÁC NHẬN BA]` — chưa thấy state lỗi cho ô trống, chỉ thấy lỗi trùng tên |

## 6. Câu hỏi mở

| # | Câu hỏi | Phân loại | Mục |
| --- | --- | --- | --- |
| 1 | Stop word có toggle Status riêng không, hay luôn áp dụng khi đã tạo? | Loại 2 | 1, 2.1 |
| 2 | ~~Hành vi khi 1 stop word dài hơn 100% chiều rộng dòng~~ **Đã đóng (2026-11-16)** — xác nhận qua ảnh Figma: cắt bằng dấu "…", không xuống dòng. | Loại 2 | 3.2 |
| 3 | 15 records/page có phải số cố định không | Loại 2 | 3.3 |
| 4 | Nhãn/màu nút popup Delete bị đảo ngược — chung cho cả 3 feature Search, cần xác nhận 1 lần | Loại 2 | 4.1 |
| 5 | Nguyên văn chữ trên toast sau khi Delete | Loại 2 | 4.1 |
| 6 | ~~Stop word có sửa (Edit) được sau khi tạo không~~ **Đã đóng (2026-11-16)** — xác nhận qua ảnh Figma độ phân giải cao: mỗi chip chỉ có 1 icon Delete, không có Edit; ghi nhận "icon bút chì" trước đó là đọc nhầm. Không sửa được, chỉ Create/Delete. | Loại 2 | 4.2 |
| 7 | Stop word để trống khi Save có bị chặn không | Loại 2 | 5 |
| 8 | Giới hạn độ dài 1 stop word và số dòng thêm tối đa | Loại 2 | 5 |
| 9 | Ô search trên danh sách khớp chính xác hay khớp 1 phần | Loại 2 | 2.1 |
| 10 | Stopword filter có áp dụng khi search trực tiếp trên SRP (không qua ISW) không | Loại 2 | 1 |
| 11 | ~~"Bulk import qua CSV" có UI tương ứng chưa~~ **Đã có UI (2026-11-16)** — nút Export/Import xác nhận tồn tại trên màn List, đang active. Câu hỏi còn lại: hành vi chi tiết khi click (định dạng file, validate khi import, preview trước khi ghi, xử lý lỗi/trùng) — chưa có modal/flow nào thiết kế để đối chiếu. | Loại 2 | 3.5 |
| 12 | Default stopword list khi cài app mới — merchant có xem/sửa/xoá được qua Admin không, hay thuộc nguồn ẩn của app | Loại 2 | 3.5 |
| 13 | **Mới (2026-11-16)** — Tab "AI Stop Word" (Coming soon) có đúng là UI tương lai cho "nguồn tổng hợp của app" mà Lark mô tả không? Khi triển khai, danh sách AI có hiển thị/sửa được qua tab này không, hay vẫn chỉ xem (read-only vì nguồn tự động)? Chưa có timeline hay thiết kế chi tiết nào khác ngoài badge "Coming soon". | Loại 2 | 2.1, 3.5 |

Không có câu hỏi Loại 1 — không liên quan dữ liệu BigCommerce.

## 7. Metadata

- **Feature:** Search — Stopwords (màn List dạng lưới chip + modal Create nhiều dòng + Delete; 2 nguồn stopword + dataflow theo Lark)
- **Nguồn:** Figma `dHTNp9Dd43Sbzy0hNWGMUC`, page `↪ Stopwords` (node `1:8`), đọc qua `figma-native` ngày 2026-11-09. Lark `[Spec] Stopwords` đọc qua Chrome extension ngày 2026-11-09 (xem mục 0, 1, 3.5) — bổ sung 2 nguồn stopword, default list, và dataflow xử lý theo keystroke không có trên Figma.
- **Có annotation dạng nhãn flow tiếng Việt** đóng vai trò note chính thức (mục 3) — không có sticky note vàng truyền thống nhưng tương đương về giá trị thông tin.
- **Số câu hỏi CẦN XÁC NHẬN BA:** 13 ban đầu, đã đóng #6 (icon Edit — đọc nhầm, xác nhận không có) qua ảnh Figma độ phân giải cao — còn 12 câu mở, trong đó có 1 câu mới #13 (tab "AI Stop Word - Coming soon").
- **Liên quan tới spec khác:** câu hỏi #4 (nhãn nút popup Delete) dùng chung với `search-synonyms-specs.md` mục 4.1 và `search-suggestion-dictionary-specs.md` mục 4.1 — chỉ cần hỏi designer 1 lần cho cả 3.
- **Cấu trúc đề xuất cho test case:** 3 nhóm — (1) Stop Word List + Search + phân trang, (2) Create new (nhiều dòng, 2 loại lỗi trùng), (3) Delete
