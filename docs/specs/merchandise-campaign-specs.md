# Merchandise Campaign (Figma section 2.3) — Spec

> **Nguồn và độ tin cậy.** Toàn bộ nội dung đọc từ Figma Merchandise (`fcjg1GDcLIl5HVdRFN4qhF`, trang Design, section 2.3 "Manage merchandise campaign" `1900:33715`) ngày 2026-11-04: ảnh chụp frame, metadata (tên text node chứa luôn chữ trên UI và note) và note vàng. **Spec PDF `[Spec] Merchandise` (Lark) chưa có trong repo nên chưa đối chiếu được**; mọi điểm chỉ nằm trong PDF được ghi `[CẦN XÁC NHẬN BA]`. Figma MCP bị giới hạn gọi công cụ (gói Education) giữa chừng nên một số frame chỉ có tên và note, không có ảnh; từng phần ghi rõ ở mục 1 của mỗi vùng. Spec chia 4 vùng (A đến D), mỗi vùng theo đúng 8 mục của skill extract-figma-spec.

## 0. Tổng quan hợp nhất

**Mục đích.** Cho merchant điều chỉnh thứ tự sản phẩm trên trang search, category và toàn store trong một khoảng thời gian, kèm điều kiện (tuỳ chọn), bằng một nhóm action cố định. Theo note Figma (715:6671): "Campaign : điều chỉnh thứ tự sản phẩm trong 1 khoảng thời gian nhất định và kèm 1 điều kiện trigger nhất định (optional), áp dụng 1 nhóm actions cố định (thêm Condition - vd 1 nhóm khách hàng nhất định (optional))".

**Mô hình dữ liệu campaign (suy từ Campaign details 2089:160348):**
- **General setting:** tên, bật Campaign time (khoảng ngày bắt đầu và kết thúc), Trigger type.
- **Trigger** (3 loại): "When customers search a keyword" (kèm gợi ý chính tả "Did you mean…", Smart synonyms, custom synonyms), "When customers visit a category page" (chọn category BigCommerce, cấp bậc phân cách "/"), "No trigger needed, applies to all store pages".
- **Execution** (nhiều): mỗi Execution gồm Condition (tuỳ chọn: Customer group(s), Customer location, Customer credits, Cart value…) và Action. Có **Default Execution** tự sinh ("automatically generated to capture all customers not matching other defined conditions"), chỉ có Action, không có Condition, không có Delete.
- **Action** trong full-screen popup "Customize product rankings": **Pin**, **Bury**, **Hide**, **Filter**, **Boost/Deboost** (điểm Merchandise, khoảng -999 đến 999, mặc định 0), kèm preview kết quả search, Undo, Redo, Reset all.
- Đổi Trigger type sẽ reset trigger, condition và action (popup "Change trigger type?").
- Danh sách campaign hiển thị theo trigger: dòng "Applies to all store pages" không có icon Pin và Adjusted.

**Điểm liên quan Pricing:** hạn mức Active Merchandising Campaigns và Active Execution in Campaigns (đã có task Pricing, mỗi campaign có 1 Default Execution riêng nên cần chốt cách đếm, xem Pricing PRC-54).

**Điểm nổi bật cần BA chốt (xem mục 7 và 8 từng vùng):**
1. **Bộ condition thiếu trên Figma:** danh sách thuộc tính condition của Hide, Bury, Filter chỉ thấy "Brand" (multi-select) và "Price" (toán tử Between); danh sách condition của campaign (khách hàng, giỏ hàng) không đọc được ảnh. Chưa có nội dung PDF để bù.
2. **Giới hạn Pin:** "x/10 product(s) pinned" ở phần Setup trigger, nhưng badge "233" trên nút Pin ở popup action; chưa rõ giới hạn tối đa.
3. **Xung đột giữa action:** popup Action Conflict chỉ có ở luồng Hide nhiều sản phẩm ("N products have conflicts", tag Pinned hoặc Buried, nút Cancel và Return); không có quy tắc ưu tiên giữa Boost và Pin, Bury, Hide; Filter ghi đè action đã áp dụng ("Previous applied actions while be reset.").
4. **Card đã Pin:** Quick actions hiện Unpin, Bury và Hide bị mờ, Boost/Deboost vẫn dùng được; note vàng "Pinned positions are disabled": vị trí đã pin không phải điểm thả.
5. **Lưu campaign:** chưa rõ Next ở popup tạo đã lưu hay chỉ lưu khi "Save Changes"; điều kiện bật Save Changes; thoát trang khi đang sửa action hiện "Are you sure you want to leave?".
6. **Campaign hết hạn:** chỉ có note 2.1 "Automatically resets to 0 when campaigns end." cho Merchandise score; Pin, Bury, Hide chưa có quy tắc hết hạn.
7. **Mâu thuẫn trên Figma** (chi tiết mục 8 từng vùng): popup Edit General setting vẫn tiêu đề "Create new campaign"; nút thứ 5 của toolbar là "Boost/Deboost" ở nhiều frame nhưng "Adjust score" ở coachmark; tên nút thêm group "Create new condition" và "New condition group"; Save của Bury bật dù chưa có condition, trái note; lỗi chính tả "producrs", "while be reset".

**Quan hệ với module khác:** ranking trên Storefront (SRP, Category Page, ISW), Merchandise score cộng vào Product ranking score (spec product ranking: `merchandise-product-ranking-specs.md`), re-evaluate sau sync ("This list can be changed due to sync plan."), Merge Values (condition Product Options chọn value đã gộp), hạn mức theo gói (Pricing).

## Vùng A — Danh sách campaign, tạo và sửa campaign, trigger, condition
Nguồn: Figma file fcjg1GDcLIl5HVdRFN4qhF. Đọc bằng screenshot + metadata XML cục bộ (merch-meta.xml, merch-notes.json).
LƯU Ý QUAN TRỌNG: giữa chừng Figma MCP báo "reached tool call limit on Education plan" nên các frame phần Condition (popup chọn condition), Add keyword typing states, popup category, Delete execution, "Case: thoat trang khi dang edit action" KHÔNG chụp được. Với các phần đó chỉ có tên frame + note nguyên văn lấy từ metadata (không có nhãn UI chi tiết).

### 1. Tổng quan phạm vi đã đọc

Đã chụp và đọc trực quan:
| node-id | Tên frame | Ghi chú |
|---|---|---|
| 1937:45612 | Manage merchandise campaign (symbol, màn danh sách) | đọc đủ |
| 3765:36422 | Manage merchandise campaign - Empty | đọc đủ |
| 1500:28579 | popup (Create new campaign - default) | đọc đủ |
| 1500:29253 | popup (Create new campaign - đã điền tên + time + trigger 1) | đọc đủ |
| 2078:133406 | popup (Create new campaign - trigger 2 category) | đọc đủ |
| 2078:135938 | popup (Create new campaign - trigger 3 all pages) | đọc đủ |
| 1937:46661 | Create new campaign (default) - sau khi lưu General setting, trigger keyword chưa có keyword | đọc đủ |
| 2084:166587 | Create new campaign - popup "When customers search a keyword" trống | đọc đủ |
| 2089:138210 | Frame 1171275901 - Finish adding a keyword | đọc đủ |
| 2085:123244 | Create new campaign - popup "When customers visit a category" trống | đọc đủ |
| 2085:125660 | Create new campaign (default) - trong hàng "Edit General setting" (General+Trigger đã điền, toast) | đọc đủ |
| 2085:145072 | Create new campaign (default) - sau Change trigger type sang category (reset) | đọc đủ |
| 2085:126003 | popup Edit General setting (trigger keyword, nút Save) | đọc đủ |
| 2085:126508 | popup Edit General setting (trigger category) | đọc đủ |
| 2085:144560 | popup xác nhận "Change trigger type?" | đọc đủ |
| 2084:168969 | setup popup (Did you mean ...) | đọc đủ |
| 2084:169175 | setup popup (Smart synonyms detected) | đọc đủ |
| 2753:67357 | input/ tag-input-field (Selected state) | đọc đủ |
| 2089:160348 | Campaign details | đọc đủ |
| 2089:171374 | Edit campaign | đọc đủ |

KHÔNG đọc được nội dung hình (chỉ có metadata): 2753:67389 (Typing state), 2753:67420 (Hitting ENTER), 923:11412 (setup panel), section trigger 1309:13323 tổng thể, toàn bộ section Condition 1349:32923: 2085:146135, 2289:134052, 2089:137373, 2089:137846, 2089:138319, 2289:134384, 1556:27826 / 2089:136873 / 1566:32184 / 2089:136925 (right modal - condition), 2089:136913 / 2089:136985 ("cate"), 2089:137317 (node); popup category (dropdown chọn category) ; 2662:61346 (setup popup 360x796), 2089:161102, section Edit/Delete 2089:160983 ngoài 2 frame Campaign details/Edit campaign; frame "Case: thoat trang khi dang edit action" 3765:37519; popup full-screen action 2989:41320/3283:40837 (thuộc vùng action, không trong vùng A).

Section [260927] New update 5302:31840 (cùng section 2.3) KHÔNG nằm trong danh sách vùng A, không mở.

### 2. Từng màn / popup / state

| Tên | node-id | Cách mở | Thành phần UI | Save/Cancel/đóng |
|---|---|---|---|---|
| Manage merchandise campaign (danh sách) | 1937:45612 | Menu Merchandise -> Manage merchandise campaign | Header "Manage merchandise campaign" + nút back (mũi tên). Card "FEATURE TOUR / What is merchandise campaign?" có chevron thu gọn: tiêu đề "Customize product rankings with Merchandise campaign"; 3 dòng "Trigger - Select an event that starts your campaign.", "Action - Customize product rankings when the campaign activates.", "Condition (Optional) - Set Conditions that must be met before actions run."; minh hoạ sơ đồ Trigger -> (Condition + Action) x nhiều nhánh. Tiêu đề "Merchandise Campaign"; nút cam "+ Create new"; ô search placeholder "Search campaign by name". Bảng cột: (toggle) / Campaign name / Campaign time / Trigger type (có icon sort mũi tên xuống) / Campaign action / Action. Mỗi dòng: toggle bật/tắt (xanh = on); tên (cắt 2 dòng bằng "..."); thời gian "Jun 19, 2025 - Jun 26, 2025" hoặc "-" khi không bật Campaign time; trigger type có icon + chữ "Search for a keyword" / "Visit a category page" / "Applies to all store pages"; Campaign action là dãy icon (Pin, Bury, Hide, Adjusted/score, Filter) - chỉ hiện icon của action campaign đó có (ví dụ trigger "Applies to all store pages" chỉ có Bury, Hide, Filter - không có Pin, không Adjusted ở dòng 5, 6); Action: nút bút chì (edit) + nút thùng rác (delete). Phân trang: Prev, 1 2 3 4 ... 8, Next (trang hiện tại tô cam). | Create new mở popup tạo. Edit -> màn Edit campaign. Delete -> popup xác nhận xoá (KHÔNG thấy frame xác nhận trong phạm vi đọc được; có text "Delete" 2078:137065). |
| Danh sách rỗng | 3765:36422 | Chưa có campaign nào | Giống trên nhưng thân bảng hiển thị "No campaigns yet" + nút "+ Create new" (thêm 1 nút ở giữa). Header bảng vẫn hiện. | - |
| Popup Create new campaign - default | 1500:28579 | Create new | Tiêu đề "Create new campaign", nút X. Khối trái: label cam "CAMPAIGN NAME" placeholder "E.g. Boost new arrivals"; toggle "Campaign time" (off). Section "Trigger type" (icon sét đỏ) với 3 radio card: "When customers search a keyword / Activates on search results page."; "When customers visit a category / Activates on the category page customers are browsing."; "No trigger needed, applies to all store pages / Activates automatically on all store pages.". Khối phải: preview minh hoạ (ô search "woman shirt", "Showing 20 results", card Pinned, ▲50...). Footer: Cancel, Next (disabled xám khi chưa nhập tên). Ở frame này radio "search a keyword" đã được chọn sẵn (viền cam). | Cancel / X đóng popup (hành vi mất dữ liệu không ghi trong Figma - [CẦN XÁC NHẬN BA]). Next: sang màn canvas. |
| Popup - đã điền tên + bật Campaign time | 1500:29253 | - | Tên "Promote new iPhone launch"; toggle Campaign time ON (xanh); xuất hiện label cam "START DATE - END DATE" giá trị "Jun 19, 2025 - Jun 26, 2025" (date range picker); Next enabled (cam). | Next -> canvas |
| Popup - trigger "visit a category" | 2078:133406 | chọn radio 2 | Preview đổi thành breadcrumb "Home / Woman Shirt", card số thứ tự 349, 350..., tag "Buried", "▼ - 100", "Out of stock", "Refurbished item". | - |
| Popup - trigger "all store pages" | 2078:135938 | chọn radio 3 | Preview 2 khối: "Search result" (Showing 20 results) và "Home / Woman Shirt". | - |
| Canvas Create new campaign - sau bước General | 1937:46661 | Next ở popup | Header "Create new campaign" + back; nút cam "Save Changes" (góc phải). Toast cam trái: "General setting saved! Now let's set up when your campaign trigger!" (nút X). Cột giữa dạng flow: card "General setting" (nút Edit, chevron, đang thu gọn); card "Trigger" (icon sét đỏ) nội dung "When customers search a keyword" + nút cam "+ Add keyword"; nút "+ New execution"; khung nét đứt "Execution 1": card "Condition (optional)" (icon +), card "Action" nội dung "Customize product rankings" + nút tím "+ Add action". Với trigger category: "When customers visit a category page" + "+ Add category" (frame 2085:145072). | Save Changes (chưa rõ state disabled/enabled - [CẦN XÁC NHẬN BA]). |
| Popup setup trigger keyword (trống) | 2084:166587 | Click "Add keyword" | Note: "Click to 'Add a keyword' / Change trigger border color / Add an overlay / Display a setup popup". Panel trái (overlay tối nền): tiêu đề "When customers search a keyword" + X; input placeholder "Add a keyword" (viền cam khi focus); nút "Apply" disabled. | X đóng. Apply lưu vào card Trigger. |
| Popup setup keyword - gợi ý chính tả | 2084:168969 | Gõ "summer shir" (note "Typing a keyword" 814:9924) | Input "summer shir"; dòng "Did you mean **summer shirt** ?" (link cam); nút Apply enabled. | Click "summer shirt" -> thay input (note "Click to summer shirt" 2745:61299); "Unexpected keyword" 1067:7625 là state riêng không chụp. |
| Popup setup keyword - Smart synonyms | 2084:169175 | Sau 3s khi gõ (note "After 3s" 2409:112970) | Input "summer shirt"; khối viền cam "Smart synonyms detected - Also applies when customers search for similar terms." danh sách checkbox (đều checked): tropical shirt, short sleeve shirt, summer top, hot weather shirt, vacation shirt (lặp lần 2 kèm tag "AI" ở các mục sau); "Add custom synonyms" input placeholder "E.g. synonym 1, synonym 2, ..." gợi ý "Using enter to save synonym"; 2 dòng tick xanh: "Auto-handle singular/plural searches", "Auto-correct misspellings Show instant search suggestions as customers type"; nút Apply. | Apply -> card Trigger hiện kết quả. |
| Tag-input synonyms (Selected state) | 2753:67357 | Focus vào input custom synonyms | Tag chip có nút x: tropical shirt, short sleeve shirt, summer top, hot weather shirt, vacation shirt, hawaiian top; con trỏ; "Using enter to save synonym". Còn 2 state "Typing state" 2753:67388 / "Hitting 'ENTER'" 2753:67419 (không chụp được). | |
| Canvas - sau Finish adding a keyword | 2089:138210 | Apply popup keyword | Card Trigger: "SEARCH TERM summer shirt", "SYNONYMS tropical shirt, short sleeve shirt, summer top, hot weather shirt, vacation shirt, + 5 more"; nút Edit trên Trigger. Execution 1: Condition (optional) (chevron), Action: "No action added" + "+ Add action"; cuối khung có link "Delete". | Edit -> mở lại popup. |
| Popup setup category (trống) | 2085:123244 | Click "Add category" (note "Click to 'Add category ...") | Tiêu đề "When customers visit a category"; dropdown placeholder "Search page/category" (chevron); Apply disabled. Note: "Phan cap cua category duoc quan ly boi dau / (vd: Magnesium Combinations la sub-category cua Calcium)". Có text "Typing characters", "Select", "Apply" (khung dropdown không chụp). | |
| Canvas category - sau Change trigger type | 2085:145072 | Yes ở popup xác nhận | Toast "General setting saved! Now let's set up when your campaign trigger!"; Trigger "When customers visit a category page" + "+ Add category"; Execution về trạng thái mặc định (Condition optional, Action "Customize product rankings" + Add action). | |
| Popup Edit General setting | 2085:126003 / 2085:126508 | Click "Edit" trên card General setting | Giống popup tạo nhưng tiêu đề vẫn "Create new campaign" (xem mục 8), footer: Cancel + "Save" (thay vì Next). Edit trigger type thành category: preview breadcrumb. | Save -> nếu đổi trigger type, hiện popup xác nhận. |
| Popup "Change trigger type?" | 2085:144560 | Đổi radio trigger type rồi Save | Icon "i" vàng, tiêu đề "Change trigger type?", nội dung "Changing trigger type will reset all your current trigger settings, Conditions, and actions."; nút Cancel / Yes (cam). | Yes -> reset trigger/condition/action, quay về canvas với toast; Cancel -> giữ (suy luận). |
| Campaign details | 2089:160348 | Từ section "Edit/Delete campaign" (click row/Edit trên danh sách - không rõ) | Header "Campaign details" + back + "Save Changes". Card General setting (Edit, chevron): CAMPAIGN NAME, START DATE - END DATE. Card Trigger (Edit): SEARCH TERM summer shirt; SYNONYMS (cắt "..."). "+ New execution". Execution 1: Condition (Edit) CUSTOMER GROUP(S) Retail; CUSTOMER LOCATION Vietnam; CUSTOMER CREDITS 100 points; Action (Edit): PINNED 3/10 products, BURIED 1 products, HIDDEN 1 products, FILTERED 20 products, ADJUSTED 130 products; link "Delete" (xoá execution). Execution 2: Condition: CUSTOMER LOCATION US, CART VALUE $5000; Action: BURIED 1 products; Delete. "Default Execution": box cam "Default Execution - It is automatically generated to capture all customers not matching other defined conditions." + Action (Edit) ADJUSTED 130 products. Không có nút Delete ở Default Execution. | Save Changes |
| Edit campaign | 2089:171374 | Edit trên dòng | Giống Campaign details nhưng chỉ có Execution 2 (không hiện Default Execution, không có Execution 1, không có link Delete trong khung). | Save Changes |

