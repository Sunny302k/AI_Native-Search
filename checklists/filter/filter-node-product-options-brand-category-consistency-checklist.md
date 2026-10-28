# Consistency review - Product options vs Brand vs Category (filter node)

## Tổng quan

- Số spec đối chiếu: 3 (`edit-filter-node-product-options-specs.md` — draft mới từ ảnh chat, `edit-filter-node-brand-specs.md`, `edit-filter-node-category-specs.md`)
- Số điểm khác biệt: 9 (Có vẻ cố ý: 2 / Cần xác nhận BA: 7)

## Chi tiết

- [OK] General settings (Title/Title text color/Title alignment) — giống hệt cấu trúc cả 3 spec.
- [OK] Popup [Select filter options] (search 2 cột Option name/Values, multi-select, product count) — giống hệt pattern Brand; Category dùng chung khung nhưng thêm field riêng Option display (không liên quan Product options).
- [OK] Bộ field Appearance settings đầy đủ (Show all irrelevant values, Display all values in uppercase, Show search box Desktop/Mobile) — Product options CÓ đủ 3 field này giống Brand; đối lập với Category (đã tự xác nhận KHÔNG có 3 field này qua case SKIP + ảnh UI cross-validate). Củng cố thêm cho nhận định Product options theo pattern Brand, không theo pattern rút gọn của Category.
- [~] Sort order 5 lựa chọn (Alphabetical Asc/Desc, Product number Asc/Desc, Custom order) — Có vẻ cố ý giống Brand, KHÔNG theo Category (Category dùng popup dropdown mode Alphabet/Manual order riêng vì có cấu trúc phân cấp) — sticky note 1 của Product options trích nguyên văn đúng 5 lựa chọn này, đủ căn cứ xác nhận.
- [~] Setup dynamic option — disable khi Display Style = Swatch — Có vẻ cố ý giống hệt Brand, có sticky note trích nguyên văn xác nhận rõ ràng cho Product options.
- [ ] `[CẦN XÁC NHẬN BA]` Popup [Manage Swatch] khi Display Style = Swatch — Brand có cấu trúc đầy đủ (bảng Image/Swatch Name/Image Source Online URL-BigCommerce/URL, Swatch border radius slider, toggle Display filter option name in swatch). Bộ ảnh Product options không show trạng thái Swatch đã mở nên KHÔNG có bằng chứng xác nhận dùng chung hay khác cấu trúc — giữ nguyên câu hỏi mở, không đủ căn cứ suy ra "chắc dùng chung với Brand".
- [ ] `[CẦN XÁC NHẬN BA]` Field "Add on customer group" (Product options) vs "Hide on customer group" (Brand/Category) — tên gọi khác nhau trên UI không thể giải thích bằng lý do rõ ràng nào trong Figma/note hiện có; không đủ căn cứ khẳng định đây chỉ là khác tên gọi (rất có thể là hành vi ngược nghĩa: "Add on" gợi ý CHỈ HIỆN cho group được chọn, khác "Hide" là ẩn khỏi group được chọn).
- [ ] `[CẦN XÁC NHẬN BA]` Field "Navigation type" (Product options, chỉ thấy giá trị "Infinite scroll" trong ảnh) vs "Pagination type" (Brand/Category, dropdown 2 giá trị Infinite scroll/Show more + field phụ "Number of filter options per click" khi chọn Show more) — tên field khác nhau và chưa xác nhận được Product options có đủ option "Show more" + field phụ range hay không, vì dropdown trong ảnh chưa được mở ra để thấy hết danh sách.
- [ ] `[CẦN XÁC NHẬN BA]` Nút [Cancel]/icon [X] ở popup [Select filter options] — Brand đang ghi nhận bug NG (Cancel/X vẫn tạo node dù đúng ra phải huỷ). Chưa có ảnh/case nào xác nhận hành vi này cho riêng Product options — không tự suy diễn NG tương tự, nhưng cũng không tự suy diễn đã fix, cần test độc lập.
- [ ] `[CẦN XÁC NHẬN BA]` Option select type — default Single hay Multiple? Brand mặc định Multiple (đã xác nhận qua sheet case thật); ảnh Product options (khung sau khi Save) đang hiển thị "Single" nhưng đây có thể chỉ là giá trị đã chọn tay trong ảnh mẫu, không phải bằng chứng về default. Ngoài ra Brand có 1 rule phụ riêng: đổi Multiple→Single khi đang có sẵn nhiều value multi-selected (case #53,54 — đang NG) — spec Product options hiện chưa nhắc gì tới rule tương tự này, cần verify khi có quyền test thật.
- [ ] `[CẦN XÁC NHẬN BA]` Tooltip content — Brand có giới hạn cụ thể 255 ký tự cho nội dung tooltip; Product options spec hiện chỉ mô tả field tồn tại (nội dung mẫu "This is the tooltip") mà KHÔNG có giới hạn ký tự nào được ghi nhận — bộ ảnh hiện có không đủ để xác nhận Product options có cùng giới hạn 255 ký tự hay không.
- [ ] `[CẦN XÁC NHẬN BA]` Rule "Collapse/Expand mất selection" — Brand ghi nhận bug NG cụ thể: collapse rồi expand lại filter → option đã chọn trước đó bị mất trạng thái selected (case #113). Product options cũng có field Collapse/Expand Desktop/Mobile nhưng spec hiện tại chưa nhắc gì tới rủi ro này — cần test lại độc lập cho Product options, không mặc định bug này chỉ riêng Brand hay đã áp dụng chung.

## Ghi chú thêm

Không phát hiện field nào của Category (ngoài Option display — đặc thù riêng do cấu trúc phân cấp category, không áp dụng cho Product options) bị thiếu trong Product options spec. Phần lớn khác biệt phát hiện được đều xoay quanh việc bộ ảnh Figma hiện có (3 khung tĩnh + 2 note) không đủ để quan sát các state/modal con không xuất hiện trực tiếp trong ảnh (Manage Swatch, dropdown Navigation type mở rộng, trạng thái Cancel/X) — đây là giới hạn của nguồn dữ liệu đầu vào, không phải bằng chứng cho thấy các field/rule đó không tồn tại.
