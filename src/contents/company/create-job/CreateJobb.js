import React from "react";
import { connect } from "react-redux";
import { createJob } from "../../../redux/actions/company-actions";

import { CustomSelect } from "../../../components/CustomSelect";
import { InputField } from "../../../components/form/InputField";
import { NameInputSVG } from "../../../components/svg/NameInputSVG";
import { LocationSVG } from "../../../components/svg/LocationSVG";
import { MoneySVG } from "../../../components/svg/MoneySVG";
import { CameraSVG } from "../../../components/svg/CameraSVG";
import { CalendarSVG } from "../../../components/svg/CalendarSVG";
import { TextArea } from "../../../components/form/TextArea";

const types = ["nature", "portrait", "dogs", "cats"];

class CreateJob extends React.Component {
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
    loading: false,
    error: null,
    finished: null
  };

  changeHandler = e => {
    this.setState({
      [`job${e.target.name}`]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();

    this.setState({
      loading: true
    });

    this.props
      .createJob({
        ...this.state,
        jobDate: new Date(this.state.jobDate).getTime()
      })
      .then(() => {
        this.setState({
          loading: false,
          finished: true
        });

        setTimeout(() => {
          this.props.history.push("/dashboard");
        }, 1000);
      })
      .catch(err => {
        this.setState({
          loading: false,
          finished: null,
          error: err
        });
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

  render() {
    const {
      jobTitle,
      jobLocation,
      jobAddress,
      jobType,
      jobBudget,
      jobDate,
      jobDescription,
      showCustomSelect,
      loading,
      error,
      finished
    } = this.state;

    let today = new Date();
    today = this.createValidDate(today);

    return (
      <div className="create-job-page section-content with-padding">
        <h1>Create Job</h1>
        <form onSubmit={this.submitHandler}>
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
            value={loading ? "Loading..." : finished ? "Done!" : "Create"}
            disabled={loading || finished}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.firebase.profile
});

const mapDispatchToProps = dispatch => ({
  createJob: jobData => dispatch(createJob(jobData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateJob);
