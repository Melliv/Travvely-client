"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { Company } from "@/types/company";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function JourneyFilters({
  maxPrice,
  maxDuration,
  companies,
  changeUrl,
}: {
  maxPrice: number;
  maxDuration: number;
  companies: Company[];
  changeUrl: Function;
}) {
  const searchParams = useSearchParams();
  const paramsCompany = searchParams.get("company");
  const paramsPrice = searchParams.get("price");
  const paramsDuration = searchParams.get("duration");
  const [company, setCompany] = useState(paramsCompany);
  const [price, setPrice] = useState(
    paramsPrice ? parseFloat(paramsPrice) : maxPrice
  );
  const [duration, setDuration] = useState(
    paramsDuration ? parseInt(paramsDuration) : maxDuration
  );

  useEffect(() => {
    setPrice(paramsPrice ? parseFloat(paramsPrice) : maxPrice);
    setDuration(paramsDuration ? parseInt(paramsDuration) : maxDuration);
  }, [maxPrice, maxDuration]);

  function getTravelDuration() {
    let hours = Math.floor(duration / 60);
    let remainingMinutes = duration % 60;

    let formattedMinutes =
      remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;

    return `${hours}:${formattedMinutes}`;
  }

  return (
    <Accordion type="single" collapsible disabled={maxPrice === -1}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Filters</AccordionTrigger>
        <AccordionContent className={"py-4 grid gap-6"}>
          <div className={"grid gap-2"}>
            <div className={"flex justify-between items-end"}>
              <Label htmlFor="price" className={"text-xl"}>
                Company
              </Label>
            </div>
            <div className="px-1">
              <Select
                onValueChange={(v) => {
                  setCompany(v);
                  changeUrl(v, price, duration);
                }}
                defaultValue={company ?? undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => {
                    return (
                      <SelectItem value={company.state} key={company.id}>
                        {company.state}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className={"grid gap-2"}>
            <div className={"flex justify-between items-end"}>
              <Label htmlFor="price" className={"text-xl"}>
                Price
              </Label>
              <p>To: {price} €</p>
            </div>
            <Slider
              defaultValue={[price]}
              max={maxPrice}
              step={1}
              onValueChange={(v) => {
                setPrice(v[0]);
                changeUrl(company, v[0], duration);
              }}
            />
          </div>

          <div className={"grid gap-2"}>
            <div className={"flex justify-between items-end"}>
              <Label htmlFor="distance" className={"text-xl"}>
                Travel duration
              </Label>
              <div>To: {getTravelDuration()} h</div>
            </div>

            <Slider
              defaultValue={[duration]}
              max={maxDuration}
              step={1}
              onValueChange={(v) => {
                setDuration(v[0]);
                changeUrl(company, price, v[0]);
              }}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
