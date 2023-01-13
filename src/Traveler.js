class Traveler {
  constructor(traveler) {
    this._id = traveler.id
    this._name = traveler.name
  }

  get name() {
    return this._name
  }
}

export default Traveler