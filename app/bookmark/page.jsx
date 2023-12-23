"use client";

import * as React from "react";
import { NetflixAppBar } from "../../components/client/NetflixAppBar";
import { NetflixBookmark } from "../../components/client/NetflixBookmark";
import { NetFlixFooter } from "../../components/client/NetFlixFooter";

export default function NetflixBookmarkPage() {
  return (
    <>
      <NetflixAppBar />
      <NetflixBookmark />
      <NetFlixFooter />
    </>
  );
}
