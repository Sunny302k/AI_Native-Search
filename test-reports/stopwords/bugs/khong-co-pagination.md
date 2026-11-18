Title: [Stopwords - Stop Word List] Không có pagination dù danh sách vượt quá 15 bản ghi

Link TCs: test-cases/search/stopwords/stopwords_testcase.csv#8
Loại: FE (hoặc BE nếu API không trả phân trang — chưa xác định, cần xem response list API)

Data test: Tạo 20 stop word trên https://stg-search.peasisoft.com/stopwords/manual

Steps to reproduce:
1. Tạo đủ 20 stop word (vượt quá 15).
2. Quan sát Stop Word List có xuất hiện pagination/chuyển trang không.

Actual: Cả 20 stop word hiển thị trên 1 trang duy nhất, không có control phân trang nào xuất hiện.

Expected: 15 records/trang, vượt quá 15 thì phân trang, trang 1 đủ 15 chip, trang 2 phần còn lại.

Link bug: chưa có - chờ tạo

Priority đề xuất: P3 - Trung bình (ảnh hưởng UX khi danh sách lớn, chưa gây mất dữ liệu)
Nguồn Expected: docs/specs/search-stopwords-specs.md mục 3.3 (lưu ý: câu hỏi mở #3 trong spec vẫn đang hỏi 15 có phải số cố định không)
