import * as dayjs from "dayjs";

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

  pastTrips(trips, date) {
    return trips.filter(trip => dayjs(trip.date).isBefore(dayjs(date)))
  }

  pendingTrips(trips) {
    return trips.filter(trip => trip.status === 'pending')
  }

  upcomingTrips(trips, date) {
    return trips.filter(trip => dayjs(trip.date).isAfter(dayjs(date)) && trip.status === 'approved')
  }
}

export default User