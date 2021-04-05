// This module contains the functions necessary to create tasks, and add them to the html.

// Factory creates a new task.
const taskFactory = (name, date, time, notes) => {
    return {
        name: name,
        date: date,
        time: time,
        notes: notes
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
        let newTaskNotes = document.createElement('div');
        let finishContainer = document.createElement('div');
        let taskComplete = document.createElement('button');
        let taskDelete = document.createElement('button');
        let expandNotes = document.createElement('button');

        newTask.className = 'task';
        newTaskName.className = 'task-name';
        newTaskDate.className = 'task-date';
        newTaskTime.className = 'task-time';
        newTaskNotes.className = 'task-notes';
        finishContainer.className = 'finish-container'
        expandNotes.className = 'task-notes-btn'
        
        taskComplete.id = 'task-complete';
        taskDelete.id = 'task-delete';

        newTaskName.innerHTML = taskObj.name;
        newTaskDate.innerHTML = taskObj.date;
        newTaskTime.innerHTML = taskObj.time;
        newTaskNotes.innerHTML = taskObj.notes;
        taskComplete.innerHTML = '&#10003';
        taskDelete.innerHTML = '&#8722';
        expandNotes.innerText = 'Notes'

        newTask.appendChild(newTaskName);
        newTask.appendChild(newTaskDate);
        newTask.appendChild(newTaskTime);
        newTask.appendChild(newTaskNotes);
        finishContainer.appendChild(taskComplete);
        finishContainer.appendChild(taskDelete);
        newTask.appendChild(finishContainer);
        newTask.appendChild(expandNotes);
        taskList.appendChild(newTask);

        completeEvent(taskComplete);
        deleteEvent(taskDelete, newTask, taskObj, taskArr);

        // Add event listener to toggle the notes section.
        expandNotes.addEventListener('click', () => {
            newTask.classList.toggle('show-notes');
            newTaskNotes.classList.toggle('show-display');
        })
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
