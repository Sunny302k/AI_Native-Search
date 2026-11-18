Title: [Redirects - Modal Create] Esc và click ra ngoài không đóng được modal Create

Link TCs: test-cases/search/redirects/redirects_testcase.csv#36
Loại: FE (tương tác phím tắt/click-outside không phản hồi)

Data test: Modal "Create new redirect" trên https://stg-search.peasisoft.com/redirects

Steps to reproduce:
1. Click [Create new] để mở modal.
2. Nhấn phím Esc — quan sát modal.
3. Click vào vùng tối bên ngoài modal — quan sát modal.

Actual: Cả Esc và click ra ngoài đều KHÔNG đóng được modal; modal vẫn hiển thị nguyên. Chỉ icon Close (X) đóng được.

Expected: Modal đóng (coi như Cancel/Close), không lưu dữ liệu đã nhập dở — áp dụng cho cả 3 cách: icon Close, Esc, click vùng overlay ngoài modal.

Link bug: chưa có - chờ tạo

Priority đề xuất: P3 - Trung bình (vi phạm pattern UX chuẩn, có workaround là bấm icon Close)
Nguồn Expected: test-cases/search/redirects/redirects_testcase.csv#36
