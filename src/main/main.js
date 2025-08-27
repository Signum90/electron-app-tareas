/** ==========================================================
* NAME: APP TAREAS - PP
============================================================ */
/**@DESC: Proceso principal */
//# IMPORTS >
const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const { v4: uuidv4 } = require('uuid')

//# FUN: CREATE WINDOW >
const createWindow = () => {
  const win = new BrowserWindow({
    // width: 1200,
    // height: 800,
    webPreferences: {
      // Llamado desde el main: src/main/main.js
      preload: path.join(__dirname, '../preload/preload.js')
    }
  });
  // Llamado desde el main: src/main/main.js
  win.loadFile(path.join(__dirname, '../renderer/index.html'));
  win.maximize(); // Maximo tamaño
}

//# TASK DB MANAGEMENT >
const TASK_FILE = path.join(__dirname, '../db/db.json');
console.log(TASK_FILE);

//# Read Tasks >
const readTasks = () => {
  // Si no existe el archivo
  if(!fs.existsSync(TASK_FILE)) return [];
  // Leer archivo
  const data = fs.readFileSync(TASK_FILE, "utf-8");
  // Retornar en formato json
  return JSON.parse(data || "[]");
}
//# Save Tasks File >
const saveTasks = (tasks) => {
  // Guardar
  fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
}

//# IPC HANDLERS: Manejadores de canales IPC >
//# Leer Tareas >
ipcMain.handle('get-tasks', () => {
  console.log('pp-get-task');
  
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
    date: new Date(),
    completed: false
  }
  // Añadir Tarea
  tasks.push(newTask);
  // Registrar tarea
  saveTasks(tasks);
  return tasks;
})

//# Completar, Descompletar Tareas >
ipcMain.handle('toggle-task', (event, idTask) => {
  
  // Traer Tareas
  const tasks = readTasks();
  
  // Mapear
  const updateTask = tasks.map( task => (
    // Validar id
    task.id === idTask ? {...task, completed: !task.completed } : task
  ));
  
  // Guardar Tareas
  saveTasks(updateTask);
  // return updateTask;
})
//# Eliminar tareas >
ipcMain.handle('delete-task', (event, idTask) => {
  // Cargar Tareas
  const tasks = readTasks();
  // Filtrar y guarnar nuevas tareas
  const newTasks = tasks.filter((task) => task.id !== idTask);
  // Guardar Tareas
  saveTasks(newTasks);
  
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
