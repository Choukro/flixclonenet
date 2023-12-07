/**
 * NetflixRow.jsx
 *
 * @param
 * @returns
 */

"use client";

import * as React from "react";
import { NetflixRowView } from "./NetFlixRowView.jsx";
import { TYPE_MOVIE } from "../../_utils/constants.js";
import { RowSkeleton } from "../skeletons/RowSkeleton.jsx";
import { getMoviesFilterQueryFn } from "../../_queryFns/getMoviesFilterQueryFn";
import { useQuery } from "@tanstack/react-query";

const NetflixRow = ({
  title = "",
  wideImage = true,
  type = TYPE_MOVIE,
  param,
  filter = "populaire",
  watermark = false,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["moviesFilter", type, filter, param],
    queryFn: () => getMoviesFilterQueryFn(type, filter, param),
  });
  console.log("%c Row data isLoading", "color: red", isLoading);
  if (!data?.results && isLoading) {
    return <RowSkeleton title={title} wideImage={wideImage} />;
  }
  return (
    <NetflixRowView
      data={data.results}
      title={title}
      type={type}
      wideImage={wideImage}
      watermark={watermark}
    />
  );
};

export { NetflixRow };
