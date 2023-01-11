import { fetchAll } from "./apiCalls";

const selectInput = document.querySelector('#destinationsInput')

fetchAll().then(data => {
  onLoadData()
})

function onLoadData() {
  updateSelectOptions()
}