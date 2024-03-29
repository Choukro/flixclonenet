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
import Link from "next/link";
import { AlignJustify } from "lucide-react";
import { BookmarkButton } from "../client/BookmarkButton";


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
      <div className="cards">
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
  const date =
    type === TYPE_MOVIE
      ? movie?.release_date.substring(0, 4)
      : movie?.first_air_date.substring(0, 4);
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
    <div>
      {!wideImage ? (
        <Link href={`/${type}/${movie.id}`}>
          <div className={`row__poster row__posterLarge ${watermarkClass}`}>
            <Image
              src={buildImagePath(movie)}
              alt={title}
              width={166}
              height={250}
            />
          </div>
        </Link>
      ) : (
        <div className="wrapper">
          <div className="card card--rounded wrapper__front">
            <div className={`card__header ${watermarkClass}`}>
              <Image
                src={buildImagePath(movie)}
                alt={title}
                width={400}
                height={225}
              />
            </div>
          </div>
          <div className="card card--rounded wrapper__back">
            <Link href={`/${type}/${movie.id}`}>
              <div className={`card__header ${watermarkClass}`}>
                <Image
                  src={buildImagePath(movie)}
                  alt={title}
                  width={400}
                  height={225}
                />
              </div>
            </Link>
            <div className="card__body">
              <div className="card__icons">
                <div className="card__icon">
                  <a
                    href={`https://www.youtube.com/results?search_query=${type}%20${title}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <button className="btn--large btn--circle">
                      <svg
                        className="card__icon--large"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.44 10.72L5.96 2.98A1.38 1.38 0 004 4.213v15.474a1.373 1.373 0 002 1.233l15.44-7.74a1.38 1.38 0 000-2.467v.007z" />
                      </svg>
                    </button>
                  </a>
                  <p>Lecture</p>
                </div>
                <div className="card__icon">
                  <button className="btn btn--transparent btn--circle">
                    <BookmarkButton movieId={movie.id} type={type} row={true} />
                  </button>
                  <a
                    href={`https://www.google.com/search?q=${type}%20${title}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <button className="btn btn--transparent btn--circle">
                        <AlignJustify className="card__icon--small card__icon--lucide" />
                    </button>
                  </a>
                </div>
              </div>
              <p className="card__title">
                {title ?? "..."}&nbsp;|&nbsp;{date ?? ""}
                <span className="card__subtitle">
                  {movie?.overview ?? "..."}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { NetflixRowView, RowCard };
