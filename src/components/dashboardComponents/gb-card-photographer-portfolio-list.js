import React from 'react';
import PropTypes from 'prop-types';
import { PhotographerPortfolio } from './gb-card-photographer-portfolio';
import '../../style/gb-style.css';

export const PhotographerPortfolioList = ({ card }) => {

  return (
    <div className="gb-card-one-wrapper">
      <ul className="gb-card-one">
        {
          card.map((cardList, key) => (
            <PhotographerPortfolio
              key={key}
              follower={cardList.follower}
              category={cardList.category}
              background={cardList.background}
              buttonLink= {cardList.buttonLink}
              buttonValue= {cardList.buttonValue}
              buttonClass= {cardList.buttonClass}
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