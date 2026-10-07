#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$(dirname "$0")/.."
[ -f SHA256SUMS ] || { echo 'FAIL: SHA256SUMS missing'; exit 1; }
sha256sum -c SHA256SUMS >/dev/null || { echo 'FAIL: protected file changed/missing'; exit 1; }
COUNT=$(find game_data/game -type f | wc -l)
[ "$COUNT" -ge 1091 ] || { echo "FAIL: only $COUNT files"; exit 1; }
echo "PROTECT-GAME_DATA PASS: $COUNT files present"
