import React, {Component} from 'react';
import fire from '../config/Fire';
import {Link, withRouter} from 'react-router-dom';
import {EmailSVG} from '../components/svg/EmailSVG';
import {PasswordSVG} from "../components/svg/PasswordSVG";
import {Button} from "../components/Button";
import {Error} from "../components/Error";

class Login extends Component {
    state = {
        email: '',
        password: '',
        type: 'photographer',
        errorMessage: '',
        error: false
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
     * Logs in user. Doesn't log in user, if he's no photographer/company.
     *
     * @param e
     */
    login = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(result => {
                let user = result.user;
                let userIsType = false;
                this.database.child(this.state.type).once('value', snapshot => {
                    snapshot.forEach(childSnapshot => {
                        // checks, if user exists in the node of the certain type e.g. photographer
                        if (childSnapshot.key === user.uid) userIsType = true;
                    });
                }).then(() => {
                    if (!userIsType) {
                        fire.auth().signOut();
                        this.setState({error: true, errorMessage: `You are not registered as ${this.state.type}!`});
                    } else {
                        this.props.history.push('/dashboard');
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <div className="section-content">
                    <form>
                        <h1>Login</h1>
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
                                   className="gb-text-input gb-text-input-trans-background"
                                   id="exampleInputPassword1"
                                   placeholder="Password"/>
                        </div>
                        <select name="type" defaultValue="photographer" onChange={this.handleChange}>
                            <option value="photographer">Photographer</option>
                            <option value="company">Company</option>
                        </select>
                        <div className="btn-container">
                            <Button clickHandler={this.login}
                                    classes="gb-btn gb-btn-medium gb-btn-primary">Login</Button>
                            <Link to="/register" className="gb-btn gb-btn-medium gb-btn-primary">Register...</Link>
                        </div>
                        {this.state.error && <Error message={this.state.errorMessage}/>}
                    </form>
                </div>
            </div>
        );
    }
}

export const LogInWithRoute = withRouter(Login);