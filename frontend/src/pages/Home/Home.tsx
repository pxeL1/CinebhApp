import Footer from "components/Footer/Footer";
import CurrentlyShowingCarousel from "pages/Home/CurrentlyShowingCarousel";
import UpcomingCarousel from "./UpcomingCarousel";
import VenueCarousel from "./VenueCarousel";
import HeroVenues from "./HeroVenues";
import HeroCarousel from "./HeroCarousel";

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <HeroVenues />
      <div className="max-w-360 w-full px-24 mx-auto">
        <CurrentlyShowingCarousel />
        <UpcomingCarousel />
        <VenueCarousel />
      </div>
      <Footer />
    </div>
  );
}
