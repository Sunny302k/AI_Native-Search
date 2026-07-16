# Instant Search Widget (ISW) — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Instant Search Widget` (Google Sheet `TC_Native Search`, 82 case ISW-001 → ISW-082, kèm 1 khối ghi chú dạng 5W1H do QA tự tổng hợp làm tài liệu tham khảo nội bộ — không phải case, nhưng được dùng làm nguồn cho mục 1). Đối chiếu thêm với `docs/sync-fields-glossary.md` khi phân loại Nguồn dữ liệu.

## 1. Tổng quan

**Mục đích**: cấu hình luồng search widget hiển thị trên storefront (dropdown gợi ý khi shopper gõ vào ô search) — không phải trang kết quả riêng (đó là Search Result Page, xem `search-result-page-specs.md`).

**Kích hoạt**: mỗi lần query thay đổi khi shopper đang focus/gõ vào ô search, widget cập nhật lại theo thời gian thực (không cần Enter).

**4 khối nội dung**: Suggestion, Category, Blog, Product — mỗi khối bật/tắt và cấu hình độc lập.

**Trạng thái "Without results"** (khi query không trả về sản phẩm): hiển thị Trending Products, Recently Viewed Products, Suggestion list/Popular Searches — chi tiết mục 5.

**Actor**: Shopper (nhập search, chọn suggestion/category/blog/product hoặc "View all products"); Merchant/Admin (cấu hình layout, số lượng hiển thị, Trending/Popular Searches, bật/tắt Recently Viewed — phụ thuộc app Native Recommender có cài hay không); Hệ thống (Native Search + BigCommerce cho data, Native Recommender cho Recently Viewed).

## 2. Cấu hình Layout

| Field | Loại | Giá trị | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- | --- |
| Layout | Chọn 1 trong 3 | Two Column / Overlay fullwidth / One column | Config nội bộ | ISW-001→018 |
| Product Layout (View) | Dropdown | List / Grid | Config nội bộ | ISW-001, 006 |
| Product Position | Dropdown (chỉ Two Column) | On the right column / On the left column | Config nội bộ | ISW-002 |
| Number of products per row | Dropdown, **phụ thuộc Layout × View** | Số lượng cụ thể theo từng tổ hợp — `[CẦN XÁC NHẬN BA]`, xem bảng bên dưới | Config nội bộ | ISW-003→013 |

**Ma trận Layout × View → giới hạn per-row** (case gốc dùng "vd" — ví dụ minh hoạ, chưa phải số chốt):

| Layout | View | Per-row khả dĩ |
| --- | --- | --- |
| Two Column | List | Không giới hạn kiểu "không hỗ trợ" (ISW-004) — số cụ thể `[CẦN XÁC NHẬN BA]` |
| Two Column | Grid | Giới hạn tối đa (ISW-005 ghi "vd: max 2") — `[CẦN XÁC NHẬN BA]` số chính xác |
| Overlay fullwidth | List | Có khoá option theo design (ISW-009 ghi "vd có thể 2/3") — `[CẦN XÁC NHẬN BA]` |
| Overlay fullwidth | Grid | Giới hạn tối đa (ISW-010 ghi "vd max 3") — `[CẦN XÁC NHẬN BA]` |
| One column | List / Grid | Theo design, chưa có số cụ thể trong case (ISW-012, 013) — `[CẦN XÁC NHẬN BA]` |

`[CẦN XÁC NHẬN BA]` — chuyển tab khi chưa Save: giá trị Layout/View/per-row đang chỉnh có giữ nguyên khi quay lại tab hay bị reset? *(ISW-014 ghi "theo design: giữ tạm/hoặc reset" — bản thân case cũng chưa chắc)*

## 3. Product List — General & Product Detail

