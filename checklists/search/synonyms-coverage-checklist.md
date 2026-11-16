# Coverage checklist - Synonyms

Đối chiếu `docs/specs/search-synonyms-specs.md` (mục 2.1, 2.2, 3.1-3.5, 4.1-4.4, 5, 6) với:
- `test-cases/search/synonyms/synonyms_testcase.csv` (97 test case, ID 1-97)

Cập nhật: theo yêu cầu người dùng, 6 case validate trùng tên trước đây nằm ở file matrix riêng (`synonyms_matrix-create-edit-validate-ten.csv`) đã được gộp lại thành 6 dòng thường (ID 33-38) trong chính file bảng 10 cột — file matrix đã xoá, không còn tồn tại song song. Đây là lựa chọn có chủ đích khác với quy ước mặc định của `create-matrix-testcase` (vốn tách case validate/tổ hợp field ra file riêng).

Ghi chú: Permission và API không áp dụng cho Synonyms (chỉ 1 role Merchant Admin thao tác, không có tài liệu API riêng) — `create-permission-testcase`/`create-api-testcase` không được chạy, đây không phải gap.

## Tổng quan

- Tổng số rule: 90
- Covered: 46
- Partial: 40
- Not covered: 4

## Chi tiết

### §2.1 Màn danh sách Synonyms

