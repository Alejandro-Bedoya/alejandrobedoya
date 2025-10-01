// Canvas espacial + estrellas + meteoritos + interacción 3D de la pantalla

/* -------------------------
   Setup del canvas (devicePixelRatio friendly)
   ------------------------- */
const canvas = document.getElementById("space");
if (!canvas) {
  console.warn("Canvas #space no encontrado.");
} else {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    // mapear el contexto a CSS pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    initStars(); // re-calcular estrellas para nueva resolución
  });

  resizeCanvas();

  /* -------------------------
     Estrellas y meteoritos
     ------------------------- */
  let stars = [];
  let meteors = [];

  function initStars() {
    stars = [];
    const baseCount = Math.max(120, Math.floor((window.innerWidth * window.innerHeight) / 50000));
    for (let i = 0; i < baseCount; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.4 + 0.2,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.35 + 0.02
      });
    }
  }

  function createMeteor() {
    meteors.push({
      x: Math.random() * window.innerWidth,
      y: -20,
      length: Math.random() * 120 + 60,
      speed: Math.random() * 6 + 4,
      opacity: Math.random() * 0.5 + 0.25,
      angle: Math.random() * 0.6 + 0.2 // ángulo diagonal
    });
  }

  // Crear meteoros periódicamente (aleatorio)
  setInterval(() => {
    if (Math.random() > 0.45) createMeteor();
  }, 1200);

  initStars();

  /* -------------------------
     Animación principal
     ------------------------- */
  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Estrellas
    for (let s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
      ctx.fill();

      // parpadeo
      s.opacity += (Math.random() - 0.5) * 0.06;
      s.opacity = Math.max(0.05, Math.min(1, s.opacity));

      // movimiento leve
      s.y += s.speed;
      if (s.y > window.innerHeight + 5) {
        s.y = -5;
        s.x = Math.random() * window.innerWidth;
      }
    }

    // Meteoritos (trazos diagonales)
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      const x2 = m.x + Math.cos(m.angle) * m.length;
      const y2 = m.y + Math.sin(m.angle) * m.length;

      const grad = ctx.createLinearGradient(m.x, m.y, x2, y2);
      grad.addColorStop(0, `rgba(255,255,255,${m.opacity})`);
      grad.addColorStop(1, "transparent");

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // avanzar meteorito
      m.x += Math.cos(m.angle) * m.speed;
      m.y += Math.sin(m.angle) * m.speed;

      // eliminar fuera de pantalla
      if (m.x - m.length > window.innerWidth || m.y - m.length > window.innerHeight) {
        meteors.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* -------------------------
   Interacción 3D: control con mouse para la pantalla holográfica
   ------------------------- */
const holo = document.querySelector(".hologram");
if (holo) {
  // mantener la inclinación base (15deg en X)
  const baseRotateX = 15;

  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 30; // gira Y
    const y = (window.innerHeight / 2 - e.clientY) / 30; // gira X
    holo.style.transform = `rotateX(${baseRotateX + y}deg) rotateY(${x}deg)`;
  });

  // reset cuando el mouse sale del viewport
  window.addEventListener("mouseleave", () => {
    holo.style.transform = `rotateX(${baseRotateX}deg) rotateY(0deg)`;
  });
}