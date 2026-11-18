```
Title: [Search > Synonyms] Toast sau khi Save Edit (xoá dòng Supporting) hiển thị text khác spec

Link TCs: test-cases/search/synonyms/synonyms_testcase.csv (Case 44)
Loại: FE

Data test: Edit synonym group "Shoes for man v2" đang có ≥2 dòng Supporting synonyms, xoá 1 dòng rồi Save, tại https://stg-search.peasisoft.com/synonyms

Steps to reproduce:
1. Mở Edit 1 Synonym Group đang có ≥2 dòng Supporting synonyms.
2. Click icon thùng rác của 1 dòng Supporting (xem thêm bug Case 28/52 — không có popup xác nhận).
3. Click [Save].

Actual:
- Toast hiện "Success / Synonym group updated successfully"; dòng Supporting đã xoá biến mất đúng khỏi dữ liệu.

Expected:
- Toast phải là "Success / Saved changes!"

Link bug: chưa có - chờ tạo
```

Priority đề xuất: Low — chỉ sai text toast, dữ liệu xoá đúng, không chặn luồng chính.
Căn cứ FE/BE: Dữ liệu cập nhật đúng (dòng Supporting đã xoá không còn), chỉ text hiển thị trên toast FE sai.
Nguồn của Expected: `docs/specs/search-synonyms-specs.md` mục 4.1 "Bổ sung" + Expected gốc Case 44.

Điểm chờ xác nhận: Cùng nguyên nhân với Case 42 — có thể gộp fix chung 1 lần (toast Save trong modal Edit nói chung).
