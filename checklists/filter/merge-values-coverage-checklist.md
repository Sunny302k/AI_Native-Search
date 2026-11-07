# Coverage checklist - merge-values

Audit lại ngày 2026-11-04, đối chiếu 3 nguồn:
- Spec `docs/specs/merge-values-specs.md`
- Figma Filter `HEHliiNcCQ0tnHxc0XcM3d`, section **Merge Values** (`972:26502`), đọc trực tiếp qua MCP: màn list (`1014:18282`, `917:18708`), modal bước ① (`917:19218`, `2433:43044`), bước ② (`2436:43616`, `2436:44091`, `2436:44393`), dropdown nguồn (`1014:16849`), toast (`1299:17693`), màn Filter (`3155:34303`), sticky note (`1094:59718`)
- Spec liên quan có nhắc Merge Values: `filter-tree-common-specs.md`, `filter-advanced-settings-specs.md`, `merchandise-campaign-specs.md`, `merchandise-product-ranking-specs.md`, `pricing-compare-plans-specs.md`

File test case được audit: `test-cases/filter/merge-values/merge-values_testcase.csv`, gồm 78 case (`1`→`78`). Không có file matrix riêng: 8 case matrix đã được gộp vào ID 35→42.

## Tổng quan

- Tổng số rule: **56** (48 rule của feature + 8 rule ảnh hưởng chéo)
- Covered: **37**
- Partial: **13**
- Not covered: **6**

## Chi tiết

### Màn Merged Values (list) — spec mục 2 + Figma `1014:18282`, `3155:34303`

- [x] AC-01 — Card [Merge Values] ở khối Filter Settings, mô tả "Combine similar product options into a single, unified display." — Covered — TC: 1 (lưu ý: Expected bước 2 đang kiểm tra mô tả card **sau khi** đã chuyển màn, trong khi card nằm ở màn Filter, nên cần đưa phần kiểm tra mô tả lên trước bước click)
- [ ] AC-02 — Nút back ← quay lại màn Filter — Not covered — không có case nào bấm ←
- [x] AC-03 — Feature Tour: nội dung + thu gọn/mở — Covered — TC: 2, 3
- [x] AC-04 — Nút [Create new] ở 2 vị trí, cùng mở 1 modal — Covered — TC: 5, 6
- [x] AC-05 — Empty state "There is currently no merged value." — Covered — TC: 4
- [x] AC-06 — Cột Values / Filter option hiển thị đúng dữ liệu — Covered — TC: 7
- [x] AC-07 — Đủ 4 cột, Actions có Edit + Delete — Covered — TC: 8
- [x] AC-08 — Toast "Success — Merged value is created successfully!" — Covered — TC: 9, 35, 36, 37
- [ ] AC-09 — Toast có nút × đóng (Figma `1299:17693`) — Not covered — mức thấp, có thể gộp vào TC 9

### Modal bước ① Choose values — spec mục 3 + Figma `917:19218`, `2433:43044`

- [~] AC-10 — Stepper: bước ① active ở bước 1, cả 2 bước active ở bước 2 — Partial — TC: 10 (chỉ kiểm tra trạng thái ở bước 1; Figma bước 2 cho thấy số ② chuyển cam)
- [ ] AC-11 — Nút × góc phải modal đóng modal, không lưu (có ở cả 2 bước trên Figma) — Not covered — TC 20 chỉ test [Cancel]
- [x] AC-12 — Dropdown nguồn mặc định "All sources", tick hết — Covered — TC: 14
- [x] AC-13 — Search value: khớp / không khớp — Covered — TC: 15, 16
- [~] AC-14 — Danh sách value trộn nhiều option, có scroll — Partial — TC: 17 (thiếu case danh sách dài: scroll được, selection không mất)
- [x] AC-15 — Panel Selected values: xoá từng dòng + Remove all — Covered — TC: 18, 19
- [x] AC-16 — Counter "N selected" — Covered — TC: 17, 18, 19
- [x] AC-17 — [Next] disable khi 0 selected — Covered — TC: 39
- [x] AC-18 — [Cancel] đóng modal, không lưu — Covered — TC: 20

### Nguồn dữ liệu — spec mục 3.1 + Figma `1014:16849`

