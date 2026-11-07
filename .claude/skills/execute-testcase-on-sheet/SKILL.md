---
name: execute-testcase-on-sheet
description: Thực hiện test manual thay người dùng theo đúng file test case đã viết trong repo (VS Code), đối chiếu lại spec/Figma mới nhất trước khi chấm kết quả, rồi cập nhật trạng thái/PIC/ngày/note/bug trực tiếp trên Google Sheet quản lý test case của dự án (người dùng copy nguyên file CSV sang sheet, giữ đúng ID). Dùng khi cần CHẠY test đã có sẵn và ghi nhận kết quả, không dùng để viết test case mới.
trigger: "test theo test case [feature] trên gg sheet/google sheet", "thực hiện test [feature]", "chạy test [feature] và update trạng thái", "cập nhật kết quả test case [feature] trên sheet" — áp dụng khi ĐÃ CÓ sẵn file test case trong repo và ĐÃ CÓ Google Sheet tương ứng (người dùng đưa link hoặc đã lưu ở memory/reference). KHÔNG dùng để sinh test case mới (→ create-functional-testcase/create-permission-testcase/create-system-testcase/create-impact-testcase/create-sync-testcase/create-api-testcase), KHÔNG dùng để audit coverage (→ check-testcase-coverage).
---

## Bối cảnh

Dự án quản lý test case ở 2 nơi:

- **Repo (VS Code)**: file CSV 10 cột do các skill `create-*-testcase` sinh ra — đây là **nguồn sự thật cho cách viết case**, nhưng bản thân Expected Result trong đó có thể đã lỗi thời nếu spec/Figma đổi sau khi case được viết.
- **Google Sheet**: người dùng copy nguyên văn các dòng từ file CSV sang, giữ đúng số ID test case. Sheet là nơi theo dõi tiến độ chạy test thật (PIC, ngày, kết quả, bug), không phải nơi chỉnh sửa nội dung case.

Skill này thực hiện việc người dùng vẫn làm thủ công: đọc từng case theo ID, **đối chiếu case đó với spec/Figma hiện tại** (không mặc định Expected Result trong CSV vẫn còn đúng), thao tác thật trên app (Admin/Storefront) để lấy Actual Result, so với rule đúng nhất đang có, rồi quay lại sheet cập nhật đúng dòng ID đó.

## Ràng buộc tối quan trọng — không bịa kết quả, không chấm theo Expected đã lỗi thời

- **Chỉ đánh giá OK/NG sau khi đã thực sự dựng Precondition và thao tác Test Steps trên app thật (qua trình duyệt), quan sát Actual Result thật.** Không được suy luận kiểu "Expected Result hợp lý nên chắc Pass" — đây là hành vi fabricate, vi phạm nguyên tắc báo cáo trung thực của toàn bộ phiên làm việc.
- **Không mặc nhiên coi Expected Result trong file CSV là đúng tuyệt đối.** Spec/Figma có thể đã đổi sau khi case được viết — xem Bước 2 để đối chiếu trước khi chấm.
- Không thực hiện được 1 case (thiếu quyền truy cập, thiếu dữ liệu precondition, phụ thuộc hệ thống ngoài không có, case đang gắn `<cần confirm>` ở file CSV chưa chốt được Expected, hoặc case Permission cần role không có sẵn) → **không đoán**, đánh `SKIP` kèm lý do cụ thể, không tự chuyển thành OK/NG.

## Bước 1: Xác định input (hỏi lại nếu thiếu, không đoán)

1. **File test case nguồn** trong repo — đường dẫn `test-cases/<module>/.../<feature>_testcase.csv`.
2. **Google Sheet đích**: link + tên tab đúng feature. Tra memory dạng `reference-test-sheet-<feature>.md` trước; chưa có thì hỏi người dùng rồi lưu lại (kèm `how to apply`: dùng cho các lần chạy test sau của chính feature đó).
3. **Cách thao tác sheet**: mặc định qua Claude in Chrome (mở sheet đang hiển thị, đọc bằng `read_page`/`find`, sửa ô bằng click + gõ) vì dự án hiện không có Google Sheets connector riêng. Nếu sau này dự án gắn connector Google Sheets chính thức, ưu tiên connector hơn thao tác tay qua trình duyệt.
4. **Cột ID trong sheet** khớp đúng cột ID trong file CSV — xác nhận vị trí cột (thường là cột đầu) trước khi chạy case đầu tiên của 1 feature mới.
5. **Cột cập nhật kết quả** (đã chốt với người dùng ngày 2026-11-06, áp dụng mặc định cho mọi feature trừ khi người dùng nói khác đi cho feature cụ thể):

   | Cột | Tên tiêu đề trên sheet | Ghi gì | Khi nào ghi |
   |---|---|---|---|
   | J | PIC | luôn `Ha Nguyen` | mọi case đã chạy (OK/NG/SKIP) |
   | K | Date | ngày thực hiện, format `YYYY-MM-DD` | mọi case đã chạy |
   | L | Result 1 | `OK` (Pass) / `NG` (Fail) / `SKIP` (chưa test được) | mọi case đã chạy |
   | O | No Bug | **toàn bộ nội dung bug report** (đúng format skill `log-bug`: Title/Link TCs/Loại/Data test/Steps to reproduce/Actual/Expected/Link bug, kèm Priority đề xuất/Căn cứ FE-BE/Nguồn Expected ở cuối) — không ghi link hay đường dẫn file | chỉ khi `NG` |
   | P | Note | lý do cụ thể | chỉ khi `SKIP` |

