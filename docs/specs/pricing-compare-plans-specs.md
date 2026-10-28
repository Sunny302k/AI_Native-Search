# Pricing — Bảng Compare plans (ma trận tính năng theo gói)

## 0. Nguồn và độ tin cậy

- **Ma trận** (cột 3 đến 8): đọc từ Figma Pricing (`Qbx9Ftu1qVuJA1zBVA8aAw`), khối "Compare plans" (node `2136:6476`), chụp ở độ phân giải gốc và cắt thành 4 đoạn để đọc từng dòng, ngày 2026-10-25. Dấu ✓ = có, ✗ = không có, số/chữ = giới hạn.
- **Đối chiếu staging** (`stg-search.peasisoft.com/pricing`): các dòng có giá trị số (7 dòng) khớp hoàn toàn với Figma; các dòng ✓/✗ staging chưa đọc được.
- **Cột "Màn hình tương ứng"**: do mình đối chiếu với spec trong repo (`docs/specs/`) và Figma Merchandise; mỗi dòng ghi độ chắc chắn. Tên tính năng trên bảng là tên marketing, **không có tài liệu nào ghi sẵn tương ứng màn nào**, nên đây là suy luận, cần Product/BA xác nhận (PRC-30 đến PRC-34).
- **Hành vi khi chạm giới hạn**: Figma chỉ mô tả cho 6 dòng có số lượng (xem mục 3). Các tính năng ✗ không có mô tả nào về việc seller thấy gì.

Gói theo thứ tự cột: **Starter · Standard · Growth · Scale · Advanced · Enterprise**.

## 1. Search

| # | Tính năng | Starter | Standard | Growth | Scale | Advanced | Enterprise | Màn hình tương ứng (hiện tại) | Chắc chắn |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Smart Relevance Searching Engine | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Search Engine Setup › General Setting › Search Relevance (weight field) | Trung bình |
| 2 | Customizable Search Interface | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Storefront Display Setup: Instant Search Widget, Search Result Page | Trung bình |
| 3 | Autocomplete | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Search Engine Setup › Suggestion Dictionary; gợi ý trong ISW | Trung bình |
| 4 | Spelling Correction | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **Chưa tìm thấy màn/spec** (Figma Merchandise có "Did you mean …?" ở bước gõ keyword) | Thấp |
| 5 | CSS Customization | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Instant Search Widget › tab Custom CSS (Figma Searching, node 3602:64051); chưa rõ có ở Search Result Page không | Trung bình |
| 6 | AI Synonyms Recognition (AI) | **✗** | ✓ | ✓ | ✓ | ✓ | ✓ | Search Engine Setup › Synonyms (CLAUDE.md: chưa có spec riêng) | Thấp |
| 7 | AI-based Search Recommendation (AI) | **✗** | ✓ | ✓ | ✓ | ✓ | ✓ | Menu Recommendation (có trên sidebar Figma); chưa có spec | Thấp |

## 2. Merchandise

| # | Tính năng | Starter | Standard | Growth | Scale | Advanced | Enterprise | Màn hình tương ứng | Chắc chắn |
|---|---|---|---|---|---|---|---|---|---|
| 8 | Visual Editor | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Campaign › kéo thả sản phẩm, Quick actions (Figma Merchandise 2.3) | Trung bình |
| 9 | Dynamic Product Ranking | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Scoring System: Manage product ranking, Setup base score | Cao |
| 10 | Search Merchandising | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Campaign với trigger "When customers search a keyword" | Cao |
| 11 | Category-level Merchandising | **✗** | ✓ | ✓ | ✓ | ✓ | ✓ | Campaign với trigger "When customers visit a category page" | Cao |
| 12 | **Active Merchandising Campaigns** | **10** | **40** | **100** | Unlimited | Unlimited | Unlimited | Danh sách Merchandise Campaign, nút [Create new] | Cao |
| 13 | Rule-based Product Arrangement | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Campaign: chọn sản phẩm "By condition" (Pin/Bury/Hide/Filter theo rule) | Trung bình |
| 14 | Campaign Segmentation by Customer Condition | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Campaign › Condition (Apply to Customer / Apply to Cart) | Cao |
| 15 | **Active Execution in Campaigns** (gồm Default Execution) | **3** | **5** | **10** | 10 | 10 | 10 | Campaign › [+ New execution] | Cao |
| 16 | Scheduled Campaign Automation | **✗** | ✓ | ✓ | ✓ | ✓ | ✓ | Campaign › "Campaign time" (toggle thời gian bắt đầu/kết thúc) | Trung bình |

## 3. Navigation (Filter)

