/*----- constants -----*/
const BASE_URL = "https://60a808808532520017ae5746.mockapi.io/api/v1/";
const TRAINERS = "trainers";
const CLASSES = "classes";
/*----- app's state (variables) -----*/
let apiData = null;
let showMore = false;
/*----- cached element references -----*/
const $navbarLinks = $("#navbarLinks");

/*----- event listeners -----*/
$(".navbar-toggler").on("click", toggleMenu);
$("#showMoreTrainers").on("click", showMoreTrainers);
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
  $("#trainers").html("");
  let html = apiData.map((item) => {
    return `<article class="card m-2" style="width: 18rem;"><img src=${item.avatar} class="card-img-top"><div class="card-body">
    <h3 class="card-title">${item.name}</h3><p class="card-text">${item.info}</p><a href="#" class="card-link">More Details</a></div></article>`;
  });
  if (!showMore) {
    $("#trainers").append(html.splice(0, 3));
    $("#showMoreTrainers").text("Show More");
  } else {
    $("#trainers").append(html);
    $("#showMoreTrainers").text("Show Less");
  }
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

function showMoreTrainers() {
  showMore = !showMore;
  getData(TRAINERS);
}

getData(TRAINERS);
getData(CLASSES);
