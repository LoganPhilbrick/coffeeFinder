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
      <Container maxWidth="lg">
        <Grid container justifyContent="center">
          <Grid item style={{ marginTop: "40px", marginBottom: "60px" }}>
            {!loaded && (
              <Button variant="contained" onClick={handleClick}>
                Search Nearby
              </Button>
            )}
            {loaded && (
              <Button variant="outlined" onClick={handleClick}>
                Refresh
              </Button>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ marginBottom: "40px", borderTop: "solid 1px lightGrey" }}>
          {loaded &&
            info.map((item) => (
              <Grid item xs={4}>
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
