/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modal-controls.js":
/*!*******************************!*\
  !*** ./src/modal-controls.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _project_creation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project-creation */ "./src/project-creation.js");
/* harmony import */ var _project_task_logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-task-logic */ "./src/project-task-logic.js");
/* harmony import */ var _task_creation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task-creation */ "./src/task-creation.js");
/* eslint-disable radix */




const validityCheck = (input) => input.validity.valid;

// Create open/close controls for all modals
const modalControls = () => {
  const addNewProject = document.getElementById("new-project");
  const projectModal = document.querySelector(".project-modal");
  const projectEditModal = document.querySelector(".project-edit-modal");
  const taskModal = document.querySelector(".task-modal");
  const taskEditModal = document.querySelector(".task-edit-modal");
  const projectCloseButton = document.querySelector(".project-close-button");
  const projectEditCloseButton = document.querySelector(
    ".project-edit-close-button"
  );
  const taskCloseButton = document.querySelector(".task-close-button");
  const taskEditCloseButton = document.querySelector(".task-edit-close-button");
  const projectSubmitButton = document.getElementById("project-submit-button");
  const taskSubmitButton = document.getElementById("task-submit-button");

  addNewProject.addEventListener("click", () => {
    document.getElementById("project-form").reset();
    projectModal.style.visibility = "visible";
  });

  projectCloseButton.addEventListener("click", () => {
    projectModal.style.visibility = "hidden";
  });

  projectEditCloseButton.addEventListener("click", () => {
    projectEditModal.style.visibility = "hidden";
  });

  taskCloseButton.addEventListener("click", () => {
    taskModal.style.visibility = "hidden";
  });

  taskEditCloseButton.addEventListener("click", () => {
    taskEditModal.style.visibility = "hidden";
  });

  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
      projectModal.style.visibility = "hidden";
    }
  });

  projectEditModal.addEventListener("click", (event) => {
    if (event.target === projectEditModal) {
      projectEditModal.style.visibility = "hidden";
    }
  });

  taskModal.addEventListener("click", (event) => {
    if (event.target === taskModal) {
      taskModal.style.visibility = "hidden";
    }
  });

  taskEditModal.addEventListener("click", (event) => {
    if (event.target === taskEditModal) {
      taskEditModal.style.visibility = "hidden";
    }
  });

  projectSubmitButton.addEventListener("click", () => {
    const projectModalInputs = Array.from(
      projectModal.querySelectorAll("input")
    );
    if (projectModalInputs.every(validityCheck)) {
      (0,_project_creation__WEBPACK_IMPORTED_MODULE_0__["default"])();
      projectModal.style.visibility = "hidden";
    }
  });

  taskSubmitButton.addEventListener("click", () => {
    const taskModalInputs = Array.from(taskModal.querySelectorAll("input"));
    if (taskModalInputs.every(validityCheck)) {
      const todoItemsContainer = document.querySelector(".todo-items");
      const project =
        _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[parseInt(todoItemsContainer.getAttribute("data-project"))];
      (0,_task_creation__WEBPACK_IMPORTED_MODULE_2__.createNewTask)(project);
      taskModal.style.visibility = "hidden";
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalControls);


/***/ }),

/***/ "./src/project-components.js":
/*!***********************************!*\
  !*** ./src/project-components.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createOverdueTasksCount": () => (/* binding */ createOverdueTasksCount),
/* harmony export */   "createProjectCompletion": () => (/* binding */ createProjectCompletion)
/* harmony export */ });
/* harmony import */ var _project_task_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project-task-logic */ "./src/project-task-logic.js");
/* eslint-disable radix */


// Add project completion status
const createProjectCompletion = (project, dueToday) => {
  const oldCompletion = /\(\d*\/\d*\)/;
  if (project) {
    const tasks =
      _project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard[parseInt(project.getAttribute("data-project"))].length;
    const completedTasks = parseInt(project.getAttribute("data-completed"));
    let title = project.querySelector(".sidebar-item-title").textContent;
    const completionIndex = title.search(oldCompletion) - 1;
    title = title.substring(0, completionIndex);
    title = `${title} (${completedTasks}/${tasks})`;
    // eslint-disable-next-line no-param-reassign
    project.querySelector(".sidebar-item-title").textContent = title;
  }
  if (dueToday) {
    const dueTodayElement = document.querySelector(".sidebar-item-today");
    let dueTodayTitle = dueTodayElement.querySelector(
      ".sidebar-item-title"
    ).textContent;
    const dueTodayTasks = parseInt(dueTodayElement.getAttribute("data-tasks"));
    const dueTodayCompletedTasks = parseInt(
      dueTodayElement.getAttribute("data-completed")
    );
    const dueTodayCompletionIndex = dueTodayTitle.search(oldCompletion) - 1;
    dueTodayTitle = dueTodayTitle.substring(0, dueTodayCompletionIndex);
    dueTodayTitle = `${dueTodayTitle} (${dueTodayCompletedTasks}/${dueTodayTasks})`;
    dueTodayElement.querySelector(".sidebar-item-title").textContent =
      dueTodayTitle;
  }
};

const createOverdueTasksCount = () => {
  const oldCount = /\(\d*\)/;
  const overdueElement = document.querySelector(".sidebar-item-overdue");
  let overdueTitle = overdueElement.querySelector(
    ".sidebar-item-title"
  ).textContent;
  const overdueTasks = parseInt(overdueElement.getAttribute("data-tasks"));
  const overdueTaskCountIndex = overdueTitle.search(oldCount) - 1;
  overdueTitle = overdueTitle.substring(0, overdueTaskCountIndex);
  overdueTitle = `${overdueTitle} (${overdueTasks})`;
  overdueElement.querySelector(".sidebar-item-title").textContent =
    overdueTitle;
};




/***/ }),

/***/ "./src/project-creation.js":
/*!*********************************!*\
  !*** ./src/project-creation.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _project_task_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project-task-logic */ "./src/project-task-logic.js");
/* harmony import */ var _project_task_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-task-components */ "./src/project-task-components.js");



const createAddNewProjectElement = () => {
  const sidebarItems = document.querySelector(".sidebar-items");
  const oldAddNewProjectElement = document.getElementById("new-project");
  oldAddNewProjectElement.remove();
  const newAddNewProjectElement = document.createElement("div");
  newAddNewProjectElement.classList.add("sidebar-item-add");
  newAddNewProjectElement.setAttribute("id", "new-project");
  newAddNewProjectElement.setAttribute("role", "button");
  const newAddNewProjectElementTitle = document.createElement("div");
  newAddNewProjectElementTitle.textContent = "+ Add New Project";
  newAddNewProjectElement.appendChild(newAddNewProjectElementTitle);
  sidebarItems.appendChild(newAddNewProjectElement);

  const projectModal = document.querySelector(".project-modal");
  newAddNewProjectElement.addEventListener("click", () => {
    document.getElementById("project-form").reset();
    projectModal.style.visibility = "visible";
  });
};

const createNewProjectElement = (title) => {
  const sidebarItems = document.querySelector(".sidebar-items");
  const newProjectElement = document.createElement("div");
  newProjectElement.classList.add("sidebar-item");
  newProjectElement.classList.add("item");
  newProjectElement.setAttribute("data-project", _project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard.length - 1);
  newProjectElement.setAttribute("data-completed", 0);
  const newProjectElementTitle = document.createElement("div");
  newProjectElementTitle.classList.add("sidebar-item-title");
  newProjectElementTitle.textContent = `${title} (0/0)`;
  newProjectElement.appendChild(newProjectElementTitle);
  sidebarItems.appendChild(newProjectElement);

  (0,_project_task_components__WEBPACK_IMPORTED_MODULE_1__.addEditButtons)();

  newProjectElementTitle.addEventListener("click", () => {
    const tasks = document.querySelector(".todo-items");
    const projectNumber = newProjectElement.getAttribute("data-project");
    tasks.setAttribute("data-project", projectNumber);
    tasks.replaceChildren();
    (0,_project_task_components__WEBPACK_IMPORTED_MODULE_1__.resetTodoList)(projectNumber);
  });
};

const createNewProject = () => {
  const title = document.getElementById("project-name").value;
  (0,_project_task_logic__WEBPACK_IMPORTED_MODULE_0__.newProject)();
  createNewProjectElement(title);
  createAddNewProjectElement();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createNewProject);


/***/ }),

/***/ "./src/project-task-components.js":
/*!****************************************!*\
  !*** ./src/project-task-components.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addEditButtons": () => (/* binding */ addEditButtons),
/* harmony export */   "createDropdownHider": () => (/* binding */ createDropdownHider),
/* harmony export */   "editFunctionality": () => (/* binding */ editFunctionality),
/* harmony export */   "resetTodoList": () => (/* binding */ resetTodoList)
/* harmony export */ });
/* harmony import */ var _icons_dots_vertical_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons/dots-vertical.svg */ "./src/icons/dots-vertical.svg");
/* harmony import */ var _project_task_logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-task-logic */ "./src/project-task-logic.js");
/* harmony import */ var _task_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task-components */ "./src/task-components.js");
/* harmony import */ var _task_creation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./task-creation */ "./src/task-creation.js");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./time */ "./src/time.js");
/* harmony import */ var _project_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./project-components */ "./src/project-components.js");
/* eslint-disable radix */







const validityCheck = (input) => input.validity.valid;

// Create event listeners to hide the dropdown menus when other stuff is clicked on
const createDropdownHider = () => {
  window.addEventListener("click", (event) => {
    if (
      !event.target.matches(".dropdown-content") &&
      !event.target.matches(".edit-button")
    ) {
      const dropdowns = document.querySelectorAll(".dropdown-content");
      dropdowns.forEach((dropdown) => {
        // eslint-disable-next-line no-param-reassign
        dropdown.style.visibility = "hidden";
      });
    }
  });
};

const resetTodoList = (projectNumber) => {
  const tasks = document.querySelector(".todo-items");
  tasks.replaceChildren();
  _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectNumber].forEach((task) => {
    const taskPriority = task.priority;
    const taskTitle = task.title;
    const taskDueDate = task.dueDate;
    const taskDescription = task.description;
    const taskChecked = task.checked;

    (0,_task_creation__WEBPACK_IMPORTED_MODULE_3__.createNewTaskElement)(
      taskPriority,
      taskTitle,
      taskDueDate,
      taskDescription,
      taskChecked
    );
  });
  (0,_task_creation__WEBPACK_IMPORTED_MODULE_3__.createAddNewTaskElement)();
};

