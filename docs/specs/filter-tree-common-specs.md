# Filter Tree — Common Specs (khung màn hình, không phụ thuộc loại node)

## 0. Nguồn gốc tài liệu

Viết ngược từ 3 sheet test case: `Create filter node` (81 case, bản gọn), `Add Filter Tree` (1472 case, mã FTNS_xxx — phần khung dùng chung nằm ở FTNS_001→090, phần còn lại là test riêng từng loại node, KHÔNG đưa vào tài liệu này), `Edit Filter Tree` (984 case, mã FTNS_xxx tiếp nối — phần khung dùng chung nằm ở đoạn tiêu đề chính xác là **"MH [Edit filter tree] - phần dùng chung"**, FTNS_415→442). Nội dung riêng từng loại filter node (Price, Category, Stock, Color, Depth, Weight...) được gộp xử lý ở `filter-node-common-specs.md` + `filter-node-types-specs.md`, không lặp lại ở đây dù chúng cũng nằm chung sheet với phần khung này.

## 1. Tổng quan

Filter Tree là 1 "cây" gồm nhiều Filter Node, được merchant tạo/sửa qua 1 builder có preview trực tiếp (Desktop/Mobile), rồi áp dụng (apply) vào 1 hoặc nhiều page/category trên storefront.

**3 màn hình chính**: Filter Tree List (danh sách) → Create/Edit filter tree (builder khung, gồm General Setting + Filter Nodes panel + Preview) → Edit filter node (chỉnh riêng 1 node, xem 2 file kia).

## 2. Màn hình Filter Tree List

| Field | Mô tả | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- |
| Banner "What is a Filter Tree?" | Feature tour, có thể đóng/mở | Config nội bộ | FTNS_002, 003 |
| Nút [Create New] | Mở màn Create new filter tree | Config nội bộ | FTNS_004 |
| Bảng — cột Status | Toggle bật/tắt filter tree | Config nội bộ | FTNS_006, 007 |
| Bảng — cột Filter name | Tên tree | Config nội bộ | FTNS_008 |
| Bảng — cột Applied for | Danh sách page/category đã áp dụng; nếu >3 hiển thị dạng `+n` | Config nội bộ | FTNS_009 |
| Bảng — cột Action | Icon Edit → mở Edit filter tree; icon Delete → popup xác nhận | Config nội bộ | FTNS_010→015 |

**Rule quan trọng**: Status ON/OFF quyết định hiển thị đồng thời ở **storefront VÀ màn hình Merge Value** (không chỉ storefront) — FTNS_006, 007.

**Bảo vệ Default filter tree**: filter tree có tên "Default filter tree" thì icon Delete bị **disable** — không cho xoá (FTNS_011, hiện đang **NG**).

**Xoá filter tree** (đã confirm): popup "Delete filter tree? Deleted filter tree cannot be recovered. Do you still want to continue?" — xoá xong biến mất khỏi cả 3 nơi: Filter Tree List, storefront, Merge Value (FTNS_012→015).

## 3. Màn hình Create/Edit filter tree (khung builder)

### 3.1 General Setting

| Field | Loại | Validation | Nguồn |
| --- | --- | --- | --- |
| Filter name | Text | Bắt buộc (rỗng → `"Can't save changes \| Filter tree name can't be blank"`); tối đa 255 ký tự; không cho trùng tên | FTNS_020→023 (create), FTNS_419→423 (edit) |
| Applied in page/Category | Multi-select qua popup, mặc định "0 selected" | Bắt buộc (rỗng → `"Can't save changes \| Apply filter to a page/ category to create a filter tree"`) | FTNS_024→026 (create), FTNS_424, 425 (edit) |

Ở màn Edit, sửa Filter name hợp lệ cập nhật đúng cả trong form lẫn Preview ngay lập tức (FTNS_423).

### 3.2 Filter Nodes panel

| Field | Mô tả | Nguồn |
| --- | --- | --- |
| Nút [Edit] | **Disable khi chưa có node nào**, active khi đã có ≥1 node | FTNS_027 (create), FTNS_427, 428 (edit) |
| Nút [Add filter node] | Mở popup [Add filter node] (xem mục 4) | FTNS_028 (create), FTNS_429 (edit) |
| Panel trái — danh sách node (chỉ ở Edit) | Click 1 node → nội dung panel phải đổi sang đúng node đó | FTNS_416, 417 |
| Nút [Save to template] (chỉ ở Edit, trong màn Edit filter node) | Lưu cấu hình node hiện tại thành template, xuất hiện ở tab [My Templates] | FTNS_430 *(chưa có Tester/Result)* |
| Validation khi chưa có node nào | `"Can't save changes \| Add a filter node to create a filter tree"` | FTNS_029 |

### 3.3 Save Changes, Preview, điều hướng

