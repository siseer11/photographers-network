import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { isLoaded, isEmpty, firestoreConnect } from "react-redux-firebase";

import { PhotographersList } from "../../../components/PhotographersList";
import { SearchInput } from "../../../components/form/SearchInput";

class SearchPhotographers extends Component {
  state = {
    searchedValue: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  search = e => {
    e.preventDefault();
    const location = this.state.searchValue;
  };

  render() {
    let { photographers } = this.props;
    const { searchedValue } = this.state;

    if (!isLoaded(photographers)) {
      return <h2>Loading.... Photographers data!</h2>;
    }

    if (isEmpty(photographers)) {
      return <h2>No photographers could be found!</h2>;
    }

    if (searchedValue) {
      photographers = photographers.filter(el => {
        const regExp = new RegExp(`^${searchedValue}`, "i");
        return regExp.test(el.location);
      });
    }

    return (
      <React.Fragment>
        <div className="search-photographer section-content normalized">
          <h1 className="gb-title-medium">Search for a photographer in</h1>
          <SearchInput
            name="searchedValue"
            value={this.state.searchedValue}
            placeholder="Type in a city/location..."
            changeHandler={this.handleChange}
            searchHandler={this.search}
          />
          <PhotographersList list={photographers} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  photographers: state.firestore.ordered.photographers
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "users",
      where: [["type", "==", "photographer"]],
      storeAs: "photographers"
    }
  ])
)(SearchPhotographers);
