# Suggestion Dictionary — Specs

## 0. Nguồn gốc tài liệu

Viết từ Figma file "Searching" (fileKey `dHTNp9Dd43Sbzy0hNWGMUC`, page `↪ Suggestion Dictionary`, node gốc `1:6`), đọc trực tiếp qua MCP (tài khoản `hanguyen31.tt@gmail.com`). **Cũng không tìm thấy sticky note vàng nào** trong toàn bộ page (chỉ 2 section: "Create new suggestion" và "Edit. Delete").

**Cập nhật 2026-11-16**: đã đọc được link Lark `[Spec] Autocomplete Suggestions` (https://h4zq094ccpa.sg.larksuite.com/docx/Cfi8dOpJ8osVASxj3EUlGIrcgjc) qua extension Chrome. Lark mô tả **thuật toán backend tự động sinh gợi ý autocomplete** (Product data + Search query data, logic gán điểm, 3 mức ưu tiên UT) — hoàn toàn không thấy trên Figma, xem mục 3.3 mới. Đây là bổ sung quan trọng làm rõ phần lớn câu hỏi mở #1 cũ, nhưng đồng thời phát sinh 1 câu hỏi mở MỚI quan trọng hơn: quan hệ giữa engine tự động này và danh sách "Do suggestion" mà merchant thao tác thủ công trên Figma — xem câu hỏi mở #10.

## 1. Tổng quan

Suggestion Dictionary cho phép merchant định nghĩa sẵn **danh sách gợi ý autocomplete** hiển thị khi shopper gõ 1 hoặc nhiều từ khoá search cụ thể, và **sắp xếp thứ tự ưu tiên** của các gợi ý đó.

Cấu trúc 1 bản ghi (gọi là "suggestion"):
- **Trigger** — 1 hoặc nhiều "search term" (từ khoá khi shopper gõ sẽ kích hoạt gợi ý này).
- **Do suggestion** — danh sách các cụm từ gợi ý hiển thị trong dropdown autocomplete, có thể **kéo sắp xếp lại thứ tự ưu tiên** (rank 1, 2, 3...).
- **Toggle** "Apply to other search term having this suggestion" — xem câu hỏi mở #2, chưa rõ nghĩa chính xác.

## 2. Danh sách field

### 2.1 Màn "Suggestion" (danh sách)

| Field | Loại | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- |
| Nút back ← + tiêu đề "Suggestion" | Header | Quay lại màn trước | Config nội bộ |
| Card Feature tour | Panel thu gọn được | **Đã đọc được (review-testcase-quality, 2026-11-16)**: *"Use suggestion to guide what shoppers see first... Boost specific suggestions so they appear at the top when customers type in the instant search widget."* — mô tả Suggestion Dictionary là cơ chế **boost/ưu tiên hiển thị**, không chỉ đơn thuần sắp xếp lại kết quả tự sinh. Đây là bằng chứng hỗ trợ (chưa phải xác nhận chính thức) cho câu hỏi mở #10/#12. | Config nội bộ |
| Nút **Create new** | Button | Mở modal 2 bước "Create new suggestion" | Config nội bộ |
| Ô **input/ search** | Text input | Placeholder xác nhận qua ảnh Figma độ phân giải cao: **"Search keyword, suggestion"** (có dấu phẩy, giống pattern "Search group, synonym" của Synonyms) — gợi ý search áp dụng cho CẢ 2 cột (When user search + Do suggestion), nhưng vẫn chỉ là tín hiệu từ placeholder, chưa phải xác nhận chắc chắn hành vi search thật (xem câu hỏi mở #8) | Config nội bộ (thao tác) |
| Cột **Status** | Toggle | Bật/tắt 1 suggestion | Config nội bộ |
| Cột **When user search** (tên cột đã xác nhận qua ảnh Figma độ phân giải cao) | Tag list | Các từ khoá trigger, dạng tag (VD "shoes", "running shoes", "trail shoes") | Config nội bộ |
| Cột **Do suggestion** (tên cột đã xác nhận qua ảnh Figma độ phân giải cao) | Danh sách có rank | Mỗi dòng gồm số thứ tự (ô vuông: 1, 2, 3...) + nội dung gợi ý, dạng "+N more" khi dài (quan sát: luôn hiện đúng 3 dòng đầu + "+7 more") | Config nội bộ |
| Cột **Action** | Icon | 2 icon theo đúng thứ tự trái→phải: Edit (bút chì) trước, Delete (thùng rác) sau — xác nhận qua ảnh Figma độ phân giải cao | Config nội bộ |
| Pagination | Component | Phân trang | Config nội bộ |

**Đã đóng (xác nhận qua ảnh Figma độ phân giải cao)**: tên 2 cột giữa chính xác là **"When user search"** và **"Do suggestion"** — đóng câu hỏi mở #3 cũ.

### 2.2 Modal "Create new suggestion" / "Edit" — 2 bước (stepper)

**Bước 1 — "Add search term(s)"**

| Field | Loại | Mặc định | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- | --- |
| "When user search" | Label | — | Tiêu đề khối | Config nội bộ |
| Danh sách input trigger term | Text input, nhiều dòng | 1 dòng trống, placeholder *"Add a search term"* | Mỗi dòng 1 từ khoá trigger | Config nội bộ |
| Nút **Add new term** | Button pill cam | Thêm 1 dòng input trigger mới | Config nội bộ |
| **Next** | Button | Disable (xám) khi chưa đủ điều kiện, cam khi đủ | Sang bước 2 | — |

**Bước 2 — "Prioritize suggestions"**

| Field | Loại | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- |
| "Do suggestion" | Label | Tiêu đề khối | Config nội bộ |
| Danh sách gợi ý (reorder) | List kéo-thả, mỗi dòng có icon kéo (reorder) + text | Thứ tự hiển thị trong dropdown autocomplete thật theo đúng thứ tự kéo-thả ở đây | `[CẦN XÁC NHẬN BA]` — xem câu hỏi mở #1 |
| Toggle **"Apply to other search term having this suggestion"** | iOS toggle, mặc định OFF (track xám) | Ý nghĩa chưa rõ — xem câu hỏi mở #2 | Config nội bộ |
| **Cancel** / **Save** | Button | Cancel đóng không lưu; Save lưu | — |

## 3. Business rule & dependency

### 3.1 Không tìm thấy sticky note — toàn bộ rule dưới đây là suy luận từ luồng UI, chưa có xác nhận

> Không có note gốc nào trong page này để trích dẫn.

- Bước 1 chỉ cho **thêm dòng trigger term** (nút "Add new term"), **không thấy nút xoá dòng hay icon thùng rác** trong Table row ở bước 1 — khác với Synonyms (nơi Supporting synonyms có nút xoá dòng rõ ràng). `[CẦN XÁC NHẬN BA]` — có xoá được 1 trigger term đã thêm trước khi Save không, thao tác thế nào?
- Bước 2 (danh sách suggestion để kéo-thả) **không thấy nút thêm dòng mới** trong modal Create — chỉ có 5 dòng có sẵn trong ảnh mẫu. `[CẦN XÁC NHẬN BA]` — đây là dữ liệu mẫu minh hoạ hay đúng là UI không cho thêm gợi ý mới tại bước này (gợi ý đến từ nguồn khác, VD tính toán tự động từ dữ liệu search — xem câu hỏi mở #1)?

### 3.2 Đồng bộ với Synonyms (nghi ngờ dùng chung dữ liệu mẫu)

Dữ liệu mẫu ở Suggestion Dictionary ("white nike sneakers", "white trainers", "white running shoes", "tennis shoes", "road running") **trùng hoàn toàn** với dữ liệu mẫu Unified synonyms ở feature Synonyms (`search-synonyms-specs.md` mục 2.2) — đã xác nhận trực tiếp qua ảnh Figma độ phân giải cao (2026-11-16), đúng cả nội dung lẫn thứ tự 5 dòng. `[CẦN XÁC NHẬN BA]` — đây chỉ là trùng ngẫu nhiên do designer dùng chung 1 bộ dữ liệu demo, hay 2 feature này thực sự liên quan nhau (VD Suggestion Dictionary tự động lấy danh sách từ Unified synonyms của Synonyms Group tương ứng)? Cần hỏi BA trước khi viết test case giả định 2 feature độc lập hoàn toàn.

### 3.3 Backend auto-suggest algorithm — theo Lark (không thấy trên Figma)

Lark mô tả cơ chế **tự động sinh gợi ý autocomplete cho Instant Search Widget**, áp dụng khi shopper gõ ký tự:

**Nguồn dữ liệu (Source index):**
1. **Product data** — Product name + Variant: tách từ thành keyword, gộp lại thành 1 keyword lớn hơn (VD `"[Sample] Fog Linen Chambray Towel - The Beige Stripe"` → `"sample fog linen chambray towel beige stripe"`). Product description: tách thành các keyword riêng biệt.
2. **Search query data** — toàn bộ search query thật của shopper, đánh điểm và lưu vào database (có nhắc "5000 search query đã import" làm tập dữ liệu nền).

**Logic hiển thị** — bắt buộc khớp **keyword đứng đầu trong 1 từ** (VD gõ "dr" → suggest "dress", KHÔNG suggest "eardrops"). Thứ tự ưu tiên theo 3 mức UT:
1. **Exact match** — dữ liệu từ Search query hoặc Product data khớp đúng 100% với từ khoá gõ (VD Exact SKU match).
2. **Search query** — "auto suggest" hoàn thiện câu dựa trên tập 5000 search query đã import; ưu tiên hiển thị theo: điểm cao hơn trước, rồi query ngắn hơn trước.
3. **Product data** — tương tự Search query nhưng so khớp với Product data đã import; cùng thứ tự ưu tiên (điểm cao hơn trước, ngắn hơn trước).

**Logic gán điểm:**
- Search query: mặc định = 1 điểm; mỗi lần shopper click vào suggestion đó = +1 điểm (tích luỹ qua thời gian).
- Product data: autocomplete ra product name/category name = 3 điểm; ra variant/SKU = 2 điểm; ra description = 1 điểm.

**Inferred Queries (Complete the sentence)** — hệ thống so khớp prefix của câu đang gõ với các suggestion hiện có, rồi tạo thêm 1 suggestion mới bằng cách lấy từ tiếp theo khớp prefix. VD: gõ `"blue dress p"`, đã có suggestion `"blue dress with poka dots"` → hệ thống tự ghép thành `"blue dress poka"`.

`[CẦN XÁC NHẬN BA]` — **câu hỏi mở #10, quan trọng nhất của feature này**: toàn bộ cơ chế trên là **tự động hoàn toàn** (không qua màn hình Suggestion Dictionary), vậy màn "Suggestion" (List + Create/Edit 2 bước) ở mục 2 dùng để làm gì? 2 khả năng: (a) Suggestion Dictionary là lớp **override thủ công** — merchant tự định nghĩa 1 danh sách suggestion cố định cho 1/nhiều trigger term cụ thể, danh sách này được ưu tiên hiển thị TRƯỚC/THAY THẾ kết quả tự động của engine Lark cho đúng trigger term đó; hay (b) Suggestion Dictionary chỉ là màn hình **xem lại và sắp xếp lại** chính các suggestion mà engine đã tự sinh ra (không phải merchant tự gõ thêm), giải thích tại sao bước 2 không có nút thêm dòng mới. Đây là mâu thuẫn cùng dạng với câu hỏi mở #8 của `search-synonyms-specs.md` (Lark mô tả cơ chế tự động, Figma chỉ cho thấy luồng thao tác thủ công) — KHÔNG tự suy luận bên nào đúng, phải hỏi lại BA trước khi viết test case giả định theo 1 trong 2 khả năng.

## 4. Modal/sub-flow con

### 4.1 Delete suggestion — popup xác nhận

- Tiêu đề: **"Delete suggestion?"**
- Mô tả: **"Deleted suggestion cannot be recovered. Do you still want to continue?"**
- 2 nút: nút nền xám viền ghi **"Delete"**, nút nền cam ghi **"Cancel"**.
- **Xác nhận trực tiếp qua ảnh Figma độ phân giải cao** (2026-11-16): đúng 100% nội dung + màu/nhãn nút như mô tả trên.
- **Toast sau khi xoá**: quan sát được 2 Snackbar mẫu trong page (1 cạnh flow Save, 1 cạnh flow Delete) — CẢ 2 đều hiển thị cùng nội dung **"Success / Saved changes!"**, không có nội dung riêng cho Delete (VD không phải "Suggestion deleted"). `[CẦN XÁC NHẬN BA]` — chưa chắc đây là do Figma dùng lại cùng 1 component demo cho cả 2 vị trí (chưa cập nhật nội dung thật), hay đúng là hệ thống thật sự dùng chung 1 message cho mọi hành động thành công (Save và Delete).

`[CẦN XÁC NHẬN BA]` — **cùng hiện tượng nhãn/màu nút bị đảo ngược đã ghi nhận ở Synonyms** (`search-synonyms-specs.md` mục 4.1): nút cam (theo pattern chung của dự án là hành động chính/xác nhận) lại ghi "Cancel", nút xám lại ghi "Delete". Vì đây là **component "Popups" dùng chung** giữa Synonyms và Suggestion Dictionary (cùng 1 symbol gốc), nhiều khả năng đây là 1 lỗi gốc duy nhất ở component chung chứ không phải 2 lỗi riêng biệt — cần báo 1 lần cho designer, không log thành 2 bug khác nhau.

### 4.2 Edit suggestion

Mở đúng modal 2 bước như Create, load sẵn dữ liệu hiện tại. `[CẦN XÁC NHẬN BA]` — có cảnh báo gì khi Edit (VD "sửa sẽ ảnh hưởng tới gợi ý đang chạy thật") không, Figma không thể hiện state này.

## 5. Validation & giới hạn cụ thể

`[CẦN XÁC NHẬN BA]` toàn bộ mục này — không tìm thấy state lỗi (viền đỏ, chữ đỏ) nào trong Figma cho Suggestion Dictionary, khác hẳn Synonyms (có hẳn state "filled data error" rõ ràng). Có thể do thiết kế chưa làm state lỗi cho feature này, hoặc do phạm vi đọc của phiên này chưa chạm tới đúng frame lỗi. Cần hỏi lại:
- Trigger term có validate trùng không (trùng với 1 suggestion khác đã có)?
- Số lượng trigger term tối đa / số lượng dòng suggestion tối đa?
- Trigger term hoặc suggestion để trống có chặn Next/Save không?

## 6. Câu hỏi mở

| # | Câu hỏi | Phân loại | Mục |
| --- | --- | --- | --- |
| 1 | Danh sách "Do suggestion" ở bước 2 lấy nguồn từ đâu — merchant tự gõ thêm (nhưng không thấy ô input/nút thêm trong ảnh), hay là danh sách cố định được hệ thống đề xuất sẵn (từ lịch sử search, từ sản phẩm khớp) mà merchant chỉ được sắp xếp lại thứ tự/bật tắt? | Loại 2 | 2.2, 3.1 |
| 2 | Toggle "Apply to other search term having this suggestion" có tác dụng gì? Bật lên thì các search term khác (không phải trigger đã khai ở bước 1) có khớp 1 phần với trigger hiện tại sẽ tự được áp cùng danh sách suggestion này? | Loại 2 | 2.2 |
| 3 | ~~2 cột giữa trong bảng danh sách tên chính xác là gì?~~ **Đã đóng** — xác nhận qua ảnh Figma: "When user search" và "Do suggestion". | Loại 2 | 2.1 |
| 4 | Suggestion Dictionary và Synonyms có chia sẻ dữ liệu/cấu hình với nhau không? | Loại 2 | 3.2 |
| 5 | Nhãn/màu nút trong popup Delete bị đảo ngược — xác nhận với designer đây là lỗi chung ở component hay chủ đích | Loại 2 | 4.1 |
| 6 | Bước 1 có xoá được 1 dòng trigger term đã thêm không, thao tác thế nào? | Loại 2 | 3.1 |
| 7 | Validate và giới hạn số lượng cho các field | Loại 2 | 5 |
| 8 | Ô Search ở màn danh sách khớp theo field nào? | Loại 2 | 2.1 |
| 9 | Status OFF ảnh hưởng gì tới shopper thật trên storefront? | Loại 2 | 2.1 |
| 10 | **Quan trọng nhất** — Suggestion Dictionary (màn hình merchant thao tác thủ công, Figma) có quan hệ gì với engine tự động sinh gợi ý mô tả trong Lark (Product data + Search query data + chấm điểm 3 mức UT)? Override thủ công cho riêng trigger term đó, hay chỉ là màn xem/sắp xếp lại chính kết quả engine đã tự sinh? **Xem thêm câu hỏi #12 — đã đọc sâu `instant-search-widget-specs.md`, phát hiện ISW có 1 toggle Data source (Store data/Add manually) RIÊNG cho khối Suggestion, độc lập với Suggestion Dictionary — câu hỏi then chốt giờ là tương tác giữa 2 cơ chế này.** | Loại 2 | 3.3, 2.1 (ISW) |
| 11 | Toggle "Apply to other search term having this suggestion" có phải là cơ chế kích hoạt tính năng "Inferred Queries" (mô tả trong Lark mục Logic hiển thị) cho đúng suggestion đó không, hay là 1 cơ chế khác hoàn toàn? | Loại 2 | 2.2, 3.3 |
| 12 | **Đã đọc kỹ `instant-search-widget-specs.md` (2026-11-16)** — kết luận sơ bộ: khối "Suggestion" trong cấu hình ISW (mục 6 spec đó) là **1 màn hình RIÊNG** (ISW Admin config > tab Suggestion), có cơ chế của chính nó — radio "Data source: Store data (auto, qua engine Autocomplete) / Add manually" (danh sách PHẲNG, không trigger term, không kéo-thả) + "Copy from..." chỉ liệt kê 2 nguồn: "SRP suggestion" và "Search box onclick suggestion" — **KHÔNG nhắc tới "Suggestion Dictionary" ở bất kỳ đâu** trong toàn bộ mục 6 đó. Suy ra đây nhiều khả năng là **2 cơ chế độc lập, không phải cùng 1 thứ**: ISW's Data source toggle kiểm soát TOÀN BỘ khối Suggestion trên widget (bật hẳn sang flat-list tự tay, không phân biệt theo trigger term), còn Suggestion Dictionary là override theo TỪNG trigger term cụ thể. Nhưng điều này làm phát sinh câu hỏi MỚI quan trọng hơn: **khi ISW Data source = "Store data" (auto), danh sách Suggestion Dictionary (nếu có override cho đúng trigger term) có được áp dụng CHỒNG LÊN kết quả tự động hay hoàn toàn không được đọc tới?** Và khi ISW Data source = "Add manually", Suggestion Dictionary còn có tác dụng gì không? Đây là câu hỏi ưu tiên cao nhất hiện tại, gộp luôn tinh thần câu hỏi mở #10. | Loại 2 | 2.1, 3.3 |

**Ưu tiên trả lời gấp nhất (phát hiện từ review-testcase-quality)**: nội dung Feature Tour hứa hẹn merchant có thể "Boost specific suggestions so they appear at the top when customers type in the instant search widget" — nhưng `instant-search-widget-specs.md` mục 6 (khối "Suggestion" riêng trong cấu hình ISW) không hề nhắc tới Suggestion Dictionary ở bất kỳ đâu. Nếu ISW's Data source = "Add manually" ghi đè hoàn toàn khối Suggestion của ISW, lời hứa trên Figma có thể sai với merchant trong 1 số trường hợp cấu hình — đây là khoảng trống rủi ro cao nhất của toàn bộ feature, nên ưu tiên hỏi BA trước các câu hỏi mở khác.

Không có câu hỏi Loại 1 — không liên quan dữ liệu BigCommerce (đối chiếu `docs/sync-fields-glossary.md`: không có mục nào nhắc "suggestion"/"autocomplete"; riêng "Suggestion ranking (point-scoring 3-tier)" đã được liệt kê sẵn trong glossary như ví dụ field "Tính toán từ dữ liệu sync" — khớp đúng với cơ chế chấm điểm vừa đọc được từ Lark).

## 7. Metadata

- **Feature:** Search — Suggestion Dictionary (màn List + modal Create/Edit 2 bước dùng chung component với Synonyms)
- **Nguồn:** Figma `dHTNp9Dd43Sbzy0hNWGMUC`, page `↪ Suggestion Dictionary` (node `1:6`), đọc qua `figma-native` ngày 2026-11-09. Lark `[Spec] Autocomplete Suggestions` đọc qua Chrome extension ngày 2026-11-16 (xem mục 0, 3.3).
- **Không có sticky note nào trong page này.**
- **Số câu hỏi CẦN XÁC NHẬN BA:** 11 ban đầu, đã đóng #3 (tên cột) qua ảnh Figma độ phân giải cao — còn 10 câu mở. Câu #10 là mâu thuẫn/khoảng trống quan trọng nhất (quan hệ engine tự động Lark ↔ màn hình thao tác thủ công Figma) — cùng dạng với câu hỏi mở #8 của `search-synonyms-specs.md`.
- **Liên quan tới spec khác:** `search-synonyms-specs.md` (nghi ngờ chia sẻ dữ liệu mẫu — câu hỏi #4; cùng dạng mâu thuẫn Lark/Figma — câu hỏi #8 ↔ #10); popup Delete dùng chung component với Synonyms (câu hỏi #5).
- **Cấu trúc đề xuất cho test case:** 3 nhóm — (1) Suggestion List + Search, (2) Create/Edit 2 bước (trigger term + reorder suggestion + toggle), (3) Delete
