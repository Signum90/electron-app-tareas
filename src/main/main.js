/** ==========================================================
* NAME: APP TAREAS - PP
============================================================ */
/**@DESC: Proceso principal */
//# IMPORTS >
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

//# FUN: CREATE WINDOW >
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      // Llamado desde el main: src/main/main.js
      preload: path.join(__dirname, '../preload/preload.js')
    }
  });
  // Llamado desde el main: src/main/main.js
  win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

//# XXXXX >
//# XXXXX >
//# XXXXX >

//# START >
app.whenReady().then(() => {
  
  //# Crear ventana >
  createWindow();
  
  //# Conf: macos >
  app.on('activate', () => {
    
    if(BrowserWindow.getAllWindows().length === 0) createWindow();

  });

  // Conf: Quit si todas la ventanas estan cerradas
  app.on('window-all-closed', () => {

    if (process.platform !== "darwin") app.quit();

  })


})
