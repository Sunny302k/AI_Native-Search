# Pricing — Bảng truy vết note vàng Figma sang task

Nguồn: Figma Pricing `Qbx9Ftu1qVuJA1zBVA8aAw`, 9 note vàng và 8 ghi chú chữ trên frame. Ngày: 2026-10-25. Theo CLAUDE.md, note vàng là spec chính thức.

Cột "Trạng thái": **Phủ** = đã nằm trong scope task, **Thiếu** = chưa có trong scope (đã bổ sung ở cột Hành động), **Cần xác nhận** = có mâu thuẫn hoặc thiếu thông tin (mã issue).

## Note 1 — Logic: Các page theo journey (node 1:10795)

| # | Dòng note | Task | Trạng thái | Hành động |
|---|---|---|---|---|
| 1.1 | Khi cài app: có trial 14 ngày của gói cao nhất | Free Trial | Phủ | Gói cao nhất = Advanced (người dùng xác nhận) |
| 1.2 | Lấy GMV 3 tháng gần nhất để đưa ra các gói; mua range GMV cao hơn, không mua thấp hơn | Plan Recommendation | Phủ | Chọn gói thuộc range của mình hoặc cao hơn (đã Closed) |
| 1.3 | Subscribe luôn: dùng trial hết 14 ngày, sau đó charge theo gói đã chọn | Free Trial, Confirm Plan | Phủ | Giữ quyền lợi trial đến hết 14 ngày, charge vào ngày trial kết thúc (PRC-37 đã Closed); thêm case mua gói lúc đang trial |
| 1.4 | Khi vào xem plans: hiển thị plan hiện tại, GMV tháng hiện tại | Current Plan | **Cần xác nhận** | **PRC-40** (note ghi "tháng hiện tại", PO ghi 3 tháng trước) |
| 1.5 | Có thể chuyển sang plan khác, logic mua theo GMV giống trên | Confirm Plan, Plan Recommendation | Phủ | Gói thấp hơn range GMV bị xám, tooltip "Current GMV exceeds this plan" |
| 1.6 | Vượt GMV: charge thêm tiền theo lượng GMV exceed | Exceed GMV | Phủ một phần | Seller có tối đa 1 tuần để nâng lên gói lớn hơn (PRC-22 đã Closed); số tiền charge và thời điểm tính xem PRC-42 |
| 1.7 | Không trả trong 1 time nhất định thì suspend plan | Exceed GMV | Phủ | 1 tuần (PRC-38 đã Closed) |
| 1.8 | Khi suspend: dừng tất cả service; vào app thì bắt trả tiền rồi mới renew plans | Exceed GMV | **Cần xác nhận** | Popup suspend chỉ có nút Contact us, chưa có màn trả tiền: **PRC-41** |
| 1.9 | Sau khi thanh toán phần vượt thì gửi email invoice | Exceed GMV | **Thiếu** | Thêm case email invoice sau thanh toán phần vượt (chỉ kiểm tra hành vi, cần hộp thư test) |
| 1.10 | UI: hover plan thì highlight plan đó | Plan Recommendation | **Thiếu** | Thêm case hover từng thẻ gói; PRC-39 đã Closed (chỉ hiển thị) |
| 1.11 | UI: với từng GMV range thì highlight plan được recommend | Plan Recommendation | **Thiếu** | Thêm 6 case, mỗi range GMV một gói được highlight; PRC-39 đã Closed (chỉ hiển thị) |

## Note 2 — Fix feature row và scroll tiếp; Highlight recommended plan (node 2136:12737, section chưa mua plan)

| # | Dòng note | Task | Trạng thái | Hành động |
|---|---|---|---|---|
| 2.1 | Fix feature row và scroll tiếp | Plan Recommendation (Compare plans) | Phủ | Hàng tiêu đề (tên gói, nút Select) cố định khi cuộn bảng |
| 2.2 | Highlight recommended plan | Plan Recommendation | Phủ | Cột gói gợi ý được highlight trong bảng Compare plans |

## Note 3 và 5 — Click [Select plan] Enterprise / Contact us thì mở bubble chat (node 2211:56979, 2211:56973)

