import { Button } from "@/components/ui/button";

import React from "react";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { FaDiscord } from "react-icons/fa";

function Profile() {
  return (
    <div className="  h-full flex items-center flex-col gap-4 ">
      <h1 className="text-3xl mt-6  font-black text-[#615CB9]">Trendspot</h1>
      <div className="mt-6 bg-[#615CB9] p-2 rounded-full">
        <GiPoliceOfficerHead size={60} />
      </div>

      <p className="font-bold mt-4">Kevin Porter</p>

      <div className="flex  gap-4 ">
        <Button variant="ghost" className="bg-[#615CB9] hover:scale-105 transition-all delay-100 hover:!bg-[#615CB9]">
          Dashboard
        </Button>
        <Button  variant="ghost" className="bg-[#615CB9] hover:scale-105 transition-all delay-100 hover:!bg-[#615CB9]" >Resources</Button>
        <Button variant="ghost" className="bg-[#615CB9] hover:scale-105 transition-all delay-100 hover:!bg-[#615CB9]">
          <FaDiscord className="mr-2" color={"bg-[#615CB9] "} size={20} /> Discord
        </Button>
      </div>
    </div>
  );
}

export default Profile;
