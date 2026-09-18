const products = [
  { id: 1, name: "Paracetamol 500mg", category: "Pain Relief", price: 39.99, icon: "💊" },
  { id: 2, name: "Vitamin C 1000mg", category: "Vitamins", price: 89.99, icon: "🍊" },
  { id: 3, name: "Daily Multivitamins", category: "Vitamins", price: 119.99, icon: "🌿" },
  { id: 4, name: "Moisturising Lotion", category: "Personal Care", price: 74.99, icon: "🧴" },
  { id: 5, name: "First Aid Kit", category: "First Aid", price: 149.99, icon: "🩹" },
  { id: 6, name: "Antiseptic Solution", category: "First Aid", price: 54.99, icon: "🧪" },
  { id: 7, name: "Baby Care Set", category: "Family Care", price: 129.99, icon: "👶" },
  { id: 8, name: "Hand Sanitiser", category: "Personal Care", price: 34.99, icon: "🧴" }
];

const money = (n) => "R" + n.toFixed(2);

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("carepointCart") || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("carepointCart", JSON.stringify(cart));
  updateCount();
}

function updateCount() {
  const el = document.getElementById("cartCount");
  if (el) {
    el.textContent = getCart().reduce((sum, item) => sum + item.qty, 0);
  }
}

function showMessage(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.textContent = message;
  Object.assign(toast.style, {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    zIndex: "100",
    padding: "12px 16px",
    borderRadius: "10px",
    background: "#12344d",
    color: "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,.18)"
  });

  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2200);
}

function addToCart(id) {
  const cart = getCart();
  const item = cart.find((x) => x.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }

  saveCart(cart);
  showMessage("Product added to your cart.");
}

function renderProducts(list = products) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = list.length
    ? list.map((p) => `
      <article class="product">
        <div class="product-img" aria-hidden="true">${p.icon}</div>
        <div class="product-body">
          <span class="tag">${p.category}</span>
          <h3>${p.name}</h3>
          <div class="price">${money(p.price)}</div>
          <button class="btn primary" type="button" onclick="addToCart(${p.id})">
            Add to cart
          </button>
        </div>
      </article>
    `).join("")
    : `<div class="empty"><h2>No products found</h2><p>Try another search term or category.</p></div>`;
}

function filterProducts() {
  const query = (document.getElementById("searchInput")?.value || "").toLowerCase();
  const category = document.getElementById("categoryFilter")?.value || "All";

  const filtered = products.filter((p) =>
    (p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)) &&
    (category === "All" || p.category === category)
  );

  renderProducts(filtered);
}

function renderCart() {
  const box = document.getElementById("cartItems");
  const summary = document.getElementById("cartSummary");
  if (!box) return;

  const cart = getCart();

  if (!cart.length) {
    box.innerHTML = `
      <div class="empty">
        <h2>Your cart is empty</h2>
        <p>Add some everyday health products to get started.</p>
        <a class="btn primary" href="products.html">Browse products</a>
      </div>`;
    if (summary) summary.innerHTML = "";
    return;
  }

  let total = 0;

  box.innerHTML = cart.map((item) => {
    const product = products.find((x) => x.id === item.id);
    if (!product) return "";

    const subtotal = product.price * item.qty;
    total += subtotal;

    return `
      <div class="cart-row">
        <strong>${product.icon} ${product.name}</strong>
        <span>${money(product.price)} each</span>
        <div class="qty" aria-label="Quantity controls for ${product.name}">
          <button type="button" aria-label="Decrease ${product.name} quantity" onclick="changeQty(${product.id}, -1)">−</button>
          <b aria-label="Current quantity">${item.qty}</b>
          <button type="button" aria-label="Increase ${product.name} quantity" onclick="changeQty(${product.id}, 1)">+</button>
        </div>
        <strong>${money(subtotal)}</strong>
        <button class="btn secondary" type="button" onclick="removeItem(${product.id})">Remove</button>
      </div>`;
  }).join("");

  if (summary) {
    summary.innerHTML = `
      <h2>Total: ${money(total)}</h2>
      <p>Demo checkout — no payment is processed.</p>
      <button class="btn primary" type="button" onclick="demoCheckout()">Proceed to enquiry</button>`;
  }
}

function changeQty(id, amount) {
  let cart = getCart();
  const item = cart.find((x) => x.id === id);

  if (item) {
    item.qty += amount;
    if (item.qty <= 0) {
      cart = cart.filter((x) => x.id !== id);
    }
  }

  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  saveCart(getCart().filter((item) => item.id !== id));
  renderCart();
  showMessage("Product removed from your cart.");
}

function demoCheckout() {
  showMessage("Demo checkout: please contact CarePoint to complete an order.");
}

function setupForms() {
  ["prescriptionForm", "generalForm"].forEach((id) => {
    const form = document.getElementById(id);
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const message = document.getElementById("formMessage");
      if (message) {
        message.className = "success";
        message.setAttribute("role", "status");
        message.textContent = "Thank you. Your enquiry has been recorded for this demo.";
      }

      form.reset();
    });
  });
}

function setupMobileMenu() {
  const button = document.querySelector(".menu-btn");
  const nav = document.getElementById("navLinks");
  if (!button || !nav) return;

  button.setAttribute("aria-controls", "navLinks");
  button.setAttribute("aria-expanded", "false");

  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open menu");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCount();
  renderProducts();
  renderCart();
  setupForms();
  setupMobileMenu();

  document.getElementById("searchInput")?.addEventListener("input", filterProducts);
  document.getElementById("categoryFilter")?.addEventListener("change", filterProducts);

  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const filter = document.getElementById("categoryFilter");

  if (category && filter) {
    filter.value = category;
    filterProducts();
  }
});
