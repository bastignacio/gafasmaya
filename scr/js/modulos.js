document.addEventListener("DOMContentLoaded", async function () {
    // Cargar Navbar con cache
    await cargarContenidoConCache("navbar", "/scr/pages/modulos/navbar.html", "navbar-container");
    // await cargarContenidoConCache("navbar", "/gafasmaya/scr/pages/modulos/navbar.html", "navbar-container");


    // Cargar Footer con cache
    await cargarContenidoConCache("footer", "/scr/pages/modulos/footer.html", "footer-container");
    // await cargarContenidoConCache("footer", "/gafasmaya/scr/pages/modulos/footer.html", "footer-container");

});

async function cargarContenidoConCache(clave, url, contenedorId) {
    try {
        // Verificar si el contenido ya está en LocalStorage
        let contenido = localStorage.getItem(clave);

        if (!contenido) {
            console.log(`Cargando ${clave} desde el servidor...`);
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error al cargar ${clave}: ${response.statusText}`);
            contenido = await response.text();

            // Almacenar en LocalStorage para futuras cargas
            localStorage.setItem(clave, contenido);
        } else {
            console.log(`Cargando ${clave} desde cache.`);
        }

        // Insertar el contenido en el contenedor correspondiente
        document.getElementById(contenedorId).innerHTML = contenido;
    } catch (error) {
        console.error(`Error al cargar ${clave}:`, error);
    }
}

