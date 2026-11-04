# Design issues — Merchandise › Campaign (vòng đời và xung đột action)

| | |
|---|---|
| Nguồn | Tài liệu Lark `[Spec] Merchandise` (sửa 2025-10-16, bản chép `docs/specs/merchandise-lark-spec-reference.md`) · Figma https://www.figma.com/design/fcjg1GDcLIl5HVdRFN4qhF/Merchandise?node-id=2-2 (section 2.3, 2.1, Note) · App tham chiếu Boost Commerce, Searchspring (help center, chưa dùng thử) |
| Ngày review | 2026-11-04 |
| Trạng thái | 🔵 Open: 6 · 🟢 Closed: 0 · Tổng: 6 |
| Chặn viết test case | 6 issue chưa Closed/Hoãn. File mới, ID dùng tiền tố MC để không trùng Q1–Q23 của `merchandise-setup-base-score-design-issues.md` (Q19 của file đó cũng hỏi về hết hạn campaign, nên MC-01 trả lời là đóng cả Q19) |

Đây là phần đầu của file, từ phần 1 của /explain Merchandise. Các phần sau của /explain sẽ bổ sung issue ở cuối file.

## Issue

| ID | Nhóm | Màn hình | Vấn đề / Câu hỏi | Tài liệu | Figma | App tham chiếu | Giả thuyết đề xuất | Người TL | Mức | Trạng thái | Câu trả lời |
|---|---|---|---|---|---|---|---|:---:|:---:|:---:|---|
| MC-01 | Vòng đời | Campaign details | Khi campaign hết hạn (qua end date), Pin/Bury/Hide/Filter xử lý ra sao? | Không đề cập (chỉ nói Display group "không đổi khi sync") | Chỉ note 2.1: Merchandise score "tự về 0 khi campaign kết thúc" | Layers, Maropost, ABtasty: pin theo lịch tự gỡ khi kết thúc. Searchspring, Boost Commerce: chưa tìm thấy tài liệu | Gỡ toàn bộ action của campaign đó, cả Display group lẫn Score group; sản phẩm về thứ tự theo Product ranking score | BA | 🔴 | 🔵 Open | |
| MC-02 | Vòng đời | Campaign details | Hết hạn xảy ra đúng thời điểm end date hay chỉ được xử lý sau lần sync kế tiếp? | Job post-sync chỉ quét campaign có `end_date > NOW`; không nói ai gỡ campaign đã hết hạn | Không đề cập | Không đề cập | Hết hạn theo thời gian thực, không phụ thuộc sync (nếu chờ sync thì sản phẩm còn Pin sau hạn) | BA | 🔴 | 🔵 Open | |
| MC-03 | Xung đột | Customize product rankings | Hai campaign khác nhau cùng áp action Display lên 1 sản phẩm (VD campaign trigger "All" Hide, campaign trigger keyword Pin) thì cái nào thắng? | Cross-action rule chỉ nói về xung đột trong cùng campaign, kèm alert | Popup Action Conflict chỉ có ở luồng Hide trong 1 campaign | Boost Commerce: Hide > Pin > Filter > Demote > Boost; rule global thắng rule theo collection | Ưu tiên Hide > Pin > Filter > Bury; khi cùng loại thì trigger cụ thể (keyword, category) thắng trigger All | BA | 🔴 | 🔵 Open | |
| MC-04 | Giới hạn | Setup trigger, Customize product rankings | Giới hạn số sản phẩm được Pin: 10 hay khác? | Không đề cập | "x/10 product(s) pinned" ở Setup trigger, nhưng badge "233" trên nút Pin ở popup action | Boost Commerce: tối đa 7 sản phẩm ở 7 vị trí đầu | Giới hạn 10 sản phẩm Pin mỗi campaign (theo Figma); "233" là dữ liệu mẫu | BA | 🟡 | 🔵 Open | |
| MC-05 | Xung đột | Customize product rankings | Sản phẩm vừa bị Pin vừa có Boost/Deboost: shopper thấy vị trí nào? | Display group không tham gia sort chung; Score group vẫn sort theo điểm; hai nhóm chạy song song | Card đã Pin: Boost/Deboost vẫn dùng được (Bury, Hide mờ) | Boost Commerce: Pin ưu tiên hơn Boost | Vị trí Pin thắng; điểm vẫn được lưu và chỉ có tác dụng khi sản phẩm hết bị Pin | BA | 🟡 | 🔵 Open | |
| MC-06 | Sync | Campaign details | Sản phẩm đang bị Pin biến mất khỏi index (xoá/ẩn bên BigCommerce) rồi quay lại sau sync: giữ vị trí Pin hay mất Pin? | Job post-sync chỉ nói add/remove sản phẩm khớp rule; không nói về Pin cố định | Không đề cập | Searchspring: sản phẩm quay lại index thì về đúng vị trí Pin, trừ khi campaign được lưu lại lúc sản phẩm chưa sync | Giữ vị trí Pin khi sản phẩm quay lại; cần BA xác nhận có đổi khi merchant lưu campaign lúc đó | BA | 🟡 | 🔵 Open | |

## Ghi chú

- Cột App tham chiếu chỉ dẫn nguồn đọc được trên help center; Searchspring chưa tìm được bài nói về hết hạn campaign hay ưu tiên giữa nhiều campaign, nên không suy ra hành vi.
- Giả thuyết là gợi ý có lý do, không phải quyết định. BA/PO chỉ cần xác nhận Đúng/Sai.
- Mọi issue (🔴 🟡 🟢) phải Closed hoặc Hoãn trước khi viết test case.