// Create edit option functionality
const editFunctionality = (item) => {
  const projectNumber = parseInt(
    document.querySelector(".todo-items").getAttribute("data-project")
  );
  if (item.classList.contains("sidebar-item")) {
    const itemTitle = item.querySelector(".sidebar-item-title");
    const projectEditModal = document.querySelector(".project-edit-modal");
    const projectEditModalTitle = document.getElementById("project-name-edit");
    const projectEditModalSubmitButton = document.getElementById(
      "project-edit-submit-button"
    );
    const projectEditModalSubmitButtonClone =
      projectEditModalSubmitButton.cloneNode(true);
    projectEditModalTitle.value = itemTitle.textContent;

    projectEditModalSubmitButton.replaceWith(projectEditModalSubmitButtonClone);

    projectEditModalSubmitButtonClone.addEventListener("click", () => {
      const projectEditModalInputs = Array.from(
        projectEditModal.querySelectorAll("input")
      );
      if (projectEditModalInputs.every(validityCheck)) {
        itemTitle.textContent = projectEditModalTitle.value;
        projectEditModal.style.visibility = "hidden";
      }
    });
  } else {
    const itemPriority = item.firstChild;
    const itemTitle = item.querySelector(".todo-item-title");
    const taskToEdit =
      _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectNumber][parseInt(item.firstChild.textContent) - 1];
    const taskEditModal = document.querySelector(".task-edit-modal");
    const taskEditModalTitle = document.getElementById("task-edit");
    const taskEditModalDate = document.getElementById("due-date-edit");
    const taskEditModalPriority = document.getElementById("priority-edit");
    const taskEditModalDescription =
      document.getElementById("description-edit");
    const taskEditModalSubmitButton = document.getElementById(
      "task-edit-submit-button"
    );
    const taskEditModalSubmitButtonClone =
      taskEditModalSubmitButton.cloneNode(true);
    taskEditModalTitle.value = taskToEdit.title;
    taskEditModalDate.value = taskToEdit.dueDate;
    taskEditModalPriority.value = taskToEdit.priority;
    taskEditModalDescription.value = taskToEdit.description;

    taskEditModalSubmitButton.replaceWith(taskEditModalSubmitButtonClone);

    taskEditModalSubmitButtonClone.addEventListener("click", () => {
      const taskEditModalInputs = Array.from(
        taskEditModal.querySelectorAll("input")
      );
      if (taskEditModalInputs.every(validityCheck)) {
        taskToEdit.title = taskEditModalTitle.value;
        taskToEdit.dueDate = taskEditModalDate.value;
        taskToEdit.priority = taskEditModalPriority.value;
        taskToEdit.description = taskEditModalDescription.value;
        itemPriority.textContent = `${taskToEdit.priority}.`;
        itemTitle.textContent = taskToEdit.title;
        (0,_task_components__WEBPACK_IMPORTED_MODULE_2__["default"])(item, itemTitle, taskToEdit.description);
        taskEditModal.style.visibility = "hidden";
      }
    });
  }
};

// Add edit buttons to projects and tasks
const addEditButtons = () => {
  // Make an edit button
  const addEditButton = (item) => {
    const editButton = document.createElement("div");
    const editIcon = new Image();
    const editDropdown = document.createElement("div");
    const editOption = document.createElement("div");
    const removeOption = document.createElement("div");
    editIcon.src = _icons_dots_vertical_svg__WEBPACK_IMPORTED_MODULE_0__;
    editIcon.setAttribute("alt", "Vertical dotted line icon for edit options.");
    editIcon.setAttribute("role", "button");
    editIcon.classList.add("edit-button");
    editDropdown.classList.add("dropdown-content");
    editDropdown.style.visibility = "hidden";
    editOption.textContent = "Edit";
    editOption.classList.add("dropdown-item");
    editOption.setAttribute("id", "edit-button");
    editOption.setAttribute("role", "button");
    removeOption.textContent = "Remove";
    removeOption.classList.add("dropdown-item");
    removeOption.setAttribute("id", "remove-button");
    removeOption.setAttribute("role", "button");
    editDropdown.appendChild(editOption);
    editDropdown.appendChild(removeOption);
    editButton.classList.add("edit-button");
    editButton.classList.add("dropdown");
    editButton.appendChild(editIcon);
    editButton.appendChild(editDropdown);
    item.appendChild(editButton);

    editButton.addEventListener("click", () => {
      if (editDropdown.style.visibility === "hidden") {
        editDropdown.style.visibility = "visible";
      } else editDropdown.style.visibility = "hidden";
    });

    const projectEditModal = document.querySelector(".project-edit-modal");
    const taskEditModal = document.querySelector(".task-edit-modal");

    editOption.addEventListener("click", () => {
      const parentItem = editOption.closest(".item");
      if (parentItem.classList.contains("sidebar-item")) {
        editFunctionality(parentItem);
        projectEditModal.style.visibility = "visible";
      } else {
        editFunctionality(parentItem);
        taskEditModal.style.visibility = "visible";
      }
    });

    removeOption.addEventListener("click", () => {
      const overdue = document.querySelector(".sidebar-item-overdue");
      const dueToday = document.querySelector(".sidebar-item-today");
      const parentItem = removeOption.closest(".item");
      if (parentItem.classList.contains("sidebar-item")) {
        const projectIndex = parseInt(parentItem.getAttribute("data-project"));
        const lastProjectIndex = _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard.length - 1;
        const currentTodoListProject = parseInt(
          document.querySelector(".todo-items").getAttribute("data-project")
        );
        const currentTodoListProjectElement = document.querySelector(
          `[data-project='${currentTodoListProject}']`
        );
        parentItem.remove();
        for (let i = projectIndex + 1; i < lastProjectIndex + 1; i += 1) {
          const selectedProject = document.querySelector(
            `[data-project='${i}']`
          );
          selectedProject.setAttribute(
            "data-project",
            parseInt(selectedProject.getAttribute("data-project")) - 1
          );
        }
        _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectIndex].forEach((task) => {
          if ((0,_time__WEBPACK_IMPORTED_MODULE_4__.isOverdue)(task.dueDate) && !task.checked) {
            overdue.setAttribute(
              "data-tasks",
              parseInt(overdue.getAttribute("data-tasks")) - 1
            );
            (0,_project_components__WEBPACK_IMPORTED_MODULE_5__.createOverdueTasksCount)();
          }
          if ((0,_time__WEBPACK_IMPORTED_MODULE_4__.isToday)(task.dueDate)) {
            if (task.checked)
              dueToday.setAttribute(
                "data-completed",
                parseInt(dueToday.getAttribute("data-completed")) - 1
              );
            dueToday.setAttribute(
              "data-tasks",
              parseInt(dueToday.getAttribute("data-tasks")) - 1
            );
            (0,_project_components__WEBPACK_IMPORTED_MODULE_5__.createProjectCompletion)(false, true);
          }
        });
        _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard.splice(projectIndex, 1);
        if (projectIndex === currentTodoListProject) {
          const clickEvent = new Event("click");
          overdue.dispatchEvent(clickEvent);
        } else
          document
            .querySelector(".todo-items")
            .setAttribute(
              "data-project",
              parseInt(
                currentTodoListProjectElement.getAttribute("data-project")
              )
            );
      } else {
        const projectIndex = parseInt(
          document.querySelector(".todo-items").getAttribute("data-project")
        );
        const project = document.querySelector(
          `[data-project='${projectIndex}']`
        );
        let index = parentItem.firstChild.textContent.indexOf(".");
        index =
          parseInt(parentItem.firstChild.textContent.substring(0, index)) - 1;
        const lastTaskIndex = _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectIndex].length - 1;
        const task = _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectIndex][index];
        if (
          parentItem.nextSibling.classList.contains("todo-item-description")
        ) {
          parentItem.nextSibling.remove();
        }
        parentItem.remove();
        for (let i = index + 1; i < lastTaskIndex + 1; i += 1) {
          _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectIndex][i].priority -= 1;
        }
        project.setAttribute(
          "data-tasks",
          parseInt(project.getAttribute("data-tasks")) - 1
        );
        if (task.checked)
          project.setAttribute(
            "data-completed",
            parseInt(project.getAttribute("data-completed")) - 1
          );
        if ((0,_time__WEBPACK_IMPORTED_MODULE_4__.isOverdue)(task.dueDate) && !task.checked) {
          overdue.setAttribute(
            "data-tasks",
            parseInt(overdue.getAttribute("data-tasks")) - 1
          );
          (0,_project_components__WEBPACK_IMPORTED_MODULE_5__.createOverdueTasksCount)();
        }
        if ((0,_time__WEBPACK_IMPORTED_MODULE_4__.isToday)(task.dueDate)) {
          if (task.checked)
            dueToday.setAttribute(
              "data-completed",
              parseInt(dueToday.getAttribute("data-completed")) - 1
            );
          dueToday.setAttribute(
            "data-tasks",
            parseInt(dueToday.getAttribute("data-tasks")) - 1
          );
          (0,_project_components__WEBPACK_IMPORTED_MODULE_5__.createProjectCompletion)(project, true);
        } else (0,_project_components__WEBPACK_IMPORTED_MODULE_5__.createProjectCompletion)(project, false);
        _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectIndex].splice(index, 1);
        resetTodoList(projectIndex);
      }
    });
  };

  // Remove all edit buttons and then make an edit button for every project and task
  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((editButton) => editButton.remove());
  const testItems = document.querySelectorAll(".sidebar-item");
  const testItems2 = document.querySelectorAll(".todo-item");
  testItems.forEach((testItem) => addEditButton(testItem));
  testItems2.forEach((testItem) => addEditButton(testItem));
};




/***/ }),

/***/ "./src/project-task-logic.js":
/*!***********************************!*\
  !*** ./src/project-task-logic.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dashboard": () => (/* binding */ dashboard),
/* harmony export */   "newProject": () => (/* binding */ newProject),
/* harmony export */   "newTask": () => (/* binding */ newTask)
/* harmony export */ });
const dashboard = [];

const newProject = () => {
  dashboard.push([]);
};

const newTask = (
  project,
  title,
  dueDate,
  priority,
  description,
  checked,
  exists
) => {
  if (exists) {
    project.splice(priority - 1, 0, {
      title,
      dueDate,
      priority,
      description,
      checked,
    });
  } else {
    project.push({
      title,
      dueDate,
      priority,
      description,
      checked,
    });
  }
};




/***/ }),

/***/ "./src/task-components.js":
/*!********************************!*\
  !*** ./src/task-components.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Create task description maker
const createDescription = (task, taskTitle, description) => {
  if (task.nextSibling) {
    if (task.nextSibling.classList.contains("todo-item-description"))
      task.nextSibling.remove();
  }
  const tasks = document.querySelector(".todo-items");
  const taskTitleClone = taskTitle.cloneNode(true);
  taskTitle.replaceWith(taskTitleClone);
  const newTaskElementDescription = document.createElement("div");
  newTaskElementDescription.classList.add("todo-item-description");
  newTaskElementDescription.textContent = description;
  let newTaskElementDescriptionShown = false;

  taskTitleClone.addEventListener("click", () => {
    if (newTaskElementDescriptionShown) {
      tasks.removeChild(newTaskElementDescription);
      newTaskElementDescriptionShown = false;
    } else {
      task.insertAdjacentElement("afterend", newTaskElementDescription);
      newTaskElementDescriptionShown = true;
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDescription);


/***/ }),

/***/ "./src/task-creation.js":
/*!******************************!*\
  !*** ./src/task-creation.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAddNewTaskElement": () => (/* binding */ createAddNewTaskElement),
/* harmony export */   "createNewTask": () => (/* binding */ createNewTask),
/* harmony export */   "createNewTaskElement": () => (/* binding */ createNewTaskElement)
/* harmony export */ });
/* harmony import */ var _project_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project-components */ "./src/project-components.js");
/* harmony import */ var _project_task_logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-task-logic */ "./src/project-task-logic.js");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time */ "./src/time.js");
/* harmony import */ var _task_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./task-components */ "./src/task-components.js");
/* harmony import */ var _project_task_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-task-components */ "./src/project-task-components.js");
/* eslint-disable radix */






