```
Title: [Search > Synonyms] Khi vừa trùng general term (nhóm khác) vừa trùng tag (cùng ô), chỉ hiện 1 trong 2 lỗi validate

Link TCs: test-cases/search/synonyms/synonyms_testcase.csv (Case 38)
Loại: BE/FE (phụ thuộc bug Case 34)

Data test: Synonym Group khác đã có Supporting general term = "shoes". Modal Create mới: Supporting general term = "shoes" (trùng), tag input phải nhập trùng 2 lần "nike air max"

Steps to reproduce:
1. Đảm bảo đã có 1 Synonym Group với Supporting general term = "shoes".
2. Mở modal Create new synonym group, nhập SYNONYM GROUP NAME + 1 Unified synonym hợp lệ.
3. Nhập "shoes" vào Supporting general term (trùng nhóm khác).
4. Nhập "nike air max" 2 lần (Enter sau mỗi lần) vào tag input phải của cùng 1 dòng.

Actual:
- Chỉ hiện lỗi "Synonym must be unique!" dưới tag input phải (do 2 tag trùng trong cùng ô). KHÔNG hiện lỗi "Synonym already existed!" dưới input trái dù general term "shoes" trùng với nhóm khác đã lưu.

Expected:
- Cả 2 lỗi hiện ĐỒNG THỜI: "Synonym already existed!" ở input trái, "Synonym must be unique!" ở tag input phải; chặn lưu, không che lấp nhau.

Link bug: chưa có - chờ tạo
```

Priority đề xuất: Low — là hệ quả trực tiếp của bug Case 34 (không validate trùng cross-group); fix Case 34 sẽ tự động fix case này.
Căn cứ FE/BE: Cùng nguyên nhân với Case 34 — validate general term không so sánh với dữ liệu đã lưu của nhóm khác.
Nguồn của Expected: Expected gốc Case 38 (dựa trên mô tả spec mục 3.1 về 2 tầng validate độc lập).

Điểm chờ xác nhận: Phụ thuộc kết luận của BA cho bug Case 34 — nếu xác nhận phạm vi validate chỉ trong modal là đúng thiết kế (không phải bug) thì case 38 cũng không phải bug, chỉ cần cập nhật lại Expected trong test case.
