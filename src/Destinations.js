class Destinations {
  constructor(data) {
    this.destinations = data;
  }

  findByQuery(query, comparison) {
    return this.destinations.find(
      (destination) => destination[query] === comparison
    );
  }

  filterByQuery(query, comparisonArray) {
    return this.destinations.filter((destination) =>
      comparisonArray.some(
        (comparison) => comparison === destination[query]
      )
    );
  }
}

export default Destinations;
