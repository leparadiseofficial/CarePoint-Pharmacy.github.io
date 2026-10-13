/* Product data and cart interactions. The cart is a local demo only. */
(() => {
  "use strict";
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
  const money = value => "R" + Number(value).toFixed(2);
  const readCart = () => {
    try {
      const data = JSON.parse(localStorage.getItem("carepointCart") || "[]");
      if (!Array.isArray(data)) return [];
      return data.filter(item => Number.isInteger(item?.id) && Number.isInteger(item?.qty) &&
        item.qty > 0 && item.qty <= 99 && products.some(p => p.id === item.id));
    } catch { return []; }
  };
  const writeCart = cart => {
    try { localStorage.setItem("carepointCart", JSON.stringify(cart)); }
    catch { notify("Your browser could not save the demo cart."); }
    updateCount();
  };
  function updateCount() {
    const count = document.getElementById("cartCount");
    if (count) count.textContent = String(readCart().reduce((sum, item) => sum + item.qty, 0));
  }
  function notify(message) {
    document.querySelector(".toast")?.remove();
    const toast = document.createElement("div");
    toast.className = "toast"; toast.setAttribute("role", "status"); toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), 2600);
  }
  function addToCart(id) {
    if (!products.some(p => p.id === id)) return;
    const cart = readCart(); const item = cart.find(x => x.id === id);
    if (item) { if (item.qty >= 99) return notify("Maximum demo quantity is 99."); item.qty += 1; }
    else cart.push({ id, qty: 1 });
    writeCart(cart); renderCart(); notify("Added to your demo cart.");
  }
  function renderProducts(list = products) {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    grid.replaceChildren();
    if (!list.length) {
      const empty = document.createElement("div"); empty.className = "empty";
      const h = document.createElement("h2"); h.textContent = "No products found";
      const p = document.createElement("p"); p.textContent = "Try another search term or category.";
      empty.append(h, p); grid.append(empty); return;
    }
    list.forEach(product => {
      const card = document.createElement("article"); card.className = "product reveal is-visible";
      const icon = document.createElement("div"); icon.className = "product-img"; icon.setAttribute("aria-hidden", "true"); icon.textContent = product.icon;
      const body = document.createElement("div"); body.className = "product-body";
      const tag = document.createElement("span"); tag.className = "tag"; tag.textContent = product.category;
      const name = document.createElement("h2"); name.textContent = product.name;
      const price = document.createElement("div"); price.className = "price"; price.textContent = money(product.price);
      const button = document.createElement("button"); button.className = "btn primary"; button.type = "button"; button.textContent = "Add to demo cart"; button.addEventListener("click", () => addToCart(product.id));
      body.append(tag, name, price, button); card.append(icon, body); grid.append(card);
    });
  }
  function renderCart() {
    const box = document.getElementById("cartItems"); const summary = document.getElementById("cartSummary");
    if (!box) return;
    const cart = readCart(); box.replaceChildren();
    if (!cart.length) {
      const empty = document.createElement("div"); empty.className = "empty";
      const h = document.createElement("h2"); h.textContent = "Your demo cart is empty";
      const p = document.createElement("p"); p.textContent = "Browse the catalogue and add demo products.";
      const a = document.createElement("a"); a.className = "btn primary"; a.href = "products.html"; a.textContent = "Browse products";
      empty.append(h, p, a); box.append(empty); if (summary) summary.replaceChildren(); return;
    }
    let total = 0;
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id); if (!product) return;
      const subtotal = product.price * item.qty; total += subtotal;
      const row = document.createElement("article"); row.className = "cart-row";
      const title = document.createElement("strong"); title.textContent = product.icon + " " + product.name;
      const each = document.createElement("span"); each.textContent = money(product.price) + " each";
      const qty = document.createElement("div"); qty.className = "qty";
      const decrease = document.createElement("button"); decrease.type = "button"; decrease.textContent = "−"; decrease.setAttribute("aria-label", "Decrease " + product.name); decrease.addEventListener("click", () => changeQty(product.id, -1));
      const number = document.createElement("b"); number.textContent = String(item.qty);
      const increase = document.createElement("button"); increase.type = "button"; increase.textContent = "+"; increase.setAttribute("aria-label", "Increase " + product.name); increase.addEventListener("click", () => changeQty(product.id, 1));
      qty.append(decrease, number, increase);
      const sub = document.createElement("strong"); sub.textContent = money(subtotal);
      const remove = document.createElement("button"); remove.type = "button"; remove.className = "btn secondary"; remove.textContent = "Remove"; remove.addEventListener("click", () => { writeCart(readCart().filter(x => x.id !== product.id)); renderCart(); });
      row.append(title, each, qty, sub, remove); box.append(row);
    });
    if (summary) {
      summary.replaceChildren();
      const h = document.createElement("h2"); h.textContent = "Demo total: " + money(total);
      const p = document.createElement("p"); p.textContent = "No payment is processed. This is not a real order.";
      const button = document.createElement("a"); button.className = "btn primary"; button.href = "enquiry.html"; button.textContent = "Continue to enquiry";
      button.addEventListener("click", () => { try { sessionStorage.setItem("carepointCartSnapshot", JSON.stringify(cart.map(item => { const p = products.find(x => x.id === item.id); return { name: p.name, qty: item.qty, subtotal: p.price * item.qty }; }))); } catch {} });
      summary.append(h, p, button);
    }
  }
  function changeQty(id, amount) {
    let cart = readCart(); const item = cart.find(x => x.id === id);
    if (!item) return;
    item.qty += amount;
    if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
    else if (item.qty > 99) item.qty = 99;
    writeCart(cart); renderCart();
  }
  function showCheckoutSummary() {
    const target = document.getElementById("checkoutSummary"); if (!target) return;
    let snapshot = [];
    try { snapshot = JSON.parse(sessionStorage.getItem("carepointCartSnapshot") || "[]"); } catch {}
    if (!Array.isArray(snapshot) || !snapshot.length) { target.textContent = "No cart items were carried into this enquiry. You can still ask a general question."; return; }
    const list = document.createElement("ul"); let total = 0;
    snapshot.forEach(item => {
      if (typeof item.name !== "string" || !Number.isInteger(item.qty) || typeof item.subtotal !== "number") return;
      const li = document.createElement("li"); li.textContent = `${item.name} × ${item.qty}: ${money(item.subtotal)}`; list.append(li); total += item.subtotal;
    });
    const totalLine = document.createElement("p"); totalLine.textContent = "Demo estimate total: " + money(total) + " (not a purchase)";
    target.append(list, totalLine);
  }
  document.addEventListener("DOMContentLoaded", () => {
    updateCount(); renderProducts(); renderCart(); showCheckoutSummary();
    window.CarePointStore = { products: products.map(p => ({...p})), renderProducts, readCart };
  });
})();