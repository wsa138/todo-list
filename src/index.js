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

// Event listener for add project button, creats, adds and displays new projects.
const addProject = document.getElementById('addProject')
addProject.addEventListener("click", function() {
    projects.takeProjectInput(projectsArr);
    projects.createProjectsMenu(projectsArr, projectsMenu);
})
