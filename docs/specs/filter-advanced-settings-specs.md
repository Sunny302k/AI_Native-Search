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
| #7 ↔ Merge Values | ✅ **Đã xác nhận với người dùng (2026-09-26)**: chọn 1 merged value trên storefront → URL SEO-friendly ghi **text của merged value** (tên Filter option), không bung ra value con. VD Emerald + Lime → "Greenery" ⇒ `/?Color=Greenery`. Dạng Old/New URL (dùng mã số) chưa rõ → Q14. |
| #4 ↔ Merge Values | Merged value là **1 option trên storefront nhưng gồm nhiều value con** → khi bật Shorten, merged value tính là **1 phần tử** (theo rule text merge ở dòng trên): `/?Color=Greenery,Navy`. Rủi ro còn mở: tên merged do merchant nhập tay (tối đa 255 ký tự) có thể chứa dấu phẩy trùng ký tự phân cách (Q17); link cũ bị ảnh hưởng khi merged value bị tắt Status/xoá/đổi tên (Q15, Q16). |
| #3 ↔ mobile apply model | Drawer mobile có `Clear all` + `Apply` ở đáy → bấm `×` trên chip áp dụng ngay hay chờ `Apply`? → Q8. |

### 3.4. Show smart filter search — Q&A đã chốt với người dùng (2026-09-26)

Nguồn: người dùng trả lời trực tiếp trong phiên làm việc, là quyết định chính thức dùng để viết test case (không phải câu hỏi chờ BA).

