import React from 'react';
import PropTypes from 'prop-types';

import { GbCard50 } from '../components/gbCard50';
import { Link } from 'react-router-dom';

export const JobsList = ({ jobsList }) => (
	<ul>
		{
			jobsList.map(el => (
				<GbCard50
					cardLink={`job/${el.jobbId}`}
					key={el.jobbId}
					type='half-left'
					source={{
						txt: el.companyName,
						link: `/profile/${el.companyId}`
					}}
					postedTime={el.date}
					category={el.type}
				>
					{el.title}
				</GbCard50>
			))
		}
	</ul>
)

JobsList.propTypes = {
 jobsList : PropTypes.array.isRequired,
}