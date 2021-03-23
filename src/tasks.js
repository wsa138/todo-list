// This module contains the functions necessary to create tasks, and add them to the html.

// Factory creates a new task.
const taskFactory = (name, date, time) => {
    return {
        name: name,
        date: date,
        time: time
    }
}

// Function pushes task object to parent project array.
const addTaskProject = (parentProjectTaskArray, taskObj) => {
    parentProjectTaskArray.push(taskObj);
}

// Iterate over a projects tasks and create DOM elements in task section.
const createTasksMenu = (projectObj, taskList) => {
    projectObj.projectTasksArr.forEach(function(taskObj) {
        let newTask = document.createElement('div');
        let newTaskName = document.createElement('div');
        let newTaskDate = document.createElement('div');
        let newTaskTime = document.createElement('div');

        newTask.className = 'task';
        newTaskName.className = 'task-name';
        newTaskDate.className = 'task-date';
        newTaskTime.className = 'task-time';

        newTaskName.innerHTML = taskObj.name;
        newTaskDate.innerHTML = taskObj.date;
        newTaskTime.innerHTML = taskObj.time;


        newTask.appendChild(newTaskName);
        newTask.appendChild(newTaskDate);
        newTask.appendChild(newTaskTime);
        taskList.appendChild(newTask);
    })
}

export { taskFactory, addTaskProject, createTasksMenu }

/*
    -const newTask = document.createElement('div');
    -newTask.className = 'task'
    -const newTaskName = document.createElement('div');
    -newTaskName.className = 'task-name';
    -newTaskName.innerHTML = name;
    -const newTaskDateTime = document.createElement('div');
    -newTaskDateTime.className = 'date-time';
    -newTaskDateTime.innerHTML= dateTime;
    */