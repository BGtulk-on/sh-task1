const addButton = document.getElementById("add");
const container = document.getElementById("container");

addButton.addEventListener("click", () => {
  const paragraph = document.createElement("p");
  paragraph.textContent = "Нов параграф";
  container.appendChild(paragraph);
});
