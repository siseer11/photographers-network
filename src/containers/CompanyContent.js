import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CompanyContent extends Component {
    render() {
        return (
            <div className="section-content normalized">
                <h3>Create job offer</h3>
                <p>Here you can create your job offer</p>
                <h3>Search photographers</h3>
                <form className="gb-search-form">
                    <input type="text" className="search-input" placeholder="Type in a city/location..."/>
                    <input type="submit" value="Search" className="search-btn gb-background-green"/>
                </form>
                <p>Here are photographers near your location</p>
            </div>
        )
    }
}

export default CompanyContent;