| # | Câu hỏi | Trả lời đã chốt |
|---|---|---|
| 1 | Node nào thuộc phạm vi search? | Chỉ node **Display Style = List hoặc Grid**. Swatch, Slider-input, Dropdown (Product options) **không** thuộc phạm vi |
| 2 | Node ngoài phạm vi khi shopper đang gõ? | **Bị ẩn** cùng các value không khớp từ khoá |
| 3 | So khớp theo gì? | **Chỉ tên value**, không khớp theo tên node |
| 4 | Node có value khớp hiển thị thế nào? | Chỉ giữ lại value khớp, **ẩn các value còn lại** trong node |
| 5 | Node trong phạm vi nhưng không có value nào khớp? | **Ẩn cả node** |
| 6 | Không có kết quả nào trên toàn panel? | Hiển thị `No results found for "[keyword]"` |
| 7 | Value đang được chọn nhưng không khớp từ khoá? | **Bị ẩn** |
| 8 | Node đang Collapse mà có value khớp? | **Không tự mở**, nhưng title node vẫn hiển thị |
| 9 | Kết quả search có Show more/phân trang? | **Không** có Show more/phân trang |
| 10 | Quy tắc so khớp? | Cắt khoảng trắng đầu/cuối; **không phân biệt hoa/thường**; **khớp 1 phần** là đủ. **Gõ không dấu khớp value có dấu** (chốt 2026-10-05) |
| 11 | Thời điểm lọc? | **Lọc ngay khi đang gõ**, không cần Enter |
| 12 | Sau khi tick 1 value từ kết quả search, từ khoá giữ hay tự xoá? | **Giữ nguyên** từ khoá, panel vẫn đang lọc (chốt 2026-10-05) |
| 13 | Mobile có ô search? | **Có** — preview Mobile trong design thiếu ô search là thiếu sót thiết kế (đóng Q4) |
| 14 | Ô search chung + `Show search box` riêng của node cùng bật? | **Cả 2 cùng hiện, hoạt động độc lập** |
| 15 | Gõ tên value con có tìm ra merged value? | **Không** — gõ "Emerald" không tìm ra "Greenery" (chỉ khớp text merge) |
| 16 | Swatch đã tắt hiển thị tên có tìm được theo tên? | **Không thuộc phạm vi**: node Swatch bị ẩn khi đang gõ, kể cả khi từ khoá trùng tên value (chốt 2026-10-05, thay câu trả lời trước "tìm ra được" — đã hết mâu thuẫn với #1) |
| 17 | Không còn node nào thuộc phạm vi thì ô search? | **Vẫn hiện**, gõ gì cũng ra `No results found for "[keyword]"` (chốt 2026-10-05) |
| 18 | Bật/tắt toggle xong có cần làm mới Filter Cache? | **Không** — Filter Cache ngoài phạm vi, storefront cập nhật ngay (đóng Q11, 2026-10-05) |

Hệ quả cần lưu khi test: do #7, trong lúc đang có từ khoá, value đã chọn nhưng không khớp chỉ gỡ được qua block Refine by (nếu bật) hoặc sau khi xoá từ khoá.

### 3.5. Hide filter node with only one filter option — Q&A đã chốt với người dùng (2026-10-11)

Nguồn: người dùng trả lời trực tiếp trong phiên làm việc; #2 chốt theo đề xuất đối chiếu Boost Commerce, Algolia, Drupal Facets và mặc định aggregation của Elasticsearch.

| # | Câu hỏi | Trả lời đã chốt |
|---|---|---|
| 1 | Số option tính trên tập sản phẩm nào? | Trên **toàn bộ sản phẩm của trang đang xem, trước khi shopper chọn thêm filter** (Category Page: sản phẩm của category; SRP: sản phẩm khớp từ khoá). Không tính lại khi shopper chọn filter |
| 2 | Option có product count = 0 (khi node bật `Show all irrelevant values`) có được tính? | **Không** — chỉ đếm option có ≥1 sản phẩm. Khi bật cùng `Show all irrelevant values`, rule ẩn node được ưu tiên (VD Used (5), New (0), Refurbished (0) → node bị ẩn) |
| 3 | Node có 0 option? | **Ẩn**, giống node có 1 option |
| 4 | Áp dụng cho loại node nào? | Chỉ node có **danh sách option rời rạc**. Node dạng khoảng (Price, Weight, Height, Width, Sale Percentage) được coi là slider, **không áp dụng** kể cả khi hiển thị List/Grid |
| 5 | Merged value tính mấy option? | **1 option** |
| 6 | Node bị ẩn mà option duy nhất đang được chọn: shopper bỏ chọn bằng cách nào? | Qua **Clear all** hoặc **sửa URL** — là hành vi mong muốn. Desktop khi Refine by tắt không có Clear all (Clear all chỉ nằm trong block Refine by) → chỉ còn sửa URL, người dùng chấp nhận |
| 7 | Có giữ node hiển thị nếu option duy nhất đang được chọn? | **Không**, vẫn ẩn |
| 8 | Tất cả node cùng bị ẩn? | **Ẩn luôn cả khối filter**, không hiện khối rỗng (đóng Q13) |
| 9 | Node bị ẩn có tham gia smart filter search? | **Không** |
| 10 | Link chia sẻ có filter của node đang bị ẩn? | **Vẫn áp dụng**, sản phẩm vẫn được lọc |
| 11 | Node bị ẩn ở Edit filter node? | Vẫn nằm trong Filter Tree với đủ cấu hình; tắt toggle thì hiện lại đúng như cũ |
| 12 | SRP và Category Page | Tính **theo từng trang** (xem #1) |
| 13 | Merchandise Campaign có filter action trỏ tới node đang bị ẩn? | **Không bị ảnh hưởng** — campaign xử lý ở tầng ranking, không phụ thuộc hiển thị filter |
| 14 | Thời điểm ẩn/hiện theo sync | Đổi theo dữ liệu sync mới; trong lúc sync **In Progress** hoặc **Failed** giữ trạng thái của lần sync thành công gần nhất |

Hệ quả cần lưu khi test: do #1, shopper không thể tự làm 1 node co về 1 option bằng cách chọn filter khác. Shopper chỉ bị "kẹt filter" (filter còn áp dụng nhưng node bị ẩn) theo 2 đường: mở link có filter của node đang bị ẩn (#10), hoặc đang chọn 1 option thì lần sync sau làm node co về còn đúng option đó.

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
| Q1 | ~~Advanced Settings áp dụng toàn cục hay riêng từng filter tree?~~ ✅ Đã chốt 2026-10-05: **setting toàn cục** | Đã chốt | 1 |
| Q2 | `Show all irrelevant values` có note nhưng không có toggle trên panel — bị sót khỏi thiết kế, note thừa, hay đang chuyển field này từ per-node lên global? Nếu cả 2 nơi cùng tồn tại thì cái nào thắng? | Note thừa/sót, field vẫn ở per-node | 2, 3.1 |
| Q3 | ~~Field #5: ẩn cả node hay ẩn từng value có count = 1?~~ ✅ Đã chốt 2026-10-05: **ẩn cả node khi node chỉ có 1 option** (khớp label panel và mô tả của Boost Commerce: "filter options with only one value … will not be presented") | Đã chốt | 3.1 |
| Q4 | ~~`Show smart filter search` có áp dụng cho Mobile không?~~ ✅ Đã chốt 2026-09-26: **có ô search trên Mobile** (mục 3.4 #13) | Đã chốt | 3.4 |
| Q5 | ~~Bật Shorten URLs thì URL trước/sau ra sao?~~ ✅ Đã chốt 2026-10-05 theo tham chiếu Boost Commerce (gộp value cùng tham số, ngăn bằng **dấu phẩy**): SEO-friendly `?Color=Grey,Black`; New URL `?Color_3=100,101`. **Còn mở:** Old URL + Shorten ON (Boost không có dạng này) | Đã chốt, trừ Old URL | 3.1, 3.3 |
| Q6 | ~~Tooltip #1 ghi "list/grid option select type" — ý là Display Style hay Option select type?~~ ✅ Đã chốt 2026-09-26: **Display Style = List/Grid**; Swatch/Slider-input/Dropdown không được search (mục 3.4 #1). Còn mở: mâu thuẫn với #16 về swatch ẩn tên | Đã chốt phần chính | 3.4 |
| Q7 | ~~Field #6 đổi nhãn gì thành gì?~~ ✅ Đã chốt 2026-10-05 theo Boost Commerce: khi shopper bấm nút **Refine by** để chọn filter, nhãn nút đổi thành **"Hide filter"** (gợi ý thu gọn panel để xem danh sách sản phẩm) | Đã chốt | 2 |
| Q8 | Trên Mobile (drawer có `Clear all` + `Apply`), bấm `×` trên chip Refine by áp dụng ngay hay chờ bấm `Apply`? | Áp dụng ngay, giống Desktop | 3.3 |
| Q9 | URL SEO-friendly dùng **tên value từ BC** → (a) merchant đổi tên value bên BC thì URL cũ đã share/bookmark/Google index còn chạy không? (b) ~~value đã Merge Values hiển thị tên nào?~~ ✅ đã xác nhận: theo text merge (mục 3.3) (c) ký tự đặc biệt/dấu tiếng Việt/khoảng trắng encode thế nào? (d) 2 node khác nhau có value trùng tên thì sao? | (b) đã chốt; (a)(c)(d) chưa có giả thuyết đủ căn cứ | 3.3 |
| Q10 | Advanced Settings có kế thừa rule khung của Filter Tree không: Save Changes disable khi chưa đổi gì, double-click không tạo request trùng, popup cảnh báo unsaved changes khi Back? | Có kế thừa | 5 |
| Q11 | ~~Storefront cập nhật ngay hay cần clear Filter Cache?~~ ✅ Đã chốt 2026-10-05: **Filter Cache nằm ngoài phạm vi test**, coi như storefront nhận thay đổi ngay sau Save Changes | Đã chốt | 3.3 |
| Q12 | Block `Refine by` khi chưa chọn filter nào thì ẩn hẳn hay hiện rỗng? | Ẩn hẳn | 3.2 |
| Q13 | ~~Nếu bật #5 mà tất cả node đều chỉ còn 1 option → panel filter hiển thị gì?~~ ✅ Đã chốt 2026-10-11: **ẩn luôn cả khối filter** (mục 3.5 #8) | Đã chốt | 3.5 |
| Q14 | Với dạng **Old URL / New URL** (ghi bằng mã số), merged value được ghi bằng mã riêng của merged value, danh sách mã của value con, hay text merge? | Chưa có giả thuyết — rule text merge mới xác nhận cho SEO-friendly | 3.3 |
| Q15 | Khi bật Shorten, nhiều value nằm chung 1 tham số (`Color=Greenery,Navy`). Nếu 1 phần tử không còn hợp lệ (merged value bị tắt Status/xoá/đổi tên) → hệ thống bỏ riêng phần tử đó và giữ `Navy`, hay bỏ cả tham số? | Chưa có giả thuyết đủ căn cứ | 3.3 |
| Q16 | Merged value có tên **trùng 1 value con** (VD "Avocado" = Avocado + Fern) bị tắt Status/xoá → link cũ `Color=Avocado` vẫn chạy nhưng chỉ lọc Avocado gốc (kết quả thu hẹp, không báo gì). Đây có phải hành vi mong muốn? | Suy ra từ rule Status OFF/Delete của Merge Values → value con hiển thị lại riêng lẻ | 3.3 |
| Q17 | Tên merged value có **dấu phẩy** (VD "Green, Olive") khi bật Shorten — hệ thống mã hoá thế nào? | Người dùng (2026-10-05): tên merged value thường không chứa ký tự đặc biệt → **ưu tiên thấp**; chỉ kiểm tra URL mở lại vẫn áp đúng các value, không tách sai | 3.3 |
| Q18 | Merchant đổi URL STRUCTURE (Old ↔ New ↔ SEO-friendly) sau khi store đã chạy: link cũ đã chia sẻ/bookmark/Google index (dạng cũ) có còn áp đúng filter không, hay không còn khớp? | Chưa có giả thuyết đủ căn cứ | 3.3 |
| Q19 | Mục 3.5 #6 cho shopper bỏ filter qua **Clear all**, nhưng #8 **ẩn luôn cả khối filter** khi mọi node bị ẩn (kéo theo block Refine by và Clear all). Khi mọi node bị ẩn mà vẫn đang có filter áp dụng (mở link, hoặc sau sync), block Refine by/Clear all có còn hiển thị không? | Giả thuyết: block Refine by vẫn hiển thị để shopper bỏ được filter (case 98, 99) | 3.5 |
| Q20 | Số option của node tính **trước hay sau** khi áp action Hide/Filter của Merchandise Campaign lên tập sản phẩm của trang? | Giả thuyết: tính sau (case 159) | 3.5 |
| Q21 | Design tự mâu thuẫn: note ghi `Show all irrelevant values` mặc định OFF, nhưng Preview mặc định lại hiện option (0) (VD Mammut red, Refurbished); toggle này cũng không có trên panel (Q2). Mặc định thật là gì? | Chưa có giả thuyết đủ căn cứ | 2, 3.1 |
| Q22 | Node dạng khoảng (Weight, Sale Percentage…) hiển thị List/Grid được tính là **thuộc** phạm vi smart filter search (3.4 #1: theo Display Style List/Grid), nhưng lại bị coi là **slider** khi xét rule ẩn node (3.5 #4). Có chấp nhận phân loại khác nhau giữa 2 rule không? | Chưa có giả thuyết đủ căn cứ | 3.4, 3.5 |
| Q23 | Category Page có subcategory: số option tính cả sản phẩm thuộc subcategory hiển thị trên trang không? Node Category có phân cấp (Same level / All level) đếm option thế nào? | Giả thuyết: tính cả sản phẩm subcategory hiển thị trên trang (case 103, 106) | 3.5 |

## 7. Metadata

- **Feature:** Filter — Advanced Settings (Data Setting), module-level
- **Tài liệu liên quan:** `filter-tree-common-specs.md` (rule khung Save Changes/Preview/unsaved changes), `merge-values-specs.md` (Q9), `docs/sync-fields-glossary.md` (phân loại Nguồn dữ liệu), các spec filter node (field `Show all irrelevant values` per-node, `Show search box on desktop/mobile` per-node)
- **Nguồn:** 1 ảnh design do người dùng cung cấp trực tiếp (không có link Figma, không có sheet test case cũ, không có SPEC PDF cho màn này)
- **Số field:** 7 (6 toggle + 1 dropdown) — 7/7 Config nội bộ, 0 Sync trực tiếp, 0 Tính toán từ dữ liệu sync; nhưng 3 field có đầu ra phụ thuộc dữ liệu đã sync
- **Số rule chéo (dependency):** 7 (bổ sung #4 ↔ Merge Values, 2026-09-26)
- **Số modal/sub-flow con:** 1 (dropdown URL STRUCTURE)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 17 (Q9(b) đã chốt 2026-09-26; bổ sung Q14–Q17 về Merge Values × URL; Q4, Q6 đã chốt 2026-09-26 — xem mục 3.4)
- **Q&A smart filter search (mục 3.4):** 18 điểm — **đã chốt đủ 18/18** (2026-10-05)
- **Cập nhật 2026-10-05:** chốt Q1, Q3, Q4, Q5 (trừ Old URL + Shorten ON), Q6, Q7, Q11; Q17 hạ ưu tiên; thêm Q18 (link cũ khi đổi URL STRUCTURE)
- **Cập nhật 2026-10-11:** thêm mục 3.5 — 14 quyết định của toggle Hide filter node with only one filter option; đóng Q13
- **Review 2026-10-11 (review-testcase-quality):** thêm Q19–Q23 — issue sản phẩm phát hiện khi review test case Hide filter node
