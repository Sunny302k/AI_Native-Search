# Coverage checklist - Stopwords

Đối chiếu `docs/specs/search-stopwords-specs.md` (mục 2.1, 2.2, 3.1-3.3, 3.5, 4.1-4.2, 5, 6) với:
- `test-cases/search/stopwords/stopwords_testcase.csv` (45 test case, ID 1-45 — 30 functional gốc + 5 case Export/Import mới (ID 31-35, phát hiện sau review) + 10 impact (ID 36-45))

Ghi chú: không chạy `create-system-testcase` (không có luồng đa tác nhân rõ ràng trên Figma), không chạy `create-sync-testcase` (dữ liệu Stopwords hoàn toàn là Config nội bộ, không sync từ BigCommerce — dataflow Lark xử lý query shopper, không phải Product data). Không có file matrix riêng (2 case validate không tổ hợp field). Permission/API không áp dụng.

## Tổng quan

- Tổng số rule: 50
- Covered: 30
- Partial: 16
- Not covered: 4

## Chi tiết

### §2.1 Màn danh sách Stop words

- [x] 1 — Nút back + tiêu đề "Stop words" — Covered — TC: 1
- [x] 2 — Feature Tour nội dung + thu gọn/mở lại — Covered — TC: 2 (nội dung + ảnh demo đã xác nhận qua Figma)
- [x] 3 — 2 Tab "Manual Stop Word" / "AI Stop Word" (Coming soon) — Covered — TC: 3
- [x] 4 — Empty state "There are currently no stop word." — Covered — TC: 4
- [x] 5 — Nút Create new — Covered — TC: 5
- [x] 6 — Stop Word List: cấu trúc lưới chip (không phải bảng cột) — Covered — TC: 6
- [x] 7 — Mỗi chip chỉ có 1 icon Delete (không có Edit) — Covered — TC: 7
- [~] 8 — Pagination 15 records/trang — Partial — TC: 8 (câu hỏi mở #3, chưa chắc là số cố định)
- [x] 9 — Search: có kết quả — Covered — TC: 9
- [~] 10 — Search: no result — Partial — TC: 10 (chưa xác nhận nội dung chữ empty-state khi search)
- [x] 11 — Search: xoá từ khoá → full list — Covered — TC: 11
- [~] 12 — Search: khớp chính xác hay khớp 1 phần — Partial — TC: 12 (câu hỏi mở #9)
- [x] 13 — Search: paste chuỗi dài (robustness) — Covered — TC: 13
- [x] 14 — Chip: hành vi khi vượt 100% chiều rộng dòng (cắt bằng "…") — Covered — TC: 14 (đã đóng câu hỏi mở #2 qua ảnh Figma)
- [x] 15 — Chip: boundary min 285px (1 ký tự) — Covered — TC: 15 (đã sửa số liệu đúng, trước đó ghi nhầm 28px)

### §2.2 Modal Create new stop word

- [x] 16 — Modal: trạng thái mặc định (placeholder "Add a stop word") — Covered — TC: 16
- [x] 17 — Nhập 1 stop word hợp lệ rồi Save (toast "Created stop word!") — Covered — TC: 17
- [x] 18 — Thêm nhiều dòng bằng [Add more stop word], tự cuộn — Covered — TC: 18
- [x] 19 — Xoá 1 dòng bằng icon trash (chưa Save) — Covered — TC: 19
- [x] 20 — Validate: 2 dòng trùng trong cùng phiên → "Stopword must be unique!" — Covered — TC: 20
- [x] 21 — Validate: trùng với stop word đã tồn tại → "Stop word already existed" — Covered — TC: 21
- [~] 22 — Stop word để trống rồi Save — Partial — TC: 22 (câu hỏi mở #7)
- [x] 23 — Paste dài/emoji vào ô input — Covered — TC: 23
- [x] 24 — Cancel đóng modal không lưu — Covered — TC: 24
- [x] 25 — Error guessing: spam click Save — Covered — TC: 25

### §4.1 Delete popup

- [x] 26 — Nội dung popup "Delete stop word?" — Covered — TC: 26
- [~] 27 — Màu/nhãn 2 nút đảo ngược — Partial — TC: 27 (câu hỏi mở #4, chung cả 3 feature)
- [~] 28 — Xác nhận xoá + toast — Partial — TC: 28 (câu hỏi mở #5; đã phát hiện Figma demo tái dùng sai toast Create cho Delete, case cập nhật thành 2 nhánh kết quả)
- [x] 29 — Cancel huỷ xoá — Covered — TC: 29
- [x] 30 — Đóng popup bằng Esc/click ngoài — Covered — TC: 30

### §4.2 Không có flow Edit

- [x] 31 — Xác nhận không có flow Edit (chỉ Create/Delete) — Covered — TC: 7 (đã đóng câu hỏi mở #6 qua xác nhận chip chỉ có icon Delete)

### Export / Import (mới phát hiện sau review-testcase-quality)

- [x] 32 — Nút Export/Import hiển thị cạnh Create new, đang active — Covered — TC: 31
- [~] 33 — Hành vi click Export — Partial — TC: 32 (không có modal/flow thiết kế để đối chiếu)
- [~] 34 — Hành vi click Import — Partial — TC: 33 (không có modal/flow thiết kế để đối chiếu)
- [~] 35 — Import file chứa dòng trùng dữ liệu đã có — Partial — TC: 34
- [~] 36 — Import file sai định dạng — Partial — TC: 35

### §3.5 Dataflow theo keystroke + 2 nguồn + default list (theo Lark)

- [x] 37 — ISW lọc đúng từ ngay khi gõ khớp stopword (tạo mới) — Covered — TC: 36
- [x] 38 — ISW ngừng lọc sau khi xoá stop word — Covered — TC: 37
- [x] 39 — Gõ thêm ký tự khiến query vừa khớp thêm 1 stopword giữa chừng — Covered — TC: 38
- [x] 40 — Xoá bớt ký tự khiến query không còn khớp stopword — Covered — TC: 39
- [~] 41 — Stopword filter có áp dụng trên SRP (không qua ISW) không — Partial — TC: 40 (câu hỏi mở #10)
- [ ] 42 — 2 nguồn stopword: "nguồn tổng hợp của app" (ẩn, không hiển thị Admin) — Not covered — không thể test qua UI Admin theo đúng mô tả (merchant không thấy/không sửa được), cần môi trường/API riêng ngoài phạm vi UI testing nếu muốn xác minh tồn tại
- [ ] 43 — Default stopword list khi cài app mới (`a, am, an,...`) — Not covered — cần môi trường cài app mới (fresh install) để verify, không tái tạo được trong phạm vi test case UI thông thường

### §5 Validation & giới hạn

- [ ] 44 — Độ dài tối đa 1 stop word (câu hỏi mở #8) — Not covered — chưa có ngưỡng cụ thể để viết case biên thật, cần BA xác nhận trước
- [ ] 45 — Số dòng tối đa thêm cùng lúc khi Create (câu hỏi mở #8) — Not covered — chưa có ngưỡng cụ thể để viết case biên thật

### Impact / Regression — tương tác với feature khác

- [~] 46 — Component Popups dùng chung (Synonyms/Suggestion Dictionary/Redirects) — Partial — TC: 41
- [~] 47 — Synonyms ↔ Stopwords (chiều ngược: thêm stopword mới trùng synonym có sẵn) — Partial — TC: 42
- [~] 48 — Redirects ↔ Stopwords (thứ tự ưu tiên rule) — Partial — TC: 43
- [~] 49 — Merchandise Campaign ↔ Stopwords (trigger keyword chứa stop word) — Partial — TC: 44
- [~] 50 — Search Relevance ↔ Stopwords (loại trước/sau khi tính điểm) — Partial — TC: 45
