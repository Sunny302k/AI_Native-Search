---
name: review-figma-spec-consistency
description: Đối chiếu nhiều spec/frame Figma cùng pattern (VD nhiều loại filter node — Price, Category, Collection... dùng chung UI) hoặc đối chiếu ngược 1 spec đã extract với thiết kế Figma gốc, để phát hiện field/rule thiếu sót, không nhất quán giữa các biến thể — tránh việc tự mặc định "chắc là cố ý" khi thực ra là thiếu sót trong lúc thiết kế/extract.
trigger: "so sánh spec [feature A] với [feature B]", "check spec [feature] có nhất quán với các cụm tương tự không", "review lại spec đã extract từ figma", "audit spec figma" — áp dụng khi đã có ≥2 spec/frame cùng pattern cần đối chiếu chéo, hoặc cần verify 1 spec đã extract (từ extract-figma-spec) có sót nội dung so với Figma gốc không. KHÔNG dùng để tạo spec mới (→ extract-figma-spec) hay tạo test case (→ create-testcases/create-testcase-suite).
---

## Bối cảnh

`extract-figma-spec` viết lại từng cụm chức năng thành 1 file spec riêng. Nhưng vì dự án dùng chung 1 UI pattern cho nhiều biến thể (VD nhiều loại filter node), rủi ro lớn nhất không phải là thiếu spec mà là **các bản spec anh em lệch nhau** — 1 frame có setting mà frame kia không có, default value khác nhau không rõ lý do — và QA dễ tự suy diễn đó là chủ đích thay vì hỏi lại BA. Skill này chuyên trách phát hiện đúng loại lệch đó, tách biệt khỏi việc extract spec ban đầu để có thể review độc lập, kể cả sau khi spec đã được dùng viết test case rồi.

## Bước 1: Xác định input và loại đối chiếu

Hỏi lại người dùng nếu thiếu:

- **Đối chiếu chéo (nhiều biến thể)**: danh sách ≥2 file spec trong `docs/specs/` (thường do `extract-figma-spec` sinh ra) thuộc cùng 1 pattern UI, cần so nhau. Nếu người dùng chỉ đưa link Figma của các biến thể chưa có spec, gợi ý chạy `extract-figma-spec` cho từng cái trước.
- **Đối chiếu ngược (verify)**: 1 file spec đã extract + link Figma gốc tương ứng, cần kiểm tra spec có bỏ sót note/field nào không.

## Bước 2A: Đối chiếu ngược (verify spec với Figma gốc)

Đọc lại toàn bộ node Figma gốc (design context + toàn bộ sticky note trong vùng, như Bước 2 của `extract-figma-spec`), so với nội dung đã ghi trong file spec draft, liệt kê:

- Note/field có trên Figma nhưng chưa được đưa vào spec.
- Nội dung trong spec diễn giải sai/thiếu so với note gốc (so nguyên văn note với phần diễn giải trong spec).

## Bước 2B: Đối chiếu chéo (nhiều biến thể cùng pattern)

1. Với mỗi spec, tách thành danh sách "field + rule" atomised — mỗi field/rule 1 dòng, đánh ID tạm nếu spec chưa có ID (tương tự Bước 2 của `check-testcase-coverage`).
2. Map các field/rule theo tên hoặc khái niệm tương đương giữa các spec (VD "Option display" ở spec Category tương ứng "Option display" ở spec Price), rồi tìm:
   - Field có ở spec này nhưng thiếu ở spec kia.
   - Default value/range khác nhau giữa các biến thể mà không có note nào giải thích lý do khác biệt.
   - Rule phụ thuộc chéo (dependency) chỉ xuất hiện ở 1 spec dù UI pattern giống hệt các spec còn lại.
   - Modal/sub-flow có ở biến thể này nhưng thiếu ở biến thể kia.

## Bước 3: Phân loại phát hiện

Với mỗi điểm khác biệt tìm được ở Bước 2A/2B, phân vào 1 trong 2 nhóm:

- **Có vẻ cố ý**: có note/lý do rõ ràng trong chính spec/Figma giải thích vì sao biến thể này khác biến thể kia.
- **Nghi ngờ thiếu sót — cần hỏi BA**: không có lý do nào được ghi lại. Luôn gắn tag `[CẦN XÁC NHẬN BA]` cho nhóm này — **không tự quyết định đây là chủ đích** dù trông có vẻ hợp lý.

## Bước 4: Xuất báo cáo

File markdown checklist, cấu trúc:

```markdown
# Consistency review - <tên cụm pattern>

## Tổng quan
- Số spec đối chiếu: X
- Số điểm khác biệt: X (Có vẻ cố ý: X / Cần xác nhận BA: X)

## Chi tiết

- [OK] <field/rule> — giống nhau giữa các biến thể.
- [~] <field/rule> — Có vẻ cố ý — <lý do trích từ note>.
- [ ] <field/rule> — `[CẦN XÁC NHẬN BA]` — <mô tả khác biệt cụ thể giữa spec nào với spec nào>.
```

- Naming: kebab-case, `<pattern-slug>-consistency-checklist.md` (VD `filter-node-consistency-checklist.md`).
- Folder: `checklists/`.

## Bước 5: Cập nhật spec gốc (chỉ khi được xác nhận)

Nếu người dùng xác nhận 1 phát hiện là thiếu sót thật sự cần bổ sung vào spec — cập nhật lại đúng file `docs/specs/` tương ứng. Không tự ý sửa spec khi chưa có xác nhận.

## Bước 6: Thông báo tới người dùng

- Số điểm khác biệt phát hiện, chia theo "có vẻ cố ý" / "cần xác nhận BA".
- Đường dẫn file checklist vừa tạo.

## Ràng buộc

- Không tự quyết định 1 điểm khác biệt là "intentional" nếu không có note/lý do rõ ràng đi kèm — mặc định xếp vào nhóm cần hỏi BA.
- Không tự sửa file spec trong `docs/specs/` khi chưa có xác nhận của người dùng.
- Không tự viết hay sửa test case trong skill này.
- Chỉ thao tác trong folder dự án hiện tại (Native Search / Claude), nghiêm cấm thao tác trên folder khác.
