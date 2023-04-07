import { useState } from "react";
import { fetchCoffeeData } from "./api";

function App() {
  const APIKEY = "_f_CKX0Mc-Y4d_MIn9I-sllPEBlg1gP33w6FsCMtFk_hkBCfpgTxNcu3Qvdp31dm7KdVRy7S_GpATm1JtSexxKEiijlnCCgkVzZ0Kc0B5YGMtZvZxeXk35bgSaMvZHYx";
  const [info, setInfo] = useState([]);

  const handleClick = () => {
    console.log("Button clicked");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      fetchCoffeeData(APIKEY, latitude, longitude)
        .then((data) => setInfo(data.businesses))
        .catch((error) => console.log(error));
    });
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Fetch data</button>
      {info.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <p>{item.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