- [x] AC-19 — Nguồn Product options — Covered — TC: 11
- [x] AC-20 — Nguồn Custom fields — Covered — TC: 12
- [x] AC-21 — Nguồn Custom filter builder — Covered — TC: 13
- [~] AC-22 — All sources = hợp các nguồn; multi-select nhiều nguồn — Partial — TC: 14 (chỉ kiểm tra trạng thái tick, chưa kiểm tra danh sách value = hợp 3 nguồn; chưa có case tick 2 nguồn cùng lúc)
- [ ] AC-23 — **Metafields đã bỏ khỏi phạm vi** → dropdown chỉ còn 4 lựa chọn — Not covered — không case nào kiểm tra Metafields không xuất hiện. **Figma vẫn vẽ Metafields** trong dropdown → xem câu hỏi N1 trước khi viết case
- [x] AC-24 — Lệch pha hiệu lực: nguồn BC chờ sync, nguồn nội bộ có hiệu lực ngay — Covered — TC: 61, 78 (đều `<cần confirm>`)

### Modal bước ② — spec mục 4 + Figma `2436:43616`, `2436:44091`, `2436:44393`

- [x] AC-25 — Ô Selected values read-only — Covered — TC: 22
- [x] AC-26 — Filter option 2 chế độ (dropdown ↔ nhập tay) — Covered — TC: 23, 24, 25
- [x] AC-27 — Dropdown chỉ liệt kê value đã chọn — Covered — TC: 26
- [x] AC-28 — [Back] quay lại bước ①, giữ selection — Covered — TC: 28
- [x] AC-29 — [Save] tạo thành công, Status = ON — Covered — TC: 35, 36, 37
- [x] AC-30 — Review Filter Node là ảnh demo tĩnh — Covered — TC: 27 (Note đang gắn `<cần confirm>` dù spec ghi đã chốt 2026-09-08 → nên gỡ tag)

### Rule phụ thuộc chéo R1–R8 — spec mục 5.2

- [x] AC-31 (R1) — Popup [Select filter options] của node vẫn hiện value con riêng lẻ — Covered — TC: 33
- [~] AC-32 (R2) — Node chọn ≥1 value con → hiện trọn merged value — Partial — TC: 29, 30 (TC 30 mới kiểm tra tên + count; chưa kiểm tra **click lọc** từ node chỉ chọn Emerald trả về sản phẩm của cả nhóm)
- [x] AC-33 (R3) — Merge hồi tố với node tạo trước — Covered — TC: 32
- [~] AC-34 (R4) — Status OFF → value con hiện lại riêng lẻ — Partial — TC: 43, 44 (Expected "mỗi node hiển thị lại các value con" chưa tách theo cấu hình node. Theo R2, node chỉ chọn Emerald thì sau OFF **chỉ** hiện Emerald, không hiện cả nhóm. Cần tách 2 nhánh: node chọn đủ / node chọn 1 phần)
- [~] AC-35 (R5) — 1 value không thuộc 2 merged value; value đã dùng bị disable — Partial — TC: 21 (mới test lúc tạo mới; thiếu ngữ cảnh **Edit**: value của chính merged value đang sửa vẫn chọn được, value của merged value khác bị disable)
- [~] AC-36 (R6) — Delete: không popup, value con rollback — Partial — TC: 50, 51 (TC 51 cùng vấn đề với AC-34: rollback phải theo đúng value con mà từng node đã chọn)
- [x] AC-37 (R7) — Hiển thị theo dữ liệu sync mới nhất — Covered — TC: 66, 67, 69, 77
- [x] AC-38 (R8) — Không có Setup dynamic option — Covered — TC: 52
- [ ] AC-39 — R1/R2/R4 ghi "**Preview** + storefront" hiển thị dạng gộp — Not covered — không case nào kiểm tra Preview của Filter Tree. Spec tự mâu thuẫn: mục 4.2 lại ghi "storefront là điểm đối chiếu thật duy nhất". Cần chốt N2 trước khi viết case

### Count — spec mục 5.3

- [x] AC-40 — Count đếm distinct — Covered — TC: 31, 71 (đều `<cần confirm>` hợp/giao)

### Edit / Delete — spec mục 6

- [~] AC-41 — Edit thêm/bớt value con — Partial — TC: 46, 47 (TC 47 thiếu Precondition node nào đang chọn Lime nên Expected "Lime hiện lại riêng lẻ" không xác định được ở node nào; thiếu biên **bớt xuống còn 1 value**, vì rule tối thiểu 2 value ở mục 7 cũng áp dụng cho Edit)
- [x] AC-42 — Edit đổi tên Filter option — Covered — TC: 48, 49

