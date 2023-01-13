import { expect } from "chai";

describe("Traveler", function () {
  let trips;
  let destinationsData;
  let tripsData;

  beforeEach(() => {
    trips = new Trip(tripsData, destinationsData);
  });

  it("should be an instance of Trips", () => {
    expect(user).to.be.an.instanceof(user);
  });
});
