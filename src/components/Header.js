import * as React from "react";
import { useMediaQuery } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafeRounded";
import SearchIcon from "@mui/icons-material/Search";
import { Formik } from "formik";
import { searchCoffeeData } from "../api";
import { APIKEY } from "../App";
import { Button, IconButton } from "@mui/material";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import { useNavigate, useLocation } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header({ setLoaded, setInfo, setIsLoading, handleClick }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const navigate = useNavigate();
  const location = useLocation();

  const toHomePage = () => {
    navigate("/");
  };

  const toHomeThenSearch = () => {
    if (location.pathname !== "/") {
      navigate("/");
      handleClick();
    } else {
      handleClick();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        <Toolbar>
          <Icon
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 3.5, ml: 1 }}
            onClick={() => {
              toHomePage();
            }}
          >
            <LocalCafeRoundedIcon />
          </Icon>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            onClick={() => {
              toHomePage();
            }}
          >
            CoffeeFinder
          </Typography>
          {isSmallScreen ? (
            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 1.5 }} onClick={toHomeThenSearch}>
              <NearMeRoundedIcon />
            </IconButton>
          ) : (
            <Button variant="" onClick={toHomeThenSearch}>
              Search Nearby
            </Button>
          )}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Formik
              initialValues={{ location: "" }}
              onSubmit={(values) => {
                if (values.location === "" || values.location === null) {
                  return false;
                }
                setIsLoading(true);
                searchCoffeeData(APIKEY, values.location).then((res) => {
                  setInfo(res.businesses);
                  setIsLoading(false);
                });
                setLoaded(true);
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <StyledInputBase name="location" value={values.location} onChange={handleChange} placeholder="Search in…" inputProps={{ "aria-label": "search" }} />
                </form>
              )}
            </Formik>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
