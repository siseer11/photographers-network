import React from "react";
import { PropTypes } from "prop-types";

import { CustomSelect } from "../../../components/CustomSelect";
import { InputField } from "../../../components/form/InputField";
import { NameInputSVG } from "../../../components/svg/NameInputSVG";
import { LocationSVG } from "../../../components/svg/LocationSVG";
import { MoneySVG } from "../../../components/svg/MoneySVG";
import { CameraSVG } from "../../../components/svg/CameraSVG";
import { CalendarSVG } from "../../../components/svg/CalendarSVG";
import { TextArea } from "../../../components/form/TextArea";
import LocationSearchInput from "../../shared/MapsAutocomplete";

const types = ["nature", "portrait", "dogs", "cats"];

export default class CreateJobForm extends React.Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired
  };

  createValidDate = date => {
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${year}-${month >= 10 ? month : `0${month}`}-${
      day >= 10 ? day : `0${day}`
    }`;
  };

  state = {
    jobTitle: "",
    jobLocation: "",
    jobType: "nature",
    jobBudget: "",
    jobDate: this.createValidDate(new Date()),
    jobDescription: "",
    jobAddress: "",
    joblocationPlaceholder: "",
    jobdetailedAddress: {}
  };

  changeHandler = e => {
    this.setState({
      [`job${e.target.name}`]: e.target.value
    });
  };

  optionSelectHandler = type => {
    this.setState({
      jobType: type
    });
  };

  showCustomSelectHandler = () => {
    this.setState(
      prevState => ({
        showCustomSelect: !prevState.showCustomSelect
      }),
      () => {
        if (this.state.showCustomSelect === true) {
          window.addEventListener("click", e => {
            if (!e.target.classList.contains("custom-select")) {
              this.setState({
                showCustomSelect: false
              });
            }
          });
        }
      }
    );
  };

  formSubmited = e => {
    e.preventDefault();
    /* send data to the parent */
    this.props.submitHandler({
      ...this.state,
      jobDate: new Date(this.state.jobDate).getTime()
    });
  };

  render() {
    const {
      jobTitle,
      jobType,
      jobBudget,
      jobDate,
      jobDescription,
      showCustomSelect,
      joblocationPlaceholder
    } = this.state;

    let today = new Date();
    today = this.createValidDate(today);

    return (
      <div className="create-job-page section-content with-padding">
        <h1>Create Jobsss</h1>
        <form onSubmit={this.formSubmited}>
          <InputField
            svg={
              <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={jobTitle}
            changeHandler={this.changeHandler}
            type="text"
            name="Title"
            placeholder="Name/Title"
          />
          <LocationSearchInput
            locationPlaceholder={joblocationPlaceholder}
            changeHandler={this.changeHandler}
          />
          <div
            className="custom-select gb-text-input gb-text-input-trans-background"
            onClick={this.showCustomSelectHandler}
          >
            <CameraSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
            {jobType}
            <CustomSelect
              showCustomSelect={showCustomSelect}
              optionsList={types}
              optionSelectHandler={this.optionSelectHandler}
            />
          </div>
          <InputField
            svg={
              <MoneySVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
            }
            value={jobBudget}
            changeHandler={this.changeHandler}
            type="number"
            name="Budget"
            placeholder="Budget"
            min="10"
          />
          <InputField
            svg={
              <CalendarSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
            }
            value={jobDate || today}
            changeHandler={this.changeHandler}
            type="date"
            name="Date"
            min={today}
          />
          <TextArea
            svg={
              <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={jobDescription}
            name="Description"
            changeHandler={this.changeHandler}
            placeholder="Job description"
          />
          <input
            className="gb-btn gb-btn-large gb-btn-primary"
            type="submit"
            value="Create"
          />
        </form>
      </div>
    );
  }
}

/*
<InputField
  svg={
    <LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
  }
  value={jobLocation}
  changeHandler={this.changeHandler}
  type="text"
  name="Location"
  placeholder="Location"
/>
<InputField
  svg={
    <LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
  }
  value={jobAddress}
  changeHandler={this.changeHandler}
  type="text"
  name="Address"
  placeholder="Address"
/>
*/
