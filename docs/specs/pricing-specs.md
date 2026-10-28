# Pricing (Gói cước) — Spec

> **Nguồn và độ tin cậy.** Không có tài liệu hay Figma nào cho module này. Toàn bộ nội dung dưới đây là **quan sát trực tiếp trên staging** `https://stg-search.peasisoft.com/pricing` (2026-10-22, store đang ở gói Scale) và ảnh người dùng cung cấp (tooltip GMV). Phần nào chưa kiểm chứng được gắn `[CẦN XÁC NHẬN BA]`. Câu hỏi chi tiết nằm ở `checklists/pricing/pricing-design-issues.md` (mã PRC-xx).

## 1. Tổng quan

Trang **Pricing** (menu `/pricing`, tiêu đề trang "Pricing Plan") là nơi merchant xem gói cước của chính app Native Search, mức dùng so với hạn mức của gói, nâng gói và mua add-on. Không liên quan tới filter node Price/Sale Percentage trên storefront.

Trang đọc dữ liệu qua một API duy nhất `GET /api/pricing`. API này có lúc pending/treo khi gọi trực tiếp (PRC-08).

Màn **Upgrade plan** (bấm nút [Upgrade plan]) nằm **cùng URL** `/pricing`, gồm khối "Plan Recommendation" và bảng "Compare plans".

## 2. Màn Pricing — các thành phần

| Thành phần | Hiển thị (staging) | Nguồn dữ liệu | Ghi chú |
|---|---|---|---|
| Tên gói | "Scale" | `[CẦN XÁC NHẬN BA]` (gói của store) | Hiển thị ở tiêu đề khối Monthly usage |
| Your current average GMV/month | "70k" | `[CẦN XÁC NHẬN BA]` — nhiều khả năng Tính toán từ dữ liệu sync (đơn hàng) | Có icon **?**; tooltip: "Calculated based on your latest average GMV on 3 months" → trung bình **3 tháng gần nhất** |
| Chữ cạnh GMV | "SVG not found 14.3%" (đỏ) | Chưa rõ | Ý nghĩa của 14.3% chưa biết (PRC-01); "SVG not found" là icon lỗi tải (PRC-08) |
| Thông báo trừ tiền | "Your card will be automatically charged on Nov 8, 2026. You'll receive an invoice via email 24 hours before the charge." | Chưa rõ nguồn ngày | Không thấy nút bật/tắt tự động thanh toán trên trang (PRC-12); giờ trừ tiền chưa nêu (PRC-13) |
| Monthly usage | Mỗi dòng dạng **đã dùng/hạn mức** + icon tròn | Hạn mức: bảng cấu hình theo gói (khớp cột Scale của bảng Compare plans). Đã dùng: chưa đối chiếu | Xem mục 3 |
| Nút [Upgrade plan] | Mở màn Upgrade plan | — | |
| Nút ⋮ | Menu có 1 mục **Cancel plan** | — | Chưa bấm; chưa biết còn mục ẩn (PRC-19) |
| Need more ? | 2 nút ở Analytics và Refined Search Journey | — | Bấm: URL không đổi, không popup, trang cuộn xuống ~151px (nhiều khả năng tới khối add-on, PRC-14) |
| Additional add-on | Access to Historical Analytics và Access to Refined Search Journey Historical Analytics; mỗi cái có ô "Select date range" và nút [Buy add-on]. Giá theo khoảng đang chọn: 90 days $15, 180 days $30, 270 days $45, 365 days $60 (mục 16, X10; chữ +$25 và +$15 trên staging cũ là sai) | Config nội bộ | |

### Monthly usage — các dòng đang hiển thị (gói Scale)

| Nhóm | Dòng | Hiển thị | Ghi chú |
|---|---|---|---|
| Merchandise | Active Merchandising Campaigns | 1/Unlimited | Icon vòng rỗng |
| Merchandise | Active Execution in Campaigns | 1/10 | Icon vòng tô một phần |
| Navigation | Filter Trees (include default) | 4/Unlimited | Gồm cả cây Default |
| Navigation | Filter Nodes Custom Builder | 4/Unlimited | Chỉ đếm các node do seller tạo bằng Custom Builder, không đếm node dựng sẵn |
| Analytics | Analytics | 270 days + "Need more ?" | Icon đồng hồ |
| Analytics | Refined Search Journey Analytics | 90 days + "Need more ?" | Icon đồng hồ |
| Sync | Auto Sync frequency | 1/1 day + nhãn "Locked" | Icon tròn đặc; "Locked" chưa rõ nghĩa (PRC-16) |

