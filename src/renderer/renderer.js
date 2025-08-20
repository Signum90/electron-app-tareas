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
const listTask = async () => {
  // PP - Traer Tareas
  const tasks = await window.api.getTasks();
  // Limpiar lista 
  $taskList.innerHTML = '';
  // Recorrer tareas
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.description;
    if(task.completed){
      li.classList.add('completed')
    }
    // Botón completar
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed ? "❌" : "✔️";
    toggleBtn.classList.add('btnTask')
    toggleBtn.onclick = async () => {
      // await window.api.toggleTask(task.id);
      listTask();
    };

    // Añadir elemento a la lista
    li.appendChild(toggleBtn)
    $taskList.appendChild(li)
  });
  
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
  // Renderizar lista
  listTask();
}

listTask();