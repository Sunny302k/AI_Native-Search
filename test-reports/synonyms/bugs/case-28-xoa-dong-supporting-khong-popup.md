```
Title: [Search > Synonyms] Xoá 1 dòng Supporting synonyms trong modal Create không hiện popup xác nhận

Link TCs: test-cases/search/synonyms/synonyms_testcase.csv (Case 28)
Loại: FE

Data test: Modal "Create new synonym group" tại https://stg-search.peasisoft.com/synonyms, có ≥2 dòng Supporting synonyms đã nhập dữ liệu

Steps to reproduce:
1. Vào Search > Synonyms, click [Create new].
2. Nhập SYNONYM GROUP NAME + 1 Unified synonym hợp lệ.
3. Nhập dữ liệu cho dòng Supporting synonyms thứ 1 (general term + tag).
4. Click [New supporting synonyms] để thêm dòng thứ 2, nhập dữ liệu cho dòng này.
5. Click icon thùng rác của dòng thứ 2.

Actual:
- Dòng bị xoá NGAY LẬP TỨC khỏi modal, không hiện popup xác nhận nào.

Expected:
- Hiện popup "Delete synonym?" / "Deleted synonyms cannot be recovered. Do you still want to continue?", xác nhận thì dòng mới biến mất khỏi modal; dữ liệu CHƯA lưu xuống hệ thống cho tới khi bấm Save ở modal cha.

Link bug: chưa có - chờ tạo
```

Priority đề xuất: Low — không mất dữ liệu đã lưu (dòng vẫn có thể khôi phục bằng Cancel modal cha trước khi Save), nhưng sai UX đã mô tả trong spec/Figma.
Căn cứ FE/BE: Hành vi xoá diễn ra tức thời trên state của form, không có request nào được gửi đi — là vấn đề FE (thiếu bước confirm trước khi xoá item trong state).
Nguồn của Expected: `docs/specs/search-synonyms-specs.md` mục 4.2 (dựa theo Figma) + Expected gốc Case 28.

Điểm chờ xác nhận: Spec có ghi "[CẦN XÁC NHẬN BA] xoá dòng trong modal có hỏi xác nhận ngay hay chỉ hỏi khi xoá cả Synonym Group" — kết quả test này cho thấy KHÔNG có popup ở cả 2 trường hợp (xem thêm bug case 46 và case 52 cùng nguyên nhân), nên có thể dùng để trả lời câu hỏi mở #6.
