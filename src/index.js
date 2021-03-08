import { format } from 'date-fns'
import { addNewProject } from './projects.js'

// Set the current date at the top of the page.
const formattedDate = format(new Date(), 'EEEE MM/dd/yyyy')
const dateHeader = document.getElementById('date')
dateHeader.innerHTML = `${formattedDate}`


// Array containing all the projects created and saved to storage.
let projectsArr = []


// Projects menu element.
const projectsMenu = document.getElementById("projects-menu")


// Add project click event brings up modal.
let addProject = document.getElementById('addProject')
let modal = document.querySelector('.bg-modal');
addProject.addEventListener('click', function() {
    changeDisplay(modal, 'flex');
});

// X button click event closes modal.
let close = document.querySelector('.close-btn');
close.addEventListener('click', function() {
    displayNone(modal);
})

// Submit button event sets entered name to variable. 
let submit = document.querySelector('.submit-btn');
let projectForm = document.getElementById("project-form")
let newProjectInput = document.getElementById('newProject');
submit.addEventListener('click', function(e) {
    e.preventDefault();
    addNewProject(newProjectInput.value, projectsArr, projectsMenu);
    displayNone(modal);
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