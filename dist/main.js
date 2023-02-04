/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/local-storage.js":
/*!******************************!*\
  !*** ./src/local-storage.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "populatePage": () => (/* binding */ populatePage),
/* harmony export */   "storageIsAvailable": () => (/* binding */ storageIsAvailable),
/* harmony export */   "updateStorage": () => (/* binding */ updateStorage)
/* harmony export */ });
/* harmony import */ var _project_task_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project-task-logic */ "./src/project-task-logic.js");
/* harmony import */ var _project_task_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-task-components */ "./src/project-task-components.js");
/* harmony import */ var _project_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project-components */ "./src/project-components.js");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./time */ "./src/time.js");
/* harmony import */ var _task_creation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./task-creation */ "./src/task-creation.js");
/* eslint-disable radix */






const storageIsAvailable = (type) => {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
};

const createProjectElement = (title, pageReset) => {
  const overdueElement = document.querySelector(".sidebar-item-overdue");
  const dueTodayElement = document.querySelector(".sidebar-item-today");
  const addNewProjectElement = document.querySelector(".sidebar-item-add");
  const newProjectElement = document.createElement("div");
  newProjectElement.classList.add("sidebar-item");
  newProjectElement.classList.add("item");
  newProjectElement.setAttribute("data-project", pageReset);
  let completedTasks = 0;
  _project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard[pageReset].forEach((task) => {
    if (task.checked) {
      if ((0,_time__WEBPACK_IMPORTED_MODULE_3__.isToday)(task.dueDate)) {
        dueTodayElement.setAttribute(
          "data-tasks",
          parseInt(dueTodayElement.getAttribute("data-tasks")) + 1
        );
        dueTodayElement.setAttribute(
          "data-completed",
          parseInt(dueTodayElement.getAttribute("data-completed")) + 1
        );
      }
      completedTasks += 1;
    } else {
      if ((0,_time__WEBPACK_IMPORTED_MODULE_3__.isOverdue)(task.dueDate)) {
        overdueElement.setAttribute(
          "data-tasks",
          parseInt(overdueElement.getAttribute("data-tasks")) + 1
        );
      }
      if ((0,_time__WEBPACK_IMPORTED_MODULE_3__.isToday)(task.dueDate)) {
        dueTodayElement.setAttribute(
          "data-tasks",
          parseInt(dueTodayElement.getAttribute("data-tasks")) + 1
        );
      }
    }
  });
  newProjectElement.setAttribute("data-completed", completedTasks);
  const newProjectElementTitle = document.createElement("div");
  newProjectElementTitle.classList.add("sidebar-item-title");
  newProjectElementTitle.textContent = `${title} (${newProjectElement.getAttribute(
    "data-completed"
  )}/${_project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard[pageReset].length})`;
  newProjectElement.appendChild(newProjectElementTitle);
  addNewProjectElement.insertAdjacentElement("beforebegin", newProjectElement);

  (0,_project_task_components__WEBPACK_IMPORTED_MODULE_1__.addEditButtons)();

  (0,_project_components__WEBPACK_IMPORTED_MODULE_2__.createOverdueTasksCount)();
  (0,_project_components__WEBPACK_IMPORTED_MODULE_2__.createProjectCompletion)(newProjectElement, true);

  newProjectElementTitle.addEventListener("click", () => {
    const tasks = document.querySelector(".todo-items");
    const projectNumber = newProjectElement.getAttribute("data-project");
    tasks.setAttribute("data-project", projectNumber);
    tasks.replaceChildren();
    (0,_task_creation__WEBPACK_IMPORTED_MODULE_4__.resetTodoList)(projectNumber);
  });
};

const updateStorage = () => {
  localStorage.setItem("dashboard", JSON.stringify(_project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard));
  localStorage.setItem("projectNames", JSON.stringify(_project_task_logic__WEBPACK_IMPORTED_MODULE_0__.projectNames));
  console.log("Yo");
};

const target = document.querySelector(".content");
const config = { attributes: true, childList: true, subtree: true };
const callback = () => updateStorage();
const observer = new MutationObserver(callback);
observer.observe(target, config);

const populatePage = () => {
  console.log("It worked!");
  console.log(_project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard);
  _project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard.forEach((project) => {
    const projectIndex = _project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard.indexOf(project);
    const projectTitle = _project_task_logic__WEBPACK_IMPORTED_MODULE_0__.projectNames[projectIndex];
    console.log(projectTitle);
    createProjectElement(projectTitle, projectIndex);
  });
};




/***/ }),

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
/* harmony import */ var _task_creation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task-creation */ "./src/task-creation.js");




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
    (0,_task_creation__WEBPACK_IMPORTED_MODULE_2__.resetTodoList)(projectNumber);
  });
};

const createNewProject = () => {
  const title = document.getElementById("project-name").value;
  (0,_project_task_logic__WEBPACK_IMPORTED_MODULE_0__.newProject)(title);
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
/* harmony export */   "checkboxFunctionality": () => (/* binding */ checkboxFunctionality),
/* harmony export */   "createDropdownHider": () => (/* binding */ createDropdownHider),
/* harmony export */   "editFunctionality": () => (/* binding */ editFunctionality)
/* harmony export */ });
/* harmony import */ var _icons_dots_vertical_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons/dots-vertical.svg */ "./src/icons/dots-vertical.svg");
/* harmony import */ var _project_task_logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-task-logic */ "./src/project-task-logic.js");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time */ "./src/time.js");
/* harmony import */ var _project_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project-components */ "./src/project-components.js");
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

const checkboxFunctionality = (
  taskElement,
  taskElementCheckbox,
  todoItems,
  priority,
  project,
  dueDate
) => {
  if (
    taskElement
      .querySelector(".todo-item-title")
      .classList.contains("todo-item-checked")
  ) {
    taskElement
      .querySelector(".todo-item-title")
      .classList.remove("todo-item-checked");
    // eslint-disable-next-line no-param-reassign
    taskElementCheckbox.textContent = "";
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
      (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createProjectCompletion)(project, true);
      (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createOverdueTasksCount)();
    }
    if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(dueDate) && !(0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(dueDate)) {
      const dueToday = document.querySelector(".sidebar-item-today");
      dueToday.setAttribute(
        "data-completed",
        parseInt(dueToday.getAttribute("data-completed")) - 1
      );
      (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createProjectCompletion)(project, true);
    }
    if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(dueDate) && !(0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(dueDate)) {
      const overdue = document.querySelector(".sidebar-item-overdue");
      overdue.setAttribute(
        "data-tasks",
        parseInt(overdue.getAttribute("data-tasks")) + 1
      );
      (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createOverdueTasksCount)();
      (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createProjectCompletion)(project, false);
    } else (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createProjectCompletion)(project, false);
  } else {
    taskElement
      .querySelector(".todo-item-title")
      .classList.add("todo-item-checked");
    // eslint-disable-next-line no-param-reassign
    taskElementCheckbox.textContent = "✓";
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
      (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createProjectCompletion)(project, true);
      (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createOverdueTasksCount)();
    }
    if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(dueDate) && !(0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(dueDate)) {
      const dueToday = document.querySelector(".sidebar-item-today");
      dueToday.setAttribute(
        "data-completed",
        parseInt(dueToday.getAttribute("data-completed")) + 1
      );
      (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createProjectCompletion)(project, true);
    }
    if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(dueDate) && !(0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(dueDate)) {
      const overdue = document.querySelector(".sidebar-item-overdue");
      overdue.setAttribute(
        "data-tasks",
        parseInt(overdue.getAttribute("data-tasks")) - 1
      );
      (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createOverdueTasksCount)();
      (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createProjectCompletion)(project, false);
    } else (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createProjectCompletion)(project, false);
  }
};

