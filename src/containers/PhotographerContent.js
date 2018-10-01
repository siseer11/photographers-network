import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class PhotographerContent extends Component {
    render() {
        return (
            <div className="section-content normalized">
                <h3>Job Offers</h3>
                <Link to="/" className="gb-btn gb-btn-medium gb-btn-primary">See all job offers...</Link>
                <h3>My Jobs</h3>
                <p>Here are my jobs</p>
                <Link to="/my-jobs" className="gb-btn gb-btn-medium gb-btn-primary">View all of my jobs</Link>
            </div>
        )
    }
}

export default PhotographerContent;