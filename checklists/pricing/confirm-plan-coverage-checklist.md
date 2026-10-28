# Coverage checklist - confirm-plan

Nguồn: `docs/specs/pricing-specs.md` (mục 11 đến 16, ưu tiên mục 16: X1, X11, X15, X16), `docs/updates/pricing-updates.md`. Test case: `test-cases/pricing/upgrade-plan/confirm-plan/confirm-plan_testcase.csv` (26 case, ID 1 đến 26; dòng Purpose không tính; không có file matrix; không có case Blocked). Phạm vi: mua gói và đổi gói (popup Confirm your plan, Successful mua gói, Change plan?, nâng/hạ áp dụng ngay, trả đủ tiền gói mới, thanh toán lỗi và thử lại, đóng popup, double click, đổi gói khi có add-on). Ngoài phạm vi: huỷ gói (cancel-plan), Storefront và Filter Cache sau hạ gói (plan-limit), mua lúc đang trial (free-trial). Kiểm lại từ đầu, không dùng kết quả checklist cũ.

## Tổng quan
- Tổng số rule: 28
- Covered: 26
- Partial: 2
- Not covered: 0

## Chi tiết

- [x] AC-01 — Click [Select plan] khi chưa có gói mở popup Confirm your plan, giá trong popup khớp giá thẻ gói chọn (Starter $29 ... Advanced $499) — Covered — TC: 1, 5, 10
- [x] AC-02 — Nội dung popup Confirm your plan: chữ mô tả quyền truy cập ngay + giá/tháng, 2 nút [Cancel] và [Confirm] (mục 12.2) — Covered — TC: 10 (chữ ở case "Are you sure to select this plan? You'll get..." hơi khác Figma "You will get immediate access..."; nên đối chiếu lại)
- [x] AC-03 — [Confirm] mua gói thành công: hiện popup Successful, gói được kích hoạt — Covered — TC: 1
- [x] AC-04 — [Cancel] đóng popup Confirm your plan, không giao dịch, không có gói — Covered — TC: 2
- [x] AC-05 — Popup xác nhận mua gói đóng được bằng Esc và click nền như [Cancel] (X15) — Covered — TC: 6
- [x] AC-06 — Popup xác nhận Change plan? cũng đóng được (Esc, click nền) không giao dịch (X15 "popup xác nhận đóng được") — Covered — TC: 23
- [x] AC-07 — Popup Successful mua gói dùng bản có ngày charge: tiêu đề, "You are all set...", "{giá} will be charged on {ngày}", nút [Get start!] (X15) — Covered — TC: 15
- [x] AC-08 — Ngày charge trong popup khớp ngày ở dòng thông báo trừ tiền trên Pricing — Covered — TC: 13 (`<cần confirm>` quy tắc ngày charge; còn mở ngày Mar 06 hay Mar 05)
- [x] AC-09 — [Get start!] đóng popup và vào được tính năng không còn popup chặn — Covered — TC: 11
- [x] AC-10 — Sau mua thẻ gói đang dùng hiện "Selected" disabled; gói có khoảng GMV thấp hơn GMV bị xám kèm tooltip "Current GMV exceeds this plan" — Covered — TC: 12
- [x] AC-11 — Reload khi popup Successful: gói giữ nguyên, không charge lần 2 — Covered — TC: 14
- [x] AC-12 — Double click nhanh [Confirm] chỉ tạo 1 giao dịch (Confirm your plan, Change plan?) — Covered — TC: 7 (bước 3 là huỷ gói, thuộc cancel-plan, không tính)
- [x] AC-13 — Thanh toán lỗi khi mua gói (mất mạng, thẻ bị từ chối, chưa có thẻ): lỗi hiển thị tại popup, cho thử lại, gói không đổi, không trừ tiền (X16) — Covered — TC: 3, 4, 8 (`<cần confirm>` chữ lỗi và luồng nhập thẻ)
- [x] AC-14 — Thanh toán lỗi khi đổi gói ở popup Change plan?: lỗi tại popup, cho thử lại, gói giữ nguyên, không trừ tiền (X16) — Covered — TC: 18
- [x] AC-15 — Thử lại thành công sau lỗi khi mua gói: kích hoạt gói, chỉ 1 giao dịch thành công, không charge kép (X16) — Covered — TC: 9, 14
- [x] AC-17 — Khi đã có gói, click [Select plan] gói được phép mở popup Change plan? với chữ "Are you sure you want to switch to this plan? Your billing will be updated accordingly." và nút [Keep current], [Confirm] — Covered — TC: 16, 19, 24
- [x] AC-18 — [Keep current] đóng popup, gói giữ nguyên, không giao dịch — Covered — TC: 17, 19
- [x] AC-19 — Popup Change plan? dùng chung cho nâng và hạ, không nêu gói đích — Covered — TC: 24, 25 (`<cần confirm>` có cần nêu gói đích và hậu quả lock)
- [x] AC-20 — Gói có khoảng GMV thấp hơn GMV hiện tại bị xám, tooltip "Current GMV exceeds this plan", không mở popup; gói đang dùng "Selected" disabled — Covered — TC: 12, 19
- [x] AC-21 — Nâng gói áp dụng ngay (popup thành công, gói đang dùng đổi ngay) (X1, U11) — Covered — TC: 16, 26
- [x] AC-22 — Nâng gói: seller trả đủ tiền gói mới (Scale $249) trên hệ thống — Covered — TC: 16, 26
- [x] AC-23 — Nâng gói: hạn mức Monthly usage và tính năng mở theo gói mới ngay (VD campaign thứ 101) — Covered — TC: 16, 26
- [x] AC-24 — Hạ gói áp dụng ngay (X1) — Covered — TC: 20, 22
- [x] AC-25 — Hạ gói: seller trả đủ tiền gói mới (Growth $119) trên hệ thống (X1) — Covered — TC: 20
- [~] AC-26 — Hoàn tiền gói cũ do admin liên lạc qua chat, nằm ngoài hệ thống (X1) — Partial — TC: 16, 20, 26 (chỉ ghi ở Note; không có bước/expected kiểm giao diện không tự hoàn tiền hay thông báo hoàn tiền)
- [x] AC-27 — Nâng gói không ảnh hưởng add-on, add-on vẫn Activated (X11) — Covered — TC: 21
- [x] AC-28 — Hạ gói không ảnh hưởng add-on, add-on vẫn Activated (X11) — Covered — TC: 22
- [~] AC-29 — Thử lại thành công sau lỗi thanh toán khi đổi gói ở popup Change plan? (X16 "cho thử lại") — Partial — TC: 9 (Blocked chờ BA: chưa có luồng đổi thẻ)

## Gợi ý bổ sung

- Rule hạ gói rồi Storefront và Filter Cache, nâng gói mở lại mục lock thuộc task Plan Limit; rule chọn lại gói đã huỷ thuộc task Cancel Plan (đã bỏ khỏi checklist này).
- AC-26: quy trình hoàn tiền gói cũ do admin xử lý ngoài hệ thống, cần checklist quy trình riêng. AC-29: thử lại sau lỗi ở Change plan? Blocked chờ BA (chưa có luồng đổi thẻ).
- Cần xác nhận: Expected các case đổi gói ghi "hiện popup thành công", spec chỉ mô tả popup Successful của mua gói.
