const numberInput = document.getElementById("number");
const generateButton = document.getElementById("generate");
const results = document.getElementById("results");

function generateTable() {
  results.innerHTML = "";
  const raw = numberInput.value.trim();
  if (raw === "") {
    return;
  }
  const num = Number(raw);
  if (Number.isNaN(num)) {
    return;
  }

  for (let i = 1; i <= 10; i += 1) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = num + " × " + i + " = " + num * i;
    tr.appendChild(td);
    results.appendChild(tr);
  }
}

generateButton.addEventListener("click", generateTable);
numberInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateTable();
  }
});
