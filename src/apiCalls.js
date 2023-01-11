const fetchData = (url, obj) => {
  return fetch(url, obj).then(response => {
    // test response: !response.ok or response.status > 300
    return response.json()
  })
}
