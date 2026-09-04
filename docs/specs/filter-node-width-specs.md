# Filter node - Width — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Add filter node - Width` (Google Sheet `TC_Native Search`, gid=1582142711, 123 case — gồm Add case #1-87 và Edit case #88-123, đã có sẵn cấu trúc Preconditions banner tách 2 luồng ngay trong sheet gốc).

**Giới hạn quan trọng cần nêu rõ**: người dùng gửi ảnh Figma nhưng ảnh gốc quá lớn (>2000x2000px) không xử lý được; sau đó cố gắng thiết lập Figma MCP server để đọc trực tiếp nhưng **chưa kết nối thành công trong phiên làm việc này**. Người dùng xác nhận thiết kế Width giống thiết kế của filter node **Price** (chưa có trong dự án). Do đó spec này viết **hoàn toàn dựa trên sheet + đối chiếu logic với các node anh em đã làm** (chủ yếu `edit-filter-node-sale-percentage-specs.md` — sibling gần nhất về mặt "range filter"), **chưa đối chiếu được với ảnh UI Figma thật** — khác với quy trình chuẩn của dự án (Figma notes = spec). Toàn bộ nội dung liên quan tới chi tiết hiển thị UI cụ thể (số lượng option dropdown, vị trí field...) cần xác nhận lại bằng ảnh khi có.

## 1. Tổng quan

Width là filter node lọc theo **kích thước chiều rộng sản phẩm** (BC Product → Fulfillment tab → field "Width (Centimeters)", **optional**, không có dấu `*` — khác Weight là required). Đồng bộ qua Sync (`docs/sync-fields-glossary.md` xác nhận `width` nằm trong whitelist Products Sync trực tiếp, cùng nhóm `weight / width / depth / height`).

**Khác biệt cấu trúc quan trọng so với mọi node đã làm trước**: đây là node đầu tiên trong dự án dùng **range liên tục (continuous min-max)** thay vì danh sách giá trị rời rạc cố định (Condition/Featured Products) hay danh sách range do merchant tự cấu hình (Sale Percentage có 4 range % mặc định, cho thêm/xoá row). Width **không có popup "Select filter options" cấu hình range tay** — thay vào đó có **Width Range**: 1 dropdown auto-tính `[Lowest available width] - [Highest available width]` trực tiếp từ dữ liệu BC đã sync, không cho nhập tay (câu hỏi mở, xem mục 10). Display Style mặc định là **Slider - input** (thanh trượt + ô nhập số), List/Grid chỉ là 2 lựa chọn thay thế đơn giản hoá.

Do bản chất range liên tục, Width có rất nhiều field con chỉ dành riêng cho Slider - input (ẩn/disable khi chuyển sang List/Grid): Show range slider, Slide handle color, Decimal Separator, Show tooltip of range slider + Tooltip color, Has slider steps + Amount of slider steps + Show step value, Show range input + Show placeholder text + Placeholder text + Unit Display Option, Range slider & Range input order, và **Setup dynamic filter** (khái niệm mới, chưa gặp ở node nào khác — xem mục 6.6).

## 2. Phát hiện quan trọng: sheet Width bị nhiễm chéo nội dung từ sheet Sale Percentage

Đối chiếu từng "Note" trong sheet gốc với `edit-filter-node-sale-percentage-specs.md` phát hiện **nhiều note bị dán lạc dòng** — rõ ràng do sheet Width được clone từ template Sale Percentage rồi chỉnh sửa, nhưng 1 số ghi chú không được dọn/di chuyển đúng theo field mới. Bảng dưới liệt kê toàn bộ trường hợp đã đối chiếu, quyết định giữ/relocate/bỏ:

