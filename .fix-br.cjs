const fs = require('fs');
const path = process.argv[2];

let raw = fs.readFileSync(path, 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);

// RFC4180-ish parser: handles quoted fields, "" escaped quotes, embedded newlines.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  let i = 0;
  const n = text.length;
  while (i < n) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += c; i++; continue;
    } else {
      if (c === '"') { inQuotes = true; i++; continue; }
      if (c === ',') { row.push(field); field = ''; i++; continue; }
      if (c === '\r') { i++; continue; }
      if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
      field += c; i++; continue;
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

const rows = parseCSV(raw);

const fixed = rows.map(r => r.map(f => f.split('<br />').join('\n').split('<br/>').join('\n')));

function serializeField(f) {
  return '"' + f.replace(/"/g, '""') + '"';
}

const out = fixed
  .filter(r => !(r.length === 1 && r[0] === ''))
  .map(r => r.map(serializeField).join(','))
  .join('\r\n') + '\r\n';

fs.writeFileSync(path, '﻿' + out, 'utf8');
console.log('done:', path);
