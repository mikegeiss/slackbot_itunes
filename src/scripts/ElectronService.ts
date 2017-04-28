const {app, BrowserWindow, Menu, Tray} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

export class ElectronService {
  win
  tray

  constructor() {
    app.on('ready', this.createWindowAndTray)

    app.on('window-all-closed', () => {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (this.win) {
        this.win.destroy();
      }
      if (this.tray) {
        this.tray.destroy();
      }
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (this.win === null) {
        this.createWindowAndTray()
      }
    })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
  }

  private createWindowAndTray() {
    this.tray = new Tray(path.join(__dirname, 'appleandroid.png'));
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Check for Update',
        click: () => {
          console.log('hallo - Check for Update')
        }
      }
    ]);
    this.tray.setToolTip('This is my application.');
    this.tray.setContextMenu(contextMenu);

    let self = this
    updateTray();
    function updateTray() {
      self.tray.setToolTip(new Date().toLocaleDateString('de-DE') + ', ' + new Date().toLocaleTimeString('de-DE'))
      setTimeout(updateTray, 1000);
    }

    // ---------
    // Create the browser window.
    // win = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    // win.loadURL(url.format({
    //   pathname: path.join(__dirname, 'index.html'),
    //   protocol: 'file:',
    //   slashes: true
    // }))

    // Open the DevTools.
    // win.webContents.openDevTools()

    // Emitted when the window is closed.
    // win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // win = null
    // })
  }

  private createWindow() {

  }
}



