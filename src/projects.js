// This module contains all functions related to projects.

// Factory that creates projects.
const projectFactory = (name) => {
    const newEle = document.createElement("li");
    newEle.innerHTML = name;
    newEle.style.cursor = 'pointer'
    return { name, newEle };
}


// Function takes an array, promps for input, and stores the project in array.
const takeProjectInput = (holdingArr) => {
    let projectName = prompt('Enter project name');
    let newProject = projectFactory(projectName);
    holdingArr.push(newProject)
    console.log(holdingArr);
}

// Takes an array of project objects and creates an element appended to parent. 
const createProjectsMenu = (array, parent) => {
    array.forEach(function(obj) {
        parent.appendChild(obj.newEle);
    })
}


export { projectFactory, takeProjectInput, createProjectsMenu }