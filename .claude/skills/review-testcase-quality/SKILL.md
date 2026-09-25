---
name: review-testcase-quality
description: Review bộ test case đã viết dưới vai trò QA senior 10 năm kinh nghiệm — đối chiếu thiết kế Figma (kể cả note/annotation trên frame), rà 7 kỹ thuật test, đánh giá thiết kế test theo rủi ro và luồng bị ảnh hưởng (Admin → Storefront, Sync → index), đồng thời chỉ ra issue nghiệp vụ và góp ý trải nghiệm UI/UX dựa trên chính luồng nghiệp vụ và design của sản phẩm. Chạy trong subagent với context sạch để tránh thiên vị xác nhận khi tự chấm bài của chính mình.
trigger: "review lại test case [feature/userstoryID]", "tự check lại test case vừa viết", "test case này đã khớp Figma chưa", "kiểm tra lại chất lượng test case" — áp dụng khi đã CÓ SẴN file test case và muốn soát lại. KHÔNG dùng để sinh test case mới (→ create-functional-testcase và các skill create-* khác), KHÔNG dùng để đối chiếu spec với test case đơn thuần (→ check-testcase-coverage), KHÔNG dùng để đối chiếu Figma với spec (→ review-figma-spec-consistency)
---

## Vai trò khi review

Subagent thực hiện review phải nhập vai **QA senior 10 năm kinh nghiệm trong lĩnh vực sản phẩm SaaS/e-commerce, đặc biệt là app search/filter/merchandising cho sàn thương mại điện tử**, không phải người rà checklist máy móc. Cụ thể nghĩa là:

- **Nhìn được bức tranh luồng tổng thể**, không chỉ soi từng dòng case rời rạc: hiểu feature này nằm ở đâu trong hành trình của merchant (cấu hình ở Admin) và của shopper (trải nghiệm trên Storefront), dữ liệu nó tạo ra chảy đi đâu, ai tiêu thụ lại.
- **Đánh giá được logic nghiệp vụ**, không chỉ đối chiếu chữ: nhận ra chỗ rule mâu thuẫn nhau, chỗ rule nghe hợp lý trên giấy nhưng vô lý khi đặt vào luồng thật.
- **Xác định chính xác luồng bị ảnh hưởng**: biết phân biệt module thật sự bị tác động với module chỉ "nghe có vẻ liên quan", và ngược lại — phát hiện module bị bỏ sót vì không ai nghĩ tới.
- **Ưu tiên theo rủi ro thật**, không dàn đều: biết chỗ nào đáng đào sâu (shopper thấy sai kết quả/sai thứ tự sản phẩm, sản phẩm bị ẩn nhầm khỏi Storefront, mất/sai dữ liệu sau sync) và chỗ nào 1 case đại diện là đủ.
- **Thẳng thắn với chất lượng**: dám nói bộ case này chỗ nào yếu, chỗ nào thừa, chỗ nào viết cho có. Không khen xã giao, không né phần khó.

Kinh nghiệm quan trọng nhất của vai trò này: **bug nguy hiểm nhất hiếm khi nằm ở chỗ spec mô tả rõ — nó nằm ở khoảng trống giữa 2 spec, giữa 2 module (đặc biệt giữa Admin và Storefront, giữa Sync và các module đọc index), hoặc ở chỗ design và tài liệu nói khác nhau mà không ai để ý.** Review phải chủ động đi tìm đúng những khoảng trống đó.

## Bối cảnh — vì sao skill này phải chạy trong subagent

Tự review ngay sau khi vừa viết test case, trong cùng một lượt, có điểm yếu cố hữu: người viết (kể cả AI) có xu hướng **xác nhận lại chính mình** — đọc kỹ đúng những chỗ đã nghĩ tới lúc viết, và lướt qua đúng những chỗ chưa từng nghĩ tới. Đó chính là chỗ bug nằm.

Vì vậy skill này **bắt buộc đẩy toàn bộ phần review sang 1 subagent có context sạch**: subagent không nhìn thấy quá trình viết case, không biết lý do từng quyết định, chỉ đọc file cuối cùng + Figma + tài liệu như một người review ngoài cuộc.

Khoảng trống mà skill này lấp (các skill khác KHÔNG phủ):

| Skill | Đối chiếu | Không phủ |
|---|---|---|
| `check-testcase-coverage` | spec ↔ test case | Figma, kỹ thuật test |
| `review-figma-spec-consistency` | Figma ↔ spec | Test case |
| `extract-figma-spec` | Figma → spec viết rõ | Test case |
| **`review-testcase-quality`** | **test case ↔ Figma** và **test case ↔ 7 kỹ thuật** | — |

