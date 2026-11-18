Title: [Redirects - Edit Toast] Toast sau khi Edit thành công sai nguyên văn

Link TCs: test-cases/search/redirects/redirects_testcase.csv#37
Loại: FE (sai text thông báo)

Data test: Modal Edit redirect, sửa Redirect to sang URL khác rồi Save, trên https://stg-search.peasisoft.com/redirects

Steps to reproduce:
1. Click icon Edit ở 1 dòng.
2. Sửa Redirect to sang URL hợp lệ khác.
3. Click [Save Redirect].

Actual: Toast hiển thị "Success / Redirect updated successfully".

Expected: Toast hiển thị "Success / Saved changes!" (khác text toast của Create "Created redirect!").

Link bug: chưa có - chờ tạo

Priority đề xuất: P4 - Thấp (lưu thành công đúng, chỉ sai text toast)
Nguồn Expected: docs/specs/search-redirects-specs.md mục 2.3
