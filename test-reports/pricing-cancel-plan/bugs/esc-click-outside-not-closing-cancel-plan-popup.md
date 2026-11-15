Title: [Pricing - Cancel plan] Esc và click nền không đóng được popup "Cancel Scale Plan?"

Link TCs: Cancel plan #7 (và #5, cùng rule)
Loại: FE

Data test: Store gói Scale, account info@peasisoft.com, staging https://stg-search.peasisoft.com/pricing. Precondition gốc yêu cầu store gói Growth với popup "Cancel Growth Plan?"; đã test thay bằng gói hiện tại Scale (popup "Cancel Scale Plan?") vì cơ chế đóng popup không phụ thuộc gói cụ thể. Đây là cùng triệu chứng với bug đã log ở Confirm plan #23 (popup "Change plan?" cũng không đóng được bằng Esc/click nền) — nghi vấn lỗi chung cho các popup xác nhận trong module Pricing.

Steps to reproduce:
1. Mở Pricing.
2. Click nút ⋮ cạnh [Upgrade plan], chọn "Cancel plan" để mở popup "Cancel Scale Plan?".
3. Nhấn phím Esc.
4. Mở lại popup, click vào vùng nền tối ngoài popup (backdrop).

Actual:
- Cả Esc và click nền đều không đóng được popup "Cancel Scale Plan?" — popup vẫn hiển thị nguyên trạng với 2 nút [Yes, cancel] và [Keep current].
- Chỉ nút [Keep current] mới đóng được popup.

Expected:
- Nhấn Esc hoặc click vùng nền ngoài popup phải đóng popup, không mở khảo sát, không huỷ gói.

Link bug: chưa có - chờ tạo

Priority đề xuất: Medium — cùng mức độ với bug Confirm plan #23, không chặn luồng chính nhưng sai hành vi UX chuẩn; gợi ý dev kiểm tra chung component Modal/Dialog dùng cho cả 2 popup "Change plan?" và "Cancel plan?" vì cùng triệu chứng.
Căn cứ FE/BE: FE — hành vi xử lý sự kiện đóng modal trên giao diện, không liên quan dữ liệu/API.
Nguồn Expected: docs/specs/pricing-specs.md mục 17 rule X15 "Popup xác nhận và khảo sát đóng được" + test case Cancel plan ID 5 và 7.
