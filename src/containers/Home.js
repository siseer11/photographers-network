import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="section-content">
                <h1>Home</h1>
                <Link to="/login" className="gb-btn gb-btn-small gb-btn-primary">Login</Link>
            </div>
        );
    }
}

export default Home;