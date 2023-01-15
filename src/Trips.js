class Trips {
  constructor(data) {
    this.trips = data
  }

  findTripByID(id) {
    return this.trips.find(trip => trip.id === id)
  }
}

export default Trips