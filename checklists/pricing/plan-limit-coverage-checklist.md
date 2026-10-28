# Coverage checklist - plan-limit

Nguồn: docs/specs/pricing-specs.md (mục 2, 3.2, 4, 10 đến 16; mục 16 ưu tiên cao nhất), docs/specs/pricing-compare-plans-specs.md, docs/updates/pricing-updates.md. Test case: test-cases/pricing/plan-limit/plan-limit_testcase.csv, 90 case (ID 1 đến 90, bỏ dòng Purpose); không có file matrix. Audit lại từ đầu ngày 2026-10-28 (qua skill check-testcase-coverage), sau khi thêm 5 case và sửa 2 case hạ gói (thêm bước Sync). Ngoài phạm vi: khoá tính năng theo gói (compare-plans), hiển thị Monthly usage, Need more, icon, add-on (plan-and-add-on).

## Tổng quan
- Tổng số rule: 88
- Covered: 84
- Partial: 4
- Not covered: 0

## Chi tiết

### Merchandise Campaign

- [x] AC-01 — Starter: hạn mức 10 active campaign; 9/10 còn tạo được, 10/10 khoá [Create new] — Covered — TC: 6
- [x] AC-02 — Standard: hạn mức 40; 39/40 tạo được, 40/40 khoá — Covered — TC: 6
- [x] AC-03 — Growth: hạn mức 100; 99/100 tạo được, 100/100 khoá — Covered — TC: 1, 5, 7
- [x] AC-04 — Scale/Advanced/Enterprise: Unlimited, [Create new] không bao giờ khoá — Covered — TC: 2, 89
- [x] AC-05 — Chạm hạn mức: [Create new] disabled + tooltip "Plan limit reached. This feature is temporarily locked."; click không mở popup tạo — Covered — TC: 3, 5, 6
- [x] AC-06 — Giảm xuống dưới hạn mức (tắt Active hoặc xoá campaign) thì mở lại [Create new] — Covered — TC: 7, 8
- [x] AC-07 — Bật lại campaign Inactive khi đã đủ hạn mức bị chặn, hiển thị lý do trên campaign (X8) — Covered — TC: 9
- [x] AC-08 — "Active" = đang chạy trong thời gian chạy; Inactive và hết hạn không tính (X8) — Covered — TC: 10
- [x] AC-09 — Campaign đặt lịch (Campaign time) không tự bật khi đã đủ hạn mức, hiển thị lý do (X7) — Covered — TC: 70
- [x] AC-10 — Nâng gói (Starter lên Growth) mở lại [Create new] — Covered — TC: 67
- [x] AC-11 — Hạ gói áp dụng ngay: giữ các campaign tạo lâu nhất trong hạn mức mới, mục tạo sau bị lock (xem được, không sửa, không bật) (X1, V1, U10) — Covered — TC: 68
- [x] AC-12 — Biên hạ gói campaign: đúng bằng hạn mức mới (10) không lock; hơn 1 (11) thì lock đúng 1 mục tạo sau cùng — Covered — TC: 65
- [x] AC-13 — Campaign bị lock ngừng áp dụng trên Storefront (SRP, Category Page) (X2) — Covered — TC: 68
- [x] AC-14 — Nâng lại gói thì campaign bị lock được mở lại (V1) — Covered — TC: 68

### Campaign details (Active Execution in Campaigns)

