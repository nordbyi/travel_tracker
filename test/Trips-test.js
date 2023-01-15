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
});
