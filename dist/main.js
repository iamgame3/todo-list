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
      const projectIndex = parseInt(
        document.querySelector(".todo-items").getAttribute("data-project")
      );
      const project = document.querySelector(
        `[data-project='${projectIndex}']`
      );
      const parentItem = removeOption.closest(".item");
      let index = parentItem.firstChild.textContent.indexOf(".");
      index =
        parseInt(parentItem.firstChild.textContent.substring(0, index)) - 1;
      const lastTaskIndex = _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectIndex].length - 1;
      const task = _project_task_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectIndex][index];
      if (parentItem.nextSibling.classList.contains("todo-item-description")) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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REFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7QUNmZ0Y7QUFDbkM7QUFDRjs7QUFFM0MsNkVBQW1CO0FBQ25CLHdFQUFjO0FBQ2QsMkRBQWE7QUFDYiwrQ0FBUTtBQUNSLDhDQUFPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZGFsLWNvbnRyb2xzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LWNvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QtY3JlYXRpb24uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QtdGFzay1jb21wb25lbnRzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LXRhc2stbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2stY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay1jcmVhdGlvbi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGltZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQgY3JlYXRlTmV3UHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0LWNyZWF0aW9uXCI7XG5pbXBvcnQgeyBkYXNoYm9hcmQgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcbmltcG9ydCB7IGNyZWF0ZU5ld1Rhc2sgfSBmcm9tIFwiLi90YXNrLWNyZWF0aW9uXCI7XG5cbmNvbnN0IHZhbGlkaXR5Q2hlY2sgPSAoaW5wdXQpID0+IGlucHV0LnZhbGlkaXR5LnZhbGlkO1xuXG4vLyBDcmVhdGUgb3Blbi9jbG9zZSBjb250cm9scyBmb3IgYWxsIG1vZGFsc1xuY29uc3QgbW9kYWxDb250cm9scyA9ICgpID0+IHtcbiAgY29uc3QgYWRkTmV3UHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXByb2plY3RcIik7XG4gIGNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1tb2RhbFwiKTtcbiAgY29uc3QgcHJvamVjdEVkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1lZGl0LW1vZGFsXCIpO1xuICBjb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbW9kYWxcIik7XG4gIGNvbnN0IHRhc2tFZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZWRpdC1tb2RhbFwiKTtcbiAgY29uc3QgcHJvamVjdENsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWNsb3NlLWJ1dHRvblwiKTtcbiAgY29uc3QgcHJvamVjdEVkaXRDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIucHJvamVjdC1lZGl0LWNsb3NlLWJ1dHRvblwiXG4gICk7XG4gIGNvbnN0IHRhc2tDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jbG9zZS1idXR0b25cIik7XG4gIGNvbnN0IHRhc2tFZGl0Q2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZWRpdC1jbG9zZS1idXR0b25cIik7XG4gIGNvbnN0IHByb2plY3RTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3Qtc3VibWl0LWJ1dHRvblwiKTtcbiAgY29uc3QgdGFza1N1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1zdWJtaXQtYnV0dG9uXCIpO1xuXG4gIGFkZE5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybVwiKS5yZXNldCgpO1xuICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH0pO1xuXG4gIHByb2plY3RDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgcHJvamVjdEVkaXRDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHByb2plY3RFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIH0pO1xuXG4gIHRhc2tDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRhc2tNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgdGFza0VkaXRDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRhc2tFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIH0pO1xuXG4gIHByb2plY3RNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gcHJvamVjdE1vZGFsKSB7XG4gICAgICBwcm9qZWN0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcblxuICBwcm9qZWN0RWRpdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBwcm9qZWN0RWRpdE1vZGFsKSB7XG4gICAgICBwcm9qZWN0RWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG5cbiAgdGFza01vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0YXNrTW9kYWwpIHtcbiAgICAgIHRhc2tNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHRhc2tFZGl0TW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IHRhc2tFZGl0TW9kYWwpIHtcbiAgICAgIHRhc2tFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcblxuICBwcm9qZWN0U3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdE1vZGFsSW5wdXRzID0gQXJyYXkuZnJvbShcbiAgICAgIHByb2plY3RNb2RhbC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIilcbiAgICApO1xuICAgIGlmIChwcm9qZWN0TW9kYWxJbnB1dHMuZXZlcnkodmFsaWRpdHlDaGVjaykpIHtcbiAgICAgIGNyZWF0ZU5ld1Byb2plY3QoKTtcbiAgICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHRhc2tTdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCB0YXNrTW9kYWxJbnB1dHMgPSBBcnJheS5mcm9tKHRhc2tNb2RhbC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIikpO1xuICAgIGlmICh0YXNrTW9kYWxJbnB1dHMuZXZlcnkodmFsaWRpdHlDaGVjaykpIHtcbiAgICAgIGNvbnN0IHRvZG9JdGVtc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgICAgIGNvbnN0IHByb2plY3QgPVxuICAgICAgICBkYXNoYm9hcmRbcGFyc2VJbnQodG9kb0l0ZW1zQ29udGFpbmVyLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldO1xuICAgICAgY3JlYXRlTmV3VGFzayhwcm9qZWN0KTtcbiAgICAgIHRhc2tNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbW9kYWxDb250cm9scztcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQgeyBkYXNoYm9hcmQgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcblxuLy8gQWRkIHByb2plY3QgY29tcGxldGlvbiBzdGF0dXNcbmNvbnN0IGNyZWF0ZVByb2plY3RDb21wbGV0aW9uID0gKHByb2plY3QsIGR1ZVRvZGF5KSA9PiB7XG4gIGNvbnN0IG9sZENvbXBsZXRpb24gPSAvXFwoXFxkKlxcL1xcZCpcXCkvO1xuICBpZiAocHJvamVjdCkge1xuICAgIGNvbnN0IHRhc2tzID1cbiAgICAgIGRhc2hib2FyZFtwYXJzZUludChwcm9qZWN0LmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldLmxlbmd0aDtcbiAgICBjb25zdCBjb21wbGV0ZWRUYXNrcyA9IHBhcnNlSW50KHByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpO1xuICAgIGxldCB0aXRsZSA9IHByb2plY3QucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIikudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgY29tcGxldGlvbkluZGV4ID0gdGl0bGUuc2VhcmNoKG9sZENvbXBsZXRpb24pIC0gMTtcbiAgICB0aXRsZSA9IHRpdGxlLnN1YnN0cmluZygwLCBjb21wbGV0aW9uSW5kZXgpO1xuICAgIHRpdGxlID0gYCR7dGl0bGV9ICgke2NvbXBsZXRlZFRhc2tzfS8ke3Rhc2tzfSlgO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHByb2plY3QucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIikudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgfVxuICBpZiAoZHVlVG9kYXkpIHtcbiAgICBjb25zdCBkdWVUb2RheUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgICBsZXQgZHVlVG9kYXlUaXRsZSA9IGR1ZVRvZGF5RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIuc2lkZWJhci1pdGVtLXRpdGxlXCJcbiAgICApLnRleHRDb250ZW50O1xuICAgIGNvbnN0IGR1ZVRvZGF5VGFza3MgPSBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSk7XG4gICAgY29uc3QgZHVlVG9kYXlDb21wbGV0ZWRUYXNrcyA9IHBhcnNlSW50KFxuICAgICAgZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpXG4gICAgKTtcbiAgICBjb25zdCBkdWVUb2RheUNvbXBsZXRpb25JbmRleCA9IGR1ZVRvZGF5VGl0bGUuc2VhcmNoKG9sZENvbXBsZXRpb24pIC0gMTtcbiAgICBkdWVUb2RheVRpdGxlID0gZHVlVG9kYXlUaXRsZS5zdWJzdHJpbmcoMCwgZHVlVG9kYXlDb21wbGV0aW9uSW5kZXgpO1xuICAgIGR1ZVRvZGF5VGl0bGUgPSBgJHtkdWVUb2RheVRpdGxlfSAoJHtkdWVUb2RheUNvbXBsZXRlZFRhc2tzfS8ke2R1ZVRvZGF5VGFza3N9KWA7XG4gICAgZHVlVG9kYXlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRpdGxlXCIpLnRleHRDb250ZW50ID1cbiAgICAgIGR1ZVRvZGF5VGl0bGU7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50ID0gKCkgPT4ge1xuICBjb25zdCBvbGRDb3VudCA9IC9cXChcXGQqXFwpLztcbiAgY29uc3Qgb3ZlcmR1ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICBsZXQgb3ZlcmR1ZVRpdGxlID0gb3ZlcmR1ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIlxuICApLnRleHRDb250ZW50O1xuICBjb25zdCBvdmVyZHVlVGFza3MgPSBwYXJzZUludChvdmVyZHVlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKTtcbiAgY29uc3Qgb3ZlcmR1ZVRhc2tDb3VudEluZGV4ID0gb3ZlcmR1ZVRpdGxlLnNlYXJjaChvbGRDb3VudCkgLSAxO1xuICBvdmVyZHVlVGl0bGUgPSBvdmVyZHVlVGl0bGUuc3Vic3RyaW5nKDAsIG92ZXJkdWVUYXNrQ291bnRJbmRleCk7XG4gIG92ZXJkdWVUaXRsZSA9IGAke292ZXJkdWVUaXRsZX0gKCR7b3ZlcmR1ZVRhc2tzfSlgO1xuICBvdmVyZHVlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKS50ZXh0Q29udGVudCA9XG4gICAgb3ZlcmR1ZVRpdGxlO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlUHJvamVjdENvbXBsZXRpb24sIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50IH07XG4iLCJpbXBvcnQgeyBkYXNoYm9hcmQsIG5ld1Byb2plY3QgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcbmltcG9ydCB7IGFkZEVkaXRCdXR0b25zLCByZXNldFRvZG9MaXN0IH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWNvbXBvbmVudHNcIjtcblxuY29uc3QgY3JlYXRlQWRkTmV3UHJvamVjdEVsZW1lbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHNpZGViYXJJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtc1wiKTtcbiAgY29uc3Qgb2xkQWRkTmV3UHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0XCIpO1xuICBvbGRBZGROZXdQcm9qZWN0RWxlbWVudC5yZW1vdmUoKTtcbiAgY29uc3QgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2lkZWJhci1pdGVtLWFkZFwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJuZXctcHJvamVjdFwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgY29uc3QgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSBcIisgQWRkIE5ldyBQcm9qZWN0XCI7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKG5ld0FkZE5ld1Byb2plY3RFbGVtZW50VGl0bGUpO1xuICBzaWRlYmFySXRlbXMuYXBwZW5kQ2hpbGQobmV3QWRkTmV3UHJvamVjdEVsZW1lbnQpO1xuXG4gIGNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1tb2RhbFwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybVwiKS5yZXNldCgpO1xuICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlTmV3UHJvamVjdEVsZW1lbnQgPSAodGl0bGUpID0+IHtcbiAgY29uc3Qgc2lkZWJhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW1zXCIpO1xuICBjb25zdCBuZXdQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Byb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyLWl0ZW1cIik7XG4gIG5ld1Byb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgZGFzaGJvYXJkLmxlbmd0aCAtIDEpO1xuICBuZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiLCAwKTtcbiAgY29uc3QgbmV3UHJvamVjdEVsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Byb2plY3RFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInNpZGViYXItaXRlbS10aXRsZVwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IGAke3RpdGxlfSAoMC8wKWA7XG4gIG5ld1Byb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Byb2plY3RFbGVtZW50VGl0bGUpO1xuICBzaWRlYmFySXRlbXMuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEVsZW1lbnQpO1xuXG4gIGFkZEVkaXRCdXR0b25zKCk7XG5cbiAgbmV3UHJvamVjdEVsZW1lbnRUaXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICAgIGNvbnN0IHByb2plY3ROdW1iZXIgPSBuZXdQcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIik7XG4gICAgdGFza3Muc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIsIHByb2plY3ROdW1iZXIpO1xuICAgIHRhc2tzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIHJlc2V0VG9kb0xpc3QocHJvamVjdE51bWJlcik7XG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlTmV3UHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbmFtZVwiKS52YWx1ZTtcbiAgbmV3UHJvamVjdCgpO1xuICBjcmVhdGVOZXdQcm9qZWN0RWxlbWVudCh0aXRsZSk7XG4gIGNyZWF0ZUFkZE5ld1Byb2plY3RFbGVtZW50KCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVOZXdQcm9qZWN0O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCBlZGl0SWNvblNyYyBmcm9tIFwiLi9pY29ucy9kb3RzLXZlcnRpY2FsLnN2Z1wiO1xuaW1wb3J0IHsgZGFzaGJvYXJkIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWxvZ2ljXCI7XG5pbXBvcnQgY3JlYXRlRGVzY3JpcHRpb24gZnJvbSBcIi4vdGFzay1jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBjcmVhdGVOZXdUYXNrRWxlbWVudCwgY3JlYXRlQWRkTmV3VGFza0VsZW1lbnQgfSBmcm9tIFwiLi90YXNrLWNyZWF0aW9uXCI7XG5pbXBvcnQgeyBpc1RvZGF5LCBpc092ZXJkdWUgfSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQge1xuICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCxcbiAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24sXG59IGZyb20gXCIuL3Byb2plY3QtY29tcG9uZW50c1wiO1xuXG5jb25zdCB2YWxpZGl0eUNoZWNrID0gKGlucHV0KSA9PiBpbnB1dC52YWxpZGl0eS52YWxpZDtcblxuLy8gQ3JlYXRlIGV2ZW50IGxpc3RlbmVycyB0byBoaWRlIHRoZSBkcm9wZG93biBtZW51cyB3aGVuIG90aGVyIHN0dWZmIGlzIGNsaWNrZWQgb25cbmNvbnN0IGNyZWF0ZURyb3Bkb3duSGlkZXIgPSAoKSA9PiB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKFxuICAgICAgIWV2ZW50LnRhcmdldC5tYXRjaGVzKFwiLmRyb3Bkb3duLWNvbnRlbnRcIikgJiZcbiAgICAgICFldmVudC50YXJnZXQubWF0Y2hlcyhcIi5lZGl0LWJ1dHRvblwiKVxuICAgICkge1xuICAgICAgY29uc3QgZHJvcGRvd25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kcm9wZG93bi1jb250ZW50XCIpO1xuICAgICAgZHJvcGRvd25zLmZvckVhY2goKGRyb3Bkb3duKSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBkcm9wZG93bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCByZXNldFRvZG9MaXN0ID0gKHByb2plY3ROdW1iZXIpID0+IHtcbiAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gIHRhc2tzLnJlcGxhY2VDaGlsZHJlbigpO1xuICBkYXNoYm9hcmRbcHJvamVjdE51bWJlcl0uZm9yRWFjaCgodGFzaykgPT4ge1xuICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IHRhc2sucHJpb3JpdHk7XG4gICAgY29uc3QgdGFza1RpdGxlID0gdGFzay50aXRsZTtcbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IHRhc2suZHVlRGF0ZTtcbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHRhc2tDaGVja2VkID0gdGFzay5jaGVja2VkO1xuXG4gICAgY3JlYXRlTmV3VGFza0VsZW1lbnQoXG4gICAgICB0YXNrUHJpb3JpdHksXG4gICAgICB0YXNrVGl0bGUsXG4gICAgICB0YXNrRHVlRGF0ZSxcbiAgICAgIHRhc2tEZXNjcmlwdGlvbixcbiAgICAgIHRhc2tDaGVja2VkXG4gICAgKTtcbiAgfSk7XG4gIGNyZWF0ZUFkZE5ld1Rhc2tFbGVtZW50KCk7XG59O1xuXG4vLyBDcmVhdGUgZWRpdCBvcHRpb24gZnVuY3Rpb25hbGl0eVxuY29uc3QgZWRpdEZ1bmN0aW9uYWxpdHkgPSAoaXRlbSkgPT4ge1xuICBjb25zdCBwcm9qZWN0TnVtYmVyID0gcGFyc2VJbnQoXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKVxuICApO1xuICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaWRlYmFyLWl0ZW1cIikpIHtcbiAgICBjb25zdCBpdGVtVGl0bGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRpdGxlXCIpO1xuICAgIGNvbnN0IHByb2plY3RFZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtZWRpdC1tb2RhbFwiKTtcbiAgICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbmFtZS1lZGl0XCIpO1xuICAgIGNvbnN0IHByb2plY3RFZGl0TW9kYWxTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIFwicHJvamVjdC1lZGl0LXN1Ym1pdC1idXR0b25cIlxuICAgICk7XG4gICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lID1cbiAgICAgIHByb2plY3RFZGl0TW9kYWxTdWJtaXRCdXR0b24uY2xvbmVOb2RlKHRydWUpO1xuICAgIHByb2plY3RFZGl0TW9kYWxUaXRsZS52YWx1ZSA9IGl0ZW1UaXRsZS50ZXh0Q29udGVudDtcblxuICAgIHByb2plY3RFZGl0TW9kYWxTdWJtaXRCdXR0b24ucmVwbGFjZVdpdGgocHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lKTtcblxuICAgIHByb2plY3RFZGl0TW9kYWxTdWJtaXRCdXR0b25DbG9uZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbElucHV0cyA9IEFycmF5LmZyb20oXG4gICAgICAgIHByb2plY3RFZGl0TW9kYWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpXG4gICAgICApO1xuICAgICAgaWYgKHByb2plY3RFZGl0TW9kYWxJbnB1dHMuZXZlcnkodmFsaWRpdHlDaGVjaykpIHtcbiAgICAgICAgaXRlbVRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdEVkaXRNb2RhbFRpdGxlLnZhbHVlO1xuICAgICAgICBwcm9qZWN0RWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGl0ZW1Qcmlvcml0eSA9IGl0ZW0uZmlyc3RDaGlsZDtcbiAgICBjb25zdCBpdGVtVGl0bGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLXRpdGxlXCIpO1xuICAgIGNvbnN0IHRhc2tUb0VkaXQgPVxuICAgICAgZGFzaGJvYXJkW3Byb2plY3ROdW1iZXJdW3BhcnNlSW50KGl0ZW0uZmlyc3RDaGlsZC50ZXh0Q29udGVudCkgLSAxXTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWVkaXQtbW9kYWxcIik7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWVkaXRcIik7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbERhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlLWVkaXRcIik7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbFByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eS1lZGl0XCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxEZXNjcmlwdGlvbiA9XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uLWVkaXRcIik7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgXCJ0YXNrLWVkaXQtc3VibWl0LWJ1dHRvblwiXG4gICAgKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uQ2xvbmUgPVxuICAgICAgdGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgdGFza0VkaXRNb2RhbFRpdGxlLnZhbHVlID0gdGFza1RvRWRpdC50aXRsZTtcbiAgICB0YXNrRWRpdE1vZGFsRGF0ZS52YWx1ZSA9IHRhc2tUb0VkaXQuZHVlRGF0ZTtcbiAgICB0YXNrRWRpdE1vZGFsUHJpb3JpdHkudmFsdWUgPSB0YXNrVG9FZGl0LnByaW9yaXR5O1xuICAgIHRhc2tFZGl0TW9kYWxEZXNjcmlwdGlvbi52YWx1ZSA9IHRhc2tUb0VkaXQuZGVzY3JpcHRpb247XG5cbiAgICB0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uLnJlcGxhY2VXaXRoKHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b25DbG9uZSk7XG5cbiAgICB0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uQ2xvbmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxJbnB1dHMgPSBBcnJheS5mcm9tKFxuICAgICAgICB0YXNrRWRpdE1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKVxuICAgICAgKTtcbiAgICAgIGlmICh0YXNrRWRpdE1vZGFsSW5wdXRzLmV2ZXJ5KHZhbGlkaXR5Q2hlY2spKSB7XG4gICAgICAgIHRhc2tUb0VkaXQudGl0bGUgPSB0YXNrRWRpdE1vZGFsVGl0bGUudmFsdWU7XG4gICAgICAgIHRhc2tUb0VkaXQuZHVlRGF0ZSA9IHRhc2tFZGl0TW9kYWxEYXRlLnZhbHVlO1xuICAgICAgICB0YXNrVG9FZGl0LnByaW9yaXR5ID0gdGFza0VkaXRNb2RhbFByaW9yaXR5LnZhbHVlO1xuICAgICAgICB0YXNrVG9FZGl0LmRlc2NyaXB0aW9uID0gdGFza0VkaXRNb2RhbERlc2NyaXB0aW9uLnZhbHVlO1xuICAgICAgICBpdGVtUHJpb3JpdHkudGV4dENvbnRlbnQgPSBgJHt0YXNrVG9FZGl0LnByaW9yaXR5fS5gO1xuICAgICAgICBpdGVtVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrVG9FZGl0LnRpdGxlO1xuICAgICAgICBjcmVhdGVEZXNjcmlwdGlvbihpdGVtLCBpdGVtVGl0bGUsIHRhc2tUb0VkaXQuZGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrRWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG4vLyBBZGQgZWRpdCBidXR0b25zIHRvIHByb2plY3RzIGFuZCB0YXNrc1xuY29uc3QgYWRkRWRpdEJ1dHRvbnMgPSAoKSA9PiB7XG4gIC8vIE1ha2UgYW4gZWRpdCBidXR0b25cbiAgY29uc3QgYWRkRWRpdEJ1dHRvbiA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZWRpdEljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICBjb25zdCBlZGl0RHJvcGRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVkaXRPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHJlbW92ZU9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZWRpdEljb24uc3JjID0gZWRpdEljb25TcmM7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwiYWx0XCIsIFwiVmVydGljYWwgZG90dGVkIGxpbmUgaWNvbiBmb3IgZWRpdCBvcHRpb25zLlwiKTtcbiAgICBlZGl0SWNvbi5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ1dHRvblwiKTtcbiAgICBlZGl0RHJvcGRvd24uY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWNvbnRlbnRcIik7XG4gICAgZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGVkaXRPcHRpb24udGV4dENvbnRlbnQgPSBcIkVkaXRcIjtcbiAgICBlZGl0T3B0aW9uLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1pdGVtXCIpO1xuICAgIGVkaXRPcHRpb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJlZGl0LWJ1dHRvblwiKTtcbiAgICBlZGl0T3B0aW9uLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG4gICAgcmVtb3ZlT3B0aW9uLnRleHRDb250ZW50ID0gXCJSZW1vdmVcIjtcbiAgICByZW1vdmVPcHRpb24uY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWl0ZW1cIik7XG4gICAgcmVtb3ZlT3B0aW9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicmVtb3ZlLWJ1dHRvblwiKTtcbiAgICByZW1vdmVPcHRpb24uc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICBlZGl0RHJvcGRvd24uYXBwZW5kQ2hpbGQoZWRpdE9wdGlvbik7XG4gICAgZWRpdERyb3Bkb3duLmFwcGVuZENoaWxkKHJlbW92ZU9wdGlvbik7XG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idXR0b25cIik7XG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd25cIik7XG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0RHJvcGRvd24pO1xuICAgIGl0ZW0uYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG5cbiAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPT09IFwiaGlkZGVuXCIpIHtcbiAgICAgICAgZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH0gZWxzZSBlZGl0RHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWVkaXQtbW9kYWxcIik7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LW1vZGFsXCIpO1xuXG4gICAgZWRpdE9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50SXRlbSA9IGVkaXRPcHRpb24uY2xvc2VzdChcIi5pdGVtXCIpO1xuICAgICAgaWYgKHBhcmVudEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2lkZWJhci1pdGVtXCIpKSB7XG4gICAgICAgIGVkaXRGdW5jdGlvbmFsaXR5KHBhcmVudEl0ZW0pO1xuICAgICAgICBwcm9qZWN0RWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVkaXRGdW5jdGlvbmFsaXR5KHBhcmVudEl0ZW0pO1xuICAgICAgICB0YXNrRWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlbW92ZU9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3Qgb3ZlcmR1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gICAgICBjb25zdCBkdWVUb2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIilcbiAgICAgICk7XG4gICAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFtkYXRhLXByb2plY3Q9JyR7cHJvamVjdEluZGV4fSddYFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHBhcmVudEl0ZW0gPSByZW1vdmVPcHRpb24uY2xvc2VzdChcIi5pdGVtXCIpO1xuICAgICAgbGV0IGluZGV4ID0gcGFyZW50SXRlbS5maXJzdENoaWxkLnRleHRDb250ZW50LmluZGV4T2YoXCIuXCIpO1xuICAgICAgaW5kZXggPVxuICAgICAgICBwYXJzZUludChwYXJlbnRJdGVtLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIGluZGV4KSkgLSAxO1xuICAgICAgY29uc3QgbGFzdFRhc2tJbmRleCA9IGRhc2hib2FyZFtwcm9qZWN0SW5kZXhdLmxlbmd0aCAtIDE7XG4gICAgICBjb25zdCB0YXNrID0gZGFzaGJvYXJkW3Byb2plY3RJbmRleF1baW5kZXhdO1xuICAgICAgaWYgKHBhcmVudEl0ZW0ubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCIpKSB7XG4gICAgICAgIHBhcmVudEl0ZW0ubmV4dFNpYmxpbmcucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgICBwYXJlbnRJdGVtLnJlbW92ZSgpO1xuICAgICAgZm9yIChsZXQgaSA9IGluZGV4ICsgMTsgaSA8IGxhc3RUYXNrSW5kZXggKyAxOyBpICs9IDEpIHtcbiAgICAgICAgZGFzaGJvYXJkW3Byb2plY3RJbmRleF1baV0ucHJpb3JpdHkgLT0gMTtcbiAgICAgIH1cbiAgICAgIHByb2plY3Quc2V0QXR0cmlidXRlKFxuICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICk7XG4gICAgICBpZiAodGFzay5jaGVja2VkKVxuICAgICAgICBwcm9qZWN0LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgICAgICk7XG4gICAgICBpZiAoaXNPdmVyZHVlKHRhc2suZHVlRGF0ZSkgJiYgIXRhc2suY2hlY2tlZCkge1xuICAgICAgICBvdmVyZHVlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgICApO1xuICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgfVxuICAgICAgaWYgKGlzVG9kYXkodGFzay5kdWVEYXRlKSkge1xuICAgICAgICBpZiAodGFzay5jaGVja2VkKVxuICAgICAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSAtIDFcbiAgICAgICAgICApO1xuICAgICAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICk7XG4gICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIHRydWUpO1xuICAgICAgfSBlbHNlIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIGZhbHNlKTtcbiAgICAgIGRhc2hib2FyZFtwcm9qZWN0SW5kZXhdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICByZXNldFRvZG9MaXN0KHByb2plY3RJbmRleCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gUmVtb3ZlIGFsbCBlZGl0IGJ1dHRvbnMgYW5kIHRoZW4gbWFrZSBhbiBlZGl0IGJ1dHRvbiBmb3IgZXZlcnkgcHJvamVjdCBhbmQgdGFza1xuICBjb25zdCBlZGl0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWRpdC1idXR0b25cIik7XG4gIGVkaXRCdXR0b25zLmZvckVhY2goKGVkaXRCdXR0b24pID0+IGVkaXRCdXR0b24ucmVtb3ZlKCkpO1xuICBjb25zdCB0ZXN0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNpZGViYXItaXRlbVwiKTtcbiAgY29uc3QgdGVzdEl0ZW1zMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1pdGVtXCIpO1xuICB0ZXN0SXRlbXMuZm9yRWFjaCgodGVzdEl0ZW0pID0+IGFkZEVkaXRCdXR0b24odGVzdEl0ZW0pKTtcbiAgdGVzdEl0ZW1zMi5mb3JFYWNoKCh0ZXN0SXRlbSkgPT4gYWRkRWRpdEJ1dHRvbih0ZXN0SXRlbSkpO1xufTtcblxuZXhwb3J0IHtcbiAgY3JlYXRlRHJvcGRvd25IaWRlcixcbiAgZWRpdEZ1bmN0aW9uYWxpdHksXG4gIGFkZEVkaXRCdXR0b25zLFxuICByZXNldFRvZG9MaXN0LFxufTtcbiIsImNvbnN0IGRhc2hib2FyZCA9IFtdO1xuXG5jb25zdCBuZXdQcm9qZWN0ID0gKCkgPT4ge1xuICBkYXNoYm9hcmQucHVzaChbXSk7XG59O1xuXG5jb25zdCBuZXdUYXNrID0gKFxuICBwcm9qZWN0LFxuICB0aXRsZSxcbiAgZHVlRGF0ZSxcbiAgcHJpb3JpdHksXG4gIGRlc2NyaXB0aW9uLFxuICBjaGVja2VkLFxuICBleGlzdHNcbikgPT4ge1xuICBpZiAoZXhpc3RzKSB7XG4gICAgcHJvamVjdC5zcGxpY2UocHJpb3JpdHkgLSAxLCAwLCB7XG4gICAgICB0aXRsZSxcbiAgICAgIGR1ZURhdGUsXG4gICAgICBwcmlvcml0eSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY2hlY2tlZCxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBwcm9qZWN0LnB1c2goe1xuICAgICAgdGl0bGUsXG4gICAgICBkdWVEYXRlLFxuICAgICAgcHJpb3JpdHksXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGNoZWNrZWQsXG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGRhc2hib2FyZCwgbmV3UHJvamVjdCwgbmV3VGFzayB9O1xuIiwiLy8gQ3JlYXRlIHRhc2sgZGVzY3JpcHRpb24gbWFrZXJcbmNvbnN0IGNyZWF0ZURlc2NyaXB0aW9uID0gKHRhc2ssIHRhc2tUaXRsZSwgZGVzY3JpcHRpb24pID0+IHtcbiAgaWYgKHRhc2submV4dFNpYmxpbmcpIHtcbiAgICBpZiAodGFzay5uZXh0U2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tZGVzY3JpcHRpb25cIikpXG4gICAgICB0YXNrLm5leHRTaWJsaW5nLnJlbW92ZSgpO1xuICB9XG4gIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICBjb25zdCB0YXNrVGl0bGVDbG9uZSA9IHRhc2tUaXRsZS5jbG9uZU5vZGUodHJ1ZSk7XG4gIHRhc2tUaXRsZS5yZXBsYWNlV2l0aCh0YXNrVGl0bGVDbG9uZSk7XG4gIGNvbnN0IG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tZGVzY3JpcHRpb25cIik7XG4gIG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbjtcbiAgbGV0IG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb25TaG93biA9IGZhbHNlO1xuXG4gIHRhc2tUaXRsZUNsb25lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb25TaG93bikge1xuICAgICAgdGFza3MucmVtb3ZlQ2hpbGQobmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbik7XG4gICAgICBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uU2hvd24gPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFzay5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uKTtcbiAgICAgIG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb25TaG93biA9IHRydWU7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURlc2NyaXB0aW9uO1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCB7XG4gIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uLFxuICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCxcbn0gZnJvbSBcIi4vcHJvamVjdC1jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBkYXNoYm9hcmQsIG5ld1Rhc2sgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcbmltcG9ydCB7IGlzVG9kYXksIGlzT3ZlcmR1ZSB9IGZyb20gXCIuL3RpbWVcIjtcbmltcG9ydCBjcmVhdGVEZXNjcmlwdGlvbiBmcm9tIFwiLi90YXNrLWNvbXBvbmVudHNcIjtcbmltcG9ydCB7IGFkZEVkaXRCdXR0b25zLCByZXNldFRvZG9MaXN0IH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWNvbXBvbmVudHNcIjtcblxuY29uc3QgY3JlYXRlQWRkTmV3VGFza0VsZW1lbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHRvZG9JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgY29uc3Qgb2xkQWRkTmV3VGFza0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy10YXNrXCIpO1xuICBpZiAob2xkQWRkTmV3VGFza0VsZW1lbnQgIT09IG51bGwpIG9sZEFkZE5ld1Rhc2tFbGVtZW50LnJlbW92ZSgpO1xuICBjb25zdCBuZXdBZGROZXdUYXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tYWRkXCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm5ldy10YXNrXCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICBjb25zdCBuZXdBZGROZXdUYXNrRWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IFwiKyBBZGQgTmV3IFRhc2tcIjtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3QWRkTmV3VGFza0VsZW1lbnRUaXRsZSk7XG4gIHRvZG9JdGVtcy5hcHBlbmRDaGlsZChuZXdBZGROZXdUYXNrRWxlbWVudCk7XG5cbiAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLW1vZGFsXCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtXCIpLnJlc2V0KCk7XG4gICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdUYXNrRWxlbWVudCA9IChcbiAgcHJpb3JpdHksXG4gIHRpdGxlLFxuICBkdWVEYXRlLFxuICBkZXNjcmlwdGlvbixcbiAgY2hlY2tlZFxuKSA9PiB7XG4gIGNvbnN0IHRvZG9JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYFtkYXRhLXByb2plY3Q9JyR7dG9kb0l0ZW1zLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKX0nXWBcbiAgKTtcbiAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCk7XG4gIGNvbnN0IG5ld1Rhc2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbVwiKTtcbiAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcIml0ZW1cIik7XG4gIGNvbnN0IG5ld1Rhc2tFbGVtZW50UHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdUYXNrRWxlbWVudFByaW9yaXR5LnRleHRDb250ZW50ID0gYCR7cHJpb3JpdHl9LmA7XG4gIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50UHJpb3JpdHkpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudENoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5jbGFzc0xpc3QuYWRkKFwiY2hlY2tib3hcIik7XG4gIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLXRpdGxlXCIpO1xuICBuZXdUYXNrRWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG4gIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50VGl0bGUpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdUYXNrRWxlbWVudER1ZURhdGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1kdWUtZGF0ZVwiKTtcbiAgbmV3VGFza0VsZW1lbnREdWVEYXRlLnRleHRDb250ZW50ID0gZHVlRGF0ZTtcbiAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnREdWVEYXRlKTtcbiAgdG9kb0l0ZW1zLmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50KTtcblxuICBpZiAoY2hlY2tlZCkge1xuICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIuKck1wiO1xuICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICB9XG5cbiAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWNoZWNrZWRcIilcbiAgICApIHtcbiAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICBkYXNoYm9hcmRbcGFyc2VJbnQodG9kb0l0ZW1zLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldW1xuICAgICAgICBwcmlvcml0eSAtIDFcbiAgICAgIF0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgcHJvamVjdC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgICApO1xuICAgICAgaWYgKGlzVG9kYXkoZHVlRGF0ZSkgJiYgaXNPdmVyZHVlKGR1ZURhdGUpKSB7XG4gICAgICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBvdmVyZHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSArIDFcbiAgICAgICAgKTtcbiAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgdHJ1ZSk7XG4gICAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNUb2RheShkdWVEYXRlKSAmJiAhaXNPdmVyZHVlKGR1ZURhdGUpKSB7XG4gICAgICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgICApO1xuICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc092ZXJkdWUoZHVlRGF0ZSkgJiYgIWlzVG9kYXkoZHVlRGF0ZSkpIHtcbiAgICAgICAgY29uc3Qgb3ZlcmR1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLW92ZXJkdWVcIik7XG4gICAgICAgIG92ZXJkdWUuc2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWUuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgKyAxXG4gICAgICAgICk7XG4gICAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwi4pyTXCI7XG4gICAgICBkYXNoYm9hcmRbcGFyc2VJbnQodG9kb0l0ZW1zLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldW1xuICAgICAgICBwcmlvcml0eSAtIDFcbiAgICAgIF0uY2hlY2tlZCA9IHRydWU7XG4gICAgICBwcm9qZWN0LnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICBwYXJzZUludChwcm9qZWN0LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSArIDFcbiAgICAgICk7XG4gICAgICBpZiAoaXNUb2RheShkdWVEYXRlKSAmJiBpc092ZXJkdWUoZHVlRGF0ZSkpIHtcbiAgICAgICAgY29uc3QgZHVlVG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgICAgICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG92ZXJkdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS1vdmVyZHVlXCIpO1xuICAgICAgICBvdmVyZHVlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICBwYXJzZUludChvdmVyZHVlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgICApO1xuICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCB0cnVlKTtcbiAgICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1RvZGF5KGR1ZURhdGUpICYmICFpc092ZXJkdWUoZHVlRGF0ZSkpIHtcbiAgICAgICAgY29uc3QgZHVlVG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgICAgICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICAgICk7XG4gICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIHRydWUpO1xuICAgICAgfVxuICAgICAgaWYgKGlzT3ZlcmR1ZShkdWVEYXRlKSAmJiAhaXNUb2RheShkdWVEYXRlKSkge1xuICAgICAgICBjb25zdCBvdmVyZHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgICAgICAgb3ZlcmR1ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSAtIDFcbiAgICAgICAgKTtcbiAgICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIGZhbHNlKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNyZWF0ZURlc2NyaXB0aW9uKG5ld1Rhc2tFbGVtZW50LCBuZXdUYXNrRWxlbWVudFRpdGxlLCBkZXNjcmlwdGlvbik7XG4gIGFkZEVkaXRCdXR0b25zKCk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdUYXNrID0gKHByb2plY3QpID0+IHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tcIikudmFsdWU7XG4gIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKS52YWx1ZTtcbiAgZHVlRGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2UoZHVlRGF0ZSkpO1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHdlZWtkYXk6IFwic2hvcnRcIixcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICBtb250aDogXCJzaG9ydFwiLFxuICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgaG91cjogXCJudW1lcmljXCIsXG4gICAgbWludXRlOiBcIm51bWVyaWNcIixcbiAgfTtcbiAgZHVlRGF0ZSA9IGR1ZURhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFwiZW4tVVNcIiwgb3B0aW9ucyk7XG4gIGlmIChpc1RvZGF5KGR1ZURhdGUpKSB7XG4gICAgY29uc3QgZHVlVG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgICBkdWVUb2RheS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgIHBhcnNlSW50KGR1ZVRvZGF5LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICk7XG4gICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24oZmFsc2UsIHRydWUpO1xuICB9XG4gIGlmIChpc092ZXJkdWUoZHVlRGF0ZSkpIHtcbiAgICBjb25zdCBvdmVyZHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgICBvdmVyZHVlLnNldEF0dHJpYnV0ZShcbiAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgcGFyc2VJbnQob3ZlcmR1ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSArIDFcbiAgICApO1xuICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gIH1cbiAgbGV0IHByaW9yaXR5ID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZSk7XG4gIGlmIChwcmlvcml0eSA9PT0gMCkgcHJpb3JpdHkgPSAxO1xuICBpZiAoTnVtYmVyLmlzTmFOKHByaW9yaXR5KSkgcHJpb3JpdHkgPSBJbmZpbml0eTtcbiAgaWYgKHByaW9yaXR5ID4gcHJvamVjdC5sZW5ndGggKyAxKSBwcmlvcml0eSA9IHByb2plY3QubGVuZ3RoICsgMTtcbiAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgaWYgKGRlc2NyaXB0aW9uID09PSBcIlwiKSBkZXNjcmlwdGlvbiA9IFwiTm8gZGVzY3JpcHRpb24gYXZhaWxhYmxlLlwiO1xuICBjb25zdCBjaGVja2VkID0gZmFsc2U7XG4gIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgaWYgKHByb2plY3RbcHJpb3JpdHkgLSAxXSkge1xuICAgIGV4aXN0cyA9IHRydWU7XG4gICAgbmV3VGFzayhwcm9qZWN0LCB0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIGRlc2NyaXB0aW9uLCBjaGVja2VkLCBleGlzdHMpO1xuICAgIHByb2plY3QuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICB0YXNrLnByaW9yaXR5ID0gcHJvamVjdC5pbmRleE9mKHRhc2spICsgMTtcbiAgICB9KTtcbiAgICByZXNldFRvZG9MaXN0KGRhc2hib2FyZC5pbmRleE9mKHByb2plY3QpKTtcbiAgfSBlbHNlIHtcbiAgICBuZXdUYXNrKHByb2plY3QsIHRpdGxlLCBkdWVEYXRlLCBwcmlvcml0eSwgZGVzY3JpcHRpb24sIGNoZWNrZWQsIGV4aXN0cyk7XG4gICAgY3JlYXRlTmV3VGFza0VsZW1lbnQocHJpb3JpdHksIHRpdGxlLCBkdWVEYXRlLCBkZXNjcmlwdGlvbiwgY2hlY2tlZCk7XG4gICAgY3JlYXRlQWRkTmV3VGFza0VsZW1lbnQoKTtcbiAgfVxufTtcblxuZXhwb3J0IHsgY3JlYXRlQWRkTmV3VGFza0VsZW1lbnQsIGNyZWF0ZU5ld1Rhc2tFbGVtZW50LCBjcmVhdGVOZXdUYXNrIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByYWRpeCAqL1xuaW1wb3J0IHsgZGFzaGJvYXJkIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWxvZ2ljXCI7XG5pbXBvcnQge1xuICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbixcbiAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQsXG59IGZyb20gXCIuL3Byb2plY3QtY29tcG9uZW50c1wiO1xuaW1wb3J0IGNyZWF0ZURlc2NyaXB0aW9uIGZyb20gXCIuL3Rhc2stY29tcG9uZW50c1wiO1xuXG5jb25zdCBpc1RvZGF5ID0gKGRhdGUpID0+IHtcbiAgbGV0IHRvZGF5c0RhdGUgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHdlZWtkYXk6IFwic2hvcnRcIixcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICBtb250aDogXCJzaG9ydFwiLFxuICAgIGRheTogXCJudW1lcmljXCIsXG4gIH07XG4gIHRvZGF5c0RhdGUgPSB0b2RheXNEYXRlLnRvTG9jYWxlVGltZVN0cmluZyhcImVuLVVTXCIsIG9wdGlvbnMpO1xuICBjb25zdCBsYXN0Q29tbWEgPSB0b2RheXNEYXRlLmxhc3RJbmRleE9mKFwiLFwiKTtcbiAgdG9kYXlzRGF0ZSA9IHRvZGF5c0RhdGUuc3Vic3RyaW5nKDAsIGxhc3RDb21tYSk7XG4gIGlmIChkYXRlLmluY2x1ZGVzKHRvZGF5c0RhdGUpKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgaXNPdmVyZHVlID0gKGRhdGUpID0+IHtcbiAgY29uc3QgdGltZSA9IERhdGUucGFyc2UobmV3IERhdGUoKSk7XG4gIGNvbnN0IHBhcnNlZERhdGUgPSBEYXRlLnBhcnNlKGRhdGUpO1xuICBpZiAocGFyc2VkRGF0ZSA8IHRpbWUpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBkdWVUb2RheSA9ICgpID0+IHtcbiAgY29uc3QgZHVlVG9kYXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gIGNvbnN0IG92ZXJkdWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgbGV0IG51bWJlck9mVGFza3MgPSAwO1xuICBsZXQgbnVtYmVyT2ZDb21wbGV0ZWRUYXNrcyA9IDA7XG4gIGNvbnN0IGR1ZVRvZGF5RnVuY3Rpb25hbGl0eSA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgICB0YXNrcy5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICBkYXNoYm9hcmQuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgcHJvamVjdC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgIGlmIChpc1RvZGF5KHRhc2suZHVlRGF0ZSkpIHtcbiAgICAgICAgICBudW1iZXJPZlRhc2tzICs9IDE7XG4gICAgICAgICAgY29uc3QgcHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYFtkYXRhLXByb2plY3Q9JyR7ZGFzaGJvYXJkLmluZGV4T2YocHJvamVjdCl9J11gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaXRlbVwiKTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudENoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveFwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudENoZWNrYm94KTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tdGl0bGVcIik7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnRUaXRsZSk7XG4gICAgICAgICAgY29uc3QgbmV3VGFza0VsZW1lbnREdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudER1ZURhdGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1kdWUtZGF0ZVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudER1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XG4gICAgICAgICAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnREdWVEYXRlKTtcbiAgICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudCk7XG5cbiAgICAgICAgICBpZiAodGFzay5jaGVja2VkKSB7XG4gICAgICAgICAgICBuZXdUYXNrRWxlbWVudENoZWNrYm94LnRleHRDb250ZW50ID0gXCLinJNcIjtcbiAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgICAgICAgICAgbnVtYmVyT2ZDb21wbGV0ZWRUYXNrcyArPSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIilcbiAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWNoZWNrZWRcIilcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBuZXdUYXNrRWxlbWVudFxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwidG9kby1pdGVtLWNoZWNrZWRcIik7XG4gICAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgICAgdGFzay5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHByb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQocHJvamVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgICBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpZiAoaXNPdmVyZHVlKHRhc2suZHVlRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBvdmVyZHVlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgICBcImRhdGEtdGFza3NcIixcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWVFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpICsgMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0RWxlbWVudCwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdUYXNrRWxlbWVudFxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWNoZWNrZWRcIik7XG4gICAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIuKck1wiO1xuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgICAgdGFzay5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgICBwYXJzZUludChwcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmIChpc092ZXJkdWUodGFzay5kdWVEYXRlKSkge1xuICAgICAgICAgICAgICAgIG92ZXJkdWVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICAgIFwiZGF0YS10YXNrc1wiLFxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQob3ZlcmR1ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiKSkgLSAxXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVPdmVyZHVlVGFza3NDb3VudCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3RFbGVtZW50LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNyZWF0ZURlc2NyaXB0aW9uKFxuICAgICAgICAgICAgbmV3VGFza0VsZW1lbnQsXG4gICAgICAgICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLFxuICAgICAgICAgICAgdGFzay5kZXNjcmlwdGlvblxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICBkdWVUb2RheUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGR1ZVRvZGF5RnVuY3Rpb25hbGl0eSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBkdWVUb2RheUZ1bmN0aW9uYWxpdHkpO1xuICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiLCBudW1iZXJPZlRhc2tzKTtcbiAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIsIG51bWJlck9mQ29tcGxldGVkVGFza3MpO1xuICBsZXQgZHVlVG9kYXlFbGVtZW50VGl0bGUgPSBkdWVUb2RheUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIlxuICApLnRleHRDb250ZW50O1xuICBkdWVUb2RheUVsZW1lbnRUaXRsZSA9IGAke2R1ZVRvZGF5RWxlbWVudFRpdGxlfSAoJHtudW1iZXJPZkNvbXBsZXRlZFRhc2tzfS8ke251bWJlck9mVGFza3N9KWA7XG4gIGR1ZVRvZGF5RWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKS50ZXh0Q29udGVudCA9XG4gICAgZHVlVG9kYXlFbGVtZW50VGl0bGU7XG4gIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKGZhbHNlLCB0cnVlKTtcbn07XG5cbmNvbnN0IG92ZXJkdWUgPSAoKSA9PiB7XG4gIGNvbnN0IG92ZXJkdWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tb3ZlcmR1ZVwiKTtcbiAgY29uc3QgZHVlVG9kYXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gIGxldCBudW1iZXJPZlRhc2tzID0gMDtcbiAgY29uc3Qgb3ZlcmR1ZUZ1bmN0aW9uYWxpdHkgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gICAgdGFza3MucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgZGFzaGJvYXJkLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIHByb2plY3QuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICBpZiAoaXNPdmVyZHVlKHRhc2suZHVlRGF0ZSkgJiYgIXRhc2suY2hlY2tlZCkge1xuICAgICAgICAgIG51bWJlck9mVGFza3MgKz0gMTtcbiAgICAgICAgICBjb25zdCBwcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgW2RhdGEtcHJvamVjdD0nJHtkYXNoYm9hcmQuaW5kZXhPZihwcm9qZWN0KX0nXWBcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJvdmVyZHVlXCIpO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50Q2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3guY2xhc3NMaXN0LmFkZChcImNoZWNrYm94XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gpO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS10aXRsZVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudFRpdGxlKTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50RHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWR1ZS1kYXRlXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50RHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudER1ZURhdGUpO1xuICAgICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50KTtcblxuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgICAgdGFzay5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIG92ZXJkdWVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICAgICAgICAgIHBhcnNlSW50KG92ZXJkdWVFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFza3NcIikpIC0gMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHByb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICBwYXJzZUludChwcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKGlzVG9kYXkodGFzay5kdWVEYXRlKSkge1xuICAgICAgICAgICAgICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgICBwYXJzZUludChkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpICsgMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0RWxlbWVudCwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdEVsZW1lbnQsIGZhbHNlKTtcbiAgICAgICAgICAgIGNyZWF0ZU92ZXJkdWVUYXNrc0NvdW50KCk7XG4gICAgICAgICAgICB0YXNrcy5yZW1vdmVDaGlsZChuZXdUYXNrRWxlbWVudCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjcmVhdGVEZXNjcmlwdGlvbihcbiAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LFxuICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRUaXRsZSxcbiAgICAgICAgICAgIHRhc2suZGVzY3JpcHRpb25cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgb3ZlcmR1ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG92ZXJkdWVGdW5jdGlvbmFsaXR5KTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIG92ZXJkdWVGdW5jdGlvbmFsaXR5KTtcbiAgb3ZlcmR1ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS10YXNrc1wiLCBudW1iZXJPZlRhc2tzKTtcbiAgbGV0IG92ZXJkdWVFbGVtZW50VGl0bGUgPSBvdmVyZHVlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLnNpZGViYXItaXRlbS10aXRsZVwiXG4gICkudGV4dENvbnRlbnQ7XG4gIG92ZXJkdWVFbGVtZW50VGl0bGUgPSBgJHtvdmVyZHVlRWxlbWVudFRpdGxlfSAoJHtudW1iZXJPZlRhc2tzfSlgO1xuICBvdmVyZHVlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKS50ZXh0Q29udGVudCA9XG4gICAgb3ZlcmR1ZUVsZW1lbnRUaXRsZTtcbiAgY3JlYXRlT3ZlcmR1ZVRhc2tzQ291bnQoKTtcbn07XG5cbmV4cG9ydCB7IGlzVG9kYXksIGR1ZVRvZGF5LCBpc092ZXJkdWUsIG92ZXJkdWUgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IGNyZWF0ZURyb3Bkb3duSGlkZXIsIGFkZEVkaXRCdXR0b25zIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWNvbXBvbmVudHNcIjtcbmltcG9ydCBtb2RhbENvbnRyb2xzIGZyb20gXCIuL21vZGFsLWNvbnRyb2xzXCI7XG5pbXBvcnQgeyBkdWVUb2RheSwgb3ZlcmR1ZSB9IGZyb20gXCIuL3RpbWVcIjtcblxuY3JlYXRlRHJvcGRvd25IaWRlcigpO1xuYWRkRWRpdEJ1dHRvbnMoKTtcbm1vZGFsQ29udHJvbHMoKTtcbmR1ZVRvZGF5KCk7XG5vdmVyZHVlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=