import { VenueImage } from "models/VenueImage";
import { City } from "models/City";

export type Venue = {
  id: number;
  name: string;
  phone: string;
  streetAddress: string;
  city: City;
  image: VenueImage;
};
