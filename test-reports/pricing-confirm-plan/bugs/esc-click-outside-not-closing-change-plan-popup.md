Title: [Pricing - Confirm plan] Esc và click nền không đóng được popup "Change plan?"

Link TCs: Confirm plan #23 (và #6, cùng rule)
Loại: FE

Data test: Store gói Scale, account info@peasisoft.com, staging https://stg-search.peasisoft.com/pricing. Precondition gốc của case yêu cầu store ở gói Growth; do không được phép thực hiện giao dịch đổi gói thật (thẻ thật), đã test thay bằng gói hiện tại của store (Scale) mở popup qua Select plan của Advanced — cơ chế đóng popup không phụ thuộc gói cụ thể nên kết quả vẫn phản ánh đúng hành vi cần kiểm.

Steps to reproduce:
1. Mở Pricing › Upgrade plan.
2. Click [Select plan] ở thẻ Advanced để mở popup "Change plan?".
3. Nhấn phím Esc.
4. Mở lại popup (click [Select plan] Advanced lần nữa), click vào vùng nền tối ngoài popup (backdrop).

Actual:
- Nhấn Esc (thử 2 lần liên tiếp): popup vẫn hiển thị nguyên trạng, không đóng.
- Click vào các vị trí khác nhau trên vùng nền tối (ví dụ khu sidebar bị che mờ): popup vẫn không đóng.
- Chỉ nút [Keep current] mới đóng được popup.

Expected:
- Nhấn Esc hoặc click vùng nền ngoài popup phải đóng popup giống như bấm [Keep current] (không có giao dịch).

Link bug: chưa có - chờ tạo

Priority đề xuất: Medium — không chặn luồng chính (vẫn đóng được bằng nút Keep current) nhưng sai hành vi UX chuẩn đã xác nhận, ảnh hưởng người dùng quen thao tác Esc/click ra ngoài để huỷ.
Căn cứ FE/BE: FE — hành vi xử lý sự kiện đóng modal trên giao diện, không liên quan dữ liệu/API.
Nguồn Expected: docs/specs/pricing-specs.md mục 17 rule X15 "Popup xác nhận và khảo sát đóng được" + test case Confirm plan ID 6 và 23.
