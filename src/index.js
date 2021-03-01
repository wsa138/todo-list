import { format } from 'date-fns'
import { testAddProject } from './projects.js'

// Set the current date at the top of the page.
const formattedDate = format(new Date(), 'EEEE MM/dd/yyyy')
const dateHeader = document.getElementById('date')
dateHeader.innerHTML = `${formattedDate}`

// Create default project "All Projects".

let prt = document.getElementById("projects-list");
testAddProject('Test Project', prt)