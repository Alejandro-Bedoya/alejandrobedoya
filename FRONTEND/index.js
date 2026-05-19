const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");

  const icon = menuToggle.querySelector("i");

  if (navbar.classList.contains("active")) {
    icon.classList.remove("bx-menu");
    icon.classList.add("bx-x");
  } else {
    icon.classList.remove("bx-x");
    icon.classList.add("bx-menu");
  }
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");

    const icon = menuToggle.querySelector("i");
    icon.classList.remove("bx-x");
    icon.classList.add("bx-menu");
  });
});

/* ==========================================
   FORMULARIO DE CONTACTO CON MAILTO
========================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validar campos
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    // Obtener valores
    const nombre = contactForm.querySelector('[name="Nombre"]').value.trim();
    const correo = contactForm.querySelector('[name="Correo"]').value.trim();
    const asunto = contactForm.querySelector('[name="Asunto"]').value.trim();
    const mensaje = contactForm.querySelector('[name="Mensaje"]').value.trim();

    // Tu correo de destino
    const destino = 'jalejandrobedoyab@gmail.com';

    // Construir cuerpo del mensaje
    const cuerpo =
`Nombre: ${nombre}
Correo: ${correo}

Mensaje:
${mensaje}`;

    // Crear enlace mailto
    const mailtoLink =
      `mailto:${destino}` +
      `?subject=${encodeURIComponent(asunto)}` +
      `&body=${encodeURIComponent(cuerpo)}`;

    // Abrir cliente de correo
    window.location.href = mailtoLink;
  });
}