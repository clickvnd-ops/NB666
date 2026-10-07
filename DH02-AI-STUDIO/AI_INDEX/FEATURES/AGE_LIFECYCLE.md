# FEATURE — AGE / LIFE CYCLE

## Known anchors
- Runtime age exposed by `game_data/web-shell.js` tool as `$gameVariables.value(1)` → variable 1 is a high-priority age anchor.
- Tu tiên starts at age >=120 in `Web_Immortal.year()`.
- `Web_Immortal` has compatibility recovery for the old scripted 120-year ending and `endLife()` writes end-state variables/switches.
- Age regression: `tests/age-recovery-regression.cjs`.

## Routing
- Age display/value wrong → trace variable 1 writers/readers in targeted maps/common events.
- Game ends at 120 → Web_Immortal migration/entry + caller event.
- Death/lifespan after 120 → Web_Immortal lifespan/endLife.
- New life not reset → OfflineGame beginRun hooks + relevant reset event.

HIGH RISK: age/death variables connect story progression and save compatibility. Do not mass-renumber variables/switches.
