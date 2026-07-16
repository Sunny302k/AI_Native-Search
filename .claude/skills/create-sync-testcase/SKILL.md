---
name: create-sync-testcase
description: Tạo test case cho các field/section được extract-figma-spec gắn nhãn "Sync trực tiếp" hoặc "Tính toán từ dữ liệu sync" (đối chiếu docs/sync-fields-glossary.md) — kiểm tra hành vi phụ thuộc trạng thái dữ liệu BigCommerce và thời điểm/tiến trình sync, thay vì chỉ test qua thao tác Save trong Admin như field config thông thường.
trigger: "viết test case sync cho [feature]", "test case cho phần dữ liệu sync từ bigcommerce", "test case cho field lấy dữ liệu BigCommerce" — áp dụng khi spec có field được gắn nhãn Sync trực tiếp/Tính toán từ dữ liệu sync ở cột Nguồn dữ liệu (thường do extract-figma-spec sinh ra). KHÔNG dùng cho field Config nội bộ (→ create-testcases). KHÔNG dùng để test bản thân module Sync (màn hình Manual Sync/Schedule Sync/Sync History) — đó là feature độc lập, test như 1 feature bình thường qua create-testcases, không phải field phụ thuộc sync của feature khác.
---
## Bối cảnh

Native Search là hệ thống trung gian: lấy dữ liệu sync về từ BigCommerce rồi cho phép merchant setup hiển thị/logic lên trên dữ liệu đó (xem `docs/sync-fields-glossary.md`). Field thuộc nhóm này không thể test đầy đủ chỉ bằng cách đổi giá trị qua UI rồi bấm Save — kết quả đúng còn phụ thuộc **trạng thái dữ liệu phía BigCommerce** và **thời điểm/tiến trình sync**, nên cần 1 trục thiết kế test case riêng, tách khỏi `create-testcases` (vốn thiết kế cho field config nội bộ, input/validate qua UI).

## Bước 1: Xác định input

- Spec đã có cột Nguồn dữ liệu (từ `extract-figma-spec`), hoặc người dùng chỉ định trực tiếp field/section cần test kèm lý do tin rằng nó phụ thuộc sync.
- Nếu spec chưa gắn nhãn nguồn dữ liệu, gợi ý chạy lại `extract-figma-spec`; nếu người dùng chỉ đưa 1 field cụ thể không qua spec, tự đối chiếu nhanh field đó với whitelist tại `docs/sync-fields-glossary.md` trước khi nhận task.
- Lọc ra danh sách field/section thuộc đúng 2 nhóm: **Sync trực tiếp**, **Tính toán từ dữ liệu sync**. Field **Config nội bộ** không thuộc phạm vi skill này — báo lại cho người dùng dùng `create-testcases`.

## Bước 2: Xác định các trục trạng thái cần test

Với mỗi field thuộc nhóm **Sync trực tiếp**, xác định theo 3 trục:

1. **Trạng thái dữ liệu nguồn BigCommerce** — liệt kê state khả dĩ theo đúng entity của field đó (tra `docs/sync-fields-glossary.md` + note/spec liên quan), ví dụ với Product: in-stock/out-of-stock, visible/hidden theo channel, thuộc/không thuộc category đang xét, có price list riêng theo customer group, đã bị xoá/archive bên BigCommerce. Không tự bịa state không có căn cứ trong glossary/note — nếu nghi ngờ có state khác chưa được liệt kê, hỏi lại thay vì đoán.

   Khi cần xác nhận 1 chi tiết về **hành vi/data model của chính BigCommerce** (VD: xoá là hard hay soft delete, entity con có bị cascade xoá theo không) — đây là **Loại 1** theo `docs/bigcommerce-platform-facts.md` mục 1: tra file đó trước, nếu chưa có thì tra BigCommerce Developer Docs qua `WebFetch`/`WebSearch` và ghi lại fact + nguồn. Câu hỏi về việc **Native Search tự chọn phản ứng thế nào** trước 1 trạng thái BC (Loại 2) thì KHÔNG tra ở đây — xử lý bằng `<cần confirm>` như bình thường (xem Bước 3).
2. **Thời điểm/tiến trình sync** — dữ liệu đã sync xong (Success), đang sync (In Progress), sync gần nhất Failed, hoặc dữ liệu đã đổi bên BigCommerce nhưng CHƯA chạy lại sync (stale — Admin/Storefront vẫn đang hiển thị data cũ).
3. **Loại sync** (chỉ thêm nếu spec/note có phân biệt hành vi) — Manual Sync vs Schedule Sync.

Với field thuộc nhóm **Tính toán từ dữ liệu sync**, thêm trục thứ 4:

