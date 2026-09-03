# Change Record | سجل التغييرات

All notable changes to the SRU Certificate Builder are recorded here.
Format based on [Keep a Changelog](https://keepachangelog.com/); versions use one decimal (x.9 → (x+1).0).

| Version | Date | Author | Status |
|---|---|---|---|
| 2.6 | 2026-09-03 | Mohamed ElMahdy | Released |
| 2.5 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 2.4 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 2.3 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 2.2 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 2.1 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 2.0 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 1.9 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 1.8 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 1.7 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 1.6 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 1.5 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 1.4 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 1.3 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 1.2 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 1.1 | 2026-09-03 | Mohamed ElMahdy | Superseded |
| 1.0 | 2026-09-03 | Mohamed ElMahdy | Superseded |

---

## [2.6] — 2026-09-03

### Added | إضافات
- «اختبار الاتصال بالسجل» button: calls `?action=next` and reports the exact cause — HTTP 404 (deployment missing), outdated Code.gs (no numbering), non-JSON response (access not "Anyone"), or network failure.

### Changed | تعديلات
- The "not printed" error now keeps the underlying register error instead of replacing it with a generic message. Version 2.6. Rollback: folder `sru-certificate-builder-v2.5`.

---

## [2.5] — 2026-09-03

### Changed | تعديلات
- Apps Script Web App URL replaced with the new deployment (`…/AKfycbw1RnV5…/exec`) in both `index.html` (`SHEET_URL`) and `verify.html` (`API`). Version 2.5 shown on both pages. Rollback: folder `sru-certificate-builder-v2.4`.

---

## [2.4] — 2026-09-03

### Fixed | إصلاحات
- Printing is now blocked when the register fails to issue a certificate number (unreachable or outdated Apps Script deployment). Previously the certificate printed with an empty number, so its QR opened the verification page with no number ("أدخل رقم الشهادة للتحقق"). A clear error is shown instead.
- Version 2.4. Rollback: folder `sru-certificate-builder-v2.3`.

---

## [2.3] — 2026-09-03

### Fixed | إصلاحات
- Blank second page when printing. Print stylesheet now clamps `html/body/.app/.preview/.scaler` to exactly 297 × 210 mm with `overflow:hidden` and forbids page breaks on `.sheet`, so paper-size or margin differences in the print dialog (Letter, default margins) no longer spill onto a second page. Verified single-page output for A4 landscape, A4 with 10 mm margins, Letter landscape and A4 portrait.
- Version 2.3. Rollback: folder `sru-certificate-builder-v2.2`.

---

## [2.2] — 2026-09-03

### Fixed | إصلاحات
- If the register saves the row but returns no certificate number (Apps Script deployment older than v1.8), the builder now shows an explicit error telling the operator to paste the latest `Code.gs` and publish a **New version**, instead of a misleading "saved" status.
- Version 2.2. Rollback: folder `sru-certificate-builder-v2.1`.

---

## [2.1] — 2026-09-03

### Removed | حذف
- Form settings that departments should not touch: verify-URL field, QR content mode, Apps Script URL field, "log on print" toggle, and the browser (localStorage) URL persistence.

### Changed | تعديلات
- Behaviour is now fixed in code: QR = verification link only (`VERIFY_URL`), register = `SHEET_URL`, every print is logged. Only «إظهار رمز QR» remains as a toggle.
- Version 2.1. Rollback: folder `sru-certificate-builder-v2.0`.

---

## [2.0] — 2026-09-03

### Removed | حذف
- Manual numbering controls: the «توليد رقم» button and the "توليد الرقم تلقائيًا" toggle.

### Changed | تعديلات
- Certificate number field is now read-only and always assigned by the register on print (`PREFIX-CERT-YYYY-NNN`); local time-based fallback remains when no register URL is set.
- Version 2.0 (follows 1.9 per the one-decimal rule). Rollback: folder `sru-certificate-builder-v1.9`.

---

## [1.9] — 2026-09-03

### Changed | تعديلات
- QR code (19 mm) moved to the top-left, directly under the certificate number, with its "Scan to verify" label; the bottom-left area is now free.
- Print / Save-as-PDF default file name is now `<recipient name> - <certificate no.>` (set via the document title during printing and restored afterwards). JSON export uses the same name.
- Version 1.9. Rollback: folder `sru-certificate-builder-v1.8`.

---

## [1.8] — 2026-09-03

### Added | إضافات
- Automatic certificate numbering `PREFIX-CERT-YYYY-NNN`: new "رمز الجهة" prefix field (default ICTD), "توليد الرقم تلقائيًا" toggle (on), and a «توليد رقم» button that reserves the next number in the register.
- Print flow: if the number is empty, the record is saved first, the server assigns the next number under a script lock, the field and QR update, then the print dialog opens.
- `Code.gs`: `nextCertNo_()` (per-prefix, per-year sequence), `autoNumber/prefix/year` handling in `doPost`, `?action=next&prefix=` preview in `doGet`. **Requires redeploying the Apps Script as a new version.**
- Offline fallback: time-based local number when no register URL is set.

### Changed | تعديلات
- Version 1.8; JSON export/import includes `prefix`. Rollback: folder `sru-certificate-builder-v1.7`.

---

## [1.7] — 2026-09-03

### Changed | تعديلات
- QR code and its "Scan to verify" label raised by 14 mm, clearing the signature area at the bottom-left. Version 1.7. Rollback: folder `sru-certificate-builder-v1.6`.

---

## [1.6] — 2026-09-03

### Added | إضافات
- `verify.html` — branded public verification page: university logo, bilingual heading, green "شهادة صحيحة وموثّقة" / red "لم يُعثر على شهادة" verdict, certificate details table (no., name, type, issuer, period, grade, issue date), manual number lookup. Reads `?no=` from the URL and queries the Apps Script register; Apps Script URL hardcoded.
- QR content mode in the builder: **link only** (default — opens the verification page directly on scan) or link + certificate text.
- `VERIFY_URL` constant (`https://ictsru.github.io/template/verify.html?no=`); verify-URL field override still available.

### Changed | تعديلات
- Version 1.6; JSON export/import includes `qrMode`. Rollback: folder `sru-certificate-builder-v1.5`.

### Notes | ملاحظات
- Verification requires the certificate to have been saved to the register (print with logging on, or «حفظ في الشيت فقط») and a certificate number.

---

## [1.5] — 2026-09-03

### Fixed | إصلاحات
- Certificate layout broke on older browsers (frame missing, content block pushed to the top edge). Cause: CSS `inset` shorthand is ignored by Chrome/Edge < 87 and Safari < 14.5. Replaced with explicit `top/right/bottom/left` on `.frame`, `.frame-inner`, `.content`. No visual change on modern browsers.

### Changed | تعديلات
- Version 1.5. Rollback: folder `sru-certificate-builder-v1.4`.

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