### 3. Field / control

| Tên | Kiểu | Default | Options | Bắt buộc | Nguồn dữ liệu |
|---|---|---|---|---|---|
| Campaign name | underline text input, label "CAMPAIGN NAME" | rỗng, placeholder "E.g. Boost new arrivals" | - | Có (Next disabled khi rỗng - suy từ frame default; [CẦN XÁC NHẬN BA] giới hạn ký tự; giả thuyết: không giới hạn cứng, hiển thị cắt "...") | Config nội bộ |
| Campaign time | toggle | OFF | ON hiện START DATE - END DATE | Không | Config nội bộ |
| Start date - End date | date range picker, "Jun 19, 2025 - Jun 26, 2025" | trống khi bật | - | Có khi toggle ON ([CẦN XÁC NHẬN BA]) | Config nội bộ |
| Trigger type | radio card (3) | frame default hiện "search a keyword" đã chọn sẵn [CẦN XÁC NHẬN BA: có chọn sẵn thật không] | Search keyword / Visit category / All store pages | Có | Config nội bộ |
| Keyword | text input "Add a keyword" | rỗng | gợi ý "Did you mean ..." | Có (Apply disabled khi trống) | Search term do merchant nhập; gợi ý chính tả/synonym [CẦN XÁC NHẬN BA: nguồn Smart synonyms - tag "AI" cho thấy sinh bằng AI; giả thuyết: dictionary + AI] |
| Smart synonyms | danh sách checkbox | tất cả checked | bỏ tick từng mục | Không | Tính toán (AI/dictionary) |
| Custom synonyms | tag input, Enter để lưu | rỗng, placeholder "E.g. synonym 1, synonym 2, ..." | - | Không | Config nội bộ |
| Auto-handle singular/plural searches; Auto-correct misspellings | dòng tick xanh (thông tin, không thấy control) | luôn áp dụng (giả thuyết) | - | - | Hành vi hệ thống [CẦN XÁC NHẬN BA: có toggle hay chỉ thông tin] |
| Category | dropdown search "Search page/category" | rỗng | danh sách category BigCommerce, cấp bậc phân cách dấu "/" | Có | Sync trực tiếp từ BigCommerce (categories - đối chiếu docs/sync-fields-glossary.md nếu cần) |
| Toggle bật/tắt campaign (danh sách) | toggle | theo trạng thái | on/off | - | Config nội bộ |
| Search campaign by name | text input | rỗng | - | - | Config nội bộ |
| Condition fields (Customer group(s), Customer location, Customer credits, Cart value) | xem Campaign details | - | - | Không (Condition optional) | Customer group/credits: [CẦN XÁC NHẬN BA]; location/cart value: dữ liệu storefront khi shopper truy cập [CẦN XÁC NHẬN BA] |

### 4. Business rule và dependency (nguyên văn note + diễn giải)

Note tổng quan trên section Note (ngoài vùng A nhưng liên quan, node 715:6671):
> Campaign : điều chỉnh thứ tự sản phẩm trong 1 khoảng thời gian nhất định và kèm 1 điều kiện trigger nhất định (optional), áp dụng 1 nhóm actions cố định (thêm Condition - vd 1 nhóm khách hàng nhất định (optional) )

Notes trong vùng A (nguyên văn):
- 2084:141399: > Click to ‘Add a keyword’ Change trigger border color Add an overlay Display a setup popup
  - Diễn giải: click "Add keyword" -> viền card Trigger đổi màu, nền phủ overlay, mở popup setup bên trái.
- 2085:123243: > Click to ‘Add category Change trigger border color Add an overlay Display a setup popup (tương tự cho category)
- 2084:168975: > Did you mean summer shirt ?  (gợi ý sửa lỗi gõ)
- 1309:16294: > Phan cap cua category duoc quan ly boi dau /   (vd: Magnesium Combinations la sub-category cua Calcium)
  - Diễn giải: tên category hiển thị dạng đường dẫn phân cách "/" (giả thuyết: "Calcium / Magnesium Combinations"). Dùng cho hiển thị và search trong dropdown.
- 1312:10880: > When customers search a keyword
- 2085:123025: > When customers visit a category page
- 2085:125205: > No trigger needed, applies to all store pages
- 2085:146148, 2289:134065, 1556:27833, 2089:136880, 1566:32191, 2089:136932 (lặp 6 lần ở các frame condition): > No conditions selected means this will apply universally by default.
  - Diễn giải: không chọn condition nào thì execution áp dụng cho tất cả khách.
- 2089:137003: > Trung condition: k tắt popup + hiển thị thông báo
  - Diễn giải: khi condition trùng với condition đã có (execution khác), khi bấm Apply KHÔNG đóng popup và hiện thông báo lỗi (text thông báo KHÔNG có trong metadata [CẦN XÁC NHẬN BA]).
- 2289:133962: > Edit condition: Toggle OFF ALL setup conditions
  - Diễn giải: khi edit condition mà tắt hết toggle -> popup xác nhận "Yes, turn off" (text node 2289:134607 "Yes, turn off", 2289:134363 "Apply"; nội dung câu hỏi không đọc được). Nhãn rule dạng "A = X -> B": [Toggle OFF tất cả condition] -> popup xác nhận -> xoá condition của execution (giả thuyết).
- 3092:50170: > chua chon rank thi la selected product
  - (thuộc vùng action/Boost-Deboost, ngoài vùng A; ghi lại vì có trong danh sách giao).
- 3765:37519: > Case: thoat trang khi dang edit action
  - Chỉ có tiêu đề case; nội dung frame không đọc được [CẦN XÁC NHẬN BA]. Giả thuyết: popup cảnh báo "unsaved changes" khi back/thoát trang.
- Text annotation trong section Condition (tên text node): "Toggle on condition", "Fill in condition", "Toggle ON ALL conditions", "Fill in ALL conditions", "View ALL conditions", "Starting adding condition", "No condition added", "Finish adding condition", "+ New execution", "Condition in Execution 2", "Apply successfully" (2089:137371), "Add condition", "Apply", "Yes, turn off".
- Text annotation trong section trigger: "Starting adding a keyword", "Before adding a keyword", "Finish adding a keyword", "Starting adding category", "Before adding category", "Finish adding category", "Typing characters", "Edit trigger" (2 frame), "Edit" , "Change Trigger type", "Save", "Yes", "Edit General setting".
- Feature tour note (3765:36454..36507): "What is merchandise campaign?", "Customize product rankings with Merchandise campaign", "Trigger - Select an event that starts your campaign.", "Action - Customize product rankings when the campaign activates.", "Condition (Optional) - Set Conditions that must be met before actions run."

Rule suy ra từ thiết kế (có căn cứ hình, chưa có note):
- RULE-DEP-1 [A = đổi Trigger type -> B bị reset]: "Changing trigger type will reset all your current trigger settings, Conditions, and actions." (popup 2085:144560).
- RULE-DEP-2 [Trigger type = Applies to all store pages -> action Pin / Adjusted không có ở các dòng danh sách (dòng 5, 6 chỉ có Bury, Hide, Filter)]. Có thể do trigger "all store pages" không hỗ trợ Pin và Boost/Deboost; [CẦN XÁC NHẬN BA], giả thuyết: không hỗ trợ vì không có ngữ cảnh 1 trang xác định.
- RULE-DEP-3 [Trigger = Search keyword không chọn keyword -> Apply disabled -> trigger chưa hoàn chỉnh]. 
- RULE-DEP-4: Execution gồm Condition (optional) + Action; có "New execution" để thêm nhiều execution; "Default Execution" tự sinh, nhận mọi khách không khớp condition nào ("It is automatically generated to capture all customers not matching other defined conditions."). Default Execution chỉ có Action, không có Condition, không có Delete.
- RULE-DEP-5: Chỉ Campaign details hiển thị Default Execution; ở Create (1937:46661) và Edit campaign (2089:171374) chỉ thấy execution đang thao tác [CẦN XÁC NHẬN BA: Default Execution xuất hiện khi nào - giả thuyết: khi có ít nhất 1 execution có condition].
- Notes "Delete execution" (2289:133923 "👇 Delete execution", 2289:133924 `Delete “Execution 1”`, 2753:72826 "Delete all execution"): có thao tác xoá từng execution và "Delete all execution" (nội dung popup không đọc được).

### 5. Validation và giới hạn

Không có số/range/message lỗi nào đọc được trong vùng A. Chỉ biết: Apply (keyword/category) disabled khi trống; Next ở popup tạo disabled khi chưa nhập tên (suy từ frame default). Giới hạn độ dài tên, số keyword, số synonym tối đa, số execution tối đa, validate date (end >= start), trùng tên campaign, trùng keyword giữa campaign: tất cả [CẦN XÁC NHẬN BA]. Khoảng "+ 5 more" synonyms cho thấy cắt hiển thị, không phải giới hạn.

### 6. Message / toast / popup text nguyên văn
- Toast: "General setting saved! Now let's set up when your campaign trigger!"
- Popup: "Change trigger type?" / "Changing trigger type will reset all your current trigger settings, Conditions, and actions." / nút "Cancel", "Yes".
- "Did you mean summer shirt ?"
- "Smart synonyms detected" / "Also applies when customers search for similar terms."
- "Using enter to save synonym"
- "Auto-handle singular/plural searches" / "Auto-correct misspellings Show instant search suggestions as customers type"
- "No conditions selected means this will apply universally by default."
- "Default Execution - It is automatically generated to capture all customers not matching other defined conditions."
- "No campaigns yet"; "No action added"; "Customize product rankings"; placeholders "Search campaign by name", "E.g. Boost new arrivals", "Add a keyword", "Search page/category", "E.g. synonym 1, synonym 2, ...".
- Text khác (không rõ ngữ cảnh): "Apply successfully", "Yes, turn off", "Trung condition: k tắt popup + hiển thị thông báo" (thông báo thật không có).
- KHÔNG tìm thấy: text popup xác nhận xoá campaign, thông báo xoá/bật/tắt thành công, thông báo lỗi trùng condition, text câu hỏi "Toggle OFF ALL conditions", text popup thoát khi đang edit action.

### 7. Câu hỏi mở (giả thuyết + mức chặn)
1. Cancel/X ở popup tạo campaign có hỏi xác nhận bỏ dữ liệu không? Giả thuyết: đóng thẳng, không lưu. Mức chặn: thấp.
2. Next ở popup tạo đã tạo campaign (lưu DB) hay chỉ giữ ở client tới khi "Save Changes"? Giả thuyết: chỉ tạo khi bấm Save Changes ở canvas. Chặn: cao (ảnh hưởng case thoát trang).
3. Toggle bật/tắt trên danh sách: có popup xác nhận không? Có toast? Campaign hết hạn / chưa tới ngày hiển thị toggle thế nào? Giả thuyết: toggle lưu ngay, trạng thái theo thời gian do hệ thống. Chặn: trung bình.
4. Delete campaign: nội dung popup xác nhận (frame không đọc được). Giả thuyết: popup xác nhận "Delete campaign?". Chặn: trung bình.
5. Giới hạn ký tự tên, số keyword/campaign, trùng keyword giữa nhiều campaign (ưu tiên thế nào?). Chặn: cao.
6. Campaign time toggle OFF = chạy vô thời hạn (cột time hiển thị "-")? Giả thuyết: có. Chặn: thấp.
7. Trigger keyword: khớp exact / synonyms; xử lý typo; "Unexpected keyword" (1067:7625) là state gì? Chặn: trung bình.
8. Category trigger: chọn 1 hay nhiều category? Sub-category có kế thừa campaign của category cha không? Giả thuyết: chọn 1 category, không kế thừa. Chặn: cao.
9. Condition: danh sách loại condition (Customer group(s), Customer location, Customer credits, Cart value, ...), kiểu nhập, nguồn dữ liệu, rule "trùng condition" (giữa execution nào, so sánh toàn bộ hay từng field), nội dung thông báo. Chặn: cao (không đọc được frame condition do giới hạn MCP).
10. Default Execution: có luôn tồn tại? Có thể xoá Action? Chặn: trung bình.
11. Thứ tự ưu tiên giữa các execution khi shopper khớp nhiều condition. Chặn: cao.
12. Save Changes ở canvas: điều kiện enable (cần tối thiểu trigger hoàn chỉnh + 1 action?). Chặn: cao.

