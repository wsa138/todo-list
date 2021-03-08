// This module contains all functions related to projects.

// Factory that creates projects.
const projectFactory = (name) => {
    const newEle = document.createElement("li");
    newEle.innerHTML = name;
    newEle.className = 'project'
    newEle.style.cursor = 'pointer'
    return { name, newEle };
}

// Function takes project object and pushes it to a project array.
const pushProject = (projObj, array) => {
    array.push(projObj);
}

// Takes an array of project objects and creates an element appended to parent. 
const createProjectsMenu = (array, parent) => {
    array.forEach(function(obj) {
        parent.appendChild(obj.newEle);
    })
}

// Function takes necessary input to create
const addNewProject = (name, array, parent) => {
    let projObj = projectFactory(name);
    pushProject(projObj, array);
    createProjectsMenu(array, parent);
}


export { addNewProject }