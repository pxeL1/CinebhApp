import { Movie } from "models/Movie";
import { RatingSupplier } from "services/RatingSupplier/RatingSupplier";
import { useEffect, useState } from "react";
import { Rating } from "models/Rating";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface RatingsTableProps {
  movie?: Movie;
  ratingSuppliers: Array<RatingSupplier>;
}

const separator = (
  <div className="border-cinebhdarkred border-l-[1.5px] h-6"></div>
);

export default function RatingsTable({
  movie,
  ratingSuppliers,
}: RatingsTableProps) {
  const [ratings, setRatings] = useState<Array<Rating>>([]);

  useEffect(() => {
    async function fetchRatings() {
      if (!movie) return;
      const newRatings: Array<Rating> = [];
      for (const supplier of ratingSuppliers) {
        const rating = await supplier.getRating(movie);
        newRatings.push(rating);
      }

      setRatings(newRatings);
    }

    fetchRatings();
  }, [movie]);

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center text-2xl font-bold text-cinebhlightgray mb-6">
        {separator}
        Rating
      </div>
      <div className="flex gap-4">
        <RatingCards ratings={ratings} />
      </div>
    </div>
  );
}

interface RatingCardsProps {
  ratings: Array<Rating>;
}

function RatingCards({ ratings }: RatingCardsProps) {
  return ratings.map((rating) => (
    <div className="p-4 flex gap-2 items-center rounded-lg border border-cinebhpale">
      <FontAwesomeIcon icon={faStar} className="text-cinebhdarkred" />
      <div>
        <div className="text-sm font-semibold text-cinebhdim">
          {rating.rating}
        </div>
        <div className="text-xs text-cinebhlightgray">{rating.author}</div>
      </div>
    </div>
  ));
}
