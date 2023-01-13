class User {
  constructor(user) {
    this._id = user.id
    this._name = user.name
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }
}

export default User