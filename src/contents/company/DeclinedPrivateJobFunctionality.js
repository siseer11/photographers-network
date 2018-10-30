import React from "react";
import { Link } from "react-router-dom";
import fire from "../../config/Fire";
import { DeclinedPrivateJobView } from "../../components/DeclinedPrivateJobView";

export default class DeclinedPrivateJobFunctionality extends React.Component {
  state = {
    jobInfos: {},
    loadingDb: true,
    editDeleteStatus: false
  };
  /* Fetch data about the job */
  componentDidMount() {
    const jobId = this.props.match.params.jobId;
    fire
      .database()
      .ref("requests")
      .child(jobId)
      .once("value")
      .then(snap => {
        this.setState({
          jobInfos: snap.val(),
          loadingDb: false
        });
      })
      .catch(err => console.log(err));
  }

  /* Change the state of editDeleteStatus */
  changeEditDeleteStatus = to => {
    this.setState({
      editDeleteStatus: to
    });
  };

  /* Make the job public */
  makePublic = () => {
    const { jobInfos } = this.state;
    const { user } = this.props;
    const db = fire.database();

    this.changeEditDeleteStatus("Loading... Stage 1/2");

    //1. Update the jobData
    db.ref("requests")
      .child(jobInfos.jobbId)
      .update(
        {
          private: false,
          photographerDeclinedPrivateReq: null
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            this.changeEditDeleteStatus("Loading... Stage 2/2");
            updateCompanyJobsField();
          }
        }
      );

    //2. Update the job into the Company field
    const updateCompanyJobsField = () => {
      db.ref("company")
        .child(`${user.uid}/postedJobs/${jobInfos.jobbId}`)
        .update(
          {
            private: false
          },
          err => {
            if (err) {
              console.log(err);
            } else {
              this.changeEditDeleteStatus(
                <p>
                  Done , you can find it{" "}
                  <Link to={`/job/${jobInfos.jobId}`}>here</Link>
                </p>
              );
              console.log(
                "done , now is public, you can as well send it again as private req."
              );
            }
          }
        );
    };
  };

  /* Delete the job */
  deleteJob = () => {
    const { jobInfos } = this.state;
    const { user } = this.props;
    const db = fire.database();

    this.changeEditDeleteStatus("Loading... Step 1/2");

    //1. Delete the job from the company field
    db.ref("company")
      .child(`${user.uid}/postedJobs/${jobInfos.jobbId}`)
      .remove()
      .then(() => {
        this.changeEditDeleteStatus("Loading... Step 2/2");
        deleteJobbFromDb();
      })
      .catch(err => console.log(err));

    //2. Delete the jobData from the requests
    const deleteJobbFromDb = () => {
      db.ref("requests")
        .child(jobInfos.jobbId)
        .remove()
        .then(() => this.changeEditDeleteStatus("Done, is gone, FOREVER!"))
        .catch(err => console.log(err));
    };
  };

  render() {
    const { loadingDb, jobInfos, editDeleteStatus } = this.state;
    const { user } = this.props;

    /* If the data from the DB is not ready yet */
    if (loadingDb) {
      return <h2>Loading data from the DB....</h2>;
    }

    /* No job with that id or the job was made public */
    if (!jobInfos || !jobInfos.photographerDeclinedPrivateReq) {
      return "The job does not longer exist OR is not longer editable!";
    }

    /* Check against the DB data if this is the company that owns the job */
    if (jobInfos.companyId != user.uid) {
      return "Not your job get out of here!";
    }

    return (
      <DeclinedPrivateJobView
        {...jobInfos}
        makePublic={this.makePublic}
        deleteJob={this.deleteJob}
        editDeleteStatus={editDeleteStatus}
      />
    );
  }
}
