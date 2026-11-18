```
Title: [Search > Synonyms] Create synonym group chỉ nhập Unified synonyms bị chặn Save (Supporting synonyms thực ra là bắt buộc)

Link TCs: test-cases/search/synonyms/synonyms_testcase.csv (Case 23)
Loại: FE

Data test: Modal "Create new synonym group" tại https://stg-search.peasisoft.com/synonyms — SYNONYM GROUP NAME = "Shoes for man", Unified synonyms = "running shoes", Supporting synonyms giữ nguyên dòng trống mặc định

Steps to reproduce:
1. Vào Search > Synonyms, click [Create new].
2. Nhập SYNONYM GROUP NAME hợp lệ, VD "Shoes for man".
3. Nhập 1 Unified synonym "running shoes" rồi Enter.
4. Không đụng tới Supporting synonyms (giữ nguyên dòng trống mặc định).
5. Click [Save].

Actual:
- Save bị chặn (nút Save disabled sau khi trigger validate), hiện lỗi đỏ "Left term is required" và "Right terms is required" dưới dòng Supporting synonyms trống — không tạo được group.

Expected:
- Tạo thành công; Synonym Group mới xuất hiện ở List, Unified synonym vừa nhập được lưu.

Link bug: chưa có - chờ tạo
```

Priority đề xuất: Medium — chặn đúng theo bước test case happy-path cơ bản nhất của feature, nhưng có thể tránh được bằng cách luôn điền thêm Supporting synonyms.
Căn cứ FE/BE: Validate client-side hiện lỗi ngay khi bấm Save, không có network request nào được gửi đi khi Supporting trống — xác nhận là chặn ở FE.
Nguồn của Expected: Expected gốc trong test case Case 23 (viết theo giả định happy-path, tại thời điểm viết case chưa có câu trả lời cho câu hỏi mở #4 trong `docs/specs/search-synonyms-specs.md` mục 3.2 về field bắt buộc).

Điểm chờ xác nhận: Hành vi thực tế (Supporting synonyms bắt buộc tối thiểu 1 dòng đầy đủ) có thể là chủ đích thiết kế chứ không phải bug — cần BA xác nhận lại câu hỏi mở #4 trước khi kết luận đây là lỗi cần fix hay chỉ cần cập nhật lại test case/spec.
