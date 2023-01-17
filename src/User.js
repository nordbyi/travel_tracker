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
    return trips.filter(trip => dayjs(trip.date).isAfter(dayjs(date).subtract(1, 'day')) && trip.status === 'approved')
  }

  calculateTripCost(trip, destination) {
    if(!trip || !destination) return 'Please include both a trip and destination'
    if(trip.destinationID !== destination.id) return "Trip.destinationID and destination.id Don\'t match"
    const flightCost = trip.travelers * destination.estimatedFlightCostPerPerson
    const lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay
    return +((flightCost + lodgingCost) * 1.1).toFixed()
  }

  calculateExpensesForYear(trips, currentDate, destinations) {
    if(!trips || !currentDate || !destinations) return 'Please include trips array, currentDate, and destination class instance'
    return trips.reduce((expenses, trip) => {
      const dayObj = dayjs(currentDate)
      if(!dayjs(trip.date).isBetween(dayObj.startOf('year'), dayObj.endOf('year'))) {
        return expenses
      }
      const currentCost = expenses[trip.status]
      const tripDestination = destinations.findByQuery('id', trip.destinationID)
      return {
        ...expenses,
        [trip.status]: currentCost + this.calculateTripCost(trip, tripDestination)
      }
    }, {approved: 0, pending: 0})
  }
}

export default User