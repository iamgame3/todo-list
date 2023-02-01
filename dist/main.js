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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createProjectCompletion);


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
      const parentItem = removeOption.closest(".item");
      if (parentItem.nextSibling.classList.contains("todo-item-description")) {
        parentItem.nextSibling.remove();
      }
      parentItem.remove();
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
  (0,_project_components__WEBPACK_IMPORTED_MODULE_0__["default"])(project);
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
      if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.today)(dueDate)) {
        const dueToday = document.querySelector(".sidebar-item-today");
        dueToday.setAttribute(
          "data-completed",
          parseInt(dueToday.getAttribute("data-completed")) - 1
        );
        (0,_project_components__WEBPACK_IMPORTED_MODULE_0__["default"])(project, true);
      } else (0,_project_components__WEBPACK_IMPORTED_MODULE_0__["default"])(project, false);
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
      if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.today)(dueDate)) {
        const dueToday = document.querySelector(".sidebar-item-today");
        dueToday.setAttribute(
          "data-completed",
          parseInt(dueToday.getAttribute("data-completed")) + 1
        );
        (0,_project_components__WEBPACK_IMPORTED_MODULE_0__["default"])(project, true);
      } else (0,_project_components__WEBPACK_IMPORTED_MODULE_0__["default"])(project, false);
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
  if ((0,_time__WEBPACK_IMPORTED_MODULE_2__.today)(dueDate)) {
    const dueToday = document.querySelector(".sidebar-item-today");
    dueToday.setAttribute(
      "data-tasks",
      parseInt(dueToday.getAttribute("data-tasks")) + 1
    );
    (0,_project_components__WEBPACK_IMPORTED_MODULE_0__["default"])(false, true);
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
/* harmony export */   "today": () => (/* binding */ today)
/* harmony export */ });
/* harmony import */ var _project_task_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project-task-logic */ "./src/project-task-logic.js");
/* harmony import */ var _project_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-components */ "./src/project-components.js");
/* harmony import */ var _task_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task-components */ "./src/task-components.js");
/* eslint-disable radix */




const today = (task) => {
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
  if (task.includes(todaysDate)) return true;
  return false;
};

