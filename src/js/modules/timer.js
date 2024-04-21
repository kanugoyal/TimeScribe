import { saveTaskToLocalStorage, getTasksFromLocalStorage, removeTaskFromLocalStorage } from './storage.js';
import { getTotalHoursForToday, getTotalHoursForThisWeek, getTotalHoursForThisMonth } from './calculate-time.js';

document.addEventListener('DOMContentLoaded', function() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        createTaskCard(task.taskName, task.taskDate, task);
    });
    updateProgress();
});

export default function createTaskCard(taskName, taskDate, taskData) {
    const taskList = document.getElementById('tasks-cards');

    // task-card
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskList.appendChild(taskCard);

    const taskId = document.createElement('div');
    taskId.classList.add('task-id');
    const uniqueId = generateUniqueId();
    taskId.setAttribute('data-id', uniqueId);
    taskCard.appendChild(taskId);

    // task card - content
    const taskContent = document.createElement('div');
    taskContent.classList.add('content');
    taskCard.appendChild(taskContent);

    // Task Name
    const taskNameElement = document.createElement('input');
    taskNameElement.classList.add('text');
    taskNameElement.type = 'text';
    taskNameElement.value = taskName
    taskNameElement.setAttribute('readonly', 'readonly');
    taskContent.appendChild(taskNameElement);

    // Task Date
    const taskDateElement = document.createElement('input');
    taskDateElement.classList.add('date');
    taskDateElement.type = 'date';
    taskDateElement.value = taskDate
    taskDateElement.setAttribute('readonly', 'readonly');
    taskContent.appendChild(taskDateElement);

    // Task Counter
    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer');
    taskCard.appendChild(timerDisplay);

    const timerCounter = document.createElement('div');
    timerCounter.classList.add('time');
    timerCounter.innerText = '00:00:00';
    timerDisplay.appendChild(timerCounter);

    const timelogElement = document.createElement('div');
    timelogElement.classList.add('time-log');
    timerDisplay.appendChild(timelogElement);

    const timeStartedElement = document.createElement('input');
    timeStartedElement.classList.add('time-started');
    timeStartedElement.type = 'text';
    timeStartedElement.value = "";
    timeStartedElement.readOnly = true;
    timelogElement.appendChild(timeStartedElement);

    const timeStoppedElement = document.createElement('input');
    timeStoppedElement.classList.add('time-stopped');
    timeStoppedElement.type = 'text';
    timeStoppedElement.value = "";
    timeStoppedElement.readOnly = true;
    timelogElement.appendChild(timeStoppedElement);

    const timerControls = document.createElement('div');
    timerControls.classList.add('controls');
    timerDisplay.appendChild(timerControls);

    // Toggle Buttons element to controls
    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('toggle', 'start-color');
    toggleBtn.innerText = "Start";

    timerControls.appendChild(toggleBtn);

    const editControls = document.createElement('div');
    editControls.classList.add('edit-actions');
    timerControls.appendChild(editControls);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-pencil-alt');
    editBtn.appendChild(editIcon);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt');
    deleteBtn.appendChild(deleteIcon);

    editControls.appendChild(editBtn);
    editControls.appendChild(deleteBtn)


    // Toggle control button colors
    function toggleButtonColor(started) {
        if (started) {
            timeStartedElement.value = getCurrentTime();
            timeStoppedElement.innerText = " ";
            toggleBtn.classList.remove('start-color');
            toggleBtn.classList.add('stop-color');
            
        } else {
            timeStoppedElement.value = getCurrentTime();
            toggleBtn.classList.remove('stop-color');
            toggleBtn.classList.add('start-color');
           
        }
    }

    // Counter
    let seconds = 0;
    let interval = null;
    let started = taskData ? taskData.isRunning : true;

    toggleBtn.addEventListener('click', function() {
        if (!interval) {
            start();
            started = true;
            toggleBtn.innerText = "Stop";
            toggleButtonColor(started);
        } else {
            stop();
            started = false;
            toggleBtn.innerText = "Start";
            toggleButtonColor(started);
            toggleBtn.disabled = true;
            saveTask();
        }
    });


    function timer() {
        seconds++;

        let hrs = Math.floor(seconds / 3600);
        let mins = Math.floor((seconds - (hrs * 3600)) / 60);
        let secs = seconds % 60;

        if (secs < 10) secs = '0' + secs;
        if (mins < 10) mins = '0' + mins;
        if (hrs < 10) hrs = '0' + hrs;

        timerCounter.innerText = `${hrs}:${mins}:${secs}`;
    }

    function start() {
        if (interval) {
            return;
        }

        interval = setInterval(timer, 1000);
    }

    function stop() {
        clearInterval(interval);
        interval = null;
    }

    function saveTask() {
        const taskData = {
            id: uniqueId,
            taskName: taskNameElement.value,
            taskDate: taskDateElement.value,
            timeStarted: timeStartedElement.value,
            timeStopped: timeStoppedElement.value,
            totalTime: timerCounter.innerText,
            isRunning: started 
        };

        saveTaskToLocalStorage(taskData);
        
    }

    if (taskData) {
        timeStartedElement.value = taskData.timeStarted;
        timeStoppedElement.value = taskData.timeStopped;
        timerCounter.innerText = taskData.totalTime;
        toggleButtonColor(taskData.isRunning);
    }

    function generateUniqueId() {
        return Math.random().toString(36).slice(2, 11);
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    function calculateElapsedTime(timeStarted, timeStopped) {
        const [startHours, startMinutes, startSeconds] = timeStarted.split(':').map(Number);
        const [stopHours, stopMinutes, stopSeconds] = timeStopped.split(':').map(Number);
      
        const startTime = startHours * 3600 + startMinutes * 60 + startSeconds;
        const stopTime = stopHours * 3600 + stopMinutes * 60 + stopSeconds;
      
        const elapsedSeconds = stopTime - startTime;
        return elapsedSeconds;
      }

    editBtn.addEventListener('click', () => {
        if (editIcon.classList.contains('fa-pencil-alt')) {

            editIcon.classList.remove('fa-pencil-alt');
            editIcon.classList.add('fa-check');
            taskNameElement.removeAttribute('readonly');
            taskDateElement.removeAttribute('readonly');
            timeStartedElement.readOnly = !timeStartedElement.readOnly;
            if (!timeStartedElement.readOnly) {
                timeStartedElement.focus();
            }
            timeStoppedElement.readOnly = !timeStoppedElement.readOnly;
            if (!timeStoppedElement.readOnly) {
                timeStoppedElement.focus();
            }
            taskNameElement.focus();
            taskDateElement.focus();
        } else {
            taskNameElement.setAttribute('readonly', 'readonly');
            taskDateElement.setAttribute('readonly', 'readonly');
            editIcon.classList.add('fa-pencil-alt');
            editIcon.classList.remove('fa-check');

            const elapsedSeconds = calculateElapsedTime(timeStartedElement.value, timeStoppedElement.value);
            seconds = elapsedSeconds;
            clearInterval(interval);
            interval = null;
            timer();
            saveTask();
        }
    })

    deleteBtn.addEventListener('click', () => {
        const taskId = taskCard.getAttribute('data-id');
        taskList.removeChild(taskCard);
        removeTaskFromLocalStorage(taskId);
    })

}


function updateProgress() {
    const todayProgress = getTotalHoursForToday();
    const thisWeekProgress = getTotalHoursForThisWeek();
    const thisMonthProgress = getTotalHoursForThisMonth();

    updateProgressBar('Today', todayProgress, 24);
    updateProgressBar('This Week', thisWeekProgress, 168);
    updateProgressBar('This Month', thisMonthProgress, 730);
}

function updateProgressBar(period, hoursWorked, totalHours) {

    const progressBox = document.createElement('div');
    progressBox.classList.add('progress-box');

    const titleBar = document.createElement('div');
    titleBar.classList.add('title-bar');

    const h3Element = document.createElement('h3');
    h3Element.textContent = period;
    titleBar.appendChild(h3Element);

    const totalHoursText = document.createElement('p');
    totalHoursText.classList.add('total-hours');
    totalHoursText.textContent = `Total Hours: ${hoursWorked.toFixed(2)}`;
    titleBar.appendChild(totalHoursText);

    progressBox.appendChild(titleBar);

    const progressBarContainer = document.createElement('div');
    progressBarContainer.classList.add('progress-bar');
    progressBox.appendChild(progressBarContainer);

    const progressFill = document.createElement('div');
    progressFill.classList.add('progress-fill');
    progressFill.style.width = `${(hoursWorked / totalHours) * 100}%`;
    progressBarContainer.appendChild(progressFill);

    const progressContainer = document.getElementById('progress-container');
    progressContainer.appendChild(progressBox);
}

