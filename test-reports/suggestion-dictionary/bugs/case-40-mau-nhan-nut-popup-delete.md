```
Title: [Search > Suggestion Dictionary] Màu/nhãn 2 nút popup Delete không khớp Figma/test case (nghi vấn Figma ghi sai, cùng hiện tượng với Synonyms)

Link TCs: test-cases/search/suggestion-dictionary/suggestion-dictionary_testcase.csv (Case 40)
Loại: Cần BA xác nhận (Figma vs thực tế code)

Data test: Popup "Delete suggestion?" khi click icon Delete 1 suggestion, tại https://stg-search.peasisoft.com/suggestion-dictionary

Steps to reproduce:
1. Bật chế độ Edit trên màn Suggestion Dictionary, click icon Delete (thùng rác) của 1 dòng.
2. Quan sát màu nền và nhãn của 2 nút trong popup.

Actual:
- Nút nền CAM ghi "Delete" (hành động chính); nút nền XÁM/viền trắng ghi "Cancel" (hành động phụ) — đúng pattern chuẩn chung của dự án.

Expected (theo Figma ghi lại trong spec và test case):
- Nút nền XÁM ghi "Delete"; nút nền CAM ghi "Cancel" — nhãn/màu đảo ngược so với pattern chung.

Link bug: chưa có - chờ tạo
```

Priority đề xuất: Chưa xác định — phụ thuộc kết luận BA, tương tự bug cùng loại đã ghi nhận ở Synonyms.
Căn cứ FE/BE: Khác biệt về thiết kế/nội dung tĩnh, không phải lỗi logic xử lý.
Nguồn Expected: `docs/specs/search-suggestion-dictionary-specs.md` mục 4.1 câu hỏi mở #5 (dùng chung component "Popups" với Synonyms) + Expected gốc Case 40.

Điểm chờ xác nhận: Đây là CÙNG 1 component "Popups" dùng chung với Synonyms (đã log bug tương tự ở Synonyms Case 48) — spec đã ghi chú rõ nên chỉ cần BA/designer xác nhận 1 lần cho cả 2 (và cả Stopwords/Redirects dùng chung component), không cần log riêng từng feature. Để tham chiếu chéo trong file này.