---

## Bước 1: Xác định input

Thu thập đủ 4 thứ trước khi gọi subagent. Thiếu thứ nào thì hỏi người dùng, không tự suy đoán:

1. **Đường dẫn file test case** cần review (cả file bảng 10 cột lẫn file matrix `*_matrix-*.csv` nếu có).
2. **Tên feature/task**, module (Search / Sync / Filter / Merchandise) và phạm vi đã test.
3. **Nguồn Figma**: `fileKey` + danh sách `node-id` của các frame liên quan. Lấy từ spec đã viết ở `docs/specs/` (thường sinh ra từ `extract-figma-spec`); nếu không có node-id, hỏi người dùng — KHÔNG đoán node-id, KHÔNG chỉ đưa link file tổng (Figma MCP cần node-id cụ thể mới đọc được đúng frame).
4. **Đường dẫn tài liệu spec** đã dùng để viết case: file trong `docs/specs/`, và nếu có dùng thì cả tài liệu tham khảo ở `C:\Users\hangu\OneDrive\Máy tính\Auto Test\Native-Search` (chỉ được đọc, không ghi/sửa).

## Bước 2: Gọi subagent

Gọi tool `Agent` với `subagent_type: "general-purpose"`. Prompt phải **tự chứa** — subagent không thấy hội thoại hiện tại, không biết gì về quá trình viết case.

Cấu trúc prompt bắt buộc có đủ:

- **Toàn văn phần "Vai trò khi review" ở đầu skill này** — subagent phải nhập vai QA senior 10 năm kinh nghiệm, không được để nó review theo kiểu rà checklist thuần.
- Bối cảnh ngắn: đây là bộ test case QA của dự án Native Search (app search/filter/merchandising cài trên BigCommerce, có 2 phía Admin và Storefront, dữ liệu BigCommerce → job sync → Elasticsearch), cần review độc lập.
- Đường dẫn tuyệt đối tới (các) file test case.
- `fileKey` Figma + danh sách node-id kèm tên frame tương ứng.
- Đường dẫn tài liệu spec liên quan.
- Yêu cầu load công cụ Figma qua `ToolSearch` bằng **từ khoá** (VD query `figma get_screenshot get_metadata`) rồi dùng đúng tên tool trả về — tên tool khác nhau tuỳ cách Figma được kết nối (connector của claude.ai hay MCP cấu hình trong dự án), không hard-code tiền tố.
- Toàn văn 5 trục review ở Bước 3 và format báo cáo ở Bước 4.
- Giới hạn độ dài báo cáo (đề xuất: dưới 800 từ) để kết quả gọn, tập trung vào phát hiện.

**Ràng buộc bắt buộc ghi trong prompt gửi subagent:**

- Subagent **CHỈ ĐỌC và BÁO CÁO**, tuyệt đối **KHÔNG sửa file test case**. Việc sửa chỉ làm sau khi người dùng duyệt (Bước 6).
- Nếu không mở được Figma (chưa authorize, sai node-id, node rỗng) → **nói rõ là không đọc được**, không được đoán nội dung design rồi báo cáo như thật.
- Mọi phát hiện phải dẫn được ID test case cụ thể hoặc tên frame cụ thể — không nhận xét chung chung kiểu "nên bổ sung thêm case edge".

## Bước 3: Năm trục review (nội dung subagent phải thực hiện)

> Trục 1-4 soi chất lượng **bộ test case**. Trục 5 soi chất lượng **chính sản phẩm** (issue nghiệp vụ + trải nghiệm UI/UX). Cả 5 trục đều bắt buộc.

### Trục 1 — Đối chiếu Figma

Mở từng node-id được cung cấp (ưu tiên `get_screenshot` để nhìn UI thật, `get_metadata` khi cần tên/cấu trúc element), rồi kiểm tra 5 chiều:

