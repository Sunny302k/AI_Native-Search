
## User Story

**As a** User/Admin**I want** đặt phòng họp với tiêu đề, khung giờ và thiết bị**So that** chốt được phòng cho cuộc họp của mình

## Layout (2 cột)

### Cột trái (form chính, flex:2)

**Page header:**

* Title icon + "Đặt phòng họp"
* Subtitle: "Điền thông tin để đặt phòng họp."
* Button "← Quay lại" góc phải

**Form fields:**

| Trường              | Kiểu           | Bắt buộc            | Note                                                      |
| --------------------- | --------------- | --------------------- | --------------------------------------------------------- |
| Phòng                | select dropdown | Có                   | "{Tên phòng} (sức chứa X)"                            |
| Tiêu đề cuộc họp | text            | Có                   | "VD: Họp team marketing"                                 |
| Ngày                 | date picker     | Có                   | Icon calendar3                                            |
| Giờ bắt đầu       | select          | Có                   | Block 15 phút: 06:00, 06:15, ... 23:45                   |
| Thời lượng         | button group    | Có                   | Presets: 30 phút / 1 giờ / 1g 30p / 2 giờ / Tùy chọn |
| Giờ kết thúc       | select          | Có (nếu Tùy chọn) | Block 15 phút, chỉ hiện khi click "Tùy chọn"         |
| Mô tả               | textarea        | Không                | 4 rows                                                    |

**Live summary chip:**

* Hiển thị dưới duration picker
* Chip nền xanh nhạt: "ℹ Cuộc họp: 09:00 → 10:00 (1 giờ)"
* Tự cập nhật khi đổi bất kỳ giá trị nào
* Đỏ nếu invalid (end ≤ start)

**Validation messages:**

* "Vui lòng chọn phòng"
* "Vui lòng nhập tiêu đề"
* "Vui lòng chọn giờ bắt đầu / kết thúc"
* "Thời gian kết thúc phải sau thời gian bắt đầu"
* "Không thể đặt phòng cho thời gian đã qua"
  * Áp dụng khi Ngày = hôm nay và Giờ bắt đầu ≤ giờ hiện tại tại thời điểm submit (so với giờ hệ thống, không chỉ check theo Ngày)

**Conflict error (màn hình riêng, không phải alert inline):**

* Conflict chỉ được kiểm tra khi submit (bấm "Lưu booking"), không check real-time khi đổi field
* Nếu phát hiện trùng giờ tại thời điểm submit → chuyển sang màn hình riêng "06b-Booking_Conflict" (không hiển thị alert ngay trên form 06-Booking_Create)
* Hiển thị: tiêu đề booking xung đột + người đặt + khung giờ + tên phòng
* Gợi ý: "Vui lòng chọn khung giờ khác hoặc đổi phòng."
* Action: quay lại form đặt phòng (06-Booking_Create) để chỉnh sửa, dữ liệu đã nhập được giữ nguyên

**Actions:**

* Button "💾 Lưu booking" (primary)
* Button "Hủy" (outline secondary) → về Calendar

### Cột phải (side preview, flex:1)

**Card preview phòng đã chọn:**

* Hero gradient (90px cao, 8 màu rotate theo room) + icon door-open
* Tên phòng + badge trạng thái (Active/Inactive)
* Vị trí (icon geo-alt)
* Sức chứa (icon people)
* Mô tả ngắn
* Chips trang thiết bị

**Card "Lưu ý" (dưới card preview):**

* Title: icon info + "Lưu ý"
* Bullet list:
  * "Không thể đặt phòng cho thời gian đã qua."
  * "Hệ thống chống trùng giờ tự động."
  * "Bạn có thể sửa hoặc hủy booking trước giờ bắt đầu."

## Success flow

* Booking được tạo với trạng thái Confirmed ngay (không qua bước duyệt/Pending)
* Flash success: "Đặt phòng thành công!"
* Quay về Calendar/List

## Metadata

* **Priority:** Must Have
* **Effort:** L
* **Screens:** 06-Booking_Create, 06b-Booking_Conflict
