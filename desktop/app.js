const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const config = require('./config');
const isDev = require('./is-dev-mode');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // launch the express server
  app.server = require(config.path.backEnd);

  // Create the browser window.
  mainWindow = new BrowserWindow(config.window);

  // and load the index.html of the app.
  mainWindow.loadURL(config.path.frontEnd);

  // Open the DevTools.
  // if (isDev) {
    mainWindow.webContents.openDevTools();
  // }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }

  app.quit();
});

// SSL self signed certificate support
app.on('certificate-error', function (event, webContents, url, error, certificate, callback) {
  console.log('certificate-error', url);
  event.preventDefault();
  callback(true);
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
