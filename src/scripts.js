import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./css/styles.css";
import { fetchAll, postData } from "./apiCalls";
import * as dayjs from "dayjs";
import { swiper, insertSlides, userSwiper } from "./swiper";
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

const modalContent = document.querySelector("#bookTrip-content")
const modalBookButton = document.querySelector("#bookTripButton")
const modalTitle = document.querySelector("#BookTripTitle")

const mainSwiper = document.querySelector("#swiperContainer")

const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const loginButton = documnet.querySelector('#loginButton')


tripStartCalendar.addEventListener("change", updateEndCalendar);
previewTripButton.addEventListener("click", function() {
  event.preventDefault()
  if (!validateForm()) return;
  modalContent.innerHTML = previewTrip()
  MicroModal.show('BookTrip');
});
modalBookButton.addEventListener('click', function() {
  bookTrip()
  MicroModal.close()
})
loginButton.addEventListener('click', login)

let currentDate = dayjs().format("YYYY/MM/DD");
let travelers; // need this?
let trips;
let destinations;
let user;
let userTrips;


// change fetch all argument to login page traveler id
// change fetchall parameter in post as well
fetchAll(7).then((data) => {
  console.log(data);
  onLoadData(data);
  renderDOM();
}).catch(error => displayFetchError(error.message));

function onLoadData(data) {
  travelers = data[0].travelers; // need this?
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
  // insertSlides(destinations.filterByQuery('id', userTrips.map(el => el.destinationID)), pastSwiper, 'swiper-slide');
  // userSwiper('.past-swiper')
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
    // console.log(destination)

    pastTrips.innerHTML += createTripCard(trip, destination);
  });
  user.upcomingTrips(userTrips, currentDate).forEach((trip) => {
    const destination = destinations.findByQuery("id", trip.destinationID);
    // console.log(destination)

    upcomingTrips.innerHTML += createTripCard(trip, destination);
  });
  user.pendingTrips(userTrips).forEach((trip) => {
    const destination = destinations.findByQuery("id", trip.destinationID);
    // console.log(destination)

    pendingTrips.innerHTML += createTripCard(trip, destination)
  });

  // userTrips.forEach(trip => {
  //   const destination = destinations.findByQuery('id', trip.destinationID)
  //   console.log(destination)

  // })
}

function bookTrip() {
  const [startDate, endDate, destination, numTravelers, duration] =
    accessFormInputs();
  // console.log(destination);
  // console.log(startDate.format("YYYY/MM/DD"));
  // console.log(Math.abs(startDate.diff(dayjs(endDate), "day")));
  // console.log(numTravelers);

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

  console.log(postObject);
  postData(postObject)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      // change fetch all argument to login page traveler id
      fetchAll(7).then((data) => {
        console.log(data);
        onLoadData(data);
        renderDOM();
        clearInputs();
      }).catch(error => displayFetchError(error.message));
      console.log(res);
    })
    .catch((error) => displayFetchError(error));
}

function clearInputs() {
  // console.log("clear inputs");
  numTravelersInput.value = "";
  updateStartCalendar(true);
  updateEndCalendar(true);
}

function validateForm() {
  formErrorContainer.innerText = "";
  const [startDate, endDate, destination, numTravelers, duration] =
    accessFormInputs();
    console.log(destination)

  if (startDate.format('YYYY/MM/DD') === "Invalid Date") {
    displayFormError("Invalid Start Date Entered");
    return false;
  }

  if(endDate.format('YYYY/MM/DD') === "Invalid Date"){
    displayFormError("Invalid End Date Entered");
    return false;
  }

  if (!startDate || !endDate || !destination || !numTravelers) {
    displayFormError("Please complete all inputs");
    return false;
  }

  if (startDate.isBefore(dayjs(), "day")) {
    displayFormError("Start Date Cannot Be In The Past");
    return false;
  }

  if (startDate.isAfter(endDate)) {
    displayFormError("End Date Must Be After Start Date");
    return false;
  }

  if (duration < 1) {
    displayFormError("Trip Must Be At Least 1 Day Long");
    return false;
  }

  if (+numTravelers < 0) {
    displayFormError("Number Of Travelers Cannot Be A Negative Number");
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

function displayFormError(message) {
  formErrorContainer.innerText = message;
}

function displayFetchError(message) {
  fetchErrorContainer.innerText = message;
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