- [x] 1 — Nút back + tiêu đề "Synonyms" — Covered — TC: 1
- [x] 2 — Feature Tour nội dung — Covered — TC: 2
- [x] 3 — Feature Tour thu gọn/mở lại — Covered — TC: 3
- [x] 4 — Empty state "There is currently no synonym group." — Covered — TC: 4
- [x] 5 — Nút Create new (2 entry point) — Covered — TC: 5, 6
- [x] 6 — Cấu trúc 4 cột bảng — Covered — TC: 7
- [x] 7 — Cột Action: thứ tự/loại icon Edit→Delete — Covered — TC: 8 (đã xác nhận qua ảnh Figma độ phân giải cao, đóng câu hỏi mở #1)
- [x] 8 — Cột Synonyms: tag + "+N more" — Covered — TC: 9
- [x] 9 — Pagination — Covered — TC: 10
- [~] 10 — Toggle Status ảnh hưởng storefront (ON↔OFF) — Partial — TC: 11, 12 (câu hỏi mở #5, hành vi storefront khi OFF chưa xác nhận)
- [x] 11 — Search box: có kết quả — Covered — TC: 13
- [x] 12 — Search box: no result "There is no synonym found." — Covered — TC: 14
- [x] 13 — Search box: xoá từ khoá → quay lại full list — Covered — TC: 15
- [~] 14 — Search box: khớp theo giá trị synonym bên trong (không chỉ tên group) — Partial — TC: 16 (câu hỏi mở #9; tín hiệu gợi ý từ placeholder thật "Search group, synonym")
- [~] 15 — Search box: case-insensitive/bỏ dấu — Partial — TC: 17 (câu hỏi mở #9)
- [~] 16 — Search box: debounce vs cần Enter — Partial — TC: 18 (câu hỏi mở #9)
- [x] 17 — Khối AI Synonyms Suggested: hiện khi có gợi ý — Covered — TC: 20
- [x] 18 — Khối AI Synonyms Suggested: ẩn khi hết gợi ý — Covered — TC: 21

### §2.2 Modal Create/Edit

- [x] 19 — Modal Create: trạng thái mặc định — Covered — TC: 22
- [x] 20 — Unified synonyms: nhập tag bằng Enter (1, nhiều) — Covered — TC: 23, 24
- [x] 21 — Unified synonyms: Clear all không popup xác nhận — Covered — TC: 25
- [x] 22 — Supporting synonyms: thêm dòng mới — Covered — TC: 26
- [x] 23 — Supporting synonyms: nhập general term + nhiều tag — Covered — TC: 27
- [~] 24 — Supporting synonyms: xoá dòng khi CHƯA từng Save (Create) — Partial — TC: 28 (câu hỏi mở #6 chỉ nói rõ cho Edit, chưa chắc áp dụng y hệt ở Create)

### §3.1-3.2 Validate khi Save

- [~] 25 — SYNONYM GROUP NAME required? — Partial — TC: 29 (câu hỏi mở #4)
- [~] 26 — Unified/Supporting tối thiểu 1 giá trị? — Partial — TC: 30 (câu hỏi mở #4)
- [~] 27 — SYNONYM GROUP NAME chỉ khoảng trắng — Partial — TC: 31 (câu hỏi mở #4, #10)
- [ ] 28 — SYNONYM GROUP NAME giới hạn độ dài ký tự (boundary thật) — Not covered — chỉ có TC 32 test "rất dài" generic, chưa có ngưỡng cụ thể để viết case biên min/max — cần BA xác nhận giới hạn trước khi bổ sung case BVA thật
- [x] 29 — Validate Save: happy path đủ field hợp lệ — Covered — TC: 33
- [x] 30 — Trùng tên: Supporting general term vs nhóm khác → "Synonym already existed!" — Covered — TC: 34
- [~] 31 — Trùng tên: Supporting general term trong CÙNG modal — Partial — TC: 35 (câu hỏi mở #3)
- [x] 32 — Trùng tên: Supporting tag cụ thể trong cùng ô → "Synonym must be unique!" — Covered — TC: 36
- [~] 33 — Trùng tên: Unified synonyms — Partial — TC: 37 (câu hỏi mở #3)
- [x] 34 — Trùng tên: cả 2 lỗi đồng thời — Covered — TC: 38
- [x] 35 — Cancel modal không lưu (nút Cancel + icon X) — Covered — TC: 39, 40

### §4.2 Edit flow

- [x] 36 — Edit: load đúng dữ liệu hiện tại — Covered — TC: 41
- [x] 37 — Edit: sửa tên/thêm Unified/xoá Supporting rồi Save (gồm toast "Success / Saved changes!") — Covered — TC: 42, 43, 44
- [x] 38 — Error guessing: spam click Save — Covered — TC: 45
- [x] 39 — Error guessing: paste dài/emoji vào tag input — Covered — TC: 46

### §4.1 Delete popup

- [x] 40 — Nội dung popup "Delete synonym?" — Covered — TC: 47
- [~] 41 — Màu/nhãn 2 nút bị đảo ngược — Partial — TC: 48 (câu hỏi mở #2 — xác nhận trực tiếp qua ảnh Figma, nhưng còn chờ BA kết luận đây là chủ đích hay lỗi)
- [~] 42 — Xác nhận xoá thành công + toast — Partial — TC: 49 (nội dung toast Delete chính xác chưa xác nhận, khác với toast Save đã xác nhận "Success / Saved changes!")
- [x] 43 — Cancel huỷ xoá — Covered — TC: 50
- [x] 44 — Đóng popup bằng Esc/click ngoài — Covered — TC: 51
- [~] 45 — Xoá 1 dòng Supporting trong Edit (popup dùng chung) — Partial — TC: 52 (câu hỏi mở #6)
- [x] 46 — Cancel modal cha sau khi xoá dòng → rollback — Covered — TC: 53
- [~] 47 — Xoá hết Supporting (0 dòng) rồi Save — Partial — TC: 54 (câu hỏi mở #4)

### §4.3 AI synonym suggestion

- [x] 48 — Card nội dung mẫu + nút View details — Covered — TC: 55
- [x] 49 — Modal View details mở đúng, load lại câu hỏi gợi ý — Covered — TC: 56
- [x] 50 — Confidence score hiển thị từng từ khoá — Covered — TC: 57
- [~] 51 — Tooltip icon "?" cạnh Confidence score — Partial — TC: 58 (nội dung tooltip chưa đọc được qua Figma)
- [x] 52 — Carousel điều hướng khi >3 từ khoá gợi ý — Covered — TC: 59
- [x] 53 — Confirm → thêm Unified + badge "AI" — Covered — TC: 60
- [~] 54 — Skip → biến mất khỏi card, có hiện lại lần sau không — Partial — TC: 61 (câu hỏi mở #7)
- [x] 55 — Confirm nhiều từ khoá rồi Save — Covered — TC: 62
- [~] 56 — Badge "AI" hiện lại ở cột Synonyms trên List? — Partial — TC: 63 (câu hỏi mở #3)
- [~] 57 — AI suggestion cho group Status = OFF — Partial — TC: 64
- [x] 58 — Error guessing: spam click Confirm — Covered — TC: 65

### System flow (đa tác nhân)

- [x] 59 — System: Shopper search → System phát hiện → Merchant Confirm/Skip → Save (happy) — Covered — TC: 66
- [~] 60 — System: nhánh Skip toàn bộ — Partial — TC: 67 (câu hỏi mở #7; đã gộp thêm nội dung của case Happy trùng trước đó)
- [x] 61 — System: nhánh hỗn hợp Confirm+Skip — Covered — TC: 68
- [~] 62 — System: nhánh rollback Cancel — Partial — TC: 69 (đã gộp thêm nội dung của case Edge trùng trước đó)
- [~] 63 — System: ngắt luồng giữa chừng (đóng tab) — Partial — TC: 70
- [~] 64 — System: race condition 2 Merchant — Partial — TC: 71
- [~] 65 — System: gợi ý mới sinh khi đang xử lý gợi ý cũ — Partial — TC: 72

### Impact / Regression

- [x] 66 — Tạo Unified synonym → ISW mở rộng — Covered — TC: 73
- [x] 67 — Tạo Unified synonym → SRP mở rộng — Covered — TC: 74
- [x] 68 — Supporting bất đối xứng (ISW+SRP) — Covered — TC: 75
- [~] 69 — Search mở rộng theo Synonym → Filter block/facet trên SRP có cập nhật đúng không — Partial — TC: 76
- [~] 70 — Xoá hẳn Synonym Group → ISW/SRP ngừng vĩnh viễn + tạo lại trùng tên — Partial — TC: 77
- [x] 71 — Synonym nguồn AI áp dụng storefront giống nhập tay — Covered — TC: 78
- [~] 72 — Thời điểm hiệu lực trên storefront sau Save — Partial — TC: 79
- [~] 73 — Cache client ISW khi synonym bị xoá giữa chừng — Partial — TC: 80
- [~] 74 — Component Popups dùng chung (Synonyms/Suggestion Dictionary/Stopwords/Redirects) — Partial — TC: 81, 82
- [~] 75 — Suggestion Dictionary ↔ Synonyms (2 chiều) — Partial — TC: 83, 84
- [~] 76 — Merchandise Campaign Smart/Custom synonyms ↔ Synonyms Group — Partial — TC: 85, 86
- [~] 77 — Search Relevance weighting qua synonym — Partial — TC: 87
- [~] 78 — Stopwords thứ tự rule với Synonyms — Partial — TC: 88
- [~] 79 — Redirects ưu tiên rule với Synonyms — Partial — TC: 89

### §3.5 Sync (nguồn dữ liệu AI Synonyms Suggested)

- [~] 80 — Job 1/3: BC thêm dữ liệu mới → candidate phản ánh — Partial — TC: 90
- [~] 81 — BC xoá sản phẩm nguồn candidate → candidate còn hiển thị? — Partial — TC: 91
- [~] 82 — BC đổi Category/Variant Option → candidate cập nhật? — Partial — TC: 92
- [~] 83 — Job nền khi Sync đang In Progress — Partial — TC: 93
- [~] 84 — Job nền khi Sync Failed — Partial — TC: 94
- [x] 85 — Dữ liệu BC stale (chưa Sync lại) → job dùng data cũ — Covered — TC: 95 (dựa kiến trúc nền tảng đã xác nhận, không cần confirm)
- [~] 86 — Candidate tích luỹ qua ≥2 chu kỳ job — Partial — TC: 96
- [~] 87 — Job 3: rule tối đa 10 + bắt buộc số nhiều — Partial — TC: 97 (câu hỏi mở #8c)
- [ ] 88 — "Import file CSV" (nhắc trong Lark, mục 3.5) — Not covered — không có bằng chứng UI, câu hỏi mở #8b chưa trả lời, không viết case giả định theo đúng nguyên tắc dự án
- [ ] 89 — Auto-apply Job 1/3 không qua Confirm/Skip (câu hỏi mở #8, mâu thuẫn Lark vs Figma) — Not covered — loại khỏi phạm vi có chủ đích theo quyết định của người dùng, chờ trả lời BA trước khi viết case cho nhánh này

### Chưa cover (ghi nhận từ review-testcase-quality)

- [ ] 90 — Modal View details hiển thị ĐẦY ĐỦ khối Unified+Supporting giống cấu trúc Edit (ngoài phần card gợi ý) — Not covered — chưa có case riêng xác nhận cấu trúc tổng thể modal này, chỉ có case cho từng phần (card/confidence/tooltip/carousel/confirm/skip)
