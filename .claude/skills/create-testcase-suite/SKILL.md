---
name: create-testcase-suite
description: Skill điều phối (orchestrator) — nhận 1 task/user story chưa chỉ rõ loại test case cần viết, tự phân loại xem cần chạy những skill test case nào (create-functional-testcase, create-permission-testcase, create-system-testcase, create-api-testcase, create-impact-testcase, create-sync-testcase, create-matrix-testcase, check-testcase-coverage), xác nhận kế hoạch với người dùng rồi chạy tuần tự và tổng hợp báo cáo cuối.
trigger: "viết test case cho task/user story [...]", "gen full test case cho [...]", "tạo bộ test case cho [userstoryID]" khi người dùng KHÔNG chỉ rõ loại (không nói "feature/màn hình", "luồng nghiệp vụ", "API", "phân quyền/ma trận role", "ảnh hưởng/impact", "coverage") — dùng làm điểm vào mặc định. Nếu người dùng đã nói rõ 1 loại cụ thể, dùng thẳng skill tương ứng, KHÔNG qua skill này.
---

## Hướng dẫn điều phối

Skill này KHÔNG tự viết test case — chỉ quyết định cần gọi những skill con nào, theo thứ tự nào, rồi để từng skill con tự thực hiện đúng quy tắc riêng của nó (format, cột, file, naming... giữ nguyên như định nghĩa trong skill con).

### Bước 1: Đọc task/spec

Xác định task/user story cần viết test case. Nếu chưa có spec cụ thể, hỏi lại người dùng nguồn spec trước khi phân loại.

Nếu người dùng chỉ đưa link/frame Figma thay vì spec text (dự án này thường không có spec sẵn, chỉ có thiết kế + sticky note), gợi ý chạy `extract-figma-spec` trước để có bản spec viết rõ ràng, rồi mới quay lại Bước 2. Nếu cụm chức năng đó có biến thể anh em cùng pattern UI (VD nhiều loại filter node), gợi ý chạy thêm `review-figma-spec-consistency` để đối chiếu chéo trước khi phân loại skill test case.

### Bước 2: Phân loại skill con cần áp dụng

Đối chiếu nội dung spec với từng tiêu chí sau để quyết định áp dụng hay không:

| Skill con | Áp dụng khi |
| --- | --- |
| `create-functional-testcase` | Luôn áp dụng — mọi task đều cần test case chức năng/màn hình chính (mặc định bật). |
| `create-permission-testcase` | Feature có từ 2 role trở lên với quyền thao tác khác nhau (Allowed/Denied/Conditional) trên cùng chức năng. |
| `create-system-testcase` | Spec mô tả 1 luồng nghiệp vụ chính phải đi qua ≥ 2 tác nhân (role hoặc hệ thống tự động, VD Schedule Sync) nối tiếp nhau mới hoàn tất (không phải mỗi tác nhân thao tác độc lập). |
| `create-api-testcase` | Task có kèm tài liệu API/curl/endpoint cụ thể. |
| `create-impact-testcase` | Thay đổi của task đụng tới entity/data/trạng thái/permission/API/component đang được luồng hoặc feature khác (ngoài spec đang đọc) sử dụng chung. |
| `create-sync-testcase` | Spec có field/section được `extract-figma-spec` gắn nhãn Nguồn dữ liệu = Sync trực tiếp hoặc Tính toán từ dữ liệu sync (đối chiếu `docs/sync-fields-glossary.md`) — tức feature phụ thuộc dữ liệu đồng bộ từ BigCommerce, không chỉ config nội bộ. |
| `create-matrix-testcase` | Mặc định bật — mọi task có case validate HOẶC có action phối hợp ≥2 field trong cùng 1 lần submit đều phải có thêm bản trình bày dạng matrix. Chỉ tắt khi task thuần hiển thị/UI (không có case validate và không có tổ hợp field), và phải nêu rõ lý do tắt. |
| `check-testcase-coverage` | Luôn chạy cuối cùng, sau khi các skill trên đã sinh xong test case. |

Nếu không đủ căn cứ để khẳng định 1 skill có áp dụng hay không (ví dụ chưa rõ feature có bị luồng khác dùng chung không), liệt kê skill đó là "chưa chắc — cần xác nhận" thay vì tự ý bật/tắt.

