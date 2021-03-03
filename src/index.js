import { format } from 'date-fns'
import * as projects from './projects.js'

// Set the current date at the top of the page.
const formattedDate = format(new Date(), 'EEEE MM/dd/yyyy')
const dateHeader = document.getElementById('date')
dateHeader.innerHTML = `${formattedDate}`

// Array containing all the projects created and saved to storage.
const projectsArr = [];




// Event listener for add project button.
const addProject = document.getElementById('addProject')
addProject.addEventListener("click", function() {
    console.log('Clicked "Add Project"');
    alert("adding new project")
    
})

