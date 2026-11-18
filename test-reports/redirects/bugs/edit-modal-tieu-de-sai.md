Title: [Redirects - Modal Edit] Tiêu đề modal vẫn hiện "Create new redirect" thay vì "Edit redirect"

Link TCs: test-cases/search/redirects/redirects_testcase.csv#10
Loại: FE (sai text tiêu đề, không phải lỗi logic — nút "Save Redirect" số ít và dữ liệu load sẵn đều đúng)

Data test: Click icon Edit ở 1 dòng bất kỳ trên https://stg-search.peasisoft.com/redirects

Steps to reproduce:
1. Vào màn Redirects, đã có ≥1 redirect.
2. Click icon Edit (bút chì) ở 1 dòng.
3. Quan sát tiêu đề modal vừa mở.

Actual: Modal hiển thị tiêu đề "Create new redirect" — y hệt modal Create.

Expected: Modal hiển thị tiêu đề "Edit redirect".

Link bug: chưa có - chờ tạo

Priority đề xuất: P4 - Thấp (chỉ sai text tiêu đề, không chặn thao tác, dữ liệu vẫn load/lưu đúng)
Nguồn Expected: docs/specs/search-redirects-specs.md mục 2.3
