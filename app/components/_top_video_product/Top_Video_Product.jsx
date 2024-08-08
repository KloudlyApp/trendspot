"use client";

import React, { useState } from "react";
import PreviewContainer from "../PreviewContainer";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function Top_Video_Product() {
  const [toggleProduct, settoggleProduct] = useState(true);
  return (
    <div className="mt-6">
      <div className=" flex items-center justify-center">
        <h2 className="bg-[#7F8CFC]  w-fit py-3 px-8 rounded-3xl hover:scale-110 transition-all delay-100">
          Top Video Products
        </h2>
        {toggleProduct ? (
          <div
            className="flex  ml-6 border rounded p-2"
            onClick={() => {
              settoggleProduct(!toggleProduct);
            }}>
            {" "}
            Hide <ChevronDownIcon className="ml-1" />
          </div>
        ) : (
          <div
            className="flex  ml-6 border rounded p-2"
            onClick={() => {
              settoggleProduct(!toggleProduct);
            }}>
            {" "}
            Show <ChevronUpIcon className="ml-1" />
          </div>
        )}
      </div>

      {toggleProduct && <PreviewContainer />}
    </div>
  );
}

export default Top_Video_Product;
