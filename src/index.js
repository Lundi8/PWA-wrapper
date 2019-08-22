const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
var AdmZip = require('adm-zip');
const template = require('./menu');

// SET GLOBAL VARIABLES
const urlHandler = require('./url.handler');
urlHandler.init();
urlHandler.store({ root: path.join('file://', __dirname, 'index.html') });
urlHandler.store({ default: '' });

const zipPath = path.join(__dirname, 'store', 'pwa.zip');
const storePath = path.join(__dirname, 'store');
const tDebug = txt => `[Terminal] -> ${txt}`;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) app.quit();

/*
 **********
 * BrowserWindow
 **********
 */
let mainWindow;
const createWindow = () => {
  // custom menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // custom window
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    maximizable: true,
    minimizable: true,
    closable: true,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'src', 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.setFullScreen(true);

  // load url
  let urls = urlHandler.entries();
  if (urls.fetch) mainWindow.loadURL(urls.fetch);
  else if (urls.default) mainWindow.loadURL(urls.default);
  else mainWindow.loadURL(urls.root);

  console.log('urls stored ->', urls);

  // garbage
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);
app.on('error', err => console.error(tDebug(err)));
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

//
//
//
//
//
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

/*
 **********
 * ipcMain
 **********
 */

ipcMain.on('fetchUrl', (event, pathTo) => {
  urlHandler.store({ fetch: pathTo });
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
  urlHandler.store({ fetch: pathTo });
  mainWindow.loadURL(pathTo);
  event.returnValue = tDebug(`loading...`);
  return;
};
