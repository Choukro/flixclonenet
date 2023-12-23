/**
 * NetflixBookmark.jsx
 *
 * @param
 * @returns
 */

"use client";

import React from "react";
import { Play } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { Info } from "lucide-react";
import { HeaderSkeleton } from "../skeletons/HeaderSkeletons.jsx";
import {
  dehydrate,
  QueryClient,
  useQuery,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getMovieQueryFn } from "@/_queryFns/getMovieQueryFn.js";
import { TYPE_MOVIE, TYPE_TV } from "../../_utils/constants.js";
import { useRouter } from "next/navigation";
import { imagePathOriginal } from "../../_utils/constants.js";
import { RowCard } from "./NetFlixRowView.jsx";
import { RowSkeleton } from "../skeletons/RowSkeleton.jsx";
import useFavorites from "../../hooks/useFavorites";
// import CircularProgress from "@mui/material/CircularProgress";

export async function getStaticProps({ type, id }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movieList", type, id],
    queryFn: () => getMovieQueryFn(type, filter, param),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const NetflixBookmark = (dehydratedState) => {
  const { data } = useFavorites();
  const id = data?.movies?.[0] ?? 749274;
  const router = useRouter();
  const type = TYPE_MOVIE;
  const {
    data: movieHeader,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["movieHeader", type, id],
    queryFn: () => getMovieQueryFn(type, id),
  });

  if (isError) {
    console.log(
      `%c Query error (movieHeader, ${type}, ${id}) :`,
      "color: red",
      isError
    );
    console.log(`Error message (movieHeader, ${type}, ${id}) :`, error.message);
    router.push("/404");
    return null;
  }
  if (isLoading) {
    return (
      <>
        <HeaderSkeleton />
        <RowSkeleton />
      </>
    );
  }
  if (isSuccess) {
    console.log(
      `%c Query success (movieHeader, ${type}, ${id}) :`,
      "color: green",
      isSuccess
    );
  }
  const imagePath = movieHeader?.backdrop_path
    ? movieHeader.backdrop_path
    : movieHeader.poster_path;
  const imageUrl = `${imagePathOriginal}${imagePath}`;
  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center top",
    color: "white",
    height: "1000px",
    marginBottom: "-140px",
  };
  const title = type === TYPE_MOVIE ? movieHeader?.title : movieHeader?.name;
  const searchType = movieHeader?.title ? TYPE_MOVIE : TYPE_TV;
  return (
    <>
      <header className="banner" style={banner}>
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
          <p className="synopsis">{movieHeader?.overview ?? "..."}</p>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
      {data?.movies.length === 0 && data?.series.length === 0 ? (
        <div className="row">
          <h2>Aucun favoris</h2>
        </div>
      ) : (
        <>
          <div className="row">
            <h2>Films favoris</h2>
            <div className="cards">
              {data?.movies.map((id) => {
                return (
                  <Card
                    key={id}
                    id={id}
                    type={TYPE_MOVIE}
                    watermark={false}
                    wideImage={true}
                    dehydratedState={dehydratedState}
                  />
                );
              })}
            </div>
          </div>

          <div className="row">
            <h2>Séries favorites</h2>
            <div className="cards">
              {data?.series.map((id) => {
                return (
                  <Card
                    key={id}
                    id={id}
                    type={TYPE_TV}
                    watermark={false}
                    wideImage={false}
                    dehydratedState={dehydratedState}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const Card = ({ id, type, watermark, wideImage, dehydratedState }) => {
  const {
    data: movieById,
    isError,
    isSuccess,
    // isLoading: isMovieLoading,
    error,
  } = useQuery({
    queryKey: ["movieList", type, id],
    queryFn: () => getMovieQueryFn(type, id),
  });

  if (isError) {
    console.log(
      `%c Query error (movieList, ${type}, ${id}) :`,
      "color: red",
      isError
    );
    console.log(`Error message (movieList, ${type}, ${id}) :`, error.message);
    router.push("/404");
    return null;
  }
  //   if (isMovieLoading) {
  //     return <CircularProgress style={{ color: "red" }} />;
  //   }
  if (isSuccess) {
    console.log(
      `%c Query success (movieList, ${type}, ${id}) :`,
      "color: green",
      isSuccess
    );
  }
  return (
    <HydrationBoundary state={dehydratedState}>
      <RowCard
        movie={movieById}
        type={type}
        watermark={watermark}
        wideImage={wideImage}
      />
    </HydrationBoundary>
  );
};

export { NetflixBookmark };
