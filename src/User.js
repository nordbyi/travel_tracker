import * as dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

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

  calculateTripCost(trip, destination) {
    if(!trip || !destination) return 'Please include both a trip and destination'
    if(trip.destinationID !== destination.id) return "Trip.destinationID and destination.id Don\'t match"
    const flightCost = trip.travelers * destination.estimatedFlightCostPerPerson
    const lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay
    return +((flightCost + lodgingCost) * 1.1).toFixed()
  }

  calculateExpensesForYear(trips, currentDate, status, destinations) {
    return trips.reduce((expenses, trip) => {
      const dayObj = dayjs(currentDate)
      if(trip.status === status && dayjs(trip.date).isBetween(dayObj.startOf('year'), dayObj.endOf('year'))) {
        const tripDestination = destinations.findByQuery('id', trip.destinationID)
        return expenses + this.calculateTripCost(trip, tripDestination)
      }
      return expenses
    }, 0)
  }
}

export default User