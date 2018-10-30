// dependencies
import React from "react";
import WithModal from "../../RenderProp/WithModal";

// components
import { GbCard50 } from "../gbCard50";
import { ArrowDown } from "../svg/ArrowDown";

export default class MyJobsCategoryView extends React.Component {
  state = {
    closed: false
  };

  setClosed = () => {
    this.setState(prevState => ({closed:!prevState.closed}));
  };

  render() {
    const {categoryTitle, jobs} = this.props;
    const {closed} = this.state;

    return (
      <div className="category">
        <div className="title-bar">
          <h2>{categoryTitle}</h2>
          <div onClick={this.setClosed}>
            <ArrowDown classes={`gb-icon-fill-black-opacity-30 gb-icon-small ${closed ? "turned-icon" : ""}`}/>
          </div>
        </div>
        {!closed &&
        (jobs.length > 0 ?
          (<div>
            {
              jobs.map(el => (
                <GbCard50
                  key={el.jobbId}
                  cardLink={`${categoryTitle === "Open" || categoryTitle === "Applied" ? "open" : "progress"}-job/${el.jobbId}`}
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
          <div className="no-jobs">No jobs in this category.</div>)
        }
      </div>
    );
  }
}

