import React from "react";
import FrontFace from "./FrontFace";
import BackFace from "./BackFace";

export default function BankCardIndex() {
  return (
    <div className="w-fit flex flex-col items-center">
      <FrontFace />
      <div
        className="-mt-13
       relative z-20"
      >
        <BackFace />
      </div>
    </div>
  );
}
