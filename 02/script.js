const text = document.getElementById("text");
const colorButtons = [
  ["red", "red"],
  ["green", "green"],
  ["blue", "blue"],
];

for (const [id, color] of colorButtons) {
  document.getElementById(id).addEventListener("click", () => {
    text.style.color = color;
  });
}
