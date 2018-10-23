import React from "react";
import { ClockSVG } from "../../svgs/ClockSVG";

export const DateLabel = ({ date, time, wrapperClass }) => (
  <div className={wrapperClass}>
    <ClockSVG classes="gb-label-icon gb-icon-black-opacity-30 gb-icon-small" />
    <p className="gb-phone-text-black gb-text-black-opacity-50 gb-label gb-label">
      {date}, <span className="gb-text-black-opacity-50">{time}</span>
    </p>
  </div>
);
