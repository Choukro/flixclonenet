/**
 * NetflixById.jsx
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
  useQuery,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getSearchMoviesQueryFn } from "@/_queryFns/getSearchMoviesQueryFn.js";
import { getMovieQueryFn } from "@/_queryFns/getMovieQueryFn.js";
import { TYPE_MOVIE, TYPE_TV } from "../../_utils/constants.js";
import { useParams, usePathname, useRouter } from "next/navigation";
import { imagePathOriginal } from "../../_utils/constants.js";
import { RowCard } from "./NetFlixRowView.jsx";
import { PosterSkeleton } from "../skeletons/PosterSkeleton.jsx";

export async function getStaticProps(params) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movieById", params.id],
    queryFn: () => getSearchMoviesQueryFn(params.id),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const NetflixById = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const pathname = usePathname();
  const type = pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE;
  const {
    data: movieById,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["movieById", type, id],
    queryFn: () => getMovieQueryFn(type, id),
  });

  if (isError) {
    console.log(
      `%c Query error (movieById, ${type}, ${id}) :`,
      "color: red",
      isError
    );
    console.log(`Error message (movieById, ${type}, ${id}) :`, error.message);
    router.push("/404");
    return null;
  }
  if (isLoading) {
    return (
      <>
        <HeaderSkeleton />
        <PosterSkeleton />
      </>
    );
  }
  if (isSuccess) {
    console.log(
      `%c Query success (movieById, ${type}, ${id}) :`,
      "color: green",
      isSuccess
    );
  }
  const imagePath = movieById?.backdrop_path
    ? movieById.backdrop_path
    : movieById.poster_path;
  const imageUrl = `${imagePathOriginal}${imagePath}`;
  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center top",
    color: "white",
    height: "1000px",
    marginBottom: "-140px",
  };
  const title = type === TYPE_MOVIE ? movieById?.title : movieById?.name;
  const typeSearch = type === TYPE_MOVIE ? "du film" : "de la série";
  const searchType = movieById?.title ? TYPE_MOVIE : TYPE_TV;
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
          <p className="synopsis__byId">{movieById?.overview ?? "..."}</p>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
      <div
        className="row"
        style={{
          marginBottom: "3rem",
          marginTop: "3rem",
        }}
      >
        <h2>Affiche&nbsp;{typeSearch}</h2>
        <div className="row__posters">
          <RowCard
            movie={movieById}
            type={type}
            watermark={false}
            wideImage={false}
          />
        </div>
      </div>
    </>
  );
};

const NetflixByIdRoute = ({ dehydratedState }) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <NetflixById />
    </HydrationBoundary>
  );
};

export { NetflixByIdRoute };
