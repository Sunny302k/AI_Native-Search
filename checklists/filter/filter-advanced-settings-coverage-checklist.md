# Coverage checklist - filter-advanced-settings

Đối chiếu: `docs/specs/filter-advanced-settings-specs.md` (kèm mục 3.4, 3.5) ↔ `filter-advanced-settings_testcase.csv` (159 case, số thứ tự ở cột ID). Dòng Purpose không tính.

## Tổng quan

- Tổng số rule: 100
- Covered: 99
- Partial: 0
- Not covered: 1

> "Covered" nghĩa là có case kiểm tra đúng rule; nhiều case vẫn còn `<cần confirm>` ở Note vì kết quả chờ BA (Q8, Q9, Q12–Q16, Q18…) — không làm đổi trạng thái coverage.

## Chi tiết

### Show smart filter search
- [x] AC-01 — Default OFF + tooltip đúng nội dung — Covered — TC: 35, 144
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
- [x] AC-19 — Gõ tên value con không tìm ra merged value — Covered — TC: 34
- [x] AC-20 — Xoá từ khoá: panel trở lại đầy đủ — Covered — TC: 10
- [x] AC-21 — Sau khi chọn 1 value từ kết quả, từ khoá được giữ nguyên (Q&A #12) — Covered — TC: 21
- [x] AC-22 — Không còn node nào thuộc phạm vi: ô search vẫn hiện, gõ gì cũng `No results found` (Q&A #17) — Covered — TC: 31
- [x] AC-23 — Gõ không dấu khớp value có dấu (Q&A #10) — Covered — TC: 22
- [x] AC-24 — Swatch đã tắt hiển thị tên: vẫn ngoài phạm vi, node bị ẩn khi đang gõ (Q&A #16) — Covered — TC: 28
- [x] AC-25 — Đổi Display Style ở Edit filter node làm đổi phạm vi search (List/Grid ↔ Swatch/Dropdown, đang có value được chọn, Save to template, Discard, node cuối cùng, shopper đang mở trang, sync ghi đè, merged value) — Covered — TC: 23, 24, 25, 26, 29, 30, 31, 32, 33, 34
- [x] AC-26 — Hiệu lực ngay sau Save, không cần làm mới cache — Covered — TC: 27, 142

### Show product count
- [x] AC-27 — Default ON, không có tooltip — Covered — TC: 144
- [x] AC-28 — Hiển thị đúng số lượng; tắt ẩn; bật lại hiển thị — Covered — TC: 36, 37, 38
- [x] AC-29 — OFF chỉ ẩn số, rule ẩn node theo count vẫn chạy — Covered — TC: 39
- [x] AC-30 — Count theo dữ liệu sync (tăng/giảm/unpublish/đang sync/Failed/stale) — Covered — TC: 40, 41, 42, 43, 44, 45
- [x] AC-31 — Count của merged value (đếm không trùng, ẩn/hiện số) — Covered — TC: 46
- [ ] AC-32 — Note "Show all irrelevant values (product count = 0)" trong design (Q2) — Not covered — field không có trên panel, chờ chốt Q2 trước khi viết case

### Show Refine by block
- [x] AC-33 — Default OFF + tooltip đúng nội dung — Covered — TC: 60
- [x] AC-34 — ON: block đầu panel (tiêu đề + Clear all) — Covered — TC: 47
- [x] AC-35 — Nhiều value cùng node: chip riêng, không gộp — Covered — TC: 48
- [x] AC-36 — Node range: 1 chip duy nhất — Covered — TC: 49
- [x] AC-37 — Format chip `{Node title}: {value}`, value in đậm, có × — Covered — TC: 61
- [x] AC-38 — Bỏ chọn qua × — Covered — TC: 50
- [x] AC-39 — Clear all — Covered — TC: 51
- [x] AC-40 — Chip đổi theo Node title mới — Covered — TC: 52
- [x] AC-41 — Checkbox màu cam đồng bộ value đang chọn — Covered — TC: 53
- [x] AC-42 — Hiển thị trên cả Desktop và Mobile — Covered — TC: 62
- [x] AC-43 — Block khi chưa chọn gì / xoá hết chip (Q12) — Covered — TC: 54, 55
- [x] AC-44 — Mobile: × áp dụng ngay hay chờ Apply (Q8) — Covered — TC: 56
- [x] AC-45 — Xoá node đang có value active trên Refine by — Covered — TC: 57, 58
- [x] AC-46 — Chip của merged value — Covered — TC: 59

### Shorten URLs when selecting multiple filter options
- [x] AC-47 — Default OFF — Covered — TC: 144
- [x] AC-48 — Shorten × URL STRUCTURE: 6 kết quả URL — Covered — TC: 145, 146, 147, 148, 149, 150 (126 còn cần confirm Old URL + Shorten ON)
- [x] AC-49 — Merged value tính là 1 phần tử: 1 merged / merged + value thường / 2 merged / Shorten OFF — Covered — TC: 63, 64, 65, 66
- [x] AC-50 — Mở trực tiếp URL đã gộp — Covered — TC: 67
- [x] AC-51 — Tên merged value đặc biệt: dấu phẩy, 255 ký tự, dấu tiếng Việt/khoảng trắng — Covered — TC: 68, 69, 70
- [x] AC-52 — Merged value Status OFF / Delete khi link cũ đang dùng (tên riêng, tên trùng value con) — Covered — TC: 71, 72, 73, 74
- [x] AC-53 — Bật lại Status, đổi tên, thêm value con, bớt value con, xoá rồi tạo lại cùng tên — Covered — TC: 75, 76, 77, 78, 79
- [x] AC-54 — Value con đổi tên bên BigCommerce rồi sync — Covered — TC: 80
- [x] AC-55 — URL dùng text merge ngay sau khi tạo merged value — Covered — TC: 81
- [x] AC-56 — Merged value ở dạng New URL / Old URL — Covered — TC: 82, 83

### Hide filter node with only one filter option
- [x] AC-57 — Default OFF — Covered — TC: 144
- [x] AC-58 — Ẩn cả node khi node chỉ còn 1 option (Q3) — Covered — TC: 84
- [x] AC-59 — Tắt lại, node hiển thị lại — Covered — TC: 85
- [x] AC-60 — Boundary option_count = 0 / 1 / 2 — Covered — TC: 84, 87, 88
- [x] AC-61 — Tất cả node cùng bị ẩn: ẩn luôn cả khối filter (Q13) — Covered — TC: 89
- [x] AC-62 — Theo tiến trình sync (tăng/giảm/đang sync/Failed, sản phẩm đổi category) — Covered — TC: 107, 108, 109, 110, 111
- [x] AC-63 — Node bị ẩn mà filter của node vẫn áp dụng (mở link, hoặc sync làm node co về 1 option): link vẫn lọc; bỏ filter qua Clear all hoặc sửa URL — Covered — TC: 90, 91
- [x] AC-64 — Merged value tính là 1 option khi xét rule ẩn node — Covered — TC: 112
- [x] AC-88 — Số option tính theo từng trang (Category Page, Search Result Page theo từng từ khoá) — Covered — TC: 86
- [x] AC-89 — Không tính lại số option khi shopper chọn thêm filter — Covered — TC: 96
- [x] AC-90 — Node dạng khoảng (List/Grid hoặc Slider) không áp dụng rule ẩn node — Covered — TC: 92, 93, 94
- [x] AC-91 — Node đang bị ẩn không tham gia smart filter search; tắt toggle thì node hiện lại và được search — Covered — TC: 95, 85
- [x] AC-92 — Option có số lượng bằng 0 không được tính; rule ẩn node ưu tiên hơn Show all irrelevant values (kể cả khi shopper lọc làm option về 0) — Covered — TC: 151, 152, 153, 154, 155, 156
- [x] AC-93 — Node bị ẩn vẫn giữ nguyên cấu hình ở Edit filter node, hiện lại đúng cấu hình khi tắt toggle — Covered — TC: 157, 85
- [x] AC-94 — Merchandise Campaign theo thuộc tính của node đang bị ẩn không bị ảnh hưởng — Covered — TC: 158
- [x] AC-95 — Rule ẩn cả node, không ẩn từng option có số lượng bằng 1 (khác bullet note trong design) — Covered — TC: 97
- [x] AC-96 — Mọi node bị ẩn trong lúc đang có filter của node ẩn: shopper vẫn bỏ được filter (Desktop, Mobile) — Covered — TC: 98, 99 (còn cần confirm, xem Q19)
- [x] AC-97 — Áp dụng cho mọi node có danh sách option rời rạc: Swatch, Grid, Dropdown, Category, Review Ratings — Covered — TC: 100, 101, 102, 103, 104 (103, 104 còn cần confirm)
- [x] AC-98 — Ẩn node trong drawer Mobile — Covered — TC: 105
- [x] AC-99 — Category Page có subcategory — Covered — TC: 106 (còn cần confirm, xem Q23)
- [x] AC-100 — Campaign Hide/Filter làm thay đổi tập sản phẩm của trang, từ đó đổi số option — Covered — TC: 159 (còn cần confirm, xem Q20)

### Change label of Refine By button on mobile when tapping on it
- [x] AC-65 — Default OFF — Covered — TC: 144
- [x] AC-66 — ON: nhãn nút đổi thành "Hide filter" khi tap — Covered — TC: 113
- [x] AC-67 — OFF: nhãn giữ nguyên — Covered — TC: 114

### URL STRUCTURE
- [x] AC-68 — Giá trị mặc định/hiển thị khi đóng dropdown — Covered — TC: 128, 144
- [x] AC-69 — Dropdown mở ra đủ 3 giá trị — Covered — TC: 129
- [x] AC-70 — Chọn Old/New/SEO-friendly → URL đúng định dạng — Covered — TC: 115, 116, 117
- [x] AC-71 — Đóng dropdown không chọn giữ nguyên giá trị — Covered — TC: 130
- [x] AC-72 — SEO-friendly × merged value (tên riêng/tên trùng value con) — Covered — TC: 124 (và TC: 63-66)
- [x] AC-73 — SEO-friendly × ký tự đặc biệt/dấu tiếng Việt — Covered — TC: 118
- [x] AC-74 — SEO-friendly × 2 node có value trùng tên — Covered — TC: 119
- [x] AC-75 — SEO-friendly theo sync (đổi tên, stale, link cũ, đang sync) — Covered — TC: 120, 121, 122, 123
- [x] AC-76 — Link cũ khi đổi URL STRUCTURE (Old/New/SEO, cả hai chiều) — Covered — TC: 125, 126, 127

### Save Changes, Preview, phạm vi, bố cục
- [x] AC-77 — Lưu thành công, giữ giá trị sau reload — Covered — TC: 131
- [x] AC-78 — 2 tab cùng sửa — Covered — TC: 132
- [x] AC-79 — Double-click Save Changes — Covered — TC: 133
- [x] AC-80 — Rời trang khi chưa lưu (unsaved changes) — Covered — TC: 134
- [x] AC-81 — Save Changes enable sẵn khi chưa đổi gì (khác khung Filter Tree) — Covered — TC: 135
- [x] AC-82 — Preview: tab Desktop mặc định — Covered — TC: 136
- [x] AC-83 — Preview: chuyển tab Mobile — Covered — TC: 137
- [x] AC-84 — Preview phản ánh toggle chưa Save (Desktop, Mobile ô search) — Covered — TC: 138, 139
- [x] AC-85 — Advanced Settings là setting toàn cục (đổi 1 lần áp dụng mọi tree) — Covered — TC: 140, 141, 142
- [x] AC-86 — Nhãn và thành phần màn hình đúng design — Covered — TC: 143, 144
- [x] AC-87 — Không có validate/threshold/rule bắt buộc bật tối thiểu 1 toggle/rule disable chéo giữa toggle (mục 5) — Covered — xác nhận bằng quyết định "không cần case validate" khi chạy create-matrix-testcase
