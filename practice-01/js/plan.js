"use strict";
const totalTasks = 18;
const completedTasks = 6;
const dailyLimit = 5;

if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks) || !Number.isInteger(dailyLimit)) {
    console.log("Ошибка: все значения должны быть целыми числами.");
} else if (totalTasks < 0 || totalTasks > 1000 || completedTasks < 0 || completedTasks > 1000 || dailyLimit < 1 || dailyLimit > 1000) {
    console.log("Ошибка: значения должны быть в допустимых диапазонах.");
} else if (completedTasks > totalTasks) {
    console.log("Ошибка: выполнено больше задач, чем существует.");
} else {
    let remaining = totalTasks - completedTasks;
    
    if (remaining === 0) {
        console.log("Все задачи уже выполнены.");
        console.log("Потребуется дней: 0");
    } else {
        console.log(`Осталось задач: ${remaining}`);
        let day = 1;
        
        while (remaining > 0) {
            const todayDone = Math.min(dailyLimit, remaining);
            remaining -= todayDone;
            console.log(`День ${day}: выполнено ${todayDone}, осталось ${remaining}`);
            day++;
        }
        
        console.log(`Потребуется дней: ${day - 1}`);
    }
}