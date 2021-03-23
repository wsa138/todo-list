// Contains functions that access and manipulate the DOM.

import { format } from 'date-fns';
import { addNewProject } from './projects.js';
import { taskFactory, createTasksMenu } from './tasks.js';

function displayDOM() {

  // DOCUMENT REFERENCES
  const dateHeader = document.getElementById('date');
  const addProject = document.getElementById('addProject');
  const projectsModal = document.querySelector('.projects-modal');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const tasksModal = document.querySelector('.tasks-modal');
  const close = document.getElementsByClassName('close-btn');
  const projSubmit = document.getElementById('proj-submit-btn');
  const projectForm = document.getElementById('project-form');
  const newProjectInput = document.getElementById('newProject');
  const taskSubmit = document.getElementById('task-submit-btn');
  const taskForm = document.getElementById('task-form');
  const taskName = document.getElementById('newTaskName');
  const taskDate = document.getElementById('newTaskDate');
  const taskTime = document.getElementById('newTaskTime');
  const taskList = document.getElementById('tasks-list');
  const projectsMenu = document.getElementById('projects-menu');
  const taskHead = document.getElementById('tasks-section');

  // Array containing all the projects created and saved to storage.
  const projectsArr = [];

  // Sets the current date at the top of the page.
  const formattedDate = format(new Date(), 'EEEE MM/dd/yyyy');
  dateHeader.innerHTML = `${formattedDate}`;

  // PROJECT AND TASK MODAL EVENT LISTENERS

  // Click event displays projects modal.
  addProject.addEventListener('click', function () {
    changeDisplay(projectsModal, 'flex');
  });

  // Click event displays task modal.
  addTaskBtn.addEventListener('click', function () {
    changeDisplay(tasksModal, 'flex');
  });

  // Click event closes projects and tasks modal.
  let allClose = Array.from(close);
  allClose.forEach(function (ele) {
    ele.addEventListener('click', function () {
      displayNone(projectsModal);
      displayNone(tasksModal);
    });
  });

  // Handles submit button event for 'Add Project'.
  projSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    removeTasks();
    // Creates project object and appends to projects array.
    addNewProject(newProjectInput.value, projectsArr);
    // Adds the project to the projects menu.
    let newestProj = projectsArr[projectsArr.length - 1];
    addProjectToMenu(newestProj);
    // Sets task header as new project's name.
    removeTaskHeader();
    setTaskHeader(newProjectInput.value);
    displayNone(projectsModal);
    projectForm.reset();
  });

  // On task modal submit, creates task object and appends it to the current
  // projects array of task objects, and recreates the task menu.
  taskSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    if (checkCreatedProject()) {
      removeTasks();
      let newTaskObj = taskFactory(taskName.value, taskDate.value, taskTime.value);
      let currentProject = document.querySelector('.tasks-header').innerHTML;
      // Find current projects object in projectsArr.
      for (let i = 0; i < projectsArr.length; i++) {
        if (projectsArr[i].name === currentProject) {
          // Add new task object to current project array of task objects.
          projectsArr[i].projectTasksArr.push(newTaskObj);
          // Re-creates current projects task list.
          createTasksMenu(projectsArr[i], taskList);
          break;
        }
      }
    }
    displayNone(tasksModal);
    taskForm.reset();
  });

  // Add a new project to the projects menu.
  const addProjectToMenu = (obj) => {
    let newEle = document.createElement('li');
    newEle.innerHTML = obj.name;
    newEle.className = 'project';
    projectsMenu.appendChild(newEle);
    addFinishButtons(newEle);
    addDisplayEvent(obj.name, newEle);
  };

  // Add event listener to display project name when clicked.
  const addDisplayEvent = (name, ele) => {
    ele.addEventListener('click', function () {
      removeTaskHeader();
      setTaskHeader(name);
      populateTasks(name);
    });
  };

  // Function changes an elements display value to 'none'.
  const displayNone = (element) => {
    element.style.display = 'none';
  };

  // Function changes an elements display value to provided value.
  const changeDisplay = (element, display) => {
    element.style.display = display;
  };

  // Check if a project has been created before submitting a task.
  const checkCreatedProject = () => {
    if (projectsArr.length === 0) {
      alert('Select or create a project before adding tasks.');
      return false;
    } else {
      return true;
    }
  };

  // COMPLETE AND DELETE BUTTON FUNCTIONALITY

  const addFinishButtons = (parentEle) => {
    let completeEle = document.createElement('button');
    completeEle.innerHTML = '&#10003';
    completeEle.className = 'proj-btn';
    completeEle.id = 'complete-btn';
    let deleteEle = document.createElement('button');
    deleteEle.innerHTML = '&#8722;';
    deleteEle.className = 'proj-btn';
    deleteEle.id = 'delete-btn';
    parentEle.appendChild(completeEle);
    parentEle.appendChild(deleteEle);
    setCompleteEvent(completeEle);
    setDeleteEvent(deleteEle);
  };

  // Add an event listener on the 'complete' button.
  // TODO: Add necessary code related to a complete event.
  const setCompleteEvent = (ele) => {
    ele.addEventListener('click', function () {
      ele.parentElement.style.backgroundColor = 'green';
    });
  };

  // Add an event listener on 'delete' button.
  const setDeleteEvent = (ele) => {
    ele.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Are you sure you want to delete this project?')) {
        deleteProjectObj(ele.parentElement.innerText);
        ele.parentElement.remove();
      } else {
        return;
      }
    });
  };

  // Delete project object from projectsArr.
  const deleteProjectObj = (eleText) => {
    // Local scope taskHeader.
    let taskHeader = document.querySelector('.tasks-header');
    projectsArr.forEach(function (obj) {
      if (obj.newEle.innerText === eleText) {
        projectsArr.splice(projectsArr.indexOf(obj), 1);
        // Checks if removed project is currently displayed, and if so removes it.
        if (obj.name === taskHeader.innerHTML) {
          taskHeader.remove();
          removeTasks();
        }
      }
    });
  };

  // TASK SECTION FUNCTIONALITY

  // Remove the task section header only if it is a project name(H2 element).
  const removeTaskHeader = () => {
    if (taskHead.childNodes[0].tagName === 'H2') {
      taskHead.removeChild(taskHead.childNodes[0]);
    }
  }

  // Set new task section header.
  const setTaskHeader = (projectName) => {
    let newTaskHeader = document.createElement('h2');
    newTaskHeader.className = 'tasks-header';
    newTaskHeader.innerHTML = projectName;
    taskHead.prepend(newTaskHeader);
  }

  // Finds project object with corresponding project name.
  const populateTasks = (projectName) => {
    removeTasks();
    let taskList = document.getElementById('tasks-list');
    for (let i = 0; i < projectsArr.length; i++) {
      if (projectsArr[i].name === projectName) {
        // Creates and appends elements from projects task objects to task section.
        createTasksMenu(projectsArr[i], taskList);
      }
    }
  };

  // Removes tasks elements.
  const removeTasks = () => {
    let taskList = document.getElementById('tasks-list');
    while (taskList.firstChild) {
      taskList.removeChild(taskList.lastChild);
    }
  };
};

export { displayDOM };
