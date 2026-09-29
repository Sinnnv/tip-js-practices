// Эксперимент 1
function sum(a, b) {
  return a + b;
}
console.log("1.1:", sum(2, 3), typeof sum(2, 3));
console.log("1.2:", sum("2", 3), typeof sum("2", 3));

// Эксперимент 2 (исправлено: добавлен return)
const square = (x) => {
  return x * x;
};
console.log("2:", square(4), typeof square(4));

// Эксперимент 3
const original = { title: "Черновик", published: false };
const alias = original;
alias.published = true;
console.log("3.1:", original.published);
console.log("3.2:", original === alias);

// Эксперимент 4
const items = [
  { id: 1, title: "A" },
  { id: 2, title: "B" },
];
const copy = [...items];
copy[0] = { ...copy[0], title: "AA" };
console.log("4.1:", items[0].title);
console.log("4.2:", copy[0].title);
console.log("4.3:", items === copy);
console.log("4.4:", items[1] === copy[1]);

// Эксперимент 5
const book = { id: 12, title: "Черновик", available: false };
const updated1 = { ...book, available: true };
const updated2 = { available: true, ...book };
console.log("5.1:", updated1.available);
console.log("5.2:", updated2.available);
console.log("5.3:", book === updated1);

// Эксперимент 6
function makeCaption(text = "Без названия") {
  return text;
}
console.log("6.1:", makeCaption());
console.log("6.2:", makeCaption(undefined));
console.log("6.3:", makeCaption(null));
console.log("6.4:", makeCaption(""));