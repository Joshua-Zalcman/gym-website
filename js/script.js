/*----- constants -----*/
const BASE_URL = "https://60a808808532520017ae5746.mockapi.io/api/v1/";
const TRAINERS = "trainers";
const CLASSES = "classes";
/*----- app's state (variables) -----*/
let apiData = null;
/*----- cached element references -----*/
const $navbarLinks = $("#navbarLinks");
/*----- event listeners -----*/
$(".navbar-toggler").on("click", toggleMenu);
/*----- functions -----*/
function getData(endpoint) {
  $.ajax({
    url: `${BASE_URL}${endpoint}`,
  }).then(
    (data) => {
      apiData = data;
      if (endpoint === "trainers") {
        renderTrainers();
      } else {
        renderClasses();
      }
    },
    (error) => {
      console.log(error);
    }
  );
}

function renderTrainers() {
  let html = apiData.map((item) => {
    return `<article class="card m-2" style="width: 18rem;"><img src=${item.avatar} class="card-img-top"><div class="card-body">

    <h3 class="card-title">${item.name}</h3><p class="card-text">${item.info}</p></div></article>`;
  });
  $("#trainers").append(html);
}

function renderClasses() {
  let html = apiData.map((item) => {
    return `<article class="card m-1 mw-75"><img src=${item.image} class="card-img-top"><div class="card-body">

    <h3 class="card-title">${item.title}</h3><p class="card-text">${item.type}</p></div></article>`;
  });
  $("#classes").append(html);
}

function toggleMenu() {
  $navbarLinks.toggle(500);
}

getData(TRAINERS);
getData(CLASSES);
