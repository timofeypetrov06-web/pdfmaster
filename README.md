# PDF Мастер

Десктопное приложение для работы с PDF под macOS и Windows (Electron). Все файлы обрабатываются локально, интернет не нужен.

## Структура

- `src/index.html` — весь интерфейс и логика инструментов
- `src/vendor/` — pdf-lib, pdf.js, JSZip (копируются из `node_modules` командой `npm install`)
- `main.js` — главный процесс Electron (окно, меню)
- `scripts/vendor.js` — копирование библиотек в `src/vendor`

## Команды

```bash
npm install          # зависимости + копирование библиотек
npm start            # запустить приложение в режиме разработки
npm run dist:mac     # .dmg для Apple Silicon и Intel → dist/
npm run dist:win     # установщик .exe для Windows x64 → dist/
```

## Перед публикацией

- **Иконка:** исходник — `build/icon.svg`, для сборки используется `build/icon.png` (1024×1024); electron-builder сам делает из него .icns и .ico. После правки SVG перерендерите PNG.
- **Подпись macOS:** без Apple Developer ID ($99/год) и нотаризации macOS покажет «не удаётся проверить разработчика» (обход: правый клик → Открыть).
- **Подпись Windows:** без сертификата подписи кода SmartScreen предупредит «Неизвестный издатель».
