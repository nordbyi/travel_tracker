class Traveler {
  constructor(traveler) {
    this._id = traveler.id
    this._name = traveler.name
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }
}

export default Traveler