Title: [Stopwords - Feature Tour] Nội dung & ảnh minh hoạ "What is stop word ?" khác thiết kế Figma

Link TCs: test-cases/search/stopwords/stopwords_testcase.csv#2
Loại: FE (sai text/ảnh hiển thị tĩnh, không liên quan API)

Data test: https://stg-search.peasisoft.com/stopwords/manual

Steps to reproduce:
1. Vào Search > Search Engine Setup > Stopwords.
2. Quan sát khối FEATURE TOUR "What is stop word ?".

Actual:
- Bullet hiện: "When looking for a product, sometimes a customer will use search terms that are too broad (words that apply to all or most of your products)... Such common words as 'a', 'an', 'the', and some prepositions are disregarded by default (see list below)".
- Ảnh minh hoạ: search box "shipping a cloth", không có số liệu kết quả.

Expected:
- Bullet: "Use stop words to filter out certain words..." kèm ảnh minh hoạ search "the denim shirt" → "20 results for 'denim shirt'".

Link bug: chưa có - chờ tạo

Priority đề xuất: P4 - Thấp (chỉ sai nội dung/ảnh minh hoạ tĩnh, không chặn thao tác nào)
Nguồn Expected: docs/specs/search-stopwords-specs.md mục 1
