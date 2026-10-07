# FEATURE — SAVE / LOAD — DEEP MAP (HIGH RISK)

## Layers
1. `game_data/game/js/rpg_managers.js` — `DataManager`, `StorageManager`, core save/load + custom migration.
2. `Drill_CoreOfGlobalSave.js` — global/plugin persistent data.
3. `Torigoya_SaveCommand.js` — save-command UI/entry.
4. `XR_Load.js` — custom load behavior/UI.
5. Feature state may live on `$gameSystem`, e.g. `_webImmortalV1`, encounter state.

## Important migration clue
`rpg_managers.js` contains custom migration comment: “Migrate old saves without altering real wounds, gold, talents or story progress.” Treat surrounding block as protected compatibility logic.

## Routing
- Save button/UI only → Torigoya/XR first.
- File/storage/read/write failure → StorageManager/DataManager.
- One feature loses state → inspect that feature's state key and initialization BEFORE core save.
- Old save breaks after update → migration block in rpg_managers.js.
- Global settings/progress → Drill_CoreOfGlobalSave.

## Rules
Never fix UI by touching save. Never rename state keys or change schema without migration. Preserve old saves. Any save edit requires targeted old-save/new-save regression.
