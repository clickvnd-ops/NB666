# AI STUDIO — START HERE (DH02 / 950 FILES)

**ĐỌC `AI_INDEX/00_START_HERE.md` TRƯỚC KHI SEARCH CODE.**

## Đường dẫn chỉnh sửa chính
- Thiên Phú: `game_data/game/js/plugins/Xiao_SJ.js` + `game_data/game/js/plugins/GALV_VisualNovelChoices.js`
- Danh sách plugin/tham số: `game_data/game/js/plugins.js`
- Runtime chính: `game_data/game/js/`
- Database game: `game_data/game/js/libs/json/`
- Ảnh còn ở dạng file: `game_data/game/img/`
- Web shell: `game_data/index.html` + `game_data/web-shell.js`
- Server local: `server.cjs`
- Bản đồ tính năng: `AI_INDEX/FEATURES/`
- Router yêu cầu: `AI_INDEX/ROUTER/QUICK_ROUTER.json`

## Asset đã đóng gói để giữ project đúng 950 file
- Audio: `game_data/audio.pack` + `game_data/audio-pack.json`
- 50 ảnh nhỏ: `game_data/asset.pack` + `game_data/asset-pack.json`
- `server.cjs` phục vụ các asset đóng gói bằng **đúng URL/path cũ**, nên gameplay không đổi.
- KHÔNG đổi tên/xóa pack hoặc manifest.
- Nếu yêu cầu sửa một asset có tên trong `asset-pack.json` hoặc `audio-pack.json`, phải giải nén riêng asset đó về đúng path cũ và cập nhật pack/manifest; không sửa gameplay để né asset.

## Quy tắc làm việc
1. Không quét toàn bộ `game_data/` nếu chưa cần.
2. Mở feature map tương ứng trước, rồi chỉ mở Priority files.
3. Chỉ sửa file liên quan trực tiếp tới yêu cầu.
4. Không refactor/clean/rebuild toàn game.
5. `npm start` chỉ chạy server; không gắn test/build vào startup.
6. Sau edit chạy syntax/test/build phù hợp.
7. Không xóa asset để giảm số file. Project này đã được chuẩn hóa đúng 950 file.