4. **Vòng đời tích luỹ qua nhiều chu kỳ sync** — các field dạng này (VD Self-learning Score, Trending Point) thường cộng dồn/tính lại sau mỗi lần sync, không phải giá trị snapshot 1 lần. Cần ít nhất 1 test case theo chuỗi ≥2 lần sync liên tiếp (VD: sau sync lần 1 → giá trị X; phát sinh thêm dữ liệu/hành vi mới; sync lần 2 → giá trị đổi đúng công thức đã nêu trong spec), không chỉ test 1 lần rồi dừng.

Nếu spec/note không nói rõ hành vi tại 1 trạng thái cụ thể (VD: sync Failed thì Admin hiển thị gì, dữ liệu stale thì Storefront có báo hiệu gì không) → không tự bịa, xử lý theo Bước 3.

## Bước 3: Viết test case

Dùng đúng schema 10 cột như `create-testcases` (ID | Test Type | Field/Phần | Chi tiết test | Cụ thể hơn | Preconditions | Test Steps | Input DB/Setting | Expected Result | Note), theo đúng quy tắc trình bày ô/CSV/BOM đã quy định trong `create-testcases`.

- **Test Type**: dùng giá trị **Sync** cho toàn bộ case sinh từ các trục ở Bước 2 (khác Happy/Negative/Edge vì trọng tâm là trạng thái nguồn + tiến trình sync, không phải input hợp lệ/không hợp lệ theo nghĩa form).
- **Field / Phần**: tên field/section đang test (giống quy tắc của `create-testcases`).
- **Preconditions**: ghi rõ trạng thái dữ liệu BigCommerce cần có sẵn trước khi test (VD "1 product đã bị archive bên BigCommerce").
- **Input DB/Setting**: ghi trạng thái sync cần chuẩn bị để case có ý nghĩa (VD "Batch sync gần nhất = Failed", "Product X vừa đổi category bên BigCommerce, sync chưa chạy lại"). Không lặp lại nội dung đã có ở Preconditions.
- **Expected Result**: mô tả đúng hành vi mong đợi tại trạng thái đang test — nếu spec mù mờ, thêm tag `<cần confirm>` vào Note theo đúng quy tắc của `create-testcases`.
- Phân bổ độ sâu theo rủi ro: field Sync trực tiếp/Tính toán ảnh hưởng trực tiếp tới dữ liệu hiển thị Storefront (rủi ro cao) → test đủ tổ hợp trạng thái nguồn × tiến trình sync liên quan; field chỉ ảnh hưởng UI phụ/không quan trọng → test đại diện, không liệt kê hết mọi tổ hợp.

## Bước 4: Gộp file

Cùng schema 10 cột nên gộp vào chung `userstoryID_testcase.csv` với `create-testcases`/`create-permission-testcase`/`create-impact-testcase`, theo đúng cơ chế đọc → thêm rows → sắp xếp lại → renumber ID đã quy định trong `create-testcases`. Khi sắp xếp theo Test Type trong cùng 1 nhóm Field/Phần, thứ tự ưu tiên là: Happy → Negative → Edge → **Sync** → Permission → Integration → System → Other.

## Bước 5: Thông báo tới người dùng

- Số field đã cover (chia theo Sync trực tiếp / Tính toán từ dữ liệu sync).
- Số test case Test Type = Sync đã tạo.
- Số test case cần confirm.

## Ràng buộc

- Không tự bịa trạng thái dữ liệu BigCommerce không có căn cứ trong `docs/sync-fields-glossary.md` hoặc note/spec liên quan — nghi ngờ có state khác thì hỏi lại, không liệt kê tràn lan cho đủ số lượng.
- Không tự đoán fact về nền tảng BigCommerce (Loại 1) khi chưa tra được qua `docs/bigcommerce-platform-facts.md` hoặc BC Developer Docs — nếu tra không ra hoặc docs mâu thuẫn, vẫn dùng `<cần confirm>` như câu hỏi Loại 2, không suy đoán để lấp khoảng trống.
- Không viết test case cho field **Config nội bộ** trong skill này — chuyển người dùng sang `create-testcases`.
- Không tự trigger sync thật hoặc thao tác trên dữ liệu BigCommerce thật khi soạn test case — skill này chỉ soạn case, việc thực thi/test thật thuộc giai đoạn execution sau.
- Không được phép bịa test case nếu thiếu thông tin — dùng tag `<cần confirm>` giống `create-testcases`.
- Chỉ thao tác trong folder dự án hiện tại (Native Search / Claude), nghiêm cấm thao tác trên folder khác.
