import React from "react";
import { Link } from "react-router-dom";

export const PrivateJobView = ({
  companyId,
  companyName,
  date,
  description,
  location,
  price,
  title,
  type,
  acceptJobReq,
  rejectJobReq
}) => (
  <div className="job-view-private">
    <h2>Job title : {title}</h2>
    <p>Description : {description}</p>
    <h2>Budget : {price} </h2>
    <h5>Type of photography : {type} </h5>
    <p>Location : {location} </p>
    <p>Date : {new Date(date).toLocaleDateString()} </p>
    <p>
      Company : <Link to={`/profile/${companyId}`}>{companyName}</Link>{" "}
    </p>
    <div className="accept-reject-buttons">
      <div className="accpet-button" onClick={acceptJobReq}>
        Accept Request
      </div>
      <div className="reject-button" onClick={rejectJobReq}>
        Reject Request
      </div>
    </div>
  </div>
);
