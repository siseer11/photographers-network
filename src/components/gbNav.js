import React from "react";
import { PropTypes } from "prop-types";
import { SmallLogoSVG } from "./svg/SmallLogoSVG";
import { Avatar } from "./Avatar";
import { LinkLists } from "./LinkLists";
import {Link} from 'react-router-dom';

/* rightLinks = [{txt : 'home' , link : '#'}] loggedIn={true/false} userImageUrl='link' profileLink='#'*/
export default class GbNavBar extends React.Component {
  state = {
    sticky : false
  };

  componentDidMount() {
    window.addEventListener('scroll', this.stickyNav);
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.stickyNav);
  }

  stickyNav = (e) => {
    this.setState({
      sticky : window.pageYOffset > 0
    })
  };

  render() {
    const { righLinks, loggedIn, userImageUrl, profileLink, homeLink } = this.props;
    return (
      <div className={`gb-navbar ${this.state.sticky?'sticky':''}`}>
        <Link to={`/${homeLink}`} className="left-content">
          <SmallLogoSVG classes="gb-icon-medium gb-icon-fill-white" />
        </Link>
        <ul className="right-content">
          {loggedIn ? (
            <React.Fragment>
              <LinkLists
                links={righLinks}
                txtClasses="gb-text-white gb-paragraph-medium gb-tablet-hide"
              />
              <Avatar
                userImageUrl={userImageUrl}
                classes="gb-avatar-small"
                profileLink={profileLink}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <LinkLists
                links={righLinks}
                txtClasses="gb-text-white gb-paragraph-medium"
              />
            </React.Fragment>
            )}
        </ul>
      </div>
    )
  }
}


  GbNavBar.propTypes = {
    righLinks: PropTypes.arrayOf(PropTypes.object),
    loggedIn: PropTypes.bool.isRequired,
    userImageUrl: PropTypes.string,
    profileLink: PropTypes.string
  };