Icon tròn bên trái mỗi dòng được tô theo tỉ lệ đã dùng/hạn mức; hạn mức Unlimited thì không tô (vòng rỗng).

Tiêu đề khối là "Monthly usage" nhưng Analytics và Auto Sync là hạn mức cấu hình, không phải số dùng theo tháng (PRC-09).

## 3. Màn Upgrade plan

### 3.1 Bảng gói (đọc từ màn hình)

| Gói | Avg GMV/tháng | Giá | Mô tả trên thẻ |
|---|---|---|---|
| Starter | đến $25K | $29/mo | For launching your first store |
| Standard | $25K – $75K | $59/mo | For growing your sales |
| Growth | $75K – $200K | $119/mo | For fast-growing brands |
| Scale | $200K – $600K | $249/mo | For multi-channel operations |
| Advanced | $600K – $1.5M | $499/mo | For established enterprises |
| Enterprise | trên $1.5M | Contact us | For large organizations |

Dòng giới thiệu: "You only pay fees based on the actual value and revenue your store generates." Mốc biên đúng bằng ngưỡng thuộc gói nào chưa rõ (PRC-04).

### 3.2 Bảng Compare plans — hạn mức theo gói

| Tài nguyên | Starter | Standard | Growth | Scale | Advanced | Enterprise |
|---|---|---|---|---|---|---|
| Active Merchandising Campaigns | 10 | 40 | 100 | Unlimited | Unlimited | Unlimited |
| Active Execution in Campaigns (gồm Default Execution) | 3 | 5 | 10 | 10 | 10 | 10 |
| Number of Filter Trees (gồm default) | 3 | 10 | 20 | Unlimited | Unlimited | Unlimited |
| Filter Nodes Custom Builder | 3 | 10 | 20 | Unlimited | Unlimited | Unlimited |
| Analytics Date Range | 30 days | 90 days | 180 days | 270 days | 365 days | Custom |
| Refined Search Journey Analytics Date Range | 7 days | 30 days | 60 days | 90 days | 180 days | 365 days |
| Auto Sync frequency | 3 days | 1 day | 1 day | 1 day | 2 times/day | 3 times/day |

Bảng Compare plans là nơi seller kiểm tra mỗi gói có những chế độ/tính năng gì.

Cột được gán theo thứ tự hiển thị trong bảng; đối chiếu cột Scale khớp hoàn toàn với Monthly usage của store. Bảng còn nhiều dòng tính năng (Search, Merchandise, Navigation, Analytics, Support...) được đánh dấu có/không bằng **icon**, chưa đọc được nội dung — cần ảnh chụp màn hình để ghi lại.

### 3.3 Trạng thái nút trên thẻ gói

| Thẻ | Chữ trên nút | Trạng thái |
|---|---|---|
| Starter | Select plan | **Vô hiệu hoá** (`disabled`), xám |
| Standard, Growth, Advanced, Enterprise | Select plan | Bấm được, cam nhạt |
| Scale (gói đang dùng) | Selected | **Vô hiệu hoá**, xám; nền thẻ nhạt cam |

Thẻ Starter bị khoá kèm tooltip "Current GMV exceeds this plan": GMV 70k vượt mức tối đa $25K của Starter. Các gói có mức tối đa GMV cao hơn GMV hiện tại (Standard, Growth, Advanced, Enterprise) bấm được.

### 3.4 Plan Recommendation

Khối "Recommended plan" hiển thị 6 gói, không đánh dấu gói nào là gói được gợi ý (chỉ Scale, gói đang dùng, được tô nền). Khối này có gợi ý một gói cụ thể không và dựa trên chỉ số nào: chưa biết (PRC-11).

## 4. Business rule đã xác minh trên màn hình

| # | Rule | Căn cứ |
|---|---|---|
| R1 | Average GMV/month = trung bình 3 tháng gần nhất | Tooltip icon ? |
| R2 | Hạn mức Monthly usage lấy theo gói đang chọn; khớp cột Scale của Compare plans | Đối chiếu 7 dòng |
| R3 | Gói đang chọn có nút "Selected" bị khoá | Kiểm tra thuộc tính nút |
| R4 | Menu ⋮ có mục Cancel plan | Quan sát |
| R5 | Auto-charge text dùng cố định "24 hours before the charge" | Quan sát |
| R6 | Gói có mức GMV tối đa thấp hơn avg GMV hiện tại bị khoá, tooltip "Current GMV exceeds this plan" | Tooltip trên nút Starter |

