const dataCreation = () => {
  if (localStorage.getItem("dashboard")) {
    const dashboardTemp = JSON.parse(localStorage.getItem("dashboard"));
    const projectNamesTemp = JSON.parse(localStorage.getItem("projectNames"));
    return [dashboardTemp, projectNamesTemp];
  }
  const dashboardTemp = [];
  const projectNamesTemp = [];
  return [dashboardTemp, projectNamesTemp];
};

const dashboard = dataCreation()[0];
const projectNames = dataCreation()[1];

const existingProjectsCheck = () => {
  if (localStorage.getItem("dashboard")) {
    return true;
  }
  return false;
};

const newProject = (projectName) => {
  dashboard.push([]);
  projectNames.push(projectName);
};

const newTask = (
  project,
  title,
  dueDate,
  priority,
  description,
  checked,
  exists
) => {
  if (exists) {
    project.splice(priority - 1, 0, {
      title,
      dueDate,
      priority,
      description,
      checked,
    });
  } else {
    project.push({
      title,
      dueDate,
      priority,
      description,
      checked,
    });
  }
};

export { existingProjectsCheck, dashboard, projectNames, newProject, newTask };
