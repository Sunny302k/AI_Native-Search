Title: [Pricing - Monthly usage] Nhãn "Locked" không hiện tooltip khi hover

Link TCs: Plan and add-on #23 (phần hover nhãn Locked)
Loại: FE

Data test: Store gói Scale, account info@peasisoft.com, staging https://stg-search.peasisoft.com/pricing. Precondition gốc yêu cầu gói Growth với nhiều dòng đủ hạn mức (100/100, 10/10...); đã test thay bằng dòng duy nhất đang ở trạng thái Locked sẵn có trên gói Scale (Auto Sync frequency, hiển thị "1/1 day Auto Sync frequency Locked").

Steps to reproduce:
1. Mở Pricing.
2. Ở khối Monthly usage, tìm dòng "Auto Sync frequency" đang hiển thị "1/1 day Auto Sync frequency Locked".
3. Hover vào chữ "Locked" (và vào icon tròn đặc cạnh dòng này), chờ 2 giây.

Actual:
- Không có tooltip nào xuất hiện, dù hover vào chữ "Locked" hay vào icon tròn của dòng, kể cả sau khi chờ.

Expected:
- Hiện tooltip "Limit reached. This feature is temporarily locked." khi hover vào nhãn Locked của dòng đã đủ hạn mức.

Link bug: chưa có - chờ tạo

Priority đề xuất: Low — chỉ thiếu tooltip giải thích, không chặn chức năng chính, dòng vẫn hiển thị đúng trạng thái Locked.
Căn cứ FE/BE: FE — thiếu phần hiển thị tooltip trên giao diện, không liên quan dữ liệu/API (trạng thái Locked vẫn đúng).
Nguồn Expected: test case Plan and add-on ID 23, dẫn theo Figma Monthly usage (docs/specs/pricing-specs.md mục 11.2 / mục 17 rule X13).
