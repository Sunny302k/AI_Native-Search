# Cập nhật tính năng Pricing

Mục mới nhất đặt trên cùng. Nguồn là câu trả lời xác nhận của người dùng trong chat (đóng vai BA/PO) và ảnh người dùng gửi.

## 2026-10-28 (bổ sung) — Default Execution và add-on khi gói hết kỳ

- **Mới:**
  - Active Execution in Campaigns gồm Default Execution (theo Figma "Include Default Execution").
  - Add-on đăng ký riêng và tự huỷ khi hết tháng đã đăng ký; khi gói hết kỳ thì add-on không bị trừ tiền sau tháng đó.
- **Nguồn:** người dùng trả lời trong chat ngày 2026-10-28.
- **Cũ (theo test case và spec):** chưa rõ Default Execution có tính không; add-on hết kỳ gói còn bị trừ không.
- **Phạm vi ảnh hưởng:** plan-limit (case Unlimited), cancel-plan (huỷ gói khi có add-on), plan-and-add-on (add-on khi gói hết kỳ).
- **Trạng thái:** Đã áp dụng ngày 2026-10-28.
- **Câu hỏi mở:** Default Execution là mỗi campaign có 1 execution mặc định tính riêng hay chỉ 1 execution mặc định của cả store; quan hệ giữa "tự huỷ khi hết tháng đã đăng ký" và quy tắc add-on tự gia hạn hằng tháng khi gói còn hiệu lực.
- **Spec cần cập nhật:** docs/specs/pricing-specs.md mục 17 (Y7, Y8).

## 2026-10-28 — Trả lời đợt câu hỏi sau audit độ phủ

- **Mới:**
  - Suspend do job tự động kích hoạt, không phụ thuộc merchant có mở app hay không.
  - Hạ gói: mục bị lock ngừng áp dụng trên Storefront ngay. Monthly usage sau hạ gói chỉ tính các mục được giữ lại (các mục tạo sớm nhất theo thời gian tạo, đủ bằng hạn mức mới), nên hiển thị đủ hạn mức, ví dụ 10/10, không hiển thị vượt như 14/10.
  - Banner vượt GMV có dòng "Your card will be automatically charged on {date}…" là dòng nhắc nhở gói của merchant được thanh toán tự động.
  - Trial tính từ lúc merchant bấm [Start your free trial].
  - Mốc 1 tuần của tuần chờ vượt GMV tính từ thời điểm (theo giờ) hệ thống phát hiện GMV vượt, đủ 168 giờ thì suspend.
  - Add-on: chặn không cho mua khoảng nhỏ hơn hoặc bằng hạn mức của gói (VD Growth Analytics 180 days thì không mua được 90 và 180 days, chỉ mua được 270 và 365 days).
- **Nguồn:** người dùng trả lời trong chat ngày 2026-10-28.
- **Cũ (theo test case và spec):** X11 ghi mua được cả khoảng nhỏ hơn, bằng và lớn hơn hạn mức gói; Monthly usage sau hạ gói ghi 14/10, 7/3, 9/3, 5/3; Storefront sau hạ gói đổi ngay hay sau sync chưa chốt; trial tính từ lúc cài hay lúc bấm Start chưa chốt; mốc 1 tuần theo ngày hay giờ chưa chốt; cơ chế suspend chưa rõ.
- **Phạm vi ảnh hưởng:** test-cases/pricing (current-plan/plan-and-add-on, plan-limit, plan-lifecycle/free-trial, plan-lifecycle/exceed-gmv); checklists/pricing.
- **Trạng thái:** Đã áp dụng ngày 2026-10-28.
- **Câu hỏi mở:** (1) Default Execution của mỗi campaign có tính vào hạn mức Active Execution không (ví dụ gói Scale hạn mức 10 execution, 15 campaign Active chỉ có Default Execution thì hiển thị 15/10 hay 0/10); (2) khi gói hết kỳ thì add-on đã mua còn bị trừ tiền hằng tháng không, merchant có chỗ huỷ không (Pricing lúc đó không có khối add-on); (3) cách chặn mua add-on (ẩn hoặc vô hiệu hoá tuỳ chọn trong dropdown, hay vô hiệu hoá nút Buy add-on, kèm thông báo gì).
- **Spec cần cập nhật:** docs/specs/pricing-specs.md mục 17 (đã cập nhật), X11 ở mục 16.

## 2026-10-26 (đợt 2) — Chốt giá add-on, hạn mức date range, Monthly usage

