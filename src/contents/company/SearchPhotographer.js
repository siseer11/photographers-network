import React, { Component } from "react";
import fire from "../../config/Fire";
import { connect } from "react-redux";
import { searchPhotographer } from "../../redux/actions/searchPhotographer-action";
import { resetSearchState } from "../../redux/actions/searchPhotographer-action";

import { PhotographersList } from "../../components/PhotographersList";
import { SearchInput } from "../../components/form/SearchInput";

class SearchPhotographers extends Component {
  state = {
    searchValue: "",
    photographerResults: [],
    lastSearched: ""
  };
  database = fire.database().ref();

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  search = e => {
    e.preventDefault();
    const location = this.state.searchValue;
    this.props.searchPhotographer(location);
    this.setState({
      lastSearched: location
    });
  };

  componentWillUnmount() {
    this.props.resetSearchState();
  }

  render() {
    const { lastSearched } = this.state;
    const { photographersData, loading } = this.props;
    return (
      <React.Fragment>
        <div className="search-photographer section-content normalized">
          <h1 className="gb-title-medium">Search for a photographer in</h1>
          <SearchInput
            name="searchValue"
            value={this.state.searchValue}
            placeholder="Type in a city/location..."
            changeHandler={this.handleChange}
            searchHandler={this.search}
          />

          {loading ? (
            <h2>Loading...</h2>
          ) : loading === false ? (
            <PhotographersList list={photographersData[lastSearched]} />
          ) : (
            <h2>Nothing</h2>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.user.userData,
  photographersData: state.photographers.photographersData,
  loading: state.photographers.loading,
  error: state.photographers.error
});

const mapDispatchToProps = dispatch => ({
  searchPhotographer: country => dispatch(searchPhotographer(country)),
  resetSearchState: () => dispatch(resetSearchState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPhotographers);
