import React from "react";
import PropTypes from "prop-types";
import { SourceLabel } from "./label/SourceLabel";
import { TimeLabel } from "./label/TimeLabel";
import { CategoryLabel } from "./label/CategoryLabel";

export const GbCardLabel = ({
 iconColor,
 txtColor,
 source,
 time,
 category
}) => (
  <div className="gb-card-label">
   {source && (
    <SourceLabel 
     iconColor={iconColor} 
     txtColor={txtColor} 
     source={source.txt}
     link={source.link} 
    />
   )}
   {time && (
    <TimeLabel iconColor={iconColor} txtColor={txtColor} time={time} />
   )}
   {category && (
    <CategoryLabel
     iconColor={iconColor}
     txtColor={txtColor}
     category={category}
    />
   )}
  </div>
 );

GbCardLabel.propTypes = {
 iconColor: PropTypes.string.isRequired,
 txtColor: PropTypes.string.isRequired,
 time: PropTypes.string,
 category: PropTypes.string
};