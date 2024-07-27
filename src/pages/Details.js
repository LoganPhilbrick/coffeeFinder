import { fetchDetails, fetchReviews } from "../api";
import { APIKEY } from "../App";
import { useEffect, useState } from "react";
import MobileDetect from "mobile-detect";
import { Container, Typography, Grid, Fab, Button, useTheme } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import "../fonts.css";
import { ZeroLg, OneLg, OneHalfLg, TwoLg, TwoHalfLg, ThreeLg, ThreeHalfLg, FourLg, FourHalfLg, FiveLg } from "../assets/images";
import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";

// import ShareIcon from "@mui/icons-material/Share";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";

const Details = () => {
  const [details, setDetails] = useState();
  const [reviews, setReviews] = useState();
  const [mapsUrl, setMapsUrl] = useState();
  const [picsOrReviews, setPicsOrReviews] = useState(true);

  const theme = useTheme();

  const { id: paramId } = useParams();

  const context = useOutletContext();
  const setIsLoading = context[5];
  const isLoading = context[2];
  const isSmallScreen = context[7];

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

  // useEffect(() => {
  //   console.log(details);
  // }, [details]);

  // useEffect(() => {
  //   console.log(reviews);
  // }, [reviews]);

  let newRating;

  switch (Math.floor(details?.rating) + 0.5) {
    case 5 && 5.5:
      newRating = <img style={{ width: "150px" }} alt="rating" src={FiveLg} />;
      break;
    case 4.5:
      newRating = <img style={{ width: "150px" }} alt="rating" src={FourHalfLg} />;
      break;
    case 4:
      newRating = <img style={{ width: "150px" }} alt="rating" src={FourLg} />;
      break;
    case 3.5:
      newRating = <img style={{ width: "150px" }} alt="rating" src={ThreeHalfLg} />;
      break;
    case 3:
      newRating = <img style={{ width: "150px" }} alt="rating" src={ThreeLg} />;
      break;
    case 2.5:
      newRating = <img style={{ width: "150px" }} alt="rating" src={TwoHalfLg} />;
      break;
    case 2:
      newRating = <img style={{ width: "150px" }} alt="rating" src={TwoLg} />;
      break;
    case 1.5:
      newRating = <img style={{ width: "150px" }} alt="rating" src={OneHalfLg} />;
      break;
    case 1:
      newRating = <img style={{ width: "150px" }} alt="rating" src={OneLg} />;
      break;
    default:
      newRating = <img alt="rating" src={ZeroLg} />;
      break;
  }

  function getRatingImage(rating) {
    switch (Math.floor(rating) + 0.5) {
      case 5 && 5.5:
        return <img style={{ width: "100px" }} alt="rating" src={FiveLg} />;

      case 4.5:
        return <img style={{ width: "100px" }} alt="rating" src={FourHalfLg} />;

      case 4:
        return <img style={{ width: "100px" }} alt="rating" src={FourLg} />;

      case 3.5:
        return <img style={{ width: "100px" }} alt="rating" src={ThreeHalfLg} />;

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

  const detectDevice = () => {
    let type = new MobileDetect(window.navigator.userAgent);
    if (type.os() === "iOS") {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setMapsUrl(`http://maps.apple.com/?saddr=${latitude},${longitude}&daddr=${details?.coordinates.latitude},${details?.coordinates.longitude}`);
        },
        (err) => console.log(err),
        { enableHighAccuracy: true }
      );
    } else if (type.os() !== "iOS") {
      setMapsUrl(`https://www.google.com/maps/dir/?api=1&destination=${details?.coordinates.latitude}%2C%20${details?.coordinates.longitude}`);
    }
  };

  useEffect(() => {
    detectDevice();
  });

  const openMaps = () => {
    window.open(mapsUrl);
  };

  const createNewTimeCreated = (timeCreated) => {
    const dateMinusTime = timeCreated.substring(0, 10);
    const yr = dateMinusTime.substring(0, 4);
    const day = dateMinusTime.substring(8, 10);
    const month = dateMinusTime.substring(5, 7);
    const newTimeCreated = `${month}/${day}/${yr}`;
    return newTimeCreated;
  };

  return (
    <>
      {isLoading ? (
        <Grid container justifyContent="center" sx={{ mt: "30vh" }}>
          <Oval height={80} width={80} color={"#81c784"} visible={true} ariaLabel="oval-loading" secondaryColor={"lightgrey"} strokeWidth={3} strokeWidthSecondary={3} />
        </Grid>
      ) : (
        <>
          {details ? (
            <>
              <div
                className="fade-in"
                style={{
                  backgroundImage: `url(${details?.image_url})`,
                  marginBottom: "48px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="filters">
                  <Container sx={{ pt: "60px", pb: "60px" }}>
                    <Grid container justifyContent="center">
                      <Grid item justifyContent="center" alignItems="start" direction="column" color={theme.palette.primary.contrastText}>
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
                        <Grid display="flex" direction="row" alignItems="center" style={{ marginBottom: "10px" }}>
                          {newRating}
                          <Typography
                            style={{
                              fontFamily: "Roboto",
                              marginLeft: "10px",
                            }}
                            color={theme.palette.primary.contrastText}
                          >{`${reviews?.total} reviews`}</Typography>
                        </Grid>
                        <Grid display="flex" direction="row" style={{ marginBottom: "15px" }}>
                          <Typography
                            style={{ fontFamily: "Roboto" }}
                            color={theme.palette.primary.contrastText}
                          >{`${details?.location.address1} ${details?.location.city}, ${details?.location.state}`}</Typography>
                        </Grid>
                        <Grid container display="flex" direction="row" justifyContent="start" alignItems="baseline">
                          <Fab variant="extended" style={{ backgroundColor: theme.palette.success.light, color: theme.palette.primary.contrastText, marginRight: "10px" }} onClick={() => openMaps()}>
                            <NavigationRoundedIcon sx={{ mr: 1 }} />
                            <Typography style={{ marginTop: "2px", marginRight: "5px" }} variant="button">
                              directions
                            </Typography>
                          </Fab>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Container>
                </div>
              </div>

              <Container
                className="fade-in"
                sx={{
                  mb: "48px",
                }}
              >
                {picsOrReviews ? (
                  <Grid container display="flex" direction="row" justifyContent="center">
                    <Button
                      variant="contained"
                      sx={{
                        ":hover": {
                          bgcolor: theme.palette.success.main,
                          color: theme.palette.primary.contrastText,
                        },
                        borderRadius: "10px 0px 0px 10px",
                        padding: "20px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                        backgroundColor: theme.palette.success.light,
                        color: theme.palette.primary.contrastText,
                      }}
                      onClick={() => setPicsOrReviews(true)}
                    >
                      Reviews
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        ":hover": {
                          bgcolor: theme.palette.success.main,
                          color: theme.palette.primary.contrastText,
                        },
                        borderRadius: "0px 10px 10px 0px",
                        padding: "20px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                        color: theme.palette.success.main,
                        backgroundColor: "white",
                      }}
                      onClick={() => setPicsOrReviews(false)}
                    >
                      Photos
                    </Button>
                  </Grid>
                ) : (
                  <Grid container display="flex" direction="row" justifyContent="center">
                    <Button
                      variant="contained"
                      sx={{
                        ":hover": {
                          bgcolor: theme.palette.success.main,
                          color: theme.palette.primary.contrastText,
                        },
                        borderRadius: "10px 0px 0px 10px",
                        padding: "20px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                        color: theme.palette.success.main,
                        backgroundColor: "white",
                      }}
                      onClick={() => setPicsOrReviews(true)}
                    >
                      Reviews
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        ":hover": {
                          bgcolor: theme.palette.success.main,
                          color: theme.palette.primary.contrastText,
                        },
                        borderRadius: "0px 10px 10px 0px",
                        padding: "20px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                        backgroundColor: theme.palette.success.light,
                        color: theme.palette.primary.contrastText,
                      }}
                      onClick={() => setPicsOrReviews(false)}
                    >
                      Photos
                    </Button>
                  </Grid>
                )}
              </Container>

              <Grid container className="fade-in">
                {picsOrReviews ? (
                  isSmallScreen ? (
                    <Grid container justifyContent="center">
                      {reviews?.reviews.map((item) => (
                        <Grid
                          item
                          key={item.id}
                          xs={11}
                          style={{
                            color: "white",
                            borderRadius: "5px",
                            padding: "15px",
                            marginBottom: "36px",
                            backgroundColor: theme.palette.success.light,
                          }}
                        >
                          <Grid item>
                            <Grid container alignItems="baseline">
                              <Typography variant="h6" sx={{ fontFamily: "TT norms pro" }}>
                                {item.user.name}
                              </Typography>
                              <Typography variant="body2" sx={{ fontFamily: "Roboto", ml: 1 }}>
                                {createNewTimeCreated(item.time_created)}
                              </Typography>
                            </Grid>
                            <Grid sx={{ mb: 0.5, mt: 0.5 }}>{getRatingImage(item.rating)}</Grid>
                            <Typography variant="body1" sx={{ fontFamily: "TT norms pro" }}>
                              {item.text}
                            </Typography>
                          </Grid>
                          <Grid container direction="row" justifyContent="end" sx={{ pt: 2, pr: 1 }}>
                            <Button
                              onClick={() => window.open(item.url)}
                              size="small"
                              sx={{
                                ":hover": {
                                  bgcolor: theme.palette.success.main,
                                  color: theme.palette.primary.contrastText,
                                  boxShadow: "none",
                                },
                                bgcolor: "#81c784",
                                color: "white",
                                boxShadow: "none",
                                pt: 0.8,
                              }}
                              variant="contained"
                            >
                              Go To Review
                            </Button>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Grid container justifyContent="center">
                      {reviews?.reviews.map((item) => (
                        <Grid
                          item
                          key={item.id}
                          xs={8}
                          style={{
                            color: "white",
                            borderRadius: "5px",
                            padding: "15px",
                            marginBottom: "36px",
                            backgroundColor: theme.palette.success.light,
                          }}
                        >
                          <Grid item>
                            <Grid container alignItems="baseline">
                              <Typography variant="h6" sx={{ fontFamily: "TT norms pro" }}>
                                {item.user.name}
                              </Typography>
                              <Typography variant="body2" sx={{ fontFamily: "Roboto", ml: 1 }}>
                                {createNewTimeCreated(item.time_created)}
                              </Typography>
                            </Grid>
                            <Grid sx={{ mb: 0.5, mt: 0.5 }}>{getRatingImage(item.rating)}</Grid>
                            <Typography variant="body1" sx={{ fontFamily: "Roboto" }}>
                              {item.text}
                            </Typography>
                          </Grid>
                          <Grid container direction="row" justifyContent="end" style={{ paddingTop: "15px", paddingRight: "10px" }}>
                            <Button
                              onClick={() => window.open(item.url)}
                              size="small"
                              sx={{
                                ":hover": {
                                  bgcolor: theme.palette.success.main,
                                  color: theme.palette.primary.contrastText,
                                  boxShadow: "none",
                                },
                                bgcolor: "#81c784",
                                color: "white",
                                boxShadow: "none",
                                pt: 0.8,
                              }}
                              variant="contained"
                            >
                              Go To Review
                            </Button>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  )
                ) : isSmallScreen ? (
                  <Grid container direction="column" alignItems="center">
                    {details?.photos.map((item, index) => (
                      <Grid item key={index}>
                        <img
                          alt={item}
                          src={item}
                          style={{
                            maxWidth: "100%",
                            marginBottom: "0px",
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Grid container direction="column" alignItems="center">
                    {details?.photos.map((item, index) => (
                      <Grid item key={index}>
                        <img
                          alt={item}
                          src={item}
                          style={{
                            maxHeight: "60vh",
                            maxWidth: "80vw",
                            borderRadius: "15px",
                            marginBottom: "36px",
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default Details;
