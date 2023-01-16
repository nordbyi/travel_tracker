class Trips {
  constructor(data) {
    this.trips = data
  }

  findTripByID(id) {
    return this.trips.find(trip => trip.id === id)
  }

  filterByQuery(query, comparison) {
    return  this.trips.filter(trip => trip[query] === comparison)
  }
}

export default Trips