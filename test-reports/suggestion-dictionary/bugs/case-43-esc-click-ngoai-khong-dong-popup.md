```
Title: [Search > Suggestion Dictionary] Nhấn Esc hoặc click vùng tối ngoài popup Delete không đóng được popup

Link TCs: test-cases/search/suggestion-dictionary/suggestion-dictionary_testcase.csv (Case 43)
Loại: FE

Data test: Popup "Delete suggestion?" khi click icon Delete 1 suggestion, tại https://stg-search.peasisoft.com/suggestion-dictionary

Steps to reproduce:
1. Bật chế độ Edit, click icon Delete để mở popup "Delete suggestion?".
2. Nhấn phím Esc.
3. Nếu popup vẫn còn, thử click vào vùng tối bên ngoài popup.

Actual:
- Cả nhấn Esc và click vùng tối ngoài popup đều KHÔNG đóng được popup; popup vẫn hiển thị nguyên trạng. Chỉ bấm nút [Cancel] mới đóng được.

Expected:
- Popup phải đóng (coi như huỷ xoá, giống bấm [Cancel]); suggestion không bị xoá.

Link bug: chưa có - chờ tạo
```

Priority đề xuất: Low — không mất dữ liệu, chỉ thiếu 2 cách tắt popup phụ, vẫn có cách tránh (bấm Cancel).
Căn cứ FE/BE: Hành vi đóng/không đóng modal là xử lý thuần FE (event handler Esc và overlay click), không liên quan dữ liệu/API.
Nguồn Expected: Expected gốc Case 43 (theo pattern UX chuẩn cho modal/popup xác nhận).

Điểm chờ xác nhận: Cùng hiện tượng đã ghi nhận ở Synonyms Case 51 — khả năng là lỗi chung ở component Popups dùng chung giữa các feature, nên kiểm tra cùng lúc khi fix.
