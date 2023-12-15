/**
 * NetflixRowView.jsx
 *
 * @param
 * @returns
 */

"use client";

import React from "react";
import { RowSkeleton } from "../skeletons/RowSkeleton.jsx";
import { TYPE_MOVIE, imagePath400 } from "../../_utils/constants.js";
import Image from "next/image";

const NetflixRowView = ({
  data = [],
  title = "",
  wideImage = true,
  type = TYPE_MOVIE,
  watermark = false,
}) => {
  if (!data) {
    return <RowSkeleton title={title} wideImage={wideImage} />;
  }
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {data?.map((movie) => {
          return (
            <RowCard
              key={movie?.id}
              movie={movie}
              type={type}
              watermark={watermark}
              wideImage={wideImage}
            />
          );
        })}
      </div>
    </div>
  );
};

const RowCard = ({ movie, type, watermark, wideImage }) => {
  const buildImagePath = (data) => {
    const noImage = wideImage
      ? "/assets/no-image.jpg"
      : "/assets/no-image-poster.jpg";
    const image = wideImage ? data?.backdrop_path : data?.poster_path;
    return image ? `${imagePath400}${image}` : noImage;
    // return image ? `${imagePath400}${image}` : null;
  };
  const watermarkClass = watermark ? "watermarked" : "";
  const title = type === TYPE_MOVIE ? movie?.title : movie?.name;

  if (!movie) {
    return <></>;
  }
  return (
    <div className={`row__poster row__posterLarge ${watermarkClass}`}>
      <Image
        src={buildImagePath(movie)}
        alt={title}
        width={wideImage ? 400 : 166}
        height={wideImage ? 225 : 250}
      />
    </div>
  );
};

export { NetflixRowView, RowCard };
