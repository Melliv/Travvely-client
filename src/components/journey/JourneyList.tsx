"use client";

import { Journey } from "@/types/journey";
import React from "react";
import JourneyCard from "./JourneyCard";
import Loader from "../ui/loader";

export default function JourneyList({ journeys }: { journeys: Journey[] }) {
  const Content = () => {
    if (journeys === null) {
      return <Loader />;
    } else if (journeys.length === 0) {
      return <p>There are 0 journeys</p>;
    } else {
      console.log("japa: ", journeys[0].id);

      return journeys.map((journey) => (
        <JourneyCard journey={journey} key={journey.id} />
      ));
    }
  };

  return (
    <div>
      <div className={"text-2xl"}>Journeys</div>
      <div className={"sm:min-w-96"}>{Content()}</div>
    </div>
  );
}
