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
  const projectsMenu = document.getElementById('projects-menu');
  const taskHead = document.getElementById('tasks-section');
  const menuBtn = document.getElementById('menu-btn')
  const projectsNav = document.getElementById('projects-nav')

  let menuOpen = false;


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
    if (checkExisting(newProjectInput.value)) {
      return;
    };
    removeTasks();
    // Creates project object and appends to projects array.
    addNewProject(newProjectInput.value, projectsArr);
    addStorage();
    // Adds the project to the projects menu.
    addProjectToMenu(projectsArr[projectsArr.length - 1]);
    // Sets task header as new project's name.
    removeTaskHeader();
    setTaskHeader(projectsArr[projectsArr.length - 1].name);
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
          addStorage();
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
    if (obj.completed === true) {
      newProjContainer.classList.add('completed')
    }
  };

  // Add event listener to display project name and tasks when clicked.
  const addDisplayEvent = (obj, ele) => {
    ele.addEventListener('click', function () {
      let savedArr = JSON.parse(localStorage.getItem('todo-list'));
      for (let i = 0; i < savedArr.length; i++) {
        if (savedArr[i].name === obj.name) {
          removeTaskHeader();
          setTaskHeader(savedArr[i].name);
          populateTasks(savedArr[i]);
        }
      }
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

  // Adds a general tasks project to the projects array.
  const addGeneral = () => {
    addNewProject('General', projectsArr);
    addStorage();
    let newestProj = projectsArr[projectsArr.length - 1];
    addProjectToMenu(newestProj);
    setTaskHeader(newestProj.name);
    document.querySelector('.proj-finish-container').style.display = 'none';
  }


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
    setCompleteEvent(completeEle, obj);
    setDeleteEvent(deleteEle, obj);
  };

  // Adds event listener on project complete button.
  const setCompleteEvent = (ele, projObj) => {
    ele.addEventListener('click', (e) => {
      e.stopPropagation();
      // Toggles class name 'completed' to the parent element.
      ele.parentElement.parentElement.classList.toggle('completed');
      // Toggles bool of project objects property 'completed' which is saved to local storage.
      projectsArr.forEach((proj) => {
        if (proj.name === projObj.name) {
          if (proj.completed === true) {
            proj.completed = false;
          } else if (proj.completed === false) {
            proj.completed = true;
          }
        }
      })
      addStorage();
    });
  };

  // Add an event listener on 'delete' button.
  const setDeleteEvent = (ele, obj) => {
    ele.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Are you sure you want to delete this project?')) {
        deleteProjectObj(obj);
        ele.parentElement.parentElement.remove();
        addStorage();
      } else {
        return;
      }
    });
  };

  // Delete project object from projectsArr.
  const deleteProjectObj = (obj) => {
    projectsArr.forEach((o) => {
      if (o.name === obj.name) {
        projectsArr.splice(projectsArr.indexOf(o), 1);
        let taskHeader = document.querySelector('.tasks-header');
        // If there is no task header, therefore no tasks display, return.
        if (!taskHeader) {
          return;
        }
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
    // Sort project task array items by date.
    sortTasks(project);
    // Creates and appends elements from projects task objects to task section.
    createTasksMenu(project, taskList);
    addTaskFinish(project.name);
  };

  // Removes tasks elements.
  const removeTasks = () => {
    let taskList = document.getElementById('tasks-list');
    while (taskList.firstChild) {
      taskList.removeChild(taskList.lastChild);
    }
  };

  // Checks for proper input length, returns true if the input value is > 0.
  const checkLength = (nameValue) => {
    if (nameValue.length < 1) {
      alert('Please enter a name');
      return false;
    } else {
      return true;
    }
  }

  // Check for existing project of the same name.
  const checkExisting = (nameValue) => {
    for (let i = 0; i < projectsArr.length; i++) {
      if (nameValue === projectsArr[i].name) {
        alert('Project already exists');
        return true;
      }
    }
  }

  // Converts HTML time value to meridian time.
  const toMeridian = (time) => {
    if (time === '') {
      return '';
    } else {
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
  }
  
  // Add task finish functionality
  const addTaskFinish = (proj) => {
    // Task delete button deletes task element from task list and task object from project.
    let deleteBtnEle = document.querySelectorAll('.task-delete');
    for (let i = 0; i < deleteBtnEle.length; i++) {
      deleteBtnEle[i].addEventListener('click', function() {
        let task = this.parentElement.parentElement;
        let taskName = task.id;
        // Find correct project object.
        projectsArr.forEach((obj) => {
          if (obj.name === proj) {
            // Find correct task object.
            obj.projectTasksArr.forEach((taskObj) => {
              let delIndex;
              if (taskObj.name === taskName) {
                delIndex = obj.projectTasksArr.indexOf(taskObj);
                obj.projectTasksArr.splice(delIndex, 1);
                addStorage();
              }
            })
          }
        })
        task.remove();
      })
    }
    // Task complete button toggles class name.
    let completeBtnEle = document.querySelectorAll('.task-complete');
    for (let x = 0; x < completeBtnEle.length; x++) {
      completeBtnEle[x].addEventListener('click', function() {
        let workingTask = completeBtnEle[x].parentElement.parentElement;
        workingTask.classList.toggle('completed')
        projectsArr.forEach((obj) => {
          if (obj.name === proj) {
            obj.projectTasksArr.forEach((taskObj) => {
              if (taskObj.name === workingTask.id) {
                if (taskObj.completed === false) {
                  taskObj.completed = true;
                } else if (taskObj.completed === true) {
                  taskObj.completed = false;
                }
                console.log(taskObj.completed);
                addStorage();
              }
            })
          }
        })
      })
    }
  }

  
  // Sets projectsArr to localStorage
  //TODO: anywhere a new project or task is created or added, 
  // addStorage needs to be run to set projectsArr to local storage.
  const addStorage = () => {
    localStorage.setItem('todo-list', JSON.stringify(projectsArr));
  }

   // Checks local storage for any saved projects data.
  const checkStorage = () => {
    if (localStorage.getItem('todo-list')) {
      console.log('loading storage');
      let savedProjectsArr = JSON.parse(localStorage.getItem('todo-list'))
      savedProjectsArr.forEach((obj) => {
        addProjectToMenu(obj);
      })
      setTaskHeader(savedProjectsArr[0].name);
      populateTasks(savedProjectsArr[0]);
      return JSON.parse(localStorage.getItem('todo-list'));
    } else {
      console.log('creating storage');
      return [];
    }
  }

  //localStorage.clear()
  const projectsArr = checkStorage();


  if (projectsArr.length === 0) {
    addGeneral();
    console.log('added general')
  }

  //PEOJECTS MENU FUNCTIONALITY

  //Toggles projects menu display.
  menuBtn.addEventListener('click', function() {
    console.log('display projects menu')
    menuBtn.classList.toggle('menu-clicked')
    if (window.getComputedStyle(projectsNav, null).display === 'none') {
      projectsNav.style.display = 'block';
    } else {
      projectsNav.style.display = 'none';
    }
  })

  // Sets menu button class on click.
  menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
      menuBtn.classList.add('open');
      menuOpen = true;
    } else {
      menuBtn.classList.remove('open');
      menuOpen = false;
    }
  }) 

  // Show projects nav menu if screen size allows.
  window.addEventListener('resize', function(e) {
    if (document.body.clientWidth >= 962) {
      projectsNav.style.display = 'block';
      // Check if menuBtn was left open, and if so, remove 'open' class name.
      if (menuBtn.classList[1] === 'open') {
        menuBtn.classList.remove('open');
        menuOpen = false;
        menuBtn.classList.remove('menu-clicked');
      }
    } else {
      projectsNav.style.display = 'none';
      menuBtn.classList.remove('open');
      menuOpen = false;
      menuBtn.classList.remove('menu-clicked');
    }
  })

};

// SORTING TASKS LIST BY DATE

// Take project, sort projects tasks array, return the sorted project.
const sortTasks = (project) => {
  let newOrder = project.projectTasksArr.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  })
  return newOrder
}





export { displayDOM };
