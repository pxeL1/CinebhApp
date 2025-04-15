import redseats from "assets/images/redseats.jpg";
import Footer from "components/unique/Footer/Footer";

export default function About() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-[492px] text-atlantdarkgray">
        <div className="flex flex-col ml-24 mt-44 font-bold text-2xl">
          <div>About Our Dream.</div>
          <div>Our History.</div>
          <div>Cinema.</div>
        </div>
        <div className="flex flex-col ml-[227px] mt-16">
          <div className="text-6xl font-bold mb-8">About Us</div>
          <div className="w-[832px] h-[264px] mb-10">
            Welcome to Cinebh, where movie magic comes to life.
            <br />
            At Cinebh, we're not just about screening films; we're passionate
            about creating unforgettable cinematic experiences. Since our
            establishment, we've been dedicated to providing our audience with
            top-quality entertainment in a comfortable and welcoming
            environment.
            <br />
            Our state-of-the-art facilities boast the latest in audiovisual
            technology, ensuring that every movie is presented with stunning
            clarity and immersive sound. From the latest blockbusters to
            timeless classics, our diverse selection of films caters to every
            taste and preference.
            <br />
            <br />
            As a hub for community entertainment, we take pride in being more
            than just a cinema.
            <br />
            Join us at Cinebh and discover why we're not just your average movie
            theater—we're your destination for cinematic excellence and
            entertainment bliss.
          </div>
        </div>
      </div>
      <img src={redseats} alt="red" className="h-[652px] w-full" />
      <Footer />
    </div>
  );
}