| Field | Loại | Mô tả | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- | --- |
| Nút [Edit] | Button | Mở màn Product List để cấu hình chi tiết | Config nội bộ | ISW-015 |
| Highest number of displayed results | Dropdown | Giới hạn số sản phẩm hiển thị | Config nội bộ | ISW-016, 017, 018 |
| Section label | Text | Nhãn hiển thị phía trên khối Product | Config nội bộ | ISW-019 |
| Label text color | Color picker | Màu chữ label | Config nội bộ | ISW-020 |
| Section background color | Color picker | Màu nền khối | Config nội bộ | ISW-021 |
| Product title text color | Color picker | Màu tên sản phẩm | Config nội bộ | ISW-022 |
| Show product image | Toggle | Ẩn/hiện ảnh sản phẩm | Config nội bộ | ISW-023 |
| Image border radius | Number/slider | Bo góc ảnh | Config nội bộ | ISW-024 |
| Show product description | Toggle | Ẩn/hiện mô tả | Config nội bộ | ISW-025 |
| Button text color | Color picker | Màu chữ nút | Config nội bộ | ISW-034 |
| Button background color | Color picker | Màu nền nút | Config nội bộ | ISW-035 |

Mọi field trên đều áp dụng đồng thời cho Preview (Desktop + Mobile trong Admin) và Storefront thực tế — case luôn kiểm cả 2 nơi khớp nhau.

## 4. Product List — Hiển thị giá

| Field | Loại | Mô tả | Nguồn |
| --- | --- | --- | --- |
| Show product price | Toggle | Ẩn/hiện giá | ISW-026 |
| Price Format | Dropdown, chỉ hiện khi Show product price = ON | 7 giá trị: First variant price / Lowest price / Lowest available price / From [Lowest price] / From [Lowest available price] / [Lowest price]–[Highest price] / [Lowest available price]–[Highest available price] | ISW-028, ISW-031→037 |
| Show compared price | Toggle, **điều kiện hiển thị field phụ thuộc Price Format** | Chỉ hiện khi Price Format KHÔNG ở dạng range (2 option cuối); ẩn khi ở dạng range | ISW-029 |
| Show currency codes | Toggle | OFF (mặc định) → hiện symbol ($); ON → hiện mã tiền tệ (VND, USD, JPY...) | ISW-031 (dòng thứ 2, trùng số ID với dòng trên trong sheet gốc) |
| Show cents as superscript | Toggle | Định dạng hiển thị phần thập phân | ISW-032 |

**Rule dependency quan trọng** *(ISW-027, ISW-029)*: Show product price OFF → ẩn luôn field Price Format (không chỉ disable). Show compared price chỉ xuất hiện khi Price Format ở 1 trong 5 dạng "giá đơn" (không phải range).

`[CẦN XÁC NHẬN BA]` — sheet gốc có 2 case cùng ID `ISW-031` và cùng ID `ISW-032`, `ISW-033`/`ISW-034`/`ISW-035` cũng trùng số với case ở mục Suggestion phía sau — nghi ngờ lỗi đánh số khi copy-paste giữa các block, không ảnh hưởng nội dung nhưng cần lưu ý khi trace ngược từ ID.

## 5. Trạng thái "Without results" & Add Product thủ công

| Field/Khối | Mô tả | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- |
| Without result status (default) | Hiển thị đúng theo design khi query rỗng kết quả | Config nội bộ (khung hiển thị) | ISW-036 |
| Add product manually — search | Search theo tên/SKU trong catalog, trả kết quả đúng field | Sync trực tiếp (dữ liệu Products) | ISW-037 *(hiện đang NG)* |
| Add product manually — list | Không hiển thị product đã bị disable bên BC | Sync trực tiếp | ISW-038 *(hiện đang NG)* |
| Add product manually — sync phản ánh | Add/update/xoá product ở BC, sync xong → list trong popup cập nhật đúng (kể cả ẩn product đã xoá) | Sync trực tiếp | ISW-040 (2 case cùng ID) |
| Copy from Search Results Page - Trending products | Nút copy nhanh list Trending từ SRP sang ISW | Config nội bộ (thao tác), nhưng nội dung copy = Sync trực tiếp | ISW-038 (dòng "Copy from...") |
| Remove product khỏi selected list | Xoá 1 item khỏi list đã chọn thủ công, save phản ánh đúng | Config nội bộ | ISW-041 |
| Display popular products | Toggle bật/tắt khối | Tính toán từ dữ liệu sync | ISW-042 |
| Display popular products — Label | Text + color | Config nội bộ | ISW-043, 044 |
| Display popular products — Data source | "Display best selling products based on your store data" (auto) | Tính toán từ dữ liệu sync | ISW-045 *(case chưa có Expected Result — `[CẦN XÁC NHẬN BA]` còn thiếu tuỳ chọn Manual tương tự Suggestion không?)* |

