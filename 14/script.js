const productsContainer = document.getElementById("products");
const cartCount = document.getElementById("cartCount");

const products = [
  { id: 1, name: "Смартфон", price: 699 },
  { id: 2, name: "Слушалки", price: 129 },
  { id: 3, name: "Лаптоп", price: 1499 },
  { id: 4, name: "Смарт часовник", price: 249 },
];

let count = 0;

function render() {
  productsContainer.innerHTML = "";
  for (const product of products) {
    const card = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = product.price + " лв.";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Добави в количката";
    button.addEventListener("click", () => {
      count += 1;
      cartCount.textContent = String(count);
    });

    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);
    productsContainer.appendChild(card);
  }
}

render();
