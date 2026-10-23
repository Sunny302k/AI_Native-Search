# Pricing (Gói cước) — Spec

> **Nguồn và độ tin cậy.** Không có tài liệu hay Figma nào cho module này. Toàn bộ nội dung dưới đây là **quan sát trực tiếp trên staging** `https://stg-search.peasisoft.com/pricing` (2026-10-22, store đang ở gói Scale) và ảnh người dùng cung cấp (tooltip GMV). Phần nào chưa kiểm chứng được gắn `[CẦN XÁC NHẬN BA]`. Câu hỏi chi tiết nằm ở `checklists/pricing-design-issues.md` (mã PRC-xx).

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
| Additional add-on | Historical Analytics +$25/mo (chọn 365 days); Refined Search Journey Historical Analytics +$15/mo (chọn 180 days); mỗi cái có ô "Select date range" và nút [Buy add-on] | Config nội bộ | Chưa bấm Buy; giá theo range chưa rõ (PRC-06) |

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

Chi tiết và đường dẫn nguồn ở cột "App tham chiếu" của `checklists/pricing-design-issues.md`.

## 8. Câu hỏi cần xác nhận với BA

Toàn bộ 19 câu hỏi (PRC-01 đến PRC-19) nằm ở `checklists/pricing-design-issues.md`. Nhóm chặn viết test case (🔴): PRC-02, PRC-03, PRC-05, PRC-10, PRC-15, PRC-16, PRC-17, PRC-18, PRC-19.

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
