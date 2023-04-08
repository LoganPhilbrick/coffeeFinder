import React from "react";
import { Typography, Card, CardActionArea, CardMedia, CardContent, Grid } from "@mui/material";
import { Star } from "@mui/icons-material";

const CoffeeCard = ({ name, rating, distance, imageUrl, address }) => {
  const miles = (distance * 0.000621371192).toFixed(1);
  return (
    <Grid item>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={imageUrl} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
              <Typography variant="body2" color="text.secondary">
                {rating}
                <Star sx={{ fontSize: 15 }} />
              </Typography>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${miles} mi`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CoffeeCard;
