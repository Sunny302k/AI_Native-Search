Title: [Filter - Merge Values] Value đã thuộc merged value khác vẫn tick được ở dạng cây nhóm, chỉ chặn khi Save

Link TCs: test-cases/filter/merge-values/merge-values_testcase.csv#TC21
Loại: FE/BE chưa xác định

Data test: https://stg-search.peasisoft.com/filter-node/merge-values, merged value "something" (Status ON) đang chứa value "large" và "medium" (nhóm Product option "shoe size")

Steps to reproduce:
1. Mở modal Create new merged value.
2. Gõ "large" vào ô Search value → quan sát kết quả.
3. Xoá ô Search, tự mở rộng nhóm "shoe size" (không dùng ô Search), quan sát checkbox của "large"/"medium".
4. Tick chọn "large" + "medium" ở bước 3, bấm Next, chọn Filter option bất kỳ, bấm Save.

Actual:
- Bước 2: ô Search trả về "No values found." (value bị ẩn khỏi kết quả tìm kiếm, đúng như kỳ vọng không cho chọn lại).
- Bước 3: cùng giá trị "large"/"medium" đó lại hiện đầy đủ, checkbox KHÔNG bị disable, tick chọn được bình thường khi duyệt qua cây nhóm thay vì qua ô Search.
- Bước 4: đi hết bước 1 và bước 2 của modal bình thường, chỉ bị chặn ở bước Save với thông báo lỗi "large" is already part of the merged value "something". "medium" is already part of the merged value "something".

Expected:
- Theo test-cases/filter/merge-values/merge-values_testcase.csv TC21: value đã thuộc merged value khác phải ở trạng thái disable ngay tại bước chọn (bước 1), không tick chọn được, thay vì cho đi hết 2 bước rồi mới chặn ở Save.

Link bug: chưa có - chờ tạo
