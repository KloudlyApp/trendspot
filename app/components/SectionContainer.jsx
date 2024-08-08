import React from "react";
import Profile_Updates_Card from "./Profile_Updates_Card";
import Top_Video_Product from "./_top_video_product/Top_Video_Product";
import DetailCard from "./DetailCard";

function SectionContainer() {
  return (
    <div className="flex flex-col">
      <Profile_Updates_Card />
      <DetailCard />
      <Top_Video_Product />
    </div>
  );
}

export default SectionContainer;
