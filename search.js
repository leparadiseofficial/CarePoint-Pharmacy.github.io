/* Product search, category filtering and sorting for products.html. */
(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("searchInput");
    const category = document.getElementById("categoryFilter");
    const sort = document.getElementById("sortSelect");
    const count = document.getElementById("resultsCount");
    if (!search || !category || !sort) return;

    const getProducts = () => window.CarePointStore?.products || [];
    const normalise = value => String(value || "").trim().toLocaleLowerCase();

    function applyFilters() {
      const query = normalise(search.value);
      const selected = category.value;
      const products = getProducts();
      let results = products.filter(product => {
        const matchesText = normalise(product.name).includes(query) ||
          normalise(product.category).includes(query);
        const matchesCategory = selected === "All" || product.category === selected;
        return matchesText && matchesCategory;
      });

      switch (sort.value) {
        case "name-asc":
          results.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
          break;
        case "price-asc":
          results.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
          break;
        case "price-desc":
          results.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
          break;
        default:
          // Keep the original featured order.
          break;
      }

      window.CarePointStore?.renderProducts(results);
      if (count) {
        count.textContent = results.length + " demo product" +
          (results.length === 1 ? "" : "s") + " found";
      }
    }

    search.addEventListener("input", applyFilters);
    category.addEventListener("change", applyFilters);
    sort.addEventListener("change", applyFilters);

    // Support links such as products.html?category=Vitamins.
    const requestedCategory = new URLSearchParams(window.location.search).get("category");
    if (requestedCategory) {
      const matchingOption = [...category.options].find(option =>
        option.value === requestedCategory || option.textContent.trim() === requestedCategory
      );
      if (matchingOption) category.value = matchingOption.value;
    }
    applyFilters();
  });
})();