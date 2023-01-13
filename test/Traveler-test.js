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
    expect(traveler._id).to.equal(1);
  });

  it("Should have a name property", () => {
    expect(traveler._name).to.equal("Ham Leadbeater");
  });

  it("Should be able to return it's id", () => {
    expect(traveler.id).to.equal(1)
  });

  it("Should be able to return it's name", () => {
    expect(traveler.name).to.equal("Ham Leadbeater")
  });
});
