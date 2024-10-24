let carrito = [];

function agregarAlCarrito(item) {
    carrito.push(item);
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalItems = document.getElementById('total-items');
    
    listaCarrito.innerHTML = ''; // Limpiar lista antes de actualizar

    const itemsAgrupados = carrito.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});

    for (const [item, cantidad] of Object.entries(itemsAgrupados)) {
        const li = document.createElement('li');
        li.textContent = `${item} - ${cantidad} unidades`;
        listaCarrito.appendChild(li);
    }

    totalItems.textContent = carrito.length;
}