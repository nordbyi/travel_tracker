import { expect } from "chai";
import Destinations from "../src/Destinations";
import { destinationsData } from "../src/data/destinationsData";

describe("Destination", function () {
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
    expect(destinations.findByID(5)).to.deep.equal({
      id: 5,
      destination: "Madrid, Spain",
      estimatedLodgingCostPerDay: 150,
      estimatedFlightCostPerPerson: 650,
      image:
        "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      alt: "city with clear skys and a road in the day time",
    });
  });

  it("Should return undefined if no destination found by ID", () => {
    expect(destinations.findByID(100)).to.be.undefined;
    expect(destinations.findByID(51)).to.be.undefined;
    expect(destinations.findByID('50')).to.be.undefined;
    expect(destinations.findByID(true)).to.be.undefined;
    expect(destinations.findByID(null)).to.be.undefined;
    expect(destinations.findByID(undefined)).to.be.undefined;
  });
});
