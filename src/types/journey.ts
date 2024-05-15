import { Route } from "./route";

export class Journey {
  id: string = "";
  startDatetime: Date = new Date();
  endDatetime: Date = new Date();
  price: number = 0;
  distance: number = 0;
  routes: Route[] = [];
}
