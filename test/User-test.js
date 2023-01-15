import { expect } from "chai";

import User from "../src/User";
import Destinations from '../src/Destinations'
import { destinationsData } from "../src/data/destinationsData";
import Trips from '../src/Trips'
import { tripsData } from "../src/data/tripsData"

describe("Traveler", function () {
  let user;
  let destinations
  let trips

  beforeEach(() => {
    user = new User({
      id: 1,
      name: "Ham Leadbeater",
    });
    destinations = new Destinations(destinationsData)
    trips = new Trips(tripsData)
  });

  it("should be an instance of User", () => {
    expect(user).to.be.an.instanceof(User);
  });

  it("Should have an ID property", () => {
    expect(user._id).to.equal(1);
  });

  it("Should have a name property", () => {
    expect(user._name).to.equal("Ham Leadbeater");
  });

  it("Should be able to return it's id", () => {
    expect(user.id).to.equal(1);
  });

  it("Should be able to return it's name", () => {
    expect(user.name).to.equal("Ham Leadbeater");
  });

  it("Should return it's trips by status", () => {
    expect(user.tripsByStatus()).to.deep.equal({})
  })
});
