class Destinations {
  constructor(data) {
    this.destinations = data
  }

  findByID(id) {
    return this.destinations.find(el => el.id === id)
  }
}

export default Destinations