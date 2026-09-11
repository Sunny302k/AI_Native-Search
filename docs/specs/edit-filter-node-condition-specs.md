# Edit filter node - Condition — Specs

## 0. Nguồn gốc tài liệu

Không có quyền truy cập Figma trực tiếp (không có MCP Figma khả dụng trong phiên này). Người dùng gửi trực tiếp 3 ảnh chụp màn hình thật vào chat:

1. Sticky note vàng **"Filter options (by default)"** — nội dung default option list, Option select type, Display style.
2. Frame **Edit filter node - Condition** (panel General Settings / Filter Settings / Appearance Settings + Preview).
3. Frame **Create new filter** (khung builder chung, General Setting + Filter Nodes panel, Condition node đã add).

Đối chiếu chéo bổ sung với `test-cases/filter/filter-tree/edit-filter-node-condition/edit-filter-node-condition_testcase.csv` (54 case, đã có sẵn trong dự án trước khi viết spec này) cho các field/rule không quan sát được trực tiếp trên ảnh (VD: field bị cắt ngoài vùng chụp, hành vi validate). Field/rule lấy từ nguồn này được ghi rõ "Nguồn: test case" thay vì "Nguồn: ảnh Figma" ở cột tương ứng. Tham chiếu khung dùng chung ở `filter-tree-common-specs.md` và pattern loại filter node anh em ở `edit-filter-node-brand-specs.md`.

## 1. Tổng quan

Condition là loại filter node lấy giá trị từ field `condition` của Product trên BigCommerce. Khác Brand (option list **động**, đồng bộ tuỳ theo dữ liệu store), Condition có option list **cố định do chính nền tảng BigCommerce quy định**: `New` / `Used` / `Refurbished` — đây là enum cứng ở tầng BC (đã xác nhận qua BigCommerce Developer Docs, xem `docs/bigcommerce-platform-facts.md` mục 3, entity "Products — Condition"), không phải danh sách do merchant tự thêm/bớt. Vì vậy Add flow của Condition **không có** popup "Select filter options" như Brand — cả 3 option luôn có sẵn ngay khi tạo node, merchant chỉ được ẩn/hiện (checkbox) và đổi label hiển thị.

## 2. General Settings

| Field | Loại | Validation | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- | --- |
| Title | Text | Bắt buộc, rỗng → lỗi; default = "Condition" | Config nội bộ | Ảnh (default) + test case (required — EFNCOND_TC05) |
| Title text color | Color | — | Config nội bộ | Ảnh |
| Title alignment | Radio Left/Center/Right | — (Left mặc định theo ảnh) | Config nội bộ | Ảnh |

## 3. Filter options

| Field | Mô tả | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- |
| Checkbox New / Used / Refurbished | Ẩn/hiện option trên storefront; cả 3 option **luôn tồn tại sẵn** (không qua bước chọn như Brand), mặc định cả 3 đều checked | Config nội bộ (bật/tắt); **option list gốc = BC platform fact cố định** | Ảnh + `docs/bigcommerce-platform-facts.md` |
| Text input label dưới mỗi checkbox | Đổi label hiển thị trên storefront (VD "New" → "Brand New"), độc lập với giá trị `condition` thật của product | Config nội bộ | Ảnh (field nhìn thấy) + test case (hành vi save/validate — EFNCOND_TC20→24) |
| Product count cạnh mỗi option (Preview) | Số sản phẩm có `condition` tương ứng, tính trên dữ liệu đã sync | **Sync trực tiếp** (`products.condition`, xem `docs/sync-fields-glossary.md`) | Ảnh (số 5/2/6 và 5/2/2 ở 2 frame — khác nhau do khác thời điểm chụp, không phải rule) |

## 4. Option select type

| Field | Giá trị | Default | Nguồn |
| --- | --- | --- | --- |
| Option select type | Single / Multiple | **Single** (khác Brand — default Multiple) | Ảnh |

## 5. Display Style

| Field | Giá trị | Default | Nguồn |
| --- | --- | --- | --- |
| Display Style | List / Grid | **List** | Ảnh |

