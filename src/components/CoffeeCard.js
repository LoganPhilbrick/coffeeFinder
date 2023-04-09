import React from "react";
import { Typography, Card, CardActionArea, CardMedia, CardContent, Grid } from "@mui/material";
import { StarRounded } from "@mui/icons-material";

const CoffeeCard = ({ name, rating, distance, imageUrl, address }) => {
  const miles = (distance * 0.000621371192).toFixed(1);
  return (
    <Card sx={{ maxWidth: 345 }} style={{ border: "none", boxShadow: "inset 0px 0px 15px grey", backgroundColor: "#fff", fontFamily: "TT Norms Pro" }}>
      <CardActionArea>
        <CardMedia component="img" height="140" rounded image={imageUrl} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
            {name}
          </Typography>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Typography variant="body2" color="text.secondary" style={{ display: "flex", alignItems: "center" }}>
                {`${miles} mi - ${rating}`}
              </Typography>
            </Grid>
            <Grid item>
              <StarRounded sx={{ fontSize: 15 }} />
            </Grid>
          </Grid>
          <Typography variant="body2" color="text.secondary">
            {address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CoffeeCard;
