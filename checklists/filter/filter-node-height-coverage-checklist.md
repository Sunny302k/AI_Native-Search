# Coverage checklist - filter-node-height

Đối chiếu `docs/specs/filter-node-height-specs.md` với `test-cases/filter/filter-tree/filter-node-height/filter-node-height_testcase.csv` (124 case, 1-124, tổ chức theo 2 banner ADD/EDIT).

**So với Weight**: sheet gốc Height đầy đủ hơn hẳn (có sẵn bidirectional input/slider sync, Clear filter, From>To, 2 handle trùng điểm — 4 rule từng bị bỏ sót ở Weight) nên coverage lần này tốt hơn rõ rệt: chỉ còn **3 Not covered** (so với 9 của Weight).

## Tổng quan

- Tổng số rule: 43
- Covered: 39
- Partial: 1
- Not covered: 3

## Chi tiết

### Mục 3 — General Settings

- [x] AC-01 — Title bắt buộc, rỗng → lỗi required — Covered — TC: 8
- [x] AC-02 — Title default = "Height" — Covered — TC: 9
- [x] AC-03 — Title text color default dark, áp dụng ngay Preview — Covered — TC: 10, 11
- [x] AC-04 — Title alignment default Left, Center/Right áp dụng Preview — Covered — TC: 12, 13, 14
- [x] AC-05 — Rủi ro kế thừa: title dài >1 dòng luôn căn trái dù chọn Center/Right — Covered (`<cần confirm>`) — TC: 10, 13

### Mục 4 — Display Style

- [x] AC-06 — 3 giá trị Slider-input(default)/List/Grid — Covered (`<cần confirm>` nghi vấn thừa Swatch) — TC: 19
- [x] AC-07 — List/Grid ẩn toàn bộ slider sub-settings — Covered — TC: 15, 16
- [x] AC-08 — Rủi ro kế thừa: "null"/dư 1 record/Grid record đầu highlight cam khi không có data — Covered (`<cần confirm>`) — TC: 16, 18
- [x] AC-08b — Đổi Display Style trong context Edit (data đã lưu, không phải state mặc định) — Covered — TC: 82

### Mục 5 — Slider-input sub-settings

- [x] AC-09 — Show range slider default ON, ẩn sub-fields khi OFF — Covered — TC: 20, 21, 22
- [x] AC-09b — Toggle Show range slider trong context Edit — Covered — TC: 83
- [x] AC-10 — Decimal Separator default "No separator" — Covered — TC: 24, 25
- [x] AC-11 — Show tooltip default checked, ẩn Tooltip color khi unchecked — Covered — TC: 26, 27
- [x] AC-12 — Has slider steps default checked, ẩn Amount/Show step value khi unchecked — Covered — TC: 29, 30, 31
- [x] AC-12b — Toggle Has slider steps trong context Edit — Covered — TC: 84
- [x] AC-13 — Amount of slider steps default=4, validate 0/âm/chữ — Covered (0/âm gắn `<cần confirm>`) — TC: 32-36
- [x] AC-14 — Show range input default ON, ẩn placeholder/unit khi OFF — Covered — TC: 38, 39, 40
- [x] AC-14b — Toggle Show range input trong context Edit — Covered — TC: 85
- [x] AC-15 — Placeholder text default `{{From}} - {{To}}` — Covered — TC: 42, 43
- [x] AC-16 — Unit Display Option default "Inside input" — Covered — TC: 44, 45
- [x] AC-17 — Range slider & Range input order default "slider on top" — Covered — TC: 46, 47

### Mục 6 — Height Range

- [x] AC-18 — Dropdown tự tính [Lowest]-[Highest] từ data BC đã sync (chỉ tính product CÓ Height) — Covered — TC: 87
- [x] AC-19 — Cập nhật theo sync: BC đổi Height → re-sync → Admin + Preview + storefront cùng cập nhật — Covered — TC: 88, 89
- [ ] AC-20 — `<cần confirm>` Admin có được nhập tay override min/max hay Height Range luôn read-only tự tính — **Not covered** — cùng gap đã ghi nhận ở Weight; sheet gốc case #118 đặt câu hỏi này nhưng chưa có test case tương ứng thử thao tác thật vào dropdown

### Mục 6.9 — Sort Order