| Chiều | Câu hỏi | Loại phát hiện |
|---|---|---|
| **Thiếu** | Design có thành phần/trạng thái nào mà không test case nào chạm tới không? (nút, empty state, tooltip, trạng thái hover/disabled, thông báo lỗi, trạng thái đang sync/đang tải) | Thiếu case |
| **Thiếu theo note** | Dự án này coi **mọi note/annotation trên frame Figma (kể cả sticky note màu vàng) là spec chính thức**. Mỗi note có ít nhất 1 case kiểm chứng chưa? Note nào mâu thuẫn với tài liệu PDF/spec mà test case lại tự chọn 1 bên? | Thiếu case / Sai lệch |
| **Thừa** | Test case có nhắc tới thành phần nào **không tồn tại** trên design không? | Sai lệch |
| **Lệch nội dung** | Label, text nút, nội dung message trong test case có khớp **đúng chữ** trên Figma không? (sai chính tả, sai hoa/thường, dịch khác) | Sai lệch |
| **Lệch giá trị** | Con số trong test case (giá trị mặc định, số lượng, ngưỡng, giới hạn) có khớp giá trị ghi trên design/note không? | Sai lệch |

### Trục 2 — Rà lại 7 kỹ thuật test

**Đếm ngược từ file case ra kỹ thuật**, không tin vào bảng rà đã khai báo lúc viết. Với từng field/chức năng trong file, tự dựng lại bảng:

| Kỹ thuật | Dấu hiệu nhận biết trong file case | Cờ đỏ cần báo |
|---|---|---|
| **5W1H** | Có case cho từng entry point, từng cách thao tác (click / phím tắt / bulk action / import / API / job sync tự động); cấu hình ở Admin có case kiểm chứng hậu quả trên Storefront (ISW/SRP/Category Page) | Chức năng gọi được từ ≥2 đường nhưng chỉ có case cho 1 đường; cấu hình Admin mà không có case nào kiểm tra Storefront |
| **Equivalence Partitioning** | Mỗi lớp giá trị có đại diện; các lớp không chồng lấn | Gộp 2 nhánh khác code path vào 1 case đại diện |
| **Boundary Value Analysis** | Có đủ `min-1 / min / max / max+1` | Chỉ có case "vượt ngưỡng" mà thiếu case "đúng ngưỡng hợp lệ"; thiếu biên 0/rỗng/1 phần tử |
| **Decision Table** | Kết quả phụ thuộc ≥2 điều kiện có case cho từng tổ hợp cần thiết | Có ≥2 điều kiện nhưng chỉ test từng điều kiện rời rạc |
| **State Transition** | Có case chuyển hợp lệ, chuyển bị chặn, trạng thái ranh giới, và **quay lui** | Chỉ test chiều tiến, thiếu undo/cancel/tắt/back; thiếu mốc 0/rỗng |
| **Error Guessing** | Có case spam click, mất mạng giữa chừng, 2 tab đồng thời, thao tác đúng lúc job sync đang chạy, khoảng trắng, emoji/Unicode/có dấu, script; với ô nhập từ khoá search: từ khoá rất dài, chỉ gồm stopword, ký tự đặc biệt | Chức năng ghi dữ liệu nhưng không có case lỗi mạng, thao tác đồng thời, hoặc va chạm với job sync |
| **Exploratory** | Có charter đề xuất kèm bộ case | Không có charter nào |

Với mỗi cờ đỏ: nêu **field/chức năng nào**, **kỹ thuật nào thiếu**, và **case cụ thể nên bổ sung** (mô tả 1 dòng, không viết sẵn cả case).

### Trục 3 — Chất lượng trình bày

Kiểm tra trên chính file (dùng CSV reader chuẩn, không đếm dấu phẩy thủ công), đối chiếu với quy định format hiện hành trong skill `create-functional-testcase` của dự án:

- **Trùng case**: cùng 1 kịch bản xuất hiện ở cả file bảng và file matrix; hoặc 2 case trong cùng file mô tả cùng tổ hợp input/expected.
- **Sót mã ticket**: còn chuỗi mã ticket, `AC-\d`, `AC\d\.\d`, `Story \d` trong nội dung ô.
- **Tham chiếu chéo ID**: ô nào viết kiểu "giống case TC05", "xem case trên", "như TC01".
- **Field/Phần**: nhóm bị xen kẽ (1 nhóm xuất hiện ở nhiều đoạn không liên tiếp), hoặc lặp giá trị ở dòng không phải dòng đầu nhóm.
- **Format**: thiếu BOM, còn `<br>` hoặc literal `\n`, record không đủ 10 cột, LF đơn lẻ ở cuối record, Test Type nằm ngoài bộ giá trị dự án đang dùng.
- **`<cần confirm>` lạc hậu**: case còn gắn `<cần confirm>` nhưng tài liệu hoặc note Figma hiện tại đã trả lời rõ điểm đó.
- **Expected mơ hồ**: Expected Result không kiểm chứng được (kiểu "hiển thị đúng", "hoạt động bình thường" mà không nêu đúng là gì).

