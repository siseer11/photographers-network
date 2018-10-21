import React from "react";
import { PropTypes } from "prop-types";

export default class Portofolio extends React.Component {
  componentDidMount = () => {
    console.log(this.props.user);
  };

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        {user.portofolio ? (
          <h2>Photos.</h2>
        ) : (
          <h2>You have no photos, add your first one in here.</h2>
        )}
      </React.Fragment>
    );
  }
}
