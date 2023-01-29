/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addEditButtons": () => (/* binding */ addEditButtons),
/* harmony export */   "createDropdownHider": () => (/* binding */ createDropdownHider),
/* harmony export */   "modalControls": () => (/* binding */ modalControls)
/* harmony export */ });
/* harmony import */ var _icons_dots_vertical_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons/dots-vertical.svg */ "./src/icons/dots-vertical.svg");
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic */ "./src/logic.js");
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

// Create edit option functionality
const editFunctionality = (item) => {
  const projectNumber = parseInt(
    document.querySelector(".todo-items").getAttribute("data-project")
  );
  if (item.classList.contains("sidebar-item")) {
    // const taskToEdit = item;
  } else {
    const itemPriority = item.firstChild;
    const itemTitle = item.querySelector(".todo-item-title");
    const taskToEdit =
      _logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectNumber][parseInt(item.firstChild.textContent) - 1];
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
        createDescription(item, itemTitle, taskToEdit.description);
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

    const projectModal = document.querySelector(".project-modal");
    const taskEditModal = document.querySelector(".task-edit-modal");

    editOption.addEventListener("click", () => {
      const parentItem = editOption.closest(".item");
      if (parentItem.classList.contains("sidebar-item")) {
        document.getElementById("task-form").reset();
        projectModal.style.visibility = "visible";
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

const createNewTaskElement = (priority, title, description, checked) => {
  const todoItems = document.querySelector(".todo-items");
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
      _logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[parseInt(todoItems.getAttribute("data-project"))][
        priority - 1
      ].checked = false;
    } else {
      newTaskElement
        .querySelector(".todo-item-title")
        .classList.add("todo-item-checked");
      newTaskElementCheckbox.textContent = "✓";
      _logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[parseInt(todoItems.getAttribute("data-project"))][
        priority - 1
      ].checked = true;
    }
  });

  createDescription(newTaskElement, newTaskElementTitle, description);
  addEditButtons();
};

const resetTodoList = (projectNumber) => {
  const tasks = document.querySelector(".todo-items");
  tasks.replaceChildren();
  _logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[projectNumber].forEach((task) => {
    const taskPriority = task.priority;
    const taskTitle = task.title;
    const taskDescription = task.description;
    const taskChecked = task.checked;

    createNewTaskElement(taskPriority, taskTitle, taskDescription, taskChecked);
  });
  createAddNewTaskElement();
};

const createNewProjectElement = (title) => {
  const sidebarItems = document.querySelector(".sidebar-items");
  const newProjectElement = document.createElement("div");
  newProjectElement.classList.add("sidebar-item");
  newProjectElement.classList.add("item");
  newProjectElement.setAttribute("data-project", _logic__WEBPACK_IMPORTED_MODULE_1__.dashboard.length - 1);
  const newProjectElementTitle = document.createElement("div");
  newProjectElementTitle.classList.add("sidebar-item-title");
  newProjectElementTitle.textContent = title;
  newProjectElement.appendChild(newProjectElementTitle);
  sidebarItems.appendChild(newProjectElement);

  addEditButtons();

  newProjectElementTitle.addEventListener("click", () => {
    const tasks = document.querySelector(".todo-items");
    const projectNumber = newProjectElement.getAttribute("data-project");
    tasks.setAttribute("data-project", projectNumber);
    tasks.replaceChildren();
    resetTodoList(projectNumber);
  });
};

const createNewProject = () => {
  const title = document.getElementById("project-name").value;
  (0,_logic__WEBPACK_IMPORTED_MODULE_1__.newProject)();
  createNewProjectElement(title);
  createAddNewProjectElement();
};

const createNewTask = (project) => {
  const title = document.getElementById("task").value;
  const dueDate = document.getElementById("due-date").value;
  let priority = parseInt(document.getElementById("priority").value);
  if (priority === 0) priority = 1;
  if (priority > project.length + 1) priority = project.length + 1;
  let description = document.getElementById("description").value;
  if (description === "") description = "No description available.";
  const checked = false;
  let exists = false;
  if (project[priority - 1]) {
    exists = true;
    (0,_logic__WEBPACK_IMPORTED_MODULE_1__.newTask)(project, title, dueDate, priority, description, checked, exists);
    project.forEach((task) => {
      // eslint-disable-next-line no-param-reassign
      task.priority = project.indexOf(task) + 1;
    });
    resetTodoList(_logic__WEBPACK_IMPORTED_MODULE_1__.dashboard.indexOf(project));
  } else {
    (0,_logic__WEBPACK_IMPORTED_MODULE_1__.newTask)(project, title, dueDate, priority, description, checked, exists);
    createNewTaskElement(priority, title, description);
    createAddNewTaskElement();
  }
};

// Create open/close controls for all modals
const modalControls = () => {
  const addNewProject = document.getElementById("new-project");
  const addNewTask = document.getElementById("new-task");
  const projectModal = document.querySelector(".project-modal");
  const taskModal = document.querySelector(".task-modal");
  const taskEditModal = document.querySelector(".task-edit-modal");
  const projectCloseButton = document.querySelector(".project-close-button");
  const taskCloseButton = document.querySelector(".task-close-button");
  const taskEditCloseButton = document.querySelector(".task-edit-close-button");
  const projectSubmitButton = document.getElementById("project-submit-button");
  const taskSubmitButton = document.getElementById("task-submit-button");

  addNewProject.addEventListener("click", () => {
    document.getElementById("project-form").reset();
    projectModal.style.visibility = "visible";
  });

  addNewTask.addEventListener("click", () => {
    document.getElementById("task-form").reset();
    taskModal.style.visibility = "visible";
  });

  projectCloseButton.addEventListener("click", () => {
    projectModal.style.visibility = "hidden";
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
      createNewProject();
      projectModal.style.visibility = "hidden";
    }
  });

  taskSubmitButton.addEventListener("click", () => {
    const taskModalInputs = Array.from(taskModal.querySelectorAll("input"));
    if (taskModalInputs.every(validityCheck)) {
      const todoItemsContainer = document.querySelector(".todo-items");
      const project =
        _logic__WEBPACK_IMPORTED_MODULE_1__.dashboard[parseInt(todoItemsContainer.getAttribute("data-project"))];
      createNewTask(project);
      taskModal.style.visibility = "hidden";
    }
  });
};




