```
Title: [Search > Synonyms] Nhấn Esc hoặc click vùng tối ngoài popup Delete không đóng được popup

Link TCs: test-cases/search/synonyms/synonyms_testcase.csv (Case 51)
Loại: FE

Data test: Popup "Delete synonym?" khi click icon Delete 1 Synonym Group, tại https://stg-search.peasisoft.com/synonyms

Steps to reproduce:
1. Vào Search > Synonyms, click icon Delete (thùng rác) ở cột Action của 1 dòng để mở popup "Delete synonym?".
2. Nhấn phím Esc.
3. Nếu popup vẫn còn, thử click vào vùng tối (overlay) bên ngoài popup.

Actual:
- Cả nhấn Esc và click vùng tối ngoài popup đều KHÔNG đóng được popup; popup vẫn hiển thị nguyên trạng. Chỉ bấm nút [Cancel] mới đóng được.

Expected:
- Popup phải đóng (coi như huỷ xoá, hành vi giống bấm [Cancel]); Synonym Group không bị xoá.

Link bug: chưa có - chờ tạo
```

Priority đề xuất: Low — không mất dữ liệu (Synonym Group không bị xoá), chỉ thiếu 2 cách tắt popup phụ, vẫn có cách tránh (bấm Cancel).
Căn cứ FE/BE: Hành vi đóng/không đóng modal là xử lý thuần FE (event handler cho phím Esc và overlay click), không liên quan dữ liệu/API.
Nguồn của Expected: Expected gốc Case 51 (theo pattern UX chuẩn cho modal/popup xác nhận).