## 5. Mâu thuẫn và điểm chưa nhất quán

| # | Mô tả | Ghi chú |
|---|---|---|
| M1 | Store GMV 70k (thuộc Standard) đang ở Scale; giao diện cho chọn các gói cao hơn mức tối thiểu theo GMV | PRC-03 |
| M2 | Bảng gói ghi Auto Sync "2 times/day", "3 times/day"; spec Schedule Sync (`sync-schedule-sync-specs.md`) chỉ có Every Day/Week/Month theo từng data type, không nhắc giới hạn theo gói | PRC-15, 28 |
| M3 | Tiêu đề "Monthly usage" nhưng gồm hạn mức không theo tháng | PRC-09 |
| M4 | Chữ lỗi "SVG not found" và API `/api/pricing` có lúc treo | PRC-08 |

## 6. Điều chưa vọc / chưa xác minh

- Hành vi khi chạm hạn mức (vd Execution thứ 11), đổi gói, hạ gói, huỷ gói, mua add-on: chưa thử vì làm thay đổi dữ liệu hoặc phát sinh thanh toán.
- Màn hình khi store chưa có gói.
- Số "đã dùng" (1, 4, 1...) chưa đối chiếu với module Filter và Merchandise.
- Các dòng tính năng có/không trong Compare plans (icon).
- Response JSON của `/api/pricing`.

## 7. Tham chiếu app tương tự (tóm tắt)

| App | Điểm đáng chú ý | Mức tin cậy |
|---|---|---|
| BigCommerce (nền tảng) | Gói theo GMV 12 tháng gần nhất, tự nâng khi chạm ngưỡng | Trang chính thức |
| Searchspring | Phí cơ bản + domains, sessions, SKUs | Trang chính thức |
| Algolia | Tính theo search requests và records; vượt thì tính phí thêm | Bên thứ ba |
| Klevu | Không công khai giá | Không có nguồn đáng tin |
| Klaviyo (app email, tham khảo chung) | Nâng ngay, tính chênh lệch; hạ gói khi mức dùng vừa gói đích và áp dụng chu kỳ sau | Trang help chính thức |

Chi tiết và đường dẫn nguồn ở cột "App tham chiếu" của `checklists/pricing/pricing-design-issues.md`.

## 8. Câu hỏi cần xác nhận với BA

Toàn bộ 19 câu hỏi (PRC-01 đến PRC-19) nằm ở `checklists/pricing/pricing-design-issues.md`. Nhóm chặn viết test case (🔴): PRC-02, PRC-03, PRC-05, PRC-10, PRC-15, PRC-16, PRC-17, PRC-18, PRC-19.

## 9. Đối chiếu bổ sung trên giao diện (staging)

| # | Quan sát | Liên quan |
|---|---|---|
| U1 | Hover vào "SVG not found 14.3%" **không hiện tooltip**; chỉ icon **?** cạnh Average GMV/month có tooltip | PRC-01 |
| U2 | Màn Upgrade plan là một view riêng có nút quay lại (←) và tiêu đề "Upgrade plan", khối "Plan Recommendation" ở trên, bảng "Compare plans" ở dưới; mỗi cột gói trong bảng cũng có nút Select/Selected ở đầu cột | Mục 3 |
| U3 | Không có nhãn, viền hay màu riêng đánh dấu gói được gợi ý; chữ "Recommended plan" là tiêu đề của khối 6 gói. Chỉ thẻ gói đang dùng (Scale) được tô nền nhạt. Nút [Select plan] của Starter bị khoá có tooltip "Current GMV exceeds this plan" | Mục 3.3, 3.4 |
| U4 | Add-on Historical Analytics: ô "Select date range" có 4 lựa chọn **90, 180, 270, 365 days** (mặc định 365). Giá theo từng range chưa kiểm chứng (khi chọn lại giá trị bằng thao tác tự động, ô chưa đổi giá trị; chưa rõ do công cụ hay do giao diện) | PRC-06 |
| U5 | Menu ⋮ chỉ có **Cancel plan** | Mục 2 |
| U6 | Số Filter Tree: danh sách Filter Tree trên staging có **4 cây** (giangntt, Filter tree 4, verrify bug, TShirt 2), khớp "4/Unlimited Filter Trees" | Mục 2 |
| U7 | Màn Sync > Scheduled sync: ghi "No custom sync schedule is set. Your data is automatically synced every 3 days. Next sync: 10/24/26, 7:00 AM (UTC+07)". Store đang ở gói Scale (Auto Sync "1 day") nhưng mặc định hiển thị 3 ngày | PRC-15 |
| U8 | Cấu hình lịch sync theo từng data type: **Products, Categories, Blogs, Synonyms** (4 loại, không phải 8 như spec Schedule Sync). Mỗi loại có "Sync every: [số] [Day(s) / Week(s) / Month(s)]", mặc định 1 Day(s); nút Save Schedule chỉ bật sau khi chọn data type. Không có đơn vị giờ, nên "2 times/day" của gói Advanced chưa có chỗ cấu hình | PRC-15, 28 |
| U9 | Màn Sync > Manual sync hiện "No scheduled sync available. Click the button to sync now. Last update: 19/10/2026 09:56" | Sync |

