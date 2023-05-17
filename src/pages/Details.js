import { useLocation } from "react-router-dom";
import { fetchDetails, fetchReviews } from "../api";
import { APIKEY } from "../App";
import { useEffect, useState } from "react";
import { Container, Typography, Grid, Link, useTheme } from "@mui/material";
// import { useOutletContext } from "react-router-dom";
import "../fonts.css";
import { ZeroLg, OneLg, OneHalfLg, TwoLg, TwoHalfLg, ThreeLg, ThreeHalfLg, FourLg, FourHalfLg, FiveLg } from "../assets/images";

const Details = () => {
  const [details, setDetails] = useState();
  const [reviews, setReviews] = useState();

  // const context = useOutletContext();
  // const isSmallScreen = context[7];

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

  let newRating;

  if (details?.rating === 5) {
    newRating = <img alt="rating" src={FiveLg} />;
  } else if (details?.rating === 4.5) {
    newRating = <img alt="rating" src={FourHalfLg} />;
  } else if (details?.rating === 4) {
    newRating = <img alt="rating" src={FourLg} />;
  } else if (details?.rating === 3.5) {
    newRating = <img alt="rating" src={ThreeHalfLg} />;
  } else if (details?.rating === 3) {
    newRating = <img alt="rating" src={ThreeLg} />;
  } else if (details?.rating === 2.5) {
    newRating = <img alt="rating" src={TwoHalfLg} />;
  } else if (details?.rating === 2) {
    newRating = <img alt="rating" src={TwoLg} />;
  } else if (details?.rating === 1.5) {
    newRating = <img alt="rating" src={OneHalfLg} />;
  } else if (details?.rating === 1) {
    newRating = <img alt="rating" src={OneLg} />;
  } else {
    newRating = <img alt="rating" src={ZeroLg} />;
  }

  const theme = useTheme();

  return (
    <Container style={{ marginTop: "80px" }}>
      <Grid container display="flex" direction="row" justifyContent="space-evenly" style={{ marginBottom: "80px" }}>
        <Grid xs={6} item display="flex" justifyContent="center" alignItems="start" direction="column">
          <Typography variant="h4" style={{ fontFamily: "TT norms pro", fontWeight: "500", marginBottom: "15px" }}>
            {details?.name}
          </Typography>
          <Grid display="flex" direction="row" alignItems="center" style={{ marginBottom: "10px" }}>
            {newRating}
            <Typography style={{ fontFamily: "TT norms pro", marginLeft: "10px" }}>{`${reviews?.total} reviews`}</Typography>
          </Grid>
          <Grid display="flex" direction="row">
            <Typography style={{ fontFamily: "TT norms pro" }}>{`${details?.location.address1} ${details?.location.city}, ${details?.location.state}`}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <img alt="details?.photos[0]" src={details?.image_url} style={{ width: "350px", height: "300px", objectFit: "cover", borderRadius: "50px" }} />
        </Grid>
      </Grid>
      <Grid container>
        {reviews?.reviews.map((item) => (
          <Grid key={item.id} xs={12} style={{ color: "white", borderRadius: "15px", padding: "15px", marginBottom: "15px", backgroundColor: theme.palette.primary.main }}>
            <Grid item>
              <Typography style={{ fontFamily: "TT norms pro" }}>{item.user.name}</Typography>
              <Typography style={{ fontFamily: "TT norms pro" }}>{item.time_created}</Typography>
              <Typography style={{ fontFamily: "TT norms pro" }}>{item.text}</Typography>
            </Grid>
            <Grid container direction="row" justifyContent="end" style={{ paddingTop: "15px", paddingRight: "10px" }}>
              <Link href={item.url} color="inherit" underline="none">
                See Full Review
              </Link>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Details;
