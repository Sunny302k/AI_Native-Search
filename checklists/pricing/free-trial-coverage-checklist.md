# Coverage checklist - free-trial

Nguồn: docs/specs/pricing-specs.md (mục 11 đến 16; mục 16 ưu tiên cao nhất, X5, X15, X16), docs/updates/pricing-updates.md (2026-10-26, 2 đợt). File test case: test-cases/pricing/plan-lifecycle/free-trial/free-trial_testcase.csv — 48 case (ID 1 đến 48, không tính dòng Purpose); không có file matrix. Audit lại từ đầu ngày 2026-10-28. Ngoài phạm vi (không đưa vào): vượt GMV và suspend (exceed-gmv), mua gói theo range GMV (plan-recommendation), hạ gói và Filter Cache (plan-limit), huỷ gói (cancel-plan).

## Tổng quan
- Tổng số rule: 29
- Covered: 28
- Partial: 1
- Not covered: 0

## Chi tiết

### Popup Congratulations và đếm ngược
- [x] AC-01 — Popup Congratulations ở Dashboard: tiêu đề, nội dung 14-day trial, đếm ngược 14 days, nút [Start your free trial] (spec 12.2) — Covered — TC: 6
- [x] AC-02 — Click [Start your free trial]: popup đóng, trial 14 ngày chạy, Dashboard dùng được — Covered — TC: 1
- [x] AC-03 — Mốc bắt đầu trial 14 ngày — Covered — TC: 1, 4, 12
- [x] AC-04 — Hành vi popup Congratulations khi đóng bằng cách khác, mở lại Dashboard, reload — Covered — TC: 2, 3, 5 (case 2 Blocked chờ designer: chưa rõ popup có đóng được ngoài nút; case 3, 5 `<cần confirm>`)
- [x] AC-05 — Đếm ngược hiển thị đúng giá trị còn lại (14 days vừa bắt đầu, giá trị giữa chừng, biên 1 ngày, biên dưới 1 giờ) — Covered — TC: 7 đến 10 (case 7, 9 có `<cần confirm>`)
- [x] AC-06 — Hết trial: đếm ngược về 00 days 00 hrs 00 mins 00 secs, trạng thái chuyển Expired — Covered — TC: 11, 38
- [x] AC-07 — Thời điểm hết trial = 14 × 24 giờ sau lúc bắt đầu, không phụ thuộc múi giờ store — Covered — TC: 12 (`<cần confirm>` mốc tính)

### Hạn mức trong trial (gói Advanced)
- [x] AC-08 — Trial dùng gói Advanced: Monthly usage hiển thị hạn mức Advanced (U6) — Covered — TC: 13 (`<cần confirm>` thẻ Current plan khi đang trial)
- [x] AC-09 — Trong trial vượt hạn mức gói thấp vẫn không bị khoá, nút [Create new] không disable — Covered — TC: 14
- [x] AC-10 — Tính năng chỉ mở ở Advanced (Variant display, U9) dùng được trong trial — Covered — TC: 15

### Hết trial: popup và chặn tính năng
- [x] AC-11 — Popup "Your trial has expired": nội dung, "Trial period expired! 00 days...", nút [Select plan] (spec 12.2) — Covered — TC: 24
- [x] AC-12 — Popup hết trial bắt buộc xử lý: không đóng bằng Esc/click nền, reload vẫn hiện (X15) — Covered — TC: 17, 19
- [x] AC-13 — [Select plan] ở popup chuyển sang trang Pricing có Plan Recommendation — Covered — TC: 16
- [x] AC-14 — Hết trial hoặc chưa mua gói: truy cập tính năng (Search, Filter, Recommendation, Merchandising, Sync, Analytics) bị chặn bằng popup, kể cả vào bằng URL (N9, X5) — Covered — TC: 18, 44 (case 43 `<cần confirm>` các mục con của Recommendation)
- [x] AC-15 — Popup chặn hiện khi trial hết lúc đang ở trang (không reload) và ở tab mở trước — Covered — TC: 22, 23 (case 22 `<cần confirm>` thời điểm hiện)
- [x] AC-16 — Dashboard và Help Center không bị ảnh hưởng khi store không có gói (X5) — Covered — TC: 20
- [x] AC-17 — Trang Pricing mở được khi store không có gói, Plan Recommendation hiển thị (X5) — Covered — TC: 21

### Mua gói lúc đang trial
- [x] AC-18 — Mua gói lúc trial: giữ quyền lợi trial (hạn mức Advanced) đến hết 14 ngày (W1) — Covered — TC: 26, 39
- [x] AC-19 — Ngày charge là ngày trial kết thúc, không charge ngay; popup thành công dùng bản có ngày charge (W1, X15) — Covered — TC: 25, 28, 39 (case 25, 39 `<cần confirm>` nội dung popup lúc trial; popup xác nhận hiện ghi "immediate access")
- [x] AC-20 — Đến cuối trial charge thành công thì chuyển Active gói đã chọn, hạn mức theo gói đó — Covered — TC: 39

### Mua gói sau khi hết trial
- [x] AC-21 — Mua gói sau trial: popup thành công có ngày charge, tính năng mở khoá ngay (X15) — Covered — TC: 30, 38
- [x] AC-22 — Hạn mức hiển thị theo gói vừa mua — Covered — TC: 31
- [x] AC-23 — Thanh toán lỗi: hiển thị lỗi tại popup, không popup thành công, không trừ tiền, chưa mở khoá (X16) — Covered — TC: 27, 32 (`<cần confirm>` chữ thông báo lỗi)
- [~] AC-24 — Sau thanh toán lỗi cho thử lại và thử lại thành công (X16) — Partial — TC: 32 (chỉ thử lại thành công sau khi hết trial; case 27 lúc đang trial không có bước thử lại thành công)
- [x] AC-25 — Mua gói thì tất cả menu bị chặn mở khoá lại — Covered — TC: 38, 45

### Giữ dữ liệu, Storefront, auto sync, cài lại
- [x] AC-26 — Hết trial giữ nguyên dữ liệu và trạng thái (campaign, filter tree, Active), chỉ khoá tính năng (U6, X5) — Covered — TC: 34, 35, 38, 41
- [x] AC-27 — Store không có gói hiệu lực: Storefront dừng chạy (X5, U7) — Covered — TC: 41, 46
- [x] AC-28 — Store không có gói hiệu lực: auto sync dừng chạy, lượt đến hạn không chạy (X5) — Covered — TC: 48
- [x] AC-29 — Gỡ và cài lại app: trial có cấp lại hay không — Covered — TC: 36 (Blocked chờ BA: chưa có quy tắc cấp lại trial; expected chưa chốt, spec chưa có rule)

## Gợi ý bổ sung

- Đã áp dụng ngày 2026-10-28: trial tính từ lúc bấm Start; thêm case sync dở dang lúc hết trial và Storefront, auto sync chạy trong trial.
- AC-24: lúc đang trial chưa có bước thử lại thanh toán thành công sau lỗi.
- Case Blocked và `<cần confirm>` chờ BA (cài lại app, charge cuối trial thất bại, giờ charge cuối trial).
