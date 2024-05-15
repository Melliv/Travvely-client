import { Company } from "./company";
import { Journey } from "./journey";

export class JourneyData {
  orgJourneys: Journey[] = [];
  maxPrice: number = -1;
  maxDuration: number = -1;
  companies: Company[] = [];
}
