# Edit filter node - Product options — Specs

## 0. Nguồn gốc tài liệu

Viết từ **ảnh chụp Figma do người dùng gửi trực tiếp trong chat** (không phải link Figma + node-id — không truy cập được qua `mcp__figma__*`), gồm 3 khung màn hình: (1) "Create new filter" panel Product options ở trạng thái chưa chọn giá trị (0 selected), (2) popup con "Select filter options" đang mở, (3) cùng màn sau khi Save popup (2 selected) kèm Preview. Kèm 2 sticky note vàng gắn cạnh khung (1). Đối chiếu với 2 filter node "anh em" cùng pattern đã có spec đầy đủ: `edit-filter-node-brand-specs.md`, `edit-filter-node-category-specs.md`, và khung chung `filter-tree-common-specs.md`.

Đây là feature MỚI — chưa có sheet test case gốc nào để đối chiếu chéo (khác Brand/Category vốn viết ngược từ sheet có sẵn), toàn bộ nội dung dưới đây suy trực tiếp từ Figma + note + dữ liệu BigCommerce thật (ảnh Admin BC product mẫu "TShirt_24", xem `docs/sync-fields-glossary.md` mục 10 và `docs/bigcommerce-platform-facts.md`).

## 1. Tổng quan

Product options là 1 loại filter node thuộc nhóm **"Advanced filter"** (`filter-tree-common-specs.md` mục 5.1, cùng nhóm với Custom fields, Tools — khác nhóm "Product filter" chứa Brand/Condition/Color). Cho phép merchant tạo bộ lọc dựa trên **BigCommerce Product Variant Options** — thuộc tính tùy chỉnh theo từng sản phẩm/dòng sản phẩm (VD Shoe Size, Color), khác Brand/Category vốn là 1 field cố định áp dụng chung toàn site. Cùng pattern cấu trúc với Brand: giá trị **dynamic**, đồng bộ từ BC, chọn qua popup [Select filter options].

## 2. General Settings

| Field | Loại | Validation | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- | --- |
| Title | Text | Chưa quan sát được rõ ràng bắt buộc/rỗng qua ảnh tĩnh — suy theo pattern Brand/Category (bắt buộc, rỗng → lỗi); default = "Product options" | Config nội bộ | Ảnh Figma khung (1)/(3) |
| Title text color | Color | — | Config nội bộ | Ảnh Figma khung (1)/(3) |
| Title alignment | Radio Left/Center/Right (dạng icon) | — | Config nội bộ | Ảnh Figma khung (1)/(3) |

## 3. Filter Settings — Option name + Values

| Field | Mô tả | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- |
| Filter options — hiển thị count | Trạng thái ban đầu "0 selected"; sau khi Save popup hiển thị "N selected" (ảnh khung (3): "2 selected") | Config nội bộ (đếm) | Ảnh Figma khung (1)/(3) |
| Nút mở popup [Select filter options] | Mở popup 2 cột Option name / Values | Config nội bộ | Ảnh Figma khung (1)/(3) |

### 3.1 Popup [Select filter options] (modal con)

| Field | Mô tả | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- |
| Thanh search | "Search option name, value..." — suy theo pattern Brand: search theo cả Option name lẫn Value | Config nội bộ (thao tác) | Ảnh Figma khung (2) |
| Cột [Option name] | Danh sách Option Name của BC Variant Options (VD trong ảnh: Color, Color for Dress, Purification, Home, Entranceway), mỗi dòng kèm **product count** (VD "[204 products]") | **Sync trực tiếp** — từ `display_name` của BC Variant Options, xem `docs/sync-fields-glossary.md` mục 10 | Ảnh Figma khung (2); đối chiếu ảnh BC Admin "TShirt_24" (Option Name = Shoe Size/Color) |
| Cột [Option name] — chọn 1 | Click 1 Option → cột Values load đúng values của Option đó | Config nội bộ | Ảnh Figma khung (2) |
| Cột [Values] | Danh sách value thuộc Option đang chọn (VD Color → Scent, Black, Chlorine blue, Watermelon red, Marine), kèm **product count** riêng từng value | **Sync trực tiếp** — từ `option_values[].label`; product count = **Tính toán từ dữ liệu sync** (số Variant đang Purchasable=Enabled chứa value đó) | Ảnh Figma khung (2); đối chiếu ảnh BC Admin (Variants — cột Purchasable/SKU) |
| Chọn value | Multi-select (checkbox, tick nhiều value cùng lúc) | Config nội bộ | Ảnh Figma khung (2) |
| Nút [Save] | Chưa quan sát được rõ trạng thái disable/enable qua ảnh tĩnh — suy theo pattern Brand (disable khi chưa chọn gì) | Config nội bộ | `[CẦN XÁC NHẬN BA]` — xem mục 8 |
| Nút [Cancel] | Đóng popup — chưa quan sát được có tạo node hay không (Brand đang ghi nhận NG ở hành vi tương tự) | Config nội bộ | `[CẦN XÁC NHẬN BA]` — xem mục 8 |

