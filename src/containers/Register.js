import React, {Component} from 'react';
import fire from '../config/Fire';
import {Link, withRouter} from 'react-router-dom';
import {EmailSVG} from '../components/svg/EmailSVG';
import {PasswordSVG} from "../components/svg/PasswordSVG";
import {NameInputSVG} from "../components/svg/NameInputSVG";
import {InputField} from "../components/InputField";
import {Select} from "../components/Select";

class Register extends Component {
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
        this.setState({[e.target.name]: e.target.value});
    };

    /**
     * Registers the user as photographer or company.
     *
     * @param e
     */
    signup = (e) => {
        e.preventDefault();
        const {name, email, password, password2, type} = this.state;

        if (password === password2) {
            fire.auth().createUserWithEmailAndPassword(email, password)
                .then((snap) => {
                    let user = snap.user;
                    user.updateProfile({
                        displayName: name,
                        photoURL: ''
                    })
                        .then(() => {
                            this.addUserToDatabase(user, type);
                            this.props.history.replace('/dashboard');
                        });

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
    addUserToDatabase(user, type) {
        this.database.child(type).child(user.uid).set({
            email: user.email
        });
    }

    render() {
        return (
            <div className="section-content">
                <form className="sign-in-up-form" onSubmit={this.signup}>
                    <h1>Register</h1>
                    <InputField wrapperClass="gb-input-wrapper" svg={<NameInputSVG classes="gb-input-icon-left"/>}
                                value={this.state.name} changeHandler={this.handleChange} type="text" name="name"
                                placeholder="Enter your name"/>
                    <InputField wrapperClass="gb-input-wrapper" svg={<EmailSVG classes="gb-input-icon-left"/>}
                                value={this.state.email} changeHandler={this.handleChange} type="email" name="email"
                                placeholder="Enter email"/>
                    <InputField wrapperClass="gb-input-wrapper" svg={<PasswordSVG classes="gb-input-icon-left"/>}
                                value={this.state.password} changeHandler={this.handleChange} type="password"
                                name="password"
                                placeholder="Password"/>
                    <InputField wrapperClass="gb-input-wrapper" svg={<PasswordSVG classes="gb-input-icon-left"/>}
                                value={this.state.password2} changeHandler={this.handleChange} type="password"
                                name="password2"
                                placeholder="Repeat password"/>
                    <Select name="type" defaultVal={this.state.type} changeHandler={this.handleChange} options={[
                        {val: "photographer", label: "Photographer"}, {val: "company", label: "Company"}
                    ]}/>

                    <div className="btn-container">
                        <input type="submit" value="Register" className="gb-btn gb-btn-medium gb-btn-primary"/>
                        <Link to="/login" className="gb-btn gb-btn-medium gb-btn-primary">Go to login</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export const RegisterWithRouter = withRouter(Register);