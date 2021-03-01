// This module will contain factory functions to create projects and to do items.

function testAddProject(text, parentEle) {
    const temp = document.createElement('li');
    temp.innerHTML = text;
    parentEle.appendChild(temp);
}

export { testAddProject }