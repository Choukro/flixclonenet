import { NetflixSearchRoute } from "@/components/client/NetflixSearch.jsx";
import { NetFlixFooter } from "@/components/client/NetFlixFooter.jsx";
import { NetflixAppBar } from "@/components/client/NetflixAppBar.jsx";

export default function NetflixSearchPage() {
  return (
    <div>
      <NetflixAppBar />
      <NetflixSearchRoute />
      <NetFlixFooter />
    </div>
  );
}