Không đọc được dấu có/không (tick/gạch) của các dòng tính năng trong Compare plans: trang bị chậm khi cuộn và chụp ảnh nhiều lần; dữ liệu này không có trong văn bản trang. Cần ảnh chụp để ghi lại.

## 10. Xác nhận từ PO (2026-10-25)

Nguồn: sheet câu hỏi PO (Ảnh_44 đến Ảnh_50 và 1 dòng không số về downgrade). Đã ghi vào cột "Câu trả lời" của `checklists/pricing/pricing-design-issues.md`.

| # | Rule đã xác nhận | Issue |
|---|---|---|
| P1 | "14.3%" cạnh Average GMV/month = mức tăng trưởng trung bình so với 3 tháng trước đó | PRC-01 |
| P2 | "3 tháng gần nhất" = 3 tháng trước, không gồm tháng hiện tại → không cập nhật real-time | PRC-02 (một phần) |
| P3 | PO: gói "chỉ dựa vào GMV". Figma note: merchant được mua gói thuộc range GMV cao hơn, không mua được gói thấp hơn. Cách hiểu "merchant không tự chọn" ghi trước đó đã bị gỡ, chờ BA xác nhận | PRC-03 (cần xác nhận lại) |
| P4 | Mốc biên 25K thuộc gói thấp hơn (<= 25K là Starter); 4 mốc còn lại suy theo cùng quy tắc | PRC-04 |
| P5 | Chạm hạn mức tính năng → nút tạo tự động bị disable | PRC-05 (một phần) |
| P6 | Add-on tự gia hạn hằng tháng | PRC-06 (một phần) |
| P7 | Enterprise (Contact us): sau này mở chat với Customer support | PRC-07 |
| P8 | Downgrade: giữ các mục tạo đầu tiên, các mục tạo sau bị lock | PRC-10 (một phần) |

Staging (GMV 70k ở gói Scale) khớp note Figma "được mua gói cao hơn range GMV"; chỉ lệch nếu "chỉ dựa vào GMV" nghĩa là hệ thống tự gán gói.

## 11. Đối chiếu Figma Pricing (2026-10-25)

Nguồn: https://www.figma.com/design/Qbx9Ftu1qVuJA1zBVA8aAw/Pricing — 3 luồng ("Khi chưa mua plan → expired trial → mua plan thành công", "Khi đã mua plan", "[START] Khi chưa mua plan → activate trial successfully") và 5 note Logic. Theo CLAUDE.md, note Figma là spec chính thức.

### 11.1 Vòng đời gói (từ note Logic)

| Giai đoạn | Rule trên Figma |
|---|---|
| Cài app | Trial 14 ngày của gói cao nhất. Lấy GMV 3 tháng gần nhất để đưa ra các gói: được mua gói thuộc range GMV cao hơn, không mua gói thấp hơn. Nếu subscribe ngay thì dùng trial hết 14 ngày rồi charge theo gói đã chọn |
| Xem plans | Hiển thị plan hiện tại và GMV tháng hiện tại; có thể chuyển sang plan khác theo cùng logic mua theo GMV. Hover plan thì highlight; mỗi range GMV highlight gói được recommend |
| Vượt GMV | Charge thêm theo lượng GMV vượt. Không trả trong một thời hạn nhất định thì suspend: dừng tất cả service, vào app bị bắt trả tiền rồi mới renew plan. Thanh toán xong gửi email invoice |
| Hết trial | Popup "Your trial has expired…", truy cập tính năng thì bị chặn bằng popup |
| Quá hạn trả phí | Truy cập tính năng bị chặn bằng popup; popup "Your plan has been suspended" có nút Contact us |
| Đã mua gói với ngày {x} | Nút disable, đổi chữ thành "Activated" |
| Enterprise | [Select plan] mở bubble chat; [Contact us] mở link email peasisoft |
| Huỷ gói | Màn khảo sát "Before you go…" 8 lý do |

