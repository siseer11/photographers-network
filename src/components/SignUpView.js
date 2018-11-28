import React from "react";

import { EmailSVG } from "./svg/EmailSVG";
import { PasswordSVG } from "./svg/PasswordSVG";
import { NameInputSVG } from "./svg/NameInputSVG";
import { InputField } from "./form/InputField";
import { BusinessCardSVG } from "./svg/BusinessCardSVG";
import { CameraSVG } from "./svg/CameraSVG";
import { CustomSelect } from "./CustomSelect";
import LocationSearchInput from "../routes/auto";
import PropTypes from "prop-types";

export const SingUpView = ({
  loadingDB,
  succesDB,
  showCustomSelect,
  signupHandler,
  firstName,
  lastName,
  changeHandler,
  password,
  password2,
  locationPlaceholder,
  showCustomSelectHandler,
  optionSelectHandler,
  type,
  email,
  companyName
}) => (
  <div className="section-content with-padding">
    <form onSubmit={signupHandler}>
      <h1>Sign Up</h1>
      {type === "photographer" ? (
        <React.Fragment>
          <InputField
            svg={
              <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={firstName}
            changeHandler={changeHandler}
            type="text"
            name="firstName"
            placeholder="First name"
          />
          <InputField
            svg={
              <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={lastName}
            changeHandler={changeHandler}
            type="text"
            name="lastName"
            placeholder="Last name"
          />
        </React.Fragment>
      ) : (
        <InputField
          svg={
            <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
          }
          value={companyName}
          changeHandler={changeHandler}
          type="text"
          name="companyName"
          placeholder="Company name"
        />
      )}
      <InputField
        svg={
          <EmailSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
        }
        value={email}
        changeHandler={changeHandler}
        type="email"
        name="email"
        placeholder="Enter email"
      />
      <InputField
        svg={
          <PasswordSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
        }
        value={password}
        changeHandler={changeHandler}
        type="password"
        name="password"
        placeholder="Password"
      />
      <InputField
        svg={
          <PasswordSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
        }
        value={password2}
        changeHandler={changeHandler}
        type="password"
        name="password2"
        placeholder="Repeat password"
      />
      <LocationSearchInput
        locationPlaceholder={locationPlaceholder}
        changeHandler={changeHandler}
      />
      <div
        className="custom-select gb-text-input gb-text-input-trans-background"
        onClick={showCustomSelectHandler}
      >
        {type === "photographer" ? (
          <CameraSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
        ) : (
          <BusinessCardSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
        )}
        {type}
        <CustomSelect
          showCustomSelect={showCustomSelect}
          optionsList={["photographer", "company"]}
          optionSelectHandler={optionSelectHandler}
        />
      </div>
      <div className="btn-container">
        {loadingDB ? (
          <input
            type="submit"
            style={{ opacity: 0.8 }}
            disabled={true}
            value="Loading"
            className="gb-btn gb-btn-large gb-btn-primary"
          />
        ) : succesDB ? (
          <input
            type="submit"
            style={{ opacity: 1, background: "green" }}
            disabled={true}
            value="Succes"
            className="gb-btn gb-btn-large gb-btn-primary"
          />
        ) : (
          <input
            type="submit"
            value="Sign up"
            className="gb-btn gb-btn-large gb-btn-primary"
          />
        )}
      </div>
    </form>
  </div>
);

SingUpView.propTypes = {
  showCustomSelect: PropTypes.bool,
  signupHandler: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  password2: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  showCustomSelectHandler: PropTypes.func.isRequired,
  optionSelectHandler: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};
