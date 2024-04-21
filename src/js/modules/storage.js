export function saveTaskToLocalStorage(taskData) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (tasks.length === 0) {
        tasks.push(taskData);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      } else {
        const index = tasks.findIndex(task => task.taskId === taskData.id);
    
        if (index === -1) {
          tasks.push(taskData);
        } else {
          tasks[index] = taskData;
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

export function getTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

export function removeTaskFromLocalStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}