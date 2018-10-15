import React from 'react';
import { PhotographerCard } from './PhotographerCard';
import PropTypes from 'prop-types';

export const PhotographerResults = ({ photographers }) => (
	<React.Fragment>
		{photographers.map((photographer, key) => {
			return (<PhotographerCard key={key} uid={photographer.uid} userPic={photographer.photoURL} userName={photographer.displayName}
				userLocation={photographer.location} />);
		})}
	</React.Fragment>
);

PhotographerResults.propTypes = {
	photographers : PropTypes.array,
}