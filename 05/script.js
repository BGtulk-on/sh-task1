const input = document.getElementById("input");
const showButton = document.getElementById("show");
const result = document.getElementById("result");

function showText() {
  const value = input.value.trim();
  if (!value) {
    result.textContent = "Моля, въведете текст!";
    result.classList.add("error");
    return;
  }
  result.textContent = value;
  result.classList.remove("error");
}

showButton.addEventListener("click", showText);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showText();
  }
});
