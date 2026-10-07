# Coverage checklist - filter-advanced-settings

Đối chiếu: `docs/specs/filter-advanced-settings-specs.md` (kèm mục 3.4) ↔ `filter-advanced-settings_testcase.csv` (131 case, số thứ tự ở cột ID). Dòng Purpose không tính.

## Tổng quan

- Tổng số rule: 87
- Covered: 82
- Partial: 2
- Not covered: 3

> "Covered" nghĩa là có case kiểm tra đúng rule; nhiều case vẫn còn `<cần confirm>` ở Note vì kết quả chờ BA (Q8, Q9, Q12–Q16, Q18…) — không làm đổi trạng thái coverage.

## Chi tiết

### Show smart filter search
- [x] AC-01 — Default OFF + tooltip đúng nội dung — Covered — TC: 33, 125
- [x] AC-02 — ON: 1 ô search chung ở đầu panel, placeholder, trên block Refine by — Covered — TC: 1
- [x] AC-03 — Tắt lại, ô search biến mất — Covered — TC: 2
- [x] AC-04 — Phạm vi theo Display Style = List/Grid (không theo Option select type) — Covered — TC: 12
- [x] AC-05 — Node Swatch/Slider-input/Dropdown ngoài phạm vi, bị ẩn khi đang gõ — Covered — TC: 13
- [x] AC-06 — Chưa gõ từ khoá: mọi node (kể cả ngoài phạm vi) hiển thị đủ — Covered — TC: 9
- [x] AC-07 — Lọc ngay khi gõ, không cần Enter — Covered — TC: 4
- [x] AC-08 — Khớp một phần, không phân biệt hoa/thường — Covered — TC: 5
- [x] AC-09 — Cắt khoảng trắng đầu/cuối — Covered — TC: 16
- [x] AC-10 — Chỉ khớp tên value, không khớp tên node — Covered — TC: 15
- [x] AC-11 — Node có value khớp chỉ giữ value khớp — Covered — TC: 5
- [x] AC-12 — Node trong phạm vi không có value khớp bị ẩn cả node — Covered — TC: 6
- [x] AC-13 — Không có kết quả: `No results found for "[keyword]"` (kể cả emoji/ký tự đặc biệt) — Covered — TC: 7, 11
- [x] AC-14 — Value đang chọn nhưng không khớp bị ẩn (filter vẫn áp dụng) — Covered — TC: 17
- [x] AC-15 — Node đang thu gọn không tự mở, tiêu đề vẫn hiển thị — Covered — TC: 18
- [x] AC-16 — Không Show more/phân trang trong kết quả — Covered — TC: 19
- [x] AC-17 — Mobile có ô search và lọc như Desktop — Covered — TC: 8, 14
- [x] AC-18 — Ô search chung và ô search riêng của node hoạt động độc lập — Covered — TC: 3, 20
- [x] AC-19 — Gõ tên value con không tìm ra merged value — Covered — TC: 32
- [x] AC-20 — Xoá từ khoá: panel trở lại đầy đủ — Covered — TC: 10
- [ ] AC-21 — Sau khi chọn 1 value từ kết quả, từ khoá giữ hay tự xoá (Q&A #12) — Not covered — chưa chốt hành vi, chưa viết được expected
- [~] AC-22 — Không còn node nào thuộc phạm vi thì ô search ẩn hay hiện (Q&A #17) — Partial — TC: 29 (chỉ quan sát, chờ chốt)
- [ ] AC-23 — Gõ không dấu có khớp value có dấu (Q&A #10) — Not covered — chưa chốt hành vi
- [~] AC-24 — Swatch đã tắt hiển thị tên: gõ tên value — Partial — TC: 26 (câu trả lời "tìm ra được" mâu thuẫn quy tắc Swatch ngoài phạm vi)
- [x] AC-25 — Đổi Display Style ở Edit filter node làm đổi phạm vi search (List/Grid ↔ Swatch/Dropdown, đang có value được chọn, Save to template, Discard, node cuối cùng, shopper đang mở trang, sync ghi đè, merged value) — Covered — TC: 21, 22, 23, 24, 27, 28, 29, 30, 31, 32
- [x] AC-26 — Hiệu lực ngay sau Save, không cần làm mới cache — Covered — TC: 25, 123

### Show product count
- [x] AC-27 — Default ON, không có tooltip — Covered — TC: 125
- [x] AC-28 — Hiển thị đúng số lượng; tắt ẩn; bật lại hiển thị — Covered — TC: 34, 35, 36
- [x] AC-29 — OFF chỉ ẩn số, rule ẩn node theo count vẫn chạy — Covered — TC: 37
- [x] AC-30 — Count theo dữ liệu sync (tăng/giảm/unpublish/đang sync/Failed/stale) — Covered — TC: 38, 39, 40, 41, 42, 43
- [x] AC-31 — Count của merged value (đếm không trùng, ẩn/hiện số) — Covered — TC: 44
- [ ] AC-32 — Note "Show all irrelevant values (product count = 0)" trong design (Q2) — Not covered — field không có trên panel, chờ chốt Q2 trước khi viết case

### Show Refine by block
- [x] AC-33 — Default OFF + tooltip đúng nội dung — Covered — TC: 58
- [x] AC-34 — ON: block đầu panel (tiêu đề + Clear all) — Covered — TC: 45
- [x] AC-35 — Nhiều value cùng node: chip riêng, không gộp — Covered — TC: 46
- [x] AC-36 — Node range: 1 chip duy nhất — Covered — TC: 47
- [x] AC-37 — Format chip `{Node title}: {value}`, value in đậm, có × — Covered — TC: 59
- [x] AC-38 — Bỏ chọn qua × — Covered — TC: 48
- [x] AC-39 — Clear all — Covered — TC: 49
- [x] AC-40 — Chip đổi theo Node title mới — Covered — TC: 50
- [x] AC-41 — Checkbox màu cam đồng bộ value đang chọn — Covered — TC: 51
- [x] AC-42 — Hiển thị trên cả Desktop và Mobile — Covered — TC: 60
- [x] AC-43 — Block khi chưa chọn gì / xoá hết chip (Q12) — Covered — TC: 52, 53
- [x] AC-44 — Mobile: × áp dụng ngay hay chờ Apply (Q8) — Covered — TC: 54
- [x] AC-45 — Xoá node đang có value active trên Refine by — Covered — TC: 55, 56
- [x] AC-46 — Chip của merged value — Covered — TC: 57

### Shorten URLs when selecting multiple filter options
- [x] AC-47 — Default OFF — Covered — TC: 125
- [x] AC-48 — Shorten × URL STRUCTURE: 6 kết quả URL — Covered — TC: 126, 127, 128, 129, 130, 131 (126 còn cần confirm Old URL + Shorten ON)
- [x] AC-49 — Merged value tính là 1 phần tử: 1 merged / merged + value thường / 2 merged / Shorten OFF — Covered — TC: 61, 62, 63, 64
- [x] AC-50 — Mở trực tiếp URL đã gộp — Covered — TC: 65
- [x] AC-51 — Tên merged value đặc biệt: dấu phẩy, 255 ký tự, dấu tiếng Việt/khoảng trắng — Covered — TC: 66, 67, 68
- [x] AC-52 — Merged value Status OFF / Delete khi link cũ đang dùng (tên riêng, tên trùng value con) — Covered — TC: 69, 70, 71, 72
- [x] AC-53 — Bật lại Status, đổi tên, thêm value con, bớt value con, xoá rồi tạo lại cùng tên — Covered — TC: 73, 74, 75, 76, 77
- [x] AC-54 — Value con đổi tên bên BigCommerce rồi sync — Covered — TC: 78
- [x] AC-55 — URL dùng text merge ngay sau khi tạo merged value — Covered — TC: 79
- [x] AC-56 — Merged value ở dạng New URL / Old URL — Covered — TC: 80, 81

### Hide filter node with only one filter option
- [x] AC-57 — Default OFF — Covered — TC: 125
- [x] AC-58 — Ẩn cả node khi node chỉ còn 1 option (Q3) — Covered — TC: 82
- [x] AC-59 — Tắt lại, node hiển thị lại — Covered — TC: 83
- [x] AC-60 — Boundary option_count = 0 / 1 / 2 — Covered — TC: 82, 84, 85
- [x] AC-61 — Tất cả node cùng bị ẩn (Q13) — Covered — TC: 86
- [x] AC-62 — Theo tiến trình sync (tăng/giảm/đang sync/Failed) — Covered — TC: 89, 90, 91, 92
- [x] AC-63 — Option duy nhất đang được chọn: shopper không bị kẹt filter — Covered — TC: 87, 88
- [x] AC-64 — Merged value tính là 1 option khi xét rule ẩn node — Covered — TC: 93

### Change label of Refine By button on mobile when tapping on it
- [x] AC-65 — Default OFF — Covered — TC: 125
- [x] AC-66 — ON: nhãn nút đổi thành "Hide filter" khi tap — Covered — TC: 94
- [x] AC-67 — OFF: nhãn giữ nguyên — Covered — TC: 95

### URL STRUCTURE
- [x] AC-68 — Giá trị mặc định/hiển thị khi đóng dropdown — Covered — TC: 109, 125
- [x] AC-69 — Dropdown mở ra đủ 3 giá trị — Covered — TC: 110
- [x] AC-70 — Chọn Old/New/SEO-friendly → URL đúng định dạng — Covered — TC: 96, 97, 98
- [x] AC-71 — Đóng dropdown không chọn giữ nguyên giá trị — Covered — TC: 111
- [x] AC-72 — SEO-friendly × merged value (tên riêng/tên trùng value con) — Covered — TC: 105 (và TC: 61-64)
- [x] AC-73 — SEO-friendly × ký tự đặc biệt/dấu tiếng Việt — Covered — TC: 99
- [x] AC-74 — SEO-friendly × 2 node có value trùng tên — Covered — TC: 100
- [x] AC-75 — SEO-friendly theo sync (đổi tên, stale, link cũ, đang sync) — Covered — TC: 101, 102, 103, 104
- [x] AC-76 — Link cũ khi đổi URL STRUCTURE (Old/New/SEO, cả hai chiều) — Covered — TC: 106, 107, 108

### Save Changes, Preview, phạm vi, bố cục
- [x] AC-77 — Lưu thành công, giữ giá trị sau reload — Covered — TC: 112
- [x] AC-78 — 2 tab cùng sửa — Covered — TC: 113
- [x] AC-79 — Double-click Save Changes — Covered — TC: 114
- [x] AC-80 — Rời trang khi chưa lưu (unsaved changes) — Covered — TC: 115
- [x] AC-81 — Save Changes enable sẵn khi chưa đổi gì (khác khung Filter Tree) — Covered — TC: 116
- [x] AC-82 — Preview: tab Desktop mặc định — Covered — TC: 117
- [x] AC-83 — Preview: chuyển tab Mobile — Covered — TC: 118
- [x] AC-84 — Preview phản ánh toggle chưa Save (Desktop, Mobile ô search) — Covered — TC: 119, 120
- [x] AC-85 — Advanced Settings là setting toàn cục (đổi 1 lần áp dụng mọi tree) — Covered — TC: 121, 122, 123
- [x] AC-86 — Nhãn và thành phần màn hình đúng design — Covered — TC: 124, 125
- [x] AC-87 — Không có validate/threshold/rule bắt buộc bật tối thiểu 1 toggle/rule disable chéo giữa toggle (mục 5) — Covered — xác nhận bằng quyết định "không cần case validate" khi chạy create-matrix-testcase
