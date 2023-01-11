import { expect } from "chai";

import Traveler from "../src/Traveler";

import travelerData from "../src/data/traveler-data";

describe("Traveler", function () {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler({
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer",
    });
  });

  it("should return true", () => {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it("Should have an ID property", () => {
    expect(traveler.id).to.equal(1);
  });

  it("Should have a name property", () => {
    expect(traveler.name).to.equal("Ham Leadbeater");
  });

  it("Should have a travelerType property", () => {
    expect(traveler.travelerType).to.equal("relaxer");
  });
});
