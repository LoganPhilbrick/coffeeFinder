import React from "react";
import { Typography, Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import { StarRounded } from "@mui/icons-material";
import "../fonts.css";
// import { useNavigate } from "react-router-dom";

const CoffeeCard = ({ name, rating, distance, imageUrl, address, id }) => {
  const miles = (distance * 0.000621371192).toFixed(1);

  // const navigate = useNavigate();

  // const toDetails = () => {
  //   navigate("/details", { state: { id: `${id}` } });
  // };

  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{ border: "none", boxShadow: "none" }}
      // onClick={() => {
      //   toDetails();
      // }}
    >
      <CardActionArea>
        <CardMedia component="img" height="170" image={imageUrl} style={{ borderRadius: "3px" }} />
        <Grid container justifyContent="flex-start" marginTop="15px">
          <Typography className="norms" gutterBottom component="div" fontWeight="700" style={{ fontWeight: "700", fontFamily: "TT Norms Pro" }}>
            {name}
          </Typography>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Typography variant="body1" color="text.secondary" style={{ display: "flex", alignItems: "center", fontFamily: "TT Norms Pro" }}>
                {`${miles} mi - ${rating}`}
              </Typography>
            </Grid>
            <Grid item>
              <StarRounded sx={{ fontSize: 17 }} />
            </Grid>
          </Grid>
          <Typography variant="body1" color="text.secondary" style={{ fontFamily: "TT Norms Pro" }}>
            {address}
          </Typography>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default CoffeeCard;
