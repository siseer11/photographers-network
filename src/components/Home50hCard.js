import React from "react";
import { RoundExpandButton } from "./svg/RoundExpandButton";
import PropTypes from "prop-types";

export const Home50hCard = ({
  backgroundUrl,
  titleContent,
  paragraphContent
}) => (
  <div
    className="gb-home-50h-card"
    style={{ backgroundImage: `url(${backgroundUrl})` }}
  >
    <div className="full-black-overlay gb-background-black-opacity-80 gb-absolute-full-size" />
    <div className="content-box">
      <div className="text-wrapper gb-text-white">
        {titleContent && (
          <h2 className="content-box-heading">{titleContent}</h2>
        )}
        {paragraphContent && (
          <p className="content-box-paragraph">{paragraphContent}</p>
        )}
      </div>
      <RoundExpandButton classes="gb-icon-large gb-icon gb-icon-white" />
    </div>
  </div>
);

Home50hCard.propTypes = {
  backgroundUrl: PropTypes.string,
  titleContent: PropTypes.string,
  paragraphContent: PropTypes.string
};
