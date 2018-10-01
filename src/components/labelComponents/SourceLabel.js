import React from "react";
import { SourceSVG } from "../svg/SourceSVG";

export const SourceLabel = ({ iconColor, txtColor, source }) => (
  <div className="card-label-item">
    <SourceSVG classes={`gb-label-icon gb-icon-small ${iconColor}`} />
    <a href="#" className={`${txtColor} gb-label`}>
      {source}
    </a>
  </div>
);
