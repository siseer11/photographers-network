import React from "react";
import {Spring} from 'react-spring'

import {EmailSVG} from "./svg/EmailSVG";
import {PasswordSVG} from "./svg/PasswordSVG";
import {NameInputSVG} from "./svg/NameInputSVG";
import {InputField} from "./form/InputField";
import PropTypes from "prop-types";

export const SingUpView = ({
                             stepHandler,
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
  <Spring delay={100} from={{opacity: 0}} to={{opacity: 1}}>
    {props =>
      <div style={props}>
        {type === "photographer" ? (
          <div>
            <InputField
              svg={
                <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
              }
              value={firstName}
              changeHandler={changeHandler}
              type="text"
              name="firstName"
              placeholder="First name"
            />
            <InputField
              svg={
                <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
              }
              value={lastName}
              changeHandler={changeHandler}
              type="text"
              name="lastName"
              placeholder="Last name"
            />
          </div>
        ) : (
          <InputField
            svg={
              <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
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
            <EmailSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
          }
          value={email}
          changeHandler={changeHandler}
          type="email"
          name="email"
          placeholder="Enter email"
        />
        <InputField
          svg={
            <PasswordSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
          }
          value={password}
          changeHandler={changeHandler}
          type="password"
          name="password"
          placeholder="Password"
        />
        <InputField
          svg={
            <PasswordSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
          }
          value={password2}
          changeHandler={changeHandler}
          type="password"
          name="password2"
          placeholder="Repeat password"
        />
        <button className="gb-btn gb-btn-black" onClick={() => stepHandler(2)}>Next</button>
      </div>
    }
  </Spring>
);

SingUpView.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  password2: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

/*
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
        ) : successDB ? (
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
 */
