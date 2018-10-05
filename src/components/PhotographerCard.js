import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from "./Avatar";
import PropTypes from 'prop-types';

export const PhotographerCard = ({ uid, userPic, userName, userLocation }) => {
	let path = `/profile/${uid}`;
	return (
		<div className="user-card">
			<Avatar userImageUrl={userPic} />
			<h2>{userName}</h2>
			<h5>{userLocation}</h5>
			<Link to={path} className="gb-btn gb-btn-small gb-btn-primary">View profile</Link>
		</div>
	)
};

PhotographerCard.propTypes = {
	uid: PropTypes.string.isRequired, 
	userPic: PropTypes.string, 
	userName: PropTypes.string.isRequired, 
	userLocation: PropTypes.string.isRequired 	
}