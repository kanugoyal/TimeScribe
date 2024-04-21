import { getTasksFromLocalStorage } from './storage.js';

// Function to calculate the total hours worked for today
export function getTotalHoursForToday() {
    const tasks = getTasksFromLocalStorage();
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // Get today's date in string format (YYYY-MM-DD)
    let totalHours = 0;

    tasks.forEach(task => {
        if (task.taskDate === todayString) {
            totalHours += calculateHours(task.timeStarted, task.timeStopped);
        }
    });

    return totalHours;
}

// Function to calculate the total hours worked for this week
export function getTotalHoursForThisWeek() {
    const tasks = getTasksFromLocalStorage();
    const today = new Date();
    const lastSunday = new Date(today);
    lastSunday.setDate(lastSunday.getDate() - (today.getDay() + 7)); // Go back 7 days from the last Sunday

    const lastSaturday = new Date(lastSunday);
    lastSaturday.setDate(lastSaturday.getDate() + 6); // Set to last Saturday

    let totalHours = 0;

    tasks.forEach(task => {
        const taskDate = new Date(task.taskDate);
        if (taskDate >= lastSunday && taskDate <= lastSaturday) {
            totalHours += calculateHours(task.timeStarted, task.timeStopped);
        }
    });

    return totalHours;
}


// Function to calculate the total hours worked for this month
export function getTotalHoursForThisMonth() {
    const tasks = getTasksFromLocalStorage();
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Get the first day of the current month
    let totalHours = 0;

    tasks.forEach(task => {
        const taskDate = new Date(task.taskDate);
        if (taskDate >= firstDayOfMonth) {
            totalHours += calculateHours(task.timeStarted, task.timeStopped);
        }
    });

    return totalHours;
}

// Helper function to calculate hours between two time strings (HH:MM:SS)
function calculateHours(startTime, stopTime) {
    const start = new Date(`1970-01-01T${startTime}`);
    const stop = new Date(`1970-01-01T${stopTime}`);
    const diff = stop.getTime() - start.getTime();
    return diff / (1000 * 60 * 60); // Convert milliseconds to hours
}
