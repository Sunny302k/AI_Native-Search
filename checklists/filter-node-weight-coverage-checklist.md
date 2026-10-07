# Coverage checklist - filter-node-weight

Đối chiếu `docs/specs/filter-node-weight-specs.md` với `test-cases/filter/filter-tree/filter-node-weight/filter-node-weight_testcase.csv` (123 case, 1-123, tổ chức theo 2 banner ADD/EDIT).

> **Cập nhật 2026-08-12 (lần 1)**: theo yêu cầu người dùng, đã bổ sung 5 case Happy re-test trong context Edit (pre-loaded state) cho các field có cascading show/hide logic — Display Style, Show range slider, Has slider steps, Show range input, Hide on customer group — thay vì chỉ test 1 lần ở Add.
> **Cập nhật 2026-08-12 (lần 2)**: backfill ngược 4 case còn thiếu (AC-45 đến AC-48) sau khi đối chiếu với `filter-node-height-coverage-checklist.md` — sheet gốc Height có sẵn các rule này nhưng Weight thì không, nay bổ sung cho đồng bộ. Toàn bộ ID tham chiếu bên dưới đã cập nhật theo số thứ tự mới sau mỗi lần chèn case.

## Tổng quan

- Tổng số rule: 45
- Covered: 37
- Partial: 3
- Not covered: 5

## Chi tiết

### Mục 3 — General Settings

- [x] AC-01 — Title bắt buộc, rỗng → lỗi required — Covered — TC: 7
- [x] AC-02 — Title default = "Weight" — Covered — TC: 8
- [x] AC-03 — Title text color default dark, áp dụng ngay Preview — Covered — TC: 9, 10
- [x] AC-04 — Title alignment default Left, Center/Right áp dụng Preview — Covered — TC: 11, 12, 13
- [x] AC-05 — Rủi ro kế thừa: title dài >1 dòng luôn căn trái dù chọn Center/Right — Covered (`<cần confirm>`) — TC: 9, 12

### Mục 4 — Display Style

- [x] AC-06 — 3 giá trị Slider-input(default)/List/Grid — Covered (`<cần confirm>` nghi vấn thừa Swatch) — TC: 18
- [x] AC-07 — List/Grid ẩn toàn bộ slider sub-settings — Covered — TC: 14, 15
- [x] AC-08 — Rủi ro kế thừa: hiển thị "null"/dư 1 record/Grid record đầu highlight cam khi không có data — Covered (`<cần confirm>`) — TC: 15, 17
- [x] AC-08b — Đổi Display Style trong context Edit (từ data đã lưu, không phải state mặc định) — Covered — TC: 81 *(bổ sung theo yêu cầu re-test cả 2 luồng)*

### Mục 5 — Slider-input sub-settings

- [x] AC-09 — Show range slider default ON, ẩn sub-fields khi OFF — Covered — TC: 19, 20, 21
- [x] AC-09b — Toggle Show range slider trong context Edit (từ data đã lưu) — Covered — TC: 82 *(bổ sung)*
- [x] AC-10 — Decimal Separator default "No separator" — Covered — TC: 23, 24
- [x] AC-11 — Show tooltip default checked, ẩn Tooltip color khi unchecked — Covered — TC: 25, 26, 27
- [x] AC-12 — Has slider steps default checked, ẩn Amount/Show step value khi unchecked — Covered — TC: 28, 29, 30
- [x] AC-12b — Toggle Has slider steps trong context Edit — Covered — TC: 83 *(bổ sung)*
- [x] AC-13 — Amount of slider steps default=4, validate 0/âm/chữ — Covered (0/âm gắn `<cần confirm>`) — TC: 31-35
- [x] AC-14 — Show range input default ON, ẩn placeholder/unit khi OFF — Covered — TC: 37, 38, 39
- [x] AC-14b — Toggle Show range input trong context Edit — Covered — TC: 84 *(bổ sung)*
- [x] AC-15 — Placeholder text default `{{From}} - {{To}}` — Covered — TC: 41, 42
- [x] AC-16 — Unit Display Option default "Inside input" — Covered — TC: 43, 44
- [x] AC-17 — Range slider & Range input order default "slider on top" — Covered — TC: 45, 46

### Mục 6 — Weight Range

