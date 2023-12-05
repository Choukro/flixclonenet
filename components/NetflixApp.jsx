/**
 * NetflixApp.jsx
 *
 * @param
 * @returns
 */

"use client";

import * as React from "react";
import "../components/Netflix.css";
import "../app/globals.css";
import { NetflixAppBar } from "./NetflixAppBar";
import { NetflixRow } from "./NetflixRow";
import { NetFlixFooter } from "./NetFlixFooter";
import { Play } from "lucide-react";
import { PlusCircle } from "lucide-react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const NetflixHeader = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`;
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
        <h1 className="banner__title">{movie?.title ?? "..."}</h1>
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

const NetflixApp = () => {
  const defaultMovieId = 399566;
  const apiKey = "13641cf5a1605b3239be01094a3002dd";
  const lang = "fr-fr";
  const {
    data: headerMovie,
    error,
    isLoading,
  } = useSWR(
    `https://api.themoviedb.org/3/movie/${defaultMovieId}?api_key=${apiKey}&language=${lang}`,
    fetcher
  );
  if (error) return <div>échec du chargement</div>;
  if (isLoading) return <div>chargement...</div>;
  return (
    <div>
      <NetflixAppBar />
      <NetflixHeader movie={headerMovie} />
      <NetflixRow wideImage={false} title="Films Netflix" />
      <NetflixRow wideImage={true} title="Série Netflix" />
      <NetFlixFooter />
    </div>
  );
};
export { NetflixApp };
