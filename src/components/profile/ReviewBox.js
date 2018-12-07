import React from "react";
import {Avatar} from "../label/Avatar";
import {ArrowSVG} from "../svg/ArrowSVG";

export const ReviewBox = ({title, userImageURL, name, quote}) => (
  <div className="review-box">
    <h2>{title}</h2>
    <Avatar userImageUrl={userImageURL}/>
    <h3>{name}</h3>
    <p>“{quote}”</p>
    <ArrowSVG classes="gb-icon-medium"/>
  </div>
);