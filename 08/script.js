const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const addButton = document.getElementById("add");
const rows = document.getElementById("rows");

function addRow() {
  const name = nameInput.value.trim();
  const ageText = ageInput.value.trim();
  const age = Number(ageText);

  if (!name || !ageText || Number.isNaN(age) || age <= 0) {
    return;
  }

  const row = rows.insertRow();
  const nameCell = document.createElement("td");
  nameCell.textContent = name;
  const ageCell = document.createElement("td");
  ageCell.textContent = String(age);

  row.appendChild(nameCell);
  row.appendChild(ageCell);

  nameInput.value = "";
  ageInput.value = "";
  nameInput.focus();
}

addButton.addEventListener("click", addRow);
