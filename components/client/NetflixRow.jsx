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
import {
  dehydrate,
  QueryClient,
  useQuery,
  HydrationBoundary,
} from "@tanstack/react-query";

export async function getStaticProps({ type, filter, param }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["moviesFilter", type, filter, param],
    queryFn: () => getMoviesFilterQueryFn(type, filter, param),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const NetflixRow = ({
  title = "",
  wideImage = true,
  type = TYPE_MOVIE,
  param,
  filter = "populaire",
  watermark = false,
}) => {
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["moviesFilter", type, filter, param],
    queryFn: () => getMoviesFilterQueryFn(type, filter, param),
  });
  if (isError) {
    console.log(
      `%c Query error (moviesFilter, ${type}, ${filter}, ${
        param ? param : "no paramater"
      }) :`,
      "color: red",
      isError
    );
    console.log(
      `Error message (moviesFilter, ${type}, ${filter}, ${
        param ? param : "no paramater"
      }) :`,
      error.message
    );
  }

  // if (!data?.results && isLoading) {
  if (isLoading) {
    return <RowSkeleton title={title} wideImage={wideImage} />;
  }
  if (isSuccess) {
    console.log(
      `%c Query success (moviesFilter, ${type}, ${filter}, ${
        param ? param : "no paramater"
      }) :`,
      "color: green",
      isSuccess
    );
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

const NetflixRowRoute = ({
  dehydratedState,
  wideImage,
  watermark,
  type,
  filter,
  title,
  param,
}) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <NetflixRow
        type={type}
        wideImage={wideImage}
        watermark={watermark}
        filter={filter}
        title={title}
        param={param}
      />
    </HydrationBoundary>
  );
};

export { NetflixRowRoute };
