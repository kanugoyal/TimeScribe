import createTaskCard from './modules/timer.js';

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submitted');

    const taskInput = document.getElementById('task-input');
    const taskName = capitalize(taskInput.value.trim());
    console.log('Task name:', taskName);

    const taskDateInput = document.getElementById('task-date');
    const taskDate = taskDateInput.value;

    if (taskName !== '') {
        createTaskCard(taskName, taskDate);
        console.log('Task saved to local storage:', taskName); 
        taskInput.value = '';
    } else {
        alert('Please enter a task name.');
        console.log('Task name is empty');
    }
});


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
