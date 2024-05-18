## **TimeScribe Web App**

TimeScribe is a simplified time-tracking tool that allows users to easily log their activities and view the total time spent. With a clean interface and intuitive features, TimeScribe empowers users to manage their focus and track their workflow effectively.

## Getting Started
To get started with QuickTrack, clone the repository to your local machine and open the `index.html` file in your browser.

## Features
- Start, pause, and stop time tracking sessions.
- Log past events manually.
- View a list of all recorded sessions with details.
- View a summarized record of time spent in the current week on the Analytics page.

## File Structure
- `index.html`: Main HTML file for the QuickTrack web app.
- `css/`: Directory containing CSS stylesheets.
- `js/`: Directory containing JavaScript files.
  - `modules/`: Directory containing modular JavaScript files.
    - `storage.js`: JavaScript module for storing and retrieving data in localStorage. Handles saving, retrieving, and deleting tasks from localStorage.
    - `chart.js`: JavaScript module for generating charts and analytics. Handles the creation of charts and visualization of data.
  - `timer.js`: JavaScript file for time tracking functionalities. Manages the start, pause, and stop actions of the timer, as well as manual event logging and updating the UI.
- `README.md`: This README file.

## Usage
1. Start a new time-tracking session by clicking the "Start" button.
2. Enter details of your current task and begin timing.
3. Stop the timer when the task is completed.
4. View logs of all recorded sessions and delete entries if needed.
5. Navigate to the Analytics page to view a summarized record of time spent in the current week.

In the `timer.js` file, we implemented the functionality to start, pause, and stop time-tracking sessions. We also provided the ability to log past events manually. The code has been modularized using JavaScript modules to simplify and organize the codebase.

In the `storage.js` file, we created a JavaScript module to handle localStorage operations. This module is responsible for saving, retrieving, and deleting tasks from localStorage.

The total hours progress bar is tracked by utilizing the functions `getTotalHoursForToday`, `getTotalHoursForThisWeek`, and `getTotalHoursForThisMonth` from the `calculate-time.js` module. These functions calculate the total hours worked for today, this week, and this month respectively, by retrieving tasks from localStorage and performing calculations. The progress bar is then updated with the calculated total hours.
