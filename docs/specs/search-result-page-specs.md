# Search Result Page (SRP) — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Search Result Page` (415 case, mã SRP-001 → SRP-383, gồm 3 nhóm: BigCommerce data setup, Native Search Admin config, Storefront behavior + integration), kèm 1 khối ghi chú What/Input/Output do QA tự viết ở cuối sheet. Đối chiếu với `instant-search-widget-specs.md` vì SRP và ISW dùng chung nhiều logic (Trending Products, query).

## 1. Tổng quan

**Mục đích**: hiển thị **đầy đủ** kết quả của 1 search query (khác ISW — chỉ preview 1 phần). Cho phép lọc/sắp xếp/phân trang để tìm đúng sản phẩm/category/blog.

**4 khối chính**: Header, Filter, Product results, Category & Blog results.

**Input**: search query (từ search bar/ISW/URL query), sort option, filter selections, paging mode, view mode (Grid/List) × breakpoint (Desktop/Mobile — ảnh hưởng số product/row).

**Output**: danh sách Product/Category/Blog theo query + tổng số kết quả theo từng tab + trạng thái (Có kết quả / Without results / lỗi tải-timeout — trạng thái lỗi này QA tự ghi chú là "ngoài spec nhưng thực tế phải có", tức chưa nằm trong tài liệu chính thức nào).

**3 tab kết quả**: Products, Category, Blog — mỗi tab có count riêng, bị ảnh hưởng khi product/category/blog được thêm/sửa/xoá (qua Sync).

## 2. Dữ liệu test chuẩn (quy ước, không phải spec)

Sheet gốc định nghĩa sẵn bộ dataset dùng chung để test (không lặp lại mô tả ở đây vì đây là dữ liệu chuẩn bị, không phải rule sản phẩm): `BC_DS_TShirt` (≥12 sản phẩm cho test paging), `BC_DS_VARPRICE` (biến thể giá để test sort Price), `BC_DS_DISCOUNT` (test sort Discount + fallback), `BC_DS_LABEL` (test điều kiện hiển thị Sale/Sold out/Pre-order label), `BC_DS_CB` (Category/Blog match), `BC_DS_NORESULT` (query không match gì). Các case SRP-001→012 là bước chuẩn bị dữ liệu ở BigCommerce, không mô tả hành vi SRP.

## 3. Header

### 3.1 Layout & Pagination

| Field | Loại | Giá trị | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- | --- |
| Choose layout | Radio | Grid / List | Config nội bộ | SRP-014→016 |
| Number of products per row | Dropdown | Số cụ thể | Config nội bộ | SRP-017, 018 |
| Enable switching layout | Toggle | Cho phép shopper tự đổi Grid/List ngoài storefront | Config nội bộ | SRP-019, 020 |
| Switching layout label | Text (chỉ hiện khi Enable switching layout = ON) | | Config nội bộ | SRP-021 *(NG→OK)* |
| Switching layout text color / Layout icon color / Selected layout icon color | Color × 3 | | Config nội bộ | SRP-023→025 |
| Pagination type | Radio | Pagination / Show more / Infinite scroll | Config nội bộ | SRP-026→029 *(SRP-026, 027 NG→OK)* |
| Products number per page | Number input | | Config nội bộ | SRP-030, 031 *(2 case SKIP — chưa test, kể cả phần validation rỗng/0/âm/ký tự)* |
| Pagination alignment | Radio icon (chỉ khi Pagination type = Pagination) | Left / Center / Right | Config nội bộ | SRP-032→034 |
| Show product count | Toggle | | Config nội bộ | SRP-035, 036 |
| Product count label | Dropdown (chỉ khi Show product count = ON) | "Showing {{from}}-{{to}} of {{total}} products" / "Showing {{count}} products" | Config nội bộ | SRP-037, 038 |
| Product count position | Radio | Above product list / Below product list | Config nội bộ | SRP-039, 040 |

### 3.2 Page Title & Sections (mở qua nút Edit riêng)

