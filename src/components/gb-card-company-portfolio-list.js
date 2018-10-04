import React from 'react';
import PropTypes from 'prop-types';
import { CompanyPortfolio } from './gb-card-company-portfolio';
import '../style/gb-style.css';

export const CompanyPortfolioList = ({ card }) => {

  return (
<div>
    <div className="gb-card-one-wrapper">
      <ul className="gb-card-one">
        {
          card.map((cardlist) => (
            <CompanyPortfolio
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
</div>
  );
};

CompanyPortfolioList.propTypes = {
  card: PropTypes.arrayOf(PropTypes.array).isRequired
}