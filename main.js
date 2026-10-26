const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 820,
    minWidth: 420,
    minHeight: 500,
    title: 'PDF Мастер',
    backgroundColor: '#0f1117',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.loadFile(path.join(__dirname, 'src', 'index.html'));

  // Если файл бросили мимо зоны загрузки — не открывать его вместо приложения
  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('file://') || !url.includes('/src/index.html')) e.preventDefault();
  });
  // Внешние ссылки — в системном браузере
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Минимальное меню: на macOS без него не работают Cmd+C / Cmd+V / Cmd+Q
const isMac = process.platform === 'darwin';
Menu.setApplicationMenu(Menu.buildFromTemplate([
  ...(isMac ? [{ role: 'appMenu' }] : []),
  { role: 'fileMenu' },
  { role: 'editMenu' },
  { role: 'viewMenu' },
  { role: 'windowMenu' },
]));

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});
