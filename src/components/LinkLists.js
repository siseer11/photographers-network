import React from "react";
import { PropTypes } from "prop-types";
import { Link, NavLink } from "react-router-dom";

export const LinkLists = ({ links, txtClasses, liClasses }) => (
  <React.Fragment>
    {links.map((el, idx) => (
      <li key={idx} className={liClasses}>
        {el.link ? (
          el.nav ? (
            <NavLink
              className={txtClasses}
              to={`/${el.link}`}
              activeStyle={{
                display: "none"
              }}
            >
              {el.txt ? el.txt : el.icon}
            </NavLink>
          ) : (
            <Link className={txtClasses} to={`/${el.link}`}>
              {el.txt ? el.txt : el.icon}
            </Link>
          )
        ) : (
          <div onClick={el.clickHandler} className={txtClasses}>
            {el.txt}
          </div>
        )}
      </li>
    ))}
  </React.Fragment>
);

LinkLists.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  liClasses: PropTypes.string,
  txtClasses: PropTypes.string
};
