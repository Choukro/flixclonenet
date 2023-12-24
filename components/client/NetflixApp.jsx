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
import { NetflixRowRoute } from "./NetflixRow.jsx";
import { NetFlixFooter } from "./NetFlixFooter.jsx";
import { NetflixHeaderRoute } from "@/components/client/NetflixHeader.jsx";
import { TYPE_MOVIE, TYPE_TV } from "../../_utils/constants.js";

const NetflixApp = () => {
  return (
    <div>
      <NetflixAppBar />
      <NetflixHeaderRoute />
      <NetflixRowRoute
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        filter="trending"
        title="Films Netflix"
      />
      <NetflixRowRoute
        wideImage={false}
        watermark={true}
        type={TYPE_TV}
        filter="trending"
        title="Série Netflix"
      />
      <NetflixRowRoute
        type={TYPE_MOVIE}
        filter="toprated"
        title="Les mieux notés"
        watermark={false}
        wideImage={true}
      />
      <NetflixRowRoute
        type={TYPE_TV}
        filter="genre"
        param="10759"
        title="Action & aventure"
        watermark={false}
        wideImage={true}
      />
      <NetflixRowRoute
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

export default NetflixApp;
