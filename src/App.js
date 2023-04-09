import { useState } from "react";
import { fetchCoffeeData } from "./api";
import { Button, Container, Grid } from "@mui/material";
import CoffeeCard from "./components/CoffeeCard";

function App() {
  const APIKEY = "_f_CKX0Mc-Y4d_MIn9I-sllPEBlg1gP33w6FsCMtFk_hkBCfpgTxNcu3Qvdp31dm7KdVRy7S_GpATm1JtSexxKEiijlnCCgkVzZ0Kc0B5YGMtZvZxeXk35bgSaMvZHYx";
  const [info, setInfo] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleClick = () => {
    console.log("Button clicked");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      fetchCoffeeData(APIKEY, latitude, longitude)
        .then((data) => {
          setInfo(data.businesses);
          setLoaded(true);
        })
        .catch((error) => console.log(error));
    });
  };
  console.log(info);

  return (
    <div>
      <Grid container justifyContent="center" className="slide-top" style={{ position: "sticky", top: 0, backgroundColor: "#43b3ae", zIndex: "1", boxShadow: "0px 0px 15px grey" }}>
        <Grid item style={{ marginTop: "40px", marginBottom: "40px" }}>
          {!loaded && (
            <Button variant="contained" onClick={handleClick}>
              Search Nearby
            </Button>
          )}
          {loaded && (
            <Button variant="contained" onClick={handleClick}>
              Refresh
            </Button>
          )}
        </Grid>
      </Grid>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center" style={{ marginBottom: "40px", marginTop: "5px" }}>
          {loaded &&
            info.map((item) => (
              <Grid item xs="auto">
                <CoffeeCard
                  key={item.id}
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
