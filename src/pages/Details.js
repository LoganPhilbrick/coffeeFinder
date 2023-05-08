import { useLocation } from "react-router-dom";
import { fetchDetails } from "../api";
import { APIKEY } from "../App";
import { useEffect, useState } from "react";

const Details = () => {
  const [details, setDetails] = useState();

  const location = useLocation();

  const handleDetails = () => {
    const id = location.state.id;
    fetchDetails(APIKEY, id)
      .then((res) => {
        setDetails(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleDetails();
  }, []);

  useEffect(() => {
    console.log(details);
  }, [details]);

  return <div onClick={handleDetails}>{details?.name}</div>;
};

export default Details;