Sticky note chỉ liệt kê 2 giá trị List/Grid cho Condition — **không có Swatch** (khác Brand, vốn có thêm Swatch + màn Manage Swatch riêng), hợp lý vì Condition không phải dữ liệu màu/ảnh.

## 6. Sort Order

Khác Brand (popup [Sort Order] với 5 lựa chọn Alphabetical Asc/Desc, Product number Asc/Desc, Custom order), Condition **không có popup lựa chọn kiểu sort** — chỉ có 1 danh sách kéo-thả trực tiếp trong panel (3 dòng New/Used/Refurbished), tương đương thẳng "Custom order". Hợp lý vì chỉ có đúng 3 giá trị cố định, không cần sort theo alphabet/product count.

| Field | Mô tả | Nguồn |
| --- | --- | --- |
| Danh sách kéo-thả New/Used/Refurbished | Đổi thứ tự hiển thị trên storefront | Ảnh |

## 7. Hide on customer group

Cùng pattern đã dùng chung cho các loại filter node khác (xem `edit-filter-node-brand-specs.md` mục 8): popup [Select customer group], search 1 phần/toàn phần, danh sách **Sync trực tiếp** từ BC (xem ngoại lệ Customer Group trong `docs/sync-fields-glossary.md`).

| Field | Mô tả | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- |
| Hide on customer group | "0 selected" mặc định + nút [Edit] mở popup chọn | Config nội bộ (lựa chọn); danh sách nguồn = Sync trực tiếp | Ảnh |

## 8. Appearance settings

| Field | Mô tả | Default | Nguồn |
| --- | --- | --- | --- |
| Display tooltip | Toggle ON/OFF | ON (theo ảnh) | Ảnh |
| Tooltip content | Text, hiển thị khi Display tooltip = ON | "Condition filter helps customers to find…" — **nội dung bị cắt trong ảnh chụp, chưa có full text** | Ảnh (không đầy đủ) |
| Collapse/Expand (Desktop) | Dropdown Expand/Collapse | Expand | Ảnh |
| Collapse/Expand (Mobile) | Dropdown Expand/Collapse, độc lập với Desktop | Expand | Ảnh |
| Display all values in uppercase form | Toggle ON/OFF | OFF | Ảnh |
| Show search box on desktop | Toggle ON/OFF | OFF | Ảnh |
| Show search box on mobile | Toggle ON/OFF | OFF | Ảnh |
| Show all irrelevant values | Toggle ON/OFF | Không quan sát được trên ảnh (nằm ngoài vùng chụp/cần cuộn thêm) | Test case (EFNCOND_TC42) |
| Pagination type | Dropdown (VD Pagination/Show more/Infinite scroll — theo pattern Brand) | Không quan sát được trên ảnh | Test case (EFNCOND_TC43) |

`[CẦN XÁC NHẬN BA]` — nội dung đầy đủ của Tooltip content mặc định (đang bị cắt "Condition filter helps customers to find…") và vị trí chính xác/option đầy đủ của "Show all irrelevant values", "Pagination type" (chỉ suy ra từ test case, chưa xác nhận lại qua ảnh Figma đầy đủ vùng cuộn).

## 9. Khung builder chung (không lặp lại chi tiết)

Màn "Create new filter" (frame thứ 3) là khung builder dùng chung cho mọi loại filter node — General Setting (Filter Name, Applied for Page/Category), Filter Nodes panel (Add/Edit/kéo-thả node), Save Changes, Save to template, cảnh báo unsaved changes. Toàn bộ đã tài liệu hoá ở `filter-tree-common-specs.md` mục 3 — không lặp lại ở đây. Không phát hiện quirk/khác biệt riêng của Condition ở tầng khung builder này qua ảnh hoặc test case hiện có.

## 10. Business rule & dependency

> Sticky note "Filter options (by default)": *"Condition: New / Used / Refurbished"* / *"OPTION SELECT TYPE: Single, Multiple"* / *"DISPLAY STYLE: List, Grid"*

