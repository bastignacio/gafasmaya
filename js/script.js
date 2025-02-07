// script.js

// Función global para actualizar la imagen principal al hacer clic en una miniatura
function updateMainImage(thumbnail) {
    const newSrc = thumbnail.src;
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
      mainImage.src = newSrc;
    }
  }
  
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
  
    // Eventos para botones de decremento
    document.querySelectorAll('.decrement').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const input = this.nextElementSibling;
        let currentVal = parseInt(input.value);
        if (currentVal > 1) {
          input.value = currentVal - 1;
        }
      });
    });
  
    // Eventos para botones de incremento
    document.querySelectorAll('.increment').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const input = this.previousElementSibling;
        let currentVal = parseInt(input.value);
        input.value = currentVal + 1;
      });
    });
  
    // Evento para botones "Agregar"
    document.querySelectorAll('.add-to-cart').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const cardBody = this.closest('.card-body');
        const productName = cardBody.querySelector('.card-title').textContent;
        const quantityInput = cardBody.querySelector('.quantity-input');
        const quantity = parseInt(quantityInput.value);
        addToCart(productName, quantity);
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
  