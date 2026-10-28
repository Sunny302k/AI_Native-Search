# Coverage checklist - compare-plans

Đối chiếu ngược `docs/specs/pricing-compare-plans-specs.md` (ma trận 46 dòng, mục 11), `docs/specs/pricing-specs.md` (mục 3.2 và mục 16, X17) và `docs/updates/pricing-updates.md` với `test-cases/pricing/upgrade-plan/compare-plans/compare-plans_testcase.csv` (30 case: ID 1 đến 30, bỏ dòng Purpose). Kiểm lại từ đầu ngày 2026-10-28 bằng cách đọc từng case; không dựa checklist cũ. Hành vi chạm hạn mức của 7 dòng số/ngày thuộc task Plan Limit nên không tính ở đây. Kiểm ma trận qua 6 phiên theo gói (case 1 đến 6, mỗi phiên 34 dòng: 7 Search, 7 Merchandise, 10 Navigation, 6 Analytics, 2 Compliment, 2 Sync) + 7 case hiển thị dòng số/ngày (13 đến 18, 21) + 5 dòng Support (case 23). 34 + 7 + 5 = 46 dòng, không dòng nào bị bỏ sót theo từng gói.

## Tổng quan
- Tổng số rule: 34
- Covered: 34
- Partial: 0
- Not covered: 0

## Chi tiết

### Cấu trúc bảng
- [x] AC-01 — 6 cột gói đúng thứ tự Starter, Standard, Growth, Scale, Advanced, Enterprise; không có cột "Free" — Covered — TC: 24
- [x] AC-02 — 7 nhóm: Search, Merchandise, Navigation, Analytics, Compliment Features, Sync, Support — Covered — TC: 24
- [x] AC-03 — Đủ 46 dòng tính năng — Covered — TC: 24
- [x] AC-04 — Tên 46 dòng đúng chữ, đúng nhóm, kể cả "Smart URL Configuation" (sai chính tả trên Figma) — Covered — TC: 28 (Note còn `<cần confirm>` giữ nguyên hay sửa chính tả)
- [x] AC-05 — Mỗi ô ✓, ✗, số/chữ (Unlimited, Custom) hiển thị khớp ma trận — Covered — TC: 29, 13 đến 18, 21, 23

### Search (7 dòng)
- [x] AC-06 — #1 Smart Relevance, #2 Customizable Search Interface, #3 Autocomplete, #4 Spelling Correction, #5 CSS Customization: ✓ ở cả 6 gói, dùng được, không tooltip khoá — Covered — TC: 1, 2, 3, 4, 5, 6 (màn của #4 còn `<cần confirm>`)
- [x] AC-07 — #6 AI Synonyms Recognition ✗ ở Starter: khoá, tooltip "Plan limit reached. This feature is temporarily locked.", click không đổi — Covered — TC: 1, 8, 10 (màn Synonyms `<cần confirm>`)
- [x] AC-08 — #6 AI Synonyms Recognition ✓ ở Standard, Growth, Scale, Advanced, Enterprise — Covered — TC: 2, 3, 4, 5, 6, 7 (nâng gói mở khoá)
- [x] AC-09 — #7 AI-based Search Recommendation ✗ ở Starter: khoá kèm tooltip — Covered — TC: 1, 9 (màn Recommendation `<cần confirm>`)
- [x] AC-10 — #7 AI-based Search Recommendation ✓ ở Standard đến Enterprise — Covered — TC: 2, 3, 4, 5, 6

### Merchandise (9 dòng)
- [x] AC-11 — #8 Visual Editor, #9 Dynamic Product Ranking, #10 Search Merchandising, #13 Rule-based Product Arrangement, #14 Campaign Segmentation: ✓ ở cả 6 gói — Covered — TC: 1, 2, 3, 4, 5, 6
- [x] AC-12 — #11 Category-level Merchandising ✗ ở Starter: khoá kèm tooltip, không chọn trigger Category được — Covered — TC: 1, 11
- [x] AC-13 — #11 Category-level Merchandising ✓ ở Standard đến Enterprise — Covered — TC: 2, 3, 4, 5, 6
- [x] AC-14 — #16 Scheduled Campaign Automation ✗ ở Starter: khoá kèm tooltip — Covered — TC: 1, 12
- [x] AC-15 — #16 Scheduled Campaign Automation ✓ ở Standard đến Enterprise — Covered — TC: 2, 3, 4, 5, 6
- [x] AC-16 — #12 Active Merchandising Campaigns hiển thị 10, 40, 100, Unlimited, Unlimited, Unlimited — Covered — TC: 13
- [x] AC-17 — #15 Active Execution in Campaigns hiển thị 3, 5, 10, 10, 10, 10 — Covered — TC: 14

