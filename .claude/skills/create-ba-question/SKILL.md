---
name: create-ba-question
description: Viết câu hỏi Q&A ngắn gọn gửi BA/dev để confirm điểm chưa rõ trong thiết kế — mỗi câu gồm bằng chứng cụ thể từ UI, hệ quả nếu hiểu sai, và 1 câu hỏi chốt trả lời được bằng 1-2 câu.
trigger: "viết Q&A hỏi BA", "đặt câu hỏi confirm cho BA", "viết câu hỏi cho BA về [...]", "soạn câu hỏi gửi dev" — áp dụng khi ĐÃ phát hiện điểm chưa rõ/mâu thuẫn trong thiết kế và cần soạn câu hỏi gửi đi. KHÔNG dùng để phân tích thiết kế (→ extract-figma-spec) hay viết test case (→ create-testcase-suite).
---

## Cấu trúc 1 câu hỏi (bắt buộc — tối đa 5 dòng, không kể ô A)

```markdown
### Q<n>. <Câu hỏi rút gọn thành 1 dòng>

<1-2 câu: bằng chứng cụ thể từ thiết kế — tên màn hình, tên field, số liệu thật>

<1 câu: hệ quả nếu hiểu sai, kèm ví dụ cụ thể>

**❓ <Câu hỏi chốt — nêu rõ 2 phương án "X hay Y?" nếu có thể>**

**A:**
```

## Quy tắc

1. **Tiêu đề chính là câu hỏi ở dạng ngắn nhất** — BA đọc tiêu đề là biết đang hỏi gì.
2. **Luôn trích bằng chứng cụ thể**: tên màn hình, tên field, số liệu thật từ thiết kế (VD *"Avocado (5) + Emerald (2) + Lime (1) → hiển thị Avocado (8)"*). Không viết chung chung kiểu *"có vẻ count đang sai"*.
3. **Nêu hệ quả người dùng cuối nhìn thấy** để BA hiểu vì sao phải trả lời (VD *"badge hiện 8 nhưng lọc ra chỉ 7 sản phẩm"*).
4. **Câu hỏi chốt phải trả lời được bằng 1-2 câu**: ưu tiên dạng chọn giữa 2 phương án (`X hay Y?`) hoặc hỏi đúng 1 dữ kiện (`lấy từ đâu?`). Nghiêm cấm câu hỏi mở kiểu *"anh thấy chỗ này thế nào?"*.
5. **Mỗi Q chỉ hỏi 1 vấn đề.** Nếu 2 vấn đề gắn chặt nhau, được gộp vào 1 câu chốt nhưng phải ghi chú sẵn cách tách nếu BA chỉ trả lời được một nửa.
6. **Không nhét giả thuyết/phân tích dài của mình vào** — chỉ nêu đủ để BA hiểu vấn đề, không phân tích thay BA.
7. **Không dùng thuật ngữ QA nội bộ** (mã test case, Test Type, tên skill) — viết bằng ngôn ngữ nghiệp vụ.
8. **Luôn để trống dòng `**A:**`** cuối mỗi câu để BA điền trực tiếp.

## Khi có nhiều câu

- Đánh số `Q1, Q2...` theo **mức độ chặn**: câu chặn nhiều test case nhất lên đầu.
- Trên 5 câu thì gom nhóm theo chủ đề, mỗi nhóm 1 heading `##`.
- Cuối danh sách nêu rõ **câu nào ưu tiên cao nhất** nếu BA chỉ trả lời được vài câu.

## Ví dụ đạt chuẩn

```markdown
### Q1. Count sau merge được tính thế nào?

Ở màn **Review Filter Node**: Avocado (5) + Emerald (2) + Lime (1) → hiển thị **Avocado (8)** — tức đang **cộng thuần**.

Nhưng nếu 1 sản phẩm có **cả Avocado lẫn Emerald** thì nó bị đếm 2 lần → badge hiện 8 nhưng lọc ra chỉ 7 sản phẩm.

**❓ Count sau merge là _cộng thuần count các value con_ hay _đếm distinct sản phẩm (không trùng)_?**

**A:**
```

## Ràng buộc

- **Không bịa số liệu/tên field** — chỉ trích từ thiết kế/ảnh thật đã đọc được. Chỗ chưa đọc được thì ghi rõ "chưa quan sát được", không đoán.
- **Tra `docs/specs/` trước** — không hỏi lại điểm đã có lời giải rõ ràng trong tài liệu dự án.
- Output là markdown, có thể ghi ra `docs/questions/<feature-slug>-questions.md` nếu người dùng muốn lưu file; mặc định chỉ trả lời trong chat để người dùng copy đi gửi.
- Chỉ thao tác trong folder dự án hiện tại.