| # | Tính năng | Starter | Standard | Growth | Scale | Advanced | Enterprise | Màn hình tương ứng | Chắc chắn |
|---|---|---|---|---|---|---|---|---|---|
| 17 | **Number of Filter Trees** (gồm default) | **3** | **10** | **20** | Unlimited | Unlimited | Unlimited | Filter › danh sách Filter Tree, nút [Create new] | Cao |
| 18 | Filter Node Pre-built Library | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Popup Add filter node (các thẻ node dựng sẵn: Brand, Category, Price…) | Cao |
| 19 | **Filter Nodes Custom Builder** | **3** | **10** | **20** | Unlimited | Unlimited | Unlimited | Popup Add filter node › thẻ "My own filter" | Cao |
| 20 | Filter by Options & Attributes | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Node Product Options, Custom Fields | Trung bình |
| 21 | Visual Swatch Filters | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Display style "Swatch" trong khung Edit filter node | Trung bình |
| 22 | Multi-level Category Display | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Node Category (cấp category cha/con) | Trung bình |
| 23 | Merging Values | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Filter › Merge Values | Cao |
| 24 | Custom Range Sliders | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Display style slider ở node Price, Weight, Width, Height | Trung bình |
| 25 | Filter Display Customization | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Khung Edit filter node (display option) và Filter Layout | Thấp |
| 26 | Filter Search Box | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Advanced Settings: ô search chung; "Show search box" trong từng node | Cao |
| 27 | Smart URL Configuation *(sai chính tả trên Figma)* | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Advanced Settings › URL STRUCTURE (Shorten) | Cao |
| 28 | Filter Refine Box | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Advanced Settings › "Show Refine by block" | Cao |

## 4. Analytics

| # | Tính năng | Starter | Standard | Growth | Scale | Advanced | Enterprise | Màn hình tương ứng | Chắc chắn |
|---|---|---|---|---|---|---|---|---|---|
| 29 | **Analytics Date Range** | **30 days** | **90 days** | **180 days** | 270 days | 365 days | Custom | Menu Analytics › bộ chọn khoảng ngày; "Need more?" trên Pricing | Trung bình (chưa có spec Analytics) |
| 30 | Search Performance Analytics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Menu Analytics › Search | Thấp |
| 31 | Query to Products Analytics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Menu Analytics (Search Analytics) | Thấp |
| 32 | **Refined Search Journey Analytics Date Range** | **7 days** | **30 days** | **60 days** | 90 days | 180 days | 365 days | Analytics › Refined Search Journey (Figma ghi "Each keyword has a journey") | Thấp |
| 33 | Filter Analytics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Menu Analytics | Thấp |
| 34 | Search Behavior Insights | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Menu Analytics | Thấp |
| 35 | Product Performance Insights | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Menu Analytics › Product Analytics | Thấp |
| 36 | GA4 Integration | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Chưa rõ vị trí cấu hình | Thấp |

## 5. Compliment Features

| # | Tính năng | Starter | Standard | Growth | Scale | Advanced | Enterprise | Màn hình tương ứng | Chắc chắn |
|---|---|---|---|---|---|---|---|---|---|
| 37 | **Variant display** | **✗** | **✗** | **✗** | **✗** | ✓ | ✓ | Search Result Page: "Show product SKU/variant", "Default variant" (và có thể ISW) | Trung bình |
| 38 | Notifications | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Module Notification (spec TBD) | Thấp |

## 6. Sync

| # | Tính năng | Starter | Standard | Growth | Scale | Advanced | Enterprise | Màn hình tương ứng | Chắc chắn |
|---|---|---|---|---|---|---|---|---|---|
| 39 | Manual Sync | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Sync › Manual sync, nút Sync Now | Cao |
| 40 | **Auto Sync frequency** | **3 days** | 1 day | 1 day | 1 day | 2 times/day | 3 times/day | Sync › Scheduled sync (trong spec chỉ có Every Day/Week/Month, không có "times/day") | Trung bình, có mâu thuẫn (PRC-15) |
| 41 | Sync history | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Sync › Sync History | Cao |

## 7. Support

| # | Tính năng | Starter | Standard | Growth | Scale | Advanced | Enterprise | Màn hình tương ứng | Chắc chắn |
|---|---|---|---|---|---|---|---|---|---|
| 42 | Email Support | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Không có màn trong app (dịch vụ ngoài) | – |
| 43 | Premium Support Package | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ | Không có màn trong app | – |
| 44 | Customization Requests | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ | Không có màn trong app | – |
| 45 | Customer Success Manager | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ | Không có màn trong app | – |
| 46 | Dedicated Infrastructure | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | Không có màn trong app | – |

## 8. Tổng hợp

**Các dòng có giới hạn định lượng (7 dòng, in đậm ở trên):** số 12, 15, 17, 19, 29, 32, 40. Trong đó 6 dòng có hành vi chạm hạn mức được mô tả trên Figma (mục 9), riêng số 40 chỉ có nhãn "Locked". Ngoài ra số 37 (Variant display) là tính năng bật/tắt theo gói, không phải giới hạn số lượng.

