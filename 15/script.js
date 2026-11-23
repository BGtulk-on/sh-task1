const searchInput = document.getElementById("search");
const studentsList = document.getElementById("students");
const emptyMessage = document.getElementById("empty");

const names = [
  "Иван",
  "Ивелина",
  "Ивайло",
  "Мария",
  "Георги",
  "Елена",
  "Николай",
  "Виктория",
];

function render(query) {
  const q = query.trim().toLowerCase();
  const filtered = names.filter((name) => name.toLowerCase().includes(q));
  studentsList.innerHTML = "";

  if (filtered.length === 0) {
    emptyMessage.textContent = "Няма намерени ученици.";
    return;
  }

  emptyMessage.textContent = "";
  for (const name of filtered) {
    const li = document.createElement("li");
    li.textContent = name;
    studentsList.appendChild(li);
  }
}

searchInput.addEventListener("input", () => {
  render(searchInput.value);
});

render("");
