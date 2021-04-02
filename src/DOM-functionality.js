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
  const taskNotes = document.getElementById('newTaskNotes')
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
    if (!checkLength(newProjectInput.value)) {
      return;
    };
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
    if (!checkLength(taskName.value)) {
      return;
    };
    if (checkCreatedProject()) {
      removeTasks();
      let meridianTime = toMeridian(taskTime.value);
      let newTaskObj = taskFactory(taskName.value, taskDate.value, meridianTime, taskNotes.value);
      let currentProject = document.querySelector('.tasks-header').innerHTML;
      // Find current projects object in projectsArr.
      for (let i = 0; i < projectsArr.length; i++) {
        if (projectsArr[i].name === currentProject) {
          // Add new task object to current project array of task objects.
          projectsArr[i].projectTasksArr.push(newTaskObj);
          // Re-creates current projects task list.
          populateTasks(projectsArr[i]);
          break;
        }
      }
    }
    displayNone(tasksModal);
    taskForm.reset();
  });

  // Add a new project to the projects menu.
  const addProjectToMenu = (obj) => {
    let newProjContainer = document.createElement('li');
    let newProj = document.createElement('div');
    newProj.className = 'project-text';
    newProj.innerHTML = obj.name;
    newProjContainer.className = 'project';
    newProjContainer.appendChild(newProj);
    projectsMenu.appendChild(newProjContainer);
    addProjectFinish(newProjContainer, obj);
    addDisplayEvent(obj, newProjContainer);
    obj.element = newProjContainer;
  };

  // Add event listener to display project name when clicked.
  const addDisplayEvent = (obj, ele) => {
    ele.addEventListener('click', function () {
      removeTaskHeader();
      setTaskHeader(obj.name);
      populateTasks(obj);
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

  // COMPLETE AND DELETE BUTTON FUNCTIONALITY FOR PROJECTS

  const addProjectFinish = (parentEle, obj) => {
    let completeEle = document.createElement('button');
    completeEle.innerHTML = '&#10003';
    completeEle.className = 'proj-btn';
    completeEle.id = 'complete-btn';
    let deleteEle = document.createElement('button');
    deleteEle.innerHTML = '&#8722';
    deleteEle.className = 'proj-btn';
    deleteEle.id = 'delete-btn';
    let finishContainer = document.createElement('div');
    finishContainer.className = 'proj-finish-container';
    parentEle.appendChild(finishContainer);
    finishContainer.appendChild(completeEle);
    finishContainer.appendChild(deleteEle);
    setCompleteEvent(completeEle);
    setDeleteEvent(deleteEle, obj);
  };

  // Add an event listener on the 'complete' button.
  // TODO: Add necessary code related to a complete event.
  const setCompleteEvent = (ele) => {
    ele.addEventListener('click', function () {
      ele.parentElement.parentElement.classList.toggle('completed');
    });
  };

  // Add an event listener on 'delete' button.
  const setDeleteEvent = (ele, obj) => {
    ele.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Are you sure you want to delete this project?')) {
        deleteProjectObj(obj);
        ele.parentElement.parentElement.remove();
      } else {
        return;
      }
    });
  };

  // Delete project object from projectsArr.
  const deleteProjectObj = (obj) => {
    // Local scope taskHeader.
    let taskHeader = document.querySelector('.tasks-header');
    projectsArr.forEach(function (o) {
      if (o === obj) {
        projectsArr.splice(projectsArr.indexOf(o), 1);
        // Check if removed project is currently displayed, and if so remove it.
        if (o.name === taskHeader.innerHTML) {
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
  const populateTasks = (project) => {
    removeTasks();
    let taskList = document.getElementById('tasks-list');
    let projectInx = projectsArr.indexOf(project);
    // Creates and appends elements from projects task objects to task section.
    createTasksMenu(projectsArr[projectInx], taskList);
  };

  // Removes tasks elements.
  const removeTasks = () => {
    let taskList = document.getElementById('tasks-list');
    while (taskList.firstChild) {
      taskList.removeChild(taskList.lastChild);
    }
  };

  //Checks for proper input length, returns true if the input value is > 0.
  const checkLength = (nameValue) => {
    if (nameValue.length < 1) {
      alert('Please enter a name');
      return false;
    } else {
      return true;
    }
  }

  // Converts HTML time value to meridian time.
  const toMeridian = (time) => {
    let timeSplit = time.split(':');
    let hour = timeSplit[0];
    let minute = timeSplit[1];
    let meridian = '';
    if (hour > 12) {
      meridian = 'PM';
      return (hour - 12 + ':' + minute + ' ' + meridian);
    } else {
      meridian = 'AM';
      return (hour + ':' + minute + ' ' + meridian);
    }
  }
};

export { displayDOM };
