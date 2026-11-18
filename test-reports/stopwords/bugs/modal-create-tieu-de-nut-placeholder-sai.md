Title: [Stopwords - Modal Create] Tiêu đề modal, nhãn nút Save và placeholder sai so với thiết kế

Link TCs: test-cases/search/stopwords/stopwords_testcase.csv#5, #16
Loại: FE (sai text/label giao diện)

Data test: https://stg-search.peasisoft.com/stopwords/manual, click nút [Create new]

Steps to reproduce:
1. Vào màn Stopwords.
2. Click nút [Create new].
3. Quan sát tiêu đề modal, placeholder input và nút Save.

Actual:
- Tiêu đề modal: "Add Stopwords".
- Placeholder input: "Add a stop word here".
- Nút lưu: "Save Stopwords".

Expected:
- Tiêu đề modal: "Create new stop word".
- Placeholder: "Add a stop word".
- Nút lưu: "Save Stop Word".

Link bug: chưa có - chờ tạo

Priority đề xuất: P4 - Thấp (chỉ sai text/label, không chặn luồng tạo stop word)
Nguồn Expected: docs/specs/search-stopwords-specs.md mục 2.2
