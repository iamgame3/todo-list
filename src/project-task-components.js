/* eslint-disable radix */
import editIconSrc from "./icons/dots-vertical.svg";
import { dashboard } from "./project-task-logic";
import createDescription from "./task-components";
import { createNewTaskElement, createAddNewTaskElement } from "./task-creation";
import { isToday, isOverdue } from "./time";
import {
  createOverdueTasksCount,
  createProjectCompletion,
} from "./project-components";

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
      dashboard[projectNumber][parseInt(item.firstChild.textContent) - 1];
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
    editIcon.src = editIconSrc;
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
        const lastProjectIndex = dashboard.length - 1;
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
        dashboard[projectIndex].forEach((task) => {
          if (isOverdue(task.dueDate) && !task.checked) {
            overdue.setAttribute(
              "data-tasks",
              parseInt(overdue.getAttribute("data-tasks")) - 1
            );
            createOverdueTasksCount();
          }
          if (isToday(task.dueDate)) {
            if (task.checked)
              dueToday.setAttribute(
                "data-completed",
                parseInt(dueToday.getAttribute("data-completed")) - 1
              );
            dueToday.setAttribute(
              "data-tasks",
              parseInt(dueToday.getAttribute("data-tasks")) - 1
            );
            createProjectCompletion(false, true);
          }
        });
        dashboard.splice(projectIndex, 1);
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
        const lastTaskIndex = dashboard[projectIndex].length - 1;
        const task = dashboard[projectIndex][index];
        if (
          parentItem.nextSibling.classList.contains("todo-item-description")
        ) {
          parentItem.nextSibling.remove();
        }
        parentItem.remove();
        for (let i = index + 1; i < lastTaskIndex + 1; i += 1) {
          dashboard[projectIndex][i].priority -= 1;
        }
        if (task.checked)
          project.setAttribute(
            "data-completed",
            parseInt(project.getAttribute("data-completed")) - 1
          );
        if (isOverdue(task.dueDate) && !task.checked) {
          overdue.setAttribute(
            "data-tasks",
            parseInt(overdue.getAttribute("data-tasks")) - 1
          );
          createOverdueTasksCount();
        }
        if (isToday(task.dueDate)) {
          if (task.checked)
            dueToday.setAttribute(
              "data-completed",
              parseInt(dueToday.getAttribute("data-completed")) - 1
            );
          dueToday.setAttribute(
            "data-tasks",
            parseInt(dueToday.getAttribute("data-tasks")) - 1
          );
          dashboard[projectIndex].splice(index, 1);
          createProjectCompletion(project, true);
        } else {
          createProjectCompletion(project, false);
          dashboard[projectIndex].splice(index, 1);
        }
        resetTodoList(projectIndex);
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

export {
  createDropdownHider,
  editFunctionality,
  addEditButtons,
  resetTodoList,
};
