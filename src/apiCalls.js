const fetchData = (url, obj) => {
  return fetch(url, obj).then((response) => {
    // test response: !response.ok or response.status > 300
    return response.json();
  });
};

const fetchAll = () =>
  Promise.all([
    fetchData("http://localhost:3001/api/v1/travelers"),
    fetchData("http://localhost:3001/api/v1/trips"),
    fetchData("http://localhost:3001/api/v1/destinations"),
  ]);

export { fetchAll };
