const fetchData = (url, obj) => {
  return fetch(url, obj).then((response) => {
    return response.json();
  });
};

const fetchAll = (id) =>
  Promise.all([
    fetchData("http://localhost:3001/api/v1/travelers"),
    fetchData("http://localhost:3001/api/v1/trips"),
    fetchData("http://localhost:3001/api/v1/destinations"),
    fetchData(`http://localhost:3001/api/v1/travelers/${id}`),    
  ]);

const postData = (data) => {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }, 
  })
}

export { fetchAll, postData };
