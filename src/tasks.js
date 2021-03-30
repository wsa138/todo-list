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
    let taskArr = projectObj.projectTasksArr
    taskArr.forEach(function(taskObj) {
        let newTask = document.createElement('div');
        let newTaskName = document.createElement('div');
        let newTaskDate = document.createElement('div');
        let newTaskTime = document.createElement('div');
        let finishContainer = document.createElement('div');
        let taskComplete = document.createElement('button');
        let taskDelete = document.createElement('button');

        newTask.className = 'task';
        newTaskName.className = 'task-name';
        newTaskDate.className = 'task-date';
        newTaskTime.className = 'task-time';
        
        finishContainer.id = 'finish-container'
        taskComplete.id = 'task-complete';
        taskDelete.id = 'task-delete';

        newTaskName.innerHTML = taskObj.name;
        newTaskDate.innerHTML = taskObj.date;
        newTaskTime.innerHTML = taskObj.time;
        taskComplete.innerHTML = '&#10003';
        taskDelete.innerHTML = '&#8722';

        newTask.appendChild(newTaskName);
        newTask.appendChild(newTaskDate);
        newTask.appendChild(newTaskTime);
        finishContainer.appendChild(taskComplete);
        finishContainer.appendChild(taskDelete);
        newTask.appendChild(finishContainer);
        taskList.appendChild(newTask);

        completeEvent(taskComplete);
        deleteEvent(taskDelete, newTask, taskObj, taskArr);
    })
}

const completeEvent = (ele) => {
    ele.addEventListener('click', () => {
        ele.parentElement.parentElement.classList.toggle('completed')
    })
}

const deleteEvent = (ele, parent, obj, arr) => {
    ele.addEventListener('click', () => {
        parent.remove();
        let objIndex = arr.indexOf(obj);
        arr.splice(objIndex, 1);
        console.log(arr);
    })
}

export { taskFactory, createTasksMenu }
