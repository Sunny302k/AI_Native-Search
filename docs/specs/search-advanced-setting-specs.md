# Advanced Setting (Search) — Specs

## 0. Nguồn gốc tài liệu

Viết từ Figma file "Searching" (fileKey `dHTNp9Dd43Sbzy0hNWGMUC`, page `↪ Advanced Settings`, node gốc `1:4`), đọc trực tiếp qua MCP (tài khoản `hanguyen31.tt@gmail.com`). **Không có link Lark cho feature này** (người dùng không cung cấp).

Lưu ý tên gọi: tiêu đề hiển thị trên UI (và tên page Figma) là **"Advanced Settings"**, trong khi `CLAUDE.md` của dự án liệt kê module Search có mục **"General Setting (Search Relevance weighting)"**. `[CẦN XÁC NHẬN BA]` — đây có phải cùng 1 feature (tên gọi quy ước nội bộ khác với tên hiển thị UI), hay là 2 màn khác nhau? Spec này viết theo đúng những gì đọc được trên Figma (tên "Advanced Settings"), giả định đây chính là feature "General Setting" nói tới trong `CLAUDE.md` vì nội dung tab "Search Relevance" khớp đúng mô tả "Search Relevance weighting".

Page này **có sticky note vàng thật** (2 note trùng nội dung, node `4099:89114` và `4099:100537`) — khác với Synonyms/Suggestion Dictionary/Redirects (chỉ có text-annotation, không có sticky note màu). Trích nguyên văn ở mục 3.

## 1. Tổng quan

Advanced Settings là màn cấu hình các thiết lập nền tảng, chia làm **4 tab**:

1. **Price Settings** — ẩn/hiện giá theo trạng thái đăng nhập + điều chỉnh giá hiển thị.
2. **Search Relevance** — gán trọng số (search weight) cho từng field BigCommerce khi tính relevance search.
3. **Search Customization** — tuỳ biến hành vi search (out-of-stock, spell correction, giới hạn kết quả, ngưỡng ký tự kích hoạt ISW, xử lý variant).
4. **Excluded Product** — loại trừ thủ công 1 số sản phẩm (hoặc 1 số variant cụ thể của sản phẩm) khỏi search.

Cả 4 tab dùng chung 1 nút **Save Settings** (xám `#C5CEE0` khi chưa đổi gì, chuyển cam khi có thay đổi — suy từ pattern nút Save các feature khác trong cùng file, `[CẦN XÁC NHẬN BA]` vì chưa thấy state cam thật của nút này tại Advanced Settings).

## 2. Danh sách field

### 2.1 Tab "Price Settings"

| Field | Loại | Mặc định | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- | --- |
| **Show price only for logged customer** | iOS Toggle | OFF (track xám `#95959B`) | Ẩn giá với khách chưa đăng nhập | Config nội bộ |
| **Product price adjustment (%)** | Number input | **"0.00"** | Mô tả nguyên văn: *"If the prices are missing tax (or do not match the price in your store), you can add a custom percentage to adjust the price. This price is visual only and will not be applied to the price upon checkout. This percentage can be negative."* | Config nội bộ |

`[CẦN XÁC NHẬN BA]` — "Product price adjustment" chỉ ảnh hưởng hiển thị (theo đúng mô tả "visual only"), nghĩa là field này **không** phải Tính toán từ dữ liệu sync theo nghĩa ghi đè giá thật — cần xác nhận lại phạm vi áp dụng (áp dụng ở đâu: SRP, ISW, Category Page?).

### 2.2 Tab "Search Relevance" (tiêu đề hiển thị: "Search Relevance Setup")

Bảng danh sách field BigCommerce + mức độ ưu tiên khi search:

| Cột | Loại | Mô tả |
| --- | --- | --- |
| **Status** | iOS Toggle | Bật/tắt field này có được tính vào search relevance hay không |
| **Searchable fields** | Text | Tên field BigCommerce |
| **Search weight** | Dropdown | Mức trọng số — chỉ hiện khi Status = ON |

Dữ liệu mẫu đọc được (9 field):

