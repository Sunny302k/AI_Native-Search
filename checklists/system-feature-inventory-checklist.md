# Bảng break task chức năng Native Search — theo dõi tiến độ test

Format theo bảng tracking của người dùng (ID / Function / Tình trạng). Cập nhật: 2026-10-05.

- Dòng **1–10**: giữ nguyên tình trạng người dùng đã ghi.
- Dòng **11 trở đi**: tôi bổ sung từ bảng module/feature/sub-feature + đối chiếu repo. Tình trạng ở các dòng này là **đề xuất**, chưa được người dùng xác nhận.
- "Done" ở dòng bổ sung = đã có test case trong `test-cases/`. Cần xác nhận định nghĩa "Done" của người dùng có trùng không (xem mục Lưu ý).

| ID | Function | Sub-function | Tình trạng | Ghi chú (spec / test case trong repo) |
|---|---|---|---|---|
| 1 | Login/ Logout | | New | Trang login có thật (email BC + mật khẩu, nút CONTINUE, link BigCommerce Control Panel). Chưa có spec/test case |
| 2 | Dashboard | | New | Chưa có tài liệu, cần xác nhận có tồn tại không |
| 3 | Sync | Auto sync / Manual Sync / Sync Notification | Done | Spec repo: Manual, Schedule, Data Type Matrix. Chưa có CSV test case trong repo |
| 4 | Search | Instant Search Widget | Done | Spec repo có. Chưa có CSV test case trong repo |
| 5 | Search | Search result page | Done | Spec repo có. Chưa có CSV test case trong repo |
| 6 | Search | Synonyms | New | Không có spec |
| 7 | Search | Suggestion Dictionary | New | Spec Lark `Autocomplete Suggestions`, chưa export |
| 8 | Search | Stopword | New | Spec Lark `Stopwords`, chưa export |
| 9 | Search | Redirect | New | Spec Lark `Redirects`, chưa export |
| 10 | Search | General Setting | New | Spec repo `search-relevance-specs.md` (tab Search Relevance); cần kiểm tra Lark còn tab nào khác |
| 11 | Filter | Filter Layout | New | Spec Lark `[Spec] Filter`, chưa có spec riêng trong repo |
| 12 | Filter | Filter Tree — khung chung (List, Create/Edit, popup Select page/category, popup Add filter node) | New | Spec repo `filter-tree-common-specs.md`, chưa có test case |
| 13 | Filter | Node: Brand | Done | |
| 14 | Filter | Node: Category | Done | |
| 15 | Filter | Node: Condition | Done | |
| 16 | Filter | Node: Featured Products | Done | |
| 17 | Filter | Node: Sale Percentage | Done | |
| 18 | Filter | Node: Special Offers | Done | |
| 19 | Filter | Node: Height | Done | |
| 20 | Filter | Node: Width | Done | |
| 21 | Filter | Node: Weight | Done | |
| 22 | Filter | Node: Shipping | Done | |
| 23 | Filter | Node: Product Options | Done | |
| 24 | Filter | Node: Review Ratings | Done | |
| 25 | Filter | Node: Quick Filters | Done | |
| 26 | Filter | Node: Color | New | Chưa có spec |
| 27 | Filter | Node: Price | New | Chưa có spec |
| 28 | Filter | Node: "[cc]" (nhóm Pricing, tên card không rõ) | New | Câu hỏi BA mở |
| 29 | Filter | Node: Size | New | Chưa có spec |
| 30 | Filter | Node: Depth | New | Chưa có spec |
| 31 | Filter | Node: Availability | New | Chưa có spec |
| 32 | Filter | Node: Bin picking number | New | Chưa có spec |
| 33 | Filter | Node: Stock | New | Chưa có spec |
| 34 | Filter | Node: Custom fields | New | Chưa có spec |
| 35 | Filter | Node: Tools | New | Chưa có spec |
| 36 | Filter | Node: My own filter (Custom Filter Builder) | New | Chưa có spec |
| 37 | Filter | Filter Cache | New | Spec Lark `[Spec] Filter`, chưa có trong repo |
| 38 | Filter | Merge Value | Done | Spec + test case + checklist |
| 39 | Filter | Advanced Setting | Done | Spec + test case + checklist |
| 40 | Merchandise | Scoring System | New | Spec Lark `[Spec] Merchandise`, chưa export |
| 41 | Merchandise | Merchandise Campaign | New | Cùng spec trên |
| 42 | Analytics | Search Analytics | New | Spec Lark `[Spec] Analytics`, chưa export |
| 43 | Analytics | Product Analytics | New | Cùng spec trên |
| 44 | Notification | Notification | New | Spec Lark `[Spec] Notification`, chưa export |

## Hạng mục ứng viên — chưa xác nhận có trong hệ thống

Chưa có trong bảng của người dùng; chỉ đưa vào khi BA/người dùng xác nhận.

| ID | Function | Sub-function | Tình trạng | Cần xác nhận |
|---|---|---|---|---|
| 45 | Cài đặt app | Install / Uninstall / mở từ BC Control Panel | Chưa xác nhận | Luồng cài và gỡ app |
| 46 | Onboarding | Màn hình sau cài, auto-run Manual Sync lần đầu | Chưa xác nhận | Có wizard không |
| 47 | Billing / Plan | Gói, giới hạn theo gói | Chưa xác nhận | Có tính phí không |
| 48 | Phân quyền | Role/user, readonly | Chưa xác nhận | Có ma trận quyền không |
| 49 | Kích hoạt storefront | Bật/tắt, cài script/theme | Chưa xác nhận | Test ở đâu |
| 50 | Cài đặt chung | Đa channel/ngôn ngữ/tiền tệ | Chưa xác nhận | Có hỗ trợ không |

## Lưu ý

- Dòng 3, 4, 5 người dùng đánh **Done** nhưng repo chưa có file CSV test case cho Sync, ISW, SRP (chỉ có spec viết ngược từ test case sheet trên Google Sheet). Nghĩa "Done" của người dùng có thể là test case đã nằm ở sheet ngoài repo — cần xác nhận.
- Dòng 10 (General Setting): sheet `Search Relevance` (42 case) từng tồn tại ở ngoài repo, nhưng người dùng ghi New — cần xác nhận.
- Các nhóm còn thiếu tài liệu: xem câu hỏi BA ở từng spec.
