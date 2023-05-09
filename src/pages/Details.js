import { useLocation } from "react-router-dom";
import { fetchDetails, fetchReviews } from "../api";
import { APIKEY } from "../App";
import { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import "../fonts.css";

const Details = () => {
  const [details, setDetails] = useState();
  const [reviews, setReviews] = useState();

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
    fetchReviews(APIKEY, id)
      .then((res) => {
        setReviews(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(details);
  }, [details]);

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  return (
    <div>
      <Container style={{ marginTop: "40px" }}>
        <img src={details?.photos[0]} alt={details?.name} style={{ borderRadius: "15px", width: "1000px", height: "300px", objectFit: "cover" }} />
        <Typography variant="h4" style={{ fontWeight: "700", fontFamily: "TT Norms Pro" }}>
          {details?.name}
        </Typography>
      </Container>
    </div>
  );
};

export default Details;
