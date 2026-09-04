# Coverage checklist - filter-node-shipping

Đối chiếu `docs/specs/filter-node-shipping-specs.md` với `test-cases/filter-node-shipping/filter-node-shipping_testcase.csv` (105 case, FNSHP_TC01-105, tổ chức theo 2 banner ADD/EDIT).

## Tổng quan

- Tổng số rule: 52
- Covered: 50
- Partial: 1
- Not covered: 1

## Chi tiết

### Mục 2 — General Settings

- [x] AC-01 — Title bắt buộc, rỗng → lỗi required — Covered — TC: FNSHP_TC08
- [x] AC-02 — Title default = "Shipping" — Covered — TC: FNSHP_TC09
- [x] AC-03 — Title text color default dark, áp dụng ngay Preview — Covered — TC: FNSHP_TC10, TC11
- [x] AC-04 — Title alignment default Left, Center/Right áp dụng Preview — Covered — TC: FNSHP_TC12, TC13, TC14
- [x] AC-05 — `<cần confirm>` Bug title dài >1 dòng (hệ thống-wide, sheet Shipping không nhắc) — Covered — TC: FNSHP_TC10

### Mục 3 — Filter options

- [x] AC-06 — Default: 2 option checked + label gốc — Covered — TC: FNSHP_TC23
- [x] AC-07 — Đổi custom label cho từng option — Covered — TC: FNSHP_TC15, TC16
- [x] AC-08 — Uncheck từng option riêng → ẩn khỏi storefront — Covered — TC: FNSHP_TC17, TC18, TC19
- [~] AC-12 — Custom label không ảnh hưởng logic filter (filtering vẫn dựa trên `is_free_shipping` gốc dù label đổi tên) — Partial — TC: FNSHP_TC54 (chỉ verify label pre-fill đúng, KHÔNG verify việc click option đã relabel vẫn filter đúng theo giá trị gốc)
- [x] AC-09 — `<cần confirm>` Uncheck cả 2 option — Covered — TC: FNSHP_TC20 (Add), TC56 (Edit)
- [x] AC-10 — `<cần confirm>` Label rỗng — Covered — TC: FNSHP_TC21
- [x] AC-11 — `<cần confirm>` 2 option trùng label — Covered — TC: FNSHP_TC22 (Add), TC58 (Edit)

### Mục 4 — Option select type

- [x] AC-13 — Default Single — Covered — TC: FNSHP_TC26
- [x] AC-14 — Switch Single→Multiple — Covered — TC: FNSHP_TC24
- [x] AC-15 — Switch Multiple→Single — Covered — TC: FNSHP_TC25
- [x] AC-16 — Sync: Single mode click behavior (tự deselect option kia) — Covered — TC: FNSHP_TC83, TC84
- [x] AC-17 — Sync: Multiple mode union kết quả — Covered — TC: FNSHP_TC85

### Mục 5 — Display Style

- [x] AC-18 — 3 giá trị List(default)/Grid/Toggle đều hoạt động đúng (không có nghi vấn thừa option như Special Offers) — Covered — TC: FNSHP_TC27, TC28, TC29, TC30

### Mục 6 — Sort Order

