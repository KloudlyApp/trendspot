"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import UpdateCard from "./UpdateCard";

export function TrendSpotCarouselUpdate({ information }) {
  const [api, setApi] = React.useState(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <div className=" lg:hidden mr-5">
        <Carousel
          setApi={setApi}
          className="w-full max-w-xs "
          opts={{ loop: true }}>
          <CarouselContent className="">
            {information?.map(({ randomDate, update }) => (
              <CarouselItem
                key={update}
                className="ml-2 hover:scale-110 transition-all delay-100 ">
                <Card className="">
                  <CardContent className="flex  items-center justify-center p-6 ">
                    <UpdateCard date={randomDate} message={update} />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Update {current} .
        </div>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        orientation="vertical"
        className="w-full max-w-xs hidden lg:flex ">
        <CarouselContent className="-mt-0 h-[200px] ">
          {information?.map(({ randomDate, update }) => (
            <CarouselItem
              key={update}
              className="hover:scale-110 transition-all delay-100">
              <Card className="">
                <CardContent className="flex  rounded  ">
                  <UpdateCard date={randomDate} message={update} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