| Note gốc (dán ở case nào trong sheet Width) | Đối chiếu | Quyết định |
| --- | --- | --- |
| "Hiển thị ký hiệu $ thay vì %" + "Confirm mấy row, design có vẻ 4" (dán ở case #10 Title Alignment) | Không khớp bản chất Width (không dùng $/%, không có cấu trúc "N row range" như Sale Percentage) | **Bỏ** — nhiễu do copy template |
| "Sai thứ tự, hiện tại đang là H-L, L-H, Manual order" + "Default hiện đang là manual, đúng hay sai?" (dán ở case #25 Decimal Separator) | **Khớp chính xác** note đã xác nhận thuộc **Sort Order** ở Sale Percentage (mục 6, case #25 gốc bên đó) | **Relocate** → đây là bằng chứng Width **thiếu hẳn 1 field Sort Order** trong danh sách 123 case (không có case nào test riêng Sort Order default/switch Lowest-Highest/Highest-Lowest/Manual) — xem mục 6.9, `[CẦN XÁC NHẬN BA]` |
| "Đang hiển thị giảm dần" / "Đang hiển thị tăng dần" (dán ở case #26/#27 Show tooltip of range slider) | Ngữ nghĩa tăng/giảm dần khớp Sort Order (Highest→Lowest / Lowest→Highest), không liên quan tooltip | **Relocate** → gộp chung bằng chứng thiếu Sort Order ở trên |
| "[Storefront]Fitler catgory/Special Offers/Sale Percentage] Vẫn hiển thị filter mặc dù account thuộc group HIDE ON CUSTOMER GROUP" (dán ở case #30 Has slider steps) | **Khớp chính xác** bug Hide on customer group đã xác nhận NG ở Sale Percentage (#30 gốc bên đó) | **Relocate** → mục 7 Hide on customer group |
| "[Add/Edit fitler Special Offers/Sale Percentage] Không update số lượng customer group khi xoá group ở BC" (dán ở case #31 Has slider steps re-check) | **Khớp chính xác** bug Hide on customer group đã xác nhận NG ở Sale Percentage (#31 gốc bên đó) | **Relocate** → mục 7 Hide on customer group |
| "Với grid, record đầu luôn bị highlight màu cam" (dán ở case #24 Decimal Separator) | **Khớp chính xác** bug Display Style Grid đã xác nhận NG ở Sale Percentage (#24 gốc bên đó) | **Relocate** → mục 6.2 Display Style |
| "Thừa option swatch" (dán ở case #23 Width Range re-sync) | Ngữ nghĩa khớp bug Display Style thừa Swatch đã xác nhận ở Sale Percentage (mục 5), nhưng case #13 của chính Width lại tự khẳng định "3 options: Slider-input/List/Grid" không nhắc Swatch | **Relocate + giữ nghi vấn** → thêm `<cần confirm>` vào Display Style thay vì khẳng định chắc 3 option đúng, dựa theo pattern lặp lại ở Sale Percentage |
| "Đang không show lỗi và cho lưu thành công" (case #16), "Đang không vlidat" (case #17, 19), "Đang không validate" (case #20, 31) | Không đối chiếu được với node khác cụ thể, nhưng khớp **theme chung** của sheet Width: tỷ lệ case chưa validate rất cao (giống Sale Percentage) | **Giữ nguyên tại chỗ** — là note hợp lệ của đúng case đó |
| "Đang không chặn tất cả các ký tự, bao gồm cả ký tự đặc biệt hay chữ cái" (dán ở case #18 Show range slider OFF) | Ngữ nghĩa mô tả validate input text, không khớp 1 toggle OFF | **Bỏ** — nhiễu, không xác định được nguồn gốc thật |
| "Số count product ko đúng, đang cho theo thứ tự tăng dần từ 1" (dán ở case #34 Amount of slider steps = 0) | Không khớp ngữ cảnh validate số âm/0 | **Bỏ** — nhiễu, không xác định được nguồn gốc thật |
| "[Storefront_Filter category/Special Offers/Sale Percentage] List product không filter theo giá trị đã chọn" (lặp lại từ case #38 đến #56) | Khớp đúng bug hệ thống đã xác nhận rộng rãi ở Category/Special Offers/Sale Percentage (mục 9 các spec đó) | **Giữ, nhưng chỉ ghi 1 lần ở mục 9** thay vì lặp lại ở từng case — theo đúng cách đã làm ở Sale Percentage |

## 3. General Settings

Giống pattern chung mọi filter node:

| Field | Loại | Validation | Default | Nguồn |
| --- | --- | --- | --- | --- |
| Title | Text | Bắt buộc, rỗng → lỗi required | "Width" | Sheet Add #5, #6, #7 |
| Title text color | Color | Áp dụng ngay Preview | dark (mặc định) | Sheet Add #8, #9 |
| Title alignment | Radio Left/Center/Right | Áp dụng ngay Preview | Left | Sheet Add #10, #11, #12 |

**Rủi ro kế thừa** (chưa xác nhận qua ảnh UI thật): bug title dài >1 dòng luôn căn trái dù chọn Center/Right — đã xác nhận NG lặp lại ở Category/Special Offers/Sale Percentage/Stock (note trong sheet Width case #9 cũng liệt kê Width vào cùng danh sách này).

## 4. Filter Settings — Display Style

3 giá trị (sheet Add case #13 tự khẳng định đúng 3, nhưng xem cảnh báo `<cần confirm>` ở mục 2):

| Giá trị | Default | Mô tả |
| --- | --- | --- |
| **Slider - input** | **Có** (mặc định) | Thanh trượt kéo + ô nhập số, có đầy đủ sub-settings mục 5 |
| List | — | Danh sách; ẩn/disable toàn bộ sub-settings Slider |
| Grid | — | Dạng lưới; ẩn/disable toàn bộ sub-settings Slider |

`[CẦN XÁC NHẬN BA]` — Dropdown Display Style có thực sự chỉ đúng 3 giá trị (Slider-input/List/Grid) hay đang thừa option Swatch giống bug đã xác nhận ở Sale Percentage? (mục 2, note relocate).

**Rủi ro kế thừa** (chưa xác nhận qua ảnh UI thật): ở List/Grid, khi không nhập/không có data → storefront hiển thị chữ "null" thay vì ẩn field (sheet Add case #15); luôn hiển thị dư 1 record dạng "{giá trị max record cuối} and More" (case #15); ở Grid, record đầu tiên luôn bị highlight màu cam sẵn dù merchant chưa chọn gì (relocate từ case #24, khớp bug đã xác nhận NG ở Sale Percentage #24).

## 5. Filter Settings — Slider - input sub-settings (chỉ hiện khi Display Style = Slider - input)

| Field | Loại | Default | Ẩn/disable khi | Nguồn |
| --- | --- | --- | --- | --- |
| Show range slider | Toggle | ON | Display Style ≠ Slider-input | #17, 18, 19 |
| Slide handle color | Color | — | Show range slider = OFF | #20 |
| Decimal Separator | Dropdown | "No separator (E.g. 1000)" | — | #24, 25 |
| Show tooltip of range slider | Checkbox | Checked | Show range slider = OFF | #26, 27 |
| Tooltip color | Color | — | Show tooltip of range slider = unchecked | #28 |
| Has slider steps | Checkbox | Checked | Show range slider = OFF | #29, 30, 31 |
| Amount of slider steps | Number | 4 | Has slider steps = unchecked | #32, 33, 34, 35 |
| Show step value | Checkbox | Checked | Has slider steps = unchecked | #36 |
| Show range input | Toggle | ON | Display Style ≠ Slider-input | #37, 38, 39 |
| Show placeholder text | Checkbox | Checked | Show range input = OFF | #40 |
| Placeholder text | Text | `{{From}} - {{To}}` | Show placeholder text = unchecked | #41, 42 |
| Unit Display Option | Dropdown | "Inside input" | Show range input = OFF | #43, 44 |
| Range slider & Range input order | Radio | "slider on top" | cả Show range slider và Show range input = OFF | #45, 46 |

Validation Amount of slider steps: `[CẦN XÁC NHẬN BA]` — sheet Add case #34 mô tả nhập 0/âm phải báo lỗi nhưng chưa có bằng chứng actual rõ ràng (chỉ có note lạc "Số count..." đã loại ở mục 2); case #35 (nhập chữ) rule rõ ràng — chỉ cho số nguyên dương.

## 6. Filter Settings — Width Range

| Field | Mô tả | Default | Nguồn |
| --- | --- | --- | --- |
| Width Range | Dropdown, tự tính `[Lowest available width] - [Highest available width]` từ toàn bộ product đã sync có Width ≠ rỗng | Theo data BC hiện tại | #21, 22, 23 |

Cập nhật theo sync: BC đổi Width (thêm/sửa/xoá) → re-sync → dropdown Admin + slider Preview + storefront cùng cập nhật range mới (#23, #77).

`[CẦN XÁC NHẬN BA]` — Admin có được nhập tay override min/max hay Width Range luôn luôn tự tính read-only theo data BC? (sheet Add case #118 tự đặt câu hỏi này, chưa có câu trả lời).

## 6.9 Filter Settings — Sort Order (field bị thiếu case trong sheet gốc)

Theo bằng chứng relocate ở mục 2 (note "H-L, L-H, Manual order" bị lạc sang case Decimal Separator/Show tooltip), Width **nhiều khả năng có field Sort Order** giống mọi node khác trong dự án (Brand/Category/Sale Percentage...) nhưng sheet gốc **thiếu hẳn case test riêng cho field này** — có thể do lỗi xoá nhầm dòng lúc chỉnh sheet từ template.

`[CẦN XÁC NHẬN BA]` — Field Sort Order có tồn tại trên Width không? Nếu có, cấu trúc dự kiến theo pattern chung (dựa Sale Percentage): Lowest→Highest (default) / Highest→Lowest / Manual order (kéo thả) — bản thân note lạc cũng tự nghi vấn "default hiện đang là manual, đúng hay sai?" giống hệt câu hỏi mở ở Sale Percentage. Viết test case theo giả thuyết có field này (an toàn hơn bỏ sót), đánh dấu `<cần confirm>` toàn bộ nhóm.

## 6.6 Filter Settings — Setup dynamic filter (khái niệm mới, chưa gặp ở node khác)

| Field | Mô tả | Default | Nguồn |
| --- | --- | --- | --- |
| Setup dynamic filter | Toggle + icon tooltip (?) | OFF | #47, 48 |

Khi ON: "Width filter range tự động thu hẹp theo sản phẩm hiện có trong kết quả tìm kiếm" (mô tả từ sheet, case #48). `[CẦN XÁC NHẬN BA]` — cơ chế chính xác chưa rõ: tự thu hẹp range dựa trên keyword search hiện tại, hay dựa trên Category Page đang xem, hay cả 2? Không có node nào khác trong dự án có field tương tự để đối chiếu — cần xác nhận riêng với BA/PDF spec gốc (nếu có).

## 7. Hide on customer group

Giống pattern chung, nhưng **2 bug đã relocate từ mục 2** (khớp chính xác 2 bug NG đã xác nhận ở Sale Percentage #30/#31):
- Chọn customer group → storefront **vẫn hiển thị filter** dù account thuộc group đó (NG, kế thừa).
- BC xoá customer group → popup **không update số lượng** hiển thị ngoài MH Edit (NG, kế thừa).

## 8. Appearance settings

Theo sheet, panel gồm: Display tooltip (+content), Content View (dropdown, default "Scrollable"), Collapse/Expand (Desktop/Mobile, default Expand), Show search box on desktop/mobile (default OFF cả 2).

`[CẦN XÁC NHẬN BA]` — chưa có ảnh UI thật đối chiếu (mục 0); các node khác thường có xung đột giữa sheet và ảnh UI ở đúng khối Appearance (Show all irrelevant values/Uppercase có khi có khi không) — Width sheet không nhắc 2 field này, nhưng chưa chắc chắn 100% cho tới khi có ảnh thật.

## 9. Storefront & Merchandising rules

**Rủi ro kế thừa cao — cùng root cause đã xác nhận rộng ở Category/Special Offers/Sale Percentage**: note "[Storefront_Filter category/Special Offers/Sale Percentage] List product không filter theo giá trị đã chọn" lặp lại từ case #38 đến #56 trong sheet Width (relocate note theo mục 2) — ảnh hưởng gần như toàn bộ nhóm rule dưới đây, giữ nguyên rule đúng theo thiết kế, đánh dấu rủi ro thay vì khẳng định Happy chắc chắn:

| Rule | Mô tả | Nguồn |
| --- | --- | --- |
| Width field optional | Để trống → không lỗi BC, product bị loại khỏi Width Range/filter | #71, #94 |
| Filter theo range đã chọn | Chỉ product có Width trong khoảng đã chọn | #78 |
| Input From/To đồng bộ 2 chiều với slider | Nhập input → slider cập nhật; kéo slider → input cập nhật | #79 |
| Clear filter → reset toàn bộ | | #80 |
| AND logic với filter khác | Theo pattern chung dự án | Suy luận, chưa có case riêng trong sheet — `<cần confirm>` |
| Merchandising — product Hidden | Không tính vào Width Range/count | Suy luận theo pattern chung — `<cần confirm>`, sheet Width không có case riêng (khác Sale Percentage có #49) |
| Range chỉ tính trên product CÓ Width | Product để trống Width không kéo méo min/max | #95, #123 |
| Setup dynamic filter khi customer đang chọn range tuỳ chỉnh | Vị trí slider giữ nguyên tới khi reload; sau reload reset theo range mới | #116, #117 |

## 10. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Ảnh Figma thật của Width chưa đối chiếu được (Figma MCP chưa kết nối) — toàn bộ chi tiết UI cụ thể cần verify lại khi có ảnh | 0 |
| 2 | Display Style có đúng chỉ 3 giá trị (Slider-input/List/Grid) hay thừa option Swatch giống bug đã xác nhận ở Sale Percentage? | 4 |
| 3 | Amount of slider steps: input 0/âm có thực sự bị chặn save không? | 5 |
| 4 | Admin có được nhập tay override Width Range (min/max) hay luôn read-only tự tính theo BC? | 6 |
| 5 | Field Sort Order có tồn tại trên Width không — sheet gốc thiếu case nhưng để lại bằng chứng note lạc gợi ý CÓ | 6.9 |
| 6 | Setup dynamic filter: cơ chế tự thu hẹp range chính xác dựa trên điều kiện gì (search keyword/category/cả 2)? | 6.6 |
| 7 | AND logic với filter khác + rule Merchandising Hidden — sheet Width không có case riêng như Sale Percentage, cần xác nhận có áp dụng đúng pattern chung không | 9 |

## 11. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Width filter node (Add + Edit)
- **Tài liệu liên quan:** `filter-tree-common-specs.md`, `edit-filter-node-sale-percentage-specs.md` (sibling gần nhất, dùng đối chiếu phát hiện note contamination), `docs/sync-fields-glossary.md` (xác nhận `width` Sync trực tiếp)
- **Nguồn:** Sheet test case `Add filter node - Width` (gid=1582142711, 123 case) — **chưa có ảnh UI Figma thật đối chiếu** (khác biệt quan trọng so với các node trước)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 7
