import React from "react";
import "./whatsappsvg.css";

const Whatsappsvg = (number) => (
  <svg
    className="whatsappsvg"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="#25d366" height="512" rx="15%" width="512" />
    <path
      d="m123 393 14-65a138 138 0 1 1 50 47z"
      fill="#25d366"
      stroke="#fff"
      stroke-width="26"
    />
    <path
      d="m308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"
      fill="#fff"
    />
  </svg>
);

export default Whatsappsvg;
