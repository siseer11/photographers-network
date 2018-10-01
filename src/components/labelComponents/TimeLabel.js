import React from "react";
import { ClockSVG } from "../svg/ClockSVG";

export const TimeLabel = ({ iconColor, txtColor, time }) => (
  <div className="card-label-item">
    <ClockSVG classes={`gb-label-icon gb-icon-small ${iconColor}`} />
    <p className={`${txtColor} gb-label`}>{time}</p>
  </div>
);
