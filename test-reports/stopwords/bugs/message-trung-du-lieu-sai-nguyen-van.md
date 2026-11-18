Title: [Stopwords - Modal Create] Message validate trùng với stop word đã tồn tại sai nguyên văn

Link TCs: test-cases/search/stopwords/stopwords_testcase.csv#21
Loại: FE (sai text thông báo)

Data test: Stop word "the" đã tồn tại sẵn trên https://stg-search.peasisoft.com/stopwords/manual

Steps to reproduce:
1. Mở modal Create new.
2. Nhập "the" (đã tồn tại trong list) vào dòng input.
3. Click [Save Stop Word].

Actual: Hiện chữ đỏ "Stop word(s) already exists"; chặn lưu (đúng).

Expected: Hiện chữ đỏ "Stop word already existed".

Link bug: chưa có - chờ tạo

Priority đề xuất: P4 - Thấp (chặn lưu đúng, chỉ sai nguyên văn message)
Nguồn Expected: docs/specs/search-stopwords-specs.md mục 3.1
