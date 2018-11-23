import React from "react";

export const CategoryLabel = ({ txtColor, category }) => (
  <div className="card-label-item gb-grow-one">
    <a href="/" className={`${txtColor} gb-label gb-underline`}>
      {category}
    </a>
  </div>
);
