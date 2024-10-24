document.addEventListener("DOMContentLoaded", async function () {
    // Cargar Navbar
    await cargarContenido("navbar", "scr/pages/modulos/navbar.html", "navbar-container");

    // Cargar Footer
    await cargarContenido("footer", "scr/pages/modulos/footer.html", "footer-container");
});

async function cargarContenido(clave, url, contenedorId) {
    try {
        let contenido = localStorage.getItem(clave);
        if (!contenido) {
            const response = await fetch(url);
            if (response.ok) contenido = await response.text();
            localStorage.setItem(clave, contenido);
        }
        document.getElementById(contenedorId).innerHTML = contenido;
    } catch (error) {
        console.error(`Error al cargar ${clave}:`, error);
    }
}