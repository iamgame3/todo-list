import editIconSrc from "./icons/dots-vertical.svg";

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

export default addEditButton;
