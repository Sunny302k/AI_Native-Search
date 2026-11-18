```
Title: [Search > Synonyms] Mô tả popup Delete synonym group dùng số ít "synonym" thay vì số nhiều "synonyms"

Link TCs: test-cases/search/synonyms/synonyms_testcase.csv (Case 47)
Loại: FE

Data test: Click icon Delete ở cột Action của 1 Synonym Group bất kỳ, tại https://stg-search.peasisoft.com/synonyms

Steps to reproduce:
1. Vào Search > Synonyms, đảm bảo đã có ≥1 Synonym Group.
2. Click icon Delete (thùng rác) ở cột Action của 1 dòng.

Actual:
- Popup hiện tiêu đề "Delete synonym?" + mô tả "Deleted synonym cannot be recovered. Do you still want to continue?" (số ít "synonym").

Expected:
- Mô tả phải là "Deleted synonyms cannot be recovered. Do you still want to continue?" (số nhiều "synonyms").

Link bug: chưa có - chờ tạo
```

Priority đề xuất: Low — lỗi chính tả nhỏ (số ít/số nhiều), không ảnh hưởng chức năng.
Căn cứ FE/BE: Chỉ là text tĩnh hiển thị trên popup, không liên quan logic xử lý.
Nguồn của Expected: `docs/specs/search-synonyms-specs.md` mục 4.1 (dựa theo Figma) + Expected gốc Case 47.
