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
        newTask.id = taskObj.name;
        newTaskName.className = 'task-name';
        newTaskDate.className = 'task-date';
        newTaskTime.className = 'task-time';
        newTaskNotes.className = 'task-notes';
        finishContainer.className = 'finish-container'
        expandNotes.className = 'task-notes-btn'
        
        taskComplete.className = 'task-complete';
        taskDelete.className = 'task-delete';

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

        // Add event listener to toggle the notes section.
        expandNotes.addEventListener('click', () => {
            newTask.classList.toggle('show-notes');
            newTaskNotes.classList.toggle('show-display');
        })
    })
}




export { taskFactory, createTasksMenu }