**Trên MH sau khi Save** (khung (3)): hiển thị "Product options — 2 selected"; Preview bên phải hiển thị đúng danh sách 5 value đã chọn (dạng tên sản phẩm cụ thể, VD "LARQ Bottle PureVis™").

## 4. Option select type

| Field | Giá trị | Default | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- | --- |
| Option select type | Single / Multiple | Chưa xác định qua ảnh (khung (3) hiển thị "Single" nhưng chưa rõ đây là default hay do đã cấu hình sẵn) | Config nội bộ | Sticky note 1 + ảnh khung (3) |

`[CẦN XÁC NHẬN BA]` — Brand mặc định Multiple; ảnh khung (3) của Product options lại đang hiển thị "Single" — chưa đủ căn cứ khẳng định đây là default khác Brand hay chỉ là giá trị đã chọn tay trong ảnh mẫu.

## 5. Display Style

Theo sticky note 1 (trích nguyên văn): *"DISPLAY STYLE (default theo BC): Dropdown / List + Single select – Radio buttons / Grid – Rectangle list / Swatch (Khi chọn option swatch thì bật hộp thoại KH tuỳ chọn Manage swatch)"*.

| Giá trị | Mô tả | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- |
| Dropdown | — | Config nội bộ | Sticky note 1 |
| List + Single select – Radio buttons | — | Config nội bộ | Sticky note 1 |
| Grid – Rectangle list | — | Config nội bộ | Sticky note 1 |
| Swatch | Mở thêm popup [Manage Swatch] (chưa xác nhận được cấu trúc/field cụ thể riêng cho Product options qua bộ ảnh này — Figma không show trạng thái Swatch đã mở của node này) | Config nội bộ | Sticky note 1 |

**Note quan trọng — "default theo BC"**: cụm này trong sticky note gợi ý Display Style có thể liên quan tới `type` của BC Variant Option (`dropdown`/`rectangles`/`swatch`... đã xác nhận ở `docs/bigcommerce-platform-facts.md` mục 3). Chưa rõ đây là *auto map theo Type của BC* hay chỉ đơn thuần "giá trị default ban đầu gợi ý theo Type, merchant vẫn đổi tay được" — xem câu hỏi mở mục 8.

## 6. Toggle [Setup dynamic option]

**Cập nhật (2026-08-27) — mục đích đã xác nhận qua ảnh Figma thật (frame "Dynamic option" người dùng gửi trực tiếp, xem chi tiết đầy đủ ở `edit-filter-node-brand-specs.md` mục 6 — không lặp lại toàn bộ ở đây):** đây là tính năng **localization cho giá trị filter option** (tuỳ biến label/giá trị theo từng locale — đa ngôn ngữ/khu vực/tiền tệ), KHÔNG phải cơ chế "tự động thêm value mới khi sync" như suy đoán trước đây. Mở qua nút "Setup now" cạnh toggle khi ON → popup bảng "Customize filter options" (cột = locale, dòng = từng value filter option gốc, ví dụ áp dụng cho Product options: dòng sẽ là từng Value đã chọn trong popup Select filter options).

| Trạng thái Display Style | Toggle | Nguồn |
| --- | --- | --- |
| Dropdown / List / Grid | Enable (suy theo pattern Brand, chưa thấy ảnh trực tiếp riêng cho Product options) | Sticky note 2 (loại trừ) |
| Swatch | **Disable** (theo sticky note 2 gốc của Product options) | Sticky note 2, trích nguyên văn: *"nếu chọn swatch thì bị disable dynamic options"* |

`[CẦN XÁC NHẬN BA]` — **mâu thuẫn phát hiện được** (xem chi tiết ở Brand mục 6): ảnh demo "Setup dynamic option" mới (ví dụ filter "Size") cho thấy Display Style = Swatch **VÀ** toggle Setup dynamic option ON đồng thời — trái với rule "Swatch disable toggle" đã ghi nhận qua sticky note 2 riêng của Product options. Chưa rõ rule nào đúng cho Product options cụ thể — cần verify lại thực tế, không tự chọn.

