# Coverage checklist - filter-advanced-settings

## Tổng quan

- Tổng số rule: 52
- Covered: 50
- Partial: 1
- Not covered: 1

## Chi tiết

- [x] AC-01 — Phạm vi áp dụng toàn cục hay riêng từng filter tree (Q1) — Covered — TC: filter-advanced-settings_TC69, TC70
- [x] AC-02 — Show smart filter search: default OFF + tooltip đúng nội dung — Covered — TC: filter-advanced-settings_TC08
- [x] AC-03 — Show smart filter search ON: hiển thị đúng vị trí/placeholder ô search toàn cục — Covered — TC: filter-advanced-settings_TC01
- [x] AC-04 — Phạm vi node được search theo Option select type/Display style (Q6) — Covered — TC: filter-advanced-settings_TC05, TC06
- [x] AC-05 — Smart search có áp dụng Mobile không (Q4) — Covered — TC: filter-advanced-settings_TC07
- [x] AC-06 — Smart search song song per-node search box (dependency #1) — Covered — TC: filter-advanced-settings_TC03
- [x] AC-07 — Smart search OFF tắt lại đúng — Covered — TC: filter-advanced-settings_TC02
- [x] AC-08 — Show product count: default ON, không có tooltip — Covered — TC: filter-advanced-settings_TC19
- [x] AC-09 — Product count hiển thị đúng số liệu, ẩn/bật lại đúng — Covered — TC: filter-advanced-settings_TC09, TC10, TC11
- [x] AC-10 — Product count OFF nhưng rule ẩn node (#5) vẫn chạy ngầm (dependency #2↔#5) — Covered — TC: filter-advanced-settings_TC12
- [x] AC-11 — Product count phụ thuộc dữ liệu sync (tăng/giảm/stale/in-progress/failed/unpublish) — Covered — TC: filter-advanced-settings_TC13-TC18
- [x] AC-12 — Show Refine by block: default OFF + tooltip đúng nội dung — Covered — TC: filter-advanced-settings_TC32
- [x] AC-13 — Refine by ON: đúng cấu trúc block (tiêu đề + Clear all) — Covered — TC: filter-advanced-settings_TC20
- [x] AC-14 — Chip nhiều value cùng 1 node không gộp — Covered — TC: filter-advanced-settings_TC21
- [x] AC-15 — Node dạng range → 1 chip duy nhất — Covered — TC: filter-advanced-settings_TC22
- [x] AC-16 — Format chip đúng "{Node title}: {value}", value in đậm — Covered — TC: filter-advanced-settings_TC33
- [x] AC-17 — Xoá 1 value qua nút × trên chip — Covered — TC: filter-advanced-settings_TC23
- [x] AC-18 — Clear all bỏ chọn toàn bộ — Covered — TC: filter-advanced-settings_TC24
- [x] AC-19 — Chip cập nhật theo Node title khi đổi tên (dependency #3) — Covered — TC: filter-advanced-settings_TC25
- [x] AC-20 — Checkbox màu cam đồng bộ đúng value đang chọn — Covered — TC: filter-advanced-settings_TC26
- [x] AC-21 — Refine by hiển thị cả Desktop lẫn Mobile — Covered — TC: filter-advanced-settings_TC34
- [x] AC-22 — Trạng thái rỗng/chưa chọn gì của Refine by (Q12) — Covered — TC: filter-advanced-settings_TC27, TC28
- [x] AC-23 — Mobile apply model khi xoá chip (Q8) — Covered — TC: filter-advanced-settings_TC29
- [x] AC-24 — Xoá node ảnh hưởng chip đang hiển thị (impact) — Covered — TC: filter-advanced-settings_TC30, TC31
- [x] AC-25 — Shorten URLs: default OFF — Covered — TC: filter-advanced-settings_TC35
- [x] AC-26 — Shorten URLs × URL STRUCTURE — 6 kết quả URL (Q5, dependency #4↔#7) — Covered — TC: filter-advanced-settings_MTC01-MTC06 (file matrix, đã gỡ khỏi file bảng)
- [x] AC-27 — Hide filter node 1 option: default OFF — Covered — TC: filter-advanced-settings_TC45
- [x] AC-28 — Mâu thuẫn ẩn node vs ẩn option (Q3) — Covered — TC: filter-advanced-settings_TC36
- [x] AC-29 — Boundary option_count = 0/1/2 — Covered — TC: filter-advanced-settings_TC38, TC39 (+ TC36 cho count=1)
- [x] AC-30 — Toggle OFF giữ nguyên hiển thị dù option_count=1 — Covered — TC: filter-advanced-settings_TC37
- [x] AC-31 — Tất cả node cùng bị ẩn (Q13) — Covered — TC: filter-advanced-settings_TC40
- [x] AC-32 — Hành vi ẩn/hiện node theo tiến trình sync (tăng/giảm/in-progress/failed) — Covered — TC: filter-advanced-settings_TC41-TC44
- [x] AC-33 — Field #6 (Change label Refine By mobile): default OFF, không có note — Covered — TC: filter-advanced-settings_TC47
- [~] AC-34 — Hành vi cụ thể của field #6 khi tap trên Mobile (Q7) — Partial — TC: filter-advanced-settings_TC46 (spec hoàn toàn không mô tả nút nào đổi nhãn/đổi thành chữ gì, case chỉ dừng ở bước quan sát, chưa thể assert đúng/sai cho tới khi BA trả lời Q7)
- [x] AC-35 — URL STRUCTURE: giá trị/hiển thị mặc định khi đóng dropdown — Covered — TC: filter-advanced-settings_TC59
- [x] AC-36 — Dropdown URL STRUCTURE mở ra đủ 3 giá trị — Covered — TC: filter-advanced-settings_TC60
- [x] AC-37 — Chọn Old/New/SEO-friendly URL → URL tương ứng đúng định dạng — Covered — TC: filter-advanced-settings_TC48, TC49, TC50
- [x] AC-38 — Đóng dropdown không chọn giữ nguyên giá trị cũ — Covered — TC: filter-advanced-settings_TC61
- [x] AC-39 — URL SEO-friendly × Merge Values — tên hiển thị khi value đã merge (Q9) — Covered — TC: filter-advanced-settings_TC51, TC58
- [x] AC-40 — URL SEO-friendly × ký tự đặc biệt/dấu tiếng Việt (Q9) — Covered — TC: filter-advanced-settings_TC52
- [x] AC-41 — URL SEO-friendly × 2 node có value trùng tên (Q9) — Covered — TC: filter-advanced-settings_TC53
- [x] AC-42 — URL SEO-friendly phụ thuộc tiến trình sync (đổi tên/stale/link cũ/in-progress) — Covered — TC: filter-advanced-settings_TC54-TC57
- [x] AC-43 — Save Changes hiển thị enable sẵn dù chưa đổi gì, khác khung chung Filter Tree (Q10) — Covered — TC: filter-advanced-settings_TC66
- [x] AC-44 — Lưu thay đổi thành công, giữ giá trị sau reload — Covered — TC: filter-advanced-settings_TC62
- [x] AC-45 — Double-click Save Changes không tạo request trùng (Q10) — Covered — TC: filter-advanced-settings_TC64
- [x] AC-46 — Rời trang khi chưa lưu có cảnh báo unsaved changes không (Q10) — Covered — TC: filter-advanced-settings_TC65
- [x] AC-47 — 2 tab cùng sửa — hành vi ghi đè/xung đột — Covered — TC: filter-advanced-settings_TC63
- [x] AC-48 — Preview: tab Desktop active mặc định — Covered — TC: filter-advanced-settings_TC67
- [x] AC-49 — Preview: chuyển tab Mobile phản ánh đúng trạng thái toggle — Covered — TC: filter-advanced-settings_TC68
- [x] AC-50 — Advanced Settings × Filter Cache — cập nhật ngay hay cần rebuild (Q11) — Covered — TC: filter-advanced-settings_TC71, TC72
- [ ] AC-51 — "Show all irrelevant values" có note nhưng không có toggle trên panel (Q2) — Not covered — Chưa có test case nào vì chưa xác nhận field này có nên tồn tại ở màn Advanced Settings hay không; cần BA trả lời Q2 trước khi viết được case cho field này (nếu câu trả lời là "có", cần bổ sung qua `create-functional-testcase`)
- [x] AC-52 — Không tồn tại validate/threshold/rule bắt buộc bật tối thiểu 1 toggle/rule disable chéo giữa toggle (mục 5) — Covered — xác nhận bằng quyết định "task không cần case validate" đã ghi nhận khi chạy `create-matrix-testcase`, không phải do bỏ sót
