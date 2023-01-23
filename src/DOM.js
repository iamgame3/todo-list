import editIconSrc from "./icons/dots-vertical.svg";

// Add edit buttons to projects and tasks (temporary)
const addEditButton = () => {
  const testItem = document.querySelector(".sidebar-item");
  const testItem2 = document.querySelector(".todo-item");
  const editIcon = new Image();
  const editIcon2 = new Image();
  editIcon.src = editIconSrc;
  editIcon.setAttribute("alt", "Vertical dotted line icon for edit options.");
  editIcon.setAttribute("role", "button");
  editIcon.classList.add("edit-button");
  editIcon2.src = editIconSrc;
  editIcon2.setAttribute("alt", "Vertical dotted line icon for edit options.");
  editIcon2.setAttribute("role", "button");
  editIcon2.classList.add("edit-button");
  testItem.appendChild(editIcon);
  testItem2.appendChild(editIcon2);
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

export { addEditButton, modalControls };
