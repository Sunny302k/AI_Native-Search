# Merge Values — Specs

## 0. Nguồn gốc tài liệu

Viết từ **ảnh chụp Figma do người dùng gửi trực tiếp trong chat** (không truy cập được qua `mcp__figma__*` — session không có tool Figma; `WebFetch` link Figma chỉ trả về app shell rỗng, đúng phương án thay thế nêu ở `extract-figma-spec` Bước 2.4). Gồm các khung: màn Filter (entry point), màn Merged Values (empty state + có dữ liệu), modal Create new merged value bước ① và ②, toast thành công, dropdown nguồn mở rộng, và 1 sticky note vàng.

**Bổ sung quan trọng — 20 quyết định chốt qua trao đổi trực tiếp với người dùng (2026-09-08)**: nhiều quyết định trong số này **ghi đè cách hiểu suy ra từ ảnh Figma**, đặc biệt là việc khối "Review Filter Node" chỉ là ảnh demo tĩnh chứ không phải preview dữ liệu thật. Các mục dưới đây đã áp dụng quyết định mới, không dùng lại suy đoán cũ.

## 1. Tổng quan

Merge Values cho phép merchant **gộp nhiều filter value rời rạc thành 1 lựa chọn duy nhất hiển thị cho khách hàng**, nhằm đơn giản hoá điều hướng trên storefront. Mô tả chính thức trên card entry: *"Combine similar product options into a single, unified display."*; trong Feature Tour: *"Filter nodes can merge values from different product options under one intuitive filter option name for simpler customer navigation."*

**Kiến trúc 3 tầng** (đã xác nhận với người dùng — quan trọng để hiểu mọi rule bên dưới):

```
① TẦNG DỮ LIỆU (pool giá trị đã sync từ BigCommerce)
   ↑ Merge Values thao tác Ở ĐÂY — "Merged option được lưu trữ trong data source"
② TẦNG CẤU HÌNH (Filter Tree → Filter Node) — chỉ chọn TẬP CON value từ tầng ①
③ TẦNG STOREFRONT — nơi khách hàng nhìn thấy kết quả
```

**Trình tự bắt buộc**: merge diễn ra **trước**, filter node tạo sau sẽ "ăn theo" merge ở khâu hiển thị. Merge có **tính hồi tố** — áp dụng cả filter tree/node đã tồn tại trước khi merged value được tạo.

**Đường dẫn truy cập**: màn Filter → khối "Filter Settings" → card **Merge Values** (cùng nhóm với Filter Cache và Advanced Settings).

## 2. Màn "Merged Values" (danh sách)

| Field | Loại | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- |
| Nút back ← + tiêu đề "Merged Values" | Header | Quay lại màn Filter | Config nội bộ |
| Khối FEATURE TOUR "What is merge values ?" | Panel thu gọn được (chevron) | Nội dung: *"Use merge options for simpler customer navigation"* + bullet giải thích + ảnh minh hoạ (Arctic/Sky/Blue/Navy → node "Color") | Config nội bộ (nội dung tĩnh) |
| Nút **Create new** | Button | Xuất hiện ở **2 vị trí**: góc phải khối "Merged Value List" và giữa màn khi empty state | Config nội bộ |
| Cột **Status** | Toggle | Bật/tắt trực tiếp trên list. OFF → storefront hiển thị lại value con riêng lẻ (xem mục 5.2) | Config nội bộ |
| Cột **Values** | Text | Chuỗi các value con phân tách bằng dấu phẩy (VD "Avocado, Fern, Emerald, Lime") | Sync trực tiếp (value gốc từ BC) |
| Cột **Filter option** | Text | Tên đại diện sau khi gộp (VD "Avocado") | Config nội bộ (merchant đặt) |
| Cột **Actions** | Icon | **Edit** (bút chì) + **Delete** (thùng rác) | Config nội bộ |
| Empty state | Text + button | *"There is currently no merged value."* + nút Create new | Config nội bộ |

**Toast sau khi tạo thành công**: *"Success — Merged value is created successfully!"*

## 3. Modal "Create new merged value" — Bước ① Choose values

| Field | Loại | Mặc định | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- | --- |
| Stepper | Indicator | Bước ① active | ① Choose values → ② Merge values & Review Filter Node | Config nội bộ |
| Dropdown lọc nguồn | Multi-select checkbox | Tick hết ("All sources") | Xem mục 3.1 | Config nội bộ (lựa chọn) |
| Ô search | Text | Trống | Placeholder *"Search value"* | Config nội bộ (thao tác) |
| Danh sách value (cột trái) | Checkbox list | Không tick | Trộn value từ nhiều option khác nhau (VD Avocado, Fern, Emerald, Navy, Medium, L, XL…), có scroll | **Sync trực tiếp** — pool value đã sync từ BC |
| Panel "Selected values" (cột phải) | List | Trống | Mỗi dòng có icon thùng rác xoá riêng lẻ; link **Remove all** góc phải | Config nội bộ |
| Counter | Text | "0 selected" | Hiển thị số value đang chọn | Tính toán từ lựa chọn |
| Nút **Next** | Button | **Disable** | Disable khi 0 selected | Config nội bộ |
| Nút **Cancel** | Button | — | Đóng modal | Config nội bộ |

