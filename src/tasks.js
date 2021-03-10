// This module contains the functions necessary to create tasks, and add them to the html.

// Factory creates a new task.
const taskFactory = (name, dateTime) => {
    const newTask = document.createElement('div');
    newTask.className = 'task'
    const newTaskName = document.createElement('div');
    newTaskName.className = 'task-name';
    newTaskName.innerHTML = name;
    const newTaskDateTime = document.createElement('div');
    newTaskDateTime.className = 'date-time';
    newTaskDateTime.innerHTML= dateTime;

    return { newTask, newTaskName, newTaskDateTime };
}

// Function pushes task object to parent project array.
const addTaskProject = (parentProject, taskObj) => {
    parentProject.push(taskObj);
}



export { taskFactory, addTaskProject }