import Footer from "../../components/Footer/Footer.tsx";
import CurrenlyShowingCarousel from "./CurrenlyShowingCarousel.tsx";
import UpcomingCarousel from "./UpcomingCarousel.tsx";
import VenueCarousel from "./VenueCarousel.tsx";
import HeroVenues from "./HeroVenues.tsx";
import HeroCarousel from "./HeroCarousel.tsx";

export default function Home() {

    return (
        <div>
            <HeroCarousel/>
            <HeroVenues/>
            <div className='w-full flex flex-col justify-center items-center'>
                <CurrenlyShowingCarousel/>
                <UpcomingCarousel/>
                <VenueCarousel/>
            </div>
            <Footer />
        </div>
    )
}