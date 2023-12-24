import { NetflixByIdRoute } from "@/components/client/NetflixById.jsx";
import { NetFlixFooter } from "@/components/client/NetFlixFooter.jsx";
import { NetflixAppBar } from "@/components/client/NetflixAppBar.jsx";

export default function NetflixSearchPage() {
  return (
    <div>
      <NetflixAppBar />
      <NetflixByIdRoute />
      <NetFlixFooter />
    </div>
  );
}
