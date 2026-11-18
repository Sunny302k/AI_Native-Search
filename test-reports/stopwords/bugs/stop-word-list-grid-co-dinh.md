Title: [Stopwords - Stop Word List] Danh sách hiển thị dạng lưới 4 cột cố định thay vì chip rộng theo nội dung

Link TCs: test-cases/search/stopwords/stopwords_testcase.csv#6
Loại: FE (sai bố cục/layout)

Data test: Danh sách có ≥1 stop word trên https://stg-search.peasisoft.com/stopwords/manual

Steps to reproduce:
1. Vào màn Stopwords, có dữ liệu stop word.
2. Quan sát cách hiển thị Stop Word List.

Actual: Danh sách hiển thị dạng lưới grid 4 cột CỐ ĐỊNH, mỗi ô cùng 1 chiều rộng bằng nhau bất kể độ dài nội dung chữ bên trong.

Expected: Lưới chip dàn hàng, mỗi chip rộng theo độ dài chữ (không phải bảng/grid cố định cột).

Link bug: chưa có - chờ tạo

Priority đề xuất: P3 - Trung bình (sai pattern UI nhưng không chặn chức năng CRUD)
Nguồn Expected: docs/specs/search-stopwords-specs.md mục 2.1
