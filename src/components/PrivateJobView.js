import React from "react";
import { Link } from "react-router-dom";

export const PrivateJobView = ({
  companyId,
  company,
  startDate,
  description,
  location,
  address,
  priceAmount,
  title,
  requestedSkill,
  acceptJobReq,
  rejectJobReq,
  jobId,
  status
}) => {
  return (
    <div className="job-view-private">
      <h2>Job title : {title}</h2>
      <p>Description : {description}</p>
      <h2>Budget : {priceAmount} </h2>
      <h5>Type of photography : {requestedSkill} </h5>
      <p>
        Location : {location}, {address}
      </p>
      <p>Date : {new Date(startDate).toLocaleDateString()} </p>
      <p>
        Company :{" "}
        <Link to={`/profile/${companyId}`}>{company.companyName}</Link>{" "}
      </p>
      <div className="accept-reject-buttons">
        <div
          className="accpet-button"
          onClick={() => acceptJobReq(jobId, title, companyId)}
        >
          Accept Request
        </div>
        <div
          className="reject-button"
          onClick={() => rejectJobReq(jobId, title, companyId, status)}
        >
          Reject Request
        </div>
      </div>
    </div>
  );
};
