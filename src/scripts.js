import { fetchAll } from "./apiCalls";

const selectInput = document.querySelector('#destinationsInput')

fetchAll().then(data => {
  console.log(data[2].destinations)
  onLoadData(data)
})

function onLoadData(data) {
  updateSelectOptions(data[2].destinations)
}

function updateSelectOptions(destinations) {
  selectInput.innerHTML = ''
  destinations.sort((a, b) => a.destination.localeCompare(b.destination)).forEach(destination => {
    console.log(destination)
    selectInput.innerHTML += `<option value=${destination.destination}>${destination.destination}</option>`
  });
}