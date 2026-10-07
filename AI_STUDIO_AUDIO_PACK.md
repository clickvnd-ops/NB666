# AI Studio asset packing
To stay below the 1,000-file import limit, the original OGG files are stored byte-for-byte in `game_data/audio.pack` with offsets in `game_data/audio-pack.json`.
`server.cjs` serves the original `/game/audio/...ogg` URLs from that pack, so game code and audio paths are unchanged.
Do not delete or rename the pack/index. The normal source project can keep individual OGG files; this packing is only for the AI Studio workspace.
