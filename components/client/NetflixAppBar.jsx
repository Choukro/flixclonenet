/**
 * NetflixAppBar.jsx
 *
 * @param
 * @returns
 */
"use client";

import * as React from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { NetflixAppBarToggle } from "./NetflixAppBarToggle";
import logo from "../../public/assets/netflix-logo.svg";
import avatar from "../../public/assets/netflix-avatar.png";
import { Tooltip } from 'react-tooltip'


const CustomAppBar = styled(AppBar)(() => ({
  paddingRight: "0px !important",
  // minWidth: "100vw",

}));

const DesktopToolbar = styled(Toolbar)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const MobileToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const Search = styled("div")(({ theme }) => ({
  marginRight: "10px",
  marginLeft: "auto",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    /*marginLeft: theme.spacing(1),*/
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

const NetflixAppBar = () => {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [appBarStyle, setAppBarStyle] = React.useState({
    background: "transparent",
    boxShadow: "none",
  });
  React.useEffect(() => {
    const onScroll = (e) => {
      if (e.target.documentElement.scrollTop >= 100) {
        setAppBarStyle({
          background: "#111",
          transition: "background .5s ease-out",
          boxShadow: "none",
        });
      } else {
        setAppBarStyle({
          background: "transparent",
          transition: "background .5s ease-out",
          boxShadow: "none",
        });
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const margin10 = { margin: 10 };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      router.push(`/search/${query}`);
    }
  };
  return (
    <nav>
      <CustomAppBar style={appBarStyle}>
        <DesktopToolbar>
          <Image
            className="nav__logo"
            src={logo}
            alt="Logo Netflix"
          />
          <Link href="/">
            <Typography style={margin10} variant="subtitle2">
              Acceuil
            </Typography>
          </Link>
          <Link href="/tv">
            <Typography style={margin10} variant="subtitle2">
              Series
            </Typography>
          </Link>
          <Link href="/movie">
            <Typography style={margin10} variant="subtitle2">
              Films
            </Typography>
          </Link>
          <Link href="/news">
            <Typography style={margin10} variant="subtitle2">
              Nouveautés
            </Typography>
          </Link>
          <Link href="/bookmark">
            <Typography style={margin10} variant="subtitle2">
              Ma liste
            </Typography>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              id="search"
              name="search"
              onKeyDown={handleKeyPress}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder="Rechercher"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <a 
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Se déconnecter"
              data-tooltip-place="top"
          >
            <Image
              src={avatar}
              alt="Avatar profil"

              className="nav__avatar"
              onClick={async () => {
                const data = await signOut({
                  redirect: false,
                  callbackUrl: "/auth",
                });
                router.push(data.url);
              }}
            />
            </a>
          <Tooltip id="my-tooltip" />
        </DesktopToolbar>
        <MobileToolbar>
          <NetflixAppBarToggle />
        </MobileToolbar>
      </CustomAppBar>
    </nav>
  );
};

export { NetflixAppBar };