### 8. Mâu thuẫn / không nhất quán
- Popup Edit General setting vẫn có tiêu đề "Create new campaign" (2085:126003, 2085:126508) thay vì "Edit ...".
- Frame default popup (1500:28579) đã chọn sẵn radio "search a keyword" trong khi Next disabled - không rõ mặc định có chọn sẵn hay không.
- Toast "General setting saved!..." xuất hiện cả ở frame đã điền trigger (2085:125660) lẫn frame chưa điền, không rõ khi nào biến mất.
- Danh sách "Smart synonyms" lặp: tropical shirt / short sleeve shirt / summer top / hot weather shirt / vacation shirt xuất hiện 2 lần trong popup (một lần không tag AI, lần sau có tag AI) - có thể là 2 nguồn (dictionary vs AI) hoặc lỗi thiết kế; [CẦN XÁC NHẬN BA].
- Campaign details có Execution 1 + Execution 2 + Default Execution, còn Edit campaign chỉ hiển thị Execution 2 (và không có link Delete) - không rõ cố ý (frame chỉ minh hoạ phần edit) hay thiếu.
- Campaign action trong danh sách: dòng trigger "all store pages" thiếu Pin và Adjusted, nhưng Campaign details gắn "Adjusted 130 products" ở Default Execution (trigger search) - cần đối chiếu với vùng action.
- Wording "Add keyword" trên nút vs note "Click to 'Add a keyword'", "Add category" vs note "Add category" thiếu nháy đóng - chỉ typo.
- Note tiếng Việt không dấu/dấu lẫn lộn ("Trung condition: k tắt popup...") - không rõ nội dung thông báo.

## Vùng B — Action Pin
Nguồn: file fcjg1GDcLIl5HVdRFN4qhF. Đọc bằng metadata cục bộ + screenshot + get_design_context. Quy ước: nội dung trong `"..."` là nguyên văn text/note trên Figma.

### 1. Tổng quan phạm vi đã đọc

Các frame Pin nằm trong sub-section **"Pin product" (2034:62939)** thuộc section "Create new campaign (Setup action)" (1312:9794) trong "2.3 Manage merchandise campaign" (1900:33715). Section chia 4 luồng đánh số (annotation 1-4):
1. "PIN a single product by DRAG & DROP in the same page"
2. "PIN a single product in Quick action"
3. "PIN multiple products (select specific product)"
4. "Unpin in Quick action"

Frame đã mở + chụp (screenshot + metadata):

| node-id | Tên frame | Vai trò (suy ra từ hình) |
|---|---|---|
| 2569:146627 | full-screen popup - action | Default (🎬 "Default full-screen action popup"), bước 1 của luồng 1 |
| 2461:131089 | full-screen popup - action | Luồng 1: hover vào card -> hiện nút "Quick actions" + icon (i) |
| 2461:131963 | full-screen popup - action | Luồng 1: đang kéo card (card nghiêng, nổi bóng) |
| 2462:167665 | full-screen popup - action | Luồng 1: kéo tới vị trí mới (có vạch cam báo chỗ thả), card đang ở cuối vùng nhìn thấy |
| 2569:141962 | full-screen popup - action (cao 1340) | Luồng 1: Pin thành công (toast + icon pin trên card + pagination) |
| 2753:67455 | coachmark - only display for 1st time user accessing to this feature | Overlay hướng dẫn lần đầu |
| 2651:64666 | popup "Pin products" | Luồng 2: Quick action -> popup Pin products (dropdown vị trí "Select") |
| 2662:60992 | popup "Pin products" | Luồng 3: popup Pin products, dropdown đã chọn vị trí 15 |
| 3092:49994 | popup "Pin products" | Luồng 4: Unpin in Quick action (hình render giống 2662:60992) |

Frame được giao nhưng **KHÔNG thuộc Pin**, chỉ đọc để xác định:
- **2662:61492** nằm trong section "Bury to bottom" (2066:110300): hiển thị toast "Product buried" / "Product has been buried." sau khi bury. Không phải Pin.
- **3092:45428** nằm trong section "Filter results" (2066:132751): giống hệt default popup (render không có khác biệt Pin).
- **3092:47939** (frame "Preview") nằm trong "action full-screen popup" 2066:132884 của "Filter results": là canvas trigger/condition/action (TRIGGER "When customer searches 'red rose', 'scarlet roses', 'ruby roses'" + "Apply to plurals" + "Apply to typo tolerance"; CONDITION "If customer group is 'High value customer'"; ACTION "Then add action(s)" + nút "Add action"; 2 nhánh "Test execution"). Không có nội dung Pin.

Node đọc thêm (ngoài danh sách giao, cần cho Pin): note vàng "Logic" 2034:113546, popup xác nhận rời trang 3765:37505, 5 tooltip (2447:509899/901/903/905/907), left-action 2753:72048, card quick-action 2621:59409 (bình thường) và 3495:34500 (sản phẩm đã pin).

**KHÔNG đọc được (hết quota Figma MCP, gói Education):**
- Tooltip 2447:509903 (width 137, vị trí y=2042, nhiều khả năng cho nút Hide) và 2447:509905 (width 276, y=2091, nhiều khả năng cho nút Filter): text KHÔNG đọc được.
- 2656:66176 (vertical-button lẻ), dropdown 3092:49872, top action panel 2569:147167, snackbar 2569:141963 (đã thấy nội dung qua frame 141962), text của caption "Click to" 2653:66175 chỉ có tên text, phần đối tượng sau chữ "Click to" không rõ.
- Không có Action Conflict popup, không có "x/10 product(s) pinned" trong sub-section Pin (xem mục 8, 6 cho vị trí khác).
- PDF spec không có trong repo, không đối chiếu được.

### 2. Bảng từng màn / popup / state

Chung: tiêu đề màn hiển thị **"Customize product rankings"** (trong metadata tên text là "Create new campaign" do instance override; screenshot render "Customize product rankings"). Góc phải header: nút **Cancel** (nhạt) và **Save Changes** (cam). Có mũi tên back ở frame 2569:146627 (header 2569:146628 có `arrow_backward`; các frame sau render không có mũi tên). Sidebar app "native_ai_search".

| Tên | node-id | Cách mở (trigger) | Thành phần UI | Save / Cancel / đóng |
|---|---|---|---|---|
| Default full-screen action popup | 2569:146627 | Mở từ "Add action" trong luồng Create new campaign (Setup action); note trên Figma: "🎬 Default full-screen action popup" | Toolbar: **Pin**, **Bury**, **Hide**, **Filter**, **Boost/Deboost** (tên nút hiển thị); ô search placeholder "Search product name, SKU,..."; **Undo**, **Redo**, **Reset all**; banner thông tin (icon i, nền cam nhạt) "Preview how search results appear when customers search for 'summer shirt'. This list can be changed due to sync plan."; lưới card sản phẩm 5 cột, mỗi card có badge số thứ tự, ảnh, tên (cắt "..." sau 2 dòng); 20 card/trang (20 instance `card- product/ merchandise-preview-action`); có Pagination; Scroll | Cancel / Save Changes ở header (hành vi chi tiết xem note "Added action then close popup") |
| Hover card | 2461:131089 | Hover vào 1 card (note: "hover > click to 'Quick actions'", node 2034:79087 ở vùng khác; "hover > click to info button icon", 5302:55352 ở vùng khác - cùng component card) | Card được nổi bóng; ở đáy ảnh hiện nút tối **"Quick actions"** + nút tròn icon (i) | - |
| Dragging | 2461:131963 | Giữ chuột kéo card ("Then drag it", 2569:108773) | Card nghiêng + đổ bóng, đè lên card khác; các card khác giữ nguyên | - |
| Drop preview | 2462:167665 | Kéo tới vị trí mong muốn ("Drag to a desired position") | Card đang kéo ở góc dưới phải; có **vạch cam dọc** bên trái vị trí thả; badge số của các card đổi theo rank dự kiến | - |
| Pin thành công | 2569:141962 | Thả card ("Drop to a desired position") | Toast xanh **"Product pinned" / "Product has been pinned."** + nút X; toolbar nút Pin có **badge số "233"**; card đã pin có **icon pin cam** góc trên phải (Kawada Rice Bowl ở vị trí 15, và 1 card ở vị trí 10 cũng có icon pin cùng icon tím Boost); card khác có badge `1` lặp (xem mục 8); pagination "Prev 1 2 3 4 5 6 ... 9 10 Next" (trang 1 active) | Note: xem mục 4 ("Pin successfully ...") |
| Coachmark (lần đầu) | 2753:67455 | Hiện **chỉ lần đầu** user vào feature | Lớp phủ tối; highlight toolbar, ô search, nhóm Undo/Redo/Reset all, lưới; 4 chú thích (mục 6); nút cam **"OK, I get it"** | Nút đóng coachmark: note "Click to close coachmark" (2989:39285) và "Added action then close popup" (2989:39284) |
| Quick actions popover (card thường) | 2621:59409 | Click "Quick actions" trên card | Menu 4 ô: **Pin**, **Bury**, **Hide**, **Boost/Deboost**; nút X đóng ở dưới | - |
| Quick actions popover (card đã pin) | 3495:34500 | Click "Quick actions" trên card đã pin | Ô **Unpin** (thay Pin, active); **Bury** và **Hide** bị **mờ/disable**; **Boost/Deboost** vẫn active; nút X | Note nhãn "Unpin" 3508:37649 |
| Popup Pin products - single (Quick action), chưa chọn vị trí | 2651:64666 | Luồng 2: Quick action -> Pin (popup 1120x800) | Header **"Pin products"** + nút X. Cột trái "Select products to pin": ô search "Search product name, SKU,...", danh sách sản phẩm (ảnh, tên, nút **"Pin"** cam nhạt; sản phẩm đã chọn có nút "Pin" **xám disabled**). Cột phải "Pinned products" + link cam **"Remove all"**: dòng gồm badge số (2), ảnh, tên (Kawada Rice Bowl), dropdown vị trí placeholder **"Select"**, icon thùng rác. Footer: "**1** product(s) selected" (số 1 màu cam), nút **Cancel**, **Save** (cam) | Save / Cancel / X: không có text mô tả hành vi trên Figma |
| Popup Pin products - multiple | 2662:60992 | Luồng 3: "PIN multiple products (select specific product)" | Giống trên, dropdown vị trí = **15** | Như trên |
| Popup Pin products - Unpin | 3092:49994 | Luồng 4: "Unpin in Quick action" | Render y hệt 2662:60992 (dropdown 15). Caption kèm theo: "Click Remove all or" + 1 icon button (outline icon, thường là thùng rác) | Như trên |
| Popup xác nhận rời trang | 3765:37505 (dưới caption 3765:37519 "Case: thoat trang khi dang edit action") | Rời full-screen popup khi đang edit action | Icon i vàng; tiêu đề **"Are you sure you want to leave?"**; mô tả **"Your unsaved changes will be lost."**; nút **"Yes, leave"** (phụ), **"Keep Editing"** (cam) | - |
| Left-action (thanh dọc 5 nút) | 2753:72048 | Trong note "Hover to display tooltip to explain action" (2753:72086) | 5 nút dọc Pin/Bury/Hide/Filter/Boost-Deboost | Hover hiện tooltip (mục 6) |

### 3. Bảng field / control

| Tên | Kiểu control | Default | Options | Bắt buộc | Nguồn dữ liệu |
|---|---|---|---|---|---|
| Search product name, SKU,... (full-screen) | Search input | rỗng (placeholder) | - | Không | Sản phẩm: Sync trực tiếp từ BigCommerce (tên, SKU); kết quả/rank hiển thị: Tính toán từ dữ liệu sync (vị trí trên index) |
| Search product name, SKU,... (popup Pin products) | Search input | rỗng | - | Không | Như trên |
| Số thứ tự trên card | Badge | rank hiện tại trong preview | - | - | Tính toán từ dữ liệu sync + điểm; [CẦN XÁC NHẬN BA] giả thuyết: rank trong kết quả preview của keyword 'summer shirt' |
| Banner preview text | Text tĩnh | "Preview how search results ... 'summer shirt' ..." | - | - | Từ keyword trigger của campaign (summer shirt có thể là giá trị động) - [CẦN XÁC NHẬN BA] giả thuyết: chuỗi trong dấu nháy lấy từ keyword trigger |
| Nút Pin / Bury / Hide / Filter / Boost-Deboost (toolbar) | Button action | enabled | - | - | Config nội bộ |
| Undo / Redo / Reset all | Button | [CẦN XÁC NHẬN BA] trạng thái default (không thấy disabled trong frame) | - | - | Config nội bộ |
| Badge số trên nút Pin (vd "233") | Badge count | ẩn ở frame default, hiện "233" sau pin | - | - | Config nội bộ (số sản phẩm đã pin) - [CẦN XÁC NHẬN BA] |
| Nút "Pin" trong danh sách trái popup | Button | enabled (cam nhạt) | enabled / disabled (xám khi sản phẩm đã nằm trong Pinned products) | - | - |
| Dropdown vị trí (Pinned products) | Dropdown (dropdown field/ lg) | "Select" | Danh sách vị trí (giá trị 15 đã thấy); các option khác không hiển thị | [CẦN XÁC NHẬN BA]; note "chua chon rank thi la selected product" (3092:50170) | Config nội bộ |
| Badge số bên trái dòng pinned (vd 2) | Badge | - | - | - | [CẦN XÁC NHẬN BA]: giả thuyết là rank/vị trí hiện tại của sản phẩm |
| Icon thùng rác | Icon button | - | - | - | - |
| "Remove all" | Link | - | - | - | - |
| "x product(s) selected" | Counter footer | "1" | - | - | - |
| Quick actions (card) | Button hiện khi hover | ẩn | - | - | - |
| Icon (i) cạnh Quick actions | Icon button | ẩn | - | - | [CẦN XÁC NHẬN BA] hiển thị gì (note "hover > click to info button icon" ở 5302:55352) |
| Icon pin / icon tím Boost trên card | Icon trạng thái | ẩn | - | - | Config nội bộ |
| Pagination | Prev / 1..10 / Next | trang 1 | Hiển thị "1 2 3 4 5 6 ... 9 10" | - | Tính toán từ dữ liệu sync |

### 4. Business rule và dependency

Note nguyên văn (kèm node-id):

> "PIN a single product by DRAG & DROP in the same page" (1407:18903)

Luồng 1: kéo thả trong cùng 1 trang để pin 1 sản phẩm. Các bước caption: "Hover to a product" (2569:108771) -> "Then drag it" (2569:108773) -> "Drag to a desired position" (2569:108775) -> "Drop to a desired position" (2569:108777).

> "PIN a single product in Quick action" (2621:59002)

Luồng 2: pin 1 sản phẩm từ nút Quick actions trên card (popup Pin products).

> "PIN multiple products (select specific product)" (2662:60846)

Luồng 3: popup Pin products cho phép chọn nhiều sản phẩm cụ thể từ danh sách.

> "Unpin in Quick action" (3092:49990)

Luồng 4: Unpin từ Quick actions trên card đã pin; ô Pin đổi thành "Unpin", Bury và Hide bị disable.

> "Pin successfully Display message Display pinned icon in product card Log the pinned product in Pin list Re-position of all search results product list" (2569:141964)

Diễn giải: sau khi Pin thành công thì (1) hiển thị message (toast "Product pinned"), (2) hiện icon pin trên card, (3) ghi sản phẩm vào "Pin list" (badge trên nút Pin, "Pin 233"), (4) sắp xếp lại toàn bộ danh sách kết quả.

> "Hover to display tooltip to explain action" (2753:72086)

Hover vào nút action (left-action/toolbar) hiện tooltip giải thích (mục 6).

> "coachmark - only display for 1st time user accessing to this feature" (2753:67455 và 2753:72092)

