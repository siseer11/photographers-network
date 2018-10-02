import React, {Component} from 'react';
import fire from '../config/Fire';
import {EmailSVG} from '../components/svg/EmailSVG';
import {PasswordSVG} from "../components/svg/PasswordSVG";
import {NameInputSVG} from "../components/svg/NameInputSVG";
import {InputField} from "../components/InputField";
import {Select} from "../components/Select";
import {BusinessCardSVG} from '../components/svg/BusinessCardSVG';
import {CameraSVG} from '../components/svg/CameraSVG';
import {LocationSVG} from "../components/svg/LocationSVG";

export default class SignUp extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        location: '',
        type: this.props.match.params.type || 'photographer'
    };
    database = fire.database().ref();
    /**
     * Updates state to the current value of a certain target.
     * @param e
     */
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    /**
     * Registers the user as photographer or company.
     *
     * @param e
     */
    signup = (e) => {
        e.preventDefault();
        const {name, email, password, password2, type, location} = this.state;
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
                                email: user.email,
                                displayName: name,
                                photoURL: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992'
                            });
                        })
                        .then(() => {
                            this.props.history.replace('/dashboard');
                        })
                        .catch((err) => console.log(err));

                })
                .catch((error) => {
                    console.log(error);
                })
        }
    };

    render() {
        return (
            <div className="section-content">
                <form onSubmit={this.signup}>
                    <h1>Sign Up</h1>
                    <InputField svg={<NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>}
                                value={this.state.name} changeHandler={this.handleChange} type="text" name="name"
                                placeholder="Enter your name"/>
                    <InputField svg={<EmailSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>}
                                value={this.state.email} changeHandler={this.handleChange} type="email" name="email"
                                placeholder="Enter email"/>
                    <InputField svg={<PasswordSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>}
                                value={this.state.password} changeHandler={this.handleChange} type="password"
                                name="password"
                                placeholder="Password"/>
                    <InputField svg={<PasswordSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>}
                                value={this.state.password2} changeHandler={this.handleChange} type="password"
                                name="password2"
                                placeholder="Repeat password"/>
                    <InputField svg={<LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>}
                                value={this.state.location} changeHandler={this.handleChange} type="text"
                                name="location"
                                placeholder="Enter your location"/>
                    <Select name="type" value={this.state.type} changeHandler={this.handleChange} options={[
                        {val: "photographer", label: "Photographer"}, {val: "company", label: "Company"}
                    ]} icon={
                        this.state.type === 'photographer' ? (
                            <CameraSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon"/>
                        ) : (
                            <BusinessCardSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon"/>
                        )
                    }/>
                    <div className="btn-container">
                        <input type="submit" value="Sign Up" className="gb-btn gb-btn-large gb-btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}

