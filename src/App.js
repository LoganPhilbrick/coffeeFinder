import { useState } from "react";
import { fetchCoffeeData } from "./api";
import { Container, Grid, Button, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { Oval } from "react-loader-spinner";
import CoffeeCard from "./components/CoffeeCard";
import Header from "./components/Header";

export const APIKEY = "yCv9CY1cY47Mguq02W1yh2eZQItWCWdDS3TsX3jP0Ay0-KLogFQw_TnOTlAOyEZ0HT9bSB0W0SzjyGPywt7xXql4JJYHUCfVxP5EPnbAIu5sXDs8facC_V9blOBCZHYx";

function App() {
  const [info, setInfo] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // add a new state variable

  const handleClick = () => {
    console.log("Button clicked");
    setIsLoading(true); // set isLoading to true when the button is clicked
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      fetchCoffeeData(APIKEY, latitude, longitude)
        .then((data) => {
          console.log({ data });
          setInfo(data.businesses);
          setLoaded(true);
          setIsLoading(false); // set isLoading to false when the data has been loaded
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false); // set isLoading to false when there's an error
        });
    });
  };

  console.log(info);

  const calculateDelay = (index) => {
    return `${(index + 1) * 0.1}s`;
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <Header setLoaded={setLoaded} setInfo={setInfo} setIsLoading={setIsLoading} handleClick={handleClick} />
      <Grid container justifyContent="center">
        <Grid item style={{ marginTop: "40px" }}></Grid>
      </Grid>

      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center" style={{ marginBottom: "40px" }}>
          {isLoading ? (
            <Oval height={80} width={80} color="#add8e6" wrapperStyle={{}} wrapperClass="" visible={true} ariaLabel="oval-loading" secondaryColor="##2E2EFF" strokeWidth={2} strokeWidthSecondary={2} />
          ) : (
            <>
              {loaded ? (
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
                ))
              ) : isSmallScreen ? (
                <Grid container xs={8} direction="column" justifyContent="center" alignItems="center" style={{ minHeight: "20vh", marginLeft: 15 }}>
                  <Typography textAlign="center">Click the button or the arrow to search for coffee near you!</Typography>
                  <Button variant="contained" onClick={handleClick} sx={{ mt: 2 }}>
                    Search Nearby
                  </Button>
                </Grid>
              ) : (
                <Grid container direction="row" justifyContent="center" alignItems="center" style={{ minHeight: "20vh" }}>
                  <Typography>Click the button to search for coffee near you!</Typography>
                  <Button variant="contained" onClick={handleClick} sx={{ ml: 1.5 }}>
                    Search Nearby
                  </Button>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
