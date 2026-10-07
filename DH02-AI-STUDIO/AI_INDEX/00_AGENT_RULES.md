# RULES CHO AI STUDIO

- `game_data/` là game runtime thật, không phải build output.
- Không đổi lại thành `dist/`.
- Không quét/index/hash toàn bộ `game_data/` cho chỉnh sửa thông thường.
- Chỉ đọc file trực tiếp liên quan từ AI_INDEX.
- Không refactor engine hoặc plugin không liên quan.
- Không build/test toàn bộ sau chỉnh UI nhỏ; chỉ validate phần liên quan khi cần.
- Không sửa file chỉ vì thấy code cũ/xấu.
- Nếu index chỉ ra file JSON RPG Maker, chỉnh tối thiểu đúng event/record cần thiết.
- `rpg_core.js`, `rpg_managers.js`, `rpg_objects.js`, `rpg_scenes.js`, `rpg_sprites.js`, `rpg_windows.js` là core/high-risk: chỉ sửa khi lỗi thật sự nằm ở core.
