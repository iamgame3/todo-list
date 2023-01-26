const dashboard = [];

const newProject = (title) => {
  dashboard.push(title);
};

const newTask = (project, title, dueDate, priority, descripton, checked) => {
  project.push({
    title,
    dueDate,
    priority,
    descripton,
    checked,
  });
};

export { dashboard, newProject, newTask };
