# FEATURE — THIÊN PHÚ

## ROUTE NHANH
**UI/choice text:** `game_data/game/js/plugins/Xiao_SJ.js` → `choiceTest()` (khoảng dòng 34).
**Màn hình/map:** `game_data/game/js/libs/json/Map005.json` → event 2 `thiên phú Giao diện`; parallax `$MGT_Talent`.
**Nền:** `game_data/game/img/parallaxes/$MGT_Talent.webp`.
**Ảnh overlay:** `game_data/game/img/pictures/NB_1.webp` (Map005 event 2 hiển thị picture ID 8 tại x=350,y=45 khi switch 10).
**Logic/dữ liệu:** `game_data/game/js/libs/json/CommonEvents.json`.
**Tên switch/variable:** `game_data/game/js/libs/json/System.json`.
**Danh mục talent bổ sung:** `talents-added.json` (root, tài liệu/dữ liệu bổ sung; kiểm tra usage trước khi sửa runtime).

## FLOW THỰC TẾ
Map005 event 2 → reset variables 61..67 + 55 → Common Event 49 init → `choiceTest()` → 8 choice callbacks → Common Events 40..47 → reward/result events.

## COMMON EVENTS THIÊN PHÚ
- CE 8: `【nút bấm】nghịch thiên cải mệnh` (6 commands)
- CE 40: `【thiên phú】-0- Lựa chọn` (22 commands)
- CE 41: `【thiên phú】-1- Lựa chọn` (9 commands)
- CE 42: `【thiên phú】-2- Lựa chọn` (9 commands)
- CE 43: `【thiên phú】-3- Lựa chọn` (9 commands)
- CE 44: `【thiên phú】-4- Lựa chọn` (9 commands)
- CE 45: `【thiên phú】-5- Lựa chọn` (9 commands)
- CE 46: `【thiên phú】-6- Lựa chọn` (9 commands)
- CE 47: `【thiên phú】-7- Lựa chọn` (9 commands)
- CE 48: `【thiên phú】 kết quả ban thưởng` (1261 commands)
- CE 49: `【thiên phú】 Khởi tạo ` (33 commands)
- CE 50: `【thiên phú】 Phẩm chất Khởi tạo ` (21 commands)
- CE 51: `【thiên phú】 ngẫu nhiên` (59 commands)
- CE 52: `【thiên phú】 Lục-sự kiện` (489 commands)
- CE 53: `【thiên phú】 Lam-sự kiện` (453 commands)
- CE 54: `【thiên phú】 Tử-sự kiện` (405 commands)
- CE 55: `【thiên phú】 Hồng-sự kiện` (327 commands)
- CE 56: `【thiên phú】 hàng năm phát động kết toán` (470 commands)
- CE 60: `thiên phú thẩm tra/Hiển thị hiệu quả` (23 commands)
- CE 66: `【thiên phú】 kết quả ban thưởngII` (185 commands)

## ROUTING THEO YÊU CẦU
- **Khoảng cách tiêu đề/dòng đầu, font, màu choice, khung choice:** mở `Xiao_SJ.js` trước. Nếu style escape `\b[n]` nằm trong window rendering, sau đó mới xem plugin/window liên quan.
- **Nền Thiên Phú lệch/cắt/sai tỷ lệ:** mở `Map005.json` + `$MGT_Talent.webp` trước. Không dò toàn assets.
- **Ảnh chibi/overlay NB_1 sai vị trí:** `Map005.json` event 2, command Show Picture `NB_1`, hiện x=350,y=45.
- **Random/phẩm chất/tỷ lệ xanh-lam-tử-hồng:** CommonEvents CE 50..55.
- **Chọn talent không hoạt động:** `choiceTest()` + CE 40..47.
- **Thưởng talent sai:** CE 48/66 và event phẩm chất liên quan.
- **Talent hàng năm:** CE 56 + CE 60.
- **Tên switch/variable:** `System.json`; không đổi ID tùy tiện.

## VÙNG RỦI RO
Không sửa `rpg_*` core chỉ để chỉnh layout Thiên Phú. Không đổi ID Common Event 40..60 hoặc variable 41..67 nếu chưa truy vết toàn dependency.

## VERIFY TỐI THIỂU
UI-only: mở màn hình Thiên Phú, kiểm tra 8 lựa chọn, background, click/touch. Logic: test refresh + chọn từng slot liên quan. Không cần quét 1.108 file.
