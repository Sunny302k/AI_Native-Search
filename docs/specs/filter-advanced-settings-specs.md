# Filter — Advanced Settings — Specs

## 0. Nguồn gốc tài liệu

**Không có link Figma.** Người dùng cung cấp trực tiếp 1 ảnh design tổng (5583x3963) gồm 3 vùng: (1) sticky note vàng bên trái, (2) frame màn Admin `Advanced Settings` + Preview, (3) hai khung callout minh hoạ trạng thái Toggle On cho `Show Refine by block` và `Show smart filter search` (kèm preview Desktop và Mobile).

Toàn bộ nội dung dưới đây đọc từ ảnh ở mức zoom cao từng vùng (panel, callout, preview desktop, preview mobile, ảnh chụp URL bên trong note). **Không suy đoán phần không đọc được.**

**Không có sheet test case cũ cho màn này** — khác với các filter node (Brand/Weight/Height/Shipping…) đều viết ngược từ sheet. Đây là spec viết thuần từ design, nên tỷ lệ `[CẦN XÁC NHẬN BA]` cao hơn bình thường.

**Chưa có tài liệu nào trong dự án mô tả màn này**: `filter-tree-common-specs.md` không nhắc tới Advanced Settings (chỉ có 3 màn Filter Tree List → Create/Edit filter tree → Edit filter node).

## 1. Tổng quan

Advanced Settings là màn cấu hình **áp dụng cho toàn bộ block filter trên storefront**, không thuộc riêng 1 filter node nào. Nó điều khiển 3 nhóm việc:

- **Thành phần phụ trợ của panel filter**: ô smart search, block "Refine by", product count.
- **Rule ẩn/hiện node theo dữ liệu**: ẩn node chỉ còn 1 option.
- **Định dạng URL khi filter được áp dụng**: cấu trúc URL + rút gọn URL khi chọn nhiều value.

Cấu trúc màn: header `← Advanced Settings` + nút **Save Changes** (cam), panel trái 1 section duy nhất `ADVANCED SETTINGS`, panel phải là Preview có tab Desktop/Mobile (Desktop active mặc định). **Không có** nút Delete hay Save as template (khác màn Edit filter node).

**Phạm vi áp dụng** `[CẦN XÁC NHẬN BA]` — xem mục 6, câu hỏi Q1. `CLAUDE.md` của dự án xếp *"Advanced Setting (Data Setting)"* ngang hàng với Filter Tree/Node Setup, Filter Cache, Merge Value trong module Filter → **giả thuyết: setting toàn cục cho cả module Filter**, đổi 1 lần ảnh hưởng mọi filter tree. Chưa có bằng chứng trực tiếp trên design (breadcrumb chỉ ghi `← Advanced Settings`, không chỉ ra cha của nó).

## 2. Danh sách field

| # | Field | Kiểu control | Default | Tooltip (?) | Nguồn dữ liệu | Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Show smart filter search | Toggle | **OFF** | Có | Config nội bộ | Kết quả hiển thị phụ thuộc tập value đã sync |
| 2 | Show product count | Toggle | **ON** | Không | Config nội bộ | Con số hiển thị = **Tính toán từ dữ liệu sync** (xem mục 3.2) |
| 3 | Show Refine by block | Toggle | **OFF** | Có | Config nội bộ | Nội dung chip lấy Node title (config) + tên value (sync) |
| 4 | Shorten URLs when selecting multiple filter options | Toggle | **OFF** | Không | Config nội bộ | Chuỗi URL sinh ra chứa tên/id value từ dữ liệu sync |
| 5 | Hide filter node with only one filter option | Toggle | **OFF** | Không | Config nội bộ | Điều kiện kích hoạt = **Tính toán từ dữ liệu sync** (số option còn lại của node) |
| 6 | Change label of Refine By button on mobile when tapping on it | Toggle | **OFF** | Không | Config nội bộ | Không có note/frame mô tả — xem Q7 |
| 7 | URL STRUCTURE | Dropdown | `SEO-friendly URL: /?Color=Grey` | Không | Config nội bộ | Dạng SEO-friendly nhúng **tên node + tên value từ dữ liệu sync** vào URL |

