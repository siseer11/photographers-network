import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Avatar} from "./Avatar";

export const PhotographerCard = ({uid, userPic, userName, userLocation}) => {
  let path = `/profile/${uid}`;
  return (
    <div className="user-card">
      <Avatar userImageUrl={userPic}/>
      <h2>{userName}</h2>
      <h5>{userLocation}</h5>
      <Link to={path} className="gb-btn gb-btn-small gb-btn-primary">View profile</Link>
    </div>
  )
};
