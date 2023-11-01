class Pizzas {
    constructor (id, nombre, categoria, precio, imagen) {
      this.id = id;
      this.nombre = nombre;
      this.categoria = categoria;
      this.precio = precio;
      this.imagen = imagen;
    }
}

const todasLasPizzas = [];

todasLasPizzas.push(new Pizzas("01", "Top Cheddar", "Clasicas", 1500, "./img/pizza1.png"));
todasLasPizzas.push(new Pizzas("02", "Al Capone", "Clasicas", 2300, "./img/pizza2.png"));
todasLasPizzas.push(new Pizzas("03", "Sour Cream", "Clasicas", 1800, "./img/pizza3.png"));
todasLasPizzas.push(new Pizzas("04", "Crazy Chicken", "Clasicas", 1700, "./img/pizza4.png"));
todasLasPizzas.push(new Pizzas("05", "Pepperoni Heaven", "Clasicas", 1750, "./img/pizza5.png"));
todasLasPizzas.push(new Pizzas("06", "Picante Dulce", "Clasicas", 1800, "./img/pizza6.png"));
todasLasPizzas.push(new Pizzas("07", "Siciliana", "Clasicas", 1900, "./img/pizza7.png"));
todasLasPizzas.push(new Pizzas("08", "Polaca", "Clasicas", 1600, "./img/pizza8.png"));
todasLasPizzas.push(new Pizzas("09", "Mix Picante", "Clasicas", 1650, "./img/pizza9.png"));
todasLasPizzas.push(new Pizzas("10", "Tropical Spicy", "Clasicas", 1500, "./img/pizza10.png"));
todasLasPizzas.push(new Pizzas("11", "Alfredo's", "Clasicas", 1750, "./img/pizza11.png"));
todasLasPizzas.push(new Pizzas("12", "Al Pesto", "Clasicas", 1600, "./img/pizza12.png"));
todasLasPizzas.push(new Pizzas("13", "Papa Francis", "Gluten Free", 2000, "./img/pizza13GlutenFree.png"));
todasLasPizzas.push(new Pizzas("14", "Maritima", "Gluten Free", 2100, "./img/pizza14GlutenFree.png"));
todasLasPizzas.push(new Pizzas("15", "Chicken Shroom", "Gluten Free", 2200, "./img/pizza15GlutenFree.png"));
todasLasPizzas.push(new Pizzas("16", "Pepperoni Spicy", "Gluten Free", 2100, "./img/pizza16GlutenFree.png"));
todasLasPizzas.push(new Pizzas("17", "Caribe Magic", "Gluten Free", 2300, "./img/pizza17GlutenFree.png"));
todasLasPizzas.push(new Pizzas("18", "Jalapeño Bomba", "Gluten Free", 1600, "./img/pizza18GlutenFree.png"));
todasLasPizzas.push(new Pizzas("19", "Caprese", "Veggies", 1700, "./img/pizza19veggie.png"));
todasLasPizzas.push(new Pizzas("20", "Combo Veggie", "Veggies", 1850, "./img/pizza20veggie.png"));
todasLasPizzas.push(new Pizzas("21", "De los Dioses", "Veggies", 1950, "./img/pizza21veggie.png"));
todasLasPizzas.push(new Pizzas("22", "Napolitana", "Veggies", 1700, "./img/pizza22veggie.png"));
todasLasPizzas.push(new Pizzas("23", "Mix Veggie", "Veggies", 1600, "./img/pizza23veggie.png"));
todasLasPizzas.push(new Pizzas("24", "Carne Veggie", "Veggies", 1950, "./img/pizza24veggie.png"));


const contenedorPizzas = document.querySelector("#contenedor-pizzas");
const selectorPizzas = document.querySelectorAll(".boton-selector");
const titulo = document.querySelector("#titulo");
const cantidadCarrito = document.querySelector("#cantidad");
let botonAgregar = document.querySelectorAll(".boton-agregar");

  

function cargarPizzas (pizzaCategoria) {
  contenedorPizzas.innerHTML = "";
  pizzaCategoria.forEach((pizza) => {
      const div = document.createElement("div");
      div.classList.add("pizza");
      div.innerHTML = `
      <img class="pizza-imagen" src="${pizza.imagen}" alt="${pizza.nombre}">
      <div class="pizza-info">
          <h3>${pizza.nombre}</h3>
          <p>$${pizza.precio}</p>
          <button id="${pizza.id}" class="boton-agregar">Agregar</button>
      </div>
      `
      contenedorPizzas.append(div);
  })

  actualizarBotones();
}

cargarPizzas(todasLasPizzas);

selectorPizzas.forEach(selector => {
  selector.addEventListener("click", (e) => {
    selectorPizzas.forEach((selector) => selector.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "pizzas-todas") {
    const encontrarPizza = todasLasPizzas.find((pizza) => pizza.categoria === e.currentTarget.id);
    titulo.innerText = encontrarPizza.categoria;

    const pizzasCat = todasLasPizzas.filter((pizza) => pizza.categoria === e.currentTarget.id);
    cargarPizzas(pizzasCat);
  } else {
    titulo.innerText = "Todas las Pizzas";
    cargarPizzas(todasLasPizzas);
  }
  })
})


function actualizarBotones() {
  botonAgregar = document.querySelectorAll(".boton-agregar");

  botonAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

//Carrito
let carrito;
let carritoLocalStorage = localStorage.getItem("pizzasEnCarrito");

if (carritoLocalStorage) {
  carrito = JSON.parse(carritoLocalStorage);
  actualizarCantidad();
} else {
  carrito = [];
}


function agregarAlCarrito(e){
  const idPizza = e.currentTarget.id;
  const agregar = todasLasPizzas.find((pizza) =>pizza.id === idPizza);

  if(carrito.some((pizza)=> pizza.id === idPizza)) {
    const index = carrito.findIndex(pizza => pizza.id === idPizza);
    carrito[index].cantidad++;

  } else {
    agregar.cantidad = 1;
    carrito.push(agregar);
  }

  localStorage.setItem("pizzasEnCarrito", JSON.stringify(carrito));

  actualizarCantidad();
}

function actualizarCantidad() {
  let nuevaCantidad = carrito.reduce((acc, pizza) => acc + pizza.cantidad, 0);
  cantidadCarrito.innerText = nuevaCantidad;
  localStorage.setItem("cantidad", JSON.stringify(nuevaCantidad));
}
