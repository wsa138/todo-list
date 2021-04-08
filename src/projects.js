// This module contains all functions related to projects.

// Factory that creates projects objects.
const projectFactory = (name) => {
    return { 
        name: name,
        projectTasksArr: [],
        completed: false
    };
}

// Function takes necessary input to create a new project.
const addNewProject = (name, array) => {
    let projObj = projectFactory(name);
    array.push(projObj);
}



export { addNewProject }
