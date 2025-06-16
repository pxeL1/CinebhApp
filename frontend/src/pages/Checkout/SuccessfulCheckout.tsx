import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Reservation } from "models/Reservation";
import post from "services/fetching/Post";
import { getCheckoutEmailRequest, getCreateTicketRequest } from "services/fetching/API";
import backgroundImage from "assets/images/redseats.jpg"
import Footer from "components/Footer/Footer";
import { Moment } from "moment";
import { Seat } from "models/Seat";
import get from "services/fetching/Get";

export interface CheckoutValues {
  price: number;
  date: Moment;
  userEmail: string;
  projectionId: number;
  seats: Array<Seat>;
}

interface EmailResponse {
  message: string;
}

export default function SuccessfulCheckout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const values: CheckoutValues = JSON.parse(localStorage.getItem("checkoutValues") ?? "");
    const stripeSessionId = searchParams.get("session_id");

    const ticketRequest = {
      price: values.price,
      date: values.date,
      userEmail: values.userEmail,
      projectionId: values.projectionId,
      stripeSessionId: stripeSessionId,
      seats: values.seats
    }

    post<Reservation>(getCreateTicketRequest(), ticketRequest).then(() => {
      const params = new URLSearchParams();
      params.set("recipient", values.userEmail);

      get<EmailResponse>(getCheckoutEmailRequest(), params).then(() => {
        setTimeout(() => {
          navigate("/");
        }, 5000);
      });
    });
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center">
        <img src={backgroundImage} alt="background image" className="w-full h-full pointer-events-none object-cover" />
        <div className="absolute z-10 rounded-xl bg-cinebhneutral p-8">
          <div className="text-xl text-cinebhdim font-bold">Payment Successful!</div>
          <div className="mb-8">
            The receipt and ticket have been sent to your email.
            <br/>
            Thanks for using Cinebh!
          </div>
          <div className="text-cinebhlightgray text-sm italic">
            You will be redirected shortly.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
