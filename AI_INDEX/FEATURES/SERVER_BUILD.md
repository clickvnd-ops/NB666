# FEATURE — SERVER / BUILD — DEEP MAP

## Files
- `server.cjs` — static server; serves `game_data`, default port 3000, strict missing-file behavior.
- `package.json` — scripts/dependencies.
- `validate.cjs` — build validation; checks entry files and enabled plugin existence.
- `validate-offline.cjs` — offline-specific validation.
- `scripts/protect-dist-offline.sh`, `SHA256SUMS*` — integrity/protection tools.

## Critical fact
`npm run build` is validation, NOT a bundler/recompiler and must not recreate/clean `game_data/`.

## Routing
- Preview not opening → server.cjs + entry path.
- 404 asset → requested URL/path + server root; don't rebuild game.
- Build validation fail → validate.cjs output + named missing file only.
- Offline fail → validate-offline.cjs / offline plugin.
- AI Studio preview-only issue → do not rewrite gameplay.

Do not modify server/metadata automatically after import unless required by explicit task.
