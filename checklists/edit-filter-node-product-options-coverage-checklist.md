# Coverage checklist - filter-node-product-options

Đối chiếu `docs/specs/edit-filter-node-product-options-specs.md` với 3 file test case: `filter-node-product-options_testcase.csv`, `filter-node-product-options_matrix-save-changes.csv` (8 MTC), `filter-node-product-options_matrix-select-filter-options.csv` (2 MTC).

**Lưu ý (2026-08-21):** file bảng đã được bổ sung 16 case luồng Add + đổi ID prefix (`EFNPRODOPT_` → `FNPRODOPT_`) và renumber lại toàn bộ sau khi checklist này được viết — các ID TC cụ thể trích dẫn bên dưới (`EFNPRODOPT_TCxx`) đã lỗi thời, chỉ tên rule (AC-xx) và trạng thái Covered/Partial/Not covered vẫn còn giá trị tham khảo.

## Tổng quan

- Tổng số rule: 29
- Covered: 17
- Partial: 11
- Not covered: 1

## Chi tiết

- [x] AC-01 — Title required, rỗng → lỗi (suy theo pattern Brand/Category, chưa có bằng chứng riêng) — Covered — TC: EFNPRODOPT_TC03, TC04, matrix-save-changes MTC01/MTC02
- [x] AC-02 — Title text color, đổi màu cập nhật Preview — Covered — TC: EFNPRODOPT_TC06
- [x] AC-03 — Title alignment Left/Center/Right — Covered — TC: EFNPRODOPT_TC07; edge case tràn dòng: TC05
- [x] AC-04 — Filter options count display (0 selected → N selected) — Covered — TC: EFNPRODOPT_TC12 (popup Save cập nhật count), matrix-select-filter-options MTC07
- [x] AC-05 — Search bar theo Option name/Value — Covered — TC: EFNPRODOPT_TC23, TC24, TC25
- [x] AC-06 — Cột Option name sync trực tiếp từ BC Variant Options kèm product count — Covered — TC: EFNPRODOPT_TC08
- [x] AC-07 — Click 1 Option → Values load đúng — Covered — TC: EFNPRODOPT_TC09
- [x] AC-08 — Cột Values sync trực tiếp + product count tính toán từ Purchasable — Covered — TC: EFNPRODOPT_TC09, TC21, TC22
- [x] AC-09 — Multi-select value — Covered — TC: EFNPRODOPT_TC10
- [~] AC-10 — Nút Save disable khi chưa chọn value nào — Partial — TC: matrix-select-filter-options MTC08 (`<cần confirm>` trạng thái disable chỉ suy theo pattern Brand, chưa có ảnh/bằng chứng riêng xác nhận)
- [~] AC-11 — Nút Cancel/icon X đóng popup không lưu gì — Partial — TC: EFNPRODOPT_TC15 (`<cần confirm>` nghi bug giống Brand — Cancel/X vẫn tạo node)
- [x] AC-12 — Sau Save: hiển thị đúng N selected + Preview cập nhật — Covered — TC: matrix-select-filter-options MTC07
- [~] AC-13 — Option select type Single/Multiple, default chưa xác định — Partial — TC: EFNPRODOPT_TC26, TC27 (hành vi Single/Multiple có test nhưng default value và rule đổi Multiple→Single khi đã multi-selected sẵn đều `<cần confirm>`, xem TC28)
- [x] AC-14 — Display Style 4 giá trị (Dropdown/List+Radio/Grid+Rectangle/Swatch) — Covered — TC: EFNPRODOPT_TC29→32
- [~] AC-15 — Display Style = Swatch mở popup Manage Swatch — Partial — TC: EFNPRODOPT_TC32 (`<cần confirm>` chưa xác nhận cấu trúc, có dùng chung Brand không)
- [ ] AC-16 — Quan hệ "default theo BC" giữa Type của BC Option và Display Style filter node — Not covered đầy đủ, chỉ có 1 case cho chiều "đổi Type SAU KHI đã cấu hình Display Style" (Integration), CHƯA có case cho chiều ngược lại: Add node lần đầu, Display Style có tự set theo đúng Type hiện tại của BC Option hay không — TC: EFNPRODOPT_TC72 (`<cần confirm>`) — thiếu case Add-flow đầu tiên
- [x] AC-17 — Swatch → Setup dynamic option tự động disable — Covered — TC: EFNPRODOPT_TC33
- [x] AC-18 — Display Style khác Swatch → Setup dynamic option enable — Covered — TC: EFNPRODOPT_TC34
- [~] AC-19 — Ý nghĩa/hành vi cụ thể của toggle Setup dynamic option khi enable/disable — Partial — chỉ test được trạng thái enable/disable của TOGGLE (TC33, TC34), KHÔNG có case nào test tác động thực tế của việc bật/tắt vì bản thân ý nghĩa toggle chưa xác định (`<cần confirm>` ở spec mục 6) — cần bổ sung case behavioral sau khi BA trả lời
- [x] AC-20 — Sort order 5 lựa chọn, default Alphabetical Ascending — Covered — TC: EFNPRODOPT_TC35→39, TC40 (Sync — phản ánh count mới)
- [~] AC-21 — Add on customer group: bán liên quan tới ẩn/hiện filter theo group — Partial — TC: EFNPRODOPT_TC41, TC42, TC43 (`<cần confirm>` chưa xác nhận là "Hide" hay "chỉ hiện cho group", TC44/TC45 cover thêm nhánh sync nhưng cùng phụ thuộc câu trả lời này)
- [x] AC-22 — Display tooltip + content — Covered — TC: EFNPRODOPT_TC46, matrix-save-changes MTC01/MTC03/MTC04/MTC05/MTC06
- [x] AC-23 — Show all irrelevant values (product count = 0) — Covered — TC: EFNPRODOPT_TC47, TC48
- [~] AC-24 — Navigation type, default Infinite scroll — Partial — TC: EFNPRODOPT_TC49, TC50 (`<cần confirm>` chưa xác nhận có đủ lựa chọn "Show more" + field phụ "Number of filter options per click" giống Brand/Category)
- [x] AC-25 — Collapse/Expand on Desktop — Covered — TC: EFNPRODOPT_TC51, TC52; edge mất selection: TC53 (`<cần confirm>`)
- [x] AC-26 — Collapse/Expand on Mobile — Covered — TC: EFNPRODOPT_TC54, TC55
- [x] AC-27 — Display all values in uppercase form — Covered — TC: EFNPRODOPT_TC56
- [x] AC-28 — Show search box on desktop — Covered — TC: EFNPRODOPT_TC57, TC58
- [x] AC-29 — Show search box on mobile — Covered — TC: EFNPRODOPT_TC59, TC60

