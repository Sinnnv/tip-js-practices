import { getTaskStats } from "./task-service.js";
import { getVisibleTasks } from "./task-selectors.js";

export function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task-card";
  li.dataset.taskId = task.id;
  if (task.completed) {
    li.classList.add("is-completed");
  }

  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.title;

  const status = document.createElement("div");
  status.className = "task-status";
  status.textContent = task.completed ? "Выполнена" : "В работе";

  const priorityMap = {
    low: "Низкий",
    medium: "Средний",
    high: "Высокий",
  };
  const priority = document.createElement("div");
  priority.className = "task-priority";
  priority.textContent = priorityMap[task.priority];

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.dataset.action = "toggle";
  toggleBtn.setAttribute("aria-pressed", task.completed ? "true" : "false");
  const toggleLabel = document.createElement("span");
  toggleLabel.className = "action-label";
  toggleLabel.textContent = "Выполнена";
  toggleBtn.appendChild(toggleLabel);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.dataset.action = "delete";
  const deleteLabel = document.createElement("span");
  deleteLabel.className = "action-label";
  deleteLabel.textContent = "Удалить";
  deleteBtn.appendChild(deleteLabel);

  actions.appendChild(toggleBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(title);
  li.appendChild(status);
  li.appendChild(priority);
  li.appendChild(actions);

  return li;
}

export function renderTaskList(listElement, tasks) {
  const elements = tasks.map((task) => createTaskElement(task));
  listElement.replaceChildren(...elements);
}

export function renderSummary(summaryElement, tasks, visibleCount) {
  const stats = getTaskStats(tasks);
  
  const totalEl = summaryElement.querySelector('[data-stat="total"]');
  const completedEl = summaryElement.querySelector('[data-stat="completed"]');
  const pendingEl = summaryElement.querySelector('[data-stat="pending"]');
  const progressEl = summaryElement.querySelector('[data-stat="progress"]');
  const visibleEl = summaryElement.querySelector('[data-stat="visible"]');

  if (totalEl) totalEl.textContent = stats.total;
  if (completedEl) completedEl.textContent = stats.completed;
  if (pendingEl) pendingEl.textContent = stats.pending;
  if (progressEl) progressEl.textContent = `${stats.progress.toFixed(1)}%`;
  if (visibleEl) visibleEl.textContent = visibleCount;
}

export function renderEmptyState(messageElement, total, visibleCount) {
  if (total === 0 && visibleCount === 0) {
    messageElement.textContent = "Список задач пуст.";
    messageElement.hidden = false;
  } else if (total > 0 && visibleCount === 0) {
    messageElement.textContent = "Нет задач по выбранному фильтру.";
    messageElement.hidden = false;
  } else {
    messageElement.textContent = "";
    messageElement.hidden = true;
  }
}

export function renderApp(
  listElement,
  summaryElement,
  messageElement,
  tasks,
  filter,
  setActiveFilter
) {
  const visibleTasks = getVisibleTasks(tasks, filter);
  renderTaskList(listElement, visibleTasks);
  renderSummary(summaryElement, tasks, visibleTasks.length);
  renderEmptyState(messageElement, tasks.length, visibleTasks.length);
  if (setActiveFilter) {
    setActiveFilter(filter);
  }
}