### 11.2 Hành vi khi chạm hạn mức (từ frame "Monthly usage")

| Hạn mức | Khi chạm |
|---|---|
| Active Merchandising Campaigns | Disable nút [Create new] |
| Filter Trees (include default) | Disable nút [Create new] |
| Analytics (x days) | Bấm [Apply] thì hiện popup |
| Refined Search Journey Analytics (x days) | Bấm [Apply] thì hiện popup |
| Filter Nodes Custom Builder | Disable card "My own filter" |
| Active Execution in Campaigns | Disable nút [New execution] |

### 11.3 Mâu thuẫn Figma và các nguồn khác

| # | Điểm | Figma | Nguồn khác | Issue |
|---|---|---|---|---|
| C1 | Giá add-on Historical Analytics | +$20/mo | Staging +$25/mo | PRC-25 |
| C2 | Cửa sổ GMV | Note: "GMV tháng hiện tại" | PO: 3 tháng trước, không gồm tháng hiện tại | PRC-26 |
| C3 | Ai chọn gói | Merchant được mua gói cao hơn range GMV | PO: "chỉ dựa vào GMV" | PRC-03 |
| C4 | Enterprise | Chat bubble (Select plan) và email (Contact us) | PO: sau này mở chat | PRC-27 |
| C5 | Gói gợi ý | Highlight + nhãn "Best Plan" | Staging không có | PRC-29 |
| C6 | Nhãn gói | Badge STARTER, thẻ gói Growth | | PRC-28 |
| C7 | Auto Sync | Compare plans khớp staging | Màn Scheduled sync ghi 3 ngày | PRC-15 |

### 11.4 Chưa đọc được

Bảng Compare plans trên Figma có dấu có/không cho từng dòng tính năng, nhưng ảnh chụp độ phân giải thấp nên chưa ghi lại. Cần ảnh phóng to từng nhóm (Search, Merchandise, Navigation, Analytics, Compliment Features, Sync, Support) trước khi viết test case phần này.

## 12. Đọc đủ note vàng và frame Figma Pricing (2026-10-25)

Theo CLAUDE.md, note vàng là spec chính thức. Đã đọc đủ 9 note và các frame trong 3 section con.

### 12.1 Note Logic

| # | Gắn với | Nội dung |
|---|---|---|
| N1 | Toàn journey | Cài app: trial 14 ngày gói cao nhất; GMV 3 tháng gần nhất để đưa ra các gói, mua gói range cao hơn, không mua thấp hơn; subscribe luôn thì dùng hết trial rồi charge. Xem plans: hiển thị plan hiện tại và GMV tháng hiện tại. Vượt GMV: charge thêm, không trả trong 1 thời hạn thì suspend (dừng tất cả service), trả xong gửi email invoice. UI: hover plan thì highlight; mỗi range GMV highlight gói recommend |
| N2 | Compare plans | Fix hàng tiêu đề (feature row) khi cuộn; highlight gói recommend |
| N3, N5 | Enterprise | Select plan Enterprise / Contact us mở bubble chat. PO: triển khai luôn ở bản này |
| N4 | Contact us ở popup Your plan has been suspended | Link email peasisoft (note nằm cạnh popup suspend, không phải Enterprise; xem PRC-41) |
| N6 | Add-on | Sau khi mua add-on thì cập nhật số ngày của add-on vào Monthly usage |
| N7 | Add-on | Dropdown date range: 90 days, 180 days, 270 days, 365 days, Custom date range |
| N8 | Add-on đã mua | Đã mua với {x} ngày: nút disable và đổi chữ thành Activated (note nằm ở khu vực Buy/Cancel add-on). Nút gói hiện Selected |
| N9 | Chặn tính năng | Chưa mua hoặc hết trial: truy cập tính năng thì block bằng popup. Quá hạn trả phí: block bằng popup khi click vào các tính năng |

### 12.2 Popup và nội dung chữ trên Figma

