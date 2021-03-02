// This module will contain factory functions to create projects and to do items.


function projects() {
    const projectFactory = (name) => {
        const newEle = document.createElement("li");
        newEle.innerHTML = name;
        newEle.style.cursor = 'pointer'
        return { name, newEle };
    }

    const createProjectDom = (ele, parent) => {
        parent.appendChild(ele);
    }

    // Projects menu element.
    const projectsMenu = document.getElementById('projects-menu');

    // Array containing all the projects created and saved to storage.
    const projectsArr = [];

    // Iterate through allProjects and create DOM elements.
    projectsArr.forEach(function(ele) {
        createProjectDom(ele.newEle, projectsMenu);
    })

    // Event listener for add project button.
    const addProject = document.getElementById('addProject')
    addProject.addEventListener("click", function() {
        console.log('Clicked "Add Project"');
    })

    // Event listener for "Add Project" button
    const addProjectBtn = document.getElementById("addProject");
    addProjectBtn.addEventListener("click", function() {
        alert("adding new project")
    })
}

export { projects };
