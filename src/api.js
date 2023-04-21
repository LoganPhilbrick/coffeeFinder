export const fetchCoffeeData = (apiKey, latitude, longitude) => {
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  if (window.location.hostname === "localhost") {
    return fetch(`/businesses/search?latitude=${latitude}&longitude=${longitude}&term=coffee&sort_by=best_match&limit=20`, options).then((res) => res.json());
  }
  if (window.location.hostname !== "localhost") {
    return fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=coffee&sort_by=best_match&limit=20`, options).then((res) => res.json());
  }
};
export const searchCoffeeData = (apiKey, location) => {
  const formattedLocation = location.trim().replace(" ", "%20");
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  console.log(formattedLocation);
  if (window.location.hostname === "localhost") {
    return fetch(`/businesses/search?location=${location}&term=coffee&sort_by=best_match&limit=20`, options).then((res) => res.json());
  }
  if (window.location.hostname !== "localhost") {
    return fetch(`https://api.yelp.com/v3/businesses/businesses/search?location=${location}&term=coffee&sort_by=best_match&limit=20`, options).then((res) => res.json());
  }
};
