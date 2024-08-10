"use client";

import React, { useState } from "react";
import { TrendSpot_DropDown } from "./DropDown";
import { Calendar } from "@/components/ui/calendar";

function DetailCard() {
  const [date, setDate] = React.useState(new Date());

  const [toggleCalendar, setToggleCalendar] = useState(false);
 console.log();
 
  return (
    <div className="flex flex-col text-white lg:mb-8 lg:w-full lg:p-6 ">
      <div className=" flex justify-around bg-black mt-12 py-4 rounded-md shadow-[#7A8EFF] shadow-md ">
        <TrendSpot_DropDown />
        <div className="relative">
          <p className="cursor-pointer hover:scale-105 transition-all delay-100" onClick={()=>{setToggleCalendar(!toggleCalendar)}} >{date.toLocaleDateString()} </p>
          
        </div>
        <p className="hover:scale-105 transition-all delay-100 cursor-pointer">Filter</p>
      </div>

      
      <a href=""/>
      {toggleCalendar && (
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md justify-center item-center w-fit mx-auto bg-[#5A53A7] mt-4  "
            />
          )}
    </div>
  );
}

export default DetailCard;
