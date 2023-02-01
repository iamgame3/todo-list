/* eslint-disable radix */
import { dashboard } from "./project-task-logic";

// Add project completion status
const createProjectCompletion = (project, dueToday) => {
  const oldCompletion = /\(\d*\/\d*\)/;
  if (project) {
    const tasks =
      dashboard[parseInt(project.getAttribute("data-project"))].length;
    const completedTasks = parseInt(project.getAttribute("data-completed"));
    let title = project.querySelector(".sidebar-item-title").textContent;
    const completionIndex = title.search(oldCompletion) - 1;
    title = title.substring(0, completionIndex);
    title = `${title} (${completedTasks}/${tasks})`;
    // eslint-disable-next-line no-param-reassign
    project.querySelector(".sidebar-item-title").textContent = title;
  }
  if (dueToday) {
    const dueTodayElement = document.querySelector(".sidebar-item-today");
    let dueTodayTitle = dueTodayElement.querySelector(
      ".sidebar-item-title"
    ).textContent;
    const dueTodayTasks = parseInt(dueTodayElement.getAttribute("data-tasks"));
    const dueTodayCompletedTasks = parseInt(
      dueTodayElement.getAttribute("data-completed")
    );
    const dueTodayCompletionIndex = dueTodayTitle.search(oldCompletion) - 1;
    dueTodayTitle = dueTodayTitle.substring(0, dueTodayCompletionIndex);
    dueTodayTitle = `${dueTodayTitle} (${dueTodayCompletedTasks}/${dueTodayTasks})`;
    dueTodayElement.querySelector(".sidebar-item-title").textContent =
      dueTodayTitle;
  }
};

export default createProjectCompletion;
