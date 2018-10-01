import React, { Component } from 'react';
import fire from '../config/Fire';
import { EmailSVG } from '../components/svg/EmailSVG';
import { PasswordSVG } from "../components/svg/PasswordSVG";
import { NameInputSVG } from "../components/svg/NameInputSVG";
import { InputField } from "../components/InputField";
import { Select } from "../components/Select";
import {BusinessCardSVG} from '../components/svg/BusinessCardSVG';
import {CameraSVG} from '../components/svg/CameraSVG';

export default class SignUp extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		type: this.props.match.params.type || 'photographer'
	};
	database = fire.database().ref();
	/**
	 * Updates state to the current value of a certain target.
	 * @param e
	 */
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	/**
	 * Registers the user as photographer or company.
	 *
	 * @param e
	 */
	signup = (e) => {
		e.preventDefault();
		const { name, email, password, password2, type } = this.state;
		if (password === password2) {
			fire.auth().createUserWithEmailAndPassword(email, password)
				.then((snap) => {
					let user = snap.user;
					user.updateProfile({
						displayName: name,
						photoURL: ''
					});

					this.database.child(type).child(user.uid).set({
						email: user.email
					})
					.then(()=>{
						this.props.history.replace('/dashboard');
					})
					.catch((err)=>console.log(err));
					
				})
				.catch((error) => {
					console.log(error);
				})
		}
	};

	/**
	 * Adds user to database to distinguish between photographer
	 * and company afterwards.
	 *
	 * @param user
	 * @param type
	 */

	render() {
		return (
			<div className="section-content">
				<form onSubmit={this.signup}>
					<h1>Sign Up</h1>
					<InputField svg={<NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />}
						value={this.state.name} changeHandler={this.handleChange} type="text" name="name"
						placeholder="Enter your name" />
					<InputField svg={<EmailSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />}
						value={this.state.email} changeHandler={this.handleChange} type="email" name="email"
						placeholder="Enter email" />
					<InputField svg={<PasswordSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />}
						value={this.state.password} changeHandler={this.handleChange} type="password"
						name="password"
						placeholder="Password" />
					<InputField svg={<PasswordSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />}
						value={this.state.password2} changeHandler={this.handleChange} type="password"
						name="password2"
						placeholder="Repeat password" />
					<Select name="type" value={this.state.type} changeHandler={this.handleChange} options={[
						{ val: "photographer", label: "Photographer" }, { val: "company", label: "Company" }
					]} icon={
						this.state.type=='photographer'?(
							<CameraSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon"/>
						):(
							<BusinessCardSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon"/>
						)
					}/>
					<div className="btn-container">
						<input type="submit" value="Sign Up" className="gb-btn gb-btn-large gb-btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}

