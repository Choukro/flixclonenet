import { TYPE_MOVIE } from "../../_utils/constants.js";
import { NetflixHeaderRoute } from "@/components/client/NetflixHeader.jsx";
import { NetflixRowRoute } from "@/components/client/NetflixRow.jsx";
import { NetFlixFooter } from "@/components/client/NetFlixFooter.jsx";
import { NetflixAppBar } from "@/components/client/NetflixAppBar.jsx";

export default function NetflixMoviesPage() {
  return (
    <div>
      <NetflixAppBar />
      <NetflixHeaderRoute type={TYPE_MOVIE} />
      <NetflixRowRoute
        wideImage={true}
        watermark={true}
        type={TYPE_MOVIE}
        filter="trending"
        title="Films Netflix"
      />
      <NetflixRowRoute
        wideImage={false}
        watermark={false}
        type={TYPE_MOVIE}
        filter="toprated"
        title="Les mieux notés"
      />

      <NetflixRowRoute
        type={TYPE_MOVIE}
        filter="populaire"
        title="Les films populaires"
        watermark={false}
        wideImage={true}
      />

      <NetflixRowRoute
        type={TYPE_MOVIE}
        filter="genre"
        param="14"
        title="Films Fantastiques"
        watermark={false}
        wideImage={true}
      />

      <NetflixRowRoute
        type={TYPE_MOVIE}
        filter="genre"
        param="878"
        title="Les films de science fiction"
        watermark={false}
        wideImage={false}
      />
      <NetFlixFooter color="secondary" si />
    </div>
  );
}