6. **Phạm vi chạy**: chỉ chạy đúng nhóm case người dùng chỉ định (VD "phần Pricing", "case 1-20") — không tự ý chạy thêm case/tab khác trong cùng sheet.

## Bước 2: Đối chiếu lại spec/Figma mới nhất — bắt buộc trước khi chấm bất kỳ case nào

Không chạy thẳng theo Expected Result có sẵn trong CSV. Trước khi chấm case đầu tiên của mỗi nhóm **Field/Phần**, pull và đọc lại:

1. `git pull` repo, ghi lại commit hiện tại.
2. `docs/updates/<feature>-updates.md` (nếu có) — nguồn ưu tiên cao nhất theo quy ước dự án.
3. Figma đúng section đang test, **kể cả toàn bộ note/sticky note vàng** — qua server `figma-native` (tài khoản `hanguyen31.tt@gmail.com`). Đọc lại dù đã đọc ở phiên trước, vì Figma có thể đã bị sửa sau đó.
4. `docs/specs/<feature>-specs.md` — đối chiếu nội dung và ngày/nguồn ghi trong spec với những gì vừa đọc ở (2) và (3).

So kết quả đọc lại với Expected Result đang ghi trong CSV của đúng nhóm Field/Phần đó:

- **Khớp nhau** → Expected Result trong CSV vẫn đúng, chạy case bình thường theo Bước 3.
- **Spec/Figma đã đổi so với lúc case được viết** (rule mới, giá trị mặc định mới, note mới xuất hiện, hoặc `docs/updates/` có mục mới chưa áp dụng vào CSV):
  - KHÔNG tự sửa file CSV khi đang chạy test (việc sửa case thuộc skill viết test case, tách biệt khỏi skill này).
  - Vẫn thực hiện case thật trên app để lấy Actual Result (Bước 3), nhưng khi chấm, so Actual với **rule hiện tại** chứ không chỉ Expected cũ trong CSV, và phân loại theo Bước 3 mục phân loại mở rộng.
  - Ghi case này vào danh sách riêng "Case lỗi thời do spec/Figma đã đổi" để báo cáo ở Bước 5 và đề xuất người dùng chạy lại skill viết test case cập nhật Expected.
- **Figma mâu thuẫn với spec PDF** (rule dự án: Figma = spec, ngang hoặc cao hơn PDF) → không tự chọn bên nào đúng, ghi rõ cả 2 vào Note của case và vào báo cáo cuối, hỏi lại BA — giống quy tắc ở `CLAUDE.md`.

Đọc lại 1 lần cho mỗi nhóm Field/Phần là đủ, không cần đọc lại cho từng case riêng lẻ trong cùng nhóm — trừ khi nghi ngờ có thay đổi giữa chừng (batch chạy trải dài nhiều ngày).

## Bước 3: Với từng test case, theo đúng ID

1. Đọc đúng dòng ID đó trong file CSV: Preconditions, Test Steps, Input DB/Setting, Expected Result. Nếu cột Field/Phần của dòng đó trống, hiểu là thuộc nhóm của dòng gần nhất phía trên có giá trị (đúng rule đọc file 10 cột của các skill viết test case).
2. Dựng đúng Precondition trên app thật (Admin/Storefront theo đúng role/trạng thái case yêu cầu).
3. Thực hiện đúng Test Steps bằng Claude in Chrome, quan sát Actual Result thật — chụp lại bằng `read_page`/screenshot nếu cần đối chiếu sau.
4. So Actual với kết quả đúng nhất đang có (Expected trong CSV, trừ khi Bước 2 đã phát hiện case này thuộc nhóm lỗi thời — khi đó so với rule hiện tại):
   - **Nhóm case bình thường** (spec/Figma chưa đổi):
     - Khớp hoàn toàn Expected → `OK`.
     - Lệch (sai dữ liệu, sai hành vi, lỗi, crash, thiếu validate...) → `NG`.
   - **Nhóm case lỗi thời** (đã phát hiện ở Bước 2):
     - Actual khớp rule MỚI (khác Expected cũ trong CSV) → không phải bug thật, đánh `SKIP`, Note ghi rõ rule mới là gì + nguồn (spec/Figma nào, hay `docs/updates/` mục nào) + đề xuất cập nhật lại test case.
     - Actual không khớp cả Expected cũ lẫn rule mới → vẫn là `NG` thật, chạy Bước 4 như bình thường, nhưng Note thêm rule hiện tại đã đổi để dev/BA fix đúng theo rule mới.
   - **Không thể thực hiện được** → `SKIP`, ghi rõ lý do (thiếu quyền truy cập / thiếu dữ liệu setup / case phụ thuộc hệ thống ngoài / case đang `<cần confirm>` chưa có Expected rõ ràng / khác).
