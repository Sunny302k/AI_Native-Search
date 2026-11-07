Title: [Pricing] Nút "Upgrade now" ở sidebar điều hướng sang Dashboard thay vì màn Upgrade plan

Link TCs: test-cases/pricing/upgrade-plan/plan-recommendation/plan-recommendation_testcase.csv — case ID 54
Loại: FE

Data test: store Scale, GMV hiện tại 37k — https://stg-search.peasisoft.com/pricing

Steps to reproduce:
1. Đăng nhập Admin, đứng ở bất kỳ màn nào trong app (thử từ /pricing).
2. Click nút [Upgrade now] ở khối sidebar (dưới logo, trên khối menu Home).

Actual:
- Chuyển hướng sang trang Dashboard ("Welcome to Native AI Search, Ronin!", URL `/`), lặp lại 2 lần cho cùng kết quả.

Expected:
- Mở màn "Upgrade plan" (cùng URL `/pricing`) hiển thị khối Plan Recommendation và Compare plans, giống hành vi của nút [Upgrade plan] trên thẻ gói hiện tại.

Link bug: chưa có - chờ tạo trên GitHub
Priority đề xuất: High - đây là 1 trong 2 entry point chính dẫn vào màn nâng gói (theo spec Upgrade plan), sai hoàn toàn mục tiêu điều hướng, ảnh hưởng mọi merchant dùng sidebar để nâng gói
Căn cứ FE/BE: FE - khả năng cao link/route của nút trỏ sai đích, không phải lỗi dữ liệu; cần kiểm tra routing config để xác nhận
Nguồn Expected: test-cases/pricing/upgrade-plan/plan-recommendation/plan-recommendation_testcase.csv case 54, đối chiếu docs/specs/pricing-specs.md mục 11 "Màn Upgrade plan (bấm nút [Upgrade plan]) nằm cùng URL /pricing" — Upgrade now ở sidebar là entry point thứ hai dẫn tới cùng màn này