const createAddNewTaskElement = () => {
  const todoItems = document.querySelector(".todo-items");
  const oldAddNewTaskElement = document.getElementById("new-task");
  if (oldAddNewTaskElement !== null) oldAddNewTaskElement.remove();
  const newAddNewTaskElement = document.createElement("div");
  newAddNewTaskElement.classList.add("todo-item-add");
  newAddNewTaskElement.setAttribute("id", "new-task");
  newAddNewTaskElement.setAttribute("role", "button");
  const newAddNewTaskElementTitle = document.createElement("div");
  newAddNewTaskElementTitle.textContent = "+ Add New Task";
  newAddNewTaskElement.appendChild(newAddNewTaskElementTitle);
  todoItems.appendChild(newAddNewTaskElement);

  const taskModal = document.querySelector(".task-modal");
  newAddNewTaskElement.addEventListener("click", () => {
    document.getElementById("task-form").reset();
    taskModal.style.visibility = "visible";
  });
};

const createNewTaskElement = (
  priority,
  title,
  dueDate,
  description,
  checked
) => {
  const todoItems = document.querySelector(".todo-items");
  const project = document.querySelector(
    `[data-project='${todoItems.getAttribute("data-project")}']`
  );
  (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createProjectCompletion)(project);
  const newTaskElement = document.createElement("div");
  newTaskElement.classList.add("todo-item");
  newTaskElement.classList.add("item");
  const newTaskElementPriority = document.createElement("div");
  newTaskElementPriority.textContent = `${priority}.`;
  newTaskElement.appendChild(newTaskElementPriority);
  const newTaskElementCheckbox = document.createElement("button");
  newTaskElementCheckbox.classList.add("checkbox");
  newTaskElement.appendChild(newTaskElementCheckbox);
  const newTaskElementTitle = document.createElement("div");
  newTaskElementTitle.classList.add("todo-item-title");
  newTaskElementTitle.textContent = title;
  newTaskElement.appendChild(newTaskElementTitle);
  const newTaskElementDueDate = document.createElement("div");
  newTaskElementDueDate.classList.add("todo-item-due-date");
  newTaskElementDueDate.textContent = dueDate;
  newTaskElement.appendChild(newTaskElementDueDate);
  todoItems.appendChild(newTaskElement);

  if (checked) {
    newTaskElementCheckbox.textContent = "✓";
    newTaskElementTitle.classList.add("todo-item-checked");
  }

  newTaskElementCheckbox.addEventListener("click", () => {
    if (
      newTaskElement
        .querySelector(".todo-item-title")
        .classList.contains("todo-item-checked")
    ) {
      newTaskElement
        .querySelector(".todo-item-title")
        .classList.remove("todo-item-checked");
      newTaskElementCheckbox.textContent = "";
      _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[parseInt(todoItems.getAttribute("data-project"))][
        priority - 1
      ].checked = false;
      project.setAttribute(
        "data-completed",
        parseInt(project.getAttribute("data-completed")) - 1
      );
      if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(dueDate) && (0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(dueDate)) {
        const dueToday = document.querySelector(".sidebar-item-today");
        dueToday.setAttribute(
          "data-completed",
          parseInt(dueToday.getAttribute("data-completed")) - 1
        );
        const overdue = document.querySelector(".sidebar-item-overdue");
        overdue.setAttribute(
          "data-tasks",
          parseInt(overdue.getAttribute("data-tasks")) + 1
        );
        (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createProjectCompletion)(project, true);
        (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createOverdueTasksCount)();
      }
      if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(dueDate) && !(0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(dueDate)) {
        const dueToday = document.querySelector(".sidebar-item-today");
        dueToday.setAttribute(
          "data-completed",
          parseInt(dueToday.getAttribute("data-completed")) - 1
        );
        (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createProjectCompletion)(project, true);
      }
      if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(dueDate) && !(0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(dueDate)) {
        const overdue = document.querySelector(".sidebar-item-overdue");
        overdue.setAttribute(
          "data-tasks",
          parseInt(overdue.getAttribute("data-tasks")) + 1
        );
        (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createOverdueTasksCount)();
        (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createProjectCompletion)(project, false);
      } else (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createProjectCompletion)(project, false);
    } else {
      newTaskElement
        .querySelector(".todo-item-title")
        .classList.add("todo-item-checked");
      newTaskElementCheckbox.textContent = "✓";
      _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[parseInt(todoItems.getAttribute("data-project"))][
        priority - 1
      ].checked = true;
      project.setAttribute(
        "data-completed",
        parseInt(project.getAttribute("data-completed")) + 1
      );
      if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(dueDate) && (0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(dueDate)) {
        const dueToday = document.querySelector(".sidebar-item-today");
        dueToday.setAttribute(
          "data-completed",
          parseInt(dueToday.getAttribute("data-completed")) + 1
        );
        const overdue = document.querySelector(".sidebar-item-overdue");
        overdue.setAttribute(
          "data-tasks",
          parseInt(overdue.getAttribute("data-tasks")) - 1
        );
        (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createProjectCompletion)(project, true);
        (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createOverdueTasksCount)();
      }
      if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(dueDate) && !(0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(dueDate)) {
        const dueToday = document.querySelector(".sidebar-item-today");
        dueToday.setAttribute(
          "data-completed",
          parseInt(dueToday.getAttribute("data-completed")) + 1
        );
        (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createProjectCompletion)(project, true);
      }
      if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(dueDate) && !(0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(dueDate)) {
        const overdue = document.querySelector(".sidebar-item-overdue");
        overdue.setAttribute(
          "data-tasks",
          parseInt(overdue.getAttribute("data-tasks")) - 1
        );
        (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createOverdueTasksCount)();
        (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createProjectCompletion)(project, false);
      } else (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createProjectCompletion)(project, false);
    }
  });

  (0,_task_components__WEBPACK_IMPORTED_MODULE_3__["default"])(newTaskElement, newTaskElementTitle, description);
  (0,_project_task_components__WEBPACK_IMPORTED_MODULE_4__.addEditButtons)();
};

const createNewTask = (project) => {
  const title = document.getElementById("task").value;
  let dueDate = document.getElementById("due-date").value;
  dueDate = new Date(Date.parse(dueDate));
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  dueDate = dueDate.toLocaleTimeString("en-US", options);
  if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(dueDate)) {
    const dueToday = document.querySelector(".sidebar-item-today");
    dueToday.setAttribute(
      "data-tasks",
      parseInt(dueToday.getAttribute("data-tasks")) + 1
    );
    (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createProjectCompletion)(false, true);
  }
  if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(dueDate)) {
    const overdue = document.querySelector(".sidebar-item-overdue");
    overdue.setAttribute(
      "data-tasks",
      parseInt(overdue.getAttribute("data-tasks")) + 1
    );
    (0,_project_components__WEBPACK_IMPORTED_MODULE_0__.createOverdueTasksCount)();
  }
  let priority = parseInt(document.getElementById("priority").value);
  if (priority === 0) priority = 1;
  if (Number.isNaN(priority)) priority = Infinity;
  if (priority > project.length + 1) priority = project.length + 1;
  let description = document.getElementById("description").value;
  if (description === "") description = "No description available.";
  const checked = false;
  let exists = false;
  if (project[priority - 1]) {
    exists = true;
    (0,_project_task_logic__WEBPACK_IMPORTED_MODULE_1__.newTask)(project, title, dueDate, priority, description, checked, exists);
    project.forEach((task) => {
      // eslint-disable-next-line no-param-reassign
      task.priority = project.indexOf(task) + 1;
    });
    (0,_project_task_components__WEBPACK_IMPORTED_MODULE_4__.resetTodoList)(_project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard.indexOf(project));
  } else {
    (0,_project_task_logic__WEBPACK_IMPORTED_MODULE_1__.newTask)(project, title, dueDate, priority, description, checked, exists);
    createNewTaskElement(priority, title, dueDate, description, checked);
    createAddNewTaskElement();
  }
};




/***/ }),

/***/ "./src/time.js":
/*!*********************!*\
  !*** ./src/time.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dueToday": () => (/* binding */ dueToday),
/* harmony export */   "isOverdue": () => (/* binding */ isOverdue),
/* harmony export */   "isToday": () => (/* binding */ isToday),
/* harmony export */   "overdue": () => (/* binding */ overdue)
/* harmony export */ });
/* harmony import */ var _project_task_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project-task-logic */ "./src/project-task-logic.js");
/* harmony import */ var _project_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-components */ "./src/project-components.js");
/* harmony import */ var _task_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task-components */ "./src/task-components.js");
/* eslint-disable radix */




const isToday = (date) => {
  let todaysDate = new Date();
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  todaysDate = todaysDate.toLocaleTimeString("en-US", options);
  const lastComma = todaysDate.lastIndexOf(",");
  todaysDate = todaysDate.substring(0, lastComma);
  if (date.includes(todaysDate)) return true;
  return false;
};

const isOverdue = (date) => {
  const time = Date.parse(new Date());
  const parsedDate = Date.parse(date);
  if (parsedDate < time) return true;
  return false;
};

const dueToday = () => {
  const dueTodayElement = document.querySelector(".sidebar-item-today");
  const overdueElement = document.querySelector(".sidebar-item-overdue");
  let numberOfTasks = 0;
  let numberOfCompletedTasks = 0;
  const dueTodayFunctionality = () => {
    const tasks = document.querySelector(".todo-items");
    tasks.replaceChildren();
    _project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard.forEach((project) => {
      project.forEach((task) => {
        if (isToday(task.dueDate)) {
          numberOfTasks += 1;
          const projectElement = document.querySelector(
            `[data-project='${_project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard.indexOf(project)}']`
          );
          const newTaskElement = document.createElement("div");
          newTaskElement.classList.add("todo-item");
          newTaskElement.classList.add("item");
          const newTaskElementCheckbox = document.createElement("button");
          newTaskElementCheckbox.classList.add("checkbox");
          newTaskElement.appendChild(newTaskElementCheckbox);
          const newTaskElementTitle = document.createElement("div");
          newTaskElementTitle.classList.add("todo-item-title");
          newTaskElementTitle.textContent = task.title;
          newTaskElement.appendChild(newTaskElementTitle);
          const newTaskElementDueDate = document.createElement("div");
          newTaskElementDueDate.classList.add("todo-item-due-date");
          newTaskElementDueDate.textContent = task.dueDate;
          newTaskElement.appendChild(newTaskElementDueDate);
          tasks.appendChild(newTaskElement);

          if (task.checked) {
            newTaskElementCheckbox.textContent = "✓";
            newTaskElementTitle.classList.add("todo-item-checked");
            numberOfCompletedTasks += 1;
          }

          newTaskElementCheckbox.addEventListener("click", () => {
            if (
              newTaskElement
                .querySelector(".todo-item-title")
                .classList.contains("todo-item-checked")
            ) {
              newTaskElement
                .querySelector(".todo-item-title")
                .classList.remove("todo-item-checked");
              newTaskElementCheckbox.textContent = "";
              // eslint-disable-next-line no-param-reassign
              task.checked = false;
              projectElement.setAttribute(
                "data-completed",
                parseInt(projectElement.getAttribute("data-completed")) - 1
              );
              dueTodayElement.setAttribute(
                "data-completed",
                parseInt(dueTodayElement.getAttribute("data-completed")) - 1
              );
              if (isOverdue(task.dueDate)) {
                overdueElement.setAttribute(
                  "data-tasks",
                  parseInt(overdueElement.getAttribute("data-tasks")) + 1
                );
                (0,_project_components__WEBPACK_IMPORTED_MODULE_1__.createOverdueTasksCount)();
              }
              (0,_project_components__WEBPACK_IMPORTED_MODULE_1__.createProjectCompletion)(projectElement, true);
            } else {
              newTaskElement
                .querySelector(".todo-item-title")
                .classList.add("todo-item-checked");
              newTaskElementCheckbox.textContent = "✓";
              // eslint-disable-next-line no-param-reassign
              task.checked = true;
              projectElement.setAttribute(
                "data-completed",
                parseInt(projectElement.getAttribute("data-completed")) + 1
              );
              dueTodayElement.setAttribute(
                "data-completed",
                parseInt(dueTodayElement.getAttribute("data-completed")) + 1
              );
              if (isOverdue(task.dueDate)) {
                overdueElement.setAttribute(
                  "data-tasks",
                  parseInt(overdueElement.getAttribute("data-tasks")) - 1
                );
                (0,_project_components__WEBPACK_IMPORTED_MODULE_1__.createOverdueTasksCount)();
              }
              (0,_project_components__WEBPACK_IMPORTED_MODULE_1__.createProjectCompletion)(projectElement, true);
            }
          });

          (0,_task_components__WEBPACK_IMPORTED_MODULE_2__["default"])(
            newTaskElement,
            newTaskElementTitle,
            task.description
          );
        }
      });
    });
  };
  dueTodayElement.addEventListener("click", dueTodayFunctionality);
  window.addEventListener("load", dueTodayFunctionality);
  dueTodayElement.setAttribute("data-tasks", numberOfTasks);
  dueTodayElement.setAttribute("data-completed", numberOfCompletedTasks);
  let dueTodayElementTitle = dueTodayElement.querySelector(
    ".sidebar-item-title"
  ).textContent;
  dueTodayElementTitle = `${dueTodayElementTitle} (${numberOfCompletedTasks}/${numberOfTasks})`;
  dueTodayElement.querySelector(".sidebar-item-title").textContent =
    dueTodayElementTitle;
  (0,_project_components__WEBPACK_IMPORTED_MODULE_1__.createProjectCompletion)(false, true);
};