## Gap phát hiện thêm khi audit (ngoài 29 rule từ spec hiện tại)

`[CẦN XÁC NHẬN BA]` — Bản phân tích Figma gốc ở đầu phiên (trước khi viết spec chính thức) liệt kê Filter Settings gồm cả **"Filter Option Type"** VÀ **"Option Select Type"** như 2 field tách biệt, nhưng bản spec chính thức (`edit-filter-node-product-options-specs.md`) và toàn bộ test case hiện tại chỉ có "Option select type" (Single/Multiple) — chưa rõ "Filter Option Type" là:
- (a) chỉ là cách gọi khác của field hiển thị "N selected" (đã cover ở AC-04), hoặc
- (b) 1 field riêng biệt đã bị bỏ sót hoàn toàn khi viết spec/test case.

Đề xuất: đối chiếu lại ảnh Figma gốc (khung "Create new filter - Product options", trạng thái 0 selected) hoặc hỏi lại người dùng để xác nhận trước khi coi đây là "Not covered" chính thức hay loại bỏ khỏi danh sách.

## Ghi chú về case Integration (impact)

29 rule trên là rule của MÀN HÌNH Add/Edit (spec đang audit). Riêng nhóm case Integration (EFNPRODOPT_TC61→86, sinh từ `create-impact-testcase` ở phiên làm việc trước) dựa trên trigger từ phía BigCommerce (thêm/sửa/xoá Option, Value, đổi Purchasable, xoá product) — đã đối chiếu đủ nhánh trạng thái nguồn/hướng biến thiên/phạm vi tác động theo đúng Bước 2.4 của `create-impact-testcase` tại thời điểm sinh case, không phát hiện thiếu nhánh nào khi rà lại lần này.
