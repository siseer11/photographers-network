import React from "react";
import PropTypes from 'prop-types';
import { GbCardLabel } from "./gbCardLabel";

export const GbCard50 = ({ background, type , source , postedTime , category , children}) => (
  <div
    className={`gb-card-12 ${
      type == "half-left" ? 
        "gb-card-12-image-left" 
        : type == 'full' ?
          "gb-card-12-full-desktop" 
          : "gb-card-12-image-right"
      }`
    }
  >
    <div
      className="card-image gb-phone-hide"
      style={{ backgroundImage: `url(${background})` }}
    />
    <div className="text-content">
      <h1
        className={`card-title gb-text-black gb-title-medium ${
          type === "full" ? "gb-desktop-text-white gb-desktop-title-large" : ""
        }`}
      >
        {children}
      </h1>
      <GbCardLabel
        txtColor={`gb-text-black ${
          type === "full" ? "gb-desktop-text-white" : ""
        }`}
        iconColor={`gb-icon-black-opacity-30 ${
          type === "full" ? "gb-desktop-icon-white-opacity-50" : ""
        }`}
        source={source}
        time={postedTime}
        category={category}
      />
    </div>
  </div>
);

GbCard50.propTypes = {
  background : PropTypes.string.isRequired,
  type : PropTypes.string.isRequired,
  postedTime : PropTypes.string.isRequired,
  category : PropTypes.string.isRequired,
  children : PropTypes.string.isRequired,
}