// Create edit option functionality
const editFunctionality = (item) => {
  const projectNumber = parseInt(
    document.querySelector(".todo-items").getAttribute("data-project")
  );
  if (item.classList.contains("sidebar-item")) {
    const itemTitle = item.querySelector(".sidebar-item-title");
    const projectIndex = parseInt(item.getAttribute("data-project"));
    const projectEditModal = document.querySelector(".project-edit-modal");
    const projectEditModalTitle = document.getElementById("project-name-edit");
    const projectEditModalSubmitButton = document.getElementById(
      "project-edit-submit-button"
    );
    const projectEditModalSubmitButtonClone =
      projectEditModalSubmitButton.cloneNode(true);
    const projectCompletionRegex = /\(\d*\/\d*\)/;
    const projectCompletionIndex = itemTitle.textContent.search(
      projectCompletionRegex
    );
    const projectCompletion = itemTitle.textContent.substring(
      projectCompletionIndex
    );
    projectEditModalTitle.value = itemTitle.textContent.substring(
      0,
      projectCompletionIndex - 1
    );

    projectEditModalSubmitButton.replaceWith(projectEditModalSubmitButtonClone);

    projectEditModalSubmitButtonClone.addEventListener("click", () => {
      const projectEditModalInputs = Array.from(
        projectEditModal.querySelectorAll("input")
      );
      if (projectEditModalInputs.every(validityCheck)) {
        itemTitle.textContent = `${projectEditModalTitle.value} ${projectCompletion}`;
        _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.projectNames[projectIndex] = projectEditModalTitle.value;
        projectEditModal.style.visibility = "hidden";
      }
    });
  } else {
    const itemPriority = item.firstChild;
    const itemTitle = item.querySelector(".todo-item-title");
    const itemDueDate = item.querySelector(".todo-item-due-date");
    const taskToEdit =
      _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectNumber][parseInt(item.firstChild.textContent) - 1];
    const previouslyOverdue = (0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(itemDueDate.textContent);
    const previouslyDueToday = (0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(itemDueDate.textContent);
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
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
    taskEditModalDate.value = new Date(
      new Date(taskToEdit.dueDate).getTime() - timeZoneOffset
    )
      .toISOString()
      .slice(0, -8);
    taskEditModalPriority.value = taskToEdit.priority;
    taskEditModalDescription.value = taskToEdit.description;

    taskEditModalSubmitButton.replaceWith(taskEditModalSubmitButtonClone);

    taskEditModalSubmitButtonClone.addEventListener("click", () => {
      const taskEditModalInputs = Array.from(
        taskEditModal.querySelectorAll("input")
      );
      if (taskEditModalInputs.every(validityCheck)) {
        const overdueElement = document.querySelector(".sidebar-item-overdue");
        const dueTodayElement = document.querySelector(".sidebar-item-today");
        const todoItems = document.querySelector(".todo-items");
        const dueDate = new Date(Date.parse(taskEditModalDate.value));
        const options = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        };
        const formattedDueDate = dueDate.toLocaleTimeString("en-US", options);
        const oldDueDate = taskToEdit.dueDate;
        const checkbox = item.querySelector(".checkbox");
        const checkboxClone = checkbox.cloneNode(true);
        const oldTaskPriority = taskToEdit.priority;
        let taskPriority = parseInt(taskEditModalPriority.value);
        if (taskPriority === 0) taskPriority = 1;
        if (Number.isNaN(taskPriority)) taskPriority = Infinity;
        if (taskPriority > _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectNumber].length) {
          taskPriority = _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectNumber].length;
        }
        if (taskPriority !== oldTaskPriority) {
          if (taskPriority > oldTaskPriority) {
            let nextTask = item.nextSibling;
            let existingTask = null;
            todoItems.querySelectorAll(".todo-item").forEach((task) => {
              if (task.firstChild.textContent === `${taskPriority}.`)
                existingTask = task;
            });
            if (
              existingTask.nextSibling.classList.contains(
                "todo-item-description"
              )
            ) {
              const existingTaskDescription = existingTask.nextSibling;
              existingTaskDescription.insertAdjacentElement("afterend", item);
            } else existingTask.insertAdjacentElement("afterend", item);
            if (nextTask.classList.contains("todo-item-description")) {
              const tempTaskVar = nextTask.nextSibling;
              item.insertAdjacentElement("afterend", nextTask);
              nextTask = tempTaskVar;
            }
            for (let i = oldTaskPriority; i < taskPriority; i += 1) {
              const elementPriority = nextTask.firstChild;
              const periodIndex = elementPriority.textContent.indexOf(".");
              const elementPriorityNoPeriod =
                elementPriority.textContent.substring(0, periodIndex);
              const newElementPriority = `${
                parseInt(elementPriorityNoPeriod) - 1
              }.`;
              elementPriority.textContent = newElementPriority;
              _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[parseInt(todoItems.getAttribute("data-project"))][
                parseInt(elementPriorityNoPeriod) - 1
              ].priority -= 1;
              nextTask = nextTask.nextSibling;
              if (nextTask.classList.contains("todo-item-description")) {
                nextTask = nextTask.nextSibling;
              }
            }
            _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[parseInt(todoItems.getAttribute("data-project"))].splice(
              taskPriority,
              0,
              taskToEdit
            );
            _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[parseInt(todoItems.getAttribute("data-project"))].splice(
              oldTaskPriority - 1,
              1
            );
          }
          if (taskPriority < oldTaskPriority) {
            let existingTask = null;
            todoItems.querySelectorAll(".todo-item").forEach((task) => {
              if (task.firstChild.textContent === `${taskPriority}.`)
                existingTask = task;
            });
            const possibleTaskDescription = item.nextSibling;
            existingTask.insertAdjacentElement("beforebegin", item);
            let nextTask = item.nextSibling;
            if (
              possibleTaskDescription.classList.contains(
                "todo-item-description"
              )
            ) {
              item.insertAdjacentElement("afterend", possibleTaskDescription);
            }
            for (let i = taskPriority; i < oldTaskPriority; i += 1) {
              const elementPriority = nextTask.firstChild;
              const periodIndex = elementPriority.textContent.indexOf(".");
              const elementPriorityNoPeriod =
                elementPriority.textContent.substring(0, periodIndex);
              const newElementPriority = `${
                parseInt(elementPriorityNoPeriod) + 1
              }.`;
              elementPriority.textContent = newElementPriority;
              _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[parseInt(todoItems.getAttribute("data-project"))][
                parseInt(elementPriorityNoPeriod) - 1
              ].priority += 1;
              nextTask = nextTask.nextSibling;
              if (nextTask.classList.contains("todo-item-description")) {
                nextTask = nextTask.nextSibling;
              }
            }
            _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[parseInt(todoItems.getAttribute("data-project"))].splice(
              taskPriority - 1,
              0,
              taskToEdit
            );
            _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[parseInt(todoItems.getAttribute("data-project"))].splice(
              oldTaskPriority,
              1
            );
          }
        }
        taskToEdit.title = taskEditModalTitle.value;
        taskToEdit.dueDate = formattedDueDate;
        taskToEdit.priority = taskPriority;
        taskToEdit.description = taskEditModalDescription.value;
        const nextItem = item.nextSibling;
        if (nextItem.classList.contains("todo-item-description"))
          nextItem.textContent = taskToEdit.description;
        itemPriority.textContent = `${taskPriority}.`;
        itemTitle.textContent = taskToEdit.title;
        itemDueDate.textContent = formattedDueDate;
        if (
          (0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(formattedDueDate) &&
          !previouslyOverdue &&
          !taskToEdit.checked
        ) {
          overdueElement.setAttribute(
            "data-tasks",
            parseInt(overdueElement.getAttribute("data-tasks")) + 1
          );
          (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createOverdueTasksCount)();
        }
        if (
          !(0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(formattedDueDate) &&
          previouslyOverdue &&
          !taskToEdit.checked
        ) {
          overdueElement.setAttribute(
            "data-tasks",
            parseInt(overdueElement.getAttribute("data-tasks")) - 1
          );
          (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createOverdueTasksCount)();
        }
        if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(formattedDueDate) && !previouslyDueToday) {
          dueTodayElement.setAttribute(
            "data-tasks",
            parseInt(dueTodayElement.getAttribute("data-tasks")) + 1
          );
          if (taskToEdit.checked) {
            dueTodayElement.setAttribute(
              "data-completed",
              parseInt(dueTodayElement.getAttribute("data-completed")) + 1
            );
          }
          (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createProjectCompletion)(false, true);
        }
        if (!(0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(formattedDueDate) && previouslyDueToday) {
          dueTodayElement.setAttribute(
            "data-tasks",
            parseInt(dueTodayElement.getAttribute("data-tasks")) - 1
          );
          if (taskToEdit.checked) {
            dueTodayElement.setAttribute(
              "data-completed",
              parseInt(dueTodayElement.getAttribute("data-completed")) - 1
            );
          }
          (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createProjectCompletion)(false, true);
        }
        if (oldDueDate !== formattedDueDate) {
          const project = document.querySelector(
            `[data-project='${projectNumber}']`
          );
          const priority = parseInt(taskToEdit.priority);
          checkbox.replaceWith(checkboxClone);

          checkboxClone.addEventListener("click", () => {
            checkboxFunctionality(
              item,
              checkboxClone,
              todoItems,
              priority,
              project,
              formattedDueDate
            );
          });
        }

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
          if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(task.dueDate) && !task.checked) {
            overdue.setAttribute(
              "data-tasks",
              parseInt(overdue.getAttribute("data-tasks")) - 1
            );
            (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createOverdueTasksCount)();
          }
          if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(task.dueDate)) {
            if (task.checked)
              dueToday.setAttribute(
                "data-completed",
                parseInt(dueToday.getAttribute("data-completed")) - 1
              );
            dueToday.setAttribute(
              "data-tasks",
              parseInt(dueToday.getAttribute("data-tasks")) - 1
            );
            (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createProjectCompletion)(false, true);
          }
        });
        _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard.splice(projectIndex, 1);
        _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.projectNames.splice(projectIndex, 1);
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
        let nextTask = parentItem.nextSibling;
        if (nextTask.classList.contains("todo-item-add")) {
          nextTask = false;
        }
        parentItem.remove();
        for (let i = index + 1; i < lastTaskIndex + 1; i += 1) {
          _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectIndex][i].priority -= 1;
        }
        if (task.checked)
          project.setAttribute(
            "data-completed",
            parseInt(project.getAttribute("data-completed")) - 1
          );
        if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isOverdue)(task.dueDate) && !task.checked) {
          overdue.setAttribute(
            "data-tasks",
            parseInt(overdue.getAttribute("data-tasks")) - 1
          );
          (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createOverdueTasksCount)();
        }
        if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.isToday)(task.dueDate)) {
          if (task.checked)
            dueToday.setAttribute(
              "data-completed",
              parseInt(dueToday.getAttribute("data-completed")) - 1
            );
          dueToday.setAttribute(
            "data-tasks",
            parseInt(dueToday.getAttribute("data-tasks")) - 1
          );
          _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectIndex].splice(index, 1);
          (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createProjectCompletion)(project, true);
        } else {
          (0,_project_components__WEBPACK_IMPORTED_MODULE_3__.createProjectCompletion)(project, false);
          _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectIndex].splice(index, 1);
        }
        while (nextTask) {
          const elementPriority = nextTask.firstChild;
          const periodIndex = elementPriority.textContent.indexOf(".");
          const elementPriorityNoPeriod = elementPriority.textContent.substring(
            0,
            periodIndex
          );
          const newElementPriority = `${
            parseInt(elementPriorityNoPeriod) - 1
          }.`;
          elementPriority.textContent = newElementPriority;
          nextTask = nextTask.nextSibling;
          if (nextTask) {
            if (nextTask.classList.contains("todo-item-description")) {
              nextTask = nextTask.nextSibling;
            }
            if (nextTask && nextTask.classList.contains("todo-item-add")) {
              nextTask = false;
            }
          }
        }
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
/* harmony export */   "existingProjectsCheck": () => (/* binding */ existingProjectsCheck),
/* harmony export */   "newProject": () => (/* binding */ newProject),
/* harmony export */   "newTask": () => (/* binding */ newTask),
/* harmony export */   "projectNames": () => (/* binding */ projectNames)
/* harmony export */ });
const dataCreation = () => {
  if (localStorage.getItem("dashboard")) {
    const dashboardTemp = JSON.parse(localStorage.getItem("dashboard"));
    const projectNamesTemp = JSON.parse(localStorage.getItem("projectNames"));
    return [dashboardTemp, projectNamesTemp];
  }
  const dashboardTemp = [];
  const projectNamesTemp = [];
  return [dashboardTemp, projectNamesTemp];
};

const dashboard = dataCreation()[0];
const projectNames = dataCreation()[1];

const existingProjectsCheck = () => {
  if (localStorage.getItem("dashboard")) {
    return true;
  }
  return false;
};

const newProject = (projectName) => {
  dashboard.push([]);
  projectNames.push(projectName);
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
/* harmony export */   "createNewTaskElement": () => (/* binding */ createNewTaskElement),
/* harmony export */   "resetTodoList": () => (/* binding */ resetTodoList)
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
    (0,_project_task_components__WEBPACK_IMPORTED_MODULE_4__.checkboxFunctionality)(
      newTaskElement,
      newTaskElementCheckbox,
      todoItems,
      priority,
      project,
      dueDate
    );
  });

  (0,_task_components__WEBPACK_IMPORTED_MODULE_3__["default"])(newTaskElement, newTaskElementTitle, description);
  (0,_project_task_components__WEBPACK_IMPORTED_MODULE_4__.addEditButtons)();
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

    createNewTaskElement(
      taskPriority,
      taskTitle,
      taskDueDate,
      taskDescription,
      taskChecked
    );
  });
  createAddNewTaskElement();
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
    resetTodoList(_project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard.indexOf(project));
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
/* harmony import */ var _local_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./local-storage */ "./src/local-storage.js");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./time */ "./src/time.js");
/* harmony import */ var _project_task_logic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-task-logic */ "./src/project-task-logic.js");






