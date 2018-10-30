import React from 'react';
import { Component } from 'react';
import fire from '../../config/Fire';
import { ProfileEditViewWithNav } from './ProfileEditView';
import firebase from 'firebase';

export class ProfileEdit extends Component {
	state = {
		 
		  name: this.props.user.displayName,
		  email: this.props.user.email,
		  type: this.props.user.type,
		  location: this.props.user.location,
		  photoURL: this.props.user.photoURL,
		}
	  
	database = fire.database().ref();

	/**
		* Updates state to the current value of a certain target.
		* @param e
		*/
		handleChange = e => {
			this.setState({ [e.target.name]: e.target.value });
		};

	/**
		* Registers the user as photographer or company.
		*
		* @param e
		*/

	updateUser = (e) => {
		e.preventDefault();
		let { name, email, type, location, photoURL } = this.state;
		const { user, updateUserInfo } = this.props;

		if (name !== "" && location !== "" && photoURL !== "") {

		firebase.auth().currentUser.updateProfile(
			{

				displayName: name,
				photoURL: photoURL
			}
		)

			.then(() => {

				if(user.location !== location && location !=="") {
					this.database.child("locations").child(user.location).child(user.type).child(user.uid).remove();
					
					
					this.database.child("locations").child(location).child(user.type).child(user.uid).update({
						displayName: name,
						photoURL: photoURL
					});
				}

			})

			.then(() => {
				this.database.child("users").child(user.uid).update({
					type: type,
					email: email,
					location: location,
					displayName: name,
					photoURL: photoURL
				});

			})

			.then(() => {
				this.database.child(user.type).child(user.uid).update({
					email: email,
					location: location,
				});
			})

			.then(() => {
				this.props.history.replace("/dashboard");
				updateUserInfo({ type: type,
					email: email,
					location: location,
					displayName: name,
					photoURL: photoURL });
			  })
	
		}
		else {
			console.log("Please fill in the all input fields");
		}
	};

	render() {
		const { name, location, type } = this.state;
		const { user } = this.props;

		return (
				<ProfileEditViewWithNav updateUserHandler={this.updateUser} {...this.props} name={name} changeHandler={this.handleChange} location={location}
				 type={type} user={user} photoURL= {this.state.photoURL}
			/>
		);
	}
}

