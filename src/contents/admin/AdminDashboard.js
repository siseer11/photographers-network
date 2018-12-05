import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

class AdminDashboard extends Component {
  render() {
    if(this.props.profile.type !== "admin") return <Redirect to="/signin"/>;
    return (
      <div className="section-content with-padding">
        <h1>Admin Area</h1>
        <Link to="/payouts/company" className="gb-btn gb-btn-medium gb-btn-primary">View company payouts</Link>
        <Link to="/payouts/photographer" className="gb-btn gb-btn-medium gb-btn-primary">View photographer payouts</Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  profile: state.firebase.profile
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard);
