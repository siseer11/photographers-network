import React from "react";
import LoadingPage from "../../components/LoadingPage";
import { Redirect } from "react-router-dom";
import fire from "../../config/Fire";
import CreateJobForm from "../CreateJobForm";
import NavFooterWrapper from "../shared/NavFooterWrapper";

class CreateJob extends React.Component {
  /**
   * When the component mounts, after the loading is done
   * if the user is not a company redirect him to his dashboard
   **/
  componentDidMount() {
    if (this.props.loading === false && this.props.user.type !== "company") {
      this.props.history.replace("/dashboard");
    }
  }

  /**
   * Function called when the form is submited
   **/
  submitHandler = values => {
    const { user, history } = this.props;
    //Get a new id for the job
    const jobbId = fire
      .database()
      .ref("requests")
      .push().key;

    //Add the new created job in the database under requests
    fire
      .database()
      .ref("requests")
      .child(jobbId)
      .set(
        {
          ...values,
          status: "open",
          payment: "soooooon",
          phootgrapher: "none",
          companyId: user.uid,
          companyName: user.displayName,
          jobbId: jobbId
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            addJobIntoCompany();
          }
        }
      );

    //Add the job in the company postedJobs field
    const addJobIntoCompany = () => {
      fire
        .database()
        .ref("company")
        .child(user.uid)
        .child("postedJobs")
        .child(jobbId)
        .set(
          {
            jobId: jobbId
          },
          err => {
            if (err) {
              console.log(err);
            } else {
              setTimeout(() => {
                history.push("/dashboard");
              }, 1000);
            }
          }
        );
    };
  };

  render() {
    return (
      <React.Fragment>
        {this.props.loading === false ? (
          this.props.user.type !== "company" ? (
            <Redirect to="/dashboard" />
          ) : (
            <CreateJobForm submitHandler={this.submitHandler} />
          )
        ) : (
          <LoadingPage />
        )}
      </React.Fragment>
    );
  }
}

const CreateJobb = NavFooterWrapper(CreateJob);
export default CreateJobb;
