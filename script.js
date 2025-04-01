const storageKey = 'task-list';
 
function getTasks() {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
}
 
function saveTasks(tasks) {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
}
 
function addTask() {
    let input = document.getElementById('task-input');
    let taskName = input.value.trim();
 
    if (!taskName) {
        alert('Digite uma tarefa!');
        return;
    }
 
    let tasks = getTasks();
 
    if (tasks.some(task => task.name === taskName)) {
        alert('Essa tarefa já existe!');
        return;
    }
 
    tasks.push({ name: taskName });
    saveTasks(tasks);
    input.value = '';
    renderTasks();
}
 
function renderTasks() {
    let tasks = getTasks();
    let list = document.getElementById('task-list');
    list.innerHTML = '';
 
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task.name;
 
        let removeBtn = document.createElement('button');
        removeBtn.textContent = '❌';
        removeBtn.onclick = () => removeTask(task.name);
 
        li.appendChild(removeBtn);
        list.appendChild(li);
    });
}
 
function removeTask(taskName) {
    let tasks = getTasks().filter(task => task.name !== taskName);
    saveTasks(tasks);
    renderTasks();
}
 
renderTasks();