/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
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
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");


(0,_DOM__WEBPACK_IMPORTED_MODULE_0__.createDropdownHider)();
(0,_DOM__WEBPACK_IMPORTED_MODULE_0__.addEditButtons)();
(0,_DOM__WEBPACK_IMPORTED_MODULE_0__.modalControls)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7OztBQ2YyRTs7QUFFM0UseURBQW1CO0FBQ25CLG9EQUFjO0FBQ2QsbURBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG5pbXBvcnQgZWRpdEljb25TcmMgZnJvbSBcIi4vaWNvbnMvZG90cy12ZXJ0aWNhbC5zdmdcIjtcbmltcG9ydCB7IGRhc2hib2FyZCwgbmV3UHJvamVjdCwgbmV3VGFzayB9IGZyb20gXCIuL2xvZ2ljXCI7XG5cbmNvbnN0IHZhbGlkaXR5Q2hlY2sgPSAoaW5wdXQpID0+IGlucHV0LnZhbGlkaXR5LnZhbGlkO1xuXG4vLyBDcmVhdGUgZXZlbnQgbGlzdGVuZXJzIHRvIGhpZGUgdGhlIGRyb3Bkb3duIG1lbnVzIHdoZW4gb3RoZXIgc3R1ZmYgaXMgY2xpY2tlZCBvblxuY29uc3QgY3JlYXRlRHJvcGRvd25IaWRlciA9ICgpID0+IHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoXG4gICAgICAhZXZlbnQudGFyZ2V0Lm1hdGNoZXMoXCIuZHJvcGRvd24tY29udGVudFwiKSAmJlxuICAgICAgIWV2ZW50LnRhcmdldC5tYXRjaGVzKFwiLmVkaXQtYnV0dG9uXCIpXG4gICAgKSB7XG4gICAgICBjb25zdCBkcm9wZG93bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRyb3Bkb3duLWNvbnRlbnRcIik7XG4gICAgICBkcm9wZG93bnMuZm9yRWFjaCgoZHJvcGRvd24pID0+IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGRyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG5cbi8vIENyZWF0ZSB0YXNrIGRlc2NyaXB0aW9uIG1ha2VyXG5jb25zdCBjcmVhdGVEZXNjcmlwdGlvbiA9ICh0YXNrLCB0YXNrVGl0bGUsIGRlc2NyaXB0aW9uKSA9PiB7XG4gIGlmICh0YXNrLm5leHRTaWJsaW5nKSB7XG4gICAgaWYgKHRhc2submV4dFNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCIpKVxuICAgICAgdGFzay5uZXh0U2libGluZy5yZW1vdmUoKTtcbiAgfVxuICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgY29uc3QgdGFza1RpdGxlQ2xvbmUgPSB0YXNrVGl0bGUuY2xvbmVOb2RlKHRydWUpO1xuICB0YXNrVGl0bGUucmVwbGFjZVdpdGgodGFza1RpdGxlQ2xvbmUpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWRlc2NyaXB0aW9uXCIpO1xuICBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XG4gIGxldCBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uU2hvd24gPSBmYWxzZTtcblxuICB0YXNrVGl0bGVDbG9uZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uU2hvd24pIHtcbiAgICAgIHRhc2tzLnJlbW92ZUNoaWxkKG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb24pO1xuICAgICAgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvblNob3duID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhc2suaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbik7XG4gICAgICBuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uU2hvd24gPSB0cnVlO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBDcmVhdGUgZWRpdCBvcHRpb24gZnVuY3Rpb25hbGl0eVxuY29uc3QgZWRpdEZ1bmN0aW9uYWxpdHkgPSAoaXRlbSkgPT4ge1xuICBjb25zdCBwcm9qZWN0TnVtYmVyID0gcGFyc2VJbnQoXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKVxuICApO1xuICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaWRlYmFyLWl0ZW1cIikpIHtcbiAgICAvLyBjb25zdCB0YXNrVG9FZGl0ID0gaXRlbTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBpdGVtUHJpb3JpdHkgPSBpdGVtLmZpcnN0Q2hpbGQ7XG4gICAgY29uc3QgaXRlbVRpdGxlID0gaXRlbS5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKTtcbiAgICBjb25zdCB0YXNrVG9FZGl0ID1cbiAgICAgIGRhc2hib2FyZFtwcm9qZWN0TnVtYmVyXVtwYXJzZUludChpdGVtLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQpIC0gMV07XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1lZGl0LW1vZGFsXCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1lZGl0XCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZS1lZGl0XCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHktZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsRGVzY3JpcHRpb24gPVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvbi1lZGl0XCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIFwidGFzay1lZGl0LXN1Ym1pdC1idXR0b25cIlxuICAgICk7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lID1cbiAgICAgIHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b24uY2xvbmVOb2RlKHRydWUpO1xuICAgIHRhc2tFZGl0TW9kYWxUaXRsZS52YWx1ZSA9IHRhc2tUb0VkaXQudGl0bGU7XG4gICAgdGFza0VkaXRNb2RhbERhdGUudmFsdWUgPSB0YXNrVG9FZGl0LmR1ZURhdGU7XG4gICAgdGFza0VkaXRNb2RhbFByaW9yaXR5LnZhbHVlID0gdGFza1RvRWRpdC5wcmlvcml0eTtcbiAgICB0YXNrRWRpdE1vZGFsRGVzY3JpcHRpb24udmFsdWUgPSB0YXNrVG9FZGl0LmRlc2NyaXB0aW9uO1xuXG4gICAgdGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbi5yZXBsYWNlV2l0aCh0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uQ2xvbmUpO1xuXG4gICAgdGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCB0YXNrRWRpdE1vZGFsSW5wdXRzID0gQXJyYXkuZnJvbShcbiAgICAgICAgdGFza0VkaXRNb2RhbC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIilcbiAgICAgICk7XG4gICAgICBpZiAodGFza0VkaXRNb2RhbElucHV0cy5ldmVyeSh2YWxpZGl0eUNoZWNrKSkge1xuICAgICAgICB0YXNrVG9FZGl0LnRpdGxlID0gdGFza0VkaXRNb2RhbFRpdGxlLnZhbHVlO1xuICAgICAgICB0YXNrVG9FZGl0LmR1ZURhdGUgPSB0YXNrRWRpdE1vZGFsRGF0ZS52YWx1ZTtcbiAgICAgICAgdGFza1RvRWRpdC5wcmlvcml0eSA9IHRhc2tFZGl0TW9kYWxQcmlvcml0eS52YWx1ZTtcbiAgICAgICAgdGFza1RvRWRpdC5kZXNjcmlwdGlvbiA9IHRhc2tFZGl0TW9kYWxEZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgICAgaXRlbVByaW9yaXR5LnRleHRDb250ZW50ID0gYCR7dGFza1RvRWRpdC5wcmlvcml0eX0uYDtcbiAgICAgICAgaXRlbVRpdGxlLnRleHRDb250ZW50ID0gdGFza1RvRWRpdC50aXRsZTtcbiAgICAgICAgY3JlYXRlRGVzY3JpcHRpb24oaXRlbSwgaXRlbVRpdGxlLCB0YXNrVG9FZGl0LmRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0VkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLy8gQWRkIGVkaXQgYnV0dG9ucyB0byBwcm9qZWN0cyBhbmQgdGFza3NcbmNvbnN0IGFkZEVkaXRCdXR0b25zID0gKCkgPT4ge1xuICAvLyBNYWtlIGFuIGVkaXQgYnV0dG9uXG4gIGNvbnN0IGFkZEVkaXRCdXR0b24gPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVkaXRJY29uID0gbmV3IEltYWdlKCk7XG4gICAgY29uc3QgZWRpdERyb3Bkb3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBlZGl0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCByZW1vdmVPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVkaXRJY29uLnNyYyA9IGVkaXRJY29uU3JjO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIlZlcnRpY2FsIGRvdHRlZCBsaW5lIGljb24gZm9yIGVkaXQgb3B0aW9ucy5cIik7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idXR0b25cIik7XG4gICAgZWRpdERyb3Bkb3duLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1jb250ZW50XCIpO1xuICAgIGVkaXREcm9wZG93bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBlZGl0T3B0aW9uLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG4gICAgZWRpdE9wdGlvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbVwiKTtcbiAgICBlZGl0T3B0aW9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZWRpdC1idXR0b25cIik7XG4gICAgZWRpdE9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICAgIHJlbW92ZU9wdGlvbi50ZXh0Q29udGVudCA9IFwiUmVtb3ZlXCI7XG4gICAgcmVtb3ZlT3B0aW9uLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1pdGVtXCIpO1xuICAgIHJlbW92ZU9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInJlbW92ZS1idXR0b25cIik7XG4gICAgcmVtb3ZlT3B0aW9uLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG4gICAgZWRpdERyb3Bkb3duLmFwcGVuZENoaWxkKGVkaXRPcHRpb24pO1xuICAgIGVkaXREcm9wZG93bi5hcHBlbmRDaGlsZChyZW1vdmVPcHRpb24pO1xuICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtYnV0dG9uXCIpO1xuICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duXCIpO1xuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdERyb3Bkb3duKTtcbiAgICBpdGVtLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXG4gICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKGVkaXREcm9wZG93bi5zdHlsZS52aXNpYmlsaXR5ID09PSBcImhpZGRlblwiKSB7XG4gICAgICAgIGVkaXREcm9wZG93bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICB9IGVsc2UgZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW1vZGFsXCIpO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZWRpdC1tb2RhbFwiKTtcblxuICAgIGVkaXRPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudEl0ZW0gPSBlZGl0T3B0aW9uLmNsb3Nlc3QoXCIuaXRlbVwiKTtcbiAgICAgIGlmIChwYXJlbnRJdGVtLmNsYXNzTGlzdC5jb250YWlucyhcInNpZGViYXItaXRlbVwiKSkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybVwiKS5yZXNldCgpO1xuICAgICAgICBwcm9qZWN0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWRpdEZ1bmN0aW9uYWxpdHkocGFyZW50SXRlbSk7XG4gICAgICAgIHRhc2tFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVtb3ZlT3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRJdGVtID0gcmVtb3ZlT3B0aW9uLmNsb3Nlc3QoXCIuaXRlbVwiKTtcbiAgICAgIGlmIChwYXJlbnRJdGVtLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKSkge1xuICAgICAgICBwYXJlbnRJdGVtLm5leHRTaWJsaW5nLnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgcGFyZW50SXRlbS5yZW1vdmUoKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBSZW1vdmUgYWxsIGVkaXQgYnV0dG9ucyBhbmQgdGhlbiBtYWtlIGFuIGVkaXQgYnV0dG9uIGZvciBldmVyeSBwcm9qZWN0IGFuZCB0YXNrXG4gIGNvbnN0IGVkaXRCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lZGl0LWJ1dHRvblwiKTtcbiAgZWRpdEJ1dHRvbnMuZm9yRWFjaCgoZWRpdEJ1dHRvbikgPT4gZWRpdEJ1dHRvbi5yZW1vdmUoKSk7XG4gIGNvbnN0IHRlc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2lkZWJhci1pdGVtXCIpO1xuICBjb25zdCB0ZXN0SXRlbXMyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWl0ZW1cIik7XG4gIHRlc3RJdGVtcy5mb3JFYWNoKCh0ZXN0SXRlbSkgPT4gYWRkRWRpdEJ1dHRvbih0ZXN0SXRlbSkpO1xuICB0ZXN0SXRlbXMyLmZvckVhY2goKHRlc3RJdGVtKSA9PiBhZGRFZGl0QnV0dG9uKHRlc3RJdGVtKSk7XG59O1xuXG5jb25zdCBjcmVhdGVBZGROZXdQcm9qZWN0RWxlbWVudCA9ICgpID0+IHtcbiAgY29uc3Qgc2lkZWJhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW1zXCIpO1xuICBjb25zdCBvbGRBZGROZXdQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXByb2plY3RcIik7XG4gIG9sZEFkZE5ld1Byb2plY3RFbGVtZW50LnJlbW92ZSgpO1xuICBjb25zdCBuZXdBZGROZXdQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyLWl0ZW0tYWRkXCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm5ldy1wcm9qZWN0XCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICBjb25zdCBuZXdBZGROZXdQcm9qZWN0RWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IFwiKyBBZGQgTmV3IFByb2plY3RcIjtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3QWRkTmV3UHJvamVjdEVsZW1lbnRUaXRsZSk7XG4gIHNpZGViYXJJdGVtcy5hcHBlbmRDaGlsZChuZXdBZGROZXdQcm9qZWN0RWxlbWVudCk7XG5cbiAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW1vZGFsXCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpLnJlc2V0KCk7XG4gICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVBZGROZXdUYXNrRWxlbWVudCA9ICgpID0+IHtcbiAgY29uc3QgdG9kb0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICBjb25zdCBvbGRBZGROZXdUYXNrRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXRhc2tcIik7XG4gIGlmIChvbGRBZGROZXdUYXNrRWxlbWVudCAhPT0gbnVsbCkgb2xkQWRkTmV3VGFza0VsZW1lbnQucmVtb3ZlKCk7XG4gIGNvbnN0IG5ld0FkZE5ld1Rhc2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1hZGRcIik7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibmV3LXRhc2tcIik7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50LnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG4gIGNvbnN0IG5ld0FkZE5ld1Rhc2tFbGVtZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gXCIrIEFkZCBOZXcgVGFza1wiO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdBZGROZXdUYXNrRWxlbWVudFRpdGxlKTtcbiAgdG9kb0l0ZW1zLmFwcGVuZENoaWxkKG5ld0FkZE5ld1Rhc2tFbGVtZW50KTtcblxuICBjb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbW9kYWxcIik7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm1cIikucmVzZXQoKTtcbiAgICB0YXNrTW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICB9KTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5ld1Rhc2tFbGVtZW50ID0gKHByaW9yaXR5LCB0aXRsZSwgZGVzY3JpcHRpb24sIGNoZWNrZWQpID0+IHtcbiAgY29uc3QgdG9kb0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW1cIik7XG4gIG5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIpO1xuICBjb25zdCBuZXdUYXNrRWxlbWVudFByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3VGFza0VsZW1lbnRQcmlvcml0eS50ZXh0Q29udGVudCA9IGAke3ByaW9yaXR5fS5gO1xuICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudFByaW9yaXR5KTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnRDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3guY2xhc3NMaXN0LmFkZChcImNoZWNrYm94XCIpO1xuICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudENoZWNrYm94KTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Rhc2tFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS10aXRsZVwiKTtcbiAgbmV3VGFza0VsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICBuZXdUYXNrRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudFRpdGxlKTtcbiAgdG9kb0l0ZW1zLmFwcGVuZENoaWxkKG5ld1Rhc2tFbGVtZW50KTtcblxuICBpZiAoY2hlY2tlZCkge1xuICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIuKck1wiO1xuICAgIG5ld1Rhc2tFbGVtZW50VGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICB9XG5cbiAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9kby1pdGVtLWNoZWNrZWRcIilcbiAgICApIHtcbiAgICAgIG5ld1Rhc2tFbGVtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbS10aXRsZVwiKVxuICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcInRvZG8taXRlbS1jaGVja2VkXCIpO1xuICAgICAgbmV3VGFza0VsZW1lbnRDaGVja2JveC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICBkYXNoYm9hcmRbcGFyc2VJbnQodG9kb0l0ZW1zLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSldW1xuICAgICAgICBwcmlvcml0eSAtIDFcbiAgICAgIF0uY2hlY2tlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdUYXNrRWxlbWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIilcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIuKck1wiO1xuICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXVtcbiAgICAgICAgcHJpb3JpdHkgLSAxXG4gICAgICBdLmNoZWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgY3JlYXRlRGVzY3JpcHRpb24obmV3VGFza0VsZW1lbnQsIG5ld1Rhc2tFbGVtZW50VGl0bGUsIGRlc2NyaXB0aW9uKTtcbiAgYWRkRWRpdEJ1dHRvbnMoKTtcbn07XG5cbmNvbnN0IHJlc2V0VG9kb0xpc3QgPSAocHJvamVjdE51bWJlcikgPT4ge1xuICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgdGFza3MucmVwbGFjZUNoaWxkcmVuKCk7XG4gIGRhc2hib2FyZFtwcm9qZWN0TnVtYmVyXS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5ID0gdGFzay5wcmlvcml0eTtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSB0YXNrLnRpdGxlO1xuICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgY29uc3QgdGFza0NoZWNrZWQgPSB0YXNrLmNoZWNrZWQ7XG5cbiAgICBjcmVhdGVOZXdUYXNrRWxlbWVudCh0YXNrUHJpb3JpdHksIHRhc2tUaXRsZSwgdGFza0Rlc2NyaXB0aW9uLCB0YXNrQ2hlY2tlZCk7XG4gIH0pO1xuICBjcmVhdGVBZGROZXdUYXNrRWxlbWVudCgpO1xufTtcblxuY29uc3QgY3JlYXRlTmV3UHJvamVjdEVsZW1lbnQgPSAodGl0bGUpID0+IHtcbiAgY29uc3Qgc2lkZWJhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW1zXCIpO1xuICBjb25zdCBuZXdQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Byb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyLWl0ZW1cIik7XG4gIG5ld1Byb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgZGFzaGJvYXJkLmxlbmd0aCAtIDEpO1xuICBjb25zdCBuZXdQcm9qZWN0RWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnRUaXRsZS5jbGFzc0xpc3QuYWRkKFwic2lkZWJhci1pdGVtLXRpdGxlXCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudFRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG4gIG5ld1Byb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Byb2plY3RFbGVtZW50VGl0bGUpO1xuICBzaWRlYmFySXRlbXMuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEVsZW1lbnQpO1xuXG4gIGFkZEVkaXRCdXR0b25zKCk7XG5cbiAgbmV3UHJvamVjdEVsZW1lbnRUaXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW1zXCIpO1xuICAgIGNvbnN0IHByb2plY3ROdW1iZXIgPSBuZXdQcm9qZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIik7XG4gICAgdGFza3Muc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIsIHByb2plY3ROdW1iZXIpO1xuICAgIHRhc2tzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIHJlc2V0VG9kb0xpc3QocHJvamVjdE51bWJlcik7XG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlTmV3UHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbmFtZVwiKS52YWx1ZTtcbiAgbmV3UHJvamVjdCgpO1xuICBjcmVhdGVOZXdQcm9qZWN0RWxlbWVudCh0aXRsZSk7XG4gIGNyZWF0ZUFkZE5ld1Byb2plY3RFbGVtZW50KCk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdUYXNrID0gKHByb2plY3QpID0+IHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tcIikudmFsdWU7XG4gIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpLnZhbHVlO1xuICBsZXQgcHJpb3JpdHkgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlKTtcbiAgaWYgKHByaW9yaXR5ID09PSAwKSBwcmlvcml0eSA9IDE7XG4gIGlmIChwcmlvcml0eSA+IHByb2plY3QubGVuZ3RoICsgMSkgcHJpb3JpdHkgPSBwcm9qZWN0Lmxlbmd0aCArIDE7XG4gIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb25cIikudmFsdWU7XG4gIGlmIChkZXNjcmlwdGlvbiA9PT0gXCJcIikgZGVzY3JpcHRpb24gPSBcIk5vIGRlc2NyaXB0aW9uIGF2YWlsYWJsZS5cIjtcbiAgY29uc3QgY2hlY2tlZCA9IGZhbHNlO1xuICBsZXQgZXhpc3RzID0gZmFsc2U7XG4gIGlmIChwcm9qZWN0W3ByaW9yaXR5IC0gMV0pIHtcbiAgICBleGlzdHMgPSB0cnVlO1xuICAgIG5ld1Rhc2socHJvamVjdCwgdGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBkZXNjcmlwdGlvbiwgY2hlY2tlZCwgZXhpc3RzKTtcbiAgICBwcm9qZWN0LmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgdGFzay5wcmlvcml0eSA9IHByb2plY3QuaW5kZXhPZih0YXNrKSArIDE7XG4gICAgfSk7XG4gICAgcmVzZXRUb2RvTGlzdChkYXNoYm9hcmQuaW5kZXhPZihwcm9qZWN0KSk7XG4gIH0gZWxzZSB7XG4gICAgbmV3VGFzayhwcm9qZWN0LCB0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIGRlc2NyaXB0aW9uLCBjaGVja2VkLCBleGlzdHMpO1xuICAgIGNyZWF0ZU5ld1Rhc2tFbGVtZW50KHByaW9yaXR5LCB0aXRsZSwgZGVzY3JpcHRpb24pO1xuICAgIGNyZWF0ZUFkZE5ld1Rhc2tFbGVtZW50KCk7XG4gIH1cbn07XG5cbi8vIENyZWF0ZSBvcGVuL2Nsb3NlIGNvbnRyb2xzIGZvciBhbGwgbW9kYWxzXG5jb25zdCBtb2RhbENvbnRyb2xzID0gKCkgPT4ge1xuICBjb25zdCBhZGROZXdQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdFwiKTtcbiAgY29uc3QgYWRkTmV3VGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXRhc2tcIik7XG4gIGNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1tb2RhbFwiKTtcbiAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLW1vZGFsXCIpO1xuICBjb25zdCB0YXNrRWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWVkaXQtbW9kYWxcIik7XG4gIGNvbnN0IHByb2plY3RDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1jbG9zZS1idXR0b25cIik7XG4gIGNvbnN0IHRhc2tDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jbG9zZS1idXR0b25cIik7XG4gIGNvbnN0IHRhc2tFZGl0Q2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZWRpdC1jbG9zZS1idXR0b25cIik7XG4gIGNvbnN0IHByb2plY3RTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3Qtc3VibWl0LWJ1dHRvblwiKTtcbiAgY29uc3QgdGFza1N1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1zdWJtaXQtYnV0dG9uXCIpO1xuXG4gIGFkZE5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybVwiKS5yZXNldCgpO1xuICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH0pO1xuXG4gIGFkZE5ld1Rhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybVwiKS5yZXNldCgpO1xuICAgIHRhc2tNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH0pO1xuXG4gIHByb2plY3RDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgdGFza0Nsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9KTtcblxuICB0YXNrRWRpdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGFza0VkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgcHJvamVjdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBwcm9qZWN0TW9kYWwpIHtcbiAgICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHRhc2tNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGFza01vZGFsKSB7XG4gICAgICB0YXNrTW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcblxuICB0YXNrRWRpdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0YXNrRWRpdE1vZGFsKSB7XG4gICAgICB0YXNrRWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG5cbiAgcHJvamVjdFN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RNb2RhbElucHV0cyA9IEFycmF5LmZyb20oXG4gICAgICBwcm9qZWN0TW9kYWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpXG4gICAgKTtcbiAgICBpZiAocHJvamVjdE1vZGFsSW5wdXRzLmV2ZXJ5KHZhbGlkaXR5Q2hlY2spKSB7XG4gICAgICBjcmVhdGVOZXdQcm9qZWN0KCk7XG4gICAgICBwcm9qZWN0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcblxuICB0YXNrU3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgdGFza01vZGFsSW5wdXRzID0gQXJyYXkuZnJvbSh0YXNrTW9kYWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpKTtcbiAgICBpZiAodGFza01vZGFsSW5wdXRzLmV2ZXJ5KHZhbGlkaXR5Q2hlY2spKSB7XG4gICAgICBjb25zdCB0b2RvSXRlbXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gICAgICBjb25zdCBwcm9qZWN0ID1cbiAgICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtc0NvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXTtcbiAgICAgIGNyZWF0ZU5ld1Rhc2socHJvamVjdCk7XG4gICAgICB0YXNrTW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCB7IGFkZEVkaXRCdXR0b25zLCBtb2RhbENvbnRyb2xzLCBjcmVhdGVEcm9wZG93bkhpZGVyIH07XG4iLCJjb25zdCBkYXNoYm9hcmQgPSBbXTtcblxuY29uc3QgbmV3UHJvamVjdCA9ICgpID0+IHtcbiAgZGFzaGJvYXJkLnB1c2goW10pO1xufTtcblxuY29uc3QgbmV3VGFzayA9IChcbiAgcHJvamVjdCxcbiAgdGl0bGUsXG4gIGR1ZURhdGUsXG4gIHByaW9yaXR5LFxuICBkZXNjcmlwdGlvbixcbiAgY2hlY2tlZCxcbiAgZXhpc3RzXG4pID0+IHtcbiAgaWYgKGV4aXN0cykge1xuICAgIHByb2plY3Quc3BsaWNlKHByaW9yaXR5IC0gMSwgMCwge1xuICAgICAgdGl0bGUsXG4gICAgICBkdWVEYXRlLFxuICAgICAgcHJpb3JpdHksXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGNoZWNrZWQsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcHJvamVjdC5wdXNoKHtcbiAgICAgIHRpdGxlLFxuICAgICAgZHVlRGF0ZSxcbiAgICAgIHByaW9yaXR5LFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBjaGVja2VkLFxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgeyBkYXNoYm9hcmQsIG5ld1Byb2plY3QsIG5ld1Rhc2sgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IGFkZEVkaXRCdXR0b25zLCBtb2RhbENvbnRyb2xzLCBjcmVhdGVEcm9wZG93bkhpZGVyIH0gZnJvbSBcIi4vRE9NXCI7XG5cbmNyZWF0ZURyb3Bkb3duSGlkZXIoKTtcbmFkZEVkaXRCdXR0b25zKCk7XG5tb2RhbENvbnRyb2xzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=