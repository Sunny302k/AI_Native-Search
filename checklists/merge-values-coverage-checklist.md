# Coverage checklist - merge-values

Đối chiếu `docs/specs/merge-values-specs.md` với 2 file test case:
- `test-cases/filter/merge-values/merge-values_testcase.csv` — 70 case (`MRGVAL_TC01`→`TC70`)
- `test-cases/filter/merge-values/merge-values_matrix-create-merged-value.csv` — 8 case (`MTC01`→`MTC08`)

## Tổng quan

- Tổng số rule: **48**
- Covered: **43**
- Partial: **4**
- Not covered: **1**

## Chi tiết

### Màn Merged Values (list) — spec mục 2

- [~] AC-01 — Nút back ← quay lại màn Filter — Partial — TC: MRGVAL_TC01 (chỉ test chiều vào màn, **thiếu case bấm back quay lại màn Filter**)
- [x] AC-02 — Khối Feature Tour "What is merge values ?" thu gọn/mở được — Covered — TC: MRGVAL_TC02, MRGVAL_TC03
- [x] AC-03 — Nút [Create new] xuất hiện ở 2 vị trí, cả 2 đều mở đúng modal — Covered — TC: MRGVAL_TC05, MRGVAL_TC06
- [x] AC-04 — Cột Status là toggle bật/tắt trực tiếp trên list — Covered — TC: MRGVAL_TC35, MRGVAL_TC36
- [x] AC-05 — Cột Values hiển thị chuỗi value con phân tách dấu phẩy — Covered — TC: MRGVAL_TC07
- [x] AC-06 — Cột Filter option hiển thị tên đại diện — Covered — TC: MRGVAL_TC07
- [x] AC-07 — Cột Actions có icon Edit + icon Delete — Covered — TC: MRGVAL_TC08
- [x] AC-08 — Empty state "There is currently no merged value." — Covered — TC: MRGVAL_TC04
- [x] AC-09 — Toast "Merged value is created successfully!" sau khi tạo — Covered — TC: MRGVAL_TC09, MTC01, MTC02, MTC03

### Modal bước ① Choose values — spec mục 3

- [x] AC-10 — Stepper hiển thị đúng 2 bước, bước ① active — Covered — TC: MRGVAL_TC10
- [x] AC-11 — Dropdown lọc nguồn multi-select, mặc định All sources tick hết — Covered — TC: MRGVAL_TC14
- [x] AC-12 — Ô Search value lọc đúng danh sách — Covered — TC: MRGVAL_TC15, MRGVAL_TC16
- [~] AC-13 — Danh sách value trộn value từ nhiều option khác nhau, có scroll — Partial — TC: MRGVAL_TC17 (đã test chọn nhiều value, **thiếu case verify scroll khi danh sách dài**)
- [x] AC-14 — Panel Selected values: xoá từng dòng bằng icon thùng rác + link Remove all — Covered — TC: MRGVAL_TC18, MRGVAL_TC19
- [x] AC-15 — Counter "N selected" cập nhật đúng — Covered — TC: MRGVAL_TC17, MRGVAL_TC18, MRGVAL_TC19
- [x] AC-17 — Nút Cancel đóng modal không lưu — Covered — TC: MRGVAL_TC20

### Nguồn dữ liệu — spec mục 3.1

- [x] AC-18 — Nguồn Product options lấy từ BC Variant Options — Covered — TC: MRGVAL_TC11, MRGVAL_TC58
- [x] AC-19 — Nguồn Custom fields lấy từ trường Custom Fields của BC — Covered — TC: MRGVAL_TC12, MRGVAL_TC66
- [x] AC-20 — Nguồn Custom filter builder là config nội bộ, hiệu lực ngay không chờ sync — Covered — TC: MRGVAL_TC13, MRGVAL_TC70
- [x] AC-21 — Tuỳ chọn All sources gộp tất cả nguồn — Covered — TC: MRGVAL_TC14
- [x] AC-22 — Thời điểm hiệu lực lệch pha giữa nguồn BC (chờ sync) và nguồn nội bộ (ngay) — Covered — TC: MRGVAL_TC53, MRGVAL_TC70

