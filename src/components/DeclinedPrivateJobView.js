import React from "react";

export const DeclinedPrivateJobView = ({
  startDate,
  description,
  location,
  adress,
  priceAmount,
  title,
  requestedSkill,
  makePublic,
  deleteJob,
  jobId,
  editDeleteStatus
}) => (
  <div className="job-view-private">
    <h2>Job title : {title}</h2>
    <p>Description : {description}</p>
    <h2>Budget : {priceAmount} </h2>
    <h5>Type of photography : {requestedSkill} </h5>
    <p>
      Location : {location} {adress}
    </p>
    <p>Date : {new Date(startDate).toLocaleDateString()} </p>
    <div className="accept-reject-buttons">
      {editDeleteStatus ? (
        <div className="status">{editDeleteStatus}</div>
      ) : (
        <React.Fragment>
          <div className="accpet-button" onClick={() => makePublic(jobId)}>
            Make job public
          </div>
          <div className="reject-button" onClick={() => deleteJob(jobId)}>
            Delete Job
          </div>
        </React.Fragment>
      )}
    </div>
  </div>
);
