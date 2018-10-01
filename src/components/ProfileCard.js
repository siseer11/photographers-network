import React from "react";
import PropTypes from "prop-types";
import {Avatar} from "./Avatar";

export const ProfileCard = ({
                                backgroundImg,
                                children,
                                profileImg
                            }) => {
    return (
        <div className="gb-card-10-wrapper">
            <div
                className="profile-card"
                style={{backgroundImage: `url(${backgroundImg})`}}
            >
                <div className="card-10-shadow-overlay"/>
                <div className="card-10-content">
                    <h1 className="gb-title-xx-large gb-text-white">{children}</h1>
                    <Avatar
                        userImageUrl={profileImg}
                        classes="profile-avatar gb-avatar-x-large"/>
                </div>
            </div>
        </div>
    );
};

ProfileCard.propTypes = {
    backgroundImg: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired
};