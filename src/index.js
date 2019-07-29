const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const template = require('./menu');
const fs = require('fs');
const urlHandler = require('./url.handler');
var AdmZip = require('adm-zip');

const urlDefault = path.join('file://', __dirname, 'index.html');
urlHandler.storeDefault(urlDefault);

const zipPath = path.join(__dirname, 'store', 'pwa.zip');
const storePath = path.join(__dirname, 'store');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const tDebug = txt => {
  return `[Temrinal] -> ${txt}`;
};

let mainWindow;

const createWindow = () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  // Create the browser window.
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    maximizable: true,
    minimizable: true,
    closable: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.setFullScreen(true);

  let urls = urlHandler.entries();

  if (urls.fetch) mainWindow.loadURL(urls.fetch);
  else if (urls.local) mainWindow.loadURL(urls.local);
  else mainWindow.loadURL(urls.default);

  // mainWindow.loadURL(`file://${__dirname}/index.html`);
  // mainWindow.loadURL('https://oslo-pwa-v2.firebaseapp.com/');
  // console.log(`file://${__dirname}`)
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);
app.on('error', err => console.log(err));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/*
 *
 **********
 * IPC MAIN
 **********
 */

ipcMain.on('fetchUrl', (event, pathTo) => {
  urlHandler.store(pathTo);
  event.returnValue = tDebug(`url stored`);
  mainWindow.loadURL(pathTo);
});

ipcMain.on('fetchLocalFile', (event, pathTo) => {
  if (!pathTo) {
    event.returnValue = tDebug(`file not found`);
    return;
  }
  if (path.extname(pathTo) !== '.zip') {
    event.returnValue = tDebug(`must be .zip file`);
    return;
  }

  var rStream = fs.createReadStream(pathTo);
  var wStream = fs.createWriteStream(zipPath);
  rStream.pipe(wStream);

  rStream.on('error', err => console.log(err));
  wStream.on('error', err => console.log(err));

  rStream.on('close', () => {
    localFileHandler(event);
  });
});

const localFileHandler = event => {
  let zip = new AdmZip(zipPath);
  const fileList = zip.getEntries();

  const indexHtml = fileList.filter(file => file.entryName === 'index.html')[0].entryName;

  if (!indexHtml) {
    event.returnValue = tDebug(`must have index.html in the root of .zip file`);
    return;
  }

  zip.extractAllTo(storePath, true);

  pathTo = path.join('file://', __dirname, 'store', 'index.html');
  urlHandler.store(pathTo);
  mainWindow.loadURL(pathTo);
  event.returnValue = tDebug(`loading...`);
  return;
};

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
