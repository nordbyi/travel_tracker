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
  });
});
