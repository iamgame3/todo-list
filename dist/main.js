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
};

const target = document.querySelector(".content");
const config = { attributes: true, childList: true, subtree: true };
const callback = () => updateStorage();
const observer = new MutationObserver(callback);
observer.observe(target, config);

const populatePage = () => {
  _project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard.forEach((project) => {
    const projectIndex = _project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard.indexOf(project);
    const projectTitle = _project_task_logic__WEBPACK_IMPORTED_MODULE_0__.projectNames[projectIndex];
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

const addEditButtons = () => {
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
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZnRjtBQUNuQztBQUNzQjtBQUN4QjtBQUNrQjs7QUFFN0QsNkVBQW1CO0FBQ25CLHdFQUFjO0FBQ2QsMkRBQWE7QUFDYiwrQ0FBUTtBQUNSLDhDQUFPO0FBQ1AsSUFBSSxrRUFBa0Isb0JBQW9CLDBFQUFxQjtBQUMvRCxFQUFFLDREQUFZO0FBQ2QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9jYWwtc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kYWwtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QtY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC1jcmVhdGlvbi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC10YXNrLWNvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QtdGFzay1sb2dpYy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay1jb21wb25lbnRzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLWNyZWF0aW9uLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90aW1lLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCB7IGRhc2hib2FyZCwgcHJvamVjdE5hbWVzIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWxvZ2ljXCI7XG5pbXBvcnQgeyBhZGRFZGl0QnV0dG9ucyB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1jb21wb25lbnRzXCI7XG5pbXBvcnQge1xuICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbixcbiAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQsXG59IGZyb20gXCIuL3Byb2plY3QtY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgaXNPdmVyZHVlLCBpc1RvZGF5IH0gZnJvbSBcIi4vdGltZVwiO1xuaW1wb3J0IHsgcmVzZXRUb2RvTGlzdCB9IGZyb20gXCIuL3Rhc2stY3JlYXRpb25cIjtcblxuY29uc3Qgc3RvcmFnZUlzQXZhaWxhYmxlID0gKHR5cGUpID0+IHtcbiAgbGV0IHN0b3JhZ2U7XG4gIHRyeSB7XG4gICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICBjb25zdCB4ID0gXCJfX3N0b3JhZ2VfdGVzdF9fXCI7XG4gICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiAoXG4gICAgICBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmXG4gICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAoZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09IFwiUXVvdGFFeGNlZWRlZEVycm9yXCIgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09IFwiTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRURcIikgJiZcbiAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICBzdG9yYWdlICYmXG4gICAgICBzdG9yYWdlLmxlbmd0aCAhPT0gMFxuICAgICk7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZVByb2plY3RFbGVtZW50ID0gKHRpdGxlLCBwYWdlUmVzZXQpID0+IHtcbiAgY29uc3Qgb3ZlcmR1ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICBjb25zdCBkdWVUb2RheUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgY29uc3QgYWRkTmV3UHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1hZGRcIik7XG4gIGNvbnN0IG5ld1Byb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNpZGViYXItaXRlbVwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIml0ZW1cIik7XG4gIG5ld1Byb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBwYWdlUmVzZXQpO1xuICBsZXQgY29tcGxldGVkVGFza3MgPSAwO1xuICBkYXNoYm9hcmRbcGFnZVJlc2V0XS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgaWYgKHRhc2suY2hlY2tlZCkge1xuICAgICAgaWYgKGlzVG9kYXkodGFzay5kdWVEYXRlKSkge1xuICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSArIDFcbiAgICAgICAgKTtcbiAgICAgICAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSArIDFcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbXBsZXRlZFRhc2tzICs9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc092ZXJkdWUodGFzay5kdWVEYXRlKSkge1xuICAgICAgICBvdmVyZHVlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgKyAxXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoaXNUb2RheSh0YXNrLmR1ZURhdGUpKSB7XG4gICAgICAgIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIG5ld1Byb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIsIGNvbXBsZXRlZFRhc2tzKTtcbiAgY29uc3QgbmV3UHJvamVjdEVsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Byb2plY3RFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInNpZGViYXItaXRlbS10aXRsZVwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IGAke3RpdGxlfSAoJHtuZXdQcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXG4gICAgXCJkYXRhLWNvbXBsZXRlZFwiXG4gICl9LyR7ZGFzaGJvYXJkW3BhZ2VSZXNldF0ubGVuZ3RofSlgO1xuICBuZXdQcm9qZWN0RWxlbWVudC5hcHBlbmRDaGlsZChuZXdQcm9qZWN0RWxlbWVudFRpdGxlKTtcbiAgYWRkTmV3UHJvamVjdEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlYmVnaW5cIiwgbmV3UHJvamVjdEVsZW1lbnQpO1xuXG4gIGFkZEVkaXRCdXR0b25zKCk7XG5cbiAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24obmV3UHJvamVjdEVsZW1lbnQsIHRydWUpO1xuXG4gIG5ld1Byb2plY3RFbGVtZW50VGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgICBjb25zdCBwcm9qZWN0TnVtYmVyID0gbmV3UHJvamVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpO1xuICAgIHRhc2tzLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBwcm9qZWN0TnVtYmVyKTtcbiAgICB0YXNrcy5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICByZXNldFRvZG9MaXN0KHByb2plY3ROdW1iZXIpO1xuICB9KTtcbn07XG5cbmNvbnN0IHVwZGF0ZVN0b3JhZ2UgPSAoKSA9PiB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZGFzaGJvYXJkXCIsIEpTT04uc3RyaW5naWZ5KGRhc2hib2FyZCkpO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3ROYW1lc1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0TmFtZXMpKTtcbn07XG5cbmNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKTtcbmNvbnN0IGNvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH07XG5jb25zdCBjYWxsYmFjayA9ICgpID0+IHVwZGF0ZVN0b3JhZ2UoKTtcbmNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xub2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIGNvbmZpZyk7XG5cbmNvbnN0IHBvcHVsYXRlUGFnZSA9ICgpID0+IHtcbiAgZGFzaGJvYXJkLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBkYXNoYm9hcmQuaW5kZXhPZihwcm9qZWN0KTtcbiAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBwcm9qZWN0TmFtZXNbcHJvamVjdEluZGV4XTtcbiAgICBjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0VGl0bGUsIHByb2plY3RJbmRleCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgc3RvcmFnZUlzQXZhaWxhYmxlLCB1cGRhdGVTdG9yYWdlLCBwb3B1bGF0ZVBhZ2UgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQgY3JlYXRlTmV3UHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0LWNyZWF0aW9uXCI7XG5pbXBvcnQgeyBkYXNoYm9hcmQgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcbmltcG9ydCB7IGNyZWF0ZU5ld1Rhc2sgfSBmcm9tIFwiLi90YXNrLWNyZWF0aW9uXCI7XG5cbmNvbnN0IHZhbGlkaXR5Q2hlY2sgPSAoaW5wdXQpID0+IGlucHV0LnZhbGlkaXR5LnZhbGlkO1xuXG5jb25zdCBtb2RhbENvbnRyb2xzID0gKCkgPT4ge1xuICBjb25zdCBhZGROZXdQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdFwiKTtcbiAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW1vZGFsXCIpO1xuICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWVkaXQtbW9kYWxcIik7XG4gIGNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1tb2RhbFwiKTtcbiAgY29uc3QgdGFza0VkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LW1vZGFsXCIpO1xuICBjb25zdCBwcm9qZWN0Q2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtY2xvc2UtYnV0dG9uXCIpO1xuICBjb25zdCBwcm9qZWN0RWRpdENsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi5wcm9qZWN0LWVkaXQtY2xvc2UtYnV0dG9uXCJcbiAgKTtcbiAgY29uc3QgdGFza0Nsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNsb3NlLWJ1dHRvblwiKTtcbiAgY29uc3QgdGFza0VkaXRDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LWNsb3NlLWJ1dHRvblwiKTtcbiAgY29uc3QgcHJvamVjdFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zdWJtaXQtYnV0dG9uXCIpO1xuICBjb25zdCB0YXNrU3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXN1Ym1pdC1idXR0b25cIik7XG5cbiAgYWRkTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpLnJlc2V0KCk7XG4gICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfSk7XG5cbiAgcHJvamVjdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9KTtcblxuICBwcm9qZWN0RWRpdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcHJvamVjdEVkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgdGFza0Nsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9KTtcblxuICB0YXNrRWRpdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGFza0VkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgcHJvamVjdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBwcm9qZWN0TW9kYWwpIHtcbiAgICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHByb2plY3RFZGl0TW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IHByb2plY3RFZGl0TW9kYWwpIHtcbiAgICAgIHByb2plY3RFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcblxuICB0YXNrTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IHRhc2tNb2RhbCkge1xuICAgICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG5cbiAgdGFza0VkaXRNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGFza0VkaXRNb2RhbCkge1xuICAgICAgdGFza0VkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHByb2plY3RTdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0TW9kYWxJbnB1dHMgPSBBcnJheS5mcm9tKFxuICAgICAgcHJvamVjdE1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKVxuICAgICk7XG4gICAgaWYgKHByb2plY3RNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgY3JlYXRlTmV3UHJvamVjdCgpO1xuICAgICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG5cbiAgdGFza1N1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tNb2RhbElucHV0cyA9IEFycmF5LmZyb20odGFza01vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKSk7XG4gICAgaWYgKHRhc2tNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgY29uc3QgdG9kb0l0ZW1zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICAgICAgY29uc3QgcHJvamVjdCA9XG4gICAgICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXNDb250YWluZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV07XG4gICAgICBjcmVhdGVOZXdUYXNrKHByb2plY3QpO1xuICAgICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtb2RhbENvbnRyb2xzO1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCB7IGRhc2hib2FyZCB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1sb2dpY1wiO1xuXG5jb25zdCBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbiA9IChwcm9qZWN0LCBkdWVUb2RheSkgPT4ge1xuICBjb25zdCBvbGRDb21wbGV0aW9uID0gL1xcKFxcZCpcXC9cXGQqXFwpLztcbiAgaWYgKHByb2plY3QpIHtcbiAgICBjb25zdCB0YXNrcyA9XG4gICAgICBkYXNoYm9hcmRbcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXS5sZW5ndGg7XG4gICAgY29uc3QgY29tcGxldGVkVGFza3MgPSBwYXJzZUludChwcm9qZWN0LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKTtcbiAgICBsZXQgdGl0bGUgPSBwcm9qZWN0LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRpdGxlXCIpLnRleHRDb250ZW50O1xuICAgIGNvbnN0IGNvbXBsZXRpb25JbmRleCA9IHRpdGxlLnNlYXJjaChvbGRDb21wbGV0aW9uKSAtIDE7XG4gICAgdGl0bGUgPSB0aXRsZS5zdWJzdHJpbmcoMCwgY29tcGxldGlvbkluZGV4KTtcbiAgICB0aXRsZSA9IGAke3RpdGxlfSAoJHtjb21wbGV0ZWRUYXNrc30vJHt0YXNrc30pYDtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBwcm9qZWN0LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRpdGxlXCIpLnRleHRDb250ZW50ID0gdGl0bGU7XG4gIH1cbiAgaWYgKGR1ZVRvZGF5KSB7XG4gICAgY29uc3QgZHVlVG9kYXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgbGV0IGR1ZVRvZGF5VGl0bGUgPSBkdWVUb2RheUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLnNpZGViYXItaXRlbS10aXRsZVwiXG4gICAgKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBkdWVUb2RheVRhc2tzID0gcGFyc2VJbnQoZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpO1xuICAgIGNvbnN0IGR1ZVRvZGF5Q29tcGxldGVkVGFza3MgPSBwYXJzZUludChcbiAgICAgIGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKVxuICAgICk7XG4gICAgY29uc3QgZHVlVG9kYXlDb21wbGV0aW9uSW5kZXggPSBkdWVUb2RheVRpdGxlLnNlYXJjaChvbGRDb21wbGV0aW9uKSAtIDE7XG4gICAgZHVlVG9kYXlUaXRsZSA9IGR1ZVRvZGF5VGl0bGUuc3Vic3RyaW5nKDAsIGR1ZVRvZGF5Q29tcGxldGlvbkluZGV4KTtcbiAgICBkdWVUb2RheVRpdGxlID0gYCR7ZHVlVG9kYXlUaXRsZX0gKCR7ZHVlVG9kYXlDb21wbGV0ZWRUYXNrc30vJHtkdWVUb2RheVRhc2tzfSlgO1xuICAgIGR1ZVRvZGF5RWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKS50ZXh0Q29udGVudCA9XG4gICAgICBkdWVUb2RheVRpdGxlO1xuICB9XG59O1xuXG5jb25zdCBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCA9ICgpID0+IHtcbiAgY29uc3Qgb2xkQ291bnQgPSAvXFwoXFxkKlxcKS87XG4gIGNvbnN0IG92ZXJkdWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgbGV0IG92ZXJkdWVUaXRsZSA9IG92ZXJkdWVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIuc2lkZWJhci1pdGVtLXRpdGxlXCJcbiAgKS50ZXh0Q29udGVudDtcbiAgY29uc3Qgb3ZlcmR1ZVRhc2tzID0gcGFyc2VJbnQob3ZlcmR1ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSk7XG4gIGNvbnN0IG92ZXJkdWVUYXNrQ291bnRJbmRleCA9IG92ZXJkdWVUaXRsZS5zZWFyY2gob2xkQ291bnQpIC0gMTtcbiAgb3ZlcmR1ZVRpdGxlID0gb3ZlcmR1ZVRpdGxlLnN1YnN0cmluZygwLCBvdmVyZHVlVGFza0NvdW50SW5kZXgpO1xuICBvdmVyZHVlVGl0bGUgPSBgJHtvdmVyZHVlVGl0bGV9ICgke292ZXJkdWVUYXNrc30pYDtcbiAgb3ZlcmR1ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIikudGV4dENvbnRlbnQgPVxuICAgIG92ZXJkdWVUaXRsZTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVByb2plY3RDb21wbGV0aW9uLCBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCB9O1xuIiwiaW1wb3J0IHsgZGFzaGJvYXJkLCBuZXdQcm9qZWN0IH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWxvZ2ljXCI7XG5pbXBvcnQgeyBhZGRFZGl0QnV0dG9ucyB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1jb21wb25lbnRzXCI7XG5pbXBvcnQgeyByZXNldFRvZG9MaXN0IH0gZnJvbSBcIi4vdGFzay1jcmVhdGlvblwiO1xuXG5jb25zdCBjcmVhdGVBZGROZXdQcm9qZWN0RWxlbWVudCA9ICgpID0+IHtcbiAgY29uc3Qgc2lkZWJhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW1zXCIpO1xuICBjb25zdCBvbGRBZGROZXdQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXByb2plY3RcIik7XG4gIG9sZEFkZE5ld1Byb2plY3RFbGVtZW50LnJlbW92ZSgpO1xuICBjb25zdCBuZXdBZGROZXdQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyLWl0ZW0tYWRkXCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm5ldy1wcm9qZWN0XCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICBjb25zdCBuZXdBZGROZXdQcm9qZWN0RWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IFwiKyBBZGQgTmV3IFByb2plY3RcIjtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3QWRkTmV3UHJvamVjdEVsZW1lbnRUaXRsZSk7XG4gIHNpZGViYXJJdGVtcy5hcHBlbmRDaGlsZChuZXdBZGROZXdQcm9qZWN0RWxlbWVudCk7XG5cbiAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW1vZGFsXCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpLnJlc2V0KCk7XG4gICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdQcm9qZWN0RWxlbWVudCA9ICh0aXRsZSkgPT4ge1xuICBjb25zdCBzaWRlYmFySXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbXNcIik7XG4gIGNvbnN0IG5ld1Byb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNpZGViYXItaXRlbVwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIml0ZW1cIik7XG4gIG5ld1Byb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBkYXNoYm9hcmQubGVuZ3RoIC0gMSk7XG4gIG5ld1Byb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIsIDApO1xuICBjb25zdCBuZXdQcm9qZWN0RWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKFwic2lkZWJhci1pdGVtLXRpdGxlXCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gYCR7dGl0bGV9ICgwLzApYDtcbiAgbmV3UHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEVsZW1lbnRUaXRsZSk7XG4gIHNpZGViYXJJdGVtcy5hcHBlbmRDaGlsZChuZXdQcm9qZWN0RWxlbWVudCk7XG5cbiAgYWRkRWRpdEJ1dHRvbnMoKTtcblxuICBuZXdQcm9qZWN0RWxlbWVudFRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gICAgY29uc3QgcHJvamVjdE51bWJlciA9IG5ld1Byb2plY3RFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKTtcbiAgICB0YXNrcy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgcHJvamVjdE51bWJlcik7XG4gICAgdGFza3MucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgcmVzZXRUb2RvTGlzdChwcm9qZWN0TnVtYmVyKTtcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdQcm9qZWN0ID0gKCkgPT4ge1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1uYW1lXCIpLnZhbHVlO1xuICBuZXdQcm9qZWN0KHRpdGxlKTtcbiAgY3JlYXRlTmV3UHJvamVjdEVsZW1lbnQodGl0bGUpO1xuICBjcmVhdGVBZGROZXdQcm9qZWN0RWxlbWVudCgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTmV3UHJvamVjdDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQgZWRpdEljb25TcmMgZnJvbSBcIi4vaWNvbnMvZG90cy12ZXJ0aWNhbC5zdmdcIjtcbmltcG9ydCB7IGRhc2hib2FyZCwgcHJvamVjdE5hbWVzIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWxvZ2ljXCI7XG5pbXBvcnQgeyBpc1RvZGF5LCBpc092ZXJkdWUgfSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQge1xuICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCxcbiAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24sXG59IGZyb20gXCIuL3Byb2plY3QtY29tcG9uZW50c1wiO1xuXG5jb25zdCB2YWxpZGl0eUNoZWNrID0gKGlucHV0KSA9PiBpbnB1dC52YWxpZGl0eS52YWxpZDtcblxuY29uc3QgY3JlYXRlRHJvcGRvd25IaWRlciA9ICgpID0+IHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoXG4gICAgICAhZXZlbnQudGFyZ2V0Lm1hdGNoZXMoXCIuZHJvcGRvd24tY29udGVudFwiKSAmJlxuICAgICAgIWV2ZW50LnRhcmdldC5tYXRjaGVzKFwiLmVkaXQtYnV0dG9uXCIpXG4gICAgKSB7XG4gICAgICBjb25zdCBkcm9wZG93bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRyb3Bkb3duLWNvbnRlbnRcIik7XG4gICAgICBkcm9wZG93bnMuZm9yRWFjaCgoZHJvcGRvd24pID0+IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGRyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IGNoZWNrYm94RnVuY3Rpb25hbGl0eSA9IChcbiAgdGFza0VsZW1lbnQsXG4gIHRhc2tFbGVtZW50Q2hlY2tib3gsXG4gIHRvZG9JdGVtcyxcbiAgcHJpb3JpdHksXG4gIHByb2plY3QsXG4gIGR1ZURhdGVcbikgPT4ge1xuICBpZiAoXG4gICAgdGFza0VsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1jaGVja2VkXCIpXG4gICkge1xuICAgIHRhc2tFbGVtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIilcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwidG9kby1pdGVtLWNoZWNrZWRcIik7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXVtcbiAgICAgIHByaW9yaXR5IC0gMVxuICAgIF0uY2hlY2tlZCA9IGZhbHNlO1xuICAgIHByb2plY3Quc2V0QXR0cmlidXRlKFxuICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgKTtcbiAgICBpZiAoaXNUb2RheShkdWVEYXRlKSAmJiBpc092ZXJkdWUoZHVlRGF0ZSkpIHtcbiAgICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG92ZXJkdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICAgKTtcbiAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIHRydWUpO1xuICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICB9XG4gICAgaWYgKGlzVG9kYXkoZHVlRGF0ZSkgJiYgIWlzT3ZlcmR1ZShkdWVEYXRlKSkge1xuICAgICAgY29uc3QgZHVlVG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgICApO1xuICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgdHJ1ZSk7XG4gICAgfVxuICAgIGlmIChpc092ZXJkdWUoZHVlRGF0ZSkgJiYgIWlzVG9kYXkoZHVlRGF0ZSkpIHtcbiAgICAgIGNvbnN0IG92ZXJkdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICAgKTtcbiAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCBmYWxzZSk7XG4gICAgfSBlbHNlIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIGZhbHNlKTtcbiAgfSBlbHNlIHtcbiAgICB0YXNrRWxlbWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLXRpdGxlXCIpXG4gICAgICAuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIuKck1wiO1xuICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV1bXG4gICAgICBwcmlvcml0eSAtIDFcbiAgICBdLmNoZWNrZWQgPSB0cnVlO1xuICAgIHByb2plY3Quc2V0QXR0cmlidXRlKFxuICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgKTtcbiAgICBpZiAoaXNUb2RheShkdWVEYXRlKSAmJiBpc092ZXJkdWUoZHVlRGF0ZSkpIHtcbiAgICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG92ZXJkdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgKTtcbiAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIHRydWUpO1xuICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICB9XG4gICAgaWYgKGlzVG9kYXkoZHVlRGF0ZSkgJiYgIWlzT3ZlcmR1ZShkdWVEYXRlKSkge1xuICAgICAgY29uc3QgZHVlVG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICApO1xuICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgdHJ1ZSk7XG4gICAgfVxuICAgIGlmIChpc092ZXJkdWUoZHVlRGF0ZSkgJiYgIWlzVG9kYXkoZHVlRGF0ZSkpIHtcbiAgICAgIGNvbnN0IG92ZXJkdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgKTtcbiAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCBmYWxzZSk7XG4gICAgfSBlbHNlIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIGZhbHNlKTtcbiAgfVxufTtcblxuY29uc3QgZWRpdEZ1bmN0aW9uYWxpdHkgPSAoaXRlbSkgPT4ge1xuICBjb25zdCBwcm9qZWN0TnVtYmVyID0gcGFyc2VJbnQoXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKVxuICApO1xuICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaWRlYmFyLWl0ZW1cIikpIHtcbiAgICBjb25zdCBpdGVtVGl0bGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRpdGxlXCIpO1xuICAgIGNvbnN0IHByb2plY3RJbmRleCA9IHBhcnNlSW50KGl0ZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKTtcbiAgICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWVkaXQtbW9kYWxcIik7XG4gICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LW5hbWUtZWRpdFwiKTtcbiAgICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBcInByb2plY3QtZWRpdC1zdWJtaXQtYnV0dG9uXCJcbiAgICApO1xuICAgIGNvbnN0IHByb2plY3RFZGl0TW9kYWxTdWJtaXRCdXR0b25DbG9uZSA9XG4gICAgICBwcm9qZWN0RWRpdE1vZGFsU3VibWl0QnV0dG9uLmNsb25lTm9kZSh0cnVlKTtcbiAgICBjb25zdCBwcm9qZWN0Q29tcGxldGlvblJlZ2V4ID0gL1xcKFxcZCpcXC9cXGQqXFwpLztcbiAgICBjb25zdCBwcm9qZWN0Q29tcGxldGlvbkluZGV4ID0gaXRlbVRpdGxlLnRleHRDb250ZW50LnNlYXJjaChcbiAgICAgIHByb2plY3RDb21wbGV0aW9uUmVnZXhcbiAgICApO1xuICAgIGNvbnN0IHByb2plY3RDb21wbGV0aW9uID0gaXRlbVRpdGxlLnRleHRDb250ZW50LnN1YnN0cmluZyhcbiAgICAgIHByb2plY3RDb21wbGV0aW9uSW5kZXhcbiAgICApO1xuICAgIHByb2plY3RFZGl0TW9kYWxUaXRsZS52YWx1ZSA9IGl0ZW1UaXRsZS50ZXh0Q29udGVudC5zdWJzdHJpbmcoXG4gICAgICAwLFxuICAgICAgcHJvamVjdENvbXBsZXRpb25JbmRleCAtIDFcbiAgICApO1xuXG4gICAgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbi5yZXBsYWNlV2l0aChwcm9qZWN0RWRpdE1vZGFsU3VibWl0QnV0dG9uQ2xvbmUpO1xuXG4gICAgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsSW5wdXRzID0gQXJyYXkuZnJvbShcbiAgICAgICAgcHJvamVjdEVkaXRNb2RhbC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIilcbiAgICAgICk7XG4gICAgICBpZiAocHJvamVjdEVkaXRNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgICBpdGVtVGl0bGUudGV4dENvbnRlbnQgPSBgJHtwcm9qZWN0RWRpdE1vZGFsVGl0bGUudmFsdWV9ICR7cHJvamVjdENvbXBsZXRpb259YDtcbiAgICAgICAgcHJvamVjdE5hbWVzW3Byb2plY3RJbmRleF0gPSBwcm9qZWN0RWRpdE1vZGFsVGl0bGUudmFsdWU7XG4gICAgICAgIHByb2plY3RFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaXRlbVByaW9yaXR5ID0gaXRlbS5maXJzdENoaWxkO1xuICAgIGNvbnN0IGl0ZW1UaXRsZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIik7XG4gICAgY29uc3QgaXRlbUR1ZURhdGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLWR1ZS1kYXRlXCIpO1xuICAgIGNvbnN0IHRhc2tUb0VkaXQgPVxuICAgICAgZGFzaGJvYXJkW3Byb2plY3ROdW1iZXJdW3BhcnNlSW50KGl0ZW0uZmlyc3RDaGlsZC50ZXh0Q29udGVudCkgLSAxXTtcbiAgICBjb25zdCBwcmV2aW91c2x5T3ZlcmR1ZSA9IGlzT3ZlcmR1ZShpdGVtRHVlRGF0ZS50ZXh0Q29udGVudCk7XG4gICAgY29uc3QgcHJldmlvdXNseUR1ZVRvZGF5ID0gaXNUb2RheShpdGVtRHVlRGF0ZS50ZXh0Q29udGVudCk7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LW1vZGFsXCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1lZGl0XCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZS1lZGl0XCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHktZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsRGVzY3JpcHRpb24gPVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvbi1lZGl0XCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIFwidGFzay1lZGl0LXN1Ym1pdC1idXR0b25cIlxuICAgICk7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lID1cbiAgICAgIHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b24uY2xvbmVOb2RlKHRydWUpO1xuICAgIHRhc2tFZGl0TW9kYWxUaXRsZS52YWx1ZSA9IHRhc2tUb0VkaXQudGl0bGU7XG4gICAgY29uc3QgdGltZVpvbmVPZmZzZXQgPSBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMDsgLy8gb2Zmc2V0IGluIG1pbGxpc2Vjb25kc1xuICAgIHRhc2tFZGl0TW9kYWxEYXRlLnZhbHVlID0gbmV3IERhdGUoXG4gICAgICBuZXcgRGF0ZSh0YXNrVG9FZGl0LmR1ZURhdGUpLmdldFRpbWUoKSAtIHRpbWVab25lT2Zmc2V0XG4gICAgKVxuICAgICAgLnRvSVNPU3RyaW5nKClcbiAgICAgIC5zbGljZSgwLCAtOCk7XG4gICAgdGFza0VkaXRNb2RhbFByaW9yaXR5LnZhbHVlID0gdGFza1RvRWRpdC5wcmlvcml0eTtcbiAgICB0YXNrRWRpdE1vZGFsRGVzY3JpcHRpb24udmFsdWUgPSB0YXNrVG9FZGl0LmRlc2NyaXB0aW9uO1xuXG4gICAgdGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbi5yZXBsYWNlV2l0aCh0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uQ2xvbmUpO1xuXG4gICAgdGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCB0YXNrRWRpdE1vZGFsSW5wdXRzID0gQXJyYXkuZnJvbShcbiAgICAgICAgdGFza0VkaXRNb2RhbC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIilcbiAgICAgICk7XG4gICAgICBpZiAodGFza0VkaXRNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgICBjb25zdCBvdmVyZHVlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gICAgICAgIGNvbnN0IGR1ZVRvZGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICAgICAgICBjb25zdCB0b2RvSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKHRhc2tFZGl0TW9kYWxEYXRlLnZhbHVlKSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgd2Vla2RheTogXCJzaG9ydFwiLFxuICAgICAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgICAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICAgICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICAgICAgICBob3VyOiBcIm51bWVyaWNcIixcbiAgICAgICAgICBtaW51dGU6IFwibnVtZXJpY1wiLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWREdWVEYXRlID0gZHVlRGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoXCJlbi1VU1wiLCBvcHRpb25zKTtcbiAgICAgICAgY29uc3Qgb2xkRHVlRGF0ZSA9IHRhc2tUb0VkaXQuZHVlRGF0ZTtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCIuY2hlY2tib3hcIik7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94Q2xvbmUgPSBjaGVja2JveC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIGNvbnN0IG9sZFRhc2tQcmlvcml0eSA9IHRhc2tUb0VkaXQucHJpb3JpdHk7XG4gICAgICAgIGxldCB0YXNrUHJpb3JpdHkgPSBwYXJzZUludCh0YXNrRWRpdE1vZGFsUHJpb3JpdHkudmFsdWUpO1xuICAgICAgICBpZiAodGFza1ByaW9yaXR5ID09PSAwKSB0YXNrUHJpb3JpdHkgPSAxO1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHRhc2tQcmlvcml0eSkpIHRhc2tQcmlvcml0eSA9IEluZmluaXR5O1xuICAgICAgICBpZiAodGFza1ByaW9yaXR5ID4gZGFzaGJvYXJkW3Byb2plY3ROdW1iZXJdLmxlbmd0aCkge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9IGRhc2hib2FyZFtwcm9qZWN0TnVtYmVyXS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhc2tQcmlvcml0eSAhPT0gb2xkVGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgaWYgKHRhc2tQcmlvcml0eSA+IG9sZFRhc2tQcmlvcml0eSkge1xuICAgICAgICAgICAgbGV0IG5leHRUYXNrID0gaXRlbS5uZXh0U2libGluZztcbiAgICAgICAgICAgIGxldCBleGlzdGluZ1Rhc2sgPSBudWxsO1xuICAgICAgICAgICAgdG9kb0l0ZW1zLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1pdGVtXCIpLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRhc2suZmlyc3RDaGlsZC50ZXh0Q29udGVudCA9PT0gYCR7dGFza1ByaW9yaXR5fS5gKVxuICAgICAgICAgICAgICAgIGV4aXN0aW5nVGFzayA9IHRhc2s7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgZXhpc3RpbmdUYXNrLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucyhcbiAgICAgICAgICAgICAgICBcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBleGlzdGluZ1Rhc2tEZXNjcmlwdGlvbiA9IGV4aXN0aW5nVGFzay5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgZXhpc3RpbmdUYXNrRGVzY3JpcHRpb24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2UgZXhpc3RpbmdUYXNrLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGl0ZW0pO1xuICAgICAgICAgICAgaWYgKG5leHRUYXNrLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKSkge1xuICAgICAgICAgICAgICBjb25zdCB0ZW1wVGFza1ZhciA9IG5leHRUYXNrLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICBpdGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIG5leHRUYXNrKTtcbiAgICAgICAgICAgICAgbmV4dFRhc2sgPSB0ZW1wVGFza1ZhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBvbGRUYXNrUHJpb3JpdHk7IGkgPCB0YXNrUHJpb3JpdHk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50UHJpb3JpdHkgPSBuZXh0VGFzay5maXJzdENoaWxkO1xuICAgICAgICAgICAgICBjb25zdCBwZXJpb2RJbmRleCA9IGVsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudC5pbmRleE9mKFwiLlwiKTtcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudFByaW9yaXR5Tm9QZXJpb2QgPVxuICAgICAgICAgICAgICAgIGVsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudC5zdWJzdHJpbmcoMCwgcGVyaW9kSW5kZXgpO1xuICAgICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50UHJpb3JpdHkgPSBgJHtcbiAgICAgICAgICAgICAgICBwYXJzZUludChlbGVtZW50UHJpb3JpdHlOb1BlcmlvZCkgLSAxXG4gICAgICAgICAgICAgIH0uYDtcbiAgICAgICAgICAgICAgZWxlbWVudFByaW9yaXR5LnRleHRDb250ZW50ID0gbmV3RWxlbWVudFByaW9yaXR5O1xuICAgICAgICAgICAgICBkYXNoYm9hcmRbcGFyc2VJbnQodG9kb0l0ZW1zLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldW1xuICAgICAgICAgICAgICAgIHBhcnNlSW50KGVsZW1lbnRQcmlvcml0eU5vUGVyaW9kKSAtIDFcbiAgICAgICAgICAgICAgXS5wcmlvcml0eSAtPSAxO1xuICAgICAgICAgICAgICBuZXh0VGFzayA9IG5leHRUYXNrLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICBpZiAobmV4dFRhc2suY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCIpKSB7XG4gICAgICAgICAgICAgICAgbmV4dFRhc2sgPSBuZXh0VGFzay5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXS5zcGxpY2UoXG4gICAgICAgICAgICAgIHRhc2tQcmlvcml0eSxcbiAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgdGFza1RvRWRpdFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV0uc3BsaWNlKFxuICAgICAgICAgICAgICBvbGRUYXNrUHJpb3JpdHkgLSAxLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGFza1ByaW9yaXR5IDwgb2xkVGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdUYXNrID0gbnVsbDtcbiAgICAgICAgICAgIHRvZG9JdGVtcy5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvZG8taXRlbVwiKS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0YXNrLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgPT09IGAke3Rhc2tQcmlvcml0eX0uYClcbiAgICAgICAgICAgICAgICBleGlzdGluZ1Rhc2sgPSB0YXNrO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBwb3NzaWJsZVRhc2tEZXNjcmlwdGlvbiA9IGl0ZW0ubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICBleGlzdGluZ1Rhc2suaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlYmVnaW5cIiwgaXRlbSk7XG4gICAgICAgICAgICBsZXQgbmV4dFRhc2sgPSBpdGVtLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBwb3NzaWJsZVRhc2tEZXNjcmlwdGlvbi5jbGFzc0xpc3QuY29udGFpbnMoXG4gICAgICAgICAgICAgICAgXCJ0b2RvLWl0ZW0tZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgaXRlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBwb3NzaWJsZVRhc2tEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGFza1ByaW9yaXR5OyBpIDwgb2xkVGFza1ByaW9yaXR5OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudFByaW9yaXR5ID0gbmV4dFRhc2suZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgY29uc3QgcGVyaW9kSW5kZXggPSBlbGVtZW50UHJpb3JpdHkudGV4dENvbnRlbnQuaW5kZXhPZihcIi5cIik7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRQcmlvcml0eU5vUGVyaW9kID1cbiAgICAgICAgICAgICAgICBlbGVtZW50UHJpb3JpdHkudGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIHBlcmlvZEluZGV4KTtcbiAgICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudFByaW9yaXR5ID0gYCR7XG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZWxlbWVudFByaW9yaXR5Tm9QZXJpb2QpICsgMVxuICAgICAgICAgICAgICB9LmA7XG4gICAgICAgICAgICAgIGVsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudCA9IG5ld0VsZW1lbnRQcmlvcml0eTtcbiAgICAgICAgICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXVtcbiAgICAgICAgICAgICAgICBwYXJzZUludChlbGVtZW50UHJpb3JpdHlOb1BlcmlvZCkgLSAxXG4gICAgICAgICAgICAgIF0ucHJpb3JpdHkgKz0gMTtcbiAgICAgICAgICAgICAgbmV4dFRhc2sgPSBuZXh0VGFzay5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgaWYgKG5leHRUYXNrLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKSkge1xuICAgICAgICAgICAgICAgIG5leHRUYXNrID0gbmV4dFRhc2submV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV0uc3BsaWNlKFxuICAgICAgICAgICAgICB0YXNrUHJpb3JpdHkgLSAxLFxuICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICB0YXNrVG9FZGl0XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXS5zcGxpY2UoXG4gICAgICAgICAgICAgIG9sZFRhc2tQcmlvcml0eSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGFza1RvRWRpdC50aXRsZSA9IHRhc2tFZGl0TW9kYWxUaXRsZS52YWx1ZTtcbiAgICAgICAgdGFza1RvRWRpdC5kdWVEYXRlID0gZm9ybWF0dGVkRHVlRGF0ZTtcbiAgICAgICAgdGFza1RvRWRpdC5wcmlvcml0eSA9IHRhc2tQcmlvcml0eTtcbiAgICAgICAgdGFza1RvRWRpdC5kZXNjcmlwdGlvbiA9IHRhc2tFZGl0TW9kYWxEZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgICAgY29uc3QgbmV4dEl0ZW0gPSBpdGVtLm5leHRTaWJsaW5nO1xuICAgICAgICBpZiAobmV4dEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCIpKVxuICAgICAgICAgIG5leHRJdGVtLnRleHRDb250ZW50ID0gdGFza1RvRWRpdC5kZXNjcmlwdGlvbjtcbiAgICAgICAgaXRlbVByaW9yaXR5LnRleHRDb250ZW50ID0gYCR7dGFza1ByaW9yaXR5fS5gO1xuICAgICAgICBpdGVtVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrVG9FZGl0LnRpdGxlO1xuICAgICAgICBpdGVtRHVlRGF0ZS50ZXh0Q29udGVudCA9IGZvcm1hdHRlZER1ZURhdGU7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpc092ZXJkdWUoZm9ybWF0dGVkRHVlRGF0ZSkgJiZcbiAgICAgICAgICAhcHJldmlvdXNseU92ZXJkdWUgJiZcbiAgICAgICAgICAhdGFza1RvRWRpdC5jaGVja2VkXG4gICAgICAgICkge1xuICAgICAgICAgIG92ZXJkdWVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgKyAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhaXNPdmVyZHVlKGZvcm1hdHRlZER1ZURhdGUpICYmXG4gICAgICAgICAgcHJldmlvdXNseU92ZXJkdWUgJiZcbiAgICAgICAgICAhdGFza1RvRWRpdC5jaGVja2VkXG4gICAgICAgICkge1xuICAgICAgICAgIG92ZXJkdWVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1RvZGF5KGZvcm1hdHRlZER1ZURhdGUpICYmICFwcmV2aW91c2x5RHVlVG9kYXkpIHtcbiAgICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgKyAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAodGFza1RvRWRpdC5jaGVja2VkKSB7XG4gICAgICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1RvZGF5KGZvcm1hdHRlZER1ZURhdGUpICYmIHByZXZpb3VzbHlEdWVUb2RheSkge1xuICAgICAgICAgIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICh0YXNrVG9FZGl0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkRHVlRGF0ZSAhPT0gZm9ybWF0dGVkRHVlRGF0ZSkge1xuICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYFtkYXRhLXByb2plY3Q9JyR7cHJvamVjdE51bWJlcn0nXWBcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gcGFyc2VJbnQodGFza1RvRWRpdC5wcmlvcml0eSk7XG4gICAgICAgICAgY2hlY2tib3gucmVwbGFjZVdpdGgoY2hlY2tib3hDbG9uZSk7XG5cbiAgICAgICAgICBjaGVja2JveENsb25lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBjaGVja2JveEZ1bmN0aW9uYWxpdHkoXG4gICAgICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgICAgIGNoZWNrYm94Q2xvbmUsXG4gICAgICAgICAgICAgIHRvZG9JdGVtcyxcbiAgICAgICAgICAgICAgcHJpb3JpdHksXG4gICAgICAgICAgICAgIHByb2plY3QsXG4gICAgICAgICAgICAgIGZvcm1hdHRlZER1ZURhdGVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXNrRWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCBhZGRFZGl0QnV0dG9ucyA9ICgpID0+IHtcbiAgY29uc3QgYWRkRWRpdEJ1dHRvbiA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZWRpdEljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICBjb25zdCBlZGl0RHJvcGRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVkaXRPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHJlbW92ZU9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZWRpdEljb24uc3JjID0gZWRpdEljb25TcmM7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwiYWx0XCIsIFwiVmVydGljYWwgZG90dGVkIGxpbmUgaWNvbiBmb3IgZWRpdCBvcHRpb25zLlwiKTtcbiAgICBlZGl0SWNvbi5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ1dHRvblwiKTtcbiAgICBlZGl0RHJvcGRvd24uY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWNvbnRlbnRcIik7XG4gICAgZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGVkaXRPcHRpb24udGV4dENvbnRlbnQgPSBcIkVkaXRcIjtcbiAgICBlZGl0T3B0aW9uLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1pdGVtXCIpO1xuICAgIGVkaXRPcHRpb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJlZGl0LWJ1dHRvblwiKTtcbiAgICBlZGl0T3B0aW9uLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG4gICAgcmVtb3ZlT3B0aW9uLnRleHRDb250ZW50ID0gXCJSZW1vdmVcIjtcbiAgICByZW1vdmVPcHRpb24uY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWl0ZW1cIik7XG4gICAgcmVtb3ZlT3B0aW9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicmVtb3ZlLWJ1dHRvblwiKTtcbiAgICByZW1vdmVPcHRpb24uc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICBlZGl0RHJvcGRvd24uYXBwZW5kQ2hpbGQoZWRpdE9wdGlvbik7XG4gICAgZWRpdERyb3Bkb3duLmFwcGVuZENoaWxkKHJlbW92ZU9wdGlvbik7XG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idXR0b25cIik7XG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd25cIik7XG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0RHJvcGRvd24pO1xuICAgIGl0ZW0uYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG5cbiAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPT09IFwiaGlkZGVuXCIpIHtcbiAgICAgICAgZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH0gZWxzZSBlZGl0RHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWVkaXQtbW9kYWxcIik7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LW1vZGFsXCIpO1xuXG4gICAgZWRpdE9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50SXRlbSA9IGVkaXRPcHRpb24uY2xvc2VzdChcIi5pdGVtXCIpO1xuICAgICAgaWYgKHBhcmVudEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2lkZWJhci1pdGVtXCIpKSB7XG4gICAgICAgIGVkaXRGdW5jdGlvbmFsaXR5KHBhcmVudEl0ZW0pO1xuICAgICAgICBwcm9qZWN0RWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVkaXRGdW5jdGlvbmFsaXR5KHBhcmVudEl0ZW0pO1xuICAgICAgICB0YXNrRWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlbW92ZU9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3Qgb3ZlcmR1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gICAgICBjb25zdCBkdWVUb2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICAgICAgY29uc3QgcGFyZW50SXRlbSA9IHJlbW92ZU9wdGlvbi5jbG9zZXN0KFwiLml0ZW1cIik7XG4gICAgICBpZiAocGFyZW50SXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaWRlYmFyLWl0ZW1cIikpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQocGFyZW50SXRlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpO1xuICAgICAgICBjb25zdCBsYXN0UHJvamVjdEluZGV4ID0gZGFzaGJvYXJkLmxlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUb2RvTGlzdFByb2plY3QgPSBwYXJzZUludChcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUb2RvTGlzdFByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgW2RhdGEtcHJvamVjdD0nJHtjdXJyZW50VG9kb0xpc3RQcm9qZWN0fSddYFxuICAgICAgICApO1xuICAgICAgICBwYXJlbnRJdGVtLnJlbW92ZSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gcHJvamVjdEluZGV4ICsgMTsgaSA8IGxhc3RQcm9qZWN0SW5kZXggKyAxOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYFtkYXRhLXByb2plY3Q9JyR7aX0nXWBcbiAgICAgICAgICApO1xuICAgICAgICAgIHNlbGVjdGVkUHJvamVjdC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBcImRhdGEtcHJvamVjdFwiLFxuICAgICAgICAgICAgcGFyc2VJbnQoc2VsZWN0ZWRQcm9qZWN0LmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSkgLSAxXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBkYXNoYm9hcmRbcHJvamVjdEluZGV4XS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgaWYgKGlzT3ZlcmR1ZSh0YXNrLmR1ZURhdGUpICYmICF0YXNrLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIG92ZXJkdWUuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNUb2RheSh0YXNrLmR1ZURhdGUpKSB7XG4gICAgICAgICAgICBpZiAodGFzay5jaGVja2VkKVxuICAgICAgICAgICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkYXNoYm9hcmQuc3BsaWNlKHByb2plY3RJbmRleCwgMSk7XG4gICAgICAgIHByb2plY3ROYW1lcy5zcGxpY2UocHJvamVjdEluZGV4LCAxKTtcbiAgICAgICAgaWYgKHByb2plY3RJbmRleCA9PT0gY3VycmVudFRvZG9MaXN0UHJvamVjdCkge1xuICAgICAgICAgIGNvbnN0IGNsaWNrRXZlbnQgPSBuZXcgRXZlbnQoXCJjbGlja1wiKTtcbiAgICAgICAgICBvdmVyZHVlLmRpc3BhdGNoRXZlbnQoY2xpY2tFdmVudCk7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpXG4gICAgICAgICAgICAuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICBcImRhdGEtcHJvamVjdFwiLFxuICAgICAgICAgICAgICBwYXJzZUludChcbiAgICAgICAgICAgICAgICBjdXJyZW50VG9kb0xpc3RQcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIilcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9IHBhcnNlSW50KFxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIilcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFtkYXRhLXByb2plY3Q9JyR7cHJvamVjdEluZGV4fSddYFxuICAgICAgICApO1xuICAgICAgICBsZXQgaW5kZXggPSBwYXJlbnRJdGVtLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQuaW5kZXhPZihcIi5cIik7XG4gICAgICAgIGluZGV4ID1cbiAgICAgICAgICBwYXJzZUludChwYXJlbnRJdGVtLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIGluZGV4KSkgLSAxO1xuICAgICAgICBjb25zdCBsYXN0VGFza0luZGV4ID0gZGFzaGJvYXJkW3Byb2plY3RJbmRleF0ubGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgdGFzayA9IGRhc2hib2FyZFtwcm9qZWN0SW5kZXhdW2luZGV4XTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHBhcmVudEl0ZW0ubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIHBhcmVudEl0ZW0ubmV4dFNpYmxpbmcucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5leHRUYXNrID0gcGFyZW50SXRlbS5uZXh0U2libGluZztcbiAgICAgICAgaWYgKG5leHRUYXNrLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1hZGRcIikpIHtcbiAgICAgICAgICBuZXh0VGFzayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHBhcmVudEl0ZW0ucmVtb3ZlKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSBpbmRleCArIDE7IGkgPCBsYXN0VGFza0luZGV4ICsgMTsgaSArPSAxKSB7XG4gICAgICAgICAgZGFzaGJvYXJkW3Byb2plY3RJbmRleF1baV0ucHJpb3JpdHkgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFzay5jaGVja2VkKVxuICAgICAgICAgIHByb2plY3Quc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgICAgICAgKTtcbiAgICAgICAgaWYgKGlzT3ZlcmR1ZSh0YXNrLmR1ZURhdGUpICYmICF0YXNrLmNoZWNrZWQpIHtcbiAgICAgICAgICBvdmVyZHVlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICAgICApO1xuICAgICAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzVG9kYXkodGFzay5kdWVEYXRlKSkge1xuICAgICAgICAgIGlmICh0YXNrLmNoZWNrZWQpXG4gICAgICAgICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgICAgICk7XG4gICAgICAgICAgZGFzaGJvYXJkW3Byb2plY3RJbmRleF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCBmYWxzZSk7XG4gICAgICAgICAgZGFzaGJvYXJkW3Byb2plY3RJbmRleF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAobmV4dFRhc2spIHtcbiAgICAgICAgICBjb25zdCBlbGVtZW50UHJpb3JpdHkgPSBuZXh0VGFzay5maXJzdENoaWxkO1xuICAgICAgICAgIGNvbnN0IHBlcmlvZEluZGV4ID0gZWxlbWVudFByaW9yaXR5LnRleHRDb250ZW50LmluZGV4T2YoXCIuXCIpO1xuICAgICAgICAgIGNvbnN0IGVsZW1lbnRQcmlvcml0eU5vUGVyaW9kID0gZWxlbWVudFByaW9yaXR5LnRleHRDb250ZW50LnN1YnN0cmluZyhcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBwZXJpb2RJbmRleFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgbmV3RWxlbWVudFByaW9yaXR5ID0gYCR7XG4gICAgICAgICAgICBwYXJzZUludChlbGVtZW50UHJpb3JpdHlOb1BlcmlvZCkgLSAxXG4gICAgICAgICAgfS5gO1xuICAgICAgICAgIGVsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudCA9IG5ld0VsZW1lbnRQcmlvcml0eTtcbiAgICAgICAgICBuZXh0VGFzayA9IG5leHRUYXNrLm5leHRTaWJsaW5nO1xuICAgICAgICAgIGlmIChuZXh0VGFzaykge1xuICAgICAgICAgICAgaWYgKG5leHRUYXNrLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKSkge1xuICAgICAgICAgICAgICBuZXh0VGFzayA9IG5leHRUYXNrLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5leHRUYXNrICYmIG5leHRUYXNrLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1hZGRcIikpIHtcbiAgICAgICAgICAgICAgbmV4dFRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBlZGl0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWRpdC1idXR0b25cIik7XG4gIGVkaXRCdXR0b25zLmZvckVhY2goKGVkaXRCdXR0b24pID0+IGVkaXRCdXR0b24ucmVtb3ZlKCkpO1xuICBjb25zdCB0ZXN0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNpZGViYXItaXRlbVwiKTtcbiAgY29uc3QgdGVzdEl0ZW1zMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1pdGVtXCIpO1xuICB0ZXN0SXRlbXMuZm9yRWFjaCgodGVzdEl0ZW0pID0+IGFkZEVkaXRCdXR0b24odGVzdEl0ZW0pKTtcbiAgdGVzdEl0ZW1zMi5mb3JFYWNoKCh0ZXN0SXRlbSkgPT4gYWRkRWRpdEJ1dHRvbih0ZXN0SXRlbSkpO1xufTtcblxuZXhwb3J0IHtcbiAgY3JlYXRlRHJvcGRvd25IaWRlcixcbiAgZWRpdEZ1bmN0aW9uYWxpdHksXG4gIGFkZEVkaXRCdXR0b25zLFxuICBjaGVja2JveEZ1bmN0aW9uYWxpdHksXG59O1xuIiwiY29uc3QgZGF0YUNyZWF0aW9uID0gKCkgPT4ge1xuICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJkYXNoYm9hcmRcIikpIHtcbiAgICBjb25zdCBkYXNoYm9hcmRUZW1wID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRhc2hib2FyZFwiKSk7XG4gICAgY29uc3QgcHJvamVjdE5hbWVzVGVtcCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0TmFtZXNcIikpO1xuICAgIHJldHVybiBbZGFzaGJvYXJkVGVtcCwgcHJvamVjdE5hbWVzVGVtcF07XG4gIH1cbiAgY29uc3QgZGFzaGJvYXJkVGVtcCA9IFtdO1xuICBjb25zdCBwcm9qZWN0TmFtZXNUZW1wID0gW107XG4gIHJldHVybiBbZGFzaGJvYXJkVGVtcCwgcHJvamVjdE5hbWVzVGVtcF07XG59O1xuXG5jb25zdCBkYXNoYm9hcmQgPSBkYXRhQ3JlYXRpb24oKVswXTtcbmNvbnN0IHByb2plY3ROYW1lcyA9IGRhdGFDcmVhdGlvbigpWzFdO1xuXG5jb25zdCBleGlzdGluZ1Byb2plY3RzQ2hlY2sgPSAoKSA9PiB7XG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRhc2hib2FyZFwiKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IG5ld1Byb2plY3QgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgZGFzaGJvYXJkLnB1c2goW10pO1xuICBwcm9qZWN0TmFtZXMucHVzaChwcm9qZWN0TmFtZSk7XG59O1xuXG5jb25zdCBuZXdUYXNrID0gKFxuICBwcm9qZWN0LFxuICB0aXRsZSxcbiAgZHVlRGF0ZSxcbiAgcHJpb3JpdHksXG4gIGRlc2NyaXB0aW9uLFxuICBjaGVja2VkLFxuICBleGlzdHNcbikgPT4ge1xuICBpZiAoZXhpc3RzKSB7XG4gICAgcHJvamVjdC5zcGxpY2UocHJpb3JpdHkgLSAxLCAwLCB7XG4gICAgICB0aXRsZSxcbiAgICAgIGR1ZURhdGUsXG4gICAgICBwcmlvcml0eSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY2hlY2tlZCxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBwcm9qZWN0LnB1c2goe1xuICAgICAgdGl0bGUsXG4gICAgICBkdWVEYXRlLFxuICAgICAgcHJpb3JpdHksXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGNoZWNrZWQsXG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGV4aXN0aW5nUHJvamVjdHNDaGVjaywgZGFzaGJvYXJkLCBwcm9qZWN0TmFtZXMsIG5ld1Byb2plY3QsIG5ld1Rhc2sgfTtcbiIsImNvbnN0IGNyZWF0ZURlc2NyaXB0aW9uID0gKHRhc2ssIHRhc2tUaXRsZSwgZGVzY3JpcHRpb24pID0+IHtcbiAgaWYgKHRhc2submV4dFNpYmxpbmcpIHtcbiAgICBpZiAodGFzay5uZXh0U2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tZGVzY3JpcHRpb25cIikpXG4gICAgICB0YXNrLm5leHRTaWJsaW5nLnJlbW92ZSgpO1xuICB9XG4gIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICBjb25zdCB0YXNrVGl0bGVDbG9uZSA9IHRhc2tUaXRsZS5jbG9uZU5vZGUodHJ1ZSk7XG4gIHRhc2tUaXRsZS5yZXBsYWNlV2l0aCh0YXNrVGl0bGVDbG9uZSk7XG4gIGNvbnN0IG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tZGVzY3JpcHRpb25cIik7XG4gIG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbjtcbiAgbGV0IG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb25TaG93biA9IGZhbHNlO1xuXG4gIHRhc2tUaXRsZUNsb25lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb25TaG93bikge1xuICAgICAgdGFza3MucmVtb3ZlQ2hpbGQobmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbik7XG4gICAgICBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uU2hvd24gPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFzay5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uKTtcbiAgICAgIG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb25TaG93biA9IHRydWU7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURlc2NyaXB0aW9uO1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCB7XG4gIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uLFxuICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCxcbn0gZnJvbSBcIi4vcHJvamVjdC1jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBkYXNoYm9hcmQsIG5ld1Rhc2sgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcbmltcG9ydCB7IGlzVG9kYXksIGlzT3ZlcmR1ZSB9IGZyb20gXCIuL3RpbWVcIjtcbmltcG9ydCBjcmVhdGVEZXNjcmlwdGlvbiBmcm9tIFwiLi90YXNrLWNvbXBvbmVudHNcIjtcbmltcG9ydCB7XG4gIGFkZEVkaXRCdXR0b25zLFxuICBjaGVja2JveEZ1bmN0aW9uYWxpdHksXG59IGZyb20gXCIuL3Byb2plY3QtdGFzay1jb21wb25lbnRzXCI7XG5cbmNvbnN0IGNyZWF0ZUFkZE5ld1Rhc2tFbGVtZW50ID0gKCkgPT4ge1xuICBjb25zdCB0b2RvSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gIGNvbnN0IG9sZEFkZE5ld1Rhc2tFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctdGFza1wiKTtcbiAgaWYgKG9sZEFkZE5ld1Rhc2tFbGVtZW50ICE9PSBudWxsKSBvbGRBZGROZXdUYXNrRWxlbWVudC5yZW1vdmUoKTtcbiAgY29uc3QgbmV3QWRkTmV3VGFza0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWFkZFwiKTtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJuZXctdGFza1wiKTtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnQuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgY29uc3QgbmV3QWRkTmV3VGFza0VsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSBcIisgQWRkIE5ldyBUYXNrXCI7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld0FkZE5ld1Rhc2tFbGVtZW50VGl0bGUpO1xuICB0b2RvSXRlbXMuYXBwZW5kQ2hpbGQobmV3QWRkTmV3VGFza0VsZW1lbnQpO1xuXG4gIGNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1tb2RhbFwiKTtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybVwiKS5yZXNldCgpO1xuICAgIHRhc2tNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlTmV3VGFza0VsZW1lbnQgPSAoXG4gIHByaW9yaXR5LFxuICB0aXRsZSxcbiAgZHVlRGF0ZSxcbiAgZGVzY3JpcHRpb24sXG4gIGNoZWNrZWRcbikgPT4ge1xuICBjb25zdCB0b2RvSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGBbZGF0YS1wcm9qZWN0PScke3RvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIil9J11gXG4gICk7XG4gIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW1cIik7XG4gIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudFByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudCA9IGAke3ByaW9yaXR5fS5gO1xuICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudFByaW9yaXR5KTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnRDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3guY2xhc3NMaXN0LmFkZChcImNoZWNrYm94XCIpO1xuICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudENoZWNrYm94KTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Rhc2tFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS10aXRsZVwiKTtcbiAgbmV3VGFza0VsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudFRpdGxlKTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnREdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnREdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tZHVlLWRhdGVcIik7XG4gIG5ld1Rhc2tFbGVtZW50RHVlRGF0ZS50ZXh0Q29udGVudCA9IGR1ZURhdGU7XG4gIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50RHVlRGF0ZSk7XG4gIHRvZG9JdGVtcy5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudCk7XG5cbiAgaWYgKGNoZWNrZWQpIHtcbiAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LnRleHRDb250ZW50ID0gXCLinJNcIjtcbiAgICBuZXdUYXNrRWxlbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgfVxuXG4gIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjaGVja2JveEZ1bmN0aW9uYWxpdHkoXG4gICAgICBuZXdUYXNrRWxlbWVudCxcbiAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gsXG4gICAgICB0b2RvSXRlbXMsXG4gICAgICBwcmlvcml0eSxcbiAgICAgIHByb2plY3QsXG4gICAgICBkdWVEYXRlXG4gICAgKTtcbiAgfSk7XG5cbiAgY3JlYXRlRGVzY3JpcHRpb24obmV3VGFza0VsZW1lbnQsIG5ld1Rhc2tFbGVtZW50VGl0bGUsIGRlc2NyaXB0aW9uKTtcbiAgYWRkRWRpdEJ1dHRvbnMoKTtcbn07XG5cbmNvbnN0IHJlc2V0VG9kb0xpc3QgPSAocHJvamVjdE51bWJlcikgPT4ge1xuICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgdGFza3MucmVwbGFjZUNoaWxkcmVuKCk7XG4gIGRhc2hib2FyZFtwcm9qZWN0TnVtYmVyXS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5ID0gdGFzay5wcmlvcml0eTtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSB0YXNrLnRpdGxlO1xuICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gdGFzay5kdWVEYXRlO1xuICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgY29uc3QgdGFza0NoZWNrZWQgPSB0YXNrLmNoZWNrZWQ7XG5cbiAgICBjcmVhdGVOZXdUYXNrRWxlbWVudChcbiAgICAgIHRhc2tQcmlvcml0eSxcbiAgICAgIHRhc2tUaXRsZSxcbiAgICAgIHRhc2tEdWVEYXRlLFxuICAgICAgdGFza0Rlc2NyaXB0aW9uLFxuICAgICAgdGFza0NoZWNrZWRcbiAgICApO1xuICB9KTtcbiAgY3JlYXRlQWRkTmV3VGFza0VsZW1lbnQoKTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5ld1Rhc2sgPSAocHJvamVjdCkgPT4ge1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza1wiKS52YWx1ZTtcbiAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpLnZhbHVlO1xuICBkdWVEYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShkdWVEYXRlKSk7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgd2Vla2RheTogXCJzaG9ydFwiLFxuICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICBob3VyOiBcIm51bWVyaWNcIixcbiAgICBtaW51dGU6IFwibnVtZXJpY1wiLFxuICB9O1xuICBkdWVEYXRlID0gZHVlRGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoXCJlbi1VU1wiLCBvcHRpb25zKTtcbiAgaWYgKGlzVG9kYXkoZHVlRGF0ZSkpIHtcbiAgICBjb25zdCBkdWVUb2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgKyAxXG4gICAgKTtcbiAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihmYWxzZSwgdHJ1ZSk7XG4gIH1cbiAgaWYgKGlzT3ZlcmR1ZShkdWVEYXRlKSkge1xuICAgIGNvbnN0IG92ZXJkdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICAgIG92ZXJkdWUuc2V0QXR0cmlidXRlKFxuICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICk7XG4gICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgfVxuICBsZXQgcHJpb3JpdHkgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlKTtcbiAgaWYgKHByaW9yaXR5ID09PSAwKSBwcmlvcml0eSA9IDE7XG4gIGlmIChOdW1iZXIuaXNOYU4ocHJpb3JpdHkpKSBwcmlvcml0eSA9IEluZmluaXR5O1xuICBpZiAocHJpb3JpdHkgPiBwcm9qZWN0Lmxlbmd0aCArIDEpIHByaW9yaXR5ID0gcHJvamVjdC5sZW5ndGggKyAxO1xuICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICBpZiAoZGVzY3JpcHRpb24gPT09IFwiXCIpIGRlc2NyaXB0aW9uID0gXCJObyBkZXNjcmlwdGlvbiBhdmFpbGFibGUuXCI7XG4gIGNvbnN0IGNoZWNrZWQgPSBmYWxzZTtcbiAgbGV0IGV4aXN0cyA9IGZhbHNlO1xuICBpZiAocHJvamVjdFtwcmlvcml0eSAtIDFdKSB7XG4gICAgZXhpc3RzID0gdHJ1ZTtcbiAgICBuZXdUYXNrKHByb2plY3QsIHRpdGxlLCBkdWVEYXRlLCBwcmlvcml0eSwgZGVzY3JpcHRpb24sIGNoZWNrZWQsIGV4aXN0cyk7XG4gICAgcHJvamVjdC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIHRhc2sucHJpb3JpdHkgPSBwcm9qZWN0LmluZGV4T2YodGFzaykgKyAxO1xuICAgIH0pO1xuICAgIHJlc2V0VG9kb0xpc3QoZGFzaGJvYXJkLmluZGV4T2YocHJvamVjdCkpO1xuICB9IGVsc2Uge1xuICAgIG5ld1Rhc2socHJvamVjdCwgdGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBkZXNjcmlwdGlvbiwgY2hlY2tlZCwgZXhpc3RzKTtcbiAgICBjcmVhdGVOZXdUYXNrRWxlbWVudChwcmlvcml0eSwgdGl0bGUsIGR1ZURhdGUsIGRlc2NyaXB0aW9uLCBjaGVja2VkKTtcbiAgICBjcmVhdGVBZGROZXdUYXNrRWxlbWVudCgpO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBjcmVhdGVBZGROZXdUYXNrRWxlbWVudCxcbiAgY3JlYXRlTmV3VGFza0VsZW1lbnQsXG4gIHJlc2V0VG9kb0xpc3QsXG4gIGNyZWF0ZU5ld1Rhc2ssXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCB7IGRhc2hib2FyZCB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1sb2dpY1wiO1xuaW1wb3J0IHtcbiAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24sXG4gIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50LFxufSBmcm9tIFwiLi9wcm9qZWN0LWNvbXBvbmVudHNcIjtcbmltcG9ydCBjcmVhdGVEZXNjcmlwdGlvbiBmcm9tIFwiLi90YXNrLWNvbXBvbmVudHNcIjtcblxuY29uc3QgaXNUb2RheSA9IChkYXRlKSA9PiB7XG4gIGxldCB0b2RheXNEYXRlID0gbmV3IERhdGUoKTtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB3ZWVrZGF5OiBcInNob3J0XCIsXG4gICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgbW9udGg6IFwic2hvcnRcIixcbiAgICBkYXk6IFwibnVtZXJpY1wiLFxuICB9O1xuICB0b2RheXNEYXRlID0gdG9kYXlzRGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoXCJlbi1VU1wiLCBvcHRpb25zKTtcbiAgY29uc3QgbGFzdENvbW1hID0gdG9kYXlzRGF0ZS5sYXN0SW5kZXhPZihcIixcIik7XG4gIHRvZGF5c0RhdGUgPSB0b2RheXNEYXRlLnN1YnN0cmluZygwLCBsYXN0Q29tbWEpO1xuICBpZiAoZGF0ZS5pbmNsdWRlcyh0b2RheXNEYXRlKSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGlzT3ZlcmR1ZSA9IChkYXRlKSA9PiB7XG4gIGNvbnN0IHRpbWUgPSBEYXRlLnBhcnNlKG5ldyBEYXRlKCkpO1xuICBjb25zdCBwYXJzZWREYXRlID0gRGF0ZS5wYXJzZShkYXRlKTtcbiAgaWYgKHBhcnNlZERhdGUgPCB0aW1lKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgZHVlVG9kYXkgPSAoKSA9PiB7XG4gIGNvbnN0IGR1ZVRvZGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICBjb25zdCBvdmVyZHVlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gIGxldCBudW1iZXJPZlRhc2tzID0gMDtcbiAgbGV0IG51bWJlck9mQ29tcGxldGVkVGFza3MgPSAwO1xuICBjb25zdCBkdWVUb2RheUZ1bmN0aW9uYWxpdHkgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gICAgdGFza3MucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgZGFzaGJvYXJkLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIHByb2plY3QuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICBpZiAoaXNUb2RheSh0YXNrLmR1ZURhdGUpKSB7XG4gICAgICAgICAgbnVtYmVyT2ZUYXNrcyArPSAxO1xuICAgICAgICAgIGNvbnN0IHByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1wcm9qZWN0PScke2Rhc2hib2FyZC5pbmRleE9mKHByb2plY3QpfSddYFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgbmV3VGFza0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW1cIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcIml0ZW1cIik7XG4gICAgICAgICAgY29uc3QgbmV3VGFza0VsZW1lbnRDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5jbGFzc0xpc3QuYWRkKFwiY2hlY2tib3hcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnRDaGVja2JveCk7XG4gICAgICAgICAgY29uc3QgbmV3VGFza0VsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLXRpdGxlXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50VGl0bGUpO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnREdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tZHVlLWRhdGVcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnREdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kdWVEYXRlO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50RHVlRGF0ZSk7XG4gICAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnQpO1xuXG4gICAgICAgICAgaWYgKHRhc2suY2hlY2tlZCkge1xuICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwi4pyTXCI7XG4gICAgICAgICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgICAgICAgICAgIG51bWJlck9mQ29tcGxldGVkVGFza3MgKz0gMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLXRpdGxlXCIpXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1jaGVja2VkXCIpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIilcbiAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgICAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgICAgIHRhc2suY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KHByb2plY3RFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKGlzT3ZlcmR1ZSh0YXNrLmR1ZURhdGUpKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmR1ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChvdmVyZHVlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSArIDFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdEVsZW1lbnQsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIilcbiAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgICAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LnRleHRDb250ZW50ID0gXCLinJNcIjtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgICAgIHRhc2suY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHByb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQocHJvamVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgICBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpZiAoaXNPdmVyZHVlKHRhc2suZHVlRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBvdmVyZHVlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWVFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0RWxlbWVudCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjcmVhdGVEZXNjcmlwdGlvbihcbiAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LFxuICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRUaXRsZSxcbiAgICAgICAgICAgIHRhc2suZGVzY3JpcHRpb25cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgZHVlVG9kYXlFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkdWVUb2RheUZ1bmN0aW9uYWxpdHkpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZHVlVG9kYXlGdW5jdGlvbmFsaXR5KTtcbiAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIiwgbnVtYmVyT2ZUYXNrcyk7XG4gIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiLCBudW1iZXJPZkNvbXBsZXRlZFRhc2tzKTtcbiAgbGV0IGR1ZVRvZGF5RWxlbWVudFRpdGxlID0gZHVlVG9kYXlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIuc2lkZWJhci1pdGVtLXRpdGxlXCJcbiAgKS50ZXh0Q29udGVudDtcbiAgZHVlVG9kYXlFbGVtZW50VGl0bGUgPSBgJHtkdWVUb2RheUVsZW1lbnRUaXRsZX0gKCR7bnVtYmVyT2ZDb21wbGV0ZWRUYXNrc30vJHtudW1iZXJPZlRhc2tzfSlgO1xuICBkdWVUb2RheUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIikudGV4dENvbnRlbnQgPVxuICAgIGR1ZVRvZGF5RWxlbWVudFRpdGxlO1xuICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihmYWxzZSwgdHJ1ZSk7XG59O1xuXG5jb25zdCBvdmVyZHVlID0gKCkgPT4ge1xuICBjb25zdCBvdmVyZHVlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gIGNvbnN0IGR1ZVRvZGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICBsZXQgbnVtYmVyT2ZUYXNrcyA9IDA7XG4gIGNvbnN0IG92ZXJkdWVGdW5jdGlvbmFsaXR5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICAgIHRhc2tzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIGRhc2hib2FyZC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBwcm9qZWN0LmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgaWYgKGlzT3ZlcmR1ZSh0YXNrLmR1ZURhdGUpICYmICF0YXNrLmNoZWNrZWQpIHtcbiAgICAgICAgICBudW1iZXJPZlRhc2tzICs9IDE7XG4gICAgICAgICAgY29uc3QgcHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYFtkYXRhLXByb2plY3Q9JyR7ZGFzaGJvYXJkLmluZGV4T2YocHJvamVjdCl9J11gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaXRlbVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwib3ZlcmR1ZVwiKTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudENoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveFwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudENoZWNrYm94KTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tdGl0bGVcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnRUaXRsZSk7XG4gICAgICAgICAgY29uc3QgbmV3VGFza0VsZW1lbnREdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudER1ZURhdGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1kdWUtZGF0ZVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudER1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnREdWVEYXRlKTtcbiAgICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudCk7XG5cbiAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgIHRhc2suY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICBvdmVyZHVlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgICBwYXJzZUludChvdmVyZHVlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgcGFyc2VJbnQocHJvamVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChpc1RvZGF5KHRhc2suZHVlRGF0ZSkpIHtcbiAgICAgICAgICAgICAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSArIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdEVsZW1lbnQsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3RFbGVtZW50LCBmYWxzZSk7XG4gICAgICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICAgICAgdGFza3MucmVtb3ZlQ2hpbGQobmV3VGFza0VsZW1lbnQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY3JlYXRlRGVzY3JpcHRpb24oXG4gICAgICAgICAgICBuZXdUYXNrRWxlbWVudCxcbiAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUsXG4gICAgICAgICAgICB0YXNrLmRlc2NyaXB0aW9uXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG4gIG92ZXJkdWVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvdmVyZHVlRnVuY3Rpb25hbGl0eSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBvdmVyZHVlRnVuY3Rpb25hbGl0eSk7XG4gIG92ZXJkdWVFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIiwgbnVtYmVyT2ZUYXNrcyk7XG4gIGxldCBvdmVyZHVlRWxlbWVudFRpdGxlID0gb3ZlcmR1ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIlxuICApLnRleHRDb250ZW50O1xuICBvdmVyZHVlRWxlbWVudFRpdGxlID0gYCR7b3ZlcmR1ZUVsZW1lbnRUaXRsZX0gKCR7bnVtYmVyT2ZUYXNrc30pYDtcbiAgb3ZlcmR1ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIikudGV4dENvbnRlbnQgPVxuICAgIG92ZXJkdWVFbGVtZW50VGl0bGU7XG4gIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG59O1xuXG5leHBvcnQgeyBpc1RvZGF5LCBkdWVUb2RheSwgaXNPdmVyZHVlLCBvdmVyZHVlIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgeyBjcmVhdGVEcm9wZG93bkhpZGVyLCBhZGRFZGl0QnV0dG9ucyB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1jb21wb25lbnRzXCI7XG5pbXBvcnQgbW9kYWxDb250cm9scyBmcm9tIFwiLi9tb2RhbC1jb250cm9sc1wiO1xuaW1wb3J0IHsgc3RvcmFnZUlzQXZhaWxhYmxlLCBwb3B1bGF0ZVBhZ2UgfSBmcm9tIFwiLi9sb2NhbC1zdG9yYWdlXCI7XG5pbXBvcnQgeyBkdWVUb2RheSwgb3ZlcmR1ZSB9IGZyb20gXCIuL3RpbWVcIjtcbmltcG9ydCB7IGV4aXN0aW5nUHJvamVjdHNDaGVjayB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1sb2dpY1wiO1xuXG5jcmVhdGVEcm9wZG93bkhpZGVyKCk7XG5hZGRFZGl0QnV0dG9ucygpO1xubW9kYWxDb250cm9scygpO1xuZHVlVG9kYXkoKTtcbm92ZXJkdWUoKTtcbmlmIChzdG9yYWdlSXNBdmFpbGFibGUoXCJsb2NhbFN0b3JhZ2VcIikgJiYgZXhpc3RpbmdQcm9qZWN0c0NoZWNrKCkpIHtcbiAgcG9wdWxhdGVQYWdlKCk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=