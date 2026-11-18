```
Title: [Search > Suggestion Dictionary] Toàn bộ UI/luồng thao tác đã được redesign, không khớp Figma (mất khái niệm trigger term, 2-step wizard, reorder, Edit)

Link TCs: test-cases/search/suggestion-dictionary/suggestion-dictionary_testcase.csv (Case 1, 2, 4, 5, 6, 7, 8, 9, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 35, 36, 37, 38)
Loại: FE (có thể cả BE nếu data model backend cũng đã đổi theo — chưa kiểm tra API)

Data test: Màn Suggestion Dictionary tại https://stg-search.peasisoft.com/suggestion-dictionary

Steps to reproduce:
1. Vào Search > Search Engine Setup > Suggestion Dictionary.
2. Quan sát toàn bộ cấu trúc màn danh sách, Feature Tour, và modal "Add new Suggestions".

Actual:
- Header hiển thị "Suggestion Dictionary" (Figma: "Suggestion").
- Feature Tour "What is Suggestion?" nội dung: "With Suggestion, you can manage the search suggestions that your customers see in the Instant Search Widget while typing the search query." — khác hoàn toàn text đã xác nhận qua Figma ("Use suggestion to guide what shoppers see first... Boost specific suggestions...").
- Có thêm 2 tab "Manual Suggestions" / "AI Suggestions" không có trong Figma.
- Có thêm nút Import/Export không có trong Figma.
- Bảng danh sách chỉ còn 3 cột: Status | Suggestion | Priority — KHÔNG còn "When user search" (trigger term) và "Do suggestion" (danh sách gợi ý có rank) như Figma mô tả.
- Không còn icon chevron cạnh header Status; thay bằng 2 dropdown riêng "From A to Z" (sort) và "All" (filter Active/Inactive) nằm phía trên bảng, không gắn vào header cột.
- Không còn cột Action cố định 2 icon Edit+Delete; chỉ có nút "Edit" toàn cục ở đầu trang, bật lên mới hiện icon Delete từng dòng — KHÔNG có icon Edit cho từng dòng ở bất kỳ đâu, tức là KHÔNG CÒN TÍNH NĂNG SỬA LẠI 1 suggestion đã tạo (chỉ bật/tắt Status hoặc xoá hẳn).
- Nút "Create new" đổi thành "Add new Suggestions"/"Add new term", mở thẳng modal "Add Suggestions" 1 BƯỚC DUY NHẤT (không còn stepper 2 bước "Add search term(s)" → "Prioritize suggestions").
- Modal "Add Suggestions" mỗi dòng chỉ gồm: 1 ô text "Suggestion" (placeholder) + 1 dropdown "Priority" (Low/Normal/High) + 1 icon thùng rác xoá dòng ngay tại chỗ — không có khái niệm "trigger term nhiều dòng" tách biệt với "Do suggestion nhiều dòng kéo-thả thứ tự".
- Hoàn toàn KHÔNG có danh sách "Do suggestion" dạng kéo-thả sắp xếp rank 1/2/3..., không có toggle "Apply to other search term having this suggestion".
- Validate: để trống Suggestion name → chặn Save, hiện "Suggestion name is a required field"; nhập trùng tên 1 suggestion đã có → chặn Save, hiện "Suggestion(s) already exists" (hành vi hợp lý nhưng không theo đúng luồng 2 bước Next/trigger term như spec mô tả).

Expected (theo Figma `dHTNp9Dd43Sbzy0hNWGMUC` page "↪ Suggestion Dictionary" node `1:6`, đọc lại 2026-11-16, và toàn bộ 23 test case liệt kê ở trên): màn "Suggestion" với bảng 4 cột Status|When user search|Do suggestion|Action; modal "Create new suggestion" 2 bước (bước 1 nhập nhiều trigger term, bước 2 kéo-thả sắp xếp 5 dòng Do suggestion có sẵn + toggle Apply to other search term); có action Edit riêng để mở lại đúng modal 2 bước với dữ liệu hiện tại.

Link bug: chưa có - chờ tạo
```

Priority đề xuất: High — đây không phải lỗi nhỏ mà là toàn bộ tính năng đã bị thay đổi kiến trúc dữ liệu/luồng thao tác so với thiết kế đã duyệt (Figma), ảnh hưởng tới mọi test case liên quan tới Create/Edit/List của feature. Cần BA xác nhận gấp đây là redesign đã được duyệt riêng (chưa cập nhật lại Figma) hay là sai lệch ngoài kế hoạch.
Căn cứ FE/BE: Quan sát trực tiếp qua UI thật, không chỉ sai text/màu mà sai toàn bộ data model hiển thị (không còn trigger term, không còn rank list) — nhiều khả năng BE/API cũng đã đổi theo, cần dev xác nhận thêm.
Nguồn Expected: `docs/specs/search-suggestion-dictionary-specs.md` (viết từ Figma `dHTNp9Dd43Sbzy0hNWGMUC` node `1:6`, đọc lại trực tiếp qua MCP ngày 2026-11-16, xác nhận Figma VẪN đang thể hiện đúng mô hình cũ — ảnh chụp lại cho thấy rõ luồng trigger term + kéo-thả 2 bước) + Expected gốc từng Case ID liệt kê ở trên.

Điểm chờ xác nhận QUAN TRỌNG: Theo yêu cầu người dùng ("theo Figma"), Figma được coi là nguồn spec chính thức nên toàn bộ các case trên được chấm NG dựa trên độ lệch so với Figma. Tuy nhiên đây rất có thể là 1 redesign có chủ đích (sản phẩm đã pivot sang mô hình đơn giản hơn: flat suggestion + priority, bỏ khái niệm trigger term) mà Figma chưa được cập nhật theo kịp — cần hỏi BA/PM xác nhận hướng nào đúng trước khi coi đây là 23 bug thật cần dev sửa lại theo Figma, hay chỉ cần vẽ lại Figma + viết lại toàn bộ test case theo UI mới.
