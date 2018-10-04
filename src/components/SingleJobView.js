import React from 'react';
import {Link} from 'react-router-dom';

export const SingleJobView = ({companyId,companyName,date,description,location,price,title,type}) => (
 <React.Fragment>
  <h2 style={{marginBottom:50}}>Single Job Page</h2>
  <p>Job Title: {title}</p><hr/>
  <p>Job Descrition: {description}</p><hr/>
  <p>Job for the date of : {date}</p><hr/>
  <p>Job in : <Link to={`../jobs?location=${location}`}>{location}</Link></p><hr/>
  <p>Bugdget of : {price} SEK</p><hr/>
  <p>Type of job : <Link to={`../jobs?type=${type}`}>{type}</Link> </p><hr/>
  <p>Posted by: <Link to={`../profile/${companyId}`}>{companyName}</Link></p><hr/>
 </React.Fragment>
)