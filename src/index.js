import { createDropdownHider, addEditButtons } from "./project-task-components";
import modalControls from "./modal-controls";
import { storageIsAvailable, populatePage } from "./local-storage";
import { dueToday, overdue } from "./time";
import { existingProjectsCheck } from "./project-task-logic";

createDropdownHider();
addEditButtons();
modalControls();
dueToday();
overdue();
if (storageIsAvailable("localStorage") && existingProjectsCheck()) {
  populatePage();
  console.log("HI!");
}
