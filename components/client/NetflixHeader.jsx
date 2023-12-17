/**
 * NetflixHeader.jsx
 *
 * @param
 * @returns
 */

"use client";

import * as React from "react";
import { Play } from "lucide-react";
import { Info } from "lucide-react";
import { PlusCircle } from "lucide-react";
import {
  imagePathOriginal,
  TYPE_MOVIE,
  TYPE_TV,
} from "../../_utils/constants.js";
import { HeaderSkeleton } from "../skeletons/HeaderSkeletons.jsx";
import {
  dehydrate,
  QueryClient,
  useQuery,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getMovieQueryFn } from "@/_queryFns/getMovieQueryFn.js";

export async function getStaticProps({ type }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["headerMovie", type],
    queryFn: () => getMovieQueryFn(type),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const NetflixHeader = ({ type }) => {
  const {
    data: movie,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["headerMovie", type],
    queryFn: () => getMovieQueryFn(type),
  });

  if (isError) {
    console.log(
      `%c Query error (headerMovie, ${type ? type : "no type"}) :`,
      "color: red",
      isError
    );
    console.log(
      `Error message (headerMovie, ${type ? type : "no type"}) :`,
      error.message
    );
  }
  // if (!movie || movie === null) {
  if (isLoading) {
    return <HeaderSkeleton></HeaderSkeleton>;
  }
  if (isSuccess) {
    console.log(
      `%c Query success (headerMovie, ${type ? type : "no type"}) :`,
      "color: green",
      isSuccess
    );
  }
  const title = movie?.title ? movie?.title : movie?.name;
  // if (isLoading) return <div style={{ color: "white" }}>Loading...</div>;
  // if (!headerMovie) return <div style={{ color: "white" }}>Not found</div>;
  // const title = type === TYPE_MOVIE ? movie?.title : movie?.name;
  const searchType = movie?.title ? TYPE_MOVIE : TYPE_TV;
  const imageUrl = `${imagePathOriginal}${movie?.backdrop_path}`;
  const banner = {
    // backgroundImage: `url('${imageUrl}')`,
    // backgroundSize: "cover",
    // // backgroundPosition: "50%",
    // color: "white",
    // width: "100%",
    // position: "absolute",
    // top: "0",
    // right: "0",
    // bottom: "0",
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center top",
    color: "white",
    objectFit: "contain",
    height: "1000px",
    marginBottom: "-140px",
  };
  return (
    <header style={banner}>
      <div className="banner__contents">
        <h1 className="banner__title">{title ?? "..."}</h1>
        <div className="banner__buttons">
          <a
            href={`https://www.youtube.com/results?search_query=${searchType}%20${title}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <button className="banner__button banner__buttonplay">
              <Play fill="#111" />
              <span>Lecture</span>
            </button>
          </a>
          <a
            href={`https://www.google.com/search?q=${searchType}%20${title}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <button className="banner__button banner__buttonInfo">
              <Info />
            </button>
          </a>
          <button className="banner__button banner__buttonInfo">
            <PlusCircle />
          </button>
        </div>
        <p className="synopsis">{movie?.overview ?? "..."}</p>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

const NetflixHeaderRoute = ({ dehydratedState, type }) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <NetflixHeader type={type} />
    </HydrationBoundary>
  );
};

export { NetflixHeaderRoute };
