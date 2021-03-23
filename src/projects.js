// This module contains all functions related to projects.

// Factory that creates projects objects.
const projectFactory = (name) => {
    return { name: name };
}

// Function takes necessary input to create a new project.
const addNewProject = (name, array) => {
    let projObj = projectFactory(name);
    array.push(projObj);
}



export { addNewProject }


/*
    let newEle = document.createElement("li");
    newEle.innerHTML = name;
    newEle.className = 'project'
    newEle.style.cursor = 'pointer'
    const projectTasksArr = [];
    return { name, newEle, projectTasksArr };
*/