- **Mới:**
  - Giá add-on theo khoảng ngày là 90 days $15, 180 days $30, 270 days $45, 365 days $60, dùng chung cho cả Historical Analytics và Refined Search Journey Historical Analytics. Khi chọn dropdown, giá ở tiêu đề thẻ add-on cập nhật theo khoảng đã chọn. Tiêu đề trong hình cũ (+$25 và +$15) là sai.
  - Tên hai add-on: Access to Historical Analytics; Access to Refined Search Journey Historical Analytics.
  - Add-on độc lập với gói; Growth (Analytics 180 days) được mua add-on 90 hoặc 180 days (`<cần confirm>` cách hiểu của câu trả lời).
  - Hạn mức date range là giới hạn lùi về quá khứ: ngày bắt đầu không được xa hôm nay quá số ngày hạn mức. Hôm nay 26/10, chọn 01/03 đến 15/05 bị chặn vì 01/03 cách hôm nay hơn 180 ngày.
  - Dòng Analytics ở Monthly usage lấy theo khoảng của add-on đã mua.
  - Monthly usage có 7 dòng, đúng ảnh người dùng gửi: Merchandise (100/100 Active Merchandising Campaigns, 10/10 Active Execution in Campaigns), Navigation (20/20 Filter Trees (include default), 20/20 Filter Nodes Custom Builder), Analytics (180 days Analytics, 60 days Refined Search Journey Analytics, hai dòng có link Need more ?), Sync (1/1 day Auto Sync frequency). Dòng đủ hạn mức có nhãn Locked.
  - Store không có gói hiệu lực: Dashboard và Help Center mở bình thường; Pricing mở được; Storefront và auto sync dừng chạy.
- **Nguồn:** người dùng trả lời trong chat ngày 2026-10-26 kèm ảnh Pricing Plan (Current plan, Growth, Monthly usage).
- **Cũ (theo test case và spec):** giá add-on `<cần confirm>` $20 hay $25; dòng Analytics 365 days; Monthly usage 6 dòng; trạng thái store không có gói chưa chốt.
- **Phạm vi ảnh hưởng:** test-cases/pricing/ (upgrade-plan: plan-recommendation, compare-plans, confirm-plan; current-plan: plan-and-add-on, cancel-plan; plan-limit; plan-lifecycle: free-trial, exceed-gmv).
- **Trạng thái:** Đã áp dụng ngày 2026-10-26 (spec mục 16; test case Current Plan, Plan Limit, Confirm Plan, Free Trial, Plan Recommendation đã sửa; task Compare plans và Exceed GMV mới viết).
- **Câu hỏi mở:** ngày charge Mar 06 hay Mar 05 (PRC-48); số ngày trong popup Refined (PRC-43); hai chữ tooltip khoá, badge sidebar, tên popup huỷ add-on (PRC-44, PRC-28, PRC-35); Spelling Correction ở màn nào; cách chọn 2 và 3 lần mỗi ngày ở Scheduled sync (PRC-15).
- **Spec cần cập nhật:** docs/specs/pricing-specs.md (mục add-on, Monthly usage, hạn mức Analytics, trạng thái store không có gói).

## 2026-10-26 — Trả lời đợt câu hỏi Q1 đến Q27

