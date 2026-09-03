/**
 * SRU Certificate Builder — Google Sheets backend (v1.8)
 * Deploy: Extensions ▸ Apps Script ▸ paste ▸ Deploy ▸ New deployment ▸ Web app
 *         Execute as: Me   |   Who has access: Anyone
 * Sheet tab "Certificates" is created automatically with headers on first save.
 * Auto-numbering: POST with autoNumber=true and empty certNo → server assigns PREFIX-CERT-YYYY-NNN under lock (no collisions).
 * Upsert rule: a row is matched by "Cert No" — same number updates the row, new number appends.
 */
const SHEET_NAME = 'Certificates';
const HEADERS = [
  'Timestamp','Cert No','Issue Date','Department','Certificate Type','Recipient Name','Gender',
  'Field 1 Label','Field 1 Value','Field 2 Label','Field 2 Value','Field 3 Label','Field 3 Value',
  'Start Date','End Date','Evaluation','Signatory 1','Signatory 1 Role','Signatory 2','Signatory 2 Role',
  'Verify URL','Builder Version','Action'
];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) { sh = ss.getSheets()[0]; sh.setName(SHEET_NAME); }  // adopt the first tab (already has headers)
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function headerIndex_(sh) {
  const row = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const idx = {};
  row.forEach((h, i) => { if (h) idx[String(h).trim()] = i; });
  // add any missing headers to the right
  HEADERS.forEach(h => {
    if (!(h in idx)) { const c = sh.getLastColumn() + 1; sh.getRange(1, c).setValue(h).setFontWeight('bold'); idx[h] = c - 1; }
  });
  return idx;
}

/** Next sequential number for a prefix: PREFIX-CERT-YYYY-NNN (scans existing Cert No values). */
function nextCertNo_(sh, idx, prefix, year) {
  prefix = String(prefix || 'SRU').toUpperCase().replace(/[^A-Z0-9]/g, '') || 'SRU';
  year = year || new Date().getFullYear();
  const re = new RegExp('^' + prefix + '-CERT-' + year + '-(\\d+)$');
  let max = 0;
  if (sh.getLastRow() > 1) {
    sh.getRange(2, idx['Cert No'] + 1, sh.getLastRow() - 1, 1).getValues().forEach(r => {
      const m = String(r[0]).trim().match(re); if (m) max = Math.max(max, parseInt(m[1], 10));
    });
  }
  return prefix + '-CERT-' + year + '-' + String(max + 1).padStart(3, '0');
}

function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    const sh = getSheet_();
    const idx = headerIndex_(sh);
    let assigned = false;
    if (!d.certNo && d.autoNumber) { d.certNo = nextCertNo_(sh, idx, d.prefix, d.year); assigned = true; }
    const rec = {
      'Timestamp': new Date(), 'Cert No': d.certNo || '', 'Issue Date': d.issueDate || '',
      'Department': d.dept || '', 'Certificate Type': d.title || '', 'Recipient Name': d.name || '',
      'Gender': d.gender === 'f' ? 'F' : 'M',
      'Field 1 Label': d.f1l || '', 'Field 1 Value': d.f1v || '', 'Field 2 Label': d.f2l || '', 'Field 2 Value': d.f2v || '',
      'Field 3 Label': d.f3l || '', 'Field 3 Value': d.f3v || '',
      'Start Date': d.startDate || '', 'End Date': d.endDate || '', 'Evaluation': d.eval || '',
      'Signatory 1': d.s1n || '', 'Signatory 1 Role': d.s1r || '', 'Signatory 2': d.s2n || '', 'Signatory 2 Role': d.s2r || '',
      'Verify URL': d.verifyUrl || '', 'Builder Version': d.version || '', 'Action': d.action || 'print'
    };
    const width = sh.getLastColumn();
    let row = 0;
    if (rec['Cert No']) {
      const col = idx['Cert No'] + 1;
      const vals = sh.getLastRow() > 1 ? sh.getRange(2, col, sh.getLastRow() - 1, 1).getValues() : [];
      for (let i = 0; i < vals.length; i++) if (String(vals[i][0]).trim() === String(rec['Cert No']).trim()) { row = i + 2; break; }
    }
    const line = new Array(width).fill('');
    if (row) { // keep existing cells not provided
      const cur = sh.getRange(row, 1, 1, width).getValues()[0];
      cur.forEach((v, i) => line[i] = v);
    }
    Object.keys(rec).forEach(k => { if (k in idx) line[idx[k]] = rec[k]; });
    if (row) sh.getRange(row, 1, 1, width).setValues([line]);
    else { row = sh.getLastRow() + 1; sh.getRange(row, 1, 1, width).setValues([line]); }
    return json_({ ok: true, row: row, certNo: rec['Cert No'], assigned: assigned });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally { lock.releaseLock(); }
}

/** GET ?no=ICTD-CERT-2026-008  → public verification lookup (used by the QR verify link) */
function doGet(e) {
  if (e.parameter.action === 'next') { // preview only — the number is reserved on save
    const sh = getSheet_(); return json_({ ok: true, certNo: nextCertNo_(sh, headerIndex_(sh), e.parameter.prefix, e.parameter.year) });
  }
  const no = (e.parameter.no || '').trim();
  if (!no) return json_({ ok: true, service: 'SRU Certificate Register', usage: '?no=<certificate number>' });
  const sh = getSheet_(); const idx = headerIndex_(sh);
  const data = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues() : [];
  const r = data.find(x => String(x[idx['Cert No']]).trim() === no);
  if (!r) return json_({ ok: false, found: false, certNo: no });
  return json_({ ok: true, found: true, certNo: no, name: r[idx['Recipient Name']], type: r[idx['Certificate Type']],
    department: r[idx['Department']], issueDate: r[idx['Issue Date']], startDate: r[idx['Start Date']],
    endDate: r[idx['End Date']], evaluation: r[idx['Evaluation']] });
}

function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
