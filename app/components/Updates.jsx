import React from "react";
import UpdateCard from "./UpdateCard";
import { TrendSpotCarousel, TrendSpotCarouselUpdate } from "./T_Carousel";

function Updates() {
  const updatesArray = [
    {
      randomDate: "Aug, 3rd",
      update:
        "Built handy sites with Craft/WordPress. @framer tackling CMS is mind-boggling.",
    },
    {
      randomDate: "Jul, 15th",
      update:
        "Exploring new features in the latest software update. Very impressed so far.",
    },
    {
      randomDate: "Jul, 30th",
      update:
        "Discovered some cool plugins for enhancing site performance and security.",
    },
    {
      randomDate: "Aug, 10th",
      update:
        "Tested a new workflow for content creation. Results are promising.",
    },
    {
      randomDate: "Aug, 25th",
      update:
        "Collaborating with a team on a new project. The progress is fantastic.",
    },
  ];

 

  return (
    <div className="h-full flex justify-center">
      

      <TrendSpotCarouselUpdate information={updatesArray} />
    </div>
  );
}

export default Updates;