| Màn / popup | Nội dung |
|---|---|
| Dashboard (trial) | Congratulations, You have unlocked 14-day trial of Native AI Search, đếm ngược 14 days, nút Start your free trial |
| Hết trial (vd trang Search) | Your trial has expired, access to Native AI Search features has been temporarily suspended; Trial period expired! 00 days; nút Select plan |
| Confirm your plan | You will get immediate access to all Native AI Search features for $29/month. Cancel và Confirm |
| Successful (mua gói) | You are all set. Native AI Search is now unlocked. $29 will be charged on Mar 06, 2026. Monthly billed. Cancel anytime. Nút Get start |
| Change plan? | Are you sure you want to switch to this plan? Your billing will be updated accordingly. Keep current và Confirm |
| Cancel Growth Plan? | You will keep access until the end of your current billing period. Yes, cancel và Keep current |
| Before you go | Khảo sát 8 lý do, ô nhập Tell me more about your experience, nút Confirm to cancel |
| Successful (huỷ gói) | Your plan is cancelled. Native AI Search features remains active until Mar 05, 2026. Nút OK |
| Confirm your add-on | You will get access to 270 days of historical analytics for $20/month. Cancel và Confirm |
| Cancel add-on? | You will keep access until the end of your current billing period. Yes, cancel và Keep current |
| Date Range Limit Exceeded | Your Growth plan allows a maximum range of 180 days. Buy add-on và Adjust range (Search behavior analytics và Refined search journey) |
| Plan suspended | Your plan has been suspended. Access to Native AI Search is temporarily paused. Nút Contact us |
| Tooltip khi nút bị disable | Plan limit reached. This feature is temporarily locked. |
| Banner vượt GMV | You have exceeded your current plan limit. Your average GMV: $240k (285%) exceeds Growth plan limit ($75k - $200k). All features will be locked if you do not pay |

### 12.3 Trạng thái Current plan

- Banner Your current average GMV/month 110k (35%) kèm Your card will be automatically charged on {date}. You will receive an invoice via email 24 hours before the charge.
- Add-on đã mua: nút Activated (disable); dòng Analytics ở Monthly usage đổi thành 365 days Analytics, nhãn Activated, Renewed on {date}, link Cancel.
- Auto Sync ở hạn mức: 1/1 day Auto Sync frequency, Limit reached. This feature is temporarily locked.
- Màn Upgrade plan: gói đang dùng hiện Selected (disable); các gói thấp hơn GMV xám kèm tooltip Current GMV exceeds this plan.

### 12.4 Điểm không nhất quán trong Figma (chỉ để ghi nhận)

Badge sidebar STARTER nhưng thẻ gói là Growth; ngày trừ tiền mẫu khác nhau (Nov 1, 2025 và Mar 05, 2026); tên add-on thứ hai có 2 phiên bản (PRC-36); popup thành công khi huỷ add-on dùng câu của huỷ gói (PRC-35).

## 13. Xác nhận từ người dùng (2026-10-25, đợt 2)

| # | Rule đã xác nhận | Issue |
|---|---|---|
| U1 | Merchant tự chọn gói thuộc range GMV của mình hoặc cao hơn | PRC-03 |
| U2 | Enterprise (Select plan, Contact us) mở popup chat để được support, triển khai luôn | PRC-27 |
| U3 | Highlight gói được gợi ý có làm ở bản hiện tại | PRC-29 |
| U4 | Mặc định Auto Sync 3 ngày ở màn Scheduled sync là chưa áp theo gói | PRC-15 (một phần) |
| U5 | GMV = trung bình 3 tháng trước | PRC-26 |
| U6 | Trial dùng gói Advanced; hết trial giữ dữ liệu, chỉ khoá tính năng | PRC-20, 21 |
| U7 | Suspend ngay sau khi hết gói cũ; suspend ngừng cả dịch vụ trên storefront | PRC-22 (một phần), 23 |
| U8 | Tính năng bị khoá theo gói: khoá và hiện tooltip "Plan limit reached. This feature is temporarily locked." | PRC-30 |
| U9 | Variant display bị khoá ở Starter, Standard, Growth, Scale; mở ở Advanced và Enterprise | PRC-32 |
| U10 | Downgrade: giữ các mục tạo lâu nhất (theo thời gian tạo), mục tạo sau bị lock | PRC-10 (một phần) |
| U11 | Nâng cấp gói áp dụng ngay; tiền chênh lệch refund thủ công qua chat với admin hệ thống | PRC-18 (cần làm rõ) |
| U12 | Huỷ gói dừng tự thanh toán; khảo sát Before you go bỏ qua được | PRC-19 |

