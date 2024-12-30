// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toogle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// FORMULARIO WHATSAPP
function sendToWhatsApp() {
    // Validar que el usuario haya aceptado las políticas
    const acceptPolicies = document.getElementById("accept_policies").checked;
    if (!acceptPolicies) {
        alert("Por favor, acepta las políticas de cookies y privacidad antes de enviar el formulario.");
        return;
    }

    // Obtener valores del formulario
    const name = document.getElementById("full_name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile_number").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Validar el número de teléfono
    const phoneRegex = /^\+[0-9]{1,3} [0-9]{7,10}$/;
    if (!phoneRegex.test(mobile)) {
        alert("Por favor, ingrese un número válido con el indicativo del país (+57 3211234567).");
        return;
    }

    // Número de WhatsApp al que se enviarán los datos
    const whatsappNumber = "573118513411"; // Reemplaza con el número de WhatsApp del destinatario.

    // Crear el mensaje en formato de URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=
        Full%20Name:%20${encodeURIComponent(name)}%0A
        Email:%20${encodeURIComponent(email)}%0A
        Mobile%20Number:%20${encodeURIComponent(mobile)}%0A
        Subject:%20${encodeURIComponent(subject)}%0A
        Message:%20${encodeURIComponent(message)}`;

    // Redirigir a WhatsApp
    window.open(whatsappUrl, "_blank");
}

// FOOTER
function changeLanguage() {
    const language = document.getElementById('language').value;
    if (language === 'en') {
        window.location.href = 'index-en.html'; // Página en inglés
    } else {
        window.location.href = 'index.html'; // Página en español
    }

    function changeLanguage() {
        const language = document.getElementById("language").value;
        
        // Contenido en español
        const spanishContent = {
            footerText: "Copyright &copy; 2024 by Alejandro Bedoya | Todos los derechos reservados.",
            cookiesLink: "Política de Cookies",
            privacyLink: "Política de Privacidad"
        };
    
        // Contenido en inglés
        const englishContent = {
            footerText: "Copyright &copy; 2024 by Alejandro Bedoya | All Rights Reserved.",
            cookiesLink: "Cookie Policy",
            privacyLink: "Privacy Policy"
        };
    
        let selectedContent = language === "es" ? spanishContent : englishContent;
    
        // Actualizar el contenido
        document.getElementById("footer-text").innerText = selectedContent.footerText;
        document.getElementById("cookies-link").innerText = selectedContent.cookiesLink;
        document.getElementById("privacy-link").innerText = selectedContent.privacyLink;
    }
    
}


// COPAS DE NIEVE
const snowContainer = document.getElementById('snow-container');

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄'; // Copo de nieve estilo estrella

    // Tamaño aleatorio del copo
    const size = Math.random() * 20 + 10; // Tamaño entre 10px y 30px
    snowflake.style.fontSize = `${size}px`;

    // Posición horizontal aleatoria
    snowflake.style.left = `${Math.random() * 100}vw`;

    // Duración aleatoria de la animación
    const fallDuration = Math.random() * 5 + 5; // Entre 5s y 10s
    snowflake.style.animationDuration = `${fallDuration}s`;

    // Agrega el copo al contenedor
    snowContainer.appendChild(snowflake);

    // Elimina el copo una vez que toca el fondo de la pantalla
    setTimeout(() => {
      snowflake.remove();
    }, fallDuration * 1000);
}

// Genera un nuevo copo cada 200ms
setInterval(createSnowflake, 200);


// JUEGOS ARTIFICIALES
const fireworksContainer = document.getElementById('fireworks-container');

// Genera una explosión en una posición aleatoria
function createFirework() {
  const fireworkCount = 30; // Cantidad de partículas por explosión
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.7; // Hasta el 70% de la pantalla

  for (let i = 0; i < fireworkCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('firework-particle');

    // Posición inicial de la explosión
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // Generar movimiento en direcciones aleatorias
    const angle = Math.random() * Math.PI * 2; // Ángulo entre 0 y 2π
    const distance = Math.random() * 200 + 50; // Distancia entre 50px y 250px

    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);

    // Color aleatorio
    const hue = Math.floor(Math.random() * 360);
    particle.style.background = `radial-gradient(circle, hsl(${hue}, 100%, 70%), transparent)`;

    fireworksContainer.appendChild(particle);

    // Elimina la partícula después de la animación
    setTimeout(() => particle.remove(), 1500);
  }
}

// Genera fuegos artificiales aleatorios cada 1.5 segundos
setInterval(createFirework, 1500);