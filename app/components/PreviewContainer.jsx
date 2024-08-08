"use client";

import React from 'react'
import LinkPreview from './LinkPreview'

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import UpdateCard from "./UpdateCard";

function PreviewContainer() {
  const slugs_og = [
    'ZPRoQcyHY',
    'ZPRoQGYuR',
    'ZPRoQEvXT',
    'ZPRoQoRyS',
    'ZPRoQXVpp',
    'ZPRoQWr8o',
    'ZPRoC1MUJ',
    'ZPRoQGKTG',
    'ZPRoQfkWq',
    'ZPRoQEuLs',
    'ZPRoQ4rKA',
  ]
  const slugs = ['ZPRoQGKTG', 'ZPRoQfkWq', 'ZPRoQEuLs', 'ZPRoQ4rKA']
  return (
    <>
      <div className=" hidden lg:grid my-10 grid-cols-1 md:grid-cols-4 gap-6 w-full place-items-center   ">
        {slugs_og.map((slug) => {
          return <LinkPreview url={`https://www.tiktok.com/t/${slug}`} key={Math.random() + slug}/>;
        })}
      </div>

      <div className=" h-fit my-10  flex justify-center lg:hidden">
        <Carousel className=" w-[80%] ">
          <CarouselContent className="">
            {slugs_og.map((slug) => {
              return (
                <CarouselItem
                  key={Math.random() + slug}
                  className=" h-full w-[20px]
                  ">
                  <Card className=" ">
                    <CardContent className="flex  items-center justify-center p-6">
                      <LinkPreview url={`https://www.tiktok.com/t/${slug}`} />
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}

export default PreviewContainer
