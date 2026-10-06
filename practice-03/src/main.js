import { demoTasks, variantTasks } from "./data.js";
import { setTaskCompleted, removeTask, findTaskById } from "./task-service.js";
import { renderApp } from "./task-view.js";

const listElement = document.querySelector("#task-list");
const summaryElement = document.querySelector("#task-summary");
const messageElement = document.querySelector("#empty-message");
const filtersElement = document.querySelector("#task-filters");
const operationMessageElement = document.querySelector("#operation-message");

let currentTasks = [];
let currentFilter = "all";

function setActiveFilter(filter) {
  currentFilter = filter;
  const buttons = filtersElement.querySelectorAll("button");
  buttons.forEach((btn) => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function handleFilterClick(event) {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("button[data-filter]");
  if (!button || !filtersElement.contains(button)) return;

  const filter = button.dataset.filter;
  if (filter !== "all" && filter !== "pending" && filter !== "completed") return;

  setActiveFilter(filter);
  operationMessageElement.textContent = "";
  renderApp(listElement, summaryElement, messageElement, currentTasks, currentFilter, setActiveFilter);
}

function restoreTaskFocus(id, action) {
  const card = listElement.querySelector(`li[data-task-id="${id}"]`);
  if (card) {
    const button = card.querySelector(`button[data-action="${action}"]`);
    if (button) {
      button.focus();
      return;
    }
  }
  const activeFilter = filtersElement.querySelector("button.is-active");
  if (activeFilter) {
    activeFilter.focus();
  }
}

function handleTaskListClick(event) {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest("button[data-action]");
  if (!button || !listElement.contains(button)) return;

  const action = button.dataset.action;
  if (action !== "toggle" && action !== "delete") return;

  const card = button.closest("li[data-task-id]");
  if (!card) return;

  const rawId = card.dataset.taskId;
  const id = Number(rawId);
  console.log("DEBUG rawId:", rawId, "id:", id, "isSafe:", Number.isSafeInteger(id));

  if (!Number.isSafeInteger(id) || id <= 0) {
    return;
  }

  const task = findTaskById(currentTasks, id);
  if (!task) {
    operationMessageElement.textContent = `Задача с id=${id} не найдена`;
    return;
  }

  let result;
  if (action === "toggle") {
    result = setTaskCompleted(currentTasks, id, !task.completed);
  } else {
    result = removeTask(currentTasks, id);
  }

  if (!result.ok) {
    operationMessageElement.textContent = result.error;
    return;
  }

  currentTasks = result.tasks;
  operationMessageElement.textContent = "";
  renderApp(listElement, summaryElement, messageElement, currentTasks, currentFilter, setActiveFilter);
  restoreTaskFocus(id, action);
}

function initApp(initialTasks) {
  currentTasks = initialTasks.map((task) => ({ ...task }));
  currentFilter = "all";

  filtersElement.addEventListener("click", handleFilterClick);
  listElement.addEventListener("click", handleTaskListClick);

  renderApp(listElement, summaryElement, messageElement, currentTasks, currentFilter, setActiveFilter);
}

const urlParams = new URLSearchParams(window.location.search);
const dataset = urlParams.get("dataset");

if (dataset === "variant") {
  initApp(variantTasks);
} else {
  initApp(demoTasks);
}