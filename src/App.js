import { useState } from "react";
import { fetchCoffeeData } from "./api";
import { useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export const APIKEY = "yCv9CY1cY47Mguq02W1yh2eZQItWCWdDS3TsX3jP0Ay0-KLogFQw_TnOTlAOyEZ0HT9bSB0W0SzjyGPywt7xXql4JJYHUCfVxP5EPnbAIu5sXDs8facC_V9blOBCZHYx";

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

  const calculateDelay = (index) => {
    return `${(index + 1) * 0.1}s`;
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <div style={{ backgroundColor: theme.palette.background.default }}>
      <Header setLoaded={setLoaded} setInfo={setInfo} setIsLoading={setIsLoading} handleClick={handleClick} />
      <Outlet context={[info, loaded, isLoading, setLoaded, setInfo, setIsLoading, calculateDelay, isSmallScreen, handleClick]} />
    </div>
  );
}

export default App;
