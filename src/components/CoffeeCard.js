import React from "react";
import { Typography, Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import "../fonts.css";
import { useNavigate } from "react-router-dom";
import { Zero, One, OneHalf, Two, TwoHalf, Three, ThreeHalf, Four, FourHalf, Five, YelpLogo } from "../assets/images";

const CoffeeCard = ({ name, rating, distance, imageUrl, address, count, id }) => {
  const miles = (distance * 0.000621371192).toFixed(1);

  const navigate = useNavigate();

  const toDetails = () => {
    navigate("/details", { state: { id: `${id}` } });
  };

  let newRating;

  if (rating === 5) {
    newRating = <img alt="rating" src={Five} />;
  } else if (rating === 4.5) {
    newRating = <img alt="rating" src={FourHalf} />;
  } else if (rating === 4) {
    newRating = <img alt="rating" src={Four} />;
  } else if (rating === 3.5) {
    newRating = <img alt="rating" src={ThreeHalf} />;
  } else if (rating === 3) {
    newRating = <img alt="rating" src={Three} />;
  } else if (rating === 2.5) {
    newRating = <img alt="rating" src={TwoHalf} />;
  } else if (rating === 2) {
    newRating = <img alt="rating" src={Two} />;
  } else if (rating === 1.5) {
    newRating = <img alt="rating" src={OneHalf} />;
  } else if (rating === 1) {
    newRating = <img alt="rating" src={One} />;
  } else {
    newRating = <img alt="rating" src={Zero} />;
  }

  return (
    <Card
      sx={{ maxWidth: 365 }}
      style={{ border: "none", boxShadow: "none" }}
      onClick={() => {
        toDetails();
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="170" image={imageUrl} style={{ borderRadius: "5px" }} />
        <Grid container justifyContent="flex-start" marginTop="15px">
          <Typography className="norms" gutterBottom component="div" fontWeight="700" style={{ fontWeight: "700", fontFamily: "tt norms pro" }}>
            {name}
          </Typography>
          <Grid container>
            <Grid container direction="row">
              <Grid item>{newRating}</Grid>
              <Grid item style={{ marginLeft: "10px", fontFamily: "tt norms pro" }}>
                {count} Reviews
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="text.secondary" style={{ display: "flex", alignItems: "center", fontFamily: "tt norms pro" }}>
                {`${miles} mi`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography variant="body1" color="text.secondary" style={{ fontFamily: "tt norms pro" }}>
                {address}
              </Typography>
            </Grid>
            <Grid item>
              <img alt="Yelp Logo" src={YelpLogo} style={{ maxWidth: "55px" }} />
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default CoffeeCard;
