# Phân công test — Merchandise › Setup base score (3 tester: A, B, C)

Nguồn: Figma Merchandise (`fcjg1GDcLIl5HVdRFN4qhF`) section **2.2 Setup base score**, kèm Note Figma và PDF `[Spec] Merchandise`. Cập nhật: 2026-10-18.

Phạm vi: trang Setup base score, popup Edit Base Score, 2 popup Bulk edit (thiết kế nằm ở section 2.1, mở từ nút Bulk edit). **Không gồm** 2 màn List Product Ranking và Detail Product của feature Manage product ranking (section 2.1) — break riêng.

Tag `[Q#]` = task cần chờ câu trả lời BA ở bảng cuối file. `[Figma thiếu]` = Figma chưa có màn/trạng thái này.

## Bảng phân công

| Tester | Màn / phạm vi | Task | Ước lượng số case* | File test case |
|---|---|---|---|---|
| **A** | Setup Base Score, Edit Base Score | 1.1–1.17, 2.1–2.13, 5.1–5.2 | 60–85 | `setup-base-score_testcase.csv`, `edit-base-score_testcase.csv` |
| **B** | Bulk Edit - Select Product | 3.1–3.12 | 70–100 | `bulk-edit-select-product_testcase.csv` + file matrix |
| **C** | Bulk Edit - Edit Score, Score Calculation, Storefront Ranking | 4.1–4.15, 5.3–5.6, 6.1–6.7 | 70–100 | `bulk-edit-edit-score_testcase.csv`, `base-score-calculation_testcase.csv`, `base-score-storefront-ranking_testcase.csv` |

*Ước lượng thô, tham chiếu Advanced Settings (125 case) và Merge Values (70 + 8 case); chưa viết nên chưa chắc.

Mỗi tester ghi vào file riêng của mình, không sửa file của người khác (tránh xung đột git). Tên file đặt kebab-case, định dạng CSV BOM UTF-8.

## Thứ tự chạy

```
Chuẩn bị dữ liệu mồi (Tester C) ─┬─► Tester A: Edit Base Score ─► Setup Base Score ─┐
                                 ├─► Tester B: Bulk Edit - Select Product ───────────┼─► Tester C: Storefront Ranking
                                 └─► Tester C: Bulk Edit - Edit Score (dùng All products trước, dùng Select Product sau)
```

- **Tester C làm 2 việc đầu tiên:** chuẩn bị dữ liệu mồi, rồi bắt đầu từ các task 4.2–4.8 (mode, slider, NEW Base score, kẹp biên). Các task này chạy được với "All products" mà không cần chờ Tester B.
- **Storefront Ranking** của Tester C chạy sau cùng: cần Tester A và B ổn định phần lưu điểm, và cần BA trả lời Q16, Q18.
- **Khi bị chặn bởi BA:** viết trước phần test case không phụ thuộc câu hỏi, để phần chờ BA ở cuối.

## Quy tắc dữ liệu dùng chung (tránh giẫm chân nhau)

1. **Bulk edit "All products" chỉ Tester C được chạy**, vào khung giờ riêng và báo trước cho nhóm. Case này ghi đè điểm toàn store.
2. **Chia vùng sản phẩm:** Tester A và B dùng nhóm sản phẩm riêng (theo brand hoặc category) và chỉ Bulk edit trong nhóm của mình.
3. **Bộ dữ liệu mồi** (Tester C chuẩn bị trước khi cả nhóm bắt đầu): sản phẩm có Base score âm, 0, 999, -999; hai sản phẩm cùng điểm; sản phẩm tên rất dài; sản phẩm có và không có variant; store có hơn 1 trang (để test phân trang).
4. **Có cách reset:** trước mỗi lượt test, đưa Base score về mốc ban đầu.

## Tester A — Setup Base Score + Edit Base Score

