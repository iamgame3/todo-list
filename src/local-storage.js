/* eslint-disable radix */
import { dashboard, projectNames } from "./project-task-logic";
import { addEditButtons } from "./project-task-components";
import {
  createProjectCompletion,
  createOverdueTasksCount,
} from "./project-components";
import { isOverdue, isToday } from "./time";
import { resetTodoList } from "./task-creation";

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
  dashboard[pageReset].forEach((task) => {
    if (task.checked) {
      if (isToday(task.dueDate)) {
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
      if (isOverdue(task.dueDate)) {
        overdueElement.setAttribute(
          "data-tasks",
          parseInt(overdueElement.getAttribute("data-tasks")) + 1
        );
      }
      if (isToday(task.dueDate)) {
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
  )}/${dashboard[pageReset].length})`;
  newProjectElement.appendChild(newProjectElementTitle);
  addNewProjectElement.insertAdjacentElement("beforebegin", newProjectElement);

  addEditButtons();

  createOverdueTasksCount();
  createProjectCompletion(newProjectElement, true);

  newProjectElementTitle.addEventListener("click", () => {
    const tasks = document.querySelector(".todo-items");
    const projectNumber = newProjectElement.getAttribute("data-project");
    tasks.setAttribute("data-project", projectNumber);
    tasks.replaceChildren();
    resetTodoList(projectNumber);
  });
};

const updateStorage = () => {
  localStorage.setItem("dashboard", JSON.stringify(dashboard));
  localStorage.setItem("projectNames", JSON.stringify(projectNames));
  console.log("Yo");
};

const target = document.querySelector(".content");
const config = { attributes: true, childList: true, subtree: true };
const callback = () => updateStorage();
const observer = new MutationObserver(callback);
observer.observe(target, config);

const populatePage = () => {
  console.log("It worked!");
  console.log(dashboard);
  dashboard.forEach((project) => {
    const projectIndex = dashboard.indexOf(project);
    const projectTitle = projectNames[projectIndex];
    console.log(projectTitle);
    createProjectElement(projectTitle, projectIndex);
  });
};

export { storageIsAvailable, updateStorage, populatePage };
