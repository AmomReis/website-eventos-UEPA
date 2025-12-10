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