### Công thức Trending Products (từ khối ghi chú 5W1H)

- **Auto**: crawl & phân tích order theo tháng; `trending_point = order_norm × 0.7 + revenue_norm × 0.3`; lấy top 30 làm nguồn ứng viên.
- **Manual**: merchant tự chọn tay, hoặc bấm copy list từ SRP without-results (nút bị disable nếu bên SRP chưa cấu hình data source).
- Số lượng hiển thị = **Highest number of displayed results**, trừ đi số lượng Recently Viewed nếu khối đó đang ON (`Trending = Highest − RecentlyViewed`).
- Chỉ hiển thị sản phẩm **còn hàng (in stock)**, sắp theo trending_point giảm dần.

### Recently Viewed Products

- Phụ thuộc app **Native Recommender** (ngoài phạm vi repo này): chưa cài → toggle off + CTA hướng dẫn cài; đã cài → Native Search nhận script từ Recommender để hiển thị.
- Số lượng tối đa hiển thị = `Highest number of displayed results ÷ 2`, làm tròn xuống.

### Popular Searches (trong khối Suggestion/Without-results)

- **Auto**: top 10 keyword từ analytics, cập nhật lại mỗi 7 ngày.
- **Manual**: merchant nhập tay, giữ nguyên tới khi có cập nhật mới.
- Số lượng hiển thị = Highest number of displayed results.

## 6. Suggestion

| Field | Loại | Mô tả | Nguồn dữ liệu | Nguồn |
| --- | --- | --- | --- | --- |
| Section label | Text | Nhãn khối Suggestion | Config nội bộ | ISW-046 |
| Label text color | Color | | Config nội bộ | ISW-047 |
| Matched text color | Color | Màu highlight phần keyword khớp trong gợi ý | Config nội bộ | ISW-048 |
| Highest number of displayed results | Dropdown | Số suggestion tối đa hiển thị | Config nội bộ | ISW-049 *(hiện đang NG)* |
| Hide/Unhide (icon) | Toggle-icon trên từng suggestion | Ẩn/hiện 1 suggestion cụ thể khỏi kết quả | Config nội bộ | ISW-050 *(NG)*, ISW-051 |
| Data source | Radio | **Store data** (auto, qua engine Autocomplete) / **Add manually** (nhập tay từng term) | Store data = Tính toán từ dữ liệu sync; Add manually = Config nội bộ | ISW-052, 053 |
| Add term (khi Data source = Add manually) | Text + button Add | Thêm 1 term vào list | Config nội bộ | ISW-053 |
| Remove 1 term | Icon trash trên từng term | Xoá 1 term | Config nội bộ | ISW-054 |
| Remove all | Button | Xoá toàn bộ list, Save bị disable theo design nếu list rỗng | Config nội bộ | ISW-055 *(hiện đang NG)* |
| Copy from... | Dropdown nguồn copy | Copy list suggestion từ nguồn khác (VD SRP suggestion, Search box onclick suggestion) | Config nội bộ (thao tác) | ISW-057, 058 *(2 case SKIP — chưa test)* |
| Also display when customers first click on search box | Toggle | ON: hiện suggestion ngay khi user click vào ô search (chưa gõ gì); OFF: chỉ hiện khi có input | Config nội bộ | ISW-059 |

`[CẦN XÁC NHẬN BA]` — nhập term quá dài (ISW-056) hiện đang **NG**, chưa rõ giới hạn ký tự đúng là bao nhiêu.

## 7. Category

