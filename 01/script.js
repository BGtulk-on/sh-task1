const title = document.getElementById("title");
const changeButton = document.getElementById("change");

changeButton.addEventListener("click", () => {
  title.textContent = "Здравей, JavaScript!";
});