| Field | Loại | Giá trị mặc định | Nguồn |
| --- | --- | --- | --- |
| Page title | Text | `((query_number)) results for "((query_text))"` | SRP-046 |
| Title text color / Query text color | Color × 2 | — tách riêng màu cho phần số/query trong title | SRP-055, 056 |
| Title alignment | Radio | Left/Center/Right | SRP-058→060 |
| Product / Category / Blog section label | Text × 3, có placeholder `{{query_number}}` | | SRP-047, 049→051 *(3 case đang NG)* |
| Section label text color | Color, **áp dụng luôn cho text "Showing ... products"** (không chỉ riêng label) | | SRP-057, SRP-221, SRP-338 |

`[CẦN XÁC NHẬN BA]` — Page title để trống (SRP-053, đang NG) và section label để trống (SRP-054, đang NG): chặn save (validation) hay cho lưu rồi hiển thị rỗng/fallback trên storefront? Case gốc cũng chưa chốt, chỉ ghi "theo rule".

### 3.3 Hành vi trên Storefront

- Placeholder trong Page title/section label được render bằng dữ liệu thực tế (query text, count) — SRP-210, 219, 226.
- Header xử lý ổn định khi thiếu 1 loại kết quả (chỉ có Product, không có Category/Blog) hoặc khi ở trạng thái Without results — ẩn/hiện tab tương ứng, không vỡ layout (SRP-223, 224).
- Load thêm (Show more/Infinite scroll): mỗi lần load **đúng `5 × Number of products per row`** sản phẩm (SRP-182, 185, SRP-330 — rule dùng chung cho cả 2 mode).
- Product count label cập nhật đúng theo trang/lượt load hiện tại, không chỉ tính 1 lần lúc vào trang (SRP-192, 331).

## 4. Filter

### 4.1 Cấu hình (Admin)

| Field | Giá trị | Nguồn |
| --- | --- | --- |
| Filter alignment | Vertical / Horizontal | SRP-070→072 |
| Filter layout on Desktop (khi Vertical) | Stick on left side / Left side - Off canvas / Left side - Collapse-Expand | SRP-073, 075→077 *(3 case NG)* |
| Filter layout on Desktop (khi Horizontal) | One column per filter option / Two columns per filter option / Show all filter options | SRP-074 *(NG)*, 078→080 *(cả 3 NG)* |
| Filter layout on Mobile | Left side - Off canvas / Fullwidth / Expand | SRP-081→084 |
| Show result sorting | Toggle, mặc định **ON** | SRP-086→088 |
| Default sorting (chỉ hiện khi Show result sorting = ON) | 10 option: Relevance, Best selling, Title A-Z, Title Z-A, Price Low-High, Price High-Low, Date Newest-Oldest, Date Oldest-Newest, Discount Highest-Lowest, Review Highest-Lowest | SRP-089→092 *(list option + save đều đang NG)* |

**Danh sách layout desktop đổi hoàn toàn theo Filter alignment** (SRP-346) — 2 nhóm 3 option không dùng chung, chọn Vertical/Horizontal sẽ đổi hẳn tập option hiển thị bên dưới.

### 4.2 Hành vi Storefront

- Mỗi layout Desktop/Mobile tạo cách mở filter khác nhau đúng như tên gọi (Stick/Off canvas/Collapse-Expand cho Vertical; mở panel lớn cho Horizontal) — SRP-229→239, 347, 348.
- Show result sorting OFF → ẩn UI sorting, hành vi sort mặc định của trang vẫn theo rule (không có UI để đổi) — SRP-240, 241, 349.
- Default sorting quyết định thứ tự kết quả **lần đầu** vào trang (SRP-242, 350).
- Apply/Clear all: Apply lọc đúng điều kiện đã chọn (kể cả nhiều nhóm filter cùng lúc — kết quả thoả **đồng thời** tất cả điều kiện, không phải OR); Clear all reset toàn bộ và trả list về trạng thái trước lọc (SRP-244→246, 351).
- Filter panel giữ đúng trạng thái đã chọn sau Apply (chip/UI đánh dấu rõ), và filter còn hoạt động đúng khi kết hợp với pagination/load more/đổi layout Grid-List (SRP-247, 352, 353).
- Filter có thể đưa kết quả về 0 (case SRP-354, 361) — SRP phải xử lý ổn định, chuyển đúng sang trạng thái không có kết quả.
- Sau khi dữ liệu BigCommerce sync thay đổi, **giá trị/option filter (facet)** ngoài storefront cập nhật đúng theo dữ liệu mới (SRP-356) — đây là field loại **Tính toán từ dữ liệu sync** (facet được tính lại từ dữ liệu đã sync, không phải copy nguyên).

