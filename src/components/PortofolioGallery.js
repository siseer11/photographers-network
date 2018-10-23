import React from "react";
import { PropTypes } from "prop-types";

export const PortofolioGallery = ({ photosList }) => (
  <ul className="portofolio-list">
    {photosList.map(el => (
      <li key={el.id} className="portofolio-image">
        <img src={el.link} alt={el.desc} />
      </li>
    ))}
  </ul>
);

PortofolioGallery.propTypes = {
  photosList: PropTypes.array.isRequired
};
