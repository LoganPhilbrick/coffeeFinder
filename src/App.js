import { useState } from "react";
import { fetchCoffeeData } from "./api";
import Header from "./components/Header";
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

  return (
    <div style={{ backgroundColor: "#F2F3F5" }}>
      <Header style={{ boxShadow: "0px 0px 15px black" }}>
        {!loaded && (
          <button style={{ padding: "10px", borderRadius: "20px", boxShadow: " inset 0px 0px 5px rgba(0, 0, 0, 0.5)", backgroundColor: "white", border: "none" }} onClick={handleClick}>
            Search Nearby
          </button>
        )}
        {loaded && (
          <button style={{ padding: "10px 13px", boxShadow: " inset 0px 0px 5px rgba(0, 0, 0, 0.5)", borderRadius: "20px", backgroundColor: "white", border: "none" }} onClick={handleClick}>
            Refresh
          </button>
        )}
      </Header>
      <div className="App">{loaded && info.map((item) => <CoffeeCard key={item.id} name={item.name} rating={item.rating} imageUrl={item.image_url} />)}</div>
    </div>
  );
}

export default App;
