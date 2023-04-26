export const fetchCoffeeData = (APIKEY, latitude, longitude) => {
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      latitude,
      longitude,
      accept: "application/json",
      // Authorization: `Bearer ${APIKEY}`,
    },
  };

  return fetch(`https://coffeeapi-d9982.web.app/coords`, options).then((res) => res.json());
};
export const searchCoffeeData = (APIKEY, location) => {
  const formattedLocation = location.trim().replace(" ", "%20");
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      accept: "application/json",
      location: formattedLocation,
      // Authorization: `Bearer ${APIKEY}`,
    },
  };

  return fetch(`https://coffeeapi-d9982.web.app/location`, options).then((res) => res.json());
};
