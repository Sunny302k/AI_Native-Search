```
Title: [Search > Synonyms] Không validate trùng general term của Supporting synonyms với nhóm khác đã lưu

Link TCs: test-cases/search/synonyms/synonyms_testcase.csv (Case 34)
Loại: BE/FE (chưa xác định rõ, xem Căn cứ)

Data test: Synonym Group "Shoes for man" đã có Supporting general term = "shoes". Tạo mới group "Dup test group" với Supporting general term = "shoes" (trùng), tag cụ thể "dup support tag"

Steps to reproduce:
1. Đảm bảo đã có 1 Synonym Group với Supporting general term = "shoes" (VD "Shoes for man").
2. Vào Search > Synonyms, click [Create new].
3. Nhập SYNONYM GROUP NAME = "Dup test group", 1 Unified synonym hợp lệ.
4. Nhập "shoes" vào Supporting general term (trùng với nhóm ở bước 1).
5. Nhập 1 tag cụ thể hợp lệ, không trùng ai.
6. Click [Save].

Actual:
- Lưu THÀNH CÔNG, không hiện lỗi "Synonym already existed!" nào. Group "Dup test group" được tạo bình thường với general term "shoes" trùng với group khác đã tồn tại.

Expected:
- Hiện khung viền đỏ + chữ đỏ "Synonym already existed!" ngay dưới input trái; chặn lưu.

Link bug: chưa có - chờ tạo
```

Priority đề xuất: Medium — dữ liệu không bị sai/mất nhưng cho phép trạng thái dữ liệu mâu thuẫn với rule validate đã công bố trong spec/Figma (2 group khác nhau cùng dùng 1 general term), có thể gây nhầm lẫn hành vi search sau này.
Căn cứ FE/BE: Đã thử validate trùng TRONG cùng 1 modal (2 dòng Supporting cùng modal) thì có chặn đúng ("Synonym already existed!" — xem test case 35), chứng tỏ validate hiện chỉ so sánh trong phạm vi state của form đang mở, KHÔNG gọi API kiểm tra với dữ liệu đã lưu của nhóm khác — nghiêng về thiếu logic ở cả FE (không check) lẫn BE (không có endpoint validate riêng, hoặc có nhưng FE không gọi) — cần dev xác nhận thêm qua Network tab.
Nguồn của Expected: `docs/specs/search-synonyms-specs.md` mục 3.1, 4.1 + Expected gốc Case 34.

Điểm chờ xác nhận: Spec có câu hỏi mở #3 "chưa rõ (a) là so trùng trong phạm vi 1 synonym group hay toàn hệ thống" — kết quả test này cho thấy thực tế là so trùng chỉ trong phạm vi modal đang mở (không phải toàn hệ thống như Figma mô tả ở case trùng nhóm khác) — cần BA xác nhận đây là bug cần fix hay là phạm vi validate đã thay đổi so với thiết kế gốc.
