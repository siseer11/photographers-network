import React from "react";

export const ClockSVG = ({ classes }) => {
  return (
    <svg
      className={classes}
      id="clock"
      viewBox="0 0 30 30"
      width="100%"
      height="100%"
    >
      <title>clock</title>
      <g>
        <path
          d="M15 29C7.26791 29 1 22.7341 1 15C1 7.27005 7.26809 1 15 1C22.7319 1 29 7.27005 29 15C29 22.7341 22.7321 29 15 29Z"
          strokeWidth="2"
        />
        <path d="M8 10H0V0" transform="translate(14 8)" strokeWidth="2" />
      </g>
    </svg>
  );
};