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
    removeOption.textContent = "Remove";
    removeOption.classList.add("dropdown-item");
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

    editDropdown.addEventListener("click", () => {
      // For some reason, making the visibility "visible" hides it, I have no idea why but it works so I'm keeping it like this
      editDropdown.style.visibility = "visible";
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

const createNewProjectElement = (title) => {
  const sidebarItems = document.querySelector(".sidebar-items");
  const newProjectElement = document.createElement("div");
  newProjectElement.classList.add("sidebar-item");
  const newProjectElementTitle = document.createElement("div");
  newProjectElementTitle.textContent = title;
  newProjectElement.appendChild(newProjectElementTitle);
  sidebarItems.appendChild(newProjectElement);
  addEditButtons();
};

const createNewProject = () => {
  const title = document.getElementById("project-name").value;
  (0,_logic__WEBPACK_IMPORTED_MODULE_1__.newProject)(title);
  createNewProjectElement(title);
  createAddNewProjectElement();
};

const createNewTask = () => {
  const project = []; // Temporary
  _logic__WEBPACK_IMPORTED_MODULE_1__.dash.push(project); // Temporary
  const title = document.getElementById("task").value;
  const dueDate = document.getElementById("due-date").value;
  // eslint-disable-next-line radix
  const priority = parseInt(document.getElementById("priority").value);
  const descripton = document.getElementById("description").value;
  const checked = false; // Temporary
  (0,_logic__WEBPACK_IMPORTED_MODULE_1__.newTask)(project, title, dueDate, priority, descripton, checked);
};

// Create open/close controls for all modals
const modalControls = () => {
  const addNewProject = document.getElementById("new-project");
  const addNewTask = document.getElementById("new-task");
  const projectModal = document.querySelector(".project-modal");
  const taskModal = document.querySelector(".task-modal");
  const projectCloseButton = document.querySelector(".project-close-button");
  const taskCloseButton = document.querySelector(".task-close-button");
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

  projectSubmitButton.addEventListener("click", () => {
    createNewProject();
    projectModal.style.visibility = "hidden";
  });

  taskSubmitButton.addEventListener("click", () => {
    createNewTask();
    taskModal.style.visibility = "hidden";
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
/* harmony export */   "dash": () => (/* binding */ dash),
/* harmony export */   "newProject": () => (/* binding */ newProject),
/* harmony export */   "newTask": () => (/* binding */ newTask)
/* harmony export */ });
const dash = [];

const newProject = (title) => {
  dash.push(title);
};

const newTask = (project, title, dueDate, priority, descripton, checked) => {
  project.push({
    title,
    dueDate,
    priority,
    descripton,
    checked,
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBb0Q7QUFDQTs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFEQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRSxrREFBVTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QixFQUFFLDZDQUFTLFdBQVc7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixFQUFFLCtDQUFPO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRThEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hLOUQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNoQnJDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7QUNmMkU7O0FBRTNFLHlEQUFtQjtBQUNuQixvREFBYztBQUNkLG1EQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZWRpdEljb25TcmMgZnJvbSBcIi4vaWNvbnMvZG90cy12ZXJ0aWNhbC5zdmdcIjtcbmltcG9ydCB7IGRhc2gsIG5ld1Byb2plY3QsIG5ld1Rhc2sgfSBmcm9tIFwiLi9sb2dpY1wiO1xuXG5jb25zdCBjcmVhdGVEcm9wZG93bkhpZGVyID0gKCkgPT4ge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChcbiAgICAgICFldmVudC50YXJnZXQubWF0Y2hlcyhcIi5kcm9wZG93bi1jb250ZW50XCIpICYmXG4gICAgICAhZXZlbnQudGFyZ2V0Lm1hdGNoZXMoXCIuZWRpdC1idXR0b25cIilcbiAgICApIHtcbiAgICAgIGNvbnN0IGRyb3Bkb3ducyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJvcGRvd24tY29udGVudFwiKTtcbiAgICAgIGRyb3Bkb3ducy5mb3JFYWNoKChkcm9wZG93bikgPT4ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgZHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcblxuLy8gQWRkIGVkaXQgYnV0dG9ucyB0byBwcm9qZWN0cyBhbmQgdGFza3NcbmNvbnN0IGFkZEVkaXRCdXR0b25zID0gKCkgPT4ge1xuICAvLyBNYWtlIGFuIGVkaXQgYnV0dG9uXG4gIGNvbnN0IGFkZEVkaXRCdXR0b24gPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVkaXRJY29uID0gbmV3IEltYWdlKCk7XG4gICAgY29uc3QgZWRpdERyb3Bkb3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBlZGl0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCByZW1vdmVPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVkaXRJY29uLnNyYyA9IGVkaXRJY29uU3JjO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIlZlcnRpY2FsIGRvdHRlZCBsaW5lIGljb24gZm9yIGVkaXQgb3B0aW9ucy5cIik7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idXR0b25cIik7XG4gICAgZWRpdERyb3Bkb3duLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1jb250ZW50XCIpO1xuICAgIGVkaXREcm9wZG93bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBlZGl0T3B0aW9uLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG4gICAgZWRpdE9wdGlvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbVwiKTtcbiAgICByZW1vdmVPcHRpb24udGV4dENvbnRlbnQgPSBcIlJlbW92ZVwiO1xuICAgIHJlbW92ZU9wdGlvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbVwiKTtcbiAgICBlZGl0RHJvcGRvd24uYXBwZW5kQ2hpbGQoZWRpdE9wdGlvbik7XG4gICAgZWRpdERyb3Bkb3duLmFwcGVuZENoaWxkKHJlbW92ZU9wdGlvbik7XG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idXR0b25cIik7XG4gICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd25cIik7XG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XG4gICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0RHJvcGRvd24pO1xuICAgIGl0ZW0uYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG5cbiAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPT09IFwiaGlkZGVuXCIpIHtcbiAgICAgICAgZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIH0gZWxzZSBlZGl0RHJvcGRvd24uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfSk7XG5cbiAgICBlZGl0RHJvcGRvd24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIC8vIEZvciBzb21lIHJlYXNvbiwgbWFraW5nIHRoZSB2aXNpYmlsaXR5IFwidmlzaWJsZVwiIGhpZGVzIGl0LCBJIGhhdmUgbm8gaWRlYSB3aHkgYnV0IGl0IHdvcmtzIHNvIEknbSBrZWVwaW5nIGl0IGxpa2UgdGhpc1xuICAgICAgZWRpdERyb3Bkb3duLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBSZW1vdmUgYWxsIGVkaXQgYnV0dG9ucyBhbmQgdGhlbiBtYWtlIGFuIGVkaXQgYnV0dG9uIGZvciBldmVyeSBwcm9qZWN0IGFuZCB0YXNrXG4gIGNvbnN0IGVkaXRCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lZGl0LWJ1dHRvblwiKTtcbiAgZWRpdEJ1dHRvbnMuZm9yRWFjaCgoZWRpdEJ1dHRvbikgPT4gZWRpdEJ1dHRvbi5yZW1vdmUoKSk7XG4gIGNvbnN0IHRlc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2lkZWJhci1pdGVtXCIpO1xuICBjb25zdCB0ZXN0SXRlbXMyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWl0ZW1cIik7XG4gIHRlc3RJdGVtcy5mb3JFYWNoKCh0ZXN0SXRlbSkgPT4gYWRkRWRpdEJ1dHRvbih0ZXN0SXRlbSkpO1xuICB0ZXN0SXRlbXMyLmZvckVhY2goKHRlc3RJdGVtKSA9PiBhZGRFZGl0QnV0dG9uKHRlc3RJdGVtKSk7XG59O1xuXG5jb25zdCBjcmVhdGVBZGROZXdQcm9qZWN0RWxlbWVudCA9ICgpID0+IHtcbiAgY29uc3Qgc2lkZWJhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyLWl0ZW1zXCIpO1xuICBjb25zdCBvbGRBZGROZXdQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXByb2plY3RcIik7XG4gIG9sZEFkZE5ld1Byb2plY3RFbGVtZW50LnJlbW92ZSgpO1xuICBjb25zdCBuZXdBZGROZXdQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld0FkZE5ld1Byb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyLWl0ZW0tYWRkXCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm5ldy1wcm9qZWN0XCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICBjb25zdCBuZXdBZGROZXdQcm9qZWN0RWxlbWVudFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnRUaXRsZS50ZXh0Q29udGVudCA9IFwiKyBBZGQgTmV3IFByb2plY3RcIjtcbiAgbmV3QWRkTmV3UHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3QWRkTmV3UHJvamVjdEVsZW1lbnRUaXRsZSk7XG4gIHNpZGViYXJJdGVtcy5hcHBlbmRDaGlsZChuZXdBZGROZXdQcm9qZWN0RWxlbWVudCk7XG5cbiAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW1vZGFsXCIpO1xuICBuZXdBZGROZXdQcm9qZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpLnJlc2V0KCk7XG4gICAgcHJvamVjdE1vZGFsLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdQcm9qZWN0RWxlbWVudCA9ICh0aXRsZSkgPT4ge1xuICBjb25zdCBzaWRlYmFySXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXItaXRlbXNcIik7XG4gIGNvbnN0IG5ld1Byb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNpZGViYXItaXRlbVwiKTtcbiAgY29uc3QgbmV3UHJvamVjdEVsZW1lbnRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5ld1Byb2plY3RFbGVtZW50VGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgbmV3UHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEVsZW1lbnRUaXRsZSk7XG4gIHNpZGViYXJJdGVtcy5hcHBlbmRDaGlsZChuZXdQcm9qZWN0RWxlbWVudCk7XG4gIGFkZEVkaXRCdXR0b25zKCk7XG59O1xuXG5jb25zdCBjcmVhdGVOZXdQcm9qZWN0ID0gKCkgPT4ge1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1uYW1lXCIpLnZhbHVlO1xuICBuZXdQcm9qZWN0KHRpdGxlKTtcbiAgY3JlYXRlTmV3UHJvamVjdEVsZW1lbnQodGl0bGUpO1xuICBjcmVhdGVBZGROZXdQcm9qZWN0RWxlbWVudCgpO1xufTtcblxuY29uc3QgY3JlYXRlTmV3VGFzayA9ICgpID0+IHtcbiAgY29uc3QgcHJvamVjdCA9IFtdOyAvLyBUZW1wb3JhcnlcbiAgZGFzaC5wdXNoKHByb2plY3QpOyAvLyBUZW1wb3JhcnlcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tcIikudmFsdWU7XG4gIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpLnZhbHVlO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmFkaXhcbiAgY29uc3QgcHJpb3JpdHkgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlKTtcbiAgY29uc3QgZGVzY3JpcHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb25cIikudmFsdWU7XG4gIGNvbnN0IGNoZWNrZWQgPSBmYWxzZTsgLy8gVGVtcG9yYXJ5XG4gIG5ld1Rhc2socHJvamVjdCwgdGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBkZXNjcmlwdG9uLCBjaGVja2VkKTtcbn07XG5cbi8vIENyZWF0ZSBvcGVuL2Nsb3NlIGNvbnRyb2xzIGZvciBhbGwgbW9kYWxzXG5jb25zdCBtb2RhbENvbnRyb2xzID0gKCkgPT4ge1xuICBjb25zdCBhZGROZXdQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcHJvamVjdFwiKTtcbiAgY29uc3QgYWRkTmV3VGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXRhc2tcIik7XG4gIGNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1tb2RhbFwiKTtcbiAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLW1vZGFsXCIpO1xuICBjb25zdCBwcm9qZWN0Q2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtY2xvc2UtYnV0dG9uXCIpO1xuICBjb25zdCB0YXNrQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY2xvc2UtYnV0dG9uXCIpO1xuICBjb25zdCBwcm9qZWN0U3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXN1Ym1pdC1idXR0b25cIik7XG4gIGNvbnN0IHRhc2tTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stc3VibWl0LWJ1dHRvblwiKTtcblxuICBhZGROZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm1cIikucmVzZXQoKTtcbiAgICBwcm9qZWN0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICB9KTtcblxuICBhZGROZXdUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm1cIikucmVzZXQoKTtcbiAgICB0YXNrTW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICB9KTtcblxuICBwcm9qZWN0Q2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBwcm9qZWN0TW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIH0pO1xuXG4gIHRhc2tDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRhc2tNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgcHJvamVjdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBwcm9qZWN0TW9kYWwpIHtcbiAgICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHRhc2tNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGFza01vZGFsKSB7XG4gICAgICB0YXNrTW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9KTtcblxuICBwcm9qZWN0U3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY3JlYXRlTmV3UHJvamVjdCgpO1xuICAgIHByb2plY3RNb2RhbC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgfSk7XG5cbiAgdGFza1N1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNyZWF0ZU5ld1Rhc2soKTtcbiAgICB0YXNrTW9kYWwuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgYWRkRWRpdEJ1dHRvbnMsIG1vZGFsQ29udHJvbHMsIGNyZWF0ZURyb3Bkb3duSGlkZXIgfTtcbiIsImNvbnN0IGRhc2ggPSBbXTtcblxuY29uc3QgbmV3UHJvamVjdCA9ICh0aXRsZSkgPT4ge1xuICBkYXNoLnB1c2godGl0bGUpO1xufTtcblxuY29uc3QgbmV3VGFzayA9IChwcm9qZWN0LCB0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIGRlc2NyaXB0b24sIGNoZWNrZWQpID0+IHtcbiAgcHJvamVjdC5wdXNoKHtcbiAgICB0aXRsZSxcbiAgICBkdWVEYXRlLFxuICAgIHByaW9yaXR5LFxuICAgIGRlc2NyaXB0b24sXG4gICAgY2hlY2tlZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBkYXNoLCBuZXdQcm9qZWN0LCBuZXdUYXNrIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgeyBhZGRFZGl0QnV0dG9ucywgbW9kYWxDb250cm9scywgY3JlYXRlRHJvcGRvd25IaWRlciB9IGZyb20gXCIuL0RPTVwiO1xuXG5jcmVhdGVEcm9wZG93bkhpZGVyKCk7XG5hZGRFZGl0QnV0dG9ucygpO1xubW9kYWxDb250cm9scygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9