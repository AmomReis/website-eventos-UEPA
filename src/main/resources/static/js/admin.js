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


/* =========================
   SUBMIT GENÉRICO (EVENT / NEWS)
========================= */
function configurarSubmitForm({
  formId,
  endpoint,
  sucessoMsg,
  erroMsg,
  onSuccess
}) {
  const form = document.getElementById(formId);

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(endpoint, {
      method: "POST",
      body: formData
    })
      .then(response => {
        if (!response.ok) throw new Error(erroMsg);
        // NÃO tenta converter para JSON
      })
      .then(() => {
        alert(sucessoMsg);
        form.reset();
        if (onSuccess) onSuccess();
      })
      .catch(error => {
        alert(erroMsg);
        console.error(error);
      });
  });
}


/* =========================
   FUNÇÃO GENÉRICA LISTAR
========================= */
function carregarLista(endpoint, containerId, renderItem) {
  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = "";

      data.forEach(item => {
        container.innerHTML += renderItem(item);
      });
    })
    .catch(err => console.error(`Erro ao carregar ${endpoint}`, err));
}


/* =========================
   RENDER EVENTO
========================= */
function renderEvento(event) {
  return `
    <div class="event-card-admin">

      <div class="event-info">
        <div class="content-top">
          <h3 class="event-title">${event.titleEvent}</h3>

          <div class="num-participants">
            <p>👥 0</p>
          </div>
        </div>

        <div class="event-details">
          <p>
            ${event.dateEvent} • ${event.startEvent} • ${event.locationEvent}
          </p>
        </div>
      </div>

      <div class="event-actions">
        <button class="btn-action view-participants"
          onclick="irParaParticipantes()">
          Ver Inscritos
        </button>

        <button class="btn-action edit"
          onclick="editarItem()">
          Editar
        </button>

        <button class="btn-action delete"
          onclick="excluirItem('/events', ${event.idEvent})">
          Excluir
        </button>
      </div>

    </div>
  `;
}


/* =========================
   RENDER NEWS
========================= */
function renderNews(news) {
  return `
    <div class="event-card-admin">

      <div class="event-info">
        <h3 class="event-title">${news.title}</h3>
        <p>${news.content ? news.content.substring(0, 120) : ""}...</p>
      </div>

      <div class="event-actions">
        <button class="btn-action edit"
          onclick="editarItem()">
          Editar
        </button>

        <button class="btn-action delete"
          onclick="excluirItem('/news', ${news.id})">
          Excluir
        </button>
      </div>

    </div>
  `;
}


/* =========================
   RENDER PARTICIPANT
========================= */
function renderParticipant(p) {
  return `
    <div class="event-card-admin">

      <div class="event-info">
        <h3>${p.name}</h3>
        <p>${p.email}</p>
        <p>${p.course}</p>
        <p>${p.registration}</p>
      </div>

      <div class="event-actions">
        <button class="btn-action delete"
          onclick="excluirItem('/participants', ${p.idParticipant})">
          Excluir
        </button>
      </div>

    </div>
  `;
}


/* =========================
   EXCLUIR (GENÉRICO)
========================= */
function excluirItem(endpoint, id) {
  if (!confirm("Deseja realmente excluir?")) return;

  fetch(`${endpoint}/${id}`, {
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao excluir");
      alert("Excluído com sucesso!");
      location.reload();
    })
    .catch(err => {
      alert("Erro ao excluir");
      console.error(err);
    });
}


/* =========================
   AÇÕES AUXILIARES
========================= */
function irParaParticipantes() {
  const tab = document.querySelector('[data-tab="participantes"]');
  if (tab) tab.click();
}

function editarItem() {
  alert("Funcionalidade de edição em desenvolvimento");
}


/* =========================
   CHAMADAS INICIAIS
========================= */
function carregarEventos() {
  carregarLista("/events", "adminEventsContainer", renderEvento);
}

function carregarNews() {
  carregarLista("/news", "adminNewsContainer", renderNews);
}

function carregarParticipants() {
  carregarLista("/participants", "adminParticipantContainer", renderParticipant);
}

/* =========================
   CONFIGURA SUBMIT DOS FORMS
========================= */
configurarSubmitForm({
  formId: "registrationFormEvent",
  endpoint: "http://localhost:8081/events",
  sucessoMsg: "Evento cadastrado com sucesso!",
  erroMsg: "Erro ao cadastrar evento",
  onSuccess: carregarEventos
});

configurarSubmitForm({
  formId: "registrationFormNews",
  endpoint: "http://localhost:8081/news",
  sucessoMsg: "Notícia cadastrada com sucesso!",
  erroMsg: "Erro ao cadastrar notícia",
  onSuccess: carregarNews
});


/* =========================
   LOAD INICIAL
========================= */
carregarEventos();
carregarNews();
carregarParticipants();
