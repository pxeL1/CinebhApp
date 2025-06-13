import { useParams } from "react-router-dom";
import Footer from "components/Footer/Footer";
import { useEffect, useState } from "react";
import get from "services/fetching/Get";
import {
  getProjectionRequest,
  getProjectionSeatsRequest,
  getSessionRequest,
} from "services/fetching/API";
import { ProjectionDTO } from "models/ProjectionDTO";
import { ProjectionSeat } from "models/ProjectionSeat";
import { SessionResponse } from "models/SessionResponse";
import { useTimer } from "react-timer-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faStar } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "components/common/Tooltip/Tooltip";
import { defaultImage } from "defaultValues";
import { getFormattedDate, getFormattedTime } from "utility/time-utils";
import SeatSelect from "pages/Projection/SeatSelect";
import Button, { ButtonType } from "components/common/Button/Button";
import { Bounce, toast, ToastContainer } from "react-toastify";

const tooltipText =
  "Session will expire in 20 minutes and selected seats will be refreshed";
const separator = <div className="border-cinebhdarkred h-5 border-l w-1"></div>;

function getTotalPrice(seats: Array<ProjectionSeat>) {
  let totalPrice = 0;
  seats.forEach((seat) => {
    switch (seat.type) {
      case "REGULAR":
        totalPrice = totalPrice + 7;
        break;

      case "VIP":
        totalPrice = totalPrice + 10;
        break;

      case "LOVE":
        totalPrice = totalPrice + 24;
    }
  });

  return totalPrice;
}

