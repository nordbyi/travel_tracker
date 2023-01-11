import { fetchAll } from "./apiCalls";
import * as dayjs from "dayjs";

const selectInput = document.querySelector("#destinationsInput");
const tripStartCalendar = document.querySelector("#tripStartInput");
const tripEndCalendar = document.querySelector("#tripEndInput");

tripStartCalendar.addEventListener("change", updateEndCalendar);

let currentDate = dayjs().format("YYYY/MM/DD");
let destinations

fetchAll().then((data) => {
  console.log(data);
  onLoadData(data);
});

function onLoadData(data) {
  destinations = data[2].destinations
  updateSelectOptions(destinations);
  updateStartCalendar()
  updateEndCalendar()
}

function updateSelectOptions(destinations) {
  selectInput.innerHTML = "";
  destinations
    .sort((a, b) => a.destination.localeCompare(b.destination))
    .forEach((destination) => {
      selectInput.innerHTML += `<option value=${destination.destination}>${destination.destination}</option>`;
    });
}

function updateStartCalendar() {
  const calendarDate = dayjs(currentDate).format("YYYY-MM-DD");
  if(!tripStartCalendar.value) {
    tripStartCalendar.setAttribute("min", calendarDate);
    tripStartCalendar.value = calendarDate;
  }
}

function updateEndCalendar() {
  if (!tripEndCalendar.value || dayjs(tripStartCalendar.value).isAfter(dayjs(tripEndCalendar.value))) {
    tripEndCalendar.value = tripStartCalendar.value
    tripEndCalendar.setAttribute("min", tripStartCalendar.value);
  }
  else {
    tripEndCalendar.setAttribute("min", tripStartCalendar.value);
  }
}
