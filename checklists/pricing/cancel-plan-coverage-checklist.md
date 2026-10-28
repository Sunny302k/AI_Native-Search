# Coverage checklist - cancel-plan

Nguồn: docs/specs/pricing-specs.md (mục 11 đến 16, ưu tiên mục 16: X5, X6, X15, X16), docs/updates/pricing-updates.md (2026-10-26); test-cases/pricing/current-plan/cancel-plan/cancel-plan_testcase.csv (24 case, TC 1 đến 21; đã gồm 4 case thêm ngày 2026-10-28: TC 7, 14, 15, 21). Kiểm lại từ đầu ngày 2026-10-28. Mua/đổi gói thuộc confirm-plan, không đưa vào.

## Tổng quan

- Tổng số rule: 27
- Covered: 25
- Partial: 2
- Not covered: 0

## Chi tiết

- [x] AC-01 — Menu ⋮ › Cancel plan mở popup "Cancel {tên gói} Plan?" — Covered — TC: 3, 19
- [x] AC-02 — Tiêu đề popup đổi theo gói đang dùng (Starter, Standard, Growth, Scale, Advanced); Enterprise chưa rõ (`<cần confirm>`) — Covered — TC: 8
- [x] AC-03 — Nội dung popup (Are you sure… keep access until end of billing period), 2 nút [Yes, cancel] và [Keep current] nhấn mạnh — Covered — TC: 19
- [x] AC-04 — [Keep current] đóng popup, gói giữ nguyên, không mở khảo sát, không đổi ngày trừ tiền — Covered — TC: 3
- [x] AC-05 — Popup xác nhận đóng được bằng Esc/click nền, không huỷ gói (X15) — Covered — TC: 7
- [x] AC-06 — [Yes, cancel] mở khảo sát "Before you go…"; gói chưa huỷ tới khi xác nhận — Covered — TC: 1
- [x] AC-07 — Khảo sát có đúng 8 lý do, lúc mở chưa tick, có nút [Confirm to cancel] — Covered — TC: 1, 20
- [x] AC-08 — Bắt buộc tick ít nhất 1 lý do; chưa tick thì [Confirm to cancel] disabled, bỏ tick thì disabled lại (X6) — Covered — TC: 4
- [x] AC-09 — Tick lý do thì hiện ô nhập "Tell me more about your experience…" — Covered — TC: 2, 20
- [x] AC-10 — Chọn nhiều lý do cùng lúc; số ô nhập chưa chốt (`<cần confirm>`) — Covered — TC: 9
- [x] AC-11 — Ô nhập chấp nhận nội dung dài, emoji, tiếng Việt, chuỗi script; giới hạn độ dài chưa chốt (`<cần confirm>`) — Covered — TC: 10
- [x] AC-12 — Khảo sát đóng được bằng Esc/click nền, đóng không coi là huỷ gói (X15) — Covered — TC: 5
- [x] AC-13 — [Confirm to cancel] mở popup "Successful!" nội dung "Your plan is cancelled… remains active until {ngày}", nút [OK] — Covered — TC: 2, 21
- [x] AC-14 — Ngày hết kỳ trong popup đúng ngày kết thúc kỳ hiện tại (ngày cuối kỳ hay đầu kỳ kế: `<cần confirm>`) — Covered — TC: 11
- [x] AC-15 — [OK] đóng popup; sau huỷ vẫn dùng đầy đủ tính năng đến hết kỳ — Covered — TC: 2, 21 (TC 21 Blocked, chờ môi trường giả lập thời gian)
- [x] AC-16 — Huỷ gói dừng tự thanh toán, hết kỳ không có giao dịch kỳ mới (U12) — Covered — TC: 21 (Blocked, chờ giả lập thời gian)
- [~] AC-17 — Menu ⋮ và thẻ gói sau huỷ còn trong kỳ hiển thị trạng thái đã huỷ — Partial — TC: 12. Blocked chờ designer (chưa có frame); Expected chung chung ("không cho huỷ lần hai" chưa có trong spec), chưa verify được nội dung cụ thể
- [x] AC-18 — Mất mạng khi [Confirm to cancel]: lỗi tại popup, cho thử lại, không hiện Successful, trạng thái gói không lệch (chữ lỗi: `<cần confirm>`) — Covered — TC: 6
- [x] AC-19 — Thử lại sau lỗi thì huỷ thành công, chỉ huỷ 1 lần — Covered — TC: 14
- [x] AC-20 — Sau hết kỳ: store hiển thị như chưa đăng ký, truy cập tính năng bị chặn bằng popup (X5) — Covered — TC: 15, 22 (Blocked, chờ store hết kỳ)
- [x] AC-21 — Sau hết kỳ: Storefront (search, filter) dừng chạy (X5) — Covered — TC: 22 (Blocked)
- [x] AC-22 — Sau hết kỳ: auto sync dừng, Sync History không có lượt mới (X5) — Covered — TC: 22, 24 (Blocked, chờ giả lập thời gian)
- [x] AC-23 — Sau hết kỳ: Dashboard và Help Center mở bình thường, Pricing mở được (X5) — Covered — TC: 22 (Blocked)
- [x] AC-24 — Sau hết kỳ: dữ liệu campaign, filter tree giữ nguyên (X5) — Covered — TC: 22 (Blocked)
- [x] AC-25 — Huỷ gói khi có add-on: add-on độc lập, không bị huỷ theo (X11); add-on còn dùng khi gói hết kỳ là `<cần confirm>` — Covered — TC: 23
- [~] AC-26 — Chọn lại gói sau huỷ trước hết kỳ được, không charge kép trong cùng kỳ (X16) — Partial — TC: 13. TC chỉ dừng ở mở popup Confirm your plan, không bước [Confirm] và không kiểm số giao dịch nên chưa chứng minh "không charge kép"
- [x] AC-27 — Chọn lại gói sau hết kỳ được, thành công, chỉ 1 giao dịch (X16) — Covered — TC: 15 (Blocked, chờ store đã hết kỳ)

## Gợi ý bổ sung

- Đã bổ sung ngày 2026-10-28: double click Confirm to cancel, huỷ ở tab A khi tab B nâng gói, huỷ khi plan suspend (Blocked chờ BA); case chọn lại gói trước hết kỳ nay Blocked chờ designer (chưa có frame trạng thái đã huỷ còn trong kỳ).
- Còn thiếu so với spec: nơi lưu hoặc gửi lý do huỷ, huỷ gói Enterprise.
- Các case Blocked cần môi trường giả lập thời gian và store đã hết kỳ.
