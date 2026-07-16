# Edit filter node - Brand — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Add filter node - Brand` (145 case, Google Sheet `TC_Native Search`), đối chiếu với pattern khung Edit chung đã tổng hợp ở `filter-tree-common-specs.md` (mục 3) và với `edit-filter-node-condition` (feature anh em cùng pattern filter node, đã làm trước). Không có quyền Figma Edit cho riêng màn này.

**Lưu ý dữ liệu nguồn**: 4 case cuối sheet (case #139-142, nói về "Is Featured/Not Featured" và "Storefront Details - Set featured product") có nội dung không khớp chủ đề Brand — nghi ngờ copy nhầm từ sheet Featured Products. Không dùng làm căn cứ cho spec này.

## 1. Tổng quan

Brand là 1 loại filter node lấy **giá trị động (dynamic)** từ BigCommerce — khác Condition (3 giá trị cố định New/Used/Refurbished). Option name và Values của Brand được đồng bộ trực tiếp từ BC, chọn qua popup [Select filter options] khi Add, có thể Add/remove lại ngay trên màn Edit.

## 2. General Settings

| Field            | Loại                   | Validation                                   | Nguồn dữ liệu | Nguồn  |
| ---------------- | ----------------------- | -------------------------------------------- | ---------------- | ------- |
| Title            | Text                    | Bắt buộc, rỗng → lỗi; default = "Brand" | Config nội bộ  | #36→38 |
| Title text color | Color                   | —                                           | Config nội bộ  | #39     |
| Title alignment  | Radio Left/Center/Right | —                                           | Config nội bộ  | #40     |

## 3. Filter Options — popup [Select filter options]

| Field                         | Mô tả                                                                                                                                         | Nguồn dữ liệu                                                     | Nguồn      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------- |
| Thanh search                  | Search theo Option name HOẶC Value; trim khoảng trắng; empty state khi không khớp                                                          | Config nội bộ (thao tác), dữ liệu tìm kiếm = Sync trực tiếp | #6→10      |
| Cột [Option name]            | Danh sách Brand option name,**đồng bộ trực tiếp từ BigCommerce**                                                                   | Sync trực tiếp                                                     | #11, 12     |
| Cột [Option name] — chọn 1 | Click 1 option → cột Values load đúng values của option đó                                                                               | Config nội bộ                                                      | #14, 15     |
| Cột [Values]                 | Danh sách value thuộc option đang chọn, kèm**product count** mỗi value                                                              | Sync trực tiếp                                                     | #17, 18, 23 |
| Chọn value                   | Multi-select (tick nhiều value cùng lúc)                                                                                                     | Config nội bộ                                                      | #24→27     |
| Button [Save]                 | Disable khi chưa chọn gì; enable khi đã chọn ≥1; Save → đóng popup, redirect Edit filter node, giá trị đã chọn hiển thị đúng | Config nội bộ                                                      | #28→30     |
| Button [Cancel] / icon [X]    | Đóng popup, không tạo node —**cả 2 đang NG**                                                                                       | Config nội bộ                                                      | #31, 32     |

**Trên MH Edit** (không qua Add flow, thao tác lại sau khi node đã tồn tại):

| Field                                    | Mô tả                                                          | Nguồn |
| ---------------------------------------- | ---------------------------------------------------------------- | ------ |
| Filter Options — hiển thị count       | Hiển thị đúng số lượng value đã chọn (VD "5 selected") | #41    |
| Nút [Edit]                              | Mở lại popup [Select filter options] để chỉnh sửa          | #42    |
| Add option mới vào selection hiện có | A → A+B                                                         | #44    |
| Bỏ option đã chọn                    | A,B → B                                                         | #45    |
| Đổi toàn bộ selection                | Untick hết, chọn lại C,D                                      | #46    |

**Rule dependency quan trọng** (Sync trực tiếp, xác nhận qua nhiều case): BC thêm/xoá/sửa tên value Brand → sync → popup [Select filter options] VÀ Preview đều cập nhật đúng (#19, 20, 21). Product count mỗi value cũng cập nhật khi product đổi assign Brand value trên BC (#22 — case gốc không có Expected Result rõ, suy luận theo pattern các case liền kề).

## 4. Option select type

| Field              | Giá trị         | Default                                                | Nguồn  |
| ------------------ | ----------------- | ------------------------------------------------------ | ------- |
| Option select type | Single / Multiple | **Multiple** (khác Condition — default Single) | #47→50 |

**Rule đặc thù** (#53, 54): khi đổi từ Multiple → Single mà node đang có nhiều value được chọn sẵn (multi-selected từ trước) → hệ thống phải xử lý nhất quán, không được để 2 value cùng ở trạng thái "selected" trong chế độ Single. Đổi Single/Multiple **không được** làm mất/đổi sai danh sách option đã cấu hình (case #54 hiện đang **NG**).

## 5. Display Style

| Giá trị | Default | Mô tả                                                                                    | Nguồn      |
| --------- | ------- | ------------------------------------------------------------------------------------------ | ----------- |
| List      | Có     | Hiển thị dạng danh sách; layout không vỡ với 20+ option                             | #56, 58, 59 |
| Grid      | —      | Hiển thị dạng lưới; case UI nhiều option đang**NG** (lệch cột/overlap text) | #60, 61     |
| Swatch    | —      | Hiển thị dạng swatch màu/ảnh, mở thêm màn [Manage Swatch] (mục 5.1)               | #62→82     |

### 5.1 Màn [Manage Swatch] (chỉ khi Display Style = Swatch)

| Field                                           | Mô tả                                                                                            | Nguồn dữ liệu                                                                    | Nguồn      |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------- |
| Bảng: Image / Swatch Name / Image Source / URL | 1 dòng / value Brand đã chọn                                                                   | Swatch Name = Sync trực tiếp (lấy từ value đã chọn); Image tuỳ Image Source | #66, 70     |
| Image Source                                    | Dropdown:**Online URL** / **Big Commerce**                                             | Config nội bộ (lựa chọn); dữ liệu ảnh theo sau tuỳ chọn                    | #71         |
| Image Source = Online URL                       | Cho nhập URL tay; rỗng → lỗi required; URL sai → hiển thị ảnh lỗi chung hệ thống        | Config nội bộ                                                                     | #72, 74→76 |
| Image Source = Big Commerce                     | **Tự động lấy ảnh Brand tương ứng từ BC, tự cập nhật khi ảnh đổi bên BC**    | **Sync trực tiếp**                                                          | #73, 77     |
| Button [Save] / [Cancel]                        | Save → Preview hiển thị dữ liệu vừa setup; Cancel → không lưu, Preview giữ dữ liệu cũ | Config nội bộ                                                                     | #78, 79     |
| Swatch border radius                            | Slider kéo thả                                                                                   | Config nội bộ                                                                     | #80         |
| Toggle [Display filter option name in swatch]   | ON hiện kèm tên brand cạnh swatch; OFF ẩn                                                     | Config nội bộ                                                                     | #81, 82     |

**Lưu ý coverage**: 9 case con của Manage Swatch (#67-77, phần Image/Image Source/URL) đang ở trạng thái **SKIP** trong sheet gốc — chưa từng được thực thi thật.

## 6. Toggle [Setup dynamic option]

| Trạng thái Display Style | Toggle  | Nguồn |
| -------------------------- | ------- | ------ |
| List / Grid                | Enable  | #98    |
| Swatch                     | Disable | #97    |

`[CẦN XÁC NHẬN BA]` — cả 2 case gốc (#97, #98) đều tự đặt câu hỏi ngay trong Expected Result ("Khi toggle disable thì dữ liệu hiển thị như thế nào?") mà không trả lời — chưa rõ mục đích của toggle này là gì và hành vi cụ thể khi enable/disable.

## 7. Sort order

| Option                      | Mô tả                       | Default                     | Nguồn                         |
| --------------------------- | ----------------------------- | --------------------------- | ------------------------------ |
| Alphabetical - Ascending    | Sắp theo alphabet tăng dần | **Có** (mặc định) | #84, 85                        |
| Alphabetical - Descending   | Giảm dần                    | —                          | #86                            |
| Product number - Ascending  | Theo product count tăng dần | —                          | Tính toán từ dữ liệu sync |
| Product number - Descending | Theo product count giảm dần | —                          | Tính toán từ dữ liệu sync |
| Custom order                | Kéo thả tự do              | —                          | Config nội bộ                |

Popup [Sort Order] hiển thị danh sách 5 lựa chọn trên — case gốc xác nhận hiển thị đủ 5 option đang **NG** (#84).

## 8. Hide on customer group

Giống hệt pattern đã xác nhận ở `edit-filter-node-condition` — popup [Select customer group], search 1 phần/toàn phần, danh sách sync từ BC, chọn 1 group → ẩn filter với group đó trên storefront, BC xoá customer → không còn hiển thị trong popup.

| Field                                      | Nguồn  | Ghi chú thực thi      |
| ------------------------------------------ | ------- | ----------------------- |
| Popup search partial/full                  | #91, 92 | OK                      |
| List đồng bộ từ BC                     | #93     | OK                      |
| Chọn group → ẩn filter đúng (Admin)   | #94     | **NG**            |
| Ẩn filter đúng ngoài storefront        | #95     | **NG**            |
| BC xoá customer → biến mất khỏi popup | #96     | Chưa có Tester/Result |

## 9. Appearance settings

Cùng field set đã xác nhận ở Condition: Display tooltips (+ content, giới hạn 255 ký tự), Show all irrelevant values (product count = 0), Pagination type (Pagination/Show more/Infinite scroll), Collapse/Expand Desktop + Mobile độc lập, Display uppercase, Show search box Desktop/Mobile. Không lặp lại mô tả — chỉ nêu điểm khác/đáng chú ý riêng của Brand:

- **Collapse/Expand đang có bug** (#113, đang NG): collapse rồi expand lại filter → option đã chọn trước đó **bị mất trạng thái selected**. Đây là rule quan trọng cần giữ đúng ở Edit: chọn option → collapse → expand phải giữ nguyên selection.

## 10. Lưu ý về thực thi (không phải spec, chỉ tham khảo)

Case đang **Fail (NG)** đáng chú ý: #31, 32 (Cancel/X ở popup Select filter options vẫn tạo node — sai rule), #54 (đổi Single/Multiple làm mất option), #61 (Grid layout vỡ với nhiều option), #63 (Swatch hiển thị sai visual), #66 (bảng Manage Swatch thiếu cột), #84 (Sort Order thiếu option), #94, 95 (Hide on customer group không ẩn đúng — cả Admin lẫn storefront), #113 (Collapse/Expand làm mất selection). 9 case con Manage Swatch (#67-77) ở trạng thái SKIP, chưa từng thực thi.

## 11. Danh sách câu hỏi cần xác nhận với BA

| # | Câu hỏi                                                                                                                                                                                                                   | Mục |
| - | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 1 | Toggle [Setup dynamic option] dùng để làm gì, và khi disable (ở Swatch) thì dữ liệu hiển thị ra sao?                                                                                                            | 6    |
| 2 | Product count mỗi value trong popup Select filter options có cập nhật ngay khi product đổi assign Brand trên BC + sync không, hay chỉ cập nhật khi mở lại popup? (case#22 gốc không có Expected Result rõ) | 3    |

## 12. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Brand filter node (Add + Edit)
- **Tài liệu liên quan:** `filter-tree-common-specs.md` (khung Edit chung), `edit-filter-node-condition` (feature anh em cùng pattern, xem `docs/sync-fields-glossary.md` cách phân loại Nguồn dữ liệu)
- **Nguồn:** Sheet test case `Add filter node - Brand` (145 case, trừ 4 case cuối nghi copy nhầm)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 2
- **Coverage thực thi tại thời điểm viết spec:** nhiều case NG ở Filter Options/Swatch/Sort Order/Hide on customer group/Collapse-Expand; toàn bộ nhánh Manage Swatch (Image/URL) chưa thực thi (SKIP)
