import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {TimeLabel} from "../label/TimeLabel";

export const Notification = ({ type, postedTime, children, cardLink, read, clickHandler, index, showHandler }) => (
  <div className={`gb-card-12 ${ !read && "new-notification" }`} onClick={()=> clickHandler(index)}>
    <div className="text-content">
      <Link onClick={showHandler} to={cardLink} className={`card-title gb-text-black gb-title-medium full-width-height ${
        type === "full" ? "gb-desktop-text-white gb-desktop-title-large" : ""
        }`}>
        {children}
      </Link>
      <div className="gb-card-label">
        <TimeLabel iconColor='gb-icon-black-opacity-30' txtColor='gb-text-black' time={postedTime} />
      </div>
    </div>
  </div>
);

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  postedTime: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

Notification.defaultProps = {
  background: 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=f0f2eb77096c182d2c0c63982286e2b2',
};