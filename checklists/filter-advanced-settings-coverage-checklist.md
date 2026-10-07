# Coverage checklist - filter-advanced-settings

## Tổng quan

- Tổng số rule: 54
- Covered: 52
- Partial: 1
- Not covered: 1

## Chi tiết

- [x] AC-01 — Phạm vi áp dụng toàn cục hay riêng từng filter tree (Q1) — Covered — TC: 73, 74
- [x] AC-02 — Show smart filter search: default OFF + tooltip đúng nội dung — Covered — TC: 10
- [x] AC-03 — Show smart filter search ON: hiển thị đúng vị trí/placeholder ô search toàn cục — Covered — TC: 1
- [x] AC-04 — Phạm vi node được search theo Option select type/Display style (Q6) — Covered — TC: 5, 6
- [x] AC-05 — Smart search có áp dụng Mobile không (Q4) — Covered — TC: 7, 69
- [x] AC-06 — Smart search song song per-node search box, đủ 2 tổ hợp decision table bổ sung (global×per-node) — Covered — TC: 3, 8, 9
- [x] AC-07 — Smart search OFF tắt lại đúng — Covered — TC: 2
- [x] AC-08 — Show product count: default ON, không có tooltip — Covered — TC: 21
- [x] AC-09 — Product count hiển thị đúng số liệu, ẩn/bật lại đúng — Covered — TC: 11, 12, 13
- [x] AC-10 — Product count OFF nhưng rule ẩn node (#5) vẫn chạy ngầm (dependency #2↔#5) — Covered — TC: 14
- [x] AC-11 — Product count phụ thuộc dữ liệu sync (tăng/giảm/stale/in-progress/failed/unpublish) — Covered — TC: 15-20
- [x] AC-12 — Show Refine by block: default OFF + tooltip đúng nội dung — Covered — TC: 34
- [x] AC-13 — Refine by ON: đúng cấu trúc block (tiêu đề + Clear all) — Covered — TC: 22
- [x] AC-14 — Chip nhiều value cùng 1 node không gộp — Covered — TC: 23
- [x] AC-15 — Node dạng range → 1 chip duy nhất — Covered — TC: 24
- [x] AC-16 — Format chip đúng "{Node title}: {value}", value in đậm — Covered — TC: 35
- [x] AC-17 — Xoá 1 value qua nút × trên chip — Covered — TC: 25
- [x] AC-18 — Clear all bỏ chọn toàn bộ — Covered — TC: 26
- [x] AC-19 — Chip cập nhật theo Node title khi đổi tên (dependency #3) — Covered — TC: 27
- [x] AC-20 — Checkbox màu cam đồng bộ đúng value đang chọn — Covered — TC: 28
- [x] AC-21 — Refine by hiển thị cả Desktop lẫn Mobile — Covered — TC: 36
- [x] AC-22 — Trạng thái rỗng/chưa chọn gì của Refine by (Q12) — Covered — TC: 29, 30
- [x] AC-23 — Mobile apply model khi xoá chip (Q8) — Covered — TC: 31
- [x] AC-24 — Xoá node ảnh hưởng chip đang hiển thị (impact) — Covered — TC: 32, 33
- [x] AC-25 — Shorten URLs: default OFF — Covered — TC: 37
- [x] AC-26 — Shorten URLs × URL STRUCTURE — 6 kết quả URL + boundary ≥3 value (Q5, dependency #4↔#7) — Covered — TC: 78-84 (đã gộp từ file matrix vào thẳng file bảng theo yêu cầu, không còn file matrix riêng)
- [x] AC-27 — Hide filter node 1 option: default OFF — Covered — TC: 48
- [x] AC-28 — Mâu thuẫn ẩn node vs ẩn option (Q3), kèm case then chốt phân biệt 2 cách hiểu (node ≥2 option nhưng mỗi option count=1) — Covered — TC: 38, 43
- [x] AC-29 — Boundary option_count = 0/1/2 — Covered — TC: 40, 41 (+ 38 cho count=1)
- [x] AC-30 — Toggle OFF giữ nguyên hiển thị dù option_count=1 — Covered — TC: 39
- [x] AC-31 — Tất cả node cùng bị ẩn (Q13) — Covered — TC: 42
- [x] AC-32 — Hành vi ẩn/hiện node theo tiến trình sync (tăng/giảm/in-progress/failed) — Covered — TC: 44-47
- [x] AC-33 — Field #6 (Change label Refine By mobile): default OFF, không có note — Covered — TC: 50
- [~] AC-34 — Hành vi cụ thể của field #6 khi tap trên Mobile (Q7) — Partial — TC: 49 (spec hoàn toàn không mô tả nút nào đổi nhãn/đổi thành chữ gì, case chỉ dừng ở bước quan sát, chưa thể assert đúng/sai cho tới khi BA trả lời Q7)
- [x] AC-35 — URL STRUCTURE: giá trị/hiển thị mặc định khi đóng dropdown — Covered — TC: 63
- [x] AC-36 — Dropdown URL STRUCTURE mở ra đủ 3 giá trị — Covered — TC: 64
- [x] AC-37 — Chọn Old/New/SEO-friendly URL → URL tương ứng đúng định dạng — Covered — TC: 51, 52, 53
- [x] AC-38 — Đóng dropdown không chọn giữ nguyên giá trị cũ — Covered — TC: 65
- [x] AC-39 — URL SEO-friendly × Merge Values — tên hiển thị khi value đã merge (Q9) — Covered — TC: 54, 62
- [x] AC-40 — URL SEO-friendly × ký tự đặc biệt/dấu tiếng Việt (Q9) — Covered — TC: 55
- [x] AC-41 — URL SEO-friendly × 2 node có value trùng tên (Q9) — Covered — TC: 56
- [x] AC-42 — URL SEO-friendly phụ thuộc tiến trình sync (đổi tên/stale/link cũ/in-progress) — Covered — TC: 58-61
- [x] AC-43 — Save Changes hiển thị enable sẵn dù chưa đổi gì, khác khung chung Filter Tree (Q10) — Covered — TC: 70
- [x] AC-44 — Lưu thay đổi thành công, giữ giá trị sau reload — Covered — TC: 66
- [x] AC-45 — Double-click Save Changes không tạo request trùng (Q10) — Covered — TC: 68
- [x] AC-46 — Rời trang khi chưa lưu có cảnh báo unsaved changes không (Q10) — Covered — TC: 69
- [x] AC-47 — 2 tab cùng sửa — hành vi ghi đè/xung đột — Covered — TC: 67
- [x] AC-48 — Preview: tab Desktop active mặc định — Covered — TC: 71
- [x] AC-49 — Preview: chuyển tab Mobile phản ánh đúng trạng thái 2 toggle cụ thể (Refine by + smart search) — Covered — TC: 72
- [x] AC-50 — Advanced Settings × Filter Cache — cập nhật ngay hay cần rebuild (Q11) — Covered — TC: 75, 76
- [ ] AC-51 — "Show all irrelevant values" có note nhưng không có toggle trên panel (Q2) — Not covered — Chưa có test case nào vì chưa xác nhận field này có nên tồn tại ở màn Advanced Settings hay không; cần BA trả lời Q2 trước khi viết được case cho field này (nếu câu trả lời là "có", cần bổ sung qua `create-functional-testcase`)
- [x] AC-52 — Không tồn tại validate/threshold/rule bắt buộc bật tối thiểu 1 toggle/rule disable chéo giữa toggle (mục 5) — Covered — xác nhận bằng quyết định "task không cần case validate" đã ghi nhận khi chạy `create-matrix-testcase`, không phải do bỏ sót
- [x] AC-53 — Block filter hiển thị nhất quán trên cả Search Result Page (SRP) và Category Page (2 trang dùng chung block filter theo CLAUDE.md) — Covered — TC: 77
- [x] AC-54 — Đổi URL STRUCTURE sang kiểu khác có phá vỡ link cũ đã bookmark theo kiểu trước đó không — Covered — TC: 57
