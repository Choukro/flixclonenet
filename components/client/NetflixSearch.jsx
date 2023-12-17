/**
 * NetflixSearch.jsx
 *
 * @param
 * @returns
 */

"use client";

import * as React from "react";
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
import { NetflixRowView } from "./NetFlixRowView.jsx";
import { useParams } from "next/navigation";
import { imagePathOriginal } from "../../_utils/constants.js";
import Link from "next/link";

export async function getStaticProps(params) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["searchMovies", params.query],
    queryFn: () => getSearchMoviesQueryFn(params.query),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const NetflixSearch = () => {
  let query = useParams();
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["searchMovies", query.query],
    queryFn: () => getSearchMoviesQueryFn(query.query),
  });
  const { data: defaultMovie } = useQuery({
    queryKey: ["headerMovie"],
    queryFn: () => getMovieQueryFn(),
  });
  if (isError) {
    console.log(
      `%c Query error (searchMovies, ${query.query}) :`,
      "color: red",
      isError
    );
    console.log(
      `Error message (searchMovies, ${query.query}) :`,
      error.message
    );
  }
  // console.log("%c Header of NetflixSearch isLoading", "color: red", isLoading);
  if (isLoading || !defaultMovie) {
    return <HeaderSkeleton></HeaderSkeleton>;
  }
  if (isSuccess) {
    console.log(
      `%c Query success (searchMovies, ${query.query} | Results : ${data?.results.length}) :`,
      "color: green",
      isSuccess
    );
  }
  const headerMovie = data?.results[0] ?? defaultMovie;
  const imageUrl = `${imagePathOriginal}${headerMovie?.backdrop_path}`;
  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center top",
    color: "white",
    objectFit: "contain",
    height: "1000px",
    marginBottom: "-140px",
  };
  const title = headerMovie?.title ? headerMovie?.title : headerMovie?.name;
  const searchType = headerMovie?.title ? TYPE_MOVIE : TYPE_TV;
  const movies = data.results.filter(
    (result) => result.media_type === TYPE_MOVIE
  );
  const series = data.results.filter((result) => result.media_type === TYPE_TV);
  return (
    <>
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
          <p className="synopsis">{headerMovie?.overview ?? "..."}</p>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
      {data?.results.length === 0 ? (
        <>
          <div className="row">
            <div className="row__noResult">Pas de résultat...</div>
          </div>
          <div
            className="banner__buttons"
            style={{
              justifyContent: "center",
              marginTop: "1.5rem",
              marginBottom: "4rem",
            }}
          >
            <Link href="/">
              <button className="banner__button banner__buttonplay">
                Accueil
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          {movies?.length === 0 ? (
            <>
              <div
                className="row"
                style={{
                  marginBottom: "6rem",
                }}
              >
                <h2>Films correspondants : pas de résultat...</h2>
              </div>
            </>
          ) : (
            <NetflixRowView
              data={movies}
              wideImage={true}
              watermark={false}
              type={TYPE_MOVIE}
              filter="trending"
              title="Films correspondants"
            />
          )}
          {series?.length === 0 ? (
            <>
              <div
                className="row"
                style={{
                  marginBottom: "6rem",
                }}
              >
                <h2>Séries correspondantes : pas de résultat...</h2>
              </div>
            </>
          ) : (
            <NetflixRowView
              data={series}
              wideImage={false}
              watermark={false}
              type={TYPE_TV}
              filter="trending"
              title="Série correspondantes"
            />
          )}
        </>
      )}
    </>
  );
};

const NetflixSearchRoute = ({ dehydratedState }) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <NetflixSearch />
    </HydrationBoundary>
  );
};

export { NetflixSearchRoute };

// export { NetflixSearch };
