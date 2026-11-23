const taskInput = document.getElementById("task");
const addButton = document.getElementById("add");
const tasksList = document.getElementById("tasks");
const remaining = document.getElementById("remaining");

function updateRemaining() {
  const unchecked = tasksList.querySelectorAll('input[type="checkbox"]:not(:checked)');
  remaining.textContent = String(unchecked.length);
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    return;
  }

  const li = document.createElement("li");
  li.style.display = "flex";
  li.style.alignItems = "center";
  li.style.gap = "8px";
  li.style.margin = "6px 0";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "✕";
  deleteButton.title = "Изтрий";
  deleteButton.dataset.action = "delete";
  deleteButton.style.background = "#c62828";
  deleteButton.style.marginLeft = "auto";

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  tasksList.appendChild(li);

  taskInput.value = "";
  taskInput.focus();
  updateRemaining();
}

tasksList.addEventListener("change", (event) => {
  if (!event.target.matches('input[type="checkbox"]')) {
    return;
  }
  const li = event.target.closest("li");
  const span = li ? li.querySelector("span") : null;
  if (span) {
    span.style.textDecoration = event.target.checked ? "line-through" : "none";
    span.style.color = event.target.checked ? "#777" : "";
  }
  updateRemaining();
});

tasksList.addEventListener("click", (event) => {
  if (!event.target.matches('[data-action="delete"]')) {
    return;
  }
  const li = event.target.closest("li");
  if (li) {
    li.remove();
    updateRemaining();
  }
});

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
