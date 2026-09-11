# Edit filter node - Brand — Specs

## 0. Nguồn gốc tài liệu

Viết ngược từ sheet test case `Add filter node - Brand` (145 case, Google Sheet `TC_Native Search`), đối chiếu với pattern khung Edit chung đã tổng hợp ở `filter-tree-common-specs.md` (mục 3) và với `edit-filter-node-condition` (feature anh em cùng pattern filter node, đã làm trước). Không có quyền Figma Edit cho toàn màn Edit filter node - Brand.

**Cập nhật (2026-07-20)**: người dùng gửi trực tiếp ảnh chụp màn hình popup **[Manage Swatch]** thật (bảng Swatch Name/Image Source/URL với dữ liệu Brand thật: Anker, Apple, Bosch, HP, Huawei, Samsung, Xiaomi, LG) — bổ sung xác nhận hành vi field URL khi Image Source = Big Commerce, xem mục 5.1.

**Cập nhật (2026-08-13) — sửa lại nhận định về ranh giới dữ liệu nguồn, phát hiện khi người dùng báo lỗi thực thi case #171 từ sheet**: nhận định gốc "145 case, trừ 4 case cuối" ở trên là **sai/thiếu** — do trước đó chưa fetch hết toàn bộ sheet nên tưởng nhầm sheet kết thúc quanh case #145. Đối chiếu lại toàn bộ sheet (195 row) cho kết quả chính xác hơn:

- **Case #1-138**: nội dung Brand thật, hợp lệ — đây là phần đã dùng làm căn cứ chính cho spec này.
- **Case #139-141** (không phải 139-142): vẫn gắn nhãn "Edit filter node - Brand" nhưng Expected Result lại mô tả "Storefront Details - Set featured product" — đúng là nghi copy nhầm từ sheet Featured Products như nhận định gốc, **không dùng làm căn cứ**.
- **Case #142-195** (54 case, phát hiện mới): đây **không phải case Brand bị lỗi** mà là toàn bộ 1 sheet **"Edit filter node - Condition"** hoàn chỉnh, mạch lạc, bị nối tiếp vào cùng tab ngay sau phần Brand — hoàn toàn không liên quan tới Brand, không phải "case cuối bị lỗi" như nhận định gốc.

Đã rà soát lại toàn bộ `test-cases/filter/filter-tree/edit-filter-node-brand/edit-filter-node-brand_testcase.csv` (85 case) — xác nhận **không có case nào bị lẫn nội dung Condition** (mọi chỗ nhắc "Condition" đều là so sánh chủ động, đúng ngữ cảnh, đối chiếu 2 node dùng chung pattern). Việc sửa lần này chỉ đính chính lại metadata mô tả nguồn (mục 12), không có thay đổi nội dung nghiệp vụ nào trong spec hay trong file test case.

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

