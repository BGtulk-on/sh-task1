const countInput = document.getElementById("count");
const generateButton = document.getElementById("generate");
const squares = document.getElementById("squares");

const colors = [
  "#ff3b30",
  "#34c759",
  "#007aff",
  "#ffcc00",
  "#8e44ad",
  "#ff9500",
  "#1abc9c",
  "#e91e63",
];

function generateSquares() {
  squares.innerHTML = "";
  const n = parseInt(countInput.value, 10);
  if (Number.isNaN(n) || n < 1) {
    return;
  }
  const limit = Math.min(n, 50);
  for (let i = 0; i < limit; i += 1) {
    const box = document.createElement("div");
    box.style.backgroundColor = colors[i % colors.length];
    box.style.borderRadius = "6px";
    squares.appendChild(box);
  }
}

generateButton.addEventListener("click", generateSquares);
countInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateSquares();
  }
});