| Field | Status mặc định | Search weight mặc định | Nguồn dữ liệu |
| --- | --- | --- | --- |
| Title | ON | High | **Sync trực tiếp** (BigCommerce product.name) |
| Product Category | ON | High | **Sync trực tiếp** (category) |
| Product Options | ON | High | **Sync trực tiếp** |
| Product Type | ON | High | **Sync trực tiếp** |
| SKU | ON | High | **Sync trực tiếp** |
| Tags | ON | High | **Sync trực tiếp** |
| Brand | ON | High | **Sync trực tiếp** |
| Description | **OFF** (không có dropdown weight) | — | **Sync trực tiếp** |
| Metafields | **OFF** (không có dropdown weight) | — | **Sync trực tiếp** |

`[CẦN XÁC NHẬN BA]` — toàn bộ dropdown "Search weight" chỉ đọc được 1 giá trị hiển thị ("High") ở trạng thái đóng; **không tìm thấy state mở dropdown** nên chưa xác nhận được đủ danh sách option (chỉ High, hay còn Medium/Low/Highest...?). Đối chiếu `docs/sync-fields-glossary.md` khi viết test case để xác nhận lại tên field đúng với whitelist sync.

### 2.3 Tab "Search Customization"

| Field | Loại | Mặc định | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- | --- |
| **Out of stock product option** | Dropdown | **"Hide"** | *"Customize display option of out of stock product."* | Config nội bộ |
| **Auto Spell Correction** | iOS Toggle | OFF | *"Search results will be autocorrected and displayed for the corrected query."* | Config nội bộ |
| **Limit Search Results up to 10,000 items** | iOS Toggle | **ON** | *"Limits the search results by products up to 10 000 items to speed up the search."* | Config nội bộ |
| **Treat variant as a product** | iOS Toggle | **ON** | Mô tả hiển thị là **"----"** (placeholder/dấu gạch ngang, chưa có nội dung thật) | Config nội bộ |
| **Entry text number to be queried** | Number input | **"1"** | *"Instant Search Widget will be displayed when search query reaches a specific number."* | Config nội bộ |

`[CẦN XÁC NHẬN BA]`:
- "Out of stock product option" dropdown chỉ đọc được giá trị đóng "Hide" — chưa xác nhận đủ option (VD "Show", "Show with label"...).
- "Treat variant as a product" **chưa có mô tả thật** (hiển thị "----" trên chính Figma) — đây là lỗ hổng spec thật sự (không phải do phạm vi đọc), cần hỏi lại BA ý nghĩa field này (suy đoán: khi bật, mỗi variant được index như 1 sản phẩm độc lập trong search thay vì gộp theo sản phẩm cha — cần xác nhận, không dùng suy đoán này làm căn cứ viết test case).
- "Entry text number to be queried" mặc định "1" — cần xác nhận range hợp lệ (min/max) và hành vi khi nhập 0 hoặc số âm.

### 2.4 Tab "Excluded Product"

| Field | Loại | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- |
| Nút **Edit** | Button outline cam | Bật chế độ chỉnh sửa danh sách (khả năng xoá bớt — xem mục 3) | Config nội bộ |
| Nút **Add new Products** | Button solid cam | Mở flow chọn thêm sản phẩm loại trừ (modal/picker chưa chụp được màn hình, suy đoán từ pattern chung) | Config nội bộ (thao tác) |
| Danh sách **Product Card** | List | Mỗi dòng: ảnh thumbnail + tên sản phẩm + phạm vi loại trừ (xem cột kế) | **Sync trực tiếp** (BigCommerce product) |
| Cột phạm vi loại trừ | Text | 1 trong 3 dạng quan sát được: **"All variants"** (loại cả sản phẩm), **"Custom variants"** (label chung khi chỉ chọn 1 số variant), hoặc **liệt kê trực tiếp tên variant** (VD "Red, Blue, Yellow") | **Sync trực tiếp** (product variant/option values) |
| Icon xoá dòng | Button icon | **Ẩn mặc định (opacity 0)** — suy đoán chỉ hiện khi hover hoặc khi bật chế độ Edit | Config nội bộ |

