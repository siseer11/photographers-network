import React from "react";
import { Link } from "react-router-dom";

export const JobDescription = ({
  title,
  description,
  startDate,
  location,
  priceAmount,
  requestedSkill,
  companyName,
  companyId
}) => (
  <React.Fragment>
    <h2 style={{ marginBottom: 50 }}>Single Job Page</h2>
    <p>Job Title: {title}</p>
    <hr />
    <p>Job Descrition: {description}</p>
    <hr />
    <p>Job for the date of : {new Date(startDate).toLocaleDateString()}</p>
    <hr />
    <p>
      Job in : <Link to={`../jobs?location=${location}`}>{location}</Link>
    </p>
    <hr />
    <p>Bugdget of : {priceAmount} SEK</p>
    <hr />
    <p>
      <Link to={`../jobs?type=${requestedSkill}`}>{requestedSkill}</Link>
    </p>
    <hr />
    <p>
      Posted by: <Link to={`../profile/${companyId}`}>{companyName}</Link>
    </p>
    <hr />
  </React.Fragment>
);
