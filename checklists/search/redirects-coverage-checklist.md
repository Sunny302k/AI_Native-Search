# Coverage checklist - Redirects

## Nguồn đối chiếu

- Spec: `docs/specs/search-redirects-specs.md`
- Test case: `test-cases/search/redirects/redirects_testcase.csv` (67 case, ID 1-67 — 51 Functional + 16 Integration/Impact)
- Không có file matrix riêng (đã quyết định không cần — case validate không có tổ hợp ≥2 field cần dựng lưới)
- Không chạy `create-system-testcase`/`create-sync-testcase` (không có luồng đa tác nhân rõ ràng, dữ liệu 100% Config nội bộ)

**Cập nhật 2026-11-16**: đã bổ sung 2 case AC-01 (nút back, ID mới = 1) và AC-15 (xác nhận không có ô search/filter độc lập, ID mới = 8) qua `create-functional-testcase` — 2 rule này chuyển từ Not covered → Covered. Tổng số case 65 → 67; toàn bộ ID case cũ từ 1-6 dịch +1, từ 7-65 dịch +2 (bảng dưới đã cập nhật đúng ID mới).

## Tổng quan

- Tổng số rule: 42
- Covered: 29
- Partial: 13
- Not covered: 0

## Chi tiết

### Mục 2.1 — Màn "Redirects" (danh sách)

