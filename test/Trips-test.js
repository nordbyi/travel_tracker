import { expect } from "chai";
import Trips from "../src/Trips";
import { tripsData } from "../src/data/tripsData";

describe("Trips", function () {
  let trips;

  beforeEach(() => {
    trips = new Trips(tripsData);
  });

  it("should be an instance of Trips", () => {
    expect(trips).to.be.an.instanceof(Trips);
  });

  it("should have an array of trips", () => {
    expect(trips.trips).to.deep.equal(tripsData);
  });

  it("Should be able to find a trip by a trip by ID", () => {
    expect(trips.findTripByID(16)).to.deep.equal({
      id: 16,
      userID: 19,
      destinationID: 27,
      travelers: 1,
      date: "2022/11/20",
      duration: 9,
      status: "approved",
      suggestedActivities: [],
    });
    expect(trips.findTripByID(5)).to.deep.equal({
      id: 5,
      userID: 42,
      destinationID: 29,
      travelers: 3,
      date: "2021/04/30",
      duration: 18,
      status: "pending",
      suggestedActivities: [],
    });
  });

  it("Should return undefined if no id found", () => {
    expect(trips.findTripByID(3)).to.be.undefined;
    expect(trips.findTripByID(50)).to.be.undefined;
    expect(trips.findTripByID("1")).to.be.undefined;
    expect(trips.findTripByID(null)).to.be.undefined;
    expect(trips.findTripByID(undefined)).to.be.undefined;
    expect(trips.findTripByID(true)).to.be.undefined;
    expect(trips.findTripByID(false)).to.be.undefined;
    expect(trips.findTripByID([])).to.be.undefined;
  });

  it("Should be able to find all trips for a user ID", () => {
    expect(trips.filterByQuery("userID", 50)).to.deep.equal([
      {
        id: 15,
        userID: 50,
        destinationID: 13,
        travelers: 3,
        date: "2022/07/04",
        duration: 6,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
    expect(trips.filterByQuery("userID", 18)).to.deep.equal([
      {
        id: 18,
        userID: 18,
        destinationID: 2,
        travelers: 2,
        date: "2022/09/25",
        duration: 17,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });

  it("Should return an empty array if no trips match ID", () => {
    expect(trips.filterByQuery("userID", 100)).to.deep.equal([]);
    expect(trips.filterByQuery("userID", "50")).to.deep.equal([]);
    expect(trips.filterByQuery("userID", "18")).to.deep.equal([]);
    expect(trips.filterByQuery("userID", null)).to.deep.equal([]);
    expect(trips.filterByQuery("userID", undefined)).to.deep.equal([]);
    expect(trips.filterByQuery("userID", false)).to.deep.equal([]);
  });

  it("Should be able to find all trips for a destinationID", () => {
    expect(trips.filterByQuery("destinationID", 50)).to.deep.equal([
      {
        id: 10,
        userID: 9,
        destinationID: 50,
        travelers: 6,
        date: "2022/07/23",
        duration: 17,
        status: "approved",
        suggestedActivities: [],
      },
    ]);

    expect(trips.filterByQuery("destinationID", 35)).to.deep.equal([
      {
        id: 6,
        userID: 29,
        destinationID: 35,
        travelers: 3,
        date: "2023/06/29",
        duration: 9,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 14,
        userID: 1 ,
        destinationID: 35,
        travelers: 1,
        date: "2023/09/24",
        duration: 10,
        status: "pending",
        suggestedActivities: [],
      },
    ]);
  });

  it("Should return an empty array if no trips match ID", () => {
    expect(trips.filterByQuery("destinationID", 100)).to.deep.equal([]);
    expect(trips.filterByQuery("destinationID", "35")).to.deep.equal([]);
    expect(trips.filterByQuery("destinationID", "18")).to.deep.equal([]);
    expect(trips.filterByQuery("destinationID", null)).to.deep.equal([]);
    expect(trips.filterByQuery("destinationID", undefined)).to.deep.equal([]);
    expect(trips.filterByQuery("destinationID", false)).to.deep.equal([]);
  });

  it("Should be able to find all trips of a certain status", () => {
    expect(trips.filterByQuery("status", "pending")).to.deep.equal([
      {
        id: 5,
        userID: 42,
        destinationID: 29,
        travelers: 3,
        date: "2021/04/30",
        duration: 18,
        status: "pending",
        suggestedActivities: [],
      },
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
    ]);
    expect(trips.filterByQuery("status", "approved")).to.deep.equal([
      {
        id: 1,
        userID: 35,
        destinationID: 25,
        travelers: 5,
        date: "2022/10/04",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
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
      {
        id: 6,
        userID: 29,
        destinationID: 35,
        travelers: 3,
        date: "2023/06/29",
        duration: 9,
        status: "approved",
        suggestedActivities: [],
      },

      {
        id: 10,
        userID: 9,
        destinationID: 50,
        travelers: 6,
        date: "2022/07/23",
        duration: 17,
        status: "approved",
        suggestedActivities: [],
      },
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
      {
        id: 15,
        userID: 50,
        destinationID: 13,
        travelers: 3,
        date: "2022/07/04",
        duration: 6,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 16,
        userID: 19,
        destinationID: 27,
        travelers: 1,
        date: "2022/11/20",
        duration: 9,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 18,
        userID: 18,
        destinationID: 2,
        travelers: 2,
        date: "2022/09/25",
        duration: 17,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });

  it("Should return an empty array if no trips match status", () => {
    expect(trips.filterByQuery("status", 100)).to.deep.equal([]);
    expect(trips.filterByQuery("status", "delayed")).to.deep.equal([]);
    expect(trips.filterByQuery("status", "18")).to.deep.equal([]);
    expect(trips.filterByQuery("status", null)).to.deep.equal([]);
    expect(trips.filterByQuery("status", undefined)).to.deep.equal([]);
    expect(trips.filterByQuery("status", false)).to.deep.equal([]);
  });
});
