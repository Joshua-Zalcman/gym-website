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
    return `<article class="card m-2" ><img src=${item.avatar} class="card-img-top"><div class="card-body">
    <h3 class="card-title">${item.name}</h3><p class="card-text">${item.info}</p><a href="#" class="card-link">More Info</a></div></article>`;
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
    return `<div class="class  d-flex flex-column justify-content-between p-2 mt-2 " style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${item.image}); max-width: 30%;"> 
    <h4 class="display-4 text-wrap">${item.title}</h4><button class="btn w-50 " style="margin-left: auto">Sign Up</button></div>`;
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
