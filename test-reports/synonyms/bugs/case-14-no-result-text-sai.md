```
Title: [Search > Synonyms] Text "no result" khi search không khớp bị sai so với spec

Link TCs: test-cases/search/synonyms/synonyms_testcase.csv (Case 14)
Loại: FE

Data test: Nhập "shoes for girl" vào ô Search group synonym tại https://stg-search.peasisoft.com/synonyms (không khớp Synonym Group nào đang có)

Steps to reproduce:
1. Vào Search > Search Engine Setup > Synonyms.
2. Đảm bảo đã có ít nhất 1 Synonym Group.
3. Nhập "shoes for girl" vào ô Search group synonym (từ khoá không khớp tên group nào).

Actual:
- Bảng hiện text "Data not found!"

Expected:
- Hiện "There is no synonym found."

Link bug: chưa có - chờ tạo
```

Priority đề xuất: Low — chỉ sai text hiển thị, không chặn luồng chính, không mất dữ liệu.
Căn cứ FE/BE: Chỉ là nội dung text hiển thị trên UI khi không có kết quả, không liên quan dữ liệu trả về từ API.
Nguồn của Expected: `docs/specs/search-synonyms-specs.md` mục 4.4 (dựa theo Figma) + Expected gốc trong test case Case 14.
