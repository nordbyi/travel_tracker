import { fetchAll } from "./apiCalls";
import * as dayjs from 'dayjs'

const selectInput = document.querySelector("#destinationsInput");
const tripStartCalendar = document.querySelector("#tripStartInput");
const tripEndCalendar = document.querySelector("#tripEndInput");

let currentDate = dayjs().format('YYYY/MM/DD')
console.log(currentDate)

fetchAll().then((data) => {
  console.log(data);
  onLoadData(data);
  updateCalendars()
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

function updateCalendars() {
  const calendarDate = dayjs(currentDate).format('YYYY-MM-DD')
  console.log(tripStartCalendar)
  tripStartCalendar.setAttribute('min', calendarDate)
  tripStartCalendar.setAttribute('value', calendarDate)
  tripEndCalendar.setAttribute('min', tripStartCalendar.value)
  tripEndCalendar.setAttribute('value', tripStartCalendar.value)
}