import * as React from "react";
import Image from "next/image";

const NetflixRow = ({ title = "", wideImage = true }) => {
  const image = wideImage ? "/assets/sample-poster.jpg" : "/assets/sample.jpg";
  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        <Image
          className="row__poster row__posterLarge"
          src={image}
          alt=""
          height={250}
          width={360}
        />
        <Image
          className="row__poster row__posterLarge"
          src={image}
          alt=""
          height={250}
          width={360}
        />
        <Image
          className="row__poster row__posterLarge"
          src={image}
          alt=""
          height={250}
          width={360}
        />
        <Image
          className="row__poster row__posterLarge"
          src={image}
          alt=""
          height={250}
          width={360}
        />
      </div>
    </div>
  );
};

export { NetflixRow };
