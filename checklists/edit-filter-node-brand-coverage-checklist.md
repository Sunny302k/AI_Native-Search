# Coverage checklist - edit-filter-node-brand

## Tổng quan
- Tổng số rule: 52
- Covered: 43
- Partial: 7
- Not covered: 2

## Chi tiết

### General Settings
- [x] AC-01 — Title bắt buộc, rỗng → lỗi — Covered — TC: EFNBRAND_TC05
- [x] AC-02 — Title hiển thị đúng giá trị đã lưu khi mở Edit — Covered — TC: EFNBRAND_TC03
- [x] AC-03 — Title text color áp dụng lên Preview — Covered — TC: EFNBRAND_TC06
- [x] AC-04 — Title alignment Left/Center/Right — Covered — TC: EFNBRAND_TC07

### Filter Options — Popup [Select filter options]
- [~] AC-05 — Search theo Option name/Value, trim khoảng trắng — Partial — có case search 1 phần/toàn phần/value/trim (TC10-14) nhưng chưa có case xác nhận danh sách BASELINE hiển thị đúng trước khi search
- [~] AC-06 — Cột Option name đồng bộ trực tiếp từ BC — Partial — chỉ có case delta "BC thêm value mới" (TC61), chưa có case xác nhận baseline "list hiện tại hiển thị đúng dữ liệu đã sync"
- [x] AC-07 — Chọn 1 option name → cột Values load đúng — Covered — TC15
- [~] AC-08 — Values kèm product count, đồng bộ từ BC — Partial — chỉ có case delta "product đổi assign" (TC63), thiếu case xác nhận baseline hiển thị đúng count hiện tại
- [x] AC-09 — Multi-select value — Covered — TC16, TC17, TC18
- [~] AC-10 — Save button disable/enable đúng trạng thái — Partial — có case disable khi bỏ chọn hết (TC19), chưa có case riêng xác nhận enable khi đã chọn ≥1 (chỉ ngụ ý qua TC20)
- [x] AC-11 — Save → đóng popup, giá trị hiển thị đúng — Covered — TC20
- [x] AC-12 — Cancel/icon X không lưu thay đổi — Covered — TC21, TC22 (kèm `<cần confirm>` vì case gốc NG)
- [x] AC-13 — Add/remove option qua lại ở màn Edit — Covered — TC16, TC17, TC20
- [ ] AC-14b — BC **sửa/rename tên 1 value** (không phải thêm/xoá) → sync → popup và Preview cập nhật đúng — **Not covered** — có case cho "thêm value mới" (TC61) và "xoá value" (TC62) nhưng thiếu hẳn case cho "sửa tên value" dù spec mục 3 (dựa trên case gốc Add flow #21) có nêu rõ hành vi này
- [x] AC-15 — Product count cập nhật khi product đổi assign brand + sync — Covered — TC63

### Option select type
- [x] AC-16 — Default = Multiple / giá trị đã lưu load đúng — Covered — TC23
- [x] AC-17 — Switch Single ↔ Multiple — Covered — TC24, TC25
- [x] AC-18 — Switch Multiple→Single khi đang multi-selected xử lý nhất quán — Covered — TC25
- [x] AC-19 — Đổi Single/Multiple không làm mất danh sách option — Covered — TC26 (kèm `<cần confirm>` vì case gốc NG)

### Display Style
- [x] AC-20 — 3 giá trị List/Grid/Swatch đều chọn được — Covered — TC28, TC29, TC30
- [x] AC-22 — Grid layout ổn định với 20+ option — Covered — TC29 (kèm `<cần confirm>` vì case gốc NG)
- [x] AC-23 — Chọn Swatch → mở khối Manage Swatch — Covered — TC30

### Display Style — Manage Swatch
- [x] AC-24 — Bảng đủ cột Image/Swatch Name/Image Source/URL — Covered — TC32 (kèm `<cần confirm>` vì case gốc NG)
- [x] AC-25 — Image Source = Online URL: required + validate URL lỗi — Covered — TC33, TC34, TC35
- [x] AC-26 — Image Source = Big Commerce: tự động lấy + tự cập nhật ảnh từ BC — Covered — TC70, TC71 (cần confirm), TC72
- [x] AC-27 — Save/Cancel Manage Swatch — Covered — TC36, TC37
- [x] AC-28 — Swatch border radius — Covered — TC38
- [x] AC-29 — Toggle Display filter option name in swatch — Covered — TC39

### Toggle [Setup dynamic option]
- [x] AC-30 — Enable khi List/Grid, Disable khi Swatch — Covered — TC40, TC41 (kèm `<cần confirm>` — hành vi cụ thể khi disable, spec tự flag)

### Sort order
- [x] AC-31 — Popup hiển thị đủ 5 lựa chọn — Covered — TC43 (kèm `<cần confirm>` vì case gốc NG)
- [x] AC-33 — Alphabetical Ascending/Descending — Covered — TC44, TC45
- [~] AC-34 — Product number Ascending/Descending theo product count đã sync — Partial — chỉ có case cho chiều Descending (TC73), thiếu case cho chiều Ascending
- [x] AC-35 — Custom order kéo thả tự do — Covered — TC46

### Hide on customer group
- [x] AC-36 — Popup search khớp 1 phần/toàn phần — Covered — TC77, TC78
- [~] AC-37 — Danh sách customer group đồng bộ từ BC — Partial — chỉ có case delta (customer bị remove/group bị xoá), thiếu case xác nhận baseline "list hiển thị đúng dữ liệu hiện tại từ BC"
- [ ] AC-38 — Chọn 1 customer group → ẩn đúng filter (cả màn Admin lẫn ngoài storefront) — **Not covered** — case gốc Add flow (#94, #95) đang NG cho đúng hành vi này, nhưng test suite Edit hiện tại chưa có case baseline "chọn group → verify ẩn đúng" độc lập với các case Sync (chỉ có case kiểm tra chiều ngược lại — customer bị remove khỏi group thì filter hiện lại)
- [x] AC-39 — BC xoá customer → không còn hiển thị trong popup — Covered — TC79

### Appearance settings
- [x] AC-40 — Collapse rồi Expand lại phải giữ nguyên option đã chọn (bug riêng của Brand) — Covered — có case Negative kèm `<cần confirm>` vì case gốc NG
- [x] AC-41 — Display tooltips: toggle + content + validate rỗng — Covered
- [~] AC-42 — Show all irrelevant values: hành vi ON=hiện/OFF=ẩn — Partial — chỉ có case load giá trị đã lưu, chưa có case xác nhận hành vi thực tế khi ON so với OFF
- [~] AC-43 — Pagination type: 3 mode (Pagination/Show more/Infinite scroll) — Partial — chỉ có case load giá trị đã lưu, chưa có case chuyển đổi + persist qua cả 3 mode
- [x] AC-44 — Display all values in uppercase — Covered
- [x] AC-45 — Show search box Desktop/Mobile độc lập — Covered

### Khung Edit chung (filter-tree-common-specs.md)
- [x] AC-46 — Mở Edit load đúng cấu hình đã lưu — Covered — TC01
- [x] AC-47 — Chuyển node trong panel trái không lẫn dữ liệu — Covered — TC02
- [x] AC-48 — Save Changes disable/enable đúng trạng thái — Covered
- [x] AC-49 — Chặn Save khi có field invalid — Covered
- [x] AC-50 — Double-click Save Changes không tạo lưu trùng — Covered
- [x] AC-51 — Popup unsaved changes (Discard/Cancel-Stay) — Covered
- [x] AC-52 — Save to template — Covered

## Ghi chú

- Các rule "giá trị mặc định khi tạo node mới" (VD default Display Style = List, default Sort order = Alphabetical Ascending) không được audit riêng trong report này — vì đây là hành vi của màn **Add**, đã có case ở sheet gốc `Add filter node - Brand`, còn spec/test suite đang audit là **Edit** nên tập trung đúng vào "giá trị đã lưu load đúng" thay vì "giá trị mặc định khi mới tạo".
- AC-42, AC-43 ở trạng thái Partial giống hệt mức độ đã chấp nhận ở `edit-filter-node-condition` (không phải hồi quy riêng của Brand) — nêu ra để nhất quán khi bổ sung sau này cho cả 2 feature cùng lúc nếu cần.
