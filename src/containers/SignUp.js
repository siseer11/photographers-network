import React, { Component } from 'react';
import fire from '../config/Fire';
import { EmailSVG } from '../components/svg/EmailSVG';
import { PasswordSVG } from "../components/svg/PasswordSVG";
import { NameInputSVG } from "../components/svg/NameInputSVG";
import { InputField } from "../components/InputField";
import { BusinessCardSVG } from '../components/svg/BusinessCardSVG';
import { CameraSVG } from '../components/svg/CameraSVG';
import { LocationSVG } from "../components/svg/LocationSVG";
import { CustomSelect } from "../components/CustomSelect";
import LoadingPage from '../components/LoadingPage';
import {Redirect} from 'react-router-dom';

export default class SignUp extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		password2: "",
		type: this.props.match.params.type || "photographer",
		location: "",
	};
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
	signup = (e) => {
		e.preventDefault();
		const { name, email, password, password2, type, location } = this.state;
		if (password === password2) {
			fire.auth().createUserWithEmailAndPassword(email, password)
				.then((snap) => {
					let user = snap.user;
					user.updateProfile({
						displayName: name,
						photoURL: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992'
					});
					//TODO: find better profile url
					this.database.child(type).child(user.uid).set({
						email: user.email,
						location: location
					})
						.then(() => {
							this.database.child("locations").child(location).child(type).child(user.uid).set({
								displayName: name,
								photoURL: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992'
							});
						})
						.then(() => {
							this.database.child("users").child(user.uid).set({
								type: type,
								email: user.email,
								displayName: name,
								photoURL: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992'
							});

						})
						.then(() => {
							console.log('aici ar trebuii');
							this.props.history.replace('/dashboard');
						})
						.catch((err) => console.log(err));
				})
				.catch((error) => {
					console.log(error);
				})
		}
	};

	optionSelectHandler = (type) => {
		this.setState({
			type: type,
		})
	};

	showCustomSelectHandler = () => {
		this.setState(
			prevState => ({
				showCustomSelect: !prevState.showCustomSelect
			}),
			() => {
				if (this.state.showCustomSelect === true) {
					window.addEventListener("click", e => {
						if (!e.target.classList.contains("custom-select")) {
							this.setState({
								showCustomSelect: false
							});
						}
					});
				}
			}
		);
	};

	render() {
		const {name , email , password , password2 , location , type , showCustomSelect} = this.state;
		return (
			this.props.loading===false?(
				
				this.props.user?(
					<Redirect to='../dashboard' />
				):(
					<SingUpView signupHandler = {this.signup} name={name} changeHandler={this.handleChange} email={email}
					password={password} password2 = {password2} location={location} showCustomSelectHandler={this.showCustomSelectHandler}
					optionSelectHandler={this.optionSelectHandler} type={type} showCustomSelect ={showCustomSelect}
					/>
				)
			):(
				<LoadingPage />
			)
		); 
	}
}



const SingUpView = ({showCustomSelect,signupHandler,name,changeHandler,password,password2,location , showCustomSelectHandler , optionSelectHandler , type , email}) => (
	<div className="section-content">
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