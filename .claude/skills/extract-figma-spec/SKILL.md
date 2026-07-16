---
name: extract-figma-spec
description: Trích xuất 1 cụm chức năng trên Figma (frame chính + toàn bộ sticky note vàng liên quan + modal con) thành 1 file spec viết rõ ràng, có cấu trúc — dùng làm input chuẩn cho create-testcase-suite/create-testcases và các skill test case khác, thay cho việc đọc trực tiếp thiết kế mỗi lần viết test case.
trigger: "đọc figma [link] rồi viết spec cho [feature]", "phân tích figma [link]", "clear spec từ figma cho [feature]", "convert figma [link] sang spec" — áp dụng khi người dùng cung cấp link/frame Figma và CHƯA có bản spec text đầy đủ. KHÔNG dùng khi đã có sẵn spec text rõ ràng (dùng thẳng create-testcases/create-testcase-suite), và KHÔNG tự viết test case trong skill này.
---

## Bối cảnh

Dự án này spec sơ sài/gần như không có — nguồn sự thật duy nhất là thiết kế Figma, trong đó business rule không nằm ở label field mà nằm rải rác trong các sticky note màu vàng gắn quanh từng cụm màn hình. Nhiều rule là **quan hệ phụ thuộc chéo giữa các field** (VD: "Option select type: Multiple (mặc định) — Trong trường hợp Option display = Multi-level → Single") chứ không phải mô tả field độc lập, nên đọc lướt từng field một dễ bỏ sót. Skill này tách riêng bước "đọc & viết lại spec" ra khỏi bước "viết test case" để phần phân tích được làm kỹ và có thể review độc lập trước khi tạo test case.

Ngoài ra, Native Search là hệ thống trung gian: lấy dữ liệu sync về từ BigCommerce rồi cho phép merchant setup hiển thị/logic lên trên dữ liệu đó. Vì vậy mỗi field không chỉ cần mô tả kiểu control/default — còn cần biết **giá trị của field đó tới từ đâu** (config Native Search tự quản lý, hay dữ liệu sync từ BigCommerce, hay Native Search tự tính toán trên dữ liệu đã sync), vì loại test case cần viết cho từng loại là khác nhau (xem Bước 3, mục 2).

## Bước 1: Xác định input

Hỏi lại người dùng nếu thiếu:

- Link Figma (file key + node-id) của cụm chức năng cần extract. Nếu cụm chức năng trải trên nhiều frame (VD nhiều state của cùng 1 flow: màn hình chính, các modal con, empty state...), thu thập đủ node-id của từng frame.
- Tên feature/user story để đặt tên file output (VD "Edit filter node - Category" → `edit-filter-node-category`).
- Nếu cụm chức năng này có các biến thể anh em cùng pattern (VD Price/Category/Collection cùng dùng chung UI filter node) mà người dùng muốn extract luôn để đối chiếu sau — ghi nhận danh sách node-id đó, nhưng mỗi biến thể vẫn ra 1 file spec riêng (việc đối chiếu chéo do `review-figma-spec-consistency` đảm nhiệm, không làm trong skill này).

## Bước 2: Thu thập dữ liệu design

Với mỗi node-id:

1. Gọi `mcp__figma__get_metadata` để nắm cấu trúc tổng thể (tên layer, node con) trước khi đào sâu.
2. Gọi `mcp__figma__get_design_context` (và `get_screenshot` khi cần nhìn tổng thể bố cục) để lấy text field, label, default value, placeholder hiển thị trên UI.
3. **Bắt buộc quét toàn bộ sticky note/comment màu vàng nằm trong hoặc sát cụm frame đang đọc** — coi đây là nguồn business rule chính thức, ưu tiên hơn suy đoán từ UI thuần. Trích nguyên văn từng note, không diễn giải tắt ngay từ bước thu thập.
4. Nếu không truy cập được Figma (lỗi quyền, như "don't have edit access") — gọi `mcp__figma__whoami` để xác nhận tài khoản đang dùng, báo người dùng cần được cấp quyền Editor trên file, và đề nghị phương án thay thế: người dùng gửi trực tiếp screenshot từng frame + note vàng vào chat để đọc qua Read tool. Không tự suy đoán nội dung khi không đọc được.

## Bước 3: Cấu trúc hoá thành spec

Viết lại toàn bộ dữ liệu đã thu thập theo cấu trúc sau (đồng nhất văn phong với spec hiện có trong `docs/specs/`, dùng heading `##`, bảng, bullet list):

1. **Tổng quan** — mục đích cụm chức năng (suy ra từ context nếu Figma không ghi rõ, đánh dấu là suy luận).
2. **Danh sách field** — dạng bảng: tên field, kiểu control (text/select/toggle/radio/checkbox tree...), giá trị mặc định, options, bắt buộc/không, **Nguồn dữ liệu**, ghi chú.

   Cột **Nguồn dữ liệu**: đối chiếu với whitelist tại `docs/sync-fields-glossary.md` để gắn đúng 1 trong 3 nhãn:
   - **Config nội bộ** — field do Native Search tự định nghĩa (toggle, display option, sort order, pagination type...), đổi giá trị bằng Save trong Admin, không phụ thuộc sync.
   - **Sync trực tiếp** — giá trị/option của field lấy nguyên từ 1 entity trong whitelist (category/product/customer/price list...). Nhận diện qua: option là dữ liệu thật của store (VD tên category cụ thể) chứ không phải nhãn cố định do Native Search định nghĩa; muốn đổi phải sửa bên BigCommerce rồi chờ/chạy sync.
   - **Tính toán từ dữ liệu sync** — Native Search tự tính/tổng hợp dựa trên dữ liệu đã sync + hành vi người dùng/thời gian (ranking, score, trending...), không phải giá trị copy nguyên từ BigCommerce.
   - Không đủ căn cứ để xếp loại (kể cả sau khi đối chiếu whitelist) → gắn `[CẦN XÁC NHẬN BA]` ở cột này, không tự đoán field có được sync hay không.
