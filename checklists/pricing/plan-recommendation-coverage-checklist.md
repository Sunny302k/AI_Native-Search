# Coverage checklist - plan-recommendation

Đối chiếu ngược spec (`docs/specs/pricing-specs.md` mục 2, 3, 10 đến 16 trong đó mục 16 ưu tiên cao nhất; `docs/specs/pricing-compare-plans-specs.md`; `docs/updates/pricing-updates.md`) với `test-cases/pricing/upgrade-plan/plan-recommendation/plan-recommendation_testcase.csv` — 57 case (ID `1` đến `69`, không tính dòng Purpose), kiểm lại từ đầu ngày 2026-10-28 (gồm case mới TC 22, 26). Task không có file matrix. Các case thuộc task Compare plans (TC 50 đến 54, 56 đến 64: Select từ bảng, responsive, hàng tiêu đề cố định, ma trận tính năng) và case không gắn rule trong spec (TC 43 double click; TC 48 mở chat nhiều lần; TC 66 nút Upgrade now ở sidebar, spec không nhắc) không tính vào số rule.

## Tổng quan

- Tổng số rule: 47
- Covered: 37
- Partial: 10
- Not covered: 0

## Chi tiết

### Average GMV

- [x] AC-01 — Hiển thị "Your current average GMV/month" kèm icon ? và giá trị — Covered — TC: 18
- [x] AC-02 — Tooltip icon ?: "Calculated based on your latest average GMV on 3 months" — Covered — TC: 19
- [x] AC-03 — GMV = trung bình 3 tháng trước, không gồm tháng hiện tại (mục 10 P2, mục 16 X9) — Covered — TC: 6, 7
- [x] AC-04 — Sang tháng mới cửa sổ 3 tháng dịch 1 tháng — Covered — TC: 17
- [x] AC-05 — Đơn cũ hơn 3 tháng không tính vào GMV — Covered — TC: 8
- [x] AC-06 — GMV khớp Revenue BigCommerce sau khi đơn bị archive — Covered — TC: 13
- [x] AC-07 — GMV khớp Revenue BigCommerce sau khi hoàn tiền một phần — Covered — TC: 14
- [~] AC-08 — GMV quy đổi sang USD (store tiền tệ khác USD) — Partial — TC: 15 (Expected chỉ nói "quy đổi sang USD", không có giá trị GMV cụ thể theo tỷ giá nên chưa xác nhận được kết quả)
- [x] AC-09 — GMV cộng mọi channel — Covered — TC: 16
- [x] AC-10 — GMV cập nhật sau mỗi sync, không real-time (đơn mới chưa sync không đổi GMV) — Covered — TC: 6, 9
- [x] AC-11 — Sync Failed thì GMV giữ giá trị của lần Success gần nhất — Covered — TC: 11
- [~] AC-12 — Mở Pricing khi sync đang In Progress — Partial — TC: 10 (Note `<cần confirm>` hiển thị khi sync đang chạy; Expected suy luận)
- [x] AC-13 — Sync lặp không đổi dữ liệu thì GMV không cộng dồn — Covered — TC: 12
- [x] AC-14 — Tỷ lệ tăng trưởng 14.3% = so với 3 tháng liền trước (mục 10 P1), hiển thị mũi tên tăng — Covered — TC: 22
- [~] AC-15 — Tỷ lệ tăng trưởng khi GMV giảm (âm) — Partial — TC: 22 (bước 2; Expected "−10%", Note `<cần confirm>` định dạng và màu; spec chưa nêu)
- [x] AC-16 — Thanh GMV có mốc 0, $25K, $75K, $200K, $600K, $1.5M; núm đúng vị trí GMV, phần trước núm tô cam — Covered — TC: 20
- [x] AC-17 — Thanh GMV chỉ hiển thị, không kéo được (mục 15 W3) — Covered — TC: 1
- [x] AC-18 — GMV = 0 thì núm ở mốc 0, Starter được gợi ý, không nút nào xám — Covered — TC: 4
- [x] AC-19 — GMV trên $1.5M thì núm ở cuối thanh, Enterprise được gợi ý — Covered — TC: 5
- [~] AC-20 — Định dạng số GMV rút gọn (70k, 85k) — Partial — TC: 21 (spec chỉ cho ví dụ "70k"; quy ước 950 / 1.25M là `<cần confirm>`)
- [~] AC-21 — Dữ liệu Pricing (GET /api/pricing) lỗi hoặc đang tải thì không hiện giá trị sai — Partial — TC: 2, 3 (spec chỉ ghi API có lúc treo; trạng thái lỗi và loading là `<cần confirm>`)

### Thẻ gói

