import React from "react";
import PropTypes from "prop-types";

import { GbCard50 } from "./gbCard50";

export const JobsList = ({ jobsList }) => (
  <ul>
    {jobsList.map(el => (
      <li style={{ opacity: el.deleted ? 0.5 : 1 }} key={el.id}>
        <GbCard50
          cardLink={`open-job/${el.id}`}
          type="half-left"
          source={{
            txt: el.companyName,
            link: `/profile/${el.companyId}`
          }}
          postedTime={new Date(el.startDate).toLocaleDateString("en-US")}
          category={el.type}
        >
          {el.title}
        </GbCard50>
      </li>
    ))}
  </ul>
);

JobsList.propTypes = {
  jobsList: PropTypes.array.isRequired
};
