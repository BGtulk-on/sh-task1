const tagSelect = document.getElementById("tag");
const contentInput = document.getElementById("content");
const colorInput = document.getElementById("color");
const sizeInput = document.getElementById("size");
const createButton = document.getElementById("create");
const output = document.getElementById("output");

const allowedTags = ["h1", "h2", "p", "button", "div"];

createButton.addEventListener("click", () => {
  const tagName = tagSelect.value;
  if (!allowedTags.includes(tagName)) {
    return;
  }

  const text = contentInput.value.trim();
  if (!text) {
    return;
  }

  const sizeValue = parseInt(sizeInput.value, 10);
  const fontSize = !Number.isNaN(sizeValue) && sizeValue > 0 ? sizeValue : 24;

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "space-between";
  wrapper.style.gap = "10px";
  wrapper.style.border = "1px solid #d2dce7";
  wrapper.style.borderRadius = "7px";
  wrapper.style.padding = "10px 14px";
  wrapper.style.marginTop = "10px";

  const created = document.createElement(tagName);
  created.textContent = text;
  created.style.color = colorInput.value;
  created.style.fontSize = fontSize + "px";
  created.style.margin = "0";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "✕";
  deleteButton.title = "Изтрий";
  deleteButton.style.background = "#c62828";
  deleteButton.addEventListener("click", () => {
    wrapper.remove();
  });

  wrapper.appendChild(created);
  wrapper.appendChild(deleteButton);
  output.appendChild(wrapper);
  contentInput.value = "";
});
