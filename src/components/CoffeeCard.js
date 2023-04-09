import React from "react";
import { Typography, Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import { StarRounded } from "@mui/icons-material";
import "../fonts.css";

const CoffeeCard = ({ name, rating, distance, imageUrl, address }) => {
  const miles = (distance * 0.000621371192).toFixed(1);
  return (
    <Card sx={{ maxWidth: 345 }} style={{ border: "none", boxShadow: "none" }}>
      <CardActionArea>
        <CardMedia component="img" height="170" rounded image={imageUrl} style={{ borderRadius: "3px" }} />
        <Grid container justifyContent="flex-start" marginTop="15px">
          <Typography className="norms" gutterBottom component="div" fontWeight="700">
            {name}
          </Typography>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Typography className="norms" variant="body1" color="text.secondary" style={{ display: "flex", alignItems: "center" }}>
                {`${miles} mi - ${rating}`}
              </Typography>
            </Grid>
            <Grid item>
              <StarRounded sx={{ fontSize: 17 }} />
            </Grid>
          </Grid>
          <Typography className="norms" variant="body1" color="text.secondary">
            {address}
          </Typography>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default CoffeeCard;
