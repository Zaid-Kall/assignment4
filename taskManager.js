class Task {
    constructor(id, title, completed = false) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }

    toggle() {
        return new Task(this.id, this.title, !this.completed);
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(title) {
        const newTask = new Task(Date.now().toString(), title);
        this.tasks = [...this.tasks, newTask];
        return this.tasks;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks;
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task => 
            task.id === id ? task.toggle() : task
        );
        return this.tasks;
    }

    getTasks() {
        return [...this.tasks];
    }
}

export { Task, TaskManager };