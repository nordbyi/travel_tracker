import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "./css/styles.css";
import { fetchAll } from "./apiCalls";
import * as dayjs from "dayjs";
import { swiper, insertSlides } from "./swiper";
import User from "./User";

const selectInput = document.querySelector("#destinationsInput");
const tripStartCalendar = document.querySelector("#tripStartInput");
const tripEndCalendar = document.querySelector("#tripEndInput");

tripStartCalendar.addEventListener("change", updateEndCalendar);

let currentDate = dayjs().format("YYYY/MM/DD");
let travelers
let trips
let destinations
let user

fetchAll(1).then((data) => {
  console.log(data);
  onLoadData(data);
  renderDOM()
});

function onLoadData(data) {
  travelers = data[0].travelers
  trips = data[1].trips
  destinations = data[2].destinations
  user = new User(data[3])
}

function renderDOM() {
  updateSelectOptions(destinations);
  updateStartCalendar()
  updateEndCalendar()
  insertSlides(destinations)
  swiper()
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
