import { Journey } from "@/types/journey";
import { SearchParams } from "@/types/searchParams";

const filterJourneys = (
  journeys: Journey[],
  searchParams: SearchParams
): Journey[] => {
  if (searchParams.price) {
    const price = parseFloat(searchParams.price);
    journeys = journeys.filter((journey) => journey.price <= price);
  }

  if (searchParams.duration) {
    const duration = parseInt(searchParams.duration);
    journeys = journeys.filter(
      (journey) =>
        journey.endDatetime.getTime() - journey.startDatetime.getTime() <=
        duration * 60 * 1000
    );
  }

  if (searchParams.company) {
    console.log("com", searchParams.company);

    journeys = journeys.filter((journey) =>
      journey.routes.every((r) => r.company.state == searchParams.company)
    );
  }

  return journeys;
};

export default filterJourneys;
