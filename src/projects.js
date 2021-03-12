// This module contains all functions related to projects.

import { createProjectsMenu, displayProject } from './DOM-functionality'

// Factory that creates projects objects.
const projectFactory = (name) => {
    let newEle = document.createElement("li");
    newEle.innerHTML = name;
    newEle.className = 'project'
    newEle.style.cursor = 'pointer'
    let projectTasksArr = [];
    return { name, newEle, projectTasksArr };
}

// Function takes project object and pushes it to a project array.
const pushProject = (projObj, array) => {
    array.push(projObj);
}


// Function takes necessary input to create a new project.
const addNewProject = (name, array) => {
    let projObj = projectFactory(name);
    pushProject(projObj, array);
}



export { addNewProject }