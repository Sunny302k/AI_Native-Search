Title: [Filter - Merge Values] Không chặn Filter option vượt quá 255 ký tự khi nhập tay

Link TCs: test-cases/filter/merge-values/merge-values_testcase.csv#TC42
Loại: Chưa xác định

Data test: https://stg-search.peasisoft.com/filter-node/merge-values, tài khoản info@peasisoft.com, 2 value "blue_edit" + "green" (nhóm color), chuỗi 256 ký tự "a"

Steps to reproduce:
1. Click [Create new], chọn 2 value "blue_edit" và "green" ở bước 1, click [Next].
2. Tại bước 2, nhập vào ô Filter option 1 chuỗi dài 256 ký tự (chỉ gồm ký tự "a").
3. Quan sát ô input trong lúc gõ.
4. Click [Save].

Actual:
- Bước 3: ô input cho gõ đủ 256 ký tự, không bị cắt (maxlength), không hiện cảnh báo/đếm ký tự nào.
- Bước 4: Save thành công, hiện toast "Merged value created successfully!"; merged value mới xuất hiện trong Merged Value List với Filter option dài đủ 256 ký tự "a", Status = ON.

Expected:
- Nhập 256 ký tự phải bị chặn lưu, báo lỗi vượt giới hạn 255 ký tự.

Link bug: chưa có - chờ tạo

---
Priority đề xuất: Trung bình — không chặn luồng chính, nhưng cho phép dữ liệu vượt giới hạn thiết kế, có thể gây lỗi hiển thị/UX ở nơi khác.
Căn cứ FE/BE: Chưa xác định — chưa kiểm tra Network response lúc Save.
Nguồn Expected: test-cases/filter/merge-values/merge-values_testcase.csv TC37 (255 ký tự hợp lệ) và TC42 (256 ký tự phải bị chặn).
Điểm chờ xác nhận: Đã xoá bản ghi rác 256 ký tự trên staging sau khi phát hiện. Cùng nhóm với bug TC38 (thiếu validate min 2 value) — gợi ý kiểm tra tổng thể lớp validate của modal Create new merged value.
