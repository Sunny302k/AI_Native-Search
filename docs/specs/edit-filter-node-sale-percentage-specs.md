# Edit filter node - Sale Percentage — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Add filter node - Sale Percentage` (55 case, Google Sheet `TC_Native Search`, link: docs.google.com/spreadsheets/d/1ZqcAoLFr2nIdlRDj7_vIrKxi3IACrkwp, gid=361428597), đối chiếu với **ảnh UI Export Figma thật**: `03_Filter/01_Display_Setup/02_Filter_Tree_Node_Setup/UI_Export/Edit filter node _ Sale Percentage.png` (8178×4198px, đã crop sticky note, panel chính, popup "Select filter options" ở độ phân giải gốc), và với các feature anh em đã làm trước: `edit-filter-node-brand`/`edit-filter-node-condition`/`edit-filter-node-review-rating`/`edit-filter-node-featured-products`/`edit-filter-node-category`/`edit-filter-node-special-offers`.

**Mức khớp**: cao ở phần cấu trúc field (Filter options dạng range %, Option select type, Display Style, Sort Order, Hide on customer group đều khớp ảnh UI + sheet Add). **Có 1 xung đột đáng chú ý** ở Appearance Settings — xem mục 8.

## 1. Tổng quan

Sale Percentage là loại filter node lọc theo **% giảm giá** của product, tính từ công thức `(Default Price − Sale Price) / Default Price × 100`, đồng bộ qua Sync. Khác Featured Products/Special Offers (2 giá trị cố định boolean) — Sale Percentage có **danh sách range % do merchant tự cấu hình** (mặc định 4 range preset), gần giống cấu trúc "Price" (range numeric) hơn là "Condition"/"Featured Products" (giá trị cố định).

## 2. General Settings

Giống pattern chung:

| Field | Loại | Validation | Nguồn |
| --- | --- | --- | --- |
| Title | Text | Bắt buộc, rỗng → lỗi required; default = "Sale Percentage" | Ảnh UI + #6, 7, 8 |
| Title text color | Color | Áp dụng ngay lên Preview | Ảnh UI + #9 |
| Title alignment | Radio Left/Center/Right | Áp dụng ngay lên Preview | Ảnh UI + #9 |