### 1. Setup Base Score *(Figma 2.2, trang chính)*
- [ ] 1.1 — Vào trang (chưa rõ từ menu nào, `[Q1]`); nút back ← về màn trước
- [ ] 1.2 — Tiêu đề "Base score"; nút **Bulk edit** ở góc phải mở popup bulk
- [ ] 1.3 — Cột Rank, Product name (ảnh, tên, khoảng giá), Stock, Base score (icon + số, có số âm), Action (nút Edit)
- [ ] 1.4 — Dữ liệu khớp BigCommerce sau sync: tên, ảnh, giá, stock
- [ ] 1.5 — Số âm, số 0, số 999 / -999 hiển thị đúng
- [ ] 1.6 — Cột Rank tính theo phạm vi nào `[Q2]`
- [ ] 1.7 — Search: placeholder đang ghi "Search campaign by search term, content, ID…" (sai ngữ cảnh) `[Q3]`
- [ ] 1.8 — Search theo gì (tên, SKU, ID); không có kết quả thì hiện gì `[Q3, Figma thiếu]`
- [ ] 1.9 — Filter: nút có, nội dung bên trong chưa có `[Q4]`
- [ ] 1.10 — Sort **Product name**: Price Low to High, Price High to Low, A-Z, Z-A `[Q5]`
- [ ] 1.11 — Sort **Stock**: Highest - Lowest, Lowest - Highest
- [ ] 1.12 — Sort **Base score**: Highest - Lowest, Lowest - Highest (kể cả số âm)
- [ ] 1.13 — Kết hợp search, filter và sort cùng lúc
- [ ] 1.14 — Phân trang: Prev / số trang / Next, số dòng mỗi trang, Prev ở trang 1, Next ở trang cuối `[Q6]`
- [ ] 1.15 — Empty state khi store chưa có sản phẩm `[Figma thiếu]`
- [ ] 1.16 — Tiêu đề sản phẩm dài bị cắt "…", có tooltip không
- [ ] 1.17 — Dòng sau khi sửa cập nhật đúng điểm; toast thành công `[Q7]`

### 2. Edit Base Score *(popup khi bấm Edit)*
- [ ] 2.1 — Bấm Edit mở popup đúng sản phẩm của dòng đó; nút X đóng popup
- [ ] 2.2 — Ô nhập hiện đúng điểm hiện tại; slider -999 / 0 / 999 đứng đúng vị trí
- [ ] 2.3 — Ô nhập ↔ slider đồng bộ hai chiều
- [ ] 2.4 — Dòng phụ "Score range (-999) to 999"
- [ ] 2.5 — Giá trị biên: -999, -1, 0, 1, 999
- [ ] 2.6 — Ngoài biên (1000, -1000) `[Q8]`
- [ ] 2.7 — Không hợp lệ: số thập phân, chữ, ký tự đặc biệt, để trống, chỉ có dấu "-" `[Q8]`
- [ ] 2.8 — Save: lưu thành công, dòng ngoài bảng đổi điểm, popup đóng
- [ ] 2.9 — Save khi không đổi giá trị: có gọi lưu không, nút có bị khoá không
- [ ] 2.10 — Cancel / X: giữ giá trị cũ, slider và ô nhập reset khi mở lại
- [ ] 2.11 — Lưu lỗi (mất mạng/lỗi server): thông báo, giữ giá trị cũ `[Figma thiếu]`
- [ ] 2.12 — Biến thể sửa ngay trong dòng (ô input + nút Save thay cho Edit): có dùng không `[Q9]`
- [ ] 2.13 — Sửa nhanh nhiều dòng liên tiếp: điểm các dòng khác không bị ảnh hưởng; thứ tự dòng sau khi sort theo Base score có nhảy không

### Rule variant (Tester A)
- [ ] 5.1 — Điểm sản phẩm = trung bình điểm các variant; sửa điểm sản phẩm thì ghi đè lên mọi variant (Note Figma) `[Q15]`
- [ ] 5.2 — Sửa điểm 1 variant thì điểm sản phẩm tự đổi theo `[Q15: không thấy UI sửa variant]`

