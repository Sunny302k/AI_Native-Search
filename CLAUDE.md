# Về dự án

Đây là dự án kiểm thử manual và báo cáo cho hệ thống **Native Search**.

Native Search là 1 app cài thêm trên **BigCommerce**, thay thế công cụ search mặc định của BigCommerce bằng 1 hệ search/filter/merchandising/personalization riêng (cùng nhóm sản phẩm với Algolia/Klevu/Searchspring). Có 2 phía:

- **Admin (merchant-facing)**: merchant cấu hình search widget, search engine, filter, đồng bộ dữ liệu, merchandising — đây là phạm vi test chính của dự án này.
- **Storefront (shopper-facing)**: hành vi thực tế khách hàng thấy khi gõ search/dùng filter, do config ở Admin quyết định.

Backend: dữ liệu từ BigCommerce → job sync → index vào Elasticsearch.

## Phạm vi hệ thống (4 module chính)

- **Search**
  - Storefront Display Setup: Instant Search Widget (ISW – dropdown gợi ý khi gõ search), Search Result Page (SRP – trang kết quả search)
  - Search Engine Setup: Suggestion Dictionary (autocomplete), Stopwords, Redirects, General Setting (Search Relevance weighting), Synonyms (có nhắc tới trong nhiều tài liệu nhưng chưa có spec riêng)
- **Sync**: Manual Sync, Schedule Sync, Sync History — đồng bộ BigCommerce → Elasticsearch, là nguồn dữ liệu nền cho cả 3 module còn lại (Search/Filter đọc index; Merchandise Campaign re-evaluate sau mỗi lần sync)
- **Filter**: Filter Tree/Node Setup (Display Setup), Filter Cache, Merge Value, Advanced Setting (Data Setting) — kiểm soát nội dung/hiển thị block filter trên SRP & Category Page
- **Merchandise**: Scoring System (Base/Self-learning/Campaign score cộng dồn quyết định thứ tự sản phẩm), Merchandise Campaign (Trigger theo Keyword/Category/All + Display actions Pin/Hide/Bury/Filter + Score actions Boost/Deboost) — quyết định ranking sản phẩm trên SRP/Category Page

Module **Analytics** có nhắc tên trong tài liệu tổng quan nhưng chưa có spec/tài liệu nào — không giả định hành vi khi gặp task liên quan, phải hỏi lại.

## Đặc thù tài liệu — quan trọng khi phân tích spec

- **Rule bắt buộc: Figma notes = spec.** Toàn bộ note/annotation (kể cả sticky note màu vàng) gắn trên frame Figma được coi là spec chính thức, ngang hàng hoặc cao hơn tài liệu PDF. Nếu PDF mâu thuẫn với note trên Figma, không tự suy đoán — phải hỏi lại BA. Dùng skill `extract-figma-spec` để trích xuất frame + note thành spec viết rõ ràng trước khi viết test case; dùng `review-figma-spec-consistency` khi có nhiều biến thể/frame cùng pattern cần đối chiếu chéo.
- Chất lượng spec **không đồng đều giữa các module**: Sync và Merchandise có PDF spec khá đầy đủ, có bảng edge-case rõ ràng; ngược lại Search (Instant Search Widget, Search Result Page, Redirects, General Setting) và Filter Tree/Node Setup thường sơ sài, nhiều mục chỉ có tiêu đề không có nội dung, hoặc file note trống — với các module này càng cần đọc kỹ Figma + note thay vì tin vào PDF.
- Có 1 bộ tài liệu requirement/tài liệu tham khảo đầy đủ hơn (SPEC PDF theo từng feature, `Figma.md`/`figma.md`, `NOTE_*.md`, quy trình test riêng) lưu ngoài phạm vi thao tác của Claude tại `C:\Users\hangu\OneDrive\Máy tính\Auto Test\Native-Search` — chỉ dùng để **đọc tham khảo/đối chiếu thuật ngữ, nghiệp vụ**, không thao tác ghi/sửa gì trong đó (vi phạm ràng buộc #1 bên dưới).

# Cấu trúc thư mục

```
.
├── checklists/        # checklist QA (hiện đang rỗng)
├── docs/
│   ├── sync-fields-glossary.md   # whitelist entity/field sync từ BigCommerce, dùng để gắn nhãn Nguồn dữ liệu
│   └── specs/          # spec từng feature Native Search, viết ra từ extract-figma-spec hoặc viết ngược từ test case sheet gốc
├── test-cases/         # tài liệu test case, 1 folder/feature (kebab-case)
└── test-reports/       # báo cáo kết quả test (hiện đang rỗng)
```

# Ràng buộc

1. Chỉ thực hiện thao tác trên folder Claude (thư mục dự án này), nghiêm cấm thao tác trên các folder khác — kể cả khi đọc tham khảo tài liệu ở `Auto Test/Native-Search`, chỉ đọc, không ghi/sửa/xoá.
2. Naming convention: thực hiện đặt tên file teho nguyên tắc kebap.
   1. testcase sẽ sử dụng format là CSV BOM UTF-8
   2. Check list sử dụng markdown
3. Khi 1 yêu cầu khớp trigger của bất kỳ skill viết test case nào (`create-testcases`, `create-permission-testcase`, `create-system-testcase`, `create-api-testcase`, `create-impact-testcase`, `create-sync-testcase`, `create-testcase-suite`, `check-testcase-coverage`) — luôn invoke qua tool `Skill`, không tự thực thi lại bằng script/trí nhớ nội dung skill. Đặc biệt lưu ý: vừa đọc/sửa chính skill đó trong cùng phiên KHÔNG phải lý do để bỏ qua bước invoke — trí nhớ diễn giải lại dễ lệch so với bản text hiện tại của skill.
4. Khi báo cáo kết quả sau khi viết test case, luôn nói rõ đã viết qua skill nào — hoặc nói rõ nếu viết tay không qua skill nào kèm lý do. Không im lặng bỏ qua chi tiết này.

