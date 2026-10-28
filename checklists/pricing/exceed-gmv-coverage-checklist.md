# Coverage checklist - exceed-gmv

Nguồn: docs/specs/pricing-specs.md (mục 11.1, 12, 15, 16 gồm X3, X4, X5, X9; mục 16 ưu tiên cao nhất), docs/updates/pricing-updates.md (2026-10-26). Test case: test-cases/pricing/plan-lifecycle/exceed-gmv/exceed-gmv_testcase.csv, 44 case (cập nhật 2026-10-28, thêm case 11 và 12). Trial thuộc free-trial, không đưa vào. Kiểm lại từ đầu ngày 2026-10-28.

## Tổng quan

- Tổng số rule: 29
- Covered: 28
- Partial: 1
- Not covered: 0

## Chi tiết

- [x] AC-01 — Banner vượt hạn mức hiện khi Average GMV vượt trần gói, sau lần sync phát hiện — Covered — TC: 1, 3, 4
- [x] AC-02 — Không hiện banner khi GMV còn trong khoảng của gói (kể cả tăng mạnh) — Covered — TC: 2, 4
- [x] AC-03 — Nội dung banner đúng chữ Figma, không có nút, ngày {date} khớp khối Current plan — Covered — TC: 1, 13
- [x] AC-04 — Banner hiện ở mọi gói có trần (Starter đến Advanced), ghi đúng tên gói và khoảng GMV — Covered — TC: 3
- [x] AC-05 — Mốc biên bằng trần thuộc gói thấp hơn, chỉ vượt trần mới có banner — Covered — TC: 4
- [x] AC-06 — Average GMV là trung bình 3 tháng trước, không gồm tháng hiện tại — Covered — TC: 2, 10
- [x] AC-07 — GMV cập nhật sau mỗi sync; chưa sync thì chưa có banner — Covered — TC: 8
- [x] AC-08 — Sync thất bại thì không banner, giữ GMV của lần sync Success gần nhất — Covered — TC: 9
- [x] AC-09 — GMV quy đổi sang USD trước khi so với khoảng của gói (X9) — Covered — TC: 11 (nguồn tỷ giá `<cần confirm>`)
- [x] AC-10 — GMV cộng mọi channel (X9) — Covered — TC: 12
- [x] AC-11 — Tuần chờ tính từ lúc hệ thống phát hiện GMV vượt sau sync, không tính từ ngày vượt thực tế (X4) — Covered — TC: 19, 20 (Blocked: cần giả lập thời gian; mốc đủ 1 tuần `<cần confirm>`)
- [x] AC-12 — Trong tuần chờ vẫn dùng đầy đủ tính năng, Storefront chạy bình thường — Covered — TC: 14, 43
- [x] AC-13 — Banner nhắc hiện nhất quán trong suốt tuần chờ (X4) — Covered — TC: 27
- [x] AC-14 — Sync lặp trong tuần chờ không reset mốc 1 tuần — Covered — TC: 21 (Blocked; cách xử lý `<cần confirm>`)
- [x] AC-15 — Nâng gói trong tuần chờ áp dụng ngay, trả đủ giá gói mới, banner biến mất (W4, X1) — Covered — TC: 15, 25, 43
- [x] AC-16 — Gói thấp hơn GMV bị xám kèm tooltip "Current GMV exceeds this plan", không chọn được — Covered — TC: 1, 16, 25
- [x] AC-17 — Thanh toán lỗi khi nâng: lỗi tại popup, thử lại được, gói không đổi, mốc tuần chờ vẫn chạy (X16) — Covered — TC: 17
- [x] AC-18 — Không charge kép khi nâng gói từ 2 tab hoặc double click Confirm (X16) — Covered — TC: 18, 23
- [x] AC-19 — GMV tự giảm về trong khoảng thì banner mất, không suspend — Covered — TC: 22 (reset tuần chờ `<cần confirm>`)
- [x] AC-20 — Vượt GMV lần 2 sau khi đã nâng: banner hiện lại với gói mới, mốc tuần mới — Covered — TC: 26 (`<cần confirm>` mốc cũ)
- [x] AC-21 — Quá 1 tuần chưa nâng thì suspend; truy cập tính năng bị chặn bằng popup mỗi lần (X4, X5) — Covered — TC: 20, 28 (Blocked)
- [x] AC-22 — Popup "Your plan has been suspended" đúng chữ, bắt buộc xử lý, [Contact us] mở email (X3, X15) — Covered — TC: 28, 36, 44 (Blocked)
- [x] AC-23 — Khi suspend Storefront dừng chạy (search, filter, ranking campaign) (X5) — Covered — TC: 30 (Blocked)
- [x] AC-24 — Khi suspend auto sync dừng, Sync History không có lượt; Manual Sync bị chặn bằng popup (X5) — Covered — TC: 29, 31 (Blocked)
- [x] AC-25 — Khi suspend Dashboard, Help Center, Pricing mở được (X5) — Covered — TC: 32 (Blocked; áp cho suspend `<cần confirm>`)
- [x] AC-26 — Khi suspend dữ liệu (campaign, filter tree) giữ nguyên, chỉ khoá tính năng (X5) — Covered — TC: 33 (Blocked)
- [x] AC-27 — Mua gói trong lúc suspend không tự mở lại; chỉ mở khi admin xác nhận thanh toán (X3) — Covered — TC: 34 (Blocked; nút [Select plan] `<cần confirm>`)
- [x] AC-28 — Admin mở lại thủ công: popup mất, Storefront và auto sync chạy lại theo cấu hình cũ; sync bù cập nhật GMV, banner hiện lại nếu còn vượt (X3, X5, X9) — Covered — TC: 37 đến 40, 44 (Blocked; tuần chờ sau mở lại `<cần confirm>`)
- [~] AC-29 — Gửi email invoice: sau khi thanh toán, và 24 giờ trước ngày charge như chữ banner — Partial — TC: 41, 43 (chỉ có email sau thanh toán, Blocked chờ hộp thư test; email 24 giờ trước ngày charge chưa có case kiểm gửi thật, chỉ kiểm chữ banner ở TC 1, 13)

## Gợi ý bổ sung

- Đã áp dụng ngày 2026-10-28: suspend do job tự động; mốc 168 giờ; dòng "automatically charged" là nhắc nhở thanh toán tự động; thêm case suspend khi merchant không mở app và campaign tính lại sau khi mở lại.
- AC-29: email 24 giờ trước ngày charge mới kiểm ở mức chữ trên banner; email sau thanh toán Blocked chờ hộp thư test.
- Các case Blocked chờ môi trường giả lập thời gian, store suspended, quyền admin và hộp thư test.
