document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ANIMAÇÃO FADE-IN
  ========================= */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );


  /* =========================
     FUNÇÃO GENÉRICA LISTAR
  ========================= */
  function carregarLista(endpoint, gridId, renderItem) {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        grid.innerHTML = "";

        data.forEach(item => {
          const card = document.createElement("div");
          card.classList.add("fade-in");
          card.innerHTML = renderItem(item);

          grid.appendChild(card);
          observer.observe(card);
        });
      })
      .catch(err => console.error(`Erro ao carregar ${endpoint}`, err));
  }


  /* =========================
     RENDER EVENTO
  ========================= */
  function renderEvento(event) {
    return `
      <div class="event-card">
        <div class="event-image">
          <img src="${event.urlBanner}" alt="${event.titleEvent}">
        </div>

        <div class="event-content">
          <h3 class="event-title">${event.titleEvent}</h3>

          <p class="event-description">
            ${event.descriptionEvent}
          </p>

          <div class="event-details">
            <span>📅 ${event.dateEvent}</span>
            <span>⏰ ${event.startEvent}</span>
            <span>📍 ${event.locationEvent}</span>
          </div>

          <div class="event-actions">
            <a href="evento.html?id=${event.idEvent}" class="event-btn">
              Ver Detalhes
            </a>
          </div>
        </div>
      </div>
    `;
  }


  /* =========================
     RENDER NEWS
  ========================= */
  function renderNews(news) {
    return `
      <div class="event-card">
        <div class="event-image">
          <img src="${news.urlBanner}" alt="${news.title}">
        </div>

        <div class="event-content">
          <h3 class="event-title">${news.title}</h3>

          <p class="event-description">
            ${news.content.substring(0, 150)}...
          </p>

          <div class="event-actions">
            <a href="noticia.html?id=${news.id}" class="event-btn">
              Ler Notícia
            </a>
          </div>
        </div>
      </div>
    `;
  }


  /* =========================
     CHAMADAS
  ========================= */
  carregarLista("/events", "eventsGrid", renderEvento);
  carregarLista("/news", "newsGrid", renderNews);

});


/* =========================
   TABS
========================= */
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {

    document.querySelectorAll('.tab-button')
      .forEach(btn => btn.classList.remove('active'));

    document.querySelectorAll('.tab-content')
      .forEach(content => content.classList.remove('active'));

    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});
