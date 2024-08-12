import React from "react";

import { IoLogoTwitter } from "react-icons/io5";

function UpdateCard({date, message}) {
  return (
    <div className="bg-[#262626]  md:my-0 p-6 min-w-[300px] h-[300px] w-[300px] rounded-lg  my-4 justify-center  ">
      <div className="flex  flex-col gap-7 ">
        <div className="flex gap-7">
          <div className="bg-white rounded-full w-[50px] h-[50px] flex items-center justify-center ">
            <IoLogoTwitter size={50} color="#1D9BF0" className="p-1" />
          </div>
          <div className="">
            <h2 className="font-bold  text-white">Daniel</h2>
            <p className=" text-white">{date }</p>
          </div>
        </div>

        <p className=" text-white">
          {message}
        </p>
      </div>
    </div>
  );
}

export default UpdateCard;
