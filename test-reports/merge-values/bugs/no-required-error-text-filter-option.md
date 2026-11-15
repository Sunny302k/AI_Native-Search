Title: [Filter - Merge Values] Không hiển thị lỗi required khi để trống Filter option

Link TCs: test-cases/filter/merge-values/merge-values_testcase.csv#TC40
Loại: FE

Data test: https://stg-search.peasisoft.com/filter-node/merge-values, tài khoản info@peasisoft.com, 2 value "blue_edit" + "green" (nhóm color)

Steps to reproduce:
1. Click [Create new], chọn 2 value "blue_edit" và "green" ở bước 1, click [Next].
2. Tại bước 2, để trống ô Filter option (không nhập gì).
3. Click vào ô Filter option rồi click ra ngoài (blur) để kích hoạt validate.
4. Quan sát ô Filter option và nút [Save].

Actual:
- Nút [Save] ở trạng thái disable (chặn lưu đúng) nhưng không hiển thị bất kỳ thông báo lỗi/text đỏ nào tại ô Filter option.

Expected:
- Để trống Filter option phải vừa chặn lưu vừa hiển thị lỗi required tại ô Filter option.

Link bug: chưa có - chờ tạo

---
Priority đề xuất: Thấp — không chặn chức năng chính (Save đã bị disable đúng), chỉ thiếu thông báo lý do.
Căn cứ FE/BE: FE — hành vi chặn đã đúng phía client, chỉ thiếu phần hiển thị text lỗi.
Nguồn Expected: test-cases/filter/merge-values/merge-values_testcase.csv TC40.
