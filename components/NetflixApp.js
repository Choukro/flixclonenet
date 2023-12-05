"use client";

import React from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "../components/Netflix.css";
import "../app/globals.css";
import { Play } from "lucide-react";
import { PlusCircle } from "lucide-react";

const NetflixApp = () => {
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
    <div>
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

      <header className="banner">
        <div className="banner__contents">
          <h1 className="banner__title">La casa de papel</h1>
          <div className="banner__buttons">
            <button className="banner__button banner__buttonplay">
              <Play fill="#111" />
              <span>Lecture</span>
            </button>
            <button className="banner__button banner__buttonInfo">
              <PlusCircle />
              <span>Ajouter à ma liste</span>
            </button>
          </div>
          <p className="synopsis">
            Le Professeur recrute une jeune braqueuse et sept autres criminels
            en vue d&apos;un cambriolage grandiose ciblant la Maison royale de
            la Monnaie d&apos;Espagne.
          </p>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>

      <div className="row">
        <h2 className="row__title">Films Netflix</h2>
        <div className="row__posters">
          <Image
            className="row__poster row__posterLarge"
            src="/assets/sample.jpg"
            alt=""
            height={250}
            width={360}
          />
          <Image
            className="row__poster row__posterLarge"
            src="/assets/sample1.jpg"
            alt=""
            height={250}
            width={360}
          />
          <Image
            className="row__poster row__posterLarge"
            src="/assets/sample.jpg"
            alt=""
            height={250}
            width={360}
          />
          <Image
            className="row__poster row__posterLarge"
            src="/assets/sample1.jpg"
            alt=""
            height={250}
            width={360}
          />
        </div>
      </div>
      <div className="row">
        <h2 className="row__title">Série Netflix</h2>
        <div className="row__posters">
          <Image
            className="row__poster row__posterLarge"
            src="/assets/sample-poster.jpg"
            alt=""
            height={300}
            width={450}
          />
          <Image
            className="row__poster row__posterLarge"
            src="/assets/sample-poster1.jpg"
            alt=""
            height={300}
            width={450}
          />
          <Image
            className="row__poster row__posterLarge"
            src="/assets/sample-poster.jpg"
            alt=""
            height={300}
            width={450}
          />
          <Image
            className="row__poster row__posterLarge"
            src="/assets/sample-poster1.jpg"
            alt=""
            height={300}
            width={450}
          />
        </div>
      </div>

      <footer className="footer">2023 - FlixClone.net</footer>
    </div>
  );
};
export { NetflixApp };
