/** ==========================================================
* NAME: PRELOAD
============================================================ */
/**@DESC: Archivo de precargar */
//# IMPORTS >
const { contextBridge, ipcRenderer } = require('electron');

//# Puente del Contexto >
contextBridge.exposeInMainWorld('api', {
  getTasks: () => ipcRenderer.invoke('get-tasks'),
  addTask: (task) => ipcRenderer.invoke('add-tasks', task),
  toggleTask: (idTask) => ipcRenderer.invoke('toggle-task', idTask),
  deleteTask: (idTask) => ipcRenderer.invoke('delete-task', idTask)
});

//# XXXXX >s
//# XXXXX >