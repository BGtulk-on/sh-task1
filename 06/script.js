const itemInput = document.getElementById("item");
const addButton = document.getElementById("add");
const list = document.getElementById("list");

function addItem() {
  const value = itemInput.value.trim();
  if (!value) {
    return;
  }
  const li = document.createElement("li");
  li.textContent = value;
  list.appendChild(li);
  itemInput.value = "";
  itemInput.focus();
}

addButton.addEventListener("click", addItem);
itemInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addItem();
  }
});
