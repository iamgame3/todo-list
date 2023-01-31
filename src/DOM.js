/* eslint-disable radix */
import editIconSrc from "./icons/dots-vertical.svg";
import { dashboard, newProject, newTask } from "./logic";

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

// Add project completion status
const createProjectCompletion = (project) => {
  const tasks =
    dashboard[parseInt(project.getAttribute("data-project"))].length;
  const completedTasks = parseInt(project.getAttribute("data-completed"));
  const oldCompletion = /\(\d*\/\d*\)/;
  let title = project.querySelector(".sidebar-item-title").textContent;
  const completionIndex = title.search(oldCompletion) - 1;
  title = title.substring(0, completionIndex);
  title = `${title} (${completedTasks}/${tasks})`;
  // eslint-disable-next-line no-param-reassign
  project.querySelector(".sidebar-item-title").textContent = title;
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
      createProjectCompletion(project);
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
      createProjectCompletion(project);
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

const createNewProjectElement = (title) => {
  const sidebarItems = document.querySelector(".sidebar-items");
  const newProjectElement = document.createElement("div");
  newProjectElement.classList.add("sidebar-item");
  newProjectElement.classList.add("item");
  newProjectElement.setAttribute("data-project", dashboard.length - 1);
  newProjectElement.setAttribute("data-completed", 0);
  const newProjectElementTitle = document.createElement("div");
  newProjectElementTitle.classList.add("sidebar-item-title");
  newProjectElementTitle.textContent = `${title} (0/0)`;
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
  newProject();
  createNewProjectElement(title);
  createAddNewProjectElement();
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

// Create open/close controls for all modals
const modalControls = () => {
  const addNewProject = document.getElementById("new-project");
  const addNewTask = document.getElementById("new-task");
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

  addNewTask.addEventListener("click", () => {
    document.getElementById("task-form").reset();
    taskModal.style.visibility = "visible";
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
      createNewProject();
      projectModal.style.visibility = "hidden";
    }
  });

  taskSubmitButton.addEventListener("click", () => {
    const taskModalInputs = Array.from(taskModal.querySelectorAll("input"));
    if (taskModalInputs.every(validityCheck)) {
      const todoItemsContainer = document.querySelector(".todo-items");
      const project =
        dashboard[parseInt(todoItemsContainer.getAttribute("data-project"))];
      createNewTask(project);
      taskModal.style.visibility = "hidden";
    }
  });
};

export { addEditButtons, modalControls, createDropdownHider };
