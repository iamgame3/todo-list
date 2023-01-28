const dashboard = [];

const newProject = () => {
  dashboard.push([]);
};

const newTask = (project, title, dueDate, priority, description, checked) => {
  project.push({
    title,
    dueDate,
    priority,
    description,
    checked,
  });
};

export { dashboard, newProject, newTask };