- [x] AC-19 — Default order Free Shipping → Paid — Covered — TC: FNSHP_TC34
- [x] AC-20 — Kéo thả đổi thứ tự, Preview + storefront cập nhật — Covered — TC: FNSHP_TC33
- [ ] AC-21 — Custom order giữ nguyên sau re-sync (không bị reset về default) — **Not covered** — sheet gốc có case rõ ràng (#31) nhưng bộ hiện tại không viết lại case Sync tương ứng

### Mục 7 — Hide on customer group

- [x] AC-22 — Default "0 selected" — Covered — TC: FNSHP_TC32
- [x] AC-23 — Chọn group → ẩn filter với customer thuộc group — Covered (`<cần confirm>` rủi ro bug hệ thống-wide) — TC: FNSHP_TC31
- [x] AC-24 — Đổi group đang ẩn (Edit context) — Covered — TC: FNSHP_TC62

### Mục 8 — Appearance settings

- [x] AC-25 — Display tooltip + content — Covered — TC: FNSHP_TC35, TC36, TC37, TC38
- [x] AC-26 — Collapse/Expand Desktop/Mobile — Covered — TC: FNSHP_TC39, TC40, TC41
- [x] AC-27 — Uppercase toggle, áp dụng lên CẢ custom label — Covered — TC: FNSHP_TC42, TC43, TC44, TC45
- [x] AC-28 — Show search box desktop/mobile — Covered — TC: FNSHP_TC46, TC47

### Mục 9.1 — BC field is_free_shipping

- [x] AC-29 — `fixed_cost_shipping_price` KHÔNG ảnh hưởng phân loại (Free Shipping=checked bất kể Fixed Price) — Covered — TC: FNSHP_TC70
- [x] AC-30 — `fixed_cost_shipping_price` KHÔNG ảnh hưởng phân loại (Free Shipping=unchecked bất kể Fixed Price=0) — Covered — TC: FNSHP_TC71
- [x] AC-31 — `<cần confirm>` Digital product type có ẩn field Free Shipping không — Covered (độ tin cậy thấp, suy luận từ Weight/Height) — TC: FNSHP_TC79

### Mục 9.2 — Storefront & Merchandising rules

- [x] AC-32 — `is_free_shipping`=checked → phân loại "Free Shipping" — Covered — TC: FNSHP_TC68
- [x] AC-33 — `is_free_shipping`=unchecked → phân loại "Paid" — Covered — TC: FNSHP_TC69
- [x] AC-34 — Count đúng theo từng option — Covered — TC: FNSHP_TC75
- [x] AC-35 — Filter theo option đã chọn ra đúng kết quả — Covered — TC: FNSHP_TC83, TC84, TC85
- [x] AC-36 — BC đổi checkbox → re-sync → count 2 bên cùng cập nhật — Covered — TC: FNSHP_TC72, TC73
- [x] AC-37 — Stale (chưa re-sync) — count giữ nguyên — Covered — TC: FNSHP_TC74
- [x] AC-38 — Product bị xoá → re-sync → count giảm — Covered — TC: FNSHP_TC76
- [x] AC-39 — `<cần confirm>` Toàn bộ product cùng 1 giá trị → option còn lại count=0/ẩn — Covered — TC: FNSHP_TC77, TC78
- [x] AC-40 — `<cần confirm>` Cảnh báo khi uncheck option đang có count — Covered — TC: FNSHP_TC57
- [x] AC-41 — Recheck option đã ẩn → count phản ánh đúng data hiện tại — Covered — TC: FNSHP_TC55
- [x] AC-42 — Clear filter → reset toàn bộ — Covered — TC: FNSHP_TC86
- [x] AC-43 — `<cần confirm>` AND logic với filter khác — Covered — TC: FNSHP_TC87
- [x] AC-44 — `<cần confirm>` Merchandising product Hidden không tính vào count — Covered — TC: FNSHP_TC88

### Mục 9.3 — Live storefront impact

- [x] AC-45 — Admin đổi label → label cũ giữ tới reload, sau reload cập nhật — Covered — TC: FNSHP_TC89
- [x] AC-46 — `<cần confirm>` Admin uncheck option customer đang chọn → sau reload trả về toàn bộ — Covered — TC: FNSHP_TC90
- [x] AC-47 — Admin đổi Single→Multiple khi customer đã chọn — Covered — TC: FNSHP_TC60
- [x] AC-48 — Sync độc lập khi Admin đang mở Edit — Covered — TC: FNSHP_TC91
- [x] AC-49 — Preview count khớp storefront tại thời điểm mở Edit — Covered — TC: FNSHP_TC92

### Mục 10 — Admin CRUD flow

- [x] AC-50 — Navigation: mở đúng Edit, không lẫn data — Covered — TC: FNSHP_TC51, TC52
- [x] AC-51 — Pre-fill toàn bộ settings đã lưu — Covered — TC: FNSHP_TC53, TC54, TC59, TC61, TC63, TC65
- [x] AC-52 — Save Changes: partial/multi-field/no-op/Title trống — Covered — TC: FNSHP_TC93-96
- [x] AC-53 — Save as template không ảnh hưởng filter gốc — Covered — TC: FNSHP_TC97
- [x] AC-54 — Navigation guard — Covered — TC: FNSHP_TC98, TC99
- [x] AC-55 — `<cần confirm>` Reload/đóng tab khi chưa lưu — Covered — TC: FNSHP_TC100
- [x] AC-56 — Delete: hiển thị action, Confirm, Cancel — Covered — TC: FNSHP_TC101-103
- [x] AC-57 — Đổi Title không vỡ liên kết — Covered — TC: FNSHP_TC104
- [x] AC-58 — `<cần confirm>` Concurrent edit — Covered — TC: FNSHP_TC105

## Ghi chú tổng hợp cho người dùng

**1 rule Not covered**: AC-21 (Sort Order giữ nguyên sau re-sync) — sheet gốc case #31 có nội dung rõ ràng nhưng bị bỏ sót khi soạn `create-sync-testcase`. Nên bổ sung 1 case Sync ngắn: "Custom order Sort Order đã thiết lập → trigger re-sync → kiểm tra thứ tự options trên storefront giữ nguyên, không reset về default."

**1 rule Partial**: AC-12 (custom label không ảnh hưởng logic filter) — hiện chỉ có case verify label hiển thị đúng khi pre-fill (TC54), chưa có case verify hành vi FILTER thực tế vẫn đúng khi option đã bị đổi tên (VD: relabel "Free Shipping" → "Miễn phí", click "Miễn phí" trên storefront, xác nhận vẫn trả về đúng product có `is_free_shipping=true`). Nên bổ sung qua `create-sync-testcase` vì cần data BC thật để verify.

**So sánh với Weight/Height**: Shipping có ít gap hơn cả 2 node trước (chỉ 1 Not covered, 1 Partial so với 9 và 3 tương ứng) — nhờ sheet gốc rất đầy đủ, không dính lỗi nhiễm chéo template, và không có bug NG lặp lại kiểu "storefront không filter đúng" như các node cũ.
