const nameInput = document.getElementById("name");
const gradeInput = document.getElementById("grade");
const saveButton = document.getElementById("save");
const sortAscButton = document.getElementById("sortAsc");
const sortDescButton = document.getElementById("sortDesc");
const rows = document.getElementById("rows");

let students = [
  { id: 1, name: "Иван", grade: 5.5 },
  { id: 2, name: "Мария", grade: 6.0 },
  { id: 3, name: "Георги", grade: 4.75 },
];

let nextId = 4;
let editingId = null;

function createActionButton(text, action, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  button.dataset.action = action;
  button.dataset.id = String(id);
  return button;
}

function render() {
  rows.innerHTML = "";
  for (const student of students) {
    const tr = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = student.name;

    const gradeCell = document.createElement("td");
    gradeCell.textContent = student.grade.toFixed(2);

    const actionsCell = document.createElement("td");
    const editButton = createActionButton("Редактирай", "edit", student.id);
    const deleteButton = createActionButton("Изтрий", "delete", student.id);
    deleteButton.style.background = "#c62828";

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    tr.appendChild(nameCell);
    tr.appendChild(gradeCell);
    tr.appendChild(actionsCell);
    rows.appendChild(tr);
  }
}

saveButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const gradeText = gradeInput.value.trim();
  const grade = Number(gradeText);

  if (!name || !gradeText || !Number.isFinite(grade) || grade < 2 || grade > 6) {
    return;
  }

  if (editingId !== null) {
    const existing = students.find((student) => student.id === editingId);
    if (existing) {
      existing.name = name;
      existing.grade = grade;
    }
    editingId = null;
  } else {
    students.push({ id: nextId, name, grade });
    nextId += 1;
  }

  nameInput.value = "";
  gradeInput.value = "";
  render();
});

rows.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);
  if (button.dataset.action === "edit") {
    const student = students.find((item) => item.id === id);
    if (!student) {
      return;
    }
    nameInput.value = student.name;
    gradeInput.value = String(student.grade);
    editingId = id;
    nameInput.focus();
    return;
  }

  if (button.dataset.action === "delete") {
    students = students.filter((item) => item.id !== id);
    if (editingId === id) {
      editingId = null;
      nameInput.value = "";
      gradeInput.value = "";
    }
    render();
  }
});

sortAscButton.addEventListener("click", () => {
  students.sort((a, b) => a.grade - b.grade);
  render();
});

sortDescButton.addEventListener("click", () => {
  students.sort((a, b) => b.grade - a.grade);
  render();
});

render();