## Tester B — Bulk Edit - Select Product *(popup bước ①)*

- [ ] 3.1 — Mở popup từ nút Bulk edit; stepper ① active; Cancel / X đóng không lưu `[Q10]`
- [ ] 3.2 — Radio Specific products ↔ All products: đổi qua lại, condition cũ còn giữ không
- [ ] 3.3 — All products: counter khớp tổng sản phẩm của store
- [ ] 3.4 — Thêm condition, chọn thuộc tính và value (14 thuộc tính theo bảng Condition trong PDF)
- [ ] 3.5 — Kiểu text/số: Contain, Do not contain, =, >, <, between
- [ ] 3.6 — Kiểu chọn: single/multi-select, ô search; không có option thì "No option found."
- [ ] 3.7 — Logic **And** trong 1 group, **Or** giữa các group; thêm/xoá condition và group
- [ ] 3.8 — Product Options / Modifier Options: test riêng value thường và merged value
- [ ] 3.9 — Custom Fields `[Q11: PDF có, Figma không]`
- [ ] 3.10 — Panel Selected product(s): danh sách đúng, search, counter cập nhật khi đổi condition
- [ ] 3.11 — 0 sản phẩm khớp: nút Next có bị khoá không
- [ ] 3.12 — Next sang bước ②

## Tester C — Bulk Edit - Edit Score + Score Calculation + Storefront Ranking

### 4. Bulk Edit - Edit Score *(popup bước ②)*
- [ ] 4.1 — Stepper ② active; danh sách và số sản phẩm giữ đúng từ bước ①; không có nút Back `[Q12]`
- [ ] 4.2 — Mode **Increase / Decrease**: nhập số hoặc kéo slider, đồng bộ hai chiều
- [ ] 4.3 — Label đổi theo hướng: >0 ▲ Increase (xanh), <0 ▼ Decrease (đỏ), =0
- [ ] 4.4 — Cột NEW Base score tính realtime, đúng = Current ± X
- [ ] 4.5 — Kẹp biên: vượt 999 thì hiện 999, dưới -999 thì hiện -999
- [ ] 4.6 — Mode **Set to a fixed base score**: mọi sản phẩm về cùng 1 giá trị; có cột NEW không
- [ ] 4.7 — Đổi giữa 2 mode: giá trị đang nhập reset hay giữ
- [ ] 4.8 — Validate giá trị nhập (ngoài biên, thập phân, chữ, trống) `[Q8]`
- [ ] 4.9 — Save: toast "Base scores have been edited."; lưu đúng cho **toàn bộ** N sản phẩm, kể cả sản phẩm không hiện trên trang
- [ ] 4.10 — Sản phẩm ngoài danh sách chọn không đổi điểm
- [ ] 4.11 — Sau Save, trang Setup Base Score cập nhật đúng (trang đang đứng, sort, filter vẫn giữ)
- [ ] 4.12 — Số lượng lớn (1.293+ sản phẩm): thời gian, timeout, lưu một phần `[Q13]`
- [ ] 4.13 — Cancel / X: không lưu
- [ ] 4.14 — Lưu lỗi: thông báo, không ghi dở `[Figma thiếu]`
- [ ] 4.15 — Điều chỉnh "cả list" hay "riêng từng sản phẩm" (Note Figma ghi "aka tác động sản phẩm") `[Q14]`

### 5. Score Calculation
- [ ] 5.3 — Product ranking score và Rank đổi theo khi Base score đổi `[Q16]` (Self-learning chưa triển khai: ranking = Base + Merchandise)
- [ ] 5.4 — Sản phẩm mới sync về: Base score mặc định
- [ ] 5.5 — Sản phẩm bị xoá rồi sync lại: Base score cũ còn giữ không
- [ ] 5.6 — Sản phẩm sync về sau khi đã Bulk edit theo condition: có được áp điểm không `[Q17]`