### 3.1 Dropdown nguồn dữ liệu

Danh sách hiển thị trong ảnh Figma: **All sources / Product options / Custom fields / Metafields / Custom filter builder**.

**Quyết định đã chốt (2026-09-08)**: **BỎ HẲN nguồn Metafields** khỏi phạm vi tính năng. Nguồn hợp lệ còn lại:

| Nguồn | Lấy dữ liệu từ đâu | Nguồn dữ liệu |
| --- | --- | --- |
| **Product options** | BC Product Variant Options (Option Name + Values) — xem `docs/sync-fields-glossary.md` mục 10 | Sync trực tiếp |
| **Custom fields** | Trường Custom Fields của BC product (cặp `Custom Field Name` – `Custom Field Value`, cả 2 bắt buộc, nhiều cặp/product) — xem `docs/sync-fields-glossary.md` mục 11 | Sync trực tiếp |
| **Custom filter builder** | Filter option do merchant tự định nghĩa trong node "My own filter" của Native Search — **KHÔNG phải dữ liệu BC** | Config nội bộ |
| **All sources** | Tuỳ chọn gộp — chọn tất cả nguồn trên | Config nội bộ (lựa chọn) |

**Lưu ý cho test case**: 2 nguồn đầu phụ thuộc chu kỳ sync (đổi bên BC phải chờ sync mới thấy); riêng Custom filter builder là config nội bộ, đổi có hiệu lực ngay — thời điểm có hiệu lực của các value con trong cùng 1 merged value có thể **lệch pha nhau**.

## 4. Modal — Bước ② Merge values & Review Filter Node

### 4.1 Khối "Merge values"

Cấu trúc dạng phép gán: `[Selected values]  =  [Filter option]`

| Field | Loại | Mô tả | Nguồn dữ liệu |
| --- | --- | --- | --- |
| **Selected values** | Text read-only (nền xám) | Hiển thị chuỗi value đã chọn ở bước ① | Sync trực tiếp |
| **Filter option** | **2 chế độ toggle qua lại** | (a) Dropdown `Select filter option` — chỉ liệt kê các value nằm trong "Selected values"; (b) Input tay `Enter filter option` — nhập tự do. Link chuyển đổi: `+ or enter manually` ↔ `+ Select filter option` | Config nội bộ |
| Nút **Back** | Button | Quay lại bước ① | Config nội bộ |
| Nút **Save** | Button | Lưu merged value | Config nội bộ |

### 4.2 Khối "Review Filter Node" — ⚠️ CHỈ LÀ ẢNH DEMO TĨNH

**Quyết định đã chốt (2026-09-08)**: khối này **KHÔNG đọc/phản ánh dữ liệu filter tree thật**, không ảnh hưởng tới giá trị thực tế — chỉ là ảnh minh hoạ giúp merchant hiểu khái niệm.

Nội dung hiển thị trong ảnh Figma (để tham khảo, **không phải dữ liệu thật cần verify**):
- `In "Filter Tree 1"`: node **Color** [Avocado (5), Emerald (2), Lime (1)] → **Color** [Avocado (8)]
- `In "Filter Tree for a Super…"`: node **Color for Dress** [Avocado (5), Marine (2), …] → **Color for Dress** [Avocado (8), Marine (2)]
- Khi Filter option còn trống: card "after" hiển thị thanh xám + **(0)**
- Tên tree dài bị cắt kèm dấu `…`

**Hệ quả cho test case**: KHÔNG viết case verify độ chính xác dữ liệu trong khối này. **Storefront là điểm đối chiếu THẬT DUY NHẤT** — Admin không có màn preview thật nào khác (popup [Select filter options] chỉ là nơi cấu hình, không phải nơi verify).

## 5. Business rule & dependency

### 5.1 Rule gốc từ sticky note (trích nguyên văn)

> **Merge theo source**
> • Color: mặc định sẽ add sẵn hết các giá trị
> • Shared variant options -- check với dev: có lấy riêng được giá trị color k?
> • Shared modifier options -- check với dev: có lấy riêng được giá trị color k?
> • Custom fields
> • Metafields
> • Custom filter builder
>
> **Rule**
> • Filter tree A: opt1 và opt2 merge vào opt3
> • Num of products in opt3 = num of products in opt1 + num of products in opt2
> • Filter tree B: có opt1 bị merge vào opt3 nhưng k có opt2 -> opt1 biến mất sau khi sync data
> • Merged option được lưu trữ trong data source

