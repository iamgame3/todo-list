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
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time */ "./src/time.js");




(0,_project_task_components__WEBPACK_IMPORTED_MODULE_0__.createDropdownHider)();
(0,_project_task_components__WEBPACK_IMPORTED_MODULE_0__.addEditButtons)();
(0,_modal_controls__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_time__WEBPACK_IMPORTED_MODULE_2__.dueToday)();
(0,_time__WEBPACK_IMPORTED_MODULE_2__.overdue)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7OztBQ2ZnRjtBQUNuQztBQUNGOztBQUUzQyw2RUFBbUI7QUFDbkIsd0VBQWM7QUFDZCwyREFBYTtBQUNiLCtDQUFRO0FBQ1IsOENBQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kYWwtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QtY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC1jcmVhdGlvbi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC10YXNrLWNvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QtdGFzay1sb2dpYy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay1jb21wb25lbnRzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLWNyZWF0aW9uLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90aW1lLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCBjcmVhdGVOZXdQcm9qZWN0IGZyb20gXCIuL3Byb2plY3QtY3JlYXRpb25cIjtcbmltcG9ydCB7IGRhc2hib2FyZCB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1sb2dpY1wiO1xuaW1wb3J0IHsgY3JlYXRlTmV3VGFzayB9IGZyb20gXCIuL3Rhc2stY3JlYXRpb25cIjtcblxuY29uc3QgdmFsaWRpdHlDaGVjayA9IChpbnB1dCkgPT4gaW5wdXQudmFsaWRpdHkudmFsaWQ7XG5cbi8vIENyZWF0ZSBvcGVuL2Nsb3NlIGNvbnRyb2xzIGZvciBhbGwgbW9kYWxzXG5jb25zdCBtb2RhbENvbnRyb2xzID0gKCkgPT4ge1xuICBjb25zdCBhZGROZXdQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdFwiKTtcbiAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW1vZGFsXCIpO1xuICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWVkaXQtbW9kYWxcIik7XG4gIGNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1tb2RhbFwiKTtcbiAgY29uc3QgdGFza0VkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LW1vZGFsXCIpO1xuICBjb25zdCBwcm9qZWN0Q2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtY2xvc2UtYnV0dG9uXCIpO1xuICBjb25zdCBwcm9qZWN0RWRpdENsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi5wcm9qZWN0LWVkaXQtY2xvc2UtYnV0dG9uXCJcbiAgKTtcbiAgY29uc3QgdGFza0Nsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNsb3NlLWJ1dHRvblwiKTtcbiAgY29uc3QgdGFza0VkaXRDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LWNsb3NlLWJ1dHRvblwiKTtcbiAgY29uc3QgcHJvamVjdFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zdWJtaXQtYnV0dG9uXCIpO1xuICBjb25zdCB0YXNrU3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXN1Ym1pdC1idXR0b25cIik7XG5cbiAgYWRkTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpLnJlc2V0KCk7XG4gICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfSk7XG5cbiAgcHJvamVjdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9KTtcblxuICBwcm9qZWN0RWRpdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcHJvamVjdEVkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgdGFza0Nsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9KTtcblxuICB0YXNrRWRpdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGFza0VkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgcHJvamVjdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBwcm9qZWN0TW9kYWwpIHtcbiAgICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHByb2plY3RFZGl0TW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IHByb2plY3RFZGl0TW9kYWwpIHtcbiAgICAgIHByb2plY3RFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcblxuICB0YXNrTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IHRhc2tNb2RhbCkge1xuICAgICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG5cbiAgdGFza0VkaXRNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGFza0VkaXRNb2RhbCkge1xuICAgICAgdGFza0VkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHByb2plY3RTdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0TW9kYWxJbnB1dHMgPSBBcnJheS5mcm9tKFxuICAgICAgcHJvamVjdE1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKVxuICAgICk7XG4gICAgaWYgKHByb2plY3RNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgY3JlYXRlTmV3UHJvamVjdCgpO1xuICAgICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG5cbiAgdGFza1N1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tNb2RhbElucHV0cyA9IEFycmF5LmZyb20odGFza01vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKSk7XG4gICAgaWYgKHRhc2tNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgY29uc3QgdG9kb0l0ZW1zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICAgICAgY29uc3QgcHJvamVjdCA9XG4gICAgICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXNDb250YWluZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV07XG4gICAgICBjcmVhdGVOZXdUYXNrKHByb2plY3QpO1xuICAgICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtb2RhbENvbnRyb2xzO1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCB7IGRhc2hib2FyZCB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1sb2dpY1wiO1xuXG4vLyBBZGQgcHJvamVjdCBjb21wbGV0aW9uIHN0YXR1c1xuY29uc3QgY3JlYXRlUHJvamVjdENvbXBsZXRpb24gPSAocHJvamVjdCwgZHVlVG9kYXkpID0+IHtcbiAgY29uc3Qgb2xkQ29tcGxldGlvbiA9IC9cXChcXGQqXFwvXFxkKlxcKS87XG4gIGlmIChwcm9qZWN0KSB7XG4gICAgY29uc3QgdGFza3MgPVxuICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV0ubGVuZ3RoO1xuICAgIGNvbnN0IGNvbXBsZXRlZFRhc2tzID0gcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSk7XG4gICAgbGV0IHRpdGxlID0gcHJvamVjdC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBjb21wbGV0aW9uSW5kZXggPSB0aXRsZS5zZWFyY2gob2xkQ29tcGxldGlvbikgLSAxO1xuICAgIHRpdGxlID0gdGl0bGUuc3Vic3RyaW5nKDAsIGNvbXBsZXRpb25JbmRleCk7XG4gICAgdGl0bGUgPSBgJHt0aXRsZX0gKCR7Y29tcGxldGVkVGFza3N9LyR7dGFza3N9KWA7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgcHJvamVjdC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICB9XG4gIGlmIChkdWVUb2RheSkge1xuICAgIGNvbnN0IGR1ZVRvZGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICAgIGxldCBkdWVUb2RheVRpdGxlID0gZHVlVG9kYXlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIlxuICAgICkudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgZHVlVG9kYXlUYXNrcyA9IHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKTtcbiAgICBjb25zdCBkdWVUb2RheUNvbXBsZXRlZFRhc2tzID0gcGFyc2VJbnQoXG4gICAgICBkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIilcbiAgICApO1xuICAgIGNvbnN0IGR1ZVRvZGF5Q29tcGxldGlvbkluZGV4ID0gZHVlVG9kYXlUaXRsZS5zZWFyY2gob2xkQ29tcGxldGlvbikgLSAxO1xuICAgIGR1ZVRvZGF5VGl0bGUgPSBkdWVUb2RheVRpdGxlLnN1YnN0cmluZygwLCBkdWVUb2RheUNvbXBsZXRpb25JbmRleCk7XG4gICAgZHVlVG9kYXlUaXRsZSA9IGAke2R1ZVRvZGF5VGl0bGV9ICgke2R1ZVRvZGF5Q29tcGxldGVkVGFza3N9LyR7ZHVlVG9kYXlUYXNrc30pYDtcbiAgICBkdWVUb2RheUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIikudGV4dENvbnRlbnQgPVxuICAgICAgZHVlVG9kYXlUaXRsZTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQgPSAoKSA9PiB7XG4gIGNvbnN0IG9sZENvdW50ID0gL1xcKFxcZCpcXCkvO1xuICBjb25zdCBvdmVyZHVlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gIGxldCBvdmVyZHVlVGl0bGUgPSBvdmVyZHVlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLnNpZGViYXItaXRlbS10aXRsZVwiXG4gICkudGV4dENvbnRlbnQ7XG4gIGNvbnN0IG92ZXJkdWVUYXNrcyA9IHBhcnNlSW50KG92ZXJkdWVFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpO1xuICBjb25zdCBvdmVyZHVlVGFza0NvdW50SW5kZXggPSBvdmVyZHVlVGl0bGUuc2VhcmNoKG9sZENvdW50KSAtIDE7XG4gIG92ZXJkdWVUaXRsZSA9IG92ZXJkdWVUaXRsZS5zdWJzdHJpbmcoMCwgb3ZlcmR1ZVRhc2tDb3VudEluZGV4KTtcbiAgb3ZlcmR1ZVRpdGxlID0gYCR7b3ZlcmR1ZVRpdGxlfSAoJHtvdmVyZHVlVGFza3N9KWA7XG4gIG92ZXJkdWVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRpdGxlXCIpLnRleHRDb250ZW50ID1cbiAgICBvdmVyZHVlVGl0bGU7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbiwgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQgfTtcbiIsImltcG9ydCB7IGRhc2hib2FyZCwgbmV3UHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1sb2dpY1wiO1xuaW1wb3J0IHsgYWRkRWRpdEJ1dHRvbnMgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgcmVzZXRUb2RvTGlzdCB9IGZyb20gXCIuL3Rhc2stY3JlYXRpb25cIjtcblxuY29uc3QgY3JlYXRlQWRkTmV3UHJvamVjdEVsZW1lbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHNpZGViYXJJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtc1wiKTtcbiAgY29uc3Qgb2xkQWRkTmV3UHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0XCIpO1xuICBvbGRBZGROZXdQcm9qZWN0RWxlbWVudC5yZW1vdmUoKTtcbiAgY29uc3QgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2lkZWJhci1pdGVtLWFkZFwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJuZXctcHJvamVjdFwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgY29uc3QgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSBcIisgQWRkIE5ldyBQcm9qZWN0XCI7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKG5ld0FkZE5ld1Byb2plY3RFbGVtZW50VGl0bGUpO1xuICBzaWRlYmFySXRlbXMuYXBwZW5kQ2hpbGQobmV3QWRkTmV3UHJvamVjdEVsZW1lbnQpO1xuXG4gIGNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1tb2RhbFwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybVwiKS5yZXNldCgpO1xuICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlTmV3UHJvamVjdEVsZW1lbnQgPSAodGl0bGUpID0+IHtcbiAgY29uc3Qgc2lkZWJhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW1zXCIpO1xuICBjb25zdCBuZXdQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Byb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyLWl0ZW1cIik7XG4gIG5ld1Byb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgZGFzaGJvYXJkLmxlbmd0aCAtIDEpO1xuICBuZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiLCAwKTtcbiAgY29uc3QgbmV3UHJvamVjdEVsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Byb2plY3RFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInNpZGViYXItaXRlbS10aXRsZVwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IGAke3RpdGxlfSAoMC8wKWA7XG4gIG5ld1Byb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Byb2plY3RFbGVtZW50VGl0bGUpO1xuICBzaWRlYmFySXRlbXMuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEVsZW1lbnQpO1xuXG4gIGFkZEVkaXRCdXR0b25zKCk7XG5cbiAgbmV3UHJvamVjdEVsZW1lbnRUaXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICAgIGNvbnN0IHByb2plY3ROdW1iZXIgPSBuZXdQcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIik7XG4gICAgdGFza3Muc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIsIHByb2plY3ROdW1iZXIpO1xuICAgIHRhc2tzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIHJlc2V0VG9kb0xpc3QocHJvamVjdE51bWJlcik7XG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlTmV3UHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbmFtZVwiKS52YWx1ZTtcbiAgbmV3UHJvamVjdCgpO1xuICBjcmVhdGVOZXdQcm9qZWN0RWxlbWVudCh0aXRsZSk7XG4gIGNyZWF0ZUFkZE5ld1Byb2plY3RFbGVtZW50KCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVOZXdQcm9qZWN0O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCBlZGl0SWNvblNyYyBmcm9tIFwiLi9pY29ucy9kb3RzLXZlcnRpY2FsLnN2Z1wiO1xuaW1wb3J0IHsgZGFzaGJvYXJkIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWxvZ2ljXCI7XG5pbXBvcnQgeyBpc1RvZGF5LCBpc092ZXJkdWUgfSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQge1xuICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCxcbiAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24sXG59IGZyb20gXCIuL3Byb2plY3QtY29tcG9uZW50c1wiO1xuXG5jb25zdCB2YWxpZGl0eUNoZWNrID0gKGlucHV0KSA9PiBpbnB1dC52YWxpZGl0eS52YWxpZDtcblxuLy8gQ3JlYXRlIGV2ZW50IGxpc3RlbmVycyB0byBoaWRlIHRoZSBkcm9wZG93biBtZW51cyB3aGVuIG90aGVyIHN0dWZmIGlzIGNsaWNrZWQgb25cbmNvbnN0IGNyZWF0ZURyb3Bkb3duSGlkZXIgPSAoKSA9PiB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKFxuICAgICAgIWV2ZW50LnRhcmdldC5tYXRjaGVzKFwiLmRyb3Bkb3duLWNvbnRlbnRcIikgJiZcbiAgICAgICFldmVudC50YXJnZXQubWF0Y2hlcyhcIi5lZGl0LWJ1dHRvblwiKVxuICAgICkge1xuICAgICAgY29uc3QgZHJvcGRvd25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kcm9wZG93bi1jb250ZW50XCIpO1xuICAgICAgZHJvcGRvd25zLmZvckVhY2goKGRyb3Bkb3duKSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBkcm9wZG93bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCBjaGVja2JveEZ1bmN0aW9uYWxpdHkgPSAoXG4gIHRhc2tFbGVtZW50LFxuICB0YXNrRWxlbWVudENoZWNrYm94LFxuICB0b2RvSXRlbXMsXG4gIHByaW9yaXR5LFxuICBwcm9qZWN0LFxuICBkdWVEYXRlXG4pID0+IHtcbiAgaWYgKFxuICAgIHRhc2tFbGVtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIilcbiAgICAgIC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKVxuICApIHtcbiAgICB0YXNrRWxlbWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLXRpdGxlXCIpXG4gICAgICAuY2xhc3NMaXN0LnJlbW92ZShcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV1bXG4gICAgICBwcmlvcml0eSAtIDFcbiAgICBdLmNoZWNrZWQgPSBmYWxzZTtcbiAgICBwcm9qZWN0LnNldEF0dHJpYnV0ZShcbiAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgIHBhcnNlSW50KHByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICk7XG4gICAgaWYgKGlzVG9kYXkoZHVlRGF0ZSkgJiYgaXNPdmVyZHVlKGR1ZURhdGUpKSB7XG4gICAgICBjb25zdCBkdWVUb2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICAgICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICk7XG4gICAgICBjb25zdCBvdmVyZHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgICAgIG92ZXJkdWUuc2V0QXR0cmlidXRlKFxuICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSArIDFcbiAgICAgICk7XG4gICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCB0cnVlKTtcbiAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgfVxuICAgIGlmIChpc1RvZGF5KGR1ZURhdGUpICYmICFpc092ZXJkdWUoZHVlRGF0ZSkpIHtcbiAgICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgKTtcbiAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIHRydWUpO1xuICAgIH1cbiAgICBpZiAoaXNPdmVyZHVlKGR1ZURhdGUpICYmICFpc1RvZGF5KGR1ZURhdGUpKSB7XG4gICAgICBjb25zdCBvdmVyZHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgICAgIG92ZXJkdWUuc2V0QXR0cmlidXRlKFxuICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSArIDFcbiAgICAgICk7XG4gICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgZmFsc2UpO1xuICAgIH0gZWxzZSBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCBmYWxzZSk7XG4gIH0gZWxzZSB7XG4gICAgdGFza0VsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB0YXNrRWxlbWVudENoZWNrYm94LnRleHRDb250ZW50ID0gXCLinJNcIjtcbiAgICBkYXNoYm9hcmRbcGFyc2VJbnQodG9kb0l0ZW1zLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldW1xuICAgICAgcHJpb3JpdHkgLSAxXG4gICAgXS5jaGVja2VkID0gdHJ1ZTtcbiAgICBwcm9qZWN0LnNldEF0dHJpYnV0ZShcbiAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgIHBhcnNlSW50KHByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICk7XG4gICAgaWYgKGlzVG9kYXkoZHVlRGF0ZSkgJiYgaXNPdmVyZHVlKGR1ZURhdGUpKSB7XG4gICAgICBjb25zdCBkdWVUb2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICAgICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSArIDFcbiAgICAgICk7XG4gICAgICBjb25zdCBvdmVyZHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgICAgIG92ZXJkdWUuc2V0QXR0cmlidXRlKFxuICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICk7XG4gICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCB0cnVlKTtcbiAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgfVxuICAgIGlmIChpc1RvZGF5KGR1ZURhdGUpICYmICFpc092ZXJkdWUoZHVlRGF0ZSkpIHtcbiAgICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgKTtcbiAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIHRydWUpO1xuICAgIH1cbiAgICBpZiAoaXNPdmVyZHVlKGR1ZURhdGUpICYmICFpc1RvZGF5KGR1ZURhdGUpKSB7XG4gICAgICBjb25zdCBvdmVyZHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgICAgIG92ZXJkdWUuc2V0QXR0cmlidXRlKFxuICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICk7XG4gICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgZmFsc2UpO1xuICAgIH0gZWxzZSBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCBmYWxzZSk7XG4gIH1cbn07XG5cbi8vIENyZWF0ZSBlZGl0IG9wdGlvbiBmdW5jdGlvbmFsaXR5XG5jb25zdCBlZGl0RnVuY3Rpb25hbGl0eSA9IChpdGVtKSA9PiB7XG4gIGNvbnN0IHByb2plY3ROdW1iZXIgPSBwYXJzZUludChcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpXG4gICk7XG4gIGlmIChpdGVtLmNsYXNzTGlzdC5jb250YWlucyhcInNpZGViYXItaXRlbVwiKSkge1xuICAgIGNvbnN0IGl0ZW1UaXRsZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIik7XG4gICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1lZGl0LW1vZGFsXCIpO1xuICAgIGNvbnN0IHByb2plY3RFZGl0TW9kYWxUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1uYW1lLWVkaXRcIik7XG4gICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgXCJwcm9qZWN0LWVkaXQtc3VibWl0LWJ1dHRvblwiXG4gICAgKTtcbiAgICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsU3VibWl0QnV0dG9uQ2xvbmUgPVxuICAgICAgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgY29uc3QgcHJvamVjdENvbXBsZXRpb25SZWdleCA9IC9cXChcXGQqXFwvXFxkKlxcKS87XG4gICAgY29uc3QgcHJvamVjdENvbXBsZXRpb25JbmRleCA9IGl0ZW1UaXRsZS50ZXh0Q29udGVudC5zZWFyY2goXG4gICAgICBwcm9qZWN0Q29tcGxldGlvblJlZ2V4XG4gICAgKTtcbiAgICBjb25zdCBwcm9qZWN0Q29tcGxldGlvbiA9IGl0ZW1UaXRsZS50ZXh0Q29udGVudC5zdWJzdHJpbmcoXG4gICAgICBwcm9qZWN0Q29tcGxldGlvbkluZGV4XG4gICAgKTtcbiAgICBwcm9qZWN0RWRpdE1vZGFsVGl0bGUudmFsdWUgPSBpdGVtVGl0bGUudGV4dENvbnRlbnQuc3Vic3RyaW5nKFxuICAgICAgMCxcbiAgICAgIHByb2plY3RDb21wbGV0aW9uSW5kZXggLSAxXG4gICAgKTtcblxuICAgIHByb2plY3RFZGl0TW9kYWxTdWJtaXRCdXR0b24ucmVwbGFjZVdpdGgocHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lKTtcblxuICAgIHByb2plY3RFZGl0TW9kYWxTdWJtaXRCdXR0b25DbG9uZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbElucHV0cyA9IEFycmF5LmZyb20oXG4gICAgICAgIHByb2plY3RFZGl0TW9kYWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpXG4gICAgICApO1xuICAgICAgaWYgKHByb2plY3RFZGl0TW9kYWxJbnB1dHMuZXZlcnkodmFsaWRpdHlDaGVjaykpIHtcbiAgICAgICAgaXRlbVRpdGxlLnRleHRDb250ZW50ID0gYCR7cHJvamVjdEVkaXRNb2RhbFRpdGxlLnZhbHVlfSAke3Byb2plY3RDb21wbGV0aW9ufWA7XG4gICAgICAgIHByb2plY3RFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaXRlbVByaW9yaXR5ID0gaXRlbS5maXJzdENoaWxkO1xuICAgIGNvbnN0IGl0ZW1UaXRsZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIik7XG4gICAgY29uc3QgaXRlbUR1ZURhdGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLWR1ZS1kYXRlXCIpO1xuICAgIGNvbnN0IHRhc2tUb0VkaXQgPVxuICAgICAgZGFzaGJvYXJkW3Byb2plY3ROdW1iZXJdW3BhcnNlSW50KGl0ZW0uZmlyc3RDaGlsZC50ZXh0Q29udGVudCkgLSAxXTtcbiAgICBjb25zdCBwcmV2aW91c2x5T3ZlcmR1ZSA9IGlzT3ZlcmR1ZShpdGVtRHVlRGF0ZS50ZXh0Q29udGVudCk7XG4gICAgY29uc3QgcHJldmlvdXNseUR1ZVRvZGF5ID0gaXNUb2RheShpdGVtRHVlRGF0ZS50ZXh0Q29udGVudCk7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LW1vZGFsXCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1lZGl0XCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZS1lZGl0XCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHktZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsRGVzY3JpcHRpb24gPVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvbi1lZGl0XCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIFwidGFzay1lZGl0LXN1Ym1pdC1idXR0b25cIlxuICAgICk7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lID1cbiAgICAgIHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b24uY2xvbmVOb2RlKHRydWUpO1xuICAgIHRhc2tFZGl0TW9kYWxUaXRsZS52YWx1ZSA9IHRhc2tUb0VkaXQudGl0bGU7XG4gICAgY29uc3QgdGltZVpvbmVPZmZzZXQgPSBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMDsgLy8gb2Zmc2V0IGluIG1pbGxpc2Vjb25kc1xuICAgIHRhc2tFZGl0TW9kYWxEYXRlLnZhbHVlID0gbmV3IERhdGUoXG4gICAgICBuZXcgRGF0ZSh0YXNrVG9FZGl0LmR1ZURhdGUpLmdldFRpbWUoKSAtIHRpbWVab25lT2Zmc2V0XG4gICAgKVxuICAgICAgLnRvSVNPU3RyaW5nKClcbiAgICAgIC5zbGljZSgwLCAtOCk7XG4gICAgdGFza0VkaXRNb2RhbFByaW9yaXR5LnZhbHVlID0gdGFza1RvRWRpdC5wcmlvcml0eTtcbiAgICB0YXNrRWRpdE1vZGFsRGVzY3JpcHRpb24udmFsdWUgPSB0YXNrVG9FZGl0LmRlc2NyaXB0aW9uO1xuXG4gICAgdGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbi5yZXBsYWNlV2l0aCh0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uQ2xvbmUpO1xuXG4gICAgdGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCB0YXNrRWRpdE1vZGFsSW5wdXRzID0gQXJyYXkuZnJvbShcbiAgICAgICAgdGFza0VkaXRNb2RhbC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIilcbiAgICAgICk7XG4gICAgICBpZiAodGFza0VkaXRNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgICBjb25zdCBvdmVyZHVlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gICAgICAgIGNvbnN0IGR1ZVRvZGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICAgICAgICBjb25zdCB0b2RvSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKHRhc2tFZGl0TW9kYWxEYXRlLnZhbHVlKSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgd2Vla2RheTogXCJzaG9ydFwiLFxuICAgICAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgICAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICAgICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICAgICAgICBob3VyOiBcIm51bWVyaWNcIixcbiAgICAgICAgICBtaW51dGU6IFwibnVtZXJpY1wiLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWREdWVEYXRlID0gZHVlRGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoXCJlbi1VU1wiLCBvcHRpb25zKTtcbiAgICAgICAgY29uc3Qgb2xkRHVlRGF0ZSA9IHRhc2tUb0VkaXQuZHVlRGF0ZTtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCIuY2hlY2tib3hcIik7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94Q2xvbmUgPSBjaGVja2JveC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIGNvbnN0IG9sZFRhc2tQcmlvcml0eSA9IHRhc2tUb0VkaXQucHJpb3JpdHk7XG4gICAgICAgIGxldCB0YXNrUHJpb3JpdHkgPSBwYXJzZUludCh0YXNrRWRpdE1vZGFsUHJpb3JpdHkudmFsdWUpO1xuICAgICAgICBpZiAodGFza1ByaW9yaXR5ID09PSAwKSB0YXNrUHJpb3JpdHkgPSAxO1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHRhc2tQcmlvcml0eSkpIHRhc2tQcmlvcml0eSA9IEluZmluaXR5O1xuICAgICAgICBpZiAodGFza1ByaW9yaXR5ID4gZGFzaGJvYXJkW3Byb2plY3ROdW1iZXJdLmxlbmd0aCkge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9IGRhc2hib2FyZFtwcm9qZWN0TnVtYmVyXS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhc2tQcmlvcml0eSAhPT0gb2xkVGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgaWYgKHRhc2tQcmlvcml0eSA+IG9sZFRhc2tQcmlvcml0eSkge1xuICAgICAgICAgICAgbGV0IG5leHRUYXNrID0gaXRlbS5uZXh0U2libGluZztcbiAgICAgICAgICAgIGxldCBleGlzdGluZ1Rhc2sgPSBudWxsO1xuICAgICAgICAgICAgdG9kb0l0ZW1zLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1pdGVtXCIpLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRhc2suZmlyc3RDaGlsZC50ZXh0Q29udGVudCA9PT0gYCR7dGFza1ByaW9yaXR5fS5gKVxuICAgICAgICAgICAgICAgIGV4aXN0aW5nVGFzayA9IHRhc2s7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgZXhpc3RpbmdUYXNrLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucyhcbiAgICAgICAgICAgICAgICBcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBleGlzdGluZ1Rhc2tEZXNjcmlwdGlvbiA9IGV4aXN0aW5nVGFzay5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgZXhpc3RpbmdUYXNrRGVzY3JpcHRpb24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2UgZXhpc3RpbmdUYXNrLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGl0ZW0pO1xuICAgICAgICAgICAgaWYgKG5leHRUYXNrLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKSkge1xuICAgICAgICAgICAgICBjb25zdCB0ZW1wVGFza1ZhciA9IG5leHRUYXNrLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICBpdGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIG5leHRUYXNrKTtcbiAgICAgICAgICAgICAgbmV4dFRhc2sgPSB0ZW1wVGFza1ZhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBvbGRUYXNrUHJpb3JpdHk7IGkgPCB0YXNrUHJpb3JpdHk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50UHJpb3JpdHkgPSBuZXh0VGFzay5maXJzdENoaWxkO1xuICAgICAgICAgICAgICBjb25zdCBwZXJpb2RJbmRleCA9IGVsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudC5pbmRleE9mKFwiLlwiKTtcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudFByaW9yaXR5Tm9QZXJpb2QgPVxuICAgICAgICAgICAgICAgIGVsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudC5zdWJzdHJpbmcoMCwgcGVyaW9kSW5kZXgpO1xuICAgICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50UHJpb3JpdHkgPSBgJHtcbiAgICAgICAgICAgICAgICBwYXJzZUludChlbGVtZW50UHJpb3JpdHlOb1BlcmlvZCkgLSAxXG4gICAgICAgICAgICAgIH0uYDtcbiAgICAgICAgICAgICAgZWxlbWVudFByaW9yaXR5LnRleHRDb250ZW50ID0gbmV3RWxlbWVudFByaW9yaXR5O1xuICAgICAgICAgICAgICBkYXNoYm9hcmRbcGFyc2VJbnQodG9kb0l0ZW1zLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldW1xuICAgICAgICAgICAgICAgIHBhcnNlSW50KGVsZW1lbnRQcmlvcml0eU5vUGVyaW9kKSAtIDFcbiAgICAgICAgICAgICAgXS5wcmlvcml0eSAtPSAxO1xuICAgICAgICAgICAgICBuZXh0VGFzayA9IG5leHRUYXNrLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICBpZiAobmV4dFRhc2suY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCIpKSB7XG4gICAgICAgICAgICAgICAgbmV4dFRhc2sgPSBuZXh0VGFzay5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXS5zcGxpY2UoXG4gICAgICAgICAgICAgIHRhc2tQcmlvcml0eSxcbiAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgdGFza1RvRWRpdFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV0uc3BsaWNlKFxuICAgICAgICAgICAgICBvbGRUYXNrUHJpb3JpdHkgLSAxLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGFza1ByaW9yaXR5IDwgb2xkVGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdUYXNrID0gbnVsbDtcbiAgICAgICAgICAgIHRvZG9JdGVtcy5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvZG8taXRlbVwiKS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0YXNrLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgPT09IGAke3Rhc2tQcmlvcml0eX0uYClcbiAgICAgICAgICAgICAgICBleGlzdGluZ1Rhc2sgPSB0YXNrO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBwb3NzaWJsZVRhc2tEZXNjcmlwdGlvbiA9IGl0ZW0ubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICBleGlzdGluZ1Rhc2suaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlYmVnaW5cIiwgaXRlbSk7XG4gICAgICAgICAgICBsZXQgbmV4dFRhc2sgPSBpdGVtLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBwb3NzaWJsZVRhc2tEZXNjcmlwdGlvbi5jbGFzc0xpc3QuY29udGFpbnMoXG4gICAgICAgICAgICAgICAgXCJ0b2RvLWl0ZW0tZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgaXRlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBwb3NzaWJsZVRhc2tEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGFza1ByaW9yaXR5OyBpIDwgb2xkVGFza1ByaW9yaXR5OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudFByaW9yaXR5ID0gbmV4dFRhc2suZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgY29uc3QgcGVyaW9kSW5kZXggPSBlbGVtZW50UHJpb3JpdHkudGV4dENvbnRlbnQuaW5kZXhPZihcIi5cIik7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRQcmlvcml0eU5vUGVyaW9kID1cbiAgICAgICAgICAgICAgICBlbGVtZW50UHJpb3JpdHkudGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIHBlcmlvZEluZGV4KTtcbiAgICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudFByaW9yaXR5ID0gYCR7XG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZWxlbWVudFByaW9yaXR5Tm9QZXJpb2QpICsgMVxuICAgICAgICAgICAgICB9LmA7XG4gICAgICAgICAgICAgIGVsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudCA9IG5ld0VsZW1lbnRQcmlvcml0eTtcbiAgICAgICAgICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXVtcbiAgICAgICAgICAgICAgICBwYXJzZUludChlbGVtZW50UHJpb3JpdHlOb1BlcmlvZCkgLSAxXG4gICAgICAgICAgICAgIF0ucHJpb3JpdHkgKz0gMTtcbiAgICAgICAgICAgICAgbmV4dFRhc2sgPSBuZXh0VGFzay5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgaWYgKG5leHRUYXNrLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKSkge1xuICAgICAgICAgICAgICAgIG5leHRUYXNrID0gbmV4dFRhc2submV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV0uc3BsaWNlKFxuICAgICAgICAgICAgICB0YXNrUHJpb3JpdHkgLSAxLFxuICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICB0YXNrVG9FZGl0XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXS5zcGxpY2UoXG4gICAgICAgICAgICAgIG9sZFRhc2tQcmlvcml0eSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGFza1RvRWRpdC50aXRsZSA9IHRhc2tFZGl0TW9kYWxUaXRsZS52YWx1ZTtcbiAgICAgICAgdGFza1RvRWRpdC5kdWVEYXRlID0gZm9ybWF0dGVkRHVlRGF0ZTtcbiAgICAgICAgdGFza1RvRWRpdC5wcmlvcml0eSA9IHRhc2tQcmlvcml0eTtcbiAgICAgICAgdGFza1RvRWRpdC5kZXNjcmlwdGlvbiA9IHRhc2tFZGl0TW9kYWxEZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgICAgY29uc3QgbmV4dEl0ZW0gPSBpdGVtLm5leHRTaWJsaW5nO1xuICAgICAgICBpZiAobmV4dEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCIpKVxuICAgICAgICAgIG5leHRJdGVtLnRleHRDb250ZW50ID0gdGFza1RvRWRpdC5kZXNjcmlwdGlvbjtcbiAgICAgICAgaXRlbVByaW9yaXR5LnRleHRDb250ZW50ID0gYCR7dGFza1ByaW9yaXR5fS5gO1xuICAgICAgICBpdGVtVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrVG9FZGl0LnRpdGxlO1xuICAgICAgICBpdGVtRHVlRGF0ZS50ZXh0Q29udGVudCA9IGZvcm1hdHRlZER1ZURhdGU7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpc092ZXJkdWUoZm9ybWF0dGVkRHVlRGF0ZSkgJiZcbiAgICAgICAgICAhcHJldmlvdXNseU92ZXJkdWUgJiZcbiAgICAgICAgICAhdGFza1RvRWRpdC5jaGVja2VkXG4gICAgICAgICkge1xuICAgICAgICAgIG92ZXJkdWVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgKyAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhaXNPdmVyZHVlKGZvcm1hdHRlZER1ZURhdGUpICYmXG4gICAgICAgICAgcHJldmlvdXNseU92ZXJkdWUgJiZcbiAgICAgICAgICAhdGFza1RvRWRpdC5jaGVja2VkXG4gICAgICAgICkge1xuICAgICAgICAgIG92ZXJkdWVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1RvZGF5KGZvcm1hdHRlZER1ZURhdGUpICYmICFwcmV2aW91c2x5RHVlVG9kYXkpIHtcbiAgICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgKyAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAodGFza1RvRWRpdC5jaGVja2VkKSB7XG4gICAgICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1RvZGF5KGZvcm1hdHRlZER1ZURhdGUpICYmIHByZXZpb3VzbHlEdWVUb2RheSkge1xuICAgICAgICAgIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICh0YXNrVG9FZGl0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkRHVlRGF0ZSAhPT0gZm9ybWF0dGVkRHVlRGF0ZSkge1xuICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYFtkYXRhLXByb2plY3Q9JyR7cHJvamVjdE51bWJlcn0nXWBcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gcGFyc2VJbnQodGFza1RvRWRpdC5wcmlvcml0eSk7XG4gICAgICAgICAgY2hlY2tib3gucmVwbGFjZVdpdGgoY2hlY2tib3hDbG9uZSk7XG5cbiAgICAgICAgICBjaGVja2JveENsb25lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBjaGVja2JveEZ1bmN0aW9uYWxpdHkoXG4gICAgICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgICAgIGNoZWNrYm94Q2xvbmUsXG4gICAgICAgICAgICAgIHRvZG9JdGVtcyxcbiAgICAgICAgICAgICAgcHJpb3JpdHksXG4gICAgICAgICAgICAgIHByb2plY3QsXG4gICAgICAgICAgICAgIGZvcm1hdHRlZER1ZURhdGVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXNrRWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG4vLyBBZGQgZWRpdCBidXR0b25zIHRvIHByb2plY3RzIGFuZCB0YXNrc1xuY29uc3QgYWRkRWRpdEJ1dHRvbnMgPSAoKSA9PiB7XG4gIC8vIE1ha2UgYW4gZWRpdCBidXR0b25cbiAgY29uc3QgYWRkRWRpdEJ1dHRvbiA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZWRpdEljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICBjb25zdCBlZGl0RHJvcGRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVkaXRPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHJlbW92ZU9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZWRpdEljb24uc3JjID0gZWRpdEljb25TcmM7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwiYWx0XCIsIFwiVmVydGljYWwgZG90dGVkIGxpbmUgaWNvbiBmb3IgZWRpdCBvcHRpb25zLlwiKTtcbiAgICBlZGl0SWNvbi5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ1dHRvblwiKTtcbiAgICBlZGl0RHJvcGRvd24uY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWNvbnRlbnRcIik7XG4gICAgZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGVkaXRPcHRpb24udGV4dENvbnRlbnQgPSBcIkVkaXRcIjtcbiAgICBlZGl0T3B0aW9uLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1pdGVtXCIpO1xuICAgIGVkaXRPcHRpb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJlZGl0LWJ1dHRvblwiKTtcbiAgICBlZGl0T3B0aW9uLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG4gICAgcmVtb3ZlT3B0aW9uLnRleHRDb250ZW50ID0gXCJSZW1vdmVcIjtcbiAgICByZW1vdmVPcHRpb24uY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWl0ZW1cIik7XG4gICAgcmVtb3ZlT3B0aW9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicmVtb3ZlLWJ1dHRvblwiKTtcbiAgICByZW1vdmVPcHRpb24uc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICBlZGl0RHJvcGRvd24uYXBwZW5kQ2hpbGQoZWRpdE9wdGlvbik7XG4gICAgZWRpdERyb3Bkb3duLmFwcGVuZENoaWxkKHJlbW92ZU9wdGlvbik7XG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idXR0b25cIik7XG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd25cIik7XG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0RHJvcGRvd24pO1xuICAgIGl0ZW0uYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG5cbiAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPT09IFwiaGlkZGVuXCIpIHtcbiAgICAgICAgZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH0gZWxzZSBlZGl0RHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWVkaXQtbW9kYWxcIik7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LW1vZGFsXCIpO1xuXG4gICAgZWRpdE9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50SXRlbSA9IGVkaXRPcHRpb24uY2xvc2VzdChcIi5pdGVtXCIpO1xuICAgICAgaWYgKHBhcmVudEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2lkZWJhci1pdGVtXCIpKSB7XG4gICAgICAgIGVkaXRGdW5jdGlvbmFsaXR5KHBhcmVudEl0ZW0pO1xuICAgICAgICBwcm9qZWN0RWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVkaXRGdW5jdGlvbmFsaXR5KHBhcmVudEl0ZW0pO1xuICAgICAgICB0YXNrRWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlbW92ZU9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3Qgb3ZlcmR1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gICAgICBjb25zdCBkdWVUb2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICAgICAgY29uc3QgcGFyZW50SXRlbSA9IHJlbW92ZU9wdGlvbi5jbG9zZXN0KFwiLml0ZW1cIik7XG4gICAgICBpZiAocGFyZW50SXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaWRlYmFyLWl0ZW1cIikpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQocGFyZW50SXRlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpO1xuICAgICAgICBjb25zdCBsYXN0UHJvamVjdEluZGV4ID0gZGFzaGJvYXJkLmxlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUb2RvTGlzdFByb2plY3QgPSBwYXJzZUludChcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUb2RvTGlzdFByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgW2RhdGEtcHJvamVjdD0nJHtjdXJyZW50VG9kb0xpc3RQcm9qZWN0fSddYFxuICAgICAgICApO1xuICAgICAgICBwYXJlbnRJdGVtLnJlbW92ZSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gcHJvamVjdEluZGV4ICsgMTsgaSA8IGxhc3RQcm9qZWN0SW5kZXggKyAxOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYFtkYXRhLXByb2plY3Q9JyR7aX0nXWBcbiAgICAgICAgICApO1xuICAgICAgICAgIHNlbGVjdGVkUHJvamVjdC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBcImRhdGEtcHJvamVjdFwiLFxuICAgICAgICAgICAgcGFyc2VJbnQoc2VsZWN0ZWRQcm9qZWN0LmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSkgLSAxXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBkYXNoYm9hcmRbcHJvamVjdEluZGV4XS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgaWYgKGlzT3ZlcmR1ZSh0YXNrLmR1ZURhdGUpICYmICF0YXNrLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIG92ZXJkdWUuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNUb2RheSh0YXNrLmR1ZURhdGUpKSB7XG4gICAgICAgICAgICBpZiAodGFzay5jaGVja2VkKVxuICAgICAgICAgICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkYXNoYm9hcmQuc3BsaWNlKHByb2plY3RJbmRleCwgMSk7XG4gICAgICAgIGlmIChwcm9qZWN0SW5kZXggPT09IGN1cnJlbnRUb2RvTGlzdFByb2plY3QpIHtcbiAgICAgICAgICBjb25zdCBjbGlja0V2ZW50ID0gbmV3IEV2ZW50KFwiY2xpY2tcIik7XG4gICAgICAgICAgb3ZlcmR1ZS5kaXNwYXRjaEV2ZW50KGNsaWNrRXZlbnQpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKVxuICAgICAgICAgICAgLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgXCJkYXRhLXByb2plY3RcIixcbiAgICAgICAgICAgICAgcGFyc2VJbnQoXG4gICAgICAgICAgICAgICAgY3VycmVudFRvZG9MaXN0UHJvamVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBwYXJzZUludChcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbZGF0YS1wcm9qZWN0PScke3Byb2plY3RJbmRleH0nXWBcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IGluZGV4ID0gcGFyZW50SXRlbS5maXJzdENoaWxkLnRleHRDb250ZW50LmluZGV4T2YoXCIuXCIpO1xuICAgICAgICBpbmRleCA9XG4gICAgICAgICAgcGFyc2VJbnQocGFyZW50SXRlbS5maXJzdENoaWxkLnRleHRDb250ZW50LnN1YnN0cmluZygwLCBpbmRleCkpIC0gMTtcbiAgICAgICAgY29uc3QgbGFzdFRhc2tJbmRleCA9IGRhc2hib2FyZFtwcm9qZWN0SW5kZXhdLmxlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBkYXNoYm9hcmRbcHJvamVjdEluZGV4XVtpbmRleF07XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwYXJlbnRJdGVtLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKVxuICAgICAgICApIHtcbiAgICAgICAgICBwYXJlbnRJdGVtLm5leHRTaWJsaW5nLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZXh0VGFzayA9IHBhcmVudEl0ZW0ubmV4dFNpYmxpbmc7XG4gICAgICAgIGlmIChuZXh0VGFzay5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tYWRkXCIpKSB7XG4gICAgICAgICAgbmV4dFRhc2sgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnRJdGVtLnJlbW92ZSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gaW5kZXggKyAxOyBpIDwgbGFzdFRhc2tJbmRleCArIDE7IGkgKz0gMSkge1xuICAgICAgICAgIGRhc2hib2FyZFtwcm9qZWN0SW5kZXhdW2ldLnByaW9yaXR5IC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhc2suY2hlY2tlZClcbiAgICAgICAgICBwcm9qZWN0LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgIHBhcnNlSW50KHByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgICAgICk7XG4gICAgICAgIGlmIChpc092ZXJkdWUodGFzay5kdWVEYXRlKSAmJiAhdGFzay5jaGVja2VkKSB7XG4gICAgICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWUuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1RvZGF5KHRhc2suZHVlRGF0ZSkpIHtcbiAgICAgICAgICBpZiAodGFzay5jaGVja2VkKVxuICAgICAgICAgICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICAgICApO1xuICAgICAgICAgIGRhc2hib2FyZFtwcm9qZWN0SW5kZXhdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgZmFsc2UpO1xuICAgICAgICAgIGRhc2hib2FyZFtwcm9qZWN0SW5kZXhdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKG5leHRUYXNrKSB7XG4gICAgICAgICAgY29uc3QgZWxlbWVudFByaW9yaXR5ID0gbmV4dFRhc2suZmlyc3RDaGlsZDtcbiAgICAgICAgICBjb25zdCBwZXJpb2RJbmRleCA9IGVsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudC5pbmRleE9mKFwiLlwiKTtcbiAgICAgICAgICBjb25zdCBlbGVtZW50UHJpb3JpdHlOb1BlcmlvZCA9IGVsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudC5zdWJzdHJpbmcoXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgcGVyaW9kSW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IG5ld0VsZW1lbnRQcmlvcml0eSA9IGAke1xuICAgICAgICAgICAgcGFyc2VJbnQoZWxlbWVudFByaW9yaXR5Tm9QZXJpb2QpIC0gMVxuICAgICAgICAgIH0uYDtcbiAgICAgICAgICBlbGVtZW50UHJpb3JpdHkudGV4dENvbnRlbnQgPSBuZXdFbGVtZW50UHJpb3JpdHk7XG4gICAgICAgICAgbmV4dFRhc2sgPSBuZXh0VGFzay5uZXh0U2libGluZztcbiAgICAgICAgICBpZiAobmV4dFRhc2spIHtcbiAgICAgICAgICAgIGlmIChuZXh0VGFzay5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tZGVzY3JpcHRpb25cIikpIHtcbiAgICAgICAgICAgICAgbmV4dFRhc2sgPSBuZXh0VGFzay5uZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0VGFzayAmJiBuZXh0VGFzay5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tYWRkXCIpKSB7XG4gICAgICAgICAgICAgIG5leHRUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gUmVtb3ZlIGFsbCBlZGl0IGJ1dHRvbnMgYW5kIHRoZW4gbWFrZSBhbiBlZGl0IGJ1dHRvbiBmb3IgZXZlcnkgcHJvamVjdCBhbmQgdGFza1xuICBjb25zdCBlZGl0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWRpdC1idXR0b25cIik7XG4gIGVkaXRCdXR0b25zLmZvckVhY2goKGVkaXRCdXR0b24pID0+IGVkaXRCdXR0b24ucmVtb3ZlKCkpO1xuICBjb25zdCB0ZXN0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNpZGViYXItaXRlbVwiKTtcbiAgY29uc3QgdGVzdEl0ZW1zMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1pdGVtXCIpO1xuICB0ZXN0SXRlbXMuZm9yRWFjaCgodGVzdEl0ZW0pID0+IGFkZEVkaXRCdXR0b24odGVzdEl0ZW0pKTtcbiAgdGVzdEl0ZW1zMi5mb3JFYWNoKCh0ZXN0SXRlbSkgPT4gYWRkRWRpdEJ1dHRvbih0ZXN0SXRlbSkpO1xufTtcblxuZXhwb3J0IHtcbiAgY3JlYXRlRHJvcGRvd25IaWRlcixcbiAgZWRpdEZ1bmN0aW9uYWxpdHksXG4gIGFkZEVkaXRCdXR0b25zLFxuICBjaGVja2JveEZ1bmN0aW9uYWxpdHksXG59O1xuIiwiY29uc3QgZGFzaGJvYXJkID0gW107XG5cbmNvbnN0IG5ld1Byb2plY3QgPSAoKSA9PiB7XG4gIGRhc2hib2FyZC5wdXNoKFtdKTtcbn07XG5cbmNvbnN0IG5ld1Rhc2sgPSAoXG4gIHByb2plY3QsXG4gIHRpdGxlLFxuICBkdWVEYXRlLFxuICBwcmlvcml0eSxcbiAgZGVzY3JpcHRpb24sXG4gIGNoZWNrZWQsXG4gIGV4aXN0c1xuKSA9PiB7XG4gIGlmIChleGlzdHMpIHtcbiAgICBwcm9qZWN0LnNwbGljZShwcmlvcml0eSAtIDEsIDAsIHtcbiAgICAgIHRpdGxlLFxuICAgICAgZHVlRGF0ZSxcbiAgICAgIHByaW9yaXR5LFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBjaGVja2VkLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHByb2plY3QucHVzaCh7XG4gICAgICB0aXRsZSxcbiAgICAgIGR1ZURhdGUsXG4gICAgICBwcmlvcml0eSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY2hlY2tlZCxcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHsgZGFzaGJvYXJkLCBuZXdQcm9qZWN0LCBuZXdUYXNrIH07XG4iLCIvLyBDcmVhdGUgdGFzayBkZXNjcmlwdGlvbiBtYWtlclxuY29uc3QgY3JlYXRlRGVzY3JpcHRpb24gPSAodGFzaywgdGFza1RpdGxlLCBkZXNjcmlwdGlvbikgPT4ge1xuICBpZiAodGFzay5uZXh0U2libGluZykge1xuICAgIGlmICh0YXNrLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKSlcbiAgICAgIHRhc2submV4dFNpYmxpbmcucmVtb3ZlKCk7XG4gIH1cbiAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gIGNvbnN0IHRhc2tUaXRsZUNsb25lID0gdGFza1RpdGxlLmNsb25lTm9kZSh0cnVlKTtcbiAgdGFza1RpdGxlLnJlcGxhY2VXaXRoKHRhc2tUaXRsZUNsb25lKTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKTtcbiAgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xuICBsZXQgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvblNob3duID0gZmFsc2U7XG5cbiAgdGFza1RpdGxlQ2xvbmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAobmV3VGFza0VsZW1lbnREZXNjcmlwdGlvblNob3duKSB7XG4gICAgICB0YXNrcy5yZW1vdmVDaGlsZChuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uKTtcbiAgICAgIG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb25TaG93biA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXNrLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb24pO1xuICAgICAgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvblNob3duID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRGVzY3JpcHRpb247XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByYWRpeCAqL1xuaW1wb3J0IHtcbiAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24sXG4gIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50LFxufSBmcm9tIFwiLi9wcm9qZWN0LWNvbXBvbmVudHNcIjtcbmltcG9ydCB7IGRhc2hib2FyZCwgbmV3VGFzayB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1sb2dpY1wiO1xuaW1wb3J0IHsgaXNUb2RheSwgaXNPdmVyZHVlIH0gZnJvbSBcIi4vdGltZVwiO1xuaW1wb3J0IGNyZWF0ZURlc2NyaXB0aW9uIGZyb20gXCIuL3Rhc2stY29tcG9uZW50c1wiO1xuaW1wb3J0IHtcbiAgYWRkRWRpdEJ1dHRvbnMsXG4gIGNoZWNrYm94RnVuY3Rpb25hbGl0eSxcbn0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWNvbXBvbmVudHNcIjtcblxuY29uc3QgY3JlYXRlQWRkTmV3VGFza0VsZW1lbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHRvZG9JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgY29uc3Qgb2xkQWRkTmV3VGFza0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy10YXNrXCIpO1xuICBpZiAob2xkQWRkTmV3VGFza0VsZW1lbnQgIT09IG51bGwpIG9sZEFkZE5ld1Rhc2tFbGVtZW50LnJlbW92ZSgpO1xuICBjb25zdCBuZXdBZGROZXdUYXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tYWRkXCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm5ldy10YXNrXCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICBjb25zdCBuZXdBZGROZXdUYXNrRWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IFwiKyBBZGQgTmV3IFRhc2tcIjtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3QWRkTmV3VGFza0VsZW1lbnRUaXRsZSk7XG4gIHRvZG9JdGVtcy5hcHBlbmRDaGlsZChuZXdBZGROZXdUYXNrRWxlbWVudCk7XG5cbiAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLW1vZGFsXCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtXCIpLnJlc2V0KCk7XG4gICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdUYXNrRWxlbWVudCA9IChcbiAgcHJpb3JpdHksXG4gIHRpdGxlLFxuICBkdWVEYXRlLFxuICBkZXNjcmlwdGlvbixcbiAgY2hlY2tlZFxuKSA9PiB7XG4gIGNvbnN0IHRvZG9JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYFtkYXRhLXByb2plY3Q9JyR7dG9kb0l0ZW1zLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKX0nXWBcbiAgKTtcbiAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCk7XG4gIGNvbnN0IG5ld1Rhc2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbVwiKTtcbiAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcIml0ZW1cIik7XG4gIGNvbnN0IG5ld1Rhc2tFbGVtZW50UHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdUYXNrRWxlbWVudFByaW9yaXR5LnRleHRDb250ZW50ID0gYCR7cHJpb3JpdHl9LmA7XG4gIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50UHJpb3JpdHkpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudENoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5jbGFzc0xpc3QuYWRkKFwiY2hlY2tib3hcIik7XG4gIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLXRpdGxlXCIpO1xuICBuZXdUYXNrRWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG4gIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50VGl0bGUpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdUYXNrRWxlbWVudER1ZURhdGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1kdWUtZGF0ZVwiKTtcbiAgbmV3VGFza0VsZW1lbnREdWVEYXRlLnRleHRDb250ZW50ID0gZHVlRGF0ZTtcbiAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnREdWVEYXRlKTtcbiAgdG9kb0l0ZW1zLmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50KTtcblxuICBpZiAoY2hlY2tlZCkge1xuICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIuKck1wiO1xuICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICB9XG5cbiAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNoZWNrYm94RnVuY3Rpb25hbGl0eShcbiAgICAgIG5ld1Rhc2tFbGVtZW50LFxuICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveCxcbiAgICAgIHRvZG9JdGVtcyxcbiAgICAgIHByaW9yaXR5LFxuICAgICAgcHJvamVjdCxcbiAgICAgIGR1ZURhdGVcbiAgICApO1xuICB9KTtcblxuICBjcmVhdGVEZXNjcmlwdGlvbihuZXdUYXNrRWxlbWVudCwgbmV3VGFza0VsZW1lbnRUaXRsZSwgZGVzY3JpcHRpb24pO1xuICBhZGRFZGl0QnV0dG9ucygpO1xufTtcblxuY29uc3QgcmVzZXRUb2RvTGlzdCA9IChwcm9qZWN0TnVtYmVyKSA9PiB7XG4gIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICB0YXNrcy5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgZGFzaGJvYXJkW3Byb2plY3ROdW1iZXJdLmZvckVhY2goKHRhc2spID0+IHtcbiAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSB0YXNrLnByaW9yaXR5O1xuICAgIGNvbnN0IHRhc2tUaXRsZSA9IHRhc2sudGl0bGU7XG4gICAgY29uc3QgdGFza0R1ZURhdGUgPSB0YXNrLmR1ZURhdGU7XG4gICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gdGFzay5kZXNjcmlwdGlvbjtcbiAgICBjb25zdCB0YXNrQ2hlY2tlZCA9IHRhc2suY2hlY2tlZDtcblxuICAgIGNyZWF0ZU5ld1Rhc2tFbGVtZW50KFxuICAgICAgdGFza1ByaW9yaXR5LFxuICAgICAgdGFza1RpdGxlLFxuICAgICAgdGFza0R1ZURhdGUsXG4gICAgICB0YXNrRGVzY3JpcHRpb24sXG4gICAgICB0YXNrQ2hlY2tlZFxuICAgICk7XG4gIH0pO1xuICBjcmVhdGVBZGROZXdUYXNrRWxlbWVudCgpO1xufTtcblxuY29uc3QgY3JlYXRlTmV3VGFzayA9IChwcm9qZWN0KSA9PiB7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrXCIpLnZhbHVlO1xuICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGVcIikudmFsdWU7XG4gIGR1ZURhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKGR1ZURhdGUpKTtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB3ZWVrZGF5OiBcInNob3J0XCIsXG4gICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgbW9udGg6IFwic2hvcnRcIixcbiAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgIGhvdXI6IFwibnVtZXJpY1wiLFxuICAgIG1pbnV0ZTogXCJudW1lcmljXCIsXG4gIH07XG4gIGR1ZURhdGUgPSBkdWVEYXRlLnRvTG9jYWxlVGltZVN0cmluZyhcImVuLVVTXCIsIG9wdGlvbnMpO1xuICBpZiAoaXNUb2RheShkdWVEYXRlKSkge1xuICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSArIDFcbiAgICApO1xuICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKGZhbHNlLCB0cnVlKTtcbiAgfVxuICBpZiAoaXNPdmVyZHVlKGR1ZURhdGUpKSB7XG4gICAgY29uc3Qgb3ZlcmR1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgIHBhcnNlSW50KG92ZXJkdWUuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgKyAxXG4gICAgKTtcbiAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICB9XG4gIGxldCBwcmlvcml0eSA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWUpO1xuICBpZiAocHJpb3JpdHkgPT09IDApIHByaW9yaXR5ID0gMTtcbiAgaWYgKE51bWJlci5pc05hTihwcmlvcml0eSkpIHByaW9yaXR5ID0gSW5maW5pdHk7XG4gIGlmIChwcmlvcml0eSA+IHByb2plY3QubGVuZ3RoICsgMSkgcHJpb3JpdHkgPSBwcm9qZWN0Lmxlbmd0aCArIDE7XG4gIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb25cIikudmFsdWU7XG4gIGlmIChkZXNjcmlwdGlvbiA9PT0gXCJcIikgZGVzY3JpcHRpb24gPSBcIk5vIGRlc2NyaXB0aW9uIGF2YWlsYWJsZS5cIjtcbiAgY29uc3QgY2hlY2tlZCA9IGZhbHNlO1xuICBsZXQgZXhpc3RzID0gZmFsc2U7XG4gIGlmIChwcm9qZWN0W3ByaW9yaXR5IC0gMV0pIHtcbiAgICBleGlzdHMgPSB0cnVlO1xuICAgIG5ld1Rhc2socHJvamVjdCwgdGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBkZXNjcmlwdGlvbiwgY2hlY2tlZCwgZXhpc3RzKTtcbiAgICBwcm9qZWN0LmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgdGFzay5wcmlvcml0eSA9IHByb2plY3QuaW5kZXhPZih0YXNrKSArIDE7XG4gICAgfSk7XG4gICAgcmVzZXRUb2RvTGlzdChkYXNoYm9hcmQuaW5kZXhPZihwcm9qZWN0KSk7XG4gIH0gZWxzZSB7XG4gICAgbmV3VGFzayhwcm9qZWN0LCB0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIGRlc2NyaXB0aW9uLCBjaGVja2VkLCBleGlzdHMpO1xuICAgIGNyZWF0ZU5ld1Rhc2tFbGVtZW50KHByaW9yaXR5LCB0aXRsZSwgZHVlRGF0ZSwgZGVzY3JpcHRpb24sIGNoZWNrZWQpO1xuICAgIGNyZWF0ZUFkZE5ld1Rhc2tFbGVtZW50KCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7XG4gIGNyZWF0ZUFkZE5ld1Rhc2tFbGVtZW50LFxuICBjcmVhdGVOZXdUYXNrRWxlbWVudCxcbiAgcmVzZXRUb2RvTGlzdCxcbiAgY3JlYXRlTmV3VGFzayxcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByYWRpeCAqL1xuaW1wb3J0IHsgZGFzaGJvYXJkIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWxvZ2ljXCI7XG5pbXBvcnQge1xuICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbixcbiAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQsXG59IGZyb20gXCIuL3Byb2plY3QtY29tcG9uZW50c1wiO1xuaW1wb3J0IGNyZWF0ZURlc2NyaXB0aW9uIGZyb20gXCIuL3Rhc2stY29tcG9uZW50c1wiO1xuXG5jb25zdCBpc1RvZGF5ID0gKGRhdGUpID0+IHtcbiAgbGV0IHRvZGF5c0RhdGUgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHdlZWtkYXk6IFwic2hvcnRcIixcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICBtb250aDogXCJzaG9ydFwiLFxuICAgIGRheTogXCJudW1lcmljXCIsXG4gIH07XG4gIHRvZGF5c0RhdGUgPSB0b2RheXNEYXRlLnRvTG9jYWxlVGltZVN0cmluZyhcImVuLVVTXCIsIG9wdGlvbnMpO1xuICBjb25zdCBsYXN0Q29tbWEgPSB0b2RheXNEYXRlLmxhc3RJbmRleE9mKFwiLFwiKTtcbiAgdG9kYXlzRGF0ZSA9IHRvZGF5c0RhdGUuc3Vic3RyaW5nKDAsIGxhc3RDb21tYSk7XG4gIGlmIChkYXRlLmluY2x1ZGVzKHRvZGF5c0RhdGUpKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgaXNPdmVyZHVlID0gKGRhdGUpID0+IHtcbiAgY29uc3QgdGltZSA9IERhdGUucGFyc2UobmV3IERhdGUoKSk7XG4gIGNvbnN0IHBhcnNlZERhdGUgPSBEYXRlLnBhcnNlKGRhdGUpO1xuICBpZiAocGFyc2VkRGF0ZSA8IHRpbWUpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBkdWVUb2RheSA9ICgpID0+IHtcbiAgY29uc3QgZHVlVG9kYXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gIGNvbnN0IG92ZXJkdWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgbGV0IG51bWJlck9mVGFza3MgPSAwO1xuICBsZXQgbnVtYmVyT2ZDb21wbGV0ZWRUYXNrcyA9IDA7XG4gIGNvbnN0IGR1ZVRvZGF5RnVuY3Rpb25hbGl0eSA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgICB0YXNrcy5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICBkYXNoYm9hcmQuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgcHJvamVjdC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgIGlmIChpc1RvZGF5KHRhc2suZHVlRGF0ZSkpIHtcbiAgICAgICAgICBudW1iZXJPZlRhc2tzICs9IDE7XG4gICAgICAgICAgY29uc3QgcHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYFtkYXRhLXByb2plY3Q9JyR7ZGFzaGJvYXJkLmluZGV4T2YocHJvamVjdCl9J11gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaXRlbVwiKTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudENoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveFwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudENoZWNrYm94KTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tdGl0bGVcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnRUaXRsZSk7XG4gICAgICAgICAgY29uc3QgbmV3VGFza0VsZW1lbnREdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudER1ZURhdGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1kdWUtZGF0ZVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudER1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnREdWVEYXRlKTtcbiAgICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudCk7XG5cbiAgICAgICAgICBpZiAodGFzay5jaGVja2VkKSB7XG4gICAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LnRleHRDb250ZW50ID0gXCLinJNcIjtcbiAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgICAgICAgICAgbnVtYmVyT2ZDb21wbGV0ZWRUYXNrcyArPSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIilcbiAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWNoZWNrZWRcIilcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBuZXdUYXNrRWxlbWVudFxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwidG9kby1pdGVtLWNoZWNrZWRcIik7XG4gICAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgICAgdGFzay5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHByb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQocHJvamVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgICBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpZiAoaXNPdmVyZHVlKHRhc2suZHVlRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBvdmVyZHVlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWVFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0RWxlbWVudCwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdUYXNrRWxlbWVudFxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWNoZWNrZWRcIik7XG4gICAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIuKck1wiO1xuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgICAgdGFzay5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgICBwYXJzZUludChwcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmIChpc092ZXJkdWUodGFzay5kdWVEYXRlKSkge1xuICAgICAgICAgICAgICAgIG92ZXJkdWVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3RFbGVtZW50LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNyZWF0ZURlc2NyaXB0aW9uKFxuICAgICAgICAgICAgbmV3VGFza0VsZW1lbnQsXG4gICAgICAgICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLFxuICAgICAgICAgICAgdGFzay5kZXNjcmlwdGlvblxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICBkdWVUb2RheUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGR1ZVRvZGF5RnVuY3Rpb25hbGl0eSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBkdWVUb2RheUZ1bmN0aW9uYWxpdHkpO1xuICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiLCBudW1iZXJPZlRhc2tzKTtcbiAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIsIG51bWJlck9mQ29tcGxldGVkVGFza3MpO1xuICBsZXQgZHVlVG9kYXlFbGVtZW50VGl0bGUgPSBkdWVUb2RheUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIlxuICApLnRleHRDb250ZW50O1xuICBkdWVUb2RheUVsZW1lbnRUaXRsZSA9IGAke2R1ZVRvZGF5RWxlbWVudFRpdGxlfSAoJHtudW1iZXJPZkNvbXBsZXRlZFRhc2tzfS8ke251bWJlck9mVGFza3N9KWA7XG4gIGR1ZVRvZGF5RWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKS50ZXh0Q29udGVudCA9XG4gICAgZHVlVG9kYXlFbGVtZW50VGl0bGU7XG4gIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKGZhbHNlLCB0cnVlKTtcbn07XG5cbmNvbnN0IG92ZXJkdWUgPSAoKSA9PiB7XG4gIGNvbnN0IG92ZXJkdWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgY29uc3QgZHVlVG9kYXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gIGxldCBudW1iZXJPZlRhc2tzID0gMDtcbiAgY29uc3Qgb3ZlcmR1ZUZ1bmN0aW9uYWxpdHkgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gICAgdGFza3MucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgZGFzaGJvYXJkLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIHByb2plY3QuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICBpZiAoaXNPdmVyZHVlKHRhc2suZHVlRGF0ZSkgJiYgIXRhc2suY2hlY2tlZCkge1xuICAgICAgICAgIG51bWJlck9mVGFza3MgKz0gMTtcbiAgICAgICAgICBjb25zdCBwcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgW2RhdGEtcHJvamVjdD0nJHtkYXNoYm9hcmQuaW5kZXhPZihwcm9qZWN0KX0nXWBcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJvdmVyZHVlXCIpO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50Q2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3guY2xhc3NMaXN0LmFkZChcImNoZWNrYm94XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gpO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS10aXRsZVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudFRpdGxlKTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50RHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWR1ZS1kYXRlXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50RHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudER1ZURhdGUpO1xuICAgICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50KTtcblxuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgICAgdGFzay5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIG92ZXJkdWVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWVFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHByb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICBwYXJzZUludChwcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKGlzVG9kYXkodGFzay5kdWVEYXRlKSkge1xuICAgICAgICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgICBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0RWxlbWVudCwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdEVsZW1lbnQsIGZhbHNlKTtcbiAgICAgICAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICAgICAgICB0YXNrcy5yZW1vdmVDaGlsZChuZXdUYXNrRWxlbWVudCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjcmVhdGVEZXNjcmlwdGlvbihcbiAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LFxuICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRUaXRsZSxcbiAgICAgICAgICAgIHRhc2suZGVzY3JpcHRpb25cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgb3ZlcmR1ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG92ZXJkdWVGdW5jdGlvbmFsaXR5KTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIG92ZXJkdWVGdW5jdGlvbmFsaXR5KTtcbiAgb3ZlcmR1ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiLCBudW1iZXJPZlRhc2tzKTtcbiAgbGV0IG92ZXJkdWVFbGVtZW50VGl0bGUgPSBvdmVyZHVlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLnNpZGViYXItaXRlbS10aXRsZVwiXG4gICkudGV4dENvbnRlbnQ7XG4gIG92ZXJkdWVFbGVtZW50VGl0bGUgPSBgJHtvdmVyZHVlRWxlbWVudFRpdGxlfSAoJHtudW1iZXJPZlRhc2tzfSlgO1xuICBvdmVyZHVlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKS50ZXh0Q29udGVudCA9XG4gICAgb3ZlcmR1ZUVsZW1lbnRUaXRsZTtcbiAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbn07XG5cbmV4cG9ydCB7IGlzVG9kYXksIGR1ZVRvZGF5LCBpc092ZXJkdWUsIG92ZXJkdWUgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IGNyZWF0ZURyb3Bkb3duSGlkZXIsIGFkZEVkaXRCdXR0b25zIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWNvbXBvbmVudHNcIjtcbmltcG9ydCBtb2RhbENvbnRyb2xzIGZyb20gXCIuL21vZGFsLWNvbnRyb2xzXCI7XG5pbXBvcnQgeyBkdWVUb2RheSwgb3ZlcmR1ZSB9IGZyb20gXCIuL3RpbWVcIjtcblxuY3JlYXRlRHJvcGRvd25IaWRlcigpO1xuYWRkRWRpdEJ1dHRvbnMoKTtcbm1vZGFsQ29udHJvbHMoKTtcbmR1ZVRvZGF5KCk7XG5vdmVyZHVlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=