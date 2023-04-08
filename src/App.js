import { useState } from "react";
import { fetchCoffeeData } from "./api";
import { Button, Grid } from "@mui/material";
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
    <div className="App">
      <Grid container justifyContent="center" alignItems="center">
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

        <Grid container rowSpacing={4} direction="row" justifyContent="space-evenly" alignItems="flex-start" spacing={4}>
          {loaded &&
            info.map((item) => (
              <CoffeeCard
                key={item.id}
                name={item.name}
                rating={item.rating}
                imageUrl={item.image_url}
                address={`${item.location.address1} ${item.location.city}, ${item.location.state}`}
                distance={item.distance}
              />
            ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
