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
let botonSumar = document.querySelectorAll(".boton-sumar");
let botonRestar = document.querySelectorAll(".boton-restar");
let cantidadPizza = document.querySelectorAll("#cantidad-pizza");
console.log (cantidadPizza);


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
                <h3>Cantidad</h3>
                <div class="botones-cantidad">
                <button id=${pizza.id} class="boton-sumar-restar boton-restar"><i class='bx bx-minus'></i></button>
                <span id="cantidad-pizza" class="cantidad">${pizza.cantidad}</span>
                <button id=${pizza.id} class="boton-sumar-restar boton-sumar"><i class='bx bx-plus'></i></button>
                </div>
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
  
    actualizarSumar();
    actualizarRestar();
    botonesEliminar();
    actualizarCantidad();
    actualizarTotal();
}

cargarCarrito();

function actualizarCantidad() {
  let nuevaCantidad = carrito.reduce((acc, pizza) => acc + pizza.cantidad, 0);
  cantidadCarrito.innerText = nuevaCantidad;
  localStorage.setItem("cantidad", JSON.stringify(nuevaCantidad));
}

                     /* Boton Eliminar */

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


                     /* Boton Comprar y Total */

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

                     /* Botones Sumar y Restar */


function actualizarSumar() {
  botonSumar = document.querySelectorAll(".boton-sumar");

  botonSumar.forEach(boton => {
    boton.addEventListener("click", sumarAlCarrito);
  });
}

function sumarAlCarrito(e){
  const idPizza = e.currentTarget.id;
  const agregar = carrito.find((pizza) =>pizza.id === idPizza);


  if(carrito.some((pizza)=> pizza.id === idPizza)) {
    const index = carrito.findIndex(pizza => pizza.id === idPizza);
    carrito[index].cantidad++;

    actualizarCantidad();

  } else {
    carrito.push(agregar);
  }

  localStorage.setItem("pizzasEnCarrito", JSON.stringify(carrito));
  cargarCarrito();
}


function actualizarRestar() {
  botonSumar = document.querySelectorAll(".boton-restar");

  botonSumar.forEach(boton => {
    boton.addEventListener("click", restarAlCarrito);
  });
}

function restarAlCarrito(e){
  const idPizza = e.currentTarget.id;
  const agregar = carrito.find((pizza) =>pizza.id === idPizza);


  if(carrito.some((pizza)=> pizza.id === idPizza)) {
    const index = carrito.findIndex(pizza => pizza.id === idPizza);

    if (carrito[index].cantidad > 1) {
    carrito[index].cantidad--;

    actualizarCantidad();
  }
  } else {
    carrito.push(agregar);
  }

  localStorage.setItem("pizzasEnCarrito", JSON.stringify(carrito));
  cargarCarrito();
}


                    /* Boton Vaciar */

carritoVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  carrito.length = 0;
  localStorage.setItem("pizzasEnCarrito", JSON.stringify(carrito));

  actualizarCantidad();
  cargarCarrito();
}