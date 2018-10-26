import React from "react";
import { PropTypes } from "prop-types";

export const ChoseTypeHireMe = ({ typeHandler }) => (
  <div className="hire-me-type-selector">
    <div onClick={() => typeHandler("new-job")} className="hire-me-type-one">
      <h2>Create a new job offer.</h2>
      <div className="my-fency-button">Select</div>
    </div>
    <div
      onClick={() => typeHandler("existing-job")}
      className="hire-me-type-one"
    >
      <h2>Select from one of your jobs.</h2>
      <div className="my-fency-button">Select</div>
    </div>
  </div>
);

ChoseTypeHireMe.propTypes = {
  typeHandler: PropTypes.func.isRequired
};
