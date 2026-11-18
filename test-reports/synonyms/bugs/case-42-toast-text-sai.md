```
Title: [Search > Synonyms] Toast sau khi Save Edit synonym group hiển thị text khác spec

Link TCs: test-cases/search/synonyms/synonyms_testcase.csv (Case 42)
Loại: FE

Data test: Edit synonym group "Shoes for man", đổi tên thành "Shoes for man v2" rồi Save, tại https://stg-search.peasisoft.com/synonyms

Steps to reproduce:
1. Click icon Edit của 1 Synonym Group đang có, VD "Shoes for man".
2. Đổi SYNONYM GROUP NAME sang tên mới hợp lệ, VD "Shoes for man v2".
3. Click [Save].

Actual:
- Toast hiện "Success / Synonym group updated successfully"; cột Synonym Group trên List cập nhật tên mới đúng.

Expected:
- Toast phải là "Success / Saved changes!"

Link bug: chưa có - chờ tạo
```

Priority đề xuất: Low — chỉ sai text toast, dữ liệu cập nhật đúng, không chặn luồng chính.
Căn cứ FE/BE: Dữ liệu List cập nhật chính xác (tên mới hiển thị đúng) → BE hoạt động đúng; chỉ text hiển thị trên toast FE sai so với mô tả spec.
Nguồn của Expected: `docs/specs/search-synonyms-specs.md` mục 4.1 "Bổ sung" (đọc ảnh Figma độ phân giải cao, xác nhận toast Save là "Success / Saved changes!") + Expected gốc Case 42.

Điểm chờ xác nhận: Cùng nguyên nhân với Case 44 (toast Save trong modal Edit) — có thể gộp fix chung 1 lần.
