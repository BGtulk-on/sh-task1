const counter = document.getElementById("counter");
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");
const resetButton = document.getElementById("reset");

let count = 0;

function render() {
  counter.textContent = String(count);
  counter.style.color = count < 0 ? "#c62828" : "";
}

plusButton.addEventListener("click", () => {
  count += 1;
  render();
});

minusButton.addEventListener("click", () => {
  count -= 1;
  render();
});

resetButton.addEventListener("click", () => {
  count = 0;
  render();
});
