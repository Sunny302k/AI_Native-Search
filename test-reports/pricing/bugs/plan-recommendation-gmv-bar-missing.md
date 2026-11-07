Title: [Pricing - Plan Recommendation] Thanh GMV và highlight gói gợi ý không hiển thị trên màn Upgrade plan

Link TCs: test-cases/pricing/upgrade-plan/plan-recommendation/plan-recommendation_testcase.csv — case ID 1, 4, 5, 18, 20 (nhóm "Average GMV") và các case kiểm tra highlight gói gợi ý ở nhóm "Thẻ gói" / "[Select plan] và gói gợi ý theo GMV"
Loại: FE

Data test: store Scale, GMV hiện tại 37k — https://stg-search.peasisoft.com/pricing

Steps to reproduce:
1. Đăng nhập Admin, vào menu Pricing.
2. Click [Upgrade plan].
3. Quan sát khối "Recommended plan" phía trên bảng Compare plans.

Actual:
- Khối chỉ hiển thị 6 thẻ gói (Starter/Standard/Growth/Scale/Advanced/Enterprise) dạng tĩnh.
- Không có thanh GMV nào: không mốc 0/$25K/$75K/$200K/$600K/$1.5M, không núm hiển thị vị trí GMV hiện tại.
- Không thẻ gói nào được highlight là gói gợi ý (không viền cam, không icon/nhãn "Best Plan"), kể cả thẻ ứng với range chứa GMV hiện tại.

Expected:
- Có thanh GMV dạng chỉ-hiển-thị (không kéo được) với đủ 6 mốc và núm cố định đúng vị trí GMV hiện tại.
- 1 thẻ gói (range chứa GMV hiện tại) được highlight viền cam + icon/nhãn "Best Plan".

Link bug: <điền sau khi tạo trên GitHub>
