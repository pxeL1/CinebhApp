import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "assets/images/redseats.jpg";
import Footer from "components/Footer/Footer";

export default function SuccessfulCheckout() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);

  return (
    <div>
      <div className="flex justify-center items-center">
        <img
          src={backgroundImage}
          alt="background image"
          className="w-full h-full pointer-events-none object-cover"
        />
        <div className="absolute z-10 rounded-xl bg-cinebhneutral p-8">
          <div className="text-xl text-cinebhdim font-bold">
            Payment Successful!
          </div>
          <div className="mb-8">
            The receipt and ticket have been sent to your email.
            <br />
            Thanks for using Cinebh!
          </div>
          <div className="text-cinebhlightgray text-sm italic">
            You will be redirected shortly.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
