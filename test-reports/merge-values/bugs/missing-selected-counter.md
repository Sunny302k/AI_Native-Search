Title: [Filter - Merge Values] Modal Create new - thiếu chữ đếm "X selected" ở panel Selected values

Link TCs: test-cases/filter/merge-values/merge-values_testcase.csv#TC17 (cùng lỗi với TC18, TC19)
Loại: FE

Data test: https://stg-search.peasisoft.com/filter-node/merge-values, modal Create new merged value, bước 1 Choose values

Steps to reproduce:
1. Mở modal Create new merged value.
2. Tick 3 value bất kỳ (VD large, medium, small ở nhóm shoe size).
3. Quan sát khu vực phía trên panel "Selected values".
4. Gỡ bớt 1 value, quan sát lại.
5. Bấm "Remove all", quan sát lại.

Actual:
- Không có bất kỳ chữ đếm nào dạng "N selected" ở các bước 3 tick 3 value, 2 value, hay 0 value.
- Khi 0 value: panel hiện text "No value selected." (không phải "0 selected").

Expected:
- Có counter hiển thị đúng số lượng đang chọn, dạng "3 selected" / "2 selected" / "0 selected" (theo test-cases/filter/merge-values/merge-values_testcase.csv TC14, TC17, TC18, TC19).

Link bug: chưa có - chờ tạo