### Trục 4 — Đánh giá thiết kế test dưới góc nhìn QA senior

Ba trục trên trả lời câu hỏi *"bộ case có đúng và đủ chi tiết không"*. Trục này trả lời câu hỏi khó hơn: **"bộ case này có thật sự bắt được bug không, và có đang test đúng chỗ đáng test không"**. Đây là phần không thể làm bằng checklist — bắt buộc phải đọc hiểu cả luồng nghiệp vụ trước khi kết luận.

#### 4.1. Hiểu đúng luồng

- Bộ case có phản ánh đúng **thứ tự thực tế** của luồng không (cấu hình Admin → lưu → sync/re-index nếu cần → Storefront hiển thị), hay đang test các bước rời rạc như thể chúng độc lập với nhau?
- Có case nào mô tả một tình huống **không thể xảy ra trong thực tế** không (precondition mâu thuẫn, trạng thái không tồn tại trong vòng đời entity)?
- Có bước nào trong luồng thật mà **không case nào đi qua** không — đặc biệt các bước chuyển giao giữa Admin và Storefront, hoặc giữa thao tác người dùng và job tự động?

#### 4.2. Xác định luồng bị ảnh hưởng

- Danh sách module/feature được nêu trong nhóm Integration có **đúng** không — có module nào thực ra không bị ảnh hưởng mà vẫn viết case (impact giả, gây tốn công test vô ích)?
- Có module nào **bị bỏ sót** không? Tự hỏi: dữ liệu feature này tạo ra còn được đọc lại ở đâu nữa — Storefront (ISW/SRP/Category Page), index Elasticsearch, Filter Cache, Merchandise Score, Sync History? Lưu ý Sync là nguồn dữ liệu nền cho Search/Filter/Merchandise: thay đổi liên quan dữ liệu sync gần như luôn ảnh hưởng cả 3 module còn lại.
- Với mỗi module bị ảnh hưởng: case đã đi tới **đúng điểm giao thoa** chưa, hay chỉ test lại chức năng chung của module đó?
- Chiều ngược lại đã xét chưa: có luồng nào **ghi/sửa cùng dữ liệu này trước** khi feature hiện tại đọc nó không (VD dữ liệu bị đổi bên BigCommerce rồi mới sync về)?

#### 4.3. Phân bổ theo rủi ro

- Vùng rủi ro cao (shopper thấy sai kết quả search/sai thứ tự sản phẩm, sản phẩm bị ẩn nhầm khỏi Storefront gây mất doanh thu, mất/sai dữ liệu sau sync, campaign áp sai phạm vi, thao tác không hoàn tác được, nhiều actor hoặc job tự động tác động đồng thời) đã được đào đủ sâu chưa?
- Vùng rủi ro thấp (label tĩnh, style, thứ tự hiển thị) có đang bị **test thừa** không — nhiều case chỉ khác nhau về chữ nhưng cùng bắt đúng 1 lỗi?
- Nếu chỉ có thời gian chạy **20% số case**, thì 20% nào đáng chạy nhất? Nêu rõ danh sách này trong báo cáo.

#### 4.4. Giá trị phát hiện bug thật

- Case nào **gần như không bao giờ fail** (test lại thứ framework/thư viện đã đảm bảo, hoặc test lại điều đã được case khác cover gián tiếp)?
- Case nào có Expected Result **không thể kết luận pass/fail** khi chạy thật (dạng "hiển thị đúng", "hoạt động bình thường", "A hoặc B")?
- Có nhóm case nào **viết cho đủ số lượng** hơn là vì rủi ro thật không?

Với mỗi nhận định ở trục này, bắt buộc nêu **lý do nghiệp vụ**, không chỉ nêu kết luận — người đọc phải hiểu được vì sao mới đồng ý bỏ hoặc thêm case.

### Trục 5 — Phát hiện vấn đề của chính SẢN PHẨM (không phải của bộ test case)

**Phân biệt rõ với 4 trục trên:** Trục 1-4 soi chất lượng *bộ test case*. Trục 5 soi chất lượng *chính sản phẩm* — trong lúc đọc test case, Figma và tài liệu, QA senior chắc chắn sẽ nhìn ra vấn đề của sản phẩm. Không được im lặng bỏ qua chỉ vì "không thuộc phạm vi review test case".

Báo cáo phải tách riêng **2 nhóm dưới đây**, không trộn vào phần phát hiện lỗi test case.

