import { format } from 'date-fns'
import { addNewProject, displayProject } from './projects.js'
import { taskFactory, addTaskProject, createTasksMenu } from './tasks.js'

// Set the current date at the top of the page.
const formattedDate = format(new Date(), 'EEEE MM/dd/yyyy')
const dateHeader = document.getElementById('date')
dateHeader.innerHTML = `${formattedDate}`


// Array containing all the projects created and saved to storage.
const projectsArr = []

// Function changes an elements display value to 'none'.
const displayNone = (element) => {
    element.style.display = 'none';
}

// Function changes an elements display value to provided value.
const changeDisplay = (element, display) => {
    element.style.display = display;
}

// Add project click event displays projects modal.
const addProject = document.getElementById('addProject')
const projectsModal = document.querySelector('.projects-modal');
addProject.addEventListener('click', function() {
    changeDisplay(projectsModal, 'flex');
});

// Add task click event to display task modal.
const addTaskBtn = document.getElementById('addTaskBtn')
const tasksModal = document.querySelector('.tasks-modal')
addTaskBtn.addEventListener('click', function() {
    changeDisplay(tasksModal, 'flex');
})

// X button click event closes projects modal or tasks.
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
    addNewProject(newProjectInput.value, projectsArr, projectsMenu);
    displayNone(projectsModal);
    projectForm.reset();
})

// FIXME: create this only if there is not saved user data.
addNewProject("All Projects", projectsArr, projectsMenu);

// Submit button event for 'Add Task' sets entered values for new task object.
const taskSubmit = document.getElementById('task-submit-btn');
const taskForm = document.getElementById('task-form')
const taskName = document.getElementById('newTaskName')
const taskDate = document.getElementById('newTaskDate')
const taskTime = document.getElementById('newTaskTime')
const taskList = document.getElementById('tasks-list');

// FIXME: Adds new tasks only to 'All Projects' project.
taskSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    let dateTime = `${taskDate.value} ${taskTime.value}`;
    let newTaskObj = taskFactory(taskName.value, dateTime);
    addTaskProject(projectsArr[0].projectTasksArr, newTaskObj);
    createTasksMenu(projectsArr[0], taskList);
    displayNone(tasksModal);
    taskForm.reset();
})