### Navigation (12 dòng)
- [x] AC-18 — #18, #20 đến #28 (10 dòng ✓: Pre-built Library, Options & Attributes, Swatch, Multi-level Category, Merging Values, Range Sliders, Display Customization, Search Box, Smart URL, Refine Box) dùng được ở cả 6 gói — Covered — TC: 1, 2, 3, 4, 5, 6 (màn của #25 `<cần confirm>`)
- [x] AC-19 — #17 Number of Filter Trees hiển thị 3, 10, 20, Unlimited, Unlimited, Unlimited — Covered — TC: 15
- [x] AC-20 — #19 Filter Nodes Custom Builder hiển thị 3, 10, 20, Unlimited, Unlimited, Unlimited — Covered — TC: 16

### Analytics (8 dòng)
- [x] AC-21 — #30, #31, #33, #34, #35, #36 (Search Performance, Query to Products, Filter Analytics, Search Behavior, Product Performance, GA4) ✓ ở cả 6 gói — Covered — TC: 1, 2, 3, 4, 5, 6 (màn Analytics/GA4 `<cần confirm>`)
- [x] AC-22 — #29 Analytics Date Range hiển thị 30, 90, 180, 270, 365 days, Custom — Covered — TC: 17
- [x] AC-23 — #32 Refined Search Journey Date Range hiển thị 7, 30, 60, 90, 180, 365 days — Covered — TC: 18

### Compliment Features (2 dòng)
- [x] AC-24 — #37 Variant display ✗ ở Starter, Standard, Growth, Scale: khoá 2 toggle SRP kèm tooltip (gồm điểm kiểm chứng Scale) — Covered — TC: 1, 2, 3, 4, 20
- [x] AC-25 — #37 Variant display ✓ ở Advanced, Enterprise; biên Scale lên Advanced mở khoá — Covered — TC: 5, 6, 19
- [x] AC-26 — #38 Notifications ✓ ở cả 6 gói — Covered — TC: 1, 2, 3, 4, 5, 6 (màn Notification `<cần confirm>`)

### Sync (3 dòng)
- [x] AC-27 — #39 Manual Sync ✓ ở cả 6 gói — Covered — TC: 1, 2, 3, 4, 5, 6
- [x] AC-28 — #41 Sync history ✓ ở cả 6 gói — Covered — TC: 1, 2, 3, 4, 5, 6
- [x] AC-29 — #40 Auto Sync frequency hiển thị 3 days, 1 day, 1 day, 1 day, 2 times/day, 3 times/day — Covered — TC: 21

### Support (5 dòng, chỉ kiểm hiển thị)
- [x] AC-30 — #42 Email Support ✓ ở cả 6 gói — Covered — TC: 23
- [x] AC-31 — #43 Premium Support Package ✗ Starter, Standard; ✓ từ Growth — Covered — TC: 23
- [x] AC-32 — #44 Customization Requests ✗ Starter, Standard, Growth; ✓ từ Scale — Covered — TC: 23
- [x] AC-33 — #45 Customer Success Manager ✗ Starter, Standard, Growth; ✓ từ Scale — Covered — TC: 23
- [x] AC-34 — #46 Dedicated Infrastructure ✗ Starter đến Advanced; ✓ Enterprise — Covered — TC: 23

## Gợi ý bổ sung
- Không có dòng nào trong 46 dòng bị bỏ trống ở gói nào: 6 phiên theo gói (TC 1 đến 6) đều chạy đủ 34 dòng kiểm được, Expected đúng ma trận (Starter khoá 5, Standard/Growth/Scale khoá Variant display, Advanced/Enterprise không khoá).
- Điểm yếu còn lại là chất lượng thông tin, không phải thiếu case: màn của Spelling Correction, AI Synonyms, AI Recommendation, Analytics, GA4, Notifications, Filter Display Customization còn `<cần confirm>` (PRC-30 đến 34); cách đặt gói trên môi trường test `<cần confirm>`; chính tả "Smart URL Configuation" chờ chốt.
- Các phiên theo gói gộp 34 dòng vào 1 case nên 1 lỗi ở 1 dòng làm fail cả case; nếu cần truy vết gọn hơn, tách theo nhóm bằng `create-functional-testcase`.
- Case ngoài phạm vi rule trong spec: TC 22 (quyền lợi Support thực nhận, Blocked chờ BA; spec nói Support chỉ kiểm hiển thị, nên case này chỉ giữ nếu BA cung cấp cách kiểm), TC 25 (sticky header), 26 (highlight cột gợi ý), 27 (ma trận không đổi theo gói), 30 (nút Selected/Select), TC 7 (nâng gói mở khoá không reload). Các case này lấy từ note Figma/mục 3.3, không có rule tương ứng trong hai file spec compare-plans nên không tính vào tổng.
- Không phát hiện Expected nào mâu thuẫn spec mục 16 hoặc ma trận.