## 7. Sort order

Theo sticky note 1 (trích nguyên văn): *"SORT ORDER: Alphabetical - Ascending (Mặc định)/Descending, Product number - Ascending, Product number - Descending, Custom order Cho phép KH tự custom + cách kéo thả"*.

| Option | Default | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- |
| Alphabetical - Ascending | **Có** (mặc định) | Config nội bộ | Sticky note 1 |
| Alphabetical - Descending | — | Config nội bộ | Sticky note 1 |
| Product number - Ascending | — | Tính toán từ dữ liệu sync | Sticky note 1 |
| Product number - Descending | — | Tính toán từ dữ liệu sync | Sticky note 1 |
| Custom order | — | Config nội bộ | Sticky note 1 |

Giống hệt 5 lựa chọn đã xác nhận ở Brand (`edit-filter-node-brand-specs.md` mục 7).

## 8. Add on customer group

Field "ADD ON CUSTOMER GROUP" xuất hiện trong Filter Settings (khung (1): "0 selected"; khung (3): đã chọn, hiển thị count) — cùng vị trí/tên gọi với "Hide on customer group" ở Brand/Category, nhưng **tên field trên ảnh Figma của Product options ghi là "Add on customer group"**, khác chữ "Hide" — `[CẦN XÁC NHẬN BA]`: đây là field cùng chức năng (ẩn filter với customer group được chọn) chỉ khác tên gọi trên UI, hay là 1 hành vi khác (VD "chỉ hiện filter cho group được chọn" — ngược nghĩa với Hide)? Cần đối chiếu lại khi có quyền truy cập Figma trực tiếp hoặc hỏi BA.

Nguồn dữ liệu: Sync trực tiếp (Customer Group — theo ngoại lệ đã ghi nhận ở `docs/sync-fields-glossary.md`).

## 9. Appearance settings

| Field | Mô tả | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- |
| Display tooltip (toggle) + Tooltip content | Nội dung mẫu trong ảnh: "This is the tooltip" | Config nội bộ | Ảnh Figma khung (1)/(3) |
| Show all irrelevant values (product count = 0) | Toggle | Config nội bộ | Ảnh Figma khung (1)/(3) |
| Navigation type | Dropdown, default "Infinite scroll" (khác Brand/Category gọi là "Pagination type" — Product options ghi "Navigation type", chưa rõ có phải chỉ khác tên gọi hay có thêm/bớt option so với Brand) | Config nội bộ | Ảnh Figma khung (1)/(3) — `[CẦN XÁC NHẬN BA]` tên gọi |
| Collapse/Expand on Desktop | Dropdown | Config nội bộ | Ảnh Figma khung (1)/(3) |
| Collapse/Expand on Mobile | Dropdown | Config nội bộ | Ảnh Figma khung (1)/(3) |
| Display all values in uppercase form | Toggle | Config nội bộ | Ảnh Figma khung (1)/(3) |
| Show search box on desktop | Toggle | Config nội bộ | Ảnh Figma khung (1)/(3) |
| Show search box on mobile | Toggle | Config nội bộ | Ảnh Figma khung (1)/(3) |

Cấu trúc field set giống chuẩn đã xác nhận ở Brand/Category, không phát hiện field bị thiếu so với 2 node anh em qua bộ ảnh này (sẽ đối chiếu kỹ hơn ở bước `review-figma-spec-consistency`).

## 10. Validation & giới hạn cụ thể

Không quan sát được threshold/range cụ thể nào (khác Category có "Number of filter options per click: range 5→10") qua bộ ảnh hiện có — không có mục nào ở đây tại thời điểm viết spec.

## 11. Câu hỏi mở

