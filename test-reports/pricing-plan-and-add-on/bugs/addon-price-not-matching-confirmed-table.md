Title: [Pricing - Additional add-on] Giá ở tiêu đề thẻ add-on không khớp bảng giá đã chốt (90/180/270/365 = $15/$30/$45/$60)

Link TCs: Plan and add-on #28
Loại: FE hoặc BE (chưa xác định — xem Căn cứ)

Data test: Store gói Scale, account info@peasisoft.com, staging https://stg-search.peasisoft.com/pricing. Thẻ "Access to Historical Analytics" và "Access to Refined Search Journey Historical Analytics", chưa mua add-on nào.

Steps to reproduce:
1. Mở Pricing, cuộn tới khối "Additional add-on".
2. Ở thẻ "Access to Refined Search Journey Historical Analytics", lần lượt chọn ở ô Select date range: 180 days, 270 days, 365 days. Đọc giá hiển thị ở tiêu đề thẻ (+$.../mo) sau mỗi lần chọn.
3. Ở thẻ "Access to Historical Analytics", quan sát giá hiển thị tại giá trị mặc định (365 days).

Actual:
- Thẻ Refined: 180 days hiển thị "+$15.00/mo" (mặc định ban đầu), chọn 270 days hiển thị "+$20.00/mo", chọn 365 days hiển thị "+$25.00/mo".
- Thẻ Historical Analytics: 365 days (mặc định) hiển thị "+$25.00/mo".

Expected:
- Theo bảng giá đã chốt (dùng chung cho cả 2 add-on): 90 days $15, 180 days $30, 270 days $45, 365 days $60. Giá ở tiêu đề thẻ phải đổi theo đúng bảng này khi đổi khoảng ngày.

Link bug: chưa có - chờ tạo

Priority đề xuất: High — hiển thị sai giá tiền trước khi merchant xác nhận mua, có thể gây hiểu nhầm số tiền sẽ bị trừ (ảnh hưởng trực tiếp tới quyết định thanh toán của merchant).
Căn cứ FE/BE: Chưa xác định — mới quan sát được số hiển thị trên tiêu đề thẻ sai so với bảng giá đã chốt; chưa kiểm tra response API hay giá trị thực tế sẽ bị trừ khi hoàn tất mua (do không được phép bấm Confirm để kiểm tra giao dịch thật).
Nguồn Expected: docs/specs/pricing-specs.md mục 16 rule X10 "Giá add-on theo khoảng ngày: 90 days $15, 180 days $30, 270 days $45, 365 days $60" (xác nhận người dùng 2026-10-26) + test case Plan and add-on ID 28.
Điểm chờ xác nhận: cần kiểm thêm popup "Confirm your add-on" và giao dịch thật xem có dùng đúng giá đã chốt không, hay chỉ sai ở tiêu đề thẻ hiển thị (không thực hiện được vì không được phép bấm Confirm trên store dùng thẻ thật).
