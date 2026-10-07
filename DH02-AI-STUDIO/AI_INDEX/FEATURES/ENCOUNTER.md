# FEATURE — KỲ NGỘ THANH KHÊ — DEEP MAP

## Files
- Logic + DOM scene: `game_data/game/web-encounter.js`.
- CSS: `game_data/game/web-encounter.css`.
- Launcher: `game_data/web-shell.js` element `encounter` → `WebEncounter.open()`.
- Hero asset used directly: `game_data/game/img/pictures/WD_4.webp`.
- Regression: `tests/encounter-regression.cjs`.

## Symbols/state
- feature state key stored on `$gameSystem` (see `KEY` at file top).
- `state()` → `{stage,trust,log,done}`.
- `hero()` → actor ID 2.
- `ready()` requires game/map/party, mapId 3, hero alive, not in battle.
- `choose(index)` → choice/progression/trust/log.
- `Scene_TuYen` → DOM overlay scene.
- `Scene_TuYen.create()` builds `.encounter` tree and close handler.
- `WebEncounter.open()` → readiness + scene push.

## UI selectors
`.encounter`, `.encounter-wrap`, header, `.close`, `.encounter-hero`, `.relation`, `.chapter`, `.story`, `.choices`, `.history`, `.save-note`.

## Routing
- Không mở → web-shell button → `open()` → `ready()`.
- Sai điều kiện map/battle → `ready()` only.
- Sai cốt truyện/reward/trust → `choose()`/chapters.
- Sai ảnh NPC → `WD_4.webp` + `.encounter-hero` CSS.
- Sai layout/font/button → `web-encounter.css`; không sửa engine Scene.
- Không lưu → state is on `$gameSystem`; inspect normal save only if state absent after reload.
