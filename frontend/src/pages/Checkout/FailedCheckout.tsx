import backgroundImage from "assets/images/redseats.jpg";
import Footer from "components/Footer/Footer";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getDeleteReservationRequest } from "services/fetching/API";
import Delete from "services/fetching/Delete";

export default function FailedCheckout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const reservationId = searchParams.get("reservation_id");

    if (!reservationId) return;

    Delete(getDeleteReservationRequest(reservationId));
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate, searchParams]);

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
            Payment Failed!
          </div>
          <div className="mb-8">
            Your payment request failed to process.
            <br />
            Please try again later.
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
