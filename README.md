# SRU Certificate Builder | مُنشئ الشهادات

A single-file, department-agnostic certificate template for Sulaiman Al Rajhi University (SRU).
Any department can open the page, fill in the form, and print or save the certificate as PDF.
No server, no build step, no external assets (the university logo is embedded).

قالب شهادات موحّد لجامعة سليمان الراجحي في ملف واحد. تفتح أي إدارة الصفحة، تعبّئ النموذج، ثم تطبع الشهادة أو تحفظها بصيغة PDF — دون خادم أو ملفات خارجية.

**Current version:** 2.6 — see [CHANGELOG.md](CHANGELOG.md)

---

## Repository layout | هيكل المستودع

```
sru-certificate-builder-v2.6/
├── index.html      ← the builder (form + live preview + print)
├── verify.html     ← public QR verification page (logo + certificate data + validity)
├── README.md
├── CHANGELOG.md    ← change record for every version
├── .gitignore
└── backend/
    ├── Code.gs     ← Google Apps Script (Sheets register + verification lookup)
    └── SETUP.md    ← deployment steps
```

Versioning rule: the **folder** carries the version; the **file name** does not. The version is displayed inside the page header (`Certificate Builder vX.Y`) and in `<title>`.

قاعدة الإصدارات: يُكتب رقم الإصدار في اسم **المجلد** فقط، ويبقى اسم الملف ثابتًا، ويظهر الرقم داخل الصفحة نفسها.

---

## Usage | طريقة الاستخدام

1. Open `index.html` in Chrome or Edge.
2. Fill the form on the right: department, certificate no., recipient, dates, text, signatories.
3. Choose a preset (Training completion / Thanks / Attendance / Custom) and gender (مذكّر / مؤنّث).
4. Click **طباعة / حفظ PDF** → in the print dialog: *Save as PDF*, A4, Landscape, Margins: None, Background graphics: On.
5. Optionally export the form data as JSON to reissue or archive later.

**Live page:** https://ictsru.github.io/template/

Each certificate carries a QR code with the holder's main data (certificate no., name, type, issuer, period, grade, issue date, optional verification URL) and a "Powered by ICTD 2026" footer line — both editable in the form.

Text placeholders replaced automatically:

| Placeholder | Replaced with |
|---|---|
| `{ه}` | `ه` / `ها` by gender |
| `{المتدرب}` | `المتدرب` / `المتدربة` |
| `{الإدارة}` | department name from the form |

---

## Certificate register | سجل الشهادات

Every print/save can be logged to a Google Sheet through an Apps Script Web App — see [backend/SETUP.md](backend/SETUP.md). Same certificate number = same row (upsert). The script exposes `?no=<cert no>` (JSON), consumed by **verify.html** — the QR on each certificate opens `https://ictsru.github.io/template/verify.html?no=<cert no>`, which shows the university logo, the certificate data and a valid/not-found verdict.

## Auto-numbering | الترقيم التلقائي

The certificate number is read-only and assigned automatically on print: the register issues the next `PREFIX-CERT-YYYY-NNN` for the department prefix, atomically, so numbers never collide across departments. Without a register URL a time-based local number is used.

## Brand | الهوية

Colours, font (Cairo) and layout follow `SRU_IDENTITY.md`: purple `#501e8c`, purple-dark `#3a1464`, blue `#0a6eaa`, gold accent `#a9832f`.

## Browser support

Chrome / Edge (recommended for print fidelity). Firefox works; print margins may need manual setting.

## Maintainer

Mohamed ElMahdy, IT Operations Manager, Sulaiman Al Rajhi University
