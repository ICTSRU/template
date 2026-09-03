# Google Sheets register — setup | إعداد سجل الشهادات

1. Create a Google Sheet (e.g. **SRU Certificate Register**).
2. Extensions ▸ Apps Script → delete the default code, paste `Code.gs`, save.
3. Deploy ▸ New deployment ▸ type **Web app** → Execute as: **Me**, Who has access: **Anyone** → Deploy → authorise.
4. Copy the URL ending in `/exec`.
5. In the builder page, paste it in «سجل الشهادات ▸ رابط تطبيق Apps Script». It is remembered in the browser.
   To fix it for everyone, set `const SHEET_URL='…/exec'` at the top of the script in `index.html`.

## What gets saved
One row per certificate in tab **Certificates** (created automatically): timestamp, cert no., issue date, department, type, name, gender, the three info fields, period, evaluation, signatories, verify URL, builder version, action (`print` / `save`).
Rows are matched by **Cert No** — reprinting the same number updates its row instead of adding a duplicate.

## Verification lookup
`GET <exec-url>?no=ICTD-CERT-2026-008` returns the record as JSON (or `found:false`).
Use `<exec-url>?no=` + certificate number as the QR "verify URL" to allow real verification.

## Redeploying after code changes
Deploy ▸ Manage deployments ▸ edit (pencil) ▸ Version: **New version** ▸ Deploy — the `/exec` URL stays the same.
