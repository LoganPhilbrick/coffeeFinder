import { Container, Grid, Button, Typography } from "@mui/material";
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

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item style={{ marginTop: "40px" }}></Grid>
      </Grid>

      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center" style={{ marginBottom: "40px" }}>
          {isLoading ? (
            <Grid container justifyContent="center" style={{ marginLeft: 15 }}>
              <Oval
                height={80}
                width={80}
                color="#add8e6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="##2E2EFF"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </Grid>
          ) : (
            <>
              {loaded ? (
                info.map((item, index) => (
                  <Grid item xs="auto" className="fade-in" key={index} style={{ animationDelay: calculateDelay(index) }}>
                    <CoffeeCard // On click navigate to details & pass ID as params
                      key={index}
                      name={item.name}
                      rating={item.rating}
                      imageUrl={item.image_url}
                      address={`${item.location.address1} ${item.location.city}, ${item.location.state}`}
                      distance={item.distance}
                      id={item.id}
                    />
                  </Grid>
                ))
              ) : isSmallScreen ? (
                <Grid container xs={8} direction="column" justifyContent="center" alignItems="center" style={{ minHeight: "20vh", marginLeft: 15 }}>
                  <Typography textAlign="center">Click the button or the arrow to search for coffee near you!</Typography>
                  <Button variant="contained" onClick={() => handleClick()} sx={{ mt: 2 }}>
                    Search Nearby
                  </Button>
                </Grid>
              ) : (
                <Grid container direction="row" justifyContent="center" alignItems="center" style={{ minHeight: "20vh" }}>
                  <Typography>Click the button to search for coffee near you!</Typography>
                  <Button variant="contained" onClick={() => handleClick()} sx={{ ml: 1.5 }}>
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