## 5. Product List

### 5.1 Appearance & Text

| Field | Loại | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- |
| Product title text color / Product summary text color | Color × 2 | Config nội bộ | SRP-104, 105 |
| Show product SKU/variant | Toggle | Config nội bộ | SRP-106 *(NG)* |
| Default variant (chỉ hiện khi SKU/variant = ON) | Dropdown | Config nội bộ | SRP-107, 108 *(cả 2 NG)* |
| Show product description | Toggle | Config nội bộ | SRP-109 *(NG)* |
| Description text color (chỉ hiện khi description = ON) | Color | Config nội bộ | SRP-110, 111 |

### 5.2 Giá

Cùng bộ 7 giá trị **Price Format** như ISW: First variant price / Lowest price / Lowest available price / From [Lowest price] / From [Lowest available price] / [Lowest price]–[Highest price] / [Lowest available price]–[Highest available price] *(SRP-118→124)*.

| Field | Nguồn |
| --- | --- |
| Show product price | SRP-112 |
| Current price color / Compare price color | SRP-113, 114 |
| Show cards label / Show cards in summary | SRP-115, 116 *(chưa có Tester/Result)* |
| Show compare price | SRP-117 *(NG)* |

`[CẦN XÁC NHẬN BA]` — ISW-029 quy định Show compare price chỉ hiện khi Price Format KHÔNG ở dạng range; sheet SRP không có case nào lặp lại rule dependency này cho Show compare price — cần xác nhận SRP có áp dụng đúng rule tương tự ISW hay là 2 field độc lập nhau.

### 5.3 Ảnh & Hover

| Field | Giá trị | Nguồn |
| --- | --- | --- |
| Show product image | Toggle | SRP-125 |
| Product image radius | Slider, **min = 0px, max = 45px, default = 12px** | SRP-126, 127 |
| Hover effect | None / Change product image / Show button | SRP-128, 129, 264→266 |

### 5.4 Buttons (Add to cart & Quick view)

Cả 2 nút dùng chung pattern field: Toggle bật/tắt → Label → Text color/Background color/Radius → Button position.

| Field | Add to cart | Quick view | Nguồn |
| --- | --- | --- | --- |
| Toggle | Show Add to cart/Select options | Show Quick view button | SRP-130, 135 |
| Field phụ thuộc toggle | Ẩn/disable khi tắt | Ẩn/disable khi tắt | SRP-131, 136 |
| Label + style | ✓ | ✓ | SRP-132 *(NG)*, 133, 137 |
| Position options | Under info / Under image / **Inside image (khi hover)** | Under info / Under image / **Inside image (khi hover)** | SRP-134, 138 |

**Rule dependency**: option vị trí "Inside product image (when hovering)" **chỉ chọn được khi Hover effect = Show button** — nếu Hover effect = None hoặc Change product image thì option này không khả dụng (SRP-139, xác nhận lại ngoài storefront ở SRP-272, 278).

### 5.5 Labels (Sale / Sold out / Pre-order)

| Field | Nguồn |
| --- | --- |
| Toggle Show SALE / SOLD OUT / PRE ORDER label | SRP-140→142 *(cả 3 đang NG)* |
| Text / text color / background color / radius từng label | SRP-143 |
| Vị trí label — chỉ có case xác nhận ở **List view**: Top-left of image / Bottom-left of image / Under product information | SRP-293→295 |

