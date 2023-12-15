import React from "react";
import { NetflixAppBar } from "./NetflixAppBar.jsx";
import { NetflixRow } from "./NetflixRow";
import { NetFlixFooter } from "./NetFlixFooter";
import { NetflixHeader } from "./NetflixHeader";
import { TYPE_MOVIE } from "../../_utils/constants.js";
import { getMovieQueryFn } from "../../_queryFns/getMovieQueryFn.js";
import { useQuery } from "@tanstack/react-query";
import "./Netflix.css";

const NetflixMovies = () => {
  const type = TYPE_MOVIE;
  const testData = getMovieQueryFn(type);
  console.log("testData", testData);
  const { data: headerMovie, isLoading } = useQuery({
    queryKey: ["headerMovie"],
    queryFn: () => getMovieQueryFn(type),
  });
  console.log("%c Header of NetflixMovies isLoading", "color: red", isLoading);
  return (
    <div>
      <NetflixAppBar />
      <NetflixHeader movie={headerMovie} type={type} />
      {/* <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        filter="trending"
        title="Films Netflix"
      /> */}
      {/* <NetflixRow
        wideImage={false}
        watermark={true}
        type={TYPE_MOVIE}
        filter="toprated"
        title="Les mieux notés"
      />

      <NetflixRow
        type={TYPE_MOVIE}
        filter="populaire"
        title="Les films pouplaires"
        watermark={true}
        wideImage={true}
      />

      <NetflixRow
        type={TYPE_MOVIE}
        filter="genre"
        param="14"
        title="Films Fantastiques"
        watermark={true}
        wideImage={true}
      />

      <NetflixRow
        type={TYPE_MOVIE}
        filter="genre"
        param="878"
        title="Les films de science fiction"
        watermark={false}
        wideImage={false}
      /> */}
      <NetFlixFooter />
    </div>
  );
};
export { NetflixMovies };
