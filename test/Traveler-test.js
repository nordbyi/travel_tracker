import { expect } from "chai";

import Traveler from '../src/Traveler'

import travelerData from '../src/data/traveler-data'

describe('Traveler', function() {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler();
  });

  it('should return true', function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  });
});