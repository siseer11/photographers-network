import React from "react";

export const BurgerMenuSVG = ({ classes }) => (
  <svg
    className={classes}
    id="menu"
    viewBox="0 0 42 34"
    width="100%"
    height="100%"
  >
    <title>menu</title>
    <path
      d="M0 1H40"
      transform="translate(1 32)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M0 1H30"
      transform="translate(1 16)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M0 1H40"
      transform="translate(1)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);