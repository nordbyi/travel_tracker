import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./css/styles.css";
import { fetchAll, postData } from "./apiCalls";
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

const destinationInput = document.querySelector("#destinationsInput");
const tripStartInput = document.querySelector("#tripStartInput");
const tripEndInput = document.querySelector("#tripEndInput");
const numTravelersInput = document.querySelector("#numTravelersInput");
const previewTripButton = document.querySelector("#previewTrip");
const formErrorContainer = document.querySelector('#formError')

tripStartCalendar.addEventListener("change", updateEndCalendar);
previewTripButton.addEventListener("click", previewTrip);

let currentDate = dayjs().format("YYYY/MM/DD");
let travelers; // need this?
let trips;
let destinations;
let user;
let userTrips;

// change fetch all argument to login page traveler id
fetchAll(2).then((data) => {
  console.log(data);
  onLoadData(data);
  renderDOM();
});

function onLoadData(data) {
  travelers = data[0].travelers; // need this?
  trips = new Trips(data[1].trips);
  destinations = new Destinations(
    data[2].destinations.sort((a, b) =>
      a.destination.localeCompare(b.destination)
    )
  );
  user = new User(data[3]);
  console.log(user);
  userTrips = trips.filterByQuery("userID", user.id);
}

function renderDOM() {
  updateSelectOptions(destinations);
  updateStartCalendar();
  updateEndCalendar();
  insertSlides(destinations.destinations);
  swiper();
  displayTotalExpenses();
  displayUserTrips();
}

function updateSelectOptions(destinations) {
  selectInput.innerHTML = "";
  destinations.destinations.forEach((destination) => {
    selectInput.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`;
  });
}

function updateStartCalendar(reset) {
  console.log("update start calendar");
  const calendarDate = dayjs(currentDate).format("YYYY-MM-DD");
  if (!tripStartCalendar.value || reset) {
    tripStartCalendar.setAttribute("min", calendarDate);
    tripStartCalendar.value = calendarDate;
  }
}

function updateEndCalendar(reset) {
  if (
    !tripEndCalendar.value ||
    dayjs(tripStartCalendar.value).isAfter(dayjs(tripEndCalendar.value)) ||
    reset
  ) {
    console.log("set end");
    tripEndCalendar.value = tripStartCalendar.value;
    tripEndCalendar.setAttribute("min", tripStartCalendar.value);
  } else {
    console.log("not here on update");
    tripEndCalendar.setAttribute("min", tripStartCalendar.value);
  }
}

function displayTotalExpenses() {
  const totals = user.calculateExpensesForYear(
    userTrips,
    currentDate,
    destinations
  );
  totalExpenses.innerText = `This Year's Expenditures: Approved: $${totals.approved} Pending: $${totals.pending}`;
}

function displayUserTrips() {
  pastTrips.innerHTML = "";
  upcomingTrips.innerHTML = "";
  pendingTrips.innerHTML = "";
  user.pastTrips(userTrips, currentDate).forEach((trip) => {
    const destination = destinations.findByQuery("id", trip.destinationID);
    // console.log(destination)

    pastTrips.innerHTML += `
    <article class="trip-display">
      <img class="trip-image" src="${destination.image} alt="${destination.alt}">
      <p class="trip-text" >${destination.destination}<p/>
      <p class="trip-text" >${trip.date}<p/>
    <article />`;
  });
  user.upcomingTrips(userTrips, currentDate).forEach((trip) => {
    const destination = destinations.findByQuery("id", trip.destinationID);
    // console.log(destination)

    upcomingTrips.innerHTML += `
    <article class="trip-display">
      <img class="trip-image" src="${destination.image} alt="${destination.alt}">
      <p class="trip-text" >${destination.destination}<p/>
      <p class="trip-text" >${trip.date}<p/>
    <article />`;
  });
  user.pendingTrips(userTrips).forEach((trip) => {
    const destination = destinations.findByQuery("id", trip.destinationID);
    // console.log(destination)

    pendingTrips.innerHTML += `
    <article class="trip-display">
      <img class="trip-image" src="${destination.image} alt="${destination.alt}">
      <p class="trip-text" >${destination.destination}<p/>
      <p class="trip-text" >${trip.date}<p/>
    <article />`;
  });

  // userTrips.forEach(trip => {
  //   const destination = destinations.findByQuery('id', trip.destinationID)
  //   console.log(destination)

  // })
}

function previewTrip() {
  event.preventDefault();
  //validate form
  const destination = destinations.findByQuery(
    "destination",
    destinationInput.value
  );
  const startDate = dayjs(tripStartInput.value);
  console.log(destination);
  console.log(startDate.format("YYYY/MM/DD"));
  console.log(Math.abs(startDate.diff(dayjs(tripEndCalendar.value), "day")));
  console.log(numTravelersInput.value);

  const postObject = {
    id: trips.trips.length + 1,
    userID: user.id,
    destinationID: destination.id,
    travelers: +numTravelersInput.value,
    date: startDate.format("YYYY/MM/DD"),
    duration: Math.abs(dayjs(tripEndCalendar.value).diff(startDate, "day")),
    status: "pending",
    suggestedActivities: [],
  };

  console.log(postObject);
  postData(postObject).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }
    // change fetch all argument to login page traveler id
    fetchAll(2).then((data) => {
      console.log(data);
      onLoadData(data);
      renderDOM();
      clearInputs();
    });
    console.log(res);
  });
}

function clearInputs() {
  console.log("clear inputs");
  numTravelersInput.value = "";
  updateStartCalendar(true);
  updateEndCalendar(true);
}
function validateForm() {
  formErrorContainer.innerText = ''
  [startDate, endDate, destination, numTravelers, duration] = accessFormInputs()
}

function accessFormInputs() {
  const startDate = dayjs(tripStartInput.value);
  const endDate = dayjs(tripEndInput.value);
  const destination = destinations.findByQuery(
    "destination",
    destinationInput.value
  )
  const numTravelers = numTravelersInput.value
  const duration = Math.abs(dayjs(tripEndCalendar.value).diff(startDate, "day"))
  return [startDate, endDate, destination, numTravelers, duration]
}

function displayFormError(message) {
  formErrorContainer.innerText = message
}