| Field | Mô tả | Nguồn |
| --- | --- | --- |
| Toggle bật/tắt khối Category | Ẩn/hiện toàn bộ khối trong widget | ISW-064 |
| Section label | Text | ISW-065 |
| Background color | Color | ISW-066 |
| Matched text color | Color, hiện đang **NG** | ISW-067 |
| Highest number of displayed results | Giới hạn số category hiển thị, hiện đang **NG** | ISW-070 |

**Match priority** *(từ khối 5W1H)*: (1) category name chứa keyword — ưu tiên cao nhất; (2) category có product chứa keyword — ưu tiên thấp hơn. Case ISW-068 (category match tên hiển thị đầu tiên) hiện đang **NG**.

## 8. Blog

| Field | Mô tả | Nguồn |
| --- | --- | --- |
| Toggle bật/tắt khối Blog | Ẩn/hiện toàn bộ khối | ISW-071 |
| Section label | Text | ISW-072 |
| Background color | Color | ISW-073 |
| Matched text color | Color | ISW-074 |
| Highest number of displayed results | Giới hạn số blog hiển thị, hiện đang **NG** | ISW-077 |

**Match priority** *(từ khối 5W1H)*: (1) blog title chứa keyword; (2) blog content chứa keyword. Case ISW-075 (blog match tên hiển thị đầu), ISW-076 (search theo product xuất hiện trong nội dung blog) đều đang OK.

## 9. Filter tree trong ISW

Case ISW-078 chỉ có tiêu đề "Filter tree", không có Preconditions/Steps/Expected Result. `[CẦN XÁC NHẬN BA]` — ISW có tích hợp hiển thị filter tree không, hay đây là case dự kiến chưa viết? Không suy đoán thêm.

## 10. Tích hợp với Sync

| Case | Kịch bản | Expected | Nguồn |
| --- | --- | --- | --- |
| Add product | Tạo product ở BC + sync | ISW có hiển thị product mới | ISW-079 |
| Update product | Update product ở BC + sync | ISW cập nhật theo | ISW-080 |
| Delete product | Xoá product ở BC + sync | ISW không còn hiển thị | ISW-081 |
| Blog update | Update blog ở BC + sync | ISW cập nhật theo | ISW-082 |

Cả 4 case đều chưa có Tester/Result trong sheet gốc — chưa được thực thi thật.

## 11. Lưu ý về thực thi (không phải spec, chỉ tham khảo)

Các case đang **Fail (NG)** tại thời điểm viết spec: ISW-018 (Highest number — đã fix, có 2 lượt test NG→OK), ISW-020, ISW-021 (label/background color), ISW-037, ISW-038 (Add product manually — search/list), ISW-049, ISW-050 (Suggestion Highest/Hide), ISW-055, ISW-056 (Suggestion Remove all/term dài), ISW-067, ISW-068, ISW-070 (Category color/match/highest), ISW-077 (Blog highest). Không dùng các dòng này làm căn cứ Expected Result mới — rule đúng vẫn theo mô tả ở mục 2–9.

## 12. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi | Mục |
| --- | --- | --- |
| 1 | Số lượng per-row chính xác cho từng tổ hợp Layout × View là bao nhiêu? (case gốc chỉ ghi ví dụ minh hoạ) | 2 |
| 2 | Khi chuyển tab mà chưa Save, giá trị Layout/View/per-row đang chỉnh giữ nguyên hay bị reset? | 2 |
| 3 | Display popular products (Product List) có tuỳ chọn Manual tương tự khối Suggestion không, hay chỉ có Auto? | 5 |
| 4 | Giới hạn ký tự tối đa khi nhập 1 suggestion term thủ công là bao nhiêu? | 6 |
| 5 | ISW có tích hợp/hiển thị filter tree không (case ISW-078 chưa có nội dung)? | 9 |

## 13. Metadata

- **Feature:** Search — Instant Search Widget
- **Nguồn:** Sheet test case `Instant Search Widget` (82 case + khối ghi chú 5W1H)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 5
- **Coverage thực thi tại thời điểm viết spec:** 13 case đang Fail (xem mục 11); 6 case (integration sync + copy from) chưa test
