import { Venue } from "models/Venue";

export type ProjectionRequest = {
  id: string;
  time: string | undefined;
  venue: Venue | undefined;
}
