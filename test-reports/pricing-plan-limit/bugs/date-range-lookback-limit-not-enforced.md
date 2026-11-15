Title: [Search behavior analytics] Không chặn khoảng ngày ngắn nhưng bắt đầu quá xa hạn mức (giới hạn lùi về quá khứ không được áp dụng)

Link TCs: Plan limit #42
Loại: FE hoặc BE (chưa xác định)

Data test: Store gói Scale (hạn mức Analytics = 270 days), account info@peasisoft.com, staging https://stg-search.peasisoft.com/analytics/search-behavior. Hôm nay 2026-11-09.

Steps to reproduce:
1. Mở Search behavior analytics.
2. Trước tiên xác nhận rule có hoạt động: chọn khoảng Feb 11 2026 – Nov 9 2026 (271 ngày, vượt hạn mức 270 ngày), Apply → đúng như mong đợi, hiện popup "Date Range Limit Exceeded: Your Scale plan allows a maximum range of 270 days."
3. Sau đó chọn khoảng Jan 13 2026 – Jan 20 2026 (chỉ 7 ngày, nhưng ngày bắt đầu cách hôm nay khoảng 300 ngày, vượt xa hạn mức 270 ngày lùi về quá khứ), click Apply.

Actual:
- Ở bước 3, khoảng ngày được áp dụng thành công (header đổi thành "Jan 13 2026 - Jan 20 2026", dữ liệu "Total searches: 0" hiển thị), KHÔNG hiện popup "Date Range Limit Exceeded" dù ngày bắt đầu cách hôm nay hơn 270 ngày.

Expected:
- Phải hiện popup "Date Range Limit Exceeded: Your Scale plan allows a maximum range of 270 days." và khoảng ngày chưa được áp dụng, vì hạn mức là giới hạn lùi về quá khứ (ngày bắt đầu không được xa hôm nay quá số ngày hạn mức), không phải giới hạn độ dài khoảng ngày.

Link bug: chưa có - chờ tạo

Priority đề xuất: High — rule chặn hạn mức date range không hoạt động đúng cho trường hợp phổ biến (xem dữ liệu cũ với khoảng ngắn), khiến merchant truy cập được dữ liệu vượt quyền lợi gói mà không cần mua add-on.
Căn cứ FE/BE: Chưa xác định — có thể FE chỉ validate theo độ dài khoảng (end - start) thay vì khoảng cách (today - start), hoặc BE trả dữ liệu không kiểm tra điều kiện lùi về quá khứ; cần xem Network request để xác định.
Nguồn Expected: docs/specs/pricing-specs.md mục 16 rule X14 "Hạn mức date range là giới hạn lùi về quá khứ: ngày bắt đầu không được xa hôm nay quá số ngày của hạn mức" + test case Plan limit ID 42.
