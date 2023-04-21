import { useState } from "react";
import { fetchCoffeeData } from "./api";
import { Container, Grid } from "@mui/material";
import CoffeeCard from "./components/CoffeeCard";
import Header from "./components/Header";

export const APIKEY = "yCv9CY1cY47Mguq02W1yh2eZQItWCWdDS3TsX3jP0Ay0-KLogFQw_TnOTlAOyEZ0HT9bSB0W0SzjyGPywt7xXql4JJYHUCfVxP5EPnbAIu5sXDs8facC_V9blOBCZHYx";

function App() {
  const [info, setInfo] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleClick = () => {
    console.log("Button clicked");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      fetchCoffeeData(APIKEY, latitude, longitude)
        .then((data) => {
          console.log({ data });
          setInfo(data.businesses);
          setLoaded(true);
        })
        .catch((error) => console.log(error));
    });
  };

  console.log(info);

  const calculateDelay = (index) => {
    return `${(index + 1) * 0.1}s`;
  };

  return (
    <div>
      <Header setLoaded={setLoaded} setInfo={setInfo} handleClick={handleClick} />
      <Grid container justifyContent="center">
        <Grid item style={{ marginTop: "40px" }}></Grid>
      </Grid>

      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center" style={{ marginBottom: "40px" }}>
          {loaded &&
            info.map((item, index) => (
              <Grid item xs="auto" className="fade-in" key={index} style={{ animationDelay: calculateDelay(index) }}>
                <CoffeeCard
                  key={index}
                  name={item.name}
                  rating={item.rating}
                  imageUrl={item.image_url}
                  address={`${item.location.address1} ${item.location.city}, ${item.location.state}`}
                  distance={item.distance}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