**Diễn giải theo luồng đã chốt (2026-09-08)** — có 2 điểm note gốc đã **lỗi thời/không còn đúng**:

| Note gốc | Trạng thái hiện tại |
| --- | --- |
| `num opt3 = num opt1 + num opt2` (cộng thuần) | ❌ **Đã thay đổi** — count sau merge là **đếm DISTINCT**, mỗi sản phẩm chỉ tính 1 lần dù thuộc nhiều value trong nhóm (xem 5.3) |
| `Filter tree B: opt1 biến mất sau khi sync data` | ❌ **Không còn là kịch bản lo ngại** — theo luồng mới (merge trước, hồi tố, cơ chế "tất cả hoặc không gì"), node chỉ chứa 1 phần value vẫn hiển thị trọn vẹn merged value, không mất lựa chọn |
| `Merged option được lưu trữ trong data source` | ✅ **Vẫn đúng** — merge ghi xuống tầng dữ liệu, đây là lý do merge có tính hồi tố và tác động lên mọi filter node |
| `Metafields` là 1 nguồn | ❌ **Đã bỏ khỏi phạm vi** |

### 5.2 Rule phụ thuộc chéo (dạng "field A = X → hành vi B")

| # | Rule | Ghi chú |
| --- | --- | --- |
| R1 | **Merge tác động ở khâu HIỂN THỊ, không ở khâu CHỌN** | Popup [Select filter options] của filter node vẫn hiển thị value con riêng lẻ dạng checkbox y như chưa merge; chỉ Preview + storefront mới hiển thị dạng đã gộp |
| R2 | **Cơ chế "tất cả hoặc không gì"** — node chọn **≥1** value con của 1 merge group → Preview + storefront hiển thị **trọn vẹn dữ liệu gộp của CẢ group** | Không có trạng thái hiển thị "một phần" của merge group. VD node chỉ tick Emerald → vẫn hiện tên chung + count cả nhóm |
| R3 | **Merge có tính hồi tố** | Áp dụng cho cả filter tree/node đã tồn tại TRƯỚC khi merged value được tạo |
| R4 | **Status = OFF** → Preview + storefront hiển thị lại các value con **riêng lẻ**, không hiển thị merged value | Dữ liệu merge vẫn giữ (không mất cấu hình) |
| R5 | **1 value con KHÔNG được thuộc nhiều merged value cùng lúc** | Value đã dùng bị **disable** ở danh sách chọn của merged value khác |
| R6 | **Delete merged value** → value con rollback hoàn toàn về hiển thị riêng lẻ | **KHÔNG có popup xác nhận** — khác pattern chung của dự án (Filter Tree khi xoá CÓ popup *"Delete filter tree? …"*), cần lưu ý khi test để không nhầm là bug |
| R7 | **Trong lúc sync**: merged value luôn hiển thị theo **giá trị sync mới nhất** | BC thêm/sửa/xoá value → sync sang → merged value bị ảnh hưởng theo |
| R8 | **Merged value KHÔNG có cấu hình Setup dynamic option** (localization) riêng | Khác với filter node Brand/Product options vốn có toggle này |

### 5.3 Công thức count sau merge

**Đếm DISTINCT** — mỗi sản phẩm chỉ tính **1 lần** dù thuộc bao nhiêu value trong nhóm merge.

Ví dụ minh hoạ:

| Sản phẩm | Value đang có |
| --- | --- |
| A | Avocado |
| B | Avocado |
| C | **Avocado + Emerald** (1 sản phẩm, 2 value) |
| D | Emerald |
| E | Lime |

Count trước merge: Avocado = 3 · Emerald = 2 · Lime = 1
→ Count sau merge = **5** (đếm distinct {A,B,C,D,E}), **KHÔNG phải 6** (3+2+1 cộng thuần).

`[CẦN XÁC NHẬN BA]` — xem câu hỏi mở #1 về thuật ngữ "giao" vs "hợp".

## 6. Edit / Delete merged value

| Thao tác | Hành vi đã chốt |
| --- | --- |
| **Edit** (icon bút chì) | Cho sửa **thêm/bớt value con** VÀ **đổi tên Filter option** |
| **Delete** (icon thùng rác) | Value con **rollback hoàn toàn** về hiển thị riêng lẻ; **KHÔNG có popup xác nhận** |
| **Toggle Status** | ON/OFF trực tiếp trên list — OFF → hiển thị lại value con riêng lẻ (R4) |

