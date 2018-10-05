import React from "react";
import PropTypes from 'prop-types';
import { GbCardLabel } from "./gbCardLabel";
import { Link } from 'react-router-dom';

export const GbCard50 = ({ background, type, source, postedTime, category, children, cardLink }) => (
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
      <Link to={cardLink} className={`card-title gb-text-black gb-title-medium full-width-height ${
        type === "full" ? "gb-desktop-text-white gb-desktop-title-large" : ""
        }`}>
        {children}
      </Link>
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
  background: PropTypes.string,
  type: PropTypes.string.isRequired,
  postedTime: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}

GbCard50.defaultProps = {
  background: 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=f0f2eb77096c182d2c0c63982286e2b2',
}