**Phân nhóm Nguồn dữ liệu**: 7/7 field là **Config nội bộ** (toggle/dropdown lưu bằng Save Changes, không phải field sync). **Không có field nào là Sync trực tiếp.** Tuy nhiên field #2, #5, #7 (và một phần #1, #3, #4) có **kết quả đầu ra phụ thuộc dữ liệu đã sync** — đây là lý do vẫn cần `create-sync-testcase`, xem mục 3.2.

**Field xuất hiện trong note nhưng KHÔNG có trên panel**: `Show all irrelevant values (product count = 0)` — xem Q2.

## 3. Business rule & dependency

### 3.1. Rule trích nguyên văn từ sticky note

> **Show all irrelevant values (product count = 0)**
> - Mặc định Toggle off
> - Toggle on: hiển thị filter option có product count = 0

Diễn giải: OFF → ẩn value không có sản phẩm nào; ON → vẫn hiện kèm `(0)`. **Vấn đề**: toggle này **không tồn tại trên panel Advanced Settings** (đã soi toàn bộ 6 toggle). Trong dự án, field cùng tên đang nằm ở **Appearance settings của từng node** (xác nhận có ở Condition/Brand/Product options; xác nhận KHÔNG có ở Category/Featured Products/Review Ratings). → Q2.

> **Shorten URL when selecting multiple filter option values**
> When multiple filter values are selected, long-form URLs can be untidy to your customers. This setting helps you reduce the length and complexity of those URLs to let search engines know what your page is about.

Kèm ảnh chụp 2 thanh địa chỉ trình duyệt:
- Trước: `https://boost-commerce-team.myshopify.com/collections/all?pf_opt_size=M&pf_opt_size=XS`
- Sau: `https://boost-commerce-team.myshopify.com/collections/all?size=M,XS`

Diễn giải: ON → gộp nhiều value của cùng 1 param thành 1 param với danh sách ngăn bởi dấu phẩy (và trong ví dụ còn bỏ prefix `pf_opt_`). ⚠️ **Ảnh minh hoạ lấy từ sản phẩm khác, nền tảng khác** (`myshopify.com` = Boost Commerce bản Shopify), param `pf_opt_size` là format Shopify, KHÔNG phải format Native Search trên BigCommerce (format của Native Search theo note URL STRUCTURE là `filter[Color_3][]` / `Color_3` / `Color`). → Q5.

> **Hide filter options with only one filter option value**
> - Toggle on: ẩn tất cả filter option có product count = 1

Diễn giải: **note và label trên panel nói 2 việc khác nhau** — đây là mâu thuẫn nặng nhất của màn này:

| Nguồn | Nội dung | Nghĩa |
|---|---|---|
| Label panel | "Hide filter **node** with only one filter **option**" | Ẩn **cả node** nếu node chỉ còn 1 option |
| Tiêu đề note | "Hide filter **options** with only one filter option **value**" | Mơ hồ |
| Bullet note | "ẩn tất cả filter option có **product count = 1**" | Ẩn từng **value** có count = 1 |

Đối chiếu data mẫu trong chính Preview của design: `Aura (1)`, `Marine (1)`, `Used (1)`, `New (1)`, `Is Featured (1)`, `Not Featured (1)` — đều count = 1. Nếu theo bullet note, bật toggle sẽ xoá gần sạch panel → **giả thuyết: label panel đúng, bullet note viết sai**. → Q3.

> **URL STRUCTURE**
> - Old URL: `/?filter[Color_3][]=100`
> - New URL: `/?Color_3=100`
> - SEO-friendly URL: `/?Color=Grey`

Diễn giải: 3 dạng mã hoá query string. Old/New dùng **id nội bộ** (`Color_3`, `100`); SEO-friendly dùng **tên thật** của node và value.

### 3.2. Rule đọc từ 2 khung callout "Toggle On"

**Show Refine by block = ON** (tooltip: *"Shows the filters you've chosen. You can change or remove them here."*):
- Chèn block lên **đầu panel filter**, gồm dòng `Refine by` + link `Clear all`.
- Mỗi value đang chọn = **1 chip riêng**, format `{Node title}: {value}` (phần value in đậm) + nút `×`. Chọn 2 value cùng 1 node → 2 chip riêng (`Color: Aura`, `Color: Black`), **không gộp**.
- Node dạng range → **1 chip duy nhất**: `Price: $500 – $1000`.
- Xuất hiện trên **cả Desktop lẫn Mobile** (drawer mobile trong design có block này).
- Value đang chọn hiển thị checkbox **màu cam** trong node tương ứng.

