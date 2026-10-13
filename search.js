/* Search, category filtering and sorting for products.html. */
(() => {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("searchInput");
    const category = document.getElementById("categoryFilter");
    const sort = document.getElementById("sortSelect");
    const count = document.getElementById("resultsCount");
    if (!search || !category || !sort) return;
    const getProducts = () => window.CarePointStore?.products || [];
    function applyFilters() {
      const query = search.value.trim().toLocaleLowerCase();
      const selected = category.value;
      let result = getProducts().filter(p =>
        (p.name.toLocaleLowerCase().includes(query) || p.category.toLocaleLowerCase().includes(query)) &&
        (selected === "All" || p.category === selected)
      );
      if (sort.value === "name-asc") result.sort((a,b) => a.name.localeCompare(b.name));
      if (sort.value === "price-asc") result.sort((a,b) => a.price - b.price);
      if (sort.value === "price-desc") result.sort((a,b) => b.price - a.price);
      window.CarePointStore?.renderProducts(result);
      if (count) count.textContent = `${result.length} demo product${result.length === 1 ? "" : "s"} found`;
    }
    search.addEventListener("input", applyFilters);
    category.addEventListener("change", applyFilters);
    sort.addEventListener("change", applyFilters);
    const initial = new URLSearchParams(location.search).get("category");
    if (initial && [...category.options].some(option => option.value === initial || option.textContent === initial)) {
      category.value = initial; applyFilters();
    } else applyFilters();
  });
})();