// Contains functions that access and manipulate the DOM.

import { format } from 'date-fns'
import { addNewProject } from './projects.js'
import { taskFactory, addTaskProject, createTasksMenu } from './tasks.js'

function displayDOM() {

    // Set the current date at the top of the page.
    const formattedDate = format(new Date(), 'EEEE MM/dd/yyyy')
    const dateHeader = document.getElementById('date')
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
    const addProject = document.getElementById('addProject')
    const projectsModal = document.querySelector('.projects-modal');
    addProject.addEventListener('click', function() {
        changeDisplay(projectsModal, 'flex');
    });

    // Click event displays task modal.
    const addTaskBtn = document.getElementById('addTaskBtn')
    const tasksModal = document.querySelector('.tasks-modal')
    addTaskBtn.addEventListener('click', function() {
        changeDisplay(tasksModal, 'flex');
    })

    // Click event closes projects and tasks modal.
    const close = document.getElementsByClassName('close-btn');
    let allClose = Array.from(close);
    allClose.forEach(function(ele) {
        ele.addEventListener('click', function() {
            displayNone(projectsModal);
            displayNone(tasksModal);
        })
    })

    // Submit button event for 'Add Project' sets entered name to variable. 
    const projSubmit = document.getElementById('proj-submit-btn');
    const projectForm = document.getElementById("project-form")
    const newProjectInput = document.getElementById('newProject');
    const projectsMenu = document.getElementById("projects-menu")

    projSubmit.addEventListener('click', function(e) {
        e.preventDefault();
        removeTasks();
        addNewProject(newProjectInput.value, projectsArr);
        createProjectsMenu(projectsArr, projectsMenu);
        displayProject(projectsArr, newProjectInput.value);
        displayNone(projectsModal);
        projectForm.reset();
    })

    

    // Submit button event for 'Add Task' sets entered values for new task object.
    const taskSubmit = document.getElementById('task-submit-btn');
    const taskForm = document.getElementById('task-form')
    const taskName = document.getElementById('newTaskName')
    const taskDate = document.getElementById('newTaskDate')
    const taskTime = document.getElementById('newTaskTime')
    const taskList = document.getElementById('tasks-list');

    // Task submit adds a new task to the project shown in the tasks section header.
    taskSubmit.addEventListener('click', function(e) {
        e.preventDefault();
        removeTasks();
        let dateTime = `${taskDate.value} ${taskTime.value}`;
        let newTaskObj = taskFactory(taskName.value, dateTime);
        let currentProject = document.querySelector('.tasks-header').innerHTML;
        // Find current projects object in projectsArr.
        for (let i = 0; i < projectsArr.length; i++) {
            if (projectsArr[i].name === currentProject) {
                // Add new task to that project objects task array.
                addTaskProject(projectsArr[i].projectTasksArr, newTaskObj);
                createTasksMenu(projectsArr[i], taskList)
                break;
            }
        }
        displayNone(tasksModal);
        taskForm.reset();
    })
}


// Creates elements from array of project objects and appends to parent. 
const createProjectsMenu = (array, parent) => {
    array.forEach(function(obj) {
        parent.appendChild(obj.newEle);
        // Sets project name as task header when project clicked.
        obj.newEle.addEventListener('click', function() {
            displayProject(array, obj.newEle.innerHTML)
        })
    })
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

// Document elements
const projectsMenu = document.getElementById("projects-menu")


// Create default 'All Projects' project.
addNewProject('All Projects', projectsArr, projectsMenu);
createProjectsMenu(projectsArr, projectsMenu);
displayProject(projectsArr, 'All Projects');


export { displayDOM, createProjectsMenu, displayProject }