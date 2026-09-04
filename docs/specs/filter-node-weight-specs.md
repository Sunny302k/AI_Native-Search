# Filter node - Weight — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Add filter node - Weight` (Google Sheet `TC_Native Search`, gid=897871061, 123 case, fetch được toàn bộ nội dung qua export CSV/gviz).

**Giới hạn quan trọng cần nêu rõ**: người dùng gửi kèm link Figma (node-id 1467-29353, dùng chung UI với filter node Price) nhưng Figma không đọc được trong phiên làm việc này (không có Figma MCP kết nối, WebFetch chỉ trả về trang shell rỗng "Figma" — Figma là SPA render bằng JS, không đọc được qua fetch HTML thuần). Người dùng xác nhận nên viết spec theo cách đã áp dụng thành công với `filter-node-width-specs.md`: viết từ sheet + đối chiếu logic với node anh em gần nhất, **chưa đối chiếu được với ảnh UI Figma thật**. Toàn bộ chi tiết UI cụ thể (số lượng option dropdown, vị trí field...) giữ nguyên mức tin cậy như Width, cần verify lại bằng ảnh khi có.

**Điểm khác biệt so với lúc làm Width**: sheet Weight đầy đủ và chi tiết hơn hẳn sheet Width — không chỉ có phần "Add" (case #1-87) và "Edit" (case #88-123) như Width, mà còn có hẳn 1 nhóm case dành riêng cho đặc thù **Weight là required field** (case #68-95, #116-123) không có ở Width. Ngoài ra lần này bổ sung được các **BC platform fact đã tra cứu qua BigCommerce Developer Docs** (không có ở spec Width, xem mục 9.1) — nâng độ tin cậy cho phần business rule liên quan trực tiếp tới field Weight bên BC.

## 1. Tổng quan

Weight là filter node lọc theo **khối lượng sản phẩm** (BC Product → Fulfillment tab → field "Weight (KGS/LBS/OZ/G tuỳ setting store)", **required**, có dấu `*` — khác Width/Height/Depth là optional, xác nhận qua cả sheet case #68 lẫn BC Developer Docs mục 9.1). Đồng bộ qua Sync (`docs/sync-fields-glossary.md` xác nhận `weight` nằm trong whitelist Products Sync trực tiếp, cùng nhóm `weight / width / depth / height`).

Cùng pattern **range liên tục (continuous min-max)** như Width — không có popup "Select filter options" cấu hình tay, thay vào đó có **Weight Range**: 1 dropdown auto-tính `[Lowest available weight] - [Highest available weight]` trực tiếp từ dữ liệu BC đã sync. Display Style mặc định **Slider - input**, List/Grid là 2 lựa chọn thay thế đơn giản hoá. Toàn bộ cấu trúc field con (Show range slider, Slide handle color, Decimal Separator, Show tooltip + Tooltip color, Has slider steps + Amount + Show step value, Show range input + placeholder + Unit Display Option, Range slider/input order, Setup dynamic filter) **giống hệt Width** — cùng UI, cùng default, cùng field ẩn/hiện theo điều kiện.

**Khác biệt cốt lõi với Width nằm ở tầng dữ liệu nguồn (BC), không nằm ở UI Admin**: vì Weight là required field nên (a) Weight Range trên Admin **không bao giờ rơi vào trạng thái rỗng/null do thiếu data** như Width có thể gặp (mọi product luôn có ít nhất giá trị default), (b) tồn tại nhóm edge-case riêng về giá trị default khi tạo product mới (=1.00), số thập phân dài, số rất lớn, và đặc biệt **Product Type = Digital ẩn hẳn field Weight** (không phải để trống mà là field không tồn tại — xem mục 9.1).

## 2. Đối chiếu với sheet Width — cùng pattern nhiễm chéo template Sale Percentage

Sheet Weight có **cùng hiện tượng nhiễm note lạc dòng đã phát hiện ở Width** (`filter-node-width-specs.md` mục 2), thậm chí **trùng khớp gần như tuyệt đối tới từng số thứ tự case** — bằng chứng mạnh cả 2 sheet Width và Weight đều được clone từ cùng 1 template Sale Percendtage rồi chỉnh sửa, và cùng sót lại các note chưa dọn đúng vị trí:

| # case Weight | Note lạc | Đối chiếu case Width tương ứng | Quyết định |
| --- | --- | --- | --- |
| #2 | "Thiếu text 'Sale Percentage'" | Không có case tương ứng khớp ở Width, nhưng rõ ràng không thuộc về Button Save của Weight | **Bỏ** — nhiễu do copy template |
| #10 | "Hiển thị ký hiệu $ thay vì %, Confirm xem được set mã bao nhiêu row" | Khớp Width #10 (note gốc thuộc Sale Percentage) | **Bỏ** — nhiễu, không thuộc Title Alignment |
| #11 | "Ở record cuối, hiển thị default phải là 100 thay vì null" | Khớp Width case #15 (bug List/Grid hiển thị "null") | **Relocate** → mục 5 Display Style |
| #15 | "Khi ko nhập thì trên storefront đang show 'null', Luôn hiển thị dư 1 record" | Khớp chính xác Width #15 | **Giữ tại chỗ** — đúng vị trí, là bug List/Grid xác nhận NG |
| #18 | "Không chặn tất cả các ký tự, bao gồm ký tự đặc biệt hay chữ cái" (dán ở case Show range slider OFF) | Khớp **chính xác cả số thứ tự case** với Width #18 (cùng note, cùng vị trí sai) | **Bỏ** — nhiễu, không xác định được nguồn gốc thật (giống hệt kết luận ở Width) |
| #23 | "Thừa option swatch" | Khớp **chính xác** Width #23 | **Relocate + giữ nghi vấn** → mục 4 Display Style, thêm `<cần confirm>` |
| #24 | "Với grid, record đầu luôn bị highlight màu cam" | Khớp **chính xác** Width #24 | **Relocate** → mục 4 Display Style |
| #25 | "Sai thứ tự, hiện tại đang là H-L, L-H, Manual order" | Khớp **chính xác** Width #25 | **Relocate** → bằng chứng Weight **cũng thiếu field Sort Order** như Width, xem mục 6.9 |
| #26/#27 | "Đang hiển thị giảm dần" / "Đang hiển thị tăng dần" | Khớp **chính xác** Width #26/#27 | **Relocate** → gộp chung bằng chứng thiếu Sort Order |
| #30 | "Vẫn hiển thị filter mặc dù account thuộc group HIDE ON CUSTOMER GROUP" | Khớp **chính xác** Width #30 | **Relocate** → mục 7 Hide on customer group |
| #31 | "Không update số lượng customer group ở mục HIDE ON CUSTOMER GROUP" | Khớp **chính xác** Width #31 | **Relocate** → mục 7 Hide on customer group |
| #34 | "Số count product ko đung, đang cho theo thứ tự tăng dần từ 1" | Khớp **chính xác** Width #34 | **Bỏ** — nhiễu, không xác định được nguồn gốc thật (giống kết luận Width) |
| #41–#56 | "[Storefront_Fitler catgory/Special Offers/Sale Percentage] List product không filter theo giá trị đã chọn..." lặp lại 7 lần liên tiếp trên các field không liên quan (Placeholder text, Unit Display Option, Range slider order, Setup dynamic filter, Hide on customer group, Display tooltip, Tooltip content) | Khớp đúng bug hệ thống đã xác nhận rộng ở Category/Special Offers/Sale Percentage/Width (mục 9 các spec đó) | **Giữ, chỉ ghi 1 lần ở mục 9.2** thay vì lặp lại — theo đúng cách đã làm ở Width |

Kết luận: độ tin cậy của việc "đối chiếu Width" cho Weight là **cao hơn bình thường**, vì 2 sheet không chỉ giống nhau về ngữ nghĩa mà giống nhau tới từng số thứ tự case bị nhiễm — gần như chắc chắn cùng 1 người/cùng 1 lần clone sheet.

## 3. General Settings

Giống hệt Width (và mọi filter node khác):

| Field | Loại | Validation | Default | Nguồn |
| --- | --- | --- | --- | --- |
| Title | Text | Bắt buộc, rỗng → lỗi required | "Weight" | Sheet #5, #6, #7, #66, #108 |
| Title text color | Color | Áp dụng ngay Preview | dark (mặc định) | Sheet #8, #9 |
| Title alignment | Radio Left/Center/Right | Áp dụng ngay Preview | Left | Sheet #10, #11, #12 |

**Rủi ro kế thừa** (chưa xác nhận qua ảnh UI thật): bug title dài >1 dòng luôn căn trái dù chọn Center/Right — note case #9 xác nhận lại đúng bug này (không phải note lạc, khớp ngữ nghĩa Title text color/Preview) — đã xác nhận NG lặp lại ở Category/Special Offers/Sale Percentage/Stock/Width.

## 4. Filter Settings — Display Style

3 giá trị (sheet #13 tự khẳng định đúng 3, nhưng xem cảnh báo `<cần confirm>` relocate từ #23):

| Giá trị | Default | Mô tả |
| --- | --- | --- |
| **Slider - input** | **Có** (mặc định) | Thanh trượt kéo + ô nhập số, có đầy đủ sub-settings mục 5 |
| List | — | Danh sách; ẩn/disable toàn bộ sub-settings Slider |
| Grid | — | Dạng lưới; ẩn/disable toàn bộ sub-settings Slider |

`[CẦN XÁC NHẬN BA]` — Dropdown Display Style có thực sự chỉ đúng 3 giá trị hay thừa option Swatch giống bug đã xác nhận ở Sale Percentage/Width (relocate từ #23)?

**Rủi ro kế thừa** (chưa xác nhận qua ảnh UI thật, relocate từ #11/#15/#24): ở List/Grid, khi không có data → storefront hiển thị chữ "null" thay vì ẩn field, hoặc hiển thị sai default (record cuối phải là 100 thay vì null); luôn hiển thị dư 1 record dạng "{giá trị max record cuối} and More"; ở Grid, record đầu tiên luôn bị highlight màu cam sẵn dù merchant chưa chọn gì.

## 5. Filter Settings — Slider - input sub-settings (chỉ hiện khi Display Style = Slider - input)

Giống hệt cấu trúc Width:

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

Validation Amount of slider steps: nhập 0/âm → lỗi (#34); nhập chữ → chỉ cho số nguyên dương (#35). Khác Width (chưa có bằng chứng rõ ràng), sheet Weight case #34 có test riêng nhưng note đã bị loại vì lạc (mục 2) — giữ nguyên `[CẦN XÁC NHẬN BA]` như Width cho tới khi có ảnh thật.

## 6. Filter Settings — Weight Range

| Field | Mô tả | Default | Nguồn |
| --- | --- | --- | --- |
| Weight Range | Dropdown, tự tính `[Lowest available weight] - [Highest available weight]` từ toàn bộ product đã sync | Theo data BC hiện tại | #21, 22, 23, 76 |

Cập nhật theo sync: BC đổi Weight (thêm/sửa/xoá) → re-sync → dropdown Admin + slider Preview + storefront cùng cập nhật range mới (#23, #77, #93).

`[CẦN XÁC NHẬN BA]` — Admin có được nhập tay override min/max hay Weight Range luôn luôn tự tính read-only theo data BC? (sheet case #118 tự đặt câu hỏi này, giống hệt câu hỏi mở #4 của Width — chưa có câu trả lời).

## 6.9 Filter Settings — Sort Order (field bị thiếu case trong sheet gốc — giống hệt Width)

Theo bằng chứng relocate ở mục 2 (note "H-L, L-H, Manual order" bị lạc sang case Decimal Separator/Show tooltip), Weight **nhiều khả năng có field Sort Order** giống mọi node khác trong dự án nhưng sheet gốc **thiếu hẳn case test riêng cho field này** — cùng lỗi đã ghi nhận ở Width, càng củng cố giả thuyết cả 2 sheet chung nguồn gốc lỗi xoá nhầm dòng khi clone từ template.

`[CẦN XÁC NHẬN BA]` — Field Sort Order có tồn tại trên Weight không? Nếu có, cấu trúc dự kiến theo pattern chung: Lowest→Highest (default) / Highest→Lowest / Manual order (kéo thả). Viết test case theo giả thuyết có field này (an toàn hơn bỏ sót), đánh dấu `<cần confirm>`.

## 6.6 Filter Settings — Setup dynamic filter

| Field | Mô tả | Default | Nguồn |
| --- | --- | --- | --- |
| Setup dynamic filter | Toggle + icon tooltip (?) | OFF | #47, 48 |

Khi ON: "Weight filter range tự động thu hẹp theo sản phẩm hiện có trong kết quả tìm kiếm" (#48). Sheet còn có case #117 mô tả rõ hơn hành vi khi range co lại lúc customer đang chọn range cũ ngoài phạm vi mới — xem mục 9.3.

`[CẦN XÁC NHẬN BA]` — cơ chế chính xác chưa rõ: tự thu hẹp dựa trên keyword search hiện tại, hay Category Page đang xem, hay cả 2? (giống câu hỏi mở của Width, chưa có node nào khác đối chiếu được).

## 7. Hide on customer group

Giống pattern chung, nhưng **2 bug đã relocate từ mục 2** (khớp chính xác 2 bug NG đã xác nhận ở Sale Percentage/Width #30/#31):
- Chọn customer group → storefront **vẫn hiển thị filter** dù account thuộc group đó (NG, kế thừa).
- BC xoá customer group → popup **không update số lượng** hiển thị ngoài MH Edit (NG, kế thừa).

## 8. Appearance settings

Theo sheet (#51-62), panel gồm: Display tooltip (ON default) + Tooltip content, Content View (dropdown, default "Scrollable"), Collapse/Expand (Desktop/Mobile, default Expand), Show search box on desktop/mobile (default OFF cả 2). Cấu trúc giống hệt Width.

## 9. BC field Weight — đặc thù riêng (khác Width)

### 9.1 BC platform fact (đã tra cứu BigCommerce Developer Docs, xem `docs/bigcommerce-platform-facts.md`)

| Fact | Chi tiết | Độ tin cậy |
| --- | --- | --- |
| Weight required khi tạo product | BC Product API mô tả rõ Weight là field **required**, kiểu **float**, đơn vị theo setting cân nặng của store (KGS/LBS/OZ/G) — khác Width/Height/Depth optional | Cao — tra trực tiếp BC Developer Docs |
| Digital product ẩn field Weight | Product Type = Digital → BC ẩn hẳn field Weight/Width/Height/Depth (không phải để trống, mà field không tồn tại trên form) vì không cần shipping | Trung bình — chưa fetch được nguyên văn trang support chính thức, chỉ có tổng hợp qua WebSearch, khớp với giả thuyết sheet case #84/#85 |

Field Weight trên BC Admin (tab Fulfillment) — mô tả theo sheet, đối chiếu platform fact trên:

| Test aspect | Mô tả | Nguồn |
| --- | --- | --- |
| Required, có dấu `*` | Khác Width/Height/Depth optional | #68, platform fact |
| Default value khi tạo product mới | = 1.00 | #69, #123 |
| Để trống → BC chặn save | Lỗi required (khác Width cho phép để trống) | #72 |
| Nhập số âm | BC không cho lưu / báo lỗi validation | #73 |
| Nhập chữ | BC không nhận, chỉ chấp nhận số | #74 |
| Nhập = 0 | `[CẦN XÁC NHẬN BA]` — chưa rõ BC coi 0 là hợp lệ (weight bằng 0, khả dĩ với 1 số hàng hoá đặc biệt) hay chặn như số âm | #75 |
| Nhiều chữ số thập phân (VD 1.123456) | `[CẦN XÁC NHẬN BA]` — BC lưu nguyên hay làm tròn theo giới hạn thập phân? Cần verify số chữ số thập phân BC thực sự hỗ trợ | #82 |
| Số rất lớn (VD 999999.99) | `[CẦN XÁC NHẬN BA]` — BC có giới hạn max không, hay chấp nhận vô hạn | #83 |
| Product Type = Digital | Ẩn field Weight → product không set được Weight → khi lọc theo Weight trên storefront, product Digital không xuất hiện trong bất kỳ khoảng nào (không tính vào range, không match filter) | #84, #85, platform fact |

### 9.2 Rủi ro kế thừa storefront (cùng root cause đã xác nhận rộng ở Category/Special Offers/Sale Percentage/Width)

Note "[Storefront_Filter category/Special Offers/Sale Percentage] List product không filter theo giá trị đã chọn" lặp lại 7 lần trong sheet Weight (case #41-56, relocate theo mục 2) — ảnh hưởng gần như toàn bộ nhóm rule dưới đây, giữ nguyên rule đúng theo thiết kế, đánh dấu rủi ro thay vì khẳng định Happy chắc chắn:

| Rule | Mô tả | Nguồn |
| --- | --- | --- |
| Weight field required | Không thể để trống (khác Width optional) → mọi product hợp lệ trên BC đều có Weight, kể cả default = 1.00 | #94, platform fact |
| Weight Range luôn tồn tại, không rơi vào null do thiếu data | **Khác biệt cốt lõi so với Width**: vì required nên không có case "range rỗng vì tất cả product để trống Weight" — chỉ rơi vào rỗng khi **không còn product nào** (đã xoá/unpublish hết) | #94, #95 |
| Filter theo range đã chọn | Chỉ product có Weight trong khoảng đã chọn | #79 |
| Input From/To đồng bộ 2 chiều với slider | Nhập input → slider cập nhật; kéo slider → input cập nhật | #80 |
| Clear filter → reset toàn bộ | | #81 |
| From > To khi nhập tay | `[CẦN XÁC NHẬN BA]` — BC chặn apply hay tự swap lại [To, From]? | #86 |
| Cả 2 handle trùng 1 điểm | `[CẦN XÁC NHẬN BA]` — hiển thị exact match hay xử lý khác theo spec | #87 |
| AND logic với filter khác | Theo pattern chung dự án | Suy luận, chưa có case riêng — `<cần confirm>` |
| Merchandising — product Hidden | Không tính vào Weight Range/count | Suy luận theo pattern chung — `<cần confirm>` |
| Product mới thêm giữ default 1.00 chưa custom | Vẫn tính vào Weight Range ngay khi sync (mở rộng min nếu 1.00 < min hiện tại) | #123 |

### 9.3 Setup dynamic filter — hành vi khi customer đang tương tác (case mới, Width không có)

| Tình huống | Hành vi trước reload | Hành vi sau reload | Nguồn |
| --- | --- | --- | --- |
| Admin đổi Amount of slider steps khi customer đang ở range tuỳ chỉnh | Vị trí slider customer giữ nguyên | Slider hiển thị số step mới, vị trí reset về mặc định (không giữ range cũ) | #116 |
| Weight Range co lại (do product bị xoá/đổi Weight ở BC) khi customer đang chọn range ngoài phạm vi mới | Customer vẫn ở range cũ (có thể trả 0 kết quả vì vượt range mới) | Slider tự giới hạn theo range mới, reset về full range hoặc clamp giá trị hợp lý | #117 |

`[CẦN XÁC NHẬN BA]` — case #122: Preview/Weight Range trên MH Edit có tự refresh real-time khi data BC đổi trong lúc Admin đang mở Edit (chưa reload), hay giữ snapshot tới khi reload trang?

## 10. Admin CRUD flow (nhóm case mới, chi tiết hơn Width)

| Flow | Mô tả | Nguồn |
| --- | --- | --- |
| Navigation | Click filter Weight từ danh sách → mở đúng Edit screen, không lẫn data filter khác (VD Depth) | #88, #89 |
| Pre-fill Edit | Toàn bộ field (Title, color, Display Style, Weight Range, sub-settings Slider, Appearance...) hiển thị đúng giá trị đã lưu, không reset default; riêng Weight Range luôn pre-fill theo data **mới nhất** đã sync, không phải giá trị tại thời điểm tạo filter | #90-104 |
| Save Changes — partial update | Sửa 1 field → chỉ field đó đổi, field khác giữ nguyên | #105 |
| Save Changes — multi-field | Sửa nhiều field cùng lúc → tất cả cập nhật đồng thời | #106 |
| Save Changes — no-op | Save khi chưa sửa gì → lưu thành công bình thường | #107 |
| Save as template | Lưu template không ảnh hưởng filter gốc cho tới khi Save Changes | #109 |
| Navigation guard | Sửa field chưa Save → click Back → dialog cảnh báo Discard/Save/Cancel; chọn Discard → revert đúng data gốc | #110, #111 |
| Reload/đóng tab khi chưa lưu | `[CẦN XÁC NHẬN BA]` — có cảnh báo native browser không, hay không implement | #112 |
| Delete | Có action Delete ở Edit (Create screen không có); Confirm → xoá khỏi danh sách + storefront sau sync; Cancel → giữ nguyên | #113, #114, #115 |
| Đổi Title không vỡ liên kết | Filter vẫn hoạt động đúng dù đổi tên, không tạo filter trùng | #120 |
| Concurrent edit (2 admin cùng sửa) | `[CẦN XÁC NHẬN BA]` — Admin B save sau có ghi đè mất thay đổi Admin A không (lost update) hay có cảnh báo conflict | #119 |
| Sync độc lập khi đang mở Edit | BC đổi Weight product song song lúc Admin đang mở Edit (chưa Save) → sync vẫn chạy độc lập, range cập nhật đúng dù Admin đang mở Edit screen | #121 |

## 11. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Ảnh Figma thật của Weight chưa đối chiếu được (Figma không đọc được trong phiên này) — toàn bộ chi tiết UI cụ thể cần verify lại khi có ảnh | 0 |
| 2 | Display Style có đúng chỉ 3 giá trị (Slider-input/List/Grid) hay thừa option Swatch giống bug đã xác nhận ở Sale Percentage/Width? | 4 |
| 3 | Amount of slider steps: input 0/âm có thực sự bị chặn save không? | 5 |
| 4 | Admin có được nhập tay override Weight Range (min/max) hay luôn read-only tự tính theo BC? | 6 |
| 5 | Field Sort Order có tồn tại trên Weight không — sheet gốc thiếu case nhưng để lại bằng chứng note lạc gợi ý CÓ (giống hệt Width) | 6.9 |
| 6 | Setup dynamic filter: cơ chế tự thu hẹp range chính xác dựa trên điều kiện gì (search keyword/category/cả 2)? | 6.6 |
| 7 | BC có cho lưu Weight = 0 không, hay chặn như số âm? | 9.1 |
| 8 | BC giới hạn bao nhiêu chữ số thập phân cho Weight, và có giới hạn max value không? | 9.1 |
| 9 | Fact "Digital product ẩn field Weight" mới chỉ tra được ở mức trung bình tin cậy (chưa fetch được nguyên văn trang support chính thức) — cần re-verify bằng ảnh/thao tác thật trên BC store | 9.1 |
| 10 | From > To khi nhập tay input: chặn apply hay tự swap? Cả 2 handle trùng 1 điểm xử lý thế nào? | 9.2 |
| 11 | Preview/Weight Range trên MH Edit có tự refresh real-time khi data BC đổi giữa lúc đang mở Edit không, hay giữ snapshot tới khi reload? | 9.3 |
| 12 | Reload/đóng tab khi có thay đổi chưa lưu — có cảnh báo native browser không? | 10 |
| 13 | 2 admin cùng Edit đồng thời — có lost update hay cảnh báo conflict? | 10 |
| 14 | AND logic với filter khác + rule Merchandising Hidden — sheet không có case riêng, cần xác nhận có áp dụng đúng pattern chung không | 9.2 |

## 12. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Weight filter node (Add + Edit)
- **Tài liệu liên quan:** `filter-tree-common-specs.md`, `filter-node-width-specs.md` (sibling gần nhất, dùng đối chiếu phát hiện note contamination — cùng root cause template Sale Percentage), `docs/sync-fields-glossary.md` (xác nhận `weight` Sync trực tiếp), `docs/bigcommerce-platform-facts.md` (fact Weight required + Digital ẩn field)
- **Nguồn:** Sheet test case `Add filter node - Weight` (gid=897871061, 123 case) — **chưa có ảnh UI Figma thật đối chiếu**; BC Developer Docs (Create Product API) cho phần platform fact mục 9.1
- **Số câu hỏi CẦN XÁC NHẬN BA:** 14