export default function Projection() {
  const { id, date } = useParams();
  const [projection, setProjection] = useState<ProjectionDTO>();
  const [seats, setSeats] = useState<Array<ProjectionSeat>>([]);
  const [sessionIsExpired, setSessionIsExpired] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<Array<ProjectionSeat>>([]);
  const sessionDurationInSeconds = 1200;
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(
    expiryTimestamp.getSeconds() + sessionDurationInSeconds,
  );
  const timer = useTimer({ expiryTimestamp, onExpire: onSessionExpiry });
  const coverImage = projection?.movie.images.find((image) => image.coverPhoto);

  const sessionTime =
    timer.minutes.toString().padStart(2, "0") +
    ":" +
    timer.seconds.toString().padStart(2, "0");

  const bookingDate =
    getFormattedDate(date, "dddd, MMM DD") +
    " at " +
    getFormattedTime(projection?.time ?? "");

  const venueDetails =
    projection?.hall.venue.name +
    ", " +
    projection?.hall.venue.streetAddress +
    ", " +
    projection?.hall.venue.city.name;

  useEffect(() => {
    if (!id) return;

    const projectionPromise = get<ProjectionDTO>(getProjectionRequest(id));
    const seatPromise = get<Array<ProjectionSeat>>(
      getProjectionSeatsRequest(id),
    );
    const sessionPromise = get<SessionResponse>(getSessionRequest());

    Promise.all([projectionPromise, seatPromise, sessionPromise]).then(
      (data) => {
        setProjection(data[0]);
        setSeats(data[1]);
      },
    );
  }, []);

  function onSessionExpiry() {
    setSessionIsExpired(true);
    toast.warn("Session expired. Please refresh the page");
  }

  function handlePayment() {}

  if (!projection) {
    return (
      <>
        <div className="flex justify-center items-center min-w-360 min-h-360">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        transition={Bounce}
      />
      <div className="pb-24">
        <div className="flex justify-between px-24 py-6 border-b border-cinebhpale">
          <div className="text-2xl text-cinebhdarkgray font-bold flex items-center">
            Seat Options
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-cinebhdarkgray flex">
              <span className="mr-2">
                <Tooltip text={tooltipText}>
                  <FontAwesomeIcon icon={faCircleInfo} />
                </Tooltip>
              </span>
              Session Duration
            </div>
            <div className="p-2.5 border border-cinebhpale rounded-lg text-cinebhdarkgray text-xl font-bold">
              {sessionTime}
            </div>
          </div>
        </div>
        <div className="flex px-24 py-6 border-b border-cinebhpale">
          <img
            src={coverImage?.url ?? defaultImage}
            alt="cover image"
            className="rounded-2xl min-w-34 h-32 object-cover mr-6"
          />
          <div className="mr-9 text-cinebhdarkgray min-w-56">
            <div className="font-bold text-xl mb-4">
              {projection.movie.name}
            </div>
            <div className="flex gap-3 items-center">
              {projection.movie.pgRating}
              {separator}
              {projection.movie.language}
              {separator}
              {projection.movie.duration}
            </div>
          </div>
          <div className="w-full text-cinebhdarkgray">
            <div className="font-bold text-xl mb-4">Booking details</div>
            <div className="mb-4">
              {bookingDate}
              <br />
              {venueDetails}
            </div>
            {projection.hall.name}
          </div>
        </div>
        <div className="flex pt-3 gap-24 justify-center">
          <div>
            <CinemaScreen />
            <SeatSelect
              seats={seats}
              selectedSeats={selectedSeats}
              onSeatSelect={setSelectedSeats}
            />
          </div>
          <div className="flex flex-col">
            <SeatGuide />
            <div className="text-center w-full mb-5">Chosen Seats</div>
            <div className="flex justify-between border-b border-cinebhpale pb-2 mb-4">
              <div>Seat(s)</div>
              <div>Total Price</div>
            </div>
            <div className="flex justify-between h-full">
              <div className="text-xl font-bold text-cinebhdarkgray">
                {selectedSeats.map((seat) => seat.number).toString()}
              </div>
              <div className="text-xl font-bold text-cinebhdarkgray">
                {selectedSeats.length != 0 &&
                  getTotalPrice(selectedSeats) + "KM"}
              </div>
            </div>
            <Button
              variant={ButtonType.PRIMARY}
              onClick={handlePayment}
              disabled={selectedSeats.length === 0 || sessionIsExpired}
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function CinemaScreen() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="text-center w-full">Cinema Screen</div>
      <svg width="512" height="100" viewBox="0 0 512 100">
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b22222" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#b22222" stopOpacity="0" />
          </linearGradient>

          <mask id="glowMask">
            <rect width="100%" height="100%" fill="white" />
            <path
              d="M32,50 Q256,20 480,50
                         L480,65 32,65 Z"
              fill="black"
              fillOpacity="0.6"
            />
          </mask>
        </defs>

        <path
          d="M32,50 Q256,30 480,50
                 L480,65 32,65 Z"
          fill="url(#glowGradient)"
          mask="url(#glowMask)"
          opacity="0.9"
        />
        <path
          d="M32,50 Q256,30 480,50"
          stroke="#b22222"
          strokeWidth="6"
          fill="none"
        />
      </svg>
    </div>
  );
}

function SeatGuide() {
  return (
    <div className="border-b border-cinebhpale mb-8">
      <div className="text-center w-full mb-8">Seat Guide</div>
      <div className="flex">
        <div className="mr-44">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center text-sm rounded-lg border p-3 w-14 h-10 border-cinebhpale">
              XY
            </div>
            Available
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center text-sm rounded-lg border p-3 w-14 h-10 bg-cinebhpale border-cinebhpale">
              XY
            </div>
            Reserved
          </div>
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center text-sm rounded-lg border p-3 w-14 h-10 border-cinebhdarkred bg-cinebhdarkred text-cinebhneutral">
              XY
            </div>
            Selected
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center text-sm rounded-lg border p-3 w-14 h-10 border-cinebhpale">
              XY
            </div>
            Regular Seats (7 BAM)
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center text-sm rounded-lg border p-3 w-14 h-10 border-cinebhpale">
              <span className="mr-1">
                <FontAwesomeIcon icon={faStar} />
              </span>
              XY
            </div>
            VIP Seats (10 BAM)
          </div>
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center text-sm rounded-lg border p-3 w-32 h-10 border-cinebhpale">
              XY
            </div>
            Love Seats (24 BAM)
          </div>
        </div>
      </div>
    </div>
  );
}