- [x] AC-15 — Starter: hạn mức 3 execution; 2/3 mở, 3/3 khoá [New execution] — Covered — TC: 18
- [x] AC-16 — Standard: hạn mức 5; 4/5 mở, 5/5 khoá — Covered — TC: 18
- [x] AC-17 — Growth: hạn mức 10; 9/10 mở, 10/10 khoá — Covered — TC: 17, 22
- [x] AC-18 — Scale/Advanced/Enterprise vẫn giới hạn 10 (không Unlimited) — Covered — TC: 19
- [x] AC-19 — Default Execution được tính vào hạn mức — Covered — TC: 16, 18
- [x] AC-20 — Execution tính toàn store, không theo từng campaign (X8) — Covered — TC: 21
- [x] AC-21 — Chạm hạn mức: [New execution] disabled + tooltip khoá — Covered — TC: 17 đến 19, 21
- [x] AC-22 — Xoá execution thì mở lại [New execution] — Covered — TC: 20
- [x] AC-23 — Nâng gói (Starter lên Standard) mở lại [New execution] — Covered — TC: 71
- [x] AC-24 — Hạ gói: giữ execution tạo lâu nhất, mục sau bị lock (xem được, không sửa, không bật) — Covered — TC: 73
- [x] AC-25 — Execution bị lock ngừng áp dụng trên Storefront (X2) — Covered — TC: 73
- [x] AC-26 — Nâng lại gói thì execution bị lock được mở lại — Covered — TC: 73

### Filter Tree list (Number of Filter Trees)

- [x] AC-27 — Starter: hạn mức 3 tree (gồm default); 2/3 mở, 3/3 khoá [Create new] — Covered — TC: 25
- [x] AC-28 — Standard: hạn mức 10; 9/10 mở, 10/10 khoá — Covered — TC: 25
- [x] AC-29 — Growth: hạn mức 20; 19/20 mở, 20/20 khoá — Covered — TC: 25
- [x] AC-30 — Scale/Advanced/Enterprise: Unlimited — Covered — TC: 23, 89
- [x] AC-31 — Default tree được tính vào hạn mức — Covered — TC: 24, 25
- [x] AC-32 — Filter tree Inactive vẫn được tính (X8) — Covered — TC: 27
- [x] AC-33 — Chạm hạn mức: [Create new] xám + tooltip khoá — Covered — TC: 25, 27
- [x] AC-34 — Xoá tree (không phải Default) thì mở lại [Create new] — Covered — TC: 26
- [x] AC-35 — Nâng gói (Starter lên Standard) mở lại [Create new] — Covered — TC: 74
- [x] AC-36 — Hạ gói: giữ tree tạo lâu nhất, mục sau bị lock (xem được, không sửa, không bật) — Covered — TC: 76
- [x] AC-37 — Tree bị lock ngừng áp dụng trên Storefront; Filter Cache làm mới ở lần sync kế tiếp (X2) — Covered — TC: 76, 77
- [x] AC-38 — Nâng lại gói thì filter tree bị lock được mở lại — Covered — TC: 76

### Add filter node (Filter Nodes Custom Builder)

- [x] AC-39 — Starter: hạn mức 3 custom node; 2/3 thẻ "My own filter" mở, 3/3 mờ — Covered — TC: 30
- [x] AC-40 — Standard: hạn mức 10; 9/10 mở, 10/10 mờ — Covered — TC: 30
- [x] AC-41 — Growth: hạn mức 20; 19/20 mở, 20/20 mờ — Covered — TC: 30
- [x] AC-42 — Scale/Advanced/Enterprise: Unlimited — Covered — TC: 28, 89
- [x] AC-43 — Chỉ đếm node tạo bằng Custom Builder; node dựng sẵn (Brand...) không tính — Covered — TC: 29
- [x] AC-44 — Node dùng ở nhiều tree chỉ đếm 1 (X8) — Covered — TC: 33
- [x] AC-45 — Chạm hạn mức: chỉ khoá thẻ "My own filter" + tooltip; sửa node đã có vẫn được — Covered — TC: 30, 31
- [x] AC-46 — Xoá custom node thì mở lại thẻ — Covered — TC: 32
- [x] AC-47 — Nâng gói (Starter lên Standard) mở lại thẻ — Covered — TC: 78
- [x] AC-48 — Hạ gói: giữ custom node tạo lâu nhất, mục sau bị lock (xem được, không sửa, không bật) — Covered — TC: 80
- [x] AC-49 — Node bị lock ngừng áp dụng trên Storefront; Filter Cache làm mới ở lần sync kế tiếp (X2) — Covered — TC: 80
- [x] AC-50 — Nâng lại gói thì custom node bị lock được mở lại — Covered — TC: 80
- [x] AC-51 — Biên hạ gói của execution, filter tree, custom node (đúng bằng hạn mức mới và hơn 1) giống campaign — Covered — TC: 66
- [~] AC-52 — Cách đếm usage và mở lại sau hạ gói: mục lock có tính vào "đã dùng" không; xoá mục chưa lock thì mục lock sớm nhất được mở lại — Partial — TC: 68, 73, 76, 80 (Expected hiện 14/10, 7/3, 9/3, 5/3 (đếm cả mục lock) và "mở lại mục tạo sớm nhất" đều chưa có trong spec mục 16; X8 chỉ tính campaign đang chạy nên 14/10 có thể mâu thuẫn; cần BA chốt (Note các case đã ghi cần confirm))

