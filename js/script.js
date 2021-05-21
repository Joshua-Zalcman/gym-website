/*----- constants -----*/
const BASE_URL = "https://60a808808532520017ae5746.mockapi.io/api/v1/";
const TRAINERS = "trainers";
const CLASSES = "classes";
/*----- app's state (variables) -----*/
let apiData = null;
/*----- cached element references -----*/
/*----- event listeners -----*/
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
    return `<article><img src=${item.avatar}>
    <h3>${item.name}</h3><p>${item.info}</p></article>`;
  });
  $("#trainers").html(html);
}

function renderClasses() {
  let html = apiData.map((item) => {
    return `<article><img src=${item.image}>
    <h3>${item.title}</h3><p>${item.type}</p></article>`;
  });
  $("#classes").html(html);
}

getData(TRAINERS);
getData(CLASSES);
