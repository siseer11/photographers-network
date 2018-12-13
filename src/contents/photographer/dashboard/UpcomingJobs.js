import React from "react";
import calendarIconURL from '../../../png-icons/calendar-icon.png';
import locationIconURL from '../../../png-icons/location-icon.png';
import timelineIconURL from '../../../png-icons/timeline-icon.png';

export const UpcomingJobs = () => (
  <div>
    <div className="time-box">
      <div className="col">
        <img src={calendarIconURL} alt="calendar-icon" className="icon"/>
        <h3 className="uppercase">Monday</h3>
        <p className="small-grey-bold">December 17, 2018</p>
      </div>
      <div className="col">
        <img src={timelineIconURL} alt="timeline-icon" className="icon"/>
        <h1>16:00</h1>
      </div>
      <div className="col">
        <img src={locationIconURL} alt="location-icon" className="icon"/>
        <h3>Stockholm</h3>
        <p className="small-grey-bold">Skyttevägen 29, <br/>133 36 Saltsjöbaden</p>
      </div>
    </div>
    <div className="light-grey-box">
      <h2 className="uppercase">Job title</h2>
      <p className="description">According to the National Oceanic and
        Atmospheric Administration, Ted Scambos,
        NSIDC lead scientist, puts the potentially
        record low maximum sea ice extent this year
        down to low ice extent in the Pacific.</p>
      <div className="contact-container">
        <div className="white-circle">C</div>
        <div className="white-circle">C</div>
        <p className="uppercase light small">Company's contacts</p>
      </div>
    </div>
    <div className="black-yellow-box">
      <span className="uppercase light">Price Amount</span>
      <b>200,00€</b>
    </div>
  </div>
);