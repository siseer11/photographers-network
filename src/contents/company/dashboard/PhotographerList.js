import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import {Photographer} from "./Photographer";

const PhotographerList = ({photographers}) => {
  if (!isLoaded(photographers)) return <p>Loading...</p>;
  return (
    <ul>
      {
        photographers.map(photographer =>
          <Photographer key={photographer.id} {...photographer}/>
        )
      }
    </ul>
  );
};

const mapStateToProps = state => ({
  photographers: state.firestore.ordered.photographers
});

export default compose(
  firestoreConnect([
    {
      collection: "users",
      where: [["type", "==", "photographer"]],
      storeAs: "photographers"
    }
  ]),
  connect(mapStateToProps)
)(PhotographerList);