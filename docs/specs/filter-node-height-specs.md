# Filter node - Height — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Add filter node - Height` (Google Sheet `TC_Native Search`, gid=874981332, 123 case, fetch được toàn bộ nội dung qua export gviz CSV).

**Không có link Figma cho Height** (khác Weight) — viết hoàn toàn dựa trên sheet + đối chiếu logic với 2 node anh em đã làm: `filter-node-width-specs.md` (cùng field **optional**, cùng nhóm BC Fulfillment) và `filter-node-weight-specs.md` (cùng pattern range slider, đã có BC platform facts research + cấu trúc mục Sync). Toàn bộ chi tiết UI cụ thể chưa đối chiếu được với ảnh thật, giữ nguyên mức tin cậy như Width/Weight.

**Chất lượng sheet Height**: đây là sheet **đầy đủ và sạch nhất** trong 3 node range-slider đã làm (Width/Weight/Height) — có đủ các case mà Weight từng thiếu (bidirectional input/slider sync #79, Clear filter reset #80, From>To #86, 2 handle trùng điểm #87, partial-empty-data range calculation #95). Vẫn còn dính đúng pattern nhiễm chéo từ template Sale Percentage tại các vị trí case giống hệt Width/Weight (xem mục 2).

## 1. Tổng quan

Height là filter node lọc theo **kích thước chiều cao sản phẩm** (BC Product → Fulfillment tab → field "Height (Centimeters)", **optional**, không có dấu `*` — giống Width/Depth, khác Weight là required — xác nhận qua sheet #68 và `docs/bigcommerce-platform-facts.md`). Đồng bộ qua Sync (`docs/sync-fields-glossary.md` xác nhận `height` nằm trong whitelist Products Sync trực tiếp, cùng nhóm `weight / width / depth / height`).

Cùng pattern **range liên tục (continuous min-max)** như Width/Weight — dropdown **Height Range** tự tính `[Lowest available height] - [Highest available height]` từ dữ liệu BC đã sync, không cấu hình tay qua popup. Display Style mặc định **Slider - input**, List/Grid là lựa chọn thay thế. Toàn bộ field con Slider-input (Show range slider, Slide handle color, Decimal Separator, Show tooltip + Tooltip color, Has slider steps + Amount + Show step value, Show range input + placeholder + Unit Display Option, Range slider/input order, Setup dynamic filter) **giống hệt Width/Weight về cấu trúc**.

**Khác biệt cốt lõi so với Weight (giống Width)**: Height **optional** → có thể để trống ở BC → sinh ra nhóm rule khác hẳn Weight ở tầng dữ liệu: product để trống Height bị loại khỏi Height Range (không kéo méo min/max), toàn bộ product không có Height → range rỗng, product mới thêm để trống Height không ảnh hưởng range (đối lập hoàn toàn với Weight — vì Weight required nên default value LUÔN ảnh hưởng range).

## 2. Đối chiếu note nhiễm chéo — cùng pattern template Sale Percentage như Width/Weight

| # case Height | Note lạc | Đối chiếu | Quyết định |
| --- | --- | --- | --- |
| #2 | "Thiếu text 'Sale Percentage'" | Khớp Width #2, Weight #2 | **Bỏ** — nhiễu do copy template |
| #9 | "Khi title dài hơn 1 dòng, phần preview luôn hiển thị căn trái..." | Khớp đúng bug đã xác nhận NG rộng ở Category/Special Offers/Sale Percentage/Width/Weight | **Giữ tại chỗ** — đúng vị trí, hợp lệ |
| #10 | "Hiển thị ký hiệu $ thay vì %, Confirm mấy row (~4)" | Khớp Width #10, Weight #10 (note gốc thuộc Sale Percentage) | **Bỏ** — nhiễu, không thuộc Title Alignment |
| #11 | "Ở record cuối, hiển thị default phải là 100 thay vì null" | Khớp Width #11, Weight #11 (bug List/Grid) | **Relocate** → mục 4 Display Style |
| #13 | "Phần count vẫn chưa được xử lý" | Khớp Width #13 | **Giữ, đánh dấu rủi ro chung** → mục 4 |
| #15 | "Khi ko nhập thì trên storefront đang show 'null', Luôn hiển thị dư 1 record" | Khớp chính xác Width #15, Weight #15 | **Giữ tại chỗ** — đúng vị trí, bug List/Grid xác nhận NG |
| #16 | "Đang không show lỗi vf cho lưu thành công" | Theme chung sheet: tỷ lệ case chưa validate cao | **Giữ tại chỗ** |
| #17/18/19 | "Đang không vlidat" / "Đang không chặn ký tự đặc biệt" / "Đang không validate" | Theme chung, khớp Width #17/18/19, Weight tương tự | **Giữ tại chỗ** |
| #23 | "Thừa option swatch" | Khớp chính xác Width #23, Weight #23 | **Relocate + giữ nghi vấn** → mục 5 Height Range/Display Style, thêm `<cần confirm>` |
| #24 | "Với grid, record đầu luôn bị highlight màu cam" | Khớp chính xác Width #24, Weight #24 | **Relocate** → mục 4 Display Style |
| #25 | "Sai thứ tự H-L, L-H, Manual order — Default đang là manual, đúng hay sai?" | Khớp chính xác Width #25, Weight #25 | **Relocate** → bằng chứng Height **cũng thiếu field Sort Order**, xem mục 6.9 |
| #26/#27 | "Đang hiển thị giảm dần" / "Đang hiển thị tăng dần" | Khớp Width #26/27, Weight #26/27 | **Relocate** → gộp chung bằng chứng thiếu Sort Order |
| #30 | "Vẫn hiển thị filter mặc dù account thuộc group HIDE ON CUSTOMER GROUP" | Khớp chính xác Width #30, Weight #30 | **Relocate** → mục 7 Hide on customer group |
| #31 | "Không update số lượng customer group khi xoá group ở BC" | Khớp chính xác Width #31, Weight #31 | **Relocate** → mục 7 Hide on customer group |
| #34 | "Số count product ko đúng, đang cho theo thứ tự tăng dần từ 1" | Khớp Width #34, Weight #34 | **Bỏ** — nhiễu, không xác định được nguồn gốc thật |
| #38–#40 | "[Storefront_Fitler catgory/Special Offers/Sale Percentage] List product không filter theo giá trị đã chọn..." | Khớp bug hệ thống đã xác nhận rộng ở Category/Special Offers/Sale Percentage/Width/Weight | **Giữ, chỉ ghi 1 lần** ở mục 9.2 thay vì lặp lại |

Kết luận: cùng mức độ tin cậy cao khi đối chiếu Width/Weight như đã áp dụng — 3 sheet Width/Weight/Height chắc chắn chung 1 nguồn clone từ Sale Percentage.

## 3. General Settings

Giống hệt Width/Weight:

| Field | Loại | Validation | Default | Nguồn |
| --- | --- | --- | --- | --- |
| Title | Text | Bắt buộc, rỗng → lỗi required | "Height" | Sheet #5, #6, #7, #66, #108 |
| Title text color | Color | Áp dụng ngay Preview | dark (mặc định) | Sheet #8, #9 |
| Title alignment | Radio Left/Center/Right | Áp dụng ngay Preview | Left | Sheet #10, #11, #12 |

**Rủi ro kế thừa**: bug title dài >1 dòng luôn căn trái dù chọn Center/Right — đã xác nhận NG lặp lại ở Category/Special Offers/Sale Percentage/Width/Weight.

## 4. Filter Settings — Display Style

3 giá trị (sheet #13 tự khẳng định đúng 3, nhưng xem cảnh báo `<cần confirm>` relocate từ #23):

| Giá trị | Default | Mô tả |
| --- | --- | --- |
| **Slider - input** | **Có** (mặc định) | Thanh trượt kéo + ô nhập số |
| List | — | Danh sách; ẩn/disable toàn bộ sub-settings Slider |
| Grid | — | Dạng lưới; ẩn/disable toàn bộ sub-settings Slider |

`[CẦN XÁC NHẬN BA]` — Dropdown Display Style có thực sự chỉ đúng 3 giá trị hay thừa option Swatch (relocate từ #23, giống bug đã xác nhận ở Sale Percentage/Width/Weight)?

**Rủi ro kế thừa** (relocate từ #11/#15/#24): ở List/Grid khi không có data → hiển thị "null" thay vì ẩn field, hoặc sai default (record cuối phải là 100 thay vì null); luôn dư 1 record "{max} and More"; ở Grid record đầu luôn highlight màu cam sẵn.

## 5. Filter Settings — Slider - input sub-settings (chỉ hiện khi Display Style = Slider - input)

Giống hệt cấu trúc Width/Weight:

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

Validation Amount of slider steps: nhập 0/âm → lỗi (#34); nhập chữ → chỉ cho số nguyên dương (#35). Cùng mức `[CẦN XÁC NHẬN BA]` như Width/Weight cho tới khi có ảnh UI thật xác nhận 0/âm có thực sự chặn được không.

## 6. Filter Settings — Height Range

| Field | Mô tả | Default | Nguồn |
| --- | --- | --- | --- |
| Height Range | Dropdown, tự tính `[Lowest available height] - [Highest available height]` từ product đã sync **CÓ giá trị Height** (loại trừ product để trống) | Theo data BC hiện tại | #21, 22, 75 |

Cập nhật theo sync: BC đổi Height → re-sync → Admin dropdown + Preview + storefront cùng cập nhật (#23, #77, #93).

`[CẦN XÁC NHẬN BA]` — Admin có được nhập tay override min/max hay Height Range luôn read-only tự tính theo BC? (#118, giống hệt câu hỏi mở của Width/Weight).

## 6.9 Filter Settings — Sort Order (field bị thiếu case trong sheet gốc — giống hệt Width/Weight)

Theo bằng chứng relocate ở mục 2, Height **nhiều khả năng có field Sort Order** giống mọi node khác nhưng sheet gốc **thiếu hẳn case test riêng** — cùng lỗi đã ghi nhận ở Width/Weight, càng củng cố giả thuyết 3 sheet chung nguồn gốc lỗi khi clone template.

`[CẦN XÁC NHẬN BA]` — Field Sort Order có tồn tại trên Height không? Nếu có, cấu trúc dự kiến: Lowest→Highest (default) / Highest→Lowest / Manual order.

## 6.6 Filter Settings — Setup dynamic filter

| Field | Mô tả | Default | Nguồn |
| --- | --- | --- | --- |
| Setup dynamic filter | Toggle + icon tooltip (?) | OFF | #47, 48 |

Khi ON: "Height filter range tự động thu hẹp theo sản phẩm hiện có trong kết quả tìm kiếm" (#48). Sheet #116/#117 mô tả chi tiết hành vi khi range co lại/Admin đổi step lúc customer đang tương tác — xem mục 9.3.

`[CẦN XÁC NHẬN BA]` — cơ chế chính xác chưa rõ: tự thu hẹp dựa trên search keyword hiện tại, Category Page đang xem, hay cả 2 (giống câu hỏi mở Width/Weight).

## 7. Hide on customer group

Giống pattern chung, nhưng **2 bug đã relocate từ mục 2** (khớp chính xác bug NG đã xác nhận ở Sale Percentage/Width/Weight #30/#31):
- Chọn customer group → storefront **vẫn hiển thị filter** dù account thuộc group đó (NG, kế thừa).
- BC xoá customer group → popup **không update số lượng** hiển thị (NG, kế thừa).

## 8. Appearance settings

Theo sheet (#51-62), panel gồm: Display tooltip (ON default) + Tooltip content, Content View (dropdown, default "Scrollable"), Collapse/Expand (Desktop/Mobile, default Expand), Show search box on desktop/mobile (default OFF cả 2). Cấu trúc giống hệt Width/Weight.

## 9. BC field Height — đặc thù riêng (optional, giống Width khác Weight)

### 9.1 BC platform fact

Height thuộc nhóm `Width/Height/Depth` — **optional**, đã xác nhận qua `docs/bigcommerce-platform-facts.md` (mục Products — Weight, ghi chú "khác Width/Height/Depth cùng nhóm Fulfillment nhưng optional") và sheet #68 tự xác nhận ("Không có dấu * → là optional"). Không cần research lại BC Docs riêng cho Height vì đã cùng nhóm fact với Width.

`[CẦN XÁC NHẬN BA]` — Digital product type có ẩn field Height tương tự Weight không? Về logic nền tảng BC (ẩn toàn bộ field Fulfillment/shipping khi Digital) thì khả năng cao là CÓ (cùng cơ chế đã xác nhận ở Weight, độ tin cậy trung bình) — nhưng sheet gốc Height **không có case nào test riêng tình huống Digital** (khác Weight có #84/#85), nên đây là suy luận theo pattern, chưa có bằng chứng trực tiếp từ sheet.

| Test aspect | Mô tả | Nguồn |
| --- | --- | --- |
| Optional, không dấu `*` | Khác Weight required | #68 |
| Để trống → BC vẫn cho lưu | Không lỗi required (khác Weight) | #71 |
| Nhập số âm | BC không cho lưu / báo lỗi validation | #81 |
| Nhập chữ | BC không nhận, chỉ chấp nhận số | #82 |
| Nhập = 0 | `[CẦN XÁC NHẬN BA]` — chưa rõ BC coi 0 hợp lệ hay chặn như số âm | #83 |
| Nhiều chữ số thập phân | `[CẦN XÁC NHẬN BA]` — BC lưu nguyên hay làm tròn | #84 |
| Số rất lớn | `[CẦN XÁC NHẬN BA]` — BC có giới hạn max không | #85 |

### 9.2 Storefront & Merchandising rules — đặc thù optional field (đối lập Weight)

| Rule | Mô tả | Nguồn |
| --- | --- | --- |
| Height optional → có thể để trống thật sự | Khác Weight (luôn có giá trị vì required) | #71, platform fact |
| Product để trống Height → loại khỏi Height Range | Không kéo méo min/max, không tính vào count | #71, #73, #95, #123 |
| Toàn bộ product không có Height → Height Range rỗng | Ẩn/disable filter (không có data để filter) | #76, #94 |
| Product mới thêm để trống Height → KHÔNG ảnh hưởng range | **Đối lập hoàn toàn Weight** (Weight required nên default LUÔN ảnh hưởng range; Height optional nên để trống hoàn toàn transparent với range) | #123 |
| Filter theo range đã chọn | Chỉ product có Height trong khoảng đã chọn | #78 |
| Input From/To đồng bộ 2 chiều với slider | Nhập input → slider cập nhật; kéo slider → input cập nhật | #79 |
| Clear filter → reset toàn bộ | Slider + input về full range, sản phẩm reset | #80 |
| From > To khi nhập tay | `[CẦN XÁC NHẬN BA]` — chặn apply hay tự swap [To,From] | #86 |
| Cả 2 handle trùng 1 điểm | `[CẦN XÁC NHẬN BA]` — exact match hay xử lý khác | #87 |
| AND logic với filter khác | Theo pattern chung dự án | Suy luận, chưa có case riêng — `<cần confirm>` |
| Merchandising — product Hidden | Không tính vào Height Range/count | Suy luận theo pattern chung — `<cần confirm>` |

**Rủi ro kế thừa cao** (relocate mục 2): note "List product không filter theo giá trị đã chọn" lặp ở #38-40, cùng root cause đã xác nhận rộng ở Category/Special Offers/Sale Percentage/Width/Weight.

### 9.3 Setup dynamic filter — hành vi khi customer đang tương tác

| Tình huống | Trước reload | Sau reload | Nguồn |
| --- | --- | --- | --- |
| Admin đổi Amount of slider steps khi customer đang ở range tuỳ chỉnh | Vị trí slider giữ nguyên | Số step mới, vị trí reset mặc định | #116 |
| Height Range co lại (product bị xoá/đổi Height) khi customer chọn range cũ ngoài phạm vi mới | Customer vẫn ở range cũ (có thể 0 kết quả) | Slider tự giới hạn theo range mới | #117 |

`[CẦN XÁC NHẬN BA]` — Preview/Height Range trên MH Edit có tự refresh real-time khi data BC đổi trong lúc đang mở Edit (chưa reload), hay giữ snapshot tới khi reload (#122)?

## 10. Admin CRUD flow

| Flow | Mô tả | Nguồn |
| --- | --- | --- |
| Navigation | Click filter Height từ danh sách → mở đúng Edit screen, không lẫn data filter khác | #88, #89 |
| Pre-fill Edit | Toàn bộ field pre-fill đúng giá trị đã lưu, không reset default; Height Range pre-fill theo data **mới nhất** đã sync | #90-104 |
| Save Changes — partial/multi-field/no-op | | #105, #106, #107 |
| Save Changes — Title trống lỗi | | #108 |
| Save as template | Không ảnh hưởng filter gốc cho tới khi Save Changes | #109 |
| Navigation guard | Cảnh báo unsaved changes, Discard revert đúng data gốc | #110, #111 |
| Reload/đóng tab khi chưa lưu | `[CẦN XÁC NHẬN BA]` — cảnh báo native browser hay không implement | #112 |
| Delete | Chỉ có ở Edit; Confirm xoá khỏi storefront sau sync; Cancel giữ nguyên | #113, #114, #115 |
| Đổi Title không vỡ liên kết | | #120 |
| Concurrent edit | `[CẦN XÁC NHẬN BA]` — lost update hay cảnh báo conflict | #119 |
| Sync độc lập khi đang mở Edit | BC đổi Height song song lúc Admin đang mở Edit (chưa Save) → sync vẫn chạy độc lập | #121 |

## 11. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Không có ảnh Figma cho Height — toàn bộ chi tiết UI cụ thể cần verify lại khi có ảnh | 0 |
| 2 | Display Style có đúng chỉ 3 giá trị hay thừa option Swatch? | 4 |
| 3 | Amount of slider steps: input 0/âm có thực sự bị chặn save không? | 5 |
| 4 | Admin có được nhập tay override Height Range (min/max) hay luôn read-only? | 6 |
| 5 | Field Sort Order có tồn tại trên Height không — sheet thiếu case nhưng note lạc gợi ý CÓ (giống Width/Weight) | 6.9 |
| 6 | Setup dynamic filter: cơ chế tự thu hẹp range chính xác dựa trên điều kiện gì? | 6.6 |
| 7 | Digital product type có ẩn field Height giống Weight không — sheet Height không có case riêng test tình huống này (khác Weight) | 9.1 |
| 8 | BC có cho lưu Height = 0 không, hay chặn như số âm? | 9.1 |
| 9 | BC giới hạn bao nhiêu chữ số thập phân, có giới hạn max value không? | 9.1 |
| 10 | From > To khi nhập tay: chặn apply hay tự swap? Cả 2 handle trùng 1 điểm xử lý thế nào? | 9.2 |
| 11 | AND logic với filter khác + rule Merchandising Hidden — sheet không có case riêng | 9.2 |
| 12 | Preview/Height Range trên MH Edit có tự refresh real-time không? | 9.3 |
| 13 | Reload/đóng tab khi chưa lưu — có cảnh báo native browser không? | 10 |
| 14 | 2 admin cùng Edit đồng thời — lost update hay cảnh báo conflict? | 10 |

## 12. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Height filter node (Add + Edit)
- **Tài liệu liên quan:** `filter-tree-common-specs.md`, `filter-node-width-specs.md` (sibling gần nhất — cùng optional field), `filter-node-weight-specs.md` (đối chiếu cấu trúc mục Sync/BC platform facts), `docs/sync-fields-glossary.md` (xác nhận `height` Sync trực tiếp), `docs/bigcommerce-platform-facts.md` (fact optional, cùng nhóm Width/Depth)
- **Nguồn:** Sheet test case `Add filter node - Height` (gid=874981332, 123 case) — sheet đầy đủ nhất trong 3 node range-slider đã làm, **chưa có ảnh UI Figma thật đối chiếu**
- **Số câu hỏi CẦN XÁC NHẬN BA:** 14
