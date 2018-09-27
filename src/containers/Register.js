import React, {Component} from 'react';
import fire from '../config/Fire';
import {Link} from 'react-router-dom';
import {EmailSVG} from '../components/svg/EmailSVG';
import {PasswordSVG} from "../components/svg/PasswordSVG";
import {Button} from "../components/Button";

class Login extends Component {
    state = {
        email: '',
        password: '',
        password2: '',
        type: 'photographer'
    };
    database = fire.database().ref();

    /**
     * Updates state to the current value of a certain target.
     * @param e
     */
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value}, () => console.log(this.state));
    };

    /**
     * Registers the user as photographer or company.
     *
     * @param e
     */
    signup = (e) => {
        e.preventDefault();
        const {email, password, password2, type} = this.state;
        console.log(type);

        if (password === password2) {
            fire.auth().createUserWithEmailAndPassword(email, password).then(() => {
            }).then(() => {
                let user = fire.auth().currentUser;
                console.log("type: " + type + "user:" + user.uid);
                this.addUserToDatabase(user, type);
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
                <form>
                    <h1>Register</h1>
                    <div className="gb-input-wrapper">
                        <EmailSVG classes="gb-input-icon-left"/>
                        <label htmlFor="exampleInputEmail1"/>
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email"
                               className="gb-text-input gb-text-input-trans-background" id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               placeholder="Enter email"/>
                    </div>
                    <div className="gb-input-wrapper">
                        <PasswordSVG classes="gb-input-icon-left"/>
                        <label htmlFor="exampleInputPassword1"/>
                        <input value={this.state.password} onChange={this.handleChange} type="password"
                               name="password"
                               className="gb-text-input gb-text-input-trans-background" id="exampleInputPassword1"
                               placeholder="Password"/>
                    </div>
                    <div className="gb-input-wrapper">
                        <PasswordSVG classes="gb-input-icon-left"/>
                        <label htmlFor="exampleInputPassword2"/>
                        <input value={this.state.password2} onChange={this.handleChange} type="password"
                               name="password2"
                               className="gb-text-input gb-text-input-trans-background" id="exampleInputPassword2"
                               placeholder="Repeat Password"/>
                    </div>
                    <select name="type" defaultValue="photographer" onChange={this.handleChange}>
                        <option value="photographer">Photographer</option>
                        <option value="company">Company</option>
                    </select>
                    <div className="btn-container">
                        <Button clickHandler={this.signup}
                                classes="gb-btn gb-btn-medium gb-btn-primary">Register</Button>
                        <Link to="/login" className="gb-btn gb-btn-medium gb-btn-primary">Go to login</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;