**Show smart filter search = ON** (tooltip: *"Applied to filter nodes having list/grid option select type"*):
- Chèn **1 ô search duy nhất ở đầu toàn bộ panel**, placeholder `Search ....`, nằm **trên** cả block Refine by — KHÔNG phải ô search bên trong từng node.
- ⚠️ Preview **Mobile trong chính khung này KHÔNG có ô search** (chỉ Desktop có). → Q4.
- ⚠️ Tooltip dùng sai thuật ngữ: List/Grid là **Display Style**, còn *Option select type* là Single/Multiple. → Q6.

### 3.3. Dependency chéo cần lưu khi test

| Quan hệ | Mô tả |
|---|---|
| #2 ↔ #5, ↔ "irrelevant values" | Tắt `Show product count` chỉ **giấu con số**, không tắt logic tính count. Rule ẩn node/value dựa trên count vẫn chạy trên dữ liệu thật. |
| #1 ↔ per-node `Show search box on desktop/mobile` | 2 ô search ở 2 tầng khác nhau (global vs trong node), có thể cùng bật. |
| #3 ↔ Node title | Chip lấy **Node title** do merchant tự đặt ở General Settings của node → đổi title node thì chip đổi chữ. |
| #4 ↔ #7 | Cả hai cùng viết lại URL; tổ hợp 3 dạng × 2 trạng thái = 6 kết quả, design chỉ nêu ví dụ rời rạc cho từng cái. → Q5. |
| #7 ↔ Merge Values | Value đã merge xuất hiện trong URL SEO-friendly bằng tên gốc hay tên merged? → Q9. |
| #3 ↔ mobile apply model | Drawer mobile có `Clear all` + `Apply` ở đáy → bấm `×` trên chip áp dụng ngay hay chờ `Apply`? → Q8. |

## 4. Modal / sub-flow con

**Dropdown URL STRUCTURE** — sub-flow duy nhất của màn này.

| Thuộc tính | Nội dung |
|---|---|
| Trigger mở | Click vào dòng `SEO-friendly URL: /?Color=Grey` (có icon chevron ⌄ bên phải) |
| Hiển thị khi đóng | Nhãn dạng (chữ xám) + URL mẫu tương ứng (chữ đậm) |
| Giá trị | 3 giá trị theo note: Old URL / New URL / SEO-friendly URL `[CẦN XÁC NHẬN BA]` — design không mở dropdown nên không xác nhận được đủ 3 và không thấy nhãn chính xác trong list |
| Giá trị đang chọn trong design | SEO-friendly URL |
| Default thật | `[CẦN XÁC NHẬN BA]` — không rõ SEO-friendly là default hệ thống hay chỉ là giá trị được chọn để minh hoạ |

Không có modal nào khác. Các toggle đều là thao tác tại chỗ, không mở popup.

## 5. Validation & giới hạn cụ thể

Design **không nêu** bất kỳ threshold/range/validation nào cho màn này (khác các màn filter node có "max 255 ký tự", "Amount of slider steps ≥ 1"…). Cụ thể chưa có:

- Không có field nhập liệu tự do → không có validation độ dài/ký tự.
- Không có rule bắt buộc bật tối thiểu 1 toggle.
- Không có điều kiện disable/ẩn toggle này theo toggle khác (6 toggle độc lập trên UI).
- `Save Changes` trong design hiển thị dạng **enable sẵn**, trong khi khung chung Filter Tree quy định *"disable khi chưa có thay đổi; double-click không tạo request trùng"* (FTNS_030/031, FTNS_431→434). → Q10.

## 6. Câu hỏi mở

Tất cả đều là **Loại 2** (Native Search tự chọn hành vi, không phải BC platform fact) → giữ `[CẦN XÁC NHẬN BA]`, không tra BC Docs. Riêng Q5 có phần liên quan format URL của chính sản phẩm, cũng là Loại 2.