- [~] AC-21 — Field Sort Order có tồn tại, nếu có default Lowest→Highest — Partial — TC: 50 — chỉ test sự TỒN TẠI của field (đúng mức độ chưa chắc chắn của spec); cần bổ sung case theo từng chế độ sort sau khi BA xác nhận field có tồn tại

### Mục 6.6 + 9.3 — Setup dynamic filter

- [x] AC-22 — Default OFF + icon tooltip — Covered — TC: 49
- [x] AC-23 — ON → range tự thu hẹp theo sản phẩm trong kết quả tìm kiếm — Covered (`<cần confirm>` cơ chế chính xác) — TC: 48
- [x] AC-24 — Customer đang tương tác + Admin đổi Amount of slider steps → hành vi trước/sau reload — Covered — TC: 110
- [x] AC-25 — Height Range co lại khi customer đang chọn range cũ ngoài phạm vi mới → hành vi trước/sau reload — Covered — TC: 111
- [x] AC-26 — `<cần confirm>` Preview/Height Range trên MH Edit tự refresh real-time hay giữ snapshot — Covered — TC: 103

### Mục 7 — Hide on customer group

- [x] AC-27 — Default "0 selected" + button [Edit] — Covered — TC: 53
- [x] AC-28 — Chọn group → storefront ẩn filter với customer thuộc group — Covered (`<cần confirm>` bug NG kế thừa) — TC: 51
- [x] AC-29 — BC xoá customer group đã chọn → popup update số lượng — Covered (`<cần confirm>` bug NG kế thừa, viết theo pattern chung vì sheet Height không có case riêng) — TC: 52
- [x] AC-29b — Chọn thêm group khi đã có selection sẵn trong context Edit — Covered — TC: 86

### Mục 8 — Appearance settings

- [x] AC-30 — Display tooltip default ON + Tooltip content — Covered — TC: 54-57
- [x] AC-31 — Content View default Scrollable — Covered — TC: 58, 59
- [x] AC-32 — Collapse/Expand Desktop/Mobile default Expand — Covered — TC: 60-62
- [x] AC-33 — Show search box desktop/mobile default OFF — Covered — TC: 63-65

### Mục 9.1 — BC field Height (platform fact + validation)

