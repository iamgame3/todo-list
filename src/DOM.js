import editIconSrc from "./icons/dots-vertical.svg";

const addEditButton = () => {
  const testItem = document.querySelector(".sidebar-item");
  const editIcon = new Image();
  editIcon.src = editIconSrc;
  editIcon.setAttribute("alt", "Vertical dotted line icon for edit options.");
  editIcon.setAttribute("role", "button");
  editIcon.classList.add("sidebar-item-edit-button");
  testItem.appendChild(editIcon);
};

export default addEditButton;