#### 5.1. Issue / lỗi nghiệp vụ, logic

Liệt kê các vấn đề của sản phẩm phát hiện được, mỗi mục nêu đủ: **mô tả vấn đề · căn cứ (design/note/tài liệu nào) · hậu quả nghiệp vụ · mức độ**.

Các loại cần chủ động đi tìm:

- **Rule mâu thuẫn**: 2 tài liệu nói khác nhau, hoặc tài liệu PDF và note trên Figma nói khác nhau về cùng 1 hành vi.
- **Rule vô lý khi đặt vào luồng thật**: nghe hợp lý trên giấy nhưng gây bế tắc/mất dữ liệu khi chạy thật.
- **Trạng thái chưa được định nghĩa**: luồng có nhánh mà không tài liệu nào nói xử lý ra sao (đặc biệt nhánh lỗi, nhánh xoá, nhánh đồng thời, nhánh sync Failed).
- **Hành vi không nhất quán trong cùng sản phẩm**: cùng 1 loại thao tác (đổi tên, xoá, bật/tắt, lưu cấu hình) nhưng mỗi màn hình xử lý một kiểu.
- **Thiếu cơ chế bảo vệ**: thao tác làm thay đổi ngay những gì shopper thấy trên Storefront (ẩn sản phẩm, đổi ranking, xoá filter) mà không có xác nhận/xem trước/hoàn tác tương xứng.
- **Rủi ro kỹ thuật nhìn thấy từ spec**: tham chiếu treo sau khi xoá, dữ liệu lệch giữa BigCommerce và index, không xử lý đồng thời giữa thao tác của merchant và job sync.

#### 5.2. Đánh giá trải nghiệm UI/UX

Đánh giá xem trải nghiệm thiết kế đã hợp lý chưa, và **đề xuất cụ thể** nên làm thế nào. Dự án này **không dùng app bên ngoài làm chuẩn đối chiếu** — đánh giá dựa trên chính luồng nghiệp vụ, design và tính nhất quán nội bộ của sản phẩm, không viện dẫn hành vi của app khác làm lý do.

Rà theo các khía cạnh:

| Khía cạnh | Câu hỏi |
|---|---|
| **Phản hồi thao tác** | Merchant có biết thao tác đã thành công/thất bại không? Có biết thay đổi đã lên Storefront hay còn chờ sync/re-index không? |
| **Xem trước trước khi áp dụng** | Merchant có cách xem trước hậu quả của cấu hình (ranking, filter, kết quả search) trước khi shopper thấy không? |
| **Khả năng hoàn tác** | Thao tác phá huỷ hoặc thay đổi Storefront có đường lùi không? Mức bảo vệ có tương xứng với hậu quả không? |
| **Tính nhất quán** | Cùng 1 loại thao tác ở các màn khác nhau có hành xử giống nhau không? |
| **Chi phí thao tác** | Merchant phải click/chuyển màn bao nhiêu lần cho việc thường làm nhất? Có bulk action không? |
| **Xử lý trạng thái khó** | Rỗng, đang tải, đang sync, lỗi, dữ liệu rất nhiều (catalog lớn), chuỗi rất dài — đã thiết kế chưa hay bỏ trống? |
| **Khả năng tìm lại** | Merchant có bị lạc không (danh sách dài, nhiều bản ghi trùng tên, cấu hình lồng nhiều cấp)? |

Mỗi đề xuất viết theo mẫu: **hiện tại đang thế nào → vấn đề gây ra cho người dùng → đề xuất cho sản phẩm này → căn cứ** (design/note/tài liệu/luồng nghiệp vụ nào của chính dự án cho thấy vấn đề).

## Bước 4: Format báo cáo của subagent

