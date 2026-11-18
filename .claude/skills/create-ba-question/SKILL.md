---
name: create-ba-question
description: Viết câu hỏi Q&A ngắn gọn gửi BA/dev để confirm điểm chưa rõ trong thiết kế — mỗi câu gồm bằng chứng cụ thể từ UI, hệ quả nếu hiểu sai, và 1 câu hỏi chốt trả lời được bằng 1-2 câu.
trigger: "viết Q&A hỏi BA", "đặt câu hỏi confirm cho BA", "viết câu hỏi cho BA về [...]", "soạn câu hỏi gửi dev" — áp dụng khi ĐÃ phát hiện điểm chưa rõ/mâu thuẫn trong thiết kế và cần soạn câu hỏi gửi đi. KHÔNG dùng để phân tích thiết kế (→ extract-figma-spec) hay viết test case (→ create-testcase-suite).
---

## Định dạng bắt buộc: bảng, có cột Đề xuất

Luôn trình bày toàn bộ danh sách câu hỏi dưới dạng **1 bảng markdown duy nhất** (không dùng heading `### Q<n>` riêng từng câu như trước). Cột bắt buộc, đúng thứ tự:

| # | Câu hỏi | Bằng chứng & hệ quả | Đề xuất | Trả lời của BA |
| --- | --- | --- | --- | --- |
| 1 | <câu hỏi chốt, dạng "X hay Y?" nếu có thể> | <1-2 câu bằng chứng cụ thể từ thiết kế> + <hệ quả nếu hiểu sai, 1 câu> | <phương án mình nghiêng về, kèm lý do ngắn 1 câu — hoặc "Không đủ căn cứ đề xuất" nếu thực sự không có cơ sở nào để nghiêng> | *(để trống)* |

- **Cột "Đề xuất" là bắt buộc, không được bỏ trống "để BA tự quyết" trừ khi thực sự không có bất kỳ căn cứ nào** (pattern từ feature tương tự, hành vi UI chuẩn ngành, hay suy luận hợp lý từ chính thiết kế) — đây là đề xuất của mình để BA duyệt nhanh (đồng ý/sửa), không phải câu trả lời thay BA.
- Nếu 1 hàng cần nhiều dòng bằng chứng, dùng `<br>` trong ô thay vì xuống dòng thật (giữ bảng không vỡ).
- Cột "Trả lời của BA" luôn để trống cho BA điền, không tự ý đoán điền sẵn.

## Quy tắc

1. **Câu hỏi ở cột 2 phải tự đứng được** — BA đọc 1 dòng là hiểu đang hỏi gì, không cần mở rộng.
2. **Luôn trích bằng chứng cụ thể**: tên màn hình, tên field, số liệu thật từ thiết kế (VD *"Avocado (5) + Emerald (2) + Lime (1) → hiển thị Avocado (8)"*). Không viết chung chung kiểu *"có vẻ count đang sai"*.
3. **Nêu hệ quả người dùng cuối nhìn thấy** trong cùng ô Bằng chứng & hệ quả, để BA hiểu vì sao phải trả lời (VD *"badge hiện 8 nhưng lọc ra chỉ 7 sản phẩm"*).
4. **Câu hỏi chốt phải trả lời được bằng 1-2 câu**: ưu tiên dạng chọn giữa 2 phương án (`X hay Y?`) hoặc hỏi đúng 1 dữ kiện (`lấy từ đâu?`). Nghiêm cấm câu hỏi mở kiểu *"anh thấy chỗ này thế nào?"*.
5. **Mỗi hàng chỉ hỏi 1 vấn đề.** Nếu 2 vấn đề gắn chặt nhau, được gộp vào 1 câu chốt nhưng phải ghi chú sẵn cách tách nếu BA chỉ trả lời được một nửa.
6. **Đề xuất phải có căn cứ nêu trong chính ô đó** (không nhét giả thuyết/phân tích dài sang ô khác) — nêu đủ để BA duyệt nhanh, không phân tích thay BA.
7. **Không dùng thuật ngữ QA nội bộ** (mã test case, Test Type, tên skill) — viết bằng ngôn ngữ nghiệp vụ.

## Khi có nhiều câu

- Đánh số thứ tự ở cột `#` theo **mức độ chặn**: câu chặn nhiều test case nhất lên đầu.
- Trên 10 câu thì tách thành nhiều bảng theo chủ đề, mỗi bảng 1 heading `##` phía trên.
- Cuối bảng (hoặc cuối toàn bộ nếu nhiều bảng) nêu rõ **câu nào ưu tiên cao nhất** nếu BA chỉ trả lời được vài câu.

## Ví dụ đạt chuẩn

```markdown
| # | Câu hỏi | Bằng chứng & hệ quả | Đề xuất | Trả lời của BA |
| --- | --- | --- | --- | --- |
| 1 | Count sau merge là cộng thuần hay đếm distinct sản phẩm? | Màn **Review Filter Node**: Avocado (5) + Emerald (2) + Lime (1) → hiển thị **Avocado (8)** (cộng thuần). Nếu 1 sản phẩm có cả Avocado lẫn Emerald sẽ bị đếm 2 lần → badge hiện 8 nhưng lọc ra chỉ 7 sản phẩm. | Nghiêng về **đếm distinct sản phẩm** — khớp kỳ vọng thông thường của merchant khi đọc badge count (số sản phẩm sẽ thấy khi lọc), cộng thuần dễ gây hiểu nhầm. | |
```

## Ràng buộc

- **Không bịa số liệu/tên field** — chỉ trích từ thiết kế/ảnh thật đã đọc được. Chỗ chưa đọc được thì ghi rõ "chưa quan sát được", không đoán.
- **Tra `docs/specs/` trước** — không hỏi lại điểm đã có lời giải rõ ràng trong tài liệu dự án.
- Output là markdown, có thể ghi ra `docs/questions/<feature-slug>-questions.md` nếu người dùng muốn lưu file; mặc định chỉ trả lời trong chat để người dùng copy đi gửi.
- Chỉ thao tác trong folder dự án hiện tại.
