import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

const PosterSkeleton = () => {
  return (
    <div className="row">
      <h2>Affiche</h2>
      <div className="row__posters">
        <div className="row__poster row__posterLarge">
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            width={166}
            height={250}
          />
        </div>
      </div>
    </div>
  );
};
export { PosterSkeleton };