### Bước 3: Trình kế hoạch, xin xác nhận

Trước khi chạy bất kỳ skill con nào, liệt kê cho người dùng:

- Danh sách skill sẽ chạy, theo đúng thứ tự cố định: `create-functional-testcase` → `create-permission-testcase` → `create-system-testcase` → `create-api-testcase` → `create-impact-testcase` → `create-sync-testcase` → `create-matrix-testcase` → `check-testcase-coverage`.
- Lý do ngắn gọn vì sao mỗi skill được bật/tắt.
- Các mục "chưa chắc" cần người dùng xác nhận trước khi chạy.

Chỉ bỏ qua bước xác nhận này nếu người dùng đã dặn trước "chạy hết không cần hỏi lại" trong chính yêu cầu hiện tại.

### Bước 4: Thực thi tuần tự

Gọi lần lượt từng skill đã được xác nhận theo đúng thứ tự ở Bước 3. **Không chạy song song** — bắt buộc tuần tự vì `create-functional-testcase`, `create-permission-testcase`, `create-system-testcase`, `create-impact-testcase`, `create-sync-testcase` cùng ghi/gộp vào 1 file chung `userstoryID_testcase.csv` (đọc → thêm rows → sắp xếp lại → renumber ID theo đúng quy tắc gộp của từng skill con); chạy song song sẽ gây ghi đè lẫn nhau. Riêng `create-api-testcase` luôn ghi ra file riêng `userstoryID_api-testcase.csv` + Postman collection, không đụng tới file gộp.

`create-matrix-testcase` bắt buộc chạy SAU khi tất cả skill ghi vào file gộp (kể cả `create-sync-testcase`) đã xong. Skill này chuyển các case validate/tổ hợp field ra file matrix riêng rồi **gỡ chính các case đó khỏi** `userstoryID_testcase.csv` và renumber lại file bảng (đảm bảo 1 case chỉ tồn tại ở đúng 1 file). Nếu chạy sớm hơn, các skill sau đó lại ghi thêm rows vào file gộp và có thể tạo ra case trùng với matrix.

### Bước 5: Tổng hợp báo cáo cuối

Sau khi tất cả skill đã chạy xong, tổng hợp 1 báo cáo duy nhất gồm:

- Danh sách file đã tạo: `test-cases/userstoryID/userstoryID_testcase.csv` (file gộp functional + permission + system + impact + sync, nếu có chạy các skill tương ứng), `test-cases/userstoryID/userstoryID_api-testcase.csv` + Postman collection (nếu có chạy create-api-testcase), và (các) file `test-cases/userstoryID/userstoryID_matrix-<action>.csv` (nếu có chạy create-matrix-testcase).
- Tổng số test case **còn lại** trong file gộp sau khi matrix đã gỡ case trùng, chia theo Test Type (`Happy`/`Negative`/`Edge`/`Sync`/`Permission`/`Integration`/`UI`).
- Tổng số test case trong file API riêng (nếu có).
- Danh sách action đã matrix hoá + số TC (`MTC`) trong mỗi file matrix — hoặc lý do task này không cần matrix (không có case validate và không có tổ hợp field).
- Tổng số test case toàn task = (file gộp) + (file API nếu có) + (các file matrix) — do 2 file không trùng case nên cộng thẳng, không trừ trùng.
- Tổng số test case cần confirm (`<cần confirm>`) trên toàn bộ suite.
- Kết quả `check-testcase-coverage` (số rule Covered/Partial/Not covered) nếu có chạy.

## Ràng buộc

- Không tự viết test case trực tiếp trong skill này — mọi nội dung/format do skill con đảm nhiệm nguyên vẹn theo đúng quy định riêng của nó.
- Không tự ý bật 1 skill con khi không đủ căn cứ — phải hỏi lại người dùng cho các mục "chưa chắc".
- Không bỏ qua Bước 3 (xác nhận kế hoạch) trừ khi người dùng đã yêu cầu rõ ràng chạy hết không cần hỏi.
- Chỉ thao tác trong folder dự án hiện tại (Native Search / Claude), nghiêm cấm thao tác trên folder khác.
