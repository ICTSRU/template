# Change Record | سجل التغييرات

All notable changes to the SRU Certificate Builder are recorded here.
Format based on [Keep a Changelog](https://keepachangelog.com/); versions use one decimal (x.9 → (x+1).0).

| Version | Date | Author | Status |
|---|---|---|---|
| 1.4 | 2026-09-03 | Mohamed ElMahdy | Released |
| 1.3 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 1.2 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 1.1 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 1.0 | 2026-09-03 | Mohamed ElMahdy | Superseded |

---

## [1.4] — 2026-09-03

### Changed | تعديلات
- Production Apps Script Web App URL hardcoded in `SHEET_URL` — the register field is pre-filled for every department; logging to **SRU Certificate Register** works out of the box.
- QR "Verify" line now defaults to `<exec-url>?no=<cert no>` (real lookup against the register) when the verify-URL field is left empty.
- Version 1.4. Rollback: folder `sru-certificate-builder-v1.3`.

---

## [1.3] — 2026-09-03

### Added | إضافات
- Google Sheets register: clicking «طباعة / حفظ PDF» first posts the certificate data to a Google Apps Script Web App, then opens the print dialog. Status shown in the panel (saved row / error).
- Button «حفظ في الشيت فقط» to log without printing.
- Form section «سجل الشهادات»: Apps Script `/exec` URL (remembered in the browser via localStorage; can also be fixed in `SHEET_URL`), auto-log on/off.
- `backend/Code.gs`: creates tab **Certificates** with headers, writes by header name, upserts on **Cert No**, script lock for concurrent users, and `doGet ?no=` verification lookup.
- `backend/SETUP.md`: deployment steps.

### Changed | تعديلات
- Version 1.3; `APP_VERSION` constant added and sent with every record. Rollback: folder `sru-certificate-builder-v1.2`.

### Notes | ملاحظات
- If no Sheet URL is set, printing works exactly as before (no logging).
- Saving requires the recipient name; a 12-second timeout prevents the print dialog from being blocked.

---

## [1.2] — 2026-09-03

### Fixed | إصلاحات
- "Powered by ICTD 2026" footer overlapped the outer frame border. It now sits between the outer and inner frame lines with a white backing that interrupts the border, in purple, 7.4pt, semi-bold — fully legible in print.

### Changed | تعديلات
- Version string bumped to 1.2. Rollback: folder `sru-certificate-builder-v1.1`.

---

## [1.1] — 2026-09-03

### Added | إضافات
- QR code (bottom-left of the certificate) encoding the holder's main data: certificate no., name, certificate type, issuing department, period, grade, issue date, and an optional verification URL. Generated client-side (qrcode-generator library inlined — no network needed), UTF-8 so Arabic values decode correctly.
- "Powered by ICTD 2026" footer line, centred above the bottom accent bar; text editable in the form.
- Form section "الترويسة السفلية ورمز QR": footer text, QR on/off toggle, verification URL field.
- Public URL documented in README: https://ictsru.github.io/template/

### Changed | تعديلات
- Version string bumped to 1.1 in page header and `<title>`.
- JSON export/import now includes `poweredBy`, `verifyUrl`, `showQR`.

### Notes | ملاحظات
- QR content updates live with the form; hidden blocks (period/grade) are excluded from the QR.
- Rollback: use folder `sru-certificate-builder-v1.0`.

---

## [1.0] — 2026-09-03

### Added | إضافات
- Single-file certificate builder (`index.html`): form panel + live A4-landscape preview + print/PDF.
- University logo embedded as base64; department logo removed and replaced by a department-name line under the university logo, so the template serves all departments.
- Presets: Training completion (original ICTD text), Thanks & Appreciation, Attendance, Custom.
- Gender switch (مذكّر / مؤنّث) with automatic pronoun substitution via `{ه}`, `{المتدرب}`, `{الإدارة}` placeholders.
- Optional blocks: three info fields, training period, overall evaluation (toggle on/off).
- Export / import form data as JSON; reset button.
- Print stylesheet: certificate only, `@page 297mm × 210mm`, zero margins, exact colour printing.
- Version displayed in page header and `<title>`.

### Changed | تعديلات
- Based on the original ICTD `certificate.html` (static, hard-coded content). Layout, frame, corner marks, watermark and colour tokens retained unchanged.

### Removed | حذف
- ICTD logo (`ict_logo.png`) and local `fonts/` dependency (Cairo now loaded from Google Fonts).

### Known limitations | قيود معروفة
- Requires internet on first load for the Cairo font; falls back to Tahoma/Arial offline.
- Single certificate per print; batch issuance not yet supported.

---

## Change request template (for future versions) | نموذج طلب تغيير

```
Version:        x.y
Requested by:
Date:
Summary:
Impact:         (visual / text / print / data)
Rollback:       use previous folder sru-certificate-builder-vX.Y
Tested on:      Chrome / Edge / Firefox
Approved by:
```
