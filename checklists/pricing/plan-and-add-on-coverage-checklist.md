# Coverage checklist - plan-and-add-on

Nguồn: docs/specs/pricing-specs.md (mục 2, 11 đến 16; mục 16 ưu tiên cao nhất), docs/updates/pricing-updates.md (đợt 2, 2026-10-26). Test case: test-cases/pricing/current-plan/plan-and-add-on/plan-and-add-on_testcase.csv (49 case, ID 1 đến 49). Audit lại từ đầu ngày 2026-10-28. Không gồm phần huỷ gói (cancel-plan).

## Tổng quan

- Tổng số rule: 48
- Covered: 47
- Partial: 1
- Not covered: 0

Đối chiếu giá: mọi giá $ trong Expected (TC 24, 26, 32, 35, 37, 38, 45, 47, 49) khớp bảng X10 (90 $15, 180 $30, 270 $45, 365 $60) và giá gói Growth $119; không có Expected mâu thuẫn spec mục 16.

## Chi tiết

- [x] AC-01 — Nút Upgrade plan mở màn Upgrade plan (cùng URL), quay lại về trang Pricing — Covered — TC: 1
- [x] AC-02 — Store chưa có gói: chỉ Plan Recommendation + Compare plans, không có Current plan, Monthly usage, Additional add-on — Covered — TC: 2
- [x] AC-03 — Store đã huỷ/hết kỳ hiển thị giống chưa đăng ký (X5) — Covered — TC: 3 (Blocked: chờ môi trường giả lập thời gian)
- [x] AC-04 — Khối Current plan: tên gói, dòng Monthly usage, nút Upgrade plan, nút ⋮, không hiện giá — Covered — TC: 4
- [x] AC-05 — Menu ⋮ chỉ có mục Cancel plan — Covered — TC: 5
- [x] AC-06 — Badge gói ở sidebar khớp gói đang dùng — Covered — TC: 6 (<cần confirm> chữ badge, PRC-28)
- [x] AC-07 — Hiển thị Your current average GMV/month kèm tỷ lệ tăng trưởng (110k, 35%), là trung bình 3 tháng trước — Covered — TC: 11
- [x] AC-08 — Tăng trưởng âm hiển thị dấu âm/màu khác — Covered — TC: 7 (<cần confirm> định dạng và màu)
- [x] AC-09 — Tăng trưởng khi kỳ trước 0 hoặc store chưa có đơn không hiện NaN/Infinity/undefined — Covered — TC: 8, 9 (<cần confirm> giá trị hiển thị)
- [x] AC-11 — GMV và tăng trưởng ở Current plan khớp Plan Recommendation — Covered — TC: 10
- [x] AC-12 — Tooltip icon ? "Calculated based on your latest average GMV on 3 months" — Covered — TC: 12
- [x] AC-13 — Không có nút bật/tắt tự thanh toán (V6) — Covered — TC: 13
- [x] AC-14 — Trừ tiền lúc 00:00 UTC (V6) — Covered — TC: 14 (Blocked: chờ giả lập thời gian + sandbox thanh toán)
- [x] AC-15 — Ngày trừ là hôm nay thì không gửi email 24 giờ trước (V6) — Covered — TC: 15 (Blocked: chờ hộp thư test)
- [x] AC-16 — Sau huỷ gói dừng tự thanh toán, không có giao dịch ngày gia hạn (U12) — Covered — TC: 16 (<cần confirm> dòng "automatically charged on …" sau huỷ)
- [x] AC-17 — Nội dung dòng thông báo trừ tiền và ngày trừ khớp ngày gia hạn — Covered — TC: 17
- [x] AC-18 — Email invoice gửi 24 giờ trước ngày trừ, nội dung gói/số tiền/ngày — Covered — TC: 49 (Blocked: chờ hộp thư test + giả lập thời gian; <cần confirm> nội dung email)
- [x] AC-19 — "Need more ?" cuộn tới khối Additional add-on, URL không đổi, không popup (V4) — Covered — TC: 18
- [x] AC-20 — Icon tròn tô theo tỷ lệ đã dùng/hạn mức (0%, 50%, 100%) — Covered — TC: 19
- [x] AC-21 — Hạn mức Unlimited: vòng rỗng, không tô — Covered — TC: 21
- [x] AC-22 — Monthly usage có 7 dòng chia 4 nhóm (Merchandise 2, Navigation 2, Analytics 2, Sync 1) dạng đã dùng/hạn mức kèm icon (X13) — Covered — TC: 20
- [x] AC-23 — Chỉ 2 dòng Analytics và Refined Search Journey Analytics có "Need more ?" — Covered — TC: 22
- [x] AC-24 — Dòng đủ hạn mức có icon khoá và nhãn Locked, hết đủ thì mất nhãn; dòng Analytics không có nhãn (X13) — Covered — TC: 23
- [x] AC-25 — Tooltip "Limit reached. This feature is temporarily locked." ở dòng Locked (Figma 12.3) — Covered — TC: 23
- [x] AC-26 — Bảng giá add-on 90/180/270/365 = $15/$30/$45/$60, dùng chung 2 thẻ, giá ở tiêu đề thẻ đổi theo khoảng chọn (X10) — Covered — TC: 28, 45
- [~] AC-27 — Dropdown Select date range có 90, 180, 270, 365 days và Custom date range (N7) — Partial — TC: 28, 32 — đã kiểm 4 giá trị; Custom date range chưa có case (hoãn, chưa có giá và cách nhập, TC 32 ghi <cần confirm>)
- [x] AC-28 — Giá trị mặc định ô Select date range — Covered — TC: 46 (<cần confirm>: Figma 270, staging 365, Refined 180)
- [x] AC-29 — Hai thẻ add-on đúng tên, mô tả, ô Select date range, nút Buy add-on — Covered — TC: 45
- [x] AC-30 — Popup "Confirm your add-on" ghi đúng số ngày và giá, có Cancel/Confirm — Covered — TC: 24, 26, 32
- [x] AC-31 — Popup "Successful!" ghi số ngày, giá, ngày charge, nút Get start! — Covered — TC: 24, 26
- [x] AC-32 — Sau mua nút đổi thành "Activated" disabled, click không mở popup — Covered — TC: 24, 34 (<cần confirm> ô Select date range có khoá)
- [x] AC-33 — Mua add-on Refined Search Journey Analytics (180 days $30) — Covered — TC: 26
- [x] AC-34 — Sau mua, dòng Analytics/Refined ở Monthly usage cập nhật theo khoảng add-on kèm Activated, Renewed on, Cancel (N6, X12) — Covered — TC: 25, 26, 47
- [x] AC-35 — Có add-on thì Apply khoảng ngày mở rộng không popup; hết add-on bị chặn theo hạn mức gói — Covered — TC: 41, 47, 48
- [x] AC-36 — Huỷ add-on: popup "Cancel add-on?", Yes cancel, popup thành công, giữ truy cập đến hết kỳ; Keep current giữ nguyên — Covered — TC: 27, 31, 40 (<cần confirm> câu popup thành công, PRC-35)
- [x] AC-37 — Sau huỷ add-on không gia hạn, hết kỳ không trừ tiền — Covered — TC: 48 (Blocked: chờ giả lập thời gian; <cần confirm> thời điểm hết hiệu lực)
- [x] AC-38 — Hiển thị dòng Analytics sau khi huỷ, trước hết kỳ — Covered — TC: 41 (<cần confirm> còn Renewed on hay ngày hết hạn)
- [x] AC-39 — Bấm Cancel ở popup xác nhận mua: đóng popup, không giao dịch — Covered — TC: 29
- [x] AC-40 — Thanh toán add-on lỗi: hiển thị lỗi tại popup, cho thử lại, không giao dịch (X16) — Covered — TC: 30 (<cần confirm> chữ thông báo lỗi)
- [x] AC-41 — Double click Confirm chỉ 1 giao dịch ($45) và 1 popup thành công — Covered — TC: 35
- [x] AC-42 — Hai add-on độc lập nhau, mỗi cái ngày Renewed riêng — Covered — TC: 33
- [x] AC-43 — Nâng gói không ảnh hưởng add-on (vẫn Activated, vẫn trừ $45) (X11) — Covered — TC: 38
- [x] AC-44 — Hạ gói không ảnh hưởng add-on (X11) — Covered — TC: 43
- [x] AC-46 — Mua add-on khoảng thấp hơn hạn mức gói (Growth 180, mua 90) (X11) — Covered — TC: 37 (<cần confirm> dòng Analytics hiển thị 90 hay 180)
- [x] AC-47 — Add-on tự gia hạn hằng tháng, Renewed on chuyển kỳ sau — Covered — TC: 42, 47 (Blocked: chờ giả lập thời gian)
- [x] AC-48 — Ngày charge (popup), Renewed on và ngày trên banner nhất quán — Covered — TC: 36 (<cần confirm> Mar 06 hay Mar 05, PRC-48)
- [x] AC-49 — Store chưa có gói không có khối add-on nên không mua được — Covered — TC:  (<cần confirm> store đã huỷ còn trong kỳ)
- [x] AC-50 — Huỷ rồi mua lại add-on trong cùng kỳ, không charge kép — Covered — TC: 39 (Blocked: chờ BA quy tắc kích hoạt lại add-on)

## Gợi ý bổ sung

- Add-on chặn mua khoảng nhỏ hơn hoặc bằng hạn mức gói (đã xác nhận 2026-10-28); cách chặn (ẩn tuỳ chọn hay vô hiệu hoá nút) còn `<cần confirm>`.
- Add-on khi gói hết kỳ còn bị trừ tiền không: chờ BA. Rule GMV và huỷ gói khi có add-on được kiểm ở Plan Recommendation, Exceed GMV và Cancel Plan, đã bỏ khỏi checklist này.
- Custom date range đang hoãn; TC 46 (giá trị mặc định ô Select date range) chưa có rule, giữ `<cần confirm>`.
