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

const createNewTaskElement = (priority, title, description) => {
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

  newTaskElementCheckbox.addEventListener("click", () => {
    if (newTaskElementTitle.classList.contains("todo-item-checked")) {
      newTaskElementTitle.classList.remove("todo-item-checked");
      newTaskElementCheckbox.textContent = "";
    } else {
      newTaskElementTitle.classList.add("todo-item-checked");
      newTaskElementCheckbox.textContent = "✓";
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

    createNewTaskElement(taskPriority, taskTitle, taskDescription);
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
  const checked = false; // Temporary
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MkU7O0FBRTNFLHlEQUFtQjtBQUNuQixvREFBYztBQUNkLG1EQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByYWRpeCAqL1xuaW1wb3J0IGVkaXRJY29uU3JjIGZyb20gXCIuL2ljb25zL2RvdHMtdmVydGljYWwuc3ZnXCI7XG5pbXBvcnQgeyBkYXNoYm9hcmQsIG5ld1Byb2plY3QsIG5ld1Rhc2sgfSBmcm9tIFwiLi9sb2dpY1wiO1xuXG5jb25zdCB2YWxpZGl0eUNoZWNrID0gKGlucHV0KSA9PiBpbnB1dC52YWxpZGl0eS52YWxpZDtcblxuLy8gQ3JlYXRlIGV2ZW50IGxpc3RlbmVycyB0byBoaWRlIHRoZSBkcm9wZG93biBtZW51cyB3aGVuIG90aGVyIHN0dWZmIGlzIGNsaWNrZWQgb25cbmNvbnN0IGNyZWF0ZURyb3Bkb3duSGlkZXIgPSAoKSA9PiB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKFxuICAgICAgIWV2ZW50LnRhcmdldC5tYXRjaGVzKFwiLmRyb3Bkb3duLWNvbnRlbnRcIikgJiZcbiAgICAgICFldmVudC50YXJnZXQubWF0Y2hlcyhcIi5lZGl0LWJ1dHRvblwiKVxuICAgICkge1xuICAgICAgY29uc3QgZHJvcGRvd25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kcm9wZG93bi1jb250ZW50XCIpO1xuICAgICAgZHJvcGRvd25zLmZvckVhY2goKGRyb3Bkb3duKSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBkcm9wZG93bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBDcmVhdGUgdGFzayBkZXNjcmlwdGlvbiBtYWtlclxuY29uc3QgY3JlYXRlRGVzY3JpcHRpb24gPSAodGFzaywgdGFza1RpdGxlLCBkZXNjcmlwdGlvbikgPT4ge1xuICBpZiAodGFzay5uZXh0U2libGluZykge1xuICAgIGlmICh0YXNrLm5leHRTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKSlcbiAgICAgIHRhc2submV4dFNpYmxpbmcucmVtb3ZlKCk7XG4gIH1cbiAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gIGNvbnN0IHRhc2tUaXRsZUNsb25lID0gdGFza1RpdGxlLmNsb25lTm9kZSh0cnVlKTtcbiAgdGFza1RpdGxlLnJlcGxhY2VXaXRoKHRhc2tUaXRsZUNsb25lKTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKTtcbiAgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xuICBsZXQgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvblNob3duID0gZmFsc2U7XG5cbiAgdGFza1RpdGxlQ2xvbmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAobmV3VGFza0VsZW1lbnREZXNjcmlwdGlvblNob3duKSB7XG4gICAgICB0YXNrcy5yZW1vdmVDaGlsZChuZXdUYXNrRWxlbWVudERlc2NyaXB0aW9uKTtcbiAgICAgIG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb25TaG93biA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXNrLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIG5ld1Rhc2tFbGVtZW50RGVzY3JpcHRpb24pO1xuICAgICAgbmV3VGFza0VsZW1lbnREZXNjcmlwdGlvblNob3duID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xufTtcblxuLy8gQ3JlYXRlIGVkaXQgb3B0aW9uIGZ1bmN0aW9uYWxpdHlcbmNvbnN0IGVkaXRGdW5jdGlvbmFsaXR5ID0gKGl0ZW0pID0+IHtcbiAgY29uc3QgcHJvamVjdE51bWJlciA9IHBhcnNlSW50KFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIilcbiAgKTtcbiAgaWYgKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2lkZWJhci1pdGVtXCIpKSB7XG4gICAgLy8gY29uc3QgdGFza1RvRWRpdCA9IGl0ZW07XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaXRlbVByaW9yaXR5ID0gaXRlbS5maXJzdENoaWxkO1xuICAgIGNvbnN0IGl0ZW1UaXRsZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcIi50b2RvLWl0ZW0tdGl0bGVcIik7XG4gICAgY29uc3QgdGFza1RvRWRpdCA9XG4gICAgICBkYXNoYm9hcmRbcHJvamVjdE51bWJlcl1bcGFyc2VJbnQoaXRlbS5maXJzdENoaWxkLnRleHRDb250ZW50KSAtIDFdO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZWRpdC1tb2RhbFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGUtZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsUHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5LWVkaXRcIik7XG4gICAgY29uc3QgdGFza0VkaXRNb2RhbERlc2NyaXB0aW9uID1cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb24tZWRpdFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBcInRhc2stZWRpdC1zdWJtaXQtYnV0dG9uXCJcbiAgICApO1xuICAgIGNvbnN0IHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b25DbG9uZSA9XG4gICAgICB0YXNrRWRpdE1vZGFsU3VibWl0QnV0dG9uLmNsb25lTm9kZSh0cnVlKTtcbiAgICB0YXNrRWRpdE1vZGFsVGl0bGUudmFsdWUgPSB0YXNrVG9FZGl0LnRpdGxlO1xuICAgIHRhc2tFZGl0TW9kYWxEYXRlLnZhbHVlID0gdGFza1RvRWRpdC5kdWVEYXRlO1xuICAgIHRhc2tFZGl0TW9kYWxQcmlvcml0eS52YWx1ZSA9IHRhc2tUb0VkaXQucHJpb3JpdHk7XG4gICAgdGFza0VkaXRNb2RhbERlc2NyaXB0aW9uLnZhbHVlID0gdGFza1RvRWRpdC5kZXNjcmlwdGlvbjtcblxuICAgIHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b24ucmVwbGFjZVdpdGgodGFza0VkaXRNb2RhbFN1Ym1pdEJ1dHRvbkNsb25lKTtcblxuICAgIHRhc2tFZGl0TW9kYWxTdWJtaXRCdXR0b25DbG9uZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgdGFza0VkaXRNb2RhbElucHV0cyA9IEFycmF5LmZyb20oXG4gICAgICAgIHRhc2tFZGl0TW9kYWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpXG4gICAgICApO1xuICAgICAgaWYgKHRhc2tFZGl0TW9kYWxJbnB1dHMuZXZlcnkodmFsaWRpdHlDaGVjaykpIHtcbiAgICAgICAgdGFza1RvRWRpdC50aXRsZSA9IHRhc2tFZGl0TW9kYWxUaXRsZS52YWx1ZTtcbiAgICAgICAgdGFza1RvRWRpdC5kdWVEYXRlID0gdGFza0VkaXRNb2RhbERhdGUudmFsdWU7XG4gICAgICAgIHRhc2tUb0VkaXQucHJpb3JpdHkgPSB0YXNrRWRpdE1vZGFsUHJpb3JpdHkudmFsdWU7XG4gICAgICAgIHRhc2tUb0VkaXQuZGVzY3JpcHRpb24gPSB0YXNrRWRpdE1vZGFsRGVzY3JpcHRpb24udmFsdWU7XG4gICAgICAgIGl0ZW1Qcmlvcml0eS50ZXh0Q29udGVudCA9IGAke3Rhc2tUb0VkaXQucHJpb3JpdHl9LmA7XG4gICAgICAgIGl0ZW1UaXRsZS50ZXh0Q29udGVudCA9IHRhc2tUb0VkaXQudGl0bGU7XG4gICAgICAgIGNyZWF0ZURlc2NyaXB0aW9uKGl0ZW0sIGl0ZW1UaXRsZSwgdGFza1RvRWRpdC5kZXNjcmlwdGlvbik7XG4gICAgICAgIHRhc2tFZGl0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIEFkZCBlZGl0IGJ1dHRvbnMgdG8gcHJvamVjdHMgYW5kIHRhc2tzXG5jb25zdCBhZGRFZGl0QnV0dG9ucyA9ICgpID0+IHtcbiAgLy8gTWFrZSBhbiBlZGl0IGJ1dHRvblxuICBjb25zdCBhZGRFZGl0QnV0dG9uID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBlZGl0SWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIGNvbnN0IGVkaXREcm9wZG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZWRpdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgcmVtb3ZlT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBlZGl0SWNvbi5zcmMgPSBlZGl0SWNvblNyYztcbiAgICBlZGl0SWNvbi5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgXCJWZXJ0aWNhbCBkb3R0ZWQgbGluZSBpY29uIGZvciBlZGl0IG9wdGlvbnMuXCIpO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG4gICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImVkaXQtYnV0dG9uXCIpO1xuICAgIGVkaXREcm9wZG93bi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24tY29udGVudFwiKTtcbiAgICBlZGl0RHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgZWRpdE9wdGlvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuICAgIGVkaXRPcHRpb24uY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWl0ZW1cIik7XG4gICAgZWRpdE9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImVkaXQtYnV0dG9uXCIpO1xuICAgIGVkaXRPcHRpb24uc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICByZW1vdmVPcHRpb24udGV4dENvbnRlbnQgPSBcIlJlbW92ZVwiO1xuICAgIHJlbW92ZU9wdGlvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbVwiKTtcbiAgICByZW1vdmVPcHRpb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJyZW1vdmUtYnV0dG9uXCIpO1xuICAgIHJlbW92ZU9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGVkaXREcm9wZG93bi5hcHBlbmRDaGlsZChlZGl0T3B0aW9uKTtcbiAgICBlZGl0RHJvcGRvd24uYXBwZW5kQ2hpbGQocmVtb3ZlT3B0aW9uKTtcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ1dHRvblwiKTtcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93blwiKTtcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRJY29uKTtcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXREcm9wZG93bik7XG4gICAgaXRlbS5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblxuICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChlZGl0RHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9PT0gXCJoaWRkZW5cIikge1xuICAgICAgICBlZGl0RHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgfSBlbHNlIGVkaXREcm9wZG93bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9KTtcblxuICAgIGNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1tb2RhbFwiKTtcbiAgICBjb25zdCB0YXNrRWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWVkaXQtbW9kYWxcIik7XG5cbiAgICBlZGl0T3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRJdGVtID0gZWRpdE9wdGlvbi5jbG9zZXN0KFwiLml0ZW1cIik7XG4gICAgICBpZiAocGFyZW50SXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaWRlYmFyLWl0ZW1cIikpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm1cIikucmVzZXQoKTtcbiAgICAgICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVkaXRGdW5jdGlvbmFsaXR5KHBhcmVudEl0ZW0pO1xuICAgICAgICB0YXNrRWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlbW92ZU9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50SXRlbSA9IHJlbW92ZU9wdGlvbi5jbG9zZXN0KFwiLml0ZW1cIik7XG4gICAgICBpZiAocGFyZW50SXRlbS5uZXh0U2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RvLWl0ZW0tZGVzY3JpcHRpb25cIikpIHtcbiAgICAgICAgcGFyZW50SXRlbS5uZXh0U2libGluZy5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICAgIHBhcmVudEl0ZW0ucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gUmVtb3ZlIGFsbCBlZGl0IGJ1dHRvbnMgYW5kIHRoZW4gbWFrZSBhbiBlZGl0IGJ1dHRvbiBmb3IgZXZlcnkgcHJvamVjdCBhbmQgdGFza1xuICBjb25zdCBlZGl0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWRpdC1idXR0b25cIik7XG4gIGVkaXRCdXR0b25zLmZvckVhY2goKGVkaXRCdXR0b24pID0+IGVkaXRCdXR0b24ucmVtb3ZlKCkpO1xuICBjb25zdCB0ZXN0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNpZGViYXItaXRlbVwiKTtcbiAgY29uc3QgdGVzdEl0ZW1zMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1pdGVtXCIpO1xuICB0ZXN0SXRlbXMuZm9yRWFjaCgodGVzdEl0ZW0pID0+IGFkZEVkaXRCdXR0b24odGVzdEl0ZW0pKTtcbiAgdGVzdEl0ZW1zMi5mb3JFYWNoKCh0ZXN0SXRlbSkgPT4gYWRkRWRpdEJ1dHRvbih0ZXN0SXRlbSkpO1xufTtcblxuY29uc3QgY3JlYXRlQWRkTmV3UHJvamVjdEVsZW1lbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHNpZGViYXJJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhci1pdGVtc1wiKTtcbiAgY29uc3Qgb2xkQWRkTmV3UHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0XCIpO1xuICBvbGRBZGROZXdQcm9qZWN0RWxlbWVudC5yZW1vdmUoKTtcbiAgY29uc3QgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2lkZWJhci1pdGVtLWFkZFwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJuZXctcHJvamVjdFwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgY29uc3QgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSBcIisgQWRkIE5ldyBQcm9qZWN0XCI7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKG5ld0FkZE5ld1Byb2plY3RFbGVtZW50VGl0bGUpO1xuICBzaWRlYmFySXRlbXMuYXBwZW5kQ2hpbGQobmV3QWRkTmV3UHJvamVjdEVsZW1lbnQpO1xuXG4gIGNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1tb2RhbFwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybVwiKS5yZXNldCgpO1xuICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH0pO1xufTtcblxuY29uc3QgY3JlYXRlQWRkTmV3VGFza0VsZW1lbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHRvZG9JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgY29uc3Qgb2xkQWRkTmV3VGFza0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy10YXNrXCIpO1xuICBpZiAob2xkQWRkTmV3VGFza0VsZW1lbnQgIT09IG51bGwpIG9sZEFkZE5ld1Rhc2tFbGVtZW50LnJlbW92ZSgpO1xuICBjb25zdCBuZXdBZGROZXdUYXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Rhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tYWRkXCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm5ldy10YXNrXCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICBjb25zdCBuZXdBZGROZXdUYXNrRWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IFwiKyBBZGQgTmV3IFRhc2tcIjtcbiAgbmV3QWRkTmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3QWRkTmV3VGFza0VsZW1lbnRUaXRsZSk7XG4gIHRvZG9JdGVtcy5hcHBlbmRDaGlsZChuZXdBZGROZXdUYXNrRWxlbWVudCk7XG5cbiAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLW1vZGFsXCIpO1xuICBuZXdBZGROZXdUYXNrRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtXCIpLnJlc2V0KCk7XG4gICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdUYXNrRWxlbWVudCA9IChwcmlvcml0eSwgdGl0bGUsIGRlc2NyaXB0aW9uKSA9PiB7XG4gIGNvbnN0IHRvZG9JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtXCIpO1xuICBuZXdUYXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaXRlbVwiKTtcbiAgY29uc3QgbmV3VGFza0VsZW1lbnRQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Rhc2tFbGVtZW50UHJpb3JpdHkudGV4dENvbnRlbnQgPSBgJHtwcmlvcml0eX0uYDtcbiAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnRQcmlvcml0eSk7XG4gIGNvbnN0IG5ld1Rhc2tFbGVtZW50Q2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBuZXdUYXNrRWxlbWVudENoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJjaGVja2JveFwiKTtcbiAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnRDaGVja2JveCk7XG4gIGNvbnN0IG5ld1Rhc2tFbGVtZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdUYXNrRWxlbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tdGl0bGVcIik7XG4gIG5ld1Rhc2tFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgbmV3VGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza0VsZW1lbnRUaXRsZSk7XG4gIHRvZG9JdGVtcy5hcHBlbmRDaGlsZChuZXdUYXNrRWxlbWVudCk7XG5cbiAgbmV3VGFza0VsZW1lbnRDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChuZXdUYXNrRWxlbWVudFRpdGxlLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8taXRlbS1jaGVja2VkXCIpKSB7XG4gICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdUYXNrRWxlbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tY2hlY2tlZFwiKTtcbiAgICAgIG5ld1Rhc2tFbGVtZW50Q2hlY2tib3gudGV4dENvbnRlbnQgPSBcIuKck1wiO1xuICAgIH1cbiAgfSk7XG5cbiAgY3JlYXRlRGVzY3JpcHRpb24obmV3VGFza0VsZW1lbnQsIG5ld1Rhc2tFbGVtZW50VGl0bGUsIGRlc2NyaXB0aW9uKTtcbiAgYWRkRWRpdEJ1dHRvbnMoKTtcbn07XG5cbmNvbnN0IHJlc2V0VG9kb0xpc3QgPSAocHJvamVjdE51bWJlcikgPT4ge1xuICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1pdGVtc1wiKTtcbiAgdGFza3MucmVwbGFjZUNoaWxkcmVuKCk7XG4gIGRhc2hib2FyZFtwcm9qZWN0TnVtYmVyXS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5ID0gdGFzay5wcmlvcml0eTtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSB0YXNrLnRpdGxlO1xuICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IHRhc2suZGVzY3JpcHRpb247XG5cbiAgICBjcmVhdGVOZXdUYXNrRWxlbWVudCh0YXNrUHJpb3JpdHksIHRhc2tUaXRsZSwgdGFza0Rlc2NyaXB0aW9uKTtcbiAgfSk7XG4gIGNyZWF0ZUFkZE5ld1Rhc2tFbGVtZW50KCk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdQcm9qZWN0RWxlbWVudCA9ICh0aXRsZSkgPT4ge1xuICBjb25zdCBzaWRlYmFySXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbXNcIik7XG4gIGNvbnN0IG5ld1Byb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNpZGViYXItaXRlbVwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIml0ZW1cIik7XG4gIG5ld1Byb2plY3RFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBkYXNoYm9hcmQubGVuZ3RoIC0gMSk7XG4gIGNvbnN0IG5ld1Byb2plY3RFbGVtZW50VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdQcm9qZWN0RWxlbWVudFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyLWl0ZW0tdGl0bGVcIik7XG4gIG5ld1Byb2plY3RFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEVsZW1lbnRUaXRsZSk7XG4gIHNpZGViYXJJdGVtcy5hcHBlbmRDaGlsZChuZXdQcm9qZWN0RWxlbWVudCk7XG5cbiAgYWRkRWRpdEJ1dHRvbnMoKTtcblxuICBuZXdQcm9qZWN0RWxlbWVudFRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gICAgY29uc3QgcHJvamVjdE51bWJlciA9IG5ld1Byb2plY3RFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKTtcbiAgICB0YXNrcy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgcHJvamVjdE51bWJlcik7XG4gICAgdGFza3MucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgcmVzZXRUb2RvTGlzdChwcm9qZWN0TnVtYmVyKTtcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdQcm9qZWN0ID0gKCkgPT4ge1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1uYW1lXCIpLnZhbHVlO1xuICBuZXdQcm9qZWN0KCk7XG4gIGNyZWF0ZU5ld1Byb2plY3RFbGVtZW50KHRpdGxlKTtcbiAgY3JlYXRlQWRkTmV3UHJvamVjdEVsZW1lbnQoKTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5ld1Rhc2sgPSAocHJvamVjdCkgPT4ge1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza1wiKS52YWx1ZTtcbiAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGVcIikudmFsdWU7XG4gIGxldCBwcmlvcml0eSA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWUpO1xuICBpZiAocHJpb3JpdHkgPT09IDApIHByaW9yaXR5ID0gMTtcbiAgaWYgKHByaW9yaXR5ID4gcHJvamVjdC5sZW5ndGggKyAxKSBwcmlvcml0eSA9IHByb2plY3QubGVuZ3RoICsgMTtcbiAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgaWYgKGRlc2NyaXB0aW9uID09PSBcIlwiKSBkZXNjcmlwdGlvbiA9IFwiTm8gZGVzY3JpcHRpb24gYXZhaWxhYmxlLlwiO1xuICBjb25zdCBjaGVja2VkID0gZmFsc2U7IC8vIFRlbXBvcmFyeVxuICBsZXQgZXhpc3RzID0gZmFsc2U7XG4gIGlmIChwcm9qZWN0W3ByaW9yaXR5IC0gMV0pIHtcbiAgICBleGlzdHMgPSB0cnVlO1xuICAgIG5ld1Rhc2socHJvamVjdCwgdGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBkZXNjcmlwdGlvbiwgY2hlY2tlZCwgZXhpc3RzKTtcbiAgICBwcm9qZWN0LmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgdGFzay5wcmlvcml0eSA9IHByb2plY3QuaW5kZXhPZih0YXNrKSArIDE7XG4gICAgfSk7XG4gICAgcmVzZXRUb2RvTGlzdChkYXNoYm9hcmQuaW5kZXhPZihwcm9qZWN0KSk7XG4gIH0gZWxzZSB7XG4gICAgbmV3VGFzayhwcm9qZWN0LCB0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIGRlc2NyaXB0aW9uLCBjaGVja2VkLCBleGlzdHMpO1xuICAgIGNyZWF0ZU5ld1Rhc2tFbGVtZW50KHByaW9yaXR5LCB0aXRsZSwgZGVzY3JpcHRpb24pO1xuICAgIGNyZWF0ZUFkZE5ld1Rhc2tFbGVtZW50KCk7XG4gIH1cbn07XG5cbi8vIENyZWF0ZSBvcGVuL2Nsb3NlIGNvbnRyb2xzIGZvciBhbGwgbW9kYWxzXG5jb25zdCBtb2RhbENvbnRyb2xzID0gKCkgPT4ge1xuICBjb25zdCBhZGROZXdQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdFwiKTtcbiAgY29uc3QgYWRkTmV3VGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXRhc2tcIik7XG4gIGNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1tb2RhbFwiKTtcbiAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLW1vZGFsXCIpO1xuICBjb25zdCB0YXNrRWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWVkaXQtbW9kYWxcIik7XG4gIGNvbnN0IHByb2plY3RDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1jbG9zZS1idXR0b25cIik7XG4gIGNvbnN0IHRhc2tDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jbG9zZS1idXR0b25cIik7XG4gIGNvbnN0IHRhc2tFZGl0Q2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZWRpdC1jbG9zZS1idXR0b25cIik7XG4gIGNvbnN0IHByb2plY3RTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3Qtc3VibWl0LWJ1dHRvblwiKTtcbiAgY29uc3QgdGFza1N1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1zdWJtaXQtYnV0dG9uXCIpO1xuXG4gIGFkZE5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybVwiKS5yZXNldCgpO1xuICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH0pO1xuXG4gIGFkZE5ld1Rhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybVwiKS5yZXNldCgpO1xuICAgIHRhc2tNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH0pO1xuXG4gIHByb2plY3RDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgdGFza0Nsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGFza01vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9KTtcblxuICB0YXNrRWRpdENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGFza0VkaXRNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgcHJvamVjdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBwcm9qZWN0TW9kYWwpIHtcbiAgICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHRhc2tNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGFza01vZGFsKSB7XG4gICAgICB0YXNrTW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcblxuICB0YXNrRWRpdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0YXNrRWRpdE1vZGFsKSB7XG4gICAgICB0YXNrRWRpdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG5cbiAgcHJvamVjdFN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RNb2RhbElucHV0cyA9IEFycmF5LmZyb20oXG4gICAgICBwcm9qZWN0TW9kYWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpXG4gICAgKTtcbiAgICBpZiAocHJvamVjdE1vZGFsSW5wdXRzLmV2ZXJ5KHZhbGlkaXR5Q2hlY2spKSB7XG4gICAgICBjcmVhdGVOZXdQcm9qZWN0KCk7XG4gICAgICBwcm9qZWN0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcblxuICB0YXNrU3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgdGFza01vZGFsSW5wdXRzID0gQXJyYXkuZnJvbSh0YXNrTW9kYWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpKTtcbiAgICBpZiAodGFza01vZGFsSW5wdXRzLmV2ZXJ5KHZhbGlkaXR5Q2hlY2spKSB7XG4gICAgICBjb25zdCB0b2RvSXRlbXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8taXRlbXNcIik7XG4gICAgICBjb25zdCBwcm9qZWN0ID1cbiAgICAgICAgZGFzaGJvYXJkW3BhcnNlSW50KHRvZG9JdGVtc0NvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpXTtcbiAgICAgIGNyZWF0ZU5ld1Rhc2socHJvamVjdCk7XG4gICAgICB0YXNrTW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCB7IGFkZEVkaXRCdXR0b25zLCBtb2RhbENvbnRyb2xzLCBjcmVhdGVEcm9wZG93bkhpZGVyIH07XG4iLCJjb25zdCBkYXNoYm9hcmQgPSBbXTtcblxuY29uc3QgbmV3UHJvamVjdCA9ICgpID0+IHtcbiAgZGFzaGJvYXJkLnB1c2goW10pO1xufTtcblxuY29uc3QgbmV3VGFzayA9IChcbiAgcHJvamVjdCxcbiAgdGl0bGUsXG4gIGR1ZURhdGUsXG4gIHByaW9yaXR5LFxuICBkZXNjcmlwdGlvbixcbiAgY2hlY2tlZCxcbiAgZXhpc3RzXG4pID0+IHtcbiAgaWYgKGV4aXN0cykge1xuICAgIHByb2plY3Quc3BsaWNlKHByaW9yaXR5IC0gMSwgMCwge1xuICAgICAgdGl0bGUsXG4gICAgICBkdWVEYXRlLFxuICAgICAgcHJpb3JpdHksXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGNoZWNrZWQsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcHJvamVjdC5wdXNoKHtcbiAgICAgIHRpdGxlLFxuICAgICAgZHVlRGF0ZSxcbiAgICAgIHByaW9yaXR5LFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBjaGVja2VkLFxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgeyBkYXNoYm9hcmQsIG5ld1Byb2plY3QsIG5ld1Rhc2sgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IGFkZEVkaXRCdXR0b25zLCBtb2RhbENvbnRyb2xzLCBjcmVhdGVEcm9wZG93bkhpZGVyIH0gZnJvbSBcIi4vRE9NXCI7XG5cbmNyZWF0ZURyb3Bkb3duSGlkZXIoKTtcbmFkZEVkaXRCdXR0b25zKCk7XG5tb2RhbENvbnRyb2xzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=