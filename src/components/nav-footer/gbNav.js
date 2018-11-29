import React from "react";
import { PropTypes } from "prop-types";
import { SmallLogoSVG } from "../svg/SmallLogoSVG";
import { LinkLists } from "../LinkLists";
import { Link } from "react-router-dom";
import { RightUserOn } from "./RightUserOn";
import { connect } from "react-redux";
import { signOutUser } from "../../redux/actions/user-action";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class GbNavBar extends React.Component {
  state = {
    sticky: false,
    showNotificationBox: false,
    links: [{ txt: "Sign in", link: "signIn" }],
    homeLink: "home",
    userLinks: []
  };

  componentDidMount() {
    window.addEventListener("scroll", this.stickyNav);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.stickyNav);
  }

  stickyNav = e => {
    this.setState({
      sticky: window.pageYOffset > 0
    });
  };

  showNotificationsHandler = () => {
    this.setState(prev => {
      return {
        showNotificationBox: !prev.showNotificationBox
      };
    });
  };

  render() {
    const { userData: user, signOutUser, auth, profile } = this.props;

    let righLinks = [{ txt: "Sign in", link: "signIn" }];
    let homeLink = "home";
    let userLinks;

    if (auth.uid) {
      righLinks = [];
      homeLink = "dashboard";

      const company = profile.type === "company";

      let specificLinks = [
        {
          txt: company ? "Create job" : "Jobs",
          link: company ? "createJob" : "jobs"
        }
      ];

      if (company) {
        specificLinks.push({
          txt: "Search for photographers",
          link: "search-photographers"
        });
      }

      userLinks = [
        {
          txt: "Profile",
          link: `profile/${auth.uid}`
        },
        {
          txt: "Dashboard",
          link: "dashboard"
        },
        {
          txt: "Edit profile",
          link: "ProfileEdit"
        },
        {
          txt: "Payouts",
          link: `payouts/${profile.type}`
        },
        ...specificLinks,
        { txt: "Sign out", clickHandler: signOutUser }
      ];
    }

    const { showNotificationBox } = this.state;
    return (
      <div className={`gb-navbar ${this.state.sticky ? "sticky" : ""}`}>
        <Link to={`/${homeLink}`} className="left-content">
          <SmallLogoSVG classes="gb-icon-medium gb-icon-fill-white" />
        </Link>
        <ul className="right-content">
          <LinkLists
            links={righLinks}
            txtClasses="gb-text-white gb-paragraph-medium"
          />
          {profile.type === "admin" &&
          <LinkLists
            links={[{ txt: "Sign out", clickHandler: signOutUser}]}
            txtClasses="gb-text-white gb-paragraph-medium"
          />}
          {auth.uid && profile.type !== "admin" && (
            <RightUserOn
              showNotificationsHandler={this.showNotificationsHandler}
              newNotifications={this.props.newNotifications}
              showNotificationBox={showNotificationBox}
              user={user}
              userImageUrl={profile.profileImageUrl}
              userLinks={userLinks}
            />
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const notifications = state.firestore.ordered.unreadNotifications;
  return {
    newNotifications: notifications ? notifications.length > 0 : false,
    auth: state.firebase.auth,
    userOn: state.firebase.auth.uid,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => ({
  signOutUser: () => dispatch(signOutUser())
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "notifications",
        //orderBy: ['createdAt', 'desc'],
        where: [
          ["recipientUserId", "==", props.auth.uid],
          ["read", "==", false]
        ],
        storeAs: "unreadNotifications"
      }
    ];
  })
)(GbNavBar);

GbNavBar.propTypes = {
  righLinks: PropTypes.arrayOf(PropTypes.object),
  userImageUrl: PropTypes.string,
  profileLink: PropTypes.string
};
