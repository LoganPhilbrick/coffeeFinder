export const fetchCoffeeData = (apiKey, latitude, longitude) => {
  const options = {
    method: "GET",
    headers: { accept: "application/json", Authorization: `Bearer ${apiKey}` },
  };

  return fetch(`/businesses/search?latitude=${latitude}&longitude=${longitude}&categories=coffee&categories=tea&categories=cafe&sort_by=best_match&limit=3`, options).then((res) => res.json());
};
