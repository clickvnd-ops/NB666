# FEATURE — NPC TU TIÊN — DEEP MAP

## Runtime
`game_data/game/js/plugins/Web_ImmortalNPC.js`
Consumer: `Web_Immortal.js`.
Tests: `immortal-npc-regression.cjs`, `npc-balance-regression.cjs`.
Reports: `IMMORTAL-NPCS.md`, `NPC-BALANCE.md`.

## Symbols/state
- `roster` — định nghĩa NPC/điều kiện/nội dung.
- `data(s,id)` — state mỗi NPC dưới `s.npcs[id]`.
- NPC state: `relation`, `helped`, `questDone`, `visits`.
- `offer(age,s)` — chọn NPC event phù hợp tuổi/state.
- `valid(s,c)` — validate choice; quest yêu cầu `helped>=3 && !questDone`.
- `apply(s,c)` — tăng visit/relation, áp hành động NPC.
- Public API: `WebImmortalNPC={roster,offer,valid,apply}`.

## Dependency flow
`WebImmortal.offer(age,s)` → `WebImmortalNPC.offer()` → player choice → `WebImmortal.choose()` → `valid()` → `apply()` → state saved inside `_webImmortalV1`.

## Routing
- NPC không xuất hiện → `offer()` + roster age/state condition.
- Quest không mở → `valid()` + `helped/questDone`.
- Quan hệ tăng sai → `apply()`.
- NPC lặp quá nhiều → offer selection + visits/conditions.
- Save NPC mất → kiểm `_webImmortalV1.npcs`; chỉ sau đó xem DataManager.

Không search Actors/Enemies JSON cho NPC tu tiên custom trừ khi yêu cầu nói rõ NPC battle/database.