Diễn giải: đây là giá trị mặc định khi tạo mới node Condition — không phải rule phụ thuộc chéo, chỉ là default value cho 3 field General/Option select type/Display style.

Các rule dưới đây **không có trong sticky note**, lấy từ test case đã có sẵn (đối chiếu bổ sung, không bịa):

- **Label A → uncheck tất cả 3 option → chặn Save.** Phải chọn tối thiểu 1 option, không được để filter trống hoàn toàn (EFNCOND_TC11).
- **Đổi label hiển thị không đổi giá trị filter logic thật.** Đổi label "New" → "Brand New" rồi filter theo label mới, kết quả vẫn lọc đúng theo `condition = New` trên BC — label chỉ là lớp hiển thị (EFNCOND_TC23).
- **Display tooltip toggle phụ thuộc Tooltip content.** Không cho bật toggle Display tooltip khi Tooltip content đang rỗng (EFNCOND_TC41) — field A (content) rỗng → chặn field B (toggle) bật.

## 11. Validation & giới hạn cụ thể

| Field | Giới hạn | Nguồn |
| --- | --- | --- |
| Title | Bắt buộc, không rỗng | Test case (EFNCOND_TC05) |
| Label mỗi option (New/Used/Refurbished) | Bắt buộc, không rỗng | Test case (EFNCOND_TC22) |
| Filter options (checkbox) | Phải chọn tối thiểu 1/3 option | Test case (EFNCOND_TC11) |
| Display tooltip | Không cho bật khi Tooltip content rỗng | Test case (EFNCOND_TC41) |

## 12. Câu hỏi mở

`[CẦN XÁC NHẬN BA]`

1. Nội dung đầy đủ của Tooltip content mặc định — ảnh chụp bị cắt ở "Condition filter helps customers to find…".
2. Vị trí/option đầy đủ chính xác của 2 field "Show all irrelevant values" và "Pagination type" trong Appearance settings — hiện chỉ suy ra từ test case đã có (EFNCOND_TC42, TC43), chưa xác nhận lại bằng ảnh Figma đầy đủ vùng cuộn xuống.
3. Đổi label 2 option trùng nhau (VD label "Used" trùng "New") — hệ thống xử lý thế nào (chặn save / cho phép / tự thêm hậu tố)? Chưa có rule rõ ràng, kể cả ở test case (EFNCOND_TC24, đã tự đánh dấu `<cần confirm>`).

**Không đưa vào danh sách này** (đã thuộc phạm vi xử lý riêng của luồng test sync, không phải câu hỏi thiết kế): các câu hỏi về hành vi khi sync đang In Progress, product bị ẩn theo channel, product out-of-stock, customer group nguồn bị xoá sau khi node đã Save — các câu hỏi này đã nằm sẵn trong test case (`<cần confirm>` tại EFNCOND_TC13, 14, 19, 34, 36) và một phần đã được log ở `docs/bigcommerce-platform-facts.md` mục 4 (Loại 2 — đã/đang gửi BA).

## 13. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Condition filter node (Edit)
- **Tài liệu liên quan:** `filter-tree-common-specs.md` (khung builder chung), `edit-filter-node-brand-specs.md` (feature anh em cùng pattern, đối chiếu điểm khác nhau), `docs/sync-fields-glossary.md`, `docs/bigcommerce-platform-facts.md`
- **Nguồn:** 3 ảnh chụp màn hình thật do người dùng gửi trực tiếp (2026-08-13) — sticky note "Filter options (by default)", frame Edit filter node - Condition, frame Create new filter (khung builder). Đối chiếu bổ sung với `edit-filter-node-condition_testcase.csv` (54 case, có sẵn trong dự án) cho field/rule ngoài vùng ảnh chụp.
- **Số câu hỏi CẦN XÁC NHẬN BA:** 3
- **Field theo Nguồn dữ liệu:** Config nội bộ: 13 · Sync trực tiếp: 3 (product count theo condition, danh sách customer group, option list gốc = BC platform fact) · Tính toán từ dữ liệu sync: 0 · Chưa xác định: 0
