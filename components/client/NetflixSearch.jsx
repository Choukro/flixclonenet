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
import { NetflixAppBar } from "./NetflixAppBar.jsx";

// export async function getStaticProps({ params }) {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ["searchMovies", params.query],
//     queryFn: () => getSearchMoviesQueryFn(params.query),
//   });

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

const NetflixSearch = () => {
  let query = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["searchMovies", query.query],
    queryFn: () => getSearchMoviesQueryFn(query.query),
  });
  const { data: defaultMovie } = useQuery({
    queryKey: ["headerMovie"],
    queryFn: () => getMovieQueryFn(),
  });
  console.log("%c Header of NetflixSearch isLoading", "color: red", isLoading);
  if (isLoading) {
    return <HeaderSkeleton></HeaderSkeleton>;
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
  const movies = data.results.filter(
    (result) => result.media_type === TYPE_MOVIE
  );
  const series = data.results.filter((result) => result.media_type === TYPE_TV);
  return (
    <>
      <NetflixAppBar />
      {data?.length === 0 ? (
        <div className="row">
          <h2>Pas de résultat</h2>
        </div>
      ) : (
        <>
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
              <p className="synopsis">{headerMovie?.overview ?? "..."}</p>
            </div>
            <div className="banner--fadeBottom"></div>
          </header>
          <NetflixRowView
            data={movies}
            wideImage={true}
            watermark={false}
            type={TYPE_MOVIE}
            filter="trending"
            title="Films correspondants"
          />
          <NetflixRowView
            data={series}
            wideImage={false}
            watermark={false}
            type={TYPE_TV}
            filter="trending"
            title="Série correspondantes"
          />
        </>
      )}
    </>
  );
};

// const NetflixSearchRoute = ({ dehydratedState }) => {
//   return (
//     <HydrationBoundary state={dehydratedState}>
//       <NetflixSearch />
//     </HydrationBoundary>
//   );
// };

// export { NetflixSearchRoute };

export { NetflixSearch };
