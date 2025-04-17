import { VenueImage } from "models/VenueImage";

export type Venue = {
  id: number;
  name: string;
  phone: string;
  streetAddress: string;
  city: string;
  image: VenueImage;
};