## 14. Xác nhận từ người dùng (2026-10-25, đợt 3)

| # | Rule đã xác nhận | Issue |
|---|---|---|
| V1 | Downgrade: lock = xem được, không sửa, không bật; áp cho campaign, execution, filter tree, custom node; mở lại khi nâng gói | PRC-10 |
| V2 | GMV lấy từ Revenue của BigCommerce (Analytics Overview) | PRC-02 (một phần) |
| V3 | Auto sync vượt hạn mức: lượt vượt bị bỏ; Manual Sync không bị giới hạn | PRC-16 |
| V4 | "Need more ?" cuộn tới Additional add-on | PRC-14 |
| V5 | Mọi tính năng trong Compare plans đều bị kiểm soát theo gói (X, tick, số, Unlimited) | PRC-31 |
| V6 | Không có nút bật/tắt tự thanh toán; trừ tiền 00:00 UTC; ngày trừ là hôm nay thì không gửi email 24 giờ trước | PRC-12, 13 |
| V7 | CSS Customization: Instant Search Widget có tab Custom CSS | PRC-33 (một phần) |

## 15. Xác nhận từ người dùng (2026-10-25, đợt 4)

| # | Rule đã xác nhận | Issue |
|---|---|---|
| W1 | Mua gói lúc đang trial: giữ quyền lợi trial đến hết 14 ngày; ngày charge là ngày trial kết thúc | PRC-37 |
| W2 | "1 time nhất định" trước khi suspend là 1 tuần (thay cho "suspend ngay sau khi hết gói cũ") | PRC-38 |
| W3 | Thanh GMV chỉ hiển thị, không kéo được | PRC-39 |
| W4 | Khi GMV exceed, seller có tối đa 1 tuần để nâng lên plan lớn hơn; quá 1 tuần chưa nâng thì suspend. Cách xử lý là nâng gói, không phải phí vượt theo tỷ lệ | PRC-22 (số tiền và thời điểm tính: PRC-42) |

## 16. Xác nhận từ người dùng (2026-10-26)

Nguồn chi tiết: `docs/updates/pricing-updates.md` (hai mục ngày 2026-10-26). Mục này **thay thế** các rule cũ bị nêu ở cột "Thay thế".

