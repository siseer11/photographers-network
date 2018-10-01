import React from "react";
import { ArrowDown } from "./svg/ArrowDown";
import { GbCard50SkewedModal } from "../components/GbCard50SkewedModal";

export const GbCard50Skewed = ({
  backgroundUrl,
  type,
  aboutType,
  modalHandler,
  showModal,
  modalLink,
  modalButtonValue,
  modalList
}) => (
  <div
    className={`gb-card-50-skewed ${showModal ? "extended" : ""}`}
    style={{ backgroundImage: `url(${backgroundUrl})` }}
  >
    {showModal ? (
      <GbCard50SkewedModal
        buttonLink={modalLink}
        list={modalList}
        buttonValue={modalButtonValue}
        closeModal={modalHandler}
      />
    ) : (
      <React.Fragment>
        <div className="blackoverlay" />
        <div className="inner-content">
          <p className="gb-text-white gb-title-large card-for">{type}</p>
          <p className="gb-text-white gb-paragraph-large about-type">
            {aboutType}
          </p>
          <div
            className="arrow-down gb-icon-large"
            onClick={() => modalHandler(type.toLowerCase())}
          >
            <ArrowDown classes="gb-icon-fill-white gb-icon-large card-50-skewed-arrow" />
          </div>
        </div>
      </React.Fragment>
    )}
  </div>
);