Lặp ở 2 node (tên frame + text). Coachmark chỉ hiện lần đầu user vào feature. [CẦN XÁC NHẬN BA] giả thuyết: theo user (không theo campaign), lưu server-side.

> "Use these tools to customize multiple product rankings across pages." (2753:68649)
> "Search to quickly find and adjust ranking." (2753:68653)
> "Undo/ Redo changes or return to original rankings" (2753:72030)
> "Drag & drop products to reorder them. Changes here directly impact what customers see in search results." (2753:68651)
> "Added action then close popup" (2989:39284)
> "Click to close coachmark" (2989:39285)

"Added action then close popup" nằm cạnh nút "OK, I get it" (round button 4 2989:39280): giả thuyết đọc theo ngữ cảnh: bấm nút -> đóng coachmark/popup, [CẦN XÁC NHẬN BA] có phải "Added action" nghĩa là thêm action vào campaign rồi đóng popup hay chỉ đóng coachmark (2 caption khác nhau cạnh nhau).

> "Default full-screen action popup" (2022:28820, kèm 🎬)

> "Case: thoat trang khi dang edit action" (3765:37519)

Thoát trang khi đang edit action -> popup "Are you sure you want to leave?".

> "chua chon rank thi la selected product" (3092:50170)

Đọc: chưa chọn rank (vị trí) thì dòng đó đang ở trạng thái "selected product" (placeholder "Select"). [CẦN XÁC NHẬN BA] hành vi khi Save mà chưa chọn vị trí (block Save? báo lỗi? mặc định vị trí hiện tại?).

> "Click to" (2653:66175), "Click Remove all or" (3092:50319), "disable drag" (3538:34998), "Quick actions" (3538:34999), "Unpin" (3508:37649), "Hover to a product" (2569:108771), "Then drag it" (2569:108773)

Caption nối luồng. "disable drag" đặt cạnh card Unpin/quick action (9473,3608): giả thuyết: khi card đã pin thì **không kéo được** (hoặc đang mở Quick actions thì tắt drag) - [CẦN XÁC NHẬN BA].

Note vàng sticky "Logic" (2034:113546), nguyên văn:

> **Logic**
> - **Pinned positions are disabled** - When dragging any product, positions 2 and 4 become unavailable drop targets
> - **Only unpinned positions accept drops** - You can only drop into positions 1, 3, 5, 6, 7, 8, etc.

Diễn giải: khi kéo bất kỳ sản phẩm nào, các vị trí đã bị pin (ví dụ 2 và 4) không thể thả vào; chỉ vị trí chưa pin nhận drop.

Rule dạng điều kiện (gắn nhãn):
- **[RULE-DISABLE] Vị trí đã pin = X -> không là drop target**: "positions 2 and 4 become unavailable drop targets" khi đang drag.
- **[RULE-DISABLE] Card đã pin -> Quick actions: ô Pin đổi thành Unpin, Bury và Hide disabled (mờ), Boost/Deboost vẫn dùng được** (từ hình 3495:34500; không có note chữ). [CẦN XÁC NHẬN BA] đây có phải ràng buộc chủ đích.
- **[RULE-DISABLE] Sản phẩm đã nằm trong Pinned products -> nút "Pin" ở danh sách trái bị disable (xám)** (từ hình, không có note).
- **[RULE-DISPLAY] Lần đầu vào feature -> hiện coachmark** (note nguyên văn trên).
- **[RULE-STATE] Pin thành công -> toast + icon pin + ghi vào Pin list + re-rank** (note nguyên văn trên).

Giới hạn số sản phẩm Pin "x/10": KHÔNG có trong sub-section Pin. Chuỗi "3/10 product(s) pinned" nằm ở popup 2nd popup của section "Create new campaign (Setup trigger)" (node 2085:126140/126644/126696, 1500/1936 ... nhánh 1309:13323 và 1900:33858), không thuộc vùng B. Các frame Pin đọc được không nêu giới hạn tối đa (chỉ có badge "233"). [CẦN XÁC NHẬN BA] giả thuyết: giới hạn pin tối đa 10 sản phẩm / campaign áp dụng cả với luồng Pin của full-screen popup; mâu thuẫn với badge 233 (xem mục 8). Mức chặn: cao.

Pin trên nhiều trang: coachmark nói "customize multiple product rankings across pages"; frame success có pagination 10 trang; note "PIN a single product by DRAG & DROP in the same page" -> kéo thả chỉ trong cùng 1 trang. Pin sang trang khác dùng popup Pin products với dropdown vị trí (15 là vị trí đã thấy). [CẦN XÁC NHẬN BA] dropdown vị trí liệt kê bao nhiêu vị trí và có vượt trang 1 không.

Trạng thái card (từ hình): normal (badge số, ảnh, tên), hover (nổi bóng, hiện Quick actions + (i)), đang kéo (nghiêng + bóng), đã pin (icon pin cam góc phải trên), đã boost (icon tím). Trạng thái disabled của card: chỉ thấy ở popover Quick actions (Bury/Hide mờ). Không thấy trạng thái disabled riêng của card trong grid.

### 5. Validation và giới hạn cụ thể

- Số vị trí/ranking: không thấy range chữ trên Figma. Chỉ thấy: lưới 5 cột x 4 hàng = 20 card/trang trong frame, pagination 10 trang.
- Giới hạn pin: không có trong vùng B (xem mục 4). Badge "233" ở nút Pin.
- Dropdown vị trí: giá trị placeholder "Select" và giá trị chọn "15" (không có text lỗi nào).
- Không thấy text validation / lỗi (vd "chưa chọn vị trí") trong vùng B. [CẦN XÁC NHẬN BA].

### 6. Message / toast / popup text nguyên văn

Toast:
- "Product pinned" / "Product has been pinned." (frame 2569:141962; snackbar 2569:141963)
- (Ngoài vùng) "Product buried" / "Product has been buried." (frame 2662:61492, section Bury)

Popup xác nhận rời trang (3765:37505):
- "Are you sure you want to leave?"
- "Your unsaved changes will be lost."
- Nút: "Yes, leave", "Keep Editing"

Popup Pin products:
- "Pin products"; "Select products to pin"; "Search product name, SKU,..."; "Pin" (nút); "Pinned products"; "Remove all"; "Select" (placeholder dropdown); "1 product(s) selected"; "Cancel"; "Save"

Full-screen:
- "Customize product rankings"; "Cancel"; "Save Changes"; "Pin", "Bury", "Hide", "Filter", "Boost/Deboost"; "Undo", "Redo", "Reset all"; "Search product name, SKU,..."
- "Preview how search results appear when customers search for 'summer shirt'. This list can be changed due to sync plan."
- Quick actions: "Quick actions"; popover: "Pin", "Bury", "Hide", "Boost/Deboost", "Unpin".

Tooltip (nguyên văn, đọc được):
- "Pin products to its position" (2447:509899, nút Pin)
- "Move products to bottom of page" (2447:509901, nút Bury)
- "Boost/Deboost merchandise score of products" (2447:509907, nút Boost/Deboost)
- Tooltip 2447:509903 (Hide) và 2447:509905 (Filter): KHÔNG đọc được.

Coachmark (nguyên văn):
- "Use these tools to customize multiple product rankings across pages."
- "Search to quickly find and adjust ranking."
- "Undo/ Redo changes or return to original rankings"
- "Drag & drop products to reorder them. Changes here directly impact what customers see in search results."
- Nút "OK, I get it"
- Lưu ý: trong coachmark nút thứ 5 của toolbar hiển thị là **"Adjust score"**, còn các frame khác là "Boost/Deboost".

Ngoài vùng B nhưng liên quan: "3/10 product(s) pinned" (xuất hiện ở section Setup trigger), "9 products have conflicts" (3508:38351, popup "hide multiple products", section Hide products 2058:94932). Popup Action Conflict KHÔNG xuất hiện trong vùng Pin.

### 7. Câu hỏi mở

1. Giới hạn số sản phẩm pin tối đa là bao nhiêu và có áp dụng cho Pin trong full-screen popup không (có "x/10" ở nơi khác, badge "233" ở đây)? Giả thuyết: tối đa 10 sản phẩm / campaign. Mức chặn: cao.
2. Badge "233" trên nút Pin là gì (tổng sản phẩm pin hay số trang kết quả)? Giả thuyết: số sản phẩm đã pin trong campaign; 233 đang là dữ liệu mẫu. Mức chặn: trung bình.
3. Khi chưa chọn vị trí trong dropdown (placeholder "Select") mà bấm Save thì sao? Giả thuyết: giữ vị trí hiện tại của sản phẩm (theo note "chua chon rank thi la selected product"). Mức chặn: cao.
4. Dropdown vị trí liệt kê những vị trí nào, có giới hạn theo trang/ tổng số sản phẩm không, vị trí đã bị pin bởi sản phẩm khác có bị loại khỏi danh sách không? Giả thuyết: 1..N với vị trí đã pin bị ẩn/disable giống rule drag. Mức chặn: cao.
5. Pin vào vị trí đã có sản phẩm pin khác (qua popup) thì đẩy sản phẩm kia xuống hay chặn? Giả thuyết: chặn như rule drag ("Only unpinned positions accept drops"). Mức chặn: cao.
6. "disable drag" (3538:34998) nghĩa gì: không kéo được card đã pin, hay không kéo khi popover đang mở? Giả thuyết: card đã pin không kéo được. Mức chặn: trung bình.
7. Bury và Hide disable trên card đã pin: có chủ đích không; Pin-rồi-Bury xử lý thế nào? Giả thuyết: có, một sản phẩm không thể đồng thời pin và bury/hide. Mức chặn: trung bình (liên quan Action Conflict).
8. Ý nghĩa chính xác của "Added action then close popup" cạnh nút "OK, I get it". Giả thuyết: caption luồng "thêm action xong thì đóng popup", không phải hành vi của nút coachmark. Mức chặn: thấp.
9. Coachmark lưu "đã xem" theo user hay theo trình duyệt/campaign? Giả thuyết: theo user, 1 lần duy nhất. Mức chặn: thấp.
10. Nút Save / Cancel / X của popup Pin products và Save Changes / Cancel của full-screen: không có note. Giả thuyết: Save áp dụng thay đổi vào preview, Cancel/X bỏ thay đổi, Save Changes mới lưu vào campaign. Mức chặn: cao.
11. Kéo thả khi sản phẩm nằm ở trang khác: có tự lật trang không? Note chỉ nói "in the same page". Giả thuyết: không, chỉ trong cùng trang; sang trang khác thì dùng popup Pin products. Mức chặn: trung bình.
12. Undo/Redo/Reset all: trạng thái disabled khi nào, Reset all có confirm không. Giả thuyết: disable khi không có thay đổi; Reset all quay về ranking gốc (theo "return to original rankings"). Mức chặn: trung bình.
13. Icon (i) cạnh Quick actions hiển thị gì khi click/hover. Giả thuyết: thông tin về sản phẩm (score/rank/trạng thái action). Mức chặn: thấp.
14. "This list can be changed due to sync plan." nghĩa là preview thay đổi khi sync (re-evaluate sau sync). Giả thuyết: rank preview chỉ là ảnh chụp tại thời điểm xem, sync xong có thể khác. Mức chặn: thấp.
15. Text tooltip nút Hide và Filter (không đọc được do hết quota). Mức chặn: thấp.
16. Số sản phẩm hiển thị trong "x product(s) selected" ở footer: đếm số dòng trong Pinned products hay số tích? Giả thuyết: số dòng Pinned products. Mức chặn: thấp.

### 8. Mâu thuẫn / điểm không nhất quán

1. **Tên nút thứ 5 của toolbar**: "Boost/Deboost" (toolbar, popover, tooltip) vs "Adjust score" (coachmark 2753:67455). Cần chốt 1 tên.
2. **Tiêu đề màn**: tên text trong metadata là "Create new campaign" nhưng render "Customize product rankings" (override). Back arrow có ở 2569:146627 nhưng không có ở các frame còn lại.
3. **Badge thứ tự bị lặp "1" trong frame success 2569:141962** (hàng cuối toàn "1"; frame 131089 pos 7 = "1", 131963 pos 8 = "1") và frame 2662:61492 hàng cuối "1": nhiều khả năng lỗi mockup, nhưng chưa xác nhận.
4. **Vị trí pin không khớp**: note "Logic" nói vị trí 2 và 4 bị pin (không thả được), nhưng ở luồng 1 sản phẩm Kawada được kéo từ vị trí 2 (vị trí 2 là "pinned"?) và kết quả cuối nằm ở vị trí 15; popup Pin products hiển thị Kawada badge "2" + dropdown 15. Cần BA chốt ví dụ.
5. **Giới hạn pin**: "x/10 product(s) pinned" (3/10) ở section Setup trigger vs badge "233" ở nút Pin trong frame success; không có giới hạn rõ ở vùng Pin.
6. **3 popup Pin products (2651:64666, 2662:60992, 3092:49994)** render giống nhau ngoài dropdown (Select vs 15); khác biệt giữa luồng 2, 3, 4 (single vs multiple vs unpin) không biểu hiện ở UI popup. Luồng 3 "multiple" nhưng popup chỉ có 1 dòng pinned; luồng 4 "Unpin" dùng chính popup có nút "Pin" và "Remove all".
7. **Frame 2569:141962 cao 1340 vs các frame khác cao 900**, có pagination ở frame này; frame default không có pagination trong viewport (có instance Pagination 2569:146717 nhưng nằm dưới).
8. **Frame giao nhầm vùng**: 2662:61492 (Bury), 3092:45428 và 3092:47939 (Filter results) không chứa nội dung Pin.
9. **Lưới preview "card- product/ merchandise-preview-action"** 20 card/trang trong khi preview 10 trang: không có note về page size.

## Vùng C — Action Hide, Bury, Filter
Nguồn: Figma fcjg1GDcLIl5HVdRFN4qhF (screenshot + XML metadata cục bộ). Không có PDF spec. Mọi trích dẫn "nguyên văn" lấy từ tên text-node trong XML (layer name = nội dung chữ) hoặc đọc từ screenshot.

### 1. Tổng quan phạm vi đã đọc

Ba sub-section thuộc "Create new campaign (Setup action)" (1312:9794):
- `Hide products` 2058:94932
- `Filter results` 2066:132751
- `Bury to bottom` 2066:110300

