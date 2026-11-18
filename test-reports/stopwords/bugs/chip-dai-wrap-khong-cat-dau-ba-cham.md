Title: [Stopwords - Stop Word List] Chip nội dung dài tự xuống dòng (wrap) thay vì cắt bằng dấu "…"

Link TCs: test-cases/search/stopwords/stopwords_testcase.csv#14
Loại: FE (sai xử lý overflow text/CSS)

Data test: Stop word dài ~140 ký tự kèm emoji trên https://stg-search.peasisoft.com/stopwords/manual

Steps to reproduce:
1. Mở modal Create new, nhập 1 stop word rất dài (~140 ký tự, có emoji) và Save.
2. Quan sát chip vừa tạo trên Stop Word List.

Actual: Chip tự động wrap xuống nhiều dòng (7 dòng) trong ô, làm phình to chiều cao ô, KHÔNG cắt bằng dấu "…".

Expected: Chip chiếm trọn 100% chiều rộng dòng; phần nội dung vượt quá bị cắt và hiển thị dấu "…" ở cuối, không xuống dòng giữa chữ.

Link bug: chưa có - chờ tạo

Priority đề xuất: P3 - Trung bình (làm vỡ layout danh sách khi có dữ liệu dài, không mất dữ liệu)
Nguồn Expected: docs/specs/search-stopwords-specs.md mục 3.2
