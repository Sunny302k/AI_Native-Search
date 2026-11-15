Title: [Pricing - Compare plans] Hàng tên gói và nút Select không cố định khi cuộn bảng Compare plans

Link TCs: Compare plans #25 (https://docs.google.com/spreadsheets/d/12f1LqAFVZ-J4pUXMPUFBr4XgAY8PpbPuH7FuGS-ZOJE/edit?gid=184791467#gid=184791467)
Loại: FE

Data test: Store gói Scale, account info@peasisoft.com, staging https://stg-search.peasisoft.com/pricing

Steps to reproduce:
1. Mở Pricing › Upgrade plan, kéo tới bảng Compare plans.
2. Cuộn xuống qua các nhóm tính năng (Search, Merchandise, Navigation...).
3. Quan sát hàng tên gói (Starter, Standard, Growth, Scale, Advanced, Enterprise) và nút Select/Selected ở đầu bảng.

Actual:
- Hàng tên gói và nút Select/Selected cuộn ra khỏi viewport cùng nội dung bảng, không cố định ở đầu; đã xác nhận ở nhiều vị trí cuộn khác nhau (ngang nhóm Search, Navigation, Merchandise, Support).

Expected:
- Hàng tên gói và nút Select cố định (sticky) ở đầu khi cuộn, vẫn bấm được.

Link bug: chưa có - chờ tạo

Priority đề xuất: Medium — đúng thiết kế yêu cầu (Figma note "fix hàng feature row khi cuộn") nhưng không chặn luồng chọn gói chính, chỉ ảnh hưởng usability vì bảng dài 46 dòng.
Căn cứ FE/BE: FE — hành vi CSS/scroll container trên giao diện, không liên quan dữ liệu/API.
Nguồn Expected: Figma note "fix hàng feature row khi cuộn" (docs/specs/pricing-compare-plans-specs.md mục 25; test case Compare plans ID 25).