| # | Rule đã xác nhận | Issue | Thay thế |
|---|---|---|---|
| X1 | Hạ gói áp dụng ngay; seller trả đủ tiền gói mới trên hệ thống; hoàn tiền gói cũ do admin liên lạc qua chat, nằm ngoài hệ thống | PRC-18 | U11 (cần làm rõ) |
| X2 | Mục bị lock sau hạ gói ngừng áp dụng trên Storefront; Filter Cache làm mới ở lần sync kế tiếp | PRC-45 | V1 (chỉ nói phía Admin) |
| X3 | Suspend: [Contact us] mở email; admin xác nhận thanh toán rồi mở lại thủ công | PRC-41 | |
| X4 | Vượt GMV: 1 tuần chờ tính từ lúc hệ thống phát hiện GMV vượt (sau sync); hệ thống yêu cầu nâng gói ngay để dùng tiếp; có banner nhắc trong tuần chờ; quy tắc 1 tuần thay "suspend ngay" | PRC-42 | U7 (phần "suspend ngay sau khi hết gói cũ") |
| X5 | Store đã huỷ hoặc hết kỳ hiển thị giống store chưa đăng ký; tính năng bị chặn bằng popup; dữ liệu giữ nguyên. Dashboard và Help Center không bị ảnh hưởng; Pricing mở được; Storefront và auto sync dừng chạy | PRC-17 | |
| X6 | Khảo sát huỷ gói bắt buộc tick lý do; chưa tick thì nút [Confirm to cancel] disabled | PRC-47 | U12 (khảo sát bỏ qua được) |
| X7 | Campaign đặt lịch không tự bật khi đã đủ hạn mức; hiển thị lý do trên campaign | PRC-46 | |
| X8 | Active campaign = đang chạy (Active, trong thời gian chạy); chặn bật lại khi đủ hạn mức. Execution tính toàn store. Filter tree Inactive có tính. Node dùng nhiều tree đếm 1 | PRC-53 | |
| X9 | GMV = giá trị Revenue của BigCommerce, quy đổi USD, cộng mọi channel, cập nhật sau mỗi sync; hiển thị trung bình 3 tháng trước | PRC-02, PRC-40 | |
| X10 | Giá add-on theo khoảng ngày: 90 days $15, 180 days $30, 270 days $45, 365 days $60, dùng chung cho cả hai add-on; giá ở tiêu đề thẻ cập nhật theo khoảng đang chọn. Tên thẻ: Access to Historical Analytics; Access to Refined Search Journey Historical Analytics | PRC-06, 25, 36 | C1 (giá $20 và $25); mục 2 dòng "Additional add-on" |
| X11 | Add-on độc lập với gói: nâng, hạ, huỷ gói không ảnh hưởng add-on; KHÔNG mua được khoảng nhỏ hơn hoặc bằng hạn mức gói (bị chặn, đã xác nhận 2026-10-28, xem mục 17), mua được khoảng lớn hơn hạn mức gói | PRC-49 | |
| X12 | Dòng Analytics ở Monthly usage lấy theo khoảng của add-on đã mua | PRC-48 (một phần) | |
| X13 | Monthly usage có 7 dòng chia 4 nhóm: Merchandise (2), Navigation (2), Analytics (2, có "Need more ?"), Sync (1); dòng đủ hạn mức có nhãn Locked | PRC-48 (một phần) | mục 2 (6 dòng trên Figma) |
| X14 | Hạn mức date range là giới hạn lùi về quá khứ: ngày bắt đầu không được xa hôm nay quá số ngày của hạn mức. Enterprise "Custom" là cấu hình riêng theo hợp đồng | PRC-50 | |
| X15 | Popup thành công mua gói dùng bản có ngày charge. Popup xác nhận và khảo sát đóng được; popup hết trial và suspend bắt buộc xử lý | PRC-51 | |
| X16 | Thanh toán lỗi: hiển thị lỗi tại popup và cho thử lại. Gói đã huỷ chọn lại được, không charge kép trong cùng kỳ | PRC-52 | |
| X17 | Mọi dòng trong Compare plans đều test được; không có cột "Free" | PRC-24, 33, 34 | |

**Còn mở sau 2026-10-26:** PRC-08, 09, 15, 28, 35, 43, 44, 48 (ngày charge Mar 06 hay Mar 05).

## 17. Xác nhận từ người dùng (2026-10-28)

| # | Rule đã xác nhận | Thay thế |
|---|---|---|
| Y1 | Suspend do job tự động kích hoạt (không phụ thuộc merchant mở app); Storefront và auto sync dừng đúng lúc suspend | |
| Y2 | Hạ gói: mục bị lock ngừng áp dụng trên Storefront ngay; Monthly usage sau hạ gói chỉ tính các mục được giữ lại (các mục tạo sớm nhất, đủ bằng hạn mức mới), nên hiển thị đủ hạn mức (VD 10/10) | X2 (Filter Cache làm mới ở lần sync kế tiếp vẫn giữ); số đếm 14/10, 7/3, 9/3, 5/3 |
| Y3 | Dòng "Your card will be automatically charged on {date}…" trên banner vượt GMV là nhắc nhở gói được thanh toán tự động | |
| Y4 | Trial tính từ lúc merchant bấm [Start your free trial] | |
| Y5 | Mốc 1 tuần của tuần chờ tính từ thời điểm (theo giờ) hệ thống phát hiện GMV vượt, đủ 168 giờ thì suspend | |
| Y6 | Add-on: chặn không cho mua khoảng nhỏ hơn hoặc bằng hạn mức của gói; chỉ mua được khoảng lớn hơn (Growth Analytics 180 days: mua được 270 và 365 days) | X11 |
| Y7 | Active Execution in Campaigns gồm Default Execution (Figma "Include Default Execution") | |
| Y8 | Add-on đăng ký riêng; khi gói hết kỳ thì add-on tự huỷ khi hết tháng đã đăng ký, không bị trừ tiền sau đó | |

**Câu hỏi mở (còn lại):** Default Execution mỗi campaign hay cả store; quan hệ với quy tắc add-on tự gia hạn khi gói còn hiệu lực. (Câu hỏi cũ: Default Execution có tính vào hạn mức Active Execution không; add-on khi gói hết kỳ còn bị trừ tiền không; cách chặn mua add-on (ẩn tuỳ chọn, vô hiệu hoá nút hay thông báo).
