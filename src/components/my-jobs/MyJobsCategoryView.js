// dependencies
import React from "react";
import WithModal from "../../RenderProp/WithModal";

// components
import { GbCard50 } from "../gbCard50";
import { ArrowDown } from "../svg/ArrowDown";

export const MyJobsCategoryView = ({ categoryTitle, jobs }) => (
  <WithModal closeItemClass="close-acordeon">
    {({ showModal }) => (
      <div className="category">
        <div className="title-bar close-acordeon">
          <h2>{categoryTitle}</h2>
          <ArrowDown
            style={{ opacity: showModal ? 0.5 : 1 }}
            classes={`gb-icon-fill-black-opacity-30 gb-icon-small close-acordeon`}
          />
        </div>
        {jobs.length > 0 ? (
          <div className={showModal ? "not-expanded" : "expanded"}>
            {jobs.map(el => (
              <GbCard50
                key={el.jobbId}
                cardLink={`${
                  categoryTitle === "Open" ? "open" : "progress"
                }-job/${el.jobbId}`}
                type="half-left"
                source={{
                  txt: el.companyName,
                  link: `/profile/${el.companyId}`
                }}
                postedTime={new Date(el.date).toLocaleDateString("en-US")}
                category={el.type}
              >
                {el.title}
              </GbCard50>
            ))}
          </div>
        ) : (
          <div
            style={{ display: showModal ? "none" : "block" }}
            className="no-jobs"
          >
            No jobs in this category.
          </div>
        )}
      </div>
    )}
  </WithModal>
);
