import React from "react";
import PropTypes from "prop-types";
import { LinkLists } from "../LinkLists";

/* links = [{'txt' : 'About us' , 'link' : '#'}] socialMedias=[{icon: <InstagramSVG className=''/>,href:'#'}]*/
export const GbFooter = ({ links, socialMedias }) => (
  <div className="gb-footer gb-background-black-opacity-5">
    <div className="footer-wrapper">
      <ul className="footer-nav">
        {
          links &&
          <LinkLists
            links={links}
            txtClasses="gb-text-black-opacity-30 gb-subtitle-medium"
            liClasses="footer-nav-item"
          />
        }
      </ul>
      <ul className="footer-social-media-list">
        {
          socialMedias && <LinkLists links={socialMedias} liClasses="footer-social-media-item" />
        }
      </ul>
      <div className="footer-rights-reserved">
        <p className="gb-label gb-text-black-opacity-30">
          © 2018 All rights reserved.
        </p>
      </div>
    </div>
  </div>
);

GbFooter.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object)
};