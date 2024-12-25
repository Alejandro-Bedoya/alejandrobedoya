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