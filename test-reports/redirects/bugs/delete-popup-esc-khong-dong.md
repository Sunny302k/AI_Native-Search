Title: [Redirects - Popup Delete] Esc không đóng được popup xác nhận xoá

Link TCs: test-cases/search/redirects/redirects_testcase.csv#49
Loại: FE (tương tác phím tắt không phản hồi — cùng component Popups đã ghi nhận lỗi tương tự ở Stopwords/Synonyms/Suggestion Dictionary)

Data test: Popup "Delete redirect?" trên https://stg-search.peasisoft.com/redirects

Steps to reproduce:
1. Click icon Delete ở 1 dòng để mở popup "Delete redirect?".
2. Nhấn phím Esc — quan sát popup.

Actual: Popup vẫn hiển thị nguyên, không đóng.

Expected: Popup đóng (coi như bấm Cancel), redirect không bị xoá.

Link bug: chưa có - chờ tạo

Priority đề xuất: P3 - Trung bình (vi phạm pattern UX chuẩn, có workaround là bấm Cancel; đã ghi nhận cùng lỗi ở 3 feature Search khác dùng chung component)
Nguồn Expected: docs/specs/search-redirects-specs.md mục 4.1, test-cases/search/redirects/redirects_testcase.csv#49
