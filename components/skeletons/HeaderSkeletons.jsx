import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

const styles = {
  banner: {
    backgroundSize: "cover",
    backgroundPosition: "center top",
    color: "white",
    height: "1000px",
    marginBottom: "-140px",
  },
};

const HeaderSkeleton = () => {
  return (
    <header className="banner" style={styles.banner}>
      <div className="banner__contents">
        <h1 className="banner__title">
          <Skeleton animation="wave" width={210} sx={{ bgcolor: "grey.900" }} />
        </h1>
        <div className="banner__buttons">
          <Skeleton
            animation="wave"
            variant="rounded"
            width={175}
            height={56}
            sx={{ bgcolor: "grey.900" }}
            style={{ marginRight: 15 }}
          />
          <Skeleton
            animation="wave"
            variant="circular"
            width={56}
            height={56}
            sx={{ bgcolor: "grey.900" }}
            style={{ marginRight: 15 }}
          />
          <Skeleton
            animation="wave"
            variant="circular"
            width={56}
            height={56}
            sx={{ bgcolor: "grey.900" }}
          />
        </div>
        <p className="synopsis">
          <Skeleton animation="wave" sx={{ bgcolor: "grey.900" }} />
          <Skeleton animation="wave" sx={{ bgcolor: "grey.900" }} />
          <Skeleton animation="wave" sx={{ bgcolor: "grey.900" }} />
        </p>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};
export { HeaderSkeleton };
