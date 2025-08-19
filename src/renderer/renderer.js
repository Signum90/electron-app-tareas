/** ==========================================================
* NAME: RENDERER
============================================================ */
/**@DESC: lógica del render */
//# HTML Elements >
const $ = selector => document.querySelector(selector);
const $taskInput = $("#taskInput");
const $taskList = $("#taskList")
//# XXXXX >

//# FUN: Listar Tareas >
const listTask = () => {

}

//# FUN: Añadir Tarea >
const addTask = async () => {
  // Texto
  const task = $taskInput.value;
  // Validar
  if (task.trim() === "") return;
  console.log("add-task", task);
  
  // Llamar api ipcRenderer
  await window.api.addTask(task);
  // Vaciar input
  $taskInput.value = "";
}
