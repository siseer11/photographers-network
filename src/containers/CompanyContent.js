import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {SearchInput} from "../components/SearchInput";

class CompanyContent extends Component {
  render() {
    return (
      <div className="section-content normalized">
        <Link to='../createJob'>Create job offer</Link>
        <p>Here you can create your job offer</p>
        <h3>Search photographers</h3>
        <Link to="/search-photographers" className="gb-btn gb-btn-medium gb-btn-primary">Search now...</Link>
      </div>
    )
  }
}

export default CompanyContent;