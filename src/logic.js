const dash = [];

const newProject = (title) => {
  dash.push(title);
};

const newTodoItem = (
  project,
  title,
  descripton,
  dueDate,
  priority,
  checked
) => {
  project.push({
    title,
    descripton,
    dueDate,
    priority,
    checked,
  });
};

export { dash, newProject, newTodoItem };