- [x] AC-18 — Dropdown tự tính [Lowest]-[Highest] từ data BC đã sync — Covered — TC: 86
- [x] AC-19 — Cập nhật theo sync: BC đổi Weight → re-sync → Admin + Preview + storefront cùng cập nhật — Covered — TC: 87, 88
- [ ] AC-20 — `<cần confirm>` Admin có được nhập tay override min/max hay Weight Range luôn read-only tự tính — **Not covered** — chưa có case nào thử click/nhập tay vào dropdown Weight Range để xác nhận có bị chặn hay không (sheet gốc case #118 đặt câu hỏi này nhưng chưa có test case tương ứng)

### Mục 6.9 — Sort Order

- [~] AC-21 — Field Sort Order có tồn tại, nếu có default Lowest→Highest — Partial — TC: 49 — chỉ có 1 case kiểm tra sự TỒN TẠI của field (đúng theo mức độ chưa chắc chắn của spec); nếu BA xác nhận field thực sự tồn tại, còn thiếu case cho từng chế độ sort (Highest→Lowest, Manual order kéo thả) và effect lên Preview/storefront

### Mục 6.6 + 9.3 — Setup dynamic filter

- [x] AC-22 — Default OFF + icon tooltip — Covered — TC: 48
- [x] AC-23 — ON → range tự thu hẹp theo sản phẩm trong kết quả tìm kiếm — Covered (`<cần confirm>` cơ chế chính xác) — TC: 47
- [x] AC-24 — Customer đang tương tác + Admin đổi Amount of slider steps → hành vi trước/sau reload — Covered — TC: 109
- [x] AC-25 — Weight Range co lại (BC data đổi) khi customer đang chọn range cũ ngoài phạm vi mới → hành vi trước/sau reload — Covered — TC: 110
- [x] AC-26 — `<cần confirm>` Preview/Weight Range trên MH Edit tự refresh real-time hay giữ snapshot — Covered — TC: 101

### Mục 7 — Hide on customer group

- [x] AC-27 — Default "0 selected" + button [Edit] — Covered — TC: 52
- [x] AC-28 — Chọn group → storefront ẩn filter với customer thuộc group — Covered (`<cần confirm>` bug NG kế thừa) — TC: 50
- [x] AC-29 — BC xoá customer group đã chọn → popup update số lượng — Covered (`<cần confirm>` bug NG kế thừa) — TC: 51
- [x] AC-29b — Chọn thêm group khi đã có selection sẵn trong context Edit (pre-loaded 2 group) — Covered — TC: 85 *(bổ sung)*

### Mục 8 — Appearance settings

- [x] AC-30 — Display tooltip default ON + Tooltip content — Covered — TC: 53-56
- [x] AC-31 — Content View default Scrollable — Covered — TC: 57, 58
- [x] AC-32 — Collapse/Expand Desktop/Mobile default Expand — Covered — TC: 59-61
- [x] AC-33 — Show search box desktop/mobile default OFF — Covered — TC: 62-64

### Mục 9.1 — BC field Weight (platform fact + validation)

- [ ] AC-34 — BC chặn save khi Weight để trống (required) — **Not covered** — đây là hành vi phía BigCommerce đã xác nhận qua BC Developer Docs (`docs/bigcommerce-platform-facts.md`), nằm ngoài phạm vi app Native Search; sheet gốc có test case tương đương (case #72) nhưng bộ hiện tại không viết lại vì thuộc QA scope của BC, không phải Native Search — cần quyết định của người dùng có muốn thêm case "setup-verification" này không
- [ ] AC-35 — BC chặn/báo lỗi khi nhập Weight âm — **Not covered** — cùng lý do AC-34 (BC platform validation, sheet gốc case #73)
- [ ] AC-36 — BC chỉ nhận số, chặn ký tự chữ — **Not covered** — cùng lý do AC-34 (sheet gốc case #74)
- [x] AC-37 — Weight = 0: có tính vào Range/filter nếu BC cho lưu — Covered (`<cần confirm>`) — TC: 94
- [x] AC-38 — Nhiều chữ số thập phân: BC lưu nguyên hay làm tròn — Covered (`<cần confirm>`) — TC: 95
- [x] AC-39 — Số rất lớn: range max cập nhật đúng, không lỗi hiển thị — Covered (`<cần confirm>` giới hạn max) — TC: 96
- [x] AC-40 — Product Type = Digital ẩn field Weight → không tính vào Range/filter — Covered (`<cần confirm>` độ tin cậy fact trung bình) — TC: 92
- [x] AC-41 — Đổi Product Type Physical→Digital (đã có Weight cũ) → Weight cũ bị loại khỏi filter sau sync — Covered (`<cần confirm>`) — TC: 93

### Mục 9.2 — Storefront & Merchandising rules

- [x] AC-42 — Weight required → Weight Range luôn tồn tại, không rơi vào rỗng do thiếu data (khác Width) — Covered — TC: 89
- [x] AC-43 — Toàn bộ product bị xoá khỏi BC → Weight Range rỗng/cảnh báo — Covered (`<cần confirm>` UI cụ thể) — TC: 90
- [x] AC-44 — Filter theo range đã chọn chỉ hiển thị đúng product trong khoảng — Covered (`<cần confirm>` rủi ro bug kế thừa) — TC: 103
- [x] AC-45 — Input From/To đồng bộ 2 chiều với slider (nhập input → slider cập nhật; kéo slider → input cập nhật) — Covered — TC: 104 *(backfill từ Height, lần cập nhật 2)*
- [x] AC-46 — Clear filter → reset toàn bộ (slider + input về full range, danh sách sản phẩm reset) — Covered — TC: 105 *(backfill từ Height)*
- [x] AC-47 — `<cần confirm>` From > To khi nhập tay: chặn apply hay tự swap — Covered — TC: 106 *(backfill từ Height)*
- [x] AC-48 — `<cần confirm>` Cả 2 handle slider trùng 1 điểm: exact match hay xử lý khác — Covered — TC: 107 *(backfill từ Height)*
- [ ] AC-49 — `<cần confirm>` AND logic với filter khác — **Not covered** — spec ghi nhận đây là suy luận theo pattern chung, chưa có case riêng ở cả sheet gốc lẫn bộ hiện tại (Height cũng chưa có, đây là gap chung toàn bộ filter tree — xem ghi chú cuối)
- [x] AC-50 — `<cần confirm>` Merchandising: product Hidden không tính vào Weight Range/count — Covered — TC: 108
- [x] AC-51 — Product mới thêm giữ default Weight=1.00 vẫn tính vào Range — Covered — TC: 91

### Mục 10 — Admin CRUD flow

- [x] AC-52 — Navigation: mở đúng Edit screen, không lẫn data giữa các filter — Covered — TC: 68, 69
- [x] AC-53 — Pre-fill toàn bộ settings đã lưu, không reset default (kể cả Weight Range theo data mới nhất) — Covered — TC: 70-80
- [x] AC-54 — Save Changes: partial update, multi-field, no-op, Title trống lỗi — Covered — TC: 111-114
- [x] AC-55 — Save as template không ảnh hưởng filter gốc cho tới khi Save Changes — Covered — TC: 115
- [x] AC-56 — Navigation guard: cảnh báo unsaved changes, Discard revert đúng data gốc — Covered — TC: 116, 117
- [x] AC-57 — `<cần confirm>` Reload/đóng tab khi chưa lưu — Covered — TC: 118
- [x] AC-58 — Delete: hiển thị action (chỉ Edit), Confirm xoá khỏi storefront sau sync, Cancel giữ nguyên — Covered — TC: 119-121
- [x] AC-59 — `<cần confirm>` Concurrent edit: lost update hay cảnh báo conflict — Covered — TC: 122
- [x] AC-60 — Đổi Title không vỡ liên kết filter — Covered — TC: 123
- [x] AC-61 — Sync độc lập khi Admin đang mở Edit (BC đổi Weight song song) — Covered — TC: 100

## Ghi chú tổng hợp cho người dùng

**5 rule Not covered còn lại** (giảm từ 9 sau khi backfill 4 rule từ Height):

1. **AC-20** (override tay Weight Range) — nên bổ sung qua `create-sync-testcase`/`create-functional-testcase` tuỳ câu trả lời BA. Cùng gap này cũng tồn tại ở Height (chưa xử lý ở cả 2 node).
2. **AC-34/35/36** (BC chặn required/âm/chữ) — quyết định phạm vi: đây là QA scope của chính BigCommerce, không phải Native Search. Giữ nguyên loại trừ trừ khi người dùng muốn bổ sung case setup-verification qua `create-sync-testcase`.
3. **AC-49** (AND logic với filter khác) — chưa có case riêng ở bất kỳ node range-slider nào đã làm (Width/Weight/Height). Khuyến nghị viết 1 lần duy nhất ở cấp `filter-tree-common-specs.md` qua `create-impact-testcase`, thay vì lặp lại ở từng node.

**1 rule Partial**: AC-21 (Sort Order) — chỉ test được sự tồn tại vì bản thân field có tồn tại hay không vẫn là `[CẦN XÁC NHẬN BA]` trong spec; cần bổ sung case chi tiết sau khi BA xác nhận.

**5 case bổ sung theo yêu cầu re-test Add + Edit** (AC-08b, AC-09b, AC-12b, AC-14b, AC-29b): áp dụng risk-based cho các field có cascading show/hide logic (dễ có bug hydrate state khi mở từ data đã lưu, khác với state rỗng lúc Add) — không duplicate toàn bộ field đơn giản (color picker, text input, dropdown không phụ thuộc) vì rủi ro thấp, cơ chế UI giống hệt bất kể Add/Edit.

**4 case backfill từ Height** (AC-45 đến AC-48): chèn vào nhóm "Weight filter — kết quả lọc storefront" (104-107), theo đúng nội dung/cơ chế đã viết cho Height (105-108 trong `filter-node-height_testcase.csv`), đổi đơn vị KGS thay vì cm. Toàn bộ ID từ 104 trở đi trong file test case đã dịch chuyển tương ứng sau khi chèn.
