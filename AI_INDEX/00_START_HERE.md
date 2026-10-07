# AI NAVIGATION — ĐỌC FILE NÀY TRƯỚC

> **Bản AI Studio 950 file:** audio và 50 ảnh nhỏ đã được đóng gói. Xem `../AI_STUDIO_START_HERE.md` trước khi sửa asset. Code/gameplay vẫn dùng path runtime cũ qua `server.cjs`.

Mục tiêu của AI_INDEX là định tuyến AI Studio tới đúng file trước khi search toàn project. **Không quét toàn bộ `game_data/` theo mặc định.**

## Quy trình bắt buộc
1. Phân loại yêu cầu theo `ROUTER/USER_REQUEST_ROUTER.md`.
2. Mở feature tương ứng trong `FEATURES/`.
3. Chỉ mở các file ở mục **Priority files**.
4. Nếu chưa đủ, mở dependency cấp 1.
5. Chỉ search phạm vi nhỏ khi index không đủ. Không mặc định `grep/find` toàn `game_data/`.

## Điểm vào chính
- Web shell: `game_data/index.html` + `game_data/web-shell.js`
- Game runtime: `game_data/game/index.html` → RPG Maker MV engine + plugins.
- Plugin registry: `game_data/game/js/plugins.js`
- Game database: `game_data/game/js/libs/json/`
- Server local: `server.cjs` (web root = `game_data/`)
- Build: `npm run build` chỉ chạy `validate.cjs`; không tạo lại game.

## Feature ưu tiên
- Thiên Phú → `FEATURES/THIEN_PHU.md`
- Cổ Thần → `FEATURES/CO_THAN.md`
- Tu tiên sau 120 → `FEATURES/TU_TIEN.md`
- NPC tu tiên → `FEATURES/NPC_TU_TIEN.md`
- Combat → `FEATURES/COMBAT.md`
- Save/Load → `FEATURES/SAVE_LOAD.md`
- Encounter → `FEATURES/ENCOUNTER.md`
- Server/build → `FEATURES/SERVER_BUILD.md`

## Nguyên tắc tốc độ
Nếu user yêu cầu chỉnh UI Thiên Phú, KHÔNG đọc combat/save/engine trước. Nếu user yêu cầu chỉnh Cổ Thần, KHÔNG dò CommonEvents Thiên Phú. Chỉ mở đúng tuyến đã map.

## DEEP FEATURE MAPS
Các feature ngoài Thiên Phú cũng đã được mở rộng tới symbol/state/dependency/routing/risk: TU_TIEN, NPC_TU_TIEN, CO_THAN, ENCOUNTER, COMBAT, SAVE_LOAD, SERVER_BUILD, SHOP_ITEMS, AGE_LIFECYCLE. Luôn mở feature map tương ứng trước khi grep project.