3. **Business rule & dependency** — mục riêng, KHÔNG gộp chung vào bảng field ở trên. Với mỗi rule: trích nguyên văn note gốc trong 1 block quote, sau đó diễn giải. Đặc biệt gắn nhãn rõ các rule dạng "field A = X → field B buộc = Y / bị ẩn / bị disable" vì đây là loại dễ bị bỏ sót khi viết test case.
4. **Modal/sub-flow con** — mỗi modal (VD Option display picker, Sort order picker) là 1 mục riêng: cách trigger mở, field bên trong, hành vi khi Save/Cancel, có đóng lại state cũ không.
5. **Validation & giới hạn cụ thể** — liệt kê riêng các threshold/range nêu trong note (VD "Number of filter options per click: range 5 → 10").
6. **Câu hỏi mở** — mọi chỗ Figma không thể hiện rõ và không có note giải thích. Trước khi gắn `[CẦN XÁC NHẬN BA]`, phân loại câu hỏi theo `docs/bigcommerce-platform-facts.md` mục 1:
   - **Loại 1 (BC platform fact — hành vi cố định của BigCommerce, không phụ thuộc Native Search implement thế nào)**: tra `docs/bigcommerce-platform-facts.md` mục 3 trước; nếu chưa có, tra BigCommerce Developer Docs qua `WebFetch`/`WebSearch`, ghi fact + nguồn vào file đó, rồi dùng fact tra được thay cho `[CẦN XÁC NHẬN BA]`.
   - **Loại 2 (Native Search tự chọn phản ứng thế nào)**: giữ nguyên `[CẦN XÁC NHẬN BA]` kèm 1 giả thuyết cụ thể (theo quy tắc global CLAUDE.md) — KHÔNG tra BC docs cho loại này, không tự bịa hành vi.
   - Phân vân không rõ loại nào → mặc định coi là Loại 2 (gắn `[CẦN XÁC NHẬN BA]`), không tự suy diễn thành fact kỹ thuật để né hỏi BA.

## Bước 4: Ghi file output

- File format: markdown.
- Naming: kebab-case, `<feature-slug>-specs.md` (VD `edit-filter-node-category-specs.md`).
- Folder: `docs/specs/`.
- Nếu file cùng tên đã tồn tại, hỏi người dùng trước khi ghi đè (có thể là bản đã được BA xác nhận một phần).

## Bước 5: Thông báo tới người dùng

- Số field, số rule chéo (dependency) phát hiện được, số modal con.
- Số field theo từng nhóm Nguồn dữ liệu: Config nội bộ / Sync trực tiếp / Tính toán từ dữ liệu sync / chưa xác định.
- Số câu hỏi `[CẦN XÁC NHẬN BA]` (gộp cả câu hỏi hành vi lẫn câu hỏi nguồn dữ liệu).
- Nếu cụm chức năng có biến thể anh em cùng pattern đã được nhắc ở Bước 1 → gợi ý chạy `review-figma-spec-consistency` để đối chiếu chéo trước khi viết test case.
- Nếu có field thuộc nhóm **Sync trực tiếp** hoặc **Tính toán từ dữ liệu sync** → lưu ý người dùng các field này cần loại test case khác với field Config nội bộ thông thường (phụ thuộc trạng thái/thời điểm sync từ BigCommerce), không chỉ test qua thao tác Save trong Admin.

## Ràng buộc

- Không tự bịa hành vi/rule khi Figma không thể hiện rõ và không có sticky note — luôn dùng tag `[CẦN XÁC NHẬN BA]` kèm giả thuyết thay vì khẳng định chắc chắn.
- Không được bỏ sót sticky note nào trong vùng đọc, kể cả khi nội dung có vẻ lặp lại giữa các frame — liệt kê đủ để bước đối chiếu chéo sau này (`review-figma-spec-consistency`) có dữ liệu so sánh.
- Không tự đoán 1 field có phải dữ liệu sync từ BigCommerce hay không nếu không đối chiếu được với `docs/sync-fields-glossary.md` hoặc không có tín hiệu rõ trên Figma/note — dùng `[CẦN XÁC NHẬN BA]` cho cột Nguồn dữ liệu thay vì suy đoán.
- Không tự viết test case trong skill này — output chỉ là file spec, việc viết test case do `create-testcases`/`create-testcase-suite`/các skill con khác đảm nhiệm.
- Chỉ thao tác trong folder dự án hiện tại (Native Search / Claude), nghiêm cấm thao tác trên folder khác.
