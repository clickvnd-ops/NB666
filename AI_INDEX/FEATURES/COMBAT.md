# FEATURE — COMBAT — DEEP ROUTER

## Core layers
- `rpg_objects.js` — Game_Action, battler/actor/enemy state and damage/stat objects.
- `rpg_managers.js` — BattleManager and lifecycle/data dependencies.
- `YEP_BattleEngineCore.js` — battle sequencing/action phases; plugin can override core behavior.
- HUD: `MOG_BattleHud.js`, `MOG_ActorHud.js`, `MOG_BattleCursor.js`, `MOG_BattlerMotion.js`, `MOG_HPGauge.js`, `MOG_TrPopUpBattle.js`, `MOG_ComboCounter.js`, `MOG_ActionName.js`.
- Data: `Enemies.json`, `Skills.json`, `States.json`, `Troops.json`, `Actors.json`, `Classes.json`, `Weapons.json`, `Armors.json`.
- Regression: `tests/combat-regression.cjs`; notes: `COMBAT_FIX.md`.

## Triage BEFORE opening files
- Damage formula / crit / element / target → Game_Action + Skills/States.
- Actor max stats → Game_Actor + equipment/plugins (also check Web_AncientEquipment if Cổ Thần involved).
- Enemy HP/ATK/DEF → Enemies.json first.
- Skill value/cost/effect → Skills.json first.
- State/buff/debuff → States.json + Game_Battler.
- Battle order/action phase → BattleManager/YEP_BattleEngineCore.
- HUD/HP bar/cursor/pop-up → only corresponding MOG plugin.
- Troop composition → Troops.json.

## Risk
Do not open/edit all battle plugins for a numeric damage bug. Database-first for content values, engine/plugin only for formulas/flow. Any core change requires combat regression.
