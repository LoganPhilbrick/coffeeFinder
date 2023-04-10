export const fetchCoffeeData = (apiKey, latitude, longitude) => {
  const options = {
    method: "GET",
    headers: { accept: "application/json", Authorization: `Bearer ${apiKey}` },
  };
  if (window.location.hostname === "localhost") {
    return fetch(`/businesses/search?latitude=${latitude}&longitude=${longitude}&categories=coffee&sort_by=best_match&limit=20`, options).then((res) => res.json());
  }
  if (window.location.hostname !== "localhost") {
    return fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&categories=coffee&sort_by=best_match&limit=20`, options).then((res) => res.json());
  }
};