**Lưu ý coverage**: 9 case con của Manage Swatch (#67-77, phần Image/Image Source/URL) đang ở trạng thái **SKIP** trong sheet gốc — chưa từng được thực thi thật bằng case, nhưng đã có ảnh chụp UI thật đối chiếu (xem mục 5.1.1 ngay dưới) cho riêng field URL.

### 5.1.1 Trường URL khi Image Source = Big Commerce — xác nhận qua ảnh UI thật (2026-07-20)

Trước đây case #77 (SKIP) để ngỏ câu hỏi: khi Image Source = Big Commerce nhưng brand nguồn chưa có ảnh trên BC, Swatch hiển thị gì? Ảnh popup [Manage Swatch] thật (dữ liệu brand: Anker, Apple, Bosch, HP, Huawei, Samsung, Xiaomi, LG) xác nhận rõ **2 trạng thái**:

| Trạng thái brand trên BC | Hiển thị trường URL | Ví dụ trong ảnh |
| --- | --- | --- |
| Brand đã có ảnh trên BC | Tự động điền đúng URL ảnh lấy từ BC (dạng text, màu muted — có dấu hiệu read-only, chưa xác nhận được thao tác sửa tay vì nút Save trong ảnh đang disable) | Anker, Huawei, Samsung, Xiaomi |
| Brand **chưa có ảnh** trên BC | Hiển thị **đúng placeholder rỗng giống hệt** trạng thái Image Source = Online URL chưa nhập: *"Insert jpg., jpeg., png. swatch image url: https://…"* | LG |

Điều này trả lời dứt điểm câu hỏi mở cũ (đã gỡ khỏi danh sách câu hỏi BA, xem mục 11) — **không phải ảnh lỗi, không để trống im lặng, mà hiển thị đúng placeholder rỗng chung với chế độ nhập tay**.

`[CẦN XÁC NHẬN BA]` — vẫn còn 1 điểm chưa rõ từ ảnh: trường URL khi Image Source = Big Commerce có cho phép merchant **sửa tay đè lên** giá trị tự động lấy từ BC không, hay hoàn toàn read-only? Ảnh chụp ở trạng thái nút Save đang disable nên chưa quan sát được thao tác edit trực tiếp.

## 6. Toggle [Setup dynamic option]

**Cập nhật (2026-08-27) — mục đích đã xác nhận qua ảnh Figma thật (frame "Dynamic option" người dùng gửi trực tiếp):** đây là tính năng **localization cho giá trị filter option** — cho phép merchant tuỳ biến label/giá trị của từng filter value theo từng locale (đa ngôn ngữ/khu vực/tiền tệ), KHÔNG phải cơ chế "tự động thêm value mới khi sync" như suy đoán trước đây (đã đính chính). Nguyên văn mô tả trong popup: *"Offer customized filter options, so customers can have better localized store experiences"*.

**Cơ chế popup [Setup dynamic option]** (mở qua nút "Setup now" cạnh toggle khi ON):

| Field | Mô tả | Nguồn |
| --- | --- | --- |
| Locale tag/pill (đầu popup) | Danh sách locale gợi ý nhanh (VD Korean Size, US Size, UK Size) | Ảnh Figma |
| Bảng "Customize filter options" | Cột = từng locale (bắt đầu "US - Default" — locale gốc, cộng thêm locale merchant tự thêm qua "+ Add new locale", có dropdown chọn locale + icon xoá riêng từng cột); dòng = từng giá trị filter option gốc (VD Size: XS/S/M/L) | Ảnh Figma |
| Ô giao value × locale | Merchant nhập giá trị/label tương đương cho đúng locale đó (VD Size ở Korea → "KOR-XS", ở Germany → quy đổi cm) | Ảnh Figma |
| Validate | Bắt buộc chọn **≥1 locale** trước khi Save; case n locales báo lỗi rõ: *"Select at least 1 locale to setup dynamic options"*. Trạng thái Default (chưa thêm locale) → Save disable. | Ảnh Figma |
| Toast khi Save thành công | *"Dynamic options are created successfully!"* | Ảnh Figma |

**Rule phụ thuộc chéo quan trọng**: khi Display Style = Swatch, nếu merchant tắt toggle **"Display filter option name in swatch"** → hệ thống cảnh báo popup riêng: *"Turn off name will affect dynamic option — If you remove the filter name option, the dynamic options might not work properly."* (Cancel / "Yes, turn it off"). Cơ chế dynamic option phụ thuộc vào tên filter option hiển thị để map đúng giá trị theo locale — tắt tên đi có nguy cơ làm sai match locale.

**Case đặc biệt — filter dạng range/số (VD Rate Currency)**: khác filter dạng danh sách rời rạc (Size), với filter dạng khoảng giá trị, merchant **chỉ cần nhập giá trị quy đổi cho 2 đầu mút (min/max)**, hệ thống tự nội suy (tính toán) các giá trị ở giữa — không bắt nhập từng mốc trung gian.

`[CẦN XÁC NHẬN BA]` — **mâu thuẫn phát hiện được**: ảnh demo "Setup dynamic option" mới (dùng ví dụ filter "Size") cho thấy Display Style = Swatch **VÀ** toggle Setup dynamic option đang ở trạng thái **ON/enable đồng thời** — trái ngược hoàn toàn với rule đã ghi nhận ở bảng cũ trong mục này (Swatch → Disable, dựa theo case #97 gốc của sheet Brand). Chưa rõ: (a) rule cũ "Swatch disable toggle" chỉ đúng riêng cho Brand còn filter "Size" (loại khác) không áp dụng, (b) ảnh demo là ví dụ minh hoạ chung không đại diện đúng cho Brand, hay (c) rule cũ đã sai/lỗi thời. Cần verify lại thực tế trên chính node Brand trước khi kết luận, không tự chọn 1 trong 2 rule.

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
| 1 | Rule "Swatch → Setup dynamic option disable" (case #97 gốc) có còn đúng không, hay chỉ áp dụng riêng 1 số trường hợp — ảnh demo mới cho thấy 1 ví dụ (filter Size) có cả Swatch lẫn Setup dynamic option ON đồng thời | 6    |
| 2 | Product count mỗi value trong popup Select filter options có cập nhật ngay khi product đổi assign Brand trên BC + sync không, hay chỉ cập nhật khi mở lại popup? (case#22 gốc không có Expected Result rõ) | 3    |
| 3 | Trường URL khi Image Source = Big Commerce có cho phép merchant sửa tay đè lên giá trị tự động lấy từ BC không, hay hoàn toàn read-only? | 5.1.1 |

**Đã gỡ khỏi danh sách** (2026-07-20, có bằng chứng ảnh UI thật): câu hỏi cũ "Swatch hiển thị gì khi Image Source = Big Commerce nhưng brand nguồn chưa có ảnh?" — đã xác nhận hiển thị placeholder rỗng, xem mục 5.1.1.

**Đã gỡ khỏi danh sách** (2026-08-27, có bằng chứng ảnh UI thật frame "Dynamic option"): câu hỏi cũ "Toggle Setup dynamic option dùng để làm gì?" — đã xác nhận rõ mục đích + cơ chế popup, xem mục 6. Thay bằng câu hỏi mới #1 (mâu thuẫn về rule Swatch disable).

## 12. Metadata

- **Feature:** Filter — Filter Tree/Node Setup — Brand filter node (Add + Edit)
- **Tài liệu liên quan:** `filter-tree-common-specs.md` (khung Edit chung), `edit-filter-node-condition` (feature anh em cùng pattern, xem `docs/sync-fields-glossary.md` cách phân loại Nguồn dữ liệu)
- **Nguồn:** Sheet test case `Add filter node - Brand` (gid=1224314320, sheet có 195 row nhưng chỉ case #1-138 là Brand thật; #139-141 nghi copy nhầm từ Featured Products; #142-195 thực chất là nguyên 1 bộ case "Edit filter node - Condition" bị nối vào cùng tab — xem mục 0, đính chính 2026-08-13) + ảnh chụp UI thật popup [Manage Swatch] (người dùng gửi trực tiếp, 2026-07-20)
- **Số câu hỏi CẦN XÁC NHẬN BA:** 3
- **Coverage thực thi tại thời điểm viết spec:** nhiều case NG ở Filter Options/Swatch/Sort Order/Hide on customer group/Collapse-Expand; toàn bộ nhánh Manage Swatch (Image/URL) chưa thực thi (SKIP)
