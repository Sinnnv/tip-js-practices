import { demoTasks, variantTasks, variantNumber } from "./data.js";
import {
  createTask,
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";
import { searchTasks } from "./task-extra.js";

function printStats(label, tasks) {
  console.log(`\n--- ${label} ---`);
  console.log("ID задач:", tasks.map((t) => t.id));
  const { total, completed, pending, progress } = getTaskStats(tasks);
  console.log(`Всего: ${total}; выполнено: ${completed}; осталось: ${pending}`);
  if (total === 0) {
    console.log("Задач пока нет");
  } else {
    console.log(`Прогресс: ${progress.toFixed(1)}%`);
  }
}

console.log("========== ОБЩИЙ СЦЕНАРИЙ (demoTasks) ==========");
let currentTasks = demoTasks;

printStats("Исходный набор", currentTasks);
console.log("Названия:", getTaskTitles(currentTasks));
console.log("Невыполненные:", getPendingTasks(currentTasks).map((t) => t.id));

let result = addTask(currentTasks, 20, "Добавить проверку", "high");
if (result.ok) currentTasks = result.tasks;
else console.error("Ошибка addTask:", result.error);
printStats("После добавления id=20", currentTasks);

result = setTaskCompleted(currentTasks, 4, true);
if (result.ok) currentTasks = result.tasks;
else console.error("Ошибка setTaskCompleted:", result.error);
printStats("После выполнения id=4", currentTasks);

result = renameTask(currentTasks, 10, "  Подготовить инструкцию запуска  ");
if (result.ok) currentTasks = result.tasks;
else console.error("Ошибка renameTask:", result.error);
printStats("После переименования id=10", currentTasks);

result = removeTask(currentTasks, 7);
if (result.ok) currentTasks = result.tasks;
else console.error("Ошибка removeTask:", result.error);
printStats("После удаления id=7", currentTasks);

console.log("\n--- Обработка отказа: повторное добавление id=20 ---");
result = addTask(currentTasks, 20, "Дубль", "low");
if (result.ok) {
  currentTasks = result.tasks;
} else {
  console.error(`Отказ (ожидаемый): ${result.error}`);
}
console.log("Состояние не изменилось, ID:", currentTasks.map((t) => t.id));

console.log("\n--- Обработка отказа: неверный тип completed ---");
result = setTaskCompleted(currentTasks, 4, "true");
console.error(`Отказ (ожидаемый): ${result.error}`);

console.log("\n--- Проверка сохранности demoTasks ---");
console.log("Длина demoTasks:", demoTasks.length);
console.log("ID в demoTasks:", demoTasks.map((t) => t.id));

console.log("\n--- Дополнительное задание: поиск по подстроке ---");
console.log("Поиск 'ФУНК':", searchTasks(demoTasks, " ФУНК ").map((t) => t.id));
console.log("Поиск 'несуществующий':", searchTasks(demoTasks, "несуществующий фрагмент"));
console.log("Пустой запрос:", searchTasks(demoTasks, "  ").length, "задач");

console.log("\n\n========== ИНДИВИДУАЛЬНЫЙ ВАРИАНТ №" + variantNumber + " ==========");
let vTasks = variantTasks;

printStats("Исходный вариант", vTasks);

result = addTask(vTasks, 80, "Провести финальную проверку интерфейса", "low");
if (result.ok) vTasks = result.tasks;
else console.error("Ошибка:", result.error);
printStats("После добавления id=80", vTasks);

result = setTaskCompleted(vTasks, 11, true);
if (result.ok) vTasks = result.tasks;
else console.error("Ошибка:", result.error);
printStats("После выполнения id=11", vTasks);

result = renameTask(vTasks, 23, "Протестировать форму входа");
if (result.ok) vTasks = result.tasks;
else console.error("Ошибка:", result.error);
printStats("После переименования id=23", vTasks);

result = removeTask(vTasks, 37);
if (result.ok) vTasks = result.tasks;
else console.error("Ошибка:", result.error);
printStats("После удаления id=37", vTasks);

console.log("\n--- Отказ: повторное добавление id=80 ---");
result = addTask(vTasks, 80, "Дубль", "low");
console.error(`Отказ (ожидаемый): ${result.error}`);
console.log("Состояние не изменилось, ID:", vTasks.map((t) => t.id));

console.log("\n--- Сохранность variantTasks ---");
console.log("Длина variantTasks:", variantTasks.length);
console.log("ID в variantTasks:", variantTasks.map((t) => t.id));

console.log("\n--- Собственные проверки ---");

console.log("\n[Своя 1] Добавление после удаления");
let t = demoTasks;
let r = removeTask(t, 7);
if (r.ok) t = r.tasks;
r = addTask(t, 7, "Восстановленная задача", "low");
if (r.ok) t = r.tasks;
console.log("Результат:", t.length === 4 && t.some((x) => x.id === 7));

console.log("\n[Своя 2] Изменение первой и последней записи");
t = demoTasks;
r = setTaskCompleted(t, 1, false);
if (r.ok) t = r.tasks;
r = setTaskCompleted(t, 10, false);
if (r.ok) t = r.tasks;
console.log("Результат:", t[0].completed === false && t[t.length - 1].completed === false);

console.log("\n[Своя 3] Последовательное обновление нескольких задач");
t = demoTasks;
r = renameTask(t, 1, "Функции — база");
if (r.ok) t = r.tasks;
r = renameTask(t, 4, "Модель задач — ядро");
if (r.ok) t = r.tasks;
console.log("Результат:", t[0].title === "Функции — база" && t[1].title === "Модель задач — ядро");