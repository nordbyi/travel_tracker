import { expect } from "chai";
import Destinations from "../src/Destinations";
import { destinationsData } from "../src/data/destinationsData";

describe("Traveler", function () {
  let destinations;

  beforeEach(() => {
    destinations = new Trips(destinationsData);
  });

  it("should be an instance of Destinations", () => {
    expect(destinations).to.be.an.instanceof(Destinations);
  });

  it("should have an array of trips", () => {
    expect(destinations.destinations).to.deep.equal(destinationsData);
  });
});