const overdue = () => {
  const overdueElement = document.querySelector(".sidebar-item-overdue");
  const dueTodayElement = document.querySelector(".sidebar-item-today");
  let numberOfTasks = 0;
  const overdueFunctionality = () => {
    const tasks = document.querySelector(".todo-items");
    tasks.replaceChildren();
    _project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard.forEach((project) => {
      project.forEach((task) => {
        if (isOverdue(task.dueDate) && !task.checked) {
          numberOfTasks += 1;
          const projectElement = document.querySelector(
            `[data-project='${_project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard.indexOf(project)}']`
          );
          const newTaskElement = document.createElement("div");
          newTaskElement.classList.add("todo-item");
          newTaskElement.classList.add("item");
          newTaskElement.classList.add("overdue");
          const newTaskElementCheckbox = document.createElement("button");
          newTaskElementCheckbox.classList.add("checkbox");
          newTaskElement.appendChild(newTaskElementCheckbox);
          const newTaskElementTitle = document.createElement("div");
          newTaskElementTitle.classList.add("todo-item-title");
          newTaskElementTitle.textContent = task.title;
          newTaskElement.appendChild(newTaskElementTitle);
          const newTaskElementDueDate = document.createElement("div");
          newTaskElementDueDate.classList.add("todo-item-due-date");
          newTaskElementDueDate.textContent = task.dueDate;
          newTaskElement.appendChild(newTaskElementDueDate);
          tasks.appendChild(newTaskElement);

          newTaskElementCheckbox.addEventListener("click", () => {
            // eslint-disable-next-line no-param-reassign
            task.checked = true;
            overdueElement.setAttribute(
              "data-tasks",
              parseInt(overdueElement.getAttribute("data-tasks")) - 1
            );
            projectElement.setAttribute(
              "data-completed",
              parseInt(projectElement.getAttribute("data-completed")) + 1
            );
            if (isToday(task.dueDate)) {
              dueTodayElement.setAttribute(
                "data-completed",
                parseInt(dueTodayElement.getAttribute("data-completed")) + 1
              );
              (0,_project_components__WEBPACK_IMPORTED_MODULE_1__.createProjectCompletion)(projectElement, true);
            } else (0,_project_components__WEBPACK_IMPORTED_MODULE_1__.createProjectCompletion)(projectElement, false);
            (0,_project_components__WEBPACK_IMPORTED_MODULE_1__.createOverdueTasksCount)();
            tasks.removeChild(newTaskElement);
          });

          (0,_task_components__WEBPACK_IMPORTED_MODULE_2__["default"])(
            newTaskElement,
            newTaskElementTitle,
            task.description
          );
        }
      });
    });
  };
  overdueElement.addEventListener("click", overdueFunctionality);
  window.addEventListener("load", overdueFunctionality);
  overdueElement.setAttribute("data-tasks", numberOfTasks);
  let overdueElementTitle = overdueElement.querySelector(
    ".sidebar-item-title"
  ).textContent;
  overdueElementTitle = `${overdueElementTitle} (${numberOfTasks})`;
  overdueElement.querySelector(".sidebar-item-title").textContent =
    overdueElementTitle;
  (0,_project_components__WEBPACK_IMPORTED_MODULE_1__.createOverdueTasksCount)();
};




/***/ }),

/***/ "./src/icons/dots-vertical.svg":
/*!*************************************!*\
  !*** ./src/icons/dots-vertical.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2500f612ad4630b14fbb.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _project_task_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project-task-components */ "./src/project-task-components.js");
/* harmony import */ var _modal_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-controls */ "./src/modal-controls.js");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time */ "./src/time.js");




