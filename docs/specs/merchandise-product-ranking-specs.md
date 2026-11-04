# Merchandise — Manage product ranking, Setup base score, menu (Figma sections 2.1 và 2.2) — Spec

> **Nguồn và độ tin cậy.** Đọc từ Figma Merchandise (`fcjg1GDcLIl5HVdRFN4qhF`, trang Design) ngày 2026-11-04: frame Note (`618:16817`), section 2.1 "Manage product ranking" (`1057:10676`), section 2.2 "Setup base score" (`1867:32991`) và menu Merchandising (`4231:35234`). Spec PDF `[Spec] Merchandise` chưa có trong repo. Đối chiếu với `checklists/merchandise/merchandise-setup-base-score-design-issues.md` (23 câu hỏi Q1 đến Q23) ở mục 7 của phần dưới. Figma MCP bị giới hạn tốc độ nên một số frame chỉ có metadata; ghi rõ ở mục 1.

## 0. Tổng quan hợp nhất

**Mục đích.** Cho merchant xem và chỉnh điểm xếp hạng sản phẩm. **Product ranking score** quyết định thứ tự sản phẩm trên category page và search result page, từ các thành phần: **Base score** (merchant chỉnh trực tiếp, khoảng -999 đến 999), **Merchandise score** (điểm tạm thời từ campaign, tự về 0 khi campaign kết thúc) và **Self-learning score** (tự cộng theo hành vi khách hàng).

**Cấu trúc.** Menu Merchandising có 3 thẻ "Setup Now": Manage product ranking (2.1), Setup base score (2.2), Manage merchandise campaign (2.3, xem `merchandise-campaign-specs.md`). Hai màn 2.1 và 2.2 cùng tồn tại. Cách chỉnh điểm có 2 đường: sửa từng sản phẩm (popup Edit Base Score) hoặc Bulk edit (2 bước: chọn sản phẩm theo condition hoặc All products, rồi chỉnh điểm bằng mode Increase/Decrease hoặc "Set to a fixed base score").

**Điểm nổi bật.**
1. **Công thức điểm mâu thuẫn trong Figma:** bảng 2.1 chỉ khớp 0,5×Base + 0,2×Self-learning (merchandise không cộng vào), đúng note 618:16819; popup View details lại cộng merchandise của campaign đang chọn (499,50 + 333,00 − 199,99 = 632,51); tooltip và feature tour ghi 30/50/20; 333,00 không khớp 30%×999 = 299,7. Xác nhận ngày 2026-10-25 (ranking = Base + Merchandise, Self-learning chưa triển khai) vẫn chưa chốt cách kết hợp.
2. **Bộ condition của Bulk edit:** Figma có 14 thuộc tính (Brand, Conditions, Featured products, Free shipping, Inventory status, Modifier Options, Price, Product Category, Product Options, Product Title, Product Type, Purchasability, Review Ratings, Weight), không có Custom Fields (Q11). Danh sách chi tiết options và toán tử ở mục 3 phần dưới, một số suy từ các frame con vì không có frame hiển thị dropdown "Select condition".
3. **Bulk edit bước 2** chỉ có Cancel và Save, không có Back (Q12); kẹp biên -999 và 999; mode fixed không có cột NEW.
4. **Filter của 2.1** là checkbox 4 mục (All products, Featured products, Free Shipping, Out Of Stock), không dùng bộ 14 condition.
5. Frame "Popup/ Add filter node" (2758:38664, 2662:59174) thực chất là popup Edit Base Score (đặt tên frame sai).

## Chi tiết theo skill extract-figma-spec (vùng E)
File Figma `fcjg1GDcLIl5HVdRFN4qhF` (Merchandise). Đọc ngày 2026-11-04 qua Figma MCP (screenshot + metadata XML cục bộ). Chỉ ghi điều có căn cứ trên Figma; chỗ không rõ gắn `[CẦN XÁC NHẬN BA]` kèm giả thuyết.

### 1. Phạm vi đã đọc

Đã mở/chụp (screenshot + text node từ metadata):

| node-id | Tên frame | Ghi chú |
|---|---|---|
| 618:16817 | Note | 1 frame vàng chứa 5 note (text nodes 618:16819, 1057:10677, 618:16820, 706:6663, 715:6671) |
| 4231:35234 | [✅ 1] Merchandise Main Menu | 3 thẻ Setup Now |
| 2067:168396 | Manage product ranking | màn + Snackbar |
| 2644:62822 | Product ranking score | màn đầy đủ 10 dòng, feature tour |
| 801:10568 | View details | overlay + popup "Edit 14" (3169:40557); đọc text, chụp qua 1033:9660 |
| 1033:9660 | Product ranking score - View details | |
| 3763:35098 | ... - View details - No merchandise campaign | |
| 1041:8552 | ... - View details - Edit base score | |
| 1871:34700 | scroll (popup View details, cuộn xuống Self-learning journey) | |
| 2067:169173 | dropdown-campaign | dòng bảng mở rộng campaign |
| 990:13990 | note "Show campaign A → hide others" | |
| 2146:110226 | Base score (khối base score + Edit) | |
| 3763:34775/34777/34779 | 3 Tooltips (Base / Self-learning / Merchandise) | |
| 1867:30388 | popup bulk – Step 1, 0 sản phẩm, Specific products | symbol |
| 2067:156326 | popup bulk – Step 1, Specific products, condition Brand, 60 products | |
| 1850:34015 | popup bulk – Step 1, All products, 1.293 products | |
| 1855:32228 | popup bulk – Step 2, Increase/Decrease (chưa kéo) | |
| 1855:35191 | popup bulk – Step 2, Increase 500 | |
| 1855:35721 | popup bulk – Step 2, Decrease -500 | |
| 1855:33226 | popup bulk – Step 2, Set to a fixed base score | |
| 2047:49882 / 2067:168469 / 2067:168488 / 2067:168507 | sort header 2.1: Product name / Merchandise score / Base score / Self-learning score (đọc text; chụp dropdown qua 2047:49886, 2067:168473) | |
| 2058:65386 … 2065:60668 | 18 frame "condition" + 13 "dropdown menu/ sm" (liệt kê ở mục 3.3) | |
| 1937:44714 | Setup base score (2.2) | |
| 1822:41346 | Table row/ View (biến thể dòng có ô input inline) | |
| 2662:59380 / 2758:38664 | popup "Edit Base Score" (tên frame ghi nhầm "Popup/ Add filter node") | |
| 2067:169426 | dropdown của nút Filter 2.1 | |

