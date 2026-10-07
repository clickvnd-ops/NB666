# FEATURE — SHOP / ITEMS / EQUIPMENT

## Primary
- `Drill_SceneLimitedShop.js` — limited shop scene/data.
- `YEP_ItemCore.js` — item/equipment system extension.
- `Items.json`, `Weapons.json`, `Armors.json` — content database.
- Cổ Thần special path → `CO_THAN.md` before generic equipment code.

## Routing
- Name/price/description/stat → database JSON first.
- Item absent from limited shop → Drill limited shop data/list.
- Buy flow/UI → Drill_SceneLimitedShop.
- Generic equip behavior → YEP_ItemCore/core actor only after excluding custom item plugin.
- Cổ Thần buy/equip → Web_AncientEquipment, not generic path.

Do not change item IDs casually: events/plugins may refer to numeric IDs.