### Date range (Analytics và Refined Search Journey)

- [x] AC-53 — Hạn mức date range là giới hạn lùi về quá khứ: ngày bắt đầu không xa hôm nay quá N ngày (X14); đúng N áp dụng không popup; khoảng ngắn nhưng bắt đầu quá xa bị chặn; khoảng ngắn trong hạn mức không chặn — Covered — TC: 34, 39, 42, 43
- [x] AC-54 — Analytics Starter 30 days — Covered — TC: 40, 44, 45
- [x] AC-55 — Analytics Standard 90 days (90 áp dụng, 91 popup) — Covered — TC: 44, 46
- [x] AC-56 — Analytics Growth 180 days (180 áp dụng, 181 popup) — Covered — TC: 34, 39
- [x] AC-57 — Analytics Scale 270 days (270 áp dụng, 271 popup) — Covered — TC: 44, 46
- [x] AC-58 — Analytics Advanced 365 days (365 áp dụng, 366 popup) — Covered — TC: 44, 46
- [~] AC-59 — Analytics Enterprise "Custom" theo cấu hình hợp đồng (X14) — Partial — TC: 41, 90 (Expected chỉ nói "theo cấu hình riêng", không có giá trị cụ thể kiểm được; 44 còn <cần confirm> cách cấu hình Custom)
- [x] AC-60 — Preset (Last 3 months...) vượt hạn mức cũng hiện popup — Covered — TC: 40
- [x] AC-61 — Popup Date Range Limit Exceeded ghi đúng tên gói + số ngày tối đa, có [Buy add-on] và [Adjust range]; khoảng chưa áp dụng — Covered — TC: 39, 40, 42, 46
- [x] AC-62 — [Adjust range] đóng popup, quay lại lịch — Covered — TC: 35
- [x] AC-63 — [Buy add-on] ở Analytics chuyển tới Additional add-on (đích <cần confirm>) — Covered — TC: 36
- [x] AC-64 — Refined Starter 7 days (7 áp dụng, 8 popup) — Covered — TC: 50
- [x] AC-65 — Refined Standard 30 days (30, 31) — Covered — TC: 52
- [x] AC-66 — Refined Growth 60 days (60 áp dụng, 61 popup); case 51 Blocked chờ Designer: Figma ghi 180, Compare plans ghi 60 (PRC-43) — Covered — TC: 47, 49
- [x] AC-67 — Refined Scale 90 days (90, 91) — Covered — TC: 52
- [x] AC-68 — Refined Advanced 180 days (180, 181) — Covered — TC: 52
- [x] AC-69 — Refined Enterprise 365 days (365 áp dụng, 366 popup) — Covered — TC: 51
- [x] AC-70 — [Buy add-on] ở Refined chuyển tới Additional add-on (đích và add-on chọn sẵn <cần confirm>) — Covered — TC: 48
- [x] AC-71 — Add-on mở rộng hạn mức Analytics (Growth mua 270 days thì 270 áp dụng, 271 popup) — Covered — TC: 81
- [x] AC-72 — Add-on mở rộng hạn mức Refined (Growth mua 180 days thì 180 áp dụng, 181 popup) — Covered — TC: 83
- [x] AC-73 — Huỷ add-on thì hạn mức về mức của gói — Covered — TC: 82
- [~] AC-74 — Hạ gói thì hạn mức date range thu hẹp theo gói mới — Partial — TC: 84 (Expected mơ hồ "về hạn mức mới hoặc popup", chỉ Analytics Growth xuống Starter; chưa có case Refined hay nhiều bậc)
- [~] AC-75 — Nâng gói thì hạn mức date range mở rộng — Partial — TC: 44 (chỉ gián tiếp qua đổi lần lượt 4 gói; chưa có case nâng gói rồi áp lại đúng khoảng vừa bị popup)

