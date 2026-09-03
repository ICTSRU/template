# Change Record | سجل التغييرات

All notable changes to the SRU Certificate Builder are recorded here.
Format based on [Keep a Changelog](https://keepachangelog.com/); versions use one decimal (x.9 → (x+1).0).

| Version | Date | Author | Status |
|---|---|---|---|
| 1.0 | 2026-09-03 | Mohamed ElMahdy | Released |

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
