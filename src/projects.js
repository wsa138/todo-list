// This module contains all functions related to projects.

import { createTasksMenu } from './tasks.js'

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

// Takes an array of project objects and creates an element appended to parent. 
const createProjectsMenu = (array, parent) => {
    array.forEach(function(obj) {
        parent.appendChild(obj.newEle);
        //FIXME: Break up this function.
        obj.newEle.addEventListener('click', function() {
            displayProject(array, obj.newEle.innerHTML)
        })
    })
}

// Finds project name in an array of projects and populates task section with its tasks.
const populateTasks = (array, projectName) => {
    removeTasks();
    let taskList = document.getElementById('tasks-list');
    for (let i = 0; i < array.length; i++) {
        if (array[i].name === projectName) {
            createTasksMenu(array[i], taskList)
        }
    }
}

// Task section that project header element is added to.
let taskHead = document.getElementById('tasks-section')
// When project selected, shows project name above task list. 
// FIXME: Function should also display all tasks of a project.
const displayProject = (array, projectName) => {
    taskHead.removeChild(taskHead.childNodes[0]);
    let taskHeader = document.createElement('h2');
    taskHeader.className = 'tasks-header';
    taskHeader.innerHTML = projectName;
    taskHead.prepend(taskHeader);
    populateTasks(array, projectName);
}

// Function takes necessary input to create a new project.
const addNewProject = (name, array, parent) => {
    let projObj = projectFactory(name);
    pushProject(projObj, array);
    createProjectsMenu(array, parent);
    displayProject(array, name)
}

// Removes tasks elements.
const removeTasks = () => {
    let taskList = document.getElementById('tasks-list');
    while (taskList.firstChild) {
        taskList.removeChild(taskList.lastChild);
    }
}


export { addNewProject, removeTasks }