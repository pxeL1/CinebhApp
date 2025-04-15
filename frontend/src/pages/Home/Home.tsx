import Footer from "components/unique/Footer/Footer";
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
      <div className="w-full flex flex-col justify-center items-center">
        <CurrentlyShowingCarousel />
        <UpcomingCarousel />
        <VenueCarousel />
      </div>
      <Footer />
    </div>
  );
}
