// This module contains all functions related to projects.

// Factory that creates projects.
const projectFactory = (name) => {
    const newEle = document.createElement("li");
    newEle.innerHTML = name;
    newEle.style.cursor = 'pointer'
    return { name, newEle };
}


// Stores a project name in the project array.
const takeProjectInput = (projectName, holdingArr) => {
    holdingArr.push(newProject)
}

// Takes an array of project objects and creates an element appended to parent. 
const createProjectsMenu = (array, parent) => {
    array.forEach(function(obj) {
        parent.appendChild(obj.newEle);
    })
}


export { projectFactory, takeProjectInput, createProjectsMenu }