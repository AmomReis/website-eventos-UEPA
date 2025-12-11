// evento.js - versão corrigida e completa

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Configuração para animação ao entrar na tela
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
});

// Lazy-load de imagens (pré-config)
let imageObserver;
if ("IntersectionObserver" in window) {
  imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  });
}

// Botão de voltar ao topo
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Mostrar/ocultar botão de scroll-to-top
window.addEventListener("scroll", () => {
  const scrollBtn = document.querySelector(".scroll-to-top");
  if (!scrollBtn) return;

  if (window.pageYOffset > 300) {
    scrollBtn.classList.add("visible");
  } else {
    scrollBtn.classList.remove("visible");
  }
});

// ===============================
// EVENTOS DO DOM
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // Animação dos cards de eventos
  document.querySelectorAll(".event-card").forEach((card) => {
    observer.observe(card);
  });

  // Hover nos cards de estatísticas
  document.querySelectorAll(".stat-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-4px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  // Efeito ripple nos botões
  document.querySelectorAll(".event-btn, .admin-btn, .btn-submit, .btn-back, .btn-maps").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Lazy-load de imagens
  document.querySelectorAll(".event-image img").forEach((img) => {
    if (imageObserver) imageObserver.observe(img);
  });

  // ============================
  // FORMULÁRIO DE INSCRIÇÃO
  // ============================
  const form = document.getElementById("registrationForm");
  const popupOverlay = document.getElementById("successPopup"); // overlay popup central
  const closePopupBtn = document.getElementById("closePopup");
  const successBox = document.getElementById("successMessage"); // caixa inline que já existe
  const errorBox = document.getElementById("errorMessage");
  const errorText = document.getElementById("errorText");
  const submitBtn = document.getElementById("btnSubmit");

  // helper para mostrar erro amigável
  const showError = (msg) => {
    if (errorText) errorText.textContent = msg;
    if (errorBox) errorBox.style.display = "flex";
  };

  const hideMessages = () => {
    if (successBox) successBox.style.display = "none";
    if (errorBox) errorBox.style.display = "none";
  };
});
