// script.js

// Función global para actualizar la imagen principal al hacer clic en una miniatura
function updateMainImage(thumbnail) {
  const newSrc = thumbnail.src;
  const mainImage = document.querySelector('.main-image');
  if (mainImage) {
    mainImage.src = newSrc;
  }
}

let stockData = {};

function updateStockDisplay(productId) {
  const stockElement = document.getElementById('stock-' + productId);
  if (stockElement) {
    if (stockData[productId] !== undefined) {
      stockElement.textContent = stockData[productId];
    } else {
      stockElement.textContent = 'No disponible';
    }
  }
}

fetch('/stock.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    stockData = data;
    console.log("Stock cargado:", stockData); // Para depuración

    // ---- //
    // MODIFICAR ACÁ AL AGREGAR MAS PRODUCTOS.
    // ---- //

    updateStockDisplay('SutroBlancoAzul');
    updateStockDisplay('SutroBlancoRojo');
    updateStockDisplay('SutroDoradoDorado');
    updateStockDisplay('SutroNegroAzul');
    updateStockDisplay('SutroNegroDorado');
    updateStockDisplay('SutroNegroRojo');
    updateStockDisplay('SutroNegroVerde');
    updateStockDisplay('SutroRosadoRojo');
  })
  .catch(error => console.error('Error al cargar el stock:', error));

document.addEventListener('DOMContentLoaded', function() {
  // Función para actualizar la visualización del carrito
  function updateCartDisplay() {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    for (let product in cart) {
      // Crear contenedor para cada ítem con flexbox
      const itemDiv = document.createElement('div');
      itemDiv.className = 'd-flex justify-content-between align-items-center mb-2';

      const itemText = document.createElement('span');
      itemText.textContent = product + " x " + cart[product];

      // Botón para eliminar el ítem individual (tacho de basura)
      const deleteBtn = document.createElement('button');
      deleteBtn.className = "btn btn-danger btn-sm";
      deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
      
      // Al hacer clic se elimina el producto del carrito
      deleteBtn.addEventListener('click', function() {
        delete cart[product];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
      });
      
      itemDiv.appendChild(itemText);
      itemDiv.appendChild(deleteBtn);
      cartItemsContainer.appendChild(itemDiv);
    }
  }

  // Función para agregar un producto al carrito y guardarlo en localStorage
  function addToCart(productName, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    // Si el producto ya existe, se suma la cantidad
    if (cart[productName]) {
      cart[productName] += quantity;
    } else {
      cart[productName] = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }

  // ------------------------------
  // Se usa el contexto de cada card para obtener el input correcto
  // ------------------------------

  document.querySelectorAll('.decrement').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const cardBody = this.closest('.card-body');
      const input = cardBody.querySelector('.quantity-input');
      let currentVal = parseInt(input.value);
      if (currentVal > 1) {
        input.value = currentVal - 1;
      }
    });
  });

  // ------------------------------
  // Se extrae el identificador del producto desde el atributo data-producto
  // ------------------------------

  document.querySelectorAll('.increment').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const cardBody = this.closest('.card-body');
      const input = cardBody.querySelector('.quantity-input');
      let currentVal = parseInt(input.value);
      // Se asume que el elemento .card-title tiene el atributo data-producto
      const productTitleElem = cardBody.querySelector('.card-title');
      const productName = productTitleElem ? productTitleElem.dataset.producto : null;
      if (productName && stockData[productName] !== undefined && currentVal < stockData[productName]) {
        input.value = currentVal + 1;
      } else {
        alert('No hay suficiente stock disponible.');
      }
    });
  });

  // Evento para botones "Agregar al carrito"
  document.querySelectorAll('.add-to-cart').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const cardBody = this.closest('.card-body');
      // Se espera que el elemento .card-title tenga el atributo data-producto
      const productTitleElem = cardBody.querySelector('.card-title');
      const productName = productTitleElem ? productTitleElem.dataset.producto : null;
      const quantityInput = cardBody.querySelector('.quantity-input');
      const cantidadSolicitada = parseInt(quantityInput.value);
      
      // MODIFICACIÓN: Obtener la cantidad actual en el carrito para ese producto
      const currentCart = JSON.parse(localStorage.getItem('cart')) || {};
      const currentQty = currentCart[productName] || 0;

      // Validar que la cantidad solicitada, sumada a la que ya existe en el carrito, no supere el stock disponible
      if (
        productName && 
        stockData[productName] !== undefined && 
        (currentQty + cantidadSolicitada) <= stockData[productName]
      ) {
        // Para debug //
        // alert(`Agregaste ${cantidadSolicitada} unidades de ${productName}`);
        addToCart(productName, cantidadSolicitada);
      } else {
        alert('❗ATENCION ❗ La cantidad solicitada supera el stock disponible.');
      }
    });
  });


  // Evento para limpiar el carrito completo
  document.getElementById('clear-cart').addEventListener('click', function() {
    localStorage.removeItem('cart');
    updateCartDisplay();
  });

  // Inicializar la visualización del carrito al cargar la página
  updateCartDisplay();
});
