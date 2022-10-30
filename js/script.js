"use strict";

/**
 * Esta función agrega un detector de eventos a un elemento o elementos.
 * @param elem - el elemento al que desea agregar el evento
 * @param type - El tipo de evento a escuchar.
 * @param callback - La función que se ejecutará cuando se active el evento.
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * navbar toggle
 */

/* Seleccionar la barra de navegación, el alternador de navegación y los enlaces de navegación. */
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

/**
 * Si la barra de navegación tiene la clase activa, elimínela. Si no tiene la clase activa, agréguela.
 */
const toggleNavbar = () => navbar.classList.toggle("active");

/* Agregar un detector de eventos al elemento navToggler. Cuando se hace clic en el elemento
  navToggler, se llamará a la función toggleNavbar. */
addEventOnElem(navToggler, "click", toggleNavbar);
/**
 * Elimina la clase activa de la barra de navegación.
 */

const closeNavbar = () => navbar.classList.remove("active");

/* Agregar un detector de eventos a navLinks. */
addEventOnElem(navLinks, "click", closeNavbar);

/* Seleccionando el encabezado y botón superior atrás. */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

/**
 * Si la ventana se desplaza más de 100 px, agregue la clase "activa" al encabezado y al botón de
 * regreso al principio. De lo contrario, elimine la clase "activa" del encabezado y vuelva al botón
 * superior
 */
const headerActive = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

/* Agregar un detector de eventos al objeto de la ventana. Cuando se desplaza la ventana, se llamará a
la función headerActive. */
addEventOnElem(window, "scroll", headerActive);

/* El código anterior está seleccionando todos los botones de filtro y elementos de filtro. */
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter]");

let lastClickedFilterBtn = filterBtns[0];

/**
 * Si el botón de filtro en el que se hizo clic es el mismo que el filtro del elemento de filtro,
 * muestre el elemento de filtro. De lo contrario, escóndelo
 */
const filter = function () {
  lastClickedFilterBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedFilterBtn = this;

  for (let i = 0; i < filterItems.length; i++) {
    if (
      this.dataset.filterBtn === filterItems[i].dataset.filter ||
      this.dataset.filterBtn === "all"
    ) {
      filterItems[i].style.display = "block";
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].style.display = "none";
      filterItems[i].classList.remove("active");
    }
  }
};

/* Agregar un detector de eventos a los botones de filtro. */
addEventOnElem(filterBtns, "click", filter);

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

//insert li tag in ul tag
// const liTag = document.createElement("li");
// liTag.setAttribute("data-filter", "shaving");
// liTag.innerHTML = ` <div class="pricing-card">
// <figure
//   class="card-banner img-holder"
//   style="--width: 90; --height: 90"
// >
//   <img
//     src="./img/pricing-1.jpg"
//     width="90"
//     height="90"
//     alt="Hair Cutting & Fitting"
//     class="img-cover"
//   />
// </figure>

// <div class="wrapper">
//   <h3 class="h3 card-title">Hair Cutting & Fitting</h3>

//   <p class="card-text">Clean & simple 30-40 minutes</p>
// </div>

// <data class="card-price" value="89">$89</data>
// </div>`;
// ulService.appendChild(liTag);
//----------------------------

const ulService = document.querySelectorAll("ul")[6];
console.log(ulService);

fetch("https://barberbackend-production.up.railway.app/api/servicios?populate=*", requestOptions)
//fetch("http://localhost:1337/api/servicios?populate=*", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result.data);
    const array = result.data;
    array.map((item) => {
      const attributes = item.attributes;
      console.log(attributes.imagen.data.attributes.url);
      const liTag = document.createElement("li");
      liTag.setAttribute("data-filter", attributes.tiposervicio);
      liTag.innerHTML = ` <div class="pricing-card">
      <!-- checkbox -->
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="${attributes.precio}"
          id="flexCheckDefault"
        />
      </div>
      <figure
      class="card-banner img-holder"
      style="--width: 90; --height: 90"
      >
      <img
      src="${attributes.imagen.data.attributes.url}"
      width="90"
      height="90"
      alt="${attributes.nombre}"
      class="img-cover"
      />
      </figure>
      
      <div class="wrapper">
      <h3 class="h3 card-title">${attributes.nombre}</h3>
      
      <p class="card-text">${attributes.descripcion}</p>
      </div>
      
      <data class="card-price" value="${attributes.precio}">$${attributes.precio}</data>
      </div>`;
      ulService.appendChild(liTag);
    });
  })
  .catch((error) => console.log("error", error));

const total = () => {
  const x = document.querySelectorAll('input[type="checkbox"]:checked');
  console.log(x[0]);
  let total = 0;
  if (x.length > 0) {
    for (let i = 0; i < x.length; i++) {
      total += parseInt(x[i].value);
    }
    document.getElementById("total").innerHTML = total;
    // console.log(total);
  } else {
    document.getElementById("total").innerHTML = 0;
  }
  return false;
};

// obtener total boton
const totalNumber = document.getElementById("btnTotal");
totalNumber.addEventListener("click", (e) => {
  e.preventDefault();
  const x = document.querySelectorAll('input[type="checkbox"]:checked');
  console.log(x[0]);
  let total = 0;
  if (x.length > 0) {
    for (let i = 0; i < x.length; i++) {
      total += parseInt(x[i].value);
    }
    document.getElementById("total").innerHTML = total;
    // console.log(total);
  } else {
    document.getElementById("total").innerHTML = 0;
  }
});

//------------------Enviar  formulario de citas------------------
//get data form
const form = document.querySelectorAll("form")[0];
form.addEventListener("submit", (e) => {
  const x = document.querySelectorAll('input[type="checkbox"]:checked');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  e.preventDefault();
  //console.log(x[0]);
  /* El código anterior suma los valores de los campos de entrada y muestra el total en el campo total. */
  let total = 0;
  if (x.length > 0) {
    for (let i = 0; i < x.length; i++) {
      total += parseInt(x[i].value);
    }
    // total to string
    data.total = total.toString();
  } else {
    data.total = total.toString();
    console.log(total);
  }

  console.log(data);
  /* El código anterior está enviando una solicitud POST al servidor. */
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: data }),
  };
  fetch("https://barberbackend-production.up.railway.app/api/citas", requestOptions)
  //fetch("http://localhost:1337/api/citas", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert("Cita agendada con exito");
      console.log(result);
      form.reset();
    })
    .catch((error) => console.log("error", error));
});

//-----------------Enviar Correo
/* Este código está enviando una solicitud POST al servidor. */
const formEmail = document.querySelectorAll("form")[1];
formEmail.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formEmail);
  const data = Object.fromEntries(formData);
  console.log(data);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: data }),
  };
  fetch("https://barberbackend-production.up.railway.app/api/correos", requestOptions)
  //fetch("http://localhost:1337/api/correos", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert("Cita agendada con exito");
      console.log(result);
      formEmail.reset();
    })
    .catch((error) => console.log("error", error));
});
