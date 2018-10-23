import React from 'react';
import { EmailSVG } from '../../components/svg/EmailSVG';
import { NameInputSVG } from "../../components/svg/NameInputSVG";
import { InputField } from "../../components/form/InputField";
import { LocationSVG } from "../../components/svg/LocationSVG";
import { BusinessCardSVG } from '../../components/svg/BusinessCardSVG';
import { FileAttachmentSVG } from '../../components/svg/FileAttachmentSVG';
import { CameraSVG } from '../../components/svg/CameraSVG';
import PropTypes from 'prop-types';


export const ProfileEditView = ({ updateUserHandler, name, photoURL, changeHandler, location, user, type, email, handleChangeUpload, progress, url }) => (

	
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
			/>
			<InputField
				svg={
					<EmailSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
				}
				value={email}
				changeHandler={changeHandler}
				type="email"
				name="email"
			/>

			<InputField svg={<LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />}
				value={location}
				changeHandler={changeHandler}
				type="text"
				name="location"
				
			/>

			<div className="custom-select gb-text-input gb-text-input-trans-background">
				{type === "photographer" ? (
					<CameraSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
				) : (
						<BusinessCardSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
					)}
				{user.type}

			</div>
			<div>
				<InputField svg={<FileAttachmentSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />}
					type="file"
					value={photoURL}
					name="avatar"
					changeHandler={handleChangeUpload}
				/>
			<progress value={progress} max="100" /><br/>
			<img src={url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" style={{width: 160, height: 120}} />
			</div>

			
			<div className="btn-container">
				<input
					type="submit"
					value="Save"
					className="gb-btn gb-btn-large gb-btn-primary"
				/>
			</div>
		</form>
		 
	</div>
)


ProfileEditView.propTypes = {
	name : PropTypes.string.isRequired,  
	location : PropTypes.string.isRequired, 
	type : PropTypes.string.isRequired, 
	email : PropTypes.string.isRequired 
}

