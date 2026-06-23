# 📊 Mô tả Luồng Xử Lý Nghiệp Vụ — Đăng Ký Nghỉ Phép (Manager → HR)

## Tổng quan flow

Hệ thống áp dụng mô hình phê duyệt **hai cấp tuần tự**: yêu cầu từ nhân viên phải được manager xét duyệt trước, sau đó HR xét duyệt. Chỉ khi cả hai bước phê duyệt hoàn tất mới được cấp phép. Tại mỗi bước, người xét duyệt có quyền từ chối, dẫn yêu cầu vào trạng thái cuối cùng.

---

## 1️⃣ Giai đoạn 1: Nhân viên Đăng ký (Submit)

- **Đầu vào:** Nhân viên chọn thông tin (loại phép, khoảng ngày, lý do) từ form đăng ký.
- **Xử lý:**
  - Hệ thống tính số ngày cần xin phép (tính inclusive cả 2 đầu).
  - Tạo bản ghi yêu cầu mới với **trạng thái `pending_manager`** (chờ manager duyệt).
  - Ghi nhận thời gian submit.
- **Đầu ra:** Yêu cầu được đưa vào **Manager Queue** (danh sách chờ của manager).
- **Thông báo:** "Yêu cầu nghỉ phép đã được gửi thành công!"

---

## 2️⃣ Giai đoạn 2: Manager Duyệt Cấp 1

Manager truy cập **Manager Queue** để xem toàn bộ yêu cầu ở trạng thái `pending_manager`.

### Kịch bản 2a — Manager Phê duyệt:

- **Hành động:** Manager click "✅ Approve" trên yêu cầu.
- **Xử lý:**
  - Hệ thống cập nhật trạng thái yêu cầu: `pending_manager` → **`pending_hr`**.
  - Ghi nhận thời gian phê duyệt, actor (manager).
  - Thêm bản ghi vào **lịch sử action** của yêu cầu.
- **Đầu ra:** Yêu cầu được chuyển đến **HR Queue** (danh sách chờ của HR).
- **Cập nhật Queue:** Yêu cầu biến mất khỏi Manager Queue.

### Kịch bản 2b — Manager Từ chối:

- **Hành động:** Manager click "❌ Reject" trên yêu cầu.
- **Xử lý:**
  - Hệ thống cập nhật trạng thái yêu cầu: `pending_manager` → **`rejected_by_manager`** (trạng thái cuối cùng).
  - Ghi nhận thời gian từ chối, actor (manager).
  - Thêm bản ghi vào lịch sử action.
- **Đầu ra:** Yêu cầu bị loại khỏi quy trình, NOT xuất hiện trong HR Queue.
- **Cập nhật Queue:** Yêu cầu biến mất khỏi Manager Queue. Nhân viên có thể xem trạng thái từ chối ở tab "Yêu cầu của tôi".

---

## 3️⃣ Giai đoạn 3: HR Duyệt Cấp 2

HR truy cập **HR Queue** để xem toàn bộ yêu cầu ở trạng thái `pending_hr` (những yêu cầu đã qua manager).

### Kịch bản 3a — HR Phê duyệt:

- **Hành động:** HR click "✅ Approve" trên yêu cầu.
- **Xử lý:**
  - Hệ thống cập nhật trạng thái yêu cầu: `pending_hr` → **`approved`** (trạng thái cuối cùng).
  - **Chỉ tại bước này:** Nếu loại phép là `annual`, hệ thống trừ số ngày từ balance của nhân viên.
  - Ghi nhận thời gian phê duyệt, actor (HR).
  - Thêm bản ghi vào lịch sử action.
- **Đầu ra:** Yêu cầu chuyển thành `approved` (hoàn tất). Balance được cập nhật.
- **Cập nhật Queue:** Yêu cầu biến mất khỏi HR Queue.

### Kịch bản 3b — HR Từ chối:

- **Hành động:** HR click "❌ Reject" trên yêu cầu.
- **Xử lý:**
  - Hệ thống cập nhật trạng thái yêu cầu: `pending_hr` → **`rejected_by_hr`** (trạng thái cuối cùng).
  - **Giữ nguyên balance** (không trừ vì yêu cầu bị từ chối).
  - Ghi nhận thời gian từ chối, actor (HR).
  - Thêm bản ghi vào lịch sử action.
- **Đầu ra:** Yêu cầu bị loại khỏi quy trình.
- **Cập nhật Queue:** Yêu cầu biến mất khỏi HR Queue. Nhân viên có thể xem trạng thái từ chối ở tab "Yêu cầu của tôi".

---

## 4️⃣ Giai đoạn 4: Xem Chi Tiết & Lịch Sử

Nhân viên có thể click vào từng yêu cầu (từ tab "Yêu cầu của tôi") để xem:

- **Thông tin đầy đủ:** loại phép, khoảng ngày, lý do, số ngày, balance hiện tại.
- **Lịch sử action:**
  - Dòng 1: `created` → nhân viên, thời gian submit.
  - Dòng 2: `manager_action` (approve/reject) → manager, thời gian, comment (nếu có).
  - Dòng 3: `hr_action` (approve/reject, nếu có) → HR, thời gian, comment (nếu có).

---

## 📊 Bản đồ Trạng Thái (State Machine)

```
┌──────────────────┐
│ pending_manager  │  (chờ manager phê duyệt)
└────┬─────────┬──┘
     │         │
  ✅ Approve  ❌ Reject
     │         │
     ▼         ▼
┌──────────────┐   ┌──────────────────────┐
│ pending_hr   │   │ rejected_by_manager  │ (final)
└────┬────┬───┘   └──────────────────────┘
     │    │
  ✅ │    │ ❌ Reject
Approve   │
     │    │
     ▼    ▼
 ┌────────┐      ┌──────────────┐
 │approved│      │rejected_by_hr│ (final)
 │(final) │      └──────────────┘
 └────────┘

Chú thích:
- pending_manager: Chờ manager duyệt
- pending_hr: Chờ HR duyệt (đã qua manager)
- approved: Phê duyệt hoàn tất (balance bị trừ nếu annual)
- rejected_by_manager: Manager từ chối (không vào HR queue)
- rejected_by_hr: HR từ chối (không trừ balance)
```

---

## 🔄 Luồng Dữ Liệu Giữa Các Actor

| Bước | Actor       | Input           | Xử lý                                              | Output Queue  |
| ------ | ----------- | --------------- | ---------------------------------------------------- | ------------- |
| 1      | Nhân viên | Form đăng ký | Tạo request `pending_manager`                     | Manager Queue |
| 2a     | Manager     | Approve         | Chuyển status →`pending_hr`                      | HR Queue      |
| 2b     | Manager     | Reject          | Chuyển status →`rejected_by_manager` (final)     | —            |
| 3a     | HR          | Approve         | Chuyển status →`approved`, trừ balance (annual) | —            |
| 3b     | HR          | Reject          | Chuyển status →`rejected_by_hr` (final)          | —            |

---

## ⏱️ Kỳ Vọng Thời Gian Xử Lý

- **Happy path (approve tất cả):** Employee → Manager → HR → Approved (3 bước).
- **Early rejection:** Employee → Manager reject hoặc (Manager → HR reject) (2 bước).
- **Các yêu cầu đang chờ:** Hiển thị ở queue tương ứng cho đến khi được xử lý.

---

## 📌 Ghi chú

Mô tả này **tập trung vào luồng xử lý** mà không đi sâu vào validation dữ liệu như kiểm tra ngày quá khứ, overlap, hay balance limit — đó là những quy tắc **kiểm soát trước** khi request vào flow chính.
