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
    expect(destinations.findByQuery("id", 1)).to.deep.equal({
      id: 1,
      destination: "Lima, Peru",
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 400,
      image:
        "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      alt: "overview of city buildings with a clear sky",
    });
    expect(destinations.findByQuery("id", 5)).to.deep.equal({
      id: 5,
      destination: "Madrid, Spain",
      estimatedLodgingCostPerDay: 150,
      estimatedFlightCostPerPerson: 650,
      image:
        "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      alt: "city with clear skys and a road in the day time",
    });
  });

  it("Should be able to find a destination by destination name", () => {
    expect(
      destinations.findByQuery("destination", "Tokyo, Japan")
    ).to.deep.equal({
      id: 8,
      destination: "Tokyo, Japan",
      estimatedLodgingCostPerDay: 125,
      estimatedFlightCostPerPerson: 1000,
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
      alt: "city with people walking in crosswalk and brightly lit shops at night",
    });
    expect(
      destinations.findByQuery("destination", "Paris, France")
    ).to.deep.equal({
      id: 7,
      destination: "Paris, France",
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 395,
      image:
        "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      alt: "city during the day time with eiffel tower",
    });
  });

  it("Should return undefined if no destination has id", () => {
    expect(destinations.findByQuery("id", 100)).to.be.undefined;
    expect(destinations.findByQuery("id", 51)).to.be.undefined;
    expect(destinations.findByQuery("id", "50")).to.be.undefined;
    expect(destinations.findByQuery("id", true)).to.be.undefined;
    expect(destinations.findByQuery("id", null)).to.be.undefined;
    expect(destinations.findByQuery("id", undefined)).to.be.undefined;
    expect(destinations.findByQuery("id", "Tokyo, Japan")).to.be.undefined;
  });

  it("Should return undefined if no destination has destination name", () => {
    expect(destinations.findByQuery("destination", 100)).to.be.undefined;
    expect(destinations.findByQuery("destination", 51)).to.be.undefined;
    expect(destinations.findByQuery("destination", "50")).to.be.undefined;
    expect(destinations.findByQuery("destination", true)).to.be.undefined;
    expect(destinations.findByQuery("destination", null)).to.be.undefined;
    expect(destinations.findByQuery("destination", undefined)).to.be.undefined;
    expect(destinations.findByQuery("destination", "Washington DC, USA")).to.be
      .undefined;
  });

  it("Should be able find an array of destinations from an array of ids", () => {
    expect(destinations.filterByQuery("id", [2, 3, 4])).to.deep.equal([
      {
        id: 2,
        destination: "Stockholm, Sweden",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 780,
        image:
          "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "city with boats on the water during the day time",
      },
      {
        id: 3,
        destination: "Sydney, Austrailia",
        estimatedLodgingCostPerDay: 130,
        estimatedFlightCostPerPerson: 950,
        image:
          "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "opera house and city buildings on the water with boats",
      },
      {
        id: 4,
        destination: "Cartagena, Colombia",
        estimatedLodgingCostPerDay: 65,
        estimatedFlightCostPerPerson: 350,
        image:
          "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        alt: "boats at a dock during the day time",
      },
    ]);
  });

  it("Should be able find an array of destinations from an array of destination names", () => {
    expect(destinations.filterByQuery("destination", [ "Cartagena, Colombia", "Stockholm, Sweden", "Sydney, Austrailia"])).to.deep.equal([
      {
        id: 2,
        destination: "Stockholm, Sweden",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 780,
        image:
          "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "city with boats on the water during the day time",
      },
      {
        id: 3,
        destination: "Sydney, Austrailia",
        estimatedLodgingCostPerDay: 130,
        estimatedFlightCostPerPerson: 950,
        image:
          "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "opera house and city buildings on the water with boats",
      },
      {
        id: 4,
        destination: "Cartagena, Colombia",
        estimatedLodgingCostPerDay: 65,
        estimatedFlightCostPerPerson: 350,
        image:
          "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        alt: "boats at a dock during the day time",
      },
    ]);
  });

  it("Should return an empty array if no destinations match ids", () => {
    expect(destinations.filterByQuery("id", [20, 30, 40, 0])).to.deep.equal([])
  })

  it("Should return an empty array if no destinations match destination names", () => {
    expect(destinations.filterByQuery("id", ["Washington DC, USA", "Mexico City, Mexico", "Toronto, Canada"])).to.deep.equal([])
  })
});
