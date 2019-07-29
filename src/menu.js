const urlHandler = require('./url.handler');

const template = [
  {
    label: 'PWA Options',
    submenu: [
      {
        label: 'Load a PWA',
        click(item, focusedWindow) {
          let urls = urlHandler.entries();
          focusedWindow.loadURL(urls.default);
        },
      },
      {
        label: 'Reload current PWA',
        click(item, focusedWindow) {
          let urls = urlHandler.entries();
          urls = urls.fetch || urls.default;
          focusedWindow.loadURL(urls);
        },
      },
      {
        label: 'Reload current view',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        },
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools();
        },
      },
    ],
  },
  {
    role: 'window',
    submenu: [
      {
        label: 'Switcher le mode plein écran',
        role: 'togglefullscreen',
      },
      {
        label: 'Minimiser la fenêtre',
        role: 'minimize',
      },
      {
        label: "Fermer l'application",
        role: 'close',
      },
    ],
  },
];

const menu = (module.exports = template);
