import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./css/styles.css";
import { fetchAll } from "./apiCalls";
import * as dayjs from "dayjs";
import { swiper, insertSlides } from "./swiper";
import User from "./User";
import Destinations from "./Destinations";
import Trips from "./Trips";

const selectInput = document.querySelector("#destinationsInput");
const tripStartCalendar = document.querySelector("#tripStartInput");
const tripEndCalendar = document.querySelector("#tripEndInput");
const totalExpenses = document.querySelector("#totalExpenses");
const pastTrips = document.querySelector("#pastTrips");
const upcomingTrips = document.querySelector("#upcomingTrips");
const pendingTrips = document.querySelector("#pendingTrips");


tripStartCalendar.addEventListener("change", updateEndCalendar);

let currentDate = dayjs().format("YYYY/MM/DD");
let travelers; // need this?
let trips;
let destinations;
let user;
let userTrips

// change fetch all argument to login page traveler id
fetchAll(2).then((data) => {
  console.log(data);
  onLoadData(data);
  renderDOM();
});

function onLoadData(data) {
  travelers = data[0].travelers; // need this?
  trips = new Trips(data[1].trips);
  destinations = new Destinations(data[2].destinations.sort((a, b) => a.destination.localeCompare(b.destination)));
  user = new User(data[3]);
  console.log(user)
  userTrips = trips.filterByQuery("userID", user.id)
}

function renderDOM() {
  updateSelectOptions(destinations);
  updateStartCalendar();
  updateEndCalendar();
  insertSlides(destinations.destinations);
  swiper();
  displayTotalExpenses();
  displayUserTrips()
}

function updateSelectOptions(destinations) {
  selectInput.innerHTML = "";
  destinations.destinations
    .forEach((destination) => {
      selectInput.innerHTML += `<option value=${destination.destination}>${destination.destination}</option>`;
    });
}

function updateStartCalendar() {
  const calendarDate = dayjs(currentDate).format("YYYY-MM-DD");
  if (!tripStartCalendar.value) {
    tripStartCalendar.setAttribute("min", calendarDate);
    tripStartCalendar.value = calendarDate;
  }
}

function updateEndCalendar() {
  if (
    !tripEndCalendar.value ||
    dayjs(tripStartCalendar.value).isAfter(dayjs(tripEndCalendar.value))
  ) {
    tripEndCalendar.value = tripStartCalendar.value;
    tripEndCalendar.setAttribute("min", tripStartCalendar.value);
  } else {
    tripEndCalendar.setAttribute("min", tripStartCalendar.value);
  }
}

function displayTotalExpenses() {
  const totals = user.calculateExpensesForYear(
    userTrips,
    currentDate,
    destinations
  )
  totalExpenses.innerText = `This Year's Expenditures: Approved: $${totals.approved} Pending: $${totals.pending}`
}

function displayUserTrips() {
  user.pastTrips(userTrips, currentDate).forEach(trip => {
    const destination = destinations.findByQuery('id', trip.destinationID)
    console.log(destination)

    pastTrips.innerHTML += `
    <article class="trip-display">
      <img class="trip-image" src="${destination.image} alt="${destination.alt}">
      <p class="trip-text" >${destination.destination}<p/>
      <p class="trip-text" >${trip.date}<p/>
    <article />`
  })
  user.upcomingTrips(userTrips, currentDate).forEach(trip => {
    const destination = destinations.findByQuery('id', trip.destinationID)
    console.log(destination)

    upcomingTrips.innerHTML += `
    <article class="trip-display">
      <img class="trip-image" src="${destination.image} alt="${destination.alt}">
      <p class="trip-text" >${destination.destination}<p/>
      <p class="trip-text" >${trip.date}<p/>
    <article />`
  })
  user.pendingTrips(userTrips).forEach(trip => {
    const destination = destinations.findByQuery('id', trip.destinationID)
    console.log(destination)

    pendingTrips.innerHTML += `
    <article class="trip-display">
      <img class="trip-image" src="${destination.image} alt="${destination.alt}">
      <p class="trip-text" >${destination.destination}<p/>
      <p class="trip-text" >${trip.date}<p/>
    <article />`
  })

  // userTrips.forEach(trip => {
  //   const destination = destinations.findByQuery('id', trip.destinationID)
  //   console.log(destination)

  // })
}
