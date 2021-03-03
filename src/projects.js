// This module contains all functions related to projects.

// Factory that creates projects.
const projectFactory = (name) => {
    const newEle = document.createElement("li");
    newEle.innerHTML = name;
    newEle.style.cursor = 'pointer'
    return { name, newEle };
}

const createProjectDom = (ele, parent) => {
    parent.appendChild(ele);
}

const takeProjectInput = () => {
    
}


export { projectFactory }