Đã chụp và đọc (screenshot):
| node-id | Tên frame | Nội dung đọc được |
|---|---|---|
| 2485:94985 | full-screen popup - action (Hide) | Quick-actions popover trên card (Pin/Bury/Hide/Boost-Deboost + nút X) |
| 2056:45712 | full-screen popup - action (Hide) | Sau Hide 1 sản phẩm: toast + badge "Hide 233" + icon mắt gạch trên card |
| 2485:94939 | full-screen popup - action | Hover card: nút "Quick actions" + icon (i) |
| 2569:189091 | full-screen popup - action | Màn nền (toolbar mặc định, card #2 "Kawada Rice Bowl") |
| 2573:64899 | full-screen popup - action (Bury) | Màn nền toolbar mặc định (không có overlay) |
| 2662:61492 | full-screen popup - action (Bury) | Toast "Product buried" + danh sách đã đổi thứ tự |
| 2573:67755 | full-screen popup - action | Màn nền mặc định (không overlay) |
| 2989:39336 | full-screen popup - action | Toast "Product has been deboosted" + badge Boost/Deboost 1 + popover Base/Merchandise/Self-learning/Ranking score (thuộc Boost, ngoài vùng; ghi lại để đối chiếu) |
| 2066:132884 | action full-screen popup (Filter) | Popup "Filter results" – Display products by condition + Filter Override Notice |
| 2066:144886 | action full-screen popup (Filter) | Popup "Filter results" + dialog xác nhận "Filter results?" |
| 3092:45428 | full-screen popup - action (Filter) | Màn nền mặc định (không overlay) |
| 2980:39667 | full-screen popup - action (Filter) | Sau Filter: toast, badge Filter 233, banner "Filtered applied...", icon filter trên mọi card |
| 3367:43129 / 3367:42590 / 3367:43310 / 3388:43640 / 3391:44052 / 3372:41822 / 3395:42630 / 3375:42069 / 3382:41955 / 3508:38019 | popup - hide multiple products | 10 state của popup "Hide products" (chi tiết mục 2) |
| 3508:38736 / 3538:34741 | popup - bury multiple products | 2 state popup "Bury products" |

Đọc qua XML (text-node) nhưng KHÔNG xem được ảnh (Figma MCP bị rate-limit Education plan giữa chừng): 2066:146680 (action full-screen popup, ở x=12846; XML chỉ có header/banner chung, kèm frame con "Preview" 2980:40858), 2980:40858 (Preview – text "Filtered applied..." nằm ở 2980:39667/2980:39760 đã đọc, không xác nhận được nội dung riêng của 2980:40858), 2489:104257 ("Popups" instance = dialog "Confirm to hide" – không chụp được), các frame `annotation` (2066:86450, 2753:72101, 3367:43120, 2066:132943, 2066:110814, 2809:38319, 2066:110818), `card- product/ merchandise-preview-action` (2753:72200, 3050:40342, 3050:40392 trong Hide; 2980:38521, 2980:38540, 5302:31908, 2980:38629, 2662:61425 trong Bury), note instance 2753:72104, "Group 60" 3508:38730, "Group 40" 2066:71819. Với các node này chỉ có tên text từ XML.

KHÔNG đọc được / không tồn tại trong Figma:
- Danh sách thuộc tính (options của dropdown "Select condition") và danh sách giá trị đầy đủ theo từng thuộc tính: nằm trong instance override, XML không lộ chữ; screenshot chỉ mở dropdown giá trị của "Brand". Không có text-node nào tên "No option found." trong toàn file metadata (grep = 0) → empty state dropdown giá trị rỗng KHÔNG có trong Figma đã đọc.
- Không tìm thấy text-node nào cho: Conditions, Featured products, Free shipping, Inventory status, Modifier Options, Purchasability, Product Type, Product Category. Chỉ thấy "Product Title" (3506, ngoài vùng) và trong dropdown giá trị mở của Hide popup xuất hiện "Product Options", "Product Title" (xem mục 8).

### 2. Bảng màn / popup / state

### 2.1 Màn "Customize product rankings" (nền chung)
- Header: "Customize product rankings"; nút "Cancel" (phụ), "Save Changes" (chính, cam).
- Toolbar (mặc định): Pin · Bury · Hide | Filter | Boost/Deboost; ô tìm kiếm placeholder "Search product name, SKU,..."; Undo · Redo · Reset all.
- Banner cam: "Preview how search results appear when customers search for 'summer shirt'. This list can be changed due to sync plan."
- Lưới card 5 cột, mỗi card có số thứ tự (rank); tên sản phẩm cắt "..." sau 2 dòng.

### 2.2 Hide
| Tên | node-id | Trigger | Thành phần UI | Save/Cancel/đóng |
|---|---|---|---|---|
| Hide 1 sản phẩm – hover | 2485:94939 | Hover card | Nút "Quick actions" (xanh navy) + icon (i); note "Hover to a product" (2569:60490) | – |
| Quick-actions popover | 2485:94985 | Click "Quick actions" (note "Click to Quick actions" 2569:60722) | 4 ô: Pin, Bury, Hide, Boost/Deboost + nút X đóng | X đóng popover |
| Confirm to hide | 2489:104257 (instance "Popups", không chụp) | Click "Hide" (note "Click to Hide" 2569:60724) → "Confirm to hide" 2066:71809; "Click to Cancel → Close popup" 2066:71808 | Chưa đọc nội dung dialog | Cancel → đóng popup |
| Sau khi Hide 1 | 2056:45712 | Confirm | Toast "Product hidden / Product has been hidden."; toolbar "Hide" kèm badge "233"; card bị ẩn có icon mắt gạch (cam) góc phải; rank dồn lên | – |
| Unhide | frame 3050:40342... (card hover) ; note 2753:72100 "Unhide in Quick action" | Hover card đã hide → "Quick actions" → "Unhide" (3508:38620) | Chưa chụp | – |
| Popup "Hide products" – state 0 | 3367:43129 | Toolbar Hide (hide multiple, note 3367:43119 "Hide multiple products") | Tiêu đề "Hide products" + X; "Set conditional rules"; mô tả "Hide products that match specific conditions (e.g., price, stock, ...)"; 1 condition-group: dropdown thuộc tính (đã chọn "Brand") > dropdown giá trị placeholder "Select value" + chip giá trị (3D Energy, 5% Nutrition, Allmax Nutrition, ALRI (ALR Industries)) có nút x; icon thùng rác; nút "+ And"; chữ "Or"; nút "+ Create new condition"; phân cách; "Additionally hide products" + "Use this to hide specific products outside of the conditions above."; ô search "Search product name, SKU,..."; footer "320 product(s) hidden" + "Cancel" + "Save" | Save/Cancel/X |
| State 2 condition AND | 3367:42590 | Click "+ And" | Dòng 2: "Price" > "Between" + 2 input "$200" – "$300"; footer "42 product(s) hidden"; popup có scrollbar | – |
| State thêm group OR rỗng | 3367:43310 | Click "+ Create new condition" | Group mới: "Select condition" > "Select value" (disabled, mờ), icon xoá, "+ And"; footer "530 product(s) hidden" | – (note 3367:43298/3367:43303 xem mục 4) |
| Mở dropdown giá trị | 3388:43640 | Chọn thuộc tính "Brand" ở group mới, click "Select value" | Dropdown có checkbox giá trị (3D Energy ✓, 5% Nutrition ✓ …); note "Select value" 3388:43638 | – |
| Dropdown cuộn | 3391:44052 | Cuộn popup xuống cuối | Dropdown cao, thanh cuộn riêng; giá trị: 3D Energy ✓, 5% Nutrition ✓, AD Life, AfterDark, Allmax Nutrition ✓, Alpha Lion, ALRI (ALR Industries) ✓, Anabar, Product Options, Product Title; note "Scroll to view whole dropdown list" 3393:44350 | – |
| Focus ô search | 3372:41822 | Click ô "Search product name, SKU,..." (note "Focus on search bar" 3372:41820) | Ô search viền cam, caret; popup đã cuộn "Scroll đến cuối" | – |
| Scroll cuối (không focus) | 3395:42630 | Auto-scroll sau khi thêm block ("Scroll đến cuối" 3395:42626/42627) | Group rỗng + "Or" + "+ Create new condition" + "Additionally hide products" + ô search | – |
| Typing search | 3375:42069 | Gõ "shi" | Dropdown dưới ô search: thumbnail + tên "Ladies' Organic Cotton Heavy Weight Jersey Boat Neck Short Sleeves T-Shirt" + nút "Hide" (cam nhạt); footer 530 | – |
| Đã thêm sản phẩm cụ thể | 3382:41955 | Click "Hide" trên 1 dòng kết quả | Danh sách sản phẩm đã chọn (thumbnail + tên + icon thùng rác) dưới ô search (ô search giữ giá trị "shirt"); footer "533 product(s) hidden" (530 → 533) | – |
| Conflict | 3508:38019 | Click "Save" khi có xung đột (note "Save" 3508:38511) | Icon (i) vàng, "9 products have conflicts", danh sách sản phẩm (thumbnail + tên "Featured Animals Table Runner, Seasonal Kitchen Dining Table Runner, Party Center Dec...") + nhãn đỏ "Pinned" (2 dòng đầu) / "Buried" (các dòng còn lại); footer "533 product(s) hidden" + "Cancel" + nút "Return" (thay "Save"; note "Return" 3508:38614) | "Return" quay lại popup; Cancel; X |
| Disable drag | note 3538:35000 / 5302:55355 "disable drag" | Card hiện popover/hover | Không được kéo card khi đang bật quick-actions | – |

Ghi chú: XML có text "By condition" / "By specific products" trong các popup Hide và Filter, nhưng KHÔNG hiển thị trong screenshot (có thể là tab ẩn). [CẦN XÁC NHẬN BA] – giả thuyết: là biến thể tab cũ đã bỏ, UI hiện hành là 1 trang cuộn (conditions + "Additionally hide").

### 2.3 Bury
| Tên | node-id | Trigger | Thành phần UI | Save/Cancel/đóng |
|---|---|---|---|---|
| Bury 1 sản phẩm | note 2066:110813 "Bury to bottom single product (Hover to a product)" | Hover → Quick actions → Bury | Toast "Product buried / Product has been buried." (2662:61492); sản phẩm bị bury chuyển xuống cuối danh sách, các card sau dồn lên (rank 5 hiện sau 6) | – |
| Unbury | note 2809:38318 "Unbury in Quick action"; 3538:34838 "Unbury" | Hover card đã bury → Quick actions → Unbury | Chưa chụp | – |
| Popup "Bury products" – rỗng | 3508:38736 (nhãn "Default" 3508:38732, "By default" 3508:38733) | Toolbar Bury (note 2066:110817 "Bury to bottom multiple products (tương tự luồng Hide multiple products)") | Tiêu đề "Bury products"; "Set conditional rules"; "Bury products that match specific conditions (e.g., price, stock, ...)"; 1 group mặc định: "Select condition" > "Select value" (disabled), icon xoá mờ, "+ And"; "Or"; "+ Create new condition"; "Additionally hide products" (SIC – xem mục 8) + "Use this to bury specific products outside of the conditions above."; ô search; footer "0 product(s) buried" (số 0 cam) + "Cancel" + "Save" (xám, disabled) | Save disabled |
| Popup "Bury products" – có 1 SP | 3538:34741 (nhãn "Default" 3508:38629) | Chọn 1 sản phẩm cụ thể từ search | Dòng sản phẩm (thumbnail sandal + tên + icon xoá) dưới ô search; footer "1 product(s) buried"; Save enabled (cam) | – |

### 2.4 Filter
| Tên | node-id | Trigger | Thành phần UI | Save/Cancel/đóng |
|---|---|---|---|---|
| Toolbar Filter | 3092:45428 (base); "vertical-button" 2573:93459; note "Click to" 2066:132934 | Click "Filter" | – | – |
| Popup "Filter results" (bản A) | 2066:132884 | Click Filter | Tiêu đề "Filter results" + X; "Display products by condition"; "Customize product list you want to show during campaign time"; ẩn trong XML "Filter products that match this group" (hidden=true); hộp cam "Filter Override Notice" có nút đóng; group: "Select condition" > "Select value"(disabled) + icon xoá + "+ And"; "Or"; nút "+ New condition group"; footer "0 product(s) selected" (0 cam) + "Cancel" + "Save" (disabled) | Save disabled khi chưa có condition |
| Popup "Filter results" (bản B) | 2066:144886 | – | Tiêu đề "Filter results"; "Select product to filter"; "Customize product list you want to show during campaign time"; "Filter products that match this group"; footer "0 product(s) selected"; Cancel; Save (disabled). Nền: sidemenu khác (có "Features"), toolbar có icon "Search" thay ô tìm kiếm, "Reset all" xuống 2 dòng | – |
| Dialog xác nhận (bản B) | 2066:144886 | Click "Save" (note "Save" 2066:132946; "Confirm to filter" 2980:39282) | Icon (i) vàng; "Filter results?"; "Do you want to filter these products when trigger happens? Previous applied actions while be reset."; nút "Cancel" và "Filter" (cam) | Cancel đóng dialog; Filter xác nhận |
| Sau khi Filter | 2980:39667 | Confirm "Filter" | Toast "Product filtered / Product has been filtered."; toolbar: Pin, Bury, Hide, "Filter" + badge "233", "Adjust score" (thay Boost/Deboost), icon "Search" (thay ô tìm kiếm), Undo, Redo, "Reset all"; banner thay bằng icon filter + "Filtered applied. Only show 233 of 980 producrs"; mọi card có icon filter góc phải | – |
| Multiple products | note 2066:132942 "Filter results multiple products" | – | Tiêu đề section | – |

### 3. Bảng field / control

| Tên | Kiểu control | Default | Options | Bắt buộc | Nguồn dữ liệu |
|---|---|---|---|---|---|
| Condition (thuộc tính) | Dropdown single-select, placeholder "Select condition" | Rỗng | Quan sát được: "Brand", "Price"; danh sách đầy đủ KHÔNG đọc được | Có để Save (xem mục 4) | [CẦN XÁC NHẬN BA] – giả thuyết: Sync trực tiếp từ BigCommerce (Brand, Price...); chưa có spec cho từng thuộc tính |
| Value – Brand | Multi-select dropdown có checkbox, placeholder "Select value"; giá trị chọn hiện dưới dạng chip có "x" | Rỗng | 3D Energy, 5% Nutrition, AD Life, AfterDark, Allmax Nutrition, Alpha Lion, ALRI (ALR Industries), Anabar (cuộn tiếp) | – | Sync trực tiếp từ BigCommerce (brand) – giả thuyết dựa trên giá trị |
| Value – Price | Dropdown toán tử ("Between") + 2 input tiền tệ "$200" – "$300" | – | Toán tử: chỉ thấy "Between" | – | Sync trực tiếp (price) – giả thuyết |
| Value dropdown | Dropdown disabled (mờ) khi chưa chọn condition | Disabled | – | – | – |
| "+ And" | Link/nút | – | Thêm 1 condition AND vào cùng group | – | Config nội bộ |
| "+ Create new condition" (Hide/Bury) / "+ New condition group" (Filter) | Nút cam nhạt dạng pill | – | Thêm group OR; ngăn cách bằng nhãn "Or" | – | Config nội bộ |
| Icon thùng rác | Icon | Disabled khi là condition duy nhất (note 3508:38734) | – | – | – |
| "Additionally hide / bury products" | Ô search "Search product name, SKU,..." | Rỗng | Dropdown max 5 kết quả, mỗi dòng Thumbnail + tên + nút [Hide] | – | Sync trực tiếp (product name, SKU) |
| Danh sách sản phẩm đã thêm | List: thumbnail + tên + icon thùng rác | Rỗng | – | – | – |
| Footer counter | Text "N product(s) hidden / buried / selected" (N màu cam) | "0" (Bury, Filter), "320" (ví dụ Hide) | – | – | Tính toán từ dữ liệu sync (số sản phẩm khớp rule + chọn tay) – [CẦN XÁC NHẬN BA] về cách tính khi trùng |
| Save | Nút chính | Disabled khi chưa setup condition (Bury/Filter) | – | – | – |
| Cancel | Nút phụ | Enabled | – | – | – |
| Filter Override Notice | Callout cam có nút đóng | Hiển thị | – | – | Config nội bộ |

### 4. Business rule & dependency

Note nguyên văn (kèm node-id). Mọi note dưới đây thuộc section Hide trừ khi ghi khác.

> "Select condition, select value" (3367:43298)
Diễn giải: mỗi dòng condition gồm 2 dropdown theo thứ tự: chọn condition → chọn value.

> "Select value dropdown is enabled when condition is selected Save button is enabled" (3367:43303)
Diễn giải: sau khi chọn condition thì dropdown value được enable và Save được enable.
- RULE ĐIỀU KIỆN: Condition được chọn → Select value dropdown = enabled; Save = enabled.

> "Select value dropdown is disabled Delete icon is disabled when it's the only one condition Save button is disabled when no condition is setup" (3508:38734, section Bury; tên node dùng dấu nháy ’)
- RULE ĐIỀU KIỆN: Chưa chọn condition → Select value = disabled.
- RULE ĐIỀU KIỆN: Chỉ còn 1 condition → icon xoá (thùng rác) = disabled.
- RULE ĐIỀU KIỆN: Chưa setup condition nào → Save = disabled (khớp ảnh Bury: footer "0 product(s) buried", Save xám).
- Ghi chú: ảnh Hide state 0 (3367:43129) hiển thị icon thùng rác mờ ở group duy nhất, nhưng ảnh 3367:42590 (2 dòng) hiển thị icon thùng rác enabled → khớp rule.
- [CẦN XÁC NHẬN BA]: Save của Bury còn disabled khi chỉ có sản phẩm "specific" (không có condition)? Ảnh 3538:34741 (0 condition, 1 sản phẩm cụ thể) cho thấy Save ENABLED → mâu thuẫn nhẹ với note "no condition is setup"; giả thuyết: Save enabled nếu có ≥1 condition hợp lệ HOẶC ≥1 sản phẩm chọn tay.

> "Typing triggers a dropdown above the bar, showing max 5 results Each result row: Thumbnail + product name + [Hide] button Multiple items can be selected without closing dropdown" (3382:41954)
- Ghi chú: note nói "dropdown above the bar" nhưng ảnh (3375:42069) dropdown hiện dưới ô search; [CẦN XÁC NHẬN BA] – giả thuyết: "above" nghĩa là nổi trên (z-index) phần nội dung bên dưới.
- Max 5 kết quả; nút trên dòng là "Hide" (trong popup Bury chưa thấy nút [Bury] cụ thể – [CẦN XÁC NHẬN BA]).
- Chọn nhiều không đóng dropdown.

> "Search product name, SKU,..." (3382:41952)
- Placeholder ô search; tìm theo tên và SKU, dấu "..." còn thuộc tính khác chưa liệt kê [CẦN XÁC NHẬN BA].

> "Auto-scrolls just enough so the new block is fully visible." (3388:44039)
- RULE: sau khi thêm block condition/group mới, popup tự cuộn vừa đủ để block mới hiện hoàn toàn.

> "Scroll to view whole dropdown list" (3393:44350)
- Dropdown giá trị mở trong popup bị cắt → người dùng cuộn để xem hết list.

> "Scroll đến cuối" (3395:42626, 3395:42627) – nhãn cuộn tới cuối popup.

> "Focus on search bar" (3372:41820) – click ô search thì focus (viền cam).

> "Hover to a product" (2569:60490), "Click to Quick actions" (2569:60722), "Click to Hide" (2569:60724), "Confirm to hide" (2066:71809), "Click to Cancel → Close popup" (2066:71808)
- Luồng Hide 1 sản phẩm: Hover → Quick actions → Hide → dialog xác nhận (Confirm / Cancel; Cancel đóng popup).

> "Unhide in Quick action" (2753:72100), "Hover" (3508:38616), "Quick actions" (3508:38618), "Unhide" (3508:38620)
- Sản phẩm đã Hide vẫn nằm trong preview (icon mắt gạch); hover → Quick actions → Unhide.

> "disable drag" (3538:35000 trong Hide; 3538:34999/34998 trong Pin; 5302:55355)
- RULE: khi card đang mở quick-actions / state tương ứng thì kéo thả bị disable. Phạm vi cụ thể [CẦN XÁC NHẬN BA] – giả thuyết: card đã Hide/Bury không kéo được.

> "Save" (3508:38511) / "Return" (3508:38614)
- Click Save có xung đột → popup conflict, nút "Save" đổi thành "Return".

> "Bury to bottom single product (Hover to a product)" (2066:110813)
> "Unbury in Quick action" (2809:38318)
> "Bury to bottom multiple products (tương tự luồng Hide multiple products)" (2066:110817)
> "Default" (3508:38629, 3508:38732), "By default" (3508:38733)
- Bury multiple có cùng cấu trúc với Hide multiple (conditions + additionally).

> "Hide a single product" (2066:86449), "Hide multiple products" (3367:43119)

> "Filter results multiple products" (2066:132942), "Click to" (2066:132934), "Save" (2066:132946), "Confirm to filter" (2980:39282)
- Luồng Filter: Click Filter → popup → Save → dialog "Filter results?" → Filter (confirm).

Rule dạng "A = X → B bị ẩn/disable/buộc = Y" (gắn nhãn RULE ĐIỀU KIỆN):
1. Condition = chưa chọn → Select value = disabled.
2. Condition = đã chọn → Select value = enabled, Save = enabled.
3. Số condition = 1 → icon Delete = disabled.
4. Chưa setup condition → Save = disabled (Bury/Filter popup).
5. Có xung đột với Pin/Bury (Hide popup) → Save bị thay bằng "Return".
6. Filter áp dụng → "Adjust score" thay "Boost/Deboost", ô search thu thành icon "Search", Hide/Bury/Pin vẫn hiện trên toolbar (chức năng trong state này: [CẦN XÁC NHẬN BA]).
7. Filter xác nhận → các action đã áp dụng trước đó bị reset (theo text dialog).

Logic And/Or (suy từ UI, không có note nguyên văn):
- Trong 1 group: nhiều dòng condition nối bằng "+ And" (AND). Giữa các group: nhãn "Or" (OR).
- "Additionally hide/bury products": thêm sản phẩm chọn tay ngoài các điều kiện ("outside of the conditions above") → hợp (union) với tập khớp điều kiện – diễn giải từ copy "Use this to hide specific products outside of the conditions above."

Hiển thị số sản phẩm bị ảnh hưởng:
- Footer popup: "N product(s) hidden" / "N product(s) buried" / "N product(s) selected". Hide: 320 → 42 (sau thêm điều kiện Price AND: giảm) → 530 (thêm group OR, tăng) → 533 (thêm 3 sản phẩm chọn tay? ảnh 3382 hiển thị ≥3 dòng) → 533 ở màn conflict.
- Toolbar badge sau thao tác: "Hide 233", "Filter 233", "Boost/Deboost 1".
- Sau Filter: banner "Filtered applied. Only show 233 of 980 producrs".

Notes liên quan Pin/Bury/Hide tương tác (ngoài vùng, ghi lại để biết):
> "Cross-rule" (3092:50329) và "Click to Bury or Hide" (3092:50333) – node mồ côi ngoài section (x≈32000,y≈25700), có annotation số "6". Chưa chụp được. Liên quan conflict Pinned/Buried của popup Hide. [CẦN XÁC NHẬN BA]
> "Pin successfully Display message Display pinned icon in product card Log the pinned product in Pin list Re-position of all search results product list" (2569:141964) – thuộc Pin (vùng khác).
> "Undo/ Redo changes or return to original rankings" (2753:72030) – coachmark.

### 5. Validation và giới hạn cụ thể
- Dropdown kết quả tìm sản phẩm: tối đa 5 (3382:41954).
- Hide popup: không thấy text lỗi nào; condition rỗng + nhấn Save: không có text lỗi trong Figma ([CẦN XÁC NHẬN BA]: giả thuyết Save bị disable nên không cần lỗi).
- Price: dạng "Between" + 2 ô số kèm ký hiệu "$" (200 – 300); không thấy rule min ≤ max hay validate chữ ([CẦN XÁC NHẬN BA]: giả thuyết min ≤ max, số ≥ 0).
- Không có giới hạn số condition/group, số sản phẩm chọn tay, số ký tự search trong Figma.
- Tên sản phẩm cắt "..." trong list conflict và card.
- Không thấy text "No option found." ở bất kỳ node nào → empty state dropdown giá trị rỗng và empty state kết quả search (không khớp) chưa được thiết kế; [CẦN XÁC NHẬN BA] – giả thuyết: dropdown hiển thị "No option found." giống component dropdown chuẩn của app.

### 6. Message / toast / popup text nguyên văn
Toast:
- "Product hidden" / "Product has been hidden." (2056:45712)
- "Product buried" / "Product has been buried." (2662:61492)
- "Product filtered" / "Product has been filtered." (2980:39667)
- (Boost, ngoài vùng) "Success" / "Product has been deboosted." (2989:39336)

Popup Hide products: "Hide products"; "Set conditional rules"; "Hide products that match specific conditions (e.g., price, stock, ...)"; "Or"; "+ And"; "+ Create new condition"; "Additionally hide products"; "Use this to hide specific products outside of the conditions above."; "Search product name, SKU,..."; "320 product(s) hidden" / "42 product(s) hidden" / "530 product(s) hidden" / "533 product(s) hidden"; "Cancel"; "Save"; "Select condition"; "Select value"; "Between"; "Hide" (nút trên dòng kết quả).
Popup conflict: "9 products have conflicts"; nhãn "Pinned", "Buried"; "Return".
Popup Bury products: "Bury products"; "Bury products that match specific conditions (e.g., price, stock, ...)"; "Additionally hide products" (nguyên văn sai, nên là bury – xem mục 8); "Use this to bury specific products outside of the conditions above."; "0 product(s) buried"; "1 product(s) buried".
Popup Filter results: "Filter results"; "Display products by condition"; "Select product to filter"; "Customize product list you want to show during campaign time"; "Filter products that match this group"; "Filter Override Notice"; "1. Applying filters will temporarily override any existing Pin/Hide/Bury actions on products."; "2. Once filtering is complete, you can reapply Pin/Hide/Bury actions to the filtered results as needed."; "+ New condition group"; "0 product(s) selected".
Dialog: "Filter results?"; "Do you want to filter these products when trigger happens? Previous applied actions while be reset." (nguyên văn, lỗi ngữ pháp "while be reset"); nút "Cancel", "Filter".
Banner sau Filter: "Filtered applied. Only show 233 of 980 producrs" (nguyên văn, lỗi chính tả "producrs").
Banner chung: "Preview how search results appear when customers search for 'summer shirt'. This list can be changed due to sync plan."
Tooltip/coachmark (chung, ngoài vùng): "Use these tools to customize multiple product rankings across pages." ; "Search to quickly find and adjust ranking." ; "Undo/ Redo changes or return to original rankings" ; "Drag & drop products to reorder them. Changes here directly impact what customers see in search results."

### 7. Câu hỏi mở (giả thuyết – mức chặn)
1. Danh sách thuộc tính condition của Hide/Bury/Filter (Brand, Price, Product Category, Product Type, Inventory status, Free shipping, Featured products, Purchasability, Product/Modifier Options, ...): kiểu giá trị từng thuộc tính (single/multi/text/số) và toán tử (Between, equals, ...). Giả thuyết: giống bộ condition của trigger/Boost-Deboost "Select condition". Mức chặn: CAO (không viết được test chi tiết value theo thuộc tính).
2. Empty state: dropdown giá trị khi không có option, search không khớp. Giả thuyết: "No option found." / "No products found". Chặn: TRUNG BÌNH.
3. Hide popup có tab "By condition"/"By specific products" không (XML có, ảnh không)? Giả thuyết: không còn tab. Chặn: THẤP.
4. Giới hạn: số group/condition tối đa, số sản phẩm chọn tay tối đa. Giả thuyết: không giới hạn. Chặn: THẤP.
5. Cách tính footer "N product(s) hidden" khi condition và sản phẩm chọn tay trùng; và 320 → 42 → 530 (không khớp tuyến tính, có thể mock). Giả thuyết: đếm distinct union. Chặn: TRUNG BÌNH.
6. Popup conflict: điều kiện kích hoạt (Hide đè Pin/Bury?), "Return" làm gì (quay lại popup để sửa), 9 sản phẩm gồm Pinned và Buried; Bury/Filter có popup conflict tương tự (node "Cross-rule" 3092:50329)? Giả thuyết: Hide ưu tiên cao nhất, user phải gỡ conflict mới Save. Chặn: CAO.
7. Filter xóa các action Pin/Hide/Bury trước đó: reset tức thời khi xác nhận hay khi trigger xảy ra ("when trigger happens")? Giả thuyết: lưu lúc Save, áp lúc campaign chạy. Chặn: CAO.
8. State sau Filter: Pin/Bury/Hide còn dùng được không? Banner "Only show 233 of 980" nghĩa là Preview chỉ lọc hay thực sự ẩn ngoài tập? Giả thuyết: Preview chỉ hiển thị 233. Chặn: TRUNG BÌNH.
9. Bury: nút trên dòng kết quả search là [Bury] hay [Hide]? Save khi chỉ có sản phẩm chọn tay. Giả thuyết: nút [Bury], Save enabled. Chặn: THẤP.
10. Confirm to hide dialog: text nội dung (không chụp được). Chặn: TRUNG BÌNH.
11. Unhide/Unbury: có dialog xác nhận không; sau Unbury sản phẩm trở về rank cũ hay theo score? Giả thuyết: theo score. Chặn: TRUNG BÌNH.
12. "disable drag": áp dụng cho card nào? Giả thuyết: card đang Hide/Bury hoặc mở quick-actions. Chặn: THẤP.
13. Badge "Hide 233": 233 = số hiển thị sau hide hay số bị ẩn? (trùng số 233 của "Filter 233" và "233 of 980"). Giả thuyết: số SP bị ảnh hưởng (giá trị mock). Chặn: THẤP.

### 8. Mâu thuẫn / không nhất quán
1. Popup Bury dùng tiêu đề "Additionally hide products" (3508:38768, 3538:34773) trong khi mô tả là "Use this to bury ...". Có vẻ copy-paste từ Hide.
2. Nút thêm group: "Create new condition" (Hide/Bury) vs "New condition group" (Filter) – cùng chức năng, tên khác.
3. Filter có hai bản popup: bản A (2066:132884) "Display products by condition" + Override Notice, bản B (2066:144886) "Select product to filter" + dialog xác nhận, không có Override Notice trong ảnh. Cùng popup, copy khác; sidemenu và toolbar frame B khác frame A. Chưa rõ bản nào hiện hành.
4. Note "Typing triggers a dropdown above the bar" vs ảnh (dropdown dưới ô search).
5. Note Bury (Save disabled khi no condition) vs ảnh 3538:34741 (không có condition nhưng Save enabled do có sản phẩm chọn tay).
6. Dropdown giá trị Brand (3391:44052) cuối list có "Product Options", "Product Title" – là tên thuộc tính chứ không phải brand; có thể dữ liệu mock sai hoặc chuyển từ list condition.
7. Typo: "Filtered applied", "producrs", "while be reset", "Previous applied actions".
8. Hide popup state đầu (3367:43129): icon thùng rác mờ nhưng nhãn "By default" note thuộc Bury; chưa rõ Hide cũng áp dụng cùng rule disable thùng rác.
9. Hide popup có nút "Cancel" và X trong khi note 2066:71808 "Click to Cancel → Close popup" nói về dialog confirm; không rõ Cancel của popup điều kiện có confirm discard.
10. Toolbar sau Filter bỏ ô search + "Boost/Deboost" → "Adjust score" (chưa có note giải thích) – và frame 2066:144886 cũng đã có "Search" icon dù chưa Filter.
11. Số 233 lặp ở "Hide 233", "Filter 233" và "233 of 980" (ba ngữ cảnh khác nhau).

## Vùng D — Boost/Deboost merchandise score, preview, Action Conflict
Nguồn: Figma MCP (screenshot + metadata XML cục bộ merch-meta.xml). Nhãn nút trong instance (Button) KHÔNG nằm trong XML, chỉ đọc được qua screenshot; phần nào không có screenshot thì ghi rõ.

### 1. Tổng quan phạm vi đã đọc

Section "Boost/Deboost" = 2066:146676 (con của section 2.3 Manage merchandise campaign 1900:33715). Có 2 luồng: (1) single product (2066:146716), (2) multiple products (2066:146703). Có thêm khung "Option 2" (1842:39364).

Đã mở + chụp màn hình (xem được ảnh):
| node-id | Tên frame | Nội dung |
|---|---|---|
| 2066:146743 | action full-screen popup | Rule table rỗng (default screen) |
| 2066:186539 | action full-screen popup | Rule table có 3 rule (trang 1 rút gọn) |
| 4144:35867 | popup/ pagination | Rule table 10 hàng + phân trang |
| 2066:146854 | action full-screen popup | Step 1, tab By condition, rỗng (default) |
| 2076:106624 | action full-screen popup | Step 1, tab By specific products (80 selected) |
| 2066:146962 | action full-screen popup | Step 1, By condition, dropdown value Brand mở (122 selected) |
| 2989:40425 | action full-screen popup | Step 1, By condition nhiều group (640 selected) |
| 2066:171097 | action full-screen popup | Step 2 default (slider = 0) |
| 2066:179520 | action full-screen popup | Step 2, Boost 500 |
| 2989:42244 | action full-screen popup | Step 2, Deboost -100 (640 selected) |
| 2066:146680 | action full-screen popup | Preview sau khi Save (toast success, badge "Boost/Deboost 12") |
| 2989:41320 | popup | Step 2 Deboost -250 (122 selected), nút Back/Save (nằm ngoài section, toạ độ 15198,40635) |
| 3283:40837 | popup | Rule table 1 rule "Kawada Rice Bowl" -100 (ngoài section, 11619,37873) |
| 2187:111384 | section "Boost/Deboost Rule table explanation" | 3 case Rule/Products affected/Score change |
| 2066:146676 | section (overview 2400px) | luồng tổng thể (chỉ đọc cấu trúc, chữ nhỏ) |
| 2573:68624 | card- product/ merchandise-preview-action (Case 1) | popup nhập score, giá trị 0, Apply disabled |
| 3508:38835 | card (Case 2) | popup nhập score, -100, Apply enabled |
| 2989:39286 | card (Case sau khi nhập) | -100, Apply enabled |
| 2989:39336 | full-screen popup - action (single, kết quả) | toast "Product has been deboosted." + tooltip breakdown |
| 2989:44120 | Popups (instance) | popup Delete rule |
| 2989:40347 | card | badge pin + boost cạnh số thứ tự |
| 2989:44165 | merchandise score (component) | chip score trong list (chưa xem ảnh, chỉ XML: icon + số, dấu "-" cho âm) |
| 3508:38019 | popup - hide multiple products | popup Conflict (thuộc section Hide, nhưng là popup conflict duy nhất tìm thấy) |

Chỉ đọc qua XML text (không chụp ảnh): 2076:108740..108745 (caption từng màn), 2066:179518 / 2066:181560 (note slider), 3508:38833 / 38834 (Case 1/2), 1842:39364 + 1576:25977 ("main-text", nội dung rỗng trong XML), 2989:39907 (component note), 2989:40375/40396/40397 (Action order), 2644:62941 (note 2.1).

KHÔNG đọc được / không có ảnh:
- Các frame Edit (sau khi bấm nút Edit ở rule): chỉ thấy ở overview 2066:146676 ở độ phân giải thấp (Edit quay lại step 1 -> Next -> step 2 -> Save, nối bằng mũi tên "Edit" và "Delete"). Không có frame riêng đọc chữ.
- 2989:41320 và 3283:40837 chỉ là bản copy popup ở vị trí ngoài section, không mở rộng thêm.
- Nhãn đầy đủ nút trong popup Delete/Conflict đọc từ ảnh (OK). Không tìm thấy popup nào khác chứa chữ "conflict" ngoài popup Hide (kiểm tra bằng grep toàn file merch-meta.xml: text chứa conflict/pinned/buried chỉ có Pin/Bury/Hide label và popup "9 products have conflicts"). Không có popup xung đột Boost vs Pin/Bury/Hide trong vùng D.
- Note "Option 2": text node 1576:25977 "main-text" không có nội dung đọc được trong XML (có thể là text ngoài vùng/rich text) -> [CẦN XÁC NHẬN BA].

### 2. Bảng màn / popup / state

Chung: tất cả là popup full-screen 1120x800 "Boost/Deboost merchandise score" phủ trên màn "Customize product rankings" (nút Cancel/Save Changes của trang bị overlay làm mờ). Header có icon X (đóng) ở góc phải.

| Màn | node-id | Cách mở | Thành phần UI | Save/Cancel/đóng |
|---|---|---|---|---|
| A. Rule table rỗng (default screen) | 2066:146743 | Bấm "Boost/Deboost" trên thanh action của màn Customize product rankings (toolbar: Pin, Bury, Hide, Filter, Boost/Deboost n) | Banner cam (có X đóng): "Use Boost/Deboost to create rules that temporarily change product rankings." + "For example: 1st rule ▲Boost featured products (+300 merchandise score) to show them higher. 2nd rule ▼Deboost low-stock items (-200 merchandise score) to show them lower."; tiêu đề "Boost/Deboost Rule"; nút "+ Create new"; bảng cột: (STT) / Rule / Products affected / Merchandise score change / Action; empty text "There is currently no Boost/Deboost rule." | X đóng popup. Không có footer |
| B. Rule table có dữ liệu | 2066:186539, 4144:35867, 3283:40837 | Như A khi đã có rule | Mỗi hàng: STT, Rule, Products affected, Merchandise score change, Action (icon bút = Edit, icon thùng rác = Delete). Phân trang dưới bảng: "< Prev 1 2 3 4 5 6 ... 9 10 Next >" (frame popup/ pagination, 10 hàng/trang trong mock) | X đóng |
| C. Step 1 "Select products" - By condition (default) | 2066:146854 | Bấm "+ Create new" | Stepper: "1 Select products -> 2 Boost/Deboost merchandise score"; tab "By condition" (active) / "By specific products"; hàng điều kiện: dropdown "Select condition" > dropdown "Select value" (disabled khi chưa chọn condition), icon thùng rác; link "+ And"; chữ "Or"; nút "+ New condition group"; panel phải: "The matched product list will be displayed in the next step."; footer trái "0 product(s) selected" (số cam); nút "Cancel", "Next" (disabled khi 0 sản phẩm) | Cancel/X = đóng popup (dựa nhãn; hành vi chi tiết [CẦN XÁC NHẬN BA]: về lại rule table hay đóng hẳn). Next -> step 2 |
| D. Step 1 - By condition có dữ liệu | 2066:146962, 2989:40425 | Chọn condition + value | Multi-select value có checkbox (ví dụ Brand: 3D Energy, 5% Nutrition, AD Life, AfterDark, Allmax Nutrition, Alpha Lion, ALRI (ALR Industries), Anabar, Product Options...), chip tag có X; Price "Between" $400 - $599; Review Ratings "Is greater than" 5 sao; "+ And" trong group, "Or" giữa group; footer đếm "122 product(s) selected" / "640 product(s) selected" | Next enabled khi count > 0 |
| E. Step 1 - By specific products | 2076:106624 | Tab "By specific products" | Ô tìm "Search product name, SKU,..."; list sản phẩm (ảnh + tên) mỗi hàng nút "Select" (cam nhạt), hàng đã chọn nút xám "Select" (disabled/selected); footer "80 product(s) selected"; Cancel, Next. Step 2 label trong frame này là "Adjust merchandise score" (khác C/D, xem mục 8) | Như C |
| F. Step 2 default | 2066:171097 | Next từ Step 1 | Trái: card "▲ Boost ▼ Deboost merchandise scores by" + "Boost/deboost products you want to show more/less frequently", ô input (giá trị 0), thanh trượt -999 / -500 / 0 / 500 / 999 (thumb ở 0). Phải: "Selected products" bảng Product name / Merchandise score hiển thị score hiện tại của từng sản phẩm (10, 20, 0, 0, -1, -500 trong mock). Footer: "122 product(s) selected", nút "Back", "Next" (xem mục 8: nút này là "Next" thay vì "Save" ở default) | Back về step 1 |
| G. Step 2 Boost | 2066:179520 | Kéo slider > 0 hoặc nhập số dương | Label đổi thành "▲ Boost merchandise scores by" (xanh), input "500", thanh cam từ 0 đến thumb; preview điểm sản phẩm cập nhật; nút "Back", "Save" | Save lưu rule |
| H. Step 2 Deboost | 2989:42244, 2989:41320 | Kéo slider < 0 hoặc nhập số âm | Label "▼ Deboost merchandise scores by" (đỏ), input "- 100", thanh cam từ thumb đến 0; score hiển thị "- 90", "- 80", "- 100"...; footer "640 product(s) selected"; nút trái đầu footer ở 2989:42244 là "Cancel" (khác G là "Back"), 2989:41320 là "Back"; "Save" | Save lưu |
| I. Preview sau Save (multi) | 2066:146680 | Save ở step 2 | Toast xanh "Success / Product has been boosted/ deboosted." (góc phải trên); toolbar badge "Boost/Deboost 12"; thẻ sản phẩm hiện icon tag xanh (boosted) / đỏ (deboosted) ở góc trên phải ảnh; thẻ số 2 có thêm icon pin cam | Popup đóng, quay về preview |
| J. Single product - Quick action | 2573:68398 / 2573:68441 / 2573:68539 | Hover thẻ sản phẩm -> "Quick actions" -> "Boost/Deboost" | Popup nhỏ trên thẻ: input số (căn phải), text "Score range (-999) to 999", nút "Apply", nút X vuông (đóng) | |
| J1. Case 1: Boost/Deboost lần đầu | 2573:68624 (note 3508:38833) | Quick action lần đầu của sản phẩm | Input = 0, "Apply" disabled (xám) | X đóng |
| J2. Case 2: Boost/Deboost lần n | 3508:38835 (note 3508:38834) | Quick action khi sản phẩm đã có rule | Input prefill -100, "Apply" enabled (cam) | X đóng |
| K. Kết quả single | 2989:39336 | Apply | Toast "Success / Product has been deboosted."; badge toolbar "Boost/Deboost 1"; thẻ SP 2 icon đỏ; tooltip điểm khi hover/click: "Base score - 500 x 50%", "Merchandise score - 999 x 30%", "Self-learning score - 999 x 20%", "Ranking score -999" (xem mục 8) | |
| L. Delete rule popup | 2989:44120 (annotation "Delete" 2989:44134) | Icon thùng rác ở hàng rule | Icon cảnh báo vàng, tiêu đề "Delete boost/deboost rule?", mô tả "You're about to permanently remove entire boost/deboost rule. This action cannot be undone.", 2 nút: "Delete" (viền xám, bên trái) và "Cancel" (cam, bên phải) | Delete = xoá; Cancel = đóng |
| M. Edit rule | (annotation 2076:109383 "Edit") | Icon bút ở hàng rule | Chỉ thấy ở overview: Edit -> màn step 1 đã điền sẵn -> Next -> step 2 đã điền -> Save -> quay lại rule table. Không có frame đọc chữ | [CẦN XÁC NHẬN BA] |
| N. Rule table explanation | 2187:111384 | (tài liệu giải thích cột) | Xem mục 4 | |

Caption từng màn trong luồng multi (2076:108740..108745): "View and manage all rules in a summary table (default screen)"; "Select products (by condition) (default screen)"; "Select products (by condition)"; "Boost/deboost merchandise score with a score slider or manually input (default screen)"; "Boost/deboost merchandise score with a score slider or manually input"; "Select products (by specific products)". Tiêu đề section: "Boost/Deboost merchandise score of single product" / "Boost/Deboost merchandise score of multiple products".

### 3. Bảng field / control

| Tên | Kiểu control | Default | Options / range | Bắt buộc | Nguồn dữ liệu |
|---|---|---|---|---|---|
| Tab By condition / By specific products | Tab | By condition | 2 tab | - | Config nội bộ |
| Select condition | Dropdown | "Select condition" | Thấy trong ảnh: Brand, Price, Review Ratings, Inventory status; danh sách đầy đủ [CẦN XÁC NHẬN BA] | Có (ít nhất 1 để Next) | Giá trị lấy từ product sync BigCommerce (Brand, Price, Inventory) và Review (Tính toán/sync review) - [CẦN XÁC NHẬN BA] cho Review Ratings |
| Select value (Brand) | Multi-select checkbox + chip | disabled tới khi chọn condition | danh sách brand của store | Có | Sync trực tiếp từ BigCommerce (brand) |
| Price Between | Dropdown operator + 2 input tiền "$400 - $599" | - | Between (các operator khác [CẦN XÁC NHẬN BA]) | Có | Sync trực tiếp (price) |
| Review Ratings Is greater than | Dropdown operator + dropdown số sao | - | "Is greater than", 5 sao | Có | [CẦN XÁC NHẬN BA] (review có thể là sync/tính toán) |
| Inventory status Is/out of stock | Dropdown | - | "Out of stock" (và các giá trị khác [CẦN XÁC NHẬN BA]) | Có | Sync trực tiếp |
| + And | Link | - | thêm điều kiện trong cùng group (AND) | - | - |
| Or / + New condition group | Link/nút | - | thêm group mới (OR) | - | - |
| Icon thùng rác (condition) | Icon | - | note 3367:43302 / 3508:38734 (thuộc section Hide, cùng pattern): "Select value dropdown is disabled Delete icon is disabled when it's the only one condition Save button is disabled when no condition is setup" | - | - |
| Search product | Text input | placeholder "Search product name, SKU,..." | - | - | Sync trực tiếp |
| Select (SP cụ thể) | Button toggle | cam nhạt; đã chọn: xám | - | - | - |
| "{n} product(s) selected" | Counter | 0 | - | Next disabled khi 0 | Tính toán từ dữ liệu sync (count match) |
| Merchandise score by | Input số + slider | 0 | -999..999 (nhãn trục: -999, -500, 0, 500, 999); đọc từ "Score range (-999) to 999" | Có (khác 0 để Apply/Save, theo Case 1) | Config nội bộ |
| Label ▲ Boost / ▼ Deboost | Text động | cả hai hiển thị khi = 0 | >0 "▲ Boost" (xanh); <0 "▼ Deboost" (đỏ) | - | - |
| Selected products (preview step 2) | Bảng read-only | - | cột Product name, Merchandise score (chip icon: xanh dương/tím = 0, xanh lá = dương, đỏ = âm) | - | Product: sync; score: Config nội bộ |
| Rule table | Bảng | rỗng | cột Rule, Products affected, Merchandise score change, Action | - | Config nội bộ |
| Product Merchandise score mặc định | Giá trị | 0 (note 2989:39907 "default merchandise score = 0") | - | - | Config nội bộ |
| Banner hướng dẫn | Banner có X | hiển thị | đóng được (X) | - | - |

### 4. Business rule và dependency (trích nguyên văn)

### 4.1 Note nguyên văn
> "Drag score slider to the right (> 0) → Hiển thị text “▲ Boost”" (2066:179518)
> "Drag score slider to the left (< 0) → Hiển thị text “▼ Deboost”" (2066:181560)
> "default merchandise score = 0" (2989:39907)
> "🤔 Option 2 - More advanced, flexible, support multiple use cases in a setup" (1842:39364; nội dung chi tiết kèm theo 1576:25977 "main-text" không đọc được)
> "show only 2 most recently added products with full details (image + product name), then display the remaining products as a numerical counter (\"+ 120 other products\")" (2187:111731)
> "select products matching BOTH conditions" (2187:110626)
> "Case 1: Boost/Deboost lần đầu" (3508:38833)
> "Case 2: Boost/Deboost lần n" (3508:38834)
> "Merchandise Score (30%) – Temporarily added to product score to boost product ranking when a campaign is activated. Automatically resets to 0 when campaigns end." (2644:62941, section 2.1)
> "Product ranking score : hiển thị default và self-learning score (all time)   + điểm merchandise campaign (in a period, điểm này k tính vào điểm total, chỉ list điểm từ các campaign)" (618:16819, note section 2.1)
> "is 1st action" (2989:40375), "is 2nd action" (2989:40396), "Action order" (2989:40397)
> Các text nhãn: "Hover to a product" (2573:68398), "Quick actions" (2573:68441), "Boost/Deboost" (2573:68539), "Enter number" (2989:39268), "Apply" (2989:39334)
> Nhãn trạng thái thẻ (component): pinned, buried, hidden, filtered, boosted, deboosted (2980:38750-38754, 2989:39900)
> Các nhãn 2187: "Selects products “By specific products”", "Selects products “By condition”", "Selects products “By condition” + “By specific products”", "{x} + {y}", "{x} products", "{y} products", "all selected specific products", "+ all selected specific products", "condition", "value", "condition group", "from", "product img + name".

Lưu ý: "Adjust items that match this group" và "Adjust items" không tìm thấy trong vùng đọc của tôi (không có text node tên này trong section Boost/Deboost) -> có thể nằm ở section khác (Filter results?) hoặc đã đổi tên: [CẦN XÁC NHẬN BA].

### 4.2 Diễn giải Rule table (section 2187:111384, 3 case)
1. By specific products: Rule = ảnh + tên SP; chỉ hiện 2 SP thêm gần nhất đầy đủ (ảnh + tên), phần còn lại gộp "+ 120 other products". Products affected = số SP đã chọn (122). Merchandise score change = "+ 500" lấy từ score nhập ở step 2 (hộp "▲ Boost merchandise scores by 500").
2. By condition: Rule = chuỗi condition (ví dụ "Brand is Allmax Nutrition, 5% Nutrition, 3D Energy, ALRI (ALR Industries)" + "And" "Price is between $400 - $599"; group 2 "Or" "Review Ratings is greater than 5 ★"). Products affected = {x} + {y} (hợp của các group OR; trong group AND = giao, "select products matching BOTH conditions"). Hiển thị dạng Venn: Brand ∩ Price (x) ∪ Review Ratings (y).
3. Kết hợp By condition + By specific products: Rule = condition ("Inventory status is out of stock") + "+ And" + danh sách SP cụ thể (2 SP + "+ 120 other products"); Products affected = "+ all selected specific products" (mock hiển thị 45). 
Cách hiểu "AND" giữa condition và specific products: [CẦN XÁC NHẬN BA] (mock cho thấy cùng 1 rule gồm cả 2 nguồn; "all selected specific products" gợi ý Products affected = tất cả SP chọn tay + SP match condition = union, không phải giao; mâu thuẫn với nhãn "+ And").

### 4.3 Rule dạng "A = X -> B ..."
- [DEP-1] Slider/input = 0 -> label hiện cả "▲ Boost ▼ Deboost" (2066:171097); > 0 -> chỉ "▲ Boost" (xanh); < 0 -> chỉ "▼ Deboost" (đỏ).
- [DEP-2] Số SP chọn = 0 -> nút "Next" disabled (2066:146854); Select value disabled khi chưa chọn condition (ảnh C).
- [DEP-3] Case 1 (Boost/Deboost lần đầu): input = 0 -> "Apply" disabled. Case 2 (lần n): input prefill score hiện tại (-100) -> "Apply" enabled.
- [DEP-4] Rule table rỗng -> hiện "There is currently no Boost/Deboost rule." (2076:109378).
- [DEP-5] Quick action trên 1 SP lần đầu tạo 1 rule 1 SP trong rule table (3283:40837: 1 hàng "Kawada Rice Bowl", Products affected 1, Score change -100) -> single product và multiple dùng chung 1 bảng rule. Suy ra từ ảnh; xác nhận [CẦN XÁC NHẬN BA].
- [DEP-6] Merchandise score hết hạn: theo note 2.1 "Automatically resets to 0 when campaigns end." -> khi campaign kết thúc, merchandise score của SP về 0 (rule không còn tác động). Trong vùng D không có frame mô tả trạng thái rule/campaign hết hạn.
- [DEP-7] Điểm merchandise không tính vào total mà chỉ liệt kê (note 618:16819: "điểm này k tính vào điểm total, chỉ list điểm từ các campaign") nhưng tooltip K lại có "Ranking score" và trọng số Merchandise 30% -> mâu thuẫn xem mục 8.
- [DEP-8] Cộng dồn nhiều rule: bảng preview step 2 cho thấy score mới = score hiện tại + (±giá trị slider): Deboost -100: 10 -> -90, 20 -> -80, 0 -> -100, -1 -> -101, -500 -> -600. Boost 500: 0 -> 500, -1 -> 499, -500 -> 0 (cộng dồn). Hai dòng đầu (10, 20) không đổi khi Boost 500 (mock lệch?), xem mục 8. Giới hạn trên/dưới sau khi cộng (vượt ±999?) [CẦN XÁC NHẬN BA].

### 4.4 Action Conflict (popup duy nhất tìm thấy)
- Frame 3508:38019 "popup - hide multiple products" (thuộc section Hide products, không thuộc Boost/Deboost). Khi nào hiện: lúc Save ở popup Hide multiple products mà trong tập SP chọn có SP đang bị Pinned/Buried -> hiện trạng thái conflict thay thế nội dung popup (suy ra từ cấu trúc "Popups" bên trong body; điều kiện chính xác [CẦN XÁC NHẬN BA]).
- Nội dung nguyên văn: header "Hide products"; icon cảnh báo vàng; tiêu đề "9 products have conflicts"; list SP (ảnh + tên) kèm tag đỏ có icon cảnh báo "Pinned" (2 dòng đầu) hoặc "Buried" (các dòng sau); footer trái "533 product(s) hidden"; nút "Cancel" (viền xám) và "Return" (cam).
- Ý nghĩa Cancel/Return (đóng hay quay về chỉnh danh sách; có tự bỏ SP conflict không) [CẦN XÁC NHẬN BA] (giả thuyết: Return = quay lại popup chọn để sửa, Cancel = đóng bỏ thay đổi).
- Không có popup/cảnh báo conflict cho Boost/Deboost với Pin/Bury/Hide/Filter. Chỉ thấy: thẻ SP có thể hiển thị đồng thời icon pin và icon boost (2989:40347) và note "Action order / is 1st action / is 2nd action" (pin = 1st, boost = 2nd theo thứ tự icon trên thẻ). Quy tắc ưu tiên khi Boost trên SP đã Pinned/Buried/Hidden [CẦN XÁC NHẬN BA] (giả thuyết: Boost/Deboost chỉ cộng score, không xung đột; Hide loại SP; Pin/Bury ghi đè vị trí, score vẫn ghi nhận).

### 5. Validation và giới hạn
- Score range: "Score range (-999) to 999" (3522:35771 / 35812 / 35804), thanh trượt nhãn -999, -500, 0, 500, 999.
- Bước slider: [CẦN XÁC NHẬN BA] (giả thuyết: 1).
- Nhập tay: input số, hiển thị "- 100" ở popup lớn (có khoảng trắng sau dấu trừ), "-100" ở quick action; số thập phân, ký tự chữ, vượt range, ô trống: không có text lỗi trong Figma -> [CẦN XÁC NHẬN BA] (giả thuyết: không cho nhập ngoài range, hoặc clamp về -999/999, Apply disabled khi = 0).
- Số sản phẩm tối thiểu để Next: >= 1 (Next disabled khi "0 product(s) selected").
- Giới hạn số rule/trang: phân trang 10 hàng/trang, hiển thị "Prev 1 2 3 4 5 6 ... 9 10 Next" (4144:35867); tổng số rule tối đa [CẦN XÁC NHẬN BA].
- Giới hạn hiển thị rule: tối đa 2 SP đầy đủ, còn lại "+ N other products".
- Chuỗi giá trị price: "Price is between $400 - $599"; rating: "Review Ratings is greater than 5" + 5 sao.

### 6. Message / toast / popup text nguyên văn
- Toast thành công multi: "Success" / "Product has been boosted/ deboosted." (2066:146680)
- Toast thành công single deboost: "Success" / "Product has been deboosted." (2989:39336). Không thấy toast riêng cho "boosted" single, cũng không thấy toast khi Edit/Delete rule -> [CẦN XÁC NHẬN BA].
- Banner: "Use Boost/Deboost to create rules that temporarily change product rankings." / "For example: 1st rule ▲Boost featured products (+300 merchandise score) to show them higher. 2nd rule ▼Deboost low-stock items (-200 merchandise score) to show them lower."
- Empty: "There is currently no Boost/Deboost rule."
- Placeholder panel phải step 1: "The matched product list will be displayed in the next step."
- Step 2: "▲ Boost ▼ Deboost merchandise scores by" / "Boost/deboost products you want to show more/less frequently"; "Selected products"; cột "Product name", "Merchandise score"; footer "{n} product(s) selected".
- Stepper: "Select products" -> "Boost/Deboost merchandise score" (một frame 2076:106624 ghi "Adjust merchandise score").
- Quick action popup: "Score range (-999) to 999", "Apply".
- Delete popup: "Delete boost/deboost rule?" / "You’re about to permanently remove entire boost/deboost rule. This action cannot be undone." / nút "Delete", "Cancel".
- Conflict popup (Hide): "Hide products", "9 products have conflicts", "Pinned", "Buried", "533 product(s) hidden", "Cancel", "Return".
- Preview banner: "Preview how search results appear when customers search for 'summer shirt'. This list can be changed due to sync plan."
- Tooltip điểm: "Base score", "Merchandise score", "Self-learning score", "Ranking score".

### 7. Câu hỏi mở (kèm giả thuyết, mức chặn)
1. Boost/Deboost trên SP đang Pinned/Buried/Hidden/Filter-out có xung đột/cảnh báo không? Giả thuyết: không có popup; Boost chỉ cộng score, Pin/Bury ghi đè vị trí, Hide loại khỏi list. Chặn: Cao (viết case conflict).
2. Popup conflict (Hide) hiện khi nào chính xác, "Return" làm gì, và có popup tương tự khi Pin/Bury trùng Hide/Boost? Giả thuyết: Return quay lại bước chọn, SP conflict không bị hide cho đến khi merchant sửa. Chặn: Trung bình (thuộc vùng Hide).
3. Boost lần n: tạo rule mới (cộng dồn) hay sửa rule cũ? Quick action Case 2 prefill -100 gợi ý sửa rule hiện có. Giả thuyết: single product = 1 rule/1 SP, sửa ghi đè; rule multiple cộng dồn qua nhiều rule. Chặn: Cao.
4. Cộng dồn nhiều rule trên cùng SP và chặn trên/dưới sau cộng (>999 hoặc <-999)? Giả thuyết: score cuối bị clamp -999..999. Chặn: Cao.
5. Thứ tự rule trong bảng có ý nghĩa ưu tiên không (STT 1,2,3, banner nói "1st rule ... 2nd rule")? Giả thuyết: chỉ là số thứ tự tạo; không ảnh hưởng. Chặn: Trung bình.
6. Edit rule: đổi cả tập SP/condition hay chỉ score? Giả thuyết: mở lại step 1 đã điền sẵn, đổi được cả hai. Chặn: Trung bình.
7. Badge "Boost/Deboost 12" (và "1") là số rule hay số SP bị tác động? Giả thuyết: số rule. Chặn: Thấp.
8. Validate nhập tay: ký tự, số thập phân, vượt range, giá trị 0 khi Save, text lỗi. Giả thuyết: Apply/Save disabled khi 0, clamp ngoài range. Chặn: Cao.
9. Rule gắn với campaign nào? Khi campaign hết hạn, rule Boost/Deboost bị xoá hay chỉ vô hiệu, score về 0 theo note 2.1; rule table có trạng thái hết hạn không? Giả thuyết: rule thuộc campaign, hết hạn vô hiệu, bảng rule vẫn hiện trong Edit campaign. Chặn: Cao.
10. Re-evaluate sau sync: By condition tính lại match sau mỗi sync (Products affected có đổi)? Giả thuyết: có, theo mô tả module Merchandise. Chặn: Trung bình.
11. Kết hợp By condition + By specific products: union hay giao (nhãn "+ And" vs "all selected specific products")? Giả thuyết: union. Chặn: Cao.
12. "Option 2" 1842:39364 là thiết kế được chọn hay phương án đề xuất? Giả thuyết: là phương án được dùng (flow rule table nhiều rule). Chặn: Thấp.
13. Biến thể SP: score SP = trung bình các variant, hiện Boost áp trên SP hay từng variant? (note 1057:10677 của 2.1). Giả thuyết: áp ở mức SP, ghi đè cho variant. Chặn: Trung bình.
14. Step 2 ở frame default (2066:171097) nút là "Next" thay vì "Save", và ở 2989:42244 nút trái là "Cancel" thay vì "Back". Giả thuyết: lỗi design, chuẩn là "Back" + "Save". Chặn: Thấp.

### 8. Mâu thuẫn / không nhất quán
1. Nút footer step 2: 2066:171097 = "Back" + "Next" (nhưng đây là bước cuối); 2066:179520 = "Back" + "Save"; 2989:42244 = "Cancel" + "Save"; 2989:41320 = "Back" + "Save". Không thống nhất.
2. Label step 2 trong stepper: "Boost/Deboost merchandise score" (hầu hết frame) vs "Adjust merchandise score" (2076:106624).
3. Preview điểm Boost 500 (2066:179520): SP 1 và 2 vẫn 10 và 20 (không +500), trong khi các SP khác cộng dồn (0 -> 500, -1 -> 499, -500 -> 0). Deboost -100 thì cộng đúng cho cả 6 SP. Có thể là lỗi mock.
4. Tooltip K (2989:39336): "Base score - 500 x 50%", "Merchandise score - 999 x 30%", "Self-learning score - 999 x 20%", "Ranking score -999". Merchandise score hiển thị 999 trong khi rule vừa Deboost -100/-250; tổng không khớp công thức; và note 618:16819 nói điểm merchandise không tính vào total. Chưa rõ công thức xếp hạng.
5. Popup Delete: nút "Delete" kiểu secondary (viền xám) còn "Cancel" kiểu primary cam — ngược quy ước thông thường, có thể do thiết kế cố ý để tránh bấm nhầm; cần BA xác nhận.
6. Dấu trừ: "- 100" (có khoảng trắng) ở popup lớn và rule table, "-100" ở quick action và "-999" ở tooltip.
7. Section 2.1 mô tả "Merchandise Score (30%)" và "resets to 0 when campaigns end" nhưng Boost/Deboost ở đây là rule độc lập trong popup "Customize product rankings" (có Save Changes, Undo, Redo, Reset all) chứ không thấy gắn campaign (ngoại trừ preview "Create new campaign" ở header) -> chưa rõ rule lưu khi Save campaign hay lưu ngay.
8. Toast "Product has been boosted/ deboosted." (multi) vs "Product has been deboosted." (single); thiếu toast cho boost single, edit, delete.
9. Pagination: mock 10 hàng nhưng rule table mẫu 2066:186539 chỉ hiện 3 hàng (cuộn trong popup, không phân trang) -> hiển thị cuộn vs phân trang chưa thống nhất.
