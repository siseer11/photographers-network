// dependencies
import React from "react";

// components
import {GbCard50} from '../gbCard50';
import {ArrowDown} from "../svg/ArrowDown";

export const MyJobsCategoryView = ({categoryTitle, jobs}) => (
  <div className="category">
    <div className="title-bar">
      <h2>{categoryTitle}</h2>
      <ArrowDown classes={`gb-icon-fill-black-opacity-30 gb-icon-small`}/>
    </div>
    {jobs.length > 0 ?
      (<div>
        {
          jobs.map(el => (
            <GbCard50
              key={el.jobbId}
              cardLink={`job/${el.jobbId}`}
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
      </div>) :
      <div className="no-jobs">No jobs in this category.</div>
    }

  </div>
);