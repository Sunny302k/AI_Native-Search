# Quick Filters (Add + Edit) — Specs

## 0. Nguồn gốc tài liệu

**Cập nhật (2026-07-20, lần 2)**: người dùng gửi screenshot khác của cùng cụm frame Figma, lần này chụp rõ **thanh tiêu đề tab "Edit filter node : Quick Filters (Featured Products / Special Offers / Stock / Shipping)"** và panel Edit hiển thị breadcrumb **"< Quick Filters"** — xác nhận dứt điểm: **thiết kế Figma dùng đúng tên "Quick Filters"**, không phải "Tools" như bản ghi nhận trước đó (khả năng cao lần đọc trước bị lẫn với breadcrumb generic "Brand" còn sót lại trong cùng ảnh gộp, tên "Tools" không phải tên chính thức của node này). Toàn bộ nghi vấn/hedging về tên gọi ở bản spec trước đã được gỡ bỏ.

Người dùng cũng cung cấp thêm **sheet test case `Add filter node - Quick Filters`** (Google Sheet `TC_Native Search`, gid=199815586, 105 case — gộp cả phần Add case #1-50 và phần Edit case #51-105 trong cùng 1 sheet) làm nguồn đối chiếu chính thức, thay cho cách tổng hợp suy luận thuần tuý từ 4 sheet node riêng lẻ (Featured Products/Special Offers/Shipping/Stock) như bản trước.

Nguồn tổng hợp đầy đủ:
1. **Ảnh UI Export Figma thật**: `03_Filter/01_Display_Setup/02_Filter_Tree_Node_Setup/UI_Export/Edit filter node _ Toggle (Featured Products/Special Offers/Stock/Shipping).png` — vùng panel "Quick Filters" (đã crop ở độ phân giải gốc 2 lần, xác nhận nhất quán cả 2 lần đọc).
2. **Sheet `Add filter node - Quick Filters`** (gid=199815586, 105 case) — nguồn chính, đã đối chiếu khớp với ảnh UI.
3. **SPEC PDF chính thức** (`03_Filter/SPEC_Filter_v1.0_2025-10-14.pdf`, trang 8) — mô tả nguyên lý gom nhiều attribute thành toggle (Featured/Sales/In stock/Free shipping), dùng tham khảo logic nguồn dữ liệu.
4. **Spec `edit-filter-node-featured-products-specs.md`** — nguồn cho logic giá trị "Best-seller" (Is Featured).
5. **Spec `edit-filter-node-special-offers-specs.md`** — nguồn cho logic giá trị "Special Offers".
6. **Sheet `Add filter node - Shipping`** (gid=894321096) — nguồn cho logic giá trị "Free Shipping".
7. **Sheet `Add filter node - Stock`** (gid=2025425783) — nguồn cho logic giá trị "In Stock".

**Quyết định đã thống nhất với người dùng** (2026-07-20):
- Logic "In Stock" trong Quick Filters = **KHÔNG Out of Stock** (Total Current Stock > 0) — gộp cả 2 mức "In Stock" và "Low Stock" của node Stock gốc thành 1 giá trị boolean, chỉ loại trừ Out of Stock. Khác với định nghĩa "In Stock" riêng của node Stock (Total Current Stock > Total Low Stock Threshold).
- Sort Order: coi là 1 field duy nhất, có cả field tóm tắt + [Edit] mở popup (5 mode giống Brand: Alphabetical Asc/Desc, Product number Asc/Desc, Custom order) **và** luôn hiển thị thêm 1 danh sách kéo-thả trực tiếp trong panel (không cần mở popup) để chỉnh nhanh — bỏ qua field "Option Sorting" trùng lặp thấy ở Appearance Settings trên ảnh Figma (đánh dấu `<cần confirm>` 1 lần, không lặp lại).
- Test case Add + Edit viết theo **format skill `create-functional-testcase` mới** (đã đồng bộ với chuẩn QA Timind chung — xem cập nhật skill 2026-07-20): bộ Test Type `Happy/Validation/UI/Permission/Integration/Edge Case/Sync`, cột Field/Phần chỉ điền ở dòng đầu mỗi nhóm, CRLF cuối mỗi record.

## 1. Tổng quan

Quick Filters là 1 filter node **gộp nhiều thuộc tính boolean khác nhau thành các toggle trong cùng 1 node**, giúp merchant tạo 1 khối filter nhanh gọn thay vì phải add riêng từng filter node (Featured Products, Special Offers, Stock, Shipping). Có đúng **4 giá trị cố định**, mỗi giá trị lấy dữ liệu từ 1 nguồn BC khác nhau:

| Giá trị hiển thị mặc định | Nguồn dữ liệu BC | Logic xác định | Nguồn tham chiếu |
| --- | --- | --- | --- |
| **Best-seller** | Product → Storefront Details → "Set as a Featured Product on my Storefront" (Featured Star) | ON nếu Featured Star = checked | `edit-filter-node-featured-products-specs.md` mục 9 |
| **Special Offers** | Product → Pricing → Sale Price | ON nếu Sale Price ≠ 0 | `edit-filter-node-special-offers-specs.md` mục 9 |
| **In Stock** | Product → Inventory → Current stock / Low stock threshold (mọi location) | ON nếu Total Current Stock > 0 (theo quyết định người dùng — gộp cả Low Stock gốc vào "In Stock", chỉ loại Out of Stock) | Sheet `Add filter node - Stock`, công thức gốc (mục 2) |
| **Free Shipping** | Product → Shipping → checkbox "Free Shipping" | ON nếu checkbox Free Shipping = checked (Fixed Shipping Price KHÔNG override, chỉ checkbox quyết định) | Sheet `Add filter node - Shipping` case #52, 53 |

**Khác biệt quan trọng so với các filter node đã làm trước**: đây là node duy nhất **kết hợp nhiều nguồn dữ liệu BC khác nhau trong cùng 1 node** (Feature Star + Sale Price + Inventory + Shipping), thay vì 1 node = 1 nguồn dữ liệu.

## 2. Công thức "In Stock" — chi tiết đầy đủ (tham khảo từ node Stock gốc)

```
Total Current Stock = Σ Current stock (tất cả location)
Total Low Stock Threshold = Σ Low stock threshold (tất cả location, "—" = 0)

Out of Stock: Total Current Stock = 0
Low Stock:    0 < Total Current Stock ≤ Total Low Stock Threshold
In Stock:     Total Current Stock > Total Low Stock Threshold
```

**Theo quyết định người dùng, "In Stock" trong Quick Filters = Total Current Stock > 0** (tức gộp cả "Low Stock" lẫn "In Stock" ở trên, chỉ loại trừ đúng "Out of Stock"). Các rule biên đã xác nhận từ sheet Stock áp dụng lại cho ngưỡng > 0 này:
- Location không track inventory (Current stock = "—") → coi như unlimited → luôn tính vào "In Stock".
- Tất cả location đều không track → "In Stock".
- `[CẦN XÁC NHẬN BA]` — Availability toggle (BC) OFF nhưng Current stock > 0: có override thành Out of Stock (loại khỏi "In Stock") không? Sheet Stock gốc (case #49, #132) cũng để ngỏ câu hỏi này, chưa có câu trả lời. **Chưa có test case nào trong bản draft trước khai thác input này** — đã bổ sung ở bản rewrite.

### 2.1 Rủi ro kế thừa từ node Stock gốc — quan trọng, ảnh hưởng trực tiếp quyết định "gộp" ở trên

Đối chiếu ngược sheet `Add filter node - Stock` (gid=2025425783, đã fetch lại và rà cột Tester/Result), phát hiện **nhiều bug NG đã ghi nhận thực tế** (không phải suy đoán) trên đúng cơ chế mà Quick Filters "In Stock" tái sử dụng:

| # | Bug đã ghi nhận (NG) trên node Stock gốc | Vì sao ảnh hưởng trực tiếp Quick Filters | Nguồn (case Stock) |
| --- | --- | --- | --- |
| 1 | **Kết hợp 2 option "In Stock" + "Low Stock" cùng lúc không ra UNION** — chọn thêm Low Stock sau khi đã chọn In Stock thì kết quả storefront vẫn chỉ show đúng list của riêng "In Stock", không gộp thêm Low Stock (lặp lại NG ở nhiều case khác nhau) | Đây **chính xác là cơ chế** mà quyết định "gộp Low Stock vào In Stock" của Quick Filters dựa vào (mục 0, mục 2) — nếu tầng dưới chưa OR đúng 2 bucket, giá trị "In Stock" gộp của Quick Filters nhiều khả năng thừa hưởng đúng lỗi này | case tương ứng vùng OR 2 option, nhiều lần lặp lại NG |
| 2 | **Bucket "Out of Stock" (Total Current Stock = 0) bị lỗi nặng, lặp lại nhiều lần**: "Không thấy xuất hiện product ở bất cứ option stock nào cả" khi test trạng thái ban đầu current=0; tương tự khi product chuyển Low Stock→Out of Stock, In Stock→Out of Stock (kể cả khi nguyên nhân là Order tự động trừ kho) | Đây đúng là ranh giới quyết định 1 sản phẩm có tính vào "In Stock" (gộp) của Quick Filters hay không (stock=0 → loại) — biên đang bị lỗi ở node gốc | nhiều case, lặp lại "Phần out of stock có đang sai" |
| 3 | **Count cạnh mỗi option không hiển thị** ("Đang không show count", lặp lại ≥5 lần) | Chưa rõ Quick Filters (UI toggle, không phải list) có hiển thị count cạnh mỗi toggle hay không — nếu có, rủi ro thừa hưởng bug này | nhiều case liên tiếp vùng Integration (count) |
| 4 | **Total Current Stock đang tính theo default location, không cộng dồn tất cả location** | Sai ngay từ công thức nguồn dữ liệu gốc mà Quick Filters "In Stock" phụ thuộc — nếu chưa fix, số liệu In Stock của Quick Filters cũng sai theo | case tính Total theo nhiều location |
| 5 | **Popup cảnh báo "unsaved changes" khi rời màn Edit (Back/reload) hoàn toàn không hiển thị** ("Không hiển thị cảnh báo", lặp lại 4 lần cho Back/Discard/reload/F5) | Test case Quick Filters đang giả định luồng "unsaved changes" hoạt động đúng (viết theo pattern chung Brand/Featured Products) — nhưng bằng chứng thực tế gần nhất (Stock) cho thấy tính năng này **hiện KHÔNG hoạt động** | 4 case liên tiếp cuối sheet Stock |
| 6 | **Mobile Collapse/Expand: filter không hiển thị được trên Mobile** ("CẦN CHECK LẠI PHẦN MOBILE", lặp lại 4 lần) | Trực tiếp ảnh hưởng case Appearance - Collapse/Expand (Mobile) của Quick Filters | 4 case Collapse/Expand |
| 7 | **Title alignment: title dài quá 1 dòng → Preview luôn căn trái dù chọn Center/Right** — bug chung đã ghi nhận ở `category/Special Offers/Sale Percentage/SKU/Stock` (Stock nằm trong danh sách) | Title là field General Settings dùng chung mọi node kể cể Quick Filters | 1 case Title alignment |

**Kết luận áp dụng cho test case**: các case tương ứng ở Quick Filters (In Stock ON/OFF boundary, Title alignment multi-line, Collapse/Expand Mobile, popup unsaved changes, count hiển thị cạnh toggle) **không được viết là Happy khẳng định chắc chắn "đúng"** như bản draft trước — phải giữ nguyên rule đúng theo thiết kế (Happy) NHƯNG thêm Note tham chiếu rủi ro NG đã biết từ node nguồn, để tester ưu tiên soi kỹ vùng này khi thực thi thật.

### 2.2 Rủi ro kế thừa từ Special Offers / Featured Products (2 nguồn dữ liệu còn lại)

- **Special Offers** (toggle "Special Offers"): `edit-filter-node-special-offers-specs.md` mục 9 ghi nhận **bug nghiêm trọng, NG xuyên suốt gần như toàn bộ nhóm Integration** — "storefront chọn filter Special Offers không thực sự lọc sản phẩm", cùng root cause với Category/Sale Percentage. Toggle "Special Offers" trong Quick Filters tái sử dụng đúng data source (Sale Price) và cơ chế lọc storefront này → rủi ro thừa hưởng cùng bug.
- **Best-seller** (toggle "Is Featured"): `edit-filter-node-featured-products-specs.md` ghi nhận NG ở: uncheck 1 option không ẩn đúng khỏi storefront (#12), Toggle style + Single select behavior sai (#23), product count hiển thị sai (#37), count không khớp data BC (#39), AND logic với filter khác sai (#42).
- **Free Shipping** (toggle "Free Shipping"): sheet `Add filter node - Shipping` (gid=894321096) **hoàn toàn chưa có cột Tester/Result nào được điền** — tức là **chưa từng được thực thi**, không phải "đã xác nhận sạch bug". Không nên coi đây là nguồn rủi ro thấp hơn 3 nguồn còn lại một cách chắc chắn, chỉ là chưa có bằng chứng theo chiều nào.

## 3. General Settings

Giống pattern chung mọi filter node:

| Field | Loại | Validation | Default |
| --- | --- | --- | --- |
| Title | Text | Bắt buộc, rỗng → lỗi required | "Quick Filters" — xác nhận qua breadcrumb ảnh UI thật + sheet Add case #6 |
| Title text color | Color | Áp dụng ngay Preview | — |
| Title alignment | Radio Left/Center/Right | Áp dụng ngay Preview | Left |

## 4. Filter Settings — Toggle options (4 giá trị cố định)

Mỗi giá trị có checkbox (ẩn/hiện) + text field label riêng (xác nhận qua ảnh UI thật):

| Toggle | Checkbox default | Label default | Nguồn dữ liệu |
| --- | --- | --- | --- |
| Is Featured | Checked | "Best-seller" | Featured Star (BC) |
| Special Offers | Checked | "Special Offers" | Sale Price (BC) |
| In Stock | Checked | "In Stock" | Inventory (BC) |
| Free Shipping | Checked | "Free Shipping" | Free Shipping checkbox (BC) |

Rule tương tự Featured Products/Shipping: uncheck 1 toggle → ẩn khỏi storefront; custom label không ảnh hưởng logic filter; label rỗng → lỗi required.

## 5. Filter Settings — Display Style (khác hoàn toàn mọi node khác)

**Không phải List/Grid/Toggle/Star/Swatch** như các node khác — đây là 3 lựa chọn **vị trí label so với toggle switch**, xác nhận qua ảnh UI thật (3 icon minh hoạ trực quan):

| Giá trị | Default | Mô tả |
| --- | --- | --- |
| Text - Right | **Có** (mặc định, khớp ảnh UI) | Label hiển thị bên phải toggle switch |
| Text - Left | — | Label hiển thị bên trái toggle switch |
| Text - Bottom | — | Label hiển thị bên dưới toggle switch |

## 6. Filter Settings — Sort Order

Theo quyết định người dùng (mục 0): coi là 1 field, có 2 phần cùng tồn tại:
1. Field tóm tắt "Sort Order: [giá trị hiện tại]" + button [Edit] → mở popup 5 mode: Alphabetical - Ascending (default), Alphabetical - Descending, Product number - Ascending, Product number - Descending, Custom order (giống hệt pattern Brand).
2. Danh sách kéo-thả trực tiếp trong panel (4 item: Is Featured, Special Offers, In Stock, Free Shipping, icon `≡` mỗi dòng) — luôn hiển thị, không cần mở popup, cho phép chỉnh nhanh thứ tự.

`[CẦN XÁC NHẬN BA]` — quan hệ chính xác giữa 2 phần này (VD: kéo-thả trực tiếp có tự đổi mode Sort Order sang "Custom order" không?), và field "Option Sorting" thấy riêng ở khối Appearance Settings trên ảnh Figma có phải bản sao trùng của field Sort Order này hay là 1 field khác — chỉ viết test case theo 1 field Sort Order duy nhất (bỏ qua Option Sorting) theo quyết định người dùng.

## 7. Hide on customer group

Giống pattern chung, không có điểm khác biệt riêng.

## 8. Appearance settings

Theo ảnh UI thật, panel Appearance Settings của Quick Filters chỉ show: Display tooltip (+content), Collapse/Expand (Desktop), Collapse/Expand (Mobile) — giống pattern trimmed đã thấy ở Review Ratings/Category/Sale Percentage. Không có Show all irrelevant values/Uppercase/Search box/Pagination trên ảnh UI thật của riêng khung Quick Filters — nhưng cả 4 sheet nguồn (Featured Products, Special Offers, Shipping, Stock) đều có test các field Uppercase + Search box Desktop/Mobile cho node gốc của chúng. `[CẦN XÁC NHẬN BA]` — do Quick Filters gộp nhiều node, panel Appearance có thể đã được rút gọn có chủ đích (như Category/Sale Percentage) hoặc ảnh Figma chưa cập nhật đủ. Test case viết theo ảnh UI (rút gọn 3 field), đánh dấu `<cần confirm>` riêng cho khả năng có thêm Uppercase/Search box.

## 9. Storefront & Merchandising rules

Áp dụng lại đúng rule đã xác nhận ở từng node gốc, verify lại trong ngữ cảnh Quick Filters (1 node gộp 4 nguồn dữ liệu khác nhau):

| Rule | Nguồn gốc |
| --- | --- |
| Best-seller: chỉ product có Featured Star mới tính | Featured Products — rủi ro kế thừa NG uncheck-hide/Toggle+Single/count (mục 2.2) |
| Special Offers: chỉ product Sale Price ≠ 0 | Special Offers — **rủi ro cao**: node gốc NG toàn bộ nhóm storefront-filter (mục 2.2) |
| In Stock: chỉ product Total Current Stock > 0 (theo mục 2) | Stock (đã điều chỉnh) — **rủi ro cao**: node gốc NG cơ chế OR 2 bucket + boundary Out of Stock (mục 2.1) |
| Free Shipping: chỉ product có checkbox Free Shipping BC = checked | Shipping — sheet nguồn chưa từng thực thi (không có Tester/Result), rủi ro chưa xác định (mục 2.2) |
| Option Select Type Multiple (default) | Sync theo pattern Featured Products/Shipping — nhưng cần xác nhận default Single hay Multiple riêng cho Quick Filters, ảnh UI không show rõ dropdown mở |
| AND logic khi kết hợp với filter khác | Chung |
| Merchandising — product Hidden không tính vào count | Chung |
| Sync: BC đổi bất kỳ 1 trong 4 nguồn dữ liệu → sync → toggle tương ứng cập nhật, 3 toggle còn lại không đổi | Mới, đặc thù Quick Filters (multi-source) — cần 1 case sync-isolation riêng cho MỖI nguồn (4 case), không chỉ 1 case đại diện |

`[CẦN XÁC NHẬN BA]` — Option Select Type default là Single hay Multiple cho Quick Filters? Ảnh UI không capture rõ trạng thái dropdown mở.

## 10. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Availability (BC) OFF nhưng Current stock > 0 → có override "In Stock" thành OFF không? | 2 |
| 2 | Quan hệ giữa field Sort Order (popup 5 mode) và list kéo-thả inline luôn hiển thị — kéo-thả có tự chuyển mode sang Custom order? | 6 |
| 3 | Field "Option Sorting" ở Appearance Settings trên ảnh Figma có phải bản trùng của Sort Order hay là field độc lập khác? | 6 |
| 4 | Panel Appearance Settings có thực sự thiếu Show all irrelevant values/Uppercase/Search box, hay ảnh Figma chưa cập nhật đủ (như đã gặp ở Sale Percentage)? | 8 |
| 5 | Option Select Type default là Single hay Multiple cho Quick Filters? Sheet Add case #22 cũng để ngỏ câu hỏi này. | 9 |
| 6 | Cơ chế gộp "Low Stock + In Stock" của node Stock gốc đang NG (chọn thêm option thứ 2 không OR đúng) — Quick Filters "In Stock" (vốn dựa trên đúng phép gộp này) có bị ảnh hưởng cùng bug không, hay được tính lại độc lập ở tầng khác? | 2.1 |
| 7 | Quick Filters (UI toggle) có hiển thị product count cạnh mỗi toggle không? Nếu có, node Stock/Special Offers/Featured Products gốc đều đang NG phần hiển thị count | 2.1, 2.2 |
| 8 | Popup cảnh báo "unsaved changes" khi rời màn Edit — node Stock gốc ghi nhận NG (không hiển thị) ở toàn bộ case liên quan; Quick Filters có thừa hưởng cùng bug không? | 2.1 |

## 11. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Quick Filters filter node (Add + Edit)
- **Tài liệu liên quan:** `filter-tree-common-specs.md`, `edit-filter-node-featured-products-specs.md`, `edit-filter-node-special-offers-specs.md` (2 nguồn logic chính)
- **Nguồn:** Ảnh UI Export Figma thật (`Edit filter node _ Toggle (Featured Products/Special Offers/Stock/Shipping).png`, đã đối chiếu 2 lần) + sheet test case `Add filter node - Quick Filters` (gid=199815586, 105 case) + SPEC PDF + sheet Shipping (gid=894321096, chưa thực thi)/Stock (gid=2025425783, đã fetch + rà cột Tester/Result thực tế — mục 2.1) gốc cho logic nguồn dữ liệu
- **Số câu hỏi CẦN XÁC NHẬN BA:** 8