Toast sau khi thêm sản phẩm: **"Success — Products added!"** (viền trái xanh `#1BAC75`).

`[CẦN XÁC NHẬN BA]`:
- Cột phạm vi loại trừ có 2 cách hiển thị khác nhau cho cùng 1 khái niệm "chỉ loại 1 số variant" (dòng 2 ghi label chung "Custom variants", dòng 3 liệt kê trực tiếp tên variant "Red, Blue, Yellow") — đây là 2 state khác nhau của cùng 1 rule hay là bug hiển thị không nhất quán giữa các bản ghi?
- Nút "Add new Products" mở modal/picker gì (chọn theo tên? theo category? có chọn variant ngay trong bước thêm không) — chưa chụp được màn hình picker trong phạm vi đọc này.
- Nút "Edit" bật chế độ gì cụ thể — xoá hàng loạt, hay sửa phạm vi variant của 1 dòng đã có?
- Sản phẩm **không có variant** thì cột phạm vi hiển thị gì — liên quan trực tiếp tới 2 sticky note ở mục 3.

## 3. Business rule & dependency

### 3.1 Sticky note — rule về việc chọn variant khi loại trừ sản phẩm (trích nguyên văn, node `4099:89114` và `4099:100537`)

> **Note: "Không có variant sẽ không hiện Select"**
> **Note: "Không có variants sẽ không hiển thị gì"**

Diễn giải: khi thêm 1 sản phẩm vào danh sách Excluded Product, nếu sản phẩm đó **không có variant** thì control "Select" (chọn variant cụ thể để loại trừ) **không hiển thị** — khớp với quan sát ở mục 2.4 rằng 1 số dòng chỉ ghi "All variants" (sản phẩm không variant → luôn loại cả sản phẩm, không có lựa chọn khác) trong khi dòng khác liệt kê variant cụ thể (sản phẩm có variant → cho chọn).

2 note gần như trùng nội dung (chỉ khác số ít/nhiều "variant"/"variants") — nhiều khả năng là 2 bản nháp của cùng 1 ghi chú do designer copy sang 2 vị trí khác nhau trong file, không phải 2 rule riêng biệt. `[CẦN XÁC NHẬN BA]` — xác nhận lại với designer đây đúng là 1 rule duy nhất.

### 3.2 4 tab dùng chung 1 nút Save Settings

Mỗi tab có nút Save Settings riêng ở góc trên — `[CẦN XÁC NHẬN BA]` — Save ở 1 tab có lưu luôn thay đổi (nếu có) ở các tab khác đang mở trong cùng phiên không, hay mỗi tab lưu độc lập hoàn toàn (đổi tab mà chưa Save thì mất thay đổi)?

### 3.3 Field nào thuộc nhóm Sync trực tiếp cần loại test case khác

Toàn bộ field ở tab Search Relevance (Title, Product Category, Product Options, Product Type, SKU, Tags, Brand, Description, Metafields) và tab Excluded Product (danh sách Product + variant) đều là **Sync trực tiếp** từ BigCommerce — khi viết test case cần có case phụ thuộc trạng thái/thời điểm sync (VD: sản phẩm bị xoá trên BigCommerce sau khi đã thêm vào Excluded Product thì re-sync xử lý thế nào), không chỉ test thao tác Save trong Admin.

## 4. Modal/sub-flow con

Không có modal nào được chụp đầy đủ trong phạm vi đọc page này (khác các feature khác đã có modal Create/Edit/Delete rõ ràng). Riêng nút "Add new Products" ở tab Excluded Product chắc chắn mở 1 flow chọn sản phẩm (có thể modal hoặc trang riêng) nhưng **chưa xác định được giao diện cụ thể** — `[CẦN XÁC NHẬN BA]`, cần người dùng gửi thêm node-id hoặc screenshot nếu có frame riêng cho flow này.

## 5. Validation & giới hạn cụ thể