| Field | Hành vi | Nguồn |
| --- | --- | --- |
| Nút [Save Changes] | Disable khi chưa có thay đổi hợp lệ; enable khi có ≥1 node + thay đổi hợp lệ; double-click **không** tạo request/node trùng | FTNS_030, 031 (create), FTNS_431→434, 442 (edit) |
| Preview area | Khung preview bên phải, có toggle Desktop/Mobile, đổi đúng theo tab đang chọn | FTNS_032→034 (create), FTNS_435→437 (edit) |
| Điều hướng khi có unsaved changes | Click [Back]/rời màn/chuyển node khác → popup cảnh báo; [Discard] bỏ thay đổi và điều hướng tiếp; [Cancel]/[Stay] ở lại với dữ liệu đang chỉnh | FTNS_035 (create, hiện **NG**), FTNS_439→441 (edit) |

## 4. Popup [Select page(s)/category]

| Field | Hành vi | Nguồn |
| --- | --- | --- |
| Thanh search | Search theo page hoặc category, cả khớp 1 phần lẫn toàn phần | FTNS_037→040 *(cả 4 case đang NG)* |
| Danh sách Page/Category | Hiển thị đúng phân cấp (hierarchy) category nhiều level, indent theo đúng cấu trúc BCM | FTNS_042 |
| Tooltip "Already used" | Page/Category đã được dùng ở filter tree KHÁC → bị **disable** + tooltip "Already used" (ngăn 1 page/category gán cho 2 filter tree cùng lúc) | FTNS_043 |
| Chọn item | Multi-select; chọn/bỏ chọn đổi đúng trạng thái | FTNS_044→046 *(multi-select đang NG)* |
| Chọn category cha (có category con) | `[CẦN XÁC NHẬN BA]` — case FTNS_047 không có Tester/Result, chưa rõ chọn category cha có tự động chọn/không chọn category con hay không | FTNS_047 |
| Nút [Save] | Disable khi chưa chọn gì; enable khi đã chọn ≥1; Save xong → redirect sang Edit filter node, áp đúng toàn bộ selection, storefront hiển thị đúng, cột "Applied for" ở Filter Tree List cập nhật đúng số lượng | FTNS_048→052 *(Save button disable-state đang NG)* |
| Nút [Cancel] / icon [X] | Đóng popup, không tạo node | FTNS_053, 054 |

## 5. Popup [Add filter node] — thư viện template

| Field | Mô tả | Nguồn |
| --- | --- | --- |
| Tab [My Templates] | Danh sách template merchant đã tự lưu (qua Save to template), hoặc empty state | FTNS_058, 059 |
| Menu nhóm filter bên trái | Đổi nhóm → danh sách card bên phải đổi theo | FTNS_061, 062 |
| Thanh Search | Search theo tên/mô tả template; trim khoảng trắng; xử lý ký tự đặc biệt không crash; không khớp → empty state | FTNS_063→067 *(cả 5 case đang NG)* |
| Template card | Mỗi card: thumbnail, title, mô tả ngắn, CTA "Add filter node" | FTNS_068 |

### 5.1 Danh sách template theo nhóm (7 nhóm, tổng ~21 loại)

| Nhóm | Loại filter node |
| --- | --- |
| Product filter | Color, Brand, Condition, Featured Products, Review Ratings |
| Category filter | Category |
| Pricing filter | Price, **[cc]** *(tên card không rõ — xem câu hỏi mở)*, Sale Percentage |
| Sizing filter | Size, Depth, Height, Weight, Width |
| Inventory & Shipping filter | Availability, Bin picking number, Shipping, Stock |
| Advanced filter | Product options, Custom fields, Tools |
| Custom Filter Builder | My own filter (tự build filter riêng) |

Click "Add Filter Node" ở mỗi card → redirect đúng sang màn Edit filter node của loại tương ứng (đã xác nhận qua từng case riêng, đa số OK — riêng card "Tools" đang **NG**, card "[cc]" không có Expected Result).

`[CẦN XÁC NHẬN BA]` — template card tên "[cc]" trong nhóm Pricing filter: đây là filter node loại gì? Case gốc không có mô tả, khả năng là lỗi đặt tên/viết tắt chưa hoàn chỉnh khi soạn test case.

## 6. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Chọn category cha ở popup Select page(s)/category có tự động chọn category con không? | 4 |
| 2 | Template card "[cc]" trong nhóm Pricing filter là loại filter node gì? | 5.1 |

## 7. Lưu ý về thực thi (không phải spec, chỉ tham khảo)

Case đang **Fail (NG)** đáng chú ý: FTNS_011 (Default filter tree vẫn xoá được — vi phạm rule bảo vệ), toàn bộ 4 case search ở popup Select page/category, toàn bộ 5 case search ở popup Add filter node, multi-select page/category, Save button disable-state, và cảnh báo unsaved changes ở màn Create (đã fix ở màn Edit).

## 8. Metadata

- **Feature:** Filter — Display Setup — Filter Tree (khung màn hình, không phụ thuộc loại node)
- **Tài liệu liên quan:** `filter-node-common-specs.md`, `filter-node-types-specs.md` (nội dung riêng từng loại node, cùng nằm trong 2 sheet `Add Filter Tree`/`Edit Filter Tree` nhưng tách file để tránh lẫn 2 tầng nội dung)
- **Nguồn:** `Create filter node` (81 case), `Add Filter Tree` (phần FTNS_001→090), `Edit Filter Tree` (phần FTNS_415→442)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 2
