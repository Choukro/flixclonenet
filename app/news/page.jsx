import { TYPE_TV, TYPE_MOVIE } from "../../_utils/constants.js";
import { NetflixHeaderRoute } from "@/components/client/NetflixHeader.jsx";
import { NetflixRowRoute } from "@/components/client/NetflixRow.jsx";
import { NetFlixFooter } from "@/components/client/NetFlixFooter.jsx";
import { NetflixAppBar } from "@/components/client/NetflixAppBar.jsx";

export default function NetflixSeriesPage() {
  return (
    <div>
      <NetflixAppBar />
      <NetflixHeaderRoute />
      <NetflixRowRoute
        type={TYPE_MOVIE}
        filter="now_playing"
        title="Film à l'affiche"
        watermark={false}
        wideImage={true}
      />
      <NetflixRowRoute
        wideImage={false}
        watermark={false}
        type={TYPE_MOVIE}
        filter="latest"
        title="Film les plus récents"
      />
      <NetflixRowRoute
        wideImage={true}
        watermark={false}
        type={TYPE_TV}
        filter="trending"
        title="Séries les plus récentes"
      />
      <NetflixRowRoute
        wideImage={false}
        watermark={false}
        type={TYPE_TV}
        filter="on_the_air"
        title="Séries diffusées à la TV dans les prochains jours"
      />
      <NetFlixFooter />
    </div>
  );
}
