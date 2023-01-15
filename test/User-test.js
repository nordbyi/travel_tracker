import { expect } from "chai";

import User from "../src/User";
import Destinations from "../src/Destinations";
import { destinationsData } from "../src/data/destinationsData";
import Trips from "../src/Trips";
import { tripsData } from "../src/data/tripsData";

describe("Traveler", function () {
  let user;
  let destinations;
  let trips;
  let currentDate;

  beforeEach(() => {
    user = new User({
      id: 1,
      name: "Ham Leadbeater",
    });
    destinations = new Destinations(destinationsData);
    trips = new Trips(tripsData);
    currentDate = "2022/01/14";
  });

  it("should be an instance of User", () => {
    expect(user).to.be.an.instanceof(User);
  });

  it("Should have an ID property", () => {
    expect(user._id).to.equal(1);
  });

  it("Should have a name property", () => {
    expect(user._name).to.equal("Ham Leadbeater");
  });

  it("Should be able to return it's id", () => {
    expect(user.id).to.equal(1);
  });

  it("Should be able to return it's name", () => {
    expect(user.name).to.equal("Ham Leadbeater");
  });

  it("Should return it's past trips", () => {
    expect(
      user.pastTrips(trips.filterByQuery("userID", 1), currentDate)
    ).to.deep.equal([
      {
        id: 2,
        userID: 1,
        destinationID: 22,
        travelers: 4,
        date: "2021/05/22",
        duration: 17,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });

  it("Should return an empty array if no past trips exist", () => {
    expect(
      user.pastTrips(trips.filterByQuery("userID", 1), "2000/01/01")
    ).to.deep.equal([]);
  });

  it("Should return it's pending trips", () => {
    expect(user.pendingTrips(trips.filterByQuery("userID", 1))).to.deep.equal([
      {
        id: 14,
        userID: 1,
        destinationID: 35,
        travelers: 1,
        date: "2023/09/24",
        duration: 10,
        status: "pending",
        suggestedActivities: [],
      },
    ]);
  });

  it("Should return an empty array if no pending trips exist", () => {
    expect(
      user.pendingTrips(trips.filterByQuery("userID", 2), "2000/01/01")
    ).to.deep.equal([]);
  });

  it("Should return it's upcoming, approved trips", () => {
    expect(
      user.upcomingTrips(trips.filterByQuery("userID", 1), currentDate)
    ).to.deep.equal([
      {
        id: 11,
        userID: 1,
        destinationID: 5,
        travelers: 4,
        date: "2022/10/14",
        duration: 4,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });

  it("Should return an empty array if no upcoming, approved trips exist", () => {
    expect(
      user.upcomingTrips(trips.filterByQuery("userID", 42), currentDate)
    ).to.deep.equal([]);
  });

  it("Should be able to calulate the cost of a trip", () => {
    expect(user.calculateTripCost(tripsData[5], destinations.findByQuery('id', tripsData[5].destinationID))).to.equal(3520)
    expect(user.calculateTripCost(tripsData[9], destinations.findByQuery('id', tripsData[9].destinationID))).to.equal(3586)
  })

  it("Should return a message if no trip or destination given", () => {
    expect(user.calculateTripCost(tripsData[5])).to.equal('Please include both a trip and destination')
    expect(user.calculateTripCost(destinations.findByQuery('id', tripsData[9].destinationID))).to.equal('Please include both a trip and destination')
  })

  it("Should return message if trip.destinationID and destination.id don't match", () => {
    expect(user.calculateTripCost(tripsData[9], destinations.findByQuery('id', 6))).to.equal("Trip.destinationID and destination.Id Don\'t match")
    expect(user.calculateTripCost(tripsData[2], destinations.findByQuery('id', 7))).to.equal("Trip.destinationID and destination.Id Don\'t match")
  })

  it("Should be able to calculate it's non-pending travel expeneses for THIS year (plus 10% agent fees)", () => {
    expect(user.calculateExpensesForYear(trips.filterByQuery("userID", 1), currentDate, 'approved')).to.equal(1)
  })
});
