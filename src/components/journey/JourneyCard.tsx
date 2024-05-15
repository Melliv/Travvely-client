import React from "react";
import { Card, CardContent } from "../ui/card";
import { Journey } from "@/types/journey";
import { format } from "date-fns";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function JourneyCard({ journey }: { journey: Journey }) {
  function getHourMinuteDifference(startDatetime: Date, endDatetime: Date) {
    let difference = Math.abs(startDatetime.getTime() - endDatetime.getTime());

    let hours = Math.floor(difference / 3600000);
    let minutes = Math.floor((difference % 3600000) / 60000);

    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${formattedMinutes}`;
  }

  function bookOnClick() {
    console.log("book");
  }

  return (
    <div className="max-w-md overflow-hidden transition-[height] duration-500 ease-in-out">
      <Card className="mt-4">
        <CardContent className={"mt-6"}>
          <div className={"flex justify-between"}>
            <div className={"flex items-end gap-2"}>
              <p className={"text-xl"}>
                {format(journey.startDatetime, "H.mm")} -{" "}
                {format(journey.endDatetime, "H.mm")}
              </p>
              <p className={"text-gray-400"}>
                (
                {getHourMinuteDifference(
                  journey.startDatetime,
                  journey.endDatetime
                )}
                h)
              </p>
            </div>
            <div>
              <p className="text-xl">{journey.price} €</p>
            </div>
          </div>
          <Separator className={"my-2"} />
          <div className={"flex justify-between items-center gap-4"}>
            {journey.routes.length > 1 ? (
              <p>With transfers!</p>
            ) : (
              <p>{journey.routes[0].company.state}</p>
            )}

            <Button className={"flex gap-2 z-10"} onClick={bookOnClick}>
              <p className={"hidden sm:flex"}>Book</p>
              <ChevronRight className={"size-5"} />
            </Button>
          </div>
          <div className="">
            {journey.routes.length > 1 && (
              <Accordion type="single" collapsible disabled={false}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Routes</AccordionTrigger>
                  <AccordionContent className={"py-4 grid gap-6"}>
                    {journey.routes.map((r) => {
                      return (
                        <div key={r.id}>
                          <div className={"flex justify-between"}>
                            <div className={"flex items-end gap-2"}>
                              <p className={"text-xl"}>
                                {format(r.startDatetime, "H.mm")} -{" "}
                                {format(r.endDatetime, "H.mm")}
                              </p>
                              <p className={"text-gray-400"}>
                                (
                                {getHourMinuteDifference(
                                  r.startDatetime,
                                  r.endDatetime
                                )}
                                h)
                              </p>
                            </div>
                            <div>
                              <p className="text-xl">{r.price} €</p>
                            </div>
                          </div>
                          <div>
                            <p>
                              {r.from.name} - {r.to.name}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
