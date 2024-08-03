import { useState } from "react";
import { fetchCoffeeData } from "./api";
import { useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export const APIKEY = process.env.APIKEY;

function App() {
  const [info, setInfo] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // add a new state variable
  const theme = useTheme();

  const handleClick = () => {
    console.log("Button clicked");
    setIsLoading(true); // set isLoading to true when the button is clicked
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      fetchCoffeeData(APIKEY, latitude, longitude)
        .then((data) => {
          console.log({ data });
          let filteredValues = data.businesses.filter((business) => {
            if (business.rating > 0.1) {
              return true;
            }
            return false;
          });
          setInfo(filteredValues);
          setLoaded(true);
          setIsLoading(false); // set isLoading to false when the data has been loaded
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false); // set isLoading to false when there's an error
        });
    });
  };

  const calculateDelay = (index) => {
    return `${(index + 1) * 0.1}s`;
  };

  const isSmallScreen = useMediaQuery("(max-width:771px)");
  const isMedScreen = useMediaQuery("(max-width:1145px)");

  return (
    <div style={{ backgroundColor: theme.palette.background.default }}>
      <Header setLoaded={setLoaded} setInfo={setInfo} setIsLoading={setIsLoading} handleClick={handleClick} />
      <Outlet context={[info, loaded, isLoading, setLoaded, setInfo, setIsLoading, calculateDelay, isSmallScreen, handleClick, isMedScreen]} />
    </div>
  );
}

export default App;
