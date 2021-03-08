import { format } from 'date-fns'
import { addNewProject } from './projects.js'

// Set the current date at the top of the page.
const formattedDate = format(new Date(), 'EEEE MM/dd/yyyy')
const dateHeader = document.getElementById('date')
dateHeader.innerHTML = `${formattedDate}`


// Array containing all the projects created and saved to storage.
const projectsArr = []


// Add project click event brings up modal.
const addProject = document.getElementById('addProject')
const projectsModal = document.querySelector('.projects-modal');
addProject.addEventListener('click', function() {
    changeDisplay(projectsModal, 'flex');
});

// X button click event closes modal.
const close = document.querySelector('.close-btn');
close.addEventListener('click', function() {
    displayNone(projectsModal);
})

// Submit button event sets entered name to variable. 
const submit = document.querySelector('.submit-btn');
const projectForm = document.getElementById("project-form")
const newProjectInput = document.getElementById('newProject');
const projectsMenu = document.getElementById("projects-menu")
submit.addEventListener('click', function(e) {
    e.preventDefault();
    addNewProject(newProjectInput.value, projectsArr, projectsMenu);
    displayNone(projectsModal);
    projectForm.reset();
})


// Function changes an elements display value to 'none'.
const displayNone = (element) => {
    element.style.display = 'none';
}

// Function changes an elements display value to provided value.
const changeDisplay = (element, display) => {
    element.style.display = display;
}

// Add task click event to display task modal.
const addTaskBtn = document.getElementById('addTaskBtn')
addTaskBtn.addEventListener('click', function() {
    alert("Adding task");
})