### Modal bước ② Merge values — spec mục 4.1

- [x] AC-23 — Ô Selected values read-only, hiển thị đúng chuỗi value đã chọn — Covered — TC: MRGVAL_TC22
- [x] AC-24 — Ô Filter option có 2 chế độ toggle qua lại (dropdown ↔ nhập tay) — Covered — TC: MRGVAL_TC24, MRGVAL_TC25
- [x] AC-25 — Dropdown Select filter option CHỈ liệt kê value trong Selected values — Covered — TC: MRGVAL_TC26
- [x] AC-26 — Nút Back quay lại bước ①, giữ nguyên selection — Covered — TC: MRGVAL_TC28
- [x] AC-27 — Nút Save lưu merged value thành công — Covered — TC: MTC01, MTC02, MTC03
- [x] AC-28 — Khối Review Filter Node là ảnh demo tĩnh, không phản ánh dữ liệu thật — Covered — TC: MRGVAL_TC27 (có Note ghi rõ không dùng số liệu khối này làm căn cứ verify)

### Rule phụ thuộc chéo R1-R8 — spec mục 5.2

- [x] AC-29 (R1) — Merge tác động ở khâu HIỂN THỊ, không ở khâu CHỌN — Covered — TC: MRGVAL_TC33
- [x] AC-30 (R2) — Cơ chế "tất cả hoặc không gì": node chọn ≥1 value con → hiển thị trọn group — Covered — TC: MRGVAL_TC29, MRGVAL_TC30
- [x] AC-31 (R3) — Merge có tính hồi tố với node tạo trước — Covered — TC: MRGVAL_TC32
- [x] AC-32 (R4) — Status OFF → hiển thị lại value con riêng lẻ — Covered — TC: MRGVAL_TC35, MRGVAL_TC36
- [x] AC-33 (R5) — 1 value không thuộc 2 merged value, value đã dùng bị disable — Covered — TC: MRGVAL_TC21
- [x] AC-34 (R6) — Delete rollback hoàn toàn, KHÔNG có popup xác nhận — Covered — TC: MRGVAL_TC42, MRGVAL_TC43
- [x] AC-35 (R7) — Merged value luôn hiển thị theo giá trị sync mới nhất — Covered — TC: MRGVAL_TC58, TC59, TC61, TC69
- [x] AC-36 (R8) — Merged value KHÔNG có cấu hình Setup dynamic option — Covered — TC: MRGVAL_TC44

### Công thức count — spec mục 5.3

- [x] AC-37 — Count = đếm DISTINCT, sản phẩm thuộc nhiều value trong nhóm chỉ tính 1 lần — Covered — TC: MRGVAL_TC31, MRGVAL_TC63 (cả 2 đều gắn `<cần confirm>` cho cách hiểu "hợp" vs "giao")

### Edit / Delete — spec mục 6

- [x] AC-38 — Edit cho sửa thêm/bớt value con — Covered — TC: MRGVAL_TC38, MRGVAL_TC39
- [x] AC-39 — Edit cho đổi tên Filter option — Covered — TC: MRGVAL_TC40, MRGVAL_TC41
- [x] AC-40 — Delete → value con rollback về hiển thị riêng lẻ — Covered — TC: MRGVAL_TC43
- [x] AC-41 — Toggle Status ON/OFF trực tiếp trên list — Covered — TC: MRGVAL_TC35, MRGVAL_TC36

### Validation — spec mục 7

- [x] AC-42 — Tối thiểu 2 value mới cho merge — Covered — TC: MTC04
- [ ] AC-43 — **Chưa giới hạn số value tối đa** — Not covered — không có case nào verify merge được với số lượng value lớn (VD 50-100 value) mà hệ thống vẫn xử lý đúng (hiển thị, count, hiệu năng). Bổ sung bằng `create-functional-testcase` (1 case Edge).
- [x] AC-44 — Nút [Next] ở bước ① disable khi chưa chọn value nào — Covered — TC: MTC05
- [x] AC-45 — Tên Filter option rỗng → chặn lưu — Covered — TC: MTC06
- [x] AC-46 — Tên trùng tên đã tồn tại → chặn lưu — Covered — TC: MTC07 (tạo mới), MRGVAL_TC41 (khi Edit)
- [x] AC-47 — Tên tối đa 255 ký tự (biên valid + vượt biên) — Covered — TC: MTC03 (đúng 255), MTC08 (256 ký tự)

