// This module will contain factory functions to create projects and to do items.

const projectFactory = (name) => {
    const newEle = document.createElement("li");
    newEle.innerHTML = name;
    newEle.style.cursor = 'pointer'
    return { name, newEle };
}

const createProjectDom = (ele, parent) => {
    parent.appendChild(ele);
}

export { projectFactory, createProjectDom }