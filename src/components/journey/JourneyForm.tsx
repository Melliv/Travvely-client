"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { TimePickerDemo } from "../ui/time-picker-demo";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
import JourneyFilters from "./JourneyFilters";

const formSchema = z.object({
  departure: z.string().min(1, {
    message: "Depature field is mandatory",
  }),
  destination: z.string().min(1, {
    message: "Destination field is mandatory",
  }),
  departureDatetime: z.date(),
  company: z.string(),
  price: z.number(),
  duration: z.number(),
});

export default function JourneyForm({
  maxPrice,
  maxDuration,
  companies,
}: {
  maxPrice: number;
  maxDuration: number;
  companies: Company[];
}) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const depature = searchParams.get("departure");
  const destination = searchParams.get("destination");
  const depatureDatetime = searchParams.get("departureDatetime");
  const company = searchParams.get("company");
  const price = searchParams.get("price");
  const duration = searchParams.get("duration");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departure: depature ?? "",
      destination: destination ?? "",
      departureDatetime: depatureDatetime
        ? new Date(depatureDatetime)
        : new Date(),
      company: company ?? "",
      price: price ? parseFloat(price) : maxPrice,
      duration: duration ? parseInt(duration) : maxDuration,
    },
  });

  async function onSubmit(journeyObj: z.infer<typeof formSchema>) {
    form.setValue("price", -1);
    form.setValue("duration", -1);
    changeUrl();
  }

  function changeUrl(
    _company: string = "",
    _price: number = -1,
    _duration: number = -1
  ) {
    let url = `?departure=${form.getValues().departure}&destination=${
      form.getValues().destination
    }&departureDatetime=${form.getValues().departureDatetime.toISOString()}`;

    if (_company) {
      url += `&company=${_company}`;
    }

    if (_price >= 0) {
      url += `&price=${_price}`;
    }

    if (_duration >= 0) {
      console.log("dur", _duration);

      url += `&duration=${_duration}`;
    }

    router.replace(url);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bus tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="departure"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Depature stop" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Tartu">Tartu</SelectItem>
                      <SelectItem value="Viljandi">Viljandi</SelectItem>
                      <SelectItem value="Tallinn">Tallinn</SelectItem>
                      <SelectItem value="Kuressaare">Kuressaare</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Destination stop" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Tartu">Tartu</SelectItem>
                      <SelectItem value="Rakvere">Rakvere</SelectItem>
                      <SelectItem value="Tallinn">Tallinn</SelectItem>
                      <SelectItem value="Kuressaare">Kuressaare</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departureDatetime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "dd-MM-yyyy HH:mm")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                      <div className="p-3 border-t border-border">
                        <TimePickerDemo
                          setDate={field.onChange}
                          date={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>

        <JourneyFilters
          companies={companies}
          maxPrice={maxPrice}
          maxDuration={maxDuration}
          changeUrl={changeUrl}
        />
      </CardContent>
    </Card>
  );
}