### Rule phụ rút ra từ trigger Integration — nguồn `filter-tree-common-specs.md`

- [~] AC-48 — Filter tree Status ON/OFF quyết định hiển thị đồng thời ở storefront VÀ màn Merge Value — Partial — TC: MRGVAL_TC45, MRGVAL_TC46 (đã phủ 2 hướng ON→OFF và OFF→ON, nhưng expected result phần "màn Merge Value" đang gắn `<cần confirm>` vì chưa rõ rule cũ còn đúng với thiết kế Merge Values mới hay không)
- [~] AC-49 — Xoá filter tree → biến mất khỏi Filter Tree List, storefront VÀ Merge Value — Partial — TC: MRGVAL_TC47, MRGVAL_TC48 (đã phủ 2 phạm vi tree liên quan/không liên quan, nhưng **expected result đang viết theo hướng merged value KHÔNG bị xoá theo** — mâu thuẫn với chữ "biến mất khỏi Merge Value" trong tài liệu Filter Tree cũ; cần BA chốt rule nào đúng với thiết kế hiện tại)

## Gap cần bổ sung

| # | Rule | Trạng thái | Gợi ý xử lý |
|---|---|---|---|
| 1 | AC-43 — chưa giới hạn số value tối đa | Not covered | Bổ sung 1 case Edge qua `create-functional-testcase`: merge số lượng value lớn (VD 50+) → verify hiển thị/count/hiệu năng vẫn đúng |
| 2 | AC-01 — nút back ở màn Merged Values | Partial | Bổ sung 1 case UI: bấm ← quay lại đúng màn Filter |
| 3 | AC-13 — scroll danh sách value ở bước ① | Partial | Bổ sung 1 case UI: danh sách dài → scroll đúng, không mất selection đã tick |
| 4 | AC-48 / AC-49 — 2 rule Filter Tree ảnh hưởng màn Merge Value | Partial | **Không bổ sung case** — cần BA xác nhận rule cũ còn hiệu lực không trước khi chốt expected result; case đã có sẵn, chỉ chờ gỡ `<cần confirm>` |

## Ghi chú phạm vi

- **Metafields**: đã bị loại khỏi phạm vi tính năng — không tính là rule thiếu phủ.
- **2 dòng note gốc đã lỗi thời** (công thức count cộng thuần; kịch bản "Filter tree B → opt1 biến mất") — không tính là rule cần phủ, đã bị thay thế bởi quyết định mới (đếm distinct; merge hồi tố + cơ chế tất-cả-hoặc-không-gì).
- **17 case** trong file bảng đang mang tag `<cần confirm>`, tập trung ở 4 nhóm: công thức count (hợp/giao), Swatch, Filter Cache, Merchandise Campaign — đây là các điểm chờ BA, không phải gap độ phủ.
- **Case vượt ngoài rule spec** (không nằm trong 48 rule ở trên nhưng đã có sẵn trong file, viết ra từ phân tích rủi ro chứ không từ 1 dòng spec cụ thể): `MRGVAL_TC34` (value con có swatch image khác nhau → merged value hiển thị swatch nào), `MRGVAL_TC49`-`TC52` (thao tác trên filter node / My own filter), `MRGVAL_TC54`-`TC57` (Filter Cache, Merchandise Campaign), `MRGVAL_TC60` (BC xoá value khiến nhóm còn 1 phần tử), `MRGVAL_TC62`/`TC64`/`TC65` (biến thiên count qua sync), `MRGVAL_TC67`/`TC68` (sync In Progress / Failed). Phần lớn nhóm này đang mang `<cần confirm>`.
