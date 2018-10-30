import React from 'react';
import PropTypes from 'prop-types';

import { GbCard50 } from '../components/gbCard50';

export const JobsList = ({ jobsList }) => (
	<ul>
		{
			jobsList.map(el => (
				<GbCard50
					cardLink={`open-job/${el.jobbId}`}
					key={el.jobbId}
					type='half-left'
					source={{
						txt: el.companyName,
						link: `/profile/${el.companyId}`
					}}
					postedTime={new Date(el.date).toLocaleDateString("en-US")}
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