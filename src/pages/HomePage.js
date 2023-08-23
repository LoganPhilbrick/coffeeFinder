import { Container, Grid, Button, Typography, useTheme } from "@mui/material";
import { Oval } from "react-loader-spinner";
import CoffeeCard from "../components/CoffeeCard";
import { useOutletContext } from "react-router-dom";

const HomePage = () => {
  const context = useOutletContext();
  const handleClick = context[8];
  const isLoading = context[2];
  const info = context[0];
  const loaded = context[1];
  const calculateDelay = context[6];
  const isSmallScreen = context[7];

  const theme = useTheme();

  return (
    <div>
      <Container maxWidth="lg" style={{ marginTop: "40px" }}>
        <Grid container spacing={3} justifyContent="center" style={{ marginBottom: "40px" }}>
          {isLoading ? (
            <Grid container justifyContent="center" style={{ marginLeft: 15, marginTop: "85px" }}>
              <Oval
                height={80}
                width={80}
                color={theme.palette.success.light}
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor={theme.palette.success.main}
                strokeWidth={3}
                strokeWidthSecondary={3}
              />
            </Grid>
          ) : (
            <>
              {loaded ? (
                info.map((item, index) => (
                  <Grid item xs="auto" className="fade-in" key={index} style={{ animationDelay: calculateDelay(index) }}>
                    <CoffeeCard
                      key={index}
                      name={item.name}
                      rating={item.rating}
                      imageUrl={item.image_url}
                      address={`${item.location.address1} ${item.location.city}, ${item.location.state}`}
                      distance={item.distance}
                      count={item.review_count}
                      id={item.id}
                    />
                  </Grid>
                ))
              ) : isSmallScreen ? (
                <Grid container xs={8} direction="column" justifyContent="center" alignItems="center" style={{ minHeight: "20vh", marginLeft: 15 }}>
                  <Typography textAlign="center">Click the button or the arrow to search for coffee near you!</Typography>
                  <Button variant="contained" style={{ backgroundColor: theme.palette.success.light }} onClick={() => handleClick()} sx={{ mt: 2 }}>
                    Search Nearby
                  </Button>
                </Grid>
              ) : (
                <Grid container direction="row" justifyContent="center" alignItems="center" style={{ minHeight: "20vh" }}>
                  <Typography>Click the button to search for coffee near you!</Typography>
                  <Button variant="contained" style={{ backgroundColor: theme.palette.success.light }} onClick={() => handleClick()} sx={{ ml: 1.5 }}>
                    Search Nearby
                  </Button>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