| # | Câu hỏi | Phân loại | Mục |
| --- | --- | --- | --- |
| 1 | Popup [Manage Swatch] khi Display Style = Swatch có tồn tại/giống hệt cấu trúc ở Brand (bảng Image/Swatch Name/Image Source/URL) hay có khác biệt riêng cho Product options? | Loại 2 | 5 |
| 2 | Type của BC Variant Option (Dropdown/Rectangles/Swatch) có tự động map/gợi ý vào Display Style của filter node hay Display Style là lựa chọn hoàn toàn độc lập của merchant? | Loại 2 | 5 |
| 3 | Rule "Swatch → Setup dynamic option disable" (sticky note 2 gốc) có còn đúng không — ảnh demo mới cho thấy 1 ví dụ (filter Size) có cả Swatch lẫn Setup dynamic option ON đồng thời | Loại 2 | 6 |
| 4 | "Add on customer group" có cùng chức năng với "Hide on customer group" ở Brand/Category (chỉ khác tên gọi UI), hay là hành vi khác? | Loại 2 | 8 |
| 5 | Nút [Save]/[Cancel] ở popup [Select filter options] có hành vi disable/tạo-node-nhầm giống Brand (đang NG: Cancel/X vẫn tạo node) không? | Loại 2 | 3.1 |
| 6 | "Navigation type" (Product options) có phải cùng field với "Pagination type" (Brand/Category) chỉ khác tên gọi, hay có thêm/bớt lựa chọn? | Loại 2 | 9 |
| 7 | Popup [Manage Swatch] khi Display Style = Swatch có dùng chung cấu trúc với Brand (bảng Image/Swatch Name/Image Source Online URL-BigCommerce/URL, Swatch border radius slider, toggle Display filter option name in swatch) không? Bộ ảnh hiện có không show trạng thái này. | Loại 2 | 5 |
| 8 | Field "Add on customer group" có đúng là cùng chức năng "ẩn filter với customer group được chọn" như Brand/Category (chỉ khác tên gọi UI), hay là hành vi ngược nghĩa (VD chỉ hiện filter cho group được chọn)? | Loại 2 | 8 |
| 9 | "Navigation type" (chỉ thấy giá trị "Infinite scroll" trong ảnh) có đủ lựa chọn "Show more" + field phụ "Number of filter options per click" giống Brand/Category không, hay dropdown chưa được mở hết trong ảnh? | Loại 2 | 9 |
| 10 | Nút [Cancel]/icon [X] ở popup [Select filter options] có bị bug NG giống Brand (vẫn tạo node dù đúng ra phải huỷ) không? | Loại 2 | 3.1 |
| 11 | Option select type default là Single hay Multiple? Ngoài ra, Brand có rule phụ "đổi Multiple→Single khi đang có sẵn nhiều value multi-selected" (đang NG ở Brand) — Product options có rule tương tự không? | Loại 2 | 4 |
| 12 | Tooltip content có giới hạn 255 ký tự giống Brand không? | Loại 2 | 9 |
| 13 | Rule "Collapse rồi Expand lại filter → mất trạng thái selected của option đã chọn" (Brand đang ghi nhận bug NG ở đây) có xảy ra tương tự với Product options không? | Loại 2 | 9 |

Câu hỏi #7-13 phát hiện qua `review-figma-spec-consistency` (đối chiếu với Brand/Category, xem `checklists/filter-node-product-options-brand-category-consistency-checklist.md`).

Không có câu hỏi Loại 1 (BC platform fact) nào phát sinh riêng cho spec này — các fact BC liên quan (cấu trúc Variant Options/Modifiers) đã tra và ghi nhận sẵn ở `docs/bigcommerce-platform-facts.md`.

## 12. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Product options filter node (Add + Edit), nhóm "Advanced filter"
- **Tài liệu liên quan:** `filter-tree-common-specs.md` (khung chung), `edit-filter-node-brand-specs.md` (pattern gần giống nhất — dynamic value + popup Select filter options), `edit-filter-node-category-specs.md`, `docs/sync-fields-glossary.md` mục 10, `docs/bigcommerce-platform-facts.md` mục 3
- **Nguồn:** Ảnh chụp Figma do người dùng gửi trực tiếp trong chat (3 khung + 2 sticky note), không qua `mcp__figma__*`; đối chiếu ảnh BC Admin thật (product "TShirt_24")
- **Số câu hỏi CẦN XÁC NHẬN BA:** 13 (toàn bộ Loại 2) — 6 câu gốc từ `extract-figma-spec` + 7 câu bổ sung từ `review-figma-spec-consistency` (đối chiếu Brand/Category, xem `checklists/filter-node-product-options-brand-category-consistency-checklist.md`)
- **Cập nhật 2026-08-27:** câu hỏi #3 gốc ("mục đích Setup dynamic option") đã được giải qua ảnh Figma thật frame "Dynamic option" — xem mục 6; thay bằng câu hỏi mới về mâu thuẫn rule Swatch disable, tổng số câu hỏi giữ nguyên 13.
