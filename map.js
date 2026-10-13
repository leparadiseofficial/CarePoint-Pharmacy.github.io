/* Illustrative map only: Polokwane city centre is not represented as a pharmacy address. */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("carepointMap");
  if (!container || !window.L) {
    if (container) container.textContent = "Map unavailable. Please check your internet connection.";
    return;
  }
  const map = L.map(container, { scrollWheelZoom: false }).setView([-23.9045, 29.4689], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>'
  }).addTo(map);
  L.marker([-23.9045, 29.4689]).addTo(map).bindPopup("Polokwane city-centre reference only — not a CarePoint Pharmacy location.");
});