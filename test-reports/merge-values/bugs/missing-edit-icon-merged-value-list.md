Title: [Filter - Merge Values] Thiếu icon Edit ở cột Actions, Merged Value List chỉ có Delete

Link TCs: test-cases/filter/merge-values/merge-values_testcase.csv#TC8 (chặn luôn nhóm TC45-49)
Loại: FE

Data test: https://stg-search.peasisoft.com/filter-node/merge-values, tài khoản info@peasisoft.com, 2 merged value có sẵn ("something" Status ON, "merge black + blue" Status OFF)

Steps to reproduce:
1. Vào Filter > Merge Values.
2. Quan sát cột Actions ở bảng Merged Value List, với từng dòng dữ liệu.
3. Hover chuột vào từng dòng để kiểm tra icon có ẩn/hiện theo hover không.

Actual:
- Cột Actions chỉ có đúng 1 icon Delete (thùng rác), không có icon Edit (bút chì) ở bất kỳ trạng thái nào, kể cả khi hover vào dòng.

Expected:
- Đủ 4 cột theo thứ tự Status | Values | Filter option | Actions; cột Actions có icon Edit (bút chì) và icon Delete (thùng rác).

Link bug: chưa có - chờ tạo
