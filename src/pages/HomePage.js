import { Container, Grid, Button, useTheme } from "@mui/material";
import { Oval } from "react-loader-spinner";
import CoffeeCard from "../components/CoffeeCard";
import { useOutletContext } from "react-router-dom";
import "../App.css";

const HomePage = () => {
  const context = useOutletContext();
  const handleClick = context[8];
  const isLoading = context[2];
  const info = context[0];
  const loaded = context[1];
  const calculateDelay = context[6];
  const isSmallScreen = context[7];
  const isMedScreen = context[9];

  const theme = useTheme();

  return (
    <div>
      {isLoading ? (
        <Grid container justifyContent="center" sx={{ mt: "30vh" }} className="fade-in">
          <Oval height={80} width={80} color={"#81c784"} visible={true} ariaLabel="oval-loading" secondaryColor={"lightgrey"} strokeWidth={3} strokeWidthSecondary={3} />
        </Grid>
      ) : (
        <Container maxWidth="lg" sx={{ mt: "40px", display: "flex", justifyContent: "center" }}>
          <>
            {loaded ? (
              <Grid container spacing={3} justifyContent="center" style={{ marginBottom: "40px" }}>
                {info.map((item, index) => (
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
                ))}
              </Grid>
            ) : isSmallScreen ? (
              <>
                <Button
                  variant="contained"
                  sx={{
                    ":hover": {
                      bgcolor: theme.palette.success.main,
                      color: theme.palette.primary.contrastText,
                    },
                    position: "absolute",
                    bottom: "5vh",
                    backgroundColor: theme.palette.success.light,
                    p: 2,
                    pl: 10,
                    pr: 10,
                  }}
                  onClick={() => handleClick()}
                >
                  Search Nearby
                </Button>
                <Grid container spacing={3} direction="row" justifyContent="center">
                  <Grid item xs="auto">
                    <Grid className="g1" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>

                  <Grid item xs="auto">
                    <Grid className="g2" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>

                  <Grid item xs="auto">
                    <Grid className="g3" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                </Grid>
              </>
            ) : isMedScreen ? (
              <>
                <Button
                  variant="contained"
                  sx={{
                    ":hover": {
                      bgcolor: theme.palette.success.main,
                      color: theme.palette.primary.contrastText,
                    },
                    position: "absolute",
                    bottom: "10vh",
                    backgroundColor: theme.palette.success.light,
                    p: 2,
                    pl: 10,
                    pr: 10,
                  }}
                  onClick={() => handleClick()}
                >
                  Search Nearby
                </Button>
                <Grid container spacing={3} direction="row" justifyContent="center">
                  <Grid item xs="auto">
                    <Grid className="g1" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Grid className="g1" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Grid className="g2" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Grid className="g2" display="flex" alignItems="center" justifyContent="center" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Grid className="g3" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Grid className="g3" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  sx={{
                    ":hover": {
                      bgcolor: theme.palette.success.main,
                      color: theme.palette.primary.contrastText,
                    },
                    position: "absolute",
                    bottom: "10vh",
                    backgroundColor: theme.palette.success.light,
                    p: 2,
                    pl: 10,
                    pr: 10,
                  }}
                  onClick={() => handleClick()}
                >
                  Search Nearby
                </Button>
                <Grid container spacing={3} direction="row" justifyContent="center">
                  <Grid item xs="auto">
                    <Grid className="g1" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Grid className="g1" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Grid className="g1" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Grid className="g2" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Grid className="g2" display="flex" alignItems="center" justifyContent="center" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Grid className="g2" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Grid className="g3" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Grid className="g3" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Grid className="g3" style={{ height: 170, width: 350 }}></Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </>
        </Container>
      )}
    </div>
  );
};

export default HomePage;
