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
    li.textContent = `${ task.description } / ${ task.date.split('T')[0] }`;
    if(task.completed){
      li.classList.add('completed')
    };

    // Botón completar
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed ? "❌" : "✔️";
    toggleBtn.classList.add('btnTask');
    toggleBtn.onclick = async () => {
      await window.api.toggleTask(task.id);
      listTask();
    };

    // Botón Eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '➖';
    deleteBtn.classList.add('btnTask');
    deleteBtn.onclick = async () => {
      await window.api.deleteTask(task.id);
      listTask();
    };

    // Añadir Botones
    li.appendChild(deleteBtn);
    li.appendChild(toggleBtn)
    // Añadir elemento a la lista
    $taskList.appendChild(li)
  });
  
}

//# FUN: Añadir Tarea >
const addTask = async (e) => {
  
  e.preventDefault();
  // Texto
  const task = $taskInput.value;
  // Validar
  if (task.trim() === "") return;
  // Llamar api ipcRenderer
  await window.api.addTask(task);
  // Vaciar input
  $taskInput.value = "";
  // Renderizar lista
  listTask();
}

listTask();