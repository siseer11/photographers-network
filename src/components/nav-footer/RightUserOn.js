import React from "react";
import { BellSVG } from "../svg/BellSVG";
import NotificationContainer from "./NotificationContainer";
import WithModal from "../../RenderProp/WithModal";
import { LinkLists } from "../LinkLists";

export const RightUserOn = ({
  showNotificationsHandler,
  newNotifications,
  userImageUrl,
  userLinks
}) => (
  <React.Fragment>
    <WithModal>
      {({ showModal }) => (
        <React.Fragment>
          <BellSVG
            classes={`gb-icon-medium gb-icon-fill-white ${newNotifications &&
              "new"}`}
          />
          {showModal && (
            <NotificationContainer showBoxHandler={showNotificationsHandler} />
          )}
        </React.Fragment>
      )}
    </WithModal>
    <li className="nav-user-avatar-wrapper">
      <WithModal>
        {({ showModal }) => (
          <React.Fragment>
            <div
              style={{
                backgroundImage: `url(${userImageUrl ||
                  "http://cdn.onlinewebfonts.com/svg/img_74993.png"})`
              }}
              className="gb-avatar-small gb-avatar nav-user-avatar"
            />
            <ul
              className="dropdown-menu-list"
              style={{ display: showModal ? "flex" : "none" }}
            >
              <li className="nav-user-triangle" />
              <LinkLists links={userLinks} liClasses="dropdown-menu-item" />
            </ul>
          </React.Fragment>
        )}
      </WithModal>
    </li>
  </React.Fragment>
);