| # | Câu hỏi | Giả thuyết hiện tại | Mục |
|---|---|---|---|
| Q1 | Advanced Settings áp dụng **toàn cục cho module Filter** hay **riêng từng filter tree**? | Toàn cục (theo cách `CLAUDE.md` phân loại "Data Setting") | 1 |
| Q2 | `Show all irrelevant values` có note nhưng không có toggle trên panel — bị sót khỏi thiết kế, note thừa, hay đang chuyển field này từ per-node lên global? Nếu cả 2 nơi cùng tồn tại thì cái nào thắng? | Note thừa/sót, field vẫn ở per-node | 2, 3.1 |
| Q3 | Field #5: ẩn **cả node khi node chỉ có 1 option** (label panel) hay ẩn **từng value có product count = 1** (bullet note)? | Label panel đúng | 3.1 |
| Q4 | `Show smart filter search` có áp dụng cho Mobile không? Preview Mobile trong chính khung Toggle On không có ô search. | Desktop-only, hoặc thiếu sót thiết kế | 3.2 |
| Q5 | Với Native Search/BigCommerce, bật `Shorten URLs` thì URL trước/sau chính xác ra sao (dấu phân cách là gì, có bỏ prefix không)? Ảnh minh hoạ đang là URL Shopify của sản phẩm khác. Và tổ hợp với 3 dạng URL STRUCTURE cho ra 6 kết quả thế nào? | Gộp value bằng dấu phẩy, giữ nguyên tên param theo dạng URL đang chọn | 3.1, 3.3 |
| Q6 | Tooltip #1 ghi "list/grid **option select type**" — ý là Display Style = List/Grid, hay đúng là Option select type? Node dạng slider (Price)/Swatch/Toggle có được search không? | Ý là Display Style; node slider không search được | 3.2 |
| Q7 | Field #6 đổi nhãn gì thành gì, đổi ở đâu (header drawer hay chính nút Refine By), trigger cụ thể là "tapping on it" nghĩa là gì? | ON → header drawer đổi từ `Filter` sang `Refine By` cho khớp nút vừa tap | 2 |
| Q8 | Trên Mobile (drawer có `Clear all` + `Apply`), bấm `×` trên chip Refine by áp dụng ngay hay chờ bấm `Apply`? | Áp dụng ngay, giống Desktop | 3.3 |
| Q9 | URL SEO-friendly dùng **tên value từ BC** → (a) merchant đổi tên value bên BC thì URL cũ đã share/bookmark/Google index còn chạy không? (b) value đã Merge Values hiển thị tên nào? (c) ký tự đặc biệt/dấu tiếng Việt/khoảng trắng encode thế nào? (d) 2 node khác nhau có value trùng tên thì sao? | Chưa có giả thuyết đủ căn cứ | 3.3 |
| Q10 | Advanced Settings có kế thừa rule khung của Filter Tree không: Save Changes disable khi chưa đổi gì, double-click không tạo request trùng, popup cảnh báo unsaved changes khi Back? | Có kế thừa | 5 |
| Q11 | Đổi Advanced Settings xong, storefront cập nhật ngay hay cần clear **Filter Cache**? | Cần đối chiếu với feature Filter Cache | 3.3 |
| Q12 | Block `Refine by` khi chưa chọn filter nào thì ẩn hẳn hay hiện rỗng? | Ẩn hẳn | 3.2 |
| Q13 | Nếu bật #5 mà **tất cả node** đều chỉ còn 1 option → panel filter hiển thị gì (ẩn hẳn khối filter, hay hiện khối rỗng)? | Chưa có giả thuyết đủ căn cứ | 3.3 |

## 7. Metadata

- **Feature:** Filter — Advanced Settings (Data Setting), module-level
- **Tài liệu liên quan:** `filter-tree-common-specs.md` (rule khung Save Changes/Preview/unsaved changes), `merge-values-specs.md` (Q9), `docs/sync-fields-glossary.md` (phân loại Nguồn dữ liệu), các spec filter node (field `Show all irrelevant values` per-node, `Show search box on desktop/mobile` per-node)
- **Nguồn:** 1 ảnh design do người dùng cung cấp trực tiếp (không có link Figma, không có sheet test case cũ, không có SPEC PDF cho màn này)
- **Số field:** 7 (6 toggle + 1 dropdown) — 7/7 Config nội bộ, 0 Sync trực tiếp, 0 Tính toán từ dữ liệu sync; nhưng 3 field có đầu ra phụ thuộc dữ liệu đã sync
- **Số rule chéo (dependency):** 6
- **Số modal/sub-flow con:** 1 (dropdown URL STRUCTURE)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 13