- [x] AC-01 — Nút back ← + tiêu đề điều hướng đúng — Covered — TC: 1 (bổ sung 2026-11-16)
- [x] AC-02 — Card Feature Tour hiển thị đúng nội dung + thu gọn/mở lại — Covered — TC: 2, 3
- [x] AC-03 — Chỉ 1 tab "Manual Redirects", đang active, không có tab AI — Covered — TC: 4
- [x] AC-04 — Danh sách hiển thị đủ cột (Status/Search terms/Redirect to/Action) đúng dữ liệu — Covered — TC: 5
- [x] AC-05 — Status toggle ON/OFF áp dụng ngay, không cần Save riêng — Covered — TC: 9
- [~] AC-06 — Cột "Redirect to" là link, click mở URL — Partial — TC: 6 (gắn `<cần confirm>`, chưa có bằng chứng hành vi click thật, đúng theo spec mục 3.3 còn mở)
- [~] AC-07 — Icon dropdown cạnh Status / kính lúp cạnh Search terms / "?" cạnh Redirect to — Partial — TC: 7 (gắn `<cần confirm>`, đúng theo câu hỏi mở #3 trong spec)
- [x] AC-08 — Click icon Edit mở đúng modal, load sẵn data dòng đó — Covered — TC: 10, 38
- [x] AC-09 — Click icon Delete mở popup xác nhận — Covered — TC: 11
- [x] AC-10 — Pagination cố định 15 records/trang, trang cuối hiển thị đúng phần dư — Covered — TC: 12 (boundary 15/16)
- [~] AC-11 — Empty state khi chưa có redirect nào — Partial — TC: 13 (gắn `<cần confirm>`, chưa có bằng chứng nội dung/hình ảnh state rỗng, đúng câu hỏi mở #6)
- [x] AC-12 — Nút Create new mở modal Create new redirect — Covered — TC: 14
- [~] AC-13 — Nút Export hiển thị và hành vi khi click — Partial — TC: 15 (gắn `<cần confirm>`, chưa có frame/flow, đúng câu hỏi mở #16)
- [~] AC-14 — Nút Import hiển thị và hành vi khi click — Partial — TC: 16 (gắn `<cần confirm>`, cùng lý do AC-13)
- [x] AC-15 — Xác nhận màn List không có ô input search/filter dạng text-box độc lập (chỉ có icon cạnh header) — Covered — TC: 8 (bổ sung 2026-11-16, đặt ngay sau case test hành vi icon)
- [x] AC-16 — Spam click Create new chỉ mở đúng 1 modal — Covered — TC: 17

### Mục 2.2 — Modal "Create new redirect"

- [~] AC-17 — Header đúng tiêu đề "Create new redirect" + icon Close hoạt động — Partial — TC: 36 (test hành vi đóng qua icon Close, nhưng chưa có case verify riêng text tiêu đề)
- [x] AC-18 — Placeholder đúng text 2 ô input (Search terms/Redirect to) — Covered — TC: 20
- [x] AC-19 — Nhập Search terms 1 hoặc nhiều từ phân tách phẩy, lưu đúng — Covered — TC: 18, 19
- [x] AC-20 — Icon xoá dòng xoá đúng dòng, giữ nguyên dữ liệu dòng khác — Covered — TC: 22
- [x] AC-21 — Add more redirect thêm đúng 1 dòng cặp input mỗi lần click — Covered — TC: 21
- [x] AC-22 — Save button Decision Table: disable khi còn dòng chưa hợp lệ, enable khi toàn bộ dòng hợp lệ — Covered — TC: 29
- [x] AC-23 — Cancel đóng modal không lưu dữ liệu đã nhập — Covered — TC: 34
- [x] AC-24 — Save thành công hiện đúng toast "Created redirect!" — Covered — TC: 18
- [x] AC-25 — Đóng modal bằng icon Close/Esc/click ngoài không lưu dữ liệu dở — Covered — TC: 36

### Mục 2.3 — Modal "Edit redirect"

- [~] AC-26 — Header đúng tiêu đề "Edit redirect" (khác Create) — Partial — chỉ suy luận gián tiếp từ TC 37/38, chưa có case verify riêng text tiêu đề
- [x] AC-27 — Bảng chỉ 2 cột (Search terms/Redirect to), không có cột Action — Covered — TC: 39
- [x] AC-28 — 1 dòng input duy nhất, load sẵn dữ liệu cũ, không có icon xoá dòng/nút Add more — Covered — TC: 38, 39
- [x] AC-29 — Nút "Save Redirect" (số ít) lưu đúng thay đổi — Covered — TC: 37
- [x] AC-30 — Save Edit thành công hiện đúng toast "Saved changes!" (khác text Create) — Covered — TC: 37
- [x] AC-31 — Cancel đóng modal Edit không lưu, dữ liệu giữ nguyên như trước khi sửa — Covered — TC: 43
- [ ] AC-32 — Đóng modal Edit bằng Esc/click ngoài — Not covered — chỉ có case Esc/click-ngoài cho Create (TC 36) và Delete (TC 49), KHÔNG có case tương tự cho Edit — phát hiện qua `review-testcase-quality` 2026-11-16, chưa bổ sung (người dùng chưa chọn bổ sung case này)

### Mục 3.1 — Validate khi Save (3 rule)

- [x] AC-33 — Rule #1: search term trùng với bản ghi đã Save → lỗi "Redirect already existed!" (áp dụng ở cả Create và Edit) — Covered — TC: 23, 41
- [x] AC-34 — Rule #2: 2 dòng cùng phiên Create trùng search term → lỗi "Search term can't have two redirect", áp dụng dù khác Redirect to — Covered — TC: 24
- [x] AC-35 — Rule #3: Redirect to sai định dạng URL → lỗi "Redirect to is not a valid URL format." (áp dụng ở cả Create và Edit) — Covered — TC: 25, 40
- [x] AC-36 — Tổ hợp nhiều dòng vi phạm nhiều rule khác nhau cùng lúc, mỗi dòng hiện đúng message riêng — Covered — TC: 26 (bổ sung sau review-testcase-quality)

### Mục 3.2 — Pagination

- [x] AC-37 — 15 records/page cố định — Covered — TC: 12 (đã đóng câu hỏi mở #7 trong spec)

### Mục 3.3 — Redirect to clickable

- [~] AC-38 — Click "Redirect to" trên danh sách có mở URL — Partial — trùng AC-06, TC: 6 (`<cần confirm>`)

### Mục 3.5 — Flow Storefront (ISW)

- [x] AC-39 — Redirect áp dụng khi gõ đúng search term + Enter trên ISW (happy path) — Covered — TC: 52
- [x] AC-40 — Redirect theo đúng trạng thái Status ON/OFF, Edit URL mới, Delete — Covered — TC: 53, 54, 55, 56, 57
- [~] AC-41 — "Show redirects hint" hiển thị khi query khớp (trước khi Enter) — Partial — TC: 59 (`<cần confirm>`, chưa có bằng chứng Figma, đúng câu hỏi mở #12)
- [~] AC-42 — Hành vi khi khớp search term nhưng không bấm Enter (click ra ngoài/click gợi ý khác) — Partial — TC: 58 (`<cần confirm>`, đúng câu hỏi mở #13)
- [~] AC-43 — Redirect áp dụng cả SRP (ngoài ISW) hay chỉ trong phạm vi ISW; ISW tắt thì Redirect có vô hiệu theo — Partial — TC: 60, 61 (`<cần confirm>`, đúng câu hỏi mở #14)

### Mục 4.1 — Delete redirect popup

- [x] AC-44 — Nội dung popup đúng tiêu đề/mô tả/2 nút (kể cả hiện tượng đảo màu nút) — Covered — TC: 47
- [x] AC-45 — Click Delete xoá đúng bản ghi khỏi danh sách — Covered — TC: 46
- [~] AC-46 — Nội dung toast khi Delete thành công — Partial — TC: 46 (`<cần confirm>`, đúng câu hỏi mở #17 mới bổ sung)
- [x] AC-47 — Cancel huỷ xoá, bản ghi giữ nguyên — Covered — TC: 48
- [x] AC-48 — Đóng popup Delete bằng Esc/click ngoài không xoá — Covered — TC: 49
- [x] AC-49 — Spam click Delete chỉ xoá đúng 1 lần — Covered — TC: 50

### Mục 5 — Validation & giới hạn

- [~] AC-50 — Giới hạn số search term tối đa trong 1 dòng — Partial — TC: 32 (`<cần confirm>`, đúng câu hỏi mở #10)
- [~] AC-51 — Giới hạn số dòng redirect tối đa khi Create — Partial — TC: 31 (`<cần confirm>`, đúng câu hỏi mở #10)
- [~] AC-52 — Search term/Redirect to để trống có message lỗi riêng — Partial — TC: 27, 28, 42 (`<cần confirm>`, đúng câu hỏi mở #9)

### Nhóm Error Guessing / Race condition (bổ sung sau review-testcase-quality)

- [x] AC-53 — Mất mạng/timeout giữa lúc Save (Create) không tạo bản ghi nửa vời — Covered — TC: 30 (`<cần confirm>` hành vi thực tế)
- [x] AC-54 — Mất mạng/timeout giữa lúc Save (Edit) không ghi dở dữ liệu — Covered — TC: 44 (`<cần confirm>`)
- [x] AC-55 — Mất mạng/timeout giữa lúc Delete không xoá "lửng lơ" — Covered — TC: 51 (`<cần confirm>`)
- [x] AC-56 — Race condition: 2 tab cùng thao tác 1 redirect (Edit vs Delete) — Covered — TC: 45 (`<cần confirm>`)
- [x] AC-57 — Paste search term dài/emoji/khoảng trắng không crash, trim rõ ràng — Covered — TC: 33 (`<cần confirm>`, đã tách rõ 2 nhánh sau review)

### Nhóm Integration — luồng bị ảnh hưởng (mục 7 "Cấu trúc đề xuất")

- [x] AC-58 — Synonyms: gõ từ đồng nghĩa và gõ search term gốc — thứ tự xử lý với Redirect — Covered — TC: 62, 63 (phần lớn `<cần confirm>`)
- [x] AC-59 — Stopwords: search term redirect chứa stopword, gõ nguyên văn vs gõ thiếu — Covered — TC: 64, 65 (`<cần confirm>`)
- [x] AC-60 — Merchandise Campaign: Redirect và Campaign cùng trigger 1 keyword, ai thắng; Redirect OFF thì Campaign không bị ảnh hưởng — Covered — TC: 66, 67 (phần `<cần confirm>`)
- [x] AC-61 — Nhãn/màu nút popup Delete đảo ngược — bug chung component Popups dùng ở cả Synonyms/Suggestion Dictionary/Stopwords/Redirects — Covered — TC: 47

## Rule Not covered — cần bổ sung

| Rule | Mô tả | Gợi ý skill |
| --- | --- | --- |
| AC-32 | Đóng modal Edit bằng Esc/click ngoài (chỉ Create và Delete có case tương tự, Edit thiếu) — đã nêu với người dùng qua `review-testcase-quality`, chưa được chọn bổ sung | `create-functional-testcase` |

## Rule Partial — cần xác nhận BA trước khi đào sâu thêm

Phần lớn rule Partial không phải do thiếu case, mà do **spec chính nó còn 15 câu hỏi mở** (`docs/specs/search-redirects-specs.md` mục 6) — case đã viết đúng và gắn `<cần confirm>` theo quy định dự án, chỉ cần BA trả lời để chuyển case từ `<cần confirm>` sang kết luận chắc chắn, không cần viết thêm case mới cho các rule: AC-06, AC-07, AC-11, AC-13, AC-14, AC-38, AC-41, AC-42, AC-43, AC-46, AC-50, AC-51, AC-52.

Riêng 2 rule sau thực sự thiếu case verify (không chỉ thiếu câu trả lời BA), nên đưa vào `create-functional-testcase` khi bổ sung:
- AC-17 (text tiêu đề "Create new redirect")
- AC-26 (text tiêu đề "Edit redirect")
