import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./css/styles.css";
import { fetchAll, postData } from "./apiCalls";
import * as dayjs from "dayjs";
import { swiper, insertSlides} from "./swiper";
import MicroModal from 'micromodal'
import User from "./User";
import Destinations from "./Destinations";
import Trips from "./Trips";

const usernameContainer = document.querySelector("#username")
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

const formErrorContainer = document.querySelector("#formError");
const fetchErrorContainer = document.querySelector("#fetchError");
const loginErrorContainer = document.querySelector("#loginError")

const modalContent = document.querySelector("#bookTrip-content")
const modalBookButton = document.querySelector("#bookTripButton")
const modalTitle = document.querySelector("#BookTripTitle")

const mainSwiper = document.querySelector("#swiperContainer")

const usernameInput = document.querySelector('#usernameLogin')
const passwordInput = document.querySelector('#password')
const loginButton = document.querySelector('#loginButton')

const loginSection = document.querySelector("#login")
const navSection = document.querySelector("#nav")
const mainSection = document.querySelector("#main")


tripStartCalendar.addEventListener("change", updateEndCalendar);
previewTripButton.addEventListener("click", function() {
  event.preventDefault()
  if (!validateForm()) return;
  modalContent.innerHTML = previewTrip()
  MicroModal.show('BookTrip');
});
modalBookButton.addEventListener('click', function(event) {
  bookTrip()
  MicroModal.close()
})
loginButton.addEventListener('click', function() {
  event.preventDefault()
  login()
  
})

let currentDate = dayjs().format("YYYY/MM/DD");
let trips;
let destinations;
let user;
let userTrips;

function onLoadData(data) {
  trips = new Trips(data[1].trips.map(trip => {
    return {
      ...trip,
      date: dayjs(trip.date).format('YYYY/MM/DD')
    }
  }));
  destinations = new Destinations(
    data[2].destinations.sort((a, b) =>
      a.destination.localeCompare(b.destination)
    )
  );
  user = new User(data[3]);
  userTrips = trips.filterByQuery("userID", user.id);
}

function renderDOM() {
  updateSelectOptions(destinations);
  updateStartCalendar();
  updateEndCalendar();
  insertSlides(destinations.destinations, mainSwiper, 'swiper-slide');
  swiper('.swiper');
  displayTotalExpenses();
  displayUserTrips();
  usernameContainer.innerText = `Welcome ${user.name}`
}

function updateSelectOptions(destinations) {
  selectInput.innerHTML = "";
  destinations.destinations.forEach((destination) => {
    selectInput.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`;
  });
}

function updateStartCalendar(reset) {
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
    reset === true
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
  );
  totalExpenses.innerText = `Year's Expenses: $${(totals.approved + totals.pending).toLocaleString()}`;
}

function displayUserTrips() {
  pastTrips.innerHTML = "";
  upcomingTrips.innerHTML = "";
  pendingTrips.innerHTML = "";
  user.pastTrips(userTrips, currentDate).forEach((trip) => {
    const destination = destinations.findByQuery("id", trip.destinationID);
    pastTrips.innerHTML += createTripCard(trip, destination);
  });
  user.upcomingTrips(userTrips, currentDate).forEach((trip) => {
    const destination = destinations.findByQuery("id", trip.destinationID);
    upcomingTrips.innerHTML += createTripCard(trip, destination);
  });
  user.pendingTrips(userTrips).forEach((trip) => {
    const destination = destinations.findByQuery("id", trip.destinationID);
    pendingTrips.innerHTML += createTripCard(trip, destination)
  });
}

function bookTrip() {
  const [startDate, endDate, destination, numTravelers, duration] =
    accessFormInputs();
  const postObject = {
    id: trips.trips.length + 1,
    userID: user.id,
    destinationID: destination.id,
    travelers: +numTravelers,
    date: startDate.format("YYYY/MM/DD"),
    duration: duration,
    status: "approved",
    suggestedActivities: [],
  };

  postData(postObject)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      fetchAll(user.id).then((data) => {
        onLoadData(data);
        renderDOM();
        clearInputs();
      }).catch(error => displayError(fetchErrorContainer, error.message));
    })
    .catch((error) => displayError(fetchErrorContainer, error));
}

