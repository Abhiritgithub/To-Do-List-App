document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('taskInput');
  const addBtn = document.getElementById('addTaskBtn');

  addBtn.addEventListener('click', addTask);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
  });

  renderTasks();
});

function getTasksFromStorage() {
  const tasksJSON = localStorage.getItem('tasks');
  return tasksJSON ? JSON.parse(tasksJSON) : [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (taskText === '') return;

  const task = {
    text: taskText,
    completed: false
  };

  let tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);
  input.value = '';
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  const taskCount = document.getElementById('taskCount');
  taskList.innerHTML = '';

  const tasks = getTasksFromStorage();

  if (tasks.length === 0) {
    taskList.innerHTML = '<li style="text-align:center; color:gray;">No tasks yet.</li>';
    taskCount.textContent = '';
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = task.text;
    span.style.cursor = 'pointer';
    span.onclick = () => toggleComplete(index);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  taskCount.textContent = `You have ${tasks.length} task${tasks.length > 1 ? 's' : ''}`;
}

function toggleComplete(index) {
  const tasks = getTasksFromStorage();
  tasks[index].completed = !tasks[index].completed;
  saveTasksToStorage(tasks);
  renderTasks();
}

function deleteTask(index) {
  const confirmed = confirm('Are you sure you want to delete this task?');
  if (!confirmed) return;

  const tasks = getTasksFromStorage();
  tasks.splice(index, 1);
  saveTasksToStorage(tasks);
  renderTasks();
}
