Title: [Stopwords - Popup Delete] Esc và click ra ngoài không đóng được popup xác nhận xoá

Link TCs: test-cases/search/stopwords/stopwords_testcase.csv#30
Loại: FE (tương tác phím tắt/click-outside không phản hồi)

Data test: Đã có ≥1 stop word trên https://stg-search.peasisoft.com/stopwords/manual

Steps to reproduce:
1. Click icon Delete của 1 chip để mở popup "Delete stop word?".
2. Nhấn phím Esc — quan sát popup.
3. Click vào vùng tối bên ngoài popup — quan sát popup.

Actual: Cả 2 thao tác Esc và click ra ngoài đều KHÔNG đóng được popup; popup vẫn hiển thị nguyên, chỉ Cancel/Delete mới đóng được.

Expected: Popup đóng (coi như bấm Cancel), stop word không bị xoá.

Link bug: chưa có - chờ tạo

Priority đề xuất: P3 - Trung bình (vi phạm pattern UX chuẩn, có workaround là bấm Cancel)
Nguồn Expected: docs/specs/search-stopwords-specs.md mục 4.1
