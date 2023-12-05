"use client";

import * as React from "react";
import "../components/Netflix.css";
import "../app/globals.css";
import { NetflixAppBar } from "./NetflixAppBar";
import { NetflixRow } from "./NetflixRow";
import { NetFlixFooter } from "./NetFlixFooter";
import { Play } from "lucide-react";
import { PlusCircle } from "lucide-react";

const NetflixHeader = () => {
  return (
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
          Le Professeur recrute une jeune braqueuse et sept autres criminels en
          vue d&apos;un cambriolage grandiose ciblant la Maison royale de la
          Monnaie d&apos;Espagne.
        </p>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

const NetflixApp = () => {
  return (
    <div>
      <NetflixAppBar />
      <NetflixHeader />
      <NetflixRow wideImage={false} title="Films Netflix" />
      <NetflixRow wideImage={true} title="Série Netflix" />
      <NetFlixFooter />
    </div>
  );
};
export { NetflixApp };
