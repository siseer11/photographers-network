import React from 'react';
import {Button} from "../Button";

export const DeleteModal = ({title, description, yesHandler, noHandler}) => (
  <div className="modal-become-premium close-modal">
    <div className="modal-inner-box">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="btn-container">
        <Button classes="gb-btn gb-btn-medium gb-btn-primary" clickHandler={yesHandler}>Yes</Button>
        <Button classes="gb-btn gb-btn-medium gb-btn-primary"
                clickHandler={noHandler}>No</Button>
      </div>
    </div>
  </div>
);