KHÔNG đọc được / không chụp:
- Nội dung bên trong các `instance` (header, Side Menu, Snackbar, Button, Divider, `.popup/ header`...) không có trong metadata; chỉ thấy qua ảnh. Chưa chụp riêng: dropdown "Select condition" (danh sách thuộc tính) — không có frame nào hiển thị danh sách này.
- Chưa chụp: 2067:168417 / 2067:168454 / 2067:168416 (dropdown sort của 2.2; chỉ chụp 2067:168416 = Highest–Lowest / Lowest–Highest cho Stock; Product name 2.2 có chiều cao 176 giống 2047:49886 nên suy ra 4 option, không xác nhận bằng ảnh), frame 2062:59917 và 2062:59923 mới chụp dropdown (không chụp frame condition của Product options), frame 2058:92846, 2058:92352, 2058:92420, 2058:92488, 2062:60659, 2062:60668, 2065:60080, 2065:60151, 2065:60223 (chỉ suy từ nhãn text và dropdown liền kề).
- Không đọc được prototype/connector (mũi tên điều hướng) — mọi "cách mở" dưới đây suy từ nhãn/annotation, không từ prototype link.
- Section 2.3 (campaign) ngoài vùng.

### 2. Bảng màn / popup / state

| Tên | node-id | Cách mở | Thành phần UI | Save / Cancel / đóng |
|---|---|---|---|---|
| Merchandising (menu chính) | 4231:35234 | Sidebar "Merchandising" (item đang active) | Tiêu đề "Merchandising"; banner cam có nút X: "Control how products rank in search and category pages with customizable scoring." + "Your products' rankings in search results and category pages are now in your hands!. Learn more about how to merchandise." (link gạch chân "how to merchandise"); section "Merchandise Setup" với 3 thẻ (mục 2.1b) | Banner đóng bằng X (không rõ nhớ trạng thái đã đóng — chưa nói) |
| Thẻ 1 "Manage product ranking" | 4231:35234 | Nút "Setup Now" | Hình minh hoạ bảng Rank/Product/Merchandise/Base/Self-learning/Product ranking score; mô tả "View all scoring components of each product and see how they combine into the final ranking score." | Mở màn 2.1 (suy từ tên thẻ) |
| Thẻ 2 "Setup base score" | 4231:35234 | Nút "Setup Now" | Hình minh hoạ ô số "Score range (-999) to 999"; mô tả "Define base scores for products to establish their standard ranking position." | Mở màn 2.2 (suy từ tên thẻ) |
| Thẻ 3 "Manage merchandise campaign" | 4231:35234 | Nút "Setup Now" | Hình Trigger → Condition/Action; mô tả "Customize product rankings across pages with targeted campaigns." | Mở 2.3 (ngoài vùng) |
| Manage product ranking | 2644:62822 / 2067:168396 | Thẻ 1 menu; nút ← ở header quay lại | Header "Manage product ranking" + nút ←; khối **Feature tour** "What is product ranking score?" (nhãn FEATURE TOUR, chevron ^ thu gọn; trong state này 1/2 — có phân trang tour 1/2 ở metadata `1/2`); tiêu đề "Product ranking score"; nút cam "Bulk edit base score"; nút "Filter"; ô search "Search product by name, description, SKU…"; bảng; phân trang | Snackbar (2067:168397) chồng góc phải trên: "Success / Base scores have been edited." + nút X |
| Bảng Product ranking score | 2644:62822 | — | Nhóm cột "Product details": Rank, Product name (ảnh, tên cắt …, "$3.643 \| Stock: 12" hoặc "$643 - $789 \| Stock: 12"); nhóm "Score composition": Merchandise score (có chevron mở rộng ở mỗi dòng), Base score, Self-learning score; cột nền xanh nhạt "Product ranking score"; cột "Action" nút "View". Cột Merchandise/Base/Self-learning/Product name có icon sort ▾ | Sort dropdown: xem 2.1c. Phân trang Prev 1 2 3 4 … 8 Next, mẫu 10 dòng/trang |
| Dòng mở rộng campaign | 2067:169173 | Bấm chevron ở cột Merchandise score | Dòng gốc: tên campaign + thời gian "Jun 19, 2025 - Jun 26, 2025" + điểm ±; hàng con: "Promote new iPhone launch" + "Ends: Mar 05, 2025" + điểm (có dấu +/− và icon tag tím); cuối: "+5 more" | Chevron ^ khi mở |
| Filter dropdown (2.1) | 2067:169426 | Nút Filter | Checkbox list: All products (mặc định tích, in đậm), Featured products, Free Shipping, Out Of Stock | Không thấy nút Apply/Clear |
| Product ranking score - View details | 1033:9660, 801:10568 | Nút "View" từng dòng (text annotation "View" 734:22928) | Header "View details" + X; thanh sản phẩm: ảnh, tên, "Rank: #2.234", "Price: $643 - $789", "Stock: 12.352"; "Product ranking score breakdown": thẻ trái Base score (50%) ⓘ + giá trị + nút "Edit"; Self-learning score (20%) ⓘ + giá trị; Merchandise score (30%) ⓘ + danh sách campaign mỗi dòng có icon mắt (eye / eye-off), tên, thời gian; biểu đồ donut (tâm: "Product ranking score" + tổng; nhãn 499,50 / 333,00 / - 199,99); phần "Self-learning journey" | Đóng bằng X (không có footer Save/Cancel ở chế độ xem) |
| Biến thể có campaign đang chọn | 801:10568 (ảnh) | Bấm icon mắt của 1 campaign | Campaign được chọn: icon mắt mở; hàng đó hiện thêm điểm "999" + icon link ngoài; phụ đề dưới Merchandise score "Based on each campaign"; donut có lát tím 333,00; tổng 632,51 | Annotation "View Merchandise score click to:" và "click to: … to enter Campaign details" (1033:9658, 2146:110191/110205/110225): click icon mắt để xem điểm merch của campaign; click icon link để vào Campaign details |
| Biến thể mọi campaign ẩn | 1033:9660 | Mọi mắt = eye-off | Không có lát tím; tổng 299,51 (= 499,50 − 199,99) | — |
| Biến thể No merchandise campaign | 3763:35098 | Sản phẩm không có campaign nào đang active | Phần Merchandise score hiện giữa khung: "No active campaigns to select."; donut chỉ Base + Self-learning (499,50; 199,99; tổng 699,49) | — |
| Edit base score (inline trong View details) | 1041:8552 | Nút "Edit" cạnh Base score | Khối Base score đổi thành: ô số (giá trị 999, căn phải), helper "Score range (-999) to 999", slider -999 / 0 / 999 (thanh cam từ 0), nút cam "Apply", nút "Cancel"; các dòng bên dưới (Self-learning, Merchandise) bị mờ | Apply / Cancel (hành vi sau Apply: toast hay không → `[CẦN XÁC NHẬN BA]`, xem Q7) |
| Self-learning journey (cuộn) | 1871:34700 | Cuộn trong popup | Bảng: Name, Performance, Self learning Score, Action; hàng mẫu: Viewed last month (12.000 views, "+100% from last month", "- 12"), Orders (12 orders, "+100% from last month", 322); nút "View analytics" (cam) mỗi dòng. Dạng danh sách dài: Purchase - Successful Order, Add to Cart (ATC), Product Click, Positive Reviews (4-5 stars), Negative Reviews (1-2 stars), Neutral Reviews (3 stars); mỗi dòng "12.000 views (+100% from last month)" và "+ 10"; phân trang Prev 1 2 3 4 … 8 Next | "View analytics" → Analytics (module chưa có spec — không giả định) |
| Bulk edit base score — Step 1 trống | 1867:30388 | Nút "Bulk edit base score" (2.1) / "Bulk edit" (2.2, xem Q10) | Header "Bulk edit base score" + X; stepper "1 Select products → 2 Bulk edit score" (step 2 xám); radio "Specific products" (mặc định chọn) / "All products"; dòng điều kiện: dropdown "Select condition" › dropdown "Select value" (disabled) + icon thùng rác; "+ And"; "Or"; nút "+ New condition group"; pane phải "Selected product(s)" trống; footer "0 product(s) selected", Cancel, Next (disabled, xám) | Cancel đóng; Next disabled khi 0 sản phẩm |
| Bulk edit — Step 1 Specific products có kết quả | 2067:156326 | Chọn condition + value | Ví dụ condition Brand, value dropdown multi-select có search mờ (3D Energy, 5% Nutrition, AD Life, AfterDark, Allmax Nutrition, Alpha Lion, ALRI (ALR Industries), Anabar, Apm…) — chip đã chọn "3D Energy ×", "5% Nutrition ×", "ALRI (ALR Industries) ×"; pane phải liệt kê sản phẩm + ô search "Search product name, SKU,…"; footer "60 product(s) selected" (số cam), Cancel, Next | Next → Step 2 |
| Bulk edit — Step 1 All products | 1850:34015 | Chọn radio All products | Ẩn khối condition; pane phải: danh sách + search; footer "1.293 product(s) selected" | Next |
| Bulk edit — Step 2 Increase/Decrease (mặc định) | 1855:32228 | Next | Radio "Increase / Decrease score" (mặc định chọn) / "Set to a fixed base score"; label "▲ Increase/ ▼ Decrease base scores by" (trung tính); ô số placeholder "0"; slider -999 / -500 / 0 / 500 / 999 (đầu núm ở 0); pane phải bảng: Product name, "Current base score" (chưa có cột NEW); footer "233 product(s) selected", Cancel, **Save** | Save / Cancel |
| Bulk edit — Step 2 kéo phải | 1855:35191 | Kéo slider > 0 hoặc nhập số dương | Label đổi thành "▲ Increase" (xanh) "base scores by"; ô "500"; thêm cột "NEW Base score" (nền cam nhạt, nhãn ✦ NEW): 10→510, 20→520, 30→530, 50→550, -1→499, -500→0 | Save / Cancel |
| Bulk edit — Step 2 kéo trái | 1855:35721 | Kéo slider < 0 | Label "▼ Decrease" (đỏ) "base scores by"; ô "- 500"; cột NEW: 10→-490, 20→-480, 30→-470, 50→-500, -1→-501, -500→-999 | Save / Cancel |
| Bulk edit — Step 2 Set to fixed | 1855:33226 | Chọn radio "Set to a fixed base score" | Label "Set all base scores to"; ô số placeholder "0"; slider; pane phải chỉ có cột Current base score (không có cột NEW) | Save / Cancel; annotation "Setting a fixed value" (1049:10563) |
| Setup base score (2.2) | 1937:44714 | Thẻ 2 menu; nút ← | Header "Setup base score" + ←; tiêu đề "Base score"; nút "Bulk edit"; nút "Filter"; ô search placeholder "Search campaign by search term, content, ID…" (xem Q3); bảng: Rank, Product name (▾, ảnh, tên, giá), Stock (▾), Base score (▾, icon xanh + giá trị, có dấu "-" cho âm), Action (nút "Edit"); phân trang Prev 1 2 3 4 … 8 Next | Nút Edit → popup Edit Base Score (annotation "Edit" + mũi tên 1822:41952) |
| Popup Edit Base Score | 2662:59380 (có overlay), 2758:38664 (tên frame "Popup/ Add filter node ") | Nút Edit dòng 2.2 | Header "Edit Base Score" + X; ô số (999), helper "Score range (-999) to 999", slider -999 / 0 / 999; nút "Cancel", "Save" | Save / Cancel / X |
| Dòng biến thể inline (Table row/ View) | 1822:41346 | Không rõ trigger | Ô nhập "- 999" + helper "Score range (-999) to 999" + nút Save thay cho nút Edit; hiển thị mờ (không phải thiết kế chính) | Xem Q9 |
| Sort dropdown 2.1/2.2 | 2047:49886, 2067:168473, 2067:168492, 2067:168511, 2067:168416 | Click header cột | Product name: Price: Low to High, Price: High to Low, A-Z (ascending), Z-A (descending); Merchandise/Base/Self-learning (2.1) và Stock/Base score (2.2): Highest - Lowest, Lowest - Highest | Không thấy trạng thái sort đang áp dụng, không thấy mặc định |

