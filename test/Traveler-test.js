import { expect } from "chai";

import Traveler from "../src/Traveler";

import travelerData from "../src/data/traveler-data";

describe("Traveler", function () {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler({
      id: 1,
      userID: 35,
      destinationID: 25,
      travelers: 5,
      date: "2022/10/04",
      duration: 18,
      status: "approved",
      suggestedActivities: [],
    });
  });

  it("should return true", () => {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it("Should have an ID", () => {
    expect(traveler.id).to.equal(1);
  });
});
