## 🏢 Bài 27: Đăng ký nghỉ phép — Manager → HR phê duyệt

Luồng phê duyệt  **2 cấp** : nhân viên submit yêu cầu → manager duyệt cấp 1 → HR duyệt cấp 2. Mỗi yêu cầu đi qua nhiều state với nhiều actor — đây là loại flow rất phổ biến trong hệ thống nội bộ doanh nghiệp.

### 📊 Sơ đồ flow

```
    Employee submit                Manager approve         HR approve
    ┌───────────┐                  ┌─────────────┐         ┌──────────┐
    │ pending_  │ ───────────────→ │ pending_hr  │ ──────→ │ approved │ (final)
    │ manager   │                  │             │         └──────────┘
    └─────┬─────┘                  └──────┬──────┘
          │ Manager reject                │ HR reject
          ↓                                ↓
    ┌──────────────────┐            ┌──────────────────┐
    │ rejected_by_     │            │ rejected_by_hr   │
    │ manager (final)  │            │ (final)          │
    └──────────────────┘            └──────────────────┘
```

### 📋 Đặc tả từng màn hình

#### 🟦 Screen 1 — Đăng ký yêu cầu nghỉ phép

| Field       | Yêu cầu                                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| Nhân viên | Bắt buộc, chọn từ dropdown.                                                                                 |
| Loại phép | `annual` (phép năm)                                                                                         |
| Từ ngày   | Bắt buộc.**Phải ≥ hôm nay** (không xin nghỉ ngày quá khứ).                                      |
| Đến ngày | Bắt buộc. Phải ≥ "Từ ngày".                                                                               |
| Lý do      | Bắt buộc, ≥ 10 ký tự.                                                                                      |
| Số ngày   | Tính tự động:`(to_date - from_date) + 1` (inclusive cả 2 đầu). VD: 25/4 → 27/4 =  **3 ngày** . |

**Quy tắc balance:**

* Mỗi nhân viên có `12 ngày phép năm`. Sick / personal KHÔNG trừ balance.
* Khi `annual`: số ngày yêu cầu phải ≤ balance còn lại. Nếu vượt → báo lỗi.
* Balance  **chỉ trừ khi HR approve cuối cùng** . Khi submit / pending → balance giữ nguyên.
* Nếu manager hoặc HR reject → balance giữ nguyên (không phải hoàn lại vì chưa trừ).

**Quy tắc overlap:** KHÔNG được phép xin nghỉ chồng đè với 1 request đã `approved` hoặc đang `pending_*` của cùng nhân viên.

**Submit thành công →** hiển thị message `Yêu cầu nghỉ phép đã được gửi thành công!`, request mới có status `pending_manager`.

#### 🟨 Screen 2 — Yêu cầu của tôi

* Filter theo nhân viên (dropdown 3 nhân viên).
* Hiển thị tất cả yêu cầu của nhân viên đó với status badge.
* Click vào 1 yêu cầu → đi đến Screen 5 (chi tiết + lịch sử action).

#### 🟧 Screen 3 — Manager Queue

* Hiển thị danh sách yêu cầu có status = `pending_manager`.
* Mỗi dòng: nhân viên, loại phép, từ-đến, số ngày, lý do, balance còn lại.
* **✅ Approve** → chuyển status sang `pending_hr`.
* **❌ Reject** → chuyển status sang `rejected_by_manager` (final).
* Sau khi xử lý, request biến mất khỏi queue.

#### 🟪 Screen 4 — HR Queue

* Hiển thị danh sách yêu cầu có status = `pending_hr` (đã qua manager).
* **✅ Approve** → status thành `approved` (final). Trừ balance nếu là annual leave.
* **❌ Reject** → status thành `rejected_by_hr` (final). Balance giữ nguyên.

#### 🟩 Screen 5 — Chi tiết yêu cầu

* Hiển thị toàn bộ thông tin yêu cầu + lịch sử actions (created → manager_action → hr_action).
* Mỗi dòng lịch sử có: thời gian, actor, action, comment.

### 🎯 Test scenarios cần cover

1. **Happy path:** Submit → manager approve → HR approve → status = approved, balance giảm.
2. **Manager reject:** Submit → manager reject → status = rejected_by_manager. Kiểm tra request KHÔNG xuất hiện trong HR queue.
3. **HR reject:** Submit → manager approve → HR reject → status = rejected_by_hr. Balance KHÔNG bị trừ.
4. **Past date:** Submit từ ngày = hôm qua → phải bị chặn.
5. **Days count:** Submit 25/4 → 27/4 → kiểm tra hệ thống tính 3 ngày (chứ không phải 2).
6. **Overlap:** Submit yêu cầu 1/5 → 5/5 (approved). Submit tiếp 3/5 → 7/5 → phải bị chặn.
7. **Balance integrity:** Submit 5 ngày annual → quan sát balance ở tab "Đăng ký" trước/sau submit. Theo spec phải KHÔNG đổi cho đến khi HR approve.
8. **Reject + balance:** Submit → manager reject → balance phải = ban đầu (không bị trừ nhầm).
