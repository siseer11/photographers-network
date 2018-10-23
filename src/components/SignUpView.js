import React from 'react';

import { EmailSVG } from './svg/EmailSVG';
import { PasswordSVG } from "./svg/PasswordSVG";
import { NameInputSVG } from "./svg/NameInputSVG";
import { InputField } from "./form/InputField";
import { BusinessCardSVG } from './svg/BusinessCardSVG';
import { CameraSVG } from './svg/CameraSVG';
import { LocationSVG } from "./svg/LocationSVG";
import { CustomSelect } from "./CustomSelect";
import PropTypes from 'prop-types';

export const SingUpView = ({ showCustomSelect, signupHandler, name, changeHandler, password, password2, location, showCustomSelectHandler, optionSelectHandler, type, email }) => (
	<div className="section-content with-padding">
		<form onSubmit={signupHandler}>
			<h1>Sign Up</h1>
			<InputField
				svg={
					<NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
				}
				value={name}
				changeHandler={changeHandler}
				type="text"
				name="name"
				placeholder="Enter your name"
			/>
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
			<InputField svg={<LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />}
				value={location} changeHandler={changeHandler} type="text"
				name="location"
				placeholder="Enter your location" />
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
				<input
					type="submit"
					value="Sign Up"
					className="gb-btn gb-btn-large gb-btn-primary"
				/>
			</div>
		</form>
	</div>
)

SingUpView.propTypes = {
	showCustomSelect : PropTypes.bool, 
	signupHandler : PropTypes.func.isRequired, 
	name : PropTypes.string.isRequired, 
	changeHandler : PropTypes.func.isRequired, 
	password : PropTypes.string.isRequired,
	password2 : PropTypes.string.isRequired,  
	location : PropTypes.string.isRequired, 
	showCustomSelectHandler : PropTypes.func.isRequired, 
	optionSelectHandler : PropTypes.func.isRequired, 
	type : PropTypes.string.isRequired, 
	email : PropTypes.string.isRequired 
}