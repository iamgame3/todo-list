import editIconSrc from "./icons/dots-vertical.svg";

// Add edit buttons to projects and tasks (temporary)
const addEditButtons = () => {
  const addEditButton = (item) => {
    const editIcon = new Image();
    editIcon.src = editIconSrc;
    editIcon.setAttribute("alt", "Vertical dotted line icon for edit options.");
    editIcon.setAttribute("role", "button");
    editIcon.classList.add("edit-button");
    item.appendChild(editIcon);
  };
  const testItems = document.querySelectorAll(".sidebar-item");
  const testItems2 = document.querySelectorAll(".todo-item");
  testItems.forEach((testItem) => addEditButton(testItem));
  testItems2.forEach((testItem) => addEditButton(testItem));
};

// Create open/close controls for all modals
const modalControls = () => {
  const addNewProject = document.getElementById("new-project");
  const addNewTask = document.getElementById("new-task");
  const projectModal = document.querySelector(".project-modal");
  const taskModal = document.querySelector(".task-modal");
  const projectCloseButton = document.querySelector(".project-close-button");
  const taskCloseButton = document.querySelector(".task-close-button");

  addNewProject.addEventListener("click", () => {
    projectModal.style.visibility = "visible";
  });

  addNewTask.addEventListener("click", () => {
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
};

export { addEditButtons, modalControls };