### Auto Sync frequency

- [x] AC-76 — Starter 3 days: lịch mặc định, mỗi 3 ngày 1 lượt — Covered — TC: 56
- [x] AC-77 — Standard 1 day: 1 lượt mỗi ngày (case 65 Blocked chờ môi trường giả lập thời gian) — Covered — TC: 60
- [x] AC-78 — Growth 1 day: 1 lượt mỗi ngày (case 65 Blocked chờ môi trường giả lập thời gian) — Covered — TC: 60
- [x] AC-79 — Scale 1 day: cấu hình 2 lượt chỉ chạy 1 (case 57 Blocked chờ dev PRC-15) — Covered — TC: 55
- [x] AC-80 — Advanced 2 times/day (Blocked chờ dev PRC-15: chưa có UI cấu hình) — Covered — TC: 54, 57
- [x] AC-81 — Enterprise 3 times/day (Blocked chờ dev PRC-15) — Covered — TC: 57
- [x] AC-82 — Lượt auto vượt hạn mức bị bỏ (V3) — Covered — TC: 55, 58
- [x] AC-83 — Manual Sync không bị giới hạn bởi gói (V3) — Covered — TC: 53
- [x] AC-84 — Hạ gói: tần suất giảm, lượt vượt bị bỏ, lịch đã lưu giữ nguyên (Blocked chờ dev PRC-15) — Covered — TC: 58
- [x] AC-85 — Nâng gói: tần suất tăng (Blocked chờ dev PRC-15) — Covered — TC: 58
- [x] AC-86 — Auto Sync chạm hạn mức hiển thị nhãn Locked và chữ "Limit reached. This feature is temporarily locked." (PRC-44 cần confirm) — Covered — TC: 62

### Tooltip khoá

- [x] AC-87 — Tooltip đúng chữ "Plan limit reached. This feature is temporarily locked." trên mọi control bị khoá do hạn mức — Covered — TC: 5, 17, 30, 63, 64
- [x] AC-88 — Click control đã khoá (execution, filter tree, custom node) không mở form, không tạo dữ liệu — Covered — TC: 63

## Gợi ý bổ sung

- Đã áp dụng ngày 2026-10-28: lock ngay trên Storefront, Monthly usage sau hạ gói chỉ tính mục giữ lại (10/10, 3/3), add-on mua khoảng lớn hơn hạn mức gói; thêm 7 case (ép request lên server, 9/10 Execution, 31 ngày Starter, biên hạ gói, đổi gói khi sync, campaign chưa tới giờ, campaign hết hạn).
- Case 2 và 90 (150 campaign Active): chờ BA trả lời Default Execution có tính vào hạn mức Execution không (PRC-54 đã đưa vào danh sách câu hỏi).
- Case Blocked chờ dev (chưa có UI cấu hình 2 và 3 lần mỗi ngày), Designer (số ngày popup Refined) và môi trường giả lập thời gian.
