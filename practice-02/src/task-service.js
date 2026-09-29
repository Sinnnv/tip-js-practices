const VALID_PRIORITIES = ["low", "medium", "high"];

function validateId(id) {
  if (typeof id !== "number" || !Number.isSafeInteger(id) || id <= 0) {
    return { ok: false, error: "id должен быть положительным безопасным целым числом" };
  }
  return { ok: true };
}

function validateTitle(title) {
  if (typeof title !== "string") {
    return { ok: false, error: "title должен быть строкой" };
  }
  const trimmed = title.trim();
  if (trimmed.length === 0) {
    return { ok: false, error: "title не может быть пустым" };
  }
  if (trimmed.length > 100) {
    return { ok: false, error: "title не может быть длиннее 100 символов" };
  }
  return { ok: true, trimmed };
}

function validatePriority(priority) {
  if (!VALID_PRIORITIES.includes(priority)) {
    return { ok: false, error: `priority должен быть одним из: ${VALID_PRIORITIES.join(", ")}` };
  }
  return { ok: true };
}

export function createTask(id, title, priority = "medium") {
  const idCheck = validateId(id);
  if (!idCheck.ok) return idCheck;

  const titleCheck = validateTitle(title);
  if (!titleCheck.ok) return titleCheck;

  const priorityCheck = validatePriority(priority);
  if (!priorityCheck.ok) return priorityCheck;

  return {
    ok: true,
    task: {
      id,
      title: titleCheck.trimmed,
      completed: false,
      priority,
    },
  };
}

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed === true).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : (completed / total) * 100;
  return { total, completed, pending, progress };
}

export function addTask(tasks, id, title, priority = "medium") {
  const idCheck = validateId(id);
  if (!idCheck.ok) return idCheck;

  if (tasks.some((task) => task.id === id)) {
    return { ok: false, error: `Задача с id=${id} уже существует` };
  }

  const created = createTask(id, title, priority);
  if (!created.ok) return created;

  return { ok: true, tasks: [...tasks, created.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  const idCheck = validateId(id);
  if (!idCheck.ok) return idCheck;

  if (typeof completed !== "boolean") {
    return { ok: false, error: "completed должен быть boolean" };
  }

  const found = findTaskById(tasks, id);
  if (!found) {
    return { ok: false, error: `Задача с id=${id} не найдена` };
  }

  const newTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed } : task
  );
  return { ok: true, tasks: newTasks };
}

export function renameTask(tasks, id, title) {
  const idCheck = validateId(id);
  if (!idCheck.ok) return idCheck;

  const titleCheck = validateTitle(title);
  if (!titleCheck.ok) return titleCheck;

  const found = findTaskById(tasks, id);
  if (!found) {
    return { ok: false, error: `Задача с id=${id} не найдена` };
  }

  const newTasks = tasks.map((task) =>
    task.id === id ? { ...task, title: titleCheck.trimmed } : task
  );
  return { ok: true, tasks: newTasks };
}

export function removeTask(tasks, id) {
  const idCheck = validateId(id);
  if (!idCheck.ok) return idCheck;

  const found = findTaskById(tasks, id);
  if (!found) {
    return { ok: false, error: `Задача с id=${id} не найдена` };
  }

  return { ok: true, tasks: tasks.filter((task) => task.id !== id) };
}