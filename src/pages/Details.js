import { fetchDetails, fetchReviews } from "../api";
import { APIKEY } from "../App";
import { useEffect, useState } from "react";
import { Container, Typography, Grid, Link, useTheme } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import "../fonts.css";
import { ZeroLg, OneLg, OneHalfLg, TwoLg, TwoHalfLg, ThreeLg, ThreeHalfLg, FourLg, FourHalfLg, FiveLg } from "../assets/images";

const Details = () => {
  const [details, setDetails] = useState();
  const [reviews, setReviews] = useState();

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

  if (details?.rating === 5) {
    newRating = <img style={{ width: "150px" }} alt="rating" src={FiveLg} />;
  } else if (details?.rating === 4.5) {
    newRating = <img style={{ width: "150px" }} alt="rating" src={FourHalfLg} />;
  } else if (details?.rating === 4) {
    newRating = <img style={{ width: "150px" }} alt="rating" src={FourLg} />;
  } else if (details?.rating === 3.5) {
    newRating = <img style={{ width: "150px" }} alt="rating" src={ThreeHalfLg} />;
  } else if (details?.rating === 3) {
    newRating = <img style={{ width: "150px" }} alt="rating" src={ThreeLg} />;
  } else if (details?.rating === 2.5) {
    newRating = <img style={{ width: "150px" }} alt="rating" src={TwoHalfLg} />;
  } else if (details?.rating === 2) {
    newRating = <img style={{ width: "150px" }} alt="rating" src={TwoLg} />;
  } else if (details?.rating === 1.5) {
    newRating = <img style={{ width: "150px" }} alt="rating" src={OneHalfLg} />;
  } else if (details?.rating === 1) {
    newRating = <img style={{ width: "150px" }} alt="rating" src={OneLg} />;
  } else {
    newRating = <img alt="rating" src={ZeroLg} />;
  }

  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <Grid container justifyContent="center" style={{ marginTop: "85px" }}>
          <Oval height={80} width={80} color="#add8e6" visible={true} ariaLabel="oval-loading" secondaryColor="##2E2EFF" strokeWidth={3} strokeWidthSecondary={3} />
        </Grid>
      ) : (
        <>
          <div style={{ backgroundImage: `url(${details?.image_url})`, marginBottom: "36px", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="filters">
              <Container style={{ paddingTop: "80px" }}>
                <Grid container display="flex" direction="row" justifyContent="center" style={{ paddingBottom: "80px" }}>
                  <Grid item display="flex" justifyContent="center" alignItems="start" direction="column" color="white">
                    <Typography variant="h4" style={{ fontFamily: "TT norms pro", fontWeight: "500", marginBottom: "15px" }}>
                      {details?.name}
                    </Typography>
                    <Grid display="flex" direction="row" alignItems="center" style={{ marginBottom: "10px" }}>
                      {newRating}
                      <Typography style={{ fontFamily: "TT norms pro", marginLeft: "10px" }}>{`${reviews?.total} reviews`}</Typography>
                    </Grid>
                    <Grid display="flex" direction="row">
                      <Typography style={{ fontFamily: "TT norms pro" }}>{`${details?.location.address1} ${details?.location.city}, ${details?.location.state}`}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </div>

          <Container>
            <Grid container>
              {reviews?.reviews.map((item) => (
                <Grid key={item.id} xs={12} style={{ color: "white", borderRadius: "15px", padding: "15px", marginBottom: "15px", backgroundColor: theme.palette.primary.main }}>
                  <Grid item>
                    <Typography style={{ fontFamily: "TT norms pro" }}>{item.user.name}</Typography>
                    <Typography style={{ fontFamily: "TT norms pro" }}>{item.time_created}</Typography>
                    <Typography style={{ fontFamily: "TT norms pro" }}>{item.text}</Typography>
                  </Grid>
                  <Grid container direction="row" justifyContent="end" style={{ paddingTop: "15px", paddingRight: "10px" }}>
                    <Link href={item.url} color="inherit" underline="none">
                      See Full Review
                    </Link>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default Details;
