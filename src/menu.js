const urlHandler = require('./url.handler');

const template = [
  {
    label: 'Pwa',
    submenu: [
      {
        label: 'Load a PWA via the terminal',
        click(item, focusedWindow) {
          let urls = urlHandler.entries();
          focusedWindow.loadURL(urls.root);
        },
      },
      {
        label: 'Reboot last view',
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
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools();
        },
      },
      {
        label: 'Close PWA-wrapper',
        role: 'close',
      },
    ],
  },
];

const menu = (module.exports = template);
