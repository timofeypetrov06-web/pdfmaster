// Копирует библиотеки из node_modules в src/vendor, чтобы приложение работало без интернета
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const out = path.join(root, 'src', 'vendor');
const files = [
  'pdf-lib/dist/pdf-lib.min.js',
  'pdfjs-dist/build/pdf.min.js',
  'pdfjs-dist/build/pdf.worker.min.js',
  'jszip/dist/jszip.min.js',
];

fs.mkdirSync(out, { recursive: true });
for (const f of files) {
  fs.copyFileSync(path.join(root, 'node_modules', f), path.join(out, path.basename(f)));
}
console.log('vendor: скопировано', files.length, 'файла в src/vendor');
