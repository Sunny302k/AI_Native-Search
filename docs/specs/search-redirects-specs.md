# Redirects — Specs

## 0. Nguồn gốc tài liệu

Viết từ Figma file "Searching" (fileKey `dHTNp9Dd43Sbzy0hNWGMUC`, page `↪ Redirects`, node gốc `1:9`), đọc trực tiếp qua MCP (tài khoản `hanguyen31.tt@gmail.com`).

**Cập nhật 2026-11-09**: đã đọc được link Lark `[Spec] Redirects` (https://h4zq094ccpa.sg.larksuite.com/docx/VR0CdRuZhoeekjxrKWSlmGvTgad) qua extension Chrome. Figma (node `1:9`) chỉ có màn **Admin** (Create/Edit/Delete); Lark bổ sung toàn bộ **hành vi Storefront** (ISW) hoàn toàn không có trên Figma — xem mục 1 và 3.5 mới.

Page này **không có sticky note vàng** (giống Synonyms/Suggestion Dictionary), nhưng có **1 text annotation dạng flow label liệt kê rõ 3 rule validate** (node `4071:95384`, trích nguyên văn ở mục 3) — coi annotation này là spec chính thức theo đúng rule "Figma notes = spec". Chỉ có 2 section trong page: "CREATE NEW REDIRECT" và "EDIT / DELETE REDIRECT".

## 1. Tổng quan

Redirect cho phép merchant chủ động trỏ 1 hoặc nhiều từ khoá search cụ thể ("Search term") sang 1 URL đích ("Redirect to") thay vì để search engine tự trả kết quả.

**Cập nhật 2026-11-16 — đã đọc được đầy đủ nội dung card Feature tour** (trước đó chỉ đọc được tiêu đề, đóng câu hỏi mở #11):

- Tiêu đề: **"Use redirect to display relevant recommendations to customers when searching"**
- Bullet mô tả: **"Customers can search for products that are irrelevant to your site or they submit search queries with typos, you can redirect them to specific landing pages to display recommendations that they might be interested in"**
- Kèm 1 ảnh demo minh hoạ 2 cột **"Search for"** (mẫu: `shipping`) → **"Redirect to"** (mẫu: `Shipping Policy`, có icon external-link giữa 2 cột).

Cấu trúc 1 bản ghi redirect: **Search term(s)** (1 hoặc nhiều từ, phân tách bằng dấu phẩy) + **Redirect to** (1 URL đích duy nhất) + **Status** (toggle bật/tắt).

**Theo Lark** (`[Spec] Redirects`), redirect chỉ hoạt động khi **Instant Search Widget (ISW) đang bật**, và trigger chính xác là: shopper gõ query khớp 1 search term đã cấu hình **và bấm Enter** — không phải tự redirect ngay khi gõ xong hay khi chỉ click vào gợi ý. Ví dụ gốc trong Lark: Admin cấu hình keyword `'best selling'` → Redirect URL `facebook.com`; Storefront gõ `'fb'` và Enter → chuyển tới `facebook.com`. `[CẦN XÁC NHẬN BA]` — ví dụ Storefront dùng từ khoá `'fb'` trong khi ví dụ Admin cấu hình `'best selling'`, 2 từ khoá không khớp nhau — nhiều khả năng là lỗi đánh máy/copy ví dụ trong chính tài liệu Lark, cần xác nhận lại ví dụ đúng là gì, không tự suy diễn.

## 2. Danh sách field

### 2.1 Màn "Redirects" (danh sách)

| Field | Loại | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- |
| Nút back ← + tiêu đề | Header | Quay lại màn trước | Config nội bộ |
| Card Feature tour "What is redirect ?" | Panel thu gọn được | Giải thích (mục 1) | Config nội bộ |
| Nút **Create new** | Button | Mở modal "Create new redirect" | Config nội bộ |
| Nút **Export** / **Import** | Button (icon + text) | **Cập nhật 2026-11-16**: xuất hiện cạnh Create new ở 1 số frame List đã đọc lại (trước đó bị bỏ sót hoàn toàn khỏi spec) — cùng pattern đã phát hiện ở Stopwords (xem `search-stopwords-specs.md` mục Export/Import). Chưa thấy state "Coming soon"/disable, có vẻ đang active giống Stopwords. `[CẦN XÁC NHẬN BA]` — hành vi click Export/Import cụ thể (modal nào mở ra, format file gì) chưa có frame/flow riêng để đối chiếu | Config nội bộ |
| Chỉ 1 tab **"Manual Redirects"** | Tab | **Cập nhật 2026-11-16**: xác nhận qua metadata (tìm "AI Redirect"/"Coming soon" đều không có kết quả) — khác Stopwords có 2 tab Manual/AI. Redirects chỉ có đúng 1 tab, không có nhánh AI | Config nội bộ |
| Cột **Status** | iOS Toggle (ON = xanh) + icon dropdown cạnh tên cột | Bật/tắt áp dụng redirect; icon dropdown cạnh header `[CẦN XÁC NHẬN BA]` — suy đoán là control sort/filter theo Status, chưa xác nhận | Config nội bộ |
| Cột **Search terms** | Text | Hiển thị danh sách search term của bản ghi, phân tách bằng dấu phẩy (VD "shipping, shipping policy"); icon kính lúp cạnh header `[CẦN XÁC NHẬN BA]` — nghi là control search/sort theo search term | Config nội bộ |
| Cột **Redirect to** | Text link màu xanh (`#0C75FF`), có thể click | URL đích; icon help "?" cạnh header — khả năng cao là tooltip giải thích, không phải control sort/filter (khác đoán ban đầu) | Config nội bộ |
| Cột **Action** | Icon | 2 icon Edit + Delete | Config nội bộ |
| Pagination | Component | **15 records/page** (annotation gốc, xem mục 3.2 — đã xác nhận đúng số liệu này, đóng câu hỏi mở #7) | Config nội bộ |
| Ô search/filter danh sách | — | **Cập nhật 2026-11-16**: xác nhận lại — vẫn không có 1 ô input search/filter dạng text-box độc lập nào trên màn danh sách (giống kết luận cũ), chỉ có các icon nhỏ cạnh header cột (Status/Search terms/Redirect to, xem các dòng trên) — chưa rõ các icon này có mở ra input ẩn khi click hay không. `[CẦN XÁC NHẬN BA]` — click vào icon kính lúp cạnh "Search terms" có mở ô nhập search ẩn không? | — |
| Empty state | — | **Không tìm thấy state rỗng** trong phạm vi đọc (khác Stopwords có "There are currently no stop word."). `[CẦN XÁC NHẬN BA]` | — |

### 2.2 Modal "Create new redirect"

| Field | Loại | Mặc định | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- | --- |
| Tiêu đề **"Create new redirect"** + icon Close | Header | — | — | — |
| Bảng gồm cột **"Search terms"** (có icon help "?") + **"Redirect to"** + **"Action"** | Header bảng | — | Mỗi dòng 1 cặp input + icon xoá dòng | Config nội bộ |
| Input **Search terms** mỗi dòng | Text input | Trống, placeholder *"Add a search term, separated by commas"* | Nhập 1 hoặc nhiều từ khoá, phân tách phẩy — xác nhận được qua dữ liệu mẫu "shipping, shipping policy" khớp 1 bản ghi | Config nội bộ |
| Input **Redirect to** mỗi dòng | Text input (URL) | Trống, placeholder *"https://example.com"* | URL đích | Config nội bộ |
| Icon xoá dòng (Outline Icon) | Button icon | — | Xoá dòng input đó khỏi modal (chưa lưu) | Config nội bộ |
| Nút **Add more redirect** | Button pill cam nhạt | Thêm 1 dòng cặp input mới | Config nội bộ |
| Nút **Cancel** / **Save Redirects** | Button | Save ở trạng thái **disable (xám `#C5CEE0`)** khi trống hoặc đang có lỗi validate; chuyển **cam `#FF8541`** khi toàn bộ dòng hợp lệ — xác nhận qua 2 screenshot (modal rỗng Save bị disable, modal đã điền nhiều dòng Save chuyển cam) | Cancel đóng không lưu; Save lưu toàn bộ danh sách, thành công hiện toast **"Success / Created redirect!"** | — |

### 2.3 Modal "Edit redirect"

| Field | Loại | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- |
| Tiêu đề **"Edit redirect"** | Header | Khác tiêu đề Create | — |
| Bảng chỉ còn 2 cột **"Search terms"** + **"Redirect to"** | Header bảng | **Không có cột "Action"** | — |
| 1 dòng input duy nhất, load sẵn dữ liệu cũ | Text input ×2 | **Không có icon xoá dòng, không có nút "Add more redirect"** | Config nội bộ |
| Nút **Cancel** / **Save Redirect** (số ít, khác "Save Redirects" số nhiều ở Create) | Button | Lưu thành công hiện toast **"Success / Saved changes!"** (xác nhận qua screenshot List sau khi Edit — khác hẳn text toast của Create "Created redirect!") | — |

**Business rule quan trọng rút ra từ khác biệt Create vs Edit**: Create cho phép tạo **nhiều bản ghi redirect cùng lúc** (nhiều dòng), nhưng Edit **chỉ sửa được đúng 1 bản ghi tại 1 thời điểm** (đúng 1 dòng, không thêm/xoá dòng). `[CẦN XÁC NHẬN BA]` — xác nhận lại đây là chủ đích hay chỉ là thiếu sót chưa làm UI Edit nhiều dòng.

**Lưu ý nguồn**: không tìm thấy 1 frame riêng rẽ chụp đúng modal "Edit redirect" (khác Create — có hẳn nhiều frame Popup riêng); bằng chứng cho mục 2.3 đến từ: (a) 2 annotation flow "Chọn Edit" → "Chọn Save Redirect" (node `4071:97584`, `4071:97586`) xác nhận tên nút số ít, và (b) suy luận logic từ cấu trúc Popup dùng chung component với Create nhưng bị giới hạn 1 dòng theo đúng mô tả annotation. Không có sticky note hay frame riêng mô tả thêm chi tiết UI Edit ngoài 2 điểm này.

## 3. Business rule & dependency

### 3.1 Validate khi Save — 3 loại lỗi khác nhau (trích nguyên văn annotation flow, node `4071:95384`)

> **"Lỗi data đã có sẵn trong list sau khi ấn Save (check trùng cả search terms)"**
> **"Lỗi 'Search term can't have two redirect' sau khi ấn Save"**
> **"Lỗi 'Redirect to is not a valid URL format.' sau khi ấn Save"**

Xác nhận qua 3 state lỗi đọc được trực tiếp trên Figma (đều là lỗi hiển thị **ngay dưới field tương ứng**, viền đỏ `#FF353F` + icon lỗi, không phải popup):

| # | Tình huống | Field hiện lỗi | Message lỗi (nguyên văn) |
| --- | --- | --- | --- |
| 1 | 1 search term đang nhập trùng với search term **đã có sẵn trong list** (đã Save từ trước) | Search terms | **"Redirect already existed!"** |
| 2 | 2 dòng đang nhập trong cùng phiên Create có search term trùng nhau | Search terms (cả 2 dòng trùng đều hiện lỗi) | **"Search term can't have two redirect"** |
| 3 | URL nhập ở "Redirect to" không đúng định dạng URL (VD thiếu `https://`, chỉ nhập `domestic-shipping`) | Redirect to | **"Redirect to is not a valid URL format."** |

Đây là 3 rule validate tách biệt, không dùng chung 1 message — khi viết test case phải tách thành 3 case riêng, không gộp chung "test lỗi nhập liệu". Lưu ý rule #2 áp dụng theo **search term** (không phải theo cặp search term + URL) — 2 dòng cùng search term nhưng khác URL đích vẫn bị chặn, vì 1 search term chỉ được trỏ tới đúng 1 redirect.

`[CẦN XÁC NHẬN BA]` — rule #1 ("Redirect already existed!") so khớp với redirect đã tồn tại dựa trên tiêu chí nào: trùng chính xác search term, hay trùng 1 phần (VD search term mới là tập con/superset của search term cũ, như "shipping" vs "shipping, shipping policy")? Annotation gốc ghi "check trùng cả search terms" (số nhiều) — gợi ý có check theo từng từ tách lẻ trong chuỗi phân tách phẩy, chứ không chỉ so khớp nguyên chuỗi.

### 3.2 Số lượng hiển thị mỗi trang

> **"15 records/page"**

Diễn giải: danh sách Redirects phân trang cố định 15 bản ghi/trang — cùng con số với Stopwords. `[CẦN XÁC NHẬN BA]` — số 15 này có đúng là field cứng dùng chung cho toàn bộ Search module, hay chỉ là số lượng dùng trong ảnh demo?

### 3.3 Redirect to là link có thể click trực tiếp trên danh sách

Cột "Redirect to" ở màn danh sách hiển thị dạng text màu xanh (`#0C75FF`), khác hẳn màu text thường (`#192038`) của cột Search terms — gợi ý đây là 1 hyperlink click được (mở URL đích). `[CẦN XÁC NHẬN BA]` — click vào có mở tab mới không, hay chỉ là style gợi ý link mà không thực sự clickable?

### 3.5 Flow Storefront (ISW) — theo Lark, không có trên Figma Admin

Lark có kèm 1 board flowchart mô tả đúng 5 bước xử lý redirect trên Storefront:

1. **Input Search Query** — shopper gõ query vào ISW.
2. → **Detect redirect** — hệ thống kiểm tra query hiện tại có khớp 1 search term đã cấu hình Redirect không.
3. → **Show redirects hint** — nếu khớp, ISW hiển thị **gợi ý/hint redirect ngay trong lúc gõ** (trước khi bấm Enter) — đây là UI state **hoàn toàn chưa được đọc/xác nhận qua Figma** (Figma mới chỉ có màn Admin, không có frame ISW cho Redirects).
4. → **Click 'Enter'** — shopper bấm Enter.
5. → **Redirect to URL** — trình duyệt điều hướng tới URL đích.

`[CẦN XÁC NHẬN BA]`:
- Nội dung/hình thức chính xác của "Show redirects hint" (dòng chữ gì, vị trí hiển thị trong dropdown ISW, có hiện cùng lúc với các gợi ý suggestion/product thường không)?
- Nếu shopper gõ khớp search term nhưng **không bấm Enter** (VD click ra ngoài, hoặc click vào 1 sản phẩm gợi ý khác trong ISW) thì có bị redirect không, hay bắt buộc phải Enter?
- Redirect có hoạt động trên **Search Result Page (SRP)** khi submit search từ đó không, hay **chỉ áp dụng trong phạm vi ISW** như Lark mô tả ("Khi khách hàng enable tính năng Instant Search Widget...")? Nếu ISW bị tắt (merchant không dùng ISW) thì toàn bộ tính năng Redirect có vô hiệu theo không?

## 4. Modal/sub-flow con

### 4.1 Delete redirect — popup xác nhận

- Tiêu đề: **"Delete redirect?"**
- Mô tả: **"Deleted redirect cannot be recovered. Do you still want to continue?"**
- 2 nút: nút nền xám viền ghi **"Delete"**, nút nền cam ghi **"Cancel"**.

`[CẦN XÁC NHẬN BA]` — **cùng hiện tượng nhãn/màu nút bị đảo ngược đã ghi nhận ở Synonyms, Suggestion Dictionary, Stopwords** (dùng chung 1 component "Popups" trong toàn bộ file Figma này). Đây là lỗi/chủ đích chung của **cả 4 feature**, chỉ cần 1 câu hỏi/1 bug duy nhất gửi designer, không lặp lại riêng từng feature.

### 4.2 Edit redirect

Xem mục 2.3 — chỉ sửa được 1 bản ghi/1 dòng tại 1 thời điểm, không có Add more/xoá dòng như Create.

## 5. Validation & giới hạn cụ thể

| Field/Thao tác | Rule |
| --- | --- |
| Search term trùng với bản ghi đã Save | Chặn — "Redirect already existed!" |
| Search term trùng giữa các dòng đang nhập cùng phiên Create | Chặn — "Search term can't have two redirect" |
| Định dạng Redirect to | Phải là URL hợp lệ (có scheme, VD `https://...`) — "Redirect to is not a valid URL format." |
| Số search term tối đa trong 1 bản ghi (phân tách phẩy) | `[CẦN XÁC NHẬN BA]` — không thấy giới hạn trên Figma |
| Số dòng redirect tối đa thêm cùng lúc khi Create | `[CẦN XÁC NHẬN BA]` — không thấy giới hạn trên Figma |
| Search term/Redirect to để trống | `[CẦN XÁC NHẬN BA]` — chưa thấy state lỗi riêng cho ô trống (Save chỉ quan sát được disable khi trống, chưa rõ message) |
| Số bản ghi/trang | 15 (xem 3.2) |

## 6. Câu hỏi mở

| # | Câu hỏi | Phân loại | Mục |
| --- | --- | --- | --- |
| 1 | Rule "Redirect already existed!" so khớp trùng theo tiêu chí nào (chính xác toàn chuỗi hay từng search term tách lẻ)? | Loại 2 | 3.1 |
| 2 | Edit chỉ sửa được 1 bản ghi/dòng — có đúng là chủ đích, hay thiếu UI Edit nhiều dòng? | Loại 2 | 2.3 |
| 3 | Icon dropdown cạnh "Status" / kính lúp cạnh "Search terms" ở header danh sách dùng để làm gì — có mở ra ô input search/filter ẩn khi click không? | Loại 2 | 2.1 |
| 4 | Click vào "Redirect to" (dạng link xanh) trên danh sách có mở URL không? | Loại 2 | 3.3 |
| 5 | ~~Màn danh sách Redirects có ô search/filter không~~ — đã xác nhận lại 2026-11-16: không có ô input search/filter dạng text-box hiển thị sẵn; chỉ có icon cạnh header (gộp vào câu hỏi #3) | Loại 2 | 2.1 |
| 6 | Empty state (không có redirect nào) hiển thị gì? | Loại 2 | 2.1 |
| ~~7~~ | ~~15 records/page có phải số cố định không~~ — **đã đóng 2026-11-16**: xác nhận đúng annotation gốc "15 records/ page", không phát hiện mâu thuẫn giữa các frame đã đọc lại | — | 3.2 |
| 8 | Nhãn/màu nút popup Delete bị đảo ngược — chung cho cả 4 feature Search, cần xác nhận 1 lần | Loại 2 | 4.1 |
| 9 | Search term/Redirect to để trống khi Save có message lỗi riêng không | Loại 2 | 5 |
| 10 | Giới hạn số search term/dòng tối đa | Loại 2 | 5 |
| ~~11~~ | ~~Nội dung đầy đủ của card Feature tour~~ — **đã đóng 2026-11-16**: đọc được đầy đủ, xem mục 1 | — | 1 |
| 12 | Nội dung/vị trí hiển thị chính xác của "Show redirects hint" trên ISW | Loại 2 | 3.5 |
| 13 | Khớp search term nhưng không bấm Enter (click ra ngoài / click gợi ý khác) có bị redirect không? | Loại 2 | 3.5 |
| 14 | Redirect chỉ áp dụng trong ISW hay cả khi submit search từ SRP? ISW tắt thì Redirect có vô hiệu theo không? | Loại 2 | 3.5 |
| 15 | Ví dụ Storefront trong Lark dùng từ khoá 'fb' không khớp với ví dụ Admin cấu hình 'best selling' — xác nhận lại ví dụ đúng | Loại 2 | 1 |
| 16 | Hành vi click Export / click Import (modal/flow cụ thể, format file) — **mới phát hiện 2026-11-16**, chưa có frame/flow nào mô tả | Loại 2 | 2.1 |
| 17 | Nội dung toast khi Delete thành công — spec chỉ xác nhận toast của Create ("Created redirect!") và Edit ("Saved changes!"), chưa có bằng chứng toast riêng cho Delete — **phát hiện qua review-testcase-quality 2026-11-16** | Loại 2 | 4.1 |

Không có câu hỏi Loại 1 — không liên quan dữ liệu BigCommerce. Còn **15 câu hỏi mở** (đã đóng #7, #11; #5 gộp vào #3; thêm mới #17).

## 7. Metadata

- **Feature:** Search — Redirects (màn List dạng bảng + Export/Import + modal Create nhiều dòng + Edit 1 dòng + Delete; hành vi Storefront ISW theo Lark)
- **Nguồn:** Figma `dHTNp9Dd43Sbzy0hNWGMUC`, page `↪ Redirects` (node `1:9`), đọc qua `figma-native` ngày 2026-11-09, đọc lại/bổ sung ngày 2026-11-16 (Feature Tour đầy đủ, Export/Import, toast Create/Edit, Delete popup, Create modal state rỗng/đã điền). Lark `[Spec] Redirects` đọc qua Chrome extension ngày 2026-11-09 (xem mục 0, 1, 3.5) — bổ sung toàn bộ hành vi Storefront không có trên Figma.
- **Có 1 text annotation liệt kê đủ 3 rule validate** (mục 3.1) đóng vai trò note chính thức — không có sticky note vàng truyền thống nhưng tương đương giá trị thông tin.
- **Số câu hỏi CẦN XÁC NHẬN BA:** 15 (toàn bộ Loại 2; đã đóng #7, #11 ở lần đọc 2026-11-16, #5 gộp vào #3, thêm mới #16 Export/Import, #17 nội dung toast Delete — phát hiện qua review-testcase-quality)
- **Liên quan tới spec khác:** câu hỏi #8 (nhãn nút popup Delete) dùng chung với `search-synonyms-specs.md`, `search-suggestion-dictionary-specs.md`, `search-stopwords-specs.md` mục 4.1 — chỉ cần hỏi designer 1 lần cho cả 4. Export/Import (câu hỏi #16) cùng pattern chưa rõ hành vi như Stopwords mục Export/Import.
- **Cấu trúc đề xuất cho test case:** 5 nhóm — (1) Redirects List + phân trang + Export/Import, (2) Create new (nhiều dòng, 3 loại lỗi validate riêng biệt), (3) Edit (1 dòng, không thêm/xoá), (4) Delete, (5) Impact/Regression (component Popups dùng chung, tương tác với Synonyms/Stopwords/Suggestion Dictionary/Merchandise)
