import React from "react";
import { HearthSVG } from "../svg/HearthSVG";

export const LikeLabel = ({ likes, wrapperClass }) => (
  <div className={wrapperClass}>
    <HearthSVG classes="gb-label-icon gb-icon-black-opacity-30 gb-icon-small" />
    <a className="gb-phone-text-black gb-text-black-opacity-50 gb-label gb-label">
      {likes}
    </a>
  </div>
);
