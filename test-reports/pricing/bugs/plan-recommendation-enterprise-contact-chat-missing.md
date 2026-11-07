Title: [Pricing - Plan Recommendation] Click Select plan / Contact us của Enterprise không mở popup chat hỗ trợ

Link TCs: test-cases/pricing/upgrade-plan/plan-recommendation/plan-recommendation_testcase.csv — case ID 47, 48
Loại: FE

Data test: store Scale, GMV hiện tại 37k — https://stg-search.peasisoft.com/pricing, màn Upgrade plan

Steps to reproduce:
1. Đăng nhập Admin, vào menu Pricing → [Upgrade plan].
2. Click nút [Select plan] của thẻ Enterprise.
3. Click chữ "Contact us" trên thẻ Enterprise.

Actual:
- Cả 2 thao tác đều không có phản ứng gì — không mở popup chat, không mở popup nào khác, không có log lỗi hiển thị trên UI.

Expected:
- Click [Select plan] hoặc "Contact us" của Enterprise phải mở popup chat để được hỗ trợ (không mở popup "Confirm your plan" vì Enterprise không có giá cố định).

Link bug: chưa có - chờ tạo trên GitHub
Priority đề xuất: Medium - chặn luồng liên hệ mua gói Enterprise, nhưng không ảnh hưởng gói khác và có thể merchant liên hệ qua kênh khác
Căn cứ FE/BE: Chưa xác định - cần Network tab để biết có request nào bắn đi khi click không, hay hoàn toàn không có handler
Nguồn Expected: test-cases/pricing/upgrade-plan/plan-recommendation/plan-recommendation_testcase.csv case 47 (viết từ quan sát trực tiếp trên staging trước đó, không có Figma/spec riêng cho khối Enterprise contact)
