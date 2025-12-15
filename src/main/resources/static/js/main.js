// Apenas efeitos visuais — arquivo totalmente limpo

document.addEventListener("DOMContentLoaded", () => {
  // Animação no scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll(".fade-in").forEach((element) => observer.observe(element))

  // Ripple effect
  document.querySelectorAll("button, .btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`
      ripple.classList.add("ripple")
      this.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    })
  })
})

fetch("/events")
  .then(response => response.json())
  .then(events => {

    const grid = document.getElementById("eventsGrid");
    grid.innerHTML = "";

    events.forEach(event => {
      grid.innerHTML += `
        <div class="event-card fade-in">

          <div class="event-image">
            <img src="${event.urlBanner}" alt="${event.titleEvent}">
            <span class="badge badge-success">Evento</span>
          </div>

          <div class="event-content">
            <h3 class="event-title">${event.titleEvent}</h3>

            <p class="event-description">
              ${event.descriptionEvent}
            </p>

            <div class="event-details">
              <div class="event-detail">
                <span>📅 ${event.dateEvent}</span>
              </div>

              <div class="event-detail">
                <span>⏰ ${event.startEvent}</span>
              </div>

              <div class="event-detail">
                <span>📍 ${event.locationEvent}</span>
              </div>
            </div>

            <!-- BOTÕES -->
            <div class="event-actions">
              <a href="evento.html?id=${event.idEvent}" class="event-btn">
                Ver Detalhes
              </a>
            </div>
          </div>
        </div>
      `;
    });
  });