(0,_project_task_components__WEBPACK_IMPORTED_MODULE_0__.createDropdownHider)();
(0,_project_task_components__WEBPACK_IMPORTED_MODULE_0__.addEditButtons)();
(0,_modal_controls__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_time__WEBPACK_IMPORTED_MODULE_3__.dueToday)();
(0,_time__WEBPACK_IMPORTED_MODULE_3__.overdue)();
if ((0,_local_storage__WEBPACK_IMPORTED_MODULE_2__.storageIsAvailable)("localStorage") && (0,_project_task_logic__WEBPACK_IMPORTED_MODULE_4__.existingProjectsCheck)()) {
  (0,_local_storage__WEBPACK_IMPORTED_MODULE_2__.populatePage)();
  console.log("HI!");
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZnRjtBQUNuQztBQUNzQjtBQUN4QjtBQUNrQjs7QUFFN0QsNkVBQW1CO0FBQ25CLHdFQUFjO0FBQ2QsMkRBQWE7QUFDYiwrQ0FBUTtBQUNSLDhDQUFPO0FBQ1AsSUFBSSxrRUFBa0Isb0JBQW9CLDBFQUFxQjtBQUMvRCxFQUFFLDREQUFZO0FBQ2Q7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9sb2NhbC1zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2RhbC1jb250cm9scy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC1jb21wb25lbnRzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LWNyZWF0aW9uLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LXRhc2stY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC10YXNrLWxvZ2ljLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLWNvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2stY3JlYXRpb24uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RpbWUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByYWRpeCAqL1xuaW1wb3J0IHsgZGFzaGJvYXJkLCBwcm9qZWN0TmFtZXMgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcbmltcG9ydCB7IGFkZEVkaXRCdXR0b25zIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWNvbXBvbmVudHNcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uLFxuICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCxcbn0gZnJvbSBcIi4vcHJvamVjdC1jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBpc092ZXJkdWUsIGlzVG9kYXkgfSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQgeyByZXNldFRvZG9MaXN0IH0gZnJvbSBcIi4vdGFzay1jcmVhdGlvblwiO1xuXG5jb25zdCBzdG9yYWdlSXNBdmFpbGFibGUgPSAodHlwZSkgPT4ge1xuICBsZXQgc3RvcmFnZTtcbiAgdHJ5IHtcbiAgICBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xuICAgIGNvbnN0IHggPSBcIl9fc3RvcmFnZV90ZXN0X19cIjtcbiAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiZcbiAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgIChlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gXCJRdW90YUV4Y2VlZGVkRXJyb3JcIiB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gXCJOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRFwiKSAmJlxuICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcbiAgICAgIHN0b3JhZ2UgJiZcbiAgICAgIHN0b3JhZ2UubGVuZ3RoICE9PSAwXG4gICAgKTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlUHJvamVjdEVsZW1lbnQgPSAodGl0bGUsIHBhZ2VSZXNldCkgPT4ge1xuICBjb25zdCBvdmVyZHVlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gIGNvbnN0IGR1ZVRvZGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICBjb25zdCBhZGROZXdQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLWFkZFwiKTtcbiAgY29uc3QgbmV3UHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2lkZWJhci1pdGVtXCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaXRlbVwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIsIHBhZ2VSZXNldCk7XG4gIGxldCBjb21wbGV0ZWRUYXNrcyA9IDA7XG4gIGRhc2hib2FyZFtwYWdlUmVzZXRdLmZvckVhY2goKHRhc2spID0+IHtcbiAgICBpZiAodGFzay5jaGVja2VkKSB7XG4gICAgICBpZiAoaXNUb2RheSh0YXNrLmR1ZURhdGUpKSB7XG4gICAgICAgIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICAgICApO1xuICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29tcGxldGVkVGFza3MgKz0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzT3ZlcmR1ZSh0YXNrLmR1ZURhdGUpKSB7XG4gICAgICAgIG92ZXJkdWVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICBwYXJzZUludChvdmVyZHVlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSArIDFcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1RvZGF5KHRhc2suZHVlRGF0ZSkpIHtcbiAgICAgICAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgKyAxXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIiwgY29tcGxldGVkVGFza3MpO1xuICBjb25zdCBuZXdQcm9qZWN0RWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKFwic2lkZWJhci1pdGVtLXRpdGxlXCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gYCR7dGl0bGV9ICgke25ld1Byb2plY3RFbGVtZW50LmdldEF0dHJpYnV0ZShcbiAgICBcImRhdGEtY29tcGxldGVkXCJcbiAgKX0vJHtkYXNoYm9hcmRbcGFnZVJlc2V0XS5sZW5ndGh9KWA7XG4gIG5ld1Byb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Byb2plY3RFbGVtZW50VGl0bGUpO1xuICBhZGROZXdQcm9qZWN0RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmViZWdpblwiLCBuZXdQcm9qZWN0RWxlbWVudCk7XG5cbiAgYWRkRWRpdEJ1dHRvbnMoKTtcblxuICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihuZXdQcm9qZWN0RWxlbWVudCwgdHJ1ZSk7XG5cbiAgbmV3UHJvamVjdEVsZW1lbnRUaXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICAgIGNvbnN0IHByb2plY3ROdW1iZXIgPSBuZXdQcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIik7XG4gICAgdGFza3Muc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIsIHByb2plY3ROdW1iZXIpO1xuICAgIHRhc2tzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIHJlc2V0VG9kb0xpc3QocHJvamVjdE51bWJlcik7XG4gIH0pO1xufTtcblxuY29uc3QgdXBkYXRlU3RvcmFnZSA9ICgpID0+IHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJkYXNoYm9hcmRcIiwgSlNPTi5zdHJpbmdpZnkoZGFzaGJvYXJkKSk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdE5hbWVzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3ROYW1lcykpO1xuICBjb25zb2xlLmxvZyhcIllvXCIpO1xufTtcblxuY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpO1xuY29uc3QgY29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfTtcbmNvbnN0IGNhbGxiYWNrID0gKCkgPT4gdXBkYXRlU3RvcmFnZSgpO1xuY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XG5vYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgY29uZmlnKTtcblxuY29uc3QgcG9wdWxhdGVQYWdlID0gKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcIkl0IHdvcmtlZCFcIik7XG4gIGNvbnNvbGUubG9nKGRhc2hib2FyZCk7XG4gIGRhc2hib2FyZC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEluZGV4ID0gZGFzaGJvYXJkLmluZGV4T2YocHJvamVjdCk7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gcHJvamVjdE5hbWVzW3Byb2plY3RJbmRleF07XG4gICAgY29uc29sZS5sb2cocHJvamVjdFRpdGxlKTtcbiAgICBjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0VGl0bGUsIHByb2plY3RJbmRleCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgc3RvcmFnZUlzQXZhaWxhYmxlLCB1cGRhdGVTdG9yYWdlLCBwb3B1bGF0ZVBhZ2UgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQgY3JlYXRlTmV3UHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0LWNyZWF0aW9uXCI7XG5pbXBvcnQgeyBkYXNoYm9hcmQgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcbmltcG9ydCB7IGNyZWF0ZU5ld1Rhc2sgfSBmcm9tIFwiLi90YXNrLWNyZWF0aW9uXCI7XG5cbmNvbnN0IHZhbGlkaXR5Q2hlY2sgPSAoaW5wdXQpID0+IGlucHV0LnZhbGlkaXR5LnZhbGlkO1xuXG4vLyBDcmVhdGUgb3Blbi9jbG9zZSBjb250cm9scyBmb3IgYWxsIG1vZGFsc1xuY29uc3QgbW9kYWxDb250cm9scyA9ICgpID0+IHtcbiAgY29uc3QgYWRkTmV3UHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXByb2plY3RcIik7XG4gIGNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1tb2RhbFwiKTtcbiAgY29uc3QgcHJvamVjdEVkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1lZGl0LW1vZGFsXCIpO1xuICBjb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbW9kYWxcIik7XG4gIGNvbnN0IHRhc2tFZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZWRpdC1tb2RhbFwiKTtcbiAgY29uc3QgcHJvamVjdENsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWNsb3NlLWJ1dHRvblwiKTtcbiAgY29uc3QgcHJvamVjdEVkaXRDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIucHJvamVjdC1lZGl0LWNsb3NlLWJ1dHRvblwiXG4gICk7XG4gIGNvbnN0IHRhc2tDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jbG9zZS1idXR0b25cIik7XG4gIGNvbnN0IHRhc2tFZGl0Q2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZWRpdC1jbG9zZS1idXR0b25cIik7XG4gIGNvbnN0IHByb2plY3RTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3Qtc3VibWl0LWJ1dHRvblwiKTtcbiAgY29uc3QgdGFza1N1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1zdWJtaXQtYnV0dG9uXCIpO1xuXG4gIGFkZE5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybVwiKS5yZXNldCgpO1xuICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH0pO1xuXG4gIHByb2plY3RDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgcHJvamVjdEVkaXRDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHByb2plY3RFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIH0pO1xuXG4gIHRhc2tDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRhc2tNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgdGFza0VkaXRDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRhc2tFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIH0pO1xuXG4gIHByb2plY3RNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gcHJvamVjdE1vZGFsKSB7XG4gICAgICBwcm9qZWN0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcblxuICBwcm9qZWN0RWRpdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBwcm9qZWN0RWRpdE1vZGFsKSB7XG4gICAgICBwcm9qZWN0RWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG5cbiAgdGFza01vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0YXNrTW9kYWwpIHtcbiAgICAgIHRhc2tNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHRhc2tFZGl0TW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IHRhc2tFZGl0TW9kYWwpIHtcbiAgICAgIHRhc2tFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcblxuICBwcm9qZWN0U3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdE1vZGFsSW5wdXRzID0gQXJyYXkuZnJvbShcbiAgICAgIHByb2plY3RNb2RhbC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIilcbiAgICApO1xuICAgIGlmIChwcm9qZWN0TW9kYWxJbnB1dHMuZXZlcnkodmFsaWRpdHlDaGVjaykpIHtcbiAgICAgIGNyZWF0ZU5ld1Byb2plY3QoKTtcbiAgICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHRhc2tTdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCB0YXNrTW9kYWxJbnB1dHMgPSBBcnJheS5mcm9tKHRhc2tNb2RhbC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIikpO1xuICAgIGlmICh0YXNrTW9kYWxJbnB1dHMuZXZlcnkodmFsaWRpdHlDaGVjaykpIHtcbiAgICAgIGNvbnN0IHRvZG9JdGVtc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgICAgIGNvbnN0IHByb2plY3QgPVxuICAgICAgICBkYXNoYm9hcmRbcGFyc2VJbnQodG9kb0l0ZW1zQ29udGFpbmVyLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldO1xuICAgICAgY3JlYXRlTmV3VGFzayhwcm9qZWN0KTtcbiAgICAgIHRhc2tNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbW9kYWxDb250cm9scztcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQgeyBkYXNoYm9hcmQgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcblxuLy8gQWRkIHByb2plY3QgY29tcGxldGlvbiBzdGF0dXNcbmNvbnN0IGNyZWF0ZVByb2plY3RDb21wbGV0aW9uID0gKHByb2plY3QsIGR1ZVRvZGF5KSA9PiB7XG4gIGNvbnN0IG9sZENvbXBsZXRpb24gPSAvXFwoXFxkKlxcL1xcZCpcXCkvO1xuICBpZiAocHJvamVjdCkge1xuICAgIGNvbnN0IHRhc2tzID1cbiAgICAgIGRhc2hib2FyZFtwYXJzZUludChwcm9qZWN0LmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldLmxlbmd0aDtcbiAgICBjb25zdCBjb21wbGV0ZWRUYXNrcyA9IHBhcnNlSW50KHByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpO1xuICAgIGxldCB0aXRsZSA9IHByb2plY3QucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIikudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgY29tcGxldGlvbkluZGV4ID0gdGl0bGUuc2VhcmNoKG9sZENvbXBsZXRpb24pIC0gMTtcbiAgICB0aXRsZSA9IHRpdGxlLnN1YnN0cmluZygwLCBjb21wbGV0aW9uSW5kZXgpO1xuICAgIHRpdGxlID0gYCR7dGl0bGV9ICgke2NvbXBsZXRlZFRhc2tzfS8ke3Rhc2tzfSlgO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHByb2plY3QucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIikudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgfVxuICBpZiAoZHVlVG9kYXkpIHtcbiAgICBjb25zdCBkdWVUb2RheUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgICBsZXQgZHVlVG9kYXlUaXRsZSA9IGR1ZVRvZGF5RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIuc2lkZWJhci1pdGVtLXRpdGxlXCJcbiAgICApLnRleHRDb250ZW50O1xuICAgIGNvbnN0IGR1ZVRvZGF5VGFza3MgPSBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSk7XG4gICAgY29uc3QgZHVlVG9kYXlDb21wbGV0ZWRUYXNrcyA9IHBhcnNlSW50KFxuICAgICAgZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpXG4gICAgKTtcbiAgICBjb25zdCBkdWVUb2RheUNvbXBsZXRpb25JbmRleCA9IGR1ZVRvZGF5VGl0bGUuc2VhcmNoKG9sZENvbXBsZXRpb24pIC0gMTtcbiAgICBkdWVUb2RheVRpdGxlID0gZHVlVG9kYXlUaXRsZS5zdWJzdHJpbmcoMCwgZHVlVG9kYXlDb21wbGV0aW9uSW5kZXgpO1xuICAgIGR1ZVRvZGF5VGl0bGUgPSBgJHtkdWVUb2RheVRpdGxlfSAoJHtkdWVUb2RheUNvbXBsZXRlZFRhc2tzfS8ke2R1ZVRvZGF5VGFza3N9KWA7XG4gICAgZHVlVG9kYXlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRpdGxlXCIpLnRleHRDb250ZW50ID1cbiAgICAgIGR1ZVRvZGF5VGl0bGU7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50ID0gKCkgPT4ge1xuICBjb25zdCBvbGRDb3VudCA9IC9cXChcXGQqXFwpLztcbiAgY29uc3Qgb3ZlcmR1ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICBsZXQgb3ZlcmR1ZVRpdGxlID0gb3ZlcmR1ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIlxuICApLnRleHRDb250ZW50O1xuICBjb25zdCBvdmVyZHVlVGFza3MgPSBwYXJzZUludChvdmVyZHVlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKTtcbiAgY29uc3Qgb3ZlcmR1ZVRhc2tDb3VudEluZGV4ID0gb3ZlcmR1ZVRpdGxlLnNlYXJjaChvbGRDb3VudCkgLSAxO1xuICBvdmVyZHVlVGl0bGUgPSBvdmVyZHVlVGl0bGUuc3Vic3RyaW5nKDAsIG92ZXJkdWVUYXNrQ291bnRJbmRleCk7XG4gIG92ZXJkdWVUaXRsZSA9IGAke292ZXJkdWVUaXRsZX0gKCR7b3ZlcmR1ZVRhc2tzfSlgO1xuICBvdmVyZHVlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKS50ZXh0Q29udGVudCA9XG4gICAgb3ZlcmR1ZVRpdGxlO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlUHJvamVjdENvbXBsZXRpb24sIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50IH07XG4iLCJpbXBvcnQgeyBkYXNoYm9hcmQsIG5ld1Byb2plY3QgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcbmltcG9ydCB7IGFkZEVkaXRCdXR0b25zIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWNvbXBvbmVudHNcIjtcbmltcG9ydCB7IHJlc2V0VG9kb0xpc3QgfSBmcm9tIFwiLi90YXNrLWNyZWF0aW9uXCI7XG5cbmNvbnN0IGNyZWF0ZUFkZE5ld1Byb2plY3RFbGVtZW50ID0gKCkgPT4ge1xuICBjb25zdCBzaWRlYmFySXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbXNcIik7XG4gIGNvbnN0IG9sZEFkZE5ld1Byb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdFwiKTtcbiAgb2xkQWRkTmV3UHJvamVjdEVsZW1lbnQucmVtb3ZlKCk7XG4gIGNvbnN0IG5ld0FkZE5ld1Byb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNpZGViYXItaXRlbS1hZGRcIik7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibmV3LXByb2plY3RcIik7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG4gIGNvbnN0IG5ld0FkZE5ld1Byb2plY3RFbGVtZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gXCIrIEFkZCBOZXcgUHJvamVjdFwiO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5hcHBlbmRDaGlsZChuZXdBZGROZXdQcm9qZWN0RWxlbWVudFRpdGxlKTtcbiAgc2lkZWJhckl0ZW1zLmFwcGVuZENoaWxkKG5ld0FkZE5ld1Byb2plY3RFbGVtZW50KTtcblxuICBjb25zdCBwcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbW9kYWxcIik7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm1cIikucmVzZXQoKTtcbiAgICBwcm9qZWN0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICB9KTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5ld1Byb2plY3RFbGVtZW50ID0gKHRpdGxlKSA9PiB7XG4gIGNvbnN0IHNpZGViYXJJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtc1wiKTtcbiAgY29uc3QgbmV3UHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2lkZWJhci1pdGVtXCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaXRlbVwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIsIGRhc2hib2FyZC5sZW5ndGggLSAxKTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIiwgMCk7XG4gIGNvbnN0IG5ld1Byb2plY3RFbGVtZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyLWl0ZW0tdGl0bGVcIik7XG4gIG5ld1Byb2plY3RFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSBgJHt0aXRsZX0gKDAvMClgO1xuICBuZXdQcm9qZWN0RWxlbWVudC5hcHBlbmRDaGlsZChuZXdQcm9qZWN0RWxlbWVudFRpdGxlKTtcbiAgc2lkZWJhckl0ZW1zLmFwcGVuZENoaWxkKG5ld1Byb2plY3RFbGVtZW50KTtcblxuICBhZGRFZGl0QnV0dG9ucygpO1xuXG4gIG5ld1Byb2plY3RFbGVtZW50VGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgICBjb25zdCBwcm9qZWN0TnVtYmVyID0gbmV3UHJvamVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpO1xuICAgIHRhc2tzLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBwcm9qZWN0TnVtYmVyKTtcbiAgICB0YXNrcy5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICByZXNldFRvZG9MaXN0KHByb2plY3ROdW1iZXIpO1xuICB9KTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5ld1Byb2plY3QgPSAoKSA9PiB7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LW5hbWVcIikudmFsdWU7XG4gIG5ld1Byb2plY3QodGl0bGUpO1xuICBjcmVhdGVOZXdQcm9qZWN0RWxlbWVudCh0aXRsZSk7XG4gIGNyZWF0ZUFkZE5ld1Byb2plY3RFbGVtZW50KCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVOZXdQcm9qZWN0O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCBlZGl0SWNvblNyYyBmcm9tIFwiLi9pY29ucy9kb3RzLXZlcnRpY2FsLnN2Z1wiO1xuaW1wb3J0IHsgZGFzaGJvYXJkLCBwcm9qZWN0TmFtZXMgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcbmltcG9ydCB7IGlzVG9kYXksIGlzT3ZlcmR1ZSB9IGZyb20gXCIuL3RpbWVcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50LFxuICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbixcbn0gZnJvbSBcIi4vcHJvamVjdC1jb21wb25lbnRzXCI7XG5cbmNvbnN0IHZhbGlkaXR5Q2hlY2sgPSAoaW5wdXQpID0+IGlucHV0LnZhbGlkaXR5LnZhbGlkO1xuXG4vLyBDcmVhdGUgZXZlbnQgbGlzdGVuZXJzIHRvIGhpZGUgdGhlIGRyb3Bkb3duIG1lbnVzIHdoZW4gb3RoZXIgc3R1ZmYgaXMgY2xpY2tlZCBvblxuY29uc3QgY3JlYXRlRHJvcGRvd25IaWRlciA9ICgpID0+IHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoXG4gICAgICAhZXZlbnQudGFyZ2V0Lm1hdGNoZXMoXCIuZHJvcGRvd24tY29udGVudFwiKSAmJlxuICAgICAgIWV2ZW50LnRhcmdldC5tYXRjaGVzKFwiLmVkaXQtYnV0dG9uXCIpXG4gICAgKSB7XG4gICAgICBjb25zdCBkcm9wZG93bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRyb3Bkb3duLWNvbnRlbnRcIik7XG4gICAgICBkcm9wZG93bnMuZm9yRWFjaCgoZHJvcGRvd24pID0+IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGRyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IGNoZWNrYm94RnVuY3Rpb25hbGl0eSA9IChcbiAgdGFza0VsZW1lbnQsXG4gIHRhc2tFbGVtZW50Q2hlY2tib3gsXG4gIHRvZG9JdGVtcyxcbiAgcHJpb3JpdHksXG4gIHByb2plY3QsXG4gIGR1ZURhdGVcbikgPT4ge1xuICBpZiAoXG4gICAgdGFza0VsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1jaGVja2VkXCIpXG4gICkge1xuICAgIHRhc2tFbGVtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIilcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwidG9kby1pdGVtLWNoZWNrZWRcIik7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXVtcbiAgICAgIHByaW9yaXR5IC0gMVxuICAgIF0uY2hlY2tlZCA9IGZhbHNlO1xuICAgIHByb2plY3Quc2V0QXR0cmlidXRlKFxuICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgKTtcbiAgICBpZiAoaXNUb2RheShkdWVEYXRlKSAmJiBpc092ZXJkdWUoZHVlRGF0ZSkpIHtcbiAgICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG92ZXJkdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICAgKTtcbiAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIHRydWUpO1xuICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICB9XG4gICAgaWYgKGlzVG9kYXkoZHVlRGF0ZSkgJiYgIWlzT3ZlcmR1ZShkdWVEYXRlKSkge1xuICAgICAgY29uc3QgZHVlVG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgICApO1xuICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgdHJ1ZSk7XG4gICAgfVxuICAgIGlmIChpc092ZXJkdWUoZHVlRGF0ZSkgJiYgIWlzVG9kYXkoZHVlRGF0ZSkpIHtcbiAgICAgIGNvbnN0IG92ZXJkdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICAgKTtcbiAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCBmYWxzZSk7XG4gICAgfSBlbHNlIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIGZhbHNlKTtcbiAgfSBlbHNlIHtcbiAgICB0YXNrRWxlbWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLXRpdGxlXCIpXG4gICAgICAuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIuKck1wiO1xuICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV1bXG4gICAgICBwcmlvcml0eSAtIDFcbiAgICBdLmNoZWNrZWQgPSB0cnVlO1xuICAgIHByb2plY3Quc2V0QXR0cmlidXRlKFxuICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgKTtcbiAgICBpZiAoaXNUb2RheShkdWVEYXRlKSAmJiBpc092ZXJkdWUoZHVlRGF0ZSkpIHtcbiAgICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG92ZXJkdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgKTtcbiAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIHRydWUpO1xuICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICB9XG4gICAgaWYgKGlzVG9kYXkoZHVlRGF0ZSkgJiYgIWlzT3ZlcmR1ZShkdWVEYXRlKSkge1xuICAgICAgY29uc3QgZHVlVG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICApO1xuICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgdHJ1ZSk7XG4gICAgfVxuICAgIGlmIChpc092ZXJkdWUoZHVlRGF0ZSkgJiYgIWlzVG9kYXkoZHVlRGF0ZSkpIHtcbiAgICAgIGNvbnN0IG92ZXJkdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgKTtcbiAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCBmYWxzZSk7XG4gICAgfSBlbHNlIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIGZhbHNlKTtcbiAgfVxufTtcblxuLy8gQ3JlYXRlIGVkaXQgb3B0aW9uIGZ1bmN0aW9uYWxpdHlcbmNvbnN0IGVkaXRGdW5jdGlvbmFsaXR5ID0gKGl0ZW0pID0+IHtcbiAgY29uc3QgcHJvamVjdE51bWJlciA9IHBhcnNlSW50KFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIilcbiAgKTtcbiAgaWYgKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2lkZWJhci1pdGVtXCIpKSB7XG4gICAgY29uc3QgaXRlbVRpdGxlID0gaXRlbS5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKTtcbiAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBwYXJzZUludChpdGVtLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSk7XG4gICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1lZGl0LW1vZGFsXCIpO1xuICAgIGNvbnN0IHByb2plY3RFZGl0TW9kYWxUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1uYW1lLWVkaXRcIik7XG4gICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgXCJwcm9qZWN0LWVkaXQtc3VibWl0LWJ1dHRvblwiXG4gICAgKTtcbiAgICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsU3VibWl0QnV0dG9uQ2xvbmUgPVxuICAgICAgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgY29uc3QgcHJvamVjdENvbXBsZXRpb25SZWdleCA9IC9cXChcXGQqXFwvXFxkKlxcKS87XG4gICAgY29uc3QgcHJvamVjdENvbXBsZXRpb25JbmRleCA9IGl0ZW1UaXRsZS50ZXh0Q29udGVudC5zZWFyY2goXG4gICAgICBwcm9qZWN0Q29tcGxldGlvblJlZ2V4XG4gICAgKTtcbiAgICBjb25zdCBwcm9qZWN0Q29tcGxldGlvbiA9IGl0ZW1UaXRsZS50ZXh0Q29udGVudC5zdWJzdHJpbmcoXG4gICAgICBwcm9qZWN0Q29tcGxldGlvbkluZGV4XG4gICAgKTtcbiAgICBwcm9qZWN0RWRpdE1vZGFsVGl0bGUudmFsdWUgPSBpdGVtVGl0bGUudGV4dENvbnRlbnQuc3Vic3RyaW5nKFxuICAgICAgMCxcbiAgICAgIHByb2plY3RDb21wbGV0aW9uSW5kZXggLSAxXG4gICAgKTtcblxuICAgIHByb2plY3RFZGl0TW9kYWxTdWJtaXRCdXR0b24ucmVwbGFjZVdpdGgocHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lKTtcblxuICAgIHByb2plY3RFZGl0TW9kYWxTdWJtaXRCdXR0b25DbG9uZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbElucHV0cyA9IEFycmF5LmZyb20oXG4gICAgICAgIHByb2plY3RFZGl0TW9kYWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpXG4gICAgICApO1xuICAgICAgaWYgKHByb2plY3RFZGl0TW9kYWxJbnB1dHMuZXZlcnkodmFsaWRpdHlDaGVjaykpIHtcbiAgICAgICAgaXRlbVRpdGxlLnRleHRDb250ZW50ID0gYCR7cHJvamVjdEVkaXRNb2RhbFRpdGxlLnZhbHVlfSAke3Byb2plY3RDb21wbGV0aW9ufWA7XG4gICAgICAgIHByb2plY3ROYW1lc1twcm9qZWN0SW5kZXhdID0gcHJvamVjdEVkaXRNb2RhbFRpdGxlLnZhbHVlO1xuICAgICAgICBwcm9qZWN0RWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGl0ZW1Qcmlvcml0eSA9IGl0ZW0uZmlyc3RDaGlsZDtcbiAgICBjb25zdCBpdGVtVGl0bGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLXRpdGxlXCIpO1xuICAgIGNvbnN0IGl0ZW1EdWVEYXRlID0gaXRlbS5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS1kdWUtZGF0ZVwiKTtcbiAgICBjb25zdCB0YXNrVG9FZGl0ID1cbiAgICAgIGRhc2hib2FyZFtwcm9qZWN0TnVtYmVyXVtwYXJzZUludChpdGVtLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQpIC0gMV07XG4gICAgY29uc3QgcHJldmlvdXNseU92ZXJkdWUgPSBpc092ZXJkdWUoaXRlbUR1ZURhdGUudGV4dENvbnRlbnQpO1xuICAgIGNvbnN0IHByZXZpb3VzbHlEdWVUb2RheSA9IGlzVG9kYXkoaXRlbUR1ZURhdGUudGV4dENvbnRlbnQpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZWRpdC1tb2RhbFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGUtZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsUHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5LWVkaXRcIik7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbERlc2NyaXB0aW9uID1cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb24tZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBcInRhc2stZWRpdC1zdWJtaXQtYnV0dG9uXCJcbiAgICApO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b25DbG9uZSA9XG4gICAgICB0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uLmNsb25lTm9kZSh0cnVlKTtcbiAgICB0YXNrRWRpdE1vZGFsVGl0bGUudmFsdWUgPSB0YXNrVG9FZGl0LnRpdGxlO1xuICAgIGNvbnN0IHRpbWVab25lT2Zmc2V0ID0gbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDA7IC8vIG9mZnNldCBpbiBtaWxsaXNlY29uZHNcbiAgICB0YXNrRWRpdE1vZGFsRGF0ZS52YWx1ZSA9IG5ldyBEYXRlKFxuICAgICAgbmV3IERhdGUodGFza1RvRWRpdC5kdWVEYXRlKS5nZXRUaW1lKCkgLSB0aW1lWm9uZU9mZnNldFxuICAgIClcbiAgICAgIC50b0lTT1N0cmluZygpXG4gICAgICAuc2xpY2UoMCwgLTgpO1xuICAgIHRhc2tFZGl0TW9kYWxQcmlvcml0eS52YWx1ZSA9IHRhc2tUb0VkaXQucHJpb3JpdHk7XG4gICAgdGFza0VkaXRNb2RhbERlc2NyaXB0aW9uLnZhbHVlID0gdGFza1RvRWRpdC5kZXNjcmlwdGlvbjtcblxuICAgIHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b24ucmVwbGFjZVdpdGgodGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lKTtcblxuICAgIHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b25DbG9uZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgdGFza0VkaXRNb2RhbElucHV0cyA9IEFycmF5LmZyb20oXG4gICAgICAgIHRhc2tFZGl0TW9kYWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpXG4gICAgICApO1xuICAgICAgaWYgKHRhc2tFZGl0TW9kYWxJbnB1dHMuZXZlcnkodmFsaWRpdHlDaGVjaykpIHtcbiAgICAgICAgY29uc3Qgb3ZlcmR1ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICAgICAgICBjb25zdCBkdWVUb2RheUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgICAgICAgY29uc3QgdG9kb0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZSh0YXNrRWRpdE1vZGFsRGF0ZS52YWx1ZSkpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgIHdlZWtkYXk6IFwic2hvcnRcIixcbiAgICAgICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICAgICAgICBtb250aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgICAgICAgaG91cjogXCJudW1lcmljXCIsXG4gICAgICAgICAgbWludXRlOiBcIm51bWVyaWNcIixcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkRHVlRGF0ZSA9IGR1ZURhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFwiZW4tVVNcIiwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IG9sZER1ZURhdGUgPSB0YXNrVG9FZGl0LmR1ZURhdGU7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gaXRlbS5xdWVyeVNlbGVjdG9yKFwiLmNoZWNrYm94XCIpO1xuICAgICAgICBjb25zdCBjaGVja2JveENsb25lID0gY2hlY2tib3guY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBjb25zdCBvbGRUYXNrUHJpb3JpdHkgPSB0YXNrVG9FZGl0LnByaW9yaXR5O1xuICAgICAgICBsZXQgdGFza1ByaW9yaXR5ID0gcGFyc2VJbnQodGFza0VkaXRNb2RhbFByaW9yaXR5LnZhbHVlKTtcbiAgICAgICAgaWYgKHRhc2tQcmlvcml0eSA9PT0gMCkgdGFza1ByaW9yaXR5ID0gMTtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTih0YXNrUHJpb3JpdHkpKSB0YXNrUHJpb3JpdHkgPSBJbmZpbml0eTtcbiAgICAgICAgaWYgKHRhc2tQcmlvcml0eSA+IGRhc2hib2FyZFtwcm9qZWN0TnVtYmVyXS5sZW5ndGgpIHtcbiAgICAgICAgICB0YXNrUHJpb3JpdHkgPSBkYXNoYm9hcmRbcHJvamVjdE51bWJlcl0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YXNrUHJpb3JpdHkgIT09IG9sZFRhc2tQcmlvcml0eSkge1xuICAgICAgICAgIGlmICh0YXNrUHJpb3JpdHkgPiBvbGRUYXNrUHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGxldCBuZXh0VGFzayA9IGl0ZW0ubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdUYXNrID0gbnVsbDtcbiAgICAgICAgICAgIHRvZG9JdGVtcy5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvZG8taXRlbVwiKS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0YXNrLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgPT09IGAke3Rhc2tQcmlvcml0eX0uYClcbiAgICAgICAgICAgICAgICBleGlzdGluZ1Rhc2sgPSB0YXNrO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGV4aXN0aW5nVGFzay5uZXh0U2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoXG4gICAgICAgICAgICAgICAgXCJ0b2RvLWl0ZW0tZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdUYXNrRGVzY3JpcHRpb24gPSBleGlzdGluZ1Rhc2submV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgIGV4aXN0aW5nVGFza0Rlc2NyaXB0aW9uLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIGV4aXN0aW5nVGFzay5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBpdGVtKTtcbiAgICAgICAgICAgIGlmIChuZXh0VGFzay5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tZGVzY3JpcHRpb25cIikpIHtcbiAgICAgICAgICAgICAgY29uc3QgdGVtcFRhc2tWYXIgPSBuZXh0VGFzay5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgaXRlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBuZXh0VGFzayk7XG4gICAgICAgICAgICAgIG5leHRUYXNrID0gdGVtcFRhc2tWYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gb2xkVGFza1ByaW9yaXR5OyBpIDwgdGFza1ByaW9yaXR5OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudFByaW9yaXR5ID0gbmV4dFRhc2suZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgY29uc3QgcGVyaW9kSW5kZXggPSBlbGVtZW50UHJpb3JpdHkudGV4dENvbnRlbnQuaW5kZXhPZihcIi5cIik7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRQcmlvcml0eU5vUGVyaW9kID1cbiAgICAgICAgICAgICAgICBlbGVtZW50UHJpb3JpdHkudGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIHBlcmlvZEluZGV4KTtcbiAgICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudFByaW9yaXR5ID0gYCR7XG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZWxlbWVudFByaW9yaXR5Tm9QZXJpb2QpIC0gMVxuICAgICAgICAgICAgICB9LmA7XG4gICAgICAgICAgICAgIGVsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudCA9IG5ld0VsZW1lbnRQcmlvcml0eTtcbiAgICAgICAgICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXVtcbiAgICAgICAgICAgICAgICBwYXJzZUludChlbGVtZW50UHJpb3JpdHlOb1BlcmlvZCkgLSAxXG4gICAgICAgICAgICAgIF0ucHJpb3JpdHkgLT0gMTtcbiAgICAgICAgICAgICAgbmV4dFRhc2sgPSBuZXh0VGFzay5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgaWYgKG5leHRUYXNrLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKSkge1xuICAgICAgICAgICAgICAgIG5leHRUYXNrID0gbmV4dFRhc2submV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV0uc3BsaWNlKFxuICAgICAgICAgICAgICB0YXNrUHJpb3JpdHksXG4gICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgIHRhc2tUb0VkaXRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkYXNoYm9hcmRbcGFyc2VJbnQodG9kb0l0ZW1zLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldLnNwbGljZShcbiAgICAgICAgICAgICAgb2xkVGFza1ByaW9yaXR5IC0gMSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRhc2tQcmlvcml0eSA8IG9sZFRhc2tQcmlvcml0eSkge1xuICAgICAgICAgICAgbGV0IGV4aXN0aW5nVGFzayA9IG51bGw7XG4gICAgICAgICAgICB0b2RvSXRlbXMucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWl0ZW1cIikuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICAgICAgICBpZiAodGFzay5maXJzdENoaWxkLnRleHRDb250ZW50ID09PSBgJHt0YXNrUHJpb3JpdHl9LmApXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdUYXNrID0gdGFzaztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgcG9zc2libGVUYXNrRGVzY3JpcHRpb24gPSBpdGVtLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgZXhpc3RpbmdUYXNrLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWJlZ2luXCIsIGl0ZW0pO1xuICAgICAgICAgICAgbGV0IG5leHRUYXNrID0gaXRlbS5uZXh0U2libGluZztcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgcG9zc2libGVUYXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LmNvbnRhaW5zKFxuICAgICAgICAgICAgICAgIFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGl0ZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgcG9zc2libGVUYXNrRGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRhc2tQcmlvcml0eTsgaSA8IG9sZFRhc2tQcmlvcml0eTsgaSArPSAxKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRQcmlvcml0eSA9IG5leHRUYXNrLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgIGNvbnN0IHBlcmlvZEluZGV4ID0gZWxlbWVudFByaW9yaXR5LnRleHRDb250ZW50LmluZGV4T2YoXCIuXCIpO1xuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50UHJpb3JpdHlOb1BlcmlvZCA9XG4gICAgICAgICAgICAgICAgZWxlbWVudFByaW9yaXR5LnRleHRDb250ZW50LnN1YnN0cmluZygwLCBwZXJpb2RJbmRleCk7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld0VsZW1lbnRQcmlvcml0eSA9IGAke1xuICAgICAgICAgICAgICAgIHBhcnNlSW50KGVsZW1lbnRQcmlvcml0eU5vUGVyaW9kKSArIDFcbiAgICAgICAgICAgICAgfS5gO1xuICAgICAgICAgICAgICBlbGVtZW50UHJpb3JpdHkudGV4dENvbnRlbnQgPSBuZXdFbGVtZW50UHJpb3JpdHk7XG4gICAgICAgICAgICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV1bXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZWxlbWVudFByaW9yaXR5Tm9QZXJpb2QpIC0gMVxuICAgICAgICAgICAgICBdLnByaW9yaXR5ICs9IDE7XG4gICAgICAgICAgICAgIG5leHRUYXNrID0gbmV4dFRhc2submV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgIGlmIChuZXh0VGFzay5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tZGVzY3JpcHRpb25cIikpIHtcbiAgICAgICAgICAgICAgICBuZXh0VGFzayA9IG5leHRUYXNrLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXNoYm9hcmRbcGFyc2VJbnQodG9kb0l0ZW1zLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldLnNwbGljZShcbiAgICAgICAgICAgICAgdGFza1ByaW9yaXR5IC0gMSxcbiAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgdGFza1RvRWRpdFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV0uc3BsaWNlKFxuICAgICAgICAgICAgICBvbGRUYXNrUHJpb3JpdHksXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRhc2tUb0VkaXQudGl0bGUgPSB0YXNrRWRpdE1vZGFsVGl0bGUudmFsdWU7XG4gICAgICAgIHRhc2tUb0VkaXQuZHVlRGF0ZSA9IGZvcm1hdHRlZER1ZURhdGU7XG4gICAgICAgIHRhc2tUb0VkaXQucHJpb3JpdHkgPSB0YXNrUHJpb3JpdHk7XG4gICAgICAgIHRhc2tUb0VkaXQuZGVzY3JpcHRpb24gPSB0YXNrRWRpdE1vZGFsRGVzY3JpcHRpb24udmFsdWU7XG4gICAgICAgIGNvbnN0IG5leHRJdGVtID0gaXRlbS5uZXh0U2libGluZztcbiAgICAgICAgaWYgKG5leHRJdGVtLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKSlcbiAgICAgICAgICBuZXh0SXRlbS50ZXh0Q29udGVudCA9IHRhc2tUb0VkaXQuZGVzY3JpcHRpb247XG4gICAgICAgIGl0ZW1Qcmlvcml0eS50ZXh0Q29udGVudCA9IGAke3Rhc2tQcmlvcml0eX0uYDtcbiAgICAgICAgaXRlbVRpdGxlLnRleHRDb250ZW50ID0gdGFza1RvRWRpdC50aXRsZTtcbiAgICAgICAgaXRlbUR1ZURhdGUudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWREdWVEYXRlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXNPdmVyZHVlKGZvcm1hdHRlZER1ZURhdGUpICYmXG4gICAgICAgICAgIXByZXZpb3VzbHlPdmVyZHVlICYmXG4gICAgICAgICAgIXRhc2tUb0VkaXQuY2hlY2tlZFxuICAgICAgICApIHtcbiAgICAgICAgICBvdmVyZHVlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWVFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICAgICAgICk7XG4gICAgICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgIWlzT3ZlcmR1ZShmb3JtYXR0ZWREdWVEYXRlKSAmJlxuICAgICAgICAgIHByZXZpb3VzbHlPdmVyZHVlICYmXG4gICAgICAgICAgIXRhc2tUb0VkaXQuY2hlY2tlZFxuICAgICAgICApIHtcbiAgICAgICAgICBvdmVyZHVlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWVFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgICAgICk7XG4gICAgICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNUb2RheShmb3JtYXR0ZWREdWVEYXRlKSAmJiAhcHJldmlvdXNseUR1ZVRvZGF5KSB7XG4gICAgICAgICAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKHRhc2tUb0VkaXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24oZmFsc2UsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNUb2RheShmb3JtYXR0ZWREdWVEYXRlKSAmJiBwcmV2aW91c2x5RHVlVG9kYXkpIHtcbiAgICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAodGFza1RvRWRpdC5jaGVja2VkKSB7XG4gICAgICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZER1ZURhdGUgIT09IGZvcm1hdHRlZER1ZURhdGUpIHtcbiAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1wcm9qZWN0PScke3Byb2plY3ROdW1iZXJ9J11gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IHBhcnNlSW50KHRhc2tUb0VkaXQucHJpb3JpdHkpO1xuICAgICAgICAgIGNoZWNrYm94LnJlcGxhY2VXaXRoKGNoZWNrYm94Q2xvbmUpO1xuXG4gICAgICAgICAgY2hlY2tib3hDbG9uZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY2hlY2tib3hGdW5jdGlvbmFsaXR5KFxuICAgICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgICBjaGVja2JveENsb25lLFxuICAgICAgICAgICAgICB0b2RvSXRlbXMsXG4gICAgICAgICAgICAgIHByaW9yaXR5LFxuICAgICAgICAgICAgICBwcm9qZWN0LFxuICAgICAgICAgICAgICBmb3JtYXR0ZWREdWVEYXRlXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFza0VkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLy8gQWRkIGVkaXQgYnV0dG9ucyB0byBwcm9qZWN0cyBhbmQgdGFza3NcbmNvbnN0IGFkZEVkaXRCdXR0b25zID0gKCkgPT4ge1xuICAvLyBNYWtlIGFuIGVkaXQgYnV0dG9uXG4gIGNvbnN0IGFkZEVkaXRCdXR0b24gPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVkaXRJY29uID0gbmV3IEltYWdlKCk7XG4gICAgY29uc3QgZWRpdERyb3Bkb3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBlZGl0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCByZW1vdmVPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVkaXRJY29uLnNyYyA9IGVkaXRJY29uU3JjO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIlZlcnRpY2FsIGRvdHRlZCBsaW5lIGljb24gZm9yIGVkaXQgb3B0aW9ucy5cIik7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idXR0b25cIik7XG4gICAgZWRpdERyb3Bkb3duLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1jb250ZW50XCIpO1xuICAgIGVkaXREcm9wZG93bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBlZGl0T3B0aW9uLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG4gICAgZWRpdE9wdGlvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbVwiKTtcbiAgICBlZGl0T3B0aW9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZWRpdC1idXR0b25cIik7XG4gICAgZWRpdE9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICAgIHJlbW92ZU9wdGlvbi50ZXh0Q29udGVudCA9IFwiUmVtb3ZlXCI7XG4gICAgcmVtb3ZlT3B0aW9uLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1pdGVtXCIpO1xuICAgIHJlbW92ZU9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInJlbW92ZS1idXR0b25cIik7XG4gICAgcmVtb3ZlT3B0aW9uLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG4gICAgZWRpdERyb3Bkb3duLmFwcGVuZENoaWxkKGVkaXRPcHRpb24pO1xuICAgIGVkaXREcm9wZG93bi5hcHBlbmRDaGlsZChyZW1vdmVPcHRpb24pO1xuICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtYnV0dG9uXCIpO1xuICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duXCIpO1xuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdERyb3Bkb3duKTtcbiAgICBpdGVtLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXG4gICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKGVkaXREcm9wZG93bi5zdHlsZS52aXNpYmlsaXR5ID09PSBcImhpZGRlblwiKSB7XG4gICAgICAgIGVkaXREcm9wZG93bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICB9IGVsc2UgZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1lZGl0LW1vZGFsXCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZWRpdC1tb2RhbFwiKTtcblxuICAgIGVkaXRPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudEl0ZW0gPSBlZGl0T3B0aW9uLmNsb3Nlc3QoXCIuaXRlbVwiKTtcbiAgICAgIGlmIChwYXJlbnRJdGVtLmNsYXNzTGlzdC5jb250YWlucyhcInNpZGViYXItaXRlbVwiKSkge1xuICAgICAgICBlZGl0RnVuY3Rpb25hbGl0eShwYXJlbnRJdGVtKTtcbiAgICAgICAgcHJvamVjdEVkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlZGl0RnVuY3Rpb25hbGl0eShwYXJlbnRJdGVtKTtcbiAgICAgICAgdGFza0VkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZW1vdmVPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IG92ZXJkdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICAgICAgY29uc3QgZHVlVG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgICAgIGNvbnN0IHBhcmVudEl0ZW0gPSByZW1vdmVPcHRpb24uY2xvc2VzdChcIi5pdGVtXCIpO1xuICAgICAgaWYgKHBhcmVudEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2lkZWJhci1pdGVtXCIpKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9IHBhcnNlSW50KHBhcmVudEl0ZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKTtcbiAgICAgICAgY29uc3QgbGFzdFByb2plY3RJbmRleCA9IGRhc2hib2FyZC5sZW5ndGggLSAxO1xuICAgICAgICBjb25zdCBjdXJyZW50VG9kb0xpc3RQcm9qZWN0ID0gcGFyc2VJbnQoXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBjdXJyZW50VG9kb0xpc3RQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFtkYXRhLXByb2plY3Q9JyR7Y3VycmVudFRvZG9MaXN0UHJvamVjdH0nXWBcbiAgICAgICAgKTtcbiAgICAgICAgcGFyZW50SXRlbS5yZW1vdmUoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHByb2plY3RJbmRleCArIDE7IGkgPCBsYXN0UHJvamVjdEluZGV4ICsgMTsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1wcm9qZWN0PScke2l9J11gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZWxlY3RlZFByb2plY3Quc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJkYXRhLXByb2plY3RcIixcbiAgICAgICAgICAgIHBhcnNlSW50KHNlbGVjdGVkUHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpIC0gMVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZGFzaGJvYXJkW3Byb2plY3RJbmRleF0uZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICAgIGlmIChpc092ZXJkdWUodGFzay5kdWVEYXRlKSAmJiAhdGFzay5jaGVja2VkKSB7XG4gICAgICAgICAgICBvdmVyZHVlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWUuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzVG9kYXkodGFzay5kdWVEYXRlKSkge1xuICAgICAgICAgICAgaWYgKHRhc2suY2hlY2tlZClcbiAgICAgICAgICAgICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZGFzaGJvYXJkLnNwbGljZShwcm9qZWN0SW5kZXgsIDEpO1xuICAgICAgICBwcm9qZWN0TmFtZXMuc3BsaWNlKHByb2plY3RJbmRleCwgMSk7XG4gICAgICAgIGlmIChwcm9qZWN0SW5kZXggPT09IGN1cnJlbnRUb2RvTGlzdFByb2plY3QpIHtcbiAgICAgICAgICBjb25zdCBjbGlja0V2ZW50ID0gbmV3IEV2ZW50KFwiY2xpY2tcIik7XG4gICAgICAgICAgb3ZlcmR1ZS5kaXNwYXRjaEV2ZW50KGNsaWNrRXZlbnQpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKVxuICAgICAgICAgICAgLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgXCJkYXRhLXByb2plY3RcIixcbiAgICAgICAgICAgICAgcGFyc2VJbnQoXG4gICAgICAgICAgICAgICAgY3VycmVudFRvZG9MaXN0UHJvamVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBwYXJzZUludChcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbZGF0YS1wcm9qZWN0PScke3Byb2plY3RJbmRleH0nXWBcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IGluZGV4ID0gcGFyZW50SXRlbS5maXJzdENoaWxkLnRleHRDb250ZW50LmluZGV4T2YoXCIuXCIpO1xuICAgICAgICBpbmRleCA9XG4gICAgICAgICAgcGFyc2VJbnQocGFyZW50SXRlbS5maXJzdENoaWxkLnRleHRDb250ZW50LnN1YnN0cmluZygwLCBpbmRleCkpIC0gMTtcbiAgICAgICAgY29uc3QgbGFzdFRhc2tJbmRleCA9IGRhc2hib2FyZFtwcm9qZWN0SW5kZXhdLmxlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBkYXNoYm9hcmRbcHJvamVjdEluZGV4XVtpbmRleF07XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwYXJlbnRJdGVtLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKVxuICAgICAgICApIHtcbiAgICAgICAgICBwYXJlbnRJdGVtLm5leHRTaWJsaW5nLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZXh0VGFzayA9IHBhcmVudEl0ZW0ubmV4dFNpYmxpbmc7XG4gICAgICAgIGlmIChuZXh0VGFzay5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tYWRkXCIpKSB7XG4gICAgICAgICAgbmV4dFRhc2sgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnRJdGVtLnJlbW92ZSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gaW5kZXggKyAxOyBpIDwgbGFzdFRhc2tJbmRleCArIDE7IGkgKz0gMSkge1xuICAgICAgICAgIGRhc2hib2FyZFtwcm9qZWN0SW5kZXhdW2ldLnByaW9yaXR5IC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhc2suY2hlY2tlZClcbiAgICAgICAgICBwcm9qZWN0LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgIHBhcnNlSW50KHByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgICAgICk7XG4gICAgICAgIGlmIChpc092ZXJkdWUodGFzay5kdWVEYXRlKSAmJiAhdGFzay5jaGVja2VkKSB7XG4gICAgICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWUuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1RvZGF5KHRhc2suZHVlRGF0ZSkpIHtcbiAgICAgICAgICBpZiAodGFzay5jaGVja2VkKVxuICAgICAgICAgICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICAgICApO1xuICAgICAgICAgIGRhc2hib2FyZFtwcm9qZWN0SW5kZXhdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgZmFsc2UpO1xuICAgICAgICAgIGRhc2hib2FyZFtwcm9qZWN0SW5kZXhdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKG5leHRUYXNrKSB7XG4gICAgICAgICAgY29uc3QgZWxlbWVudFByaW9yaXR5ID0gbmV4dFRhc2suZmlyc3RDaGlsZDtcbiAgICAgICAgICBjb25zdCBwZXJpb2RJbmRleCA9IGVsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudC5pbmRleE9mKFwiLlwiKTtcbiAgICAgICAgICBjb25zdCBlbGVtZW50UHJpb3JpdHlOb1BlcmlvZCA9IGVsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudC5zdWJzdHJpbmcoXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgcGVyaW9kSW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IG5ld0VsZW1lbnRQcmlvcml0eSA9IGAke1xuICAgICAgICAgICAgcGFyc2VJbnQoZWxlbWVudFByaW9yaXR5Tm9QZXJpb2QpIC0gMVxuICAgICAgICAgIH0uYDtcbiAgICAgICAgICBlbGVtZW50UHJpb3JpdHkudGV4dENvbnRlbnQgPSBuZXdFbGVtZW50UHJpb3JpdHk7XG4gICAgICAgICAgbmV4dFRhc2sgPSBuZXh0VGFzay5uZXh0U2libGluZztcbiAgICAgICAgICBpZiAobmV4dFRhc2spIHtcbiAgICAgICAgICAgIGlmIChuZXh0VGFzay5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tZGVzY3JpcHRpb25cIikpIHtcbiAgICAgICAgICAgICAgbmV4dFRhc2sgPSBuZXh0VGFzay5uZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0VGFzayAmJiBuZXh0VGFzay5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tYWRkXCIpKSB7XG4gICAgICAgICAgICAgIG5leHRUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gUmVtb3ZlIGFsbCBlZGl0IGJ1dHRvbnMgYW5kIHRoZW4gbWFrZSBhbiBlZGl0IGJ1dHRvbiBmb3IgZXZlcnkgcHJvamVjdCBhbmQgdGFza1xuICBjb25zdCBlZGl0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWRpdC1idXR0b25cIik7XG4gIGVkaXRCdXR0b25zLmZvckVhY2goKGVkaXRCdXR0b24pID0+IGVkaXRCdXR0b24ucmVtb3ZlKCkpO1xuICBjb25zdCB0ZXN0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNpZGViYXItaXRlbVwiKTtcbiAgY29uc3QgdGVzdEl0ZW1zMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1pdGVtXCIpO1xuICB0ZXN0SXRlbXMuZm9yRWFjaCgodGVzdEl0ZW0pID0+IGFkZEVkaXRCdXR0b24odGVzdEl0ZW0pKTtcbiAgdGVzdEl0ZW1zMi5mb3JFYWNoKCh0ZXN0SXRlbSkgPT4gYWRkRWRpdEJ1dHRvbih0ZXN0SXRlbSkpO1xufTtcblxuZXhwb3J0IHtcbiAgY3JlYXRlRHJvcGRvd25IaWRlcixcbiAgZWRpdEZ1bmN0aW9uYWxpdHksXG4gIGFkZEVkaXRCdXR0b25zLFxuICBjaGVja2JveEZ1bmN0aW9uYWxpdHksXG59O1xuIiwiY29uc3QgZGF0YUNyZWF0aW9uID0gKCkgPT4ge1xuICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJkYXNoYm9hcmRcIikpIHtcbiAgICBjb25zdCBkYXNoYm9hcmRUZW1wID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRhc2hib2FyZFwiKSk7XG4gICAgY29uc3QgcHJvamVjdE5hbWVzVGVtcCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0TmFtZXNcIikpO1xuICAgIHJldHVybiBbZGFzaGJvYXJkVGVtcCwgcHJvamVjdE5hbWVzVGVtcF07XG4gIH1cbiAgY29uc3QgZGFzaGJvYXJkVGVtcCA9IFtdO1xuICBjb25zdCBwcm9qZWN0TmFtZXNUZW1wID0gW107XG4gIHJldHVybiBbZGFzaGJvYXJkVGVtcCwgcHJvamVjdE5hbWVzVGVtcF07XG59O1xuXG5jb25zdCBkYXNoYm9hcmQgPSBkYXRhQ3JlYXRpb24oKVswXTtcbmNvbnN0IHByb2plY3ROYW1lcyA9IGRhdGFDcmVhdGlvbigpWzFdO1xuXG5jb25zdCBleGlzdGluZ1Byb2plY3RzQ2hlY2sgPSAoKSA9PiB7XG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRhc2hib2FyZFwiKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IG5ld1Byb2plY3QgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgZGFzaGJvYXJkLnB1c2goW10pO1xuICBwcm9qZWN0TmFtZXMucHVzaChwcm9qZWN0TmFtZSk7XG59O1xuXG5jb25zdCBuZXdUYXNrID0gKFxuICBwcm9qZWN0LFxuICB0aXRsZSxcbiAgZHVlRGF0ZSxcbiAgcHJpb3JpdHksXG4gIGRlc2NyaXB0aW9uLFxuICBjaGVja2VkLFxuICBleGlzdHNcbikgPT4ge1xuICBpZiAoZXhpc3RzKSB7XG4gICAgcHJvamVjdC5zcGxpY2UocHJpb3JpdHkgLSAxLCAwLCB7XG4gICAgICB0aXRsZSxcbiAgICAgIGR1ZURhdGUsXG4gICAgICBwcmlvcml0eSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY2hlY2tlZCxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBwcm9qZWN0LnB1c2goe1xuICAgICAgdGl0bGUsXG4gICAgICBkdWVEYXRlLFxuICAgICAgcHJpb3JpdHksXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGNoZWNrZWQsXG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGV4aXN0aW5nUHJvamVjdHNDaGVjaywgZGFzaGJvYXJkLCBwcm9qZWN0TmFtZXMsIG5ld1Byb2plY3QsIG5ld1Rhc2sgfTtcbiIsIi8vIENyZWF0ZSB0YXNrIGRlc2NyaXB0aW9uIG1ha2VyXG5jb25zdCBjcmVhdGVEZXNjcmlwdGlvbiA9ICh0YXNrLCB0YXNrVGl0bGUsIGRlc2NyaXB0aW9uKSA9PiB7XG4gIGlmICh0YXNrLm5leHRTaWJsaW5nKSB7XG4gICAgaWYgKHRhc2submV4dFNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCIpKVxuICAgICAgdGFzay5uZXh0U2libGluZy5yZW1vdmUoKTtcbiAgfVxuICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgY29uc3QgdGFza1RpdGxlQ2xvbmUgPSB0YXNrVGl0bGUuY2xvbmVOb2RlKHRydWUpO1xuICB0YXNrVGl0bGUucmVwbGFjZVdpdGgodGFza1RpdGxlQ2xvbmUpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCIpO1xuICBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XG4gIGxldCBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uU2hvd24gPSBmYWxzZTtcblxuICB0YXNrVGl0bGVDbG9uZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uU2hvd24pIHtcbiAgICAgIHRhc2tzLnJlbW92ZUNoaWxkKG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb24pO1xuICAgICAgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvblNob3duID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhc2suaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbik7XG4gICAgICBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uU2hvd24gPSB0cnVlO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEZXNjcmlwdGlvbjtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQge1xuICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbixcbiAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQsXG59IGZyb20gXCIuL3Byb2plY3QtY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgZGFzaGJvYXJkLCBuZXdUYXNrIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWxvZ2ljXCI7XG5pbXBvcnQgeyBpc1RvZGF5LCBpc092ZXJkdWUgfSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQgY3JlYXRlRGVzY3JpcHRpb24gZnJvbSBcIi4vdGFzay1jb21wb25lbnRzXCI7XG5pbXBvcnQge1xuICBhZGRFZGl0QnV0dG9ucyxcbiAgY2hlY2tib3hGdW5jdGlvbmFsaXR5LFxufSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stY29tcG9uZW50c1wiO1xuXG5jb25zdCBjcmVhdGVBZGROZXdUYXNrRWxlbWVudCA9ICgpID0+IHtcbiAgY29uc3QgdG9kb0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICBjb25zdCBvbGRBZGROZXdUYXNrRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXRhc2tcIik7XG4gIGlmIChvbGRBZGROZXdUYXNrRWxlbWVudCAhPT0gbnVsbCkgb2xkQWRkTmV3VGFza0VsZW1lbnQucmVtb3ZlKCk7XG4gIGNvbnN0IG5ld0FkZE5ld1Rhc2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1hZGRcIik7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibmV3LXRhc2tcIik7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50LnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG4gIGNvbnN0IG5ld0FkZE5ld1Rhc2tFbGVtZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gXCIrIEFkZCBOZXcgVGFza1wiO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdBZGROZXdUYXNrRWxlbWVudFRpdGxlKTtcbiAgdG9kb0l0ZW1zLmFwcGVuZENoaWxkKG5ld0FkZE5ld1Rhc2tFbGVtZW50KTtcblxuICBjb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbW9kYWxcIik7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm1cIikucmVzZXQoKTtcbiAgICB0YXNrTW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICB9KTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5ld1Rhc2tFbGVtZW50ID0gKFxuICBwcmlvcml0eSxcbiAgdGl0bGUsXG4gIGR1ZURhdGUsXG4gIGRlc2NyaXB0aW9uLFxuICBjaGVja2VkXG4pID0+IHtcbiAgY29uc3QgdG9kb0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgW2RhdGEtcHJvamVjdD0nJHt0b2RvSXRlbXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpfSddYFxuICApO1xuICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0KTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtXCIpO1xuICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaXRlbVwiKTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnRQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Rhc2tFbGVtZW50UHJpb3JpdHkudGV4dENvbnRlbnQgPSBgJHtwcmlvcml0eX0uYDtcbiAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnRQcmlvcml0eSk7XG4gIGNvbnN0IG5ld1Rhc2tFbGVtZW50Q2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBuZXdUYXNrRWxlbWVudENoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveFwiKTtcbiAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnRDaGVja2JveCk7XG4gIGNvbnN0IG5ld1Rhc2tFbGVtZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdUYXNrRWxlbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tdGl0bGVcIik7XG4gIG5ld1Rhc2tFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnRUaXRsZSk7XG4gIGNvbnN0IG5ld1Rhc2tFbGVtZW50RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Rhc2tFbGVtZW50RHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWR1ZS1kYXRlXCIpO1xuICBuZXdUYXNrRWxlbWVudER1ZURhdGUudGV4dENvbnRlbnQgPSBkdWVEYXRlO1xuICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudER1ZURhdGUpO1xuICB0b2RvSXRlbXMuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnQpO1xuXG4gIGlmIChjaGVja2VkKSB7XG4gICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwi4pyTXCI7XG4gICAgbmV3VGFza0VsZW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWNoZWNrZWRcIik7XG4gIH1cblxuICBuZXdUYXNrRWxlbWVudENoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY2hlY2tib3hGdW5jdGlvbmFsaXR5KFxuICAgICAgbmV3VGFza0VsZW1lbnQsXG4gICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LFxuICAgICAgdG9kb0l0ZW1zLFxuICAgICAgcHJpb3JpdHksXG4gICAgICBwcm9qZWN0LFxuICAgICAgZHVlRGF0ZVxuICAgICk7XG4gIH0pO1xuXG4gIGNyZWF0ZURlc2NyaXB0aW9uKG5ld1Rhc2tFbGVtZW50LCBuZXdUYXNrRWxlbWVudFRpdGxlLCBkZXNjcmlwdGlvbik7XG4gIGFkZEVkaXRCdXR0b25zKCk7XG59O1xuXG5jb25zdCByZXNldFRvZG9MaXN0ID0gKHByb2plY3ROdW1iZXIpID0+IHtcbiAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gIHRhc2tzLnJlcGxhY2VDaGlsZHJlbigpO1xuICBkYXNoYm9hcmRbcHJvamVjdE51bWJlcl0uZm9yRWFjaCgodGFzaykgPT4ge1xuICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IHRhc2sucHJpb3JpdHk7XG4gICAgY29uc3QgdGFza1RpdGxlID0gdGFzay50aXRsZTtcbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IHRhc2suZHVlRGF0ZTtcbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHRhc2tDaGVja2VkID0gdGFzay5jaGVja2VkO1xuXG4gICAgY3JlYXRlTmV3VGFza0VsZW1lbnQoXG4gICAgICB0YXNrUHJpb3JpdHksXG4gICAgICB0YXNrVGl0bGUsXG4gICAgICB0YXNrRHVlRGF0ZSxcbiAgICAgIHRhc2tEZXNjcmlwdGlvbixcbiAgICAgIHRhc2tDaGVja2VkXG4gICAgKTtcbiAgfSk7XG4gIGNyZWF0ZUFkZE5ld1Rhc2tFbGVtZW50KCk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdUYXNrID0gKHByb2plY3QpID0+IHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tcIikudmFsdWU7XG4gIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKS52YWx1ZTtcbiAgZHVlRGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2UoZHVlRGF0ZSkpO1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHdlZWtkYXk6IFwic2hvcnRcIixcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICBtb250aDogXCJzaG9ydFwiLFxuICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgaG91cjogXCJudW1lcmljXCIsXG4gICAgbWludXRlOiBcIm51bWVyaWNcIixcbiAgfTtcbiAgZHVlRGF0ZSA9IGR1ZURhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFwiZW4tVVNcIiwgb3B0aW9ucyk7XG4gIGlmIChpc1RvZGF5KGR1ZURhdGUpKSB7XG4gICAgY29uc3QgZHVlVG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICk7XG4gICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24oZmFsc2UsIHRydWUpO1xuICB9XG4gIGlmIChpc092ZXJkdWUoZHVlRGF0ZSkpIHtcbiAgICBjb25zdCBvdmVyZHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgICBvdmVyZHVlLnNldEF0dHJpYnV0ZShcbiAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgcGFyc2VJbnQob3ZlcmR1ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSArIDFcbiAgICApO1xuICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gIH1cbiAgbGV0IHByaW9yaXR5ID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZSk7XG4gIGlmIChwcmlvcml0eSA9PT0gMCkgcHJpb3JpdHkgPSAxO1xuICBpZiAoTnVtYmVyLmlzTmFOKHByaW9yaXR5KSkgcHJpb3JpdHkgPSBJbmZpbml0eTtcbiAgaWYgKHByaW9yaXR5ID4gcHJvamVjdC5sZW5ndGggKyAxKSBwcmlvcml0eSA9IHByb2plY3QubGVuZ3RoICsgMTtcbiAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgaWYgKGRlc2NyaXB0aW9uID09PSBcIlwiKSBkZXNjcmlwdGlvbiA9IFwiTm8gZGVzY3JpcHRpb24gYXZhaWxhYmxlLlwiO1xuICBjb25zdCBjaGVja2VkID0gZmFsc2U7XG4gIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgaWYgKHByb2plY3RbcHJpb3JpdHkgLSAxXSkge1xuICAgIGV4aXN0cyA9IHRydWU7XG4gICAgbmV3VGFzayhwcm9qZWN0LCB0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIGRlc2NyaXB0aW9uLCBjaGVja2VkLCBleGlzdHMpO1xuICAgIHByb2plY3QuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICB0YXNrLnByaW9yaXR5ID0gcHJvamVjdC5pbmRleE9mKHRhc2spICsgMTtcbiAgICB9KTtcbiAgICByZXNldFRvZG9MaXN0KGRhc2hib2FyZC5pbmRleE9mKHByb2plY3QpKTtcbiAgfSBlbHNlIHtcbiAgICBuZXdUYXNrKHByb2plY3QsIHRpdGxlLCBkdWVEYXRlLCBwcmlvcml0eSwgZGVzY3JpcHRpb24sIGNoZWNrZWQsIGV4aXN0cyk7XG4gICAgY3JlYXRlTmV3VGFza0VsZW1lbnQocHJpb3JpdHksIHRpdGxlLCBkdWVEYXRlLCBkZXNjcmlwdGlvbiwgY2hlY2tlZCk7XG4gICAgY3JlYXRlQWRkTmV3VGFza0VsZW1lbnQoKTtcbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgY3JlYXRlQWRkTmV3VGFza0VsZW1lbnQsXG4gIGNyZWF0ZU5ld1Rhc2tFbGVtZW50LFxuICByZXNldFRvZG9MaXN0LFxuICBjcmVhdGVOZXdUYXNrLFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQgeyBkYXNoYm9hcmQgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uLFxuICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCxcbn0gZnJvbSBcIi4vcHJvamVjdC1jb21wb25lbnRzXCI7XG5pbXBvcnQgY3JlYXRlRGVzY3JpcHRpb24gZnJvbSBcIi4vdGFzay1jb21wb25lbnRzXCI7XG5cbmNvbnN0IGlzVG9kYXkgPSAoZGF0ZSkgPT4ge1xuICBsZXQgdG9kYXlzRGF0ZSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgd2Vla2RheTogXCJzaG9ydFwiLFxuICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgZGF5OiBcIm51bWVyaWNcIixcbiAgfTtcbiAgdG9kYXlzRGF0ZSA9IHRvZGF5c0RhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFwiZW4tVVNcIiwgb3B0aW9ucyk7XG4gIGNvbnN0IGxhc3RDb21tYSA9IHRvZGF5c0RhdGUubGFzdEluZGV4T2YoXCIsXCIpO1xuICB0b2RheXNEYXRlID0gdG9kYXlzRGF0ZS5zdWJzdHJpbmcoMCwgbGFzdENvbW1hKTtcbiAgaWYgKGRhdGUuaW5jbHVkZXModG9kYXlzRGF0ZSkpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBpc092ZXJkdWUgPSAoZGF0ZSkgPT4ge1xuICBjb25zdCB0aW1lID0gRGF0ZS5wYXJzZShuZXcgRGF0ZSgpKTtcbiAgY29uc3QgcGFyc2VkRGF0ZSA9IERhdGUucGFyc2UoZGF0ZSk7XG4gIGlmIChwYXJzZWREYXRlIDwgdGltZSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGR1ZVRvZGF5ID0gKCkgPT4ge1xuICBjb25zdCBkdWVUb2RheUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgY29uc3Qgb3ZlcmR1ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICBsZXQgbnVtYmVyT2ZUYXNrcyA9IDA7XG4gIGxldCBudW1iZXJPZkNvbXBsZXRlZFRhc2tzID0gMDtcbiAgY29uc3QgZHVlVG9kYXlGdW5jdGlvbmFsaXR5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICAgIHRhc2tzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIGRhc2hib2FyZC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBwcm9qZWN0LmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgaWYgKGlzVG9kYXkodGFzay5kdWVEYXRlKSkge1xuICAgICAgICAgIG51bWJlck9mVGFza3MgKz0gMTtcbiAgICAgICAgICBjb25zdCBwcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgW2RhdGEtcHJvamVjdD0nJHtkYXNoYm9hcmQuaW5kZXhPZihwcm9qZWN0KX0nXWBcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIpO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50Q2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3guY2xhc3NMaXN0LmFkZChcImNoZWNrYm94XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gpO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS10aXRsZVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudFRpdGxlKTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50RHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWR1ZS1kYXRlXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50RHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudER1ZURhdGUpO1xuICAgICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50KTtcblxuICAgICAgICAgIGlmICh0YXNrLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIuKck1wiO1xuICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWNoZWNrZWRcIik7XG4gICAgICAgICAgICBudW1iZXJPZkNvbXBsZXRlZFRhc2tzICs9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBuZXdUYXNrRWxlbWVudFxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLXRpdGxlXCIpXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgICAgICB0YXNrLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgICBwYXJzZUludChwcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmIChpc092ZXJkdWUodGFzay5kdWVEYXRlKSkge1xuICAgICAgICAgICAgICAgIG92ZXJkdWVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgKyAxXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3RFbGVtZW50LCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLXRpdGxlXCIpXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwi4pyTXCI7XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgICAgICB0YXNrLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KHByb2plY3RFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSArIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSArIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKGlzT3ZlcmR1ZSh0YXNrLmR1ZURhdGUpKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmR1ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChvdmVyZHVlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdEVsZW1lbnQsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY3JlYXRlRGVzY3JpcHRpb24oXG4gICAgICAgICAgICBuZXdUYXNrRWxlbWVudCxcbiAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUsXG4gICAgICAgICAgICB0YXNrLmRlc2NyaXB0aW9uXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG4gIGR1ZVRvZGF5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZHVlVG9kYXlGdW5jdGlvbmFsaXR5KTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGR1ZVRvZGF5RnVuY3Rpb25hbGl0eSk7XG4gIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIsIG51bWJlck9mVGFza3MpO1xuICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIiwgbnVtYmVyT2ZDb21wbGV0ZWRUYXNrcyk7XG4gIGxldCBkdWVUb2RheUVsZW1lbnRUaXRsZSA9IGR1ZVRvZGF5RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLnNpZGViYXItaXRlbS10aXRsZVwiXG4gICkudGV4dENvbnRlbnQ7XG4gIGR1ZVRvZGF5RWxlbWVudFRpdGxlID0gYCR7ZHVlVG9kYXlFbGVtZW50VGl0bGV9ICgke251bWJlck9mQ29tcGxldGVkVGFza3N9LyR7bnVtYmVyT2ZUYXNrc30pYDtcbiAgZHVlVG9kYXlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRpdGxlXCIpLnRleHRDb250ZW50ID1cbiAgICBkdWVUb2RheUVsZW1lbnRUaXRsZTtcbiAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24oZmFsc2UsIHRydWUpO1xufTtcblxuY29uc3Qgb3ZlcmR1ZSA9ICgpID0+IHtcbiAgY29uc3Qgb3ZlcmR1ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICBjb25zdCBkdWVUb2RheUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgbGV0IG51bWJlck9mVGFza3MgPSAwO1xuICBjb25zdCBvdmVyZHVlRnVuY3Rpb25hbGl0eSA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgICB0YXNrcy5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICBkYXNoYm9hcmQuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgcHJvamVjdC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgIGlmIChpc092ZXJkdWUodGFzay5kdWVEYXRlKSAmJiAhdGFzay5jaGVja2VkKSB7XG4gICAgICAgICAgbnVtYmVyT2ZUYXNrcyArPSAxO1xuICAgICAgICAgIGNvbnN0IHByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1wcm9qZWN0PScke2Rhc2hib2FyZC5pbmRleE9mKHByb2plY3QpfSddYFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgbmV3VGFza0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW1cIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcIml0ZW1cIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm92ZXJkdWVcIik7XG4gICAgICAgICAgY29uc3QgbmV3VGFza0VsZW1lbnRDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5jbGFzc0xpc3QuYWRkKFwiY2hlY2tib3hcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnRDaGVja2JveCk7XG4gICAgICAgICAgY29uc3QgbmV3VGFza0VsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLXRpdGxlXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50VGl0bGUpO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnREdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tZHVlLWRhdGVcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnREdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kdWVEYXRlO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50RHVlRGF0ZSk7XG4gICAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnQpO1xuXG4gICAgICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgICB0YXNrLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgb3ZlcmR1ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgIHBhcnNlSW50KHByb2plY3RFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSArIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoaXNUb2RheSh0YXNrLmR1ZURhdGUpKSB7XG4gICAgICAgICAgICAgIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3RFbGVtZW50LCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0RWxlbWVudCwgZmFsc2UpO1xuICAgICAgICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICAgICAgICAgIHRhc2tzLnJlbW92ZUNoaWxkKG5ld1Rhc2tFbGVtZW50KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNyZWF0ZURlc2NyaXB0aW9uKFxuICAgICAgICAgICAgbmV3VGFza0VsZW1lbnQsXG4gICAgICAgICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLFxuICAgICAgICAgICAgdGFzay5kZXNjcmlwdGlvblxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICBvdmVyZHVlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3ZlcmR1ZUZ1bmN0aW9uYWxpdHkpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgb3ZlcmR1ZUZ1bmN0aW9uYWxpdHkpO1xuICBvdmVyZHVlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIsIG51bWJlck9mVGFza3MpO1xuICBsZXQgb3ZlcmR1ZUVsZW1lbnRUaXRsZSA9IG92ZXJkdWVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIuc2lkZWJhci1pdGVtLXRpdGxlXCJcbiAgKS50ZXh0Q29udGVudDtcbiAgb3ZlcmR1ZUVsZW1lbnRUaXRsZSA9IGAke292ZXJkdWVFbGVtZW50VGl0bGV9ICgke251bWJlck9mVGFza3N9KWA7XG4gIG92ZXJkdWVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRpdGxlXCIpLnRleHRDb250ZW50ID1cbiAgICBvdmVyZHVlRWxlbWVudFRpdGxlO1xuICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xufTtcblxuZXhwb3J0IHsgaXNUb2RheSwgZHVlVG9kYXksIGlzT3ZlcmR1ZSwgb3ZlcmR1ZSB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHsgY3JlYXRlRHJvcGRvd25IaWRlciwgYWRkRWRpdEJ1dHRvbnMgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stY29tcG9uZW50c1wiO1xuaW1wb3J0IG1vZGFsQ29udHJvbHMgZnJvbSBcIi4vbW9kYWwtY29udHJvbHNcIjtcbmltcG9ydCB7IHN0b3JhZ2VJc0F2YWlsYWJsZSwgcG9wdWxhdGVQYWdlIH0gZnJvbSBcIi4vbG9jYWwtc3RvcmFnZVwiO1xuaW1wb3J0IHsgZHVlVG9kYXksIG92ZXJkdWUgfSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQgeyBleGlzdGluZ1Byb2plY3RzQ2hlY2sgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcblxuY3JlYXRlRHJvcGRvd25IaWRlcigpO1xuYWRkRWRpdEJ1dHRvbnMoKTtcbm1vZGFsQ29udHJvbHMoKTtcbmR1ZVRvZGF5KCk7XG5vdmVyZHVlKCk7XG5pZiAoc3RvcmFnZUlzQXZhaWxhYmxlKFwibG9jYWxTdG9yYWdlXCIpICYmIGV4aXN0aW5nUHJvamVjdHNDaGVjaygpKSB7XG4gIHBvcHVsYXRlUGFnZSgpO1xuICBjb25zb2xlLmxvZyhcIkhJIVwiKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==