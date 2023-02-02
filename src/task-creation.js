/* eslint-disable radix */
import {
  createProjectCompletion,
  createOverdueTasksCount,
} from "./project-components";
import { dashboard, newTask } from "./project-task-logic";
import { isToday, isOverdue } from "./time";
import createDescription from "./task-components";
import { addEditButtons } from "./project-task-components";

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
  createProjectCompletion(project);
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
      dashboard[parseInt(todoItems.getAttribute("data-project"))][
        priority - 1
      ].checked = false;
      project.setAttribute(
        "data-completed",
        parseInt(project.getAttribute("data-completed")) - 1
      );
      if (isToday(dueDate) && isOverdue(dueDate)) {
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
        createProjectCompletion(project, true);
        createOverdueTasksCount();
      }
      if (isToday(dueDate) && !isOverdue(dueDate)) {
        const dueToday = document.querySelector(".sidebar-item-today");
        dueToday.setAttribute(
          "data-completed",
          parseInt(dueToday.getAttribute("data-completed")) - 1
        );
        createProjectCompletion(project, true);
      }
      if (isOverdue(dueDate) && !isToday(dueDate)) {
        const overdue = document.querySelector(".sidebar-item-overdue");
        overdue.setAttribute(
          "data-tasks",
          parseInt(overdue.getAttribute("data-tasks")) + 1
        );
        createOverdueTasksCount();
        createProjectCompletion(project, false);
      } else createProjectCompletion(project, false);
    } else {
      newTaskElement
        .querySelector(".todo-item-title")
        .classList.add("todo-item-checked");
      newTaskElementCheckbox.textContent = "✓";
      dashboard[parseInt(todoItems.getAttribute("data-project"))][
        priority - 1
      ].checked = true;
      project.setAttribute(
        "data-completed",
        parseInt(project.getAttribute("data-completed")) + 1
      );
      if (isToday(dueDate) && isOverdue(dueDate)) {
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
        createProjectCompletion(project, true);
        createOverdueTasksCount();
      }
      if (isToday(dueDate) && !isOverdue(dueDate)) {
        const dueToday = document.querySelector(".sidebar-item-today");
        dueToday.setAttribute(
          "data-completed",
          parseInt(dueToday.getAttribute("data-completed")) + 1
        );
        createProjectCompletion(project, true);
      }
      if (isOverdue(dueDate) && !isToday(dueDate)) {
        const overdue = document.querySelector(".sidebar-item-overdue");
        overdue.setAttribute(
          "data-tasks",
          parseInt(overdue.getAttribute("data-tasks")) - 1
        );
        createOverdueTasksCount();
        createProjectCompletion(project, false);
      } else createProjectCompletion(project, false);
    }
  });

  createDescription(newTaskElement, newTaskElementTitle, description);
  addEditButtons();
};

const resetTodoList = (projectNumber) => {
  const tasks = document.querySelector(".todo-items");
  tasks.replaceChildren();
  dashboard[projectNumber].forEach((task) => {
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
  if (isToday(dueDate)) {
    const dueToday = document.querySelector(".sidebar-item-today");
    dueToday.setAttribute(
      "data-tasks",
      parseInt(dueToday.getAttribute("data-tasks")) + 1
    );
    createProjectCompletion(false, true);
  }
  if (isOverdue(dueDate)) {
    const overdue = document.querySelector(".sidebar-item-overdue");
    overdue.setAttribute(
      "data-tasks",
      parseInt(overdue.getAttribute("data-tasks")) + 1
    );
    createOverdueTasksCount();
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
    newTask(project, title, dueDate, priority, description, checked, exists);
    project.forEach((task) => {
      // eslint-disable-next-line no-param-reassign
      task.priority = project.indexOf(task) + 1;
    });
    resetTodoList(dashboard.indexOf(project));
  } else {
    newTask(project, title, dueDate, priority, description, checked, exists);
    createNewTaskElement(priority, title, dueDate, description, checked);
    createAddNewTaskElement();
  }
};

export {
  createAddNewTaskElement,
  createNewTaskElement,
  resetTodoList,
  createNewTask,
};
