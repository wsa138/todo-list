// Contains functions that access and manipulate the DOM.

import { format } from 'date-fns'
import { addNewProject } from './projects.js'
import { taskFactory, addTaskProject, createTasksMenu } from './tasks.js'

function displayDOM() {

    // Document references:
    const dateHeader = document.getElementById('date');
    const addProject = document.getElementById('addProject');
    const projectsModal = document.querySelector('.projects-modal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const tasksModal = document.querySelector('.tasks-modal');
    const close = document.getElementsByClassName('close-btn');
    const projSubmit = document.getElementById('proj-submit-btn');
    const projectForm = document.getElementById("project-form");
    const newProjectInput = document.getElementById('newProject');
    const taskSubmit = document.getElementById('task-submit-btn');
    const taskForm = document.getElementById('task-form');
    const taskName = document.getElementById('newTaskName');
    const taskDate = document.getElementById('newTaskDate');
    const taskTime = document.getElementById('newTaskTime');
    const taskList = document.getElementById('tasks-list');


    // Set the current date at the top of the page.
    const formattedDate = format(new Date(), 'EEEE MM/dd/yyyy')
    dateHeader.innerHTML = `${formattedDate}`


    // Function changes an elements display value to 'none'.
    const displayNone = (element) => {
        element.style.display = 'none';
    }

    // Function changes an elements display value to provided value.
    const changeDisplay = (element, display) => {
        element.style.display = display;
    }

    // PROJECT AND TASK MODAL EVENT LISTENERS

    // Click event displays projects modal.
    addProject.addEventListener('click', function() {
        changeDisplay(projectsModal, 'flex');
    });

    // Click event displays task modal.
    addTaskBtn.addEventListener('click', function() {
        changeDisplay(tasksModal, 'flex');
    })

    // Click event closes projects and tasks modal.
    let allClose = Array.from(close);
    allClose.forEach(function(ele) {
        ele.addEventListener('click', function() {
            displayNone(projectsModal);
            displayNone(tasksModal);
        })
    })

    // Submit button event for 'Add Project'..
    projSubmit.addEventListener('click', function(e) {
        e.preventDefault();
        removeTasks();
        // Creates project object and appends to projects array.
        addNewProject(newProjectInput.value, projectsArr);
        // Adds the project to the projects menu.
        let newestProj = projectsArr[projectsArr.length - 1]
        addProjectToMenu(newestProj);
        // Sets task header as new project's name.
        displayProject(projectsArr, newProjectInput.value);
        displayNone(projectsModal);
        projectForm.reset();
    })

    // On task modal submit, creates task object and appends it to the current
    // projects array of task objects, and recreates the task menu.
    taskSubmit.addEventListener('click', function(e) {
        e.preventDefault();
        removeTasks();
        let dateTime = `${taskDate.value} ${taskTime.value}`;
        let newTaskObj = taskFactory(taskName.value, dateTime);
        let currentProject = document.querySelector('.tasks-header').innerHTML;
        // Find current projects object in projectsArr.
        for (let i = 0; i < projectsArr.length; i++) {
            if (projectsArr[i].name === currentProject) {
                // Add new task object to current project array of task objects.
                addTaskProject(projectsArr[i].projectTasksArr, newTaskObj);
                // Re-creates current projects task list.
                createTasksMenu(projectsArr[i], taskList)
                break;
            }
        }
        displayNone(tasksModal);
        taskForm.reset();
    })
}

// Document elements
const projectsMenu = document.getElementById("projects-menu")


// Add a new project to the projects menu.
const addProjectToMenu = (obj) =>{
    projectsMenu.appendChild(obj.newEle)
    addFinishButtons(obj.newEle)
    addDisplayEvent(obj.name, obj.newEle);
}
// Add event listener for displaying project name when clicked.
const addDisplayEvent = (name, ele) => {
    ele.addEventListener('click', function() {
        displayProject(projectsArr, name);
    })
}

const addFinishButtons = (parentEle) => {
    let completeEle = document.createElement('button');
        completeEle.innerHTML = '&#10003';
        completeEle.className = 'proj-btn';
        completeEle.id = 'complete-btn'
        let deleteEle = document.createElement('button');
        deleteEle.innerHTML = '&#8722;';
        deleteEle.className = 'proj-btn';
        deleteEle.id = 'delete-btn'
        parentEle.appendChild(completeEle);
        parentEle.appendChild(deleteEle);
}


// Sets header of task section to recently created or selected project.
const displayProject = (array, projectName) => {
    let taskHead = document.getElementById('tasks-section')
    taskHead.removeChild(taskHead.childNodes[0]);
    let taskHeader = document.createElement('h2');
    taskHeader.className = 'tasks-header';
    taskHeader.innerHTML = projectName;
    taskHead.prepend(taskHeader);
    populateTasks(array, projectName);
}

// Finds project object with corresponding project name.
const populateTasks = (array, projectName) => {
    removeTasks();
    let taskList = document.getElementById('tasks-list');
    for (let i = 0; i < array.length; i++) {
        if (array[i].name === projectName) {
            // Creates and appends elements from projects task objects to task section.
            createTasksMenu(array[i], taskList)
        }
    }
}

// Removes tasks elements.
const removeTasks = () => {
    let taskList = document.getElementById('tasks-list');
    while (taskList.firstChild) {
        taskList.removeChild(taskList.lastChild);
    }
}

// Array containing all the projects created and saved to storage.
const projectsArr = []

/*
// TODO: Create a default project that contains all task elements of other proejcts.
addNewProject('All Projects', projectsArr, projectsMenu);
createProjectsMenu(projectsArr, projectsMenu);
displayProject(projectsArr, 'All Projects');
*/

export { displayDOM }