| Field | Rule |
| --- | --- |
| Product price adjustment (%) | Cho phép số âm (ghi rõ trong mô tả); `[CẦN XÁC NHẬN BA]` — range min/max, số thập phân tối đa |
| Entry text number to be queried | Mặc định "1"; `[CẦN XÁC NHẬN BA]` — min/max, có chặn 0 hoặc số âm không |
| Search weight (dropdown) | `[CẦN XÁC NHẬN BA]` — danh sách đầy đủ option chưa xác nhận |
| Out of stock product option (dropdown) | `[CẦN XÁC NHẬN BA]` — danh sách đầy đủ option chưa xác nhận |
| Excluded Product — số sản phẩm tối đa được loại trừ | `[CẦN XÁC NHẬN BA]` — không thấy giới hạn trên Figma |

## 6. Câu hỏi mở

| # | Câu hỏi | Phân loại | Mục |
| --- | --- | --- | --- |
| 1 | "Advanced Settings" (tên trên UI/Figma) có đúng là feature "General Setting" nhắc trong CLAUDE.md không? | Loại 2 | 0 |
| 2 | "Treat variant as a product" có ý nghĩa gì — mô tả trên Figma đang để trống ("----") | Loại 2 | 2.3 |
| 3 | Danh sách đầy đủ option của dropdown "Search weight" | Loại 2 | 2.2 |
| 4 | Danh sách đầy đủ option của dropdown "Out of stock product option" | Loại 2 | 2.3 |
| 5 | Save ở 1 tab có ảnh hưởng thay đổi chưa lưu ở tab khác không | Loại 2 | 3.2 |
| 6 | Range hợp lệ của "Product price adjustment (%)" và "Entry text number to be queried" | Loại 2 | 5 |
| 7 | Giao diện flow "Add new Products" (chọn sản phẩm để loại trừ) | Loại 2 | 4 |
| 8 | Nút "Edit" ở Excluded Product bật chế độ gì cụ thể | Loại 2 | 2.4 |
| 9 | Cách hiển thị phạm vi loại trừ variant không nhất quán ("Custom variants" label chung vs liệt kê tên variant cụ thể) — là 2 state khác nhau hay bug | Loại 2 | 2.4 |
| 10 | "Product price adjustment (%)" áp dụng hiển thị ở những màn nào (SRP/ISW/Category Page)? | Loại 2 | 2.1 |
| 11 | Số sản phẩm tối đa trong Excluded Product | Loại 2 | 5 |

Không có câu hỏi Loại 1 — field Sync trực tiếp (Title, SKU, Tags, Brand, Product Category/Options/Type, Metafields, Description, Excluded Product list) đều là field BigCommerce chuẩn, hành vi sync đã có trong `docs/sync-fields-glossary.md`, không cần tra thêm BigCommerce Developer Docs.

## 7. Metadata

- **Feature:** Search — Advanced Settings (4 tab: Price Settings, Search Relevance, Search Customization, Excluded Product), dùng chung 1 màn với Side Menu + nút Save Settings riêng từng tab.
- **Nguồn:** Figma `dHTNp9Dd43Sbzy0hNWGMUC`, page `↪ Advanced Settings` (node `1:4`), đọc qua `figma-native` ngày 2026-11-09. Không có link Lark được cung cấp cho feature này.
- **Có 2 sticky note vàng** (gần như trùng nội dung, mục 3.1) — khác các feature Search khác trong phiên này (chỉ có text-annotation thường).
- **Số câu hỏi CẦN XÁC NHẬN BA:** 11 (toàn bộ Loại 2)
- **Liên quan tới spec khác:** field Sync trực tiếp đối chiếu `docs/sync-fields-glossary.md`; không liên quan trực tiếp tới 4 feature Search khác đã viết trong phiên này (Synonyms/Suggestion Dictionary/Stopwords/Redirects) — không dùng chung component Popups nên không có vấn đề nhãn nút đảo ngược.
- **Cấu trúc đề xuất cho test case:** 4 nhóm theo đúng 4 tab — (1) Price Settings, (2) Search Relevance (từng field × Status × Search weight), (3) Search Customization (5 setting độc lập), (4) Excluded Product (Add/Edit/Delete + rule variant theo mục 3.1).
