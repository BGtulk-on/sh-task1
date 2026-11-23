const searchInput = document.getElementById("search");
const firstInput = document.getElementById("first");
const lastInput = document.getElementById("last");
const classInput = document.getElementById("class");
const gradesInput = document.getElementById("grades");
const saveButton = document.getElementById("save");
const rows = document.getElementById("rows");
const pagesEl = document.getElementById("pages");
const statsEl = document.getElementById("stats");

const STORAGE_KEY = "students_system_data";
const PAGE_SIZE = 5;

const seedStudents = [
  { id: 1, first: "Иван", last: "Петров", studentClass: "8А", grades: [5, 6, 6] },
  { id: 2, first: "Мария", last: "Иванова", studentClass: "9Б", grades: [6, 6, 6] },
  { id: 3, first: "Георги", last: "Димитров", studentClass: "10А", grades: [5, 5, 5] },
  { id: 4, first: "Елена", last: "Тодорова", studentClass: "8Б", grades: [4, 5, 5] },
  { id: 5, first: "Николай", last: "Стоянов", studentClass: "9А", grades: [6, 5, 6] },
  { id: 6, first: "Виктория", last: "Николова", studentClass: "10Б", grades: [4, 4, 5] },
  { id: 7, first: "Александър", last: "Колев", studentClass: "11А", grades: [5, 6, 5] },
];

function cloneSeed() {
  return seedStudents.map((student) => ({
    id: student.id,
    first: student.first,
    last: student.last,
    studentClass: student.studentClass,
    grades: student.grades.slice(),
  }));
}

function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return cloneSeed();
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : cloneSeed();
  } catch {
    return cloneSeed();
  }
}

function saveStudents() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch {}
}

function parseGrades(text) {
  const parts = text.split(",").map((part) => part.trim());
  if (parts.length === 0) {
    return null;
  }
  const result = [];
  for (const part of parts) {
    if (part === "") {
      return null;
    }
    const grade = Number(part);
    if (!Number.isFinite(grade) || grade < 2 || grade > 6) {
      return null;
    }
    result.push(grade);
  }
  return result;
}

function getAverage(grades) {
  if (!Array.isArray(grades) || grades.length === 0) {
    return 0;
  }
  return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
}

function clearForm() {
  firstInput.value = "";
  lastInput.value = "";
  classInput.value = "";
  gradesInput.value = "";
}

function createActionButton(text, action, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  button.dataset.action = action;
  button.dataset.id = String(id);
  return button;
}

function createPageButton(label, page, disabled, active) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.dataset.page = String(page);
  button.disabled = disabled;
  if (active) {
    button.style.background = "#004494";
  }
  return button;
}

let students = loadStudents();
let currentPage = 1;
let editingId = null;

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = students.filter((student) =>
    (student.first + " " + student.last + " " + student.studentClass)
      .toLowerCase()
      .includes(query)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  currentPage = Math.min(Math.max(1, currentPage), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  rows.innerHTML = "";
  if (pageItems.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.className = "muted";
    td.textContent = "Няма намерени ученици.";
    tr.appendChild(td);
    rows.appendChild(tr);
  } else {
    for (const student of pageItems) {
      const tr = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = student.first + " " + student.last;

      const classCell = document.createElement("td");
      classCell.textContent = student.studentClass;

      const avgCell = document.createElement("td");
      avgCell.textContent = getAverage(student.grades).toFixed(2);

      const actionsCell = document.createElement("td");
      const editButton = createActionButton("Редактирай", "edit", student.id);
      const deleteButton = createActionButton("Изтрий", "delete", student.id);
      deleteButton.style.background = "#c62828";
      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);

      tr.appendChild(nameCell);
      tr.appendChild(classCell);
      tr.appendChild(avgCell);
      tr.appendChild(actionsCell);
      rows.appendChild(tr);
    }
  }

  pagesEl.innerHTML = "";
  pagesEl.appendChild(
    createPageButton("<", currentPage - 1, currentPage === 1, false)
  );
  for (let p = 1; p <= totalPages; p += 1) {
    pagesEl.appendChild(createPageButton(String(p), p, false, p === currentPage));
  }
  pagesEl.appendChild(
    createPageButton(">", currentPage + 1, currentPage === totalPages, false)
  );

  const total = filtered.length;
  const overallAvg =
    total === 0
      ? 0
      : filtered.reduce((sum, student) => sum + getAverage(student.grades), 0) / total;
  const excellent = filtered.filter((student) => getAverage(student.grades) >= 5.5).length;

  statsEl.textContent =
    "Общо: " +
    total +
    " | Среден успех: " +
    overallAvg.toFixed(2) +
    " | С успех ≥ 5.50: " +
    excellent;
}

saveButton.addEventListener("click", () => {
  const first = firstInput.value.trim();
  const last = lastInput.value.trim();
  const studentClass = classInput.value.trim();
  const parsedGrades = parseGrades(gradesInput.value);

  if (!first || !last || !studentClass || !parsedGrades) {
    return;
  }

  if (editingId !== null) {
    const existing = students.find((student) => student.id === editingId);
    if (existing) {
      existing.first = first;
      existing.last = last;
      existing.studentClass = studentClass;
      existing.grades = parsedGrades;
    }
    editingId = null;
  } else {
    const nextId = students.reduce((max, student) => Math.max(max, student.id), 0) + 1;
    students.push({ id: nextId, first, last, studentClass, grades: parsedGrades });
  }

  saveStudents();
  clearForm();
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
    firstInput.value = student.first;
    lastInput.value = student.last;
    classInput.value = student.studentClass;
    gradesInput.value = student.grades.join(", ");
    editingId = id;
    firstInput.focus();
    return;
  }

  if (button.dataset.action === "delete") {
    students = students.filter((item) => item.id !== id);
    if (editingId === id) {
      editingId = null;
      clearForm();
    }
    saveStudents();
    render();
  }
});

pagesEl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-page]");
  if (!button || button.disabled) {
    return;
  }
  const page = Number(button.dataset.page);
  if (!Number.isNaN(page)) {
    currentPage = page;
    render();
  }
});

searchInput.addEventListener("input", () => {
  currentPage = 1;
  render();
});

render();
