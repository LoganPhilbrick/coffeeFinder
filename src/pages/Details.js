import { fetchDetails, fetchReviews } from "../api";
import { APIKEY } from "../App";
import { useEffect, useState } from "react";
import MobileDetect from "mobile-detect";
import {
  Container,
  Typography,
  Grid,
  Link,
  useTheme,
  Fab,
  Button,
} from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import "../fonts.css";
import {
  ZeroLg,
  OneLg,
  OneHalfLg,
  TwoLg,
  TwoHalfLg,
  ThreeLg,
  ThreeHalfLg,
  FourLg,
  FourHalfLg,
  FiveLg,
} from "../assets/images";
import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";
// import ShareIcon from "@mui/icons-material/Share";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";

const Details = () => {
  const [details, setDetails] = useState();
  const [reviews, setReviews] = useState();
  const [mapsUrl, setMapsUrl] = useState();
  const [picsOrReviews, setPicsOrReviews] = useState(true);

  const { id: paramId } = useParams();

  const context = useOutletContext();
  const setIsLoading = context[5];
  const isLoading = context[2];

  const handleDetails = () => {
    setIsLoading(true);
    const id = paramId || localStorage.getItem("storeId");
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
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

  switch (details?.rating) {
    case 5:
      newRating = <img style={{ width: "150px" }} alt="rating" src={FiveLg} />;
      break;
    case 4.5:
      newRating = (
        <img style={{ width: "150px" }} alt="rating" src={FourHalfLg} />
      );
      break;
    case 4:
      newRating = <img style={{ width: "150px" }} alt="rating" src={FourLg} />;
      break;
    case 3.5:
      newRating = (
        <img style={{ width: "150px" }} alt="rating" src={ThreeHalfLg} />
      );
      break;
    case 3:
      newRating = <img style={{ width: "150px" }} alt="rating" src={ThreeLg} />;
      break;
    case 2.5:
      newRating = (
        <img style={{ width: "150px" }} alt="rating" src={TwoHalfLg} />
      );
      break;
    case 2:
      newRating = <img style={{ width: "150px" }} alt="rating" src={TwoLg} />;
      break;
    case 1.5:
      newRating = (
        <img style={{ width: "150px" }} alt="rating" src={OneHalfLg} />
      );
      break;
    case 1:
      newRating = <img style={{ width: "150px" }} alt="rating" src={OneLg} />;
      break;
    default:
      newRating = <img alt="rating" src={ZeroLg} />;
      break;
  }
  function getRatingImage(rating) {
    switch (rating) {
      case 5:
        return <img style={{ width: "100px" }} alt="rating" src={FiveLg} />;

      case 4.5:
        return <img style={{ width: "100px" }} alt="rating" src={FourHalfLg} />;

      case 4:
        return <img style={{ width: "100px" }} alt="rating" src={FourLg} />;

      case 3.5:
        return (
          <img style={{ width: "100px" }} alt="rating" src={ThreeHalfLg} />
        );

      case 3:
        return <img style={{ width: "100px" }} alt="rating" src={ThreeLg} />;

      case 2.5:
        return <img style={{ width: "100px" }} alt="rating" src={TwoHalfLg} />;

      case 2:
        return <img style={{ width: "100px" }} alt="rating" src={TwoLg} />;

      case 1.5:
        return <img style={{ width: "100px" }} alt="rating" src={OneHalfLg} />;

      case 1:
        return <img style={{ width: "100px" }} alt="rating" src={OneLg} />;

      default:
        return <Typography>No Rating</Typography>;
    }
  }

  const theme = useTheme();

  const detectDevice = () => {
    let type = new MobileDetect(window.navigator.userAgent);
    if (type.os() === "iOS") {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setMapsUrl(
            `http://maps.apple.com/?saddr=${latitude},${longitude}&daddr=${details?.coordinates.latitude},${details?.coordinates.longitude}`
          );
        },
        (err) => console.log(err),
        { enableHighAccuracy: true }
      );
    } else if (type.os() !== "iOS") {
      setMapsUrl(
        `https://www.google.com/maps/dir/?api=1&destination=${details?.coordinates.latitude}%2C%20${details?.coordinates.longitude}`
      );
    }
  };

  useEffect(() => {
    detectDevice();
  });

  const openMaps = () => {
    window.open(mapsUrl);
  };

  return (
    <>
      {isLoading ? (
        <Grid container justifyContent="center" style={{ marginTop: "85px" }}>
          <Oval
            height={80}
            width={80}
            color="#add8e6"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="##2E2EFF"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        </Grid>
      ) : (
        <>
          <div
            style={{
              backgroundImage: `url(${details?.image_url})`,
              marginBottom: "48px",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="filters">
              <Container style={{ paddingTop: "80px" }}>
                <Grid
                  container
                  display="flex"
                  direction="row"
                  justifyContent="center"
                  style={{ paddingBottom: "80px" }}
                >
                  <Grid
                    item
                    display="flex"
                    justifyContent="center"
                    alignItems="start"
                    direction="column"
                    color="white"
                  >
                    <Typography
                      variant="h4"
                      style={{
                        fontFamily: "TT norms pro",
                        fontWeight: "500",
                        marginBottom: "15px",
                      }}
                    >
                      {details?.name}
                    </Typography>
                    <Grid
                      display="flex"
                      direction="row"
                      alignItems="center"
                      style={{ marginBottom: "10px" }}
                    >
                      {newRating}
                      <Typography
                        style={{
                          fontFamily: "TT norms pro",
                          marginLeft: "10px",
                        }}
                      >{`${reviews?.total} reviews`}</Typography>
                    </Grid>
                    <Grid
                      display="flex"
                      direction="row"
                      style={{ marginBottom: "15px" }}
                    >
                      <Typography
                        style={{ fontFamily: "TT norms pro" }}
                      >{`${details?.location.address1} ${details?.location.city}, ${details?.location.state}`}</Typography>
                    </Grid>
                    <Grid
                      container
                      display="flex"
                      direction="row"
                      justifyContent="start"
                      alignItems="baseline"
                    >
                      <Fab
                        color="primary"
                        variant="extended"
                        style={{ marginRight: "10px" }}
                        onClick={() => openMaps()}
                      >
                        <NavigationRoundedIcon sx={{ mr: 1 }} />
                        <Typography
                          style={{ marginTop: "2px", marginRight: "5px" }}
                          variant="button"
                        >
                          {" "}
                          directions
                        </Typography>
                      </Fab>
                      {/* <Fab style={{ marginRight: "10px" }} color="primary">
                        <ShareIcon />
                      </Fab>
                      <Fab color="primary">
                        <StarRoundedIcon />
                      </Fab> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </div>

          <Container
            style={{
              marginBottom: "48px",
            }}
          >
            {picsOrReviews ? (
              <Grid
                container
                display="flex"
                direction="row"
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "10px 0px 0px 10px",
                    padding: "20px",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                  onClick={() => setPicsOrReviews(true)}
                >
                  Reviews
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "0px 10px 10px 0px",
                    padding: "20px",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                  onClick={() => setPicsOrReviews(false)}
                >
                  Photos
                </Button>
              </Grid>
            ) : (
              <Grid
                container
                display="flex"
                direction="row"
                justifyContent="center"
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "10px 0px 0px 10px",
                    padding: "20px",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                  onClick={() => setPicsOrReviews(true)}
                >
                  Reviews
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "0px 10px 10px 0px",
                    padding: "20px",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                  onClick={() => setPicsOrReviews(false)}
                >
                  Photos
                </Button>
              </Grid>
            )}
          </Container>

          <Container>
            {picsOrReviews ? (
              <Grid container>
                {reviews?.reviews.map((item) => (
                  <Grid
                    item
                    key={item.id}
                    xs={12}
                    style={{
                      color: "white",
                      borderRadius: "15px",
                      padding: "15px",
                      marginBottom: "36px",
                      backgroundColor: theme.palette.primary.main,
                    }}
                  >
                    <Grid item>
                      <Typography style={{ fontFamily: "TT norms pro" }}>
                        {item.user.name}
                      </Typography>
                      <Typography style={{ fontFamily: "TT norms pro" }}>
                        {item.time_created}
                      </Typography>
                      <Grid>{getRatingImage(item.rating)}</Grid>
                      <Typography style={{ fontFamily: "TT norms pro" }}>
                        {item.text}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="end"
                      style={{ paddingTop: "15px", paddingRight: "10px" }}
                    >
                      <Link href={item.url} color="inherit" underline="none">
                        See Full Review
                      </Link>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid container justifyContent="center">
                {details?.photos.map((item, index) => (
                  <Grid
                    item
                    key={index}
                    // sm={4}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      alt={item}
                      src={item}
                      style={{
                        width: "90%",
                        objectFit: "cover",
                        borderRadius: "15px",
                        marginBottom: "36px",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default Details;
