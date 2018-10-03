import React from "react";
import { SourceSVG } from "../svg/SourceSVG";
import {Link} from 'react-router-dom'

export const SourceLabel = ({ iconColor, txtColor, source, link }) => (
  <div className="card-label-item">
    <SourceSVG classes={`gb-label-icon gb-icon-small ${iconColor}`} />
    <Link to={link} className={`${txtColor} gb-label`}>
      {source}
    </Link>
  </div>
);
