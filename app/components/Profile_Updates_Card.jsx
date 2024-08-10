import React from "react";
import Profile from "./Profile";
import Updates from "./Updates";

function Profile_Updates_Card() {
  return (
    <div className=" mx-auto bg-gradient-to-b mt-6 rounded-lg from-black from-60% to-blue-700/70 via-40% min-w-[370px] w-[80vw] md:w-screen max-w-[800px] md:justify-evenly flex flex-col md:flex-row h-fit lg:py-12 items-center justify-around shadow-blue-700/90 shadow-xl  lg:flex-col lg:h-screen lg:mt-0 lg:rounded-none lg:w-20">
      <Profile />
      <Updates />
    </div>
  );
}

export default Profile_Updates_Card;
