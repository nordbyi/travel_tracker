import { expect } from "chai";
import Trips from "../src/Trips";
import { tripsData } from "../src/data/tripsData";
import { destinationsData } from "../src/data/destinationsData";

describe("Traveler", function () {
  let trips;

  beforeEach(() => {
    trips = new Trips(tripsData, destinationsData);
  });

  it("should be an instance of Trips", () => {
    expect(trips).to.be.an.instanceof(Trips);
  });
});
