import React from "react";
import { PropTypes } from "prop-types";

import { CustomSelect } from "../components/CustomSelect";
import { InputField } from "../components/form/InputField";
import { NameInputSVG } from "../components/svg/NameInputSVG";
import { LocationSVG } from "../components/svg/LocationSVG";
import { MoneySVG } from "../components/svg/MoneySVG";
import { CameraSVG } from "../components/svg/CameraSVG";
import { CalendarSVG } from "../components/svg/CalendarSVG";
import { TextArea } from "../components/form/TextArea";

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
    jobbTitle: "",
    jobbLocation: "",
    jobbType: "nature",
    jobbBudget: "",
    jobbDate: this.createValidDate(new Date()),
    jobbDescription: ""
  };

  changeHandler = e => {
    this.setState({
      [`jobb${e.target.name}`]: e.target.value
    });
  };

  optionSelectHandler = type => {
    this.setState({
      jobbType: type
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

  checkForm = () => {
    const { jobbTitle, jobbLocation, jobbBudget, jobbDescription } = this.state;

    if (!/^[a-z -]{5,}$/gi.test(jobbTitle)) {
      return "Job title must have at least 5 chars, letters,spaces and -";
    } else if (!jobbLocation) {
      return "The jobb location must be completed.";
    } else if (!jobbBudget || Number(jobbBudget) < 10) {
      return "The job budget must filled and higher then 10$";
    } else if (!/^[a-z -\.]{20,}$/gi.test(jobbDescription)) {
      return "Job description must have at least 20 chars, containing letters,spaces, - and points";
    } else {
      return true;
    }
  };

  formSubmited = e => {
    e.preventDefault();
    const passed = this.checkForm();
    if (passed === true) {
      const s = this.state;
      /* send data to the parent */
      this.props.submitHandler({
        title: s.jobbTitle,
        description: s.jobbDescription,
        price: Number(s.jobbBudget),
        location: s.jobbLocation,
        type: s.jobbType,
        date: new Date(s.jobbDate).getTime()
      });
    } else {
      console.log(passed);
    }
  };

  render() {
    const {
      jobbTitle,
      jobbLocation,
      jobbType,
      jobbBudget,
      jobbDate,
      jobbDescription,
      showCustomSelect
    } = this.state;

    let today = new Date();
    today = this.createValidDate(today);

    return (
      <div className="create-jobb-page section-content with-padding">
        <h1>Create Jobsss</h1>
        <form onSubmit={this.formSubmited}>
          <InputField
            svg={
              <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={jobbTitle}
            changeHandler={this.changeHandler}
            type="text"
            name="Title"
            placeholder="Name/Title"
          />
          <InputField
            svg={
              <LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={jobbLocation}
            changeHandler={this.changeHandler}
            type="text"
            name="Location"
            placeholder="Location"
          />
          <div
            className="custom-select gb-text-input gb-text-input-trans-background"
            onClick={this.showCustomSelectHandler}
          >
            <CameraSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
            {jobbType}
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
            value={jobbBudget}
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
            value={jobbDate || today}
            changeHandler={this.changeHandler}
            type="date"
            name="Date"
            min={today}
          />
          <TextArea
            svg={
              <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />
            }
            value={jobbDescription}
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
