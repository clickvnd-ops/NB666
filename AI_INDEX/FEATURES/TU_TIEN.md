# FEATURE — TU TIÊN SAU 120 — DEEP MAP

## Primary runtime
- `game_data/game/js/plugins/Web_Immortal.js` — toàn bộ state/progression/chapter/year/ending/bonus.
- `game_data/game/js/plugins/Web_ImmortalNPC.js` — NPC offer/relationship/quest.
- `game_data/game/js/plugins.js` — enable/order plugin.
- Tests: `tests/immortal-regression.cjs`, `tests/immortal-npc-regression.cjs`.

## Symbols in Web_Immortal.js
- `KEY='_webImmortalV1'` — save-state key trên `$gameSystem`.
- `realms[]` — Luyện Khí → Hóa Thần.
- `thresholds[]` — yêu cầu tu vi breakthrough.
- `lifespans[]` — thọ nguyên theo cảnh giới.
- `chapters[]` — cốt truyện/chọn lựa theo tuổi.
- `state()` — tạo/đọc state.
- `offer(age,s)` — chọn chapter/NPC/random event cho năm hiện tại.
- `choose(age,index)` — áp lựa chọn, cost, NPC, breakthrough, reward, ending.
- `year(interpreter)` — entry chính mỗi năm từ tuổi 120; dựng choice event.
- `finish()` — kết thúc xử lý năm và khôi phục nút Next.
- `endLife()` — kết thúc đời tu tiên.
- `bonus(actor,id)` + override `Game_Actor.paramPlus/paramMax` — cộng stat tu tiên.
- Scene_Map.start hook — migration/recovery cho save cũ kết thúc ở 120.
- `OfflineGame.beginRun` hook — xóa state tu tiên khi bắt đầu đời mới.

## State schema
`{realm, qi, stones, heart, chapter, lastYear, bonus[8], log[], pending, npcs?, storyHeart?, ending?}`.

## Flow
Age variable → `year()` → `offer()` → chapter OR `WebImmortalNPC.offer()` OR random event → pending choice → `choose()` → NPC valid/apply → rewards/breakthrough → actor refresh/recover → `finish()`.

## Routing
- Không vào tu tiên ở tuổi 120: `year()` + caller/event trước; sau đó migration hook.
- Sai cảnh giới/tu vi: `thresholds`, `choose()` breakthrough.
- Sai thọ nguyên: `lifespans`, `year()/endLife()`.
- Sai HP/MP/ATK bonus: `bonus[]`, `paramPlus/paramMax` hooks.
- Sai chương/kết cục: `chapters`, `storyHeart`, ending branch trong `choose()`.
- Đời mới còn dữ liệu cũ: `OfflineGame.beginRun` hook + KEY.
- NPC/kỳ ngộ: chuyển sang `NPC_TU_TIEN.md`.

## Risk
HIGH khi đổi KEY/state schema/age ending; MEDIUM khi đổi rewards/thresholds; LOW khi chỉ đổi text chapter. Không sửa engine save trước khi chứng minh plugin không đủ.
