Title: [Redirects - Create/Edit] 3 message lỗi validate đều sai nguyên văn, có dấu hiệu bị hoán đổi giữa các rule

Link TCs: test-cases/search/redirects/redirects_testcase.csv#23, #24, #25, #26, #40, #41
Loại: FE (sai text thông báo lỗi — hành vi chặn lưu vẫn đúng)

Data test: Modal Create/Edit redirect trên https://stg-search.peasisoft.com/redirects. Stop word/redirect "shipping" đã tồn tại sẵn để test Rule #1.

Steps to reproduce (Rule #1 — trùng bản ghi đã lưu):
1. Mở modal Create (hoặc Edit 1 redirect khác).
2. Nhập Search term = "shipping" (đã tồn tại), Redirect to hợp lệ.
3. Click [Save Redirects]/[Save Redirect].

Steps to reproduce (Rule #2 — trùng trong cùng phiên Create):
1. Mở modal Create, nhập 2 dòng cùng Search term (VD cả 2 đều "sale"), Redirect to khác nhau.
2. Quan sát message lỗi (hiện ngay, không cần Save).

Steps to reproduce (Rule #3 — URL sai định dạng):
1. Mở modal Create/Edit, nhập Redirect to = "domestic-shipping" (thiếu scheme).
2. Click Save (hoặc quan sát lỗi hiện ngay).

Actual:
- Rule #1 (trùng bản ghi đã lưu): hiển thị "Search term can't have two redirect" (đây là message đáng lẽ dành cho Rule #2).
- Rule #2 (trùng trong cùng phiên Create): hiển thị "Search term must be unique!" (không khớp message nào trong spec).
- Rule #3 (URL sai định dạng): hiển thị "Redirect to must be a valid URL" (khác nguyên văn spec).
- Đã verify cả 3 message sai này nhất quán ở cả modal Create (kể cả test tổ hợp nhiều lỗi cùng lúc trên nhiều dòng) lẫn modal Edit (Rule #1 và #3 cũng sai y hệt). Hành vi chặn lưu khi có lỗi vẫn đúng.

Expected:
- Rule #1: "Redirect already existed!"
- Rule #2: "Search term can't have two redirect"
- Rule #3: "Redirect to is not a valid URL format."

Link bug: chưa có - chờ tạo

Priority đề xuất: P4 - Thấp (chặn lưu đúng ở cả 3 rule, chỉ sai nguyên văn message hiển thị)
Nguồn Expected: docs/specs/search-redirects-specs.md mục 3.1 (annotation Figma node 4071:95384)