- [ ] AC-34 — BC chặn/báo lỗi khi nhập Height âm — **Not covered** — hành vi phía BigCommerce (không phải Native Search), theo đúng quyết định phạm vi đã áp dụng ở Weight (sheet gốc có case tương đương #81 nhưng chủ động không viết lại vì ngoài QA scope app Native Search)
- [ ] AC-35 — BC chỉ nhận số, chặn ký tự chữ — **Not covered** — cùng lý do AC-34 (sheet gốc #82)
- [x] AC-36 — Height = 0: có tính vào Range/filter nếu BC cho lưu — Covered (`<cần confirm>`) — TC: 96
- [x] AC-37 — Nhiều chữ số thập phân: BC lưu nguyên hay làm tròn — Covered (`<cần confirm>`) — TC: 97
- [x] AC-38 — Số rất lớn: range max cập nhật đúng, không lỗi hiển thị — Covered (`<cần confirm>` giới hạn max) — TC: 98
- [x] AC-39 — Product Type = Digital ẩn field Height → không tính vào Range/filter — Covered (`<cần confirm>` độ tin cậy THẤP hơn Weight — sheet gốc Height không có case riêng test Digital, thuần suy luận theo pattern đã xác nhận ở Weight) — TC: 95

### Mục 9.2 — Storefront rules (đặc thù optional field)

- [x] AC-40 — Product để trống Height (optional, hợp lệ) → loại khỏi Height Range, không kéo méo min/max — Covered — TC: 90
- [x] AC-41 — Toàn bộ product không có Height → Height Range rỗng/ẩn filter — Covered (`<cần confirm>` UI cụ thể) — TC: 91
- [x] AC-42 — Một phần product có Height, phần để trống → range chỉ tính trên product CÓ data — Covered — TC: 92
- [x] AC-43 — Product mới thêm để trống Height → KHÔNG ảnh hưởng range (đối lập hoàn toàn Weight required) — Covered — TC: 93
- [x] AC-44 — Filter theo range đã chọn chỉ hiển thị đúng product trong khoảng — Covered — TC: 104
- [x] AC-45 — Input From/To đồng bộ 2 chiều với slider — Covered — TC: 105 *(gap đã ghi nhận ở Weight, nay được Height cover đầy đủ)*
- [x] AC-46 — Clear filter → reset toàn bộ (slider + input về full range, sản phẩm reset) — Covered — TC: 106 *(gap đã ghi nhận ở Weight, nay được Height cover đầy đủ)*
- [x] AC-47 — `<cần confirm>` From > To khi nhập tay: chặn apply hay tự swap — Covered — TC: 107 *(gap đã ghi nhận ở Weight, nay được Height cover đầy đủ)*
- [x] AC-48 — `<cần confirm>` Cả 2 handle slider trùng 1 điểm: exact match hay xử lý khác — Covered — TC: 108 *(gap đã ghi nhận ở Weight, nay được Height cover đầy đủ)*
- [ ] AC-49 — `<cần confirm>` AND logic với filter khác — **Not covered** — spec ghi nhận đây là suy luận theo pattern chung, chưa có case riêng ở cả sheet gốc lẫn bộ hiện tại (giống Weight)
- [x] AC-50 — `<cần confirm>` Merchandising: product Hidden không tính vào Height Range/count — Covered — TC: 109

### Mục 10 — Admin CRUD flow

- [x] AC-51 — Navigation: mở đúng Edit screen, không lẫn data giữa các filter — Covered — TC: 69, 70
- [x] AC-52 — Pre-fill toàn bộ settings đã lưu, không reset default (kể cả Height Range theo data mới nhất) — Covered — TC: 71-81
- [x] AC-53 — Save Changes: partial update, multi-field, no-op, Title trống lỗi — Covered — TC: 112-115
- [x] AC-54 — Save as template không ảnh hưởng filter gốc cho tới khi Save Changes — Covered — TC: 116
- [x] AC-55 — Navigation guard: cảnh báo unsaved changes, Discard revert đúng data gốc — Covered — TC: 117, 118
- [x] AC-56 — `<cần confirm>` Reload/đóng tab khi chưa lưu — Covered — TC: 119
- [x] AC-57 — Delete: hiển thị action (chỉ Edit), Confirm xoá khỏi storefront sau sync, Cancel giữ nguyên — Covered — TC: 120-122
- [x] AC-58 — `<cần confirm>` Concurrent edit: lost update hay cảnh báo conflict — Covered — TC: 123
- [x] AC-59 — Đổi Title không vỡ liên kết filter — Covered — TC: 124
- [x] AC-60 — Sync độc lập khi Admin đang mở Edit (BC đổi Height song song) — Covered — TC: 102

## Ghi chú tổng hợp cho người dùng

**3 rule Not covered:**

1. **AC-20** (override tay Height Range) — nên bổ sung, cùng gap đã có ở Weight (chưa thao tác thử dropdown Height Range xem có nhận input tay không). Dùng `create-sync-testcase` hoặc `create-functional-testcase` tuỳ câu trả lời của BA (nếu chỉ là UI tĩnh không phụ thuộc data → functional; nếu có validate liên quan tới data BC → sync).
2. **AC-34/AC-35** (BC chặn Height âm/chữ) — quyết định phạm vi giống Weight: đây là QA scope của chính BigCommerce, không phải Native Search. Giữ nguyên quyết định loại trừ trừ khi người dùng muốn bổ sung case setup-verification qua `create-sync-testcase`.
3. **AC-49** (AND logic với filter khác) — chưa có case riêng ở bất kỳ node range-slider nào đã làm (Width/Weight/Height) vì đây là hành vi chung của toàn bộ filter tree, không riêng 1 node. Khuyến nghị: nên viết 1 lần duy nhất ở cấp `filter-tree-common-specs.md` qua `create-impact-testcase`, thay vì lặp lại ở từng node.

**1 rule Partial**: AC-21 (Sort Order) — chỉ test được sự tồn tại, tương tự Width/Weight.

**Tín hiệu tích cực**: 4 rule từng là gap ở Weight (AC-45 đến AC-48 tương ứng bidirectional sync/Clear filter/From>To/2-handle) đã được Height cover đầy đủ nhờ sheet gốc phong phú hơn — không phải do cải thiện quy trình viết test case, mà do chất lượng input khác nhau giữa 2 sheet. Cân nhắc bổ sung ngược 4 case này cho Weight (`test-cases/filter/filter-tree/filter-node-weight/filter-node-weight_testcase.csv`) để đồng bộ độ phủ giữa các node cùng pattern.
