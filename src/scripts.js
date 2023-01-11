import { fetchAll } from "./apiCalls";
import * as dayjs from 'dayjs'

const selectInput = document.querySelector("#destinationsInput");
const tripStartCalendar = document.querySelector("#tripStartInput");
const tripEndCalendar = document.querySelector("#tripEndInput");


fetchAll().then((data) => {
  console.log(data);
  onLoadData(data);
});

function onLoadData(data) {
  updateSelectOptions(data[2].destinations);
}

function updateSelectOptions(destinations) {
  selectInput.innerHTML = "";
  destinations
    .sort((a, b) => a.destination.localeCompare(b.destination))
    .forEach((destination) => {
      console.log(destination);
      selectInput.innerHTML += `<option value=${destination.destination}>${destination.destination}</option>`;
    });
}