**Điều kiện hiển thị Sale label** (khớp dataset `BC_DS_LABEL` ở mục 2): sản phẩm có `sale_price != null` **HOẶC** có `MSRP != null` (khi sale_price null) **HOẶC** có price list assignment thoả điều kiện sale — 3 điều kiện độc lập, thoả 1 trong 3 là đủ (SRP-203, 279, 370).

`[CẦN XÁC NHẬN BA]` — Vị trí label (top-left/bottom-left/under-info) chỉ được test ở List view (SRP-293→295); Grid view có cùng 3 lựa chọn này không hay chỉ có 1 vị trí cố định? Ngoài ra khi 1 sản phẩm đủ điều kiện hiển thị **nhiều label cùng lúc** (SRP-296), case chỉ yêu cầu "không chồng nhau" — chưa có rule thứ tự ưu tiên label nào hiện trước.

### 5.6 Without result status (trong block Product list)

| Field | Nguồn dữ liệu | Nguồn |
| --- | --- | --- |
| Title + màu title/subtitle | Config nội bộ | SRP-144, 145 |
| Display popular products (toggle) | Tính toán từ dữ liệu sync | SRP-146 |
| Field "source" phụ thuộc toggle popular products | — | SRP-147 *(NG)* |
| Display recently viewed (toggle) | Config nội bộ (phụ thuộc Native Recommender) | SRP-148 |

Logic Trending Products / Recently Viewed **giống hệt ISW** (đã mô tả chi tiết ở `instant-search-widget-specs.md` mục 5) — không lặp lại công thức ở đây. Xác nhận thêm từ khối ghi chú cuối sheet SRP: **"Trending point cao nhưng hết hàng → KHÔNG hiển thị"** — phát biểu rõ ràng hơn cả bên ISW, nên lấy câu này làm rule chính thức cho cả 2 nơi.

## 6. Category & Blog

| Field | Giá trị | Nguồn |
| --- | --- | --- |
| Number of result per page (Category) | Range **5–25** | SRP-154, 156, 158 |
| Number of result per page (Blog) | Range **5–25** | SRP-155, 157, 159 |
| Display category image / Display blogs-pages image | Toggle | SRP-160, 161 |
| Category title text color / Blog title text color | Color | SRP-162, 163 |

**Storefront**: mỗi tab (Category/Blog) hiển thị full result của query, phân trang độc lập với nhau và độc lập với tab Product (đổi trang ở Category không ảnh hưởng trạng thái trang của Blog) — SRP-305→310, 377, 378. Item không có ảnh khi toggle image = ON vẫn phải render ổn định, không vỡ layout (SRP-321, 322) — hành vi fallback cụ thể `[CẦN XÁC NHẬN BA]`.

## 7. Sắp xếp (Sort) — hành vi chi tiết

| Option | Rule | Nguồn |
| --- | --- | --- |
| Relevance | Theo điểm tương đồng (similarity) với query | Khối ghi chú cuối sheet |
| Best selling | **Dùng chung logic với Trending Products** (không phải công thức sort riêng) | SRP-198, 329 |
| Title A-Z / Z-A | Alphabet tăng/giảm | SRP-199 |
| Price Low-High | Sản phẩm nhiều variant: dùng **giá variant CAO NHẤT** làm khoá sort | SRP-200 |
| Price High-Low | *(không có case riêng xác nhận lại rule "variant cao nhất" cho chiều giảm dần)* | SRP-201 |
| Discount Highest-Lowest | Sản phẩm có discount xếp theo % giảm giá; sản phẩm KHÔNG có discount fallback về relevance (không rơi xuống cuối một cách cứng) | SRP-202 |
| Review Highest-Lowest | *(không có case nào trong sheet SRP mô tả rule cụ thể)* | — |

