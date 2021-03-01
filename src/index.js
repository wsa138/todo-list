import { format } from 'date-fns'
import { projectFactory, createProjectDom } from './projects.js'

// Set the current date at the top of the page.
const formattedDate = format(new Date(), 'EEEE MM/dd/yyyy')
const dateHeader = document.getElementById('date')
dateHeader.innerHTML = `${formattedDate}`

// Projects menu element.
const projectsMenu = document.getElementById('projects-menu');

// Array containing all the projects created and saved to storage.
const projectsArr = [];

// Iterate through allProjects and create DOM elements.
projectsArr.forEach(function(ele) {
    createProjectDom(ele.newEle, projectsMenu);
})