**Bug đã biết** (#9, NG — giống hệt bug đã ghi nhận ở Category/Special Offers): title dài hơn 1 dòng, Preview luôn căn trái dù chọn Center/Right.

## 3. Filter Settings — Filter options (popup "Select filter options")

Field hiển thị "N options" + button [Edit] mở popup "Select filter options" (xác nhận qua ảnh UI):

| Field | Mô tả | Nguồn |
| --- | --- | --- |
| Mỗi row | 2 input number: `% [min]` — `% [max]`, icon thùng rác xoá row (row đầu tiên KHÔNG có icon xoá — không cho xoá hết), icon `+` thêm row mới | Ảnh UI + #10 |
| Default 4 rows | 0–10, 10–30, 30–50, 50–100 (%) | Ảnh UI + #11 |
| Button Cancel / Save | Đóng popup / lưu thay đổi | Ảnh UI |

**Label hiển thị storefront tự động format khác raw min-max**: xác nhận qua ảnh UI Preview — range đầu tiên (0–10) hiển thị **"10% and Less"**, range giữa hiển thị **"min% - max%"** (VD "10% - 30%"), range cuối (50–100) hiển thị **"More than 50%"**. Đây không phải copy nguyên min-max mà có logic format riêng theo vị trí đầu/giữa/cuối.

| Hành vi | Mô tả | Nguồn |
| --- | --- | --- |
| Edit min/max của range | Storefront cập nhật đúng | #12, OK |
| Thêm range mới (`+`) | Xuất hiện trên storefront; **bug**: giá trị default của max ở row mới bị sai (#13, NG); count chưa xử lý đúng | #13, NG |
| Xoá range (thùng rác) | Ẩn khỏi storefront, các range khác không đổi | #14, OK |
| Range open-ended (để trống max) | Storefront hiển thị "More than X%"; **bug**: hiển thị giá trị null + thừa record khi không điền max (#15, NG) | #15, NG |
| Validation min > max | Phải chặn save + báo lỗi — **đang NG, không validate** | #16, NG |
| Validation min = max | Phải chặn save + báo lỗi — **đang NG, không validate** | #17, NG |
| Validation % âm | Không cho nhập âm — **đang NG, không validate** | #18, NG |
| Validation % > 100 | Không cho nhập > 100 — **đang NG, không validate** | #19, NG |
| Save → persist sau reload | | #20, OK |

**Lưu ý**: sheet Add case #10, #11 cũng ghi nhận bug hiển thị "$" thay vì "%" ở phần preview filter Sale Percentage trên storefront — giữ lại rule đúng (phải hiển thị %) khi verify ở Edit.

## 4. Option select type

| Giá trị | Default | Nguồn |
| --- | --- | --- |
| Multiple | **Có** (mặc định) — khớp ảnh UI (dropdown hiện "Multiple") và sticky note | Ảnh UI + #21 (case gốc ghi nhầm "Default = Single Multiple", hiểu là Multiple theo ảnh UI + sticky note) |
| Single | — | #22 |

Switch Single ↔ Multiple hoạt động đúng, xác nhận OK (#22).

## 5. Filter Settings — Display Style

| Giá trị | Default | Nguồn |
| --- | --- | --- |
| **List** | **Có** (mặc định) — khớp ảnh UI | Ảnh UI + #24 |
| Grid | — | #24 |

`[CẦN XÁC NHẬN BA]` — sheet Add case #23 ghi "chỉ có 2 option List/Grid" nhưng đang NG vì "thừa option Swatch" (khác Special Offers đang NG vì thừa Toggle) — dropdown hiện tại có 3 option (List/Grid/Swatch) thay vì 2. Không có ảnh UI nào show trạng thái mở dropdown để xác nhận số lượng đúng, nhưng 2 khung Display style trong ảnh chỉ minh hoạ List và Grid (không có khung Swatch) — nghiêng về hướng chỉ nên có 2 giá trị, khớp sheet Add.

**Bug đã biết** (#24, NG — giống Special Offers case #21 tương tự): ở Display Style = Grid/Swatch, Preview luôn highlight sẵn giá trị đầu tiên dù merchant chưa chọn gì.

## 6. Filter Settings — Sort Order

Field hiển thị giá trị hiện tại + button [Edit] mở popup (khác Featured Products/Special Offers — có popup riêng, giống Brand/Review Ratings/Category):

| Giá trị | Default | Nguồn |
| --- | --- | --- |
| Lowest → Highest | **Có** (mặc định) — khớp ảnh UI | Ảnh UI + #25, 26 |
| Highest → Lowest | — | #25, 27 |
| Manual order (kéo thả) | — | Ảnh UI (sticky note) + #25, 28 |

**Bug đã biết** (#25, NG): case gốc tự ghi "Sai thứ tự, hiện tại đang là H-L, L-H, Manual order" và "Default hiện đang là manual, đúng hay sai?" — nghi vấn thứ tự hiển thị 3 option trong popup và default value đang sai so với thiết kế (thiết kế đúng = Lowest-Highest mặc định, theo ảnh UI). Case #26/#27 (chọn Lowest-Highest/Highest-Lowest → storefront đúng thứ tự) bản thân hành vi OK, nhưng note ghi thêm "Sort order không chính xác khi chọn 2 option này" ở popup — mâu thuẫn nội tại trong sheet gốc, giữ nguyên cả 2 ghi chú, đánh dấu cần verify kỹ khi Edit.

## 7. Hide on customer group

Giống pattern chung, nhưng **2 bug giống hệt Special Offers**:
- Chọn customer group → storefront **vẫn hiển thị filter** dù account thuộc group đó (#30, NG).
- BC xoá customer group → popup **không update số lượng** hiển thị ngoài MH Edit (#31, NG).

## 8. Appearance settings

Ảnh UI xác nhận panel Appearance Settings **chỉ có 3 field** (giống Review Ratings/Category, khác Featured Products/Special Offers):

| Field | Mô tả | Nguồn |
| --- | --- | --- |
| Display tooltip (toggle + content) | | Ảnh UI + #32, 33 |
| Collapse/Expand (Desktop) | Default Expand | Ảnh UI + #35 |
| Collapse/Expand (Mobile) | Default Expand | Ảnh UI + #35 |

`[CẦN XÁC NHẬN BA]` — **xung đột trực tiếp**: sheet Add có 3 case test Show all irrelevant values (#34), Display all values in uppercase (#36), Show search box Desktop/Mobile (#37) — cả 3 đều **OK** (thực thi được, không SKIP/note "không thấy field" như Review Ratings/Category), nhưng ảnh UI panel lại **không hiển thị** 3 field này. Không giống Review Ratings/Category (sheet tự nhận field không tồn tại), ở đây sheet khẳng định đã test được — nên đây là xung đột thật cần verify trực tiếp trên môi trường, không tự loại bỏ.

## 9. Storefront & Merchandising rules

**Bug nghiêm trọng, lặp lại xuyên suốt** (cùng root cause Category/Special Offers): storefront chọn filter Sale Percentage không thực sự lọc sản phẩm.

| Rule | Mô tả | Nguồn |
| --- | --- | --- |
| Product count đúng theo range | | #38, NG |
| Filter theo range → chỉ product trong range | | #39, NG |
| SRP + Category Page | | #40, NG |
| AND logic với filter khác | | #41, NG |
| Công thức Sale% | `(Default − Sale) / Default × 100` | #42, NG — kèm câu hỏi mở boundary (mục 10) |
| Sale Price đổi → product chuyển range sau sync | | #43, NG |
| Sale Price = 0 → product thoát khỏi mọi range sau sync | | #44, NG |
| Product mới với Sale Price → đúng range sau sync | | #45, NG |
| Product bị xoá → count giảm sau sync | | #46, NG |
| Variant có Sale Price riêng → product tính theo variant % | | #47, NG |
| Default Price đổi → Sale% đổi → chuyển range sau sync | | #48, NG |
| Merchandising — product Hidden | Không tính vào count, không hiện khi filter | #49, NG |

## 10. Edge case & câu hỏi mở (nhiều nhất trong các node đã làm)

| # | Case | Mô tả | Nguồn |
| --- | --- | --- | --- |
| 1 | Xoá tất cả range | Actual: **không cho xoá hết** (khác Category — báo lỗi khi save; khác Featured Products/Special Offers — cho uncheck hết rồi mới lỗi) | #50, OK — đã có actual rõ |
| 2 | Không có product nào có Sale Price | Tất cả range count = 0 — phụ thuộc field Show all irrelevant values (đang cần xác nhận tồn tại, mục 8) | #51, NG |
| 3 | Sale% đúng boundary (VD đúng 30%, giữa range 0-30% và 30-50%) | Case gốc tự đặt câu hỏi: inclusive ở range nào? Cần document baseline | #52, NG |
| 4 | Gap giữa các range (VD 0-20% và 40-60%, thiếu 20-40%) | Product rơi vào gap không thuộc range nào | #53, NG |
| 5 | Range overlap (VD 20-50% và 40-70%) | Case gốc tự đặt câu hỏi: hệ thống có cho phép overlap? Product tính vào cả 2 hay báo lỗi config? | #54, NG |
| 6 | Sale Price > Default Price (invalid, sale% âm) | Case gốc tự đặt câu hỏi: ẩn khỏi filter hay coi như Not on sale? | #55, NG |

## 11. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Display Style có đúng chỉ List/Grid (2 giá trị) hay có thêm Swatch/giá trị khác? | 5 |
| 2 | Sort Order popup: thứ tự hiển thị 3 option đúng là gì, và default có đúng là Lowest-Highest hay Manual order? | 6 |
| 3 | 3 field Show all irrelevant values/Uppercase/Search box có thực sự thuộc màn Edit filter node - Sale Percentage không? Sheet Add ghi nhận test OK nhưng ảnh UI không thấy field | 8 |
| 4 | Sale% đúng boundary (VD 30%) thuộc range nào — inclusive ở đầu hay cuối? | 10.3 |
| 5 | Range % có được phép overlap nhau không? | 10.5 |
| 6 | Sale Price > Default Price (sale% âm) → ẩn khỏi filter hay tính Not on sale? | 10.6 |

## 12. Lưu ý về thực thi (không phải spec, chỉ tham khảo)

Tỷ lệ NG rất cao — gần như toàn bộ validation input range (%min/max, âm, >100, min>max) đều chưa hoạt động (#16→19), cùng bug lọc storefront chung với Category/Special Offers (#38→49). Đây là node có nhiều câu hỏi mở nhất (6 câu, mục 10) do bản chất range % phức tạp hơn giá trị cố định (boundary, gap, overlap).

## 13. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Sale Percentage filter node (Add + Edit)
- **Tài liệu liên quan:** `filter-tree-common-specs.md`, `edit-filter-node-category-specs.md`/`edit-filter-node-special-offers-specs.md` (cùng root cause bug lọc storefront)
- **Nguồn:** Sheet test case `Add filter node - Sale Percentage` (55 case) + ảnh UI Export Figma thật (`Edit filter node _ Sale Percentage.png`)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 6