5. Cập nhật ngay dòng ID đó trên Google Sheet theo bảng cột ở Bước 1 — không gộp chờ xong cả loạt case mới cập nhật 1 lần, để tránh mất dữ liệu nếu gián đoạn giữa chừng.

## Bước 4: Khi NG — sinh bug report

1. Gọi skill `log-bug` qua tool `Skill` (không tự viết tay nội dung bug report), truyền đủ: Case ID, Steps to reproduce (= Test Steps vừa thao tác thật), Actual Result (quan sát thật), Expected Result (lấy từ CSV, kèm rule mới nếu case thuộc nhóm lỗi thời ở Bước 2), link test case.
2. **Cột O ghi trực tiếp toàn bộ nội dung bug report** (chốt với người dùng 2026-11-07) — không ghi link hay đường dẫn file. Dán nguyên khối Title/Link TCs/Loại/Data test/Steps to reproduce/Actual/Expected/Link bug theo đúng format `log-bug`, nối thêm Priority đề xuất/Căn cứ FE-BE/Nguồn Expected ở cuối trong cùng ô.
   - **Kỹ thuật nhập nhiều dòng vào 1 ô qua Claude in Chrome**: gõ phím tắt `ctrl+Return` giữa các dòng (không dùng phím Enter thường) thường **bỏ sót dấu xuống dòng ở ranh giới đầu tiên** (nghi do gợi ý tự động của Sheets nuốt mất lần đầu) — không tin tưởng cách này. Cách chắc chắn: nhập cả khối dưới dạng **công thức nối chuỗi** `="dòng 1"&CHAR(10)&"dòng 2"&CHAR(10)&...` (escape dấu `"` bên trong bằng cách nhân đôi thành `""`), Enter xác nhận, rồi chuyển về giá trị tĩnh bằng `Ctrl+C` → `Ctrl+Shift+V` (Paste values only) ngay trên chính ô đó. Khi cần dán sang các ô case khác, **copy từ ô đã là giá trị tĩnh** (không copy từ ô còn công thức) rồi `Ctrl+V` bình thường, mỗi lần dán xong chụp màn hình xác nhận cả nội dung lẫn việc xuống dòng đúng chỗ.
   - Tham chiếu local vẫn giữ 1 bản trong `test-reports/<feature>/bugs/<slug>.md` để tiện đọc lại/đối chiếu trong repo, nhưng đây không phải giá trị ghi vào cột O.
3. Nếu dự án đã có nơi quản lý bug riêng (Jira/GitHub Issues...), sau khi tạo được bug thật ở đó thì cập nhật dòng "Link bug:" trong chính nội dung ở cột O bằng link/mã thật, thay cho "chưa có - chờ tạo".
4. Case NG không chặn các case khác — vẫn tiếp tục chạy hết phạm vi đã chỉ định.

## Bước 5: Báo cáo sau mỗi lượt chạy

- Tổng số case đã chạy trong phạm vi, chia theo OK/NG/SKIP.
- Danh sách case NG kèm bug report vừa tạo (đường dẫn/mã).
- Danh sách case SKIP kèm lý do.
- **Danh sách case lỗi thời do spec/Figma đã đổi** (phát hiện ở Bước 2), kèm rule mới và nguồn — đề xuất cập nhật lại file CSV bằng skill viết test case tương ứng.
- **Danh sách mâu thuẫn Figma vs PDF** (nếu có) chưa tự quyết được — cần hỏi BA.
- Case nào trong phạm vi nhưng ID không khớp giữa sheet và CSV (sheet thiếu dòng, hoặc CSV đã sửa ID sau khi copy) → liệt kê riêng, không tự đoán map case nào với case nào.

## Ràng buộc

- Không tự tạo Actual Result nếu chưa thực sự thao tác trên app thật.
- Không mặc nhiên coi Expected Result trong CSV đúng tuyệt đối — luôn đối chiếu Bước 2 trước khi chấm.
- Không sửa cột nào trên sheet ngoài J, K, L, O, P (trừ khi người dùng đổi quy ước cột cho 1 feature cụ thể — khi đó hỏi lại và lưu riêng, không áp dụng ngược cho feature khác).
- Không sửa nội dung test case gốc trong file CSV khi đang chạy test — 2 việc tách biệt: viết/cập nhật case ở VS Code (các skill `create-*-testcase`), chạy case trên sheet (skill này). Phát hiện case lỗi thời thì báo cáo, không tự sửa CSV.
- ID không khớp giữa sheet và CSV → dừng case đó lại, báo người dùng, không đoán.
- Figma mâu thuẫn với spec PDF → không tự chọn bên đúng, ghi cả 2 và hỏi BA.
- Chỉ thao tác trên đúng Google Sheet/tab/phạm vi dòng người dùng đã chỉ định.