**Tính năng bị khoá theo gói (✗):**

| Gói | Tính năng không dùng được (không tính Support) |
|---|---|
| Starter | AI Synonyms Recognition, AI-based Search Recommendation, Category-level Merchandising, Scheduled Campaign Automation, Variant display |
| Standard | Variant display |
| Growth | Variant display |
| Scale | Variant display |
| Advanced | – |
| Enterprise | – |

**Quan sát cần lưu ý:**
- Bảng **không có cột "Free"**; chữ "Free" ở nơi khác trong file Figma chưa rõ ý nghĩa (PRC-24).
- **Variant display ✗ ở cả Scale**, trong khi store staging đang ở Scale. Nếu cột này đúng, 2 toggle SRP về SKU/variant phải bị khoá ở staging; đây là điểm kiểm chứng trực tiếp (PRC-32).
- Gói thấp nhất (Starter) bị khoá **Category-level Merchandising**: campaign trigger "Category" không dùng được; trigger "All" chưa rõ (PRC-30).
- Support (5 dòng) không có màn trong app, chỉ kiểm tra được hiển thị trên bảng.

## 9. Hành vi khi chạm giới hạn (từ Figma, chỉ cho 6 dòng có số lượng)

| Giới hạn | Khi chạm |
|---|---|
| Active Merchandising Campaigns (#12) | Disable nút [Create new] |
| Filter Trees (#17) | Disable nút [Create new] |
| Active Execution in Campaigns (#15) | Disable nút [New execution] |
| Filter Nodes Custom Builder (#19) | Disable thẻ "My own filter" |
| Analytics Date Range (#29) | Bấm [Apply] thì hiện popup |
| Refined Search Journey Date Range (#32) | Bấm [Apply] thì hiện popup |

Auto Sync frequency (#40): hiển thị "Locked" ở màn Pricing; chưa có mô tả hành vi.

## 10. Đối chiếu với số đang dùng trên staging (gói Scale)

| Dòng | Hạn mức Figma (Scale) | Staging hiển thị |
|---|---|---|
| Active Merchandising Campaigns | Unlimited | 1/Unlimited ✓ |
| Active Execution in Campaigns | 10 | 1/10 ✓ |
| Filter Trees | Unlimited | 4/Unlimited ✓ |
| Filter Nodes Custom Builder | Unlimited | 4/Unlimited ✓ |
| Analytics | 270 days | 270 days ✓ |
| Refined Search Journey | 90 days | 90 days ✓ |
| Auto Sync frequency | 1 day | 1/1 day ✓ (nhưng màn Scheduled sync ghi 3 ngày, PRC-15) |

## 11. Ý nghĩa giá trị từng ô (người dùng xác nhận 2026-10-25)

| Giá trị trong ô | Ý nghĩa |
|---|---|
| X (✗) | Không được phép sử dụng tính năng |
| Dấu tick (✓) | Được phép sử dụng |
| Số (vd 10, 40, 100, 3 days) | Được phép sử dụng nhưng giới hạn trong số đó. Vd Active Merchandising Campaigns ở Starter: tối đa 10 campaign active |
| Unlimited | Không giới hạn |

Mọi tính năng trong bảng đều bị kiểm soát theo gói (không chỉ 7 dòng có số). Khi tính năng bị khoá hoặc chạm hạn mức: nút hiện tooltip "Plan limit reached. This feature is temporarily locked."; riêng Analytics và Refined Search Journey vượt khoảng ngày thì hiện popup "Date Range Limit Exceeded".

### Giá trị dạng ngày hoặc tần suất (người dùng bổ sung 2026-10-25)

Ngoài 4 loại giá trị ở trên, một vài tính năng có giá trị dạng ngày hoặc số lần mỗi ngày:

| Tính năng | Giá trị theo gói (Starter, Standard, Growth, Scale, Advanced, Enterprise) | Ý nghĩa |
|---|---|---|
| Analytics Date Range | 30 days, 90 days, 180 days, 270 days, 365 days, Custom | Khoảng ngày tối đa được chọn ở bộ lọc ngày của Analytics. Vượt thì hiện popup Date Range Limit Exceeded |
| Refined Search Journey Analytics Date Range | 7 days, 30 days, 60 days, 90 days, 180 days, 365 days | Khoảng ngày tối đa của Refined search journey |
| Auto Sync frequency | 3 days, 1 day, 1 day, 1 day, 2 times/day, 3 times/day | Tần suất tự động đồng bộ: Starter cứ 3 ngày 1 lần, Standard đến Scale mỗi ngày 1 lần, Advanced 2 lần mỗi ngày, Enterprise 3 lần mỗi ngày. Lượt vượt hạn mức bị bỏ |
