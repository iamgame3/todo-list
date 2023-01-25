const dash = [];

const newProject = (title) => {
  dash.push(title);
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

export { dash, newProject, newTask };
