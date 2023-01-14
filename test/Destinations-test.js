import { expect } from "chai";
import Destinations from "../src/Destinations";
import { destinationsData } from "../src/data/destinationsData";

describe("Traveler", function () {
  let destinations;

  beforeEach(() => {
    destinations = new Destinations(destinationsData);
  });

  it("should be an instance of Destinations", () => {
    expect(destinations).to.be.an.instanceof(Destinations);
  });

  it("should have an array of trips", () => {
    expect(destinations.destinations).to.deep.equal(destinationsData);
  });

  it("Should be able to find a destination by ID", () => {
    expect(destinations.findByID(1)).to.deep.equal({
      id: 1,
      destination: "Lima, Peru",
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 400,
      image:
        "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      alt: "overview of city buildings with a clear sky",
    });
  });
});