(0,_project_task_components__WEBPACK_IMPORTED_MODULE_0__.createDropdownHider)();
(0,_project_task_components__WEBPACK_IMPORTED_MODULE_0__.addEditButtons)();
(0,_modal_controls__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_time__WEBPACK_IMPORTED_MODULE_2__.dueToday)();
(0,_time__WEBPACK_IMPORTED_MODULE_2__.overdue)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHFCQUFxQixHQUFHLGNBQWM7QUFDakU7QUFDQTtBQUNBLEVBQUUsNEVBQXVCO0FBQ3pCOztBQUVpRDs7Ozs7Ozs7Ozs7Ozs7Ozs7VUN6TmpEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7OztBQ2ZnRjtBQUNuQztBQUNGOztBQUUzQyw2RUFBbUI7QUFDbkIsd0VBQWM7QUFDZCwyREFBYTtBQUNiLCtDQUFRO0FBQ1IsOENBQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kYWwtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QtY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC1jcmVhdGlvbi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC10YXNrLWNvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QtdGFzay1sb2dpYy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay1jb21wb25lbnRzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLWNyZWF0aW9uLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90aW1lLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCBjcmVhdGVOZXdQcm9qZWN0IGZyb20gXCIuL3Byb2plY3QtY3JlYXRpb25cIjtcbmltcG9ydCB7IGRhc2hib2FyZCB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1sb2dpY1wiO1xuaW1wb3J0IHsgY3JlYXRlTmV3VGFzayB9IGZyb20gXCIuL3Rhc2stY3JlYXRpb25cIjtcblxuY29uc3QgdmFsaWRpdHlDaGVjayA9IChpbnB1dCkgPT4gaW5wdXQudmFsaWRpdHkudmFsaWQ7XG5cbi8vIENyZWF0ZSBvcGVuL2Nsb3NlIGNvbnRyb2xzIGZvciBhbGwgbW9kYWxzXG5jb25zdCBtb2RhbENvbnRyb2xzID0gKCkgPT4ge1xuICBjb25zdCBhZGROZXdQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdFwiKTtcbiAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW1vZGFsXCIpO1xuICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWVkaXQtbW9kYWxcIik7XG4gIGNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1tb2RhbFwiKTtcbiAgY29uc3QgdGFza0VkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LW1vZGFsXCIpO1xuICBjb25zdCBwcm9qZWN0Q2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtY2xvc2UtYnV0dG9uXCIpO1xuICBjb25zdCBwcm9qZWN0RWRpdENsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi5wcm9qZWN0LWVkaXQtY2xvc2UtYnV0dG9uXCJcbiAgKTtcbiAgY29uc3QgdGFza0Nsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNsb3NlLWJ1dHRvblwiKTtcbiAgY29uc3QgdGFza0VkaXRDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LWNsb3NlLWJ1dHRvblwiKTtcbiAgY29uc3QgcHJvamVjdFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zdWJtaXQtYnV0dG9uXCIpO1xuICBjb25zdCB0YXNrU3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXN1Ym1pdC1idXR0b25cIik7XG5cbiAgYWRkTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpLnJlc2V0KCk7XG4gICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfSk7XG5cbiAgcHJvamVjdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9KTtcblxuICBwcm9qZWN0RWRpdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcHJvamVjdEVkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgdGFza0Nsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9KTtcblxuICB0YXNrRWRpdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGFza0VkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgcHJvamVjdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBwcm9qZWN0TW9kYWwpIHtcbiAgICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHByb2plY3RFZGl0TW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IHByb2plY3RFZGl0TW9kYWwpIHtcbiAgICAgIHByb2plY3RFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcblxuICB0YXNrTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IHRhc2tNb2RhbCkge1xuICAgICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG5cbiAgdGFza0VkaXRNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGFza0VkaXRNb2RhbCkge1xuICAgICAgdGFza0VkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHByb2plY3RTdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0TW9kYWxJbnB1dHMgPSBBcnJheS5mcm9tKFxuICAgICAgcHJvamVjdE1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKVxuICAgICk7XG4gICAgaWYgKHByb2plY3RNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgY3JlYXRlTmV3UHJvamVjdCgpO1xuICAgICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG5cbiAgdGFza1N1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tNb2RhbElucHV0cyA9IEFycmF5LmZyb20odGFza01vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKSk7XG4gICAgaWYgKHRhc2tNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgY29uc3QgdG9kb0l0ZW1zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICAgICAgY29uc3QgcHJvamVjdCA9XG4gICAgICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXNDb250YWluZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV07XG4gICAgICBjcmVhdGVOZXdUYXNrKHByb2plY3QpO1xuICAgICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtb2RhbENvbnRyb2xzO1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCB7IGRhc2hib2FyZCB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1sb2dpY1wiO1xuXG4vLyBBZGQgcHJvamVjdCBjb21wbGV0aW9uIHN0YXR1c1xuY29uc3QgY3JlYXRlUHJvamVjdENvbXBsZXRpb24gPSAocHJvamVjdCwgZHVlVG9kYXkpID0+IHtcbiAgY29uc3Qgb2xkQ29tcGxldGlvbiA9IC9cXChcXGQqXFwvXFxkKlxcKS87XG4gIGlmIChwcm9qZWN0KSB7XG4gICAgY29uc3QgdGFza3MgPVxuICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV0ubGVuZ3RoO1xuICAgIGNvbnN0IGNvbXBsZXRlZFRhc2tzID0gcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSk7XG4gICAgbGV0IHRpdGxlID0gcHJvamVjdC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBjb21wbGV0aW9uSW5kZXggPSB0aXRsZS5zZWFyY2gob2xkQ29tcGxldGlvbikgLSAxO1xuICAgIHRpdGxlID0gdGl0bGUuc3Vic3RyaW5nKDAsIGNvbXBsZXRpb25JbmRleCk7XG4gICAgdGl0bGUgPSBgJHt0aXRsZX0gKCR7Y29tcGxldGVkVGFza3N9LyR7dGFza3N9KWA7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgcHJvamVjdC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICB9XG4gIGlmIChkdWVUb2RheSkge1xuICAgIGNvbnN0IGR1ZVRvZGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICAgIGxldCBkdWVUb2RheVRpdGxlID0gZHVlVG9kYXlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIlxuICAgICkudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgZHVlVG9kYXlUYXNrcyA9IHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKTtcbiAgICBjb25zdCBkdWVUb2RheUNvbXBsZXRlZFRhc2tzID0gcGFyc2VJbnQoXG4gICAgICBkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIilcbiAgICApO1xuICAgIGNvbnN0IGR1ZVRvZGF5Q29tcGxldGlvbkluZGV4ID0gZHVlVG9kYXlUaXRsZS5zZWFyY2gob2xkQ29tcGxldGlvbikgLSAxO1xuICAgIGR1ZVRvZGF5VGl0bGUgPSBkdWVUb2RheVRpdGxlLnN1YnN0cmluZygwLCBkdWVUb2RheUNvbXBsZXRpb25JbmRleCk7XG4gICAgZHVlVG9kYXlUaXRsZSA9IGAke2R1ZVRvZGF5VGl0bGV9ICgke2R1ZVRvZGF5Q29tcGxldGVkVGFza3N9LyR7ZHVlVG9kYXlUYXNrc30pYDtcbiAgICBkdWVUb2RheUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIikudGV4dENvbnRlbnQgPVxuICAgICAgZHVlVG9kYXlUaXRsZTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQgPSAoKSA9PiB7XG4gIGNvbnN0IG9sZENvdW50ID0gL1xcKFxcZCpcXCkvO1xuICBjb25zdCBvdmVyZHVlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gIGxldCBvdmVyZHVlVGl0bGUgPSBvdmVyZHVlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLnNpZGViYXItaXRlbS10aXRsZVwiXG4gICkudGV4dENvbnRlbnQ7XG4gIGNvbnN0IG92ZXJkdWVUYXNrcyA9IHBhcnNlSW50KG92ZXJkdWVFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpO1xuICBjb25zdCBvdmVyZHVlVGFza0NvdW50SW5kZXggPSBvdmVyZHVlVGl0bGUuc2VhcmNoKG9sZENvdW50KSAtIDE7XG4gIG92ZXJkdWVUaXRsZSA9IG92ZXJkdWVUaXRsZS5zdWJzdHJpbmcoMCwgb3ZlcmR1ZVRhc2tDb3VudEluZGV4KTtcbiAgb3ZlcmR1ZVRpdGxlID0gYCR7b3ZlcmR1ZVRpdGxlfSAoJHtvdmVyZHVlVGFza3N9KWA7XG4gIG92ZXJkdWVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRpdGxlXCIpLnRleHRDb250ZW50ID1cbiAgICBvdmVyZHVlVGl0bGU7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbiwgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQgfTtcbiIsImltcG9ydCB7IGRhc2hib2FyZCwgbmV3UHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1sb2dpY1wiO1xuaW1wb3J0IHsgYWRkRWRpdEJ1dHRvbnMsIHJlc2V0VG9kb0xpc3QgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stY29tcG9uZW50c1wiO1xuXG5jb25zdCBjcmVhdGVBZGROZXdQcm9qZWN0RWxlbWVudCA9ICgpID0+IHtcbiAgY29uc3Qgc2lkZWJhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW1zXCIpO1xuICBjb25zdCBvbGRBZGROZXdQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXByb2plY3RcIik7XG4gIG9sZEFkZE5ld1Byb2plY3RFbGVtZW50LnJlbW92ZSgpO1xuICBjb25zdCBuZXdBZGROZXdQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyLWl0ZW0tYWRkXCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm5ldy1wcm9qZWN0XCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICBjb25zdCBuZXdBZGROZXdQcm9qZWN0RWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IFwiKyBBZGQgTmV3IFByb2plY3RcIjtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3QWRkTmV3UHJvamVjdEVsZW1lbnRUaXRsZSk7XG4gIHNpZGViYXJJdGVtcy5hcHBlbmRDaGlsZChuZXdBZGROZXdQcm9qZWN0RWxlbWVudCk7XG5cbiAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW1vZGFsXCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpLnJlc2V0KCk7XG4gICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdQcm9qZWN0RWxlbWVudCA9ICh0aXRsZSkgPT4ge1xuICBjb25zdCBzaWRlYmFySXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbXNcIik7XG4gIGNvbnN0IG5ld1Byb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNpZGViYXItaXRlbVwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIml0ZW1cIik7XG4gIG5ld1Byb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBkYXNoYm9hcmQubGVuZ3RoIC0gMSk7XG4gIG5ld1Byb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIsIDApO1xuICBjb25zdCBuZXdQcm9qZWN0RWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKFwic2lkZWJhci1pdGVtLXRpdGxlXCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gYCR7dGl0bGV9ICgwLzApYDtcbiAgbmV3UHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEVsZW1lbnRUaXRsZSk7XG4gIHNpZGViYXJJdGVtcy5hcHBlbmRDaGlsZChuZXdQcm9qZWN0RWxlbWVudCk7XG5cbiAgYWRkRWRpdEJ1dHRvbnMoKTtcblxuICBuZXdQcm9qZWN0RWxlbWVudFRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gICAgY29uc3QgcHJvamVjdE51bWJlciA9IG5ld1Byb2plY3RFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKTtcbiAgICB0YXNrcy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgcHJvamVjdE51bWJlcik7XG4gICAgdGFza3MucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgcmVzZXRUb2RvTGlzdChwcm9qZWN0TnVtYmVyKTtcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdQcm9qZWN0ID0gKCkgPT4ge1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1uYW1lXCIpLnZhbHVlO1xuICBuZXdQcm9qZWN0KCk7XG4gIGNyZWF0ZU5ld1Byb2plY3RFbGVtZW50KHRpdGxlKTtcbiAgY3JlYXRlQWRkTmV3UHJvamVjdEVsZW1lbnQoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU5ld1Byb2plY3Q7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByYWRpeCAqL1xuaW1wb3J0IGVkaXRJY29uU3JjIGZyb20gXCIuL2ljb25zL2RvdHMtdmVydGljYWwuc3ZnXCI7XG5pbXBvcnQgeyBkYXNoYm9hcmQgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcbmltcG9ydCBjcmVhdGVEZXNjcmlwdGlvbiBmcm9tIFwiLi90YXNrLWNvbXBvbmVudHNcIjtcbmltcG9ydCB7IGNyZWF0ZU5ld1Rhc2tFbGVtZW50LCBjcmVhdGVBZGROZXdUYXNrRWxlbWVudCB9IGZyb20gXCIuL3Rhc2stY3JlYXRpb25cIjtcbmltcG9ydCB7IGlzVG9kYXksIGlzT3ZlcmR1ZSB9IGZyb20gXCIuL3RpbWVcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50LFxuICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbixcbn0gZnJvbSBcIi4vcHJvamVjdC1jb21wb25lbnRzXCI7XG5cbmNvbnN0IHZhbGlkaXR5Q2hlY2sgPSAoaW5wdXQpID0+IGlucHV0LnZhbGlkaXR5LnZhbGlkO1xuXG4vLyBDcmVhdGUgZXZlbnQgbGlzdGVuZXJzIHRvIGhpZGUgdGhlIGRyb3Bkb3duIG1lbnVzIHdoZW4gb3RoZXIgc3R1ZmYgaXMgY2xpY2tlZCBvblxuY29uc3QgY3JlYXRlRHJvcGRvd25IaWRlciA9ICgpID0+IHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoXG4gICAgICAhZXZlbnQudGFyZ2V0Lm1hdGNoZXMoXCIuZHJvcGRvd24tY29udGVudFwiKSAmJlxuICAgICAgIWV2ZW50LnRhcmdldC5tYXRjaGVzKFwiLmVkaXQtYnV0dG9uXCIpXG4gICAgKSB7XG4gICAgICBjb25zdCBkcm9wZG93bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRyb3Bkb3duLWNvbnRlbnRcIik7XG4gICAgICBkcm9wZG93bnMuZm9yRWFjaCgoZHJvcGRvd24pID0+IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGRyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHJlc2V0VG9kb0xpc3QgPSAocHJvamVjdE51bWJlcikgPT4ge1xuICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgdGFza3MucmVwbGFjZUNoaWxkcmVuKCk7XG4gIGRhc2hib2FyZFtwcm9qZWN0TnVtYmVyXS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5ID0gdGFzay5wcmlvcml0eTtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSB0YXNrLnRpdGxlO1xuICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gdGFzay5kdWVEYXRlO1xuICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgY29uc3QgdGFza0NoZWNrZWQgPSB0YXNrLmNoZWNrZWQ7XG5cbiAgICBjcmVhdGVOZXdUYXNrRWxlbWVudChcbiAgICAgIHRhc2tQcmlvcml0eSxcbiAgICAgIHRhc2tUaXRsZSxcbiAgICAgIHRhc2tEdWVEYXRlLFxuICAgICAgdGFza0Rlc2NyaXB0aW9uLFxuICAgICAgdGFza0NoZWNrZWRcbiAgICApO1xuICB9KTtcbiAgY3JlYXRlQWRkTmV3VGFza0VsZW1lbnQoKTtcbn07XG5cbi8vIENyZWF0ZSBlZGl0IG9wdGlvbiBmdW5jdGlvbmFsaXR5XG5jb25zdCBlZGl0RnVuY3Rpb25hbGl0eSA9IChpdGVtKSA9PiB7XG4gIGNvbnN0IHByb2plY3ROdW1iZXIgPSBwYXJzZUludChcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpXG4gICk7XG4gIGlmIChpdGVtLmNsYXNzTGlzdC5jb250YWlucyhcInNpZGViYXItaXRlbVwiKSkge1xuICAgIGNvbnN0IGl0ZW1UaXRsZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIik7XG4gICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1lZGl0LW1vZGFsXCIpO1xuICAgIGNvbnN0IHByb2plY3RFZGl0TW9kYWxUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1uYW1lLWVkaXRcIik7XG4gICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgXCJwcm9qZWN0LWVkaXQtc3VibWl0LWJ1dHRvblwiXG4gICAgKTtcbiAgICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsU3VibWl0QnV0dG9uQ2xvbmUgPVxuICAgICAgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgcHJvamVjdEVkaXRNb2RhbFRpdGxlLnZhbHVlID0gaXRlbVRpdGxlLnRleHRDb250ZW50O1xuXG4gICAgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbi5yZXBsYWNlV2l0aChwcm9qZWN0RWRpdE1vZGFsU3VibWl0QnV0dG9uQ2xvbmUpO1xuXG4gICAgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsSW5wdXRzID0gQXJyYXkuZnJvbShcbiAgICAgICAgcHJvamVjdEVkaXRNb2RhbC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIilcbiAgICAgICk7XG4gICAgICBpZiAocHJvamVjdEVkaXRNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgICBpdGVtVGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0RWRpdE1vZGFsVGl0bGUudmFsdWU7XG4gICAgICAgIHByb2plY3RFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaXRlbVByaW9yaXR5ID0gaXRlbS5maXJzdENoaWxkO1xuICAgIGNvbnN0IGl0ZW1UaXRsZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIik7XG4gICAgY29uc3QgdGFza1RvRWRpdCA9XG4gICAgICBkYXNoYm9hcmRbcHJvamVjdE51bWJlcl1bcGFyc2VJbnQoaXRlbS5maXJzdENoaWxkLnRleHRDb250ZW50KSAtIDFdO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZWRpdC1tb2RhbFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGUtZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsUHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5LWVkaXRcIik7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbERlc2NyaXB0aW9uID1cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb24tZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBcInRhc2stZWRpdC1zdWJtaXQtYnV0dG9uXCJcbiAgICApO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b25DbG9uZSA9XG4gICAgICB0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uLmNsb25lTm9kZSh0cnVlKTtcbiAgICB0YXNrRWRpdE1vZGFsVGl0bGUudmFsdWUgPSB0YXNrVG9FZGl0LnRpdGxlO1xuICAgIHRhc2tFZGl0TW9kYWxEYXRlLnZhbHVlID0gdGFza1RvRWRpdC5kdWVEYXRlO1xuICAgIHRhc2tFZGl0TW9kYWxQcmlvcml0eS52YWx1ZSA9IHRhc2tUb0VkaXQucHJpb3JpdHk7XG4gICAgdGFza0VkaXRNb2RhbERlc2NyaXB0aW9uLnZhbHVlID0gdGFza1RvRWRpdC5kZXNjcmlwdGlvbjtcblxuICAgIHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b24ucmVwbGFjZVdpdGgodGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lKTtcblxuICAgIHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b25DbG9uZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgdGFza0VkaXRNb2RhbElucHV0cyA9IEFycmF5LmZyb20oXG4gICAgICAgIHRhc2tFZGl0TW9kYWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpXG4gICAgICApO1xuICAgICAgaWYgKHRhc2tFZGl0TW9kYWxJbnB1dHMuZXZlcnkodmFsaWRpdHlDaGVjaykpIHtcbiAgICAgICAgdGFza1RvRWRpdC50aXRsZSA9IHRhc2tFZGl0TW9kYWxUaXRsZS52YWx1ZTtcbiAgICAgICAgdGFza1RvRWRpdC5kdWVEYXRlID0gdGFza0VkaXRNb2RhbERhdGUudmFsdWU7XG4gICAgICAgIHRhc2tUb0VkaXQucHJpb3JpdHkgPSB0YXNrRWRpdE1vZGFsUHJpb3JpdHkudmFsdWU7XG4gICAgICAgIHRhc2tUb0VkaXQuZGVzY3JpcHRpb24gPSB0YXNrRWRpdE1vZGFsRGVzY3JpcHRpb24udmFsdWU7XG4gICAgICAgIGl0ZW1Qcmlvcml0eS50ZXh0Q29udGVudCA9IGAke3Rhc2tUb0VkaXQucHJpb3JpdHl9LmA7XG4gICAgICAgIGl0ZW1UaXRsZS50ZXh0Q29udGVudCA9IHRhc2tUb0VkaXQudGl0bGU7XG4gICAgICAgIGNyZWF0ZURlc2NyaXB0aW9uKGl0ZW0sIGl0ZW1UaXRsZSwgdGFza1RvRWRpdC5kZXNjcmlwdGlvbik7XG4gICAgICAgIHRhc2tFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIEFkZCBlZGl0IGJ1dHRvbnMgdG8gcHJvamVjdHMgYW5kIHRhc2tzXG5jb25zdCBhZGRFZGl0QnV0dG9ucyA9ICgpID0+IHtcbiAgLy8gTWFrZSBhbiBlZGl0IGJ1dHRvblxuICBjb25zdCBhZGRFZGl0QnV0dG9uID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBlZGl0SWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIGNvbnN0IGVkaXREcm9wZG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZWRpdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgcmVtb3ZlT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBlZGl0SWNvbi5zcmMgPSBlZGl0SWNvblNyYztcbiAgICBlZGl0SWNvbi5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgXCJWZXJ0aWNhbCBkb3R0ZWQgbGluZSBpY29uIGZvciBlZGl0IG9wdGlvbnMuXCIpO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG4gICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImVkaXQtYnV0dG9uXCIpO1xuICAgIGVkaXREcm9wZG93bi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24tY29udGVudFwiKTtcbiAgICBlZGl0RHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgZWRpdE9wdGlvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuICAgIGVkaXRPcHRpb24uY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWl0ZW1cIik7XG4gICAgZWRpdE9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImVkaXQtYnV0dG9uXCIpO1xuICAgIGVkaXRPcHRpb24uc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICByZW1vdmVPcHRpb24udGV4dENvbnRlbnQgPSBcIlJlbW92ZVwiO1xuICAgIHJlbW92ZU9wdGlvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbVwiKTtcbiAgICByZW1vdmVPcHRpb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJyZW1vdmUtYnV0dG9uXCIpO1xuICAgIHJlbW92ZU9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGVkaXREcm9wZG93bi5hcHBlbmRDaGlsZChlZGl0T3B0aW9uKTtcbiAgICBlZGl0RHJvcGRvd24uYXBwZW5kQ2hpbGQocmVtb3ZlT3B0aW9uKTtcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ1dHRvblwiKTtcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93blwiKTtcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRJY29uKTtcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXREcm9wZG93bik7XG4gICAgaXRlbS5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblxuICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChlZGl0RHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9PT0gXCJoaWRkZW5cIikge1xuICAgICAgICBlZGl0RHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfSBlbHNlIGVkaXREcm9wZG93bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9KTtcblxuICAgIGNvbnN0IHByb2plY3RFZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtZWRpdC1tb2RhbFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWVkaXQtbW9kYWxcIik7XG5cbiAgICBlZGl0T3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRJdGVtID0gZWRpdE9wdGlvbi5jbG9zZXN0KFwiLml0ZW1cIik7XG4gICAgICBpZiAocGFyZW50SXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaWRlYmFyLWl0ZW1cIikpIHtcbiAgICAgICAgZWRpdEZ1bmN0aW9uYWxpdHkocGFyZW50SXRlbSk7XG4gICAgICAgIHByb2plY3RFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWRpdEZ1bmN0aW9uYWxpdHkocGFyZW50SXRlbSk7XG4gICAgICAgIHRhc2tFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVtb3ZlT3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBvdmVyZHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgICBjb25zdCBwYXJlbnRJdGVtID0gcmVtb3ZlT3B0aW9uLmNsb3Nlc3QoXCIuaXRlbVwiKTtcbiAgICAgIGlmIChwYXJlbnRJdGVtLmNsYXNzTGlzdC5jb250YWlucyhcInNpZGViYXItaXRlbVwiKSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBwYXJzZUludChwYXJlbnRJdGVtLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSk7XG4gICAgICAgIGNvbnN0IGxhc3RQcm9qZWN0SW5kZXggPSBkYXNoYm9hcmQubGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgY3VycmVudFRvZG9MaXN0UHJvamVjdCA9IHBhcnNlSW50KFxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIilcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY3VycmVudFRvZG9MaXN0UHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbZGF0YS1wcm9qZWN0PScke2N1cnJlbnRUb2RvTGlzdFByb2plY3R9J11gXG4gICAgICAgICk7XG4gICAgICAgIHBhcmVudEl0ZW0ucmVtb3ZlKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSBwcm9qZWN0SW5kZXggKyAxOyBpIDwgbGFzdFByb2plY3RJbmRleCArIDE7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgW2RhdGEtcHJvamVjdD0nJHtpfSddYFxuICAgICAgICAgICk7XG4gICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwiZGF0YS1wcm9qZWN0XCIsXG4gICAgICAgICAgICBwYXJzZUludChzZWxlY3RlZFByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKSAtIDFcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGRhc2hib2FyZFtwcm9qZWN0SW5kZXhdLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgICBpZiAoaXNPdmVyZHVlKHRhc2suZHVlRGF0ZSkgJiYgIXRhc2suY2hlY2tlZCkge1xuICAgICAgICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc1RvZGF5KHRhc2suZHVlRGF0ZSkpIHtcbiAgICAgICAgICAgIGlmICh0YXNrLmNoZWNrZWQpXG4gICAgICAgICAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24oZmFsc2UsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRhc2hib2FyZC5zcGxpY2UocHJvamVjdEluZGV4LCAxKTtcbiAgICAgICAgaWYgKHByb2plY3RJbmRleCA9PT0gY3VycmVudFRvZG9MaXN0UHJvamVjdCkge1xuICAgICAgICAgIGNvbnN0IGNsaWNrRXZlbnQgPSBuZXcgRXZlbnQoXCJjbGlja1wiKTtcbiAgICAgICAgICBvdmVyZHVlLmRpc3BhdGNoRXZlbnQoY2xpY2tFdmVudCk7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpXG4gICAgICAgICAgICAuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICBcImRhdGEtcHJvamVjdFwiLFxuICAgICAgICAgICAgICBwYXJzZUludChcbiAgICAgICAgICAgICAgICBjdXJyZW50VG9kb0xpc3RQcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIilcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9IHBhcnNlSW50KFxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIilcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFtkYXRhLXByb2plY3Q9JyR7cHJvamVjdEluZGV4fSddYFxuICAgICAgICApO1xuICAgICAgICBsZXQgaW5kZXggPSBwYXJlbnRJdGVtLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQuaW5kZXhPZihcIi5cIik7XG4gICAgICAgIGluZGV4ID1cbiAgICAgICAgICBwYXJzZUludChwYXJlbnRJdGVtLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIGluZGV4KSkgLSAxO1xuICAgICAgICBjb25zdCBsYXN0VGFza0luZGV4ID0gZGFzaGJvYXJkW3Byb2plY3RJbmRleF0ubGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgdGFzayA9IGRhc2hib2FyZFtwcm9qZWN0SW5kZXhdW2luZGV4XTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHBhcmVudEl0ZW0ubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIHBhcmVudEl0ZW0ubmV4dFNpYmxpbmcucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50SXRlbS5yZW1vdmUoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4ICsgMTsgaSA8IGxhc3RUYXNrSW5kZXggKyAxOyBpICs9IDEpIHtcbiAgICAgICAgICBkYXNoYm9hcmRbcHJvamVjdEluZGV4XVtpXS5wcmlvcml0eSAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIHByb2plY3Quc2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgIHBhcnNlSW50KHByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0YXNrLmNoZWNrZWQpXG4gICAgICAgICAgcHJvamVjdC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICBwYXJzZUludChwcm9qZWN0LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgICApO1xuICAgICAgICBpZiAoaXNPdmVyZHVlKHRhc2suZHVlRGF0ZSkgJiYgIXRhc2suY2hlY2tlZCkge1xuICAgICAgICAgIG92ZXJkdWUuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgICAgICk7XG4gICAgICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNUb2RheSh0YXNrLmR1ZURhdGUpKSB7XG4gICAgICAgICAgaWYgKHRhc2suY2hlY2tlZClcbiAgICAgICAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIGZhbHNlKTtcbiAgICAgICAgZGFzaGJvYXJkW3Byb2plY3RJbmRleF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgcmVzZXRUb2RvTGlzdChwcm9qZWN0SW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIC8vIFJlbW92ZSBhbGwgZWRpdCBidXR0b25zIGFuZCB0aGVuIG1ha2UgYW4gZWRpdCBidXR0b24gZm9yIGV2ZXJ5IHByb2plY3QgYW5kIHRhc2tcbiAgY29uc3QgZWRpdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmVkaXQtYnV0dG9uXCIpO1xuICBlZGl0QnV0dG9ucy5mb3JFYWNoKChlZGl0QnV0dG9uKSA9PiBlZGl0QnV0dG9uLnJlbW92ZSgpKTtcbiAgY29uc3QgdGVzdEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaWRlYmFyLWl0ZW1cIik7XG4gIGNvbnN0IHRlc3RJdGVtczIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvZG8taXRlbVwiKTtcbiAgdGVzdEl0ZW1zLmZvckVhY2goKHRlc3RJdGVtKSA9PiBhZGRFZGl0QnV0dG9uKHRlc3RJdGVtKSk7XG4gIHRlc3RJdGVtczIuZm9yRWFjaCgodGVzdEl0ZW0pID0+IGFkZEVkaXRCdXR0b24odGVzdEl0ZW0pKTtcbn07XG5cbmV4cG9ydCB7XG4gIGNyZWF0ZURyb3Bkb3duSGlkZXIsXG4gIGVkaXRGdW5jdGlvbmFsaXR5LFxuICBhZGRFZGl0QnV0dG9ucyxcbiAgcmVzZXRUb2RvTGlzdCxcbn07XG4iLCJjb25zdCBkYXNoYm9hcmQgPSBbXTtcblxuY29uc3QgbmV3UHJvamVjdCA9ICgpID0+IHtcbiAgZGFzaGJvYXJkLnB1c2goW10pO1xufTtcblxuY29uc3QgbmV3VGFzayA9IChcbiAgcHJvamVjdCxcbiAgdGl0bGUsXG4gIGR1ZURhdGUsXG4gIHByaW9yaXR5LFxuICBkZXNjcmlwdGlvbixcbiAgY2hlY2tlZCxcbiAgZXhpc3RzXG4pID0+IHtcbiAgaWYgKGV4aXN0cykge1xuICAgIHByb2plY3Quc3BsaWNlKHByaW9yaXR5IC0gMSwgMCwge1xuICAgICAgdGl0bGUsXG4gICAgICBkdWVEYXRlLFxuICAgICAgcHJpb3JpdHksXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGNoZWNrZWQsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcHJvamVjdC5wdXNoKHtcbiAgICAgIHRpdGxlLFxuICAgICAgZHVlRGF0ZSxcbiAgICAgIHByaW9yaXR5LFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBjaGVja2VkLFxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgeyBkYXNoYm9hcmQsIG5ld1Byb2plY3QsIG5ld1Rhc2sgfTtcbiIsIi8vIENyZWF0ZSB0YXNrIGRlc2NyaXB0aW9uIG1ha2VyXG5jb25zdCBjcmVhdGVEZXNjcmlwdGlvbiA9ICh0YXNrLCB0YXNrVGl0bGUsIGRlc2NyaXB0aW9uKSA9PiB7XG4gIGlmICh0YXNrLm5leHRTaWJsaW5nKSB7XG4gICAgaWYgKHRhc2submV4dFNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCIpKVxuICAgICAgdGFzay5uZXh0U2libGluZy5yZW1vdmUoKTtcbiAgfVxuICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgY29uc3QgdGFza1RpdGxlQ2xvbmUgPSB0YXNrVGl0bGUuY2xvbmVOb2RlKHRydWUpO1xuICB0YXNrVGl0bGUucmVwbGFjZVdpdGgodGFza1RpdGxlQ2xvbmUpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCIpO1xuICBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XG4gIGxldCBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uU2hvd24gPSBmYWxzZTtcblxuICB0YXNrVGl0bGVDbG9uZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uU2hvd24pIHtcbiAgICAgIHRhc2tzLnJlbW92ZUNoaWxkKG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb24pO1xuICAgICAgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvblNob3duID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhc2suaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbik7XG4gICAgICBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uU2hvd24gPSB0cnVlO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEZXNjcmlwdGlvbjtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQge1xuICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbixcbiAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQsXG59IGZyb20gXCIuL3Byb2plY3QtY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgZGFzaGJvYXJkLCBuZXdUYXNrIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWxvZ2ljXCI7XG5pbXBvcnQgeyBpc1RvZGF5LCBpc092ZXJkdWUgfSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQgY3JlYXRlRGVzY3JpcHRpb24gZnJvbSBcIi4vdGFzay1jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBhZGRFZGl0QnV0dG9ucywgcmVzZXRUb2RvTGlzdCB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1jb21wb25lbnRzXCI7XG5cbmNvbnN0IGNyZWF0ZUFkZE5ld1Rhc2tFbGVtZW50ID0gKCkgPT4ge1xuICBjb25zdCB0b2RvSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gIGNvbnN0IG9sZEFkZE5ld1Rhc2tFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctdGFza1wiKTtcbiAgaWYgKG9sZEFkZE5ld1Rhc2tFbGVtZW50ICE9PSBudWxsKSBvbGRBZGROZXdUYXNrRWxlbWVudC5yZW1vdmUoKTtcbiAgY29uc3QgbmV3QWRkTmV3VGFza0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWFkZFwiKTtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJuZXctdGFza1wiKTtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnQuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgY29uc3QgbmV3QWRkTmV3VGFza0VsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSBcIisgQWRkIE5ldyBUYXNrXCI7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld0FkZE5ld1Rhc2tFbGVtZW50VGl0bGUpO1xuICB0b2RvSXRlbXMuYXBwZW5kQ2hpbGQobmV3QWRkTmV3VGFza0VsZW1lbnQpO1xuXG4gIGNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1tb2RhbFwiKTtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybVwiKS5yZXNldCgpO1xuICAgIHRhc2tNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlTmV3VGFza0VsZW1lbnQgPSAoXG4gIHByaW9yaXR5LFxuICB0aXRsZSxcbiAgZHVlRGF0ZSxcbiAgZGVzY3JpcHRpb24sXG4gIGNoZWNrZWRcbikgPT4ge1xuICBjb25zdCB0b2RvSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGBbZGF0YS1wcm9qZWN0PScke3RvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIil9J11gXG4gICk7XG4gIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW1cIik7XG4gIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudFByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudCA9IGAke3ByaW9yaXR5fS5gO1xuICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudFByaW9yaXR5KTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnRDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3guY2xhc3NMaXN0LmFkZChcImNoZWNrYm94XCIpO1xuICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudENoZWNrYm94KTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Rhc2tFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS10aXRsZVwiKTtcbiAgbmV3VGFza0VsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudFRpdGxlKTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnREdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnREdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tZHVlLWRhdGVcIik7XG4gIG5ld1Rhc2tFbGVtZW50RHVlRGF0ZS50ZXh0Q29udGVudCA9IGR1ZURhdGU7XG4gIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50RHVlRGF0ZSk7XG4gIHRvZG9JdGVtcy5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudCk7XG5cbiAgaWYgKGNoZWNrZWQpIHtcbiAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LnRleHRDb250ZW50ID0gXCLinJNcIjtcbiAgICBuZXdUYXNrRWxlbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgfVxuXG4gIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoXG4gICAgICBuZXdUYXNrRWxlbWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIilcbiAgICAgICAgLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1jaGVja2VkXCIpXG4gICAgKSB7XG4gICAgICBuZXdUYXNrRWxlbWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIilcbiAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXVtcbiAgICAgICAgcHJpb3JpdHkgLSAxXG4gICAgICBdLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIHByb2plY3Quc2V0QXR0cmlidXRlKFxuICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgIHBhcnNlSW50KHByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgKTtcbiAgICAgIGlmIChpc1RvZGF5KGR1ZURhdGUpICYmIGlzT3ZlcmR1ZShkdWVEYXRlKSkge1xuICAgICAgICBjb25zdCBkdWVUb2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICAgICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgb3ZlcmR1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gICAgICAgIG92ZXJkdWUuc2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWUuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgKyAxXG4gICAgICAgICk7XG4gICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIHRydWUpO1xuICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgfVxuICAgICAgaWYgKGlzVG9kYXkoZHVlRGF0ZSkgJiYgIWlzT3ZlcmR1ZShkdWVEYXRlKSkge1xuICAgICAgICBjb25zdCBkdWVUb2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICAgICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgKTtcbiAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNPdmVyZHVlKGR1ZURhdGUpICYmICFpc1RvZGF5KGR1ZURhdGUpKSB7XG4gICAgICAgIGNvbnN0IG92ZXJkdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICAgICAgICBvdmVyZHVlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICAgICApO1xuICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCBmYWxzZSk7XG4gICAgICB9IGVsc2UgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdUYXNrRWxlbWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIilcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIuKck1wiO1xuICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXVtcbiAgICAgICAgcHJpb3JpdHkgLSAxXG4gICAgICBdLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgcHJvamVjdC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICApO1xuICAgICAgaWYgKGlzVG9kYXkoZHVlRGF0ZSkgJiYgaXNPdmVyZHVlKGR1ZURhdGUpKSB7XG4gICAgICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBvdmVyZHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICAgKTtcbiAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgdHJ1ZSk7XG4gICAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNUb2RheShkdWVEYXRlKSAmJiAhaXNPdmVyZHVlKGR1ZURhdGUpKSB7XG4gICAgICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgICApO1xuICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc092ZXJkdWUoZHVlRGF0ZSkgJiYgIWlzVG9kYXkoZHVlRGF0ZSkpIHtcbiAgICAgICAgY29uc3Qgb3ZlcmR1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gICAgICAgIG92ZXJkdWUuc2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWUuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICk7XG4gICAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCBmYWxzZSk7XG4gICAgfVxuICB9KTtcblxuICBjcmVhdGVEZXNjcmlwdGlvbihuZXdUYXNrRWxlbWVudCwgbmV3VGFza0VsZW1lbnRUaXRsZSwgZGVzY3JpcHRpb24pO1xuICBhZGRFZGl0QnV0dG9ucygpO1xufTtcblxuY29uc3QgY3JlYXRlTmV3VGFzayA9IChwcm9qZWN0KSA9PiB7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrXCIpLnZhbHVlO1xuICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGVcIikudmFsdWU7XG4gIGR1ZURhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKGR1ZURhdGUpKTtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB3ZWVrZGF5OiBcInNob3J0XCIsXG4gICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgbW9udGg6IFwic2hvcnRcIixcbiAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgIGhvdXI6IFwibnVtZXJpY1wiLFxuICAgIG1pbnV0ZTogXCJudW1lcmljXCIsXG4gIH07XG4gIGR1ZURhdGUgPSBkdWVEYXRlLnRvTG9jYWxlVGltZVN0cmluZyhcImVuLVVTXCIsIG9wdGlvbnMpO1xuICBpZiAoaXNUb2RheShkdWVEYXRlKSkge1xuICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSArIDFcbiAgICApO1xuICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKGZhbHNlLCB0cnVlKTtcbiAgfVxuICBpZiAoaXNPdmVyZHVlKGR1ZURhdGUpKSB7XG4gICAgY29uc3Qgb3ZlcmR1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgIHBhcnNlSW50KG92ZXJkdWUuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgKyAxXG4gICAgKTtcbiAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICB9XG4gIGxldCBwcmlvcml0eSA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWUpO1xuICBpZiAocHJpb3JpdHkgPT09IDApIHByaW9yaXR5ID0gMTtcbiAgaWYgKE51bWJlci5pc05hTihwcmlvcml0eSkpIHByaW9yaXR5ID0gSW5maW5pdHk7XG4gIGlmIChwcmlvcml0eSA+IHByb2plY3QubGVuZ3RoICsgMSkgcHJpb3JpdHkgPSBwcm9qZWN0Lmxlbmd0aCArIDE7XG4gIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb25cIikudmFsdWU7XG4gIGlmIChkZXNjcmlwdGlvbiA9PT0gXCJcIikgZGVzY3JpcHRpb24gPSBcIk5vIGRlc2NyaXB0aW9uIGF2YWlsYWJsZS5cIjtcbiAgY29uc3QgY2hlY2tlZCA9IGZhbHNlO1xuICBsZXQgZXhpc3RzID0gZmFsc2U7XG4gIGlmIChwcm9qZWN0W3ByaW9yaXR5IC0gMV0pIHtcbiAgICBleGlzdHMgPSB0cnVlO1xuICAgIG5ld1Rhc2socHJvamVjdCwgdGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBkZXNjcmlwdGlvbiwgY2hlY2tlZCwgZXhpc3RzKTtcbiAgICBwcm9qZWN0LmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgdGFzay5wcmlvcml0eSA9IHByb2plY3QuaW5kZXhPZih0YXNrKSArIDE7XG4gICAgfSk7XG4gICAgcmVzZXRUb2RvTGlzdChkYXNoYm9hcmQuaW5kZXhPZihwcm9qZWN0KSk7XG4gIH0gZWxzZSB7XG4gICAgbmV3VGFzayhwcm9qZWN0LCB0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIGRlc2NyaXB0aW9uLCBjaGVja2VkLCBleGlzdHMpO1xuICAgIGNyZWF0ZU5ld1Rhc2tFbGVtZW50KHByaW9yaXR5LCB0aXRsZSwgZHVlRGF0ZSwgZGVzY3JpcHRpb24sIGNoZWNrZWQpO1xuICAgIGNyZWF0ZUFkZE5ld1Rhc2tFbGVtZW50KCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGNyZWF0ZUFkZE5ld1Rhc2tFbGVtZW50LCBjcmVhdGVOZXdUYXNrRWxlbWVudCwgY3JlYXRlTmV3VGFzayB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCB7IGRhc2hib2FyZCB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1sb2dpY1wiO1xuaW1wb3J0IHtcbiAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24sXG4gIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50LFxufSBmcm9tIFwiLi9wcm9qZWN0LWNvbXBvbmVudHNcIjtcbmltcG9ydCBjcmVhdGVEZXNjcmlwdGlvbiBmcm9tIFwiLi90YXNrLWNvbXBvbmVudHNcIjtcblxuY29uc3QgaXNUb2RheSA9IChkYXRlKSA9PiB7XG4gIGxldCB0b2RheXNEYXRlID0gbmV3IERhdGUoKTtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB3ZWVrZGF5OiBcInNob3J0XCIsXG4gICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgbW9udGg6IFwic2hvcnRcIixcbiAgICBkYXk6IFwibnVtZXJpY1wiLFxuICB9O1xuICB0b2RheXNEYXRlID0gdG9kYXlzRGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoXCJlbi1VU1wiLCBvcHRpb25zKTtcbiAgY29uc3QgbGFzdENvbW1hID0gdG9kYXlzRGF0ZS5sYXN0SW5kZXhPZihcIixcIik7XG4gIHRvZGF5c0RhdGUgPSB0b2RheXNEYXRlLnN1YnN0cmluZygwLCBsYXN0Q29tbWEpO1xuICBpZiAoZGF0ZS5pbmNsdWRlcyh0b2RheXNEYXRlKSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGlzT3ZlcmR1ZSA9IChkYXRlKSA9PiB7XG4gIGNvbnN0IHRpbWUgPSBEYXRlLnBhcnNlKG5ldyBEYXRlKCkpO1xuICBjb25zdCBwYXJzZWREYXRlID0gRGF0ZS5wYXJzZShkYXRlKTtcbiAgaWYgKHBhcnNlZERhdGUgPCB0aW1lKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgZHVlVG9kYXkgPSAoKSA9PiB7XG4gIGNvbnN0IGR1ZVRvZGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICBjb25zdCBvdmVyZHVlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gIGxldCBudW1iZXJPZlRhc2tzID0gMDtcbiAgbGV0IG51bWJlck9mQ29tcGxldGVkVGFza3MgPSAwO1xuICBjb25zdCBkdWVUb2RheUZ1bmN0aW9uYWxpdHkgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gICAgdGFza3MucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgZGFzaGJvYXJkLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIHByb2plY3QuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICBpZiAoaXNUb2RheSh0YXNrLmR1ZURhdGUpKSB7XG4gICAgICAgICAgbnVtYmVyT2ZUYXNrcyArPSAxO1xuICAgICAgICAgIGNvbnN0IHByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1wcm9qZWN0PScke2Rhc2hib2FyZC5pbmRleE9mKHByb2plY3QpfSddYFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgbmV3VGFza0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW1cIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcIml0ZW1cIik7XG4gICAgICAgICAgY29uc3QgbmV3VGFza0VsZW1lbnRDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5jbGFzc0xpc3QuYWRkKFwiY2hlY2tib3hcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnRDaGVja2JveCk7XG4gICAgICAgICAgY29uc3QgbmV3VGFza0VsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLXRpdGxlXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50VGl0bGUpO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnREdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tZHVlLWRhdGVcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnREdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kdWVEYXRlO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50RHVlRGF0ZSk7XG4gICAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnQpO1xuXG4gICAgICAgICAgaWYgKHRhc2suY2hlY2tlZCkge1xuICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwi4pyTXCI7XG4gICAgICAgICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgICAgICAgICAgIG51bWJlck9mQ29tcGxldGVkVGFza3MgKz0gMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLXRpdGxlXCIpXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1jaGVja2VkXCIpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIilcbiAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgICAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgICAgIHRhc2suY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KHByb2plY3RFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKGlzT3ZlcmR1ZSh0YXNrLmR1ZURhdGUpKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmR1ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChvdmVyZHVlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSArIDFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdEVsZW1lbnQsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIilcbiAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgICAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LnRleHRDb250ZW50ID0gXCLinJNcIjtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgICAgIHRhc2suY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHByb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQocHJvamVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgICBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpZiAoaXNPdmVyZHVlKHRhc2suZHVlRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBvdmVyZHVlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWVFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0RWxlbWVudCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjcmVhdGVEZXNjcmlwdGlvbihcbiAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LFxuICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRUaXRsZSxcbiAgICAgICAgICAgIHRhc2suZGVzY3JpcHRpb25cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgZHVlVG9kYXlFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkdWVUb2RheUZ1bmN0aW9uYWxpdHkpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZHVlVG9kYXlGdW5jdGlvbmFsaXR5KTtcbiAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIiwgbnVtYmVyT2ZUYXNrcyk7XG4gIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiLCBudW1iZXJPZkNvbXBsZXRlZFRhc2tzKTtcbiAgbGV0IGR1ZVRvZGF5RWxlbWVudFRpdGxlID0gZHVlVG9kYXlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIuc2lkZWJhci1pdGVtLXRpdGxlXCJcbiAgKS50ZXh0Q29udGVudDtcbiAgZHVlVG9kYXlFbGVtZW50VGl0bGUgPSBgJHtkdWVUb2RheUVsZW1lbnRUaXRsZX0gKCR7bnVtYmVyT2ZDb21wbGV0ZWRUYXNrc30vJHtudW1iZXJPZlRhc2tzfSlgO1xuICBkdWVUb2RheUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIikudGV4dENvbnRlbnQgPVxuICAgIGR1ZVRvZGF5RWxlbWVudFRpdGxlO1xuICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihmYWxzZSwgdHJ1ZSk7XG59O1xuXG5jb25zdCBvdmVyZHVlID0gKCkgPT4ge1xuICBjb25zdCBvdmVyZHVlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gIGNvbnN0IGR1ZVRvZGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICBsZXQgbnVtYmVyT2ZUYXNrcyA9IDA7XG4gIGNvbnN0IG92ZXJkdWVGdW5jdGlvbmFsaXR5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICAgIHRhc2tzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIGRhc2hib2FyZC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBwcm9qZWN0LmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgaWYgKGlzT3ZlcmR1ZSh0YXNrLmR1ZURhdGUpICYmICF0YXNrLmNoZWNrZWQpIHtcbiAgICAgICAgICBudW1iZXJPZlRhc2tzICs9IDE7XG4gICAgICAgICAgY29uc3QgcHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYFtkYXRhLXByb2plY3Q9JyR7ZGFzaGJvYXJkLmluZGV4T2YocHJvamVjdCl9J11gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaXRlbVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwib3ZlcmR1ZVwiKTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudENoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveFwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudENoZWNrYm94KTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tdGl0bGVcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnRUaXRsZSk7XG4gICAgICAgICAgY29uc3QgbmV3VGFza0VsZW1lbnREdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudER1ZURhdGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1kdWUtZGF0ZVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudER1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnREdWVEYXRlKTtcbiAgICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudCk7XG5cbiAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgIHRhc2suY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICBvdmVyZHVlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgICBwYXJzZUludChvdmVyZHVlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgcGFyc2VJbnQocHJvamVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChpc1RvZGF5KHRhc2suZHVlRGF0ZSkpIHtcbiAgICAgICAgICAgICAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSArIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdEVsZW1lbnQsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3RFbGVtZW50LCBmYWxzZSk7XG4gICAgICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICAgICAgdGFza3MucmVtb3ZlQ2hpbGQobmV3VGFza0VsZW1lbnQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY3JlYXRlRGVzY3JpcHRpb24oXG4gICAgICAgICAgICBuZXdUYXNrRWxlbWVudCxcbiAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUsXG4gICAgICAgICAgICB0YXNrLmRlc2NyaXB0aW9uXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG4gIG92ZXJkdWVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvdmVyZHVlRnVuY3Rpb25hbGl0eSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBvdmVyZHVlRnVuY3Rpb25hbGl0eSk7XG4gIG92ZXJkdWVFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIiwgbnVtYmVyT2ZUYXNrcyk7XG4gIGxldCBvdmVyZHVlRWxlbWVudFRpdGxlID0gb3ZlcmR1ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIlxuICApLnRleHRDb250ZW50O1xuICBvdmVyZHVlRWxlbWVudFRpdGxlID0gYCR7b3ZlcmR1ZUVsZW1lbnRUaXRsZX0gKCR7bnVtYmVyT2ZUYXNrc30pYDtcbiAgb3ZlcmR1ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIikudGV4dENvbnRlbnQgPVxuICAgIG92ZXJkdWVFbGVtZW50VGl0bGU7XG4gIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG59O1xuXG5leHBvcnQgeyBpc1RvZGF5LCBkdWVUb2RheSwgaXNPdmVyZHVlLCBvdmVyZHVlIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgeyBjcmVhdGVEcm9wZG93bkhpZGVyLCBhZGRFZGl0QnV0dG9ucyB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1jb21wb25lbnRzXCI7XG5pbXBvcnQgbW9kYWxDb250cm9scyBmcm9tIFwiLi9tb2RhbC1jb250cm9sc1wiO1xuaW1wb3J0IHsgZHVlVG9kYXksIG92ZXJkdWUgfSBmcm9tIFwiLi90aW1lXCI7XG5cbmNyZWF0ZURyb3Bkb3duSGlkZXIoKTtcbmFkZEVkaXRCdXR0b25zKCk7XG5tb2RhbENvbnRyb2xzKCk7XG5kdWVUb2RheSgpO1xub3ZlcmR1ZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9