`[CẦN XÁC NHẬN BA]` — 2 điểm: (1) Price High-Low có dùng cùng rule "giá variant cao nhất" như Low-High không, hay đảo theo giá thấp nhất? (2) Review Highest-Lowest dựa trên chỉ số nào (avg rating, số lượng review, hay Wilson score) — sheet SRP không có case nào kiểm chứng.

## 8. Rule liên kết giữa các phần (tổng hợp từ 59 case Integration, mục "Test case ảnh hưởng giữa các luồng")

Phần lớn 59 case SRP-325→383 là case dạng "đảm bảo X không phá vỡ Y" (regression-style) — dưới đây chỉ trích các **rule/công thức thật sự mới**, không liệt kê lại toàn bộ 59 case:

| Rule | Nguồn |
| --- | --- |
| Query và tập kết quả giữa ISW và SRP phải đồng nhất — search cùng keyword ở ISW rồi chuyển sang SRP không được lệch dữ liệu | SRP-327, 374 |
| Trending Products có thể copy chéo giữa ISW ↔ SRP (mục "Without results"); nút copy bị disable nếu nguồn chưa được cấu hình | SRP-328 (khớp ISW mục 5 "Copy from Search Results Page - Trending products") |
| Số lượng item mỗi lần load thêm = `5 × Number of products per row`, áp dụng cả Show more lẫn Infinite scroll | SRP-330 |
| Recently Viewed chỉ có 2 trạng thái hành vi phụ thuộc Native Recommender: đã cài / chưa cài — không có trạng thái thứ 3 | SRP-332, 369 |
| Đổi dữ liệu ở BigCommerce → sync → count trên Header (page title + section label) cập nhật đúng | SRP-341, 381 |
| Đổi label text ở Admin chỉ đổi text hiển thị, không ảnh hưởng logic chuyển tab Product/Category/Blog | SRP-342 |

## 9. Lưu ý về thực thi (không phải spec, chỉ tham khảo)

Case đang **Fail (NG)** tại thời điểm viết spec: SRP-026, 027 (đã fix →OK), SRP-021, 022 (đã fix →OK), SRP-049→051 (section label save), SRP-053, 054 (page title/section label rỗng), SRP-066, 067 (text dài), SRP-069, 074→080 (Filter — nhiều layout desktop/horizontal), SRP-091, 092 (Default sorting option/save), SRP-106→109 (SKU/variant, description), SRP-117 (compare price), SRP-132 (Add to cart label), SRP-140→142 (3 label toggle), SRP-147 (popular products source). Đây là kết quả test thực tế, không dùng làm căn cứ Expected Result mới.

Nhiều case ở nhóm Storefront (SRP-170 trở đi) và toàn bộ nhóm Integration (SRP-325→383) **chưa có Tester/Result** — chưa được thực thi, chỉ mới ở dạng case đã viết.

## 10. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Page title/section label để trống: chặn save hay cho lưu + fallback hiển thị rỗng? | 3.2 |
| 2 | Show compare price ở SRP có áp dụng rule "ẩn khi Price Format dạng range" giống ISW không? | 5.2 |
| 3 | Vị trí label (top-left/bottom-left/under-info) có áp dụng cho Grid view không, hay chỉ List view? Thứ tự ưu tiên khi nhiều label cùng hiển thị? | 5.5 |
| 4 | Item Category/Blog không có ảnh (khi toggle image ON) fallback hiển thị thế nào? | 6 |
| 5 | Price High-Low có dùng cùng rule "giá variant cao nhất" như Low-High không? | 7 |
| 6 | Review Highest-Lowest dựa trên chỉ số nào (avg rating/số lượng review/Wilson score)? | 7 |

## 11. Metadata

- **Feature:** Search — Search Result Page
- **Tài liệu liên quan:** `instant-search-widget-specs.md` (dùng chung logic Trending Products, query)
- **Nguồn:** Sheet test case `Search Result Page` (415 case)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 6
- **Coverage thực thi tại thời điểm viết spec:** ~20 case đang Fail (mục 9); phần lớn case Storefront + toàn bộ 59 case Integration chưa thực thi
