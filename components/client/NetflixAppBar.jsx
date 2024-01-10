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
import Tooltip from "@mui/material/Tooltip";
import { NetflixAppBarToggle } from "./NetflixAppBarToggle";

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  paddingRight: "0px !important",
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
            src="/assets/netflix-logo.svg"
            alt="Logo Netflix"
            height={30}
            width={96}
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
              onKeyDown={handleKeyPress}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder="Rechercher"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Tooltip title="Se déconnecter">
            <Image
              src="/assets/netflix-avatar.png"
              alt="Avatar profil"
              height={30}
              width={96}
              className="nav__avatar"
              onClick={async () => {
                const data = await signOut({
                  redirect: false,
                  callbackUrl: "/auth",
                });
                router.push(data.url);
              }}
            />
          </Tooltip>
        </DesktopToolbar>
        <MobileToolbar>
          <NetflixAppBarToggle />
        </MobileToolbar>
      </CustomAppBar>
    </nav>
  );
};

export { NetflixAppBar };
