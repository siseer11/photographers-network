import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from "../Button";

export const AppliedPhotographers = ({photographers, acceptHandler, declineHandler}) => (
  <div>
    {photographers.length > 0 ?
      (<React.Fragment>
        <h3>Photographers who applied:</h3>
        {photographers.map((photographer, key) => {
          return <AppliedPhotographerElement key={key} uid={photographer.uid} name={photographer.displayName}
                                             acceptHandler={acceptHandler} declineHandler={declineHandler}/>
        })}
      </React.Fragment>) :
      (<h3>No photographers applied for this job yet.</h3>)
    }
  </div>
);

const AppliedPhotographerElement = ({uid, name, acceptHandler, declineHandler}) => (
  <div className="user-card applied">
    <h3>{name}</h3>
    <Link to={`/profile/${uid}`}>Visit Profile</Link>
    <div>
      <Button clickHandler={() => acceptHandler(uid)} classes="gb-btn gb-btn-small gb-btn-primary">Accept</Button>
      <Button clickHandler={() => declineHandler(uid)} classes="gb-btn gb-btn-small gb-btn-primary">Decline</Button>
    </div>
  </div>
);