### 6. Storefront Ranking
- [ ] 6.1 — Category Page: thứ tự đổi đúng theo điểm sau khi sửa
- [ ] 6.2 — SRP khi sort = Relevance `[Q18]`
- [ ] 6.3 — SRP khi shopper đổi sort khác (Price, Newest…) `[Q18]`
- [ ] 6.4 — ISW `[Q18]`
- [ ] 6.5 — Hai sản phẩm cùng điểm: tiêu chí xếp thứ tự phụ
- [ ] 6.6 — Độ trễ từ lúc lưu đến lúc storefront đổi
- [ ] 6.7 — Sản phẩm đang Hide / Pin / Bury từ campaign: base score không phá rule hiển thị

## Câu hỏi cho BA

| Q | Câu hỏi | Chặn task | Người hỏi |
|---|---|---|---|
| Q1 | Trang Setup base score vào từ đâu (menu, hay từ nút trong Manage product ranking)? Quan hệ giữa section 2.1 và 2.2: cùng tồn tại hay 2.2 thay thế? | 1.1 | Tester A |
| Q2 | Cột Rank là thứ hạng toàn store hay theo trang nào? Mọi dòng mẫu đều là "#2234" nên không suy ra được | 1.6 | Tester A |
| Q3 | Ô search ghi "Search campaign by search term, content, ID…": lỗi copy từ trang Campaign đúng không? Search theo những trường nào? | 1.7, 1.8 | Tester A |
| Q4 | Filter lọc theo gì? Có dùng chung bộ condition như Bulk edit không? | 1.9 | Tester A |
| Q5 | Dropdown cột Product name có "Price Low to High / High to Low": chủ ý đúng không? Sort giá dùng giá thấp nhất hay cao nhất của variant? | 1.10 | Tester A |
| Q6 | Số dòng mỗi trang? | 1.14 | Tester A |
| Q7 | Sau khi Edit từng dòng có toast thành công không (Figma chỉ có toast cho Bulk edit)? | 1.17 | Tester A |
| Q8 | Nhập ngoài -999…999 thì chặn, báo lỗi hay tự kẹp về biên? Có cho số thập phân không? | 2.6, 2.7, 4.8 | Tester A, C |
| Q9 | Biến thể sửa ngay trong dòng (input + Save) còn dùng không, hay popup là bản chính thức? | 2.12 | Tester A |
| Q10 | Nút Bulk edit của 2.2 mở đúng 2 popup bulk của 2.1 đúng không? | Nhóm 3, 4 | Tester B, C |
| Q11 | Condition trong Bulk edit có Custom Fields như PDF không? Figma không thấy | 3.9 | Tester B |
| Q12 | Bước ② có nút Back về bước ① không? | 4.1 | Tester C |
| Q13 | Giới hạn số sản phẩm cho 1 lần Bulk edit? Xử lý nền hay xử lý ngay? | 4.12 | Tester C |
| Q14 | Note ghi "điều chỉnh điểm cho cả list hoặc điều chỉnh điểm riêng": "điểm riêng" là sửa từng sản phẩm ngay trong popup bulk, hay chỉ là 2 mode Increase/Decrease và Fixed? | 4.15 | Tester C |
| Q15 | Rule variant: merchant sửa điểm variant ở đâu? Storefront dùng điểm sản phẩm hay điểm variant? | 5.1, 5.2 | Tester A |
| Q16 | Công thức Product ranking score (có cộng Merchandise không); Rank tính trên điểm nào | 5.3 | Tester C |
| Q17 | Bulk edit theo condition là sửa 1 lần, hay lưu thành rule để sản phẩm sync về sau cũng được áp? | 5.6 | Tester C |
| Q18 | Base score tác động SRP / ISW thế nào: chỉ khi sort = Relevance, hay cộng vào điểm relevance? | 6.2–6.4 | Tester C |

Chưa có câu trả lời nào. Mọi câu hỏi phải Closed hoặc Hoãn trước khi chốt test case của task liên quan.
