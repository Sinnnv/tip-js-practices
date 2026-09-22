"use strict";
const res1 = "8" + 2;
console.log("Выражение 1:", res1, "Тип:", typeof res1);

const res2 = "8" - 2;
console.log("Выражение 2:", res2, "Тип:", typeof res2);

const res3 = Number("8") + 2;
console.log("Выражение 3:", res3, "Тип:", typeof res3);

const res4 = "12" > "3";
console.log("Выражение 4:", res4, "Тип:", typeof res4);

const res5 = 12 === "12";
console.log("Выражение 5:", res5, "Тип:", typeof res5);

const res6 = Number("");
console.log("Выражение 6:", res6, "Тип:", typeof res6);

const res7 = Number("text");
console.log("Выражение 7:", res7, "Тип:", typeof res7);

const res8 = Boolean("false");
console.log("Выражение 8:", res8, "Тип:", typeof res8);

const res9 = typeof null;
console.log("Выражение 9. Значение:", res9, "Тип результата:", typeof res9);

const res10 = typeof NaN;
console.log("Выражение 10. Значение:", res10, "Тип результата:", typeof res10);