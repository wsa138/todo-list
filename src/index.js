import { format } from 'date-fns'
import * as projects from './projects.js'

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
    modal.style.display = 'flex';
});
// X button click event closes modal.
let close = document.querySelector('.close-btn');
close.addEventListener('click', function() {
    modal.style.display = 'none';
})