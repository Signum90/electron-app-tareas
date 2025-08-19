/** ==========================================================
* NAME: APP TAREAS - PP
============================================================ */
/**@DESC: Proceso principal */
//# IMPORTS >
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const { v4: uuidv4 } = require('uuid')

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

//# TASK DB MANAGEMENT >
const TASK_FILE = path.join(__dirname, '../db/db.json');

//# Read Tasks >
const readTasks = () => {
  // Si no existe el archivo
  if(!fs.existsSync(TASK_FILE)) return [];
  // Leer archivo
  const data = fs.readFileSync(TASK_FILE, "utf-8");
  // Retornar en formato json
  return JSON.parse(data | "[]");
}
//# Save Tasks File >
const saveTasks = (tasks) => {
  // Guardar
  fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
}

//# IPC HANDLERS: Manejadores de canales IPC >
//# Leer Tareas >
ipcMain.handle('get-tasks', () => {
  return readTasks();
})

//# Añadir Tareas >
ipcMain.handle('add-tasks', (event, task) => {
  console.log("pp-add-task");
  
  // Traer tareas
  const tasks = readTasks();

  // Nueva Tarea
  const newTask = {
    id: uuidv4(),
    description: task,
    date: Date.now(),
    completed: false
  }
  // Añadir Tarea
  // tasks.push(newTask);
  console.log("pp", tasks);
  console.log("pptask", task);
  
  
  // Registrar tarea
  // saveTasks(tasks);
  // return tasks;
})

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
