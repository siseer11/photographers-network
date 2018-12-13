import React from "react";
import { RoundExpandButton } from "./svg/RoundExpandButton";
import PropTypes from "prop-types";
import SignUp from "../contents/shared/sign-up/SignUp";
import ReactGA from "react-ga";

export default class Home50hCard extends React.Component {
  state = {
    expanded: false
  };

  expandHandler = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
    ReactGA.event({
      category: "User expanded div",
      action: "Click"
    });
  };

  render() {
    const { backgroundUrl, titleContent, paragraphContent } = this.props;
    const { expanded } = this.state;
    return (
      <div
        className={`gb-home-50h-card-wrapper ${expanded ? "expanded" : ""}`}
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <div className="full-black-overlay gb-background-black-opacity-80 gb-absolute-full-size" />
        <div className="gb-home-50h-card">
          <div className="content-box">
            <div className="text-wrapper gb-text-white">
              {titleContent && (
                <h2 className="content-box-heading">{titleContent}</h2>
              )}
              {paragraphContent && (
                <p className="content-box-paragraph">{paragraphContent}</p>
              )}
            </div>
            <RoundExpandButton
              clickHandler={this.expandHandler}
              classes="gb-icon-large gb-icon gb-icon-white"
            />
          </div>
        </div>
        {expanded && (
          <SignUp
            closeHandler={this.expandHandler}
            match={{ params: { type: "photographer" } }}
          />
        )}
      </div>
    );
  }
}

Home50hCard.propTypes = {
  backgroundUrl: PropTypes.string,
  titleContent: PropTypes.string,
  paragraphContent: PropTypes.string
};
