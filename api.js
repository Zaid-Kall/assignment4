const api = {
    fetchTasks() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const storedTasks = localStorage.getItem('tasks');
                resolve(storedTasks ? JSON.parse(storedTasks) : []);
            }, 500);
        });
    },

    saveTasks(tasks) {
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.setItem('tasks', JSON.stringify(tasks));
                resolve(true);
            }, 500);
        });
    }
};

export { api };