import React from "react";
import { RoundExpandButton } from "./svg/RoundExpandButton";
import SignUp from "../contents/shared/sign-up/SignUp.js";
import PropTypes from "prop-types";

export default class Home50hCard extends React.Component {
  state = {
    expanded: false
  };

  triggerExpand = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };

  render() {
    const { backgroundUrl, titleContent, paragraphContent } = this.props;
    return (
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
          <RoundExpandButton
            classes="gb-icon-large gb-icon gb-icon-white"
            handler={this.triggerExpand}
          />
          {this.state.expanded && (
            <SignUp match={{ params: { type: "photographer" } }} />
          )}
        </div>
      </div>
    );
  }
}

Home50hCard.propTypes = {
  backgroundUrl: PropTypes.string,
  titleContent: PropTypes.string,
  paragraphContent: PropTypes.string
};

/*

  */