| # | Dòng note | Task | Trạng thái | Hành động |
|---|---|---|---|---|
| 3.1 | Select plan Enterprise / Contact us mở bubble chat | Plan Recommendation | Phủ | Người dùng xác nhận: mở popup chat, triển khai luôn (đã Closed) |

## Note 4 — Click [Contact us] mở link email của peasisoft (node 1:12497)

| # | Dòng note | Task | Trạng thái | Hành động |
|---|---|---|---|---|
| 4.1 | Click Contact us mở link email peasisoft | **Exceed GMV** (popup Your plan has been suspended) | **Gán sai trước đó** | Note nằm ở khu vực Pricing for subscribed user, cạnh popup suspend chứ không phải Enterprise. Mình từng ghi là "đã bị thay bằng chat". Sửa: nút Contact us ở popup suspend mở email, **PRC-41** |

## Note 6 — Sau khi mua Add-on thì update số ngày của Add-on vào Monthly usage (node 2191:41382)

| # | Dòng note | Task | Trạng thái | Hành động |
|---|---|---|---|---|
| 6.1 | Mua add-on xong thì số ngày của add-on cập nhật vào Monthly usage | Current Plan | Phủ (cần ghi rõ) | Dòng Analytics đổi thành "365 days Analytics, Activated, Renewed on, Cancel"; thêm case cập nhật đúng số ngày theo khoảng đã mua |

## Note 7 — Date range dropdown: 90, 180, 270, 365 days, Custom date range (node 2191:40697, section Features hit limit)

| # | Dòng note | Task | Trạng thái | Hành động |
|---|---|---|---|---|
| 7.1 | Dropdown date range gồm 5 lựa chọn | Current Plan (Additional add-on) | **Thiếu** | Thêm case từng lựa chọn; riêng **Custom date range** chưa rõ giá và cách nhập: gắn vào PRC-06 (hoãn giá) |

## Note 8 — Đã mua gói với ngày {x} thì disable button và đổi chữ thành "Activated" (node 2222:66596)

| # | Dòng note | Task | Trạng thái | Hành động |
|---|---|---|---|---|
| 8.1 | Add-on đã mua với {x} ngày: nút disable, chữ Activated | Current Plan (Additional add-on) | **Gán sai trước đó** | Note nằm trong khu vực Buy/Cancel add-on (toạ độ y 11709 nằm trong khoảng của section), "{x} ngày" là số ngày của add-on. Mình từng ghi là nút của **gói**. Sửa: nút gói hiện **Selected** (thấy trên frame Upgrade plan), nút **add-on** hiện **Activated** |

## Ghi chú chữ trên frame

| # | Ghi chú | Task | Trạng thái | Hành động |
|---|---|---|---|---|
| 9.1 | Khi truy cập vào các tính năng thì block bằng popup (chưa mua, hết trial) | Free Trial | Phủ | Cần liệt kê menu bị chặn (Search, Filter, Recommendation, Merchandising, Sync, Analytics, Dashboard) |
| 9.2 | Quá hạn trả phí dịch vụ thì block bằng popup khi click vào các tính năng | Exceed GMV | Phủ | Như trên |
| 9.3 | Active Merchandising Campaigns chạm hạn mức thì disable [Create new] | Plan Limit | Phủ | Tooltip "Plan limit reached…" |
| 9.4 | Filter Trees chạm hạn mức thì disable [Create new] | Plan Limit | Phủ | Như trên |
| 9.5 | Analytics x days chạm hạn mức: bấm [Apply] thì hiện popup | Plan Limit | Phủ | Date Range Limit Exceeded |
| 9.6 | Refined Search Journey x days chạm hạn mức: bấm [Apply] thì hiện popup | Plan Limit | Phủ | Như trên |
| 9.7 | Filter Nodes Custom Builder chạm hạn mức thì disable thẻ My own filter | Plan Limit | Phủ | Tooltip |
| 9.8 | Active Execution chạm hạn mức thì disable [New execution] | Plan Limit | Phủ | Tooltip |

## Tổng kết

- **Phủ:** 17 dòng. **Thiếu đã bổ sung vào scope:** 5 dòng (1.3, 1.9, 1.10, 1.11, 7.1). **Cần xác nhận:** 4 dòng (1.4, 1.6, 1.7, 1.8). **Gán sai đã sửa:** 2 dòng (4.1, 8.1).
