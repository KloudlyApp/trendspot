import React from "react";
import Profile from "./Profile";
import Updates from "./Updates";

function Profile_Updates_Card() {
  return (
    <div className=" mx-auto bg-gradient-to-b rounded-lg from-black from-60% to-[#7A8EFF] via-40% min-w-[370px] w-[80vw] md:w-screen max-w-[800px] flex flex-col md:flex-row  lg:py-12 items-center justify-around shadow-[#7A8EFF] shadow-lg  lg:flex-col lg:h-screen lg:mt-0 lg:rounded-none lg:w-20 md:pb-8 item-center  md:justify-evenly  lg:justify-between  ">
      <Profile />
      <div className=" md:mt-24 flex justify-center items-center lg:mb-16   ">
      <Updates />
     </div>
    </div>
  );
}

export default Profile_Updates_Card;
