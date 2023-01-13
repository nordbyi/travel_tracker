import { expect } from "chai";

import User from "../src/User";

describe("Traveler", function () {
  let user;

  beforeEach(() => {
    user = new User({
      id: 1,
      name: "Ham Leadbeater",
    });
  });

  it("should be an instanc of User", () => {
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
});
