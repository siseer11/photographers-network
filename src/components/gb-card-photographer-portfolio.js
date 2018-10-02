import React from 'react';
import PropTypes from 'prop-types';
import '../style/gb-style.css';
import { Button } from './Button';

export const PhotographerPortfolio = ({ follower, category, background, buttonLink, buttonClass, buttonValue }) => {

  return (

    <li className="gb-card-one-image" style={{ backgroundImage: `url(${background})` }}>
      <div className="gb-card-one-info">
        <p className="gb-phone-title-tiny gb-title-large">{category}</p>
        <div className="gb-card-one-btn-wrapper">
          <Button
            link= {buttonLink}
            classes={buttonClass}
            children={buttonValue}
          />
        </div>
      </div>

      <div className="gb-card-one-avatars-wrapper">
        <div className="gb-title-small">
          <p>Reviewers</p>
        </div>
        <div className="gb-card-one-follower-avatar">
          <div className="gb-card-one-avatars-container">
            {
              follower.map((item, index) => (
                <img src={item.url} alt={item.alt} key={index} className="gb-avatar gb-avatar-small" />
              ))
            }
          </div>
        </div>
      </div>
    </li>
  );
}

PhotographerPortfolio.propTypes = {
  follower: PropTypes.arrayOf(PropTypes.array).isRequired,
  category: PropTypes.string.isRequired,
  background: PropTypes.object.isRequired,
}