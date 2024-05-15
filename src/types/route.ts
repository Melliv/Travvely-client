import { Company } from "./company";
import { Location } from "./location";

export class Route {
  id: string = "";
  from: Location = new Location();
  to: Location = new Location();
  startDatetime: Date = new Date();
  endDatetime: Date = new Date();
  company: Company = new Company();
  price: number = 0;
  distance: number = 0;
}
