import React from 'react';
import PropTypes from 'prop-types';
import { PhotographerPortfolio } from './gb-card-photographer-portfolio';
import '../style/gb-style.css';

export const PhotographerPortfolioList = ({ card }) => {

  return (
    <div className="gb-card-one-wrapper">
      <ul className="gb-card-one">
        {
          card.map((cardlist) => (
            <PhotographerPortfolio
              
              
              follower={cardlist.follower}
              category={cardlist.category}
              background={cardlist.background}
              buttonLink= {cardlist.buttonLink}
              buttonValue= {cardlist.buttonValue}
              buttonClass= {cardlist.buttonClass}
            />
          ))
        }
      </ul>
    </div>

  );
};

PhotographerPortfolioList.propTypes = {
  card: PropTypes.arrayOf(PropTypes.array).isRequired
}