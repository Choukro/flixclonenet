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

const NetflixAppBar = () => {
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
  return (
    <nav>
      <AppBar style={appBarStyle}>
        <Toolbar>
          <Image
            className="nav__logo"
            src="/assets/netflix-logo.png"
            alt=""
            height={30}
            width={96}
          />
          <a href="/">
            <Typography style={margin10} variant="subtitle2">
              Acceuil
            </Typography>
          </a>
          <a href="/series">
            <Typography style={margin10} variant="subtitle2">
              Serie
            </Typography>
          </a>
          <a href="/movies">
            <Typography style={margin10} variant="subtitle2">
              Films
            </Typography>
          </a>
          <a href="/news">
            <Typography style={margin10} variant="subtitle2">
              Nouveautés les plus regardées
            </Typography>
          </a>
          <a href="/list">
            <Typography style={margin10} variant="subtitle2">
              Ma liste
            </Typography>
          </a>
          <Image
            src="/assets/netflix-avatar.png"
            alt=""
            height={30}
            width={96}
            className="nav__avatar"
          />
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export { NetflixAppBar };
