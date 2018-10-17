import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export const AppliedPhotographers = ({photographers}) => (
  <div>
    <h3>Photographers who applied:</h3>
    {photographers.map((photographer, key) => {
      return <AppliedPhotographerElement key={key} uid={photographer.uid} name={photographer.displayName}/>
    })}
  </div>
);

const AppliedPhotographerElement = ({uid, name}) => (
  <div className="user-card applied">
    <h3>{name}</h3>
    <Link to={`/profile/${uid}`}>Visit Profile</Link>
    <div>
      <button className="gb-btn gb-btn-small gb-btn-primary">Accept</button>
      <button className="gb-btn gb-btn-small gb-btn-primary">Decline</button>
    </div>
  </div>
);

