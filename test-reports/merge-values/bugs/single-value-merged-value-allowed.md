Title: [Filter - Merge Values] Cho phép tạo merged value chỉ với 1 value, không chặn tối thiểu 2

Link TCs: test-cases/filter/merge-values/merge-values_testcase.csv#TC38
Loại: Chưa xác định

Data test: https://stg-search.peasisoft.com/filter-node/merge-values, tài khoản info@peasisoft.com, value "blue_edit" (nhóm color)

Steps to reproduce:
1. Click [Create new] mở modal Create new merged value.
2. Tại bước 1 Choose values, chỉ tick đúng 1 value "blue_edit" (giữ mặc định dropdown nguồn All sources, không thao tác ô Search value).
3. Quan sát nút [Next].
4. Click [Next].
5. Tại bước 2, nhập "TC38 Test Single Value" vào ô Filter option.
6. Click [Save].

Actual:
- Bước 3: nút [Next] vẫn enable dù chỉ 1 value được chọn.
- Bước 4: chuyển sang bước 2 bình thường, preview hiển thị "Sample: blue_edit" → "Sample: (tên filter option)".
- Bước 6: Save thành công, hiện toast "Merged value created successfully!"; merged value mới xuất hiện ở Merged Value List chỉ với 1 value con "blue_edit", Filter option = "TC38 Test Single Value", Status = ON.

Expected:
- Chỉ chọn đúng 1 value phải chặn không cho sang bước 2 (yêu cầu tối thiểu 2 value để tạo merged value).

Link bug: chưa có - chờ tạo

---
Priority đề xuất: Cao — cho phép tạo dữ liệu vô nghĩa về mặt nghiệp vụ (merged value không gộp gì cả), không có cách tránh, ảnh hưởng mọi merchant dùng tính năng.
Căn cứ FE/BE: Chưa xác định — chưa kiểm tra Network request lúc Save để biết validate (min 2 value) có được gửi lên BE kiểm tra hay không.
Nguồn Expected: test-cases/filter/merge-values/merge-values_testcase.csv TC38, đối chiếu mục đích feature trong docs/specs/merge-values-specs.md (gộp nhiều value thành 1).
Điểm chờ xác nhận: Đã tạo 1 bản ghi rác "TC38 Test Single Value" trên staging — cần dọn dẹp.
