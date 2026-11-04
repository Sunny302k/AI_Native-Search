# [Spec] Merchandise (Lark) — bản chép lại để tham khảo

> **Nguồn.** Tài liệu Lark "[Spec] Merchandise", sửa lần cuối 2025-10-16: https://h4zq094ccpa.sg.larksuite.com/docx/COmGdJzHUoAdTkx30lJlDMY5gYc. Đọc ngày 2026-11-04 qua Chrome (xem được không cần đăng nhập). Dưới đây là bản chép lại gần nguyên văn, giữ cấu trúc; phần trong `[...]` là ghi chú của người chép. Tài liệu sơ sài (mục Condition chỉ có 1 bảng thuộc tính, không có UI); nội dung chi tiết hơn nằm ở Figma, xem `merchandise-campaign-specs.md` và `merchandise-product-ranking-specs.md`.

## Tổng quan

Merchandise cho phép khách hàng customize một trang product trên store sao cho phù hợp với nhu cầu kinh doanh của tổ chức.

## Các thành phần

Merchandise campaign được cấu thành từ 2 phần: Trigger và Execution.

### 1. Trigger

Định nghĩa trường hợp áp dụng campaign, gồm 3 trường hợp.

| Trigger | Mô tả | Location merchandise |
|---|---|---|
| Trigger by Keywords | Trigger theo specific search terms được user nhập vào. Nếu user có synonyms cho search term đó ở kho Synonyms thì tự động add vào trigger | Search Result Page |
| Trigger by Category | Trigger theo category page tương ứng với các category user chọn | Category Page |
| Trigger by All | Không có trigger, campaign áp dụng ở tất cả các product page hiện có trên trang của user | All product pages |

### 2. Execution

Execution mô tả các hành động khi trigger merchandise được thoả mãn, gồm các hành động với từng sản phẩm và nhóm khách hàng nhất định.

**Additional Condition:** Apply to Customer; Apply to Cart.

**Action** chia làm 2 nhóm.

#### Nhóm tác động hiển thị

- Nhóm gồm các action ảnh hưởng trực tiếp đến vị trí và hiển thị của sản phẩm.
- Các sản phẩm được apply action của nhóm này **không tham gia** quá trình sorting của toàn bộ sản phẩm trong trang, mà có các bộ sorting riêng.
- Khi một campaign được update qua sync, vị trí và hiển thị của các sản phẩm này **không thay đổi**.
- Action gồm: Pin, Hide, Bury, Filter.

| Action | Apply fixed product | Apply Rule base | Description |
|---|---|---|---|
| Pin | Yes | No | Pin vào 1 vị trí cố định trong page |
| Bury | Yes | Yes | Đẩy xuống cuối danh sách product |
| Hide | Yes | Yes | Ẩn sản phẩm khỏi list hiện tại |
| Filter | Yes | Yes | Chỉ hiển thị các sản phẩm được chọn, Hide tất cả các sản phẩm còn lại |

#### Nhóm tác động điểm

- Nhóm gồm các action ảnh hưởng đến điểm merchandise của sản phẩm.
- Các sản phẩm được apply action này vẫn được sort theo điểm cuối cùng (product level score).
- Khi một campaign được update qua sync, vị trí và hiển thị của các sản phẩm thay đổi theo cập nhật mới.
- Action gồm: Boost, Deboost.

| Action | Apply fixed product | Apply Rule base | Description |
|---|---|---|---|
| Boost | Yes | Yes | Tăng merchandise score cho sản phẩm |
| Deboost | Yes | Yes | Giảm merchandise score cho sản phẩm |

## Rule

### Cross-action rule

Rule này chỉ áp dụng cho các action ở **Nhóm tác động hiển thị**.

- Mô tả: mỗi sản phẩm chỉ có thể được apply **1 action** trong nhóm này tại 1 thời điểm. Nếu đồng thời có nhiều action được apply, hệ thống alert về việc action mới sẽ override action cũ.
- Note: Nhóm tác động hiển thị và Nhóm tác động điểm có thể apply song song mà không ảnh hưởng đến nhau.
- Process:
  - Step 1: khi apply 1 action mới cho 1 sản phẩm, hệ thống check các action **cùng nhóm** hiện đang được apply cho sản phẩm đó.
  - Step 2.1: nếu sản phẩm chưa được apply action nào thì proceed to apply action hiện tại.
  - Step 2.2: nếu sản phẩm đang được apply 1 action khác thì alert người dùng về conflict và bắt người dùng set lại.
- Ví dụ:
  - VD1: sản phẩm A màu đỏ đang được PIN, chọn Hide các sản phẩm màu đỏ, hệ thống alert việc sẽ override action PIN, user OK, sản phẩm A được hide.
  - VD2: sản phẩm B màu đỏ đang được hide theo Rule based, chọn Pin sản phẩm B, hệ thống alert việc sẽ override action Hide, user OK, sản phẩm B được Pin.
- **Note đối với action "Filter":**
  - Bất kể hiện tại list result đang áp dụng các action tác động hiển thị nào, khi khách hàng setup filter thì tất cả các action hiển thị đều bị reset.
  - Không áp dụng với action tác động điểm.

### Job update post-sync

- Mô tả: sau mỗi lần sync thành công, hệ thống check lại tất cả các campaign hiện có. Nếu danh sách sản phẩm của campaign có thay đổi, hệ thống tự động cập nhật danh sách và đưa ra thông báo cho người dùng.
- Process:
  - Step 1: hệ thống trigger tại thời điểm sync thành công.
  - Step 2: quét qua tất cả merchandise campaign chưa expired (end_date > NOW).
  - Step 3: với mỗi campaign, kiểm tra nếu có sản phẩm mới thuộc 2 trường hợp:
    - TH1: có sản phẩm được add hoặc remove trong product list trả về.
    - TH2: có sản phẩm được add hoặc remove action.
  - Ví dụ:
    - VD1: Hide các sản phẩm brand A, sync có add thêm 1 product thuộc brand A thì product mới add bị hide trong campaign.
    - VD2: Hide các sản phẩm brand A, sync có đổi 1 product về brand A thì product mới đổi bị hide trong campaign.
  - Step 4: nếu detect thấy campaign có sản phẩm thuộc 1 trong 2 case trên thì auto apply rule mới và notify cho user qua tính năng Notification (TBD).

## Condition

| Data Attribute | Format type | Description (các options) |
|---|---|---|
| Product title | Textfields with options | Contain; Do not contain |
| Product category | Options & Search, Multiple choice | List of categories |
| Product Type | Options, Single choice | Physical; Digital |
| Brand | Options & Search, Multiple choice | List of brand |
| Price | Textfields with options | =; >; <; between |
| Weight | Textfields with options | =; >; <; between |
| Inventory status | Options | In stock; Low stock; Out of stock |
| Featured products | Options | Featured products; Not featured products |
| Conditions | Options | New; Used; Refurbished |
| Purchasability | Options | Purchasable; Pre-order; Not purchasable |
| Free shipping | Options | Freeship; Not freeship |
| Product Options | Options & Search, Multiple choice | 2 loại options: (1) Options về name: list title các product options, có search bar; (2) Options về value trong product options: All options / Specific options (Multiple choice) |
| Modifier Options | Options & Search, Multiple choice | Như Product Options |
| Custom Fields | Options & Search, Multiple choice | Như Product Options |
| Review Rating | Textfields with options | >; < |

[Ghi chú người chép: bảng có 15 thuộc tính; Figma Bulk edit chỉ thấy 14 (không có Custom Fields).]
