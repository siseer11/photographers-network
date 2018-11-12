import React from 'react';
import { NameInputSVG } from "../../../components/svg/NameInputSVG";
import { InputField } from "../../../components/form/InputField";
import { LocationSVG } from "../../../components/svg/LocationSVG";
import PropTypes from 'prop-types';
import AvatarInput from "./AvatarInput";

export const ProfileEditView = ({ updateUserHandler, name, changeHandler, location, user, photoURL}) => (


	<div className="section-content with-padding">

		<form onSubmit={updateUserHandler}>
			<h1>Edit your Profile: {user.displayName}</h1>
			<InputField
				svg={
					<NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
				}
				value={name}
				changeHandler={changeHandler}
				type="text"
				name="name"
				placeholder="Change your name"
			/>

			<InputField svg={<LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />}
				value={location}
				changeHandler={changeHandler}
				type="text"
				name="location"
				placeholder="change your location"
			/>
			change photo:
			<AvatarInput
				uid={user.uid}
				userAvatar={photoURL}
				name="avatar"
			/>
			<div className="btn-container">
				<input
					type="submit"
					value="Save"
					className="gb-btn gb-btn-large gb-btn-primary"
				/>
			</div>
		</form>
	</div>
);


ProfileEditView.propTypes = {
	name: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
};