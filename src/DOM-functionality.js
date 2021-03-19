// Contains functions that access and manipulate the DOM.

import { format } from 'date-fns';
import { addNewProject } from './projects.js';
import { taskFactory, addTaskProject, createTasksMenu } from './tasks.js';

function displayDOM() {
  // Document references:
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

  // Set the current date at the top of the page.
  const formattedDate = format(new Date(), 'EEEE MM/dd/yyyy');
  dateHeader.innerHTML = `${formattedDate}`;

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
      let dateTime = `${taskDate.value} ${taskTime.value}`;
      let newTaskObj = taskFactory(taskName.value, dateTime);
      let currentProject = document.querySelector('.tasks-header').innerHTML;
      // Find current projects object in projectsArr.
      for (let i = 0; i < projectsArr.length; i++) {
        if (projectsArr[i].name === currentProject) {
          // Add new task object to current project array of task objects.
          addTaskProject(projectsArr[i].projectTasksArr, newTaskObj);
          // Re-creates current projects task list.
          createTasksMenu(projectsArr[i], taskList);
          break;
        }
      }
    }
    displayNone(tasksModal);
    taskForm.reset();
  });


  // Document elements
  const projectsMenu = document.getElementById('projects-menu');
  const taskHead = document.getElementById('tasks-section');

  // Array containing all the projects created and saved to storage.
  const projectsArr = [];

  // Add a new project to the projects menu.
  const addProjectToMenu = (obj) => {
    projectsMenu.appendChild(obj.newEle);
    addFinishButtons(obj.newEle);
    addDisplayEvent(obj.name, obj.newEle);
  };
  // Add event listener to display project name when clicked.
  const addDisplayEvent = (name, ele) => {
    ele.addEventListener('click', function () {
      removeTaskHeader();
      setTaskHeader(name);
      populateTasks(name);
    });
  };

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

  // COMPLETE AND DELETE FUNCTIONALITY

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
    projectsArr.forEach(function (obj) {
      if (obj.newEle.innerText === eleText) {
        projectsArr.splice(projectsArr.indexOf(obj), 1);
        document.querySelector('.tasks-header').remove();
      }
    });
  };

  // TASK SECTION FUNCTIONALITY

  // Remove the task section header.
  const removeTaskHeader = () => {
    taskHead.removeChild(taskHead.childNodes[0]);
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