- [x] AC-22 — 6 thẻ gói hiển thị đúng tên, range GMV, mô tả, giá (mục 3.1) — Covered — TC: 23
- [x] AC-23 — Thẻ Enterprise hiển thị "Contact us" thay giá — Covered — TC: 23
- [~] AC-24 — Hover thẻ gói thì highlight (Figma note N1) — Partial — TC: 24 (Blocked chờ designer: bước 3 chưa có thiết kế hover cho thẻ xám; bước 1, 2 chạy được)
- [x] AC-25 — Gói gợi ý có nhãn/icon, 5 thẻ còn lại không có (C5, U3) — Covered — TC: 25
- [x] AC-26 — Dòng giới thiệu "You only pay fees based on the actual value and revenue your store generates." — Covered — TC: 26

### Gói gợi ý theo GMV

- [x] AC-27 — Mỗi range GMV (đến $25K, $25K–$75K, $75K–$200K, $200K–$600K, $600K–$1.5M, trên $1.5M) highlight đúng 1 gói gợi ý — Covered — TC: 32
- [x] AC-28 — Cột gói gợi ý trong Compare plans được highlight (Figma note N2) — Covered — TC: 32
- [x] AC-29 — Mốc biên $25K thuộc gói thấp hơn (25,000 là Starter, 25,001 là Standard) (mục 10 P4) — Covered — TC: 38
- [~] AC-30 — Mốc biên $75K, $200K, $600K, $1.5M thuộc gói thấp hơn — Partial — TC: 39 đến 42 (spec chỉ ghi "suy theo cùng quy tắc"; Note các case `<cần confirm>`, BA chưa xác nhận riêng từng mốc)
- [x] AC-31 — GMV tăng vượt mốc sau sync thì gợi ý chuyển lên gói cao hơn và gói thấp chuyển xám — Covered — TC: 45
- [x] AC-32 — GMV giảm dưới mốc sau sync thì gợi ý hạ xuống và nút gói đó bấm được lại — Covered — TC: 46

### Nút Select plan

- [x] AC-33 — Gói có mức GMV tối đa thấp hơn GMV hiện tại thì nút [Select plan] xám, disabled (R6) — Covered — TC: 32
- [x] AC-34 — Hover nút xám hiện tooltip "Current GMV exceeds this plan" — Covered — TC: 35, 36
- [x] AC-35 — Click nút xám không mở popup, không đổi trạng thái — Covered — TC: 36
- [x] AC-36 — Gói cùng range hoặc cao hơn GMV bấm được, kể cả gói cao hơn gói gợi ý (mục 13 U1) — Covered — TC: 32 đến 34
- [x] AC-37 — Click [Select plan] của gói được phép mở popup "Confirm your plan" (giá, Cancel, Confirm) — Covered — TC: 33, 34
- [x] AC-38 — Cancel popup xác nhận thì không mua gói, trạng thái giữ nguyên — Covered — TC: 37
- [x] AC-39 — Gói đang dùng hiển thị "Selected", disabled (R3) — Covered — TC: 35, 44
- [~] AC-40 — Gói đang dùng khác gói gợi ý (Scale, GMV 70k): gợi ý Standard, Scale Selected — Partial — TC: 44 (Note `<cần confirm>` hiển thị khi gói đang dùng khác gói gợi ý)
- [~] AC-41 — GMV vượt khoảng gói đang dùng sau sync: gói đang dùng vẫn Selected, gói thấp xám kèm tooltip (mục 12.3) — Partial — TC: 57 (không kiểm tooltip trên gói xám; tỷ lệ tăng trưởng trong banner `<cần confirm>`; banner thuộc task Exceed GMV)

### Enterprise

- [x] AC-42 — [Select plan] của Enterprise mở popup chat, không mở "Confirm your plan" (N3, N5, U2) — Covered — TC: 47
- [x] AC-43 — Click "Contact us" trên thẻ Enterprise mở popup chat (N3, N5) — Covered — TC: 47
- [x] AC-44 — Nút [Select plan] của Enterprise bấm được khi GMV thấp — Covered — TC: 49

### Màn Upgrade plan

- [x] AC-45 — Click [Upgrade plan] mở màn Upgrade plan có nút back, Plan Recommendation và Compare plans — Covered — TC: 53
- [x] AC-46 — Nút back quay về trang Pricing Plan, không đổi gói — Covered — TC: 55
- [~] AC-47 — Màn Upgrade plan nằm cùng URL /pricing; hành vi khi reload — Partial — TC: 56 (Blocked chờ dev: Expected hai nhánh, `<cần confirm>` URL và hành vi reload)

## Gợi ý bổ sung

- Phần lớn Partial chờ BA hoặc Designer chốt: hiển thị khi sync đang chạy, quy ước rút gọn số GMV, định dạng tăng trưởng âm, trạng thái lỗi và loading, hover thẻ xám, 4 mốc biên suy theo quy tắc $25K, URL màn Upgrade plan.
- Khối gói gợi ý lớn trên Figma (badge Best Plan cùng 6 dòng check, mục All plans): chưa thể đối chiếu vì ảnh render của node 2144:26381 chỉ ra 1x1 pixel; cần ảnh chụp từ người dùng trước khi viết case.
- Các case về bảng Compare plans đã chuyển sang task Compare plans (còn lại: Select từ bảng, Select gói thấp hơn GMV, thu nhỏ cửa sổ).
