import { expect } from "chai";

import User from "../src/User";
import Destinations from "../src/Destinations";
import { destinationsData } from "../src/data/destinationsData";
import Trips from "../src/Trips";
import { tripsData } from "../src/data/tripsData";

describe("Traveler", function () {
  let user;
  let destinations;
  let trips;
  let currentDate

  beforeEach(() => {
    user = new User({
      id: 1,
      name: "Ham Leadbeater",
    });
    destinations = new Destinations(destinationsData);
    trips = new Trips(tripsData);
    currentDate = "2022/01/14"
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

  it("Should return it's trips by status and time", () => {
    expect(user.tripsByStatus(currentDate)).to.deep.equal({
      past: [
        {
          id: 2,
          userID: 1,
          destinationID: 22,
          travelers: 4,
          date: "2021/05/22",
          duration: 17,
          status: "approved",
          suggestedActivities: [],
        },
      ],
      upcomming: [
        {
          id: 11,
          userID: 1,
          destinationID: 5,
          travelers: 4,
          date: "2022/10/14",
          duration: 4,
          status: "approved",
          suggestedActivities: [],
        },
      ],
      pending: [
        {
          id: 14,
          userID: 1,
          destinationID: 35,
          travelers: 1,
          date: "2023/09/24",
          duration: 10,
          status: "pending",
          suggestedActivities: [],
        },
      ],
    });
  });
});
