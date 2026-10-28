# Ghi chú cập nhật theo tính năng

Mỗi khi có thay đổi quy tắc, yêu cầu hoặc thiết kế mà spec và Figma **chưa kịp cập nhật** (VD câu trả lời của BA/PO trong chat), ghi vào file của đúng tính năng trong thư mục này. Claude đọc các file này **trước khi** viết hoặc sửa test case, và coi chúng là nguồn có ưu tiên cao nhất.

## Thứ tự ưu tiên khi các nguồn mâu thuẫn

1. Ghi chú cập nhật trong thư mục này (và câu trả lời xác nhận của người dùng/BA trong chat)
2. Quan sát thực tế trên staging, ảnh chụp người dùng gửi
3. Note và frame Figma (kể cả sticky note vàng)
4. Spec trong `docs/specs/` và tài liệu PDF

Riêng trường hợp PDF mâu thuẫn với note Figma thì không tự chọn bên nào: ghi cả hai vào Note của test case và hỏi lại BA.

Khi theo nguồn cao hơn mà trái nguồn thấp hơn, test case ghi rõ trong cột Note đang theo nguồn nào, và việc cập nhật spec được đưa vào mục "Spec cần cập nhật".

## Quy ước đặt tên

- 1 file cho mỗi tính năng: `<tinh-nang>-updates.md` (kebab-case), ví dụ `plan-limit-updates.md`, `merge-values-updates.md`.
- Mục mới nhất đặt trên cùng. Mục không còn hiệu lực không xoá, đổi trạng thái thành "Đã thay thế bởi ..." kèm ngày.

## Thẻ trong cột Note của test case

Mọi case được **thêm hoặc sửa** vì một cập nhật đều có thẻ ở cuối cột Note, dạng:

```
[Cập nhật YYYY-MM-DD: <tiêu đề mục trong file cập nhật>]
```

Mở file test case và tìm (Ctrl+F) đúng cụm `Cập nhật YYYY-MM-DD` để thấy ngay các case thuộc cập nhật đó; từ thẻ này tra ngược về mục tương ứng trong file cập nhật. Thẻ này không phải mã ticket nên không vi phạm quy tắc cấm trích dẫn ticket.

## Mẫu một mục

```
## YYYY-MM-DD — Tiêu đề ngắn

- **Mới:** nội dung thay đổi, viết cụ thể (giá trị, phạm vi, điều kiện)
- **Nguồn:** ai cập nhật, hoặc câu trả lời xác nhận nào
- **Cũ (theo test case và spec):** hành vi trước đây, kèm tên file hoặc ID case
- **Phạm vi ảnh hưởng:** file test case, spec liên quan
- **Trạng thái:** Chờ áp dụng | Đã áp dụng ngày ... | Áp dụng một phần
- **Câu hỏi mở:** các điểm chưa chốt
- **Spec cần cập nhật:** tên file và mục
```

Chỉ cần điền **Mới** và **Nguồn**. Phần **Cũ** và **Phạm vi ảnh hưởng** do Claude tìm từ test case và spec rồi ghi vào, bạn xác nhận lại.

## Danh mục

| Tính năng | File |
|---|---|
| Pricing | [pricing-updates.md](pricing-updates.md) |