### Validation — spec mục 7

- [x] AC-43 — Tối thiểu 2 value (khi tạo) — Covered — TC: 38
- [ ] AC-44 — Không giới hạn số value tối đa — Not covered — chưa có case merge số lượng lớn (VD 50+ value) để kiểm tra hiển thị cột Values, count, storefront
- [x] AC-45 — Tên rỗng bị chặn (khi tạo) — Covered — TC: 40
- [x] AC-46 — Tên trùng bị chặn — Covered — TC: 41 (tạo), 49 (Edit)
- [x] AC-47 — Tên tối đa 255 ký tự — Covered — TC: 37, 42
- [~] AC-48 — Validation tên áp dụng khi **Edit** (rỗng, 256 ký tự) — Partial — TC: 49 (mới có trùng tên; thiếu rỗng và 256 ký tự khi Edit)

### Ảnh hưởng chéo — rule lấy từ spec của feature khác

- [~] AC-X01 — Status filter tree ON/OFF ↔ màn Merge Value (`filter-tree-common-specs.md`) — Partial — TC: 53, 54 (Expected đang `<cần confirm>`)
- [~] AC-X02 — Xoá filter tree → "biến mất khỏi Merge Value" (`filter-tree-common-specs.md`) — Partial — TC: 55, 56 (Expected viết ngược với chữ trong tài liệu Filter Tree, chờ BA chốt)
- [x] AC-X03 — URL SEO-friendly / Shorten dùng text merge (`filter-advanced-settings-specs.md` 3.3) — Covered — **ở file khác**: `filter-advanced-settings_testcase.csv` TC 63–83, 124
- [x] AC-X04 — Smart filter search chỉ khớp text merge, không khớp tên value con (Advanced Settings 3.4 #15) — Covered — file Advanced Settings TC 34
- [~] AC-X05 — Merged value tính là 1 option cho rule "Hide filter node with only one filter option" (Advanced Settings 3.5 #5) — Partial — file Advanced Settings TC 112 mới phủ chiều **merge làm node còn 1 option → ẩn node**. Chưa có chiều ngược lại: tắt Status / Delete / Edit bớt value → node có lại ≥2 option → **hiện lại**
- [x] AC-X06 — Show product count, chip Refine by với merged value — Covered — file Advanced Settings TC 46, 59
- [~] AC-X07 — Merchandise Campaign: condition **Product Options** chọn value đã gộp (`merchandise-campaign-specs.md` dòng 28; Q23 ở `checklists/merchandise/merchandise-setup-base-score-design-issues.md`) — Partial — TC: 64, 65 (Precondition đang viết "campaign dùng **action Filter** theo value Emerald". Spec Merchandise hiện có cho thấy điểm chạm thật là **condition Product Options**, dùng chung cho Hide/Bury/Filter results/Boost-Deboost và Bulk Edit base score. Cần viết lại tiền đề theo condition và giữ `<cần confirm>` tới khi Q23 được trả lời)
- [x] AC-X08 — Pricing: Merging Values có ở mọi gói, không khoá — Covered — ở file khác: `compare-plans_testcase.csv` (dòng 20 của từng gói)

## Gap cần bổ sung

| # | Rule | Trạng thái | Gợi ý xử lý | Skill |
|---|---|---|---|---|
| 1 | AC-02 nút back | Not covered | 1 case: bấm ← quay lại màn Filter | `create-functional-testcase` |
| 2 | AC-11 nút × modal | Not covered | 2 case: × ở bước ① và × ở bước ② sau khi đã nhập tên → đóng, không tạo | `create-functional-testcase` |
| 3 | AC-44 không giới hạn số value | Not covered | 1 case Edge: merge 50+ value | `create-functional-testcase` |
| 4 | AC-09, AC-10, AC-14, AC-22 | Not covered / Partial | Toast ×; stepper bước ②; scroll danh sách dài; All sources = hợp nguồn + tick 2 nguồn | `create-functional-testcase` |
| 5 | AC-34, AC-36, AC-41 (R2 × R4/R6/Edit) | Partial | **Sửa Expected** TC 43, 47, 51: tách nhánh node chọn đủ value con / node chọn 1 phần; thêm Precondition cấu hình node | Sửa case có sẵn (nên chạy `review-testcase-quality` sau khi sửa) |
| 6 | AC-32 (R2) | Partial | Bổ sung bước click lọc vào TC 30 | Sửa case có sẵn |
| 7 | AC-35, AC-41, AC-48 (ngữ cảnh Edit) | Partial | Edit: value của chính nó enable / của nhóm khác disable; bớt còn 1 value; tên rỗng; 256 ký tự | `create-functional-testcase` |
| 8 | AC-X05 chiều ngược | Partial | 3 case Integration: Status OFF / Delete / Edit bớt → node bị ẩn hiện lại. Nên đặt ở file Advanced Settings, cạnh TC 112 | `create-impact-testcase` |
| 9 | AC-X07 Merchandise | Partial | Viết lại TC 64, 65 theo condition Product Options; chờ Q23 | `create-impact-testcase` |
| 10 | AC-23, AC-39, AC-X01, AC-X02 | Not covered / Partial | **Chưa viết** — chờ trả lời N1, N2 và 2 rule Filter Tree | — |

## Câu hỏi mới phát sinh từ lần audit này

| # | Câu hỏi | Vì sao hỏi | Giả thuyết đề xuất |
|---|---|---|---|
| N1 | Dropdown nguồn trên Figma vẫn có **Metafields**, trong khi spec đã chốt bỏ (2026-09-08). Bản build sẽ hiển thị 4 hay 5 lựa chọn? | Figma = spec theo CLAUDE.md, nhưng quyết định chốt sau Figma | 4 lựa chọn; Figma chưa cập nhật |
| N2 | R1/R2/R4 ghi "Preview + storefront", mục 4.2 ghi "storefront là điểm đối chiếu thật duy nhất". Preview ở màn Edit filter tree có hiển thị merged value không? | Quyết định có viết case cho Preview hay không | Có: Preview của Filter Tree hiển thị dạng gộp như storefront |
| N3 | Danh sách value ở bước ① (Figma) không ghi value thuộc option/nguồn nào. Nếu 2 option khác nhau cùng có value "Black" thì list hiện 1 hay 2 dòng, merge theo tên hay theo cặp option + value? | Ảnh hưởng R5 (disable), count và storefront | Hiện 2 dòng kèm tên option; merge theo cặp option + value |
| N4 | Filter option nhập tay trùng tên 1 **value thường** không nằm trong nhóm (VD đặt "Navy" khi Navy là value riêng) có bị chặn không? Kiểm tra trùng có phân biệt hoa/thường, có cắt khoảng trắng không? | Figma cho phép đặt trùng tên value con ("Avocado"); rule chặn trùng mới nói "tên đã tồn tại" | Chặn trùng với filter option của merged value khác; không phân biệt hoa/thường, có cắt khoảng trắng |
| N5 | Merged value đang Status OFF thì value con có còn bị khoá (disable) với merged value khác không? | R4 nói dữ liệu merge vẫn giữ, R5 chưa nói tới trạng thái OFF | Vẫn bị khoá |
| N6 | Đóng modal bằng × ở bước ② khi đã nhập tên: đóng ngay hay hỏi xác nhận? | Figma không vẽ trạng thái này | Đóng ngay, không lưu |

## Ghi chú phạm vi

- **Figma khớp spec** ở mọi frame đã đọc. Không có frame hay sticky note mới so với ảnh dùng để viết spec. Các điểm Figma có mà spec chưa ghi: nút × của modal và nút × của toast.
- **Mockup count 5 + 2 + 1 = 8** ở khối Review Filter Node là cộng thuần, khớp sticky note cũ. Đây là ảnh demo tĩnh, đã chốt không dùng làm căn cứ, nên không tính mâu thuẫn.
- **Ảnh hưởng sang Advanced Settings** đã được phủ ở file test case Advanced Settings (khoảng 25 case). Không lặp lại ở file Merge Values để tránh trùng; checklist này chỉ ghi tham chiếu.
- **Phạm vi storefront**: các case ở nhóm "Kết quả merge trên storefront" chưa ghi rõ kiểm tra trên SRP hay Category Page, dù CLAUDE.md nói block filter có ở cả 2 trang. Nên ghi rõ trang ở Precondition, ít nhất 1 case cho mỗi loại trang.
- **Câu hỏi cũ còn mở** ở spec mục 8: Q1 (hợp/giao), Q2 (Swatch), Q3 (Filter Cache), Q4 (Merchandise, nay trùng Q23 của Merchandise), Q5–Q8.
