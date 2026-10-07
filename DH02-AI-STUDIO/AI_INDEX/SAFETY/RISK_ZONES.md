# RISK ZONES

## LOW
Feature-specific custom plugins, dedicated web CSS, dedicated asset replacement with same path/dimensions.

## MEDIUM
CommonEvents.json, Map JSON, Items/Weapons/Armors, plugins.js. Chỉnh đúng record/event; tránh format/rewrite toàn file nếu không cần.

## HIGH
`rpg_core.js`, `rpg_managers.js`, `rpg_objects.js`, `rpg_scenes.js`, `rpg_sprites.js`, `rpg_windows.js`, save migration. Không dùng làm điểm bắt đầu cho lỗi UI feature.
