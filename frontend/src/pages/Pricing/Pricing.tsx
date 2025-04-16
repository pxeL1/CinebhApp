import PricingCard from "components/unique/PricingCard/PricingCard";
import Footer from "components/unique/Footer/Footer";

const regularList = [
  "Comfortable seating",
  "Affordable pricing",
  "Wide selection",
  "Accessible locations",
  "Suitable for everyone",
];
const loveList = [
  "Side-by-side design",
  "Comfortable padding",
  "Adjustable armrests",
  "Cup holders",
  "Reserved for couples",
];
const vipList = [
  "Enhanced comfort",
  "Priority seating",
  "Prime viewing",
  "Personal space",
  "Luxury extras",
];

export default function Pricing() {

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center h-[189px]">
        <div className="text-3xl font-bold mt-[45px]">Pricing</div>
        <div className="w-[632px] h-20 text-center mt-[32px]">
          Welcome to our cinema ticket pricing options! We offer three tiers to
          suit everyone’s preferences. Explore our pricing options below and
          treat yourself to a cinematic
          <br />
          adventure like never before!
        </div>
      </div>
      <div className="flex items-center justify-center h-[800px] w-full">
        <PricingCard type="Regular Seats" price="7 KM" descriptions={regularList} />
        <PricingCard type="Love Seats" price="24 KM" descriptions={loveList} />
        <PricingCard type="Vip Seats" price="10 KM" descriptions={vipList} />
      </div>
      <Footer />
    </div>
  );
}
