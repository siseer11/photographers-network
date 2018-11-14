import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

const RandomComponent = ({ users }) => {
  return (
    <div style={{ marginTop: 100 }}>
      <h2>{!isLoaded(users) ? <h2>Loading...</h2> : <h2>Done!</h2>}</h2>
    </div>
  );
};

const mapStateToPros = state => ({
  users: state.firestore.ordered.users
});

export default compose(
  connect(mapStateToPros),
  firestoreConnect([
    {
      collection: "users"
    }
  ])
)(RandomComponent);
