```
Title: [Search > Synonyms] Màu/nhãn 2 nút popup Delete synonym group không khớp Figma/test case (nghi vấn Figma ghi sai, cần BA xác nhận)

Link TCs: test-cases/search/synonyms/synonyms_testcase.csv (Case 48)
Loại: Cần BA xác nhận (Figma vs thực tế code)

Data test: Popup "Delete synonym?" khi click icon Delete 1 Synonym Group, tại https://stg-search.peasisoft.com/synonyms

Steps to reproduce:
1. Vào Search > Synonyms, click icon Delete (thùng rác) ở cột Action của 1 dòng.
2. Quan sát màu nền và nhãn của 2 nút trong popup.

Actual:
- Nút nền CAM ghi "Delete" (hành động chính/xác nhận xoá); nút nền XÁM/viền trắng ghi "Cancel" (hành động phụ) — đúng theo pattern chuẩn chung của dự án (cam = hành động chính, xem các popup khác như Merge Values, Pricing).

Expected (theo Figma ghi lại trong spec và test case):
- Nút nền XÁM ghi "Delete"; nút nền CAM ghi "Cancel" — nhãn/màu đảo ngược so với pattern chung.

Link bug: chưa có - chờ tạo
```

Priority đề xuất: Chưa xác định — phụ thuộc kết luận BA (xem điểm chờ xác nhận).
Căn cứ FE/BE: Đây là khác biệt về thiết kế/nội dung tĩnh, không phải lỗi logic xử lý.
Nguồn của Expected: `docs/specs/search-synonyms-specs.md` mục 4.1, câu hỏi mở #2 (đọc trực tiếp từ Figma `dHTNp9Dd43Sbzy0hNWGMUC`, page "↪ Synonyms") + Expected gốc Case 48.

Điểm chờ xác nhận — QUAN TRỌNG: Spec đã ghi nhận trước đó đây là nghi vấn "lỗi gõ nhãn trong Figma hay chủ đích" (câu hỏi mở #2, chưa có câu trả lời). Code thực tế đang chạy ĐÚNG theo pattern chuẩn toàn dự án (cam = hành động chính), trong khi Figma ghi ngược. Cần BA/designer xác nhận: (a) nếu Figma đúng (chủ đích đảo màu để tránh bấm nhầm xoá) → đây là bug cần sửa code theo đúng Figma; (b) nếu Figma ghi sai (như nghi vấn ban đầu) → không phải bug, chỉ cần sửa lại Figma + cập nhật test case, không đụng vào code. KHÔNG tự ý log là bug chắc chắn cho tới khi có câu trả lời.
