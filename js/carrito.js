let carrito = localStorage.getItem("pizzasEnCarrito");
carrito = JSON.parse(carrito);

const cantidadCarrito = document.querySelector("#cantidad");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoPizzas = document.querySelector("#carrito-pizzas");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoGracias = document.querySelector("#carrito-gracias");
const carritoVaciar = document.querySelector("#boton-vaciar");
let botonEliminar = document.querySelector(".carrito-eliminar");
const total = document.querySelector("#total");
const comprar = document.querySelector("#boton-comprar");

function actualizarCantidad() {
    let nuevaCantidad = carrito.reduce((acc, pizza) => acc + pizza.cantidad, 0);
    cantidadCarrito.innerText = nuevaCantidad;
    localStorage.setItem("cantidad", JSON.stringify(nuevaCantidad));
}



function cargarCarrito() {
    

    if (carrito && carrito.length > 0) {

        carritoVacio.classList.add("ocultar");
        carritoPizzas.classList.remove("ocultar");
        carritoAcciones.classList.remove("ocultar");
        carritoGracias.classList.add("ocultar");

        carritoPizzas.innerHTML = "";

        carrito.forEach(pizza => {
            const div = document.createElement("div");
            div.classList.add("carrito-pizza");
            div.innerHTML = `
            <img src="${pizza.imagen}" alt="${pizza.nombre}">
            <div class="info-carrito">
                <h3>${pizza.nombre}</h3>
                <h4>${pizza.categoria}</h4>
            </div>
            <div class="info-carrito">
                <h3>cantidad</h3>
                <h4>${pizza.cantidad}</h4>
            </div>
            <div class="info-carrito">
                <h3>Precio</h3>
                <h4>$${pizza.precio}</h4>
            </div>
            <div class="info-carrito">
            <h3>Subtotal</h3>
            <h4>$${pizza.precio * pizza.cantidad}</h4>
        </div>
            <button id=${pizza.id} class="carrito-eliminar"><i class='bx bxs-trash'></i></button>
            `

            carritoPizzas.append(div);

        })
    }else {
        carritoVacio.classList.remove("ocultar");
        carritoPizzas.classList.add("ocultar");
        carritoAcciones.classList.add("ocultar");
        carritoGracias.classList.add("ocultar");
    }

    botonesEliminar();
    actualizarCantidad();
    actualizarTotal();
}

cargarCarrito();

function botonesEliminar() {
    botonEliminar = document.querySelectorAll(".carrito-eliminar");
  
    botonEliminar.forEach(boton => {
      boton.addEventListener("click", eliminarPizza);
    });
     
    let nuevaCantidad = JSON.parse(localStorage.getItem("cantidad"));
    cantidadCarrito.innerText = nuevaCantidad;

  }

function eliminarPizza(e) {
    const idBoton = e.currentTarget.id;
    const index = carrito.findIndex(pizza => pizza.id === idBoton);
    carrito.splice(index,1);
    cargarCarrito(); 
    actualizarCantidad();  

    localStorage.setItem("pizzasEnCarrito", JSON.stringify(carrito));
  }

  carritoVaciar.addEventListener("click", vaciarCarrito);

  function vaciarCarrito() {
    carrito.length = 0;
    localStorage.setItem("pizzasEnCarrito", JSON.stringify(carrito));
    cargarCarrito();
  }

  function actualizarTotal() {
    const calculoTotal = carrito.reduce((acc, pizza) => acc + (pizza.precio * pizza.cantidad), 0);
    total.innerText = `$${calculoTotal}`;
  }

  comprar.addEventListener("click", comprarCarrito);

  function comprarCarrito() {
    carrito.length = 0;
    localStorage.setItem("pizzasEnCarrito", JSON.stringify(carrito));
    carritoVacio.classList.add("ocultar");
    carritoPizzas.classList.add("ocultar");
    carritoAcciones.classList.add("ocultar");
    carritoGracias.classList.remove("ocultar");
    cantidadCarrito.innerText = 0;
  }