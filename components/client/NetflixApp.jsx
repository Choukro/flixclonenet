/**
 * NetflixApp.jsx
 *
 * @param
 * @returns
 */
"use client";

import * as React from "react";
import "./Netflix.css";
import "../../app/globals.css";
import { NetflixAppBar } from "./NetflixAppBar.jsx";
import { NetflixRow } from "./NetflixRow.jsx";
import { NetFlixFooter } from "./NetFlixFooter.jsx";
import { NetflixHeader } from "./NetflixHeader.jsx";
import { TYPE_MOVIE, TYPE_TV } from "../../_utils/constants.js";
import { getMovieQueryFn } from "../../_queryFns/getMovieQueryFn.js";
import { useQuery } from "@tanstack/react-query";
// import { QueryClient, dehydrate } from "@tanstack/react-query";

const NetflixApp = () => {
  const { data: headerMovie, isLoading } = useQuery({
    queryKey: ["headerMovie"],
    queryFn: () => getMovieQueryFn(),
  });
  const type = headerMovie?.title ? TYPE_MOVIE : TYPE_TV;
  console.log("%c Header isLoading", "color: red", isLoading);
  // if (isLoading) return <div style={{ color: "white" }}>Loading...</div>;
  // if (!headerMovie) return <div style={{ color: "white" }}>Not found</div>;
  return (
    <div>
      <NetflixAppBar />
      <NetflixHeader movie={headerMovie} type={type} />
      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        filter="trending"
        title="Films Netflix"
      />
      <NetflixRow
        wideImage={false}
        watermark={true}
        type={TYPE_TV}
        filter="trending"
        title="Série Netflix"
      />
      <NetflixRow
        type={TYPE_MOVIE}
        filter="toprated"
        title="Les mieux notés"
        watermark={true}
        wideImage={true}
      />
      <NetflixRow
        type={TYPE_TV}
        filter="genre"
        param="10759"
        title="Action & aventure"
        watermark={true}
        wideImage={true}
      />
      <NetflixRow
        type={TYPE_MOVIE}
        filter="genre"
        param="53"
        title="Les meilleurs Thriller"
        watermark={false}
        wideImage={false}
      />
      <NetFlixFooter />
    </div>
  );
};
export { NetflixApp };

// export async function getStaticProps() {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery("headerMovie", getMovieQueryFn);
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