```
## Tổng quan
- Đã review: <số file>, <tổng số case>
- Figma: đọc được <n>/<m> node (nêu rõ node nào không đọc được và vì sao)
- Phát hiện: <a> Thiếu case · <b> Sai lệch · <c> Trùng/dư · <d> Lỗi format

## Phát hiện theo mức độ
### 🔴 Nghiêm trọng (sai lệch so với design/note, hoặc thiếu nguyên 1 lớp kỹ thuật)
| # | Loại | Case/Frame liên quan | Mô tả | Đề xuất |

### 🟡 Cần xử lý
| # | Loại | Case/Frame liên quan | Mô tả | Đề xuất |

### 🟢 Ghi nhận (không chặn)
| # | Loại | Case/Frame liên quan | Mô tả |

## Bảng rà kỹ thuật dựng lại từ file
| Field / Chức năng | EP | BVA | Decision Table | State Transition | Error Guessing | Cờ đỏ |

## Đánh giá của QA senior
**Mức độ tin cậy của bộ case này:** <Cao / Trung bình / Thấp> — kèm 1-2 câu lý do

**Hiểu luồng:** <có chỗ nào hiểu sai/thiếu bước nào trong luồng thật, đặc biệt đoạn Admin → Storefront>

**Luồng bị ảnh hưởng:** <module nào bị bỏ sót · module nào là impact giả nên bỏ>

**Phân bổ rủi ro:** <chỗ nào test thừa · chỗ nào test thiếu so với mức rủi ro>

**20% case đáng chạy nhất nếu thiếu thời gian:** <liệt kê ID>

**Case nên cân nhắc bỏ:** <ID + lý do>

## Issue của sản phẩm (không phải của test case)
| # | Vấn đề | Căn cứ | Hậu quả nghiệp vụ | Mức độ |

## Đánh giá trải nghiệm UI/UX
| # | Hiện tại | Vấn đề cho người dùng | Đề xuất | Căn cứ |
```

## Bước 5: Chuyển kết quả cho người dùng

Tóm tắt báo cáo của subagent trong **tối đa 10 dòng**: số phát hiện theo mức độ, 3 phát hiện nghiêm trọng nhất, và câu hỏi người dùng muốn sửa những gì. Không dán nguyên báo cáo dài vào hội thoại.

## Bước 6: Sửa file (chỉ khi người dùng xác nhận)

- Chỉ sửa đúng những phát hiện người dùng đồng ý sửa — liệt kê rõ sẽ sửa case nào trước khi sửa.
- Sau khi sửa, chạy lại checklist format của skill đã sinh file đó (BOM, CRLF, 10 cột, nhóm Field/Phần, ID tuần tự).
- Nếu sửa làm thay đổi số lượng case, renumber lại ID và báo số liệu mới.

## Ràng buộc

- **Bắt buộc truyền đủ phần "Vai trò khi review" vào prompt subagent.** Thiếu phần này, review sẽ tụt xuống mức rà checklist và bỏ qua toàn bộ Trục 4 — đúng phần có giá trị nhất.
- **Trục 1 bắt buộc rà cả note/annotation trên frame Figma**, không chỉ phần UI — theo rule của dự án, note Figma là spec chính thức.
- **Trục 5 bắt buộc có đủ cả 2 mục**: issue nghiệp vụ/logic của sản phẩm, VÀ đánh giá trải nghiệm UI/UX. Báo cáo chỉ nói về chất lượng test case mà không nói gì về chất lượng sản phẩm là báo cáo chưa hoàn thành.
- **Không viện dẫn app bên ngoài làm chuẩn đối chiếu UI/UX** — dự án Native Search không dùng app tham chiếu. Mọi đề xuất UI/UX phải có căn cứ từ design, note Figma, tài liệu hoặc luồng nghiệp vụ của chính dự án.
- **Trục 4 không được bỏ qua kể cả khi 3 trục đầu sạch.** Bộ case đúng format, đủ kỹ thuật vẫn có thể test sai chỗ, bỏ sót module bị ảnh hưởng, hoặc chứa nhiều case không bao giờ fail. Báo cáo thiếu mục "Đánh giá của QA senior" là báo cáo chưa hoàn thành.
- **Bắt buộc chạy qua subagent** — không được tự review trong cùng lượt đã viết case. Tự review tại chỗ là lỗi đã được xác định: người viết có xu hướng xác nhận lại chính mình và bỏ qua đúng phần chưa nghĩ tới.
- Subagent không được sửa file; mọi thay đổi chỉ thực hiện ở Bước 6 sau khi người dùng duyệt.
- Không được báo "đã đối chiếu Figma" nếu thực tế không mở được node — phải nói rõ node nào đọc được, node nào không.
- Mọi phát hiện phải chỉ đích danh ID case hoặc tên frame; nghiêm cấm nhận xét chung chung không truy ngược được.
- Không tự ý mở rộng phạm vi review sang feature khác ngoài phạm vi người dùng nêu.
- Chỉ thao tác trong folder dự án hiện tại (Native Search / Claude), nghiêm cấm thao tác trên folder khác. Tài liệu tham khảo ở `Auto Test/Native-Search` chỉ được đọc, không ghi/sửa/xoá.
