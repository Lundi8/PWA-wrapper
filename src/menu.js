const urlHandler = require('./url.handler');

const template = [
  {
    label: 'pwa',
    submenu: [
      {
        label: 'Load a PWA',
        click(item, focusedWindow) {
          let urls = urlHandler.entries();
          focusedWindow.loadURL(urls.root);
        },
      },
      {
        label: 'Reboot current',
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
        label: 'Toggle fullscreen',
        role: 'togglefullscreen',
      },
      {
        label: 'Minimize window',
        role: 'minimize',
      },
      {
        label: "Close PWA-wrapper",
        role: 'close',
      },
    ],
  },
];

const menu = (module.exports = template);
