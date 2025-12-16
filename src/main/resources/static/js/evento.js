// ===============================
// SMOOTH SCROLL (links internos)
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===============================
// OBSERVER PARA ANIMAÇÕES
// ===============================
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// ===============================
// FUNÇÃO AUXILIAR — DATA
// ===============================
function formatarData(dataISO) {
  if (!dataISO) return "";
  return new Date(dataISO).toLocaleDateString("pt-BR");
}

// ===============================
// DOM READY
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // EFEITO RIPPLE
  // ===============================
  document.querySelectorAll(".event-btn, .admin-btn, .btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.classList.add("ripple");

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ===============================
  // RENDERIZAR EVENTOS
  // ===============================
  const grid = document.getElementById("eventsGrid");
  if (!grid) return;

  fetch("http://localhost:8081/events")
    .then(res => res.json())
    .then(events => {
      grid.innerHTML = "";

      if (events.length === 0) {
        grid.innerHTML = "<p>Nenhum evento cadastrado.</p>";
        return;
      }

      events.forEach(event => {
        const card = document.createElement("div");
        card.classList.add("event-card");
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        card.innerHTML = `
          <div class="event-image">
            <img src="${event.urlBanner}" alt="${event.titleEvent}">
          </div>

          <div class="event-content">
            <h3 class="event-title">${event.titleEvent}</h3>

            <p class="event-description">
              ${
                event.descriptionEvent.length > 120
                  ? event.descriptionEvent.substring(0, 120) + "..."
                  : event.descriptionEvent
              }
            </p>

            <div class="event-details">
              <div class="event-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>${formatarData(event.dateEvent)}</span>
              </div>

              <div class="event-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>${event.startEvent}</span>
              </div>

              <div class="event-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${event.locationEvent}</span>
              </div>
            </div>

            <a href="evento.html?id=${event.idEvent}" class="event-btn">
              Ver Detalhes
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        `;

        grid.appendChild(card);
        observer.observe(card);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar eventos:", err);
      grid.innerHTML = "<p>Erro ao carregar eventos.</p>";
    });
});
