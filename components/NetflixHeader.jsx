/**
 * NetflixHeader.jsx
 *
 * @param
 * @returns
 */

"use client";

import * as React from "react";
import { Play } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { imagePathOriginal, TYPE_MOVIE } from "../_utils/constants.js";

const NetflixHeader = ({ movie, type = TYPE_MOVIE }) => {
  const title = type === TYPE_MOVIE ? movie?.title : movie?.name;
  const imageUrl = `${imagePathOriginal}${movie?.backdrop_path}`;
  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    color: "white",
    objectFit: "contain",
    height: "600px",
  };
  if (!movie) {
    return <></>;
  }
  return (
    <header style={banner}>
      <div className="banner__contents">
        <h1 className="banner__title">{title ?? "..."}</h1>
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
        <p className="synopsis">{movie?.overview ?? "..."}</p>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export { NetflixHeader };
