import React from 'react';
import {Button} from "../Button";

export const SubmittedWork = ({pictures}) => (
  <div className="submitted-work">
    <h2>Submitted work:</h2>
    <div className="btn-container">
      <Button classes="gb-btn gb-btn-medium gb-btn-primary">Approve</Button>
      <Button classes="gb-btn gb-btn-medium gb-btn-primary">Disapprove</Button>
    </div>
    <div className="image-container">
      {
        pictures.map(picture => (
          <div className="single-image-container" key={picture.id}>
            <img src={picture.url}/>
          </div>
        ))
      }
    </div>
  </div>
);