- **Mới:**
  - Hạ gói áp dụng ngay; seller trả đủ tiền gói mới trên hệ thống; hoàn tiền gói cũ do admin liên lạc qua chat, nằm ngoài hệ thống.
  - Mục bị khoá sau hạ gói ngừng áp dụng trên Storefront; Filter Cache làm mới ở lần sync kế tiếp để Storefront khớp Admin.
  - Suspend: [Contact us] mở email; admin xác nhận thanh toán rồi mở lại thủ công.
  - Vượt GMV: tuần chờ tính từ lúc hệ thống phát hiện GMV vượt (sau sync); quy tắc 1 tuần thay thế "suspend ngay"; hệ thống yêu cầu nâng gói ngay để dùng tiếp; có banner nhắc trong tuần chờ.
  - Store đã huỷ hoặc hết kỳ: hiển thị giống store chưa đăng ký; tính năng bị chặn bằng popup; dữ liệu giữ nguyên (khớp quy tắc hết trial).
  - Khảo sát huỷ gói: bắt buộc tick lý do; chưa tick thì [Confirm to cancel] disabled, đúng Figma.
  - Campaign đặt lịch: không tự bật khi đã đủ hạn mức; hiển thị lý do trên campaign.
  - Add-on độc lập với gói. Bảng giá theo khoảng ngày (hình người dùng gửi): 90 days = $15, 180 days = $30, 270 days = $45, 365 days = $60; áp dụng cho cả hai add-on.
  - GMV: đúng giá trị Revenue của BigCommerce, quy đổi USD, cộng mọi channel, cập nhật sau mỗi sync; hiển thị trung bình 3 tháng trước.
  - Mọi dòng trong Compare plans đều test được; cần case cho từng feature ở từng gói (ảnh Compare plans người dùng gửi: Auto Sync frequency Starter 3 days, Standard/Growth/Scale 1 day, Advanced 2 times/day, Enterprise 3 times/day; Refined Search Journey Date Range Growth 60 days).
  - Trong ảnh Compare plans không có cột "Free".
  - Active campaign: chỉ campaign đang chạy (Active, trong thời gian chạy) được tính; chặn bật lại khi đã đủ.
  - Execution tính toàn store; filter tree Inactive có tính; node dùng nhiều tree đếm 1.
  - Enterprise Custom: cấu hình riêng theo hợp đồng.
  - Thanh toán lỗi: hiển thị lỗi tại popup và cho thử lại; gói đã huỷ chọn lại được, không charge kép trong cùng kỳ.
  - Popup thành công khi mua gói: dùng bản có ngày charge.
  - Popup xác nhận và khảo sát đóng được; popup hết trial và suspend bắt buộc xử lý.
- **Nguồn:** người dùng trả lời trong chat ngày 2026-10-26 (Q1 đến Q27) kèm 2 ảnh (add-on có giá, Compare plans).
- **Cũ (theo test case và spec):** hạ gói chờ BA (Confirm Plan 18); Storefront sau khoá chờ BA; Exceed GMV chưa viết; khảo sát huỷ gói Blocked (Confirm Plan 25); lỗi thanh toán Blocked (Confirm Plan 3, 4, 8, 33); giá add-on ghi `<cần confirm>` $20 hay $25.
- **Phạm vi ảnh hưởng:** test-cases/pricing/ (4 thư mục cha, 8 task con); checklists/pricing/pricing-design-issues.md.
- **Trạng thái:** Đã áp dụng ngày 2026-10-26 (spec mục 16; test case Current Plan, Plan Limit, Confirm Plan, Free Trial, Plan Recommendation đã sửa; task Compare plans và Exceed GMV mới viết).
- **Câu hỏi mở:**
  - Giá ở tiêu đề thẻ add-on có đổi theo khoảng ngày đang chọn không (hình ghi +$25 khi chọn 365 days, +$15 khi chọn 180 days)?
  - Mua add-on khoảng thấp hơn hạn mức gói có được không?
  - Trial tính từ lúc cài hay lúc bấm Start; cài lại có cấp lại trial không?
  - Store không có gói hiệu lực: Dashboard, Help Center, Storefront, auto sync xử lý ra sao?
  - Hạn mức date range là độ dài khoảng hay giới hạn lùi quá khứ?
  - Dòng Analytics hiển thị theo khoảng add-on đã mua hay theo gói; ngày charge Mar 06 hay Mar 05; Monthly usage 6 hay 7 dòng.
- **Spec cần cập nhật:** docs/specs/pricing-specs.md (các mục hạ gói, vượt GMV, add-on, Compare plans).

## 2026-10-25 — Xác nhận đợt đầu của người dùng

- **Mới:**
  - Mục bị khoá sau hạ gói: xem được, không sửa, không bật; áp cho campaign, execution, filter tree, custom node; mở lại khi nâng gói.
  - GMV lấy giá trị Revenue của BigCommerce.
  - Lượt vượt hạn mức bị bỏ; Manual Sync không bị giới hạn.
  - Link "Need more ?" cuộn tới Additional add-on.
  - Compare plans: X = không được dùng; ✓ = được dùng; số = được dùng nhưng giới hạn trong số đó; Unlimited = không giới hạn.
  - CSS Customization là màn hình trong luồng Search (Figma file Searching, node 3602-64051).
  - Không có nút bật tắt thanh toán tự động; trừ tiền lúc 00:00 UTC; ngày trừ là hôm nay thì không gửi email.
  - Bảng giá add-on theo khoảng ngày còn thiếu; người dùng sẽ bổ sung sau (đã bổ sung ngày 2026-10-26).
- **Nguồn:** người dùng trả lời trong chat ngày 2026-10-25.
- **Trạng thái:** Đã áp dụng (ghi ở docs/specs/pricing-specs.md mục 10 đến 15).
