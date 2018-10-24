import React from 'react';
import { Component } from 'react';
import fire from '../../config/Fire';
import { ProfileEditView } from './ProfileEditView';
import firebase from 'firebase';

export class ProfileEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  image: "https://example.com/jane-q-user/profile.jpg",
		  url: this.props.user.photoURL,
		  progress: 0,
		  name: this.props.user.displayName,
		  email: this.props.user.email,
		  type: this.props.user.type,
		  location: this.props.user.location,
		  photoURL: this.props.user.url,
		}
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
		let { name, email, type, location, url } = this.state;
		const { user } = this.props;

		if (name !== "" && email !== "" && location !== "" && url !== "") {

		firebase.auth().currentUser.updateProfile(
			{

				displayName: name,
				photoURL: url
			}
		)

			.then(() => {

				if(user.location !== location && location !=="") {
					this.database.child("locations").child(user.location).child(user.type).child(user.uid).remove();
					
					
					this.database.child("locations").child(location).child(user.type).child(user.uid).update({
						displayName: name,
						photoURL: url
					});
				}
				else {
					console.log("location was same as before so no update:" + user.location);

				}

			})

			.then(() => {
				this.database.child("users").child(user.uid).update({
					type: type,
					email: email,
					location: location,
					displayName: name,
					photoURL: url
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
				alert("User Updated!! please refresh the page for updates");
			  })
	
		}
		else {
			alert("please fill in all the input fields");
		}
	};

	handleChangeUpload = e => {
		this.setState({ [e.target.name]: e.target.value });
		if (e.target.files[0]) {
		  const image = e.target.files[0];
		  this.setState(() => ({image}));

		  //handle start
		  
		
		const uploadTask = fire.storage().ref(`images/${image.name}`).put(image);
		uploadTask.on('state_changed', 
		(snapshot) => {
		  // progrss function ....
		  const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
		  this.setState({progress});
		}, 
		(error) => {
			 // error function ....
		  console.log(error);
		}, 
	  () => {
		  // complete function ....
		  fire.storage().ref('images').child(image.name).getDownloadURL().then(url => {
			  console.log(url);
			  this.setState({url});
		  })
	  });
		  //handle ends
		}
		else{
			console.log("no data");
		}
	  }

	render() {
		const { name, email, location, type } = this.state;
		const { user } = this.props;

		return (

				<ProfileEditView updateUserHandler={this.updateUser} {...this.props} name={name} changeHandler={this.handleChange} email={email} location={location} showCustomSelectHandler={this.showCustomSelectHandler}
				 optionSelectHandler={this.optionSelectHandler} type={type} user={user}
				
				 progress= {this.state.progress}
				 handleChangeUpload= {this.handleChangeUpload}
				 url= {this.state.url}
			/>
       

		);
	}
}

