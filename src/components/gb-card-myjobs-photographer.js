import React from 'react';
import PropTypes from 'prop-types';
import { SourceSVG } from './svg/SourceSVG';

export const MyJobsPhotographer = ({ heading, paragraph, source, date, link }) => {

  return (

    <li className='gb-card-8-sub-card'>
      <div className='gb-card-8-sub-card-info'>
        <h2 className='gb-title-medium'>{heading}</h2>
        <p className='gb-paragraph-small'>{paragraph}</p>
        <ul className='posted-info'>
          <li className='posted-by gb-margin-right-40'>
            <SourceSVG classes="gb-label-icon gb-icon-black-opacity-30 gb-icon-small" />
            <a className='gb-text-black' href={link}>{source}</a>
          </li>
          <li className='posted-at'>
            <p className='gb-text-bold gb-margin-right-8'>Applied on:</p>
            <p>{date}</p>
          </li>
        </ul>
      </div>
    </li>
  );

}

MyJobsPhotographer.propTypes = {
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}