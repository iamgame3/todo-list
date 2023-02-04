/* eslint-disable radix */
import editIconSrc from "./icons/dots-vertical.svg";
import { dashboard, projectNames } from "./project-task-logic";
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
    taskElement
      .querySelector(".todo-item-title")
      .classList.add("todo-item-checked");
    // eslint-disable-next-line no-param-reassign
    taskElementCheckbox.textContent = "✓";
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
};

// Create edit option functionality
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
        projectNames[projectIndex] = projectEditModalTitle.value;
        projectEditModal.style.visibility = "hidden";
      }
    });
  } else {
    const itemPriority = item.firstChild;
    const itemTitle = item.querySelector(".todo-item-title");
    const itemDueDate = item.querySelector(".todo-item-due-date");
    const taskToEdit =
      dashboard[projectNumber][parseInt(item.firstChild.textContent) - 1];
    const previouslyOverdue = isOverdue(itemDueDate.textContent);
    const previouslyDueToday = isToday(itemDueDate.textContent);
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
        if (taskPriority > dashboard[projectNumber].length) {
          taskPriority = dashboard[projectNumber].length;
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
              dashboard[parseInt(todoItems.getAttribute("data-project"))][
                parseInt(elementPriorityNoPeriod) - 1
              ].priority -= 1;
              nextTask = nextTask.nextSibling;
              if (nextTask.classList.contains("todo-item-description")) {
                nextTask = nextTask.nextSibling;
              }
            }
            dashboard[parseInt(todoItems.getAttribute("data-project"))].splice(
              taskPriority,
              0,
              taskToEdit
            );
            dashboard[parseInt(todoItems.getAttribute("data-project"))].splice(
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
              dashboard[parseInt(todoItems.getAttribute("data-project"))][
                parseInt(elementPriorityNoPeriod) - 1
              ].priority += 1;
              nextTask = nextTask.nextSibling;
              if (nextTask.classList.contains("todo-item-description")) {
                nextTask = nextTask.nextSibling;
              }
            }
            dashboard[parseInt(todoItems.getAttribute("data-project"))].splice(
              taskPriority - 1,
              0,
              taskToEdit
            );
            dashboard[parseInt(todoItems.getAttribute("data-project"))].splice(
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
          isOverdue(formattedDueDate) &&
          !previouslyOverdue &&
          !taskToEdit.checked
        ) {
          overdueElement.setAttribute(
            "data-tasks",
            parseInt(overdueElement.getAttribute("data-tasks")) + 1
          );
          createOverdueTasksCount();
        }
        if (
          !isOverdue(formattedDueDate) &&
          previouslyOverdue &&
          !taskToEdit.checked
        ) {
          overdueElement.setAttribute(
            "data-tasks",
            parseInt(overdueElement.getAttribute("data-tasks")) - 1
          );
          createOverdueTasksCount();
        }
        if (isToday(formattedDueDate) && !previouslyDueToday) {
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
          createProjectCompletion(false, true);
        }
        if (!isToday(formattedDueDate) && previouslyDueToday) {
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
          createProjectCompletion(false, true);
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
        projectNames.splice(projectIndex, 1);
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
        let nextTask = parentItem.nextSibling;
        if (nextTask.classList.contains("todo-item-add")) {
          nextTask = false;
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

export {
  createDropdownHider,
  editFunctionality,
  addEditButtons,
  checkboxFunctionality,
};