const dueToday = () => {
  const dueTodayElement = document.querySelector(".sidebar-item-today");
  let numberOfTasks = 0;
  let numberOfCompletedTasks = 0;
  const dueTodayFunctionality = () => {
    const tasks = document.querySelector(".todo-items");
    tasks.replaceChildren();
    _project_task_logic__WEBPACK_IMPORTED_MODULE_0__.dashboard.forEach((project) => {
      project.forEach((task) => {
        if (today(task.dueDate)) {
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
              (0,_project_components__WEBPACK_IMPORTED_MODULE_1__["default"])(projectElement, true);
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
              (0,_project_components__WEBPACK_IMPORTED_MODULE_1__["default"])(projectElement, true);
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
  (0,_project_components__WEBPACK_IMPORTED_MODULE_1__["default"])(false, true);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDZmdGO0FBQ25DO0FBQ1g7O0FBRWxDLDZFQUFtQjtBQUNuQix3RUFBYztBQUNkLDJEQUFhO0FBQ2IsK0NBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kYWwtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QtY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC1jcmVhdGlvbi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC10YXNrLWNvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QtdGFzay1sb2dpYy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay1jb21wb25lbnRzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLWNyZWF0aW9uLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90aW1lLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCBjcmVhdGVOZXdQcm9qZWN0IGZyb20gXCIuL3Byb2plY3QtY3JlYXRpb25cIjtcbmltcG9ydCB7IGRhc2hib2FyZCB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1sb2dpY1wiO1xuaW1wb3J0IHsgY3JlYXRlTmV3VGFzayB9IGZyb20gXCIuL3Rhc2stY3JlYXRpb25cIjtcblxuY29uc3QgdmFsaWRpdHlDaGVjayA9IChpbnB1dCkgPT4gaW5wdXQudmFsaWRpdHkudmFsaWQ7XG5cbi8vIENyZWF0ZSBvcGVuL2Nsb3NlIGNvbnRyb2xzIGZvciBhbGwgbW9kYWxzXG5jb25zdCBtb2RhbENvbnRyb2xzID0gKCkgPT4ge1xuICBjb25zdCBhZGROZXdQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdFwiKTtcbiAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW1vZGFsXCIpO1xuICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWVkaXQtbW9kYWxcIik7XG4gIGNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1tb2RhbFwiKTtcbiAgY29uc3QgdGFza0VkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LW1vZGFsXCIpO1xuICBjb25zdCBwcm9qZWN0Q2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtY2xvc2UtYnV0dG9uXCIpO1xuICBjb25zdCBwcm9qZWN0RWRpdENsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi5wcm9qZWN0LWVkaXQtY2xvc2UtYnV0dG9uXCJcbiAgKTtcbiAgY29uc3QgdGFza0Nsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNsb3NlLWJ1dHRvblwiKTtcbiAgY29uc3QgdGFza0VkaXRDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LWNsb3NlLWJ1dHRvblwiKTtcbiAgY29uc3QgcHJvamVjdFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zdWJtaXQtYnV0dG9uXCIpO1xuICBjb25zdCB0YXNrU3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXN1Ym1pdC1idXR0b25cIik7XG5cbiAgYWRkTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpLnJlc2V0KCk7XG4gICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfSk7XG5cbiAgcHJvamVjdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9KTtcblxuICBwcm9qZWN0RWRpdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcHJvamVjdEVkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgdGFza0Nsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9KTtcblxuICB0YXNrRWRpdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGFza0VkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgcHJvamVjdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBwcm9qZWN0TW9kYWwpIHtcbiAgICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHByb2plY3RFZGl0TW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IHByb2plY3RFZGl0TW9kYWwpIHtcbiAgICAgIHByb2plY3RFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcblxuICB0YXNrTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IHRhc2tNb2RhbCkge1xuICAgICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG5cbiAgdGFza0VkaXRNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGFza0VkaXRNb2RhbCkge1xuICAgICAgdGFza0VkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHByb2plY3RTdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0TW9kYWxJbnB1dHMgPSBBcnJheS5mcm9tKFxuICAgICAgcHJvamVjdE1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKVxuICAgICk7XG4gICAgaWYgKHByb2plY3RNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgY3JlYXRlTmV3UHJvamVjdCgpO1xuICAgICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG5cbiAgdGFza1N1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tNb2RhbElucHV0cyA9IEFycmF5LmZyb20odGFza01vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKSk7XG4gICAgaWYgKHRhc2tNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgY29uc3QgdG9kb0l0ZW1zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICAgICAgY29uc3QgcHJvamVjdCA9XG4gICAgICAgIGRhc2hib2FyZFtwYXJzZUludCh0b2RvSXRlbXNDb250YWluZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV07XG4gICAgICBjcmVhdGVOZXdUYXNrKHByb2plY3QpO1xuICAgICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtb2RhbENvbnRyb2xzO1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCB7IGRhc2hib2FyZCB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1sb2dpY1wiO1xuXG4vLyBBZGQgcHJvamVjdCBjb21wbGV0aW9uIHN0YXR1c1xuY29uc3QgY3JlYXRlUHJvamVjdENvbXBsZXRpb24gPSAocHJvamVjdCwgZHVlVG9kYXkpID0+IHtcbiAgY29uc3Qgb2xkQ29tcGxldGlvbiA9IC9cXChcXGQqXFwvXFxkKlxcKS87XG4gIGlmIChwcm9qZWN0KSB7XG4gICAgY29uc3QgdGFza3MgPVxuICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKV0ubGVuZ3RoO1xuICAgIGNvbnN0IGNvbXBsZXRlZFRhc2tzID0gcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSk7XG4gICAgbGV0IHRpdGxlID0gcHJvamVjdC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBjb21wbGV0aW9uSW5kZXggPSB0aXRsZS5zZWFyY2gob2xkQ29tcGxldGlvbikgLSAxO1xuICAgIHRpdGxlID0gdGl0bGUuc3Vic3RyaW5nKDAsIGNvbXBsZXRpb25JbmRleCk7XG4gICAgdGl0bGUgPSBgJHt0aXRsZX0gKCR7Y29tcGxldGVkVGFza3N9LyR7dGFza3N9KWA7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgcHJvamVjdC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10aXRsZVwiKS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICB9XG4gIGlmIChkdWVUb2RheSkge1xuICAgIGNvbnN0IGR1ZVRvZGF5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRvZGF5XCIpO1xuICAgIGxldCBkdWVUb2RheVRpdGxlID0gZHVlVG9kYXlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIlxuICAgICkudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgZHVlVG9kYXlUYXNrcyA9IHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKTtcbiAgICBjb25zdCBkdWVUb2RheUNvbXBsZXRlZFRhc2tzID0gcGFyc2VJbnQoXG4gICAgICBkdWVUb2RheUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIilcbiAgICApO1xuICAgIGNvbnN0IGR1ZVRvZGF5Q29tcGxldGlvbkluZGV4ID0gZHVlVG9kYXlUaXRsZS5zZWFyY2gob2xkQ29tcGxldGlvbikgLSAxO1xuICAgIGR1ZVRvZGF5VGl0bGUgPSBkdWVUb2RheVRpdGxlLnN1YnN0cmluZygwLCBkdWVUb2RheUNvbXBsZXRpb25JbmRleCk7XG4gICAgZHVlVG9kYXlUaXRsZSA9IGAke2R1ZVRvZGF5VGl0bGV9ICgke2R1ZVRvZGF5Q29tcGxldGVkVGFza3N9LyR7ZHVlVG9kYXlUYXNrc30pYDtcbiAgICBkdWVUb2RheUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIikudGV4dENvbnRlbnQgPVxuICAgICAgZHVlVG9kYXlUaXRsZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUHJvamVjdENvbXBsZXRpb247XG4iLCJpbXBvcnQgeyBkYXNoYm9hcmQsIG5ld1Byb2plY3QgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcbmltcG9ydCB7IGFkZEVkaXRCdXR0b25zLCByZXNldFRvZG9MaXN0IH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWNvbXBvbmVudHNcIjtcblxuY29uc3QgY3JlYXRlQWRkTmV3UHJvamVjdEVsZW1lbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHNpZGViYXJJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtc1wiKTtcbiAgY29uc3Qgb2xkQWRkTmV3UHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0XCIpO1xuICBvbGRBZGROZXdQcm9qZWN0RWxlbWVudC5yZW1vdmUoKTtcbiAgY29uc3QgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2lkZWJhci1pdGVtLWFkZFwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJuZXctcHJvamVjdFwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgY29uc3QgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSBcIisgQWRkIE5ldyBQcm9qZWN0XCI7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKG5ld0FkZE5ld1Byb2plY3RFbGVtZW50VGl0bGUpO1xuICBzaWRlYmFySXRlbXMuYXBwZW5kQ2hpbGQobmV3QWRkTmV3UHJvamVjdEVsZW1lbnQpO1xuXG4gIGNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1tb2RhbFwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybVwiKS5yZXNldCgpO1xuICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlTmV3UHJvamVjdEVsZW1lbnQgPSAodGl0bGUpID0+IHtcbiAgY29uc3Qgc2lkZWJhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW1zXCIpO1xuICBjb25zdCBuZXdQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Byb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyLWl0ZW1cIik7XG4gIG5ld1Byb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgZGFzaGJvYXJkLmxlbmd0aCAtIDEpO1xuICBuZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiLCAwKTtcbiAgY29uc3QgbmV3UHJvamVjdEVsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Byb2plY3RFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInNpZGViYXItaXRlbS10aXRsZVwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IGAke3RpdGxlfSAoMC8wKWA7XG4gIG5ld1Byb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Byb2plY3RFbGVtZW50VGl0bGUpO1xuICBzaWRlYmFySXRlbXMuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEVsZW1lbnQpO1xuXG4gIGFkZEVkaXRCdXR0b25zKCk7XG5cbiAgbmV3UHJvamVjdEVsZW1lbnRUaXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICAgIGNvbnN0IHByb2plY3ROdW1iZXIgPSBuZXdQcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIik7XG4gICAgdGFza3Muc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIsIHByb2plY3ROdW1iZXIpO1xuICAgIHRhc2tzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIHJlc2V0VG9kb0xpc3QocHJvamVjdE51bWJlcik7XG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlTmV3UHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbmFtZVwiKS52YWx1ZTtcbiAgbmV3UHJvamVjdCgpO1xuICBjcmVhdGVOZXdQcm9qZWN0RWxlbWVudCh0aXRsZSk7XG4gIGNyZWF0ZUFkZE5ld1Byb2plY3RFbGVtZW50KCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVOZXdQcm9qZWN0O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbmltcG9ydCBlZGl0SWNvblNyYyBmcm9tIFwiLi9pY29ucy9kb3RzLXZlcnRpY2FsLnN2Z1wiO1xuaW1wb3J0IHsgZGFzaGJvYXJkIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWxvZ2ljXCI7XG5pbXBvcnQgY3JlYXRlRGVzY3JpcHRpb24gZnJvbSBcIi4vdGFzay1jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBjcmVhdGVOZXdUYXNrRWxlbWVudCwgY3JlYXRlQWRkTmV3VGFza0VsZW1lbnQgfSBmcm9tIFwiLi90YXNrLWNyZWF0aW9uXCI7XG5cbmNvbnN0IHZhbGlkaXR5Q2hlY2sgPSAoaW5wdXQpID0+IGlucHV0LnZhbGlkaXR5LnZhbGlkO1xuXG4vLyBDcmVhdGUgZXZlbnQgbGlzdGVuZXJzIHRvIGhpZGUgdGhlIGRyb3Bkb3duIG1lbnVzIHdoZW4gb3RoZXIgc3R1ZmYgaXMgY2xpY2tlZCBvblxuY29uc3QgY3JlYXRlRHJvcGRvd25IaWRlciA9ICgpID0+IHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoXG4gICAgICAhZXZlbnQudGFyZ2V0Lm1hdGNoZXMoXCIuZHJvcGRvd24tY29udGVudFwiKSAmJlxuICAgICAgIWV2ZW50LnRhcmdldC5tYXRjaGVzKFwiLmVkaXQtYnV0dG9uXCIpXG4gICAgKSB7XG4gICAgICBjb25zdCBkcm9wZG93bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRyb3Bkb3duLWNvbnRlbnRcIik7XG4gICAgICBkcm9wZG93bnMuZm9yRWFjaCgoZHJvcGRvd24pID0+IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGRyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG5cbi8vIENyZWF0ZSBlZGl0IG9wdGlvbiBmdW5jdGlvbmFsaXR5XG5jb25zdCBlZGl0RnVuY3Rpb25hbGl0eSA9IChpdGVtKSA9PiB7XG4gIGNvbnN0IHByb2plY3ROdW1iZXIgPSBwYXJzZUludChcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpXG4gICk7XG4gIGlmIChpdGVtLmNsYXNzTGlzdC5jb250YWlucyhcInNpZGViYXItaXRlbVwiKSkge1xuICAgIGNvbnN0IGl0ZW1UaXRsZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdGl0bGVcIik7XG4gICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1lZGl0LW1vZGFsXCIpO1xuICAgIGNvbnN0IHByb2plY3RFZGl0TW9kYWxUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1uYW1lLWVkaXRcIik7XG4gICAgY29uc3QgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgXCJwcm9qZWN0LWVkaXQtc3VibWl0LWJ1dHRvblwiXG4gICAgKTtcbiAgICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsU3VibWl0QnV0dG9uQ2xvbmUgPVxuICAgICAgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgcHJvamVjdEVkaXRNb2RhbFRpdGxlLnZhbHVlID0gaXRlbVRpdGxlLnRleHRDb250ZW50O1xuXG4gICAgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbi5yZXBsYWNlV2l0aChwcm9qZWN0RWRpdE1vZGFsU3VibWl0QnV0dG9uQ2xvbmUpO1xuXG4gICAgcHJvamVjdEVkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBwcm9qZWN0RWRpdE1vZGFsSW5wdXRzID0gQXJyYXkuZnJvbShcbiAgICAgICAgcHJvamVjdEVkaXRNb2RhbC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIilcbiAgICAgICk7XG4gICAgICBpZiAocHJvamVjdEVkaXRNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgICBpdGVtVGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0RWRpdE1vZGFsVGl0bGUudmFsdWU7XG4gICAgICAgIHByb2plY3RFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaXRlbVByaW9yaXR5ID0gaXRlbS5maXJzdENoaWxkO1xuICAgIGNvbnN0IGl0ZW1UaXRsZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIik7XG4gICAgY29uc3QgdGFza1RvRWRpdCA9XG4gICAgICBkYXNoYm9hcmRbcHJvamVjdE51bWJlcl1bcGFyc2VJbnQoaXRlbS5maXJzdENoaWxkLnRleHRDb250ZW50KSAtIDFdO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZWRpdC1tb2RhbFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGUtZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsUHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5LWVkaXRcIik7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbERlc2NyaXB0aW9uID1cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb24tZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBcInRhc2stZWRpdC1zdWJtaXQtYnV0dG9uXCJcbiAgICApO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b25DbG9uZSA9XG4gICAgICB0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uLmNsb25lTm9kZSh0cnVlKTtcbiAgICB0YXNrRWRpdE1vZGFsVGl0bGUudmFsdWUgPSB0YXNrVG9FZGl0LnRpdGxlO1xuICAgIHRhc2tFZGl0TW9kYWxEYXRlLnZhbHVlID0gdGFza1RvRWRpdC5kdWVEYXRlO1xuICAgIHRhc2tFZGl0TW9kYWxQcmlvcml0eS52YWx1ZSA9IHRhc2tUb0VkaXQucHJpb3JpdHk7XG4gICAgdGFza0VkaXRNb2RhbERlc2NyaXB0aW9uLnZhbHVlID0gdGFza1RvRWRpdC5kZXNjcmlwdGlvbjtcblxuICAgIHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b24ucmVwbGFjZVdpdGgodGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lKTtcblxuICAgIHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b25DbG9uZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgdGFza0VkaXRNb2RhbElucHV0cyA9IEFycmF5LmZyb20oXG4gICAgICAgIHRhc2tFZGl0TW9kYWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpXG4gICAgICApO1xuICAgICAgaWYgKHRhc2tFZGl0TW9kYWxJbnB1dHMuZXZlcnkodmFsaWRpdHlDaGVjaykpIHtcbiAgICAgICAgdGFza1RvRWRpdC50aXRsZSA9IHRhc2tFZGl0TW9kYWxUaXRsZS52YWx1ZTtcbiAgICAgICAgdGFza1RvRWRpdC5kdWVEYXRlID0gdGFza0VkaXRNb2RhbERhdGUudmFsdWU7XG4gICAgICAgIHRhc2tUb0VkaXQucHJpb3JpdHkgPSB0YXNrRWRpdE1vZGFsUHJpb3JpdHkudmFsdWU7XG4gICAgICAgIHRhc2tUb0VkaXQuZGVzY3JpcHRpb24gPSB0YXNrRWRpdE1vZGFsRGVzY3JpcHRpb24udmFsdWU7XG4gICAgICAgIGl0ZW1Qcmlvcml0eS50ZXh0Q29udGVudCA9IGAke3Rhc2tUb0VkaXQucHJpb3JpdHl9LmA7XG4gICAgICAgIGl0ZW1UaXRsZS50ZXh0Q29udGVudCA9IHRhc2tUb0VkaXQudGl0bGU7XG4gICAgICAgIGNyZWF0ZURlc2NyaXB0aW9uKGl0ZW0sIGl0ZW1UaXRsZSwgdGFza1RvRWRpdC5kZXNjcmlwdGlvbik7XG4gICAgICAgIHRhc2tFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIEFkZCBlZGl0IGJ1dHRvbnMgdG8gcHJvamVjdHMgYW5kIHRhc2tzXG5jb25zdCBhZGRFZGl0QnV0dG9ucyA9ICgpID0+IHtcbiAgLy8gTWFrZSBhbiBlZGl0IGJ1dHRvblxuICBjb25zdCBhZGRFZGl0QnV0dG9uID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBlZGl0SWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIGNvbnN0IGVkaXREcm9wZG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZWRpdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgcmVtb3ZlT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBlZGl0SWNvbi5zcmMgPSBlZGl0SWNvblNyYztcbiAgICBlZGl0SWNvbi5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgXCJWZXJ0aWNhbCBkb3R0ZWQgbGluZSBpY29uIGZvciBlZGl0IG9wdGlvbnMuXCIpO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG4gICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImVkaXQtYnV0dG9uXCIpO1xuICAgIGVkaXREcm9wZG93bi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24tY29udGVudFwiKTtcbiAgICBlZGl0RHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgZWRpdE9wdGlvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuICAgIGVkaXRPcHRpb24uY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWl0ZW1cIik7XG4gICAgZWRpdE9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImVkaXQtYnV0dG9uXCIpO1xuICAgIGVkaXRPcHRpb24uc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICByZW1vdmVPcHRpb24udGV4dENvbnRlbnQgPSBcIlJlbW92ZVwiO1xuICAgIHJlbW92ZU9wdGlvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbVwiKTtcbiAgICByZW1vdmVPcHRpb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJyZW1vdmUtYnV0dG9uXCIpO1xuICAgIHJlbW92ZU9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGVkaXREcm9wZG93bi5hcHBlbmRDaGlsZChlZGl0T3B0aW9uKTtcbiAgICBlZGl0RHJvcGRvd24uYXBwZW5kQ2hpbGQocmVtb3ZlT3B0aW9uKTtcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ1dHRvblwiKTtcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93blwiKTtcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRJY29uKTtcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXREcm9wZG93bik7XG4gICAgaXRlbS5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblxuICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChlZGl0RHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9PT0gXCJoaWRkZW5cIikge1xuICAgICAgICBlZGl0RHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfSBlbHNlIGVkaXREcm9wZG93bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9KTtcblxuICAgIGNvbnN0IHByb2plY3RFZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtZWRpdC1tb2RhbFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWVkaXQtbW9kYWxcIik7XG5cbiAgICBlZGl0T3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRJdGVtID0gZWRpdE9wdGlvbi5jbG9zZXN0KFwiLml0ZW1cIik7XG4gICAgICBpZiAocGFyZW50SXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaWRlYmFyLWl0ZW1cIikpIHtcbiAgICAgICAgZWRpdEZ1bmN0aW9uYWxpdHkocGFyZW50SXRlbSk7XG4gICAgICAgIHByb2plY3RFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWRpdEZ1bmN0aW9uYWxpdHkocGFyZW50SXRlbSk7XG4gICAgICAgIHRhc2tFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVtb3ZlT3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRJdGVtID0gcmVtb3ZlT3B0aW9uLmNsb3Nlc3QoXCIuaXRlbVwiKTtcbiAgICAgIGlmIChwYXJlbnRJdGVtLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKSkge1xuICAgICAgICBwYXJlbnRJdGVtLm5leHRTaWJsaW5nLnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgcGFyZW50SXRlbS5yZW1vdmUoKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBSZW1vdmUgYWxsIGVkaXQgYnV0dG9ucyBhbmQgdGhlbiBtYWtlIGFuIGVkaXQgYnV0dG9uIGZvciBldmVyeSBwcm9qZWN0IGFuZCB0YXNrXG4gIGNvbnN0IGVkaXRCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lZGl0LWJ1dHRvblwiKTtcbiAgZWRpdEJ1dHRvbnMuZm9yRWFjaCgoZWRpdEJ1dHRvbikgPT4gZWRpdEJ1dHRvbi5yZW1vdmUoKSk7XG4gIGNvbnN0IHRlc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2lkZWJhci1pdGVtXCIpO1xuICBjb25zdCB0ZXN0SXRlbXMyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWl0ZW1cIik7XG4gIHRlc3RJdGVtcy5mb3JFYWNoKCh0ZXN0SXRlbSkgPT4gYWRkRWRpdEJ1dHRvbih0ZXN0SXRlbSkpO1xuICB0ZXN0SXRlbXMyLmZvckVhY2goKHRlc3RJdGVtKSA9PiBhZGRFZGl0QnV0dG9uKHRlc3RJdGVtKSk7XG59O1xuXG5jb25zdCByZXNldFRvZG9MaXN0ID0gKHByb2plY3ROdW1iZXIpID0+IHtcbiAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gIHRhc2tzLnJlcGxhY2VDaGlsZHJlbigpO1xuICBkYXNoYm9hcmRbcHJvamVjdE51bWJlcl0uZm9yRWFjaCgodGFzaykgPT4ge1xuICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IHRhc2sucHJpb3JpdHk7XG4gICAgY29uc3QgdGFza1RpdGxlID0gdGFzay50aXRsZTtcbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IHRhc2suZHVlRGF0ZTtcbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHRhc2tDaGVja2VkID0gdGFzay5jaGVja2VkO1xuXG4gICAgY3JlYXRlTmV3VGFza0VsZW1lbnQoXG4gICAgICB0YXNrUHJpb3JpdHksXG4gICAgICB0YXNrVGl0bGUsXG4gICAgICB0YXNrRHVlRGF0ZSxcbiAgICAgIHRhc2tEZXNjcmlwdGlvbixcbiAgICAgIHRhc2tDaGVja2VkXG4gICAgKTtcbiAgfSk7XG4gIGNyZWF0ZUFkZE5ld1Rhc2tFbGVtZW50KCk7XG59O1xuXG5leHBvcnQge1xuICBjcmVhdGVEcm9wZG93bkhpZGVyLFxuICBlZGl0RnVuY3Rpb25hbGl0eSxcbiAgYWRkRWRpdEJ1dHRvbnMsXG4gIHJlc2V0VG9kb0xpc3QsXG59O1xuIiwiY29uc3QgZGFzaGJvYXJkID0gW107XG5cbmNvbnN0IG5ld1Byb2plY3QgPSAoKSA9PiB7XG4gIGRhc2hib2FyZC5wdXNoKFtdKTtcbn07XG5cbmNvbnN0IG5ld1Rhc2sgPSAoXG4gIHByb2plY3QsXG4gIHRpdGxlLFxuICBkdWVEYXRlLFxuICBwcmlvcml0eSxcbiAgZGVzY3JpcHRpb24sXG4gIGNoZWNrZWQsXG4gIGV4aXN0c1xuKSA9PiB7XG4gIGlmIChleGlzdHMpIHtcbiAgICBwcm9qZWN0LnNwbGljZShwcmlvcml0eSAtIDEsIDAsIHtcbiAgICAgIHRpdGxlLFxuICAgICAgZHVlRGF0ZSxcbiAgICAgIHByaW9yaXR5LFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBjaGVja2VkLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHByb2plY3QucHVzaCh7XG4gICAgICB0aXRsZSxcbiAgICAgIGR1ZURhdGUsXG4gICAgICBwcmlvcml0eSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY2hlY2tlZCxcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHsgZGFzaGJvYXJkLCBuZXdQcm9qZWN0LCBuZXdUYXNrIH07XG4iLCIvLyBDcmVhdGUgdGFzayBkZXNjcmlwdGlvbiBtYWtlclxuY29uc3QgY3JlYXRlRGVzY3JpcHRpb24gPSAodGFzaywgdGFza1RpdGxlLCBkZXNjcmlwdGlvbikgPT4ge1xuICBpZiAodGFzay5uZXh0U2libGluZykge1xuICAgIGlmICh0YXNrLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKSlcbiAgICAgIHRhc2submV4dFNpYmxpbmcucmVtb3ZlKCk7XG4gIH1cbiAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gIGNvbnN0IHRhc2tUaXRsZUNsb25lID0gdGFza1RpdGxlLmNsb25lTm9kZSh0cnVlKTtcbiAgdGFza1RpdGxlLnJlcGxhY2VXaXRoKHRhc2tUaXRsZUNsb25lKTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKTtcbiAgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xuICBsZXQgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvblNob3duID0gZmFsc2U7XG5cbiAgdGFza1RpdGxlQ2xvbmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAobmV3VGFza0VsZW1lbnREZXNjcmlwdGlvblNob3duKSB7XG4gICAgICB0YXNrcy5yZW1vdmVDaGlsZChuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uKTtcbiAgICAgIG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb25TaG93biA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXNrLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb24pO1xuICAgICAgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvblNob3duID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRGVzY3JpcHRpb247XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByYWRpeCAqL1xuaW1wb3J0IGNyZWF0ZVByb2plY3RDb21wbGV0aW9uIGZyb20gXCIuL3Byb2plY3QtY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgZGFzaGJvYXJkLCBuZXdUYXNrIH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWxvZ2ljXCI7XG5pbXBvcnQgeyB0b2RheSB9IGZyb20gXCIuL3RpbWVcIjtcbmltcG9ydCBjcmVhdGVEZXNjcmlwdGlvbiBmcm9tIFwiLi90YXNrLWNvbXBvbmVudHNcIjtcbmltcG9ydCB7IGFkZEVkaXRCdXR0b25zLCByZXNldFRvZG9MaXN0IH0gZnJvbSBcIi4vcHJvamVjdC10YXNrLWNvbXBvbmVudHNcIjtcblxuY29uc3QgY3JlYXRlQWRkTmV3VGFza0VsZW1lbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHRvZG9JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgY29uc3Qgb2xkQWRkTmV3VGFza0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy10YXNrXCIpO1xuICBpZiAob2xkQWRkTmV3VGFza0VsZW1lbnQgIT09IG51bGwpIG9sZEFkZE5ld1Rhc2tFbGVtZW50LnJlbW92ZSgpO1xuICBjb25zdCBuZXdBZGROZXdUYXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tYWRkXCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm5ldy10YXNrXCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICBjb25zdCBuZXdBZGROZXdUYXNrRWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IFwiKyBBZGQgTmV3IFRhc2tcIjtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3QWRkTmV3VGFza0VsZW1lbnRUaXRsZSk7XG4gIHRvZG9JdGVtcy5hcHBlbmRDaGlsZChuZXdBZGROZXdUYXNrRWxlbWVudCk7XG5cbiAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLW1vZGFsXCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtXCIpLnJlc2V0KCk7XG4gICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdUYXNrRWxlbWVudCA9IChcbiAgcHJpb3JpdHksXG4gIHRpdGxlLFxuICBkdWVEYXRlLFxuICBkZXNjcmlwdGlvbixcbiAgY2hlY2tlZFxuKSA9PiB7XG4gIGNvbnN0IHRvZG9JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYFtkYXRhLXByb2plY3Q9JyR7dG9kb0l0ZW1zLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKX0nXWBcbiAgKTtcbiAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdCk7XG4gIGNvbnN0IG5ld1Rhc2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbVwiKTtcbiAgbmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcIml0ZW1cIik7XG4gIGNvbnN0IG5ld1Rhc2tFbGVtZW50UHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdUYXNrRWxlbWVudFByaW9yaXR5LnRleHRDb250ZW50ID0gYCR7cHJpb3JpdHl9LmA7XG4gIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50UHJpb3JpdHkpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudENoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5jbGFzc0xpc3QuYWRkKFwiY2hlY2tib3hcIik7XG4gIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLXRpdGxlXCIpO1xuICBuZXdUYXNrRWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG4gIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50VGl0bGUpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdUYXNrRWxlbWVudER1ZURhdGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1kdWUtZGF0ZVwiKTtcbiAgbmV3VGFza0VsZW1lbnREdWVEYXRlLnRleHRDb250ZW50ID0gZHVlRGF0ZTtcbiAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnREdWVEYXRlKTtcbiAgdG9kb0l0ZW1zLmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50KTtcblxuICBpZiAoY2hlY2tlZCkge1xuICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIuKck1wiO1xuICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICB9XG5cbiAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWNoZWNrZWRcIilcbiAgICApIHtcbiAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICBkYXNoYm9hcmRbcGFyc2VJbnQodG9kb0l0ZW1zLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldW1xuICAgICAgICBwcmlvcml0eSAtIDFcbiAgICAgIF0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgcHJvamVjdC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgcGFyc2VJbnQocHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgICApO1xuICAgICAgaWYgKHRvZGF5KGR1ZURhdGUpKSB7XG4gICAgICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgICAgIGR1ZVRvZGF5LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXkuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIikpIC0gMVxuICAgICAgICApO1xuICAgICAgICBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCB0cnVlKTtcbiAgICAgIH0gZWxzZSBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbihwcm9qZWN0LCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwi4pyTXCI7XG4gICAgICBkYXNoYm9hcmRbcGFyc2VJbnQodG9kb0l0ZW1zLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldW1xuICAgICAgICBwcmlvcml0eSAtIDFcbiAgICAgIF0uY2hlY2tlZCA9IHRydWU7XG4gICAgICBwcm9qZWN0LnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICBwYXJzZUludChwcm9qZWN0LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSArIDFcbiAgICAgICk7XG4gICAgICBpZiAodG9kYXkoZHVlRGF0ZSkpIHtcbiAgICAgICAgY29uc3QgZHVlVG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbS10b2RheVwiKTtcbiAgICAgICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgKyAxXG4gICAgICAgICk7XG4gICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIHRydWUpO1xuICAgICAgfSBlbHNlIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3QsIGZhbHNlKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNyZWF0ZURlc2NyaXB0aW9uKG5ld1Rhc2tFbGVtZW50LCBuZXdUYXNrRWxlbWVudFRpdGxlLCBkZXNjcmlwdGlvbik7XG4gIGFkZEVkaXRCdXR0b25zKCk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdUYXNrID0gKHByb2plY3QpID0+IHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tcIikudmFsdWU7XG4gIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKS52YWx1ZTtcbiAgZHVlRGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2UoZHVlRGF0ZSkpO1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHdlZWtkYXk6IFwic2hvcnRcIixcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICBtb250aDogXCJzaG9ydFwiLFxuICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgaG91cjogXCJudW1lcmljXCIsXG4gICAgbWludXRlOiBcIm51bWVyaWNcIixcbiAgfTtcbiAgZHVlRGF0ZSA9IGR1ZURhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFwiZW4tVVNcIiwgb3B0aW9ucyk7XG4gIGlmICh0b2RheShkdWVEYXRlKSkge1xuICAgIGNvbnN0IGR1ZVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gICAgZHVlVG9kYXkuc2V0QXR0cmlidXRlKFxuICAgICAgXCJkYXRhLXRhc2tzXCIsXG4gICAgICBwYXJzZUludChkdWVUb2RheS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIpKSArIDFcbiAgICApO1xuICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKGZhbHNlLCB0cnVlKTtcbiAgfVxuICBsZXQgcHJpb3JpdHkgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlKTtcbiAgaWYgKHByaW9yaXR5ID09PSAwKSBwcmlvcml0eSA9IDE7XG4gIGlmIChOdW1iZXIuaXNOYU4ocHJpb3JpdHkpKSBwcmlvcml0eSA9IEluZmluaXR5O1xuICBpZiAocHJpb3JpdHkgPiBwcm9qZWN0Lmxlbmd0aCArIDEpIHByaW9yaXR5ID0gcHJvamVjdC5sZW5ndGggKyAxO1xuICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICBpZiAoZGVzY3JpcHRpb24gPT09IFwiXCIpIGRlc2NyaXB0aW9uID0gXCJObyBkZXNjcmlwdGlvbiBhdmFpbGFibGUuXCI7XG4gIGNvbnN0IGNoZWNrZWQgPSBmYWxzZTtcbiAgbGV0IGV4aXN0cyA9IGZhbHNlO1xuICBpZiAocHJvamVjdFtwcmlvcml0eSAtIDFdKSB7XG4gICAgZXhpc3RzID0gdHJ1ZTtcbiAgICBuZXdUYXNrKHByb2plY3QsIHRpdGxlLCBkdWVEYXRlLCBwcmlvcml0eSwgZGVzY3JpcHRpb24sIGNoZWNrZWQsIGV4aXN0cyk7XG4gICAgcHJvamVjdC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIHRhc2sucHJpb3JpdHkgPSBwcm9qZWN0LmluZGV4T2YodGFzaykgKyAxO1xuICAgIH0pO1xuICAgIHJlc2V0VG9kb0xpc3QoZGFzaGJvYXJkLmluZGV4T2YocHJvamVjdCkpO1xuICB9IGVsc2Uge1xuICAgIG5ld1Rhc2socHJvamVjdCwgdGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBkZXNjcmlwdGlvbiwgY2hlY2tlZCwgZXhpc3RzKTtcbiAgICBjcmVhdGVOZXdUYXNrRWxlbWVudChwcmlvcml0eSwgdGl0bGUsIGR1ZURhdGUsIGRlc2NyaXB0aW9uLCBjaGVja2VkKTtcbiAgICBjcmVhdGVBZGROZXdUYXNrRWxlbWVudCgpO1xuICB9XG59O1xuXG5leHBvcnQgeyBjcmVhdGVBZGROZXdUYXNrRWxlbWVudCwgY3JlYXRlTmV3VGFza0VsZW1lbnQsIGNyZWF0ZU5ld1Rhc2sgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQgeyBkYXNoYm9hcmQgfSBmcm9tIFwiLi9wcm9qZWN0LXRhc2stbG9naWNcIjtcbmltcG9ydCBjcmVhdGVQcm9qZWN0Q29tcGxldGlvbiBmcm9tIFwiLi9wcm9qZWN0LWNvbXBvbmVudHNcIjtcbmltcG9ydCBjcmVhdGVEZXNjcmlwdGlvbiBmcm9tIFwiLi90YXNrLWNvbXBvbmVudHNcIjtcblxuY29uc3QgdG9kYXkgPSAodGFzaykgPT4ge1xuICBsZXQgdG9kYXlzRGF0ZSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgd2Vla2RheTogXCJzaG9ydFwiLFxuICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgZGF5OiBcIm51bWVyaWNcIixcbiAgfTtcbiAgdG9kYXlzRGF0ZSA9IHRvZGF5c0RhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFwiZW4tVVNcIiwgb3B0aW9ucyk7XG4gIGNvbnN0IGxhc3RDb21tYSA9IHRvZGF5c0RhdGUubGFzdEluZGV4T2YoXCIsXCIpO1xuICB0b2RheXNEYXRlID0gdG9kYXlzRGF0ZS5zdWJzdHJpbmcoMCwgbGFzdENvbW1hKTtcbiAgaWYgKHRhc2suaW5jbHVkZXModG9kYXlzRGF0ZSkpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBkdWVUb2RheSA9ICgpID0+IHtcbiAgY29uc3QgZHVlVG9kYXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW0tdG9kYXlcIik7XG4gIGxldCBudW1iZXJPZlRhc2tzID0gMDtcbiAgbGV0IG51bWJlck9mQ29tcGxldGVkVGFza3MgPSAwO1xuICBjb25zdCBkdWVUb2RheUZ1bmN0aW9uYWxpdHkgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gICAgdGFza3MucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgZGFzaGJvYXJkLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIHByb2plY3QuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICBpZiAodG9kYXkodGFzay5kdWVEYXRlKSkge1xuICAgICAgICAgIG51bWJlck9mVGFza3MgKz0gMTtcbiAgICAgICAgICBjb25zdCBwcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgW2RhdGEtcHJvamVjdD0nJHtkYXNoYm9hcmQuaW5kZXhPZihwcm9qZWN0KX0nXWBcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIpO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50Q2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3guY2xhc3NMaXN0LmFkZChcImNoZWNrYm94XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gpO1xuICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFbGVtZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS10aXRsZVwiKTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudFRpdGxlKTtcbiAgICAgICAgICBjb25zdCBuZXdUYXNrRWxlbWVudER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50RHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWR1ZS1kYXRlXCIpO1xuICAgICAgICAgIG5ld1Rhc2tFbGVtZW50RHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZTtcbiAgICAgICAgICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudER1ZURhdGUpO1xuICAgICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50KTtcblxuICAgICAgICAgIGlmICh0YXNrLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIuKck1wiO1xuICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWNoZWNrZWRcIik7XG4gICAgICAgICAgICBudW1iZXJPZkNvbXBsZXRlZFRhc2tzICs9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBuZXdUYXNrRWxlbWVudFxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLXRpdGxlXCIpXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgICAgICB0YXNrLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgIFwiZGF0YS1jb21wbGV0ZWRcIixcbiAgICAgICAgICAgICAgICBwYXJzZUludChwcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGR1ZVRvZGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbXBsZXRlZFwiKSkgLSAxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGNyZWF0ZVByb2plY3RDb21wbGV0aW9uKHByb2plY3RFbGVtZW50LCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtLXRpdGxlXCIpXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgICAgICAgICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwi4pyTXCI7XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgICAgICB0YXNrLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgXCJkYXRhLWNvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICAgIHBhcnNlSW50KHByb2plY3RFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSArIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgZHVlVG9kYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICBcImRhdGEtY29tcGxldGVkXCIsXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZHVlVG9kYXlFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29tcGxldGVkXCIpKSArIDFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24ocHJvamVjdEVsZW1lbnQsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY3JlYXRlRGVzY3JpcHRpb24oXG4gICAgICAgICAgICBuZXdUYXNrRWxlbWVudCxcbiAgICAgICAgICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUsXG4gICAgICAgICAgICB0YXNrLmRlc2NyaXB0aW9uXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG4gIGR1ZVRvZGF5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZHVlVG9kYXlGdW5jdGlvbmFsaXR5KTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGR1ZVRvZGF5RnVuY3Rpb25hbGl0eSk7XG4gIGR1ZVRvZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tzXCIsIG51bWJlck9mVGFza3MpO1xuICBkdWVUb2RheUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1jb21wbGV0ZWRcIiwgbnVtYmVyT2ZDb21wbGV0ZWRUYXNrcyk7XG4gIGxldCBkdWVUb2RheUVsZW1lbnRUaXRsZSA9IGR1ZVRvZGF5RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLnNpZGViYXItaXRlbS10aXRsZVwiXG4gICkudGV4dENvbnRlbnQ7XG4gIGR1ZVRvZGF5RWxlbWVudFRpdGxlID0gYCR7ZHVlVG9kYXlFbGVtZW50VGl0bGV9ICgke251bWJlck9mQ29tcGxldGVkVGFza3N9LyR7bnVtYmVyT2ZUYXNrc30pYDtcbiAgZHVlVG9kYXlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtLXRpdGxlXCIpLnRleHRDb250ZW50ID1cbiAgICBkdWVUb2RheUVsZW1lbnRUaXRsZTtcbiAgY3JlYXRlUHJvamVjdENvbXBsZXRpb24oZmFsc2UsIHRydWUpO1xufTtcblxuZXhwb3J0IHsgdG9kYXksIGR1ZVRvZGF5IH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgeyBjcmVhdGVEcm9wZG93bkhpZGVyLCBhZGRFZGl0QnV0dG9ucyB9IGZyb20gXCIuL3Byb2plY3QtdGFzay1jb21wb25lbnRzXCI7XG5pbXBvcnQgbW9kYWxDb250cm9scyBmcm9tIFwiLi9tb2RhbC1jb250cm9sc1wiO1xuaW1wb3J0IHsgZHVlVG9kYXkgfSBmcm9tIFwiLi90aW1lXCI7XG5cbmNyZWF0ZURyb3Bkb3duSGlkZXIoKTtcbmFkZEVkaXRCdXR0b25zKCk7XG5tb2RhbENvbnRyb2xzKCk7XG5kdWVUb2RheSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9