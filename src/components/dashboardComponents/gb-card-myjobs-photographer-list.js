import React, { Component } from "react";
import PropTypes from 'prop-types';
import { MyJobsPhotographer } from './gb-card-myjobs-photographer';

export const MyJobsPhotographerList = ({ data }) => {
  return (

    <div className='gb-card-8-wrapper'>
      <ul className='gb-card-8-sub-cards'>
        {
          data.map((cardlist) => (
            <MyJobsPhotographer
              heading={cardlist.heading}
              paragraph={cardlist.paragraph}
              source={cardlist.source}
              date={cardlist.date}
              image={cardlist.image}
            />
          ))
        }
      </ul>
    </div>

  );
};

MyJobsPhotographerList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array).isRequired
}