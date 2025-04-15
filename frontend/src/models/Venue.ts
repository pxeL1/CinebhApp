import { VenueImage } from "./VenueImage";

export type Venue = {
  id: number;
  name: string;
  phone: string;
  streetAddress: string;
  city: string;
  image: VenueImage;
};
