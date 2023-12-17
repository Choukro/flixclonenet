import { TYPE_TV } from "../../_utils/constants.js";
import { NetflixHeaderRoute } from "@/components/client/NetflixHeader.jsx";
import { NetflixRowRoute } from "@/components/client/NetflixRow.jsx";
import { NetFlixFooter } from "@/components/client/NetFlixFooter.jsx";
import { NetflixAppBar } from "@/components/client/NetflixAppBar.jsx";

export default function NetflixSeriesPage() {
  return (
    <div>
      <NetflixAppBar />
      <NetflixHeaderRoute type={TYPE_TV} />
      <NetflixRowRoute
        wideImage={true}
        watermark={true}
        type={TYPE_TV}
        filter="trending"
        title="Séries Netflix"
      />
      <NetflixRowRoute
        wideImage={false}
        watermark={false}
        type={TYPE_TV}
        filter="toprated"
        title="Les mieux notés"
      />

      <NetflixRowRoute
        type={TYPE_TV}
        filter="populaire"
        title="Les séries populaires"
        watermark={false}
        wideImage={true}
      />

      <NetflixRowRoute
        type={TYPE_TV}
        filter="genre"
        param="99"
        title="Les documentaires"
        watermark={true}
        wideImage={true}
      />

      <NetflixRowRoute
        type={TYPE_TV}
        filter="genre"
        param="80"
        title="Les séries criminelles"
        watermark={false}
        wideImage={false}
      />
      <NetFlixFooter />
    </div>
  );
}
