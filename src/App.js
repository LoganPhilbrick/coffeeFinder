import { useState } from "react";
import { fetchCoffeeData } from "./api";
import { Container, Grid } from "@mui/material";
import CoffeeCard from "./components/CoffeeCard";
import Header from "./components/Header";

export const APIKEY = "_f_CKX0Mc-Y4d_MIn9I-sllPEBlg1gP33w6FsCMtFk_hkBCfpgTxNcu3Qvdp31dm7KdVRy7S_GpATm1JtSexxKEiijlnCCgkVzZ0Kc0B5YGMtZvZxeXk35bgSaMvZHYx";

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