`[CẦN XÁC NHẬN BA]` — chưa rõ Edit có mở lại đúng modal 2 bước như Create hay dùng modal rút gọn riêng; và khi Edit có hiển thị cảnh báo tác động không.

## 7. Validation & giới hạn cụ thể

| Field/Thao tác | Rule |
| --- | --- |
| Số value tối thiểu để merge | **≥ 2 value** — chọn 1 value thì hệ thống yêu cầu chọn thêm |
| Số value tối đa | **Chưa giới hạn** |
| Nút Next (bước ①) | Disable khi **0 selected** |
| Tên Filter option — rỗng | **Chặn** |
| Tên Filter option — trùng tên đã tồn tại | **Chặn** |
| Tên Filter option — độ dài | **Tối đa 255 ký tự** |

## 8. Câu hỏi mở

| # | Câu hỏi | Phân loại | Mục |
| --- | --- | --- | --- |
| 1 | **Thuật ngữ công thức count**: người dùng trả lời *"lấy giao, chỉ count sản phẩm 1 lần"* — câu làm rõ khớp nghĩa **HỢP/distinct** (sản phẩm có value A HOẶC B đều tính, mỗi sản phẩm 1 lần), đang làm việc theo giả định này. Nếu ý thật là **GIAO** (chỉ đếm sản phẩm có ĐỦ CẢ các value) thì phải sửa lại toàn bộ expected result về count. *(Củng cố giả định HỢP: mockup Figma cho merged count 8 > count từng value con 5/2/1 — nếu là GIAO thì count merged phải NHỎ HƠN mọi value con)* | Loại 2 | 5.3 |
| 2 | **Swatch**: value bị merge có swatch image khác nhau → merged value hiển thị swatch nào? *(người dùng sẽ confirm sau)* | Loại 2 | — |
| 3 | **Filter Cache**: tạo/sửa/xoá merged value có bắt buộc refresh Filter Cache không? *(người dùng sẽ confirm sau)* | Loại 2 | — |
| 4 | **Merchandise Campaign**: campaign đang trỏ tới value đã bị merge còn hoạt động đúng không? *(chưa được trả lời)* | Loại 2 | — |
| 5 | **Shared variant options / Shared modifier options** (sticky note gốc, designer tự để ngỏ hỏi dev): có lấy riêng được giá trị color không? — người dùng chỉ đạo *"lấy theo giá trị dropdown"*, tức coi như nằm trong nhóm "Product options", nhưng chưa có xác nhận trực tiếp từ dev | Loại 2 | 3.1 |
| 6 | **"Color: mặc định sẽ add sẵn hết các giá trị"** (sticky note gốc) — nghĩa chính xác là gì? Khi chọn nguồn liên quan Color thì tự tick sẵn toàn bộ value? | Loại 2 | 5.1 |
| 7 | **Edit flow**: mở lại đúng modal 2 bước như Create, hay modal rút gọn? Có cảnh báo tác động không? | Loại 2 | 6 |
| 8 | **Merged value không được node nào dùng**: merchant gộp 2 value mà chưa filter node nào đang dùng → merged value đó tồn tại ở data source nhưng chưa hiển thị ở đâu, đúng không? | Loại 2 | 1 |

Không có câu hỏi Loại 1 (BC platform fact) phát sinh riêng cho spec này — cấu trúc BC Variant Options và Custom Fields đã ghi nhận sẵn ở `docs/sync-fields-glossary.md` mục 10-11 và `docs/bigcommerce-platform-facts.md`.

## 9. Metadata

- **Feature:** Filter — Merge Values (màn List + modal Create 2 bước + Edit/Delete)
- **Tài liệu liên quan:**
  - `filter-tree-common-specs.md` — khung Filter Tree; đã ghi nhận 2 rule liên quan: (a) Status ON/OFF của filter tree quyết định hiển thị đồng thời ở storefront **và màn Merge Value**; (b) xoá filter tree → biến mất khỏi cả Filter Tree List, storefront **và Merge Value**
  - `docs/sync-fields-glossary.md` mục 10 (Product Variant Options), mục 11 (Product Custom Fields)
  - `edit-filter-node-product-options-specs.md` — filter node dùng chung nguồn Product options
- **Nguồn:** Ảnh chụp Figma người dùng gửi trực tiếp trong chat (7 khung + 1 sticky note), không qua `mcp__figma__*` + 20 quyết định chốt qua trao đổi trực tiếp (2026-09-08)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 8 (toàn bộ Loại 2)
- **Cấu trúc đề xuất cho test case:** 3 nhóm màn hình — (1) Merged Values List, (2) Create new merged value (modal 2 bước), (3) Edit/Delete merged value
