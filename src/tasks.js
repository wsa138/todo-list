// This module contains the functions necessary to create tasks, and add them to the html.

// Factory creates a new task.
const taskFactory = (name, date, time) => {
    return {
        name: name,
        date: date,
        time: time
    }
}

// Iterate over a projects tasks, creates DOM elements and appends them to tasks section.
const createTasksMenu = (projectObj, taskList) => {
    projectObj.projectTasksArr.forEach(function(taskObj) {
        let newTask = document.createElement('div');
        let newTaskName = document.createElement('div');
        let newTaskDate = document.createElement('div');
        let newTaskTime = document.createElement('div');
        let taskComplete = document.createElement('button');
        let taskDelete = document.createElement('button');

        newTask.className = 'task';
        newTaskName.className = 'task-name';
        newTaskDate.className = 'task-date';
        newTaskTime.className = 'task-time';
        
        taskComplete.id = 'task-complete';
        taskDelete.id = 'task-delete';

        newTaskName.innerHTML = taskObj.name;
        newTaskDate.innerHTML = taskObj.date;
        newTaskTime.innerHTML = taskObj.time;

        newTask.appendChild(newTaskName);
        newTask.appendChild(newTaskDate);
        newTask.appendChild(newTaskTime);
        newTask.appendChild(taskComplete);
        newTask.appendChild(taskDelete);
        taskList.appendChild(newTask);
    })
}

export { taskFactory, createTasksMenu }
