# FEATURE — CỔ THẦN — DEEP MAP

## Runtime/data/UI
- `game_data/game/js/plugins/Web_AncientEquipment.js` — controller chính.
- `game_data/web-shell.js` — button `ancient-gear` → `WebAncientEquipment.open()`.
- `Weapons.json` ID 22 — Cổ Thần mâu.
- `Armors.json` IDs 44/45 — Cổ Thần giáp/giày.
- Shop dependency: `Drill_SceneLimitedShop.js` + `DrillUp.g_SLS_shop_list`.
- Regression: `tests/ancient-equipment-regression.cjs`.

## Symbols
- `ancient(item)` — nhận diện `<CoThan>` trong note.
- `items()` — trả về đúng 3 database items.
- `equip(item)` — trang bị cho actor/slot phù hợp.
- `repairOwned()` — sửa trạng thái đồ đã sở hữu/trang bị.
- override `Game_Actor.paramMax(id)` — mở trần chỉ số dựa trên Cổ Thần.
- override `DataManager.extractSaveContents(contents)` — repair save sau load.
- patch shop list — đảm bảo Cổ Thần có trong limited shop.
- override `Scene_Drill_SLS.drill_SLS_buyOneItem()` — auto-equip sau mua.
- `Window_AncientGear` / `Scene_AncientGear` — UI trang bị.
- Public API `WebAncientEquipment.equip/repairOwned/open`.

## Routing
- Nút không mở → `web-shell.js` then `open()`.
- Mua nhưng không trang bị → shop buy hook → `equip()`.
- Save cũ không nhận đồ → `extractSaveContents` → `repairOwned()`.
- Chỉ số/giá/tên → database item first; check plugin overrides second.
- UI scene gear → `Window_AncientGear` / `Scene_AncientGear` only.
- Shop không có item → patch `g_SLS_shop_list` + item IDs.

## Risk
Không đổi IDs 22/44/45 hoặc `<CoThan>` tag mà không cập nhật mọi reference. Không sửa YEP_ItemCore/engine equip trước plugin custom.
