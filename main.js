import { TaskManager } from './taskManager.js';
import { api } from './api.js';

const taskManager = new TaskManager();

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', async () => {
    const tasks = await api.fetchTasks();
    tasks.forEach(t => {
        taskManager.tasks.push(t);
    });
    renderTasks();
});

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    taskManager.addTask(title);
    taskInput.value = '';
    await api.saveTasks(taskManager.getTasks());
    renderTasks();
});

window.toggleTask = async function(id) {
    taskManager.toggleTask(id);
    await api.saveTasks(taskManager.getTasks());
    renderTasks();
};

window.deleteTask = async function(id) {
    taskManager.deleteTask(id);
    await api.saveTasks(taskManager.getTasks());
    renderTasks();
};

function renderTasks() {
    taskList.innerHTML = '';
    taskManager.getTasks().forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.title}</span>
            <div>
                <button onclick="toggleTask('${task.id}')">Toggle</button>
                <button onclick="deleteTask('${task.id}')">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}