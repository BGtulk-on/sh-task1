const categorySelect = document.getElementById("category");
const catalogEl = document.getElementById("catalog");
const cartEl = document.getElementById("cart");
const totalEl = document.getElementById("total");

const STORAGE_KEY = "shop_cart";

const products = [
  { id: 1, name: "Лаптоп", price: 1200, category: "tech" },
  { id: 2, name: "Смартфон", price: 750, category: "tech" },
  { id: 3, name: "Монитор", price: 420, category: "tech" },
  { id: 4, name: "Мишка", price: 45, category: "accessories" },
  { id: 5, name: "Клавиатура", price: 85, category: "accessories" },
  { id: 6, name: "Слушалки", price: 120, category: "accessories" },
];

function findProduct(id) {
  return products.find((product) => product.id === id);
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === "number" &&
        Number.isInteger(item.qty) &&
        item.qty > 0 &&
        Boolean(findProduct(item.id))
    );
  } catch {
    return [];
  }
}

let cart = loadCart();

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {}
}

function createActionButton(text, action, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  button.dataset.action = action;
  button.dataset.id = String(id);
  return button;
}

function renderCatalog() {
  const selectedCategory = categorySelect.value;
  const visible =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  catalogEl.innerHTML = "";
  for (const product of visible) {
    const card = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = product.price.toFixed(2) + " лв.";

    const addButton = createActionButton("Добави", "add", product.id);

    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(addButton);
    catalogEl.appendChild(card);
  }
}

function renderCart() {
  cartEl.innerHTML = "";

  if (cart.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Количката е празна.";
    cartEl.appendChild(empty);
    totalEl.textContent = "0.00";
    return;
  }

  for (const item of cart) {
    const product = findProduct(item.id);
    if (!product) {
      continue;
    }

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "8px";
    row.style.flexWrap = "wrap";
    row.style.margin = "6px 0";

    const label = document.createElement("span");
    label.textContent =
      product.name + " × " + item.qty + " (" + (product.price * item.qty).toFixed(2) + " лв.)";

    const decButton = createActionButton("-", "dec", product.id);
    const incButton = createActionButton("+", "inc", product.id);
    const removeButton = createActionButton("Премахни", "remove", product.id);
    removeButton.style.background = "#c62828";

    row.appendChild(label);
    row.appendChild(decButton);
    row.appendChild(incButton);
    row.appendChild(removeButton);
    cartEl.appendChild(row);
  }

  const total = cart.reduce((sum, item) => {
    const product = findProduct(item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  totalEl.textContent = total.toFixed(2);
}

catalogEl.addEventListener("click", (event) => {
  const button = event.target.closest('button[data-action="add"]');
  if (!button) {
    return;
  }
  const id = Number(button.dataset.id);
  if (!findProduct(id)) {
    return;
  }
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  renderCart();
});

cartEl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }
  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  const item = cart.find((entry) => entry.id === id);
  if (!item) {
    return;
  }

  if (action === "inc") {
    item.qty += 1;
  } else if (action === "dec") {
    item.qty -= 1;
    if (item.qty <= 0) {
      cart = cart.filter((entry) => entry.id !== id);
    }
  } else if (action === "remove") {
    cart = cart.filter((entry) => entry.id !== id);
  }

  saveCart();
  renderCart();
});

categorySelect.addEventListener("change", renderCatalog);

renderCatalog();
renderCart();
