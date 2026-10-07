# PROJECT MAP

Game: RPG Maker MV static/offline web.

`game_data/`: 1108 files.

## File types
- `.webp`: 827 files, 24,522,646 bytes
- `.ogg`: 154 files, 3,537,259 bytes
- `.js`: 80 files, 5,651,670 bytes
- `.json`: 40 files, 10,282,995 bytes
- `.css`: 4 files, 3,082 bytes
- `.html`: 2 files, 6,087 bytes
- `.ttf`: 1 files, 1,541,768 bytes

## Runtime chain
`server.cjs` → serves `game_data/` → `game_data/index.html` → shell → `game_data/game/index.html` → RPG Maker MV scripts → `plugins.js` → enabled plugins → JSON database/assets.

## Database
- `Actors.json`: nhân vật
- `Classes.json`: class
- `Skills.json`: võ công/kỹ năng
- `Items.json`: vật phẩm
- `Weapons.json`: vũ khí
- `Armors.json`: trang bị
- `Enemies.json`: địch
- `Troops.json`: nhóm địch
- `States.json`: trạng thái
- `CommonEvents.json`: logic event lớn của game, bao gồm Thiên Phú
- `System.json`: switches/variables/config toàn game
- `Map001..010.json`: map + event map

## Maps
- Map 1: Khởi tạo 
- Map 2: đăng lục Giao diện
- Map 3: Trò chơi chủ Giao diện
- Map 4: thêm điểm Giao diện
- Map 5: thiên phú sự kiện
- Map 6: Tiểu Trò chơi
- Map 7: bảo tồn Giao diện
- Map 8: phòng tối
- Map 9: thống kê Giao diện
- Map 10: thống kê Giao diện2
