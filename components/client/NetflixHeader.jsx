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
import { imagePathOriginal, TYPE_MOVIE } from "../../_utils/constants.js";
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
  const { data: movie, isLoading } = useQuery({
    queryKey: ["headerMovie", type],
    queryFn: () => getMovieQueryFn(type),
  });
  const title = movie?.title ? movie?.title : movie?.name;
  // console.log("movie", movie);
  console.log("%c Header of NetflixApp isLoading", "color: red", isLoading);
  // if (isLoading) return <div style={{ color: "white" }}>Loading...</div>;
  // if (!headerMovie) return <div style={{ color: "white" }}>Not found</div>;
  // const title = type === TYPE_MOVIE ? movie?.title : movie?.name;
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
  if (!movie || movie === null) {
    return <HeaderSkeleton></HeaderSkeleton>;
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

const NetflixHeaderRoute = ({ dehydratedState, type }) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <NetflixHeader type={type} />
    </HydrationBoundary>
  );
};

export { NetflixHeaderRoute };
