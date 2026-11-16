# Coverage checklist - Suggestion Dictionary

Đối chiếu `docs/specs/search-suggestion-dictionary-specs.md` (mục 2.1, 2.2, 3.1-3.3, 4.1-4.2, 5, 6) với:
- `test-cases/search/suggestion-dictionary/suggestion-dictionary_testcase.csv` (59 test case, ID 1-59 — đã áp dụng phát hiện `review-testcase-quality`: gộp TC3 vào TC2, gộp TC26 cũ vào TC22, thêm case icon chevron header Status (TC6) và case kéo-thả bất thường (TC28), đóng `<cần confirm>` cho TC2/TC35; ID 44 trở đi không đổi)

Ghi chú: không có file matrix riêng cho feature này (số case validate ít — chỉ 2 case Negative ở bước 1 — giữ chung trong bảng 10 cột theo lựa chọn nhất quán với Synonyms). Permission/API không áp dụng (chỉ 1 role Merchant Admin, không có tài liệu API riêng).

## Tổng quan

- Tổng số rule: 58
- Covered: 33
- Partial: 22
- Not covered: 3

## Chi tiết

### §2.1 Màn danh sách Suggestion

- [x] 1 — Nút back + tiêu đề "Suggestion" — Covered — TC: 1
- [x] 2 — Feature Tour nội dung + thu gọn/mở lại — Covered — TC: 2 (nội dung đã đọc được qua Figma: "Boost specific suggestions..."; TC3 cũ đã gộp vào đây)
- [~] 3 — Empty state (chưa có suggestion nào) — Partial — TC: 3 (chưa xác nhận chính xác nội dung chữ hiển thị)
- [x] 4 — Nút Create new — Covered — TC: 4
- [x] 5 — Cấu trúc 4 cột bảng — Covered — TC: 5
- [~] 6 — Icon chevron cạnh header cột Status — Partial — TC: 6 (mới bổ sung sau review; chưa xác định chức năng của icon)
- [~] 7 — Placeholder ô Search ("Search keyword, suggestion") — Partial — không có case nào assert trực tiếp đúng nguyên văn placeholder, chỉ có case hành vi search (TC 13-19) — nên bổ sung 1 case UI xác nhận placeholder
- [x] 8 — Cột Status (toggle bật/tắt) — Covered — TC: 11, 12
- [x] 9 — Cột When user search (tag list) — Covered — TC: 9
- [x] 10 — Cột Do suggestion (rank + "+N more") — Covered — TC: 8
- [x] 11 — Cột Action: icon Edit→Delete — Covered — TC: 7
- [x] 12 — Pagination — Covered — TC: 10
- [x] 13 — Search: có kết quả — Covered — TC: 13
- [~] 14 — Search: no result — Partial — TC: 14 (chưa xác nhận nội dung chữ empty-state)
- [x] 15 — Search: xoá từ khoá → full list — Covered — TC: 15
- [~] 16 — Search: khớp theo Do suggestion hay chỉ When user search — Partial — TC: 16 (câu hỏi mở #8)
- [~] 17 — Search: case-insensitive — Partial — TC: 17 (câu hỏi mở #8)
- [~] 18 — Search: debounce vs Enter — Partial — TC: 18 (câu hỏi mở #8)
- [x] 19 — Search: paste chuỗi dài (robustness) — Covered — TC: 19

### §2.2 Modal Create/Edit 2 bước

- [x] 20 — Modal bước 1: trạng thái mặc định — Covered — TC: 20
- [x] 21 — Nhập 1 trigger term hợp lệ — Covered — TC: 21
- [x] 22 — Thêm nhiều dòng bằng [Add new term] — Covered — TC: 22
- [~] 23 — Xoá dòng trigger term đã thêm — Partial — TC: 23 (câu hỏi mở #6, chưa xác nhận có xoá được không)
- [~] 24 — Trigger term để trống → chặn Next? — Partial — TC: 24 (câu hỏi mở #7)
- [~] 25 — Trigger term trùng validate — Partial — TC: 25 (câu hỏi mở #7)
- [x] 26 — Paste dài/emoji vào trigger term — Covered — TC: 22 (gộp vào case "Thêm nhiều dòng bằng [Add new term]" sau review, TC26 cũ đã xoá)
- [~] 27 — Modal bước 2: trạng thái mặc định (5 dòng có sẵn) — Partial — TC: 26 (câu hỏi mở #1, #10 — nguồn gốc 5 dòng chưa rõ; đã dẫn thêm finding Feature Tour vào Note)
- [x] 28 — Kéo-thả đổi thứ tự suggestion — Covered — TC: 27
- [~] 28b — Kéo-thả bất thường (thả ngoài vùng/huỷ giữa chừng) — Partial — TC: 28 (mới bổ sung sau review)
- [x] 29 — Không có nút thêm dòng suggestion mới (quan sát design hiện tại) — Covered — TC: 29
- [~] 30 — Toggle "Apply to other search term having this suggestion" — Partial — TC: 30 (câu hỏi mở #2, #11)
- [x] 31 — Back quay lại bước 1 giữ dữ liệu — Covered — TC: 31
- [x] 32 — Cancel đóng modal không lưu — Covered — TC: 32
- [x] 33 — Save thành công + toast "Success / Saved changes!" — Covered — TC: 33
- [x] 34 — Error guessing: spam click Save — Covered — TC: 34
- [x] 35 — Edit: mở load đúng dữ liệu, tiêu đề "Edit suggestion" — Covered — TC: 35 (đã xác nhận qua Figma, gỡ `<cần confirm>`)
- [x] 36 — Edit: sửa trigger term rồi Save — Covered — TC: 36
- [x] 37 — Edit: sửa thứ tự suggestion rồi Save — Covered — TC: 37
- [x] 38 — Edit: Cancel không lưu — Covered — TC: 38
- [ ] 39 — Edit: có cảnh báo ảnh hưởng gợi ý đang chạy thật không (mục 4.2 spec) — Not covered — chưa có case nào kiểm tra cảnh báo này, cần BA xác nhận trước khi viết case (`create-functional-testcase` bổ sung sau)

### §4.1 Delete popup

- [x] 40 — Nội dung popup "Delete suggestion?" — Covered — TC: 39
- [~] 41 — Màu/nhãn 2 nút đảo ngược — Partial — TC: 40 (câu hỏi mở #5)
- [~] 42 — Xác nhận xoá + toast — Partial — TC: 41 (chưa xác nhận nội dung toast Delete có khác "Saved changes!" không)
- [x] 43 — Cancel huỷ xoá — Covered — TC: 42
- [x] 44 — Đóng popup bằng Esc/click ngoài — Covered — TC: 43

### §5 Validation & giới hạn

- [~] 45 — Trigger term validate trùng với suggestion khác — Partial — TC: 25 (câu hỏi mở #7)
- [ ] 46 — Giới hạn số lượng trigger term tối đa / số lượng dòng suggestion tối đa — Not covered — không có case test giới hạn số lượng (chưa có ngưỡng cụ thể để viết BVA thật); riêng giới hạn dòng suggestion có thể không còn áp dụng nếu BA xác nhận không merchant không tự thêm dòng (câu hỏi mở #1/#10 cần trả lời trước)

### §3.2 Đồng bộ dữ liệu mẫu với Synonyms

- [x] 47 — Trùng dữ liệu mẫu 5 dòng Do suggestion với Unified synonyms của Synonyms — Covered (ở file khác) — đã viết 2 case 2 chiều tại `test-cases/search/synonyms/synonyms_testcase.csv` ID 83-84 (câu hỏi mở #4 của chính spec này), không lặp lại ở đây để tránh trùng case

### Tương tác với ISW config (khối Suggestion riêng)

- [~] 48 — Suggestion Dictionary ↔ ISW khối Suggestion (Data source: Store data/Add manually) — Partial — TC: 52 (câu hỏi mở #10/#12, đã đọc sâu `instant-search-widget-specs.md` và xác nhận đây là 2 cơ chế độc lập, nhưng chưa rõ thứ tự ưu tiên/tương tác thật)

### §3.3 Backend autocomplete engine (theo Lark) — test qua ISW

- [x] 49 — BC thêm sản phẩm mới → candidate autocomplete mới trên ISW — Covered — TC: 53
- [~] 50 — BC xoá sản phẩm nguồn candidate → candidate còn gợi ý không — Partial — TC: 54
- [~] 51 — BC sửa tên sản phẩm → candidate cập nhật theo — Partial — TC: 55
- [x] 52 — Logic gán điểm theo loại dữ liệu (name/category=3, variant/SKU=2, description=1) → thứ tự ưu tiên đúng — Covered — TC: 56
- [~] 53 — Sync đang In Progress → ISW dùng data nào — Partial — TC: 57
- [~] 54 — Sync Failed → ISW dùng data nào — Partial — TC: 58
- [x] 55 — Dữ liệu BC stale (chưa Sync lại) → ISW dùng data cũ — Covered — TC: 59 (dựa kiến trúc nền tảng đã xác nhận)
- [ ] 56 — Nguồn "Search query data" của engine (không phải sync BigCommerce) — Not covered có chủ đích — loại khỏi phạm vi `create-sync-testcase` vì không phải dữ liệu sync (giống quyết định đã áp dụng cho Job 2 của Synonyms); chưa có test case riêng nào khác kiểm tra nguồn này

### Câu hỏi mở — các điểm còn treo chưa có case nào trực tiếp (do thiếu bằng chứng)

- [~] 57 — Câu hỏi mở #10 (quan trọng nhất, đã gộp tinh thần câu #12) — quan hệ Suggestion Dictionary thủ công ↔ engine tự động Lark ↔ ISW Data source toggle — Partial — TC: 52 (xem mục "Tương tác với ISW config" ở trên)
