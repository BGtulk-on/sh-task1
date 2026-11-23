const text = document.getElementById("text");
const toggleButton = document.getElementById("toggle");

toggleButton.addEventListener("click", () => {
  text.style.display = text.style.display === "none" ? "block" : "none";
});
