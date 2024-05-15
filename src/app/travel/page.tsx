import JourneyForm from "@/components/journey/JourneyForm";
import JourneyList from "@/components/journey/JourneyList";
import api from "@/lib/axios-config";
import { Company } from "@/types/company";
import { Journey } from "@/types/journey";
import { SearchParams } from "@/types/searchParams";
import React from "react";
import filterJourneys from "../helpers/filterJourneys";

function getUniqueCompanies(journeys: Journey[]): Company[] {
  const uniqueCompanies: Company[] = [];

  journeys.forEach((journey) => {
    journey.routes.forEach((route) => {
      if (!uniqueCompanies.some((company) => company.id === route.company.id)) {
        uniqueCompanies.push(route.company);
      }
    });
  });

  return uniqueCompanies;
}

async function getJourneysData(
  searchParams: SearchParams
): Promise<[Journey[], number, number, Company[]]> {
  let urlParams = "";
  if (searchParams.departure) {
    urlParams += `?departure=${searchParams.departure}`;
  }
  if (searchParams.destination) {
    urlParams += `&destination=${searchParams.destination}`;
  }
  if (searchParams.departureDatetime) {
    urlParams += `&depatureDatetime=${searchParams.departureDatetime}`;
  }

  const res = await api.get<Journey[]>(`Journey${urlParams}`);

  const orgJourneys = res.data;
  const filteredJourneys = filterJourneys(orgJourneys, searchParams);
  const maxPrice = Math.max(-1, ...orgJourneys.map((j) => j.price));
  const maxDuration = Math.max(
    -1,
    ...orgJourneys.map(
      (j) => (j.endDatetime.getTime() - j.startDatetime.getTime()) / 60000
    )
  );
  const companies = getUniqueCompanies(orgJourneys);
  return [filteredJourneys, maxPrice, maxDuration, companies];
}

export default async function Travel({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [journeys, maxPrice, maxDuration, companies] = await getJourneysData(
    searchParams
  );

  return (
    <div className={"grid gap-4 md:flex"}>
      <div>
        <div className={"md:sticky top-24"}>
          <JourneyForm
            maxPrice={maxPrice}
            maxDuration={maxDuration}
            companies={companies}
          />
        </div>
      </div>
      <JourneyList journeys={journeys} />
    </div>
  );
}
