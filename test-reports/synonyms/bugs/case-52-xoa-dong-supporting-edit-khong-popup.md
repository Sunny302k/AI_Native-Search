```
Title: [Search > Synonyms] Xoá 1 dòng Supporting synonyms trong modal Edit không hiện popup xác nhận

Link TCs: test-cases/search/synonyms/synonyms_testcase.csv (Case 52)
Loại: FE

Data test: Modal "Edit synonym group" tại https://stg-search.peasisoft.com/synonyms, group đang có ≥2 dòng Supporting synonyms

Steps to reproduce:
1. Mở Edit 1 Synonym Group đang có ≥2 dòng Supporting synonyms (VD "shoes→nike air max" và 1 dòng khác).
2. Click icon thùng rác của 1 dòng Supporting.

Actual:
- Dòng bị xoá NGAY LẬP TỨC khỏi modal, không hiện popup xác nhận nào — giống hệt hành vi ở modal Create (xem bug Case 28).

Expected:
- Ở popup "Delete synonym?" hiện ra, bấm nút xác nhận mới xoá; dữ liệu thật trên hệ thống CHƯA đổi cho tới khi bấm Save ở modal cha.

Link bug: chưa có - chờ tạo
```

Priority đề xuất: Low — dữ liệu chưa Save vẫn có thể khôi phục bằng Cancel modal cha, nhưng sai UX đã mô tả trong spec/Figma.
Căn cứ FE/BE: Cùng nguyên nhân với Case 28 — xoá tức thời trên state form, không có bước confirm, không phân biệt theo ngữ cảnh Create/Edit.
Nguồn của Expected: `docs/specs/search-synonyms-specs.md` mục 4.2 + Expected gốc Case 52.

Điểm chờ xác nhận: Kết quả này cùng với Case 28 trả lời dứt điểm câu hỏi mở #6 trong spec ("xoá dòng trong modal có hỏi xác nhận ngay hay chỉ khi xoá cả Synonym Group") — thực tế là KHÔNG hỏi xác nhận ở cả 2 ngữ cảnh Create và Edit, khác với mô tả trên Figma.
