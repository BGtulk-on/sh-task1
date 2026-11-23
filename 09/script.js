const photo = document.getElementById("photo");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const photos = ["photo1.svg", "photo2.svg", "photo3.svg", "photo4.svg"];
let index = 0;

function update() {
  photo.src = photos[index];
  photo.alt = "Пейзаж " + (index + 1);
}

nextButton.addEventListener("click", () => {
  index = (index + 1) % photos.length;
  update();
});

prevButton.addEventListener("click", () => {
  index = (index - 1 + photos.length) % photos.length;
  update();
});
