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
import { NetflixHeader } from "./NetflixHeader";
import { getRandomType, getRandomId } from "../_utils/helper.js";
import { TYPE_MOVIE } from "../_utils/constants.js";
import { getMoviesQueryFn } from "../_queryFns/getMoviesQueryFn.js";
import { useQuery } from "@tanstack/react-query";

const NetflixApp = () => {
  const [type] = React.useState(getRandomType());
  const defaultMovieId = getRandomId(type);
  const { data: headerMovie, isLoading } = useQuery({
    queryKey: ["headerMovie"],
    queryFn: () => getMoviesQueryFn(type, defaultMovieId),
  });
  console.log("%c isLoading", "color: red", isLoading);
  if (isLoading) return <div>Loading...</div>;
  if (!headerMovie) return <div>Not found</div>;
  return (
    <div>
      <NetflixAppBar />
      <NetflixHeader movie={headerMovie} type={TYPE_MOVIE} />
      <NetflixRow wideImage={false} title="Films Netflix" />
      <NetflixRow wideImage={true} title="Série Netflix" />
      <NetFlixFooter />
    </div>
  );
};
export { NetflixApp };