### 3. Bảng field / control

### 3.1 Cột & giá trị hiển thị

| Tên | Kiểu | Default | Options | Bắt buộc | Nguồn dữ liệu |
|---|---|---|---|---|---|
| Rank | text (#N) | — | — | — | Tính toán từ dữ liệu sync/điểm (Q2 mở: có tính Pin/Bury hay không) |
| Product name / ảnh / giá / Stock | text, ảnh | — | sort 4 option | — | Sync trực tiếp từ BigCommerce (name, price; stock = inventory — glossary chỉ liệt kê `price`, không liệt kê rõ inventory_level → `[CẦN XÁC NHẬN BA]` nguồn Stock; giả thuyết: sync Products) |
| Base score | số nguyên, icon xanh | giá trị mẫu 999/50/100/0/-1/-500/-999 | range -999..999 | — | Config nội bộ (merchant nhập) |
| Self-learning score | số thập phân (999,99; 100,33; 1,25) | — | — | — | Tính toán từ dữ liệu hành vi shopper (glossary: Tính toán). Người dùng xác nhận 2026-10-25 là chưa triển khai (nằm ngoài Figma) |
| Merchandise score | số, icon tag tím, có dấu +/− | — | — | — | Tính toán từ campaign (Config nội bộ → Tính toán); chỉ hiệu lực trong khoảng thời gian campaign |
| Product ranking score | số, cột nền vàng nhạt | — | — | — | Tính toán |
| Campaign name / thời gian | text | "Jun 19, 2025 - Jun 26, 2025"; hàng con "Ends: Mar 05, 2025"; popup edit "Starts: 03/18/2025"; bulk popup "Expired: 2025/02/13" | — | — | Config nội bộ (Campaign) |
| Self-learning journey: Name / Performance / Self learning Score | text | — | — | — | Tính toán từ hành vi shopper |

### 3.2 Control

| Tên | Kiểu | Default | Options | Bắt buộc | Nguồn |
|---|---|---|---|---|---|
| Ô search 2.1 | text | placeholder "Search product by name, description, SKU…" | — | không | Config UI |
| Ô search 2.2 | text | placeholder "Search campaign by search term, content, ID…" | — | không | — |
| Filter 2.1 | dropdown checkbox | "All products" tích | All products / Featured products / Free Shipping / Out Of Stock | không | Sync (is_featured, is_free_shipping; Out Of Stock từ inventory) |
| Filter 2.2 | nút | — | `[CẦN XÁC NHẬN BA]` — không có frame mở ra; giả thuyết: giống Filter 2.1 | — | — |
| Bulk edit radio mode Step 1 | radio | Specific products | Specific products / All products | có | — |
| Condition builder | dropdown condition › dropdown/ô giá trị; "+ And" trong nhóm, "Or" + "+ New condition group" giữa nhóm; thùng rác xoá dòng | 1 dòng trống "Select condition" / "Select value" (disabled) | xem 3.3 | để Next sáng cần ≥1 sản phẩm | Sync |
| Bulk edit radio mode Step 2 | radio | Increase / Decrease score | Increase / Decrease score; Set to a fixed base score | có | — |
| Ô số điểm (Step 2 & Edit) | number input căn phải + slider | "0" (placeholder) / popup Edit: giá trị hiện tại | -999..999 | có | Config nội bộ |
| Slider | range | giữa (0) | mốc -999, -500, 0, 500, 999 (bulk); -999, 0, 999 (edit) | — | — |

### 3.3 Thuộc tính Condition của Bulk edit (sticky label x=3458; kiểu giá trị lấy từ label + dropdown chụp được)

| Thuộc tính | Kiểu giá trị (label Figma) | Options / chi tiết thấy trong dropdown | Nguồn |
|---|---|---|---|
| Brand | (không có label sticky) multi-select, có chip; popup 2067:156326 | Danh sách brand (3D Energy, 5% Nutrition, AD Life…) | Sync (brand) |
| Conditions | "Conditions > Single-select" | New / Used / Refurbished (= BC `condition`) | Sync (condition) |
| Featured products | "Featured products > Single-select" | Featured products / Not featured products | Sync (is_featured) |
| Free shipping | "Free shipping > Single-select" | Free shipping / Not free shipping | Sync (is_free_shipping) |
| Inventory status | "Inventory status > Single-select" | Low stock / Out of stock (không có "In stock" trong ảnh) `[CẦN XÁC NHẬN BA]`: giả thuyết thiếu in-stock hoặc chủ ý | Sync/Tính toán từ inventory |
| Modifier Options | "Modifier Options > Multi-select option name" | Dropdown checkbox: tên option (Color, Color 2, Color 3) + phụ đề giá trị "Aura, Black, Glacier b…" (note 4452:32219 "Aura, Black, Glacier blue, Mammut red, Marine") | Glossary: chỉ Variant Options có bằng chứng sync, Modifier chưa → `[CẦN XÁC NHẬN BA]` |
| Price | (không label text trong note; nhãn "Price") | Toán tử: Equals to / Is greater than / Is less than / Between; ô "$0" hoặc 2 ô "$0 – $0" khi Between | Sync (price) |
| Product Category | "Product Category > Multi-select category" | Cây danh mục có checkbox lồng 3 cấp | Sync (categories) |
| Product Options | "Product Options > Multi-select option name" | Checkbox "Option-name" (dạng giống Modifier) | Sync (Variant Options) |
| Product Title | nhãn "Product Title" | Toán tử Contain / Do not contain; ô "Enter word" hoặc "E.g. dress, t-shirt, …" kèm helper "Using comma to separate" (2 biến thể UI, 2062:60469 / 2062:60544) | Sync (name) |
| Product Type | "Product Type > Single-select" | Physical / Digital | Sync (type) |
| Purchasability | "Purchasability > Single-select" | Purchasable / Pre-order / Not purchasable | Sync (availability) |
| Review Ratings | nhãn "Review Ratings" | Toán tử Is greater than / Is less than; ô giá trị "Select value" (dropdown, giá trị không chụp) | Tính toán từ reviews sync (glossary mục 9) |
| Weight | nhãn "Weight" | Toán tử Equals to / Is greater than / Is less than / Between (dropdown 2065:60680) | Sync (weight) |

Tổng 14 thuộc tính (Brand, Conditions, Featured products, Free shipping, Inventory status, Modifier Options, Price, Product Category, Product Options, Product Title, Product Type, Purchasability, Review Ratings, Weight). Không có Custom Fields trong Figma. Lưu ý: không có frame hiển thị danh sách "Select condition", nên tập 14 suy từ các frame con; không chắc đủ.

### 4. Business rule & dependency (note nguyên văn)

### Frame Note 618:16817

> Product ranking score : hiển thị default và self-learning score (all time)   + điểm merchandise campaign (in a period, điểm này k tính vào điểm total, chỉ list điểm từ các campaign) — node 618:16819

Diễn giải: tổng điểm = default (base) + self-learning (all time); điểm merchandise campaign chỉ để liệt kê theo từng campaign trong khoảng thời gian, không cộng vào total. [RULE: Merchandise score → KHÔNG cộng vào Product ranking score total (ở bảng 2.1).]

> điểm của SP = trung bình cộng điểm của các variants
> Nếu update điểm variant -> điểm SP tự thay đổi
> Nếu update điểm SP -> tự động dùng điểm này lưu đè vào điểm của tất cả Variant — node 1057:10677

Diễn giải: điểm sản phẩm = trung bình điểm variant. [RULE: sửa điểm SP → ghi đè mọi variant.] [RULE: sửa điểm variant → điểm SP tự tính lại.] Không có UI variant trong vùng E (Q15 mở).

> Có 2 cách adjust default score
> Adjust từng sản phẩm bằng cách Ấn vào sản phẩm -> popup edit
> Adjust nhiều sản phẩm theo 1 rule nào đó (bulk edit) — node 618:16820

Diễn giải: (1) sửa từng sản phẩm: popup Edit; (2) bulk edit. Lưu ý note nói "Ấn vào sản phẩm", Figma 2.1 lại cho Edit trong popup View details bằng nút "Edit", 2.2 dùng nút Edit ở cột Action.

> Bulk edit -> List condition (~ product match rule), chọn condition xong thì lọc 1 list sản phẩm đáp ứng được condition đấy -> Từ list đấy điều chỉnh điểm cho cả list hoặc điều chỉnh điểm riêng (aka tác động sản phẩm) — node 706:6663

Diễn giải: Step 1 chọn condition lọc danh sách; Step 2 chỉnh điểm hàng loạt. "điều chỉnh điểm riêng" không có UI tương ứng (Q14).

> Campaign : điều chỉnh thứ tự sản phẩm trong 1 khoảng thời gian nhất định và kèm 1 điều kiện trigger nhất định (optional), áp dụng 1 nhóm actions cố định (thêm Condition - vd 1 nhóm khách hàng nhất định (optional) ) — node 715:6671

Diễn giải: định nghĩa campaign (thuộc 2.3).

### Note trong section 2.1

> Show campaign A → hide others — node 990:13993 (frame 990:13990)

Diễn giải: [RULE: trong View details, chọn hiển thị (mắt mở) campaign A trên donut → các campaign khác bị ẩn (mắt đóng) = chỉ một campaign được chọn tại một thời điểm.] Không rõ mặc định chọn campaign nào khi mở popup (ảnh có 1 campaign mắt mở, biến thể khác mọi campaign mắt đóng) `[CẦN XÁC NHẬN BA]`: giả thuyết mặc định không chọn campaign nào hoặc campaign đầu tiên.

> When dragging slider
> Display "▲ Increase" (green) or "▼ Decrease" (red) text based on drag direction
> Add NEW Base Score column to products table
> Calculate NEW Base Score values in real-time during slider interaction
> If ▲ Increase/ ▼ Decrease a value exceeds current value, display the new score -999 or 999 — node 1855:36489

Diễn giải: [RULE: slider > 0 → nhãn "▲ Increase" xanh; slider < 0 → "▼ Decrease" đỏ.] [RULE: kéo slider → thêm cột "NEW Base score", tính realtime.] [RULE: kết quả vượt biên → hiển thị -999 hoặc 999 (kẹp)]. Ví dụ ảnh: Decrease 500 trên -500 → -999 (thực tế -1000 bị kẹp); Decrease 500 trên -1 → -501; Increase 500 trên -500 → 0. Ghi chú: câu note nói "exceeds current value" — ngữ nghĩa mơ hồ, đọc theo ví dụ là kẹp biên. Chế độ "Set to a fixed base score" không có cột NEW (ảnh 1855:33226).

> Drag score slider to the right (> 0) — 2067:136561
> Drag score slider to the left (< 0) — 2067:136562

Diễn giải: nhãn nhánh state tương ứng popup 1855:35191 (phải) và 1855:35721 (trái).

> Bulk adjust score / Specific products — 894:9832
> Bulk adjust score / All products — 1048:8562

Diễn giải: nhãn state của popup Step 1 (2067:156326 / 1850:34015).

> Feedback: Tooltip: giải thích định nghĩa + công thức tỷ trọng cho vào — 866:9826

Diễn giải: feedback yêu cầu tooltip phải có cả định nghĩa và công thức tỷ trọng; hiện tooltip chỉ nêu "contributes N% of Product ranking score" (mục 6), chưa có công thức. Công thức hiển thị: chưa rõ (mục 8).

> What is product ranking score? — 2644:62853 (tiêu đề feature tour)
> Product ranking score determines product order on category pages or search result pages, based on factors it combines — 2644:62938
> Merchandise Score (30%) – Temporarily added to product score to boost product ranking when a campaign is activated. Automatically resets to 0 when campaigns end. — 2644:62941
> Base Score (50%) – Direct control of product ranking for all products. — 2644:62944
> Self-Learning Score (20%) – Automatically added to product score based on customer shopping behaviors. — 2644:62947

Diễn giải: ba thành phần với tỷ trọng 30/50/20 (tổng 100%). [RULE: campaign kết thúc → Merchandise score tự về 0.] [RULE: Self-learning tự cộng dựa trên hành vi shopper.]

Rule nhãn "A = X → B":
- Nhãn R1: Product có campaign active = không có → vùng Merchandise hiện "No active campaigns to select." và donut không có lát merch.
- Nhãn R2: Campaign eye = mở (A) → mọi campaign khác bị ẩn.
- Nhãn R3: Bulk mode = All products → khối condition bị ẩn (không thấy ở 1850:34015); mode = Specific products → hiện khối condition.
- Nhãn R4: Step 1 chọn 0 sản phẩm → Next disabled (1867:30388).
- Nhãn R5: Step 2 mode = Set to a fixed base score → không có cột NEW và label đổi thành "Set all base scores to"; mode = Increase/Decrease → có cột NEW (khi đã kéo/nhập ≠ 0) và label theo dấu.
- Nhãn R6: Edit base score đang mở → các khối bên dưới (Self-learning, Merchandise) bị mờ (1041:8552).
- Nhãn R7: Base score = âm → hiển thị dấu "-" trước icon (2.2: "- ⓑ 1", "- ⓑ 500").

### 5. Validation & giới hạn

- Điểm base: "Score range (-999) to 999" (helper nguyên văn ở popup Edit, Edit inline trong View details, Setup base score inline, bulk step 2).
- Slider bulk: các mốc -999, -500, 0, 500, 999; slider Edit: -999, 0, 999.
- Kẹp: "display the new score -999 or 999" (note 1855:36489) cho NEW Base score bulk.
- Không thấy text lỗi nào khi nhập ngoài range / ký tự không phải số / số thập phân / rỗng (Q8). `[CẦN XÁC NHẬN BA]` giả thuyết: kẹp về biên, chỉ số nguyên.
- Giá trị mẫu Self-learning có thập phân (999,99; 100,33; 1,25) và dòng bảng 499.50 — Base score chỉ thấy số nguyên.
- Số sản phẩm: ví dụ 0, 60, 233, 1.293; không có giới hạn trên (Q13).
- Search: không thấy min length. Phân trang mẫu 8 trang, 10 dòng.

### 6. Message / toast / popup text nguyên văn

- Snackbar: "Success" / "Base scores have been edited."
- Tooltip Base score (3763:34775): "This score contributes 50% of Product ranking score and is your main control over product ranking."
- Tooltip Self-learning (3763:34777): "This score contributes 20% of Product ranking score and adjusts automatically based on shopper behavior."
- Tooltip Merchandise (3763:34779): "This score contributes 30% of Product ranking score and gives a temporary boost during campaigns, then resets."
- Empty state: "No active campaigns to select."
- Banner menu: "Control how products rank in search and category pages with customizable scoring." / "Your products' rankings in search results and category pages are now in your hands!. Learn more about how to merchandise." (dấu "!." trong nguyên văn)
- Helper: "Score range (-999) to 999"; "Using comma to separate"; placeholder "Enter word"; "E.g. dress, t-shirt, …"; "Select condition"; "Select value"; "Select".
- Footer: "{N} product(s) selected"; nút "Cancel", "Next", "Save", "Apply", "Edit", "View", "View analytics", "Bulk edit base score", "Bulk edit", "+ And", "+ New condition group", "Setup Now".
- Label: "Based on each campaign"; "▲ Increase base scores by", "▼ Decrease base scores by", "▲ Increase/ ▼ Decrease base scores by", "Set all base scores to", "Increase / Decrease score", "Set to a fixed base score", "Specific products", "All products".
- Không thấy popup xác nhận (confirm) khi Save bulk; không thấy loading; không thấy lỗi.

### 7. Câu hỏi mở / đối chiếu Q1–Q23

Quy ước mức chặn lấy từ file issues. "Figma đã trả lời" = chỉ khi có căn cứ trong vùng E.

| Q | Trạng thái sau khi đọc Figma | Căn cứ / giả thuyết |
|---|---|---|
| Q1 | Trả lời một phần | Menu có 3 thẻ riêng "Manage product ranking" và "Setup base score" → 2 màn cùng tồn tại, vào từ menu "Setup Now". Prototype link chưa đọc được. 2.1 vẫn có Bulk edit + Edit, nên chỗ chồng lấn chức năng vẫn tồn tại → ý "2.2 thay thế 2.1" không đúng theo menu. Còn mở: vai trò khác nhau thế nào. Mức 🟡 |
| Q2 | Mở | Mọi dòng "#2234" (2.2) và "Rank 1, #2234" (2.1). Giả thuyết giữ nguyên |
| Q3 | Mở (có bằng chứng nghiêng về lỗi copy) | 2.2: "Search campaign by search term, content, ID…" vs 2.1: "Search product by name, description, SKU…". Cần xác nhận Designer |
| Q4 | Trả lời một phần cho 2.1 | Filter 2.1 chỉ là checkbox 4 mục (All products, Featured products, Free Shipping, Out Of Stock), KHÔNG dùng bộ 14 condition. Filter 2.2 không có frame → mở |
| Q5 | Một phần | Dropdown Product name đúng có Price: Low to High/High to Low, A-Z, Z-A ở 2.1 (đã chụp); 2.2 chỉ suy từ chiều cao. Giá dùng cao/thấp của variant: mở |
| Q6 | Mở | Mẫu 10 dòng, Prev 1 2 3 4 … 8 Next (không thể suy chắc 10/trang là cấu hình) |
| Q7 | Mở | Chỉ 1 snackbar "Base scores have been edited." trên màn 2.1 (số nhiều → bulk). Không có toast cho Edit đơn |
| Q8 | Một phần | Note bulk: kẹp -999/999 cho NEW Base score; popup Edit: không nói cách xử lý; không có text lỗi; thập phân không nói. Vẫn 🔴 cho popup Edit |
| Q9 | Gần như nghiêng về popup | Table row/ View có state inline (ô "- 999" + Save, mờ) nhưng 2.2 chính có nút Edit với annotation "Edit" → popup 2662:59380. Inline có vẻ là bản cũ. Cần Designer xác nhận |
| Q10 | Mở | 2.2 có nút "Bulk edit" (khác tên "Bulk edit base score" của 2.1) nhưng không có popup bulk riêng ở 2.2 → nhiều khả năng dùng chung. Không có link prototype |
| Q11 | Figma không có Custom Fields | 14 thuộc tính, không có Custom Fields (không có frame danh sách thuộc tính). PDF có — mâu thuẫn Figma vs PDF → hỏi BA |
| Q12 | Figma không có Back | Step 2 chỉ Cancel + Save; Step 1 chỉ Cancel + Next. Chưa biết cố ý hay thiếu |
| Q13 | Mở | Mẫu 1.293 sản phẩm, không có loading/processing/giới hạn |
| Q14 | Mở | Popup chỉ có 2 mode (Increase/Decrease, Set fixed); không có sửa từng sản phẩm trong popup |
| Q15 | Mở | Không có UI variant trong vùng E |
| Q16 | Mâu thuẫn đã xác nhận bằng Figma (xem mục 8); đã có xác nhận người dùng 2026-10-25 (trong file issues) | Còn mở: cách kết hợp, Self-learning có hiển thị không, mô hình 30/50/20 có áp thật |
| Q17 | Mở | Không thấy rule lưu vào Figma vùng E; chỉ thấy "Success – Base scores have been edited." |
| Q18 | Một phần | Tour: "determines product order on category pages or search result pages". Không nói sort = Relevance hay ISW |
| Q19 | Một phần | Chỉ Merchandise score "Automatically resets to 0 when campaigns end"; Pin/Bury/Hide không nói trong vùng E |
| Q20, Q21, Q22 | Ngoài vùng E (campaign actions) | Không đọc |
| Q23 | Mở | Không có Merge Values trong Product Options condition (dropdown chỉ "Option-name" checkbox) |

Câu hỏi mới phát sinh từ vùng E:
- E1. Frame "Popup/ Add filter node" (2758:38664, 2662:59174) thực chất là popup "Edit Base Score" — tên frame sai, có phải bản copy từ Filter? Giả thuyết: chỉ đặt tên sai. Mức 🟢.
- E2. Khi popup 2.1 View details bấm Edit (inline) — có cần confirm trước khi Apply? Giả thuyết: không. Mức 🟡. Nút "Apply" (View details) và "Save" (popup 2.2 Edit) khác nhãn — chủ ý? Mức 🟢.
- E3. Inventory status condition thiếu "In stock"? Mức 🟡.
- E4. Merchandise tooltip text của Feature tour khác giữa 2 frame (mục 8). Mức 🟢.
- E5. Dòng đầu bảng 2.1 "Rank: 1" vs dòng khác "#2234" — format Rank. Mức 🟢.
- E6. Số thập phân dùng "." và "," lẫn lộn (499.50, 299,51; 12.000 views; $3.643; 1.293) — định dạng locale? Mức 🟡.
- E7. Nút Edit trong View details thay đổi tổng (Product ranking score trong donut) sau Apply — làm mới ngay hay không? Mức 🟡.
- E8. Self-learning journey "View analytics" mở đâu (Analytics chưa có spec)? Mức 🟢 — không giả định.
- E9. "Show campaign A → hide others": mặc định chọn campaign nào? 🟡.
- E10. "+5 more" trong dòng mở rộng (2067:169173): click ra sao / mở View details? 🟡.

### 8. Mâu thuẫn / không nhất quán

1. **Công thức Product ranking score** (đã xác nhận bằng số liệu Figma):
   - Tooltip + feature tour: Merchandise 30% / Base 50% / Self-learning 20% (tổng 100%) → ngầm hiểu total có cả 3.
   - Note 618:16819: "điểm này k tính vào điểm total" (merch không cộng).
   - Bảng 2.1: total chỉ khớp 0,5×Base + 0,2×Self-learning, merch không vào. Ví dụ: 999/999 → 700 (≈699,3 làm tròn 700); base 999, SL 0, merch 23 → 499,50; base -500, SL -100,33 → -270,07 (= -250 − 20,07); base -999, SL -1,25 → -499,75; base 50, SL 999 → 225,00 (≈224,8). Một số dòng làm tròn không khớp chính xác (700 thay vì 699,3; -700 thay vì -699,3; 299,51 thay vì 299,7; 225,00 thay vì 224,8; -200,00 thay vì -199,8) — mô hình số mẫu, không chắc làm tròn thế nào.
   - Popup View details: biến thể 801:10568/1033:9660: total 299,51 = 499,50 − 199,99 (không có merch khi mắt đóng); biến thể có campaign chọn: 632,51 = 499,50 + 333,00 − 199,99 (có cộng merch) → View details cộng merch của campaign đang chọn, bảng 2.1 không cộng. Mâu thuẫn nội bộ.
   - 333,00 không khớp 30% × 999 = 299,7. 199,99 ≈ 0,2 × 999,99. Base 499,50 = 0,5 × 999.
   - Người dùng đã xác nhận (2026-10-25, trong file issues Q16): ranking hiện dựa trên Base + Merchandise; Self-learning chưa triển khai. Điều này còn mâu thuẫn với Note (merch không tính) và với bảng (không có merch). `[CẦN XÁC NHẬN BA]` giả thuyết: tổng = Base + Merchandise(chưa tỷ trọng) ở hệ thống thật; Figma bảng/Tooltip cần sửa.
2. **Tooltip feature tour Merchandise**: frame Product ranking score (2644:62941) viết "Temporarily added to product score to boost product ranking when a campaign is activated. Automatically resets to 0 when campaigns end." ; frame Manage product ranking (2067:168396) viết "Temporary control of product rankings by creating campaigns for specific products. Automatically resets to 0 when campaigns end." → 2 phiên bản text.
3. **Placeholder search**: 2.1 "Search product by name, description, SKU…" vs 2.2 "Search campaign by search term, content, ID…".
4. **Nút**: 2.1 "Bulk edit base score" vs 2.2 "Bulk edit"; nút lưu: "Apply" (Edit inline trong View details) vs "Save" (popup Edit 2.2 và bulk).
5. **Tên frame sai**: "Popup/ Add filter node" cho popup "Edit Base Score".
6. **Note vs UI**: note 618:16820 nói "Ấn vào sản phẩm -> popup edit"; UI có nút "Edit" riêng trong popup View details và nút Edit ở 2.2, không click vào sản phẩm.
7. **Ngày**: ví dụ campaign dùng 3 format: "Jun 19, 2025 - Jun 26, 2025", "Ends: Mar 05, 2025", "Starts: 03/18/2025", "Expired: 2025/02/13".
8. **Số liệu mẫu**: Self-learning "999,99" trong View details nhưng donut ghi "199,99"/"- 199,99" (đã tính tỷ trọng), Base "999" → "499,50" (tỷ trọng 50%) nhưng 333,00 của campaign không theo tỷ trọng 30%.
9. **Inventory status** thiếu "In stock" trong khi Filter 2.1 có "Out Of Stock" (Low stock chưa thấy ở Filter 2.1).
10. **Setup base score (2.2) vs 2.1**: 2.2 không có cột Merchandise/Self-learning và chỉ có Stock + Base score; 2.1 có cả 3 cột nhưng không có cột Stock riêng (Stock trong ô sản phẩm).
