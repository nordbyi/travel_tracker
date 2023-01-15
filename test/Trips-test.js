import { expect } from "chai";
import Trips from "../src/Trips";
import { tripsData } from "../src/data/tripsData";

describe("Trips", function () {
  let trips;

  beforeEach(() => {
    trips = new Trips(tripsData);
  });

  it("should be an instance of Trips", () => {
    expect(trips).to.be.an.instanceof(Trips);
  });

  it("should have an array of trips", () => {
    expect(trips.trips).to.deep.equal(tripsData);
  });

  it("Should be able to find a trip by a trip by ID", () => {
    expect(trips.findTripByID(16)).to.deep.equal({
      id: 16,
      userID: 19,
      destinationID: 27,
      travelers: 1,
      date: "2022/11/20",
      duration: 9,
      status: "approved",
      suggestedActivities: [],
    });
    expect(trips.findTripByID(5)).to.deep.equal({
      id: 5,
      userID: 42,
      destinationID: 29,
      travelers: 3,
      date: "2021/04/30",
      duration: 18,
      status: "approved",
      suggestedActivities: [],
    });
  });

  it("Should return undefined if no id found", () => {
    expect(trips.findTripByID(3)).to.be.undefined;
    expect(trips.findTripByID(50)).to.be.undefined;
    expect(trips.findTripByID("1")).to.be.undefined;
    expect(trips.findTripByID(null)).to.be.undefined;
    expect(trips.findTripByID(undefined)).to.be.undefined;
    expect(trips.findTripByID(true)).to.be.undefined;
    expect(trips.findTripByID(false)).to.be.undefined;
    expect(trips.findTripByID([])).to.be.undefined;
  });

  it("Should be able to find all trips for a user ID", () => {
    expect(trips.filterByQuery("userID", 50)).to.deep.equal([
      {
        id: 11,
        userID: 50,
        destinationID: 5,
        travelers: 4,
        date: "2022/10/14",
        duration: 4,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 15,
        userID: 50,
        destinationID: 13,
        travelers: 3,
        date: "2022/07/04",
        duration: 6,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });
});
