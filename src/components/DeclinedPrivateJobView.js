import React from "react";

export const DeclinedPrivateJobView = ({
  date,
  description,
  location,
  price,
  title,
  type,
  makePublic,
  deleteJob,
  editDeleteStatus
}) => (
  <div className="job-view-private">
    <h2>Job title : {title}</h2>
    <p>Description : {description}</p>
    <h2>Budget : {price} </h2>
    <h5>Type of photography : {type} </h5>
    <p>Location : {location} </p>
    <p>Date : {new Date(date).toLocaleDateString()} </p>
    <div className="accept-reject-buttons">
      {editDeleteStatus ? (
        <div className="status">{editDeleteStatus}</div>
      ) : (
        <React.Fragment>
          <div className="accpet-button" onClick={makePublic}>
            Make job public
          </div>
          <div className="reject-button" onClick={deleteJob}>
            Delete Job
          </div>
        </React.Fragment>
      )}
    </div>
  </div>
);
