"use strict";
const totalTasks = 18;
const completedTasks = 6;

if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks)) {
    console.log("Ошибка: количество задач должно быть целым числом.");
} else if (totalTasks < 0 || totalTasks > 1000 || completedTasks < 0 || completedTasks > 1000) {
    console.log("Ошибка: количество задач должно быть в диапазоне от 0 до 1000.");
} else if (completedTasks > totalTasks) {
    console.log("Ошибка: выполнено больше задач, чем существует.");
} else if (totalTasks === 0 && completedTasks === 0) {
    console.log("Задач пока нет.");
} else {
    const remaining = totalTasks - completedTasks;
    const progress = (completedTasks / totalTasks * 100).toFixed(1);
    let status = "";
    
    if (completedTasks === 0) {
        status = "Не начато";
    } else if (completedTasks === totalTasks) {
        status = "Завершено";
    } else {
        status = "В работе";
    }
    
    console.log(`Всего задач: ${totalTasks}`);
    console.log(`Выполнено: ${completedTasks}`);
    console.log(`Осталось: ${remaining}`);
    console.log(`Прогресс: ${progress}%`);
    console.log(`Статус: ${status}`);
}