function clearInputs() {
  numTravelersInput.value = "";
  updateStartCalendar(true);
  updateEndCalendar(true);
}

function validateForm() {
  formErrorContainer.innerText = "";
  const [startDate, endDate, destination, numTravelers, duration] =
    accessFormInputs();
  if (startDate.format('YYYY/MM/DD') === "Invalid Date") {
    displayError(formErrorContainer, "Invalid Start Date Entered");
    return false;
  }

  if(endDate.format('YYYY/MM/DD') === "Invalid Date"){
    displayError(formErrorContainer, "Invalid End Date Entered");
    return false;
  }

  if (!startDate || !endDate || !destination || !numTravelers) {
    displayError(formErrorContainer, "Please complete all inputs");
    return false;
  }

  if (startDate.isBefore(dayjs(), "day")) {
    displayError(formErrorContainer, "Start Date Cannot Be In The Past");
    return false;
  }

  if (startDate.isAfter(endDate)) {
    displayError(formErrorContainer, "End Date Must Be After Start Date");
    return false;
  }

  if (duration < 1) {
    displayError(formErrorContainer, "Trip Must Be At Least 1 Day Long");
    return false;
  }

  if (+numTravelers < 0) {
    displayError(formErrorContainer, "Number Of Travelers Cannot Be A Negative Number");
    return false;
  }

  return true;
}

function accessFormInputs() {
  const startDate = dayjs(tripStartInput.value);
  const endDate = dayjs(tripEndInput.value);
  const destination = destinations.findByQuery(
    "destination",
    destinationInput.value
  );
  const numTravelers = numTravelersInput.value;
  const duration = Math.abs(
    dayjs(tripEndCalendar.value).diff(startDate, "day")
  );
  return [startDate, endDate, destination, numTravelers, duration];
}

function displayError(container, message) {
  container.innerText = message;
}

function createTripCard(trip, destination) {
  return `
    <article class="trip-display">
      <img class="trip-image" src="${destination.image}" alt="${destination.alt}">
      <div class="trip-info-box">
        <p class="trip-text" >${destination.destination}<p/>
        <p class="trip-start" >${trip.date}<p/>
        <p class="trip-duration" >${trip.duration} Days<p/>
        <p class="trip-cost" >$${user.calculateTripCost(trip, destination).toLocaleString()}<p/>
      <div />
    <article />`;
}

function previewTrip() {
  const [startDate, endDate, destination, numTravelers, duration] =
    accessFormInputs();
  const trip = {
    date: startDate.format('YYYY/MM/DD'),
    travelers: numTravelers,
    duration: duration,
    destinationID: destination.id
  }
  modalTitle.innerText = `You're Off To ${destination.destination}!`
  return `
  <article class="preview-trip">
    <img class="preview-image" src="${destination.image}" alt="${destination.alt}">
    <div>
      <p class="trip-text" >Destination: ${destination.destination}<p/>
      <p class="trip-start" >Leave Date: ${trip.date}<p/>
      <p class="trip-duration" >Duration: ${trip.duration} Days<p/>
      <p class="trip-cost" >Cost: $${user.calculateTripCost(trip, destination).toLocaleString()}<p/>
      <div/>
  <article />`
}

function login() {
  const userID = validateLogin()
  if(!userID) return
  loginSection.classList.add('hidden')
  navSection.classList.remove('hidden')
  mainSection.classList.remove('hidden')
  fetchAll(userID).then((data) => {
    onLoadData(data);
    renderDOM();
  }).catch(error => displayError(fetchErrorContainer, error.message));
}

function validateLogin() {
  const username = usernameInput.value
  const password = passwordInput.value
  if(username.substring(0, 8) !== 'traveler' || +username.substring(8) < 1 || +username.substring(8) > 50) {
    displayError(loginErrorContainer, 'Incorrect UserName')
    return false
  }
  if(password !== 'travel') {
    displayError(loginErrorContainer, 'Incorrect Password')
    return false
  